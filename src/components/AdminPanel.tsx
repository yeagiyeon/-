import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem, Inquiry, SiteSettings, FAQItem, ReviewItem, ClientLogo, ReelsVideoItem } from '../types';
import { 
  Lock, Key, Settings, Plus, Trash2, Edit2, LogOut, CheckCircle2, 
  MessageSquare, FileText, Layers, X, Eye, EyeOff, Calendar, Award, Sparkles, User, HelpCircle,
  PlusCircle, Smile, Megaphone, BarChart3, LayoutGrid, Upload, ArrowUp, ArrowDown, Smartphone, Video
} from 'lucide-react';

interface AdminPanelProps {
  portfolios: PortfolioItem[];
  inquiries: Inquiry[];
  siteSettings: SiteSettings;
  faqs: FAQItem[];
  reviews: ReviewItem[];
  clients: ClientLogo[];
  reelsVideos: ReelsVideoItem[];
  onAddPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  onEditPortfolio: (id: string, updated: Partial<PortfolioItem>) => void;
  onDeletePortfolio: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onSaveSiteSettings: (settings: SiteSettings) => void;
  onSaveFaqs: (faqs: FAQItem[]) => void;
  onSaveReviews: (reviews: ReviewItem[]) => void;
  onSaveClients: (clients: ClientLogo[]) => void;
  onSaveReelsVideos: (reels: ReelsVideoItem[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

export default function AdminPanel({
  portfolios,
  inquiries,
  siteSettings,
  faqs,
  reviews,
  clients,
  reelsVideos,
  onAddPortfolio,
  onEditPortfolio,
  onDeletePortfolio,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onSaveSiteSettings,
  onSaveFaqs,
  onSaveReviews,
  onSaveClients,
  onSaveReelsVideos,
  isOpen,
  setIsOpen
}: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'portfolio' | 'inquiry' | 'sections'>('portfolio');
  const [sectionsSubTab, setSectionsSubTab] = useState<'hero' | 'shortform' | 'faq' | 'reviews' | 'clients'>('hero');
  
  // Form states for Add / Edit Portfolio
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formCategory, setFormCategory] = useState<PortfolioItem['category']>('reels');
  const [formTitle, setFormTitle] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formMetrics, setFormMetrics] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formMedia, setFormMedia] = useState<{ id: string; type: 'image' | 'video'; url: string }[]>([]);
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [mediaTypeInput, setMediaTypeInput] = useState<'image' | 'video'>('image');

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Site Settings Form States
  const [heroTitle1, setHeroTitle1] = useState('');
  const [heroTitle2, setHeroTitle2] = useState('');
  const [heroTitle3, setHeroTitle3] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  const [statProjects, setStatProjects] = useState<number>(250);
  const [statVideos, setStatVideos] = useState<number>(1500);
  const [statDesigns, setStatDesigns] = useState<number>(3000);
  const [statClients, setStatClients] = useState<number>(100);
  const [statYears, setStatYears] = useState<number>(10);
  
  const [heroPhoneUrl, setHeroPhoneUrl] = useState('');
  const [heroPhoneType, setHeroPhoneType] = useState<'image' | 'video'>('image');
  const [shortformTitle1, setShortformTitle1] = useState('');
  const [shortformTitle2, setShortformTitle2] = useState('');
  const [shortformDesc, setShortformDesc] = useState('');

  const [heroMockupTag, setHeroMockupTag] = useState('');
  const [heroMockupUser, setHeroMockupUser] = useState('');
  const [heroMockupSub, setHeroMockupSub] = useState('');
  const [heroMockupTitle, setHeroMockupTitle] = useState('');
  const [heroMockupDesc, setHeroMockupDesc] = useState('');
  const [heroMockupBoxLabel, setHeroMockupBoxLabel] = useState('');
  const [heroMockupBoxValue, setHeroMockupBoxValue] = useState('');

  // Reels Videos Form States
  const [reelsUrl, setReelsUrl] = useState('');
  const [reelsType, setReelsType] = useState<'image' | 'video'>('video');
  const [reelsTitle, setReelsTitle] = useState('');
  const [reelsLikes, setReelsLikes] = useState('10K');

  // FAQ Form States
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Review Form States
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCompany, setReviewCompany] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Client Form States
  const [clientName, setClientName] = useState('');
  const [clientIndustry, setClientIndustry] = useState('');
  const [clientSymbol, setClientSymbol] = useState('');

  // Synchronize siteSettings form states when siteSettings changes
  useEffect(() => {
    if (siteSettings) {
      setHeroTitle1(siteSettings.heroTitle1 || '');
      setHeroTitle2(siteSettings.heroTitle2 || '');
      setHeroTitle3(siteSettings.heroTitle3 || '');
      setHeroSubtitle(siteSettings.heroSubtitle || '');
      setHeroDesc(siteSettings.heroDesc || '');
      setStatProjects(siteSettings.statProjects ?? 250);
      setStatVideos(siteSettings.statVideos ?? 1500);
      setStatDesigns(siteSettings.statDesigns ?? 3000);
      setStatClients(siteSettings.statClients ?? 100);
      setStatYears(siteSettings.statYears ?? 10);
      setHeroPhoneUrl(siteSettings.heroPhoneUrl || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400');
      setHeroPhoneType(siteSettings.heroPhoneType || 'image');
      setShortformTitle1(siteSettings.shortformTitle1 || '릴스 하나가');
      setShortformTitle2(siteSettings.shortformTitle2 || '브랜드를 바꿉니다.');
      setShortformDesc(siteSettings.shortformDesc || '단 3초 만에 시청자의 스크롤을 멈추게 만듭니다. 더모아컴퍼니만의 차별화된 숏폼 연구소를 통해 트렌디한 감각과 실질적인 조회수 상승 알고리즘을 이식합니다.');
      setHeroMockupTag(siteSettings.heroMockupTag || 'LIVE SUCCESS');
      setHeroMockupUser(siteSettings.heroMockupUser || 'the_moa_studio');
      setHeroMockupSub(siteSettings.heroMockupSub || 'REELS & SHORTS');
      setHeroMockupTitle(siteSettings.heroMockupTitle || '“조회수 185만회 폭발”\n성수 카페 브랜딩 프로젝트');
      setHeroMockupDesc(siteSettings.heroMockupDesc || '3초 후킹 공식과 시네마틱 트랜지션을 결합해 오프라인 대기 줄을 형성시켰습니다.');
      setHeroMockupBoxLabel(siteSettings.heroMockupBoxLabel || 'Metric');
      setHeroMockupBoxValue(siteSettings.heroMockupBoxValue || '조회수 185만 돌파');
    }
  }, [siteSettings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsLoggedIn(true);
      setError('');
      setPassword('');
    } else {
      setError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setFormCategory('reels');
    setFormTitle('');
    setFormClient('');
    setFormDescription('');
    setFormMetrics('');
    setFormDuration('');
    setFormImageUrl('');
    setFormVideoUrl('');
    setFormContent('');
    setFormMedia([]);
    setMediaUrlInput('');
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmitPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formClient || !formDescription || !formMetrics || !formDuration || !formContent) {
      alert('필수 정보(제목, 클라이언트, 설명, 지표, 기간, 상세 내용)를 입력해 주세요.');
      return;
    }

    // Auto-extract first image and video if formImageUrl/formVideoUrl is empty
    let finalImageUrl = formImageUrl;
    let finalVideoUrl = formVideoUrl;

    if (formMedia.length > 0) {
      const firstImg = formMedia.find(m => m.type === 'image');
      if (firstImg && !finalImageUrl) {
        finalImageUrl = firstImg.url;
      }
      const firstVid = formMedia.find(m => m.type === 'video');
      if (firstVid && !finalVideoUrl) {
        finalVideoUrl = firstVid.url;
      }
    }

    // If still no thumbnail, fallback to first media item's url or standard placeholder
    if (!finalImageUrl) {
      if (formMedia.length > 0) {
        finalImageUrl = formMedia[0].url;
      } else {
        finalImageUrl = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800';
      }
    }

    const portfolioData = {
      category: formCategory,
      title: formTitle,
      client: formClient,
      description: formDescription,
      metrics: formMetrics,
      duration: formDuration,
      imageUrl: finalImageUrl,
      videoUrl: finalVideoUrl || undefined,
      content: formContent,
      media: formMedia.length > 0 ? formMedia : [
        ...(finalImageUrl ? [{ id: `init-img-${Date.now()}`, type: 'image' as const, url: finalImageUrl }] : []),
        ...(finalVideoUrl ? [{ id: `init-vid-${Date.now()}`, type: 'video' as const, url: finalVideoUrl }] : [])
      ]
    };

    if (isEditing && editId) {
      onEditPortfolio(editId, portfolioData);
      alert('성공적으로 수정되었습니다.');
    } else {
      onAddPortfolio(portfolioData);
      alert('성공적으로 추가되었습니다.');
    }

    resetForm();
  };

  const startEdit = (item: PortfolioItem) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormCategory(item.category);
    setFormTitle(item.title);
    setFormClient(item.client);
    setFormDescription(item.description);
    setFormMetrics(item.metrics);
    setFormDuration(item.duration);
    setFormImageUrl(item.imageUrl);
    setFormVideoUrl(item.videoUrl || '');
    setFormContent(item.content);
    
    // Set form media, converting legacy inputs into media gallery automatically
    if (item.media && item.media.length > 0) {
      setFormMedia(item.media);
    } else {
      const initialMediaList = [];
      if (item.videoUrl) {
        initialMediaList.push({ id: `vid-${Date.now()}-1`, type: 'video' as const, url: item.videoUrl });
      }
      if (item.imageUrl) {
        initialMediaList.push({ id: `img-${Date.now()}-2`, type: 'image' as const, url: item.imageUrl });
      }
      setFormMedia(initialMediaList);
    }
  };

  const handleLocalFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      const isVideoType = file.type.startsWith('video/');
      const isImageType = file.type.startsWith('image/');
      
      if (!isVideoType && !isImageType) {
        alert('이미지 또는 동영상 파일만 업로드할 수 있습니다.');
        return;
      }
      
      reader.onload = async (event) => {
        if (event.target?.result) {
          let resultUrl = event.target.result as string;
          if (isImageType) {
            try {
              resultUrl = await compressImage(resultUrl);
            } catch (err) {
              console.error('Image compression failed:', err);
            }
          }
          const newMediaItem = {
            id: `${isVideoType ? 'vid' : 'img'}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            type: isVideoType ? 'video' as const : 'image' as const,
            url: resultUrl,
          };
          setFormMedia((prev) => {
            const nextMedia = [...prev, newMediaItem];
            // If there's no main thumbnail image yet, automatically assign the first image
            if (!formImageUrl && !isVideoType) {
              setFormImageUrl(newMediaItem.url);
            }
            return nextMedia;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMediaDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleMediaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;
    
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      const isVideoType = file.type.startsWith('video/');
      const isImageType = file.type.startsWith('image/');
      
      if (!isVideoType && !isImageType) {
        return;
      }
      
      reader.onload = async (event) => {
        if (event.target?.result) {
          let resultUrl = event.target.result as string;
          if (isImageType) {
            try {
              resultUrl = await compressImage(resultUrl);
            } catch (err) {
              console.error('Image compression failed:', err);
            }
          }
          const newMediaItem = {
            id: `${isVideoType ? 'vid' : 'img'}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            type: isVideoType ? 'video' as const : 'image' as const,
            url: resultUrl,
          };
          setFormMedia((prev) => {
            const nextMedia = [...prev, newMediaItem];
            if (!formImageUrl && !isVideoType) {
              setFormImageUrl(newMediaItem.url);
            }
            return nextMedia;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddMediaUrl = () => {
    if (!mediaUrlInput.trim()) return;
    const isVid = mediaUrlInput.includes('youtube.com') || mediaUrlInput.includes('youtu.be') || mediaUrlInput.endsWith('.mp4') || mediaTypeInput === 'video';
    const newMediaItem = {
      id: `url-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: isVid ? 'video' as const : 'image' as const,
      url: mediaUrlInput.trim(),
    };
    setFormMedia((prev) => {
      const nextMedia = [...prev, newMediaItem];
      if (!formImageUrl && !isVid) {
        setFormImageUrl(newMediaItem.url);
      }
      return nextMedia;
    });
    setMediaUrlInput('');
  };

  const moveMedia = (index: number, direction: 'up' | 'down') => {
    const updated = [...formMedia];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFormMedia(updated);
  };

  const removeMedia = (id: string) => {
    setFormMedia((prev) => prev.filter(m => m.id !== id));
  };

  const handleSubmitSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSiteSettings({
      heroTitle1,
      heroTitle2,
      heroTitle3,
      heroSubtitle,
      heroDesc,
      statProjects: Number(statProjects),
      statVideos: Number(statVideos),
      statDesigns: Number(statDesigns),
      statClients: Number(statClients),
      statYears: Number(statYears),
      heroPhoneUrl,
      heroPhoneType,
      shortformTitle1,
      shortformTitle2,
      shortformDesc,
      heroMockupTag,
      heroMockupUser,
      heroMockupSub,
      heroMockupTitle,
      heroMockupDesc,
      heroMockupBoxLabel,
      heroMockupBoxValue,
    });
    alert('성공적으로 저장되었습니다.');
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;
    const newFaq: FAQItem = { question: faqQuestion, answer: faqAnswer };
    onSaveFaqs([...faqs, newFaq]);
    setFaqQuestion('');
    setFaqAnswer('');
    alert('FAQ가 성공적으로 추가되었습니다.');
  };

  const handleDeleteFaq = (index: number) => {
    if (confirm('이 FAQ 항목을 삭제하시겠습니까?')) {
      const updated = faqs.filter((_, idx) => idx !== index);
      onSaveFaqs(updated);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewCompany || !reviewComment) return;
    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      stars: reviewStars,
      author: reviewAuthor,
      company: reviewCompany,
      comment: reviewComment
    };
    onSaveReviews([...reviews, newReview]);
    setReviewStars(5);
    setReviewAuthor('');
    setReviewCompany('');
    setReviewComment('');
    alert('고객 후기가 성공적으로 추가되었습니다.');
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('이 후기 항목을 삭제하시겠습니까?')) {
      const updated = reviews.filter(rev => rev.id !== id);
      onSaveReviews(updated);
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientIndustry || !clientSymbol) return;
    const newClient: ClientLogo = {
      name: clientName,
      industry: clientIndustry,
      symbol: clientSymbol
    };
    onSaveClients([...clients, newClient]);
    setClientName('');
    setClientIndustry('');
    setClientSymbol('');
    alert('협업 브랜드가 성공적으로 추가되었습니다.');
  };

  const handleDeleteClient = (index: number) => {
    if (confirm('이 브랜드 로고 항목을 삭제하시겠습니까?')) {
      const updated = clients.filter((_, idx) => idx !== index);
      onSaveClients(updated);
    }
  };

  return (
    <>
      {/* Floating Admin Entry Button - Now Highly Visible */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4.5 py-3.5 bg-slate-900 border border-slate-800 text-white font-bold rounded-full shadow-2xl hover:bg-blue-600 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase cursor-pointer"
        >
          <Settings className="w-4 h-4 animate-spin-slow" />
          <span>ADMIN MENU</span>
        </motion.button>
      </div>

      {/* Admin Panel Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0a0a0b] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0c0c0e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                    <Settings className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">THE MOA COMPANY ADMIN</h2>
                    <p className="text-[10px] text-slate-500">포트폴리오, 사이트 텍스트 정보 및 문의 사항 관리</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Login State */}
              {!isLoggedIn ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">관리자 로그인</h3>
                  <p className="text-sm text-slate-400 text-center mb-8 leading-relaxed">
                    포트폴리오 및 콘텐츠 관리자에 접속하려면 비밀번호를 입력하십시오.
                  </p>

                  <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-center text-lg tracking-widest font-mono"
                        required
                        autoFocus
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-xs text-center font-medium mt-1">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 text-sm tracking-wider cursor-pointer shadow-lg shadow-blue-500/20"
                    >
                      로그인하기
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Layout */
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[500px]">
                  
                  {/* Sidebar Tabs */}
                  <div className="md:w-60 border-r border-slate-800 bg-[#070708] p-4 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest px-3 mb-2">Menus</div>
                      
                      <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          activeTab === 'portfolio'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                        <span>포트폴리오 관리 ({portfolios.length})</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('sections')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          activeTab === 'sections'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                        <span>섹션별 문구 관리</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('inquiry')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          activeTab === 'inquiry'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>고객 문의 내역 ({inquiries.length})</span>
                      </button>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>관리자 로그아웃</span>
                    </button>
                  </div>

                  {/* Tab Contents Pane */}
                  <div className="flex-1 overflow-y-auto p-6 bg-[#080809]">
                    
                    {/* Portfolio Tab */}
                    {activeTab === 'portfolio' && (
                      <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white">포트폴리오 리스트 및 추가</h3>
                            <p className="text-xs text-slate-500 mt-1">포트폴리오 아이템을 생성, 편집 및 삭제할 수 있습니다.</p>
                          </div>
                          {!isEditing && (
                            <button
                              onClick={() => {
                                resetForm();
                                setIsEditing(false);
                                document.getElementById('portfolio-form-scroll')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              새 포트폴리오 쓰기
                            </button>
                          )}
                        </div>

                        {/* Portfolio Form */}
                        <div id="portfolio-form-scroll" className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {isEditing ? '선택된 포트폴리오 수정하기' : '새 포트폴리오 정보 등록'}
                          </h4>

                          <form onSubmit={handleSubmitPortfolio} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {/* Category */}
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">카테고리 *</label>
                                <select
                                  value={formCategory}
                                  onChange={(e) => setFormCategory(e.target.value as PortfolioItem['category'])}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                >
                                  <option value="reels">릴스 🎥</option>
                                  <option value="shorts">쇼츠 📱</option>
                                  <option value="brand_video">브랜드영상 🎬</option>
                                  <option value="website">웹사이트 🌐</option>
                                  <option value="detail_page">상세페이지 🎨</option>
                                  <option value="sns">SNS 대행 💬</option>
                                  <option value="branding">브랜딩 🏷️</option>
                                </select>
                              </div>

                              {/* Client */}
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">고객사 명 *</label>
                                <input
                                  type="text"
                                  placeholder="예: 카페 오라"
                                  value={formClient}
                                  onChange={(e) => setFormClient(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-blue-500"
                                  required
                                />
                              </div>
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[11px] text-slate-400 font-bold block mb-1.5">프로젝트 제목 *</label>
                              <input
                                  type="text"
                                  placeholder="예: 성수동 핫플레이스 카페 브랜딩 숏폼 릴스 제작"
                                  value={formTitle}
                                  onChange={(e) => setFormTitle(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-blue-500"
                                  required
                                />
                            </div>

                            {/* Short Description */}
                            <div>
                              <label className="text-[11px] text-slate-400 font-bold block mb-1.5">한 줄 요약 (목록 노출용) *</label>
                              <input
                                  type="text"
                                  placeholder="예: 3초 후킹 기획과 트렌디한 BGM으로 성수동 유동 인구를 타겟팅한 릴스 캠페인"
                                  value={formDescription}
                                  onChange={(e) => setFormDescription(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-blue-500"
                                  required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {/* Metrics */}
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">성과 지표 *</label>
                                <input
                                  type="text"
                                  placeholder="예: 조회수 185만회 / 매장 유입 42% 증가"
                                  value={formMetrics}
                                  onChange={(e) => setFormMetrics(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-blue-500"
                                  required
                                />
                              </div>

                              {/* Duration */}
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">제작 기간 *</label>
                                <input
                                  type="text"
                                  placeholder="예: 2주"
                                  value={formDuration}
                                  onChange={(e) => setFormDuration(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-blue-500"
                                  required
                                />
                              </div>
                            </div>

                            {/* NEW: Multi-media Local Upload & URL Manager */}
                            <div className="space-y-4 border border-slate-800/80 bg-slate-900/10 p-5 rounded-2xl">
                              <div className="flex items-center justify-between">
                                <label className="text-xs text-white font-bold flex items-center gap-2">
                                  <Upload className="w-4 h-4 text-[#e52827]" />
                                  <span>포트폴리오 미디어 첨부 (내 컴퓨터 파일 업로드 및 여러 장 등록)</span>
                                </label>
                                <span className="text-[10px] text-slate-400 font-medium">※ 첫 번째 등록된 이미지가 자동 대표 썸네일이 됩니다.</span>
                              </div>

                              {/* Drag & Drop Local File Upload Zone */}
                              <div 
                                onDragOver={handleMediaDragOver}
                                onDrop={handleMediaDrop}
                                onClick={() => document.getElementById('admin-media-file-input')?.click()}
                                className="border-2 border-dashed border-slate-800 hover:border-[#e52827]/40 bg-[#0c0c0c] hover:bg-[#111] rounded-2xl p-6 text-center cursor-pointer transition-all group"
                              >
                                <input 
                                  type="file" 
                                  multiple 
                                  accept="image/*,video/*" 
                                  onChange={handleLocalFilesUpload} 
                                  className="hidden" 
                                  id="admin-media-file-input" 
                                />
                                <Upload className="w-7 h-7 text-slate-500 group-hover:text-[#e52827] mx-auto mb-2 transition-colors" />
                                <p className="text-xs text-slate-300 font-semibold group-hover:text-white transition-colors">
                                  드래그 앤 드롭 또는 클릭하여 내 컴퓨터에서 파일 올리기
                                </p>
                                <p className="text-[10px] text-slate-500 mt-1">
                                  이미지(PNG, JPG, WEBP) 및 비디오(MP4, WEBM) 지원
                                </p>
                              </div>

                              {/* Manual Remote URL Add Panel */}
                              <div className="bg-[#0b0b0b] border border-slate-800/60 rounded-xl p-3 space-y-3">
                                <div className="text-[10px] font-bold text-slate-400">또는 외부 이미지 / 영상 웹 주소 직접 추가</div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <select
                                    value={mediaTypeInput}
                                    onChange={(e) => setMediaTypeInput(e.target.value as 'image' | 'video')}
                                    className="bg-[#111] border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#e52827]"
                                  >
                                    <option value="image">이미지 URL</option>
                                    <option value="video">동영상 URL</option>
                                  </select>
                                  <input
                                    type="text"
                                    placeholder="예: https://images.unsplash.com/... 또는 YouTube 주소"
                                    value={mediaUrlInput}
                                    onChange={(e) => setMediaUrlInput(e.target.value)}
                                    className="flex-1 bg-[#111] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-[#e52827]"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleAddMediaUrl}
                                    className="px-3 py-1.5 bg-[#e52827] hover:bg-[#cc1a1a] text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>추가</span>
                                  </button>
                                </div>
                              </div>

                              {/* Uploaded Media Items Previews Grid */}
                              {formMedia.length > 0 && (
                                <div className="space-y-2">
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">등록된 첨부 파일 ({formMedia.length}개)</div>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {formMedia.map((item, idx) => {
                                      const isMainThumbnail = formImageUrl === item.url;
                                      const isYouTube = item.url.includes('youtube.com') || item.url.includes('youtu.be');
                                      return (
                                        <div 
                                          key={item.id} 
                                          className={`bg-[#0d0d0d] border ${isMainThumbnail ? 'border-[#e52827]' : 'border-slate-800'} rounded-xl p-2 relative flex flex-col group transition-all`}
                                        >
                                          {/* Preview Stage */}
                                          <div className="aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center mb-1.5">
                                            {item.type === 'image' ? (
                                              <img src={item.url} className="w-full h-full object-cover" alt="" />
                                            ) : isYouTube ? (
                                              <div className="flex flex-col items-center justify-center text-center p-2">
                                                <div className="w-7 h-7 rounded-full bg-[#e52827]/10 flex items-center justify-center text-[#e52827] mb-1 font-bold text-xs">YT</div>
                                                <span className="text-[9px] text-slate-400 font-mono font-medium truncate max-w-full px-1">YouTube 영상</span>
                                              </div>
                                            ) : (
                                              <video src={item.url} className="w-full h-full object-cover" muted />
                                            )}
                                            
                                            {/* Type Badge */}
                                            <span className={`absolute bottom-1 right-1 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${item.type === 'video' ? 'bg-[#e52827] text-white' : 'bg-slate-800 text-slate-300'}`}>
                                              {item.type}
                                            </span>
                                            
                                            {/* Main Thumbnail Badge overlay */}
                                            {isMainThumbnail && (
                                              <span className="absolute top-1 left-1 bg-[#e52827] text-white text-[8px] px-1.5 py-0.5 rounded font-extrabold flex items-center gap-0.5 shadow-lg shadow-[#e52827]/20 animate-pulse">
                                                ★ 대표 썸네일
                                              </span>
                                            )}
                                          </div>

                                          {/* Control Actions Row */}
                                          <div className="flex items-center justify-between gap-1 mt-auto pt-1.5 border-t border-slate-900">
                                            <div className="flex gap-1">
                                              {/* Move Left/Up */}
                                              <button
                                                type="button"
                                                disabled={idx === 0}
                                                onClick={() => moveMedia(idx, 'up')}
                                                className="p-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-400 rounded cursor-pointer transition-all"
                                                title="앞으로 이동"
                                              >
                                                <ArrowUp className="w-3 h-3 rotate-270" />
                                              </button>
                                              {/* Move Right/Down */}
                                              <button
                                                type="button"
                                                disabled={idx === formMedia.length - 1}
                                                onClick={() => moveMedia(idx, 'down')}
                                                className="p-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-400 rounded cursor-pointer transition-all"
                                                title="뒤로 이동"
                                              >
                                                <ArrowDown className="w-3 h-3 rotate-270" />
                                              </button>
                                              {/* Set Main Thumbnail (only for images) */}
                                              {item.type === 'image' && !isMainThumbnail && (
                                                <button
                                                  type="button"
                                                  onClick={() => setFormImageUrl(item.url)}
                                                  className="text-[9px] px-1.5 py-0.5 bg-[#e52827]/10 hover:bg-[#e52827]/20 border border-[#e52827]/20 text-[#e52827] font-bold rounded transition-all cursor-pointer"
                                                >
                                                  대표 설정
                                                </button>
                                              )}
                                            </div>
                                            
                                            {/* Remove Button */}
                                            <button
                                              type="button"
                                              onClick={() => removeMedia(item.id)}
                                              className="p-1 hover:bg-[#e52827]/10 text-slate-500 hover:text-[#e52827] rounded transition-all cursor-pointer"
                                              title="삭제"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 opacity-70">
                              {/* Image URL (Sync Backup) */}
                              <div>
                                <label className="text-[11px] text-slate-500 font-semibold block mb-1">썸네일 이미지 주소 (수동 입력/자동연동)</label>
                                <input
                                  type="text"
                                  placeholder="첨부 시 자동 동기화됨"
                                  value={formImageUrl}
                                  onChange={(e) => setFormImageUrl(e.target.value)}
                                  className="w-full bg-[#111]/60 border border-slate-900 rounded-xl px-3 py-2 text-[11px] text-slate-300 placeholder-slate-800 focus:outline-none"
                                />
                              </div>

                              {/* Video URL (Sync Backup) */}
                              <div>
                                <label className="text-[11px] text-slate-500 block mb-1 font-semibold">대표 비디오 주소 (수동 입력/자동연동)</label>
                                <input
                                  type="text"
                                  placeholder="첨부 시 자동 동기화됨"
                                  value={formVideoUrl}
                                  onChange={(e) => setFormVideoUrl(e.target.value)}
                                  className="w-full bg-[#111]/60 border border-slate-900 rounded-xl px-3 py-2 text-[11px] text-slate-300 placeholder-slate-800 focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Detailed Content */}
                            <div>
                              <label className="text-[11px] text-slate-400 font-bold block mb-1.5">상세 제작 과정 및 성과 설명 (모달 팝업용) *</label>
                              <textarea
                                placeholder="기획 의도, 촬영 기법, 적용 디자인 전략, 성과 통계 등을 적어주세요."
                                value={formContent}
                                onChange={(e) => setFormContent(e.target.value)}
                                rows={4}
                                className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                required
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 justify-end pt-2">
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={resetForm}
                                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                                >
                                  취소
                                </button>
                              )}
                              <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                              >
                                {isEditing ? '포트폴리오 수정 완료' : '신규 포트폴리오 추가'}
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* Existing Portfolios */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Layers className="w-4 h-4 text-blue-400" />
                            <span>등록된 포트폴리오 목록 ({portfolios.length}개)</span>
                          </h4>

                          <div className="grid grid-cols-1 gap-3">
                            {portfolios.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-4 bg-slate-900/20 hover:bg-slate-900/40 border border-slate-800 rounded-xl transition-all"
                              >
                                <div className="flex items-center gap-4">
                                  <img
                                    src={item.imageUrl}
                                    alt=""
                                    className="w-12 h-12 rounded-lg object-cover bg-black"
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold">
                                        {item.category.toUpperCase()}
                                      </span>
                                      <span className="text-xs text-slate-500">{item.client}</span>
                                    </div>
                                    <h5 className="text-sm font-bold text-white mt-1 line-clamp-1">{item.title}</h5>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      startEdit(item);
                                      document.getElementById('portfolio-form-scroll')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-white/5 rounded-lg border border-slate-800 transition-all cursor-pointer"
                                    title="수정"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  {confirmDeleteId === `portfolio-${item.id}` ? (
                                    <div className="flex items-center gap-1.5 bg-red-950/20 border border-red-900/50 p-1 rounded-lg shrink-0">
                                      <span className="text-[10px] text-red-400 font-bold px-1 select-none">삭제?</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          onDeletePortfolio(item.id);
                                          setConfirmDeleteId(null);
                                        }}
                                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                                      >
                                        승인
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded cursor-pointer transition-colors"
                                      >
                                        취소
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setConfirmDeleteId(`portfolio-${item.id}`)}
                                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg border border-slate-800 transition-all cursor-pointer"
                                      title="삭제"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sections Tab (DYNAMIC EDITING OF TITLES, FAQS, REVIEWS, PARTNERS) */}
                    {activeTab === 'sections' && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-bold text-white">웹사이트 섹션별 실시간 문구 편집</h3>
                          <p className="text-xs text-slate-500 mt-1">메인 페이지의 각 영역별 텍스트, 통계 수치, FAQ 및 고객 리뷰를 간편하게 조율할 수 있습니다.</p>
                        </div>

                        {/* Sections Sub-Tabs */}
                        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                          <button
                            onClick={() => setSectionsSubTab('hero')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              sectionsSubTab === 'hero' ? 'bg-blue-600 text-white shadow' : 'bg-[#111] text-slate-400 hover:text-white'
                            }`}
                          >
                            히어로 & 통계
                          </button>
                          <button
                            onClick={() => setSectionsSubTab('shortform')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              sectionsSubTab === 'shortform' ? 'bg-blue-600 text-white shadow' : 'bg-[#111] text-slate-400 hover:text-white'
                            }`}
                          >
                            쇼츠 스튜디오 ({reelsVideos.length})
                          </button>
                          <button
                            onClick={() => setSectionsSubTab('faq')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              sectionsSubTab === 'faq' ? 'bg-blue-600 text-white shadow' : 'bg-[#111] text-slate-400 hover:text-white'
                            }`}
                          >
                            FAQ 목록 ({faqs.length})
                          </button>
                          <button
                            onClick={() => setSectionsSubTab('reviews')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              sectionsSubTab === 'reviews' ? 'bg-blue-600 text-white shadow' : 'bg-[#111] text-slate-400 hover:text-white'
                            }`}
                          >
                            고객 후기 ({reviews.length})
                          </button>
                          <button
                            onClick={() => setSectionsSubTab('clients')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              sectionsSubTab === 'clients' ? 'bg-blue-600 text-white shadow' : 'bg-[#111] text-slate-400 hover:text-white'
                            }`}
                          >
                            협업 브랜드 ({clients.length})
                          </button>
                        </div>

                        {/* SUB TAB: Hero & Stats */}
                        {sectionsSubTab === 'hero' && (
                          <form onSubmit={handleSubmitSiteSettings} className="p-6 bg-[#0c0c0e] border border-slate-800 rounded-2xl space-y-6">
                            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                              <Megaphone className="w-4 h-4 text-blue-400" />
                              <span>히어로 타이틀 및 소개 문구 편집</span>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">대제목 단어 1 *</label>
                                <input
                                  type="text"
                                  value={heroTitle1}
                                  onChange={(e) => setHeroTitle1(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">대제목 단어 2 *</label>
                                <input
                                  type="text"
                                  value={heroTitle2}
                                  onChange={(e) => setHeroTitle2(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">대제목 단어 3 *</label>
                                <input
                                  type="text"
                                  value={heroTitle3}
                                  onChange={(e) => setHeroTitle3(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] text-slate-400 font-bold block mb-1.5">서브 타이틀 강조 문구 *</label>
                              <input
                                type="text"
                                value={heroSubtitle}
                                onChange={(e) => setHeroSubtitle(e.target.value)}
                                className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                required
                              />
                            </div>

                            <div>
                              <label className="text-[11px] text-slate-400 font-bold block mb-1.5">히어로 섹션 상세 설명 *</label>
                              <textarea
                                value={heroDesc}
                                onChange={(e) => setHeroDesc(e.target.value)}
                                rows={3}
                                className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                required
                              />
                            </div>

                            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 pt-4">
                              <BarChart3 className="w-4 h-4 text-blue-400" />
                              <span>성과 카운터 통계 수치</span>
                            </h4>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Projects 수치 *</label>
                                <input
                                  type="number"
                                  value={statProjects}
                                  onChange={(e) => setStatProjects(Number(e.target.value))}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Videos 수치 *</label>
                                <input
                                  type="number"
                                  value={statVideos}
                                  onChange={(e) => setStatVideos(Number(e.target.value))}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Designs 수치 *</label>
                                <input
                                  type="number"
                                  value={statDesigns}
                                  onChange={(e) => setStatDesigns(Number(e.target.value))}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Clients 수치 *</label>
                                <input
                                  type="number"
                                  value={statClients}
                                  onChange={(e) => setStatClients(Number(e.target.value))}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Years Exp 수치 *</label>
                                <input
                                  type="number"
                                  value={statYears}
                                  onChange={(e) => setStatYears(Number(e.target.value))}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 text-center font-mono"
                                  required
                                />
                              </div>
                            </div>

                            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 pt-4">
                              <Smartphone className="w-4 h-4 text-blue-400" />
                              <span>히어로 스마트폰 목업 미디어 관리</span>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-950/40 p-4 border border-slate-800 rounded-xl">
                              {/* Hero Phone Type Selector */}
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">미디어 형태 *</label>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name="heroPhoneType" 
                                      checked={heroPhoneType === 'image'} 
                                      onChange={() => setHeroPhoneType('image')}
                                      className="accent-blue-500" 
                                    />
                                    <span>이미지 (Image)</span>
                                  </label>
                                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name="heroPhoneType" 
                                      checked={heroPhoneType === 'video'} 
                                      onChange={() => setHeroPhoneType('video')}
                                      className="accent-blue-500" 
                                    />
                                    <span>영상 (Video)</span>
                                  </label>
                                </div>
                              </div>

                              {/* File Uploader for Hero Phone */}
                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">내 컴퓨터 파일로 변경하기 (이미지/영상)</label>
                                <div className="relative">
                                  <input 
                                    type="file" 
                                    accept="image/*,video/*"
                                    onChange={(e: any) => {
                                      const files = e.target.files;
                                      if (files && files.length > 0) {
                                        const file = files[0];
                                        if (file.size > 25 * 1024 * 1024) {
                                          alert("파일 크기가 너무 큽니다 (최대 25MB). 브라우저의 로컬 저장공간(LocalStorage) 용량 한계로 인해 대용량 파일은 최종 영구 저장되지 않을 수 있습니다. 5MB 이하의 가볍고 짧은 비디오/이미지를 사용하시거나, 직접 링크 주소(URL)를 입력해 주세요.");
                                          return;
                                        }
                                        const reader = new FileReader();
                                        reader.onload = async (event: any) => {
                                          if (event.target?.result) {
                                            let resultUrl = event.target.result;
                                            if (file.type.startsWith('image/')) {
                                              try {
                                                resultUrl = await compressImage(resultUrl);
                                              } catch (err) {
                                                console.error('Image compression failed:', err);
                                              }
                                            }
                                            setHeroPhoneUrl(resultUrl);
                                            if (file.type.startsWith('video/')) {
                                              setHeroPhoneType('video');
                                            } else {
                                              setHeroPhoneType('image');
                                            }
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="hidden" 
                                    id="hero-phone-file-input"
                                  />
                                  <label 
                                    htmlFor="hero-phone-file-input"
                                    className="flex items-center gap-2 justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-all"
                                  >
                                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                                    <span>파일 찾아보기 (업로드)</span>
                                  </label>
                                </div>
                              </div>

                              {/* Direct URL input */}
                              <div className="md:col-span-2">
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">직접 링크 주소 (URL) 또는 동기화된 데이터</label>
                                <input 
                                  type="text"
                                  value={heroPhoneUrl}
                                  onChange={(e) => setHeroPhoneUrl(e.target.value)}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                                  placeholder="https://..."
                                />
                                <p className="text-[10px] text-slate-500 mt-1">파일 업로드 시 브라우저 내부용 base64 코드로 자동 변환되어 저장됩니다.</p>
                              </div>

                              {/* Preview area */}
                              {heroPhoneUrl && (
                                <div className="md:col-span-2 flex items-center gap-4 bg-[#0a0a0b] p-3 rounded-lg border border-slate-900">
                                  <div className="w-12 h-16 rounded overflow-hidden bg-black flex-shrink-0 border border-slate-800">
                                    {heroPhoneType === 'video' ? (
                                      <video src={heroPhoneUrl} className="w-full h-full object-cover" muted playsInline />
                                    ) : (
                                      <img src={heroPhoneUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-white">미디어 미리보기</div>
                                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{heroPhoneUrl.substring(0, 80)}...</div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 pt-6">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                              <span>히어로 스마트폰 목업 내 텍스트/카피 관리</span>
                            </h4>

                            <div className="space-y-4 bg-slate-950/40 p-5 border border-slate-800 rounded-xl">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">상단 성공 배지 문구</label>
                                  <input 
                                    type="text"
                                    value={heroMockupTag}
                                    onChange={(e) => setHeroMockupTag(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    placeholder="LIVE SUCCESS"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">상단 사용자명</label>
                                  <input 
                                    type="text"
                                    value={heroMockupUser}
                                    onChange={(e) => setHeroMockupUser(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                                    placeholder="the_moa_studio"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">중앙 서브 카테고리</label>
                                  <input 
                                    type="text"
                                    value={heroMockupSub}
                                    onChange={(e) => setHeroMockupSub(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    placeholder="REELS & SHORTS"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">중앙 메인 타이틀 (줄바꿈은 Enter 키 입력)</label>
                                <textarea 
                                  value={heroMockupTitle}
                                  onChange={(e) => setHeroMockupTitle(e.target.value)}
                                  rows={2}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                                  placeholder="“조회수 185만회 폭발”&#10;성수 카페 브랜딩 프로젝트"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">중앙 상세 설명 카피</label>
                                <textarea 
                                  value={heroMockupDesc}
                                  onChange={(e) => setHeroMockupDesc(e.target.value)}
                                  rows={2}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                                  placeholder="3초 후킹 공식과 시네마틱 트랜지션을 결합해 오프라인 대기 줄을 형성시켰습니다."
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-900 pt-3">
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">하단 통계 박스 라벨 (기본: Metric)</label>
                                  <input 
                                    type="text"
                                    value={heroMockupBoxLabel}
                                    onChange={(e) => setHeroMockupBoxLabel(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Metric"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">하단 통계 박스 카피/수치 (기본: 조회수 185만 돌파)</label>
                                  <input 
                                    type="text"
                                    value={heroMockupBoxValue}
                                    onChange={(e) => setHeroMockupBoxValue(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    placeholder="조회수 185만 돌파"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                              >
                                저장 및 실시간 사이트 반영
                              </button>
                            </div>
                          </form>
                        )}

                        {/* SUB TAB: Shortform Studio Manager */}
                        {sectionsSubTab === 'shortform' && (
                          <div className="space-y-8">
                            {/* Shortform Section Texts Form */}
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                onSaveSiteSettings({
                                  ...siteSettings,
                                  shortformTitle1,
                                  shortformTitle2,
                                  shortformDesc,
                                });
                                alert('쇼츠 스튜디오의 문구가 성공적으로 저장되었습니다.');
                              }} 
                              className="p-6 bg-[#0c0c0e] border border-slate-800 rounded-2xl space-y-5"
                            >
                              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                <Video className="w-4 h-4 text-emerald-400" />
                                <span>쇼츠 스튜디오 섹션 소개 문구 편집</span>
                              </h4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">쇼츠 섹션 타이틀 1 *</label>
                                  <input
                                    type="text"
                                    value={shortformTitle1}
                                    onChange={(e) => setShortformTitle1(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">쇼츠 섹션 타이틀 2 (강조색) *</label>
                                  <input
                                    type="text"
                                    value={shortformTitle2}
                                    onChange={(e) => setShortformTitle2(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-[11px] text-slate-400 font-bold block mb-1.5">쇼츠 섹션 상세 설명 *</label>
                                <textarea
                                  value={shortformDesc}
                                  onChange={(e) => setShortformDesc(e.target.value)}
                                  rows={3}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                  required
                                />
                              </div>

                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                                >
                                  문구 저장하기
                                </button>
                              </div>
                            </form>

                            {/* Reels Reference Add Form */}
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!reelsUrl || !reelsTitle) {
                                  alert('레퍼런스 미디어와 타이틀을 모두 입력해주세요.');
                                  return;
                                }
                                const newReels: ReelsVideoItem = {
                                  id: `reels-${Date.now()}`,
                                  url: reelsUrl,
                                  type: reelsType,
                                  title: reelsTitle,
                                  likes: reelsLikes || '10K',
                                };
                                onSaveReelsVideos([...reelsVideos, newReels]);
                                setReelsUrl('');
                                setReelsTitle('');
                                setReelsLikes('10K');
                                alert('쇼츠 스튜디오의 비디오 레퍼런스가 성공적으로 추가되었습니다.');
                              }}
                              className="p-6 bg-[#0c0c0e] border border-slate-800 rounded-2xl space-y-5"
                            >
                              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                <PlusCircle className="w-4 h-4 text-blue-400" />
                                <span>새로운 쇼츠 레퍼런스 미디어 등록</span>
                              </h4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Title */}
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">레퍼런스 제목 (예: 감성 F&B 레퍼런스) *</label>
                                  <input
                                    type="text"
                                    placeholder="감성 F&B 숏폼 레퍼런스"
                                    value={reelsTitle}
                                    onChange={(e) => setReelsTitle(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>

                                {/* Likes */}
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">가상 노출 조회수/좋아요 수 (예: 12.4K) *</label>
                                  <input
                                    type="text"
                                    placeholder="12.4K"
                                    value={reelsLikes}
                                    onChange={(e) => setReelsLikes(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>

                                {/* Media Type */}
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">미디어 형태 *</label>
                                  <div className="flex gap-4 pt-1">
                                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                      <input 
                                        type="radio" 
                                        name="reelsType" 
                                        checked={reelsType === 'image'} 
                                        onChange={() => setReelsType('image')}
                                        className="accent-blue-500" 
                                      />
                                      <span>이미지 (Image)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                      <input 
                                        type="radio" 
                                        name="reelsType" 
                                        checked={reelsType === 'video'} 
                                        onChange={() => setReelsType('video')}
                                        className="accent-blue-500" 
                                      />
                                      <span>영상 (Video)</span>
                                    </label>
                                  </div>
                                </div>

                                {/* File Upload for Reels */}
                                <div>
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">내 컴퓨터 파일로 올리기 (이미지/영상)</label>
                                  <div className="relative">
                                    <input 
                                      type="file" 
                                      accept="image/*,video/*"
                                      onChange={(e: any) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                          const file = files[0];
                                          if (file.size > 25 * 1024 * 1024) {
                                            alert("파일 크기가 너무 큽니다 (최대 25MB). 브라우저의 로컬 저장공간(LocalStorage) 용량 한계로 인해 대용량 파일은 최종 영구 저장되지 않을 수 있습니다. 5MB 이하의 가볍고 짧은 비디오/이미지를 사용하시거나, 직접 링크 주소(URL)를 입력해 주세요.");
                                            return;
                                          }
                                          const reader = new FileReader();
                                          reader.onload = async (event: any) => {
                                            if (event.target?.result) {
                                              let resultUrl = event.target.result;
                                              if (file.type.startsWith('image/')) {
                                                try {
                                                  resultUrl = await compressImage(resultUrl);
                                                } catch (err) {
                                                  console.error('Image compression failed:', err);
                                                }
                                              }
                                              setReelsUrl(resultUrl);
                                              if (file.type.startsWith('video/')) {
                                                setReelsType('video');
                                              } else {
                                                setReelsType('image');
                                              }
                                            }
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                      className="hidden" 
                                      id="reels-file-input"
                                    />
                                    <label 
                                      htmlFor="reels-file-input"
                                      className="flex items-center gap-2 justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-all"
                                    >
                                      <Upload className="w-3.5 h-3.5 text-blue-400" />
                                      <span>파일 찾아보기 (업로드)</span>
                                    </label>
                                  </div>
                                </div>

                                {/* Media Url direct */}
                                <div className="md:col-span-2">
                                  <label className="text-[11px] text-slate-400 font-bold block mb-1.5">미디어 URL 직접 주소 또는 업로드 데이터</label>
                                  <input
                                    type="text"
                                    placeholder="https://..."
                                    value={reelsUrl}
                                    onChange={(e) => setReelsUrl(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                                  />
                                </div>

                                {/* Preview Reels Media */}
                                {reelsUrl && (
                                  <div className="md:col-span-2 flex items-center gap-4 bg-[#0a0a0b] p-3 rounded-lg border border-slate-900">
                                    <div className="w-12 h-16 rounded overflow-hidden bg-black flex-shrink-0 border border-slate-800">
                                      {reelsType === 'video' ? (
                                        <video src={reelsUrl} className="w-full h-full object-cover" muted playsInline />
                                      ) : (
                                        <img src={reelsUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold text-white">업로드된 레퍼런스 미디어 미리보기</div>
                                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{reelsUrl.substring(0, 80)}...</div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex justify-end pt-2">
                                <button
                                  type="submit"
                                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                                >
                                  새로운 참조 비디오 추가
                                </button>
                              </div>
                            </form>

                            {/* Reels Reference Lists */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">
                                등록된 쇼츠 참조 목록 ({reelsVideos.length}개)
                              </h4>

                              <div className="grid grid-cols-1 gap-3">
                                {reelsVideos.map((video, idx) => (
                                  <div 
                                    key={video.id || idx}
                                    className="flex items-center justify-between p-4 bg-slate-900/20 hover:bg-slate-900/40 border border-slate-800 rounded-xl transition-all"
                                  >
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-14 bg-black rounded overflow-hidden border border-slate-800 shrink-0">
                                        {video.type === 'video' ? (
                                          <video src={video.url} className="w-full h-full object-cover" muted playsInline />
                                        ) : (
                                          <img src={video.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                        )}
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold uppercase">
                                            {video.type}
                                          </span>
                                          <span className="text-[10px] text-slate-500 font-mono">Likes: {video.likes}</span>
                                        </div>
                                        <h5 className="text-xs font-bold text-white mt-1.5">{video.title}</h5>
                                      </div>
                                    </div>

                                    {confirmDeleteId === `reels-${video.id || idx}` ? (
                                      <div className="flex items-center gap-1.5 bg-red-950/20 border border-red-900/50 p-1.5 rounded-lg shrink-0">
                                        <span className="text-[10px] text-red-400 font-bold px-1 select-none">삭제?</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = reelsVideos.filter((_, i) => i !== idx);
                                            onSaveReelsVideos(updated);
                                            setConfirmDeleteId(null);
                                          }}
                                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                                        >
                                          승인
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setConfirmDeleteId(null)}
                                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded cursor-pointer transition-colors"
                                        >
                                          취소
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(`reels-${video.id || idx}`)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                                        title="삭제"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SUB TAB: FAQs Manager */}
                        {sectionsSubTab === 'faq' && (
                          <div className="space-y-6">
                            {/* FAQ Adding Form */}
                            <form onSubmit={handleAddFaq} className="p-5 bg-[#0c0c0e] border border-slate-800 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                <PlusCircle className="w-4 h-4 text-blue-400" />
                                <span>새로운 FAQ 추가</span>
                              </h4>
                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">질문 (Question) *</label>
                                  <input
                                    type="text"
                                    placeholder="예: 제작물 수정 범위와 추가 비용 기준이 어떻게 되나요?"
                                    value={faqQuestion}
                                    onChange={(e) => setFaqQuestion(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">답변 (Answer) *</label>
                                  <textarea
                                    placeholder="상세 답변 내용을 여기에 입력하세요."
                                    value={faqAnswer}
                                    onChange={(e) => setFaqAnswer(e.target.value)}
                                    rows={3}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                                >
                                  FAQ 추가등록
                                </button>
                              </div>
                            </form>

                            {/* FAQs List */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider">현재 등록된 자주 묻는 질문 ({faqs.length}개)</h4>
                              <div className="grid grid-cols-1 gap-3">
                                {faqs.map((item, idx) => (
                                  <div key={idx} className="p-4 bg-slate-900/20 border border-slate-800 rounded-xl flex justify-between items-start gap-4">
                                    <div className="space-y-1.5 flex-1">
                                      <h5 className="text-xs font-bold text-white flex items-center gap-1">
                                        <span className="text-blue-400 font-mono">Q.</span> {item.question}
                                      </h5>
                                      <p className="text-[11px] text-slate-400 leading-normal bg-black/30 p-2.5 rounded-lg border border-slate-900/60 whitespace-pre-line">{item.answer}</p>
                                    </div>
                                    {confirmDeleteId === `faq-${idx}` ? (
                                      <div className="flex items-center gap-1 bg-red-950/20 border border-red-900/50 p-1 rounded shrink-0">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = faqs.filter((_, i) => i !== idx);
                                            onSaveFaqs(updated);
                                            setConfirmDeleteId(null);
                                          }}
                                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold rounded cursor-pointer"
                                        >
                                          승인
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setConfirmDeleteId(null)}
                                          className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-bold rounded cursor-pointer"
                                        >
                                          취소
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(`faq-${idx}`)}
                                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded border border-slate-800 shrink-0 cursor-pointer"
                                        title="FAQ 삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SUB TAB: Reviews Manager */}
                        {sectionsSubTab === 'reviews' && (
                          <div className="space-y-6">
                            {/* Review Adding Form */}
                            <form onSubmit={handleAddReview} className="p-5 bg-[#0c0c0e] border border-slate-800 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                <Smile className="w-4 h-4 text-blue-400" />
                                <span>새로운 고객 극찬 후기 추가</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">작성자 대표님 성함 *</label>
                                  <input
                                    type="text"
                                    placeholder="예: 김민지 대표"
                                    value={reviewAuthor}
                                    onChange={(e) => setReviewAuthor(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">회사 / 브랜드명 *</label>
                                  <input
                                    type="text"
                                    placeholder="예: 카페 오라"
                                    value={reviewCompany}
                                    onChange={(e) => setReviewCompany(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">평점 (별 개수) *</label>
                                  <select
                                    value={reviewStars}
                                    onChange={(e) => setReviewStars(Number(e.target.value))}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                                  >
                                    <option value="5">★★★★★ (5점 만점)</option>
                                    <option value="4">★★★★ (4점)</option>
                                    <option value="3">★★★ (3점)</option>
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">후기 평 코멘트 *</label>
                                <textarea
                                  placeholder="실제 협업에 대한 대표님의 솔직하고 감동적인 한 줄 평가를 적어주세요."
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  rows={3}
                                  className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                                  required
                                />
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                                >
                                  후기 추가등록
                                </button>
                              </div>
                            </form>

                            {/* Reviews List */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider">현재 등록된 리뷰 목록 ({reviews.length}개)</h4>
                              <div className="grid grid-cols-1 gap-3">
                                {reviews.map((rev) => (
                                  <div key={rev.id} className="p-4 bg-slate-900/20 border border-slate-800 rounded-xl flex justify-between items-center">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-amber-400 text-xs font-bold">{'★'.repeat(rev.stars)}</span>
                                        <span className="text-xs text-white font-bold">{rev.author}</span>
                                        <span className="text-[10px] text-slate-500">({rev.company})</span>
                                      </div>
                                      <p className="text-xs text-slate-300">"{rev.comment}"</p>
                                    </div>
                                    {confirmDeleteId === `review-${rev.id}` ? (
                                      <div className="flex items-center gap-1 bg-red-950/20 border border-red-900/50 p-1 rounded shrink-0">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = reviews.filter(r => r.id !== rev.id);
                                            onSaveReviews(updated);
                                            setConfirmDeleteId(null);
                                          }}
                                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold rounded cursor-pointer"
                                        >
                                          승인
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setConfirmDeleteId(null)}
                                          className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-bold rounded cursor-pointer"
                                        >
                                          취소
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(`review-${rev.id}`)}
                                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded border border-slate-800 cursor-pointer"
                                        title="후기 삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SUB TAB: Clients Manager */}
                        {sectionsSubTab === 'clients' && (
                          <div className="space-y-6">
                            {/* Client Adding Form */}
                            <form onSubmit={handleAddClient} className="p-5 bg-[#0c0c0e] border border-slate-800 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-blue-400" />
                                <span>새 협업 파트너 브랜드 등록</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">브랜드 영문명 / 슬로건 기호 *</label>
                                  <input
                                    type="text"
                                    placeholder="예: Cafe Aura"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">업종 카테고리 *</label>
                                  <input
                                    type="text"
                                    placeholder="예: F&B / 카페"
                                    value={clientIndustry}
                                    onChange={(e) => setClientIndustry(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] text-slate-400 block mb-1.5 font-bold">심볼 텍스트 (아이콘 포함) *</label>
                                  <input
                                    type="text"
                                    placeholder="예: ☕ Aura"
                                    value={clientSymbol}
                                    onChange={(e) => setClientSymbol(e.target.value)}
                                    className="w-full bg-[#111] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                                >
                                  파트너 등록하기
                                </button>
                              </div>
                            </form>

                            {/* Clients List */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider">현재 등록된 브랜드 그리드 ({clients.length}개)</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {clients.map((item, idx) => (
                                  <div key={idx} className="p-3 bg-slate-900/20 border border-slate-800 rounded-xl flex flex-col justify-between items-center text-center relative group">
                                    <div className="py-2">
                                      <span className="text-xs font-bold text-blue-400 block font-mono">{item.symbol}</span>
                                      <span className="text-[9px] text-slate-500 mt-1 block">{item.name} | {item.industry}</span>
                                    </div>
                                    {confirmDeleteId === `client-${idx}` ? (
                                      <div className="absolute top-1 right-1 flex items-center gap-1 bg-red-950 border border-red-900/50 p-0.5 rounded shadow z-10">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = clients.filter((_, i) => i !== idx);
                                            onSaveClients(updated);
                                            setConfirmDeleteId(null);
                                          }}
                                          className="px-1 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[8px] font-bold rounded cursor-pointer"
                                        >
                                          승인
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setConfirmDeleteId(null)}
                                          className="px-1 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[8px] font-bold rounded cursor-pointer"
                                        >
                                          취소
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(`client-${idx}`)}
                                        className="absolute top-2 right-2 p-1 text-slate-600 hover:text-red-400 bg-black/40 rounded border border-slate-800 cursor-pointer opacity-80 group-hover:opacity-100"
                                        title="파트너 삭제"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                    {/* Customer Inquiries Tab */}
                    {activeTab === 'inquiry' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-bold text-white">접수된 고객 문의 내역</h3>
                          <p className="text-xs text-slate-500 mt-1">방문자들이 문의하기 양식에 제출한 최신 건수들을 한 눈에 확인하세요.</p>
                        </div>

                        <div className="space-y-3">
                          {inquiries.length === 0 ? (
                            <div className="text-center py-20 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
                              <MessageSquare className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                              <p className="text-slate-500 text-sm">접수된 문의 사항이 아직 없습니다.</p>
                            </div>
                          ) : (
                            inquiries.map((inq) => (
                              <div
                                key={inq.id}
                                className={`p-5 rounded-2xl border transition-all ${
                                  inq.status === 'contacted'
                                    ? 'bg-blue-600/5 border-blue-500/20'
                                    : 'bg-slate-900/20 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-slate-800">
                                        {inq.companyName}
                                      </span>
                                      <span className="text-xs text-slate-400 font-medium">
                                        담당자: {inq.contactPerson}
                                      </span>
                                      <span className="text-[10px] text-slate-500 font-mono">
                                        {inq.submittedAt}
                                      </span>
                                    </div>
                                    
                                    <h4 className="text-sm font-bold text-white mt-3 flex items-center gap-2">
                                      예산: <span className="text-blue-400">{inq.budget}</span>
                                    </h4>

                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {inq.serviceTypes.map((t, idx) => (
                                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md font-semibold">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Quick Status Adjustments */}
                                  <div className="flex items-center gap-2 self-start sm:self-center">
                                    <select
                                      value={inq.status}
                                      onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as Inquiry['status'])}
                                      className="bg-black border border-slate-800 text-xs text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                                    >
                                      <option value="pending">대기 중 ⏳</option>
                                      <option value="reviewed">검토 완료 📝</option>
                                      <option value="contacted">연락 완료 ✅</option>
                                    </select>
                                    
                                    <button
                                      onClick={() => setSelectedInquiry(inq)}
                                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-white/5 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                                      title="상세내용 보기"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    
                                    {confirmDeleteId === `inquiry-${inq.id}` ? (
                                      <div className="flex items-center gap-1.5 bg-red-950/20 border border-red-900/50 p-1 rounded-lg shrink-0">
                                        <span className="text-[10px] text-red-400 font-bold px-1 select-none">삭제?</span>
                                        <button
                                          onClick={() => {
                                            onDeleteInquiry(inq.id);
                                            setConfirmDeleteId(null);
                                          }}
                                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                                        >
                                          승인
                                        </button>
                                        <button
                                          onClick={() => setConfirmDeleteId(null)}
                                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded cursor-pointer transition-colors"
                                        >
                                          취소
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setConfirmDeleteId(`inquiry-${inq.id}`)}
                                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                                        title="삭제"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Detail Sub-Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0c0c0e] border border-slate-800 rounded-2xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>상세 문의 내용</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#111] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-1">회사명 / 브랜드</span>
                    <span className="text-white font-bold">{selectedInquiry.companyName}</span>
                  </div>
                  <div className="bg-[#111] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-1">의뢰자 / 성함</span>
                    <span className="text-white font-bold">{selectedInquiry.contactPerson}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#111] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-1">연락처</span>
                    <span className="text-blue-400 font-semibold">{selectedInquiry.phone}</span>
                  </div>
                  <div className="bg-[#111] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-1">이메일</span>
                    <span className="text-white font-semibold">{selectedInquiry.email}</span>
                  </div>
                </div>

                <div className="bg-[#111] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block mb-1">선택한 희망 서비스</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedInquiry.serviceTypes.map((t, idx) => (
                      <span key={idx} className="bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block mb-1">예산 범위</span>
                  <span className="text-white font-bold text-sm">{selectedInquiry.budget}</span>
                </div>

                <div className="bg-[#111] p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block mb-2">상세 문의 / 의뢰 내용</span>
                  <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed font-sans">
                    {selectedInquiry.message || '(내용 없음)'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  확인 완료
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
