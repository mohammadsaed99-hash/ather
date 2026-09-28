import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, CircleUserRound, Feather, MoreHorizontal, UserPlus, UserRoundMinus, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAuthErrorMessage } from "@/lib/authError";

type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

type FriendStatus = "none" | "pending" | "accepted";

const UserProfile = () => {
  const { id = "" } = useParams<{ id: string }>();
  const session = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [friendStatus, setFriendStatus] = useState<FriendStatus>("none");
  const [blocked, setBlocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionBusy, setActionBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isSelf = session?.user.id === id;

  useEffect(() => {
    if (!session?.user.id || !id) return;
    let active = true;

    const loadProfile = async () => {
      setLoading(true);
      const [profileResult, outgoingResult, incomingResult, blockResult] = await Promise.all([
        supabase.from("profiles").select("id, username, full_name, avatar_url, created_at").eq("id", id).maybeSingle(),
        supabase.from("friendships").select("status").eq("requester_id", session.user.id).eq("addressee_id", id).maybeSingle(),
        supabase.from("friendships").select("status").eq("requester_id", id).eq("addressee_id", session.user.id).maybeSingle(),
        supabase.from("user_blocks").select("id").eq("blocker_id", session.user.id).eq("blocked_id", id).maybeSingle(),
      ]);

      if (!active) return;
      setProfile(profileResult.data as Profile | null);
      const relationship = outgoingResult.data ?? incomingResult.data;
      setFriendStatus(relationship?.status === "accepted" ? "accepted" : relationship?.status === "pending" ? "pending" : "none");
      setBlocked(Boolean(blockResult.data));
      setLoading(false);
    };

    void loadProfile();
    return () => { active = false; };
  }, [id, session?.user.id]);

  const addFriend = async () => {
    if (!session?.user.id || !id || isSelf || friendStatus !== "none") return;
    setActionBusy(true);
    setError("");
    setMessage("");
    const { error: requestError } = await supabase.from("friendships").insert({ requester_id: session.user.id, addressee_id: id, status: "pending" });
    setActionBusy(false);
    if (requestError) {
      setError(requestError.code === "23505" ? "يوجد طلب صداقة قائم بالفعل." : getAuthErrorMessage(requestError));
      return;
    }
    setFriendStatus("pending");
    setMessage("تم إرسال طلب الصداقة.");
    setMenuOpen(false);
  };

  const blockUser = async () => {
    if (!session?.user.id || !id || isSelf || blocked) return;
    setActionBusy(true);
    setError("");
    setMessage("");
    const { error: blockError } = await supabase.from("user_blocks").insert({ blocker_id: session.user.id, blocked_id: id });
    setActionBusy(false);
    if (blockError) {
      setError(blockError.code === "23505" ? "هذا المستخدم محظور بالفعل." : getAuthErrorMessage(blockError));
      return;
    }
    setBlocked(true);
    setMenuOpen(false);
    setMessage("تم حظر هذا المستخدم.");
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#f5f3ee] text-sm font-semibold text-[#5145a5]">جارٍ تحميل الملف…</div>;
  if (!profile) return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f3ee] px-6 text-center"><p className="text-sm font-semibold text-[#6d6685]">لم نتمكن من العثور على هذا الملف.</p><Link to="/" className="rounded-xl bg-[#5145a5] px-4 py-2 text-sm font-bold text-white">العودة للرئيسية</Link></div>;

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 pb-12 text-[#29263d] sm:px-7 lg:px-12" dir="rtl">
      <header className="mx-auto flex max-w-4xl items-center justify-between py-5 sm:py-7"><Link to="/" className="flex items-center gap-2 text-sm font-bold text-[#6656a7] transition hover:text-[#403583]"><ArrowRight className="h-4 w-4" /> العودة للتغذية</Link><div className="flex items-center gap-2"><Feather className="h-4 w-4 text-[#5145a5]" /><span className="font-display text-lg font-semibold text-[#3f3568]">أَثَر</span></div></header>
      <section className="mx-auto max-w-4xl rounded-[30px] border border-[#e2e0ef] bg-[#fcfbff] p-5 shadow-[0_18px_50px_rgba(68,55,126,0.08)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4"><div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[26px] bg-[#e6e1f6] text-2xl font-bold text-[#6656a7]">{profile.avatar_url ? <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" /> : profile.username.slice(0, 1).toUpperCase()}</div><div><p className="text-xl font-bold text-[#3f3568]">{profile.full_name || profile.username}</p><p className="mt-1 text-sm text-[#8a84a0]">@{profile.username}</p><p className="mt-3 text-xs text-[#9a94ac]">عضو منذ {new Date(profile.created_at).toLocaleDateString("ar", { year: "numeric", month: "long" })}</p></div></div>
          {!isSelf && <div className="relative"><button onClick={() => setMenuOpen((open) => !open)} aria-label="خيارات الملف" aria-expanded={menuOpen} className="rounded-xl border border-[#e2e0ef] bg-[#f8f7fd] p-2.5 text-[#7568ad] transition hover:bg-[#eeebfa]"><MoreHorizontal className="h-5 w-5" /></button>{menuOpen && <div className="absolute end-0 top-12 z-20 w-48 rounded-2xl border border-[#e2e0ef] bg-[#fcfbff] p-2 shadow-[0_16px_36px_rgba(68,55,126,0.16)]"><button onClick={addFriend} disabled={actionBusy || friendStatus !== "none" || blocked} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#5145a5] transition hover:bg-[#eeebfa] disabled:cursor-not-allowed disabled:opacity-50"><UserPlus className="h-4 w-4" />{friendStatus === "accepted" ? "صديق" : friendStatus === "pending" ? "تم إرسال الطلب" : "إضافة صديق"}</button><button onClick={blockUser} disabled={actionBusy || blocked} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#a65e72] transition hover:bg-[#f9eaf0] disabled:cursor-not-allowed disabled:opacity-50"><UserX className="h-4 w-4" />{blocked ? "تم الحظر" : "حظر"}</button></div>}</div>}
        </div>
        {blocked && <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#f9eaf0] px-4 py-3 text-xs font-semibold text-[#a65e72]"><UserRoundMinus className="h-4 w-4" /> لن تظهر لك تفاعلات هذا المستخدم بعد الآن.</div>}
        {message && <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#eeeafa] px-4 py-3 text-xs font-semibold text-[#584a91]"><Check className="h-4 w-4" /> {message}</div>}
        {error && <div className="mt-6 rounded-2xl bg-[#fff0f1] px-4 py-3 text-xs font-semibold text-[#a65e52]">{error}</div>}
        <div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#f3f0fc] p-4"><p className="text-xs text-[#938ba8]">المساحة</p><p className="mt-2 text-sm font-bold text-[#5145a5]">هادئة وخاصة</p></div><div className="rounded-2xl bg-[#f3f0fc] p-4"><p className="text-xs text-[#938ba8]">المحتوى</p><p className="mt-2 text-sm font-bold text-[#5145a5]">يظهر حسب الخصوصية</p></div><div className="rounded-2xl bg-[#f3f0fc] p-4"><p className="text-xs text-[#938ba8]">الهوية</p><p className="mt-2 text-sm font-bold text-[#5145a5]">اترك أثرًا، لا ضجيجًا.</p></div></div>
      </section>
    </main>
  );
};

export default UserProfile;
