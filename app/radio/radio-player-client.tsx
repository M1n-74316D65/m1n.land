"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Plus, Minus } from "lucide-react";
import { Button } from "app/components/ui/button";

export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDecreasing, setIsDecreasing] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const radioUrl = "https://radio.m1n.land/";

  // Audio event handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadStart = () => {
      // Only set loading if user has attempted to play
      if (isPlaying || audio.readyState > 0) {
        setIsLoading(true);
      }
      setError(null);
    };
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError("Error cargando la transmisión. Intente nuevamente.");
    };
    const onAbort = () => setIsLoading(false);
    const onStalled = () => setIsLoading(false);

    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    audio.addEventListener("abort", onAbort);
    audio.addEventListener("stalled", onStalled);

    return () => {
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("abort", onAbort);
      audio.removeEventListener("stalled", onStalled);
    };
  }, [isPlaying]);

  // Volume increment/decrement functions
  const increaseVolume = useCallback(() => {
    setVolume((prev) => Math.min(prev + 0.01, 1));
  }, []);

  const decreaseVolume = useCallback(() => {
    setVolume((prev) => Math.max(prev - 0.01, 0));
  }, []);

  // Start continuous volume change
  const startVolumeChange = useCallback(
    (direction: "increase" | "decrease") => {
      // Initial change
      if (direction === "increase") {
        setIsIncreasing(true);
        increaseVolume();
      } else {
        setIsDecreasing(true);
        decreaseVolume();
      }

      // Set up interval for continuous changes
      intervalRef.current = setInterval(() => {
        if (direction === "increase") {
          increaseVolume();
        } else {
          decreaseVolume();
        }
      }, 100); // Change every 100ms while holding
    },
    [increaseVolume, decreaseVolume],
  );

  // Stop continuous volume change
  const stopVolumeChange = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsIncreasing(false);
    setIsDecreasing(false);
  }, []);

  // Global mouse up listener to stop volume changes when releasing anywhere
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      stopVolumeChange();
    };

    const handleGlobalTouchEnd = () => {
      stopVolumeChange();
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stopVolumeChange]);

  // Actualizar volumen en audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Cleanup effect to reset loading state on unmount
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsPlaying(false);
    };
  }, []);

  // Reset loading state when component becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isLoading && !isPlaying) {
        setIsLoading(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isLoading, isPlaying]);

  // Keyboard shortcuts for volume control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keys when not focused on input elements
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          increaseVolume();
          break;
        case "ArrowDown":
          e.preventDefault();
          decreaseVolume();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [increaseVolume, decreaseVolume]);

  // Función para reproducir / pausar
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        setError(null);

        // Add timeout to prevent infinite loading
        const playPromise = audio.play();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000),
        );

        await Promise.race([playPromise, timeoutPromise]);
        setIsPlaying(true);
      } catch (e) {
        const errorMessage =
          e instanceof Error && e.message === "Timeout"
            ? "Tiempo de espera agotado. Intente nuevamente."
            : "No se pudo iniciar la reproducción.";
        setError(errorMessage);
        console.error("Audio play error:", e);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isPlaying]);

  return (
    <section aria-label="Reproductor de radio online" className="relative">
      <div className="relative w-full max-w-xs mx-auto">
        <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg shadow-black/5 p-6 space-y-4">
          <audio ref={audioRef} src={radioUrl} preload="none" />

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border border-muted-foreground/20 border-t-muted-foreground/60" />
            </div>
          )}

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="sm"
              className="h-9 w-9 rounded-full bg-muted/30 hover:bg-muted/50 border border-border/30 shadow-sm transition-all duration-200 hover:shadow-md"
              disabled={isLoading}
              aria-label={isPlaying ? "Pausar radio" : "Reproducir radio"}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border border-muted-foreground/30 border-t-muted-foreground/60" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4 text-foreground/80" />
              ) : (
                <Play
                  className="h-4 w-4 ml-0.5 text-foreground/80"
                  fill="currentColor"
                />
              )}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-2">
            <Button
              onMouseDown={() => startVolumeChange("decrease")}
              onMouseUp={stopVolumeChange}
              onMouseLeave={stopVolumeChange}
              onTouchStart={() => startVolumeChange("decrease")}
              onTouchEnd={stopVolumeChange}
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-md bg-muted/20 hover:bg-muted/30 border border-border/20 transition-all duration-200 ${
                isDecreasing ? "bg-muted/40 scale-95" : ""
              }`}
              aria-label="Disminuir volumen"
            >
              <Minus className="h-3 w-3 text-foreground/60" />
            </Button>

            <div className="w-8 text-center">
              <span className="text-xs text-muted-foreground/60 font-medium">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <Button
              onMouseDown={() => startVolumeChange("increase")}
              onMouseUp={stopVolumeChange}
              onMouseLeave={stopVolumeChange}
              onTouchStart={() => startVolumeChange("increase")}
              onTouchEnd={stopVolumeChange}
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-md bg-muted/20 hover:bg-muted/30 border border-border/20 transition-all duration-200 ${
                isIncreasing ? "bg-muted/40 scale-95" : ""
              }`}
              aria-label="Aumentar volumen"
            >
              <Plus className="h-3 w-3 text-foreground/60" />
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <p className="text-center text-xs text-muted-foreground/70 font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
