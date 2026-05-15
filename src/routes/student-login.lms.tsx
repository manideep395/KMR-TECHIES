import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { GraduationCap, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/student-login/lms")({
  head: () => ({ meta: [{ title: "LMS Login — KES Technologies" }] }),
  component: LMSLogin,
});

function LMSLogin() {
  const nav = useNavigate();
  const { t } = useT();
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const isLmsDashboardRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/student-login/lms/dashboard');
  const [email, setEmail] = useState("demo@kestechies.com");
  const [password, setPassword] = useState("demo1234");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Removed automatic redirect to allow user choice when already logged in
  }, [user, nav]);

  if (isLmsDashboardRoute) {
    return <Outlet />;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const { data, error } = await signUp(email, password, { full_name: name });
        if (error) {
          if (error.message.toLowerCase().includes('already registered')) {
            toast.error("Account already exists. Please sign in.");
            setMode('login');
          } else {
            toast.error(error.message);
          }
        } else {
          const user = (data as any)?.user ?? (data as any)?.session?.user;
          if (user) {
            await supabase.from('profiles').insert({
              id: user.id,
              email,
              full_name: name,
              role: 'student',
            });
            toast.success(t("lf.signupSuccess"));
            sessionStorage.setItem("lms_user", JSON.stringify({
              name: name,
              id: user.id
            }));
            nav({ to: "/dashboard/lms", replace: true });
          } else {
            toast.success("Signup successful. Please sign in.");
            setMode('login');
          }
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          const authUser = (data as any)?.user ?? (data as any)?.session?.user;
          if (authUser) {
            toast.success(t("lf.welcome"));
            sessionStorage.setItem("lms_user", JSON.stringify({
              name: authUser.user_metadata?.full_name || email,
              id: authUser.id
            }));
            nav({ to: "/dashboard/lms", replace: true });
          } else {
            const sessionData = await supabase.auth.getSession();
            const sessionUser = sessionData.data.session?.user;
            if (sessionUser) {
              toast.success(t("lf.welcome"));
              sessionStorage.setItem("lms_user", JSON.stringify({
                name: sessionUser.user_metadata?.full_name || email,
                id: sessionUser.id
              }));
              nav({ to: "/dashboard/lms", replace: true });
            } else {
              toast.error("Login succeeded but user session was not available. Please refresh.");
            }
          }
        }
      }
    } catch (err) {
      toast.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <div className="min-h-screen grid lg:grid-cols-2 bg-secondary">
        <div className="hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gold grid place-items-center"><GraduationCap className="h-5 w-5 text-navy-deep" /></div>
            <div className="font-extrabold">KES · LMS</div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Already Logged In</h2>
            <p className="text-white/70 mt-4 max-w-md">You are currently logged in as {user.email}. What would you like to do?</p>
          </div>
          <div className="text-xs text-white/50">© KES Technologies</div>
        </div>
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md bg-card rounded-3xl shadow-elegant p-8 border border-border">
            <h1 className="text-2xl font-extrabold text-navy">Welcome back!</h1>
            <p className="text-sm text-muted-foreground mb-6">You are already logged in as {user.email}.</p>
            <div className="space-y-4">
              <Button onClick={() => nav({ to: "/dashboard/lms" })} className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold">
                Go to Dashboard
              </Button>
              <Button onClick={async () => {
                await supabase.auth.signOut();
                toast.success("Logged out successfully");
              }} variant="outline" className="w-full rounded-full h-11 font-bold">
                Logout & Sign In Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-secondary">
      <div className="hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gold grid place-items-center"><GraduationCap className="h-5 w-5 text-navy-deep" /></div>
          <div className="font-extrabold">KES · LMS</div>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">{t("lf.headline.lms")}</h2>
          <p className="text-white/70 mt-4 max-w-md">{t("lf.sub.lms")}</p>
        </div>
        <div className="text-xs text-white/50">© KES Technologies</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form onSubmit={submit} className="w-full max-w-md bg-card rounded-3xl shadow-elegant p-8 border border-border">
          <h1 className="text-2xl font-extrabold text-navy">{mode === 'register' ? t("lf.lmsRegisterTitle") : t("lf.lms.title")}</h1>
          <p className="text-sm text-muted-foreground mb-6">{mode === 'register' ? t("lf.lmsRegisterSub") : t("lf.lms.sub")}</p>
          <div className="space-y-4">
            {mode === 'register' && (
              <div>
                <Label>{t("lf.fullName")}</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Label>{t("lf.email")}</Label>
              <div className="relative mt-1">
                <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div>
              <Label>{t("lf.password")}</Label>
              <div className="relative mt-1">
                <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold">
              {loading ? (mode === 'register' ? t("lf.signingUp") : t("lf.signingIn")) : (mode === 'register' ? t("lf.signUp") : t("lf.signIn"))}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {mode === 'login' ? (
                <button type="button" onClick={() => setMode('register')} className="underline text-magenta">{t("lf.createAccount")}</button>
              ) : (
                <button type="button" onClick={() => setMode('login')} className="underline text-magenta">{t("lf.alreadyHaveAccount")}</button>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
