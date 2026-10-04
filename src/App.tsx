import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReelSection } from './components/ReelSection';
import { PodcastSection } from './components/PodcastSection';
import { SongwritingSection } from './components/SongwritingSection';
import { StudioSection } from './components/StudioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { DEMO_REELS } from './data/portfolioData';
import { SpotifyEmbedInfo } from './utils/spotifyHelper';

const DEFAULT_SPOTIFY_INFO: SpotifyEmbedInfo = {
  type: 'episode',
  id: '53iHp6PPwvmaUWK0h5tHFL',
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [musicVideoId, setMusicVideoId] = useState(DEMO_REELS.music.defaultVideoId);
  const [gameVideoId, setGameVideoId] = useState(DEMO_REELS.game.defaultVideoId);
  const [spotifyInfo, setSpotifyInfo] = useState<SpotifyEmbedInfo>(DEFAULT_SPOTIFY_INFO);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Load saved IDs and theme
  useEffect(() => {
    const savedMusic = localStorage.getItem('tamara_music_reel_id');
    const savedGame = localStorage.getItem('tamara_game_reel_id');
    if (savedMusic && savedMusic !== 'ScMzIvxBSi4') {
      setMusicVideoId(savedMusic);
    } else {
      setMusicVideoId(DEMO_REELS.music.defaultVideoId);
      localStorage.setItem('tamara_music_reel_id', DEMO_REELS.music.defaultVideoId);
    }
    if (savedGame && savedGame !== '_OBlgSz8sSM') {
      setGameVideoId(savedGame);
    } else {
      setGameVideoId(DEMO_REELS.game.defaultVideoId);
      localStorage.setItem('tamara_game_reel_id', DEMO_REELS.game.defaultVideoId);
    }

    const savedSpotify = localStorage.getItem('tamara_spotify_info');
    if (savedSpotify) {
      try {
        const parsed = JSON.parse(savedSpotify);
        if (parsed && parsed.id && parsed.id !== '4rOoJ6Egrf8K2IrywzwOMk' && parsed.type) {
          setSpotifyInfo(parsed);
        } else {
          setSpotifyInfo(DEFAULT_SPOTIFY_INFO);
          localStorage.setItem('tamara_spotify_info', JSON.stringify(DEFAULT_SPOTIFY_INFO));
        }
      } catch {
        setSpotifyInfo(DEFAULT_SPOTIFY_INFO);
      }
    } else {
      localStorage.setItem('tamara_spotify_info', JSON.stringify(DEFAULT_SPOTIFY_INFO));
    }

    const savedTheme = localStorage.getItem('tamara_theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setDarkMode(true);
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('tamara_theme', 'dark');
      showToast('Switched to Dark Studio Mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('tamara_theme', 'light');
      showToast('Switched to Light Studio Mode');
    }
  };

  const handleScrollToReel = (reelId: 'music' | 'game') => {
    const targetElement = document.getElementById(reelId === 'music' ? 'music-reel' : 'game-reel');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPodcast = () => {
    const targetElement = document.getElementById('podcast');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0B0C0E] text-slate-300' : 'bg-[#FAFAFA] text-slate-800'}`}>
      
      {/* Navigation Top Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-6 space-y-24 sm:space-y-32 pt-8 pb-16">
        
        {/* Hero Section */}
        <Hero
          onScrollToReel={handleScrollToReel}
          onScrollToPodcast={handleScrollToPodcast}
        />

        {/* 01. About - Artist & Producer Profile */}
        <StudioSection />

        {/* 02. Showcase - Demo Reels */}
        <ReelSection
          musicVideoId={musicVideoId}
          gameVideoId={gameVideoId}
        />

        {/* 03. Podcast - Audio Editing & Engineer */}
        <PodcastSection
          spotifyInfo={spotifyInfo}
        />

        {/* 04. Songwriting & Music Production - Lyric Video Showcase */}
        <SongwritingSection
          onShowToast={showToast}
        />

        {/* 05. Contact & Inquiries */}
        <ContactSection onShowToast={showToast} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Feedback */}
      <Toast message={toastMessage} />

    </div>
  );
}
