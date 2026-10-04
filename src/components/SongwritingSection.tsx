import React, { useState, useEffect } from 'react';
import {
  Music,
  ExternalLink,
  FileText,
} from 'lucide-react';

interface SongwritingSectionProps {
  onShowToast?: (msg: string) => void;
}

// Default featured lyric video embed (mZiyiNGnhYY)
const DEFAULT_LYRIC_VIDEO_ID = 'mZiyiNGnhYY';

export const SongwritingSection: React.FC<SongwritingSectionProps> = () => {
  const [lyricVideoId, setLyricVideoId] = useState(DEFAULT_LYRIC_VIDEO_ID);

  // Load persisted lyric video ID if available
  useEffect(() => {
    const saved = localStorage.getItem('tamara_lyric_video_id');
    if (saved && saved !== 'kJQP7kiw5Fk') {
      setLyricVideoId(saved);
    } else {
      setLyricVideoId(DEFAULT_LYRIC_VIDEO_ID);
      localStorage.setItem('tamara_lyric_video_id', DEFAULT_LYRIC_VIDEO_ID);
    }
  }, []);

  return (
    <section id="songwriting" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-subtle pb-4 gap-2">
        <div>
          <span className="text-xs text-[#9E6A1B] dark:text-[#D4AF7A] font-semibold uppercase tracking-widest block mb-1">
            04. Music Production
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white tracking-tight">
            Digital Single
          </h2>
        </div>

        {/* Action shortcut to open on YouTube */}
        <div className="flex items-center gap-3">
          <a
            href={`https://www.youtube.com/watch?v=${lyricVideoId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-subtle hover:border-[#D4AF7A] text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3 h-3 text-[#D4AF7A]" />
          </a>
        </div>
      </div>

      {/* Embedded Lyric Video Card */}
      <div className="rounded-2xl border border-subtle bg-white dark:bg-[#121418]/60 p-5 sm:p-6 space-y-4 shadow-xs">
        
        {/* Header info */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
          <span className="flex items-center gap-2">
            <Music className="w-3.5 h-3.5 text-[#D4AF7A]" />
            <span className="text-slate-900 dark:text-white font-medium">Featured Lyric Video</span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E6A1B] dark:text-[#D4AF7A] bg-[#9E6A1B]/10 dark:bg-[#D4AF7A]/10 px-2.5 py-0.5 rounded-full">
            Original Release
          </span>
        </div>

        {/* Video Wrapper (16:9 aspect ratio standard for Showcase Reel) */}
        <div className="video-wrapper bg-[#0B0C0E] border border-subtle rounded-xl overflow-hidden shadow-md">
          <iframe
            id="lyric-video-iframe"
            key={`lyric-${lyricVideoId}`}
            src={`https://www.youtube-nocookie.com/embed/${lyricVideoId}?rel=0&modestbranding=1`}
            title="Tamara Dela Cruz — Featured Lyric Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Lyric Video Metadata */}
        <div className="pt-2 border-t border-subtle flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
          <div className="space-y-0.5">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Original Songwriting, Vocal Stems &amp; Full Arrangement
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Lyrics, melody composition, multi-track recording, and final mixdown.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#D4AF7A] shrink-0">
            <FileText className="w-3.5 h-3.5" />
            <span>Lyric Synchronized</span>
          </div>
        </div>

      </div>
    </section>
  );
};

