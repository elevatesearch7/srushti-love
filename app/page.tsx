'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import confetti from 'canvas-confetti';
import { 
  Play, Pause, Heart, Sparkles, Car, ShoppingBag, 
  Home as HomeIcon, Gem, Crown, Shield, Camera, Zap, Radio,
  ChevronLeft, ChevronRight, X, Coffee, Moon, Flame, ChevronDown,
  Lock, Unlock, Clock, RefreshCw, Key, RotateCw, HelpCircle, CheckCircle, Award, Cpu, RadioTower,
  Feather, MessageCircleHeart
} from 'lucide-react';

const randomAnimations: any[] = [
  {
    initial: { x: '100%', opacity: 0, scale: 0.9 },
    animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { x: '-100%', opacity: 0, scale: 0.9, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  },
  {
    initial: { scale: 0.4, opacity: 0, filter: 'blur(20px)' },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    exit: { scale: 1.4, opacity: 0, filter: 'blur(20px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  },
  {
    initial: { y: '-100%', opacity: 0, rotateX: 45 },
    animate: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: '100%', opacity: 0, rotateX: -45, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
  },
  {
    initial: { rotateY: 90, opacity: 0, filter: 'brightness(2)' },
    animate: { rotateY: 0, opacity: 1, filter: 'brightness(1)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { rotateY: -90, opacity: 0, filter: 'brightness(2)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  },
  {
    initial: { y: '100%', opacity: 0, filter: 'blur(15px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: '-100%', opacity: 0, filter: 'blur(15px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }
];

const hundredLoveWords = [
  "My Love", "My Bubu", "My Wifey", "My Life", "My Everything", "My Universe", "My World", "My Soulmate",
  "My Heartbeat", "My Happiness", "My Safe Place", "My Sunshine", "My Angel", "My Princess", "My Queen",
  "My Favorite Person", "My Sweetheart", "My Cutie Pie", "My Forever", "My Home", "My Comfort", "My Peace",
  "My Treasure", "My Better Half", "My Destiny", "My Smile", "My Joy", "My Dream", "My Little Baby",
  "My Best Friend", "My Precious", "My Goddess", "My Whole Heart", "My Dearest", "My Forever Love",
  "My Safe Haven", "My Shining Star", "My Only One", "My Heart & Soul", "My Sunshine Girl", "My Angel Face",
  "My Cute Little Kid", "My Gorgeous", "My Perfect Girl", "My Beautiful Bubu", "My Endless Happiness",
  "My Daily Inspiration", "My Sweet Girl", "My Greatest Blessing", "My Reason To Smile", "My Paradise",
  "My Heart Keeper", "My Love Bug", "My Little Princess", "My Life Partner", "My Favorite Laugh",
  "My Forever Mood", "My Sweet Angel", "My Pure Heart", "My True Love", "My Darling", "My Cozy Place",
  "My Universe Girl", "My Soul Keeper", "My Bright Light", "My Lucky Charm", "My Heartbeat Owner",
  "My Adorable Kid", "My Everything Girl", "My Warm Hug", "My Precious Gem", "My World Queen",
  "My Forever Valentine", "My Dream Girl", "My Endless Joy", "My Peace Of Mind", "My Life Light",
  "My Cute Tantrum Queen", "My Soul Comfort", "My Favorite Human", "My True Companion", "My Eternal Love",
  "My Sweetest Blessing", "My Heart & Soulmate", "My Universe Keeper", "My Bright Sunshine", "My Whole Life",
  "My Special Girl", "My Forever Bubu", "My Cutest Soul", "My Queen Bee", "My Endless Love", "My Precious Angel",
  "My Pure Joy", "My Favorite Smile", "My Sweet World", "My Forever Home", "My Everything & More"
];

function ParticleTrail() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; symbol: string }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const symbols = ['✨', '💖', '🌹', '🌸', '💋'];

    const handleMove = (x: number, y: number) => {
      const newParticle = {
        id: idCounter++,
        x,
        y,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      };
      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.3, y: -25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ left: p.x - 8, top: p.y - 8 }}
          className="absolute text-sm select-none"
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}

function LiveCounter() {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date('2025-10-23T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0f081d]/90 border border-pink-500/30 rounded-2xl p-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.2)] max-w-sm mx-auto my-4">
      <div className="flex items-center justify-center gap-1.5 text-pink-300 font-mono text-[10px] mb-2">
        <Clock size={12} className="animate-spin text-pink-400" />
        <span className="uppercase tracking-widest">CONNECTED SINCE OCT 23, 2025</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center font-mono">
        <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
          <span className="text-base sm:text-lg font-bold text-amber-300">{timeElapsed.days}</span>
          <p className="text-[8px] text-purple-200/60 uppercase">Days</p>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
          <span className="text-base sm:text-lg font-bold text-pink-300">{timeElapsed.hours}</span>
          <p className="text-[8px] text-purple-200/60 uppercase">Hours</p>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
          <span className="text-base sm:text-lg font-bold text-cyan-300">{timeElapsed.minutes}</span>
          <p className="text-[8px] text-purple-200/60 uppercase">Mins</p>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
          <span className="text-base sm:text-lg font-bold text-rose-400">{timeElapsed.seconds}</span>
          <p className="text-[8px] text-purple-200/60 uppercase">Secs</p>
        </div>
      </div>
    </div>
  );
}

function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let currentYear = now.getFullYear();
      let birthday = new Date(`March 27, ${currentYear}`);

      if (now > birthday) {
        birthday = new Date(`March 27, ${currentYear + 1}`);
      }

      const diff = birthday.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m until Bubu's Birthday! 🎂`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  return <span className="text-amber-200 text-[10px] sm:text-[11px] animate-pulse font-bold tracking-wider">{timeLeft}</span>;
}

export default function BubuWebsite() {
  const [activeSection, setActiveSection] = useState(0);
  const [currentAnimIndex, setCurrentAnimIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPamperModal, setShowPamperModal] = useState(false);
  
  // Interactive HUD Moment Node Selector State for Section 3
  const [selectedMoment, setSelectedMoment] = useState(0);

  // Section 4: Sealed Love Jar State
  const [openedNote, setOpenedNote] = useState<number | null>(null);

  // Quiz State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [pin, setPin] = useState('');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Live Image Rotation State for eyes.jpeg
  const [eyesRotation, setEyesRotation] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isScrollLocked = useRef(false);
  const touchStartY = useRef(0);

  const totalSections = 7;

  const sacredMoments = [
    {
      id: "NODE_01",
      date: "March 27",
      title: "Bubu's Birthday 🎂",
      tag: "ORIGIN NODE",
      accent: "from-amber-500/20 to-amber-950/40 border-amber-500/50 text-amber-300",
      pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "The most sacred day in existence—the moment my entire world was given its favorite human."
    },
    {
      id: "NODE_02",
      date: "October 23, 2025",
      title: "Our First Kiss 💋",
      tag: "SPARK MATRIX",
      accent: "from-pink-500/20 to-pink-950/40 border-pink-500/50 text-pink-300",
      pill: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      desc: "The electric second where time completely stood still, and everything else in the universe faded away."
    },
    {
      id: "NODE_03",
      date: "January 24, 2026",
      title: "\"Pyaar Kartii Hoon\" ❤️",
      tag: "SACRED CONFESSION",
      accent: "from-cyan-500/20 to-cyan-950/40 border-cyan-400/50 text-cyan-300",
      pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      desc: "The unforgettable day you confessed your pure love and sealed my heart's complete devotion forever."
    }
  ];

  // Deeply Romantic Confessions for Option A: The Sealed Love Jar
  const romanticJarNotes = [
    { title: "Home In Your Smile", note: "My heart found its permanent home the exact second you walked into my life. Every single day with you feels like a quiet, effortless miracle." },
    { title: "One In Eight Billion", note: "Out of eight billion souls wandering this world, you are the only one my heart craves to hold close for the rest of my days." },
    { title: "The Quiet Future", note: "In your gentlest laughter and warmest hugs, I see my entire future unfolding in pure peace and endless comfort." },
    { title: "Vital As Breathing", note: "Loving you isn't something I choose or try to do—it is as natural, vital, and effortless to me as taking my very next breath." },
    { title: "Gentle Warmth", note: "You brought soft, glowing warmth into my coldest days and turned my quiet world into a symphony of pure happiness." },
    { title: "My Favorite View", note: "I love who I am whenever I am by your side, but more than that, I am endlessly in love with every little detail of your pure soul." },
    { title: "Forever Hand In Hand", note: "Every dream I carry for tomorrow starts and ends with your soft hand resting peacefully inside mine." }
  ];

  const handleOpenJarNote = () => {
    let nextIdx = Math.floor(Math.random() * romanticJarNotes.length);
    if (nextIdx === openedNote && romanticJarNotes.length > 1) {
      nextIdx = (nextIdx + 1) % romanticJarNotes.length;
    }
    setOpenedNote(nextIdx);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const quizQuestions = [
    {
      question: "What is Babu's absolute favorite thing in the whole world?",
      options: [
        "His laptop & coding",
        "Srushti's beautiful eyes & smile",
        "Late night movies",
        "All of the above, but Srushti is #1 forever ❤️"
      ],
      correct: 3
    },
    {
      question: "What official date marks the start of our connected timer?",
      options: [
        "March 27",
        "October 23, 2025",
        "January 24, 2026",
        "August 1, 2026"
      ],
      correct: 1
    },
    {
      question: "What happens when Bubu gets mad at Babu over small things?",
      options: [
        "Babu surrenders immediately",
        "Babu activates Pamper Protocol 💆‍♀️",
        "Babu gives endless hugs & kisses",
        "All 3 happen at once! ✨"
      ],
      correct: 3
    }
  ];

  const handleAnswerSelect = (index: number) => {
    setSelectedOption(index);
    setTimeout(() => {
      let isCorrect = index === quizQuestions[quizStep].correct;
      let newScore = isCorrect ? quizScore + 1 : quizScore;
      if (isCorrect) setQuizScore(newScore);

      if (quizStep + 1 < quizQuestions.length) {
        setQuizStep(quizStep + 1);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
        confetti({ particleCount: 180, spread: 120, origin: { y: 0.5 } });
      }
    }, 600);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
  };

  const handlePinClick = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === '0327') {
          setIsVaultUnlocked(true);
          setPinError(false);
          confetti({ particleCount: 150, spread: 100 });
        } else {
          setPinError(true);
          setTimeout(() => {
            setPin('');
            setPinError(false);
          }, 1000);
        }
      }
    }
  };

  const changeSection = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= totalSections || isScrollLocked.current) return;
    
    isScrollLocked.current = true;
    let randomIndex = Math.floor(Math.random() * randomAnimations.length);
    if (randomIndex === currentAnimIndex) randomIndex = (randomIndex + 1) % randomAnimations.length;
    
    setCurrentAnimIndex(randomIndex);
    setActiveSection(newIndex);

    setTimeout(() => {
      isScrollLocked.current = false;
    }, 900);
  }, [currentAnimIndex, totalSections]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (showPamperModal || showQuizModal) return;
      if (e.deltaY > 30) changeSection(activeSection + 1);
      else if (e.deltaY < -30) changeSection(activeSection - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, changeSection, showPamperModal, showQuizModal]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (showPamperModal || showQuizModal) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (diff > 50) changeSection(activeSection + 1);
    else if (diff < -50) changeSection(activeSection - 1);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.currentTime < 20) {
          audioRef.current.currentTime = 20;
        }
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Audio playback error:", err);
            alert("Could not play 'music.mp3'. Please check that 'music.mp3' exists in public folder!");
          });
      }
    }
  };

  const triggerPamper = () => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    setShowPamperModal(true);
  };

  const fallbacks = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
  ];

  const moodGallery = [
    { src: '/bache.jpeg', fallback: fallbacks[0], tag: 'MODE // PLAYFUL', title: 'My Little Kid 👶', desc: 'When you show your adorable, innocent, childish side that I love so much.' },
    { src: '/cute.jpeg', fallback: fallbacks[1], tag: 'MODE // ADORABLE', title: 'Adorably Cute 🥰', desc: 'The sweet smile that instantly melts my heart and brightens my day.' },
    { src: '/elegent.jpeg', fallback: fallbacks[2], tag: 'MODE // ELEGANT', title: 'Pure Elegance ✨', desc: 'Graceful, breathtaking, and pure class personified.' },
    { src: '/hot.jpeg', fallback: fallbacks[3], tag: 'MODE // FIERCE', title: 'Smoking Hot 🔥', desc: 'Taking my breath away every single time I look at you.' },
    { src: '/saree.jpeg', fallback: fallbacks[4], tag: 'MODE // PERFECTION', title: 'Unmatched Beauty 💋', desc: 'Absolute perfection in every single way imaginable.' },
  ];

  const sectionLabels = ["HERO", "LITTLE BUBU", "GALLERY", "SACRED HUD", "LOVE JAR", "CARE PROTOCOL", "SECRET VAULT"];

  return (
    <main 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-screen w-screen bg-[#05020a] text-[#f3e9f8] relative overflow-hidden font-sans selection:bg-pink-500 selection:text-white"
    >
      <ParticleTrail />

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f152e15_1px,transparent_1px),linear-gradient(to_bottom,#1f152e15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed top-[-15%] left-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[180px] pointer-events-none" />

      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />

      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 bg-[#0d0714]/80 backdrop-blur-2xl border border-pink-500/30 shadow-[0_0_25px_rgba(236,72,153,0.25)] px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-3.5 cursor-pointer group hover:border-pink-400"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Radio size={11} className="text-pink-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-pink-300 uppercase">
              {isPlaying ? "SOUND // ACTIVE" : "SOUND // READY"}
            </span>
          </div>
          <p className="text-xs font-bold text-white tracking-wide">Perfect — Ed Sheeran</p>
        </div>
      </motion.div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3">
        {sectionLabels.map((label, idx) => (
          <button
            key={idx}
            onClick={() => changeSection(idx)}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className={`text-[10px] font-mono tracking-widest transition-all duration-300 ${
              idx === activeSection ? 'text-pink-300 opacity-100 font-bold' : 'text-purple-300/40 opacity-0 group-hover:opacity-100'
            }`}>
              0{idx + 1} // {label}
            </span>
            <div className={`h-2.5 rounded-full transition-all duration-500 ${
              idx === activeSection 
                ? 'w-8 bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_12px_rgba(236,72,153,0.8)]' 
                : 'w-2.5 bg-white/20 group-hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center gap-2 bg-[#0d0714]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/30">
        <span className="text-[10px] font-mono text-pink-300 font-bold">
          0{activeSection + 1} / 0{totalSections} — {sectionLabels[activeSection]}
        </span>
      </div>

      {activeSection < totalSections - 1 && (
        <button 
          onClick={() => changeSection(activeSection + 1)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-purple-300/60 hover:text-pink-300 transition-colors animate-bounce cursor-pointer"
        >
          <span className="text-[9px] font-mono tracking-widest mb-1">SCROLL OR CLICK</span>
          <ChevronDown size={18} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={randomAnimations[currentAnimIndex] as any}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full flex items-center justify-center px-4 sm:px-8 py-12 overflow-y-auto"
        >
          <div className="max-w-4xl w-full my-auto">
            
            {/* SECTION 0: HERO (elegent.jpeg) */}
            {activeSection === 0 && (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-50 blur-lg animate-tilt" />
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_60px_rgba(236,72,153,0.4)]">
                    <img 
                      src="/elegent.jpeg" 
                      alt="Srushti" 
                      className="w-full h-full object-cover rounded-full border-2 border-white/20"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbacks[2]; }}
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0d0714]/90 backdrop-blur-md border border-pink-500/50 px-4 py-1 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    <span className="text-[10px] font-mono tracking-widest text-pink-200">STATUS: MY WHOLE UNIVERSE</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-md mb-2">
                  <Zap size={13} className="text-amber-300" />
                  <span className="text-[11px] font-mono tracking-wider text-purple-200">GIRLFRIEND DAY EDITION // 2026</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-cyan-200 mb-2">
                  Happy Girlfriend Day, My Bubu
                </h1>

                <p className="text-base sm:text-xl font-serif text-pink-300 italic mb-2">
                  To my one & only love — my first and my last.
                </p>

                <LiveCounter />
              </div>
            )}

            {/* SECTION 1: LITTLE BUBU (bachi.jpeg) */}
            {activeSection === 1 && (
              <div className="w-full space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-950/30 backdrop-blur-md mb-2">
                    <Heart size={13} className="text-pink-400 fill-pink-400" />
                    <span className="text-[10px] font-mono text-pink-300 tracking-widest uppercase">LITTLE BUBU // 100 NAMES OF LOVE</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
                    Forever My Cute Little Kid 👶
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-3xl mx-auto bg-[#0f081d]/90 border border-pink-500/40 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,0.3)]">
                  {/* Left Side: Photo Frame using bachi.jpeg */}
                  <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)] bg-black/80 flex items-center justify-center p-2">
                    <img 
                      src="/bachi.jpeg" 
                      alt="Little Srushti" 
                      className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbacks[0]; }}
                    />
                    <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-pink-500/30 text-[9px] font-mono px-2.5 py-1 rounded-full text-pink-300 tracking-widest uppercase">
                      SRUSHTI // AGE 3 ✨
                    </span>
                  </div>

                  {/* Right Side: Infinite Auto-Scrolling 100 Words */}
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-pink-500/30 bg-[#090412]/90 p-4 flex flex-col justify-center">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#090412] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#090412] to-transparent z-10" />

                    <motion.div 
                      animate={{ y: ['0%', '-50%'] }}
                      transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
                      className="flex flex-col gap-2.5 text-center"
                    >
                      {[...hundredLoveWords, ...hundredLoveWords].map((word, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-pink-200 hover:text-amber-300 transition-colors py-1">
                          <span className="text-pink-500 text-[10px]">💖</span>
                          <span>{word}</span>
                          <span className="text-pink-500 text-[10px]">💖</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: PHOTO GALLERY (My Little Kid 👶 uses bache.jpeg) */}
            {activeSection === 2 && (
              <div className="w-full">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-950/30 backdrop-blur-md mb-2">
                    <Camera size={13} className="text-pink-400" />
                    <span className="text-[10px] font-mono text-pink-300 tracking-widest uppercase">SLIDING VISUAL MATRIX</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
                    Every Version of You 📸
                  </h2>
                </div>

                <div className="relative max-w-md mx-auto min-h-[420px] sm:min-h-[460px] flex items-center justify-center">
                  <button 
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + moodGallery.length) % moodGallery.length)}
                    className="absolute -left-3 sm:-left-10 z-30 p-2.5 rounded-full bg-[#0d0714]/90 border border-pink-500/40 text-white hover:border-pink-300 transition-all backdrop-blur-xl shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button 
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % moodGallery.length)}
                    className="absolute -right-3 sm:-right-10 z-30 p-2.5 rounded-full bg-[#0d0714]/90 border border-pink-500/40 text-white hover:border-pink-300 transition-all backdrop-blur-xl shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="w-full bg-[#0f081d]/90 backdrop-blur-2xl border border-pink-500/40 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(236,72,153,0.3)] flex flex-col">
                    <div className="h-[270px] sm:h-[300px] w-full overflow-hidden relative bg-[#090412] flex items-center justify-center p-2">
                      <img 
                        src={moodGallery[currentSlide].src} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                      />
                      <span className="absolute top-3 left-3 z-20 bg-[#05020a]/85 backdrop-blur-md border border-white/20 text-[9px] font-mono px-2.5 py-1 rounded-full text-pink-300 tracking-widest">
                        {moodGallery[currentSlide].tag}
                      </span>
                      <img 
                        src={moodGallery[currentSlide].src} 
                        alt={moodGallery[currentSlide].title} 
                        className="relative z-10 max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = moodGallery[currentSlide].fallback; }}
                      />
                    </div>
                    <div className="p-5 flex-1 bg-[#0d061a]">
                      <h3 className="text-lg font-bold text-amber-200 mb-1">{moodGallery[currentSlide].title}</h3>
                      <p className="text-purple-200/80 text-xs sm:text-sm leading-relaxed">{moodGallery[currentSlide].desc}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-5">
                  {moodGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-6 bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: FIXED SINGLE-SCREEN FUTURISTIC QUANTUM HUD COMMAND CENTER */}
            {activeSection === 3 && (
              <div className="w-full max-w-xl mx-auto space-y-4">
                {/* HUD Header */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 backdrop-blur-md mb-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <RadioTower size={12} className="text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-300 tracking-widest uppercase">OUR SACRED NETWORK // QUANTUM HUD</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    Our Sacred Moments ✨
                  </h2>
                </div>

                {/* Cyberpunk Main HUD Frame */}
                <div className="bg-[#0b0517]/95 border border-cyan-500/40 rounded-3xl p-5 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] relative overflow-hidden flex flex-col gap-4">
                  
                  {/* Top Bar Terminal Stream & Countdown */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                      <Cpu size={14} className="animate-spin text-emerald-400" />
                      <span>SYS_STATUS: ACTIVE</span>
                    </div>
                    <div className="bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                      <Sparkles size={11} className="text-amber-400" />
                      <BirthdayCountdown />
                    </div>
                  </div>

                  {/* Interactive Node Selector Matrix */}
                  <div className="grid grid-cols-3 gap-2">
                    {sacredMoments.map((moment, idx) => {
                      const isSelected = selectedMoment === idx;
                      return (
                        <button
                          key={moment.id}
                          onClick={() => setSelectedMoment(idx)}
                          className={`p-2.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                            isSelected 
                              ? 'bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]' 
                              : 'bg-white/5 border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="text-[8px] font-mono text-cyan-300/80">{moment.id}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                          </div>
                          <span className="font-mono text-[10px] font-bold text-white block truncate">{moment.date}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Quantum Projection View Screen */}
                  <div className="relative bg-[#05020c] border border-white/15 rounded-2xl p-5 min-h-[160px] flex flex-col justify-between overflow-hidden shadow-inner">
                    <div className="absolute top-2 right-3 text-[8px] font-mono text-purple-300/40 tracking-widest uppercase">
                      HOLOGRAPHIC PROJECTION // 0{selectedMoment + 1}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedMoment}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border ${sacredMoments[selectedMoment].pill}`}>
                            {sacredMoments[selectedMoment].tag}
                          </span>
                          <span className="text-pink-400 font-mono text-xs font-bold">
                            {sacredMoments[selectedMoment].date}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                          {sacredMoments[selectedMoment].title}
                        </h3>

                        <p className="text-purple-100/80 text-xs sm:text-sm leading-relaxed">
                          {sacredMoments[selectedMoment].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom Status Bar */}
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-purple-300/50">
                      <span>DEVOTION_LEVEL: 100% UNCONDITIONAL</span>
                      <span className="text-cyan-400">TOUCH NODE TO SWITCH</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 4: OPTION 1 - THE SEALED LOVE JAR 🏺 */}
            {activeSection === 4 && (
              <div className="w-full text-center max-w-lg mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-400/30 bg-rose-950/30 backdrop-blur-md mb-0.5 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <Heart size={12} className="text-rose-400 fill-rose-400 animate-pulse" />
                  <span className="text-[10px] font-serif tracking-widest text-pink-200 uppercase">Intimate Devotion Jar</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif italic text-white tracking-wide">
                  Why Bubu Is My World 🌹
                </h2>

                <div className="bg-gradient-to-b from-[#180a28]/90 via-[#0d0519]/95 to-[#06020c]/98 border border-rose-500/30 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(244,63,94,0.2)] relative min-h-[290px] flex flex-col items-center justify-between overflow-hidden">
                  
                  {/* Soft Radial Ambient Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent pointer-events-none" />

                  {openedNote === null ? (
                    /* SEALED GLASS JAR STATE */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full flex flex-col items-center my-auto space-y-4"
                    >
                      {/* Glass Jar Visual */}
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenJarNote}
                        className="w-28 h-36 border-2 border-pink-300/40 rounded-b-3xl rounded-t-xl bg-gradient-to-b from-white/10 via-pink-500/10 to-rose-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.3)] relative flex flex-col items-center justify-center cursor-pointer group border-t-4 border-t-amber-200/60"
                      >
                        {/* Wooden Cork Lid Accent */}
                        <div className="absolute -top-3 w-16 h-3.5 bg-amber-800/80 border border-amber-500/50 rounded-t-md shadow-md" />
                        
                        {/* Floating hearts inside Jar */}
                        <div className="flex flex-col items-center gap-1.5 opacity-90 group-hover:scale-110 transition-transform">
                          <motion.span 
                            animate={{ y: [0, -4, 0] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-xl select-none"
                          >
                            💌
                          </motion.span>
                          <motion.span 
                            animate={{ y: [0, 4, 0] }} 
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className="text-sm select-none"
                          >
                            💖 ✨ 🌹
                          </motion.span>
                        </div>

                        <span className="absolute bottom-2 text-[8px] font-mono text-pink-200/70 tracking-widest uppercase">
                          SEALED Jar
                        </span>
                      </motion.div>

                      <p className="text-xs sm:text-sm font-serif italic text-pink-200/80 max-w-xs">
                        "Tap the glass love jar to unseal a handwritten confession from Babu's heart."
                      </p>

                      <div className="flex gap-2 w-full max-w-xs pt-1">
                        <button 
                          onClick={handleOpenJarNote}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-serif italic text-xs py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          <Feather size={13} /> Unseal Love Note 💌
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* UNFOLDED ROMANTIC LOVE PARCHMENT NOTE */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.7, y: 30, rotateX: 45 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.7, y: -30 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="w-full bg-[#150a21] border border-amber-300/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(251,191,36,0.15)] flex flex-col justify-between my-auto relative text-left"
                    >
                      <div className="flex items-center justify-between border-b border-amber-300/20 pb-2 mb-3">
                        <div className="flex items-center gap-1.5 text-amber-200 font-serif italic text-xs">
                          <MessageCircleHeart size={14} className="text-rose-400" />
                          <span>Confession #{openedNote + 1} — {romanticJarNotes[openedNote].title}</span>
                        </div>
                        <button 
                          onClick={() => setOpenedNote(null)}
                          className="text-pink-300/60 hover:text-white text-xs font-mono"
                        >
                          [ Close ]
                        </button>
                      </div>

                      <p className="text-sm sm:text-base font-serif italic text-amber-100/90 leading-relaxed my-2 text-center">
                        "{romanticJarNotes[openedNote].note}"
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-amber-300/20 mt-3">
                        <button 
                          onClick={handleOpenJarNote}
                          className="inline-flex items-center gap-1.5 text-xs font-serif text-pink-300 hover:text-white transition-colors"
                        >
                          <RefreshCw size={12} /> Pull Another Note
                        </button>

                        <button 
                          onClick={() => setOpenedNote(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-serif text-amber-300 hover:text-amber-100 transition-colors"
                        >
                          Seal Back In Jar 🏺
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="w-full flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-purple-300/50 mt-2">
                    <span>PURE DEVOTION // SRUSHTI & NARAYAN</span>
                    <button 
                      onClick={() => setShowQuizModal(true)}
                      className="text-pink-300 hover:underline flex items-center gap-1"
                    >
                      <HelpCircle size={11} /> Take Bubu Quiz 🧩
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 5: CARE PROTOCOL & WISHLIST */}
            {activeSection === 5 && (
              <div className="w-full space-y-6">
                <div className="bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-cyan-950/40 border border-pink-500/40 rounded-3xl p-8 sm:p-10 text-center backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                  <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto mb-3 text-pink-300 animate-pulse">
                    <Flame size={26} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🌷 Bubu&apos;s Care Protocol</h2>
                  <p className="text-purple-200/80 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Your health and happiness are priority #1 every single day of the month.
                  </p>
                  <button 
                    onClick={triggerPamper}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Activate Pamper Protocol 💆‍♀️
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: "Cosmetics", desc: "Unlimited shopping", icon: <ShoppingBag className="text-pink-400" /> },
                    { name: "YSL Heels", desc: "Luxury closet unlocked", icon: <Gem className="text-amber-300" /> },
                    { name: "BMW Car", desc: "Cruising life together", icon: <Car className="text-cyan-300" /> },
                    { name: "Our Big Home", desc: "Built on love & peace", icon: <HomeIcon className="text-rose-400" /> },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#0f081d]/80 border border-white/10 rounded-2xl p-3.5 text-center flex flex-col items-center justify-center">
                      <div className="mb-1.5 p-2 bg-white/5 rounded-full">{item.icon}</div>
                      <h3 className="text-xs font-bold text-white mb-0.5">{item.name}</h3>
                      <p className="text-[10px] text-purple-200/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 6: SECRET SECURITY VAULT */}
            {activeSection === 6 && (
              <div className="w-full space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-950/30 backdrop-blur-md mb-2">
                    <Key size={13} className="text-pink-400" />
                    <span className="text-[10px] font-mono text-pink-300 tracking-widest uppercase">ENCRYPTED VAULT LOCK</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    Bubu Security Vault 🔐
                  </h2>
                </div>

                {!isVaultUnlocked ? (
                  <div className="max-w-xs mx-auto bg-[#0f081d]/90 border border-pink-500/40 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(236,72,153,0.3)] text-center">
                    <div className="flex justify-center mb-3">
                      {pinError ? <Lock className="text-rose-500 animate-bounce" size={28} /> : <Lock className="text-pink-400" size={28} />}
                    </div>
                    <p className="text-xs text-purple-200/80 mb-3">Enter Bubu&apos;s Birthday PIN (MMDD)</p>
                    
                    <div className="flex justify-center gap-3 mb-5">
                      {[0, 1, 2, 3].map((idx) => (
                        <div 
                          key={idx} 
                          className={`w-3.5 h-3.5 rounded-full border border-pink-400 transition-all ${
                            pin.length > idx ? 'bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'bg-transparent'
                          }`} 
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 max-w-[200px] mx-auto">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                        <button
                          key={digit}
                          onClick={() => handlePinClick(digit)}
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold text-sm hover:bg-pink-500/20 hover:border-pink-400 transition-all active:scale-90 cursor-pointer mx-auto flex items-center justify-center"
                        >
                          {digit}
                        </button>
                      ))}
                      <button 
                        onClick={() => setPin('')}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-rose-400 font-mono text-[10px] hover:bg-rose-500/20 transition-all active:scale-90 cursor-pointer mx-auto flex items-center justify-center"
                      >
                        CLR
                      </button>
                      <button
                        onClick={() => handlePinClick('0')}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold text-sm hover:bg-pink-500/20 transition-all active:scale-90 cursor-pointer mx-auto flex items-center justify-center"
                      >
                        0
                      </button>
                    </div>
                  </div>
                ) : (
                  /* UNLOCKED VAULT CARD */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto bg-[#0d061a]/95 border border-pink-400/60 rounded-3xl p-5 sm:p-7 backdrop-blur-2xl shadow-[0_0_60px_rgba(236,72,153,0.4)] text-left flex flex-col"
                  >
                    <div className="shrink-0 mb-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono bg-[#180a2c] py-1.5 px-3 rounded-xl border border-emerald-500/30">
                        <Unlock size={15} />
                        <span>VAULT UNLOCKED // SECRET LETTER</span>
                      </div>
                    </div>

                    <div className="shrink-0 relative w-full my-1 flex flex-col items-center">
                      <div className="relative w-full rounded-2xl overflow-hidden border border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.35)] bg-black/90 p-1 flex items-center justify-center h-44 sm:h-48">
                        <img 
                          src="/eyes.jpeg" 
                          alt="Bubu's Eyes" 
                          style={{ transform: `rotate(${eyesRotation}deg) scale(1.38)` }}
                          className="max-w-full max-h-full object-contain transition-transform duration-300 rounded-xl"
                          onError={(e) => {
                            const parent = (e.currentTarget as HTMLImageElement).parentElement;
                            if (parent) parent.style.display = 'none';
                          }}
                        />
                        <span className="absolute bottom-2.5 left-3 text-[9px] font-mono text-pink-300 tracking-widest uppercase bg-black/80 px-2.5 py-1 rounded-full border border-pink-500/30 backdrop-blur-md">
                          BUBU&apos;S EYES ✨
                        </span>
                        <button
                          onClick={() => setEyesRotation((prev) => (prev + 90) % 360)}
                          className="absolute top-2.5 right-3 bg-pink-500/30 hover:bg-pink-500/60 border border-pink-400 text-white text-[10px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer backdrop-blur-md shadow-md z-10"
                        >
                          <RotateCw size={11} /> ROTATE
                        </button>
                      </div>
                    </div>

                    <h3 className="shrink-0 text-xl font-bold text-amber-200 mt-3 mb-2">My Dearest Srushti,</h3>

                    <div className="space-y-3.5 text-purple-100 text-xs sm:text-sm leading-relaxed font-medium">
                      <p>
                        If you are reading this, it means you cracked the security code and unlocked my secret vault. Every single line of code, animation, glow, and pixel on this entire website was built with my whole heart, exclusively for you.
                      </p>
                      <p>
                        From the moment you walked into my life, everything changed for the better. You became my safest comfort, my favorite laughter, and my greatest blessing. No matter where life takes us, my heart, my loyalty, and my unconditional devotion belong to you and only you.
                      </p>
                      <p>
                        Thank you for loving me, for tolerating my silly moments, and for filling my world with so much light and peace. I promise to stand by your side through every storm, celebrate every victory with you, and pamper you every single day of our lives.
                      </p>
                      <p>
                        You are my first, my last, and my forever. Happy Girlfriend Day, my adorable Bubu!
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 shrink-0">
                      <p className="text-pink-300 font-serif italic text-sm text-right">
                        — Forever & Always Yours, Narayan (Your Babu) ❤️
                      </p>
                    </div>
                  </motion.div>
                )}

                <footer className="text-center pt-4 text-[11px] text-purple-200/50">
                  <p>Crafted with endless love by <span className="text-white font-semibold">Narayan (Your Babu)</span> for <span className="text-pink-300 font-semibold">Srushti (My Bubu)</span></p>
                  <p className="mt-0.5 font-mono text-[10px] text-pink-400/60">August 1, 2026 — Happy Girlfriend Day ❤️</p>
                </footer>
              </div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>

      {/* PAMPER PROTOCOL MODAL */}
      <AnimatePresence>
        {showPamperModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="relative w-full max-w-md bg-[#0d061a]/95 border border-pink-500/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(236,72,153,0.35)] overflow-hidden"
            >
              <button 
                onClick={() => setShowPamperModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-purple-200 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                <span className="text-[10px] font-mono tracking-widest text-pink-300 uppercase">
                  SYSTEM DIAGNOSTIC // ACTIVE
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-5">
                🌸 Bubu Care Protocol Activated
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-pink-950/30 border border-pink-500/20">
                  <Flame size={18} className="text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm">Heating Pad & Snack Module</h4>
                    <p className="text-purple-200/70 text-[11px] mt-0.5">Warm comfort pad prepared & unlimited favorite treats deployed on command.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20">
                  <Moon size={18} className="text-purple-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm">Zero Argument Shield</h4>
                    <p className="text-purple-200/70 text-[11px] mt-0.5">Babu is in 100% agreement mode. Zero debates, endless hugs guaranteed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20">
                  <Coffee size={18} className="text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm">Unlimited Pamper Matrix</h4>
                    <p className="text-purple-200/70 text-[11px] mt-0.5">Priority massages, head scratches, and extra love active for today!</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowPamperModal(false)}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-bold text-xs py-3 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
              >
                Deactivate Protocol ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BUBU MINI QUIZ MODAL */}
      <AnimatePresence>
        {showQuizModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="relative w-full max-w-md bg-[#0d061a]/95 border border-cyan-500/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(6,182,212,0.35)] overflow-hidden"
            >
              <button 
                onClick={() => setShowQuizModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-purple-200 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              {!quizCompleted ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-cyan-400 animate-spin" />
                    <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
                      BUBU TRIVIA // QUESTION {quizStep + 1} OF {quizQuestions.length}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-5 leading-snug">
                    {quizQuestions[quizStep].question}
                  </h3>

                  <div className="space-y-2.5 mb-6">
                    {quizQuestions[quizStep].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                          selectedOption === idx
                            ? idx === quizQuestions[quizStep].correct
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 scale-[1.02]'
                              : 'bg-rose-500/20 border-rose-400 text-rose-200'
                            : 'bg-white/5 border-white/10 text-purple-100 hover:bg-cyan-500/10 hover:border-cyan-400'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedOption === idx && (
                          <CheckCircle size={16} className={idx === quizQuestions[quizStep].correct ? 'text-emerald-400' : 'text-rose-400'} />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-purple-300/60">
                    <span>Score: {quizScore} Points</span>
                    <span>Babu & Bubu Quiz ✨</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-0.5 mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                    <div className="w-full h-full rounded-full bg-[#0d061a] flex items-center justify-center text-amber-300">
                      <Award size={32} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    100% PERFECT MATCH! 🏆
                  </h3>
                  <p className="text-purple-200/80 text-xs sm:text-sm mb-6 leading-relaxed">
                    You scored <span className="text-amber-300 font-bold">{quizScore}/{quizQuestions.length}</span>! You know Narayan inside out. You are officially his soulmate forever!
                  </p>

                  <div className="flex gap-3">
                    <button 
                      onClick={resetQuiz}
                      className="flex-1 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs py-3 rounded-full transition-all"
                    >
                      Play Again 🔄
                    </button>
                    <button 
                      onClick={() => setShowQuizModal(false)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold text-xs py-3 rounded-full shadow-lg transition-all"
                    >
                      Close Quiz ❤️
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}