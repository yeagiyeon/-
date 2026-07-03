import { PortfolioItem, FAQItem, ReviewItem, ClientLogo } from './types';

export const INITIAL_PORTFOLIOS: PortfolioItem[] = [
  {
    id: 'port-1',
    category: 'reels',
    title: '성수동 핫플레이스 카페 브랜딩 숏폼 릴스 제작',
    client: '카페 오라 (Cafe Aura)',
    description: '3초 후킹 기획과 트렌디한 BGM, 트랜지션 효과로 성수동 유동 인구를 타겟팅한 릴스 캠페인',
    metrics: '누적 조회수 185만회 / 매장 방문 유입 42% 증가',
    duration: '2주',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-a-cafe-close-up-43180-large.mp4',
    content: '초반 3초에 매장 시그니처 메뉴의 시각적 후킹과 트렌디한 타이포 연출을 배치하여 시청 지속시간을 비약적으로 끌어올렸습니다. 성수동 트렌드 키워드와 숏폼 알고리즘 인기 음원을 전략적으로 활용하여 영상 발행 1주일 만에 탐색 탭에 상위 노출되었으며, 실제 방문객 증가로 웨이팅 대란을 형성시켰습니다.',
    media: [
      { id: 'm1-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-a-cafe-close-up-43180-large.mp4' },
      { id: 'm1-2', type: 'image', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800' },
      { id: 'm1-3', type: 'image', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'port-2',
    category: 'shorts',
    title: '코스메틱 브랜드 \'엘르제\' 런칭 숏폼 광고 콘텐츠',
    client: '엘르제 코스메틱',
    description: '제품 제형의 생생한 질감 표현과 비포&애프터 비교로 즉각적인 구매 욕구를 자극하는 고감도 숏폼 필름',
    metrics: '광고 수익률 (ROAS) 580% 달성 / 조회수 92만회',
    duration: '3주',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-holding-a-bottle-of-skin-care-cream-39903-large.mp4',
    content: '화장품 제형의 수분감과 생동감을 매크로 렌즈로 밀착 촬영하여 시청자의 촉각적 오감을 자극했습니다. 자극적인 연출 없이 실사용 6초 효과를 감도 있게 배치하여 브랜드 고유의 프리미엄 이미지를 훼손하지 않고 매출 성장에 즉각 기여했습니다.',
    media: [
      { id: 'm2-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-model-holding-a-bottle-of-skin-care-cream-39903-large.mp4' },
      { id: 'm2-2', type: 'image', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800' },
      { id: 'm2-3', type: 'image', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'port-3',
    category: 'brand_video',
    title: '친환경 라이프스타일 가구 브랜드 \'그린하우스\' 감성 브랜드 필름',
    client: '그린하우스 코리아',
    description: '공간의 가치와 가족의 따뜻함을 영화적 톤앤매너로 담아내어 브랜드 인지도를 고양하는 웰메이드 감성 필름',
    metrics: '브랜드 선호도 180% 상승 / 공식 채널 업로드 조회수 45만회',
    duration: '4주',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bright-kitchen-with-wooden-accents-41829-large.mp4',
    content: '단순히 가구를 진열하는 것이 아닌, 가구가 배치된 공간에서 가족들이 나누는 일상적인 교감과 아늑한 홈 무드를 4K 시네마틱 카메라로 담았습니다. 정제된 오디오와 나레이션, 디테일한 미장센을 통해 브랜드의 장인 정신과 가치 중심 브랜딩을 실현시켰습니다.',
    media: [
      { id: 'm3-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-bright-kitchen-with-wooden-accents-41829-large.mp4' },
      { id: 'm3-2', type: 'image', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },
      { id: 'm3-3', type: 'image', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'port-4',
    category: 'website',
    title: '프리미엄 프라이빗 필라테스 \'웰베디\' 브랜드 사이트 기획/제작',
    client: '웰베디 필라테스',
    description: 'Apple과 같은 극도의 미니멀리즘과 세련된 마이크로 인터랙션을 조화시켜 오프라인 예약률을 극대화한 반응형 웹',
    metrics: '웹사이트 방문자 신규 상담 전환율 (CVR) 24% 달성',
    duration: '4주',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-and-meditating-43251-large.mp4',
    content: '회원들이 모바일로 쉽게 강사진 일정과 시설 인테리어를 탐색할 수 있도록 고도의 최적화 반응형 인터페이스를 설계했습니다. 차분한 베이지&에메랄드 톤앤매너를 바탕으로 매력적인 시설 사진을 매끄럽게 페이드인하여 오프라인 매장의 편안한 고품격 공간 가치를 스크린에 이식했습니다.',
    media: [
      { id: 'm4-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-and-meditating-43251-large.mp4' },
      { id: 'm4-2', type: 'image', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800' },
      { id: 'm4-3', type: 'image', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'port-5',
    category: 'detail_page',
    title: '다이어트 건강기능식품 \'컷아웃\' 프리미엄 상세페이지 제작',
    client: '바이오네이처',
    description: '의학적 근거 시각화와 극적 비포&애프터 레이아웃을 결합해 스크롤을 멈추게 만드는 하이포커스 상세페이지',
    metrics: '와디즈 크라우드펀딩 6,800% 초과 달성 / 구매 전환율 3.5배 상승',
    duration: '10일',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-woman-preparing-a-healthy-salad-41611-large.mp4',
    content: '타겟 오디언스인 2030 여성층의 페인 포인트를 정확하게 짚어내는 공감 스토리텔링 카피라이팅을 수립했습니다. 성분의 과학적 흡수 메커니즘을 3D 인포그래픽 그래픽으로 번환하여 신뢰성을 주었고, 지루함을 방지하는 리듬감 넘치는 여백 가이드를 적용했습니다.',
    media: [
      { id: 'm5-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-woman-preparing-a-healthy-salad-41611-large.mp4' },
      { id: 'm5-2', type: 'image', url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800' },
      { id: 'm5-3', type: 'image', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'port-6',
    category: 'sns',
    title: '에스테틱 전문 살롱 \'르무아\' 인스타그램 브랜딩 & 운영 대행',
    client: '르무아 서울',
    description: '피드 그리드 디자인 레이아웃 가이드 구축, 고감도 카드뉴스 스토리텔링 및 릴스 제작까지 토탈 채널 브랜딩',
    metrics: '계약 3개월 만에 팔로워 1.5만명 증가 / 예약 문의 DM 300% 상승',
    duration: '6개월 (진행 중)',
    imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-having-a-facial-massage-at-a-spa-41804-large.mp4',
    content: '매장의 럭셔리한 인테리어와 시그니처 케어 노하우를 바탕으로 일관적인 색감 가이드라인을 개발했습니다. 에스테틱 유용한 홈케어 정보와 전문성이 드러나는 스토리 Q&A를 정기 발행하여 신규 유입뿐만 아니라 고관여 단골 고객층의 팬덤을 탄탄히 다졌습니다.',
    media: [
      { id: 'm6-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-having-a-facial-massage-at-a-spa-41804-large.mp4' },
      { id: 'm6-2', type: 'image', url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800' },
      { id: 'm6-3', type: 'image', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'port-7',
    category: 'branding',
    title: '수제 스페셜티 디저트 브랜드 \'미엘\' 아이덴티티 및 로고 디자인',
    client: '미엘 디저트 하우스',
    description: '프랑스 정통 파티세리의 오가닉 수제 감성을 미니멀 클래식 스타일로 시각화한 BI 개발 및 토탈 패키징 시스템 구축',
    metrics: 'BI 리뉴얼 후 신세계 백화점 팝업스토어 오픈 3시간 만에 전량 매진',
    duration: '3주',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-adding-honey-to-a-biscuit-recipe-43093-large.mp4',
    content: '미엘(Miel, 꿀) 사명에서 영감을 얻어 벌집의 구조적인 육각형태를 모던하고 클래식한 타이포 모노그램으로 완성했습니다. 고급스러운 재생 펄프 크래프트 재질 패키지와 골드 박 코팅 등 패키지 3종 가이드와 씰 스티커 가이드까지 통합 제공하여 오프라인 선물 가치를 극대화시켰습니다.',
    media: [
      { id: 'm7-1', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-adding-honey-to-a-biscuit-recipe-43093-large.mp4' },
      { id: 'm7-2', type: 'image', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800' },
      { id: 'm7-3', type: 'image', url: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: '촬영 출장은 전국 어디든 가능한가요?',
    answer: '네, 더모아컴퍼니는 서울/수도권뿐만 아니라 영남, 호남, 충청 등 전국 출장 촬영이 가능합니다. 거리에 따른 합리적인 교통 실비 수준의 출장비가 가산되며, 기획 회의 단계에서 촬영 로케이션 및 일정을 전담 피디가 세밀하게 조정해 드립니다.'
  },
  {
    question: '제작물 수정 횟수와 범위는 어떻게 되나요?',
    answer: '숏폼 영상 및 디자인 작업물은 기본적으로 2회의 무상 수정을 보장합니다. 1차 가편집 본에 대한 전반적인 타임라인, 자막 오타, 컷 전환 피드백 수정이 이뤄지며, 최종 시안 확정 단계에서 자막 효과음 수정이 이뤄집니다. 단, 사전 기획안이 확정된 후 완전히 새로운 촬영을 요구하는 등의 전면 재기획 수준은 별도 비용이 발생할 수 있습니다.'
  },
  {
    question: '프로젝트 의뢰 후 최종 납기까지 얼마나 걸리나요?',
    answer: '서비스 타입에 따라 상이하지만, 평균적으로 [릴스/숏폼 5~10편 구성]은 촬영 후 1~2주 이내, [브랜드 사이트/랜딩페이지]는 3~4주, [상세페이지 및 브랜드 디자인]은 기획 확정 후 10일 가량 소요됩니다. 긴급한 런칭 일정이 있으실 경우 상담 시점에 조율하여 Express 우선 작업 프로세스를 가동할 수 있습니다.'
  },
  {
    question: '비용(견적) 산정은 어떤 방식으로 이루어지나요?',
    answer: '더모아컴퍼니는 투명하고 합리적인 패키지 요금제와 프로젝트 맞춤형 견적 방식을 혼용합니다. 단발성 촬영은 편수 기준으로 견적을 산출하며, 정기 운영 대행(SNS대행) 및 홈페이지 구축은 요구 사양(인터랙션, 페이지 구성, 마케팅 전략 등)에 맞춤형 제안서와 비용 가이드를 선제적으로 제공해 드립니다. 견적 문의를 주시면 24시간 내에 상세 단가표를 송부해 드립니다.'
  },
  {
    question: '계약 체결 시 대금 결제 비율은 어떻게 되나요?',
    answer: '기본적으로 프로젝트 신뢰 계약 체결 시 착수금 50%를 지급받아 전문 기획 및 인력 세팅을 개시하며, 최종 제작이 완료되어 검수가 끝나고 인도받으실 때 잔금 50%를 수금합니다. 장기 채널 운영 대행의 경우에는 월 단위 정기 선결제 방식으로 안전하고 투명하게 대행 업무가 개시됩니다.'
  },
  {
    question: '촬영 원본 및 편집 소스 파일도 제공해주시나요?',
    answer: '네, 고객의 영구적인 자산 가치 보존을 위해 완성본 영상은 물론이고 추가 가공이 가능한 촬영 원본(Raw Footage)까지 유상 패키지 또는 사전 협의 조건에 맞춰 모두 제공해 드립니다. 디자인 피그마 원본이나 프리미어프로 프로젝트 템플릿 제공은 라이센스 가이드에 맞춰 제공 범위를 상세히 계약서에 안내해 드립니다.'
  },
  {
    question: 'SNS 채널 운영 대행 범위와 정기 피드 발행 프로세스는 어떤가요?',
    answer: '계약과 동시에 당사 전담 크리에이티브 마케터와 디렉터 2인이 배정됩니다. [트렌드 분석 -> 월간 콘텐츠 캘린더 구성 -> 대본 및 시놉시스 제작 -> 촬영 -> 주간 피드/릴스 업로드 -> 해시태그 최적화 -> 댓글 소통 및 분석 보고서 제공]까지 전 과정을 원스톱으로 밀착 수행합니다. 대표님께서는 최종 시안 검수만 진행하시면 되는 가장 편리한 구조입니다.'
  },
  {
    question: '영상 제작 외에 실제 성과를 만드는 디지털 광고 집행도 가능한가요?',
    answer: '네, 더모아컴퍼니는 단순 제작사를 넘어 종합 마케팅 파트너입니다. 메타(Meta), 구글(Google), 네이버(Naver), 카카오모먼트 광고 시스템을 완벽히 다루며 타겟팅 광고 셋팅 및 픽셀 연동, 성과 추적(GA4 등), 대시보드 리포팅을 연계 제공합니다. 제작된 고효율 소재를 정밀 타겟 광고와 결합하여 최대의 ROAS(광고수익률) 시너지를 창출합니다.'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    stars: 5,
    author: '김민지 대표',
    company: '카페 오라 (성수점)',
    comment: '기획안을 보자마자 확실히 감도가 다르다고 느꼈습니다. 릴스 한 편이 알고리즘을 타고 조회수 180만을 돌파한 뒤 매장 앞에 웨이팅 줄이 길게 생겼어요. 촬영부터 대본, 자막까지 더모아컴퍼니가 다 해줘서 정말 편하게 매장 관리에만 집중하고 있습니다.'
  },
  {
    id: 'rev-2',
    stars: 5,
    author: '최현우 이사',
    company: '엘르제 코스메틱',
    comment: '매출을 일으킬 수 있는 포인트를 너무나 잘 아는 파트너입니다. 타 제작사와 다르게 예쁘게만 찍는 게 아니라 우리 제품의 특성, 발림성을 극대화시켜 인스타 광고 전환 수치(ROAS 580%)를 확실히 견인했습니다. 무조건 계속 동행할 겁니다.'
  },
  {
    id: 'rev-3',
    stars: 5,
    author: '박소현 디렉터',
    company: '웰베디 필라테스',
    comment: '원페이지 형태의 브랜드 사이트를 더모아컴퍼니에 의뢰했는데, 홈페이지가 열리자마자 들어오는 고급스러운 인터랙션 덕분에 상담 전환율이 24%를 넘었습니다. 예약 고객들이 홈페이지가 너무 감각적이어서 센터도 감각적일 것 같다며 극찬을 아끼지 않습니다.'
  }
];

export const CLIENTS: ClientLogo[] = [
  { name: 'Cafe Aura', industry: 'F&B / 카페', symbol: '☕ Aura' },
  { name: 'Ellezé Cosmetic', industry: '뷰티 / 화장품', symbol: '✨ Ellezé' },
  { name: 'Green House', industry: '라이프스타일 / 가구', symbol: '🌿 GreenH' },
  { name: 'Welbedi Pilates', industry: '헬스케어 / 운동', symbol: '🧘 Welbedi' },
  { name: 'Bio Nature', industry: '건강기능식품', symbol: '💊 BioN' },
  { name: 'Miel Dessert', industry: '프리미엄 디저트', symbol: '🍯 Miel' },
  { name: 'La Reve', industry: '스파 / 에스테틱', symbol: '🫧 LaReve' },
  { name: 'Avenir Academy', industry: '교육 / 세미나', symbol: '🎓 Avenir' }
];
