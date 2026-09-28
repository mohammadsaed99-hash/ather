import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { Feather, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const session = useSession();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => undefined);
    return () => data.subscription.unsubscribe();
  }, []);

  if (session) return <Navigate to="/" replace />;

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
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#34463a]">ادخل بهدوء</h2>
          <p className="mt-2 text-sm leading-6 text-[#89958b]">أنشئ حسابك لتبقى دوائرك ومنشوراتك خاصة.</p>
          <div className="mt-6 overflow-hidden rounded-2xl [&_button]:rounded-xl [&_input]:rounded-xl [&_input]:border-[#dfe5db] [&_label]:text-[#657565]">
            <Auth supabaseClient={supabase} providers={[]} appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: "#6b7f5a", brandAccent: "#587047", inputBorder: "#dfe5db", inputBackground: "#fbfaf7" }, radii: { borderRadiusButton: "12px", inputBorderRadius: "12px" } } } }} theme="light" localization={{ variables: { sign_in: { email_label: "البريد الإلكتروني", password_label: "كلمة المرور", button_label: "دخول", loading_button_label: "جارٍ الدخول…", link_text: "لديك حساب؟ دخول" }, sign_up: { email_label: "البريد الإلكتروني", password_label: "كلمة المرور", button_label: "إنشاء حساب", loading_button_label: "جارٍ إنشاء الحساب…", link_text: "لا تملك حساباً؟ إنشاء حساب" } } }} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
