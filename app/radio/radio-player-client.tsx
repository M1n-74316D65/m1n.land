"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "app/components/ui/button";





export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
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
    },
    [],
  );

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
            <div className="flex items-center">
              <div className="flex-1">
                <div className="relative w-full h-1 bg-muted/40 rounded-full">
                  {/* Slider thumb dot */}
                  <div
                    className="absolute top-1/2 w-3 h-3 bg-background border border-border rounded-full shadow-sm transition-all duration-200 hover:shadow-md"
                    style={{
                      left: `${Math.round(volume * 100)}%`,
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                  />

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={Math.round(volume * 100)}
                    onChange={(e) => onVolumeChange([parseInt(e.target.value)])}
                    className="absolute inset-0 w-full h-full cursor-pointer appearance-none bg-transparent"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      outline: 'none'
                    }}
                    aria-label="Volumen"
                  />

                  {/* Hide default browser thumb */}
                  <style jsx>{`
                    input[type="range"]::-webkit-slider-thumb {
                      -webkit-appearance: none !important;
                      appearance: none !important;
                      width: 0 !important;
                      height: 0 !important;
                      background: transparent !important;
                    }
                    input[type="range"]::-moz-range-thumb {
                      width: 0 !important;
                      height: 0 !important;
                      border: none !important;
                      background: transparent !important;
                    }
                    input[type="range"]::-ms-thumb {
                      width: 0 !important;
                      height: 0 !important;
                      background: transparent !important;
                    }
                  `}</style>
                </div>
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
