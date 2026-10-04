import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Headphones,
} from 'lucide-react';

interface SoundCloudRawPlayerProps {
  trackUrl?: string;
  defaultDuration?: number; // In seconds, e.g. 979 (16:19)
}

// Deterministic audio waveform heights representing natural podcast speech cadence
const WAVEFORM_BARS = [
  14, 22, 18, 28, 42, 65, 55, 30, 16, 24, 48, 72, 85, 60, 34, 18,
  26, 52, 68, 92, 78, 45, 20, 28, 56, 80, 64, 40, 22, 38, 70, 88,
  62, 30, 18, 36, 58, 84, 76, 42, 24, 48, 66, 90, 74, 38, 20, 32,
  54, 78, 86, 58, 28, 16, 34, 62, 80, 66, 36, 22, 44, 68, 50, 26,
];

export const SoundCloudRawPlayer: React.FC<SoundCloudRawPlayerProps> = ({
  trackUrl = 'https%3A//api.soundcloud.com/tracks/2412867843%3Fsecret_token%3Ds-i9mgNMN2jse',
  defaultDuration = 979, // 16 minutes 19 seconds
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(defaultDuration);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRef = useRef<any>(null);

  // Initialize SoundCloud Widget API
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const setupWidget = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (win.SC && win.SC.Widget && iframeRef.current) {
        try {
          const widget = win.SC.Widget(iframeRef.current);
          widgetRef.current = widget;

          widget.bind(win.SC.Widget.Events.READY, () => {
            setIsReady(true);
            widget.getDuration((d: number) => {
              if (d && !isNaN(d) && d > 0) {
                setDuration(Math.floor(d / 1000));
              }
            });
            widget.setVolume(volume * 100);
          });

          widget.bind(win.SC.Widget.Events.PLAY, () => {
            setIsPlaying(true);
          });

          widget.bind(win.SC.Widget.Events.PAUSE, () => {
            setIsPlaying(false);
          });

          widget.bind(win.SC.Widget.Events.FINISH, () => {
            setIsPlaying(false);
            setCurrentTime(0);
          });

          widget.bind(
            win.SC.Widget.Events.PLAY_PROGRESS,
            (data: { currentPosition: number }) => {
              if (data && typeof data.currentPosition === 'number') {
                setCurrentTime(data.currentPosition / 1000);
              }
            }
          );
        } catch {
          // Widget init fallback
        }
      } else {
        timer = setTimeout(setupWidget, 300);
      }
    };

    setupWidget();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = () => {
    if (widgetRef.current) {
      if (isPlaying) {
        widgetRef.current.pause();
        setIsPlaying(false);
      } else {
        widgetRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (widgetRef.current) {
      widgetRef.current.seekTo(seekTime * 1000);
    }
  };

  const handleSkip = (seconds: number) => {
    const nextTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(nextTime);
    if (widgetRef.current) {
      widgetRef.current.seekTo(nextTime * 1000);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (widgetRef.current) {
      widgetRef.current.setVolume(val * 100);
    }
  };

  const toggleMute = () => {
    if (!widgetRef.current) return;
    if (isMuted) {
      const restoreVol = volume || 0.85;
      widgetRef.current.setVolume(restoreVol * 100);
      setIsMuted(false);
    } else {
      widgetRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-2xl border border-subtle bg-[#121418]/60 p-4 sm:p-5 shadow-lg space-y-4">
      
      {/* Hidden SoundCloud Player Iframe - Streams raw audio without external redirect, strictly audio playback */}
      <iframe
        ref={iframeRef}
        title="Raw Audio Player Stream"
        id="sc-raw-widget"
        width="1"
        height="1"
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={`https://w.soundcloud.com/player/?url=${trackUrl}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&show_artwork=false`}
        className="sr-only pointer-events-none opacity-0 absolute -top-9999px -left-9999px"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1 border-b border-subtle/50">
        <span className="flex items-center gap-2">
          <Headphones className="w-3.5 h-3.5 text-[#D4AF7A]" />
          <span className="text-slate-900 dark:text-white font-medium">Raw Audio Audition (Pre-Master)</span>
        </span>
        <span className="text-[#D4AF7A] text-[11px] font-medium">
          Direct Audio Playback
        </span>
      </div>

      {/* Simple, Minimal Waveform Playback Design */}
      <div className="rounded-xl border border-subtle bg-slate-50 dark:bg-[#0B0C0E] p-4 sm:p-5 space-y-4">
        
        {/* Visual Waveform Bar Progress */}
        <div
          className="relative h-14 w-full flex items-center gap-1 cursor-pointer select-none group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newSecs = clickPos * duration;
            setCurrentTime(newSecs);
            if (widgetRef.current) {
              widgetRef.current.seekTo(newSecs * 1000);
            }
          }}
        >
          {WAVEFORM_BARS.map((heightPercent, idx) => {
            const barFraction = idx / WAVEFORM_BARS.length;
            const currentFraction = duration > 0 ? currentTime / duration : 0;
            const isPlayed = barFraction <= currentFraction;

            return (
              <div
                key={idx}
                className="flex-1 flex items-center justify-center h-full"
              >
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-sm transition-colors duration-100 ${
                    isPlayed
                      ? 'bg-[#D4AF7A]'
                      : 'bg-slate-300 dark:bg-slate-700/50 group-hover:bg-slate-400 dark:group-hover:bg-slate-600/60'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Scrubber Range Slider (Invisible Overlay on Touch/Scrub) & Time Indicators */}
        <div className="space-y-1.5">
          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.5"
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek audio"
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF7A]"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="tabular-nums text-slate-800 dark:text-slate-200">{formatTime(currentTime)}</span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">
              {isPlaying ? 'Auditioning Raw Vocal Dynamics' : isReady ? 'Ready for Playback' : 'Loading Audio...'}
            </span>
            <span className="tabular-nums text-slate-600 dark:text-slate-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Audio Transport Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          {/* Playback & Skip Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleSkip(-15)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-transparent hover:border-subtle transition-all cursor-pointer"
              title="Skip backward 15 seconds"
              aria-label="Skip backward 15 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md ${
                isPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-[#D4AF7A] hover:bg-[#E5C495] text-[#0B0C0E]'
              }`}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Raw Audio</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSkip(15)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-subtle transition-all cursor-pointer"
              title="Skip forward 15 seconds"
              aria-label="Skip forward 15 seconds"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-subtle bg-[#121418]">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-white cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#D4AF7A]" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume level"
              className="w-16 sm:w-20 accent-[#D4AF7A] cursor-pointer"
            />
            <span className="text-[10px] font-mono text-slate-400 w-7 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

        </div>

      </div>

      {/* Footer Comparison Note */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
        <span>Raw Uncompressed Take &middot; Natural Vocal Dynamics</span>
        <span className="text-slate-400">A/B Audition Only</span>
      </div>

    </div>
  );
};
