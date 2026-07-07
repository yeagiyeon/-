import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Smartphone, Flame, Sparkles, TrendingUp, CheckCircle, 
  MessageSquareCode, Tv, Film, FileText, Camera, Edit3, ShieldAlert, Check, BarChart3
} from 'lucide-react';

import { ReelsVideoItem, SiteSettings, isVideoFile } from '../types';

const STEPS = [
  { step: '01', title: '기획 / 시나리오', desc: '타겟 분석 후 초반 3초 매력적인 훅(Hook) 설계 및 상세 스크립트 도출', icon: FileText },
  { step: '02', title: '프로덕션 촬영', desc: '초고화질 시네마틱 카메라 세팅, 전문 PD 및 연출 감독 매장 밀착 촬영', icon: Camera },
  { step: '03', title: '포스트 편집', desc: '고감도 트랜지션, 트렌디한 타이포 자막, 효과음 및 최적의 배경음악 합성', icon: Edit3 },
  { step: '04', title: '디테일 검수', desc: '수정이 필요한 사운드 밸런스, 컷 템포, 브랜딩 저해요소 최종 피드백 조율', icon: ShieldAlert },
  { step: '05', title: '채널 업로드', desc: '플랫폼 알고리즘에 가중치를 주는 커버 썸네일 디자인 및 해시태그 발행', icon: Tv },
  { step: '06', title: '데이터 성과분석', desc: '조회수, 시청 지속율, 도달률 피드백 분석 후 차기 콘텐츠 기획 반영', icon: BarChart3 }
];

const VIDEO_STYLES = [
  '제품 지향 숏폼 🛍️', '미식 / 맛집 비주얼 🍳', '감성 카페 분위기 ☕', 
  '전문의 / 신뢰 병원 🩺', '풍경 / 여행 힐링 ✈️', '기업 브랜드 무드 🏢', 
  '밀착 브이로그 🎥', '인터뷰 / Q&A 🗣️', '정밀 타겟 성과광고 📢'
];

interface ShortformStudioProps {
  reelsVideos?: ReelsVideoItem[];
  siteSettings?: SiteSettings;
}

export default function ShortformStudio({ reelsVideos = [], siteSettings }: ShortformStudioProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  const videos = reelsVideos;
  
  // Guard for index range
  const activeIdx = activeVideoIdx < videos.length ? activeVideoIdx : 0;
  const activeVideo = videos[activeIdx];

  return (
    <div id="shortform-section" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Contents (12 cols grid: 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest rounded mb-2">
              SHORTFORM STUDIO
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase">
              {siteSettings?.shortformTitle1 || "릴스 하나가"}<br />
              <span className="text-gradient-emerald">{siteSettings?.shortformTitle2 || "브랜드를 바꿉니다."}</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {siteSettings?.shortformDesc || "단 3초 만에 시청자의 스크롤을 멈추게 만듭니다. 더모아컴퍼니만의 차별화된 숏폼 연구소를 통해 트렌디한 감각과 실질적인 조회수 상승 알고리즘을 이식합니다."}
            </p>

            {/* Video Style Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">We Produce These Styles</h4>
              <div className="flex flex-wrap gap-2">
                {VIDEO_STYLES.map((style, idx) => (
                  <span 
                    key={idx} 
                    className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium hover:border-blue-500/30 hover:text-blue-600 transition-colors cursor-default shadow-sm"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* Production Steps */}
            <div className="space-y-4 pt-4 border-t border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase mb-4">Reels Production Step-By-Step</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STEPS.map((stepItem, idx) => {
                  const Icon = stepItem.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="p-4 bg-white border border-slate-200/80 hover:border-blue-500/30 rounded-xl flex items-start gap-3 transition-all shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0 font-bold font-mono text-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="text-blue-600 font-mono text-[10px]">{stepItem.step}</span>
                          {stepItem.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 leading-normal mt-1">
                          {stepItem.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Contents: Smartphone Mockup (12 cols grid: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Reels Mockup Outer Container */}
            <div className="relative w-full max-w-[320px] aspect-[9/18.5] bg-[#0d0d0d] rounded-[48px] p-3.5 border-[8px] border-neutral-800 shadow-2xl shadow-blue-500/5 overflow-hidden">
              {/* Speaker pill */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-black rounded-full mb-1" />
              </div>

              {/* Internal Mockup Content */}
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-black flex flex-col justify-end">
                {/* Looping video/image based on active style */}
                {activeVideo ? (
                  (activeVideo.type === 'video' || isVideoFile(activeVideo.url)) ? (
                    <video
                      key={activeVideo.id || activeVideo.url}
                      src={activeVideo.url}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      key={activeVideo.id || activeVideo.url}
                      src={activeVideo.url}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-neutral-950 text-slate-500">
                    <Smartphone className="w-8 h-8 mb-2 text-slate-700" />
                    <span className="text-[10px] font-bold">등록된 참조 미디어가 없습니다.</span>
                    <span className="text-[9px] text-slate-600 mt-1">우측 하단 관리자 메뉴에서 등록해 주세요.</span>
                  </div>
                )}
                
                {/* Vignette cover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 z-10" />

                {/* Simulated Reels Sidebar Controls */}
                {activeVideo && (
                  <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-5 text-white">
                    <div className="flex flex-col items-center cursor-pointer group">
                      <div className="p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 group-hover:scale-110 transition-all text-red-500">
                        <Flame className="w-4.5 h-4.5 fill-red-500" />
                      </div>
                      <span className="text-[10px] font-bold font-mono mt-1 text-gray-300">
                        {activeVideo.likes || '10K'}
                      </span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                      <div className="p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 group-hover:scale-110 transition-all">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-bold font-mono mt-1 text-gray-300">Success</span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                      <div className="p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 group-hover:scale-110 transition-all">
                        <TrendingUp className="w-4.5 h-4.5 text-blue-400" />
                      </div>
                      <span className="text-[10px] font-bold font-mono mt-1 text-gray-300">Viral</span>
                    </div>
                  </div>
                )}

                {/* Simulated Reels Text Description Bottom */}
                {activeVideo && (
                  <div className="relative z-20 p-5 text-left w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white">
                        TM
                      </div>
                      <span className="text-xs font-bold text-white tracking-tight">the_moa_official</span>
                      <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-semibold font-mono">AD</span>
                    </div>
                    
                    <p className="text-white text-xs leading-normal font-medium line-clamp-2">
                      {activeVideo.title || '성공 레퍼런스'} #릴스제작 #숏폼대행 #브랜딩
                    </p>
                    
                    <div className="flex items-center gap-2.5 text-[10px] text-blue-400 font-semibold bg-blue-500/15 border border-blue-500/20 px-2.5 py-1 rounded-lg w-fit">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>성공 공식 100% 적용 완료</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selector buttons under mockup */}
            {videos.length > 0 ? (
              <div className="flex gap-2.5 mt-6 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                {videos.map((vid, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVideoIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeIdx === idx
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    참조 {idx + 1}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 mt-6 font-medium">등록된 참조 비디오가 없습니다.</p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
