'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import confetti from 'canvas-confetti';
import { 
  Play, Pause, Heart, Sparkles, Car, ShoppingBag, 
  Home as HomeIcon, Gem, Crown, Shield, Camera, Zap, Radio,
  ChevronLeft, ChevronRight, X, Coffee, Moon, Flame, ChevronDown,
  Lock, Unlock, Clock, RefreshCw, Key, RotateCw, Cpu, RadioTower,
  Feather, MessageCircleHeart, Send, Mail, HeartPulse, Compass, PhoneCall, Video, Ticket, BatteryCharging, Gauge, Fingerprint
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

const songLyrics = [
  "I found a love, for me... 🎶",
  "Darling, just dive right in and follow my lead...",
  "I found a girl, beautiful and sweet... ✨",
  "I never knew you were the someone waiting for me... ❤️",
  "We were just kids when we fell in love... 👶💖",
  "Baby, I'm dancing in the dark with you between my arms... 💃🕺",
  "Barefoot on the grass, listening to our favorite song... 🎵",
  "When you said you looked a mess, I whispered underneath my breath...",
  "You heard it, darling, you look perfect tonight... 👑🌹"
];

const galleryFilters = [
  { label: "👶 Childish", index: 0 },
  { label: "🥰 Cute", index: 1 },
  { label: "✨ Elegant", index: 2 },
  { label: "🔥 Spicy", index: 3 },
  { label: "👑 Queen", index: 4 }
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
    <div className="bg-[#0f081d]/90 border border-pink-500/30 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.2)] max-w-xs sm:max-w-sm mx-auto my-2 sm:my-4">
      <div className="flex items-center justify-center gap-1.5 text-pink-300 font-mono text-[9px] sm:text-[10px] mb-2">
        <Clock size={11} className="animate-spin text-pink-400" />
        <span className="uppercase tracking-widest">CONNECTED SINCE OCT 23, 2025</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center font-mono">
        <div className="bg-white/5 rounded-lg p-1.5 sm:p-2 border border-white/10">
          <span className="text-base sm:text-xl font-bold text-amber-300">{timeElapsed.days}</span>
          <p className="text-[7px] sm:text-[8px] text-purple-200/60 uppercase">Days</p>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5 sm:p-2 border border-white/10">
          <span className="text-base sm:text-xl font-bold text-pink-300">{timeElapsed.hours}</span>
          <p className="text-[7px] sm:text-[8px] text-purple-200/60 uppercase">Hours</p>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5 sm:p-2 border border-white/10">
          <span className="text-base sm:text-xl font-bold text-cyan-300">{timeElapsed.minutes}</span>
          <p className="text-[7px] sm:text-[8px] text-purple-200/60 uppercase">Mins</p>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5 sm:p-2 border border-white/10">
          <span className="text-base sm:text-xl font-bold text-rose-400">{timeElapsed.seconds}</span>
          <p className="text-[7px] sm:text-[8px] text-purple-200/60 uppercase">Secs</p>
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

  return <span className="text-amber-200 text-[9px] sm:text-[11px] animate-pulse font-bold tracking-wider">{timeLeft}</span>;
}

export default function BubuWebsite() {
  const [activeSection, setActiveSection] = useState(0);
  const [currentAnimIndex, setCurrentAnimIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLyricIdx, setCurrentLyricIdx] = useState(0);

  // Hero Heart Tap Explosion State
  const [heroHearts, setHeroHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Section 3 HUD Moment Node Selector State
  const [selectedMoment, setSelectedMoment] = useState(0);

  // Section 4 Animated Love Jar State
  const [isExtractingLetter, setIsExtractingLetter] = useState(false);
  const [openedLetter, setOpenedLetter] = useState<{ title: string; body: string; psu: string } | null>(null);

  // Section 5 Long Distance Care Protocol State & Flying Kiss Particles
  const [selectedOpenWhen, setSelectedOpenWhen] = useState<{ title: string; trigger: string; text: string } | null>(null);
  const [showHugToast, setShowHugToast] = useState(false);
  const [flyingKisses, setFlyingKisses] = useState<{ id: number; x: number; y: number; symbol: string }[]>([]);

  // Section 6 Vault Lock & Digital Oath Seal State
  const [pin, setPin] = useState('');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isOathSealed, setIsOathSealed] = useState(false);

  // Live Image Rotation State for eyes.jpeg
  const [eyesRotation, setEyesRotation] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isScrollLocked = useRef(false);
  const touchStartY = useRef(0);

  const totalSections = 7;

  // Auto Cycle Lyrics when playing music
  useEffect(() => {
    if (!isPlaying) return;
    const lyricInterval = setInterval(() => {
      setCurrentLyricIdx((prev) => (prev + 1) % songLyrics.length);
    }, 5500);
    return () => clearInterval(lyricInterval);
  }, [isPlaying]);

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

  const romanticPaperLetters = [
    {
      title: "Letter I // Safe Haven",
      body: "My Dearest Bubu,\n\nIn a world that constantly moves too fast, being next to you is the only place where my heart finally rests in complete peace. You aren't just my partner; you are my quiet comfort, my warmest hug, and my home in human form.",
      psu: "Forever & always yours, Babu ❤️"
    },
    {
      title: "Letter II // One In Eight Billion",
      body: "My Beautiful Bubu,\n\nOut of eight billion souls wandering this universe, my heart chose you without a single second of hesitation. Loving you is the easiest, most natural thing I have ever done, and I will keep choosing you today, tomorrow, and for all my days to come.",
      psu: "You are my entire world ✨"
    },
    {
      title: "Letter III // The Gentle Miracle",
      body: "My Cute Little Bubu,\n\nEvery time you smile, every time you laugh, and even when you get adorably mad over small silly things, you illuminate my entire life. Thank you for filling my days with warmth and pure happiness.",
      psu: "Endlessly devoted, Babu 💖"
    },
    {
      title: "Letter IV // The Unconditional Promise",
      body: "My Dearest Srushti,\n\nI promise to celebrate every victory with you, hold your hand through every storm, and pamper you every single day. My loyalty, my heart, and my unconditional love belong exclusively to you.",
      psu: "My first, my last, my forever 🌹"
    }
  ];

  // Section 5: Long Distance Open When Letters
  const openWhenLetters = [
    {
      trigger: "When You Miss Me 🥺",
      title: "Open When Distance Feels Heavy...",
      text: "My Sweetest Bubu,\n\nDistance is just physical space—it has zero power over how deeply I hold you in my heart. Right now, wherever you are sitting, take a deep breath and close your eyes. Imagine me sitting right next to you, pulling you close into a warm, tight hug and kissing your forehead. I am thinking about you at this exact second, and I am counting down every day until I can hold you in my arms again."
    },
    {
      trigger: "When You Can't Sleep 🌙",
      title: "Open When Midnight Is Too Quiet...",
      text: "My Darling Bubu,\n\nIf the night is too quiet and your mind is running fast, I want you to remember that under the exact same sky, my heart is beating for you. Wrap yourself tight in your cozy blanket, imagine resting your head on my chest, and listen to the soft rhythm of my breathing. You are safe, you are deeply loved, and tomorrow brings us one day closer."
    },
    {
      trigger: "When You Need A Warm Hug 🫂",
      title: "Open When You Need Babu Right Now...",
      text: "My Little Kid,\n\nConsider this digital envelope an official, non-expiring voucher for the warmest, tightest hug in existence. Imagine my arms wrapping around your shoulders, pulling you in close, and holding you until all your tiredness melts away. I am always holding your hand, even across the miles."
    },
    {
      trigger: "When You Need Extra Love 💋",
      title: "Open When You Need A Gentle Reminder...",
      text: "My Dearest Srushti,\n\nNo matter how far apart we are, you are the first thought on my mind when I wake up and the last prayer in my heart before I sleep. You are my first, my last, and my forever. Never doubt how cherished and irreplaceable you are to me!"
    }
  ];

  const handleHeroTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = { id: Date.now(), x, y };
    setHeroHearts((prev) => [...prev, newHeart]);
    confetti({ particleCount: 25, spread: 40, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });

    setTimeout(() => {
      setHeroHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const handleSealOath = () => {
    setIsOathSealed(true);
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981']
    });
  };

  const handlePullLetterFromJar = () => {
    if (isExtractingLetter) return;
    setIsExtractingLetter(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * romanticPaperLetters.length);
      setOpenedLetter(romanticPaperLetters[randomIdx]);
      setIsExtractingLetter(false);
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    }, 850);
  };

  const handleSendVirtualHug = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });

    const symbols = ['💋', '🫂', '💖', '💋', '🥰', '✨'];
    const newParticles = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 50,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));

    setFlyingKisses((prev) => [...prev, ...newParticles]);
    setShowHugToast(true);

    setTimeout(() => setShowHugToast(false), 3500);

    setTimeout(() => {
      setFlyingKisses((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2200);
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
      if (openedLetter || selectedOpenWhen) return;
      if (e.deltaY > 30) changeSection(activeSection + 1);
      else if (e.deltaY < -30) changeSection(activeSection - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, changeSection, openedLetter, selectedOpenWhen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (openedLetter || selectedOpenWhen) return;
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

  const sectionLabels = ["HERO", "LITTLE BUBU", "GALLERY", "SACRED HUD", "LOVE JAR", "LDR COMFORT", "SECRET VAULT"];

  return (
    <main 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-[100dvh] w-screen bg-[#05020a] text-[#f3e9f8] relative overflow-hidden font-sans selection:bg-pink-500 selection:text-white flex flex-col justify-between"
    >
      <ParticleTrail />

      {/* FLYING KISSES & HUGS ANIMATION PARTICLES */}
      <AnimatePresence>
        {flyingKisses.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.3, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              scale: [0.5, 1.8, 2.2, 1], 
              y: -220, 
              x: (Math.random() - 0.5) * 100 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.1, ease: "easeOut" }}
            className="pointer-events-none fixed z-50 text-3xl sm:text-5xl select-none drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]"
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f152e15_1px,transparent_1px),linear-gradient(to_bottom,#1f152e15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed top-[-15%] left-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[180px] pointer-events-none" />

      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />

      {/* FLOATING LYRIC POPUP WIDGET */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 bg-[#0d0714]/95 border border-pink-500/40 px-3.5 py-1.5 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md max-w-[210px] sm:max-w-xs text-center pointer-events-none"
          >
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentLyricIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="text-[9px] sm:text-[10px] font-serif italic text-pink-200 truncate"
              >
                {songLyrics[currentLyricIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Floating Button */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#0d0714]/90 backdrop-blur-2xl border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)] px-3 py-2 sm:px-5 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group hover:border-pink-400"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] shrink-0">
          {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
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

      {/* Desktop Navigation Dots */}
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

      {/* Mobile Top Pill Indicator */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center gap-1.5 bg-[#0d0714]/90 backdrop-blur-md px-3 py-1 rounded-full border border-pink-500/30 shadow-md">
        <span className="text-[9px] font-mono text-pink-300 font-bold tracking-wider">
          0{activeSection + 1} / 0{totalSections} — {sectionLabels[activeSection]}
        </span>
      </div>

      {/* Scroll Arrow Bottom Indicator */}
      {activeSection < totalSections - 1 && (
        <button 
          onClick={() => changeSection(activeSection + 1)}
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-purple-300/60 hover:text-pink-300 transition-colors animate-bounce cursor-pointer"
        >
          <span className="text-[8px] font-mono tracking-widest mb-0.5">SWIPE UP OR TAP</span>
          <ChevronDown size={16} />
        </button>
      )}

      {/* Main Single-Screen Dynamic Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={randomAnimations[currentAnimIndex] as any}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full max-h-[100dvh] flex items-center justify-center px-3 sm:px-8 py-6 sm:py-10 overflow-hidden"
        >
          <div className="max-w-xl sm:max-w-3xl w-full my-auto flex flex-col items-center justify-center h-full max-h-[90dvh]">
            
            {/* SECTION 0: HERO WITH TAP HEART EXPLOSION */}
            {activeSection === 0 && (
              <div className="flex flex-col items-center text-center h-full justify-evenly py-2">
                
                {/* WIDGET: Bubu's Heart Charging Bar */}
                <div className="inline-flex items-center gap-2 bg-[#0d0714]/90 border border-emerald-500/40 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)] font-mono text-[9px] sm:text-[10px] text-emerald-300">
                  <BatteryCharging size={13} className="text-emerald-400 animate-pulse" />
                  <span>BATTERY: 100% 🔋 | STATUS: Loving Babu Non-Stop</span>
                </div>

                {/* Hero Photo Container with Tap Heart Explosion */}
                <div 
                  onClick={handleHeroTap}
                  className="relative my-1 cursor-pointer group select-none"
                >
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-50 blur-lg animate-tilt" />
                  <div className="relative w-36 h-36 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_50px_rgba(236,72,153,0.4)] transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src="/elegent.jpeg" 
                      alt="Srushti" 
                      className="w-full h-full object-cover rounded-full border-2 border-white/20"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbacks[2]; }}
                    />
                  </div>

                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#0d0714]/90 backdrop-blur-md border border-pink-500/50 px-3 py-0.5 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-pink-200">TAP PICTURE FOR LOVE ❤️</span>
                  </div>

                  {/* Spawn Floating Hearts on Tap */}
                  <AnimatePresence>
                    {heroHearts.map((h) => (
                      <motion.div
                        key={h.id}
                        initial={{ opacity: 1, scale: 0.5, x: h.x - 50, y: h.y - 50 }}
                        animate={{ opacity: 0, scale: 1.5, y: h.y - 120 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute pointer-events-none text-xs sm:text-sm font-serif italic text-pink-300 font-bold bg-[#0d0714]/90 px-2.5 py-1 rounded-full border border-pink-400/50 shadow-[0_0_15px_rgba(236,72,153,0.8)] whitespace-nowrap z-30"
                      >
                        I Love You Bubu! 💖
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-md">
                    <Zap size={12} className="text-amber-300" />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-purple-200">GIRLFRIEND DAY EDITION</span>
                  </div>

                  <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-cyan-200">
                    Happy Girlfriend Day, Bubu
                  </h1>

                  <p className="text-xs sm:text-xl font-serif text-pink-300 italic">
                    To my one & only love — my first and my last.
                  </p>
                </div>

                <LiveCounter />
              </div>
            )}

            {/* SECTION 1: LITTLE BUBU (bachi.jpeg) WITH CUTENESS METER */}
            {activeSection === 1 && (
              <div className="w-full space-y-2 sm:space-y-4 h-full flex flex-col justify-evenly py-2">
                <div className="text-center shrink-0 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-pink-500/30 bg-pink-950/30 backdrop-blur-md">
                    <Heart size={11} className="text-pink-400 fill-pink-400" />
                    <span className="text-[9px] font-mono text-pink-300 tracking-widest uppercase">LITTLE BUBU // 100 NAMES</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
                    Forever My Cute Little Kid 👶
                  </h2>

                  {/* WIDGET: Cuteness Meter Gauge */}
                  <div className="inline-flex items-center gap-1.5 bg-[#0d0714]/90 border border-pink-400/40 px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <Gauge size={12} className="text-amber-300 animate-spin" />
                    <span>CUTENESS LEVEL: ♾️ / 100% (OVERFLOW ERROR 🥰)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-center max-w-3xl mx-auto w-full bg-[#0f081d]/90 border border-pink-500/40 rounded-3xl p-3.5 sm:p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                  <div className="relative w-full h-44 sm:h-80 rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)] bg-black/80 flex items-center justify-center p-2">
                    <img 
                      src="/bachi.jpeg" 
                      alt="Little Srushti" 
                      className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbacks[0]; }}
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-pink-500/30 text-[8px] font-mono px-2.5 py-1 rounded-full text-pink-300 tracking-widest uppercase">
                      SRUSHTI // AGE 3 ✨
                    </span>
                  </div>

                  <div className="relative h-44 sm:h-80 rounded-2xl overflow-hidden border border-pink-500/30 bg-[#090412]/90 p-3 sm:p-4 flex flex-col justify-center">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#090412] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#090412] to-transparent z-10" />

                    <motion.div 
                      animate={{ y: ['0%', '-50%'] }}
                      transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
                      className="flex flex-col gap-2 text-center"
                    >
                      {[...hundredLoveWords, ...hundredLoveWords].map((word, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-pink-200 hover:text-amber-300 transition-colors py-0.5">
                          <span className="text-pink-500 text-[9px]">💖</span>
                          <span>{word}</span>
                          <span className="text-pink-500 text-[9px]">💖</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: PHOTO GALLERY WITH MOOD FILTER BUTTONS */}
            {activeSection === 2 && (
              <div className="w-full space-y-2 sm:space-y-4 h-full flex flex-col justify-evenly py-2">
                <div className="text-center shrink-0 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-pink-500/30 bg-pink-950/30 backdrop-blur-md">
                    <Camera size={12} className="text-pink-400" />
                    <span className="text-[9px] font-mono text-pink-300 tracking-widest uppercase">VISUAL MATRIX</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
                    Every Version of You 📸
                  </h2>

                  {/* Mood Filter Pill Buttons */}
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap pt-0.5">
                    {galleryFilters.map((filter) => {
                      const isActive = currentSlide === filter.index;
                      return (
                        <button
                          key={filter.index}
                          onClick={() => setCurrentSlide(filter.index)}
                          className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.6)] border border-pink-300/50 scale-105' 
                              : 'bg-white/5 text-purple-200/70 border border-white/10 hover:border-pink-500/40'
                          }`}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative max-w-md mx-auto w-full flex items-center justify-center">
                  <button 
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + moodGallery.length) % moodGallery.length)}
                    className="absolute -left-3 sm:-left-10 z-30 p-2 sm:p-2.5 rounded-full bg-[#0d0714]/90 border border-pink-500/40 text-white hover:border-pink-300 transition-all backdrop-blur-xl shadow-lg"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button 
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % moodGallery.length)}
                    className="absolute -right-3 sm:-right-10 z-30 p-2 sm:p-2.5 rounded-full bg-[#0d0714]/90 border border-pink-500/40 text-white hover:border-pink-300 transition-all backdrop-blur-xl shadow-lg"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="w-full bg-[#0f081d]/90 backdrop-blur-2xl border border-pink-500/40 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(236,72,153,0.3)] flex flex-col">
                    <div className="h-[240px] sm:h-[300px] w-full overflow-hidden relative bg-[#090412] flex items-center justify-center p-2">
                      <img 
                        src={moodGallery[currentSlide].src} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                      />
                      <span className="absolute top-3 left-3 z-20 bg-[#05020a]/85 backdrop-blur-md border border-white/20 text-[8px] sm:text-[9px] font-mono px-2.5 py-1 rounded-full text-pink-300 tracking-widest">
                        {moodGallery[currentSlide].tag}
                      </span>
                      <img 
                        src={moodGallery[currentSlide].src} 
                        alt={moodGallery[currentSlide].title} 
                        className="relative z-10 max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = moodGallery[currentSlide].fallback; }}
                      />
                    </div>
                    <div className="p-3.5 sm:p-5 flex-1 bg-[#0d061a]">
                      <h3 className="text-base sm:text-lg font-bold text-amber-200 mb-0.5">{moodGallery[currentSlide].title}</h3>
                      <p className="text-purple-200/80 text-xs sm:text-sm leading-relaxed">{moodGallery[currentSlide].desc}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {moodGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-6 bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: FIXED SINGLE-SCREEN FUTURISTIC QUANTUM HUD COMMAND CENTER */}
            {activeSection === 3 && (
              <div className="w-full max-w-lg mx-auto space-y-3 sm:space-y-4 h-full flex flex-col justify-evenly py-2">
                <div className="text-center shrink-0 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <RadioTower size={12} className="text-cyan-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-cyan-300 tracking-widest uppercase">QUANTUM HUD</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    Our Sacred Moments ✨
                  </h2>

                  {/* WIDGET: Soul Sync Frequency Badge */}
                  <div className="inline-flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] font-mono text-cyan-300/90 bg-cyan-950/40 border border-cyan-500/30 px-3 py-0.5 rounded-full mx-auto shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>SOUL SYNC FREQUENCY: 100% IN SYNC // ZERO DISTORTION 📡</span>
                  </div>
                </div>

                <div className="bg-[#0b0517]/95 border border-cyan-500/40 rounded-3xl p-4 sm:p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,0.25)] relative overflow-hidden flex flex-col gap-3.5">
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
                      <Cpu size={13} className="animate-spin text-emerald-400" />
                      <span>SYS_STATUS: ACTIVE</span>
                    </div>
                    <div className="bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-400" />
                      <BirthdayCountdown />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {sacredMoments.map((moment, idx) => {
                      const isSelected = selectedMoment === idx;
                      return (
                        <button
                          key={moment.id}
                          onClick={() => setSelectedMoment(idx)}
                          className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                            isSelected 
                              ? 'bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-[1.02]' 
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

                  <div className="relative bg-[#05020c] border border-white/15 rounded-2xl p-4 sm:p-5 min-h-[170px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden shadow-inner">
                    <div className="absolute top-2.5 right-3 text-[8px] font-mono text-purple-300/40 tracking-widest uppercase">
                      HOLOGRAPHIC // 0{selectedMoment + 1}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedMoment}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] sm:text-[9px] font-mono px-2.5 py-0.5 rounded-full border ${sacredMoments[selectedMoment].pill}`}>
                            {sacredMoments[selectedMoment].tag}
                          </span>
                          <span className="text-pink-400 font-mono text-xs font-bold">
                            {sacredMoments[selectedMoment].date}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
                          {sacredMoments[selectedMoment].title}
                        </h3>

                        <p className="text-purple-100/80 text-xs sm:text-sm leading-relaxed">
                          {sacredMoments[selectedMoment].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-purple-300/50">
                      <span>DEVOTION_LEVEL: 100%</span>
                      <span className="text-cyan-400">TOUCH NODE TO SWITCH</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 4: COZY LOVE JAR WITH DAILY AFFIRMATION WIDGET 🏺 */}
            {activeSection === 4 && (
              <div className="w-full text-center max-w-xl mx-auto space-y-2 sm:space-y-4 h-full flex flex-col justify-evenly py-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-400/40 bg-amber-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.25)] shrink-0 self-center">
                  <Sparkles size={12} className="text-amber-300 animate-spin" />
                  <span className="text-[10px] sm:text-[11px] font-serif tracking-widest text-amber-200 uppercase">Cozy Memory Keepsake</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif italic text-white tracking-wide shrink-0">
                  Why Bubu Is My World 🌹
                </h2>

                {/* WIDGET: Daily Affirmation Pill Banner */}
                <div className="bg-gradient-to-r from-pink-950/60 via-amber-950/60 to-purple-950/60 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-serif italic text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.25)] mx-auto max-w-md flex items-center justify-center gap-1.5 shrink-0">
                  <Heart size={12} className="text-pink-400 fill-pink-400 animate-pulse" />
                  <span>TODAY&apos;S REMINDER: Srushti is the prettiest girl in the universe ✨</span>
                </div>

                <div className="bg-gradient-to-b from-[#1d0b2e]/90 via-[#130622]/95 to-[#090212]/98 border border-amber-400/30 rounded-3xl p-4 sm:p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(251,191,36,0.15)] relative flex flex-col items-center justify-between overflow-hidden gap-2 sm:gap-3">
                  
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white text-xs sm:text-sm font-serif italic px-5 py-1.5 sm:py-2 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] border border-amber-200 flex items-center gap-2 cursor-pointer z-20"
                    onClick={handlePullLetterFromJar}
                  >
                    <Feather size={14} className="text-amber-200" />
                    <span>Tap Glass Jar to Pull Letter 💌</span>
                  </motion.div>

                  <div 
                    onClick={handlePullLetterFromJar}
                    className="relative w-48 h-52 sm:w-64 sm:h-72 my-0.5 cursor-pointer group flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  >
                    <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                      <defs>
                        <linearGradient id="fancyJarGlass" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                          <stop offset="30%" stopColor="#fef08a" stopOpacity="0.1" />
                          <stop offset="70%" stopColor="#ec4899" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="corkLidFancy" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="50%" stopColor="#b45309" />
                          <stop offset="100%" stopColor="#78350f" />
                        </linearGradient>
                      </defs>

                      <path d="M 30 30 L 90 30 Q 102 30 102 42 L 102 128 Q 102 145 82 145 L 38 145 Q 18 145 18 128 L 18 42 Q 18 30 30 30 Z" fill="url(#fancyJarGlass)" stroke="rgba(251,191,36,0.6)" strokeWidth="2.5" />
                      <rect x="25" y="24" width="70" height="8" rx="3" fill="rgba(255,255,255,0.25)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" />
                      <path d="M 26 42 L 26 128" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 94 48 L 94 118" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />

                      <g className="transition-transform duration-500 group-hover:scale-110 transform-origin-center">
                        <rect x="30" y="105" width="28" height="18" rx="3" fill="#fef08a" transform="rotate(-15 44 114)" opacity="0.95" />
                        <rect x="62" y="102" width="30" height="20" rx="3" fill="#fbcfe8" transform="rotate(18 77 112)" opacity="0.95" />
                        <rect x="42" y="88" width="32" height="20" rx="3" fill="#f43f5e" transform="rotate(-6 58 98)" opacity="0.9" />
                        <rect x="32" y="118" width="32" height="18" rx="3" fill="#ffffff" transform="rotate(10 48 127)" opacity="0.98" />
                        <rect x="58" y="120" width="28" height="16" rx="3" fill="#e9d5ff" transform="rotate(-20 72 128)" opacity="0.9" />
                      </g>

                      <motion.path 
                        d="M 32 24 L 88 24 L 84 8 L 36 8 Z" 
                        fill="url(#corkLidFancy)" 
                        stroke="#92400e" 
                        strokeWidth="1.5" 
                        animate={isExtractingLetter ? { y: -18, rotate: -8 } : { y: 0, rotate: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </svg>

                    <AnimatePresence>
                      {isExtractingLetter && (
                        <motion.div 
                          initial={{ y: 30, scale: 0.3, opacity: 0 }}
                          animate={{ y: -120, scale: 1.15, opacity: 1, rotate: [0, -12, 12, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.85, ease: "easeOut" }}
                          className="absolute z-30 bg-[#fef3c7] border-2 border-amber-400 px-4 py-2 rounded-2xl shadow-[0_0_35px_rgba(251,191,36,0.9)] text-amber-950 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          <Feather size={16} className="text-rose-600 animate-bounce" />
                          <span className="font-serif italic text-xs font-bold">Unfolding Romantic Letter...</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={handlePullLetterFromJar}
                    disabled={isExtractingLetter}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-serif italic text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-200/50"
                  >
                    <Feather size={14} /> {isExtractingLetter ? 'Unsealing...' : 'Unseal A Romantic Letter 💌'}
                  </button>

                  <div className="w-full flex items-center justify-center pt-2 border-t border-white/10 text-[10px] font-serif italic text-amber-200/70">
                    ✨ Crafted with endless devotion for my adorable Bubu ✨
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 5: LONG DISTANCE DEVOTION & COMFORT HUB 🫂 */}
            {activeSection === 5 && (
              <div className="w-full text-center max-w-xl mx-auto space-y-3 sm:space-y-4 h-full flex flex-col justify-evenly py-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-pink-400/40 bg-pink-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.25)] shrink-0 self-center">
                  <Compass size={12} className="text-pink-300 animate-spin" />
                  <span className="text-[10px] sm:text-[11px] font-serif tracking-widest text-pink-200 uppercase">LDR Comfort Hub</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif italic text-white tracking-wide shrink-0">
                  Across The Miles, Always Yours 🌐
                </h2>

                <div className="bg-gradient-to-b from-[#180826]/90 via-[#0e0419]/95 to-[#06020c]/98 border border-pink-500/40 rounded-3xl p-4 sm:p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,0.2)] relative flex flex-col justify-between items-center gap-3.5">
                  
                  {/* UPDATED LDR Distance Metric Widget */}
                  <div className="w-full bg-white/5 border border-pink-500/30 rounded-2xl p-2.5 sm:p-4 flex items-center justify-between font-mono text-[10px] sm:text-xs shadow-inner">
                    <div className="flex items-center gap-1 text-pink-300 font-bold truncate">
                      <span>💖</span>
                      <span>BABU&apos;S HEART</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px]">
                      <span className="text-pink-400 font-bold animate-pulse">── 0 km ──</span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-300 font-bold truncate">
                      <span>BUBU&apos;S HEART</span>
                      <span>💖</span>
                    </div>
                  </div>

                  {/* Hug & Kisses Transmitter Button */}
                  <div className="w-full bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-rose-950/40 border border-pink-500/30 rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center mb-1 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                      <HeartPulse size={18} className="animate-pulse text-pink-400" />
                    </div>
                    <h3 className="text-xs sm:text-base font-serif italic font-bold text-white mb-0.5">
                      Virtual Warmth Transmitted 🫂💋
                    </h3>
                    <p className="text-[10px] sm:text-xs text-purple-200/80 max-w-md mx-auto mb-2.5 leading-tight">
                      Whenever you miss me or feel tired, tap below to receive Babu's sweet kisses & cozy hugs!
                    </p>
                    <button 
                      onClick={handleSendVirtualHug}
                      className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-serif italic text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-pink-300/40 flex items-center gap-1.5"
                    >
                      <Sparkles size={13} className="text-amber-300" /> Get Babu&apos;s cozy hug and kisses 💋
                    </button>
                  </div>

                  {/* "Open When..." Envelopes Grid */}
                  <div className="w-full">
                    <h4 className="text-[10px] sm:text-[11px] font-mono text-pink-300 uppercase tracking-widest mb-1.5 text-left flex items-center gap-1">
                      <Mail size={12} /> Open When Envelopes:
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {openWhenLetters.map((env, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedOpenWhen(env)}
                          className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-pink-500/30 hover:border-pink-400 hover:bg-pink-500/10 transition-all text-left flex flex-col justify-between h-16 sm:h-20 group cursor-pointer"
                        >
                          <span className="text-[8px] sm:text-[9px] font-mono text-pink-300/80">0{idx + 1}</span>
                          <span className="text-[11px] sm:text-xs font-serif italic font-bold text-amber-200 group-hover:text-white leading-tight truncate">{env.trigger}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toast Notification */}
                  <AnimatePresence>
                    {showHugToast && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white px-4 py-1.5 rounded-full font-serif italic text-[10px] sm:text-xs shadow-[0_0_20px_rgba(236,72,153,0.8)] border border-pink-300 flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <Sparkles size={11} className="text-amber-300 animate-spin" />
                        <span>Babu's cozy hugs & endless kisses transmitted! ❤️💋</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            )}

            {/* SECTION 6: SECRET SECURITY VAULT WITH DIGITAL OATH SEAL */}
            {activeSection === 6 && (
              <div className="w-full space-y-3 sm:space-y-6 h-full flex flex-col justify-evenly py-2">
                <div className="text-center shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-950/30 backdrop-blur-md mb-1.5">
                    <Key size={12} className="text-pink-400" />
                    <span className="text-[9px] font-mono text-pink-300 tracking-widest uppercase">ENCRYPTED VAULT LOCK</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    Bubu Security Vault 🔐
                  </h2>
                </div>

                {!isVaultUnlocked ? (
                  <div className="max-w-xs mx-auto bg-[#0f081d]/90 border border-pink-500/40 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_30px_rgba(236,72,153,0.3)] text-center w-full">
                    <div className="flex justify-center mb-2.5">
                      {pinError ? <Lock className="text-rose-500 animate-bounce" size={26} /> : <Lock className="text-pink-400" size={26} />}
                    </div>
                    <p className="text-xs text-purple-200/80 mb-3">Enter Bubu&apos;s Birthday PIN (MMDD)</p>
                    
                    <div className="flex justify-center gap-3 mb-4">
                      {[0, 1, 2, 3].map((idx) => (
                        <div 
                          key={idx} 
                          className={`w-3.5 h-3.5 rounded-full border border-pink-400 transition-all ${
                            pin.length > idx ? 'bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'bg-transparent'
                          }`} 
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 max-w-[190px] mx-auto">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                        <button
                          key={digit}
                          onClick={() => handlePinClick(digit)}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold text-xs sm:text-sm hover:bg-pink-500/20 hover:border-pink-400 transition-all active:scale-90 cursor-pointer mx-auto flex items-center justify-center"
                        >
                          {digit}
                        </button>
                      ))}
                      <button 
                        onClick={() => setPin('')}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 text-rose-400 font-mono text-[9px] hover:bg-rose-500/20 transition-all active:scale-90 cursor-pointer mx-auto flex items-center justify-center"
                      >
                        CLR
                      </button>
                      <button
                        onClick={() => handlePinClick('0')}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold text-xs sm:text-sm hover:bg-pink-500/20 transition-all active:scale-90 cursor-pointer mx-auto flex items-center justify-center"
                      >
                        0
                      </button>
                    </div>
                  </div>
                ) : (
                  /* UNLOCKED VAULT CARD WITH DIGITAL OATH SEAL STAMP */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto bg-[#0d061a]/95 border border-pink-400/60 rounded-3xl p-5 sm:p-7 backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,0.4)] text-left flex flex-col max-h-[75dvh] overflow-y-auto"
                  >
                    <div className="shrink-0 mb-2 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-mono bg-[#180a2c] py-1 px-3 rounded-xl border border-emerald-500/30">
                        <Unlock size={14} />
                        <span>VAULT UNLOCKED</span>
                      </div>
                    </div>

                    <div className="shrink-0 relative w-full my-1 flex flex-col items-center">
                      <div className="relative w-full rounded-2xl overflow-hidden border border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.35)] bg-black/90 p-1 flex items-center justify-center h-40 sm:h-48">
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
                        <span className="absolute bottom-2 left-2.5 text-[8px] font-mono text-pink-300 tracking-widest uppercase bg-black/80 px-2 py-0.5 rounded-full border border-pink-500/30 backdrop-blur-md">
                          BUBU&apos;S EYES ✨
                        </span>
                        <button
                          onClick={() => setEyesRotation((prev) => (prev + 90) % 360)}
                          className="absolute top-2 right-2.5 bg-pink-500/30 hover:bg-pink-500/60 border border-pink-400 text-white text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 transition-all cursor-pointer backdrop-blur-md shadow-md z-10"
                        >
                          <RotateCw size={10} /> ROTATE
                        </button>
                      </div>
                    </div>

                    <h3 className="shrink-0 text-base sm:text-xl font-bold text-amber-200 mt-2.5 mb-1.5">My Dearest Srushti,</h3>

                    <div className="space-y-3 text-purple-100 text-xs sm:text-sm leading-relaxed font-medium">
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

                    {/* Digital Oath Stamp Button */}
                    <div className="mt-4 pt-3 border-t border-pink-500/30 text-center shrink-0">
                      {!isOathSealed ? (
                        <button
                          onClick={handleSealOath}
                          className="bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-serif italic text-xs px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-amber-300/50 flex items-center justify-center gap-2 mx-auto cursor-pointer hover:scale-105 active:scale-95 transition-all"
                        >
                          <Fingerprint size={16} className="text-amber-200 animate-pulse" />
                          <span>Touch to Stamp Our Digital Fingerprint 🖐️</span>
                        </button>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border-2 border-amber-400 p-3 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.6)] backdrop-blur-md"
                        >
                          <div className="flex items-center justify-center gap-2 text-amber-300 font-serif font-bold text-xs sm:text-sm">
                            <Fingerprint size={18} className="text-amber-400" />
                            <span>SEALED & PROMISED FOR ETERNITY 💍</span>
                          </div>
                          <p className="text-[9px] font-mono text-pink-200/80 mt-1 uppercase tracking-wider">
                            Fingerprint Authenticated // Forever Locked in Hearts
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Unlocked Special Passes inside the Vault */}
                    <div className="mt-4 pt-3 border-t border-pink-500/30 shrink-0">
                      <h4 className="text-[10px] font-mono text-pink-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Ticket size={13} className="text-amber-300" /> Unlocked Bubu VIP Passes:
                      </h4>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { title: "Sleepy Video Call 📞", desc: "Face-to-face calls till sleep", icon: <Video size={13} className="text-pink-400" /> },
                          { title: "Midnight Dessert 🍰", desc: "Treats to your doorstep", icon: <ShoppingBag size={13} className="text-amber-300" /> },
                          { title: "Unlimited VC Kisses 💋", desc: "Screen hugs & kisses on demand", icon: <Heart size={13} className="text-cyan-300 fill-cyan-300" /> },
                          { title: "Next Meetup Date ✈️", desc: "Locked date when schedules align", icon: <Compass size={13} className="text-rose-400" /> },
                        ].map((pass, idx) => (
                          <div key={idx} className="bg-white/5 border border-pink-500/20 rounded-xl p-2 text-center flex flex-col items-center">
                            <div className="mb-0.5 p-1 bg-white/5 rounded-full">{pass.icon}</div>
                            <h5 className="text-[10px] font-bold text-amber-200 mb-0.5 truncate w-full">{pass.title}</h5>
                            <p className="text-[8px] text-purple-200/70 leading-tight">{pass.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2 border-t border-white/10 shrink-0">
                      <p className="text-pink-300 font-serif italic text-xs sm:text-sm text-right">
                        — Forever & Always Yours, Narayan (Your Babu) ❤️
                      </p>
                    </div>
                  </motion.div>
                )}

                <footer className="text-center pt-2 text-[10px] text-purple-200/50 shrink-0">
                  <p>Crafted with endless love by <span className="text-white font-semibold">Narayan</span> for <span className="text-pink-300 font-semibold">Srushti</span></p>
                  <p className="mt-0.5 font-mono text-[9px] text-pink-400/60">August 1, 2026 — Happy Girlfriend Day ❤️</p>
                </footer>
              </div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>

      {/* FULL-SCREEN REAL PAPER PARCHMENT LETTER MODAL (Section 4) */}
      <AnimatePresence>
        {openedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.7, y: 50, rotateX: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[85dvh] overflow-y-auto bg-[#faf4e8] text-[#3d2314] rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(251,191,36,0.35)] border-4 border-[#e6d2b5] text-left font-serif"
            >
              <button 
                onClick={() => setOpenedLetter(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-1.5 mb-2 text-rose-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest border-b border-amber-900/15 pb-1.5">
                <Feather size={13} />
                <span>{openedLetter.title}</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-base leading-relaxed italic text-amber-950 font-medium whitespace-pre-line my-3">
                {openedLetter.body}
              </div>

              <div className="pt-2 border-t border-amber-900/15 flex items-center justify-between mt-4">
                <span className="text-[11px] sm:text-xs font-serif font-bold text-rose-800 italic">
                  {openedLetter.psu}
                </span>

                <div className="w-8 h-8 rounded-full bg-rose-700 border-2 border-rose-900 shadow-md flex items-center justify-center text-white text-xs font-bold font-serif select-none">
                  ❤️
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-1">
                <button 
                  onClick={handlePullLetterFromJar}
                  className="flex-1 bg-gradient-to-r from-rose-700 via-amber-800 to-pink-700 text-white font-serif italic text-xs py-2.5 rounded-full shadow-md transition-all cursor-pointer text-center"
                >
                  Pull Another Letter 💌
                </button>
                <button 
                  onClick={() => setOpenedLetter(null)}
                  className="bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 font-serif italic text-xs px-4 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Put Back 🏺
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OPEN WHEN LETTER MODAL (Section 5) */}
      <AnimatePresence>
        {selectedOpenWhen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 40 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-lg max-h-[85dvh] overflow-y-auto bg-[#faf4e8] text-[#3d2314] rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(236,72,153,0.35)] border-4 border-[#e6d2b5] text-left font-serif"
            >
              <button 
                onClick={() => setSelectedOpenWhen(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-1.5 mb-2 text-pink-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest border-b border-amber-900/15 pb-1.5">
                <Mail size={13} />
                <span>{selectedOpenWhen.title}</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-base leading-relaxed italic text-amber-950 font-medium whitespace-pre-line my-3">
                {selectedOpenWhen.text}
              </div>

              <div className="pt-2 border-t border-amber-900/15 flex items-center justify-between mt-4">
                <span className="text-[11px] sm:text-xs font-serif font-bold text-rose-800 italic">
                  — Always right here with you, Narayan (Your Babu) ❤️
                </span>

                <div className="w-8 h-8 rounded-full bg-pink-700 border-2 border-pink-900 shadow-md flex items-center justify-center text-white text-xs font-bold font-serif select-none">
                  🫂
                </div>
              </div>

              <button 
                onClick={() => setSelectedOpenWhen(null)}
                className="w-full mt-4 bg-gradient-to-r from-rose-700 via-pink-700 to-purple-800 text-white font-serif italic text-xs py-2.5 rounded-full shadow-md transition-all cursor-pointer text-center"
              >
                Close Envelope 💌
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}