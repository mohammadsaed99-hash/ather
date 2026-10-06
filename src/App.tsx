import { useEffect, useState, type ReactNode } from "react";
import "./App.css";
import { SessionContextProvider, useSessionContext } from "@supabase/auth-helpers-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CompleteProfile from "./pages/CompleteProfile";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Preview from "./pages/Preview";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f5f3ee] text-sm font-semibold text-[#6b7f5a]">جارٍ فتح مساحتك الهادئة…</div>
);

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useSessionContext();
  const location = useLocation();

  if (isLoading) return <LoadingScreen />;
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
};

const ProfileGate = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useSessionContext();
  const [state, setState] = useState<"loading" | "ready" | "missing" | "error">("loading");

  useEffect(() => {
    if (isLoading || !session) return;
    let active = true;
    const loadProfile = async () => {
      const { data, error } = await supabase.from("profiles").select("id").eq("id", session.user.id).maybeSingle();
      if (!active) return;
      setState(error ? "error" : data ? "ready" : "missing");
    };
    loadProfile();
    return () => { active = false; };
  }, [isLoading, session]);

  if (isLoading || state === "loading") return <LoadingScreen />;
  if (state === "missing") return <Navigate to="/complete-profile" replace />;
  if (state === "error") return <div className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-6 text-center text-sm font-semibold text-[#a65e52]">تعذر تحميل Beyoncé. حاول(px).</div>;
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/preview" element={<Preview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><ProfileGate><Settings /></ProfileGate></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><ProfileGate><Index /></ProfileGate></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;