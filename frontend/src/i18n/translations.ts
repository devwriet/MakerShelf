export const LOCALES = ["ko", "en"] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABEL: Record<Locale, string> = {
  ko: "KOR",
  en: "ENG",
}

const ko = {
  nav: {
    searchPlaceholder: "검색...",
    searchButton: "검색",
    login: "로그인",
    signup: "회원가입",
  },
  hero: {
    title: "위탁 재고관리, 이제 한 곳에서",
    subtitleLine1: "실시간 재고 현황부터 정산까지, 본사·매장·공급사가 함께 쓰는",
    subtitleLine2: "위탁 판매 관리 플랫폼",
    scroll: "스크롤",
  },
  roles: {
    title: "역할에 맞는 화면을 각자 사용합니다",
    subtitle: "본사는 상품·매장·정산을 총괄하고, 매장은 재고 확인·입고 요청을, 공급사는 입고 준비를 관리합니다",
    hq: { title: "본사", desc: "상품·매장·정산을 총괄합니다" },
    store: { title: "매장", desc: "재고 확인과 입고 요청을 합니다" },
    supplier: { title: "공급사", desc: "입고를 준비하고 발송합니다" },
  },
  features: {
    title: "핵심 기능",
    subtitle: "실시간 재고 현황부터 입출고 내역 조회, 위탁 정산서 확인까지 한 화면에서 확인하세요.",
    stock: { title: "실시간 재고 현황", desc: "본사·매장·공급사가 지금 이 순간의 재고를 같은 화면에서 확인합니다." },
    logs: { title: "입출고 내역 조회", desc: "입고부터 출고까지, 상품 이동 기록을 놓치지 않고 추적합니다." },
    settlement: { title: "위탁 정산서 확인", desc: "복잡한 위탁 정산 내역을 한눈에 확인하고 바로 내려받습니다." },
  },
  cta: {
    title1: "All in one,",
    title2: "for consignment",
    subtitle: "위탁 판매의 모든 과정, MakerShelf 하나로 충분합니다.",
    button: "지금 시작하기",
  },
  footer: {
    tagline: "본사·매장·공급사가 함께 쓰는 위탁 판매 재고관리 플랫폼입니다.",
    service: { title: "서비스", stock: "재고 관리", logistics: "입출고 관리", settlement: "정산" },
    support: { title: "지원", guide: "이용 가이드", faq: "자주 묻는 질문", contact: "문의하기" },
    company: { title: "회사", about: "소개", careers: "채용", blog: "블로그" },
    rights: "© 2026 MakerShelf. All rights reserved.",
    terms: "이용약관",
    privacy: "개인정보처리방침",
  },
  sideMenu: {
    menu: "메뉴",
    getStarted: "시작하기",
    credits: "크레딧",
    support: "지원",
    github: "GITHUB",
    donate: "후원",
    setting: "설정",
  },
  auth: {
    home: "홈으로",
    login: {
      title: "로그인",
      id: "아이디",
      password: "비밀번호",
      submit: "로그인",
      noAccount: "계정이 없으신가요?",
      switch: "회원가입",
    },
    signup: {
      title: "회원가입",
      email: "이메일",
      phone: "전화번호",
      id: "아이디",
      password: "비밀번호",
      checkPassword: "비밀번호 확인",
      submit: "회원가입",
      haveAccount: "이미 계정이 있으신가요?",
      switch: "로그인",
    },
  },
}

const en: typeof ko = {
  nav: {
    searchPlaceholder: "Search...",
    searchButton: "Search",
    login: "Login",
    signup: "Sign up",
  },
  hero: {
    title: "Consignment inventory, all in one place",
    subtitleLine1: "From real-time stock to settlement,",
    subtitleLine2: "one platform HQ, stores, and suppliers all use together.",
    scroll: "SCROLL",
  },
  roles: {
    title: "Each role gets the screen it needs",
    subtitle:
      "HQ oversees products, stores, and settlement; stores check stock and request restocks; suppliers prepare shipments.",
    hq: { title: "HQ", desc: "Oversees products, stores, and settlement" },
    store: { title: "Store", desc: "Checks stock and requests restocks" },
    supplier: { title: "Supplier", desc: "Prepares and ships inventory" },
  },
  features: {
    title: "Core features",
    subtitle: "From live stock levels to shipment logs and consignment statements - all in one screen.",
    stock: { title: "Real-time stock levels", desc: "HQ, stores, and suppliers see the same live stock in one screen." },
    logs: { title: "Shipment log lookup", desc: "Track every product movement from inbound to outbound, without gaps." },
    settlement: { title: "Consignment statements", desc: "Review complex settlement details at a glance and download instantly." },
  },
  cta: {
    title1: "All in one,",
    title2: "for consignment",
    subtitle: "Every step of consignment sales, handled by MakerShelf alone.",
    button: "Get started",
  },
  footer: {
    tagline: "The consignment inventory platform HQ, stores, and suppliers use together.",
    service: { title: "Service", stock: "Inventory", logistics: "Shipments", settlement: "Settlement" },
    support: { title: "Support", guide: "Guide", faq: "FAQ", contact: "Contact" },
    company: { title: "Company", about: "About", careers: "Careers", blog: "Blog" },
    rights: "© 2026 MakerShelf. All rights reserved.",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  },
  sideMenu: {
    menu: "MENU",
    getStarted: "Get Started",
    credits: "CREDITS",
    support: "SUPPORT",
    github: "GITHUB",
    donate: "DONATE",
    setting: "SETTING",
  },
  auth: {
    home: "Home",
    login: {
      title: "Login",
      id: "ID",
      password: "Password",
      submit: "Sign in",
      noAccount: "Don't have an account?",
      switch: "Sign up",
    },
    signup: {
      title: "Create account",
      email: "email",
      phone: "Phone",
      id: "ID",
      password: "Password",
      checkPassword: "Check Password",
      submit: "Sign up",
      haveAccount: "Already have an account?",
      switch: "Sign in",
    },
  },
}

export const TRANSLATIONS: Record<Locale, typeof ko> = { ko, en }
export type TranslationShape = typeof ko
