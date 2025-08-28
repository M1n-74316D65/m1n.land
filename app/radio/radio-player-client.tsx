"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "app/components/ui/button";
import { Slider } from "app/components/ui/slider";
import { Progress } from "app/components/ui/progress";
import BlurFade from "app/components/ui/magicui/blur-fade";

export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const radioUrl = "https://radio.m1n.land/";
  const stationName = "M1n Radio Station";
  
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    artist: string;
    isLoading: boolean;
  }>({
    title: "Live Stream",
    artist: stationName,
    isLoading: false,
  });

  // Function to fetch current track info from MPD
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

      // Try MPD protocol first (direct connection)
      let trackInfo: { title: string; artist: string } | null = null;

      // Try MPD.FM HTTP interface first (most reliable for browser)
      setConnectionStatus("Connecting to MPD...");
      const mpdFmEndpoints = [
        `${radioUrl}:4200/api/currentsong`,     // MPD.FM default port
        `${radioUrl}/api/currentsong`,          // If proxied through web server
        `${radioUrl}:4200/currentsong`,         // Alternative MPD.FM endpoint
        `${radioUrl}/currentsong`,               // Proxied endpoint
      ];

      // Try MPD.FM HTTP endpoints first (most reliable)
      for (const endpoint of mpdFmEndpoints) {
        try {
          console.log('Trying MPD HTTP endpoint:', endpoint);
          setConnectionStatus(`Trying ${endpoint}...`);

          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Cache-Control': 'no-cache',
            },
            signal: AbortSignal.timeout(3000),
          });

          if (response.ok) {
            const contentType = response.headers.get('content-type') || '';
            let data;

            if (contentType.includes('application/json')) {
              data = await response.json();
              trackInfo = parseJSONMetadata(data);
            } else {
              data = await response.text();
              // Try parsing as MPD response first, then fallback to text parsing
              trackInfo = parseMPDResponse(data) || parseTextMetadata(data, endpoint);
            }

            if (trackInfo) {
              console.log('Found track info from MPD.FM:', trackInfo);
              setConnectionStatus("Connected to MPD.FM ✓");
              break;
            }
          }
        } catch (error) {
          console.log(`HTTP endpoint failed for ${endpoint}:`, error.message);
          continue;
        }
      }

      // If HTTP endpoints failed, try direct MPD protocol (less likely to work from browser)
      if (!trackInfo) {
        setConnectionStatus("HTTP failed, trying direct MPD...");
        const mpdDirectEndpoints = [
          'http://radio.m1n.land:6600',
          `${radioUrl}:6600`,
        ];

        for (const mpdEndpoint of mpdDirectEndpoints) {
          try {
            console.log('Trying direct MPD endpoint:', mpdEndpoint);
            setConnectionStatus(`Trying direct MPD ${mpdEndpoint}...`);

            const mpdResponse = await fetch(mpdEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain',
              },
              body: 'currentsong\n',
              signal: AbortSignal.timeout(2000),
            });

            if (mpdResponse.ok) {
              const mpdData = await mpdResponse.text();
              console.log('MPD raw response:', mpdData);
              trackInfo = parseMPDResponse(mpdData);
              if (trackInfo) {
                console.log('Found track info from direct MPD:', trackInfo);
                setConnectionStatus("Connected to MPD directly ✓");
                break;
              }
            }
          } catch (mpdError) {
            console.log(`Direct MPD connection failed for ${mpdEndpoint}:`, mpdError.message);
            continue;
          }
        }
      }

      if (!trackInfo) {
        setConnectionStatus("MPD.FM failed, trying direct MPD...");
        console.log('All MPD.FM connections failed, trying direct MPD protocol...');
      }

      // If MPD direct connection failed, try HTTP endpoints
      if (!trackInfo) {
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
      }

      clearTimeout(timeoutId);

      if (trackInfo) {
        setCurrentTrack({
          title: trackInfo.title || "Live Stream",
          artist: trackInfo.artist || stationName,
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
          return { title: title || 'Live Stream', artist: artist || stationName };
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

  // Parse MPD protocol response (key: value format)
  const parseMPDResponse = (data: string): { title: string; artist: string } | null => {
    try {
      if (!data || typeof data !== 'string') return null;

      const lines = data.split('\n');
      let title = '';
      let artist = '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === 'OK' || trimmed === '') continue;

        const colonIndex = trimmed.indexOf(':');
        if (colonIndex > 0) {
          const key = trimmed.substring(0, colonIndex).trim().toLowerCase();
          const value = trimmed.substring(colonIndex + 1).trim();

          if (key === 'title') {
            title = value;
          } else if (key === 'artist') {
            artist = value;
          }
        }
      }

      if (title || artist) {
        return {
          title: title || 'Live Stream',
          artist: artist || stationName
        };
      }

      return null;
    } catch (e) {
      console.error('Error parsing MPD response:', e);
      return null;
    }
  };

  // Efecto para manejar eventos audio
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
  }, [isPlaying]);

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
    <section
      aria-label="Reproductor de radio online"
      className="relative"
    >
      {/* Este div centrará únicamente el reproductor */}
      <BlurFade delay={0.25} inView>
        <div className="relative w-full max-w-sm mx-auto">
          <div className="p-6 space-y-6">
              <audio ref={audioRef} src={radioUrl} preload="none" />


              {/* Loading Progress */}
              {isLoading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Loading stream...</span>
                    <span>Please wait</span>
                  </div>
                  <Progress value={undefined} className="h-2" />
                </div>
              )}


              {/* Botón reproducir/pausar */}
              <div className="flex justify-center">
                <Button
                  onClick={togglePlay}
                  className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 shadow-[0_4px_14px_0_rgb(0,0,0,0.3)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,0.4)] dark:shadow-[0_4px_14px_0_rgb(255,255,255,0.1)] dark:hover:shadow-[0_6px_20px_0_rgb(255,255,255,0.15)] hover:-translate-y-0.5"
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
                  className="p-2 hover:bg-accent transition-all duration-200 shadow-[0_2px_8px_0_rgb(0,0,0,0.15)] hover:shadow-[0_4px_12px_0_rgb(0,0,0,0.2)] dark:shadow-[0_2px_8px_0_rgb(255,255,255,0.1)] dark:hover:shadow-[0_4px_12px_0_rgb(255,255,255,0.15)] hover:-translate-y-0.5"
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

              {/* Status */}
              {isPlaying && (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="text-center text-sm text-destructive">
                  {error}
                </p>
              )}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}