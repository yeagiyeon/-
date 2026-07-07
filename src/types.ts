export interface PortfolioMedia {
  id: string;
  type: 'image' | 'video';
  url: string; // Base64 or URL
}

export interface PortfolioItem {
  id: string;
  category: 'reels' | 'shorts' | 'brand_video' | 'website' | 'detail_page' | 'sns' | 'branding';
  title: string;
  client: string;
  description: string;
  metrics: string; // e.g. "조회수 120만회", "매출 300% 상승", "팔로워 1.2만명 증가"
  duration: string; // e.g. "2주", "1개월"
  imageUrl: string; // Main image URL
  videoUrl?: string; // Optional YouTube/Vimeo embed or custom video URL
  content: string; // Deep detailed explanation of the work
  media?: PortfolioMedia[]; // Multiple images/videos
}

export interface Inquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  serviceTypes: string[]; // Selected services
  budget: string;
  message: string;
  status: 'pending' | 'reviewed' | 'contacted';
  submittedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  stars: number;
  author: string;
  company: string;
  comment: string;
}

export interface ClientLogo {
  name: string;
  industry: string;
  symbol: string; // Simple visual logo/icon representation or text
}

export interface SiteSettings {
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle: string;
  heroDesc: string;
  statProjects: number;
  statVideos: number;
  statDesigns: number;
  statClients: number;
  statYears: number;
  heroPhoneUrl?: string;
  heroPhoneType?: 'image' | 'video';
  shortformTitle1?: string;
  shortformTitle2?: string;
  shortformDesc?: string;
  heroMockupTag?: string;
  heroMockupUser?: string;
  heroMockupSub?: string;
  heroMockupTitle?: string;
  heroMockupDesc?: string;
  heroMockupBoxLabel?: string;
  heroMockupBoxValue?: string;
}

export interface ReelsVideoItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  likes: string;
}

export function isVideoFile(url: string | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith('.mp4') || 
    lower.endsWith('.webm') || 
    lower.endsWith('.mov') || 
    lower.endsWith('.ogg') || 
    lower.startsWith('data:video/') ||
    lower.includes('.mp4?') ||
    lower.includes('.webm?') ||
    lower.includes('.mov?')
  );
}

