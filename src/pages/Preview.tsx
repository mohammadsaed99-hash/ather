import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpLeft, CheckCircle2, Clock3, Feather, Leaf, LockKeyhole, MessageCircle, Quote, Sparkles, UsersRound } from "lucide-react";
import InviteFriends from "@/components/InviteFriends";

const Preview = () => {
  useEffect(() => {
    document.title = "أَثَر · اترك أثرًا، لا ضجيجًا";
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f3fc] text-[#29263d]" dir="rtl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link to="/preview" className="flex items-center gap-3">
          <span className="brand-mark flex h-11 w-11 items-center justify-center rounded-[17px] bg-[#5145a5] text-white shadow-[0_10px_26px_rgba(81,69,165,0.22)]"><Feather className="h-5 w-5" /></span>
          <span>
            <span className="block font-display text-[25px] font-semibold leading-none tracking-[-0.04em] text-[#332b57]">أَثَر</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8174b1]">CHRONOS</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <InviteFriends compact={false} />
          <Link to="/login" className="hidden rounded-2xl bg-[#5145a5] px-4 py-2.5 text-xs font-bold text-white shadow-[0_7px_16px_rgba(81,69,165,0.18)] transition hover:bg-[#403583] sm:inline-flex">تسجيل الدخول</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.9fr)] lg:px-10 lg:pb-24 lg:pt-16">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d1ef] bg-[#efecfb] px-3 py-1.5 text-xs font-bold text-[#6656a7]"><Sparkles className="h-3.5 w-3.5" /> مساحة اجتماعية أهدأ</div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.08] tracking-[-0.065em] text-[#332b57]">اترك أثرًا،<br /><span className="text-[#6656a7]">لا ضجيجًا.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-[#706b88] sm:text-lg">أَثَر مساحة تجمعك بمن يهمك، بترتيب زمني صادق ودوائر خاصة تحترم وقتك وخصوصيتك.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-2xl bg-[#5145a5] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(81,69,165,0.2)] transition hover:-translate-y-0.5 hover:bg-[#403583]">ابدأ مساحتك <ArrowLeft className="h-4 w-4" /></Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-2xl border border-[#d9d1ef] bg-[#fbfaff] px-5 py-3.5 text-sm font-bold text-[#625598] transition hover:bg-[#f0edfb]">اكتشف أَثَر <ArrowUpLeft className="h-4 w-4" /></a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#8a84a0]"><span className="flex items-center gap-1.5"><LockKeyhole className="h-3.5 w-3.5 text-[#7568ad]" /> دوائرك خاصة</span><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#7568ad]" /> الأحدث أولاً</span><span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-[#7568ad]" /> بلا ضجيج</span></div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:me-0">
          <div className="absolute -start-5 top-8 h-28 w-28 rounded-full border border-[#d7cfed] sm:-start-12 sm:h-40 sm:w-40" />
          <div className="absolute -end-5 bottom-10 h-20 w-20 rounded-full bg-[#e7e0f5] sm:-end-10 sm:h-28 sm:w-28" />
          <div className="relative rounded-[34px] border border-[#dbd4eb] bg-[#fcfbff] p-4 shadow-[0_24px_65px_rgba(68,55,126,0.14)] sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-[#eeeaf6] pb-4"><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5145a5] text-white"><Feather className="h-4 w-4" /></div><div><p className="text-xs font-bold text-[#40375f]">مساحتك الهادئة</p><p className="text-[10px] text-[#9992ab]">التسلسل الزمني فقط</p></div></div><span className="rounded-full bg-[#efecfb] px-2.5 py-1 text-[10px] font-bold text-[#7568ad]">01</span></div>
            <div className="mb-4 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4def7] text-sm font-bold text-[#6656a7]">ل</div><div><p className="text-xs font-bold text-[#40375f]">ليان</p><p className="text-[10px] text-[#a29bb3]">منذ لحظات · دائرة الأصدقاء</p></div><span className="me-auto rounded-full bg-[#f0edfa] px-2 py-1 text-[10px] font-semibold text-[#776bab]">تأمل</span></div>
            <div className="rounded-[22px] bg-[#f0edfa] p-4"><p className="text-sm font-semibold leading-7 text-[#554c72]">أحيانًا، يكفي أن نترك للأشياء وقتها كي تقول ما تريد.</p><div className="mt-4 h-24 rounded-[17px] border border-[#ddd5f0] bg-[#e4def5]"><div className="mx-auto mt-8 h-2 w-24 rounded-full bg-[#b6a9dd]" /><div className="mx-auto mt-2 h-2 w-40 rounded-full bg-[#c8bee6]" /></div></div>
            <div className="mt-4 flex items-center gap-2 border-t border-[#eeeaf6] pt-3 text-[11px] font-semibold text-[#978fa9]"><span className="flex items-center gap-1.5 rounded-lg bg-[#efecfb] px-2 py-1.5 text-[#7568ad]"><Sparkles className="h-3.5 w-3.5" /> أَثَر فيّ</span><span className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> 3 ردود</span><span className="me-auto"><CheckCircle2 className="h-4 w-4 text-[#7568ad]" /></span></div>
          </div>
          <div className="absolute -bottom-7 -start-5 hidden w-52 rounded-2xl border border-[#ddd5ef] bg-[#fbfaff] p-3 shadow-[0_14px_32px_rgba(68,55,126,0.12)] sm:block"><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8e2f7] text-[#7568ad]"><UsersRound className="h-4 w-4" /></div><div><p className="text-[10px] font-bold text-[#51476e]">دوائر تثق بها</p><p className="mt-0.5 text-[10px] text-[#a29bb3]">مساحتك، بقواعدك</p></div></div></div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#e5dff1] bg-[#fbfaff] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8174b1]">لماذا أَثَر؟</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em] text-[#332b57] sm:text-4xl">تواصل له معنى،<br />بإيقاع يشبهك.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <article className="rounded-[26px] border border-[#e2dcf0] bg-[#f5f2fc] p-6"><div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7e1f6] text-[#6656a7]"><Clock3 className="h-5 w-5" /></div><h3 className="text-base font-bold text-[#453b63]">وقتُك أولاً</h3><p className="mt-2 text-sm leading-6 text-[#817a98]">ترى الجديد بالترتيب، دون تمرير لا ينتهي أو اقتراحات لا طلب لها.</p></article>
            <article className="rounded-[26px] border border-[#e2dcf0] bg-[#f5f2fc] p-6"><div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7e1f6] text-[#6656a7]"><LockKeyhole className="h-5 w-5" /></div><h3 className="text-base font-bold text-[#453b63]">دوائر خاصة</h3><p className="mt-2 text-sm leading-6 text-[#817a98]">شارك مع الأشخاص الذين تختارهم، واحفظ مساحتك بعيدًا عن العيون العابرة.</p></article>
            <article className="rounded-[26px] border border-[#e2dcf0] bg-[#f5f2fc] p-6"><div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7e1f6] text-[#6656a7]"><Sparkles className="h-5 w-5" /></div><h3 className="text-base font-bold text-[#453b63]">أثرٌ يبقى</h3><p className="mt-2 text-sm leading-6 text-[#817a98]">مساحة للمحتوى الذي يضيف، ولحوار يترك فيك شيئًا بعد أن ينتهي.</p></article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24"><Quote className="mx-auto h-8 w-8 text-[#9b8bca]" /><p className="mx-auto mt-5 max-w-2xl font-display text-2xl font-semibold leading-relaxed tracking-[-0.03em] text-[#4a3e6b] sm:text-3xl">«ليس كل ما يعلو صوتُه يستحق انتباهك.»</p><p className="mt-4 text-sm text-[#8d86a3]">ابدأ مساحتك الهادئة اليوم.</p><Link to="/login" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#5145a5] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(81,69,165,0.2)] transition hover:bg-[#403583]">أنشئ حسابك <ArrowLeft className="h-4 w-4" /></Link></section>

      <footer className="border-t border-[#e5dff1] px-5 py-6 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-[#9a93ad] sm:flex-row"><span>أَثَر · CHRONOS</span><span>اترك أثرًا، لا ضجيجًا.</span></div></footer>
    </main>
  );
};

export default Preview;
