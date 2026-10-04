import React from 'react';
import { DEMO_REELS } from '../data/portfolioData';

interface ReelSectionProps {
  musicVideoId: string;
  gameVideoId: string;
}

export const ReelSection: React.FC<ReelSectionProps> = ({
  musicVideoId,
  gameVideoId,
}) => {
  return (
    <section id="reels" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-subtle pb-4 gap-2">
        <div>
          <span className="text-xs text-[#9E6A1B] dark:text-[#D4AF7A] font-semibold uppercase tracking-widest block mb-1">
            02. Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white tracking-tight">
            Demo Reels
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Playable High-Definition Embeds
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* REEL 1: Music Score Demo Reel */}
        <article
          id="music-reel"
          className="scroll-mt-28 rounded-2xl border border-subtle bg-white dark:bg-[#121418]/60 p-5 sm:p-6 space-y-4 transition-all shadow-xs hover:border-slate-300 dark:hover:border-[#2F3543]"
        >
          {/* Header bar */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E6A1B] dark:text-[#D4AF7A] bg-[#9E6A1B]/10 dark:bg-[#D4AF7A]/10 px-2.5 py-0.5 rounded-full">
                {DEMO_REELS.music.category}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {DEMO_REELS.music.subtitle}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white tracking-tight">
              {DEMO_REELS.music.title}
            </h3>
          </div>

          {/* Video Wrapper */}
          <div className="video-wrapper bg-[#0B0C0E] border border-subtle shadow-md">
            <iframe
              id="music-reel-iframe"
              key={`music-${musicVideoId}`}
              src={`https://www.youtube-nocookie.com/embed/${musicVideoId}?rel=0&modestbranding=1`}
              title="Tamara Dela Cruz — Music Score Demo Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>

        {/* REEL 2: Game Sound Design Demo Reel */}
        <article
          id="game-reel"
          className="scroll-mt-28 rounded-2xl border border-subtle bg-white dark:bg-[#121418]/60 p-5 sm:p-6 space-y-4 transition-all shadow-xs hover:border-slate-300 dark:hover:border-[#2F3543]"
        >
          {/* Header bar */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E6A1B] dark:text-[#D4AF7A] bg-[#9E6A1B]/10 dark:bg-[#D4AF7A]/10 px-2.5 py-0.5 rounded-full">
                {DEMO_REELS.game.category}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {DEMO_REELS.game.subtitle}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white tracking-tight">
              {DEMO_REELS.game.title}
            </h3>
          </div>

          {/* Video Wrapper */}
          <div className="video-wrapper bg-[#0B0C0E] border border-subtle shadow-md">
            <iframe
              id="game-reel-iframe"
              key={`game-${gameVideoId}`}
              src={`https://www.youtube-nocookie.com/embed/${gameVideoId}?rel=0&modestbranding=1`}
              title="Tamara Dela Cruz — Game Sound Design Demo Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>

      </div>
    </section>
  );
};
