import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/student-login/lms")({
  head: () => ({ meta: [{ title: "LMS Login — KMR Technologies" }] }),
  component: LMSLogin,
});

function LMSLogin() {
  const nav = useNavigate();
  const { t } = useT();
  const [id, setId] = useState("KMR2025001");
  const [pw, setPw] = useState("demo1234");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (id && pw) {
        sessionStorage.setItem("lms_user", JSON.stringify({ id: "KMR-102", name: "K. Manideep" }));
        toast.success(t("lf.welcome"));
        nav({ to: "/dashboard/lms" });
      } else { toast.error("Invalid credentials"); }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-secondary">
      <div className="hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gold grid place-items-center"><GraduationCap className="h-5 w-5 text-navy-deep" /></div>
          <div className="font-extrabold">KMR · LMS</div>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">{t("lf.headline.lms")}</h2>
          <p className="text-white/70 mt-4 max-w-md">{t("lf.sub.lms")}</p>
        </div>
        <div className="text-xs text-white/50">© KMR Technologies</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form onSubmit={submit} className="w-full max-w-md bg-card rounded-3xl shadow-elegant p-8 border border-border">
          <h1 className="text-2xl font-extrabold text-navy">{t("lf.lms.title")}</h1>
          <p className="text-sm text-muted-foreground mb-6">{t("lf.lms.sub")}</p>
          <div className="space-y-4">
            <div>
              <Label>{t("lf.studentId")}</Label>
              <div className="relative mt-1">
                <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input value={id} onChange={e=>setId(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div>
              <Label>{t("lf.password")}</Label>
              <div className="relative mt-1">
                <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input type={show?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} className="pl-9 pr-9" />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-3 text-muted-foreground">{show?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold">{loading?t("lf.signingIn"):t("lf.signIn")}</Button>
            <p className="text-xs text-center text-muted-foreground">{t("lf.demo")}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
