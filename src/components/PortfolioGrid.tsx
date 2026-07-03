import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../types';
import { Grid, Eye, Calendar, Award, X, Sparkles, ArrowUpRight } from 'lucide-react';

interface PortfolioGridProps {
  items: PortfolioItem[];
  onSelectItem?: (item: PortfolioItem) => void;
}

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'reels', label: '릴스' },
  { id: 'shorts', label: '쇼츠' },
  { id: 'brand_video', label: '브랜드영상' },
  { id: 'website', label: '웹사이트' },
  { id: 'detail_page', label: '상세페이지' },
  { id: 'sns', label: 'SNS' },
  { id: 'branding', label: '브랜딩' }
];

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  const isYouTube = (url?: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      const params = new URLSearchParams(url.split('?')[1]);
      videoId = params.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1]?.split('?')[0] || '';
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}` : url;
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'reels': return '릴스 🎥';
      case 'shorts': return '쇼츠 📱';
      case 'brand_video': return '브랜드영상 🎬';
      case 'website': return '웹사이트 🌐';
      case 'detail_page': return '상세페이지 🎨';
      case 'sns': return 'SNS 대행 💬';
      case 'branding': return '브랜딩 🏷️';
      default: return cat;
    }
  };

  return (
    <div id="portfolio-section" className="py-24 bg-white relative">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 bg-[#e52827]/10 border border-[#e52827]/20 text-[#e52827] text-[10px] font-extrabold uppercase tracking-widest rounded mb-4"
          >
            PORTFOLIO
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase mb-6"
          >
            성장을 증명하는 <span className="text-gradient-emerald">성공의 기록들</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed"
          >
            "우리 업종에도 효과가 있을까?" 더모아컴퍼니가 대답합니다.<br />
            실제 조회수 폭발, 매출 성장, 인지도 상승으로 이어진 고감도 레퍼런스를 확인하세요.
          </motion.p>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#e52827] text-white shadow-lg shadow-[#e52827]/20 font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Masonry-style Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => { setSelectedItem(item); setActiveMediaIndex(0); }}
                className="group relative rounded-2xl overflow-hidden bg-slate-50 cursor-pointer flex flex-col h-full border border-slate-200/80 hover:border-[#e52827]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/80"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-40 group-hover:opacity-25 transition-opacity duration-500" />
                  
                  {/* Category Badge on Image */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 border border-slate-200/80 text-slate-800 shadow-sm backdrop-blur-md">
                    {getCategoryBadge(item.category)}
                  </span>

                  {/* Eye Icon Hover Effect */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3.5 bg-[#e52827] text-white rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-5 h-5 font-bold" />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 flex flex-col flex-grow bg-white">
                  <span className="text-xs text-[#e52827] font-mono font-bold tracking-wider uppercase mb-2 block">
                    {item.client}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#e52827] transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 text-xs sm:text-sm mb-5 line-clamp-2 leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  {/* Highlights Bar */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#e52827] bg-red-50 px-2.5 py-1 rounded-lg border border-red-100 text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      <span>{item.metrics}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">등록된 포트폴리오가 없습니다. 관리자 메뉴에서 추가해보세요.</p>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-500 bg-white/80 hover:bg-slate-100 hover:text-slate-900 rounded-full border border-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Media Column (Left) with multiple attachments support */}
                  <div className="md:col-span-6 bg-slate-950 flex flex-col justify-center relative aspect-video md:aspect-auto md:min-h-[450px]">
                    {(() => {
                      const mediaList = selectedItem.media && selectedItem.media.length > 0
                        ? selectedItem.media
                        : [
                            ...(selectedItem.videoUrl ? [{ id: 'init-vid', type: 'video' as const, url: selectedItem.videoUrl }] : []),
                            ...(selectedItem.imageUrl ? [{ id: 'init-img', type: 'image' as const, url: selectedItem.imageUrl }] : [])
                          ];
                      
                      const currentMedia = mediaList[activeMediaIndex] || mediaList[0];
                      if (!currentMedia) return null;
                      
                      const isYT = isYouTube(currentMedia.url);
                      
                      return (
                        <div className="relative w-full h-full min-h-[350px] md:min-h-full flex flex-col justify-center bg-black group/carousel">
                          {/* Media Display Stage */}
                          <div className="w-full h-full min-h-[300px] md:absolute md:inset-0 flex items-center justify-center">
                            {currentMedia.type === 'video' ? (
                              isYT ? (
                                <iframe
                                  src={getYouTubeEmbedUrl(currentMedia.url)}
                                  className="w-full h-full absolute inset-0 border-0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={selectedItem.title}
                                />
                              ) : (
                                <video
                                  src={currentMedia.url}
                                  className="w-full h-full object-contain max-h-[400px] md:max-h-none"
                                  controls
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="auto"
                                  key={currentMedia.url}
                                />
                              )
                            ) : (
                              <img
                                src={currentMedia.url}
                                alt={selectedItem.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain max-h-[400px] md:max-h-none"
                                key={currentMedia.url}
                              />
                            )}
                          </div>

                          {/* Navigation Chevrons */}
                          {mediaList.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
                                }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-lg"
                                aria-label="이전 미디어"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-lg"
                                aria-label="다음 미디어"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </>
                          )}

                          {/* Dots Indicator Overlay */}
                          {mediaList.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md max-w-[90%] overflow-x-auto scrollbar-hide">
                              {mediaList.map((media, idx) => (
                                <button
                                  key={media.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMediaIndex(idx);
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all cursor-pointer shrink-0 ${
                                    activeMediaIndex === idx ? 'bg-[#e52827] scale-125' : 'bg-white/40 hover:bg-white/70'
                                  }`}
                                  title={`${idx + 1}번째 미디어 보기`}
                                />
                              ))}
                            </div>
                          )}

                          {/* Media Type/Index Badge */}
                          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                            <span className="font-bold text-[#e52827]">
                              {currentMedia.type === 'video' ? 'VIDEO 🎥' : 'IMAGE 🖼️'}
                            </span>
                            <span className="opacity-40">|</span>
                            <span>{activeMediaIndex + 1} / {mediaList.length}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Content Column (Right) */}
                  <div className="md:col-span-6 p-8 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#e52827] border border-red-100">
                          {getCategoryBadge(selectedItem.category)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {selectedItem.client}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                        {selectedItem.title}
                      </h3>

                      <div className="space-y-4 mb-6">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="text-[11px] text-slate-500 block mb-1">성과 / 핵심 지표</span>
                            <span className="text-sm font-bold text-[#e52827] flex items-center gap-1">
                              <Award className="w-4 h-4 text-[#e52827] shrink-0" />
                              {selectedItem.metrics}
                            </span>
                          </div>
                          
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="text-[11px] text-slate-500 block mb-1">제작 기간</span>
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                              {selectedItem.duration}
                            </span>
                          </div>
                        </div>

                        {/* Detailed Explanation */}
                        <div>
                          <h4 className="text-xs font-mono text-[#e52827] uppercase tracking-widest mb-2 font-bold">Project Details</h4>
                          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                            {selectedItem.content}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <a
                        href="#contact-section"
                        onClick={() => setSelectedItem(null)}
                        className="flex-1 py-3 px-4 bg-[#e52827] hover:bg-[#cc1a1a] text-white text-center text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-[#e52827]/10"
                      >
                        <span>이와 비슷한 성과 만들기</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
