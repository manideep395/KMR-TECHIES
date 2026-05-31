import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, GraduationCap, Wallet, Calendar, Ticket, BarChart3, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import { DashThemeToggle } from "@/components/site/DashThemeToggle";
import { useSharedStore } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — KES Technologies" }] }),
  component: StudentDash,
});

const PERF = [
  { m: "Jun", score: 72 },
  { m: "Jul", score: 78 },
  { m: "Aug", score: 81 },
  { m: "Sep", score: 76 },
  { m: "Oct", score: 88 },
  { m: "Nov", score: 92 },
];

function Radial({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="#06B6D4" strokeWidth="10"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-3xl font-extrabold text-foreground">{value}%</div>
      </div>
    </div>
  );
}

function StudentDash() {
  const nav = useNavigate();
  const { t } = useT();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      nav({ to: "/student-login/sis" });
    }
  }, [user, loading, nav]);

  async function logout() {
    await signOut();
    nav({ to: "/student-login" });
  }

  if (loading || !user) return null;

  const { state } = useSharedStore();
  // Find user in the store or fallback
  const myStudent = state.students.find(s => s.id === user.id);
  const profile = myStudent ? {
    name: myStudent.name,
    id: myStudent.id,
    program: myStudent.program,
    semester: myStudent.semester || "5"
  } : {
    name: user.user_metadata?.full_name || user.email || "Student",
    id: user.id,
    program: "CSE-AI",
    semester: "5"
  };
  const actions = [
    { i: Wallet, l: t("dash.fee"), c: "from-cyan-500 to-blue-600", onClick: () => toast.success(t("dash.fee")) },
    { i: Calendar, l: t("dash.attendance"), c: "from-magenta to-rose-600", onClick: () => toast.success(t("dash.attendance") + ": 92%") },
    { i: Ticket, l: t("dash.hallTicket"), c: "from-amber-500 to-orange-600", onClick: () => toast.success(t("dash.hallTicket")) },
    { i: BarChart3, l: t("dash.results"), c: "from-emerald-500 to-teal-600", onClick: () => toast.success(t("dash.results")) },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-navy-deep text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-gold" />
            <span className="font-extrabold">KES · SIS</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="text-xs text-white/60">{profile.id}</div>
            </div>
            <DashThemeToggle />
            <Button onClick={logout} variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-1" /> {t("dash.logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("dash.welcome")}, {profile.name.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground text-sm">{profile.program} · {t("dash.semester")} {profile.semester}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="rounded-2xl bg-card p-6 border border-border">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><User className="h-5 w-5" /> {t("dash.profile")}</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white text-xl font-extrabold">
                {profile.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <div className="font-bold text-foreground">{profile.name}</div>
                <div className="text-xs text-muted-foreground">{profile.id}</div>
              </div>
            </div>
            <dl className="text-sm space-y-2">
              <Row k={t("dash.program")} v={profile.program} />
              <Row k={t("dash.semester")} v={profile.semester} />
              <Row k="CGPA" v="8.7 / 10" />
              <Row k={t("dash.attendance")} v="92%" />
            </dl>
          </div>

          {/* Radial */}
          <div className="rounded-2xl bg-card p-6 border border-border flex flex-col items-center justify-center">
            <h2 className="font-bold text-foreground mb-4 self-start">{t("dash.progress")}</h2>
            <Radial value={75} />
            <p className="text-sm text-muted-foreground mt-3">{t("dash.syllabus")}</p>
          </div>

          {/* Notices */}
          <div className="rounded-2xl bg-card p-6 border border-border">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><Bell className="h-5 w-5" /> {t("dash.notices")}</h2>
            <ul className="space-y-3 text-sm">
              {[
                { tag: "Exam", t: "Mid-term schedule released" },
                { tag: "Event", t: "Industry mentor session Friday 5pm" },
                { tag: "Finance", t: "Fee installment due Nov 30" },
              ].map((n, i) => (
                <li key={i} className="border-l-2 border-cyan-500 pl-3">
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-secondary text-cyan-600 mr-2">{n.tag}</span>
                  <span className="text-foreground font-medium">{n.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Performance chart */}
        <div className="rounded-2xl bg-card p-6 border border-border">
          <h2 className="font-bold text-foreground mb-4">{t("dash.performance")}</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERF} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="m" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={3} dot={{ r: 5, fill: "#06B6D4" }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action grid */}
        <div className="rounded-2xl bg-card p-6 border border-border">
          <h2 className="font-bold text-foreground mb-4">{t("dash.actions")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {actions.map((a, i) => (
              <button key={i} onClick={a.onClick}
                className={`group relative rounded-2xl bg-gradient-to-br ${a.c} text-white p-5 text-left hover:scale-[1.02] transition-transform shadow-md`}>
                <a.i className="h-7 w-7 mb-3 opacity-90" />
                <div className="font-bold">{a.l}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-1.5">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold text-foreground">{v}</dd>
    </div>
  );
}
