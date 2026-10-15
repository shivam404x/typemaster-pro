import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Keyboard, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Star, 
  Zap, 
  Palette, 
  Sliders, 
  Music, 
  Award, 
  Crown, 
  Menu, 
  X, 
  Flame, 
  Settings, 
  Check, 
  Trophy, 
  Code2, 
  ChevronRight, 
  Headphones, 
  Radio 
} from 'lucide-react';
import { playKeySound } from '../utils/soundEffects';

export const Navbar = ({
  activeMode,
  setActiveMode,
  currentLesson,
  onOpenLessonDrawer,
  soundProfile,
  setSoundProfile,
  volume,
  setVolume,
  theme,
  setTheme,
  totalStars = 0,
  userLevel = 1,
  userXp = 0,
  isAmbientPlaying,
  onToggleAmbient,
  ambientGenre,
  setAmbientGenre,
  onOpenCertificate,
  onOpenAchievements,
  dailyStreak = 1
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close settings modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settingsOpen]);

  const SOUND_OPTIONS = [
    { id: 'brown', label: 'Cream / Brown', sub: 'Deep Thock', icon: '🟤' },
    { id: 'blue', label: 'Cherry MX Blue', sub: 'Crisp Clicky', icon: '🔵' },
    { id: 'red', label: 'Cherry MX Red', sub: 'Smooth Linear', icon: '🔴' },
    { id: 'typewriter', label: 'Vintage Typewriter', sub: 'Metallic Strike', icon: '📜' },
    { id: 'pop', label: 'Bubble Pop', sub: 'Playful Tone', icon: '🫧' },
    { id: 'mute', label: 'Mute Sound', sub: 'Silent Typing', icon: '🔇' },
  ];

  const THEME_OPTIONS = [
    { id: 'slate', name: 'Moonlight Slate', color: 'bg-indigo-500' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', color: 'bg-cyan-400' },
    { id: 'matrix', name: 'Matrix Terminal', color: 'bg-emerald-500' },
    { id: 'sakura', name: 'Sakura Sunset', color: 'bg-rose-400' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 transition-all shadow-md">
        {/* Top subtle neon accent glow line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />

        {/* Main Bar Container: Natural Flex Flow to prevent any overlapping */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* ========================================================================= */}
          {/* 1. LEFT ZONE: Brand Logo & Title (Fixed Static Footprint - Zero Shift)    */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              onClick={() => setActiveMode('lessons')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              title="TypeMaster Pro Home"
            >
              {/* Glowing Brand Icon Badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.35)] group-hover:scale-105 transition-all shrink-0">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Keyboard className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 ring-1 ring-emerald-500/50 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                    Type<span className="text-indigo-400">Master</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium hidden 2xl:block leading-none mt-0.5">
                  Touch Typing • Speed Arena • 15 Games
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. CENTER ZONE: Segmented Nav Dock in Natural Flex Flow (Zero Collision)  */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex items-center justify-center flex-1 min-w-0">
            <nav className="flex items-center bg-slate-900/90 border border-slate-800/80 p-1 rounded-2xl shadow-inner gap-1">
              
              {/* Mode 1: Step-by-Step Lessons */}
              <button
                onClick={() => setActiveMode('lessons')}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'lessons'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lessons</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                  activeMode === 'lessons' ? 'bg-indigo-950/70 text-indigo-200' : 'bg-slate-800 text-slate-400'
                }`}>
                  24
                </span>
              </button>

              {/* Mode 2: Speed Test Arena */}
              <button
                onClick={() => setActiveMode('speedtest')}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'speedtest'
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${activeMode === 'speedtest' ? 'text-amber-200 animate-pulse' : 'text-amber-400'}`} />
                <span>Speed Test</span>
              </button>

              {/* Mode 3: Developer Code & Speech Lab */}
              <button
                onClick={() => setActiveMode('code_studio')}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'code_studio'
                    ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>Code Lab</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                  NEW
                </span>
              </button>

              {/* Mode 4: 15-Game Arcade */}
              <button
                onClick={() => setActiveMode('arcade')}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'arcade'
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Arcade</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                  activeMode === 'arcade' ? 'bg-rose-950/70 text-rose-200' : 'bg-orange-500/25 text-orange-200'
                }`}>
                  15
                </span>
              </button>
            </nav>
          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT ZONE: Master Utility Bar & Actions (Responsive & Compact)        */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Daily Streak & Level Chip (Visible on xl: and up) */}
            <div 
              className="hidden xl:flex items-center gap-2 h-9 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold" 
              title={`Daily Streak: ${dailyStreak} Days • Typist Level: ${userLevel} (${userXp} XP)`}
            >
              <span className="flex items-center gap-1 text-orange-400">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{dailyStreak}d</span>
              </span>
              <span className="w-1 h-3 bg-slate-800 rounded-full" />
              <span className="flex items-center gap-1 text-indigo-400">
                <Crown className="w-3.5 h-3.5" />
                <span>Lv.{userLevel}</span>
              </span>
            </div>

            {/* Clean, Integrated Certificate Button */}
            <button
              onClick={onOpenCertificate}
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              title="Claim Verified Typing Certificate"
            >
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Certificate</span>
            </button>

            {/* Trophy Room / Badges Button (Visible on sm: and up) */}
            <button
              onClick={onOpenAchievements}
              className="hidden sm:flex h-9 px-2.5 sm:px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-300 text-xs font-bold transition-all items-center gap-1.5"
              title="Open Trophy Room & Badges"
            >
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden 2xl:inline">Badges</span>
            </button>

            {/* Lo-Fi Music Button with Wave Equalizer */}
            <button
              onClick={onToggleAmbient}
              className={`h-9 px-2.5 sm:px-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAmbientPlaying
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Toggle Relaxing Lo-Fi Background Synthesizer"
            >
              <Headphones className={`w-3.5 h-3.5 ${isAmbientPlaying ? 'text-purple-400' : 'text-slate-400'} shrink-0`} />
              <span className="hidden 2xl:inline font-medium">{isAmbientPlaying ? 'Lo-Fi On' : 'Lo-Fi'}</span>
              {isAmbientPlaying && (
                <span className="flex items-end gap-[2px] h-3 ml-0.5">
                  <span className="w-0.5 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </button>

            {/* Settings Trigger Button (Opens centered full-screen modal) */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="h-9 w-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              title="Platform Settings (Audio, Themes, Switches)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Drawer Hamburger (Visible on < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. MOBILE / TABLET DRAWER (When toggled on < 1024px)                      */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 p-4 space-y-4 shadow-2xl backdrop-blur-2xl animate-pop">
            {/* 4 Main Modes in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveMode('lessons');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-center text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  activeMode === 'lessons' 
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' 
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Lessons (24)</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('speedtest');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-center text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  activeMode === 'speedtest' 
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md' 
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Speed Test</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('code_studio');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-center text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  activeMode === 'code_studio' 
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md' 
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span className="flex items-center gap-1">
                  Code Lab <span className="text-[9px] bg-cyan-400/20 text-cyan-300 px-1 rounded">NEW</span>
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('arcade');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-center text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  activeMode === 'arcade' 
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-orange-500 shadow-md' 
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <Gamepad2 className="w-5 h-5 text-orange-400" />
                <span className="flex items-center gap-1">
                  Arcade <span className="text-[9px] bg-orange-400/20 text-orange-300 px-1 rounded">15</span>
                </span>
              </button>
            </div>

            {/* Quick Actions (Certificate, Badges & Settings) */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => {
                  onOpenCertificate();
                  setMobileMenuOpen(false);
                }}
                className="h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Certificate</span>
              </button>

              <button
                onClick={() => {
                  onOpenAchievements();
                  setMobileMenuOpen(false);
                }}
                className="h-10 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Trophy className="w-4 h-4 text-purple-400" />
                <span>Badges</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSettingsOpen(true);
                }}
                className="h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Settings className="w-4 h-4 text-indigo-400" />
                <span>Settings</span>
              </button>
            </div>

            {/* Mobile All Lessons Button (if in lessons mode) */}
            {activeMode === 'lessons' && (
              <button
                onClick={() => {
                  onOpenLessonDrawer();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 text-xs font-bold flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Current: {currentLesson?.title || 'Lesson 1'}
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-0.5">
                  Change Lesson <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </button>
            )}

            {/* Stats Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1 text-orange-400 font-bold">
                <Flame className="w-3.5 h-3.5 fill-current" /> {dailyStreak} Day Streak
              </span>
              <span className="text-amber-300 font-bold">⭐ {totalStars} Stars</span>
              <span className="text-indigo-400 font-bold">👑 Level {userLevel} ({userXp} XP)</span>
            </div>
          </div>
        )}

      </header>

      {/* ========================================================================= */}
      {/* 5. PLATFORM SETTINGS MODAL VIA PORTAL (Rendered directly in document.body) */}
      {/* ========================================================================= */}
      {settingsOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div 
            className="max-w-md w-full bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 animate-pop relative"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Platform Settings</h3>
                  <p className="text-xs text-slate-400">Audio, Mechanical Switches & Themes</p>
                </div>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Close Settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section 1: Themes */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" /> Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left text-xs transition-all border ${
                      theme === t.id
                        ? 'bg-indigo-600/25 text-white font-bold border-indigo-500 shadow-md ring-1 ring-indigo-400/40'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${t.color} shadow-sm shrink-0`} />
                    <span className="font-semibold">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Master Volume */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
                  Master Audio Volume
                </span>
                <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded-md text-xs">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-slate-800"
                />
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                  className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 shrink-0 border border-slate-700 transition-colors"
                >
                  {volume > 0 ? 'Mute' : 'Unmute'}
                </button>
              </div>
            </div>

            {/* Section 3: Mechanical Keyboard Switch Profiles */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Keyboard className="w-3.5 h-3.5 text-indigo-400" /> Mechanical Switch Profile
                </label>
                <span className="text-[10px] text-slate-500">Click to preview sound</span>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                {SOUND_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSoundProfile(opt.id);
                      if (opt.id !== 'mute') {
                        playKeySound(opt.id, volume);
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors border ${
                      soundProfile === opt.id
                        ? 'bg-indigo-600/20 text-indigo-300 font-bold border-indigo-500/50 ring-1 ring-indigo-400/30'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{opt.icon}</span>
                      <div>
                        <div className="font-semibold text-xs leading-tight">{opt.label}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{opt.sub}</div>
                      </div>
                    </div>
                    {soundProfile === opt.id && (
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Ambient Music Genre */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Radio className="w-4 h-4 text-purple-400" />
                <span>Lo-Fi Music Style:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAmbientGenre && setAmbientGenre('lofi')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    ambientGenre === 'lofi'
                      ? 'bg-purple-600/30 text-purple-200 border-purple-500 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Chillhop
                </button>
                <button
                  onClick={() => setAmbientGenre && setAmbientGenre('cyber')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    ambientGenre === 'cyber'
                      ? 'bg-cyan-600/30 text-cyan-200 border-cyan-500 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Synthwave
                </button>
              </div>
            </div>

            {/* Modal Footer / Close Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => setSettingsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
              >
                Done & Apply
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
};
