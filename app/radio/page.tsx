"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { Button } from "app/components/ui/button";
import { Slider } from "app/components/ui/slider";

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const radioUrl = "https://radio.m1n.land/";
  const stationName = "M1n Radio Station";
  const currentShow = "Now Playing: Something";

  // Efecto para manejar eventos audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError("Error cargando la transmisión. Intente nuevamente.");
    };

    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Actualizar volumen en audio y estado muted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Función para reproducir / pausar
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
        setError(null);
      } catch (e) {
        setError("No se pudo iniciar la reproducción.");
        console.error("Audio play error:", e);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
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
    <section aria-label="Reproductor de radio online">
      {/* El título ahora está fuera del contenedor centrado */}
      <h1 className="text-2xl font-semibold mb-8 tracking-tight">My Radio</h1>

      {/* Este div centrará únicamente el reproductor */}
      <div className="w-full max-w-md mx-auto">
        <audio ref={audioRef} src={radioUrl} preload="none" />

        {/* Información estación */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-1 justify-center">
            <Radio className="h-5 w-5 text-red-600" aria-hidden />
            <h2 className="text-lg font-semibold">{stationName}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{currentShow}</p>
        </div>

        {/* Botón reproducir/pausar */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={togglePlay}
            size="lg"
            className="h-16 w-16 rounded-full bg-gradient-to-tr from-red-500 to-red-700 shadow-lg hover:scale-105 transition-transform duration-150 focus:ring-4 focus:ring-red-300"
            disabled={isLoading}
            aria-label={isPlaying ? "Pausar radio" : "Reproducir radio"}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
            )}
          </Button>
        </div>

        {/* Control de volumen */}
        <div
          className="flex items-center gap-4"
          role="group"
          aria-label="Control de volumen"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-accent focus:ring-2 focus:ring-accent"
            aria-pressed={!isMuted}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Volume2 className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
          <div className="flex-1 px-2">
            <Slider
              value={isMuted ? [0] : [Math.round(volume * 100)]}
              onValueChange={onVolumeChange}
              max={100}
              step={1}
              className="w-full"
              aria-label="Volumen"
            />
          </div>
          <span
            className="text-xs text-muted-foreground w-8 text-right tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {isMuted ? 0 : Math.round(volume * 100)}
          </span>
        </div>

        {/* Indicador de estado */}
        <div
          className="flex items-center justify-center gap-2 mt-6"
          aria-live="polite"
        >
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              isPlaying ? "bg-red-600 animate-pulse shadow-lg" : "bg-gray-300"
            }`}
            aria-hidden
          />
          <span className="text-xs text-muted-foreground font-medium">
            {isLoading ? "Cargando..." : isPlaying ? "En vivo" : "Detenido"}
          </span>
        </div>

        {/* Mensaje de error */}
        {error && (
          <p
            role="alert"
            className="mt-4 text-center text-sm text-red-600 font-semibold"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
