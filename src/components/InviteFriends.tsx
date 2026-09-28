import { useState } from "react";
import { Check, Copy, ExternalLink, Send, Share2, UsersRound, X } from "lucide-react";

type InviteLocale = "ar" | "en" | "fr" | "zh" | "es" | "hi";

type InviteCopy = {
  invite: string;
  title: string;
  description: string;
  whatsapp: string;
  telegram: string;
  facebook: string;
  x: string;
  copy: string;
  copied: string;
  native: string;
  tagline: string;
};

const copy: Record<InviteLocale, InviteCopy> = {
  ar: { invite: "دعوة الأصدقاء", title: "شارك أَثَر مع أصدقائك", description: "أرسل رابط التطبيق عبر وسيلتك المفضلة.", whatsapp: "واتساب", telegram: "تيليغرام", facebook: "فيسبوك", x: "منصة X", copy: "نسخ الرابط", copied: "تم نسخ الرابط", native: "مشاركة سريعة", tagline: "اترك أثرًا، لا ضجيجًا." },
  en: { invite: "Invite friends", title: "Share Athar with friends", description: "Send the app link through your favorite channel.", whatsapp: "WhatsApp", telegram: "Telegram", facebook: "Facebook", x: "X", copy: "Copy link", copied: "Link copied", native: "Quick share", tagline: "Leave a trace, not noise." },
  fr: { invite: "Inviter des amis", title: "Partager Athar avec vos amis", description: "Envoyez le lien de l’application par votre moyen préféré.", whatsapp: "WhatsApp", telegram: "Telegram", facebook: "Facebook", x: "X", copy: "Copier le lien", copied: "Lien copié", native: "Partage rapide", tagline: "Laissez une trace, pas du bruit." },
  zh: { invite: "邀请朋友", title: "与朋友分享 Athar", description: "通过你喜欢的方式发送应用链接。", whatsapp: "WhatsApp", telegram: "Telegram", facebook: "Facebook", x: "X", copy: "复制链接", copied: "链接已复制", native: "快速分享", tagline: "留下痕迹，而非噪音。" },
  es: { invite: "Invitar amigos", title: "Comparte Athar con tus amigos", description: "Envía el enlace de la aplicación por tu canal favorito.", whatsapp: "WhatsApp", telegram: "Telegram", facebook: "Facebook", x: "X", copy: "Copiar enlace", copied: "Enlace copiado", native: "Compartir rápido", tagline: "Deja huella, no ruido." },
  hi: { invite: "दोस्तों को आमंत्रित करें", title: "दोस्तों के साथ Athar साझा करें", description: "अपनी पसंद के माध्यम से ऐप का लिंक भेजें।", whatsapp: "WhatsApp", telegram: "Telegram", facebook: "Facebook", x: "X", copy: "लिंक कॉपी करें", copied: "लिंक कॉपी हो गया", native: "त्वरित साझा करें", tagline: "शोर नहीं, एक छाप छोड़ें।" },
};

const InviteFriends = ({ locale = "ar", compact = false }: { locale?: InviteLocale; compact?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = copy[locale];
  const url = typeof window === "undefined" ? "" : window.location.origin;
  const message = t.tagline;
  const encodedUrl = encodeURIComponent(url);
  const encodedMessage = encodeURIComponent(message);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const quickShare = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title: "أَثَر", text: message, url });
      setOpen(false);
    } catch {
      return;
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen((value) => !value)} className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d6e2d2] bg-[#f5f9f2] px-3 py-2 text-xs font-bold text-[#587152] shadow-sm transition hover:border-[#b8cdb2] hover:bg-[#eaf2e7] ${compact ? "h-10 w-10 px-0" : ""}`} aria-expanded={open} aria-haspopup="dialog" aria-label={t.invite}>
        <UsersRound className="h-4 w-4" />
        {!compact && t.invite}
      </button>

      {open && <div role="dialog" aria-label={t.title} className="absolute end-0 top-12 z-50 w-[min(320px,calc(100vw-2rem))] rounded-[24px] border border-[#dfe6db] bg-[#fbfaf7] p-4 text-start shadow-[0_18px_45px_rgba(53,75,58,0.16)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[#3f5545]">{t.title}</h2>
            <p className="mt-1 text-xs leading-5 text-[#87958a]">{t.description}</p>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-xl p-1.5 text-[#94a198] transition hover:bg-[#edf2e9] hover:text-[#52684f]" aria-label={t.invite}><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={`https://wa.me/?text=${encodedMessage}%20${encodedUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-[#e6f4e8] px-3 py-2.5 text-xs font-bold text-[#387548] transition hover:bg-[#d6eddb]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#55b96b] text-[10px] font-black text-white">WA</span>{t.whatsapp}</a>
          <a href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-[#e5f2f8] px-3 py-2.5 text-xs font-bold text-[#337694] transition hover:bg-[#d4eaf4]"><Send className="h-4 w-4 text-[#3a9ccc]" />{t.telegram}</a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-[#e9effa] px-3 py-2.5 text-xs font-bold text-[#3f6098] transition hover:bg-[#dce6f6]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4267a9] text-sm font-black text-white">f</span>{t.facebook}</a>
          <a href={`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-[#eef2f3] px-3 py-2.5 text-xs font-bold text-[#42555d] transition hover:bg-[#e3e9eb]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1f2930] text-[11px] font-black text-white">𝕏</span>{t.x}</a>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={quickShare} className="flex items-center justify-center gap-2 rounded-xl border border-[#dce6d8] bg-[#f4f8f1] px-3 py-2.5 text-xs font-bold text-[#587152] transition hover:bg-[#eaf2e7]"><Share2 className="h-4 w-4" />{t.native}</button>
          <button onClick={copyLink} className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e5dc] bg-white px-3 py-2.5 text-xs font-bold text-[#69796e] transition hover:bg-[#f2f5ef]">{copied ? <Check className="h-4 w-4 text-[#6b7f5a]" /> : <Copy className="h-4 w-4" />}{copied ? t.copied : t.copy}</button>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#9aa59d]"><ExternalLink className="h-3 w-3" /> {url}</div>
      </div>}
    </div>
  );
};

export default InviteFriends;
