import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Sliders, Music, Waves, Activity } from 'lucide-react';
import { SYNTH_TRACKS } from '../data/portfolioData';
import { audioEngine } from '../utils/audioEngine';

export const AudioShowcase: React.FC = () => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [stemsActive, setStemsActive] = useState<boolean[]>([true, true, true, true]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentTrack = SYNTH_TRACKS[activeTrackIndex];

  // Visualizer drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let destroyed = false;

    const render = () => {
      if (destroyed) return;
      const analyser = audioEngine.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      if (analyser && isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Draw primary gold wave
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#D4AF7A';
        ctx.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Frequency bars overlay
        const freqArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(freqArray);
        const barWidth = (width / 32) - 2;
        ctx.fillStyle = 'rgba(212, 175, 122, 0.25)';

        for (let b = 0; b < 32; b++) {
          const barHeight = (freqArray[b * 2] / 255) * (height / 2);
          ctx.fillRect(b * (barWidth + 2), height - barHeight, barWidth, barHeight);
        }
      } else {
        // Idle gentle waveform
        const time = Date.now() * 0.002;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(140, 140, 140, 0.3)';
        ctx.beginPath();

        for (let x = 0; x < width; x += 2) {
          const y = height / 2 + Math.sin(x * 0.03 + time) * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      destroyed = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      audioEngine.playTrack(currentTrack.id, () => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (index: number) => {
    setActiveTrackIndex(index);
    if (isPlaying) {
      audioEngine.playTrack(SYNTH_TRACKS[index].id, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleToggleStem = (stemIndex: number) => {
    const updated = [...stemsActive];
    updated[stemIndex] = !updated[stemIndex];
    setStemsActive(updated);
    audioEngine.toggleStem(stemIndex, updated[stemIndex]);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  return (
    <section id="audio-player" className="scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-subtle pb-4 gap-2">
        <div>
          <span className="text-xs font-mono text-[#D4AF7A] uppercase tracking-widest block mb-1">
            02 &bull; Interactive Audio Lab
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Synthesizer &amp; Stem Audition
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-500">
          Live Web Audio API Engine &middot; Real-Time Oscilloscope &middot; Multi-Channel Stems
        </p>
      </div>

      <div className="rounded-2xl border border-subtle bg-[#121418]/70 p-5 sm:p-7 space-y-6">
        
        {/* Top Control Bar & Track Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-subtle">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-[#D4AF7A]">{currentTrack.project}</span>
              <span>&middot;</span>
              <span>{currentTrack.genre}</span>
            </div>
            <h3 className="text-xl font-medium text-white tracking-tight">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              {currentTrack.description}
            </p>
          </div>

          {/* Master Transport & Volume */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                isPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-[#D4AF7A] hover:bg-[#E5C495] text-[#0B0C0E]'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Cue</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Audition Audio</span>
                </>
              )}
            </button>

            {/* Volume slider */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-subtle bg-[#0B0C0E]">
              <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume level"
                className="w-20 accent-[#D4AF7A] cursor-pointer"
              />
              <span className="text-[10px] font-mono text-slate-400 w-7 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Oscilloscope Waveform Canvas */}
        <div className="relative rounded-xl border border-subtle bg-[#0B0C0E] overflow-hidden p-3">
          <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-500 z-10">
            <Activity className="w-3 h-3 text-[#D4AF7A]" />
            <span>REAL-TIME FFT OSCILLOSCOPE</span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            )}
          </div>

          <div className="absolute top-3 right-4 text-[10px] font-mono text-slate-500 z-10">
            {isPlaying ? 'DSP SYNTH RUNNING' : 'STANDBY (CLICK AUDITION)'}
          </div>

          <canvas
            ref={canvasRef}
            width={720}
            height={110}
            className="w-full h-24 sm:h-28 block"
          />
        </div>

        {/* Track Selection Tabs & Stem Muting Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Track Selector (Col 1-7) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
              <Music className="w-3.5 h-3.5 text-[#D4AF7A]" />
              <span>Select Audio Cue to Audition:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SYNTH_TRACKS.map((t, idx) => {
                const isSelected = activeTrackIndex === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#D4AF7A] bg-[#181B22] text-white shadow-sm'
                        : 'border-subtle bg-[#0B0C0E]/40 hover:border-slate-500 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200 truncate">
                        {t.title.split('—')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF7A]">
                        {t.duration}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                      {t.genre}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stem Mixing & Solo Console (Col 8-12) */}
          <div className="lg:col-span-5 rounded-xl border border-subtle bg-[#0B0C0E]/60 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#D4AF7A]" />
                <span>Multi-Channel Stem Isolator</span>
              </span>
              <span className="text-[10px] text-slate-500">Mute / Solo</span>
            </div>

            <p className="text-[11px] text-slate-400">
              Toggle individual audio layers on/off in real-time to hear how the acoustic score and sound design were built:
            </p>

            <div className="space-y-2 pt-1">
              {currentTrack.stems.map((stemName, stemIdx) => {
                const isActive = stemsActive[stemIdx];
                return (
                  <div
                    key={stemName}
                    className="flex items-center justify-between p-2 rounded-lg border border-subtle bg-[#121418] text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive && isPlaying ? 'bg-[#D4AF7A] animate-pulse' : 'bg-slate-600'
                        }`}
                      />
                      <span className={isActive ? 'text-slate-200' : 'text-slate-500 line-through'}>
                        {stemName}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleStem(stemIdx)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#181B22] text-[#D4AF7A] border border-[#D4AF7A]/30 hover:border-[#D4AF7A]'
                          : 'bg-[#0B0C0E] text-slate-500 border border-subtle hover:text-slate-300'
                      }`}
                    >
                      {isActive ? 'Active' : 'Muted'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
