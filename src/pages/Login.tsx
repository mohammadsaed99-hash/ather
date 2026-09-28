import { useEffect, useState, type FormEvent } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Feather, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const session = useSession();
  const [mode, setMode] = useState<"sign_in" | "sign_up">("sign_in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => undefined);
    return () => data.subscription.unsubscribe();
  }, []);

  if (session) return <Navigate to="/" replace />;

  const switchMode = (nextMode: "sign_in" | "sign_up") => {
    setMode(nextMode);
    setError("");
    setNotice("");
    setPassword("");
    setConfirmPassword("");
  };

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (password.length < 6) {
      setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      return;
    }

    setSaving(true);
    const { error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password });
    setSaving(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setNotice("تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول.");
    setPassword("");
    setConfirmPassword("");
  };

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
          <div className="mb-7 lg:hidden"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6b7f5a] text-white"><Feather className="h-5 w-5" /></div><p className="mt-4 font-display text-3xl font-semibold">أَثَر</p></div>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#34463a]">{mode === "sign_up" ? "أنشئ حسابك بهدوء" : "ادخل بهدوء"}</h2>
          <p className="mt-2 text-sm leading-6 text-[#89958b]">أنشئ حسابك لتبقى دوائرك ومنشوراتك خاصة.</p>

          {mode === "sign_in" ? (
            <div className="mt-6 overflow-hidden rounded-2xl [&_button]:rounded-xl [&_input]:rounded-xl [&_input]:border-[#dfe5db] [&_label]:text-[#657565]">
              <Auth supabaseClient={supabase} view="sign_in" showLinks={false} providers={[]} appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: "#6b7f5a", brandAccent: "#587047", inputBorder: "#dfe5db", inputBackground: "#fbfaf7" }, radii: { borderRadiusButton: "12px", inputBorderRadius: "12px" } } } }} theme="light" localization={{ variables: { sign_in: { email_label: "البريد الإلكتروني", password_label: "كلمة المرور", button_label: "دخول", loading_button_label: "جارٍ الدخول…", link_text: "" } } }} />
            </div>
          ) : (
            <form onSubmit={signUp} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-[#657565]">البريد الإلكتروني<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="mt-2 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3.5 py-3 text-sm text-[#34463a] outline-none transition focus:border-[#a9bea1] focus:ring-2 focus:ring-[#dce8d8]" /></label>
              <label className="block text-sm font-semibold text-[#657565]">كلمة المرور<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3.5 py-3 text-sm text-[#34463a] outline-none transition focus:border-[#a9bea1] focus:ring-2 focus:ring-[#dce8d8]" /></label>
              <label className="block text-sm font-semibold text-[#657565]">تأكيد كلمة المرور<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={6} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-[#dfe5db] bg-[#fbfaf7] px-3.5 py-3 text-sm text-[#34463a] outline-none transition focus:border-[#a9bea1] focus:ring-2 focus:ring-[#dce8d8]" /></label>
              {error && <p className="rounded-xl bg-[#f8e9e5] px-3 py-2 text-xs font-semibold leading-5 text-[#a65e52]">{error}</p>}
              {notice && <p className="rounded-xl bg-[#edf5e9] px-3 py-2 text-xs font-semibold leading-5 text-[#5d7955]">{notice}</p>}
              <Button type="submit" disabled={saving} className="w-full rounded-xl bg-[#6b7f5a] py-3 text-sm font-bold text-white hover:bg-[#587047]">{saving ? "جارٍ إنشاء الحساب…" : "إنشاء حساب"}</Button>
            </form>
          )}

          <button type="button" onClick={() => switchMode(mode === "sign_in" ? "sign_up" : "sign_in")} className="mt-5 w-full text-center text-sm font-semibold text-[#6b7f5a] transition hover:text-[#48623f]">
            {mode === "sign_in" ? "لا تملك حساباً؟ إنشاء حساب جديد" : "لديك حساب؟ العودة إلى تسجيل الدخول"}
          </button>
        </section>
      </div>
    </main>
  );
};

export default Login;
