import React, { useState } from 'react';
import { Copy, Check, Mail, Instagram, Link2 } from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('giordina25@gmail.com');
    setCopied(true);
    onShowToast('Copied giordina25@gmail.com to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="border-b border-subtle pb-4">
        <span className="text-xs text-[#9E6A1B] dark:text-[#D4AF7A] font-semibold uppercase tracking-widest block mb-1">
          05. Contact
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white tracking-tight">
          Contact &amp; Inquiries
        </h2>
      </div>

      <div className="max-w-3xl space-y-6">
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-light">
          Available for original feature film scores, interactive video game audio contracts, sound design, and music production. Feel free to reach out directly via email or connect through social media.
        </p>

        {/* Simple Contact Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          
          {/* Email Address with cute Mail Icon */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] transition-colors shadow-xs">
            <a
              href="mailto:giordina25@gmail.com"
              className="inline-flex items-center gap-2.5 px-3 py-1.5 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors text-sm group"
            >
              <div className="w-7 h-7 rounded-xl bg-[#9E6A1B]/15 dark:bg-[#D4AF7A]/15 text-[#9E6A1B] dark:text-[#D4AF7A] flex items-center justify-center group-hover:bg-[#9E6A1B]/25 dark:group-hover:bg-[#D4AF7A]/25 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium tracking-tight">giordina25@gmail.com</span>
            </a>
            
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Social Media & Links - Icons Only (No Usernames) */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.imdb.com/name/nm9375014/?ref_=ext_shr_lnk"
              target="_blank"
              rel="noreferrer"
              aria-label="IMDb Profile"
              title="IMDb Profile"
              className="w-11 h-11 rounded-2xl border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-100 dark:hover:bg-[#181a1f] text-slate-700 dark:text-slate-300 hover:text-[#D4AF7A] flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.3781 0H1.6218C.7411.0583.0587.7437.0018 1.5953l-.001 20.783c.0585.8761.7125 1.543 1.5559 1.6191A.337.337 0 0 0 1.6016 24h20.7971a.4579.4579 0 0 0 .0437-.002c.8727-.0768 1.5568-.8271 1.5568-1.7085V1.7098c0-.8914-.696-1.6416-1.584-1.7078A.3294.3294 0 0 0 22.3781 0zm0 .496a1.2144 1.2144 0 0 1 1.1252 1.2139v20.5797c0 .6377-.4875 1.1602-1.1045 1.2145H1.6016c-.5967-.0543-1.0645-.5297-1.1053-1.1258V1.6284C.5371 1.0185 1.0184.5364 1.6217.496h20.7564zM4.7954 8.2603v7.3636H2.8899V8.2603h1.9055zm6.5367 0v7.3636H9.6707v-4.9704l-.6711 4.9704H7.813l-.6986-4.8618-.0066 4.8618h-1.668V8.2603h2.468c.0748.4476.1492.9694.2307 1.5734l.2712 1.8713.4407-3.4447h2.4817zm2.9772 1.3289c.0742.0404.122.108.1417.2034.0279.0953.0345.3118.0345.6442v2.8548c0 .4881-.0345.7867-.0955.8954-.0609.1152-.2304.1695-.5018.1695V9.5211c.204 0 .3457.0205.4211.0681zm-.0211 6.0347c.4543 0 .8006-.0265 1.0245-.0742.2304-.0477.4204-.1357.5694-.2648.1556-.1218.2642-.298.3251-.5219.0611-.2238.1021-.6648.1021-1.3224v-2.5832c0-.6986-.0271-1.1668-.0742-1.4039-.041-.237-.1431-.4543-.3126-.6437-.1695-.1973-.4198-.3324-.7456-.421-.3191-.0808-.8542-.1285-1.7694-.1285h-1.4244v7.3636h2.3051zm5.14-1.7827c0 .3523-.0199.5762-.0544.6708-.033.0947-.1894.1424-.3046.1424-.1086 0-.19-.0477-.2238-.1351-.041-.0887-.0609-.2986-.0609-.6238v-1.9469c0-.3324.0199-.5423.0543-.6237.0338-.0808.1086-.122.2171-.122.1153 0 .2709.0412.3114.1425.041.0947.0609.2986.0609.6032v1.8926zm-2.4747-5.5809v7.3636h1.7157l.1152-.4675c.1556.1894.3251.3324.5152.4271.1828.0881.4608.1357.678.1357.3047 0 .5629-.0748.7802-.237.2165-.1562.3589-.3462.4198-.5628.0543-.2173.0887-.543.0887-.9841v-2.0675c0-.4409-.0139-.7324-.0344-.8681-.0199-.1357-.0742-.2781-.1695-.4204-.1021-.1425-.2437-.251-.4272-.3325-.1834-.0742-.3999-.1152-.6576-.1152-.2172 0-.4952.0477-.6846.1285-.1835.0887-.353.2238-.5086.4007V8.2603h-1.8309z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/tamaragiordina/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-11 h-11 rounded-2xl border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-100 dark:hover:bg-[#181a1f] text-slate-700 dark:text-slate-300 hover:text-[#D4AF7A] flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.tiktok.com/@tamaragiordina"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              title="TikTok"
              className="w-11 h-11 rounded-2xl border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-100 dark:hover:bg-[#181a1f] text-slate-700 dark:text-slate-300 hover:text-[#D4AF7A] flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.69a8.18 8.18 0 0 0 4.89 1.6v-3.6z" />
              </svg>
            </a>

            <a
              href="https://lnk.to/tamaragiordinaLOVELY"
              target="_blank"
              rel="noreferrer"
              aria-label="Music & Releases"
              title="Music & Releases (lnk.to)"
              className="w-11 h-11 rounded-2xl border border-subtle bg-white dark:bg-[#121418] hover:border-[#D4AF7A] hover:bg-slate-100 dark:hover:bg-[#181a1f] text-slate-700 dark:text-slate-300 hover:text-[#D4AF7A] flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <Link2 className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
