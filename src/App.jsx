import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { TypingArea } from './components/TypingArea';
import { Keyboard } from './components/Keyboard';
import { FingerGuide } from './components/FingerGuide';
import { StatsBar } from './components/StatsBar';
import { ScoreModal } from './components/ScoreModal';
import { LessonSelector } from './components/LessonSelector';
import { SpeedTestMode } from './components/SpeedTestMode';
import { GamesHub } from './components/GamesHub';
import { BiometricsHeatmap } from './components/BiometricsHeatmap';
import { CertificateModal } from './components/CertificateModal';
import { AchievementsModal } from './components/AchievementsModal';
import { CustomCodeStudio } from './components/CustomCodeStudio';
import { LESSON_STAGES } from './data/lessonsData';
import { playKeySound, playErrorSound, playSuccessChime } from './utils/soundEffects';
import { startAmbientMusic, stopAmbientMusic, setAmbientVolume } from './utils/ambientAudio';
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  ChevronRight, 
  ArrowRight,
  Flame,
  Award,
  Layers,
  Zap,
  Gamepad2,
  Brain,
  Activity,
  Crown,
  Trophy
} from 'lucide-react';

export default function App() {
  // Flatten all lessons across all stages for easy index-based navigation
  const allLessons = useMemo(() => {
    return LESSON_STAGES.flatMap((stage) => 
      stage.lessons.map((lesson) => ({
        ...lesson,
        stageTitle: stage.title,
        stageLevel: stage.level
      }))
    );
  }, []);

  // Persistent storage for user preferences, progress & XP
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('typemaster_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [soundProfile, setSoundProfile] = useState(() => {
    try {
      return localStorage.getItem('typemaster_sound') || 'brown';
    } catch {
      return 'brown';
    }
  });

  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('typemaster_volume');
      return saved !== null ? parseFloat(saved) : 0.5;
    } catch {
      return 0.5;
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('typemaster_theme') || 'slate';
    } catch {
      return 'slate';
    }
  });

  const [storedXp, setStoredXp] = useState(() => {
    try {
      const saved = localStorage.getItem('typemaster_xp');
      return saved !== null ? parseInt(saved, 10) : 150;
    } catch {
      return 150;
    }
  });

  const [dailyStreak, setDailyStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('typemaster_streak');
      return saved !== null ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Ambient Lo-Fi music state
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [ambientGenre, setAmbientGenre] = useState('lofi'); // 'lofi' | 'cyber'

  // Active view mode: 'lessons' | 'speedtest' | 'arcade'
  const [activeMode, setActiveMode] = useState('lessons');

  // Active lesson
  const [currentLesson, setCurrentLesson] = useState(() => allLessons[0]);
  const targetText = currentLesson?.text || '';

  // Typing state
  const [userInput, setUserInput] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [pressedKey, setPressedKey] = useState('');
  const [isError, setIsError] = useState(false);

  // Stats state
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [errors, setErrors] = useState(0);
  const [errorKeysMap, setErrorKeysMap] = useState({});
  const [streak, setStreak] = useState(0);

  // Modals
  const [isLessonSelectorOpen, setIsLessonSelectorOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  const [modalStats, setModalStats] = useState({
    wpm: 60,
    accuracy: 98,
    timeElapsed: 0,
    errors: 0,
    errorKeys: []
  });

  // Apply theme class to body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    try {
      localStorage.setItem('typemaster_theme', theme);
    } catch {}
  }, [theme]);

  // Persist volume & sync ambient volume
  useEffect(() => {
    try {
      localStorage.setItem('typemaster_volume', volume.toString());
    } catch {}
    setAmbientVolume(volume);
  }, [volume]);

  // Persist XP
  useEffect(() => {
    try {
      localStorage.setItem('typemaster_xp', storedXp.toString());
    } catch {}
  }, [storedXp]);

  // Persist Streak
  useEffect(() => {
    try {
      localStorage.setItem('typemaster_streak', dailyStreak.toString());
    } catch {}
  }, [dailyStreak]);

  // Calculate live stats
  const totalTyped = userInput.length;
  const activeChar = targetText[userInput.length] || '';
  const progressPercent = targetText.length > 0 ? (totalTyped / targetText.length) * 100 : 0;

  // Words Per Minute (Standard 5 chars per word)
  const wpm = useMemo(() => {
    if (timeElapsed <= 1 || totalTyped === 0) return 0;
    const words = totalTyped / 5;
    const minutes = timeElapsed / 60;
    return Math.max(0, Math.round(words / minutes));
  }, [totalTyped, timeElapsed]);

  // Accuracy calculation
  const accuracy = useMemo(() => {
    if (totalTyped === 0) return 100;
    const correctChars = totalTyped - errors;
    const acc = Math.round((Math.max(0, correctChars) / totalTyped) * 100);
    return Math.min(100, Math.max(0, acc));
  }, [totalTyped, errors]);

  // Total stars calculated
  const totalStars = useMemo(() => {
    return Object.values(completedLessons).reduce((sum, item) => sum + (item.stars || 0), 0);
  }, [completedLessons]);

  // User Level progression (Level 1, 2, 3...)
  const userLevel = useMemo(() => {
    return Math.floor(storedXp / 400) + 1;
  }, [storedXp]);

  // Aggregate weak keys from all sessions
  const weakKeys = useMemo(() => {
    return Object.keys(errorKeysMap);
  }, [errorKeysMap]);

  // Dynamically determine unlocked achievement IDs
  const unlockedAchievementIds = useMemo(() => {
    const list = ['first_run'];
    if (storedXp > 300) list.push('speed_40');
    if (storedXp > 700) list.push('speed_60');
    if (storedXp > 2000) list.push('speed_100');
    if (errors === 0 && totalTyped > 30) list.push('perfect_acc');
    if (totalStars >= 5) list.push('streak_3');
    if (isAmbientPlaying) list.push('lofi_vibes');
    return list;
  }, [storedXp, errors, totalTyped, totalStars, isAmbientPlaying]);

  // Toggle ambient music
  const handleToggleAmbient = () => {
    if (isAmbientPlaying) {
      stopAmbientMusic();
      setIsAmbientPlaying(false);
    } else {
      startAmbientMusic(ambientGenre, volume);
      setIsAmbientPlaying(true);
    }
  };

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Restart / Reset current lesson
  const handleRestart = () => {
    setUserInput('');
    setTimeElapsed(0);
    setTimerRunning(false);
    setErrors(0);
    setStreak(0);
    setIsError(false);
    setPressedKey('');
  };

  // Switch to another lesson
  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    handleRestart();
  };

  // Next lesson trigger
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const hasNextLesson = currentLessonIndex !== -1 && currentLessonIndex < allLessons.length - 1;

  const handleNextLesson = () => {
    if (hasNextLesson) {
      handleSelectLesson(allLessons[currentLessonIndex + 1]);
      setIsScoreModalOpen(false);
    }
  };

  // Character typed handler
  const handleInputChange = (e) => {
    const val = e.target.value;

    // Handle backspace / deletion
    if (val.length < userInput.length) {
      setUserInput(val);
      playKeySound(soundProfile, volume);
      return;
    }

    // Start timer on first keystroke
    if (!timerRunning && val.length > 0) {
      setTimerRunning(true);
    }

    const lastChar = val[val.length - 1];
    const expectedChar = targetText[val.length - 1];

    setPressedKey(lastChar);
    setTimeout(() => setPressedKey(''), 120);

    if (lastChar === expectedChar) {
      // Correct keystroke
      setIsError(false);
      setStreak((s) => s + 1);
      setStoredXp((xp) => xp + 2); // 2 XP per correct key
      playKeySound(soundProfile, volume);
    } else {
      // Incorrect keystroke
      setIsError(true);
      setErrors((err) => err + 1);
      setStreak(0);
      playErrorSound(volume);

      // Record mistyped key
      setErrorKeysMap((prev) => ({
        ...prev,
        [expectedChar]: (prev[expectedChar] || 0) + 1
      }));
    }

    setUserInput(val);

    // Check for Lesson Completion
    if (val.length >= targetText.length) {
      setTimerRunning(false);
      playSuccessChime(volume);
      setStoredXp((xp) => xp + 100); // 100 bonus XP for lesson completion

      // Final calculations
      const finalWpm = Math.max(1, Math.round((val.length / 5) / ((Math.max(1, timeElapsed)) / 60)));
      const correctChars = val.length - (errors + (lastChar !== expectedChar ? 1 : 0));
      const finalAcc = Math.round((Math.max(0, correctChars) / val.length) * 100);

      let earnedStars = 1;
      if (finalAcc >= 96 && finalWpm >= 20) earnedStars = 3;
      else if (finalAcc >= 88) earnedStars = 2;

      // Update storage
      setCompletedLessons((prev) => ({
        ...prev,
        [currentLesson.id]: {
          stars: Math.max(prev[currentLesson.id]?.stars || 0, earnedStars),
          wpm: Math.max(prev[currentLesson.id]?.wpm || 0, finalWpm),
          accuracy: Math.max(prev[currentLesson.id]?.accuracy || 0, finalAcc),
          completedAt: new Date().toISOString()
        }
      }));

      // Show Score modal
      const errorKeysList = Object.keys(errorKeysMap);
      if (lastChar !== expectedChar && !errorKeysList.includes(expectedChar)) {
        errorKeysList.push(expectedChar);
      }

      setModalStats({
        wpm: finalWpm,
        accuracy: finalAcc,
        timeElapsed: Math.max(1, timeElapsed),
        errors: errors + (lastChar !== expectedChar ? 1 : 0),
        errorKeys: errorKeysList
      });

      setIsScoreModalOpen(true);
    }
  };

  // Keyboard shortcut listener (Tab to restart, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && activeMode === 'lessons') {
        e.preventDefault();
        handleRestart();
      } else if (e.key === 'Escape') {
        setIsLessonSelectorOpen(false);
        setIsScoreModalOpen(false);
        setIsCertificateOpen(false);
        setIsAchievementsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode]);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Sleek Upgraded Top Navbar */}
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        currentLesson={currentLesson}
        onOpenLessonDrawer={() => setIsLessonSelectorOpen(true)}
        soundProfile={soundProfile}
        setSoundProfile={setSoundProfile}
        volume={volume}
        setVolume={setVolume}
        theme={theme}
        setTheme={setTheme}
        totalStars={totalStars}
        userLevel={userLevel}
        userXp={storedXp}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
        ambientGenre={ambientGenre}
        setAmbientGenre={setAmbientGenre}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        dailyStreak={dailyStreak}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* MODE 1: STEP-BY-STEP LESSONS */}
        {activeMode === 'lessons' && (
          <>
            {/* Header Stage & Lesson Info Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3 sm:p-4 rounded-2xl backdrop-blur-sm">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {currentLesson.stageTitle || 'Stage 1'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Lesson {currentLessonIndex + 1} of {allLessons.length}
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white mt-1">
                  {currentLesson.title}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                  {currentLesson.description}
                </p>
              </div>

              {/* Browse All Lessons Button */}
              <button
                onClick={() => setIsLessonSelectorOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>All 24 Lessons</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Live Stats Bar */}
            <StatsBar
              wpm={wpm}
              accuracy={accuracy}
              timeElapsed={timeElapsed}
              streak={streak}
              progressPercent={progressPercent}
            />

            {/* Interactive Flowing Typing Area */}
            <TypingArea
              targetText={targetText}
              userInput={userInput}
              onInputChange={handleInputChange}
              onRestart={handleRestart}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />

            {/* Two-Hand Finger Position Visual Guide */}
            <FingerGuide activeChar={activeChar} />

            {/* 3D Color-Coded Mechanical Keyboard */}
            <Keyboard
              activeChar={activeChar}
              pressedKey={pressedKey}
              isError={isError}
            />

            {/* AI Biometrics Coach & 10-Finger Heatmap */}
            <BiometricsHeatmap
              totalTyped={totalTyped}
              errors={errors}
              weakKeys={weakKeys}
            />

            {/* Beginner Quick Guide Card */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 sm:p-5 text-xs text-slate-400 space-y-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Touch Typing Secret Rule: Never Look Down</span>
              </div>
              <p className="leading-relaxed">
                Place your index fingers on the <strong className="text-white">F</strong> and <strong className="text-white">J</strong> keys — you will feel small raised bumps designed for tactile touch navigation. Keep your thumbs gently resting on the Spacebar. Watch the hand visualizer and keyboard colors above to guide each finger automatically!
              </p>
            </div>
          </>
        )}

        {/* MODE 2: MONKEYTYPE-STYLE SPEED TEST */}
        {activeMode === 'speedtest' && (
          <SpeedTestMode
            soundProfile={soundProfile}
            volume={volume}
            weakKeys={weakKeys}
            onAddXp={(amount) => setStoredXp((x) => x + amount)}
          />
        )}

        {/* MODE 3: ARCADE GAMES ARENA (15 GAMES PROPERLY ARRANGED) */}
        {activeMode === 'arcade' && (
          <GamesHub
            onExit={() => setActiveMode('lessons')}
            soundProfile={soundProfile}
            volume={volume}
            onAddXp={(amount) => setStoredXp((xp) => xp + amount)}
          />
        )}

        {/* MODE 4: DEVELOPER CODE LAB & AUDIO DICTATION STUDIO */}
        {activeMode === 'code_studio' && (
          <CustomCodeStudio
            soundProfile={soundProfile}
            volume={volume}
            onAddXp={(amount) => setStoredXp((xp) => xp + amount)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 text-center text-xs text-slate-500 font-medium backdrop-blur-sm">
        <p>
          TypeMaster Pro • Touch Typing Tutor • Speed Arena • 15 Arcade Games • Developer Code Lab • Audio Dictation • AI Biometrics • Trophy Room
        </p>
      </footer>

      {/* Lesson Selector Drawer / Modal */}
      <LessonSelector
        isOpen={isLessonSelectorOpen}
        onClose={() => setIsLessonSelectorOpen(false)}
        activeLessonId={currentLesson.id}
        onSelectLesson={handleSelectLesson}
        completedLessons={completedLessons}
      />

      {/* Lesson Completion Scorecard Modal */}
      <ScoreModal
        isOpen={isScoreModalOpen}
        stats={modalStats}
        lessonTitle={currentLesson.title}
        onRetry={() => {
          setIsScoreModalOpen(false);
          handleRestart();
        }}
        onNextLesson={handleNextLesson}
        hasNextLesson={hasNextLesson}
        onClaimCertificate={() => {
          setIsScoreModalOpen(false);
          setIsCertificateOpen(true);
        }}
      />

      {/* Official Verified Speed Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        userStats={modalStats}
      />

      {/* Trophy Room & Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        userXp={storedXp}
        unlockedIds={unlockedAchievementIds}
      />

    </div>
  );
}
