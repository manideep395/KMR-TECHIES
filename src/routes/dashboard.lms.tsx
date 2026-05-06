import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, GraduationCap, PlayCircle, BookOpen, ClipboardCheck, BarChart3, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import { DashThemeToggle } from "@/components/site/DashThemeToggle";

export const Route = createFileRoute("/dashboard/lms")({
  head: () => ({ meta: [{ title: "LMS Dashboard — KMR Technologies" }] }),
  component: LMSDash,
});

type Lesson = { title: string; duration: string; done: boolean };
type Course = { id: string; title: string; track: string; thumb: string; lessons: Lesson[] };

const COURSES: Course[] = [
  {
    id: "fsd",
    title: "Full-Stack Web Development",
    track: "Job Guaranteed",
    thumb: "linear-gradient(135deg,#06B6D4,#1E40AF)",
    lessons: [
      { title: "JavaScript fundamentals", duration: "32m", done: true },
      { title: "React state & hooks", duration: "48m", done: true },
      { title: "Node + Express APIs", duration: "55m", done: true },
      { title: "MongoDB & Mongoose", duration: "41m", done: false },
      { title: "Auth with JWT", duration: "38m", done: false },
      { title: "Deploying full-stack", duration: "29m", done: false },
    ],
  },
  {
    id: "aws",
    title: "AWS Solutions Architect",
    track: "Certification",
    thumb: "linear-gradient(135deg,#F59E0B,#DC2626)",
    lessons: [
      { title: "AWS global infra", duration: "18m", done: true },
      { title: "EC2 & VPC basics", duration: "44m", done: false },
      { title: "S3 storage classes", duration: "36m", done: false },
      { title: "IAM & policies", duration: "40m", done: false },
    ],
  },
  {
    id: "data",
    title: "Data Analytics & AI",
    track: "Job Guaranteed",
    thumb: "linear-gradient(135deg,#EC4899,#7C3AED)",
    lessons: [
      { title: "Python crash course", duration: "52m", done: false },
      { title: "Pandas & NumPy", duration: "48m", done: false },
      { title: "Visualization with Power BI", duration: "39m", done: false },
    ],
  },
];

const ASSESSMENTS = [
  { id: "a1", course: "Full-Stack", title: "React State Quiz", due: "Nov 12", status: "inProgress" as const, score: null },
  { id: "a2", course: "Full-Stack", title: "Node Routing Lab", due: "Nov 18", status: "notStarted" as const, score: null },
  { id: "a3", course: "AWS", title: "EC2 Hands-on", due: "Nov 20", status: "notStarted" as const, score: null },
  { id: "a4", course: "Full-Stack", title: "JavaScript Fundamentals", due: "Oct 30", status: "completed" as const, score: 92 },
];

const LIVE = [
  { title: "MERN deployment masterclass", time: "Wed 6:00 PM IST", host: "Priya R." },
  { title: "AWS exam strategy", time: "Fri 7:30 PM IST", host: "Vikram S." },
];

function LMSDash() {
  const nav = useNavigate();
  const { t } = useT();
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState(COURSES[0]);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? sessionStorage.getItem("lms_user") : null;
    if (!raw) { nav({ to: "/student-login/lms" }); return; }
    setAuthed(true);
  }, [nav]);

  function logout() {
    sessionStorage.removeItem("lms_user");
    nav({ to: "/student-login" });
  }

  if (!authed) return null;

  const overallProgress = (() => {
    const totals = COURSES.reduce((acc, c) => {
      acc.done += c.lessons.filter(l => l.done).length;
      acc.total += c.lessons.length;
      return acc;
    }, { done: 0, total: 0 });
    return Math.round((totals.done / totals.total) * 100);
  })();

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-navy-deep text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-gold" />
            <span className="font-extrabold">KMR · LMS</span>
          </Link>
          <div className="flex items-center gap-2">
            <DashThemeToggle />
            <Button onClick={logout} variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-1" /> {t("dash.logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("lms.welcome")}, K. Manideep 👋</h1>
          <p className="text-muted-foreground text-sm">{t("lms.continue")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label={t("lms.mycourses")} value={String(COURSES.length)} grad="from-cyan-500 to-blue-600" />
          <StatCard icon={ClipboardCheck} label={t("lms.assessments")} value={String(ASSESSMENTS.length)} grad="from-magenta to-rose-600" />
          <StatCard icon={BarChart3} label={t("lms.progress")} value={`${overallProgress}%`} grad="from-emerald-500 to-teal-600" />
          <StatCard icon={Video} label={t("lms.upcoming")} value={String(LIVE.length)} grad="from-amber-500 to-orange-600" />
        </div>

        <Tabs defaultValue="courses" className="bg-card rounded-2xl border border-border p-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="courses">{t("lms.mycourses")}</TabsTrigger>
            <TabsTrigger value="assessments">{t("lms.assessments")}</TabsTrigger>
            <TabsTrigger value="live">{t("lms.upcoming")}</TabsTrigger>
          </TabsList>

          {/* COURSES */}
          <TabsContent value="courses" className="mt-4 grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {COURSES.map(c => {
                const done = c.lessons.filter(l => l.done).length;
                const pct = Math.round((done / c.lessons.length) * 100);
                const isActive = active.id === c.id;
                return (
                  <button key={c.id} onClick={() => setActive(c)} className={`text-left rounded-2xl overflow-hidden border-2 transition ${isActive ? "border-magenta shadow-elegant" : "border-border hover:border-magenta/50"}`}>
                    <div className="h-24 grid place-items-center text-white" style={{ background: c.thumb }}>
                      <PlayCircle className="h-10 w-10 opacity-90" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-magenta">{c.track}</div>
                      <h3 className="font-bold text-foreground mt-1">{c.title}</h3>
                      <div className="text-xs text-muted-foreground mt-2">{done}/{c.lessons.length} {t("lms.lessons")}</div>
                      <div className="h-1.5 w-full bg-secondary rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-magenta rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Player + lesson list */}
            <div className="rounded-2xl bg-secondary/40 border border-border p-4">
              <div className="aspect-video rounded-xl bg-navy-deep grid place-items-center text-white">
                <PlayCircle className="h-14 w-14 text-gold" />
              </div>
              <div className="mt-3">
                <div className="text-xs text-muted-foreground">{t("lms.player.title")}</div>
                <h4 className="font-bold text-foreground">{active.title}</h4>
              </div>
              <ul className="mt-3 space-y-1 max-h-64 overflow-auto pr-1">
                {active.lessons.map((l, i) => (
                  <li key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card transition">
                    <input type="checkbox" defaultChecked={l.done} className="accent-magenta" />
                    <span className={`flex-1 text-sm ${l.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{l.title}</span>
                    <span className="text-xs text-muted-foreground">{l.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* ASSESSMENTS */}
          <TabsContent value="assessments" className="mt-4 space-y-3">
            {ASSESSMENTS.map(a => (
              <div key={a.id} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-secondary/40">
                <div>
                  <div className="font-bold text-foreground">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.course} · {t("lms.due")}: {a.due}</div>
                </div>
                <div className="flex items-center gap-3">
                  {a.status === "completed" ? (
                    <>
                      <span className="text-sm font-bold text-emerald-600">{t("lms.score")}: {a.score}%</span>
                      <Button size="sm" variant="outline" onClick={() => toast.info(a.title)}>{t("lms.review")}</Button>
                    </>
                  ) : (
                    <>
                      <span className={`text-xs px-2 py-1 rounded-full ${a.status === "inProgress" ? "bg-cyan-100 text-cyan-700" : "bg-amber-100 text-amber-700"}`}>
                        {a.status === "inProgress" ? t("lms.inProgress") : t("lms.notStarted")}
                      </span>
                      <Button size="sm" className="bg-magenta hover:bg-magenta/90 text-white" onClick={() => toast.success(a.title)}>{a.status === "inProgress" ? t("lms.resume") : t("lms.start")}</Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* LIVE */}
          <TabsContent value="live" className="mt-4 grid md:grid-cols-2 gap-4">
            {LIVE.map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-secondary/40 p-5">
                <div className="flex items-center gap-2 text-magenta mb-2"><Calendar className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-wider">Live</span></div>
                <h4 className="font-bold text-foreground">{s.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{s.time} · {s.host}</p>
                <Button className="mt-4 bg-magenta hover:bg-magenta/90 text-white rounded-full" onClick={() => toast.success(s.title)}>{t("lms.join")}</Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, grad }: { icon: typeof BookOpen; label: string; value: string; grad: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${grad} text-white p-5 shadow-md`}>
      <Icon className="h-7 w-7 opacity-90 mb-3" />
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-xs opacity-90 mt-1">{label}</div>
    </div>
  );
}
