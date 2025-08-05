"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Radio, Music } from "lucide-react";
import { Button } from "app/components/ui/button";
import { Slider } from "app/components/ui/slider";

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    artist: string;
    isLoading: boolean;
  }>({
    title: "Unknown Track",
    artist: "Unknown Artist",
    isLoading: false,
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  const radioUrl = "https://radio.m1n.land/";
  const stationName = "M1n Radio Station";

  // Function to fetch current track info
  const fetchCurrentTrack = useCallback(async () => {
    const timeoutId = setTimeout(() => {
      // Force stop loading after 5 seconds
      setCurrentTrack(prev => ({
        ...prev,
        isLoading: false,
        title: prev.title || "Live Stream",
        artist: prev.artist || stationName,
      }));
    }, 5000);

    try {
      setCurrentTrack(prev => ({ ...prev, isLoading: true }));
      
      // MPD-specific endpoints and common radio stream endpoints
      const metadataEndpoints = [
        // MPD HTTP endpoints
        `${radioUrl}status`,
        `${radioUrl}currentsong`,
        `${radioUrl}stats.json`,
        `${radioUrl}mpd/status`,
        `${radioUrl}api/status`,
        // Common radio endpoints
        `${radioUrl}status-json.xsl`,
        `${radioUrl}status.json`,
        `${radioUrl}stats`,
        `${radioUrl}api/nowplaying`,
      ];

      let trackInfo: { title: string; artist: string } | null = null;

      // Try API endpoints with shorter timeout per request
      for (const endpoint of metadataEndpoints) {
        try {
          const controller = new AbortController();
          const requestTimeout = setTimeout(() => controller.abort(), 2000);
          
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, text/html, */*',
              'Cache-Control': 'no-cache',
            },
            signal: controller.signal,
          });

          clearTimeout(requestTimeout);

          if (response.ok) {
            const contentType = response.headers.get('content-type') || '';
            let data;
            
            if (contentType.includes('application/json')) {
              data = await response.json();
              trackInfo = parseJSONMetadata(data);
            } else {
              data = await response.text();
              trackInfo = parseTextMetadata(data, endpoint);
            }
            
            if (trackInfo) {
              console.log('Found track info from:', endpoint, trackInfo);
              break;
            }
          }
        } catch (e) {
          if (e.name === 'AbortError') {
            console.log('Request timeout for:', endpoint);
          }
          continue; // Try next endpoint
        }
      }

      clearTimeout(timeoutId);

      if (trackInfo) {
        setCurrentTrack({
          title: trackInfo.title || "Unknown Track",
          artist: trackInfo.artist || "Unknown Artist",
          isLoading: false,
        });
      } else {
        // Fallback
        setCurrentTrack({
          title: "Live Stream",
          artist: stationName,
          isLoading: false,
        });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error fetching track info:', error);
      setCurrentTrack({
        title: "Live Stream",
        artist: stationName,
        isLoading: false,
      });
    }
  }, [radioUrl, stationName]);

  // Parse JSON metadata from various sources
  const parseJSONMetadata = (data: any): { title: string; artist: string } | null => {
    try {
      // MPD status format
      if (data.Title && data.Artist) {
        return { title: data.Title, artist: data.Artist };
      }
      
      // MPD currentsong format
      if (data.title && data.artist) {
        return { title: data.title, artist: data.artist };
      }
      
      // Icecast JSON format
      if (data.icestats?.source) {
        const source = Array.isArray(data.icestats.source) 
          ? data.icestats.source[0] 
          : data.icestats.source;
        const title = source.title || source.song || '';
        return parseTitleArtist(title);
      }
      
      // Generic JSON formats
      if (data.title || data.song || data.track) {
        const title = data.title || data.song || data.track;
        const artist = data.artist || data.performer;
        return { title, artist };
      }
      
      // Direct title-artist format
      if (data.current_track) {
        return parseTitleArtist(data.current_track);
      }
      
      // MPD-style nested format
      if (data.status?.song) {
        return parseTitleArtist(data.status.song);
      }
      
    } catch (e) {
      console.error('Error parsing JSON metadata:', e);
    }
    
    return null;
  };

  // Parse text metadata (MPD output, plain text, etc.)
  const parseTextMetadata = (data: string, endpoint: string): { title: string; artist: string } | null => {
    try {
      if (!data || typeof data !== 'string') return null;
      
      const text = data.trim();
      
      // MPD status output format (key: value pairs)
      if (text.includes('Title:') || text.includes('Artist:')) {
        const lines = text.split('\n');
        let title = '';
        let artist = '';
        
        for (const line of lines) {
          const [key, ...valueParts] = line.split(':');
          const value = valueParts.join(':').trim();
          
          if (key.trim().toLowerCase() === 'title') {
            title = value;
          } else if (key.trim().toLowerCase() === 'artist') {
            artist = value;
          }
        }
        
        if (title || artist) {
          return { title: title || 'Unknown Track', artist: artist || 'Unknown Artist' };
        }
      }
      
      // Try parsing as single line title-artist format
      return parseTitleArtist(text);
      
    } catch (e) {
      console.error('Error parsing text metadata:', e);
    }
    
    return null;
  };

  // Parse "Artist - Title" or "Title - Artist" format
  const parseTitleArtist = (fullTitle: string): { title: string; artist: string } | null => {
    if (!fullTitle || fullTitle === '') return null;
    
    const separators = [' - ', ' – ', ' — ', ': ', ' | '];
    
    for (const sep of separators) {
      if (fullTitle.includes(sep)) {
        const parts = fullTitle.split(sep);
        if (parts.length >= 2) {
          // Common format: "Artist - Title"
          return {
            artist: parts[0].trim(),
            title: parts.slice(1).join(sep).trim(),
          };
        }
      }
    }
    
    // If no separator found, treat as title only
    return {
      title: fullTitle,
      artist: stationName,
    };
  };

  // Efecto para manejar eventos audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };
    const onCanPlay = () => {
      setIsLoading(false);
    };
    const onLoadedData = () => {
      setIsLoading(false);
    };
    const onError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError("Error cargando la transmisión. Intente nuevamente.");
    };
    const onAbort = () => {
      setIsLoading(false);
    };
    const onStalled = () => {
      setIsLoading(false);
    };

    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("error", onError);
    audio.addEventListener("abort", onAbort);
    audio.addEventListener("stalled", onStalled);

    return () => {
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("abort", onAbort);
      audio.removeEventListener("stalled", onStalled);
    };
  }, []);

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

  // Fetch track info when playing starts and periodically
  useEffect(() => {
    if (isPlaying) {
      // Fetch immediately
      fetchCurrentTrack();
      
      // Then fetch every 30 seconds
      const interval = setInterval(fetchCurrentTrack, 30000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, fetchCurrentTrack]);

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
          
          {/* Now Playing section */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <Music className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              {currentTrack.isLoading ? (
                <span className="text-muted-foreground">Loading track info...</span>
              ) : (
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    {currentTrack.title}
                  </p>
                  <p className="text-muted-foreground">
                    by {currentTrack.artist}
                  </p>
                </div>
              )}
            </div>
          </div>
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
