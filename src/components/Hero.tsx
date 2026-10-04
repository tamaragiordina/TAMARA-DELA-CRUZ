import React from 'react';
import { Play, Headphones, Music } from 'lucide-react';

interface HeroProps {
  onScrollToReel: (reelId: 'music' | 'game') => void;
  onScrollToPodcast: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToReel, onScrollToPodcast }) => {
  return (
    <section id="hero" className="pt-6 sm:pt-12 max-w-4xl">
      {/* Editorial Status Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-subtle bg-white/80 dark:bg-[#121418]/60 text-xs font-semibold text-[#9E6A1B] dark:text-[#D4AF7A] mb-6 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9E6A1B] dark:bg-[#D4AF7A] animate-pulse"></span>
        <span>Portfolio &amp; Audio Reel Showcase</span>
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.18] mb-8">
        Tamara Dela Cruz &mdash; crafting emotive cinematic scores and immersive video game soundscapes.
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => onScrollToReel('music')}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-50 dark:hover:bg-[#181a1f] text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-[#9E6A1B] dark:hover:text-[#D4AF7A] transition-all shadow-2xs hover:scale-102 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
          <span>Music Score Reel</span>
        </button>

        <button
          onClick={() => onScrollToReel('game')}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-50 dark:hover:bg-[#181a1f] text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-[#9E6A1B] dark:hover:text-[#D4AF7A] transition-all shadow-2xs hover:scale-102 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
          <span>Game Audio Reel</span>
        </button>

        <button
          onClick={onScrollToPodcast}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-50 dark:hover:bg-[#181a1f] text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-[#9E6A1B] dark:hover:text-[#D4AF7A] transition-all shadow-2xs hover:scale-102 cursor-pointer"
        >
          <Headphones className="w-3.5 h-3.5 text-[#D4AF7A]" />
          <span>Podcast Audio &amp; Engineering</span>
        </button>

        <a
          href="#songwriting"
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-50 dark:hover:bg-[#181a1f] text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-[#9E6A1B] dark:hover:text-[#D4AF7A] transition-all shadow-2xs hover:scale-102 cursor-pointer"
        >
          <Music className="w-3.5 h-3.5 text-[#D4AF7A]" />
          <span>Music Production</span>
        </a>
      </div>
    </section>
  );
};
