"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "app/components/ui/button";
import { Slider } from "app/components/ui/slider";




export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Cambiar volumen desde slider
  const onVolumeChange = useCallback(
    (value: number[]) => {
      const newVolume = value[0] / 100;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    },
    [isMuted],
  );

  // Actualizar volumen en audio y estado muted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

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
      if (document.visibilityState === 'visible' && isLoading && !isPlaying) {
        setIsLoading(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isLoading, isPlaying]);



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
          setTimeout(() => reject(new Error('Timeout')), 10000)
        );

        await Promise.race([playPromise, timeoutPromise]);
        setIsPlaying(true);
      } catch (e) {
        const errorMessage = e instanceof Error && e.message === 'Timeout'
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



  // Botón mute/unmute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.7); // fallback volumen si estaba a 0
    } else {
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  return (
    <section
      aria-label="Reproductor de radio online"
      className="relative"
    >
      {/* Este div centrará únicamente el reproductor */}
      <div className="relative w-full max-w-sm mx-auto">
        <div className="p-3 space-y-3">
            <audio ref={audioRef} src={radioUrl} preload="none" />


            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
              </div>
            )}


            {/* Botón reproducir/pausar */}
            <div className="flex justify-center">
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="lg"
                className="h-12 w-12 rounded-full"
                disabled={isLoading}
                aria-label={isPlaying ? "Pausar radio" : "Reproducir radio"}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-foreground border-t-transparent" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                )}
              </Button>
            </div>

            {/* Control de volumen */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <div className="flex-1">
                <Slider
                  value={isMuted ? [0] : [Math.round(volume * 100)]}
                  onValueChange={onVolumeChange}
                  max={100}
                  step={1}
                  className="w-full"
                  aria-label="Volumen"
                />
              </div>
            </div>



            {/* Error */}
            {error && (
              <p className="text-center text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>
    </section>
  );
}
