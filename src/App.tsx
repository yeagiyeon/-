import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, Play, MessageSquare, Award, Flame, CheckCircle, 
  Layers, Settings, ChevronDown, Check, TrendingUp, Users, Calendar, 
  Volume2, ShieldCheck, Heart, Send, BookOpen, Clock, Smartphone
} from 'lucide-react';

import { PortfolioItem, Inquiry, SiteSettings, FAQItem, ReviewItem, ClientLogo, ReelsVideoItem } from './types';
import { INITIAL_PORTFOLIOS, FAQS, REVIEWS, CLIENTS } from './data';
import customData from './data_custom.json';

// Component imports
import PortfolioGrid from './components/PortfolioGrid';
import ShortformStudio from './components/ShortformStudio';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Simple Counter Component with Scroll Detection
function AnimatedCounter({ end, duration = 1.5, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const totalFrames = 60 * duration;
          const increment = end / totalFrames;
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            start += increment;
            if (frame >= totalFrames) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
      <span className="text-gradient-emerald">{count.toLocaleString()}</span>{suffix}
    </div>
  );
}

// FAQ Accordion Item Component
function FAQItemRow({ question, answer }: { question: string, answer: string, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-5 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 text-slate-900 hover:text-blue-600 transition-colors duration-300 focus:outline-none cursor-pointer"
      >
        <span className="text-md font-bold tracking-tight pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => {
    return customData.hasCustomData && customData.portfolios && customData.portfolios.length > 0
      ? customData.portfolios as PortfolioItem[]
      : [];
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [reelsVideos, setReelsVideos] = useState<ReelsVideoItem[]>(() => {
    return customData.hasCustomData && customData.reelsVideos && customData.reelsVideos.length > 0
      ? customData.reelsVideos as ReelsVideoItem[]
      : [];
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const baseSettings: SiteSettings = {
      heroTitle1: "Build",
      heroTitle2: "Design",
      heroTitle3: "Grow",
      heroSubtitle: "우리는 단순히 예쁜 것을 만드는 회사가 아닙니다.",
      heroDesc: "고객사의 매출과 브랜드 가치를 동시에 성장시키는 성과 중심 파트너입니다. 기획부터 고품격 디자인, 매력적인 영상 기획/촬영, 정밀 광고 및 브랜드 채널 대행까지 원스톱으로 처리합니다.",
      statProjects: 250,
      statVideos: 1500,
      statDesigns: 3000,
      statClients: 100,
      statYears: 10,
      heroPhoneUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400",
      heroPhoneType: "image" as const,
      shortformTitle1: "릴스 하나가",
      shortformTitle2: "브랜드를 바꿉니다.",
      shortformDesc: "단 3초 만에 시청자의 스크롤을 멈추게 만듭니다. 더모아컴퍼니만의 차별화된 숏폼 연구소를 통해 트렌디한 감각과 실질적인 조회수 상승 알고리즘을 이식합니다.",
      heroMockupTag: "LIVE SUCCESS",
      heroMockupUser: "the_moa_studio",
      heroMockupSub: "REELS & SHORTS",
      heroMockupTitle: "“조회수 185만회 폭발”\n성수 카페 브랜딩 프로젝트",
      heroMockupDesc: "3초 후킹 공식과 시네마틱 트랜지션을 결합해 오프라인 대기 줄을 형성시켰습니다.",
      heroMockupBoxLabel: "Metric",
      heroMockupBoxValue: "조회수 185만 돌파",
    };
    return customData.hasCustomData && customData.siteSettings
      ? { ...baseSettings, ...customData.siteSettings } as SiteSettings
      : baseSettings;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    return customData.hasCustomData && customData.faqs && customData.faqs.length > 0
      ? customData.faqs as FAQItem[]
      : [];
  });
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    return customData.hasCustomData && customData.reviews && customData.reviews.length > 0
      ? customData.reviews as ReviewItem[]
      : [];
  });
  const [clients, setClients] = useState<ClientLogo[]>(() => {
    return customData.hasCustomData && customData.clients && customData.clients.length > 0
      ? customData.clients as ClientLogo[]
      : [];
  });

  // Local storage initialization for CRUD & Sections
  useEffect(() => {
    // Resolve baked-in defaults
    const defaultPortfolios = customData.hasCustomData && customData.portfolios && customData.portfolios.length > 0
      ? customData.portfolios as PortfolioItem[]
      : INITIAL_PORTFOLIOS;

    const defaultFaqs = customData.hasCustomData && customData.faqs && customData.faqs.length > 0
      ? customData.faqs as FAQItem[]
      : FAQS;

    const defaultReviews = customData.hasCustomData && customData.reviews && customData.reviews.length > 0
      ? customData.reviews as ReviewItem[]
      : REVIEWS;

    const defaultClients = customData.hasCustomData && customData.clients && customData.clients.length > 0
      ? customData.clients as ClientLogo[]
      : CLIENTS;

    const defaultReels = customData.hasCustomData && customData.reelsVideos && customData.reelsVideos.length > 0
      ? customData.reelsVideos as ReelsVideoItem[]
      : [
          {
            id: 'reels-1',
            url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-a-cafe-close-up-43180-large.mp4',
            type: 'video' as const,
            title: '감성 F&B 숏폼 레퍼런스',
            likes: '12.4K',
          },
          {
            id: 'reels-2',
            url: 'https://assets.mixkit.co/videos/preview/mixkit-model-holding-a-bottle-of-skin-care-cream-39903-large.mp4',
            type: 'video' as const,
            title: '고도 코스메틱 매크로 연출',
            likes: '45.2K',
          },
          {
            id: 'reels-3',
            url: 'https://assets.mixkit.co/videos/preview/mixkit-bright-kitchen-with-wooden-accents-41829-large.mp4',
            type: 'video' as const,
            title: '라이프스타일 인테리어 무드',
            likes: '8.9K',
          }
        ];

    const baseSettings: SiteSettings = {
      heroTitle1: "Build",
      heroTitle2: "Design",
      heroTitle3: "Grow",
      heroSubtitle: "우리는 단순히 예쁜 것을 만드는 회사가 아닙니다.",
      heroDesc: "고객사의 매출과 브랜드 가치를 동시에 성장시키는 성과 중심 파트너입니다. 기획부터 고품격 디자인, 매력적인 영상 기획/촬영, 정밀 광고 및 브랜드 채널 대행까지 원스톱으로 처리합니다.",
      statProjects: 250,
      statVideos: 1500,
      statDesigns: 3000,
      statClients: 100,
      statYears: 10,
      heroPhoneUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400",
      heroPhoneType: "image" as const,
      shortformTitle1: "릴스 하나가",
      shortformTitle2: "브랜드를 바꿉니다.",
      shortformDesc: "단 3초 만에 시청자의 스크롤을 멈추게 만듭니다. 더모아컴퍼니만의 차별화된 숏폼 연구소를 통해 트렌디한 감각과 실질적인 조회수 상승 알고리즘을 이식합니다.",
      heroMockupTag: "LIVE SUCCESS",
      heroMockupUser: "the_moa_studio",
      heroMockupSub: "REELS & SHORTS",
      heroMockupTitle: "“조회수 185만회 폭발”\n성수 카페 브랜딩 프로젝트",
      heroMockupDesc: "3초 후킹 공식과 시네마틱 트랜지션을 결합해 오프라인 대기 줄을 형성시켰습니다.",
      heroMockupBoxLabel: "Metric",
      heroMockupBoxValue: "조회수 185만 돌파",
    };
    const defaultSettings = customData.hasCustomData && customData.siteSettings
      ? { ...baseSettings, ...customData.siteSettings } as SiteSettings
      : baseSettings;

    // Sync with baked-in data if server has a newer version (e.g. deployed version)
    const serverTimestamp = (customData as any).updatedAt || 1;
    const localSyncTimestamp = Number(localStorage.getItem('themoa_last_sync_timestamp') || '0');

    if (customData.hasCustomData && serverTimestamp > localSyncTimestamp) {
      localStorage.setItem('themoa_portfolios', JSON.stringify(defaultPortfolios));
      localStorage.setItem('themoa_site_settings', JSON.stringify(defaultSettings));
      localStorage.setItem('themoa_reels_videos', JSON.stringify(defaultReels));
      localStorage.setItem('themoa_faqs', JSON.stringify(defaultFaqs));
      localStorage.setItem('themoa_reviews', JSON.stringify(defaultReviews));
      localStorage.setItem('themoa_clients', JSON.stringify(defaultClients));
      localStorage.setItem('themoa_last_sync_timestamp', String(serverTimestamp));
      
      setPortfolios(defaultPortfolios);
      setSiteSettings(defaultSettings);
      setReelsVideos(defaultReels);
      setFaqs(defaultFaqs);
      setReviews(defaultReviews);
      setClients(defaultClients);
      
      return;
    }

    // Portfolios
    const savedPortfolios = localStorage.getItem('themoa_portfolios');
    if (savedPortfolios) {
      try {
        const parsed = JSON.parse(savedPortfolios) as PortfolioItem[];
        let updated = false;
        const enriched = parsed.map(item => {
          const match = defaultPortfolios.find(p => p.id === item.id);
          if (match) {
            let itemChanged = false;
            if (!item.media || item.media.length === 0) {
              item.media = match.media;
              itemChanged = true;
            }
            if (itemChanged) {
              updated = true;
            }
          }
          return item;
        });
        setPortfolios(enriched);
        if (updated) {
          localStorage.setItem('themoa_portfolios', JSON.stringify(enriched));
        }
      } catch (e) {
        setPortfolios(defaultPortfolios);
      }
    } else {
      setPortfolios(defaultPortfolios);
      localStorage.setItem('themoa_portfolios', JSON.stringify(defaultPortfolios));
    }

    // Inquiries
    const savedInquiries = localStorage.getItem('themoa_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        setInquiries([]);
      }
    }

    // Site Settings
    const savedSettings = localStorage.getItem('themoa_site_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSiteSettings({
          ...defaultSettings,
          ...parsed
        });
      } catch (e) {
        setSiteSettings(defaultSettings);
      }
    } else {
      setSiteSettings(defaultSettings);
      localStorage.setItem('themoa_site_settings', JSON.stringify(defaultSettings));
    }

    // Reels Videos
    const savedReelsVideos = localStorage.getItem('themoa_reels_videos');
    if (savedReelsVideos) {
      try {
        setReelsVideos(JSON.parse(savedReelsVideos));
      } catch (e) {
        // Fallback
      }
    } else {
      setReelsVideos(defaultReels);
      localStorage.setItem('themoa_reels_videos', JSON.stringify(defaultReels));
    }

    // FAQs
    const savedFaqs = localStorage.getItem('themoa_faqs');
    if (savedFaqs) {
      try {
        setFaqs(JSON.parse(savedFaqs));
      } catch (e) {
        setFaqs(defaultFaqs);
      }
    } else {
      setFaqs(defaultFaqs);
      localStorage.setItem('themoa_faqs', JSON.stringify(defaultFaqs));
    }

    // Reviews
    const savedReviews = localStorage.getItem('themoa_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        setReviews(defaultReviews);
      }
    } else {
      setReviews(defaultReviews);
      localStorage.setItem('themoa_reviews', JSON.stringify(defaultReviews));
    }

    // Clients
    const savedClients = localStorage.getItem('themoa_clients');
    if (savedClients) {
      try {
        setClients(JSON.parse(savedClients));
      } catch (e) {
        setClients(defaultClients);
      }
    } else {
      setClients(defaultClients);
      localStorage.setItem('themoa_clients', JSON.stringify(defaultClients));
    }
  }, []);

  // Sync states to local storage on changes
  const savePortfolios = (updated: PortfolioItem[]) => {
    setPortfolios(updated);
    try {
      localStorage.setItem('themoa_portfolios', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage portfolios save failed:', e);
      alert('브라우저 저장공간 한계를 초과하여 포트폴리오 변경사항이 이번 세션에만 임시 유지됩니다. (2MB 이하의 가벼운 업로드 파일이나 직접 URL 입력을 권장합니다)');
    }
  };

  const handleSaveSiteSettings = (updated: SiteSettings) => {
    setSiteSettings(updated);
    try {
      localStorage.setItem('themoa_site_settings', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage site settings save failed:', e);
    }
  };

  const handleSaveFaqs = (updated: FAQItem[]) => {
    setFaqs(updated);
    try {
      localStorage.setItem('themoa_faqs', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage FAQs save failed:', e);
    }
  };

  const handleSaveReviews = (updated: ReviewItem[]) => {
    setReviews(updated);
    try {
      localStorage.setItem('themoa_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage reviews save failed:', e);
    }
  };

  const handleSaveClients = (updated: ClientLogo[]) => {
    setClients(updated);
    try {
      localStorage.setItem('themoa_clients', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage clients save failed:', e);
    }
  };

  const handleSaveReelsVideos = (updated: ReelsVideoItem[]) => {
    setReelsVideos(updated);
    try {
      localStorage.setItem('themoa_reels_videos', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage reels videos save failed:', e);
      alert('브라우저 저장공간 한계를 초과하여 쇼츠 레퍼런스 변경사항이 이번 세션에만 임시 유지됩니다. (2MB 이하의 가볍고 짧은 비디오/이미지를 사용하시거나 직접 링크 주소(URL) 입력을 권장합니다)');
    }
  };

  const saveInquiries = (updated: Inquiry[]) => {
    setInquiries(updated);
    try {
      localStorage.setItem('themoa_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage inquiries save failed:', e);
    }
  };

  // Portfolio actions
  const handleAddPortfolio = (newItem: Omit<PortfolioItem, 'id'>) => {
    const portfolioWithId: PortfolioItem = {
      ...newItem,
      id: `port-${Date.now()}`
    };
    savePortfolios([portfolioWithId, ...portfolios]);
  };

  const handleEditPortfolio = (id: string, updatedFields: Partial<PortfolioItem>) => {
    const updated = portfolios.map(item => 
      item.id === id ? { ...item, ...updatedFields } as PortfolioItem : item
    );
    savePortfolios(updated);
  };

  const handleDeletePortfolio = (id: string) => {
    const updated = portfolios.filter(item => item.id !== id);
    savePortfolios(updated);
  };

  // Inquiry actions
  const handleAddInquiry = (inquiryData: Omit<Inquiry, 'id' | 'status' | 'submittedAt'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    };
    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);
  };

  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map(inq => 
      inq.id === id ? { ...inq, status } : inq
    );
    saveInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    saveInquiries(updated);
  };

  // Custom UI Hero Slide lists
  const HERO_SLIDES = [
    { type: '릴스 🎥', metric: '조회수 185만회', title: '성수 카페 브랜딩 릴스', bg: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=300' },
    { type: '쇼츠 📱', metric: 'ROAS 580% 달성', title: '엘르제 코스메틱 필름', bg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300' },
    { type: '웹사이트 🌐', metric: '전환율 24% 기록', title: '웰베디 필라테스 구축', bg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300' },
    { type: '디자인 🎨', metric: '펀딩 6,800% 돌파', title: '건기식 상세페이지 설계', bg: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=300' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden font-sans select-none relative">
      
      {/* 1. Header/Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-xl tracking-tight text-slate-900 select-none">
                <span className="font-light">the</span>
                <span className="font-extrabold text-blue-600">moa</span>
                <span className="font-light text-slate-500">company</span>
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] font-bold tracking-wider uppercase">
              <a href="#why-section" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">왜 더모아인가</a>
              <a href="#services-section" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">제공 서비스</a>
              <a href="#portfolio-section" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">포트폴리오</a>
              <a href="#shortform-section" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                쇼츠 스튜디오
              </a>
              <a href="#faq-section" className="text-slate-600 hover:text-blue-600 transition-colors duration-300">자주 묻는 질문</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#portfolio-section"
                className="hidden sm:inline-flex px-5 py-2 bg-transparent hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 rounded-full transition-all"
              >
                포트폴리오 보기
              </a>
              <a
                href="#contact-section"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-all flex items-center gap-1"
              >
                <span>무료 상담 신청하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-[#f8fafc] overflow-hidden min-h-[90vh] flex items-center border-b border-slate-200/85">
        {/* Creative Abstract Background Lines & Lights */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-45" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Texts (Hero Title) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest rounded mb-2">
                종합 마케팅 파트너
              </div>

              {/* Stacked Build Design Grow */}
              <div className="space-y-1">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-7xl sm:text-[100px] md:text-[110px] lg:text-[120px] font-sans font-black tracking-[-0.04em] leading-[0.85] text-slate-900 block uppercase"
                >
                  {siteSettings.heroTitle1}<span className="text-blue-600">.</span>
                </motion.h1>
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-7xl sm:text-[100px] md:text-[110px] lg:text-[120px] font-sans font-black tracking-[-0.04em] leading-[0.85] text-slate-900 block uppercase"
                >
                  {siteSettings.heroTitle2}<span className="text-blue-600">.</span>
                </motion.h1>
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-7xl sm:text-[100px] md:text-[110px] lg:text-[120px] font-sans font-black tracking-[-0.04em] leading-[0.85] text-gradient-emerald block uppercase"
                >
                  {siteSettings.heroTitle3}<span className="text-slate-900">.</span>
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="space-y-4"
              >
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {siteSettings.heroSubtitle}
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {siteSettings.heroDesc}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <a
                  href="#contact-section"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-all duration-300 shadow-xl shadow-blue-500/15 flex items-center gap-2 cursor-pointer"
                >
                  <span>무료 상담 신청하기</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#portfolio-section"
                  className="px-8 py-4 bg-transparent hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm rounded-full transition-all duration-300 cursor-pointer"
                >
                  포트폴리오 보기
                </a>
              </motion.div>
            </div>

            {/* Right Panel: Auto-sliding device mockups */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* Smartphone Mockup Frame */}
              <div className="relative w-full max-w-[300px] aspect-[9/18] bg-[#0b0b0b] rounded-[42px] p-3 border-[6px] border-neutral-800 shadow-2xl shadow-blue-500/5 overflow-hidden">
                {/* Speaker notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-800 rounded-b-xl z-30" />

                {/* Simulated content container */}
                <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black">
                  
                  {/* Slider Wrapper */}
                  <div className="w-full h-full relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={Date.now()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                      >
                        {/* Multi Layer Slides representing works */}
                        <div className="w-full h-full flex flex-col justify-between p-6 relative">
                          {siteSettings.heroPhoneType === 'video' ? (
                            <video
                              src={siteSettings.heroPhoneUrl || "https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-a-cafe-close-up-43180-large.mp4"}
                              className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img 
                              src={siteSettings.heroPhoneUrl || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400"}
                              alt="Visual mock"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-lighten pointer-events-none"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 z-10" />

                          {/* Slide Top Details */}
                          <div className="relative z-20 flex justify-between items-start">
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-extrabold rounded">
                              {siteSettings.heroMockupTag || "LIVE SUCCESS"}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">{siteSettings.heroMockupUser || "the_moa_studio"}</span>
                          </div>

                          {/* Slide Center Details */}
                          <div className="relative z-20 space-y-3 text-left">
                            <span className="text-xs text-blue-400 font-bold block tracking-wider font-mono">
                              {siteSettings.heroMockupSub || "REELS & SHORTS"}
                            </span>
                            <h4 className="text-lg font-bold text-white tracking-tight leading-snug whitespace-pre-line">
                              {siteSettings.heroMockupTitle || "“조회수 185만회 폭발”\n성수 카페 브랜딩 프로젝트"}
                            </h4>
                            <p className="text-[11px] text-gray-400 leading-normal">
                              {siteSettings.heroMockupDesc || "3초 후킹 공식과 시네마틱 트랜지션을 결합해 오프라인 대기 줄을 형성시켰습니다."}
                            </p>
                          </div>

                          {/* Slide Bottom Stats overlay */}
                          <div className="relative z-20 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                            <div className="text-left">
                              <span className="text-[9px] text-gray-400 block uppercase font-mono">{siteSettings.heroMockupBoxLabel || "Metric"}</span>
                              <span className="text-xs font-black text-blue-400">{siteSettings.heroMockupBoxValue || "조회수 185만 돌파"}</span>
                            </div>
                            <div className="p-1.5 bg-blue-600 text-white rounded-full">
                              <Play className="w-3 h-3 fill-white" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>
              </div>

              {/* Decorative side floating cards to enrich layout */}
              <div className="absolute -right-6 top-10 p-4 bg-white/80 border border-slate-200 rounded-2xl shadow-xl shadow-slate-100 backdrop-blur-md max-w-[150px] space-y-1 z-20 hidden sm:block">
                <span className="text-[9px] text-blue-600 font-bold tracking-wider font-mono uppercase">Performance</span>
                <h5 className="text-xs font-bold text-slate-900">SNS 문의 300%↑</h5>
                <p className="text-[9px] text-slate-500">르무아 에스테틱 채널 운영 결과</p>
              </div>

              <div className="absolute -left-10 bottom-10 p-4 bg-white/80 border border-slate-200 rounded-2xl shadow-xl shadow-slate-100 backdrop-blur-md max-w-[160px] space-y-1 z-20 hidden sm:block">
                <span className="text-[9px] text-blue-600 font-bold tracking-wider font-mono uppercase">ROAS</span>
                <h5 className="text-xs font-bold text-slate-900">매출성장 580%</h5>
                <p className="text-[9px] text-slate-500">엘르제 숏폼 광고 집행 결과</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Section: Why THE MOA */}
      <section id="why-section" className="py-24 bg-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mb-4">
              WHY THE MOA COMPANY
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] mt-2 uppercase break-keep">
              마케팅은 예쁘게 만드는 것에 그치는 것이 아니라,<br />
              <span className="text-gradient-emerald">결국 실제 성장과 매출 성과를<br />만드는 일입니다.</span>
            </h2>
          </div>

          {/* 4 Bento Style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group rounded-2xl">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <TrendingUp className="w-5 h-5 font-bold" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Brand Strategy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  단순 모방이 아닌, 철저한 브랜드 시장 분석과 정교한 고객 타겟 조사를 바탕으로 우리 회사에 최적화된 맞춤형 성장 로드맵 컨설팅을 도출합니다.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500/50 transition-colors mt-6 block">01 / STRATEGY</span>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group rounded-2xl">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Flame className="w-5 h-5 font-bold" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Contents</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  스크롤을 붙잡는 마법의 3초 후킹 시나리오 설계와 고화질 시네마틱 카메라 기획/촬영, 트렌디한 타이포 모션 편집으로 고객들의 심리를 즉시 자극합니다.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500/50 transition-colors mt-6 block">02 / CONTENTS</span>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group rounded-2xl">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Layers className="w-5 h-5 font-bold" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Design</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apple, Notion과 같은 군더더기 없는 미니멀리즘 설계로 브랜드의 본질 가치만을 극대화하고 시청자의 신뢰도를 즉각적으로 배가시키는 디자인을 연출합니다.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500/50 transition-colors mt-6 block">03 / DESIGN</span>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group rounded-2xl">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Users className="w-5 h-5 font-bold" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Marketing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  제작된 고효율 콘텐츠를 활용해 Meta, Google 시스템 타겟 세팅과 ROAS 시너지 성과 데이터 분석 대시보드를 구축해 완벽한 성장을 대행합니다.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500/50 transition-colors mt-6 block">04 / MARKETING</span>
            </div>

          </div>

          {/* Under Banner */}
          <div className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-2xl text-center max-w-4xl mx-auto">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              우리는 단순 디자인 회사도, 외주 영상 편집 공장도 아닙니다.<br />
              <strong className="text-slate-900 text-md font-extrabold">기획부터 촬영, 편집, 성과 추적까지 브랜드의 성장을 완성시키는 고도의 종합 마케팅 파트너입니다.</strong>
            </p>
          </div>

        </div>
      </section>

      {/* 4. Section: Services */}
      <section id="services-section" className="py-24 bg-slate-50 relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mb-4">
              SERVICES SCOPE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase">
              더모아컴퍼니가 <span className="text-gradient-emerald">제공하는 서비스</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
              고객의 성공을 위해 전문적인 맞춤형 올인원 솔루션을 제공합니다.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl space-y-6 relative overflow-hidden group hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs text-blue-600 font-mono font-bold uppercase block">01 / Video focus</span>
                <h3 className="text-xl font-bold text-slate-900">릴스·숏폼 촬영 및 편집 대행</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                초반 3초에 시선을 끄는 고강도 시놉시스 기획안부터 고성능 전문 촬영, 효과적인 타이포그래피 모션 자막, 중독성 높은 배경음 합성 및 알고리즘 세팅까지 원스톱 제작합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['촬영 대본', '시네마틱 4K 촬영', '트렌디 자막', '알고리즘 업로드'].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl space-y-6 relative overflow-hidden group hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs text-blue-600 font-mono font-bold uppercase block">02 / Operation</span>
                <h3 className="text-xl font-bold text-slate-900">인스타그램 채널 운영 대행</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                인스타그램 피드의 톤앤매너 레이아웃 템플릿 개발, 유익한 정보성 카드뉴스 및 감도 높은 브랜드 스토리 발행을 주 3회 정기 진행하여 유입과 팬덤을 동시에 구축합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['피드 레이아웃', '해시태그 설계', 'DM 유입 유도', '스토리 브랜딩'].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl space-y-6 relative overflow-hidden group hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs text-blue-600 font-mono font-bold uppercase block">03 / Web Dev</span>
                <h3 className="text-xl font-bold text-slate-900">브랜드 웹사이트 및 랜딩페이지</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                사용자가 스크롤을 내릴 때마다 신뢰감을 고조시키는 세련된 Apple 감성의 인터랙션 웹과 상담 문의로 이어지는 전환 최적화 랜딩페이지를 직접 기획 및 개발합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['반응형 웹', 'Apple 스타일', 'SEO 최적화', '전환 최적화 UX'].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl space-y-6 relative overflow-hidden group hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs text-blue-600 font-mono font-bold uppercase block">04 / Visual</span>
                <h3 className="text-xl font-bold text-slate-900">브랜드 디자인 (BI·로고·상세페이지)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                클래식하고 미니멀한 명품 로고 심볼 디자인부터 제품의 과학적 기능성을 효과적으로 표현해 스크롤을 멈추게 만드는 크라우드펀딩용 프리미엄 상세페이지를 설계합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['BI/CI 로고', '펀딩용 상세페이지', '패키지 도면', '브랜드 가이드'].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Service 5 */}
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl space-y-6 relative overflow-hidden group hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs text-blue-600 font-mono font-bold uppercase block">05 / Performance</span>
                <h3 className="text-xl font-bold text-slate-900">디지털 타겟팅 광고 시스템 운영</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                메타(인스타그램), 구글 애드워즈 시스템 광고 세팅과 성과 추적 태그(Pixel) 결합을 통해 가장 높은 매출 전환 ROAS를 달성할 수 있는 데이터를 설계하고 조율합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Meta 타겟팅', '픽셀 분석', '소재 A/B 테스트', 'ROAS 지표 보고'].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Service 6 */}
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl space-y-6 relative overflow-hidden group hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="space-y-2">
                <span className="text-xs text-blue-600 font-mono font-bold uppercase block">06 / Consulting</span>
                <h3 className="text-xl font-bold text-slate-900">마케팅 및 브랜딩 종합 컨설팅</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                채널 유입 구조 분석, 타겟 타겟팅 피드백, 시장 포지셔닝 진단을 통해 장기적인 브랜드 생존 가치와 성장 활로를 개척해주는 고밀도 비즈니스 어드바이징을 결합합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['경쟁사 추적', '채널 유입 진단', '스케일업 어드바이스', '장기 로드맵'].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{tag}</span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Section: Portfolio Grid */}
      <PortfolioGrid items={portfolios} />

      {/* 6. Section: Shortform Studio Special Deep Dive */}
      <div id="shortform-section">
        <ShortformStudio reelsVideos={reelsVideos} siteSettings={siteSettings} />
      </div>

      {/* 7. Section: Performance Statistics */}
      <section className="bg-white relative border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-5 text-center">
            
            {/* Stat 1 */}
            <div className="border-r border-b border-slate-100 md:border-b-0 p-8 sm:p-12 flex flex-col items-center justify-center">
              <AnimatedCounter end={siteSettings.statProjects} suffix="+" />
              <div className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-3">Projects</div>
            </div>

            {/* Stat 2 */}
            <div className="border-b border-slate-100 sm:border-r md:border-b-0 p-8 sm:p-12 flex flex-col items-center justify-center">
              <AnimatedCounter end={siteSettings.statVideos} suffix="+" />
              <div className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-3">Videos</div>
            </div>

            {/* Stat 3 */}
            <div className="border-r border-b border-slate-100 md:border-b-0 p-8 sm:p-12 flex flex-col items-center justify-center">
              <AnimatedCounter end={siteSettings.statDesigns} suffix="+" />
              <div className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-3">Designs</div>
            </div>

            {/* Stat 4 */}
            <div className="border-b border-slate-100 sm:border-r md:border-b-0 p-8 sm:p-12 flex flex-col items-center justify-center">
              <AnimatedCounter end={siteSettings.statClients} suffix="+" />
              <div className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-3">Clients</div>
            </div>

            {/* Stat 5 */}
            <div className="col-span-2 md:col-span-1 p-8 sm:p-12 flex flex-col items-center justify-center">
              <AnimatedCounter end={siteSettings.statYears} suffix="+" />
              <div className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-3">Years Exp</div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Section: Process */}
      <section id="process-section" className="py-24 bg-slate-50 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mb-4">
              CREATIVE PROCESS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase">
              더모아컴퍼니의 <span className="text-gradient-emerald">체계적인 협업 프로세스</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3">
              성공적인 파트너십을 위한 완벽하게 조율된 단계별 워크플로우를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            
            {/* Step 1 */}
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl relative flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300 shadow-sm shadow-slate-100/40 hover:shadow-md">
              <span className="text-3xl font-display font-black text-blue-600/15 font-mono block mb-4">01</span>
              <div>
                <h4 className="text-md font-bold text-slate-900 mb-2">사전 심층 상담</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  브랜드의 현 상황, 해결해야 할 페인 포인트, 마케팅 예산 및 희망 채널을 정밀 파악합니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl relative flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300 shadow-sm shadow-slate-100/40 hover:shadow-md">
              <span className="text-3xl font-display font-black text-blue-600/15 font-mono block mb-4">02</span>
              <div>
                <h4 className="text-md font-bold text-slate-900 mb-2">콘텐츠 기획안</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  타겟 시선과 알고리즘 분석을 토대로 시놉시스 스크립트 작성 및 톤앤매너 피드 제안서를 수립합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl relative flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300 shadow-sm shadow-slate-100/40 hover:shadow-md">
              <span className="text-3xl font-display font-black text-blue-600/15 font-mono block mb-4">03</span>
              <div>
                <h4 className="text-md font-bold text-slate-900 mb-2">밀착 현장 촬영</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  일정에 맞춰 전문 디렉터와 카메라팀이 현장에 방문하여 제품 또는 공간 고감도 영상 소스를 연출합니다.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl relative flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300 shadow-sm shadow-slate-100/40 hover:shadow-md">
              <span className="text-3xl font-display font-black text-blue-600/15 font-mono block mb-4">04</span>
              <div>
                <h4 className="text-md font-bold text-slate-900 mb-2">디자인 & 편집</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  트렌디 음원 템플릿과 고유 타이포 모션, 고해상도 피그마 디자인을 적용해 가편집 시안을 제작합니다.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl relative flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300 shadow-sm shadow-slate-100/40 hover:shadow-md">
              <span className="text-3xl font-display font-black text-blue-600/15 font-mono block mb-4">05</span>
              <div>
                <h4 className="text-md font-bold text-slate-900 mb-2">검수 및 피드백</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  대표님과의 단톡방 소통 채널을 통해 오타 및 미세 편집 수정사항 2회 최종 검수를 조율합니다.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-6 bg-white border border-slate-200/80 rounded-2xl relative flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-300 shadow-sm shadow-slate-100/40 hover:shadow-md">
              <span className="text-3xl font-display font-black text-blue-600/15 font-mono block mb-4">06</span>
              <div>
                <h4 className="text-md font-bold text-slate-900 mb-2">최종 납품 / 대행</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  모든 자산 원본 전달 및 인스타그램 최적 시간대 업로드 대행과 타겟 타겟팅 성과 모니터링을 작동시킵니다.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Section: Clients */}
      <section className="py-24 bg-white relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black tracking-[-0.02em] uppercase text-slate-900">이미 수많은 업종과 성공을 동행했습니다.</h3>
            <p className="text-xs text-slate-500 mt-2">다양한 프리미엄 클라이언트 브랜드들이 더모아와 매달 성과를 갱신합니다.</p>
          </div>

          {/* Grayscale to color grid logo cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clients.map((client, idx) => (
              <div 
                key={idx}
                className="p-6 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-blue-500/20 rounded-2xl text-center group transition-all duration-300 cursor-default shadow-sm"
              >
                <div className="text-md font-extrabold text-slate-400 group-hover:text-blue-600 transition-colors duration-300 font-mono mb-1">
                  {client.symbol}
                </div>
                <div className="text-[10px] text-slate-500 group-hover:text-slate-700 transition-colors duration-300 font-medium">
                  {client.name} | {client.industry}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {['☕ 카페/F&B', '💄 코스메틱/뷰티', '🩺 전문병원', '🏢 벤처/기업', '🎓 프리미엄 교육', '🥗 웰니스 식품', '🛍️ 디자이너 쇼핑몰', '🍟 프랜차이즈'].map((ind, i) => (
              <span key={i} className="px-3.5 py-1.5 bg-blue-500/5 text-blue-600 border border-blue-500/10 rounded-xl text-xs font-semibold">
                {ind}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Section: Reviews */}
      <section className="py-24 bg-slate-50 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mb-4">
              CLIENT REVIEWS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase">
              더모아와 동행 중인 <span className="text-gradient-emerald">대표님들의 극찬</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between space-y-6 hover:border-blue-500/20 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {Array.from({ length: rev.stars }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    {rev.author}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {rev.company}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. Section: FAQ Accordion */}
      <section id="faq-section" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mb-4">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase">
              자주 묻는 <span className="text-gradient-emerald">질문 및 상세 답변</span>
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-2 shadow-sm">
            {faqs.map((faq, idx) => (
              <FAQItemRow key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>

        </div>
      </section>

      {/* 12. Section: Contact Form */}
      <ContactForm onSubmitInquiry={handleAddInquiry} />

      {/* 13. Footer */}
      <Footer />

      {/* 14. Admin Panel Panel */}
      <AdminPanel
        portfolios={portfolios}
        inquiries={inquiries}
        siteSettings={siteSettings}
        faqs={faqs}
        reviews={reviews}
        clients={clients}
        reelsVideos={reelsVideos}
        onAddPortfolio={handleAddPortfolio}
        onEditPortfolio={handleEditPortfolio}
        onDeletePortfolio={handleDeletePortfolio}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onSaveSiteSettings={handleSaveSiteSettings}
        onSaveFaqs={handleSaveFaqs}
        onSaveReviews={handleSaveReviews}
        onSaveClients={handleSaveClients}
        onSaveReelsVideos={handleSaveReelsVideos}
        isOpen={isAdminOpen}
        setIsOpen={setIsAdminOpen}
      />

    </div>
  );
}
