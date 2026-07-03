import React from 'react';
import { Sparkles, Instagram, Youtube, BookOpen, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200/85 pt-20 pb-12 relative overflow-hidden">
      {/* Background Subtle Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-200/80">
          
          {/* Logo Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xl tracking-tight text-slate-900 select-none">
                <span className="font-light">the</span>
                <span className="font-extrabold text-blue-600">moa</span>
                <span className="font-light text-slate-500">company</span>
              </span>
            </div>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              우리는 단순 디자인이나 영상 편집 회사가 아닙니다. 기획부터 촬영, 편집, 데이터 추적, 정밀 타겟 광고까지 연결하여 실제 ‘브랜드의 지속 가능한 성장’을 달성시키는 최정예 마케팅 파트너십 컴퍼니입니다.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-blue-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer shadow-sm"
                title="더모아 인스타그램"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-blue-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer shadow-sm"
                title="더모아 유튜브"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://blog.naver.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white hover:bg-blue-600 hover:text-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all cursor-pointer shadow-sm"
                title="더모아 공식 블로그"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Menu */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 tracking-widest uppercase font-mono">Business</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a href="#why-section" className="hover:text-blue-600 transition-colors">왜 더모아인가</a></li>
              <li><a href="#services-section" className="hover:text-blue-600 transition-colors">제공 서비스</a></li>
              <li><a href="#portfolio-section" className="hover:text-blue-600 transition-colors">포트폴리오</a></li>
              <li><a href="#process-section" className="hover:text-blue-600 transition-colors">제작 프로세스</a></li>
            </ul>
          </div>

          {/* Business Area Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 tracking-widest uppercase font-mono">Services Area</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><span className="hover:text-blue-600 cursor-default">🎥 인스타 릴스·유튜브 쇼츠 제작 대행</span></li>
              <li><span className="hover:text-blue-600 cursor-default">📱 인스타그램 공식 채널 브랜딩 & 운영</span></li>
              <li><span className="hover:text-blue-600 cursor-default">🌐 UX/UI 기반 브랜드 사이트 & 랜딩페이지 구축</span></li>
              <li><span className="hover:text-blue-600 cursor-default">🎨 상세페이지 및 BI·로고 가이드 시스템</span></li>
              <li><span className="hover:text-blue-600 cursor-default">📢 Meta / Google 정밀 타겟 광고 대행</span></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 tracking-widest uppercase font-mono">Direct Contact</h4>
            <ul className="space-y-3 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>contact.themoacompany@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Corporate Legal Declarations */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left text-[11px] text-slate-500 leading-relaxed font-sans">
            <div>
              <span className="text-slate-800 font-bold">더모아컴퍼니 (THE MOA COMPANY)</span>
              <span className="mx-2">|</span>
              <span>대표자: 윤예지</span>
              <span className="mx-2">|</span>
              <span>사업자등록번호: 123-45-67890</span>
            </div>
            <div>
              <span>통신판매업신고: 제-2026-경기연천-00025호</span>
              <span className="mx-2">|</span>
              <span>이메일: contact.themoacompany@gmail.com</span>
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              © {new Date().getFullYear()} THE MOA COMPANY. All rights reserved. Designed with precision.
            </p>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 text-slate-500 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold shadow-sm"
          >
            <span>위로 스크롤</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
