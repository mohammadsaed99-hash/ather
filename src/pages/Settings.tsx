import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings2, Check } from "lucide-react";

const Settings = () => {
  const session = useSession();
  const [muteVideos, setMuteVideos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!session?.user.id) return;
    let active = true;

    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("mute_videos")
          .eq("id", session.user.id)
          .single();

        if (!active) return;
        if (error) throw error;
        setMuteVideos(data?.mute_videos ?? false);
      } catch (err) {
        console.error("Failed to load settings:", err);
        setMuteVideos(false);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSettings();
    return () => { active = false; };
  }, [session?.user.id]);

  const handleToggle = async (checked: boolean) => {
    if (!session?.user.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ mute_videos: checked })
        .eq("id", session.user.id);

      if (error) throw error;
      setMuteVideos(checked);
      setSuccessMessage("تم حفظ الإعدادات بنجاح");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      // Revert toggle on error
      setMuteVideos(!checked);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee]">
        <div className="text-sm font-semibold text-[#6b7f5a]">جارٍ تحميل الإعدادات...</div>
      </div>
    );
  }

  if (!session?.user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee]">
        <div className="text-sm font-semibold text-[#6b7f5a]">يجب تسجيل الدخول أولًا</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <Settings2 className="h-6 w-6 text-[#6b7f5a]" />
            <h1 className="text-2xl font-bold text-[#2e3b34]">الإعدادات</h1>
          </div>
        </header>

        <div className="rounded-[26px] border border-[#e2e5dc] bg-[#fbfaf7] p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#3f3568]">تفضيلات العرض</h2>
            <p className="mt-2 text-sm text-[#78906f]">
              تخصيص تجربة التصفح حسب تفضيلاتك
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3e9] text-[#6b7f5a]">
                  <Settings2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3d4b43]">كتم صوت الفيديوهات</h3>
                  <p className="mt-1 text-sm text-[#78906f]">
                    عند التفعيل، ستبدأ جميع فيديوهات التغذية وهي مكتومة الصوت
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={muteVideos}
                  onCheckedChange={handleToggle}
                  disabled={saving}
                  className="w-[50px] h-[24px]"
                />
                {saving && (
                  <span className="text-xs text-[#6b7f5a] animate-pulse">جارٍ الحفظ...</span>
                )}
              </div>
            </div>

            {successMessage && (
              <div className="mt-4 rounded-xl bg-[#edf3e9] px-4 py-3 text-sm font-semibold text-[#506c4a] flex items-center gap-2">
                <Check className="h-4 w-4 text-[#506c4a]" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;