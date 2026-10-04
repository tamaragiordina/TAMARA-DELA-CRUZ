import React from 'react';
import { ExternalLink, Mic, CheckCircle2, Sliders } from 'lucide-react';
import { SpotifyEmbedInfo } from '../utils/spotifyHelper';
import { SoundCloudRawPlayer } from './SoundCloudRawPlayer';

interface PodcastSectionProps {
  spotifyInfo: SpotifyEmbedInfo;
}

export const PodcastSection: React.FC<PodcastSectionProps> = ({
  spotifyInfo,
}) => {
  const embedUrl = `https://open.spotify.com/embed/${spotifyInfo.type}/${spotifyInfo.id}?utm_source=generator&theme=0`;
  const spotifyDirectUrl = `https://open.spotify.com/${spotifyInfo.type}/${spotifyInfo.id}`;

  const engineeringCapabilities = [
    {
      title: 'Dialogue Restoration & Spectral Cleanup',
      detail: 'iZotope RX Advanced: targeted de-reverb, ambient noise reduction, plosive dampening, and surgical mouth de-click.',
    },
    {
      title: 'Broadcast Loudness Normalization',
      detail: 'Calibrated to international podcast standards (-16 LUFS integrated stereo / -19 LUFS mono, -1.0 dBFS True Peak).',
    },
    {
      title: 'Multitrack Leveling & Vocal Dynamics',
      detail: 'Cohesive host and guest leveling, dynamic sidechain ducking, transparent tonal balancing, and subtle analog warmth modeling.',
    },
  ];

  return (
    <section id="podcast" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-subtle pb-4 gap-2">
        <div>
          <span className="text-xs text-[#9E6A1B] dark:text-[#D4AF7A] font-semibold uppercase tracking-widest block mb-1">
            03. Podcast
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white tracking-tight">
            Audio Editing &amp; Engineer
          </h2>
        </div>

        {/* Direct Spotify shortcut */}
        <div className="flex items-center gap-3">
          <a
            href={spotifyDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-subtle hover:border-[#D4AF7A] text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Open in Spotify</span>
            <ExternalLink className="w-3 h-3 text-[#D4AF7A]" />
          </a>
        </div>
      </div>

      {/* Grid: Embedded Spotify Player, SoundCloud Raw Audio Player & Engineering Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Embedded Spotify Player & SoundCloud Raw Audio Player (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Mastered Broadcast Episode (Spotify) */}
          <div className="rounded-2xl border border-subtle bg-white dark:bg-[#121418]/60 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
              <span className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-[#D4AF7A]" />
                <span className="text-slate-900 dark:text-white font-medium">Featured Podcast Episode</span>
              </span>
              <span className="text-[#D4AF7A] text-[11px] font-medium">Direct Spotify Player</span>
            </div>

            {/* Embedded Spotify Episode Player Iframe */}
            <div className="w-full overflow-hidden rounded-xl bg-[#0B0C0E]">
              <iframe
                title="Spotify Podcast Episode Player"
                src={embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <span>High-Fidelity Dialogue Master</span>
              <span className="text-slate-600 dark:text-slate-400">Target: -16 LUFS</span>
            </div>
          </div>

          {/* 2. Simple Playback Raw Audio Player (Clean Design, No Profile Photo, No Filename, No Logo) */}
          <SoundCloudRawPlayer />

        </div>

        {/* Right Column: Audio Engineering & Post-Production Disciplines (Cols 8-12) */}
        <div className="lg:col-span-5 rounded-2xl border border-subtle bg-white dark:bg-[#121418]/60 p-6 space-y-5 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E6A1B] dark:text-[#D4AF7A]">
              <Sliders className="w-3.5 h-3.5" />
              <span>POST-PRODUCTION WORKFLOW</span>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white tracking-tight">
              Surgical Podcast Engineering
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Transforming raw audio into high-quality, polished, and streaming-ready masters released across Apple Podcasts, Spotify, and all major podcast streaming platforms.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {engineeringCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-3 rounded-xl border border-subtle bg-slate-50 dark:bg-[#0B0C0E]/50 space-y-1"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF7A] shrink-0" />
                  <span>{cap.title}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
