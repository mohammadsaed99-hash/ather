import { FormEvent, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAuthErrorMessage } from "@/lib/authError";

const CompleteProfile = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!session) return <Navigate to="/login" replace />;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    const { error: insertError } = await supabase.from("profiles").insert({
      id: session.user.id,
      username: username.trim(),
      full_name: fullName.trim() || null,
      birth_date: birthDate,
    });
    setSaving(false);
    if (insertError) {
      setError(getAuthErrorMessage(insertError));
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-10 text-[#28342f] sm:px-8">
      <div className="mx-auto max-w-lg rounded-[30px] border border-[#e2e5dc] bg-[#fbfaf7] p-6 shadow-[0_18px_50px_rgba(68,80,69,0.08)] sm:p-9">
        <div className="mb-8"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6b7f5a] text-white">أ</div><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#78906f]">أَثَر · ملفك الخاص</p><h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-[#34463a]">لنترك أثراً واضحاً</h1><p className="mt-3 text-sm leading-6 text-[#89958b]">نحتاج هذه المعلومات لتطبيق خصوصية الدوائر وحماية القاصرين.</p></div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-semibold text-[#59695c]">اسم المستخدم<input required minLength={3} maxLength={30} value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3 text-sm outline-none focus:border-[#9db696] focus:ring-2 focus:ring-[#dce9d8]" placeholder="مثال: layan" /></label>
          <label className="block text-sm font-semibold text-[#59695c]">الاسم الكامل <span className="font-normal text-[#a0aaa1]">(اختياري)</span><input maxLength={80} value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3 text-sm outline-none focus:border-[#9db696] focus:ring-2 focus:ring-[#dce9d8]" /></label>
          <label className="block text-sm font-semibold text-[#59695c]">تاريخ الميلاد<input required type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3 text-sm outline-none focus:border-[#9db696] focus:ring-2 focus:ring-[#dce9d8]" /></label>
          <div className="rounded-2xl bg-[#f0f5ed] px-4 py-3 text-xs leading-5 text-[#728570]">تُستخدم بيانات العمر لتفعيل ضوابط الحماية المناسبة. الحسابات تحت 16 عاماً تحتاج إلى ربط وموافقة ولي الأمر.</div>
          {error && <div role="alert" className="rounded-xl bg-[#f8e9e5] px-3 py-2 text-xs font-semibold leading-5 text-[#a65e52]">{error}</div>}
          <Button disabled={saving} type="submit" className="h-11 w-full rounded-xl bg-[#6b7f5a] font-semibold text-white hover:bg-[#587047]">{saving ? "جارٍ حفظ الملف…" : "حفظ والمتابعة"}</Button>
        </form>
      </div>
    </main>
  );
};

export default CompleteProfile;
