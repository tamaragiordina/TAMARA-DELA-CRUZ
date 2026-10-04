import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-subtle mt-20 pt-8 pb-12 text-slate-500 dark:text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-slate-900 dark:text-slate-200 font-serif tracking-wider font-medium">
            TAMARA DELA CRUZ
          </span>
          <span>&middot;</span>
          <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#about" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">About</a>
          <a href="#reels" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Showcase</a>
          <a href="#podcast" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Podcast</a>
          <a href="#songwriting" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Music Production</a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Contact</a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-subtle hover:border-slate-400 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
