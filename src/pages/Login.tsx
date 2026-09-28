import { FormEvent, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { Feather, Leaf } from "lucide-react";
import InviteFriends from "@/components/InviteFriends";
import { supabase } from "@/integrations/supabase/client";
import { getAuthErrorMessage } from "@/lib/authError";

const Login = () => {
  const session = useSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  if (session) return <Navigate to="/" replace />;

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (password.length < 6) {
      setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      return;
    }

    setSaving(true);
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    setSaving(false);
    if (signUpError) {
      setError(getAuthErrorMessage(signUpError));
      return;
    }
    if (data.session) return;
    setSuccess("تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيده ثم سجّل الدخول.");
    setMode("signin");
    setPassword("");
    setConfirmPassword("");
  };

  const inputClass = "mt-2 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3.5 py-3 text-sm text-[#34463a] outline-none transition placeholder:text-[#a4ada6] focus:border-[#9eb493] focus:ring-2 focus:ring-[#dce8d8]";

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-10 text-[#28342f] sm:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl items-center gap-10 lg:grid-cols-[1fr_390px]">
        <section className="hidden rounded-[34px] border border-[#dbe5d7] bg-[#e7eee2] p-10 lg:block">
          <div className="flex h-12 w-12 items-center justify-center rounded-[17px] bg-[#6b7f5a] text-white shadow-[0_8px_20px_rgba(107,127,90,0.18)]"><Feather className="h-6 w-6" /></div>
          <p className="mt-14 text-sm font-semibold text-[#78906f]">أَثَر · CHRONOS</p>
          <h1 className="mt-4 max-w-md font-display text-5xl font-semibold leading-tight tracking-[-0.055em] text-[#354b3a]">مساحتك الهادئة، كما اخترتها.</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#718570]">تواصل حقيقي، دوائر خاصة، ومواضيع عامة مرتبة بصدق وبدون ضجيج الخوارزميات.</p>
          <div className="mt-14 flex items-center gap-3 text-xs font-semibold text-[#68805f]"><Leaf className="h-4 w-4" /> لا أرقام للمتابعين · لا تمرير لا نهائي</div>
        </section>

        <section className="rounded-[30px] border border-[#e2e5dc] bg-[#fbfaf7] p-6 shadow-[0_18px_50px_rgba(68,80,69,0.08)] sm:p-8">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <div className="mb-4 lg:hidden"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6b7f5a] text-white"><Feather className="h-5 w-5" /></div><p className="mt-4 font-display text-3xl font-semibold">أَثَر</p></div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#34463a]">{mode === "signin" ? "ادخل بهدوء" : "أنشئ حسابك"}</h2>
              <p className="mt-2 text-sm leading-6 text-[#89958b]">{mode === "signin" ? "عد إلى مساحتك الهادئة." : "أنشئ حسابك لتبقى دوائرك ومنشوراتك خاصة."}</p>
            </div>
            <InviteFriends compact />
          </div>

          {mode === "signin" ? <>
            <div className="overflow-hidden rounded-2xl [&_button]:rounded-xl [&_input]:rounded-xl [&_input]:border-[#dfe5db] [&_label]:text-[#657565]">
              <Auth supabaseClient={supabase} view="sign_in" showLinks={false} providers={[]} appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: "#6b7f5a", brandAccent: "#587047", inputBorder: "#dfe5db", inputBackground: "#fbfaf7" }, radii: { borderRadiusButton: "12px", inputBorderRadius: "12px" } } } }} theme="light" localization={{ variables: { sign_in: { email_label: "البريد الإلكتروني", password_label: "كلمة المرور", button_label: "دخول", loading_button_label: "جارٍ الدخول…", link_text: "" } } }} />
            </div>
            <button onClick={() => { setMode("signup"); setError(""); setSuccess(""); }} className="mt-5 w-full rounded-xl border border-[#dce6d8] bg-[#f4f8f1] px-4 py-3 text-sm font-bold text-[#587152] transition hover:bg-[#eaf2e7]">لا تملك حساباً؟ إنشاء حساب</button>
          </> : <form onSubmit={signUp} className="space-y-4">
            <label className="block text-sm font-semibold text-[#657565]">البريد الإلكتروني<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" /></label>
            <label className="block text-sm font-semibold text-[#657565]">كلمة المرور<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={6} autoComplete="new-password" className={inputClass} placeholder="••••••••" /></label>
            <label className="block text-sm font-semibold text-[#657565]">تأكيد كلمة المرور<input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" required minLength={6} autoComplete="new-password" className={inputClass} placeholder="أعد كتابة كلمة المرور" /></label>
            {error && <p role="alert" className="rounded-xl bg-[#f8e9e5] px-3 py-2 text-xs font-semibold leading-5 text-[#a65e52]">{error}</p>}
            {success && <p role="status" className="rounded-xl bg-[#edf5e9] px-3 py-2 text-xs font-semibold leading-5 text-[#5d7955]">{success}</p>}
            <button type="submit" disabled={saving} className="w-full rounded-xl bg-[#6b7f5a] px-4 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(107,127,90,0.18)] transition hover:bg-[#587047] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "جارٍ إنشاء الحساب…" : "إنشاء الحساب"}</button>
            <button type="button" onClick={() => { setMode("signin"); setError(""); setSuccess(""); }} className="w-full rounded-xl px-4 py-2 text-sm font-semibold text-[#718078] transition hover:bg-[#f1f4ee] hover:text-[#52684f]">لديك حساب؟ تسجيل الدخول</button>
          </form>}
        </section>
      </div>
    </main>
  );
};

export default Login;
