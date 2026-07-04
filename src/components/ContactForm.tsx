import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Inquiry } from '../types';
import { 
  Send, Phone, Mail, Clock, MessageSquare, CheckCircle2, 
  Sparkles, Check, ChevronRight, HelpCircle, ArrowRight
} from 'lucide-react';

interface ContactFormProps {
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'submittedAt'>) => void;
}

const SERVICE_OPTIONS = [
  '🎥 릴스·숏폼 촬영/편집',
  '📱 SNS 운영 대행',
  '🌐 홈페이지·랜딩페이지 제작',
  '🎨 브랜드 디자인 (BI·로고·상세페이지)',
  '📢 디지털 광고 운영',
  '📊 마케팅 종합 컨설팅'
];

const BUDGET_OPTIONS = [
  '100만원 미만 (단발성 체험형)',
  '100만원 ~ 300만원 (베이직 마케팅 패키지)',
  '300만원 ~ 500만원 (스탠다드 성장 집중 패키지)',
  '500만원 ~ 1000만원 (프리미엄 채널 빌드업)',
  '1000만원 이상 (연간 토탈 브랜딩 파트너십)',
  '추후 협의'
];

export default function ContactForm({ onSubmitInquiry }: ContactFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !phone || !email || selectedServices.length === 0 || !budget) {
      alert('필수 입력 항목을 확인해 주세요.');
      return;
    }

    setLoading(true);

    // Simulate server request delay
    setTimeout(() => {
      onSubmitInquiry({
        companyName,
        contactPerson,
        phone,
        email,
        serviceTypes: selectedServices,
        budget,
        message
      });

      setLoading(false);
      setIsSubmitted(true);
      
      // Clear form
      setCompanyName('');
      setContactPerson('');
      setPhone('');
      setEmail('');
      setSelectedServices([]);
      setBudget('');
      setMessage('');
    }, 1200);
  };

  return (
    <div id="contact-section" className="py-24 bg-slate-50 relative border-t border-slate-200/80">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Panel: Contact Text & Channels */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 h-fit">
            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest rounded mb-2">
              FREE CONSULTING
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[1.1] tracking-[-0.03em] uppercase">
              브랜드를 성장시키는<br />
              <span className="text-gradient-emerald">가장 강력하고 쉬운 방법.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-md">
              더모아컴퍼니와 함께 성장 가속 페달을 밟아보세요.<br />
              기획부터 촬영, 편집, 광고 집행까지 원스톱으로 처리하는 편안함을 경험하실 수 있습니다.
            </p>

            <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-3 max-w-md">
              <h4 className="text-xs font-bold text-blue-600 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>24시간 내 빠른 응답 보장</span>
              </h4>
              <p className="text-xs text-slate-600 leading-normal">
                상세 정보를 남겨주시면, 전담 크리에이티브 마케터가 담당 카테고리 분석 후 맞춤형 제안서와 레퍼런스를 담아 영업일 기준 24시간 이내 연락해 드립니다.
              </p>
            </div>

            {/* Direct Contact Options */}
            <div className="space-y-4 pt-6 border-t border-slate-200 max-w-md">
              <h4 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">Direct Channels</h4>
              
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="mailto:contact.themoacompany@gmail.com" 
                  className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3 transition-all shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">이메일 문의</span>
                    <span className="text-xs font-bold text-slate-900 font-mono">contact.themoacompany@gmail.com</span>
                  </div>
                </a>
              </div>

              {/* Kakao button */}
              <a 
                href="http://pf.kakao.com/_sCjtn"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#FEE500] text-[#3c1e1e] hover:bg-[#FEE500]/95 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <div className="w-5 h-5 rounded bg-black/5 flex items-center justify-center shrink-0">
                  <span className="font-extrabold text-xs">K</span>
                </div>
                <span>카카오톡 1:1 실시간 무료 상담</span>
              </a>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-slate-100">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">무료 브랜드 진단 및 파트너십 제안</h3>
                    <p className="text-xs text-slate-500">아래 정보를 입력해주시면 최적화된 마케팅 진단과 단가표를 전송해 드립니다.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div>
                      <label className="text-[11px] text-slate-500 font-bold block mb-2">회사명 또는 브랜드명 *</label>
                      <input
                        type="text"
                        placeholder="예: 더모아스튜디오"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        required
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="text-[11px] text-slate-500 font-bold block mb-2">담당자 성함 및 직급 *</label>
                      <input
                        type="text"
                        placeholder="예: 홍길동 팀장"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="text-[11px] text-slate-500 font-bold block mb-2">연락처 *</label>
                      <input
                        type="tel"
                        placeholder="예: 010-1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[11px] text-slate-500 font-bold block mb-2">이메일 주소 *</label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Multi-Select Services */}
                  <div className="space-y-3">
                    <label className="text-[11px] text-slate-500 font-bold block">관심 있는 희망 서비스 (중복 선택 가능) *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_OPTIONS.map((service, idx) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <div
                            key={idx}
                            onClick={() => handleServiceToggle(service)}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-blue-600/10 border-blue-500/30 text-blue-600 font-semibold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                            }`}
                          >
                            <span className="text-xs">{service}</span>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected 
                                ? 'bg-blue-600 border-blue-600 text-white' 
                                : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 font-bold" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {selectedServices.length === 0 && (
                      <p className="text-[10px] text-blue-600 font-semibold">* 한 가지 이상의 희망 서비스를 선택해 주십시오.</p>
                    )}
                  </div>

                  {/* Budget Options */}
                  <div className="space-y-3">
                    <label className="text-[11px] text-slate-500 font-bold block">예산 범위 *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((option, idx) => {
                        const isSelected = budget === option;
                        return (
                          <div
                            key={idx}
                            onClick={() => setBudget(option)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                              isSelected
                                ? 'bg-blue-600/10 border-blue-500/30 text-blue-600 font-semibold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-blue-600' : 'border-slate-300'
                            }`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                            </div>
                            <span className="text-xs">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <label className="text-[11px] text-slate-500 font-bold block mb-2">상세 의뢰 내용 또는 질문 사항 (선택사항)</label>
                    <textarea
                      placeholder="제품 정보, 자사 인스타그램 주소 또는 홈페이지, 진행하고 싶으신 캠페인의 대략적인 방향에 대해 편하게 공유해 주십시오."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>의뢰 데이터 전송 중...</span>
                    ) : (
                      <>
                        <span>마케팅 파트너십 문의 접수하기</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Success screen */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">문의가 성공적으로 전달되었습니다!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
                    더모아컴퍼니를 찾아주셔서 진심으로 감사드립니다.<br />
                    보내주신 제안 내용을 즉각 면밀히 검토하여 담당 크리에이티브 디렉터가 24시간 내 유선 혹은 이메일로 연락드리겠습니다.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>추가 문의하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>

        </div>
      </div>
    </div>
  );
}
