import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

export const StudioSection: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <span className="text-xs text-[#9E6A1B] dark:text-[#D4AF7A] font-semibold uppercase tracking-widest block mb-1">
          01. About
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white tracking-tight">
          Profile
        </h2>
      </div>

      {/* Main Content: Side-by-Side Portrait & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Profile Photo Card (Cols 1-5) */}
        <div className="lg:col-span-5 w-full max-w-sm mx-auto lg:mx-0">
          <div className="relative rounded-3xl overflow-hidden border border-subtle bg-white dark:bg-[#121418] shadow-lg transition-all duration-300 hover:border-[#D4AF7A]/50">
            {/* Portrait Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-[#181B22]">
              <img
                src="/tamara-profile.jpg"
                alt="Tamara Dela Cruz"
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/tamara%20dela%20cruz%20profile.jpg';
                }}
              />
            </div>
          </div>
        </div>

        {/* Bio Text & Achievements (Cols 6-12) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            <p>
              I’m a Music Producer, Songwriter, Sound Designer, and Sound Engineer from Quezon City, Philippines. I trained in Electronic Music Production and started offering my services to clients in 2017.
            </p>
            <p>
              Since then, I’ve worked on film projects featured in major local festivals like MMFF, Cinemalaya, CinemaOne Originals, and Pista ng Pelikulang Pilipino. Later transitioned to other audio-post production work such as Podcasts, Audiobooks, and Game audio. I also enjoy writing and producing my own music, which is available on all major streaming platforms.
            </p>
          </div>

          {/* Highlights & Festival Credits */}
          <div className="pt-2 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E6A1B] dark:text-[#D4AF7A]">
              <Award className="w-4 h-4 text-[#D4AF7A]" />
              <span>Awards &amp; Special Participations</span>
            </div>

            {/* Featured Recognitions */}
            <div className="space-y-2.5">
              {/* BINIverse and Chorus */}
              <a
                href="https://www.youtube.com/playlist?list=PLwPOcpjobYWW_R6vBHPNu5-MQyY3oWsrE"
                target="_blank"
                rel="noreferrer"
                title="Watch BINIverse and Chorus playlist on YouTube"
                className="group block p-4 rounded-2xl border border-[#D4AF7A]/30 bg-white dark:bg-[#121418] shadow-xs space-y-1.5 transition-all hover:border-[#D4AF7A] hover:bg-slate-50 dark:hover:bg-[#15181e] cursor-pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF7A] group-hover:scale-125 transition-transform" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#D4AF7A] transition-colors">
                      BINIverse and Chorus &mdash; Top 8 Finalist
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#9E6A1B]/10 dark:bg-[#D4AF7A]/15 text-[#9E6A1B] dark:text-[#D4AF7A] font-medium border border-[#D4AF7A]/20">
                      2026
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-[#D4AF7A] transition-colors">
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3 text-[#D4AF7A]" />
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-4">
                  Docu-series songwriting festival by Star Music and ABS-CBN &mdash; for 2 song entries <span className="font-medium text-slate-800 dark:text-slate-200">&ldquo;Remember Us&rdquo;</span> and <span className="font-medium text-slate-800 dark:text-slate-200">&ldquo;LMK&rdquo;</span>
                </p>
              </a>

              {/* Pista ng Pelikulang Pilipino */}
              <a
                href="https://www.youtube.com/watch?v=APVmMoX5cb4&t=940s"
                target="_blank"
                rel="noreferrer"
                title="Watch on YouTube"
                className="group block p-4 rounded-2xl border border-[#D4AF7A]/30 bg-white dark:bg-[#121418] shadow-xs space-y-1.5 transition-all hover:border-[#D4AF7A] hover:bg-slate-50 dark:hover:bg-[#15181e] cursor-pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF7A] group-hover:scale-125 transition-transform" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#D4AF7A] transition-colors">
                      Pista ng Pelikulang Pilipino &mdash; Best Musical Score
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#9E6A1B]/10 dark:bg-[#D4AF7A]/15 text-[#9E6A1B] dark:text-[#D4AF7A] font-medium border border-[#D4AF7A]/20">
                      Nominee, 2020
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-[#D4AF7A] transition-colors">
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3 text-[#D4AF7A]" />
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-4">
                  Film: <span className="font-medium text-slate-800 dark:text-slate-200">&ldquo;Blood Hunters: Rise of the Hybrids&rdquo;</span>
                </p>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
