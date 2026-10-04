import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme, onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Showcase', href: '#reels' },
    { label: 'Podcast', href: '#podcast' },
    { label: 'Music Production', href: '#songwriting' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-surface border-b border-subtle transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-3 group focus-visible:outline-none">
          <span className="w-9 h-9 rounded-full overflow-hidden border border-subtle flex items-center justify-center bg-black group-hover:border-[#D4AF7A] transition-all shadow-2xs shrink-0">
            <img
              src="/profile-logo.svg"
              alt="Tamara Dela Cruz"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/Profile%20Photo.png';
              }}
            />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-serif tracking-wider font-medium text-slate-900 dark:text-white group-hover:text-[#D4AF7A] transition-colors whitespace-nowrap">
              TAMARA DELA CRUZ
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Music Producer &amp; Sound Designer
            </span>
          </div>
        </a>

        {/* Zone 2: Clean nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 dark:hover:text-white transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-subtle transition-all cursor-pointer"
            title={darkMode ? 'Switch to light studio theme' : 'Switch to dark studio theme'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#D4AF7A]" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-subtle hover:border-[#D4AF7A] text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Book Inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF7A]" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t border-subtle bg-white dark:bg-[#121418] space-y-3 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-700 dark:text-slate-300 hover:text-[#D4AF7A] transition-colors py-1 text-xs"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-subtle flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="text-xs text-[#D4AF7A] hover:underline"
            >
              &rarr; Start Project Inquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
