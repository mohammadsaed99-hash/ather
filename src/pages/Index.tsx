import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import InviteFriends from "@/components/InviteFriends";
import {
  ArrowUpLeft,
  Bell,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Eye,
  EyeOff,
  Compass,
  Feather,
  Flag,
  Globe2,
  Home,
  Leaf,
  Languages,
  MapPin,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
} from "lucide-react";
import "../App.css";

type Locale = "ar" | "en" | "fr" | "zh" | "es" | "hi" | "bn" | "ur" | "id" | "de" | "vi" | "tr" | "ja" | "ru" | "pt" | "ko";
type BaseLocale = "ar" | "en" | "fr" | "zh" | "es" | "hi";
type NavKey = "home" | "explore" | "circles" | "saved" | "ads";

type Copy = {
  nav: { home: string; explore: string; circles: string; saved: string; ads: string };
  greeting: string;
  title: string;
  tagline: string;
  subtitle: string;
  timeline: string;
  timelineDesc: string;
  newLabel: string;
  allFollowing: string;
  myCircles: string;
  myTopics: string;
  writePlaceholder: string;
  publish: string;
  published: string;
  noMore: string;
  noMoreDesc: string;
  mindful: string;
  mindfulDesc: string;
  seeAll: string;
  circlesTitle: string;
  topicsTitle: string;
  follow: string;
  following: string;
  close: string;
  allCaught: string;
  search: string;
  language: string;
  profile: string;
  minutes: string;
  justNow: string;
  replies: string;
  share: string;
  saved: string;
  save: string;
  liked: string;
  like: string;
  noNumbers: string;
  publicCircle: string;
  quietSpace: string;
  adsTitle: string;
  adsSubtitle: string;
  adCategories: string;
  allAds: string;
  location: string;
  useLocation: string;
  locating: string;
  locationReady: string;
  locationDenied: string;
  nearby: string;
  sponsored: string;
  noAds: string;
  privacyNote: string;
  reportVulgar: string;
  reported: string;
  lowValueReport: string;
  valuesReport: string;
  signalSent: string;
  sensitiveNotice: string;
  showSensitive: string;
  hideSensitive: string;
  insightful: string;
  insightfulDone: string;
  privateCircle: string;
  publicTopic: string;
  qualityGate: string;
  qualityGateDesc: string;
  qualityError: string;
  topicLabel: string;
  meaningfulOnly: string;
  uploadMedia: string;
  mediaSelected: string;
  noCircle: string;
  saveFailed: string;
  feedError: string;
};

const copy: Record<BaseLocale, Copy> = {
  ar: {
    nav: { home: "الرئيسية", explore: "اكتشف", circles: "دوائري", saved: "المحفوظات", ads: "الإعلانات" },
    greeting: "صباح هادئ، ليان",
    title: "مساحتك الهادئة",
    tagline: "اترك أثرًا، لا ضجيجًا.",
    subtitle: "كل ما تراه هنا اختاره وقتك، لا خوارزمية.",
    timeline: "التسلسل الزمني فقط",
    timelineDesc: "الأحدث أولاً. دون اقتراحات عشوائية أو تمرير لا ينتهي.",
    newLabel: "منشور جديد",
    allFollowing: "كل ما أتابعه",
    myCircles: "دوائري",
    myTopics: "مواضيعي",
    writePlaceholder: "ما الأثر الذي ترغب في تركه اليوم؟",
    publish: "نشر الأثر",
    published: "تم نشر أثرك",
    noMore: "اطّلعت على كل جديد",
    noMoreDesc: "خذ لحظة لنفسك. لا شيء ينتظرك هنا الآن.",
    mindful: "مساحة للاكتفاء",
    mindfulDesc: "حين تنتهي من الجديد، نخبرك. لا نملأ وقتك بما لم تطلبه.",
    seeAll: "عرض الكل",
    circlesTitle: "دوائرك",
    topicsTitle: "مواضيع تتابعها",
    follow: "متابعة",
    following: "تتابع",
    close: "إغلاق",
    allCaught: "انتهى الجديد",
    search: "ابحث في أَثَر",
    language: "اللغة",
    profile: "الملف الشخصي",
    minutes: "د",
    justNow: "الآن",
    replies: "ردود",
    share: "مشاركة",
    saved: "محفوظ",
    save: "حفظ",
    liked: "أعجبك",
    like: "إعجاب",
    noNumbers: "بلا أرقام للمتابعين",
    publicCircle: "عام",
    quietSpace: "هدوء مقصود",
    adsTitle: "سوق أَثَر",
    adsSubtitle: "إعلانات هادئة منفصلة عن التايم لاين، مرتبة حسب اهتماماتك وموقعك.",
    adCategories: "فئات الإعلانات",
    allAds: "الكل",
    location: "الموقع الجغرافي",
    useLocation: "استخدم موقع المتصفح",
    locating: "جارٍ تحديد موقعك…",
    locationReady: "تم تخصيص النتائج لموقعك",
    locationDenied: "لم يتم السماح بالموقع؛ نعرض نتائج عامة.",
    nearby: "قريب منك",
    sponsored: "إعلان مختار",
    noAds: "لا توجد إعلانات في هذه الفئة الآن.",
    privacyNote: "يُستخدم الموقع على جهازك لترتيب النتائج ولا نحتفظ بإحداثياتك.",
    reportVulgar: "محتوى مبتذل / تعري",
    reported: "تم إرسال البلاغ",
    lowValueReport: "لا يقدم إضافة / محتوى تافه",
    valuesReport: "مخل بالآداب / مخالف للقيم",
    signalSent: "تم تسجيل تقييمك",
    sensitiveNotice: "صورة تحتوي على مشاهد استعراضية",
    showSensitive: "عرض الصورة بوعي",
    hideSensitive: "إخفاء الصورة",
    insightful: "أَثَر فيّ",
    insightfulDone: "ترك أثراً فيّ",
    privateCircle: "دائرة خاصة",
    publicTopic: "موضوع عام",
    qualityGate: "حارس جودة الموضوع",
    qualityGateDesc: "المواضيع العامة للنصوص العميقة والتجارب الحقيقية فقط.",
    qualityError: "أضف قيمة واضحة قبل النشر العام: فكرة، تجربة، أو تفاصيل مفيدة.",
    topicLabel: "الموضوع",
    meaningfulOnly: "نشر ذو معنى فقط",
    uploadMedia: "إضافة صورة أو فيديو",
    mediaSelected: "تم اختيار ملف",
    noCircle: "لا توجد دائرة خاصة بعد. اختر موضوعاً عاماً أو أنشئ دائرة أولاً.",
    saveFailed: "تعذر حفظ المنشور. حاول مرة أخرى.",
    feedError: "تعذر تحميل المنشورات الجديدة.",
  },
  en: {
    nav: { home: "Home", explore: "Explore", circles: "Circles", saved: "Saved", ads: "Ads" },
    greeting: "A quiet morning, Layan",
    title: "Your quiet space",
    tagline: "Leave a trace, not noise.",
    subtitle: "Everything here arrives by time, never by an algorithm.",
    timeline: "Strictly chronological",
    timelineDesc: "Newest first. No random suggestions or endless scroll.",
    newLabel: "New post",
    allFollowing: "Everything I follow",
    myCircles: "My circles",
    myTopics: "My topics",
    writePlaceholder: "What trace would you like to leave today?",
    publish: "Leave a trace",
    published: "Your trace was shared",
    noMore: "You are all caught up",
    noMoreDesc: "Take a moment for yourself. Nothing else is waiting here.",
    mindful: "A space for enough",
    mindfulDesc: "When you reach the end, we tell you. We never fill your time uninvited.",
    seeAll: "See all",
    circlesTitle: "Your circles",
    topicsTitle: "Topics you follow",
    follow: "Follow",
    following: "Following",
    close: "Close",
    allCaught: "All caught up",
    search: "Search Athar",
    language: "Language",
    profile: "Profile",
    minutes: "m",
    justNow: "Just now",
    replies: "replies",
    share: "Share",
    saved: "Saved",
    save: "Save",
    liked: "Liked",
    like: "Like",
    noNumbers: "No follower counts",
    publicCircle: "Public",
    quietSpace: "Intentional quiet",
    adsTitle: "Athar marketplace",
    adsSubtitle: "Quiet ads, separate from your timeline, shaped by your interests and location.",
    adCategories: "Ad categories",
    allAds: "All",
    location: "Location",
    useLocation: "Use browser location",
    locating: "Finding your location…",
    locationReady: "Results tailored to your location",
    locationDenied: "Location was not shared; showing general results.",
    nearby: "Near you",
    sponsored: "Curated ad",
    noAds: "No ads in this category right now.",
    privacyNote: "Your location stays on this device and is only used to sort results.",
    reportVulgar: "Nudity / vulgar content",
    reported: "Report sent",
    lowValueReport: "Adds no value / low-value content",
    valuesReport: "Unethical / against values",
    signalSent: "Your signal was recorded",
    sensitiveNotice: "Image contains suggestive scenes",
    showSensitive: "Show mindfully",
    hideSensitive: "Hide image",
    insightful: "It moved me",
    insightfulDone: "It left a trace",
    privateCircle: "Private circle",
    publicTopic: "Public topic",
    qualityGate: "Topic quality gate",
    qualityGateDesc: "Public topics are for thoughtful writing, real experiences, and useful details.",
    qualityError: "Add clear value before posting publicly: an idea, experience, or useful detail.",
    topicLabel: "Topic",
    meaningfulOnly: "Meaningful posts only",
    uploadMedia: "Add image or video",
    mediaSelected: "File selected",
    noCircle: "No private circle yet. Choose a public topic or create a circle first.",
    saveFailed: "We couldn't save the post. Try again.",
    feedError: "We couldn't load new posts.",
  },
  fr: {
    nav: { home: "Accueil", explore: "Découvrir", circles: "Cercles", saved: "Enregistrés", ads: "Annonces" },
    greeting: "Un matin calme, Layan",
    title: "Votre espace calme",
    tagline: "Laissez une trace, pas du bruit.",
    subtitle: "Tout arrive ici par le temps, jamais par un algorithme.",
    timeline: "Chronologique, simplement",
    timelineDesc: "Le plus récent d'abord. Sans suggestions ni défilement infini.",
    newLabel: "Nouveau post",
    allFollowing: "Tout ce que je suis",
    myCircles: "Mes cercles",
    myTopics: "Mes sujets",
    writePlaceholder: "Quelle trace souhaitez-vous laisser aujourd'hui ?",
    publish: "Laisser une trace",
    published: "Votre trace a été publiée",
    noMore: "Vous avez tout vu",
    noMoreDesc: "Prenez un instant pour vous. Rien ne vous attend ici.",
    mindful: "L'espace du suffisant",
    mindfulDesc: "Quand le nouveau s'arrête, nous vous le disons. Sans remplir votre temps.",
    seeAll: "Tout voir",
    circlesTitle: "Vos cercles",
    topicsTitle: "Sujets suivis",
    follow: "Suivre",
    following: "Suivi",
    close: "Fermer",
    allCaught: "Tout est vu",
    search: "Rechercher dans Athar",
    language: "Langue",
    profile: "Profil",
    minutes: "m",
    justNow: "À l'instant",
    replies: "réponses",
    share: "Partager",
    saved: "Enregistré",
    save: "Enregistrer",
    liked: "Aimé",
    like: "J'aime",
    noNumbers: "Sans compteurs d'abonnés",
    publicCircle: "Public",
    quietSpace: "Calme choisi",
    adsTitle: "Marché Athar",
    adsSubtitle: "Des annonces calmes, séparées de votre fil, selon vos intérêts et votre lieu.",
    adCategories: "Catégories",
    allAds: "Tout",
    location: "Lieu",
    useLocation: "Utiliser le lieu du navigateur",
    locating: "Localisation en cours…",
    locationReady: "Résultats adaptés à votre lieu",
    locationDenied: "Lieu non partagé ; résultats généraux affichés.",
    nearby: "Près de vous",
    sponsored: "Annonce choisie",
    noAds: "Aucune annonce dans cette catégorie pour le moment.",
    privacyNote: "Votre lieu reste sur cet appareil et sert uniquement à trier les résultats.",
    reportVulgar: "Nudité / contenu vulgaire",
    reported: "Signalement envoyé",
    lowValueReport: "N'apporte rien / contenu pauvre",
    valuesReport: "Contraire aux bonnes mœurs / aux valeurs",
    signalSent: "Votre signalement est enregistré",
    sensitiveNotice: "Cette image contient des scènes suggestives",
    showSensitive: "Afficher consciemment",
    hideSensitive: "Masquer l'image",
    insightful: "Cela m'a touché",
    insightfulDone: "Une trace laissée",
    privateCircle: "Cercle privé",
    publicTopic: "Sujet public",
    qualityGate: "Gardien de qualité",
    qualityGateDesc: "Les sujets publics accueillent les idées profondes, les expériences et les détails utiles.",
    qualityError: "Ajoutez une vraie valeur avant de publier : une idée, une expérience ou un détail utile.",
    topicLabel: "Sujet",
    meaningfulOnly: "Publications porteuses de sens",
    uploadMedia: "Ajouter une image ou une vidéo",
    mediaSelected: "Fichier sélectionné",
    noCircle: "Aucun cercle privé. Choisissez un sujet public ou créez d'abord un cercle.",
    saveFailed: "La publication n'a pas pu être enregistrée.",
    feedError: "Impossible de charger les nouveaux posts.",
  },
  zh: {
    nav: { home: "首页", explore: "探索", circles: "圈子", saved: "收藏", ads: "广告" },
    greeting: "早安，Layan",
    title: "你的宁静空间",
    tagline: "留下痕迹，而非噪音。",
    subtitle: "这里的一切按时间到来，从不由算法决定。",
    timeline: "严格按时间排列",
    timelineDesc: "最新优先。没有随机推荐，也没有无限滚动。",
    newLabel: "新动态",
    allFollowing: "我关注的一切",
    myCircles: "我的圈子",
    myTopics: "我的主题",
    writePlaceholder: "今天想留下什么痕迹？",
    publish: "留下痕迹",
    published: "你的痕迹已发布",
    noMore: "你已看完所有新内容",
    noMoreDesc: "给自己片刻时间。这里暂时没有更多内容了。",
    mindful: "知足空间",
    mindfulDesc: "看到尽头时，我们会告诉你，不会用未请求的内容填满时间。",
    seeAll: "查看全部",
    circlesTitle: "你的圈子",
    topicsTitle: "关注的主题",
    follow: "关注",
    following: "已关注",
    close: "关闭",
    allCaught: "已全部看完",
    search: "搜索 Athar",
    language: "语言",
    profile: "个人资料",
    minutes: "分钟",
    justNow: "刚刚",
    replies: "条回复",
    share: "分享",
    saved: "已收藏",
    save: "收藏",
    liked: "已喜欢",
    like: "喜欢",
    noNumbers: "不显示关注者数量",
    publicCircle: "公开",
    quietSpace: "有意识的宁静",
    adsTitle: "Athar 市集",
    adsSubtitle: "独立于时间线的宁静广告，按你的兴趣和位置排列。",
    adCategories: "广告分类",
    allAds: "全部",
    location: "位置",
    useLocation: "使用浏览器位置",
    locating: "正在查找位置…",
    locationReady: "已按你的位置定制结果",
    locationDenied: "未分享位置；显示通用结果。",
    nearby: "你附近",
    sponsored: "精选广告",
    noAds: "此分类暂时没有广告。",
    privacyNote: "位置留在此设备上，仅用于排列结果。",
    reportVulgar: "裸露 / 低俗内容",
    reported: "举报已发送",
    lowValueReport: "没有价值 / 低质量内容",
    valuesReport: "不当内容 / 违反价值观",
    signalSent: "已记录你的评价",
    sensitiveNotice: "图片包含具有暗示性的场景",
    showSensitive: "谨慎查看",
    hideSensitive: "隐藏图片",
    insightful: "触动了我",
    insightfulDone: "留下了痕迹",
    privateCircle: "私人圈子",
    publicTopic: "公共主题",
    qualityGate: "主题质量守门人",
    qualityGateDesc: "公共主题只接纳有深度的想法、真实经历和有用细节。",
    qualityError: "公开发布前请补充明确价值：想法、经历或有用细节。",
    topicLabel: "主题",
    meaningfulOnly: "只发布有意义的内容",
    uploadMedia: "添加图片或视频",
    mediaSelected: "已选择文件",
    noCircle: "还没有私人圈子。请选择公共主题或先创建圈子。",
    saveFailed: "无法保存动态，请重试。",
    feedError: "无法加载新动态。",
  },
  es: {
    nav: { home: "Inicio", explore: "Explorar", circles: "Círculos", saved: "Guardados", ads: "Anuncios" },
    greeting: "Una mañana tranquila, Layan",
    title: "Tu espacio tranquilo",
    tagline: "Deja huella, no ruido.",
    subtitle: "Todo llega aquí por el tiempo, nunca por un algoritmo.",
    timeline: "Solo cronológico",
    timelineDesc: "Lo más reciente primero. Sin sugerencias ni scroll infinito.",
    newLabel: "Nueva publicación",
    allFollowing: "Todo lo que sigo",
    myCircles: "Mis círculos",
    myTopics: "Mis temas",
    writePlaceholder: "¿Qué huella quieres dejar hoy?",
    publish: "Dejar una huella",
    published: "Tu huella se ha publicado",
    noMore: "Ya has visto todo lo nuevo",
    noMoreDesc: "Tómate un momento. Nada más te espera aquí.",
    mindful: "Un espacio para lo suficiente",
    mindfulDesc: "Cuando llegues al final, te avisamos. Nunca llenamos tu tiempo sin permiso.",
    seeAll: "Ver todo",
    circlesTitle: "Tus círculos",
    topicsTitle: "Temas que sigues",
    follow: "Seguir",
    following: "Siguiendo",
    close: "Cerrar",
    allCaught: "Todo al día",
    search: "Buscar en Athar",
    language: "Idioma",
    profile: "Perfil",
    minutes: "min",
    justNow: "Ahora",
    replies: "respuestas",
    share: "Compartir",
    saved: "Guardado",
    save: "Guardar",
    liked: "Te gusta",
    like: "Me gusta",
    noNumbers: "Sin números de seguidores",
    publicCircle: "Público",
    quietSpace: "Calma intencional",
    adsTitle: "Mercado de Athar",
    adsSubtitle: "Anuncios tranquilos, separados de tu timeline y ordenados por tus intereses y ubicación.",
    adCategories: "Categorías",
    allAds: "Todo",
    location: "Ubicación",
    useLocation: "Usar ubicación del navegador",
    locating: "Buscando tu ubicación…",
    locationReady: "Resultados adaptados a tu ubicación",
    locationDenied: "No compartiste la ubicación; mostramos resultados generales.",
    nearby: "Cerca de ti",
    sponsored: "Anuncio seleccionado",
    noAds: "No hay anuncios en esta categoría ahora.",
    privacyNote: "Tu ubicación permanece en este dispositivo y solo ordena los resultados.",
    reportVulgar: "Desnudez / contenido vulgar",
    reported: "Denuncia enviada",
    lowValueReport: "No aporta / contenido superficial",
    valuesReport: "Inadecuado / contrario a los valores",
    signalSent: "Tu valoración se ha registrado",
    sensitiveNotice: "La imagen contiene escenas sugerentes",
    showSensitive: "Ver con intención",
    hideSensitive: "Ocultar imagen",
    insightful: "Me dejó algo",
    insightfulDone: "Dejó una huella",
    privateCircle: "Círculo privado",
    publicTopic: "Tema público",
    qualityGate: "Guardia de calidad",
    qualityGateDesc: "Los temas públicos son para ideas profundas, experiencias reales y detalles útiles.",
    qualityError: "Añade valor claro antes de publicar: una idea, experiencia o detalle útil.",
    topicLabel: "Tema",
    meaningfulOnly: "Solo contenido con sentido",
    uploadMedia: "Añadir imagen o vídeo",
    mediaSelected: "Archivo seleccionado",
    noCircle: "Aún no tienes un círculo privado. Elige un tema público o crea uno primero.",
    saveFailed: "No se pudo guardar la publicación.",
    feedError: "No se pudieron cargar las publicaciones nuevas.",
  },
  hi: {
    nav: { home: "होम", explore: "खोजें", circles: "सर्कल", saved: "सहेजे गए", ads: "विज्ञापन" },
    greeting: "शांत सुबह, Layan",
    title: "आपकी शांत जगह",
    tagline: "शोर नहीं, एक छाप छोड़ें।",
    subtitle: "यहाँ सब कुछ समय के अनुसार आता है, एल्गोरिदम के अनुसार नहीं।",
    timeline: "सिर्फ़ कालानुक्रमिक",
    timelineDesc: "नवीनतम पहले। बिना सुझाव या अंतहीन स्क्रॉल के।",
    newLabel: "नई पोस्ट",
    allFollowing: "मैं जिसे फ़ॉलो करता हूँ",
    myCircles: "मेरे सर्कल",
    myTopics: "मेरे विषय",
    writePlaceholder: "आज आप कौन-सी छाप छोड़ना चाहेंगे?",
    publish: "छाप छोड़ें",
    published: "आपकी छाप साझा हो गई",
    noMore: "आपने सब नया देख लिया",
    noMoreDesc: "अपने लिए एक पल लें। यहाँ अभी कुछ और नहीं है।",
    mindful: "पर्याप्तता की जगह",
    mindfulDesc: "जब आप अंत तक पहुँचेंगे, हम बताएँगे। आपके समय को अनचाही चीज़ों से नहीं भरेंगे।",
    seeAll: "सब देखें",
    circlesTitle: "आपके सर्कल",
    topicsTitle: "आपके फ़ॉलो किए विषय",
    follow: "फ़ॉलो करें",
    following: "फ़ॉलो कर रहे हैं",
    close: "बंद करें",
    allCaught: "सब देख लिया",
    search: "Athar में खोजें",
    language: "भाषा",
    profile: "प्रोफ़ाइल",
    minutes: "मि",
    justNow: "अभी",
    replies: "जवाब",
    share: "साझा करें",
    saved: "सहेजा गया",
    save: "सहेजें",
    liked: "पसंद किया",
    like: "पसंद",
    noNumbers: "फ़ॉलोअर संख्या नहीं",
    publicCircle: "सार्वजनिक",
    quietSpace: "सोची-समझी शांति",
    adsTitle: "Athar बाज़ार",
    adsSubtitle: "आपकी टाइमलाइन से अलग शांत विज्ञापन, आपकी रुचि और स्थान के अनुसार।",
    adCategories: "विज्ञापन श्रेणियाँ",
    allAds: "सभी",
    location: "स्थान",
    useLocation: "ब्राउज़र स्थान का उपयोग करें",
    locating: "स्थान खोज रहे हैं…",
    locationReady: "आपके स्थान के अनुसार परिणाम",
    locationDenied: "स्थान साझा नहीं किया; सामान्य परिणाम दिखा रहे हैं।",
    nearby: "आपके पास",
    sponsored: "चुना हुआ विज्ञापन",
    noAds: "इस श्रेणी में अभी कोई विज्ञापन नहीं है।",
    privacyNote: "आपका स्थान इसी डिवाइस पर रहता है और केवल परिणाम क्रम के लिए उपयोग होता है।",
    reportVulgar: "अश्लील / नग्न सामग्री",
    reported: "रिपोर्ट भेजी गई",
    lowValueReport: "कोई मूल्य नहीं / सतही सामग्री",
    valuesReport: "अनुचित / मूल्यों के विरुद्ध",
    signalSent: "आपका संकेत दर्ज हो गया",
    sensitiveNotice: "इस तस्वीर में उत्तेजक दृश्य हैं",
    showSensitive: "सचेत होकर देखें",
    hideSensitive: "तस्वीर छिपाएँ",
    insightful: "इसने मुझे छुआ",
    insightfulDone: "एक छाप छोड़ी",
    privateCircle: "निजी सर्कल",
    publicTopic: "सार्वजनिक विषय",
    qualityGate: "विषय गुणवत्ता द्वार",
    qualityGateDesc: "सार्वजनिक विषय गहरे विचार, वास्तविक अनुभव और उपयोगी विवरणों के लिए हैं।",
    qualityError: "सार्वजनिक पोस्ट से पहले स्पष्ट मूल्य जोड़ें: विचार, अनुभव या उपयोगी विवरण।",
    topicLabel: "विषय",
    meaningfulOnly: "सिर्फ़ अर्थपूर्ण पोस्ट",
    uploadMedia: "तस्वीर या वीडियो जोड़ें",
    mediaSelected: "फ़ाइल चुनी गई",
    noCircle: "अभी कोई निजी सर्कल नहीं है। सार्वजनिक विषय चुनें या पहले सर्कल बनाएँ।",
    saveFailed: "पोस्ट सहेजी नहीं जा सकी। फिर कोशिश करें।",
    feedError: "नई पोस्ट लोड नहीं हो सकीं।",
  },
};

const translatedCopy: Record<Locale, Copy> = {
  ...copy,
  bn: {
    ...copy.en,
    nav: { home: "হোম", explore: "অন্বেষণ", circles: "চক্র", saved: "সংরক্ষিত", ads: "বিজ্ঞাপন" },
    greeting: "শান্ত সকাল, Layan",
    title: "আপনার শান্ত স্থান",
    tagline: "শব্দ নয়, একটি ছাপ রেখে যান।",
    subtitle: "এখানে সবকিছু সময় অনুযায়ী আসে, অ্যালগরিদম অনুযায়ী নয়।",
    timeline: "শুধু সময়ক্রমে",
    timelineDesc: "সর্বশেষ আগে। এলোমেলো পরামর্শ বা অন্তহীন স্ক্রল নয়।",
    newLabel: "নতুন পোস্ট",
    allFollowing: "আমি যা অনুসরণ করি",
    myCircles: "আমার চক্র",
    myTopics: "আমার বিষয়",
    writePlaceholder: "আজ আপনি কী ছাপ রেখে যেতে চান?",
    publish: "ছাপ রেখে যান",
    published: "আপনার ছাপ প্রকাশিত হয়েছে",
    noMore: "আপনি সব নতুন বিষয় দেখে ফেলেছেন",
    noMoreDesc: "নিজের জন্য একটু সময় নিন। এখানে এখন আর কিছু অপেক্ষা করছে না।",
    mindful: "যথেষ্টতার জন্য একটি স্থান",
    seeAll: "সব দেখুন",
    circlesTitle: "আপনার চক্র",
    topicsTitle: "আপনার অনুসরণ করা বিষয়",
    follow: "অনুসরণ",
    following: "অনুসরণ করছেন",
    close: "বন্ধ করুন",
    search: "আথারে অনুসন্ধান করুন",
    language: "ভাষা",
    profile: "প্রোফাইল",
    minutes: "মি",
    replies: "উত্তর",
    share: "শেয়ার করুন",
    saved: "সংরক্ষিত",
    save: "সংরক্ষণ",
    reportVulgar: "রিপোর্ট",
    privateCircle: "ব্যক্তিগত চক্র",
    publicTopic: "সর্বজনীন বিষয়",
    qualityGate: "অর্থপূর্ণ পোস্ট",
    qualityGateDesc: "সর্বজনীন পোস্ট প্রকাশের আগে পর্যালোচনা করা হয়।",
    qualityError: "সর্বজনীন পোস্টে আরও কিছু ভাবনা যোগ করুন।",
    uploadMedia: "ছবি বা ভিডিও যোগ করুন",
    mediaSelected: "ফাইল নির্বাচিত",
    noCircle: "এখনও কোনো ব্যক্তিগত চক্র নেই।",
    saveFailed: "পোস্ট সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।",
    feedError: "নতুন পোস্ট লোড করা যায়নি।",
  },
  ur: {
    ...copy.en,
    nav: { home: "ہوم", explore: "دریافت", circles: "حلقے", saved: "محفوظ", ads: "اشتہارات" },
    greeting: "پُرسکون صبح، Layan",
    title: "آپ کی پُرسکون جگہ",
    tagline: "شور نہیں، ایک نشان چھوڑیں۔",
    subtitle: "یہاں ہر چیز وقت کے مطابق آتی ہے، الگورتھم کے مطابق نہیں۔",
    timeline: "صرف زمانی ترتیب",
    timelineDesc: "تازہ ترین پہلے۔ بے ترتیب تجاویز یا لامتناہی اسکرول نہیں۔",
    newLabel: "نئی پوسٹ",
    allFollowing: "میری تمام پیروی",
    myCircles: "میرے حلقے",
    myTopics: "میرے موضوعات",
    writePlaceholder: "آج آپ کیا نشان چھوڑنا چاہتے ہیں؟",
    publish: "نشان چھوڑیں",
    published: "آپ کا نشان شیئر کر دیا گیا",
    noMore: "آپ سب نیا دیکھ چکے ہیں",
    noMoreDesc: "اپنے لیے ایک لمحہ نکالیں۔ یہاں ابھی کچھ اور منتظر نہیں۔",
    mindful: "کفایت کی جگہ",
    seeAll: "سب دیکھیں",
    circlesTitle: "آپ کے حلقے",
    topicsTitle: "آپ کے زیرِپیروی موضوعات",
    follow: "پیروی کریں",
    following: "پیروی جاری",
    close: "بند کریں",
    search: "أَثَر میں تلاش کریں",
    language: "زبان",
    profile: "پروفائل",
    minutes: "منٹ",
    replies: "جوابات",
    share: "شیئر کریں",
    saved: "محفوظ",
    save: "محفوظ کریں",
    reportVulgar: "رپورٹ کریں",
    privateCircle: "نجی حلقہ",
    publicTopic: "عوامی موضوع",
    qualityGate: "بامعنی پوسٹ",
    qualityGateDesc: "عوامی پوسٹ شائع ہونے سے پہلے دیکھی جاتی ہے۔",
    qualityError: "عوامی پوسٹ میں مزید تفصیل شامل کریں۔",
    uploadMedia: "تصویر یا ویڈیو شامل کریں",
    mediaSelected: "فائل منتخب",
    noCircle: "ابھی کوئی نجی حلقہ نہیں ہے۔",
    saveFailed: "پوسٹ محفوظ نہیں ہو سکی۔ دوبارہ کوشش کریں۔",
    feedError: "نئی پوسٹس لوڈ نہیں ہو سکیں۔",
  },
  id: {
    ...copy.en,
    nav: { home: "Beranda", explore: "Jelajahi", circles: "Lingkaran", saved: "Tersimpan", ads: "Iklan" },
    greeting: "Pagi yang tenang, Layan",
    title: "Ruang tenangmu",
    tagline: "Tinggalkan jejak, bukan kebisingan.",
    subtitle: "Semua di sini hadir sesuai waktumu, bukan algoritma.",
    timeline: "Kronologis saja",
    timelineDesc: "Yang terbaru lebih dulu. Tanpa saran acak atau scroll tanpa akhir.",
    newLabel: "Postingan baru",
    allFollowing: "Semua yang kuikuti",
    myCircles: "Lingkaranku",
    myTopics: "Topikku",
    writePlaceholder: "Jejak apa yang ingin kamu tinggalkan hari ini?",
    publish: "Tinggalkan jejak",
    published: "Jejakmu telah dibagikan",
    noMore: "Kamu sudah melihat semua yang baru",
    noMoreDesc: "Luangkan waktu untuk dirimu. Tidak ada lagi yang menunggu di sini.",
    mindful: "Ruang untuk merasa cukup",
    seeAll: "Lihat semua",
    circlesTitle: "Lingkaranmu",
    topicsTitle: "Topik yang kamu ikuti",
    follow: "Ikuti",
    following: "Mengikuti",
    close: "Tutup",
    search: "Cari di Athar",
    language: "Bahasa",
    profile: "Profil",
    minutes: "mnt",
    replies: "balasan",
    share: "Bagikan",
    saved: "Tersimpan",
    save: "Simpan",
    reportVulgar: "Laporkan",
    privateCircle: "Lingkaran pribadi",
    publicTopic: "Topik publik",
    qualityGate: "Posting bermakna",
    qualityGateDesc: "Posting publik ditinjau sebelum dibagikan.",
    qualityError: "Tambahkan sedikit lebih banyak makna pada posting publik.",
    uploadMedia: "Tambahkan foto atau video",
    mediaSelected: "File dipilih",
    noCircle: "Belum ada lingkaran pribadi.",
    saveFailed: "Posting gagal disimpan. Coba lagi.",
    feedError: "Posting baru gagal dimuat.",
  },
  de: {
    ...copy.en,
    nav: { home: "Startseite", explore: "Entdecken", circles: "Kreise", saved: "Gespeichert", ads: "Anzeigen" },
    greeting: "Ein ruhiger Morgen, Layan",
    title: "Dein ruhiger Raum",
    tagline: "Hinterlasse eine Spur, keinen Lärm.",
    subtitle: "Alles hier kommt in deiner Zeit, nicht durch einen Algorithmus.",
    timeline: "Streng chronologisch",
    timelineDesc: "Das Neueste zuerst. Keine zufälligen Vorschläge und kein endloses Scrollen.",
    newLabel: "Neuer Beitrag",
    allFollowing: "Alles, was ich folge",
    myCircles: "Meine Kreise",
    myTopics: "Meine Themen",
    writePlaceholder: "Welche Spur möchtest du heute hinterlassen?",
    publish: "Spur hinterlassen",
    published: "Deine Spur wurde geteilt",
    noMore: "Du bist auf dem neuesten Stand",
    noMoreDesc: "Nimm dir einen Moment für dich. Hier wartet gerade nichts weiter.",
    mindful: "Ein Raum für genug",
    seeAll: "Alle ansehen",
    circlesTitle: "Deine Kreise",
    topicsTitle: "Themen, denen du folgst",
    follow: "Folgen",
    following: "Du folgst",
    close: "Schließen",
    search: "In Athar suchen",
    language: "Sprache",
    profile: "Profil",
    minutes: "Min.",
    replies: "Antworten",
    share: "Teilen",
    saved: "Gespeichert",
    save: "Speichern",
    reportVulgar: "Melden",
    privateCircle: "Privater Kreis",
    publicTopic: "Öffentliches Thema",
    qualityGate: "Bedeutungsvoller Beitrag",
    qualityGateDesc: "Öffentliche Beiträge werden vor dem Teilen geprüft.",
    qualityError: "Gib deinem öffentlichen Beitrag noch etwas mehr Tiefe.",
    uploadMedia: "Foto oder Video hinzufügen",
    mediaSelected: "Datei ausgewählt",
    noCircle: "Noch kein privater Kreis vorhanden.",
    saveFailed: "Beitrag konnte nicht gespeichert werden. Versuch es erneut.",
    feedError: "Neue Beiträge konnten nicht geladen werden.",
  },
  vi: {
    ...copy.en,
    nav: { home: "Trang chủ", explore: "Khám phá", circles: "Vòng tròn", saved: "Đã lưu", ads: "Quảng cáo" },
    greeting: "Một buổi sáng yên bình, Layan",
    title: "Không gian yên bình của bạn",
    tagline: "Để lại dấu ấn, đừng để lại ồn ào.",
    subtitle: "Mọi điều ở đây đến theo thời gian của bạn, không phải thuật toán.",
    timeline: "Chỉ theo trình tự thời gian",
    timelineDesc: "Mới nhất trước. Không gợi ý ngẫu nhiên hay cuộn vô tận.",
    newLabel: "Bài viết mới",
    allFollowing: "Tất cả nội dung tôi theo dõi",
    myCircles: "Vòng tròn của tôi",
    myTopics: "Chủ đề của tôi",
    writePlaceholder: "Hôm nay bạn muốn để lại dấu ấn gì?",
    publish: "Để lại dấu ấn",
    published: "Dấu ấn của bạn đã được chia sẻ",
    noMore: "Bạn đã xem hết nội dung mới",
    noMoreDesc: "Hãy dành một chút thời gian cho mình. Hiện không còn gì chờ bạn.",
    mindful: "Một không gian vừa đủ",
    seeAll: "Xem tất cả",
    circlesTitle: "Vòng tròn của bạn",
    topicsTitle: "Chủ đề bạn theo dõi",
    follow: "Theo dõi",
    following: "Đang theo dõi",
    close: "Đóng",
    search: "Tìm kiếm trong Athar",
    language: "Ngôn ngữ",
    profile: "Hồ sơ",
    minutes: "phút",
    replies: "phản hồi",
    share: "Chia sẻ",
    saved: "Đã lưu",
    save: "Lưu",
    reportVulgar: "Báo cáo",
    privateCircle: "Vòng tròn riêng tư",
    publicTopic: "Chủ đề công khai",
    qualityGate: "Bài viết có ý nghĩa",
    qualityGateDesc: "Bài viết công khai được xem xét trước khi chia sẻ.",
    qualityError: "Hãy thêm nhiều ý nghĩa hơn vào bài viết công khai.",
    uploadMedia: "Thêm ảnh hoặc video",
    mediaSelected: "Đã chọn tệp",
    noCircle: "Chưa có vòng tròn riêng tư.",
    saveFailed: "Không thể lưu bài viết. Hãy thử lại.",
    feedError: "Không thể tải bài viết mới.",
  },
  tr: {
    ...copy.en,
    nav: { home: "Ana sayfa", explore: "Keşfet", circles: "Çevreler", saved: "Kaydedilenler", ads: "İlanlar" },
    greeting: "Sessiz bir sabah, Layan",
    title: "Sessiz alanın",
    tagline: "Gürültü değil, iz bırak.",
    subtitle: "Buradaki her şey algoritmaya değil, senin zamanına göre gelir.",
    timeline: "Yalnızca kronolojik",
    timelineDesc: "En yeniler önce. Rastgele öneriler veya sonsuz kaydırma yok.",
    newLabel: "Yeni gönderi",
    allFollowing: "Takip ettiklerim",
    myCircles: "Çevrelerim",
    myTopics: "Konularım",
    writePlaceholder: "Bugün nasıl bir iz bırakmak istersin?",
    publish: "İz bırak",
    published: "İzin paylaşıldı",
    noMore: "Yenilerin hepsini gördün",
    noMoreDesc: "Kendin için bir an ayır. Burada seni bekleyen başka bir şey yok.",
    mindful: "Yeterli olan için bir alan",
    seeAll: "Tümünü gör",
    circlesTitle: "Çevrelerin",
    topicsTitle: "Takip ettiğin konular",
    follow: "Takip et",
    following: "Takip ediliyor",
    close: "Kapat",
    search: "Athar'da ara",
    language: "Dil",
    profile: "Profil",
    minutes: "dk",
    replies: "yanıt",
    share: "Paylaş",
    saved: "Kaydedildi",
    save: "Kaydet",
    reportVulgar: "Bildir",
    privateCircle: "Özel çevre",
    publicTopic: "Herkese açık konu",
    qualityGate: "Anlamlı gönderi",
    qualityGateDesc: "Herkese açık gönderiler paylaşılmadan önce incelenir.",
    qualityError: "Herkese açık gönderine biraz daha anlam kat.",
    uploadMedia: "Fotoğraf veya video ekle",
    mediaSelected: "Dosya seçildi",
    noCircle: "Henüz özel çevre yok.",
    saveFailed: "Gönderi kaydedilemedi. Tekrar dene.",
    feedError: "Yeni gönderiler yüklenemedi.",
  },
  ja: {
    ...copy.en,
    nav: { home: "ホーム", explore: "見つける", circles: "サークル", saved: "保存済み", ads: "広告" },
    greeting: "静かな朝、Layan",
    title: "あなたの静かな場所",
    tagline: "騒がしさではなく、足跡を残そう。",
    subtitle: "ここに届くものは、アルゴリズムではなくあなたの時間に寄り添います。",
    timeline: "時系列のみ",
    timelineDesc: "新しいものから表示。ランダムなおすすめも無限スクロールもありません。",
    newLabel: "新しい投稿",
    allFollowing: "フォロー中のすべて",
    myCircles: "マイサークル",
    myTopics: "マイトピック",
    writePlaceholder: "今日、どんな足跡を残したいですか？",
    publish: "足跡を残す",
    published: "あなたの足跡を共有しました",
    noMore: "新しい投稿をすべて見ました",
    noMoreDesc: "自分のための時間を少し。ここには今、待っているものはありません。",
    mindful: "ちょうどよさのための場所",
    seeAll: "すべて見る",
    circlesTitle: "あなたのサークル",
    topicsTitle: "フォロー中のトピック",
    follow: "フォロー",
    following: "フォロー中",
    close: "閉じる",
    search: "Atharを検索",
    language: "言語",
    profile: "プロフィール",
    minutes: "分",
    replies: "返信",
    share: "共有",
    saved: "保存済み",
    save: "保存",
    reportVulgar: "報告",
    privateCircle: "プライベートサークル",
    publicTopic: "公開トピック",
    qualityGate: "意味のある投稿",
    qualityGateDesc: "公開投稿は共有前に確認されます。",
    qualityError: "公開投稿にもう少し意味を加えてください。",
    uploadMedia: "写真や動画を追加",
    mediaSelected: "ファイルを選択済み",
    noCircle: "プライベートサークルはまだありません。",
    saveFailed: "投稿を保存できませんでした。もう一度お試しください。",
    feedError: "新しい投稿を読み込めませんでした。",
  },
  ru: {
    ...copy.en,
    nav: { home: "Главная", explore: "Обзор", circles: "Круги", saved: "Сохранённое", ads: "Объявления" },
    greeting: "Тихое утро, Layan",
    title: "Твоё тихое пространство",
    tagline: "Оставляй след, а не шум.",
    subtitle: "Здесь всё приходит в твоё время, а не по алгоритму.",
    timeline: "Только хронология",
    timelineDesc: "Сначала новое. Без случайных рекомендаций и бесконечной ленты.",
    newLabel: "Новая публикация",
    allFollowing: "Всё, что я читаю",
    myCircles: "Мои круги",
    myTopics: "Мои темы",
    writePlaceholder: "Какой след ты хочешь оставить сегодня?",
    publish: "Оставить след",
    published: "Твой след опубликован",
    noMore: "Ты увидел всё новое",
    noMoreDesc: "Остановись на мгновение. Сейчас здесь больше ничего не ждёт.",
    mindful: "Пространство достаточности",
    seeAll: "Посмотреть всё",
    circlesTitle: "Твои круги",
    topicsTitle: "Темы, которые ты читаешь",
    follow: "Подписаться",
    following: "Подписка",
    close: "Закрыть",
    search: "Поиск в Athar",
    language: "Язык",
    profile: "Профиль",
    minutes: "мин",
    replies: "ответов",
    share: "Поделиться",
    saved: "Сохранено",
    save: "Сохранить",
    reportVulgar: "Пожаловаться",
    privateCircle: "Приватный круг",
    publicTopic: "Публичная тема",
    qualityGate: "Содержательная публикация",
    qualityGateDesc: "Публичные публикации проверяются перед размещением.",
    qualityError: "Добавь немного больше смысла в публичную публикацию.",
    uploadMedia: "Добавить фото или видео",
    mediaSelected: "Файл выбран",
    noCircle: "Приватных кругов пока нет.",
    saveFailed: "Не удалось сохранить публикацию. Попробуй снова.",
    feedError: "Не удалось загрузить новые публикации.",
  },
  pt: {
    ...copy.en,
    nav: { home: "Início", explore: "Explorar", circles: "Círculos", saved: "Salvos", ads: "Anúncios" },
    greeting: "Uma manhã tranquila, Layan",
    title: "Seu espaço tranquilo",
    tagline: "Deixe uma marca, não ruído.",
    subtitle: "Tudo aqui chega no seu tempo, não por um algoritmo.",
    timeline: "Apenas cronológico",
    timelineDesc: "O mais recente primeiro. Sem sugestões aleatórias ou rolagem infinita.",
    newLabel: "Nova publicação",
    allFollowing: "Tudo o que sigo",
    myCircles: "Meus círculos",
    myTopics: "Meus temas",
    writePlaceholder: "Que marca você quer deixar hoje?",
    publish: "Deixar uma marca",
    published: "Sua marca foi compartilhada",
    noMore: "Você viu tudo de novo",
    noMoreDesc: "Reserve um momento para você. Nada mais espera por aqui.",
    mindful: "Um espaço para o suficiente",
    seeAll: "Ver tudo",
    circlesTitle: "Seus círculos",
    topicsTitle: "Temas que você segue",
    follow: "Seguir",
    following: "Seguindo",
    close: "Fechar",
    search: "Pesquisar no Athar",
    language: "Idioma",
    profile: "Perfil",
    minutes: "min",
    replies: "respostas",
    share: "Compartilhar",
    saved: "Salvo",
    save: "Salvar",
    reportVulgar: "Denunciar",
    privateCircle: "Círculo privado",
    publicTopic: "Tema público",
    qualityGate: "Publicação significativa",
    qualityGateDesc: "Publicações públicas são revisadas antes do compartilhamento.",
    qualityError: "Adicione mais significado à publicação pública.",
    uploadMedia: "Adicionar foto ou vídeo",
    mediaSelected: "Arquivo selecionado",
    noCircle: "Ainda não há círculos privados.",
    saveFailed: "Não foi possível salvar a publicação. Tente novamente.",
    feedError: "Não foi possível carregar novas publicações.",
  },
  ko: {
    ...copy.en,
    nav: { home: "홈", explore: "탐색", circles: "서클", saved: "저장됨", ads: "광고" },
    greeting: "고요한 아침, Layan",
    title: "당신의 고요한 공간",
    tagline: "소음이 아닌 흔적을 남겨요.",
    subtitle: "이곳의 모든 것은 알고리즘이 아니라 당신의 시간에 맞춰 도착합니다.",
    timeline: "시간순으로만",
    timelineDesc: "최신순으로 표시합니다. 무작위 추천과 끝없는 스크롤은 없습니다.",
    newLabel: "새 게시물",
    allFollowing: "팔로우하는 모든 것",
    myCircles: "내 서클",
    myTopics: "내 주제",
    writePlaceholder: "오늘 어떤 흔적을 남기고 싶나요?",
    publish: "흔적 남기기",
    published: "당신의 흔적이 공유되었습니다",
    noMore: "새로운 내용을 모두 확인했습니다",
    noMoreDesc: "잠시 자신을 위한 시간을 가져보세요. 지금은 더 기다리는 것이 없습니다.",
    mindful: "충분함을 위한 공간",
    seeAll: "모두 보기",
    circlesTitle: "내 서클",
    topicsTitle: "팔로우하는 주제",
    follow: "팔로우",
    following: "팔로잉",
    close: "닫기",
    search: "Athar에서 검색",
    language: "언어",
    profile: "프로필",
    minutes: "분",
    replies: "답글",
    share: "공유",
    saved: "저장됨",
    save: "저장",
    reportVulgar: "신고",
    privateCircle: "비공개 서클",
    publicTopic: "공개 주제",
    qualityGate: "의미 있는 게시물",
    qualityGateDesc: "공개 게시물은 공유 전에 검토됩니다.",
    qualityError: "공개 게시물에 조금 더 의미를 담아주세요.",
    uploadMedia: "사진 또는 동영상 추가",
    mediaSelected: "파일 선택됨",
    noCircle: "아직 비공개 서클이 없습니다.",
    saveFailed: "게시물을 저장하지 못했습니다. 다시 시도해주세요.",
    feedError: "새 게시물을 불러오지 못했습니다.",
  },
};

const languageNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  zh: "中文",
  es: "Español",
  hi: "हिन्दी",
  bn: "🇧🇩 বাংলা",
  ur: "🇵🇰 اردو",
  id: "🇮🇩 Bahasa Indonesia",
  de: "🇩🇪 Deutsch",
  vi: "🇻🇳 Tiếng Việt",
  tr: "🇹🇷 Türkçe",
  ja: "🇯🇵 日本語",
  ru: "🇷🇺 Русский",
  pt: "🇵🇹 Português",
  ko: "🇰🇷 한국어",
};

const topics = ["تصوير", "أدب", "علوم", "تقنية", "حياة هادئة"];

type PostId = string | number;

type FeedPost = {
  id: PostId;
  authorId?: string;
  sensitive: boolean;
  author: string;
  handle: string;
  initials: string;
  tone: string;
  circle: string;
  time: string;
  topic: string;
  imageTone: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  body: Record<string, string>;
  likes: number;
  replies: number;
  visibility?: "circle" | "topic";
};

type UserCircle = {
  id: string;
  name: string;
};

const posts: FeedPost[] = [
  {
    id: 1,
    sensitive: false,
    author: "سارة المنصور",
    handle: "sara.m",
    initials: "س",
    tone: "bg-[#dbe5d3] text-[#4f6749]",
    circle: "العائلة والأصدقاء",
    time: "8",
    topic: "تصوير",
    imageTone: "bg-[#d8e1d4]",
    body: {
      ar: "في الصباحات التي لا نستعجلها، نرى أشياء صغيرة كانت تختبئ خلف الضجيج. صورة من نافذتي هذا الصباح.",
      en: "On mornings we don't rush, we notice the small things hiding behind the noise. A view from my window today.",
      fr: "Les matins où l'on ne se presse pas révèlent les petites choses cachées derrière le bruit. Une vue de ma fenêtre.",
      zh: "在不匆忙的早晨，我们会看见藏在喧嚣背后的细小事物。这是今天窗外的风景。",
      es: "En las mañanas sin prisa vemos las cosas pequeñas que se esconden tras el ruido. Una vista desde mi ventana.",
      hi: "जब सुबह में जल्दबाज़ी नहीं होती, तो शोर के पीछे छुपी छोटी चीज़ें दिखती हैं। आज मेरी खिड़की से एक दृश्य।",
    },
    likes: 14,
    replies: 3,
  },
  {
    id: 2,
    sensitive: false,
    author: "نادر يونس",
    handle: "nader.reads",
    initials: "ن",
    tone: "bg-[#e9dfd2] text-[#876c51]",
    circle: "المعارف والعمل",
    time: "24",
    topic: "أدب",
    imageTone: "bg-[#e9dfd2]",
    body: {
      ar: "الكتاب الجيد لا يعطيك إجابات أسرع، بل يمنحك أسئلة أعمق تعيش معها قليلاً.",
      en: "A good book doesn't give faster answers. It gives deeper questions to live with for a while.",
      fr: "Un bon livre ne donne pas des réponses plus rapides. Il offre des questions plus profondes à habiter.",
      zh: "一本好书不会给你更快的答案，而是留下值得慢慢相处的深刻问题。",
      es: "Un buen libro no da respuestas más rápidas. Deja preguntas más profundas para vivir con ellas.",
      hi: "एक अच्छी किताब तेज़ जवाब नहीं देती। वह कुछ समय साथ रखने के लिए गहरे सवाल देती है।",
    },
    likes: 28,
    replies: 6,
  },
  {
    id: 3,
    sensitive: false,
    author: "عمر حداد",
    handle: "omar.fieldnotes",
    initials: "ع",
    tone: "bg-[#d9e2e5] text-[#58717b]",
    circle: "عام",
    time: "41",
    topic: "علوم",
    imageTone: "bg-[#d9e2e5]",
    body: {
      ar: "تذكير لطيف: ليس كل ما يمكن قياسه يستحق أن نقيسه. بعض الأشياء تُعرف بالإحساس فقط.",
      en: "A gentle reminder: not everything that can be measured is worth measuring. Some things are known only by feeling.",
      fr: "Un doux rappel : tout ce qui se mesure ne mérite pas de l'être. Certaines choses se ressentent simplement.",
      zh: "温柔地提醒自己：并非所有能被衡量的事都值得衡量。有些事只能用心感受。",
      es: "Un recordatorio amable: no todo lo que se puede medir merece ser medido. Algunas cosas se conocen sintiéndolas.",
      hi: "एक हल्की याद: हर चीज़ जिसे मापा जा सकता है, उसे मापना ज़रूरी नहीं। कुछ चीज़ें सिर्फ़ महसूस होती हैं।",
    },
    likes: 36,
    replies: 8,
  },
  {
    id: 4,
    sensitive: true,
    author: "حساب عام",
    handle: "open.notes",
    initials: "ح",
    tone: "bg-[#ead9d4] text-[#95675d]",
    circle: "عام",
    time: "52",
    topic: "تصوير",
    imageTone: "bg-[#cbb7aa]",
    body: {
      ar: "لحظة من معرض فني مفتوح.",
      en: "A moment from an open art exhibition.",
      fr: "Un moment d'une exposition artistique ouverte.",
      zh: "来自开放艺术展的一刻。",
      es: "Un momento de una exposición de arte abierta.",
      hi: "एक खुले कला प्रदर्शन की एक झलक।",
    },
    likes: 9,
    replies: 1,
  },
];

type AdCategoryKey = "all" | "learning" | "home" | "wellness" | "tech";

type AdItem = {
  id: number;
  brand: string;
  category: Exclude<AdCategoryKey, "all">;
  place: string;
  local: boolean;
  tone: string;
  title: Record<string, string>;
  description: Record<string, string>;
};

const adCategories: { key: AdCategoryKey; label: Record<string, string> }[] = [
  { key: "all", label: { ar: "الكل", en: "All", fr: "Tout", zh: "全部", es: "Todo", hi: "सभी" } },
  { key: "learning", label: { ar: "تعلم", en: "Learning", fr: "Apprendre", zh: "学习", es: "Aprendizaje", hi: "सीखना" } },
  { key: "home", label: { ar: "منزل", en: "Home", fr: "Maison", zh: "居家", es: "Hogar", hi: "घर" } },
  { key: "wellness", label: { ar: "عافية", en: "Wellness", fr: "Bien-être", zh: "身心", es: "Bienestar", hi: "कल्याण" } },
  { key: "tech", label: { ar: "تقنية", en: "Technology", fr: "Technologie", zh: "科技", es: "Tecnología", hi: "तकनीक" } },
];

const ads: AdItem[] = [
  {
    id: 1,
    brand: "بيت الورق",
    category: "learning",
    place: "الرياض · حي الملقا",
    local: true,
    tone: "bg-[#e5eadb] text-[#607651]",
    title: { ar: "نادي قراءة صغير، أثر كبير", en: "A small reading club, a lasting trace", fr: "Un petit club de lecture, une grande trace", zh: "小小读书会，留下长久痕迹", es: "Un pequeño club de lectura, una gran huella", hi: "छोटा रीडिंग क्लब, गहरी छाप" },
    description: { ar: "لقاءات أسبوعية هادئة لعشاق الكتب، دون سباق أو ضجيج.", en: "Quiet weekly gatherings for readers, with no rush and no noise.", fr: "Des rencontres hebdomadaires pour lecteurs, sans course ni bruit.", zh: "为爱书人准备的安静周聚，没有匆忙，也没有喧嚣。", es: "Encuentros semanales tranquilos para lectores, sin prisa ni ruido.", hi: "पाठकों के लिए शांत साप्ताहिक मिलन, बिना जल्दबाज़ी और शोर के।" },
  },
  {
    id: 2,
    brand: "سُكنى",
    category: "home",
    place: "جدة · الروضة",
    local: false,
    tone: "bg-[#eee3d5] text-[#8c6b4b]",
    title: { ar: "أشياء تعيش معك طويلاً", en: "Objects made to stay with you", fr: "Des objets qui restent avec vous", zh: "陪你长久生活的物件", es: "Objetos hechos para acompañarte", hi: "आपके साथ लंबे समय तक रहने वाली चीज़ें" },
    description: { ar: "أثاث وأدوات منزلية بسيطة، مصممة بعناية لاستهلاك أهدأ.", en: "Simple home goods, carefully made for a slower kind of consumption.", fr: "Des objets simples, conçus avec soin pour consommer plus doucement.", zh: "精心设计的简约家居用品，让消费更从容。", es: "Objetos sencillos para el hogar, hechos para consumir con más calma.", hi: "धीमे और सचेत उपभोग के लिए सावधानी से बने सरल घरेलू सामान।" },
  },
  {
    id: 3,
    brand: "مسافة",
    category: "wellness",
    place: "الدمام · الشاطئ",
    local: true,
    tone: "bg-[#dce7e7] text-[#557579]",
    title: { ar: "استراحة من الشاشة", en: "A pause away from the screen", fr: "Une pause loin de l'écran", zh: "离开屏幕的片刻", es: "Una pausa lejos de la pantalla", hi: "स्क्रीन से दूर एक विराम" },
    description: { ar: "جلسات تنفس ومشي بطيء في الهواء الطلق، بحجز بسيط ووقت واضح.", en: "Breathing and slow-walk sessions outdoors, with simple booking and clear time.", fr: "Des séances de respiration et de marche lente en plein air.", zh: "户外呼吸与慢走课程，预约简单，时间清晰。", es: "Sesiones de respiración y caminata lenta al aire libre.", hi: "खुले वातावरण में साँस और धीमी चाल के सत्र, सरल बुकिंग के साथ।" },
  },
  {
    id: 4,
    brand: "نقطة",
    category: "tech",
    place: "عن بُعد · عالمي",
    local: false,
    tone: "bg-[#e3e0eb] text-[#706487]",
    title: { ar: "أدوات رقمية بلا تشتيت", en: "Digital tools without distraction", fr: "Des outils numériques sans distraction", zh: "不打扰你的数字工具", es: "Herramientas digitales sin distracciones", hi: "बिना ध्यान भटकाए डिजिटल टूल" },
    description: { ar: "تطبيقات وأدوات تساعدك على إنجاز شيء واحد في كل مرة.", en: "Apps and tools that help you do one thing at a time.", fr: "Des outils pour faire une seule chose à la fois.", zh: "帮助你一次专注完成一件事的应用和工具。", es: "Apps y herramientas para hacer una sola cosa a la vez.", hi: "एक समय में एक काम करने में मदद करने वाले ऐप और टूल।" },
  },
];

const navItems: { key: NavKey; icon: typeof Home }[] = [
  { key: "home", icon: Home },
  { key: "explore", icon: Compass },
  { key: "circles", icon: UsersRound },
  { key: "saved", icon: Bookmark },
  { key: "ads", icon: Megaphone },
];

const AdsPanel = ({ locale, t }: { locale: Locale; t: Copy }) => {
  const [category, setCategory] = useState<AdCategoryKey>("all");
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "enabled" | "denied">("idle");
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const visibleAds = useMemo(() => {
    const matching = category === "all" ? ads : ads.filter((ad) => ad.category === category);
    return locationStatus === "enabled" ? [...matching].sort((first, second) => Number(second.local) - Number(first.local)) : matching;
  }, [category, locationStatus]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("denied");
      return;
    }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude });
        setLocationStatus("enabled");
      },
      () => setLocationStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  return (
    <section className="mx-auto max-w-[1030px]">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#78906f]"><Megaphone className="h-4 w-4" /> {t.sponsored}</div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.45rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#2e3b34]">{t.adsTitle}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#859189]">{t.adsSubtitle}</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-2xl border border-[#dfe7db] bg-[#f8faf5] px-3 py-2 text-xs text-[#6d806c] sm:self-auto">
          <MapPin className="h-4 w-4" />
          <span>{locationStatus === "enabled" ? t.locationReady : t.location}</span>
        </div>
      </div>

      <div className="mb-6 rounded-[26px] border border-[#dbe5d7] bg-[#e7eee2] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f8faf5] text-[#6b7f5a]"><SlidersHorizontal className="h-5 w-5" /></div><div><p className="text-sm font-bold text-[#4c6548]">{t.adCategories}</p><p className="mt-0.5 text-xs text-[#728570]">{t.adsSubtitle}</p></div></div>
          <div className="flex flex-wrap gap-2">{adCategories.map((item) => <button key={item.key} onClick={() => setCategory(item.key)} className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${category === item.key ? "border-[#b8cbb1] bg-[#f8faf5] text-[#506c4a] shadow-sm" : "border-transparent text-[#7b8c7b] hover:border-[#cad9c7] hover:bg-[#f1f6ee]"}`}>{item.label[locale] ?? item.label.en}</button>)}</div>
        </div>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-3 rounded-[22px] border border-[#e2e5dc] bg-[#fbfaf7] p-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3e9] text-[#6b7f5a]"><Navigation className="h-4 w-4" /></div><div className="min-w-0"><p className="text-sm font-semibold text-[#536258]">{t.location}</p><p className="mt-0.5 truncate text-xs text-[#8c998f]">{locationStatus === "loading" ? t.locating : locationStatus === "enabled" && coordinates ? `${t.locationReady} · ${coordinates.latitude.toFixed(2)}, ${coordinates.longitude.toFixed(2)}` : locationStatus === "denied" ? t.locationDenied : t.privacyNote}</p></div></div>
        <Button onClick={requestLocation} disabled={locationStatus === "loading"} variant="outline" size="sm" className="shrink-0 rounded-xl border-[#d5e0d1] bg-[#f8faf5] text-xs font-semibold text-[#5f7859] hover:bg-[#edf3e9]">{locationStatus === "loading" ? t.locating : locationStatus === "enabled" ? t.locationReady : t.useLocation}<MapPin className="h-3.5 w-3.5" /></Button>
      </div>

      {visibleAds.length > 0 ? <div className="grid gap-4 md:grid-cols-2">{visibleAds.map((ad) => <article key={ad.id} className="rounded-[26px] border border-[#e2e5dc] bg-[#fbfaf7] p-5 shadow-[0_5px_24px_rgba(68,80,69,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(68,80,69,0.07)]">
        <div className="mb-7 flex items-start justify-between"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${ad.tone}`}>{ad.brand.slice(0, 1)}</div><span className="rounded-full bg-[#f0f2ed] px-2.5 py-1 text-[10px] font-semibold text-[#88958b]">{t.sponsored}</span></div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#7f8f81]"><span>{ad.brand}</span><span>·</span><span>{ad.place}</span>{locationStatus === "enabled" && ad.local && <span className="rounded-full bg-[#eaf2e6] px-2 py-0.5 text-[#68805f]">{t.nearby}</span>}</div>
        <h2 className="mt-4 font-display text-xl font-semibold leading-snug tracking-[-0.025em] text-[#3a4b40]">{ad.title[locale] ?? ad.title.en}</h2><p className="mt-2 min-h-[48px] text-sm leading-6 text-[#7b887e]">{ad.description[locale] ?? ad.description.en}</p>
        <button className="mt-5 flex w-full items-center justify-between rounded-xl bg-[#edf3e9] px-4 py-3 text-xs font-bold text-[#587152] transition hover:bg-[#e2ecdf]"><span>{locale === "ar" ? "اكتشف بهدوء" : locale === "fr" ? "Découvrir doucement" : locale === "zh" ? "安静探索" : locale === "es" ? "Descubrir con calma" : locale === "hi" ? "शांति से देखें" : locale === "bn" ? "শান্তভাবে দেখুন" : locale === "ur" ? "پُرسکون دریافت کریں" : locale === "id" ? "Jelajahi dengan tenang" : locale === "de" ? "Ruhig entdecken" : locale === "vi" ? "Khám phá nhẹ nhàng" : locale === "tr" ? "Sakin keşfet" : locale === "ja" ? "静かに見る" : locale === "ru" ? "Открывать спокойно" : locale === "pt" ? "Descobrir com calma" : locale === "ko" ? "조용히 둘러보기" : "Explore quietly"}</span><ArrowUpLeft className="h-4 w-4" /></button>
      </article>)}</div> : <div className="rounded-[26px] border border-dashed border-[#cbd8c5] bg-[#f0f5ed] px-6 py-14 text-center"><Leaf className="mx-auto mb-3 h-6 w-6 text-[#6b875f]" /><p className="text-sm font-semibold text-[#526b4d]">{t.noAds}</p></div>}

      <div className="mt-6 flex items-center gap-2 px-2 text-[11px] leading-5 text-[#99a49b]"><ShieldCheck className="h-4 w-4 shrink-0 text-[#8da083]" /> {t.privacyNote}</div>
    </section>
  );
};

const Index = () => {
  const session = useSession();
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const [locale, setLocale] = useState<Locale>("ar");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavKey>("home");
  const [activeTab, setActiveTab] = useState<"all" | "circles" | "topics">("all");
  const [activeTopic, setActiveTopic] = useState("الكل");
  const [composerScope, setComposerScope] = useState<"circle" | "topic">("circle");
  const [composerTopic, setComposerTopic] = useState(topics[0]);
  const [selectedCircleId, setSelectedCircleId] = useState("");
  const [draft, setDraft] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [remotePosts, setRemotePosts] = useState<FeedPost[]>([]);
  const [localPosts, setLocalPosts] = useState<FeedPost[]>([]);
  const [userCircles, setUserCircles] = useState<UserCircle[]>([]);
  const [publishError, setPublishError] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [feedError, setFeedError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [posted, setPosted] = useState(false);
  const [insightfulPosts, setInsightfulPosts] = useState<PostId[]>([]);
  const [saved, setSaved] = useState<PostId[]>([]);
  const [reportedPosts, setReportedPosts] = useState<PostId[]>([]);
  const [lowValuePosts, setLowValuePosts] = useState<PostId[]>([]);
  const [valuesPosts, setValuesPosts] = useState<PostId[]>([]);
  const [revealedPosts, setRevealedPosts] = useState<PostId[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>(["تصوير", "أدب", "علوم"]);
  const t = translatedCopy[locale];
  const isRtl = locale === "ar" || locale === "ur";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.title = `أَثَر · ${t.title}`;
  }, [isRtl, locale, t.title]);

  useEffect(() => {
    if (!session?.user.id) return;
    let cancelled = false;

    const loadFeed = async () => {
      const [{ data: feedData, error: postsError }, { data: circlesData }] = await Promise.all([
        supabase.from("posts").select("id, author_id, topic_tag, content, media_url, created_at, visibility, is_blurred").order("created_at", { ascending: false }).limit(50),
        supabase.from("circles").select("id, name").order("created_at", { ascending: true }),
      ]);

      if (cancelled) return;
      setFeedError(Boolean(postsError));
      setUserCircles((circlesData ?? []) as UserCircle[]);
      if (circlesData?.[0]?.id) setSelectedCircleId((current) => current || circlesData[0].id);

      const mappedPosts: FeedPost[] = await Promise.all((feedData ?? []).map(async (item) => {
        const content = String(item.content ?? "");
        const createdAt = item.created_at ? new Date(item.created_at) : new Date();
        const { data: signedMedia } = item.media_url
          ? await supabase.storage.from("athar-media").createSignedUrl(item.media_url, 3600)
          : { data: null };
        return {
          id: item.id,
          authorId: item.author_id,
          sensitive: Boolean(item.is_blurred),
          author: "عضو في أَثَر",
          handle: "athar_member",
          initials: "أ",
          tone: "bg-[#e6eee1] text-[#6b7f5a]",
          circle: item.visibility === "circle" ? "دائرة خاصة" : "عام",
          time: createdAt.toLocaleDateString(locale, { month: "short", day: "numeric" }),
          topic: item.topic_tag || "عام",
          imageTone: "bg-[#edf2e9]",
          mediaUrl: signedMedia?.signedUrl,
          mediaType: /\.(mp4|webm|mov|m4v)$/i.test(String(item.media_url ?? "")) ? "video" : "image",
          body: { ar: content, en: content, fr: content, zh: content, es: content, hi: content },
          likes: 0,
          replies: 0,
          visibility: item.visibility === "circle" ? "circle" : "topic",
        };
      }));
      setRemotePosts(mappedPosts);
    };

    void loadFeed();
    return () => {
      cancelled = true;
    };
  }, [locale, session?.user.id]);

  const allPosts = useMemo(() => [...localPosts, ...remotePosts, ...posts], [localPosts, remotePosts]);

  const visiblePosts = useMemo(() => {
    const scopedPosts = activeTab === "circles" ? allPosts.filter((post) => post.circle !== "عام") : activeTab === "topics" ? allPosts.filter((post) => post.circle === "عام") : allPosts;
    if (activeTopic !== "الكل" && activeTopic !== "All") {
      return scopedPosts.filter((post) => post.topic === activeTopic);
    }
    return scopedPosts;
  }, [activeTab, activeTopic, allPosts]);

  const toggleInsightful = (id: PostId) => {
    setInsightfulPosts((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleSaved = (id: PostId) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const reportPost = (id: PostId) => {
    setReportedPosts((current) => current.includes(id) ? current : [...current, id]);
  };

  const toggleLowValueSignal = (id: PostId) => {
    setLowValuePosts((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleValuesSignal = (id: PostId) => {
    setValuesPosts((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleSensitivePost = (id: PostId) => {
    setRevealedPosts((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleTopic = (topic: string) => {
    setFollowedTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  };

  const publish = async () => {
    const content = draft.trim();
    if (!content || !session?.user.id || saving) return;
    if (composerScope === "topic" && content.length < 24) {
      setPublishError(true);
      return;
    }
    if (composerScope === "circle" && !selectedCircleId) {
      setBackendError(t.noCircle);
      return;
    }

    setPublishError(false);
    setBackendError("");
    setSaving(true);
    let mediaPath: string | null = null;

    try {
      if (mediaFile) {
        const extension = mediaFile.name.split(".").pop()?.toLowerCase() || "bin";
        mediaPath = `${session.user.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("athar-media").upload(mediaPath, mediaFile, {
          contentType: mediaFile.type,
          upsert: false,
        });
        if (uploadError) throw uploadError;
      }

      const visibility = composerScope === "circle" ? "circle" : "topic";
      const { data: createdPost, error: insertError } = await supabase.from("posts").insert({
        author_id: session.user.id,
        circle_id: composerScope === "circle" ? selectedCircleId : null,
        topic_tag: composerTopic,
        content,
        media_url: mediaPath,
        visibility,
        moderation_status: visibility === "topic" ? "pending" : "approved",
        is_blurred: false,
      }).select("id, topic_tag, content, media_url, created_at, visibility, is_blurred").single();

      if (insertError || !createdPost) throw insertError ?? new Error("Post was not created");
      const { data: signedMedia } = createdPost.media_url
        ? await supabase.storage.from("athar-media").createSignedUrl(createdPost.media_url, 3600)
        : { data: null };
      const localPost: FeedPost = {
        id: createdPost.id,
        sensitive: Boolean(createdPost.is_blurred),
        author: "أنت",
        handle: "you",
        initials: "ل",
        tone: "bg-[#eadfd4] text-[#886d53]",
        circle: visibility === "circle" ? (userCircles.find((circle) => circle.id === selectedCircleId)?.name ?? "دائرة خاصة") : "عام",
        time: t.justNow,
        topic: createdPost.topic_tag || composerTopic,
        imageTone: "bg-[#edf2e9]",
        mediaUrl: signedMedia?.signedUrl,
        mediaType: mediaFile?.type.startsWith("video/") ? "video" : "image",
        body: { ar: content, en: content, fr: content, zh: content, es: content, hi: content },
        likes: 0,
        replies: 0,
        visibility,
      };
      setLocalPosts((current) => [localPost, ...current]);
      setDraft("");
      setMediaFile(null);
      if (mediaInputRef.current) mediaInputRef.current.value = "";
      setPosted(true);
      window.setTimeout(() => setPosted(false), 2800);
    } catch {
      if (mediaPath) await supabase.storage.from("athar-media").remove([mediaPath]);
      setBackendError(t.saveFailed);
    } finally {
      setSaving(false);
    }
  };

  const getNavLabel = (key: NavKey) => t.nav[key];

  return (
    <div className="athar-app min-h-screen bg-[#f5f3ee] text-[#28342f]" dir={isRtl ? "rtl" : "ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside className="hidden w-[248px] shrink-0 flex-col border-e border-[#dfe2d9] bg-[#f9f8f4] px-5 py-7 lg:flex">
          <div className="flex items-center gap-3 px-3">
            <div className="brand-mark flex h-11 w-11 items-center justify-center rounded-[17px] bg-[#6b7f5a] text-[#fbfaf5] shadow-[0_8px_20px_rgba(107,127,90,0.18)]">
              <Feather className="h-5 w-5" strokeWidth={1.7} />
            </div>
            <div>
              <div className="font-display text-[25px] font-semibold leading-none tracking-[-0.04em]">أَثَر</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.26em] text-[#819087]">CHRONOS</div>
              <div className="mt-2 max-w-[150px] text-[11px] font-semibold leading-4 text-[#7568ad]">{t.tagline}</div>
            </div>
          </div>

          <div className="mt-14 space-y-2">
            {navItems.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveNav(key)}
                className={`nav-item flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeNav === key ? "bg-[#e4ebdf] text-[#48623f]" : "text-[#7a877f] hover:bg-[#eef1ea] hover:text-[#4d5f53]"}`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                <span>{getNavLabel(key)}</span>
                {key === "home" && <span className="ms-auto h-1.5 w-1.5 rounded-full bg-[#6b7f5a]" />}
              </button>
            ))}
          </div>

          <div className="mt-auto rounded-[24px] border border-[#e4e6dd] bg-[#f2f5ed] p-4">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#dfe9d9] text-[#66805b]"><Leaf className="h-4 w-4" /></div>
            <p className="text-sm font-semibold text-[#516252]">{t.quietSpace}</p>
            <p className="mt-1 text-xs leading-5 text-[#89958a]">{t.noNumbers}</p>
          </div>
          <div className="mt-4 flex items-center justify-between px-3 text-[#8a958b]">
            <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 text-xs font-medium hover:text-[#526550]"><Settings2 className="h-4 w-4" />{t.profile}</button>
            <button onClick={() => supabase.auth.signOut()} aria-label={t.profile} className="rounded-full p-1 hover:bg-[#edf0e8]"><CircleUserRound className="h-5 w-5" /></button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-12 sm:px-7 lg:px-12">
          <header className="mx-auto flex max-w-[1030px] items-center justify-between py-5 sm:py-7">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6b7f5a] text-white"><Feather className="h-5 w-5" /></div>
              <span className="font-display text-2xl font-semibold">أَثَر</span>
              <button onClick={() => setActiveNav("ads")} aria-label={t.nav.ads} className={`ms-2 rounded-xl p-2 ${activeNav === "ads" ? "bg-[#e4ebdf] text-[#48623f]" : "text-[#849087]"}`}><Megaphone className="h-4 w-4" /></button>
            </div>
            <div className="hidden items-center gap-2 text-xs font-medium text-[#849087] lg:flex"><span className={`h-2 w-2 rounded-full ${activeNav === "ads" ? "bg-[#b99670]" : "bg-[#87a174]"}`} /> {activeNav === "ads" ? t.adsTitle : t.timeline}</div>
            <div className="ms-auto flex items-center gap-2 sm:gap-3">
              <button className="hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[#809087] transition hover:bg-white sm:flex"><Search className="h-4 w-4" />{t.search}</button>
              <InviteFriends locale={locale} compact={false} />
              <div className="relative">
                <button onClick={() => setLanguageOpen((open) => !open)} className="flex items-center gap-2 rounded-xl border border-[#e2e5dc] bg-[#fbfaf7] px-3 py-2 text-xs font-semibold text-[#607163] shadow-sm transition hover:border-[#cbd7c6]">
                  <Globe2 className="h-4 w-4" /><span>{languageNames[locale]}</span><ChevronDown className="h-3.5 w-3.5" />
                </button>
                {languageOpen && (
                  <div className="absolute end-0 top-12 z-20 w-44 rounded-2xl border border-[#e2e5dc] bg-white p-2 shadow-[0_18px_45px_rgba(65,81,69,0.14)]">
                    <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a0aaa1]">{t.language}</p>
                    {(Object.keys(languageNames) as Locale[]).map((item) => (
                      <button key={item} onClick={() => { setLocale(item); setLanguageOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${locale === item ? "bg-[#edf3e9] font-semibold text-[#506c4a]" : "text-[#718078] hover:bg-[#f5f7f3]"}`}>
                        {languageNames[item]} {locale === item && <Check className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button aria-label="Notifications" className="relative rounded-xl border border-[#e2e5dc] bg-[#fbfaf7] p-2.5 text-[#718078] shadow-sm hover:text-[#506c4a]"><Bell className="h-4 w-4" /><span className="absolute end-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c7795e]" /></button>
              <Avatar className="h-9 w-9 border-2 border-white shadow-sm"><AvatarFallback className="bg-[#dbe5d3] text-sm font-semibold text-[#536b4b]">ل</AvatarFallback></Avatar>
            </div>
          </header>

          {activeNav === "ads" ? <AdsPanel locale={locale} t={t} /> : <div className="mx-auto grid max-w-[1030px] gap-7 xl:grid-cols-[minmax(0,1fr)_286px]">
            <section className="min-w-0">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold tracking-[0.04em] text-[#7568ad]">{t.tagline}</p>
                  <p className="mb-2 text-sm font-medium text-[#91a094]">{t.greeting}</p>
                  <h1 className="font-display text-[clamp(2.25rem,5vw,3.45rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#2e3b34]">{activeNav === "explore" ? t.nav.explore : activeNav === "circles" ? t.nav.circles : activeNav === "saved" ? t.nav.saved : t.title}</h1>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#859189]">{t.subtitle}</p>
                </div>
                <div className="hidden rounded-full border border-[#e0e7db] bg-[#f8faf5] px-3 py-2 text-[11px] font-semibold text-[#78906f] sm:flex sm:items-center sm:gap-2"><Sparkles className="h-3.5 w-3.5" /> {t.quietSpace}</div>
              </div>

              <div className="timeline-banner relative mb-6 overflow-hidden rounded-[26px] border border-[#dbe5d7] bg-[#e7eee2] p-5 sm:p-6">
                <div className="absolute -end-8 -top-14 h-40 w-40 rounded-full border border-[#c6d7c0] opacity-60" /><div className="absolute -end-2 -top-8 h-28 w-28 rounded-full border border-[#c6d7c0] opacity-60" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f8faf5] text-[#6b7f5a] shadow-sm"><Languages className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-bold text-[#4c6548]">{t.timeline}</h2><span className="rounded-full bg-[#d2e0cc] px-2 py-0.5 text-[10px] font-bold text-[#698163]">01</span></div>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-[#728570]">{t.timelineDesc}</p>
                  </div>
                  <CheckCircle2 className="ms-auto hidden h-5 w-5 shrink-0 text-[#73916b] sm:block" />
                </div>
              </div>

              {feedError && <div className="mb-4 rounded-2xl border border-[#f0d6cf] bg-[#fff4f1] px-4 py-3 text-xs font-semibold text-[#a65e52]">{t.feedError}</div>}
              <div className="rounded-[26px] border border-[#e2e5dc] bg-[#fbfaf7] p-4 shadow-[0_5px_24px_rgba(68,80,69,0.035)] sm:p-5">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 shrink-0"><AvatarFallback className="bg-[#eadfd4] font-semibold text-[#886d53]">ل</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <textarea value={draft} onChange={(event) => { setDraft(event.target.value); setPublishError(false); }} placeholder={t.writePlaceholder} className="min-h-[62px] w-full resize-none border-0 bg-transparent pt-1 text-sm leading-6 text-[#3d4b43] outline-none placeholder:text-[#a4ada6]" />
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <button onClick={() => { setComposerScope("circle"); setPublishError(false); }} className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${composerScope === "circle" ? "bg-[#e3ecdf] text-[#4e6a48]" : "text-[#8b978e] hover:bg-[#f1f4ee]"}`}>{t.privateCircle}</button>
                      <button onClick={() => { setComposerScope("topic"); setPublishError(false); }} className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${composerScope === "topic" ? "bg-[#e3ecdf] text-[#4e6a48]" : "text-[#8b978e] hover:bg-[#f1f4ee]"}`}>{t.publicTopic}</button>
                      {composerScope === "topic" && <select value={composerTopic} onChange={(event) => setComposerTopic(event.target.value)} aria-label={t.topicLabel} className="rounded-xl border border-[#dce5d9] bg-[#f8faf5] px-3 py-2 text-xs font-semibold text-[#647762] outline-none focus:ring-2 focus:ring-[#cadbc5]">{topics.map((topic) => <option key={topic}>{topic}</option>)}</select>}
                      {composerScope === "circle" && userCircles.length > 0 && <select value={selectedCircleId} onChange={(event) => setSelectedCircleId(event.target.value)} aria-label={t.privateCircle} className="max-w-[170px] rounded-xl border border-[#dce5d9] bg-[#f8faf5] px-3 py-2 text-xs font-semibold text-[#647762] outline-none focus:ring-2 focus:ring-[#cadbc5]">{userCircles.map((circle) => <option key={circle.id} value={circle.id}>{circle.name}</option>)}</select>}
                    </div>
                    {composerScope === "circle" && userCircles.length === 0 && <div className="mb-3 rounded-xl bg-[#f6efe4] px-3 py-2 text-xs font-semibold leading-5 text-[#967b5d]">{t.noCircle}</div>}
                    {composerScope === "topic" && <div className="mb-3 flex items-start gap-2 rounded-xl bg-[#f0f5ed] px-3 py-2 text-xs leading-5 text-[#728570]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#73916b]" /><span><strong className="font-bold text-[#526b4d]">{t.qualityGate}</strong> · {t.qualityGateDesc}</span></div>}
                    {publishError && <div className="mb-3 rounded-xl bg-[#f8e9e5] px-3 py-2 text-xs font-semibold leading-5 text-[#a65e52]">{t.qualityError}</div>}
                    {backendError && <div className="mb-3 rounded-xl bg-[#f8e9e5] px-3 py-2 text-xs font-semibold leading-5 text-[#a65e52]">{backendError}</div>}
                    <div className="flex items-center justify-between border-t border-[#edf0ea] pt-3">
                      <div className="flex min-w-0 items-center gap-2 text-xs text-[#93a096]"><label className="shrink-0 cursor-pointer rounded-lg p-1.5 hover:bg-[#edf3e9] hover:text-[#6b7f5a]" title={t.uploadMedia}><Plus className="h-4 w-4" /><input ref={mediaInputRef} type="file" accept="image/*,video/*" className="sr-only" onChange={(event) => setMediaFile(event.target.files?.[0] ?? null)} /></label><span className="truncate">{mediaFile ? `${t.mediaSelected}: ${mediaFile.name}` : composerScope === "circle" ? t.privateCircle : `${t.publicTopic} · ${composerTopic}`}</span></div>
                      <Button onClick={publish} disabled={saving} size="sm" className="rounded-xl bg-[#6b7f5a] px-4 text-xs font-semibold text-white shadow-[0_5px_12px_rgba(107,127,90,0.18)] hover:bg-[#587047]">{saving ? "…" : t.publish}<Send className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </div>
                {posted && <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#edf5e9] px-3 py-2 text-xs font-semibold text-[#5d7955]"><CheckCircle2 className="h-4 w-4" /> {t.published}</div>}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2 border-b border-[#e3e6df] pb-3">
                {(["all", "circles", "topics"] as const).map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${activeTab === tab ? "bg-[#e3ecdf] text-[#4e6a48]" : "text-[#8b978e] hover:bg-white"}`}>{tab === "all" ? t.allFollowing : tab === "circles" ? t.myCircles : t.myTopics}</button>)}
                <div className="ms-auto flex items-center gap-1 text-[11px] text-[#9aa49b]"><span className="h-1.5 w-1.5 rounded-full bg-[#7f9a73]" /> {visiblePosts.length} {t.newLabel.toLowerCase()}</div>
              </div>

              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
                {["الكل", ...topics].map((topic) => <button key={topic} onClick={() => setActiveTopic(topic)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${activeTopic === topic ? "border-[#b8cbb1] bg-[#eaf1e7] text-[#587152]" : "border-[#e3e7df] bg-[#fafbf8] text-[#89958b] hover:border-[#cbd9c7]"}`}>{topic}</button>)}
              </div>

              <div className="mt-4 space-y-4">
                {visiblePosts.map((post) => {
                  const isInsightful = insightfulPosts.includes(post.id);
                  const isSaved = saved.includes(post.id);
                  const isReported = reportedPosts.includes(post.id);
                  const hasLowValueSignal = lowValuePosts.includes(post.id);
                  const hasValuesSignal = valuesPosts.includes(post.id);
                  const isRevealed = revealedPosts.includes(post.id);
                  return <article key={post.id} className="post-card rounded-[26px] border border-[#e2e5dc] bg-[#fbfaf7] p-5 shadow-[0_5px_24px_rgba(68,80,69,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(68,80,69,0.07)] sm:p-6">
                    <div className="flex items-start gap-3">
                      <Avatar className={`h-10 w-10 shrink-0 ${post.tone}`}><AvatarFallback className={post.tone}>{post.initials}</AvatarFallback></Avatar>
                      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1">{post.authorId ? <Link to={`/profile/${post.authorId}`} className="text-sm font-bold text-[#3d4b43] transition hover:text-[#5145a5]">{post.author}</Link> : <span className="text-sm font-bold text-[#3d4b43]">{post.author}</span>}<span className="text-xs text-[#9aa59c]">@{post.handle}</span><span className="text-[#b3bcb4]">·</span><span className="text-xs text-[#9aa59c]">{post.time} {t.minutes}</span></div><div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#89978c]"><span className="rounded-full bg-[#eef2eb] px-2 py-0.5 text-[#6f806d]">{post.circle}</span><span>·</span><span>{post.topic}</span></div></div>
                      <button aria-label="More" className="rounded-lg p-1 text-[#a4ada5] hover:bg-[#f0f2ed] hover:text-[#607260]"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                    <p className="mt-5 text-[15px] leading-8 text-[#4d5b52]">{post.body[locale] ?? post.body.en}</p>
                    {post.mediaUrl && <div className="mt-4 overflow-hidden rounded-[22px] border border-[#e0e6dc] bg-[#edf2e9]">{post.mediaType === "video" ? <video src={post.mediaUrl} controls className="max-h-[420px] w-full object-cover" /> : <img src={post.mediaUrl} alt="" className="max-h-[420px] w-full object-cover" />}</div>}
                    {post.sensitive && <div className="relative mt-4 overflow-hidden rounded-[22px] border border-[#ded8d0] bg-[#e9e2d9]">
                      <div className={`relative h-56 overflow-hidden transition duration-500 ${isRevealed ? "" : "blur-[18px] scale-[1.04]"} ${post.imageTone}`} aria-hidden={!isRevealed}>
                        <div className="absolute inset-x-10 top-8 h-32 rounded-[42%] bg-[#9d7f75] opacity-80" />
                        <div className="absolute bottom-[-30px] start-8 h-36 w-36 rounded-full bg-[#b89583] opacity-80" />
                        <div className="absolute bottom-[-25px] end-10 h-44 w-28 rotate-12 rounded-[48%] bg-[#876d68] opacity-75" />
                        <div className="absolute start-1/2 top-7 h-20 w-20 -translate-x-1/2 rounded-full bg-[#d6b69f] opacity-90" />
                      </div>
                      {!isRevealed && <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#354039]/45 px-5 text-center text-white">
                        <ShieldAlert className="mb-3 h-7 w-7" />
                        <p className="text-sm font-bold">{t.sensitiveNotice}</p>
                        <button onClick={() => toggleSensitivePost(post.id)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#52654f] shadow-sm transition hover:bg-[#f1f5ed]"><Eye className="h-4 w-4" />{t.showSensitive}</button>
                      </div>}
                      {isRevealed && <button onClick={() => toggleSensitivePost(post.id)} className="absolute end-3 top-3 inline-flex items-center gap-2 rounded-xl bg-[#fbfaf7]/90 px-3 py-2 text-xs font-bold text-[#59695c] shadow-sm backdrop-blur-sm"><EyeOff className="h-4 w-4" />{t.hideSensitive}</button>}
                    </div>}
                    <div className="mt-5 flex flex-wrap items-center gap-1 border-t border-[#edf0ea] pt-3 text-xs text-[#9aa59d]">
                      <button onClick={() => toggleInsightful(post.id)} aria-pressed={isInsightful} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition ${isInsightful ? "bg-[#e3ecdf] text-[#587152]" : "hover:bg-[#edf3e9] hover:text-[#66805c]"}`}><Sparkles className={`h-4 w-4 ${isInsightful ? "fill-current" : ""}`} />{isInsightful ? t.insightfulDone : t.insightful}</button>
                      <button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition hover:bg-[#edf3e9] hover:text-[#66805c]"><MessageCircle className="h-4 w-4" />{post.replies} {t.replies}</button>
                      <button onClick={() => reportPost(post.id)} disabled={isReported} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition ${isReported ? "text-[#bd755e]" : "hover:bg-[#f6eae5] hover:text-[#b86e57]"}`}><Flag className={`h-4 w-4 ${isReported ? "fill-current" : ""}`} />{isReported ? t.reported : t.reportVulgar}</button>
                      <button onClick={() => toggleLowValueSignal(post.id)} aria-pressed={hasLowValueSignal} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-start transition ${hasLowValueSignal ? "bg-[#f4e8d9] text-[#9a724d]" : "hover:bg-[#f5efe7] hover:text-[#9a724d]"}`}><Sparkles className={`h-4 w-4 ${hasLowValueSignal ? "fill-current" : ""}`} />{hasLowValueSignal ? t.signalSent : t.lowValueReport}</button>
                      <button onClick={() => toggleValuesSignal(post.id)} aria-pressed={hasValuesSignal} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-start transition ${hasValuesSignal ? "bg-[#f6e2df] text-[#a25f57]" : "hover:bg-[#f8ecea] hover:text-[#a25f57]"}`}><ShieldAlert className={`h-4 w-4 ${hasValuesSignal ? "fill-current" : ""}`} />{hasValuesSignal ? t.signalSent : t.valuesReport}</button>
                      <button onClick={() => toggleSaved(post.id)} className={`ms-auto rounded-lg p-2 transition hover:bg-[#edf3e9] ${isSaved ? "text-[#6b7f5a]" : "text-[#9aa59d] hover:text-[#66805c]"}`} aria-label={isSaved ? t.saved : t.save}><Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} /></button>
                    </div>
                  </article>;
                })}
              </div>

              <div className="mt-6 flex flex-col items-center rounded-[26px] border border-dashed border-[#cbd8c5] bg-[#f0f5ed] px-6 py-8 text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#e1ecdc] text-[#6b875f]"><Leaf className="h-5 w-5" /></div>
                <h3 className="text-sm font-bold text-[#526b4d]">{t.noMore}</h3><p className="mt-1 max-w-xs text-xs leading-5 text-[#82927e]">{t.noMoreDesc}</p>
              </div>
            </section>

            <aside className="hidden space-y-5 xl:block">
              <div className="sticky top-6 space-y-5">
                <div className="mindful-card overflow-hidden rounded-[26px] border border-[#e1d8c9] bg-[#f4ede3] p-5">
                  <div className="mb-8 flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fffaf2] text-[#ad8862]"><Leaf className="h-5 w-5" /></div><span className="rounded-full bg-[#eadfce] px-2.5 py-1 text-[10px] font-bold text-[#997753]">02 / 03</span></div>
                  <h2 className="font-display text-[25px] font-semibold leading-tight tracking-[-0.04em] text-[#6d5946]">{t.mindful}</h2><p className="mt-2 text-xs leading-5 text-[#947e66]">{t.mindfulDesc}</p>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e3d6c3]"><div className="h-full w-2/3 rounded-full bg-[#b99670]" /></div>
                </div>

                <div className="rounded-[26px] border border-[#e2e5dc] bg-[#fbfaf7] p-5">
                  <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-bold text-[#536258]">{t.circlesTitle}</h2><button className="text-xs font-semibold text-[#78906f] hover:text-[#4e6a48]">{t.seeAll}</button></div>
                  <div className="space-y-3">
                    {[{ name: "العائلة والأصدقاء", icon: "ع", tone: "bg-[#e8dfd5] text-[#8a6d52]" }, { name: "المعارف والعمل", icon: "م", tone: "bg-[#dce7df] text-[#5b7965]" }, { name: "عام", icon: "ع", tone: "bg-[#e0e5eb] text-[#647388]" }].map((circle) => <div key={circle.name} className="flex items-center gap-3"><div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${circle.tone}`}>{circle.icon}</div><span className="text-xs font-medium text-[#718077]">{circle.name}</span><span className="ms-auto h-1.5 w-1.5 rounded-full bg-[#a9b9a3]" /></div>)}
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#e2e5dc] bg-[#fbfaf7] p-5">
                  <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-bold text-[#536258]">{t.topicsTitle}</h2><Compass className="h-4 w-4 text-[#93a394]" /></div>
                  <div className="flex flex-wrap gap-2">{topics.map((topic) => { const isFollowed = followedTopics.includes(topic); return <button key={topic} onClick={() => toggleTopic(topic)} className={`rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition ${isFollowed ? "border-[#d1dfcc] bg-[#edf3e9] text-[#63805d]" : "border-[#e6e8e2] text-[#97a29a] hover:border-[#cad9c6]"}`}>{isFollowed ? "✓ " : "+ "}{topic}</button>; })}</div>
                </div>

                <div className="rounded-[26px] border border-[#dbe5d7] bg-[#eef4eb] p-5">
                  <div className="flex items-start gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#dce9d8] text-[#698361]"><ShieldCheck className="h-4 w-4" /></div><div><h2 className="text-sm font-bold text-[#526b4d]">{t.qualityGate}</h2><p className="mt-1 text-xs leading-5 text-[#7a8d77]">{t.qualityGateDesc}</p></div></div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-semibold text-[#78906f]"><span>{t.meaningfulOnly}</span><span>84%</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#d7e4d3]"><div className="h-full w-[84%] rounded-full bg-[#789870]" /></div>
                </div>

                <div className="flex items-center gap-2 px-2 text-[10px] leading-5 text-[#a0aaa1]"><ShieldCheck className="h-4 w-4 shrink-0 text-[#8da083]" /> {t.noNumbers}. {t.quietSpace}.</div>
              </div>
            </aside>
          </div>}
        </main>
      </div>
    </div>
  );
};

export default Index;
