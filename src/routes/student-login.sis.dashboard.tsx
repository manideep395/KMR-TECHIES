import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  LogOut, BookOpen, Calendar, Wallet, Bell, GraduationCap, TrendingUp,
  FileText, User, Clock, MapPin, Download, CreditCard, CalendarDays, CheckCircle2,
  ClipboardList, BadgeCheck, MessageSquare, Star, Send, IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DashThemeToggle } from "@/components/site/DashThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/student-login/sis/dashboard")({
  head: () => ({ meta: [{ title: "SIS Dashboard — KMR Technologies" }, { name: "description", content: "Student dashboard." }] }),
  component: Dash,
});

const courses = [
  { name: "Full-Stack Development", code: "FSD-401", grade: "A", progress: 78, attendance: 96 },
  { name: "Cloud & DevOps", code: "CLD-302", grade: "A-", progress: 64, attendance: 91 },
  { name: "Data Structures", code: "DSA-201", grade: "B+", progress: 92, attendance: 88 },
  { name: "Communication Skills", code: "COM-101", grade: "A", progress: 100, attendance: 100 },
];

const notices = [
  { t: "Mid-term exam schedule released", d: "2 hours ago", tag: "Exam" },
  { t: "Industry mentor session: Friday 5pm", d: "Yesterday", tag: "Event" },
  { t: "Fee installment due Nov 30", d: "3 days ago", tag: "Finance" },
  { t: "Library books renewal open", d: "Last week", tag: "Notice" },
];

const schedule = [
  { time: "09:00", course: "Full-Stack Development", room: "Lab 3", status: "done" },
  { time: "11:00", course: "Cloud & DevOps", room: "Room 204", status: "now" },
  { time: "14:00", course: "Data Structures", room: "Lab 1", status: "next" },
  { time: "16:00", course: "Mentor Hour — Priya R.", room: "Online", status: "next" },
];

function Dash() {
  const nav = useNavigate();
  const { user, loading, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email || "Student";
  const [openAction, setOpenAction] = useState<null | "transcript" | "fees" | "timetable" | "profile" | "results" | "idcard" | "leave" | "feedback">(null);

  useEffect(() => {
    if (!loading && !user) {
      const timeout = window.setTimeout(() => {
        nav({ to: "/student-login/sis", replace: true });
      }, 500);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [loading, user, nav]);

  const avgAttendance = useMemo(
    () => Math.round(courses.reduce((a, c) => a + c.attendance, 0) / courses.length),
    []
  );

  async function logout() {
    await signOut();
    nav({ to: "/student-login" });
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-navy-deep text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><GraduationCap className="h-6 w-6 text-gold" /><span className="font-extrabold">KMR · SIS</span></Link>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block"><div className="text-sm font-semibold">{user.user_metadata?.full_name || user.email}</div><div className="text-xs text-white/60">{user.id}</div></div>
            <div className="h-9 w-9 rounded-full bg-gold text-navy-deep grid place-items-center font-bold">{(user.user_metadata?.full_name || user.email || "U").charAt(0)}</div>
            <DashThemeToggle />
            <Button onClick={logout} variant="ghost" size="sm" className="text-white hover:bg-white/10"><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Welcome back, {(user.user_metadata?.full_name || user.email || "Student").split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground text-sm">Semester 5 · Batch 2024</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { i: Calendar, l: "Attendance", v: `${avgAttendance}%`, c: "bg-magenta/10 text-magenta" },
            { i: TrendingUp, l: "CGPA", v: "8.7", c: "bg-navy/10 text-foreground" },
            { i: BookOpen, l: "Active Courses", v: String(courses.length), c: "bg-gold/20 text-foreground" },
            { i: Wallet, l: "Fees Due", v: "₹15,000", c: "bg-magenta/10 text-magenta" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-card p-5 border border-border">
              <div className={`h-10 w-10 rounded-lg grid place-items-center ${s.c} mb-3`}><s.i className="h-5 w-5" /></div>
              <div className="text-2xl font-extrabold text-foreground">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's schedule */}
            <div className="rounded-2xl bg-card p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Today's Schedule</h2>
                <span className="text-xs text-muted-foreground">4 classes</span>
              </div>
              <div className="space-y-2">
                {schedule.map((s) => (
                  <div key={s.time} className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                    <div className="text-sm font-bold text-foreground w-14 flex items-center gap-1 shrink-0"><Clock className="h-3.5 w-3.5" />{s.time}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">{s.course}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{s.room}</div>
                    </div>
                    {s.status === "now" && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-magenta text-white animate-pulse shadow-md">Live</span>}
                    {s.status === "done" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {s.status === "next" && <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gold/30 text-foreground">Up next</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Courses with attendance */}
            <div className="rounded-2xl bg-card p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground flex items-center gap-2"><BookOpen className="h-5 w-5" /> My Courses</h2>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
              <div className="space-y-4">
                {courses.map((c) => (
                  <div key={c.code} className="p-4 rounded-xl bg-secondary">
                    <div className="flex items-center justify-between mb-2 gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.code} · Attendance {c.attendance}%</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-gold/20 text-foreground text-xs font-bold shrink-0">{c.grade}</span>
                    </div>
                    <Progress value={c.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{c.progress}% complete</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Attendance ring */}
            <div className="rounded-2xl bg-gradient-hero text-white p-6 border border-border">
              <h2 className="font-bold flex items-center gap-2 mb-4"><Calendar className="h-5 w-5 text-gold" /> Attendance</h2>
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24">
                  <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.83 0.16 85)" strokeWidth="3"
                      strokeDasharray={`${avgAttendance} 100`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-xl font-extrabold">{avgAttendance}%</div>
                </div>
                <div className="text-sm">
                  <div className="text-white/80">Above 75% required</div>
                  <div className="text-gold font-bold mt-1">All clear ✓</div>
                </div>
              </div>
            </div>

            {/* Notices */}
            <div className="rounded-2xl bg-card p-6 border border-border">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><Bell className="h-5 w-5" /> Notices</h2>
              <ul className="space-y-3">
                {notices.map((n, i) => (
                  <li key={i} className="text-sm border-l-2 border-magenta pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-secondary text-magenta">{n.tag}</span>
                      <span className="text-xs text-muted-foreground">{n.d}</span>
                    </div>
                    <div className="font-medium text-foreground mt-0.5">{n.t}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl bg-card p-6 border border-border">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><User className="h-5 w-5" /> Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button id="qa-transcript" onClick={() => setOpenAction("transcript")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><FileText className="h-4 w-4" />Transcript</button>
                <button id="qa-fees" onClick={() => setOpenAction("fees")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><Wallet className="h-4 w-4" />Pay Fees</button>
                <button id="qa-timetable" onClick={() => setOpenAction("timetable")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><Calendar className="h-4 w-4" />Timetable</button>
                <button id="qa-profile" onClick={() => setOpenAction("profile")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><User className="h-4 w-4" />Profile</button>
                <button id="qa-results" onClick={() => setOpenAction("results")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><ClipboardList className="h-4 w-4" />Results</button>
                <button id="qa-idcard" onClick={() => setOpenAction("idcard")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><IdCard className="h-4 w-4" />ID Card</button>
                <button id="qa-leave" onClick={() => setOpenAction("leave")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><BadgeCheck className="h-4 w-4" />Leave App.</button>
                <button id="qa-feedback" onClick={() => setOpenAction("feedback")} className="p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1"><MessageSquare className="h-4 w-4" />Feedback</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Transcript dialog ── */}
      <Dialog open={openAction === "transcript"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Academic Transcript</DialogTitle><DialogDescription>Semester 1 – 4 grades summary</DialogDescription></DialogHeader>
          <div className="space-y-2 text-sm">
            {[{s:1,g:"8.42"},{s:2,g:"8.61"},{s:3,g:"8.74"},{s:4,g:"8.83"}].map((x) => (
              <div key={x.s} className="flex justify-between p-2 rounded bg-secondary"><span>Semester {x.s}</span><span className="font-bold text-foreground">SGPA {x.g}</span></div>
            ))}
          </div>
          <DialogFooter><Button onClick={() => { toast.success("Transcript download started"); setOpenAction(null); }} className="bg-magenta hover:bg-magenta/90"><Download className="h-4 w-4 mr-1" /> Download PDF</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Fees dialog ── */}
      <Dialog open={openAction === "fees"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" /> Pay Fees</DialogTitle><DialogDescription>Outstanding installment for Semester 5</DialogDescription></DialogHeader>
          <div className="rounded-xl bg-secondary p-4">
            <div className="flex justify-between text-sm"><span>Tuition installment</span><span>₹15,000</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Due date</span><span>Nov 30, 2026</span></div>
            <div className="flex justify-between text-base font-bold text-foreground mt-3 pt-3 border-t border-border"><span>Total</span><span>₹15,000</span></div>
          </div>
          <DialogFooter><Button onClick={() => { toast.success("Redirecting to payment gateway…"); setOpenAction(null); }} className="bg-magenta hover:bg-magenta/90"><CreditCard className="h-4 w-4 mr-1" /> Pay now</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Timetable dialog ── */}
      <Dialog open={openAction === "timetable"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Weekly Timetable</DialogTitle></DialogHeader>
          <div className="space-y-1 text-sm">
            {["Monday","Tuesday","Wednesday","Thursday","Friday"].map((d, i) => (
              <div key={d} className="flex justify-between p-2 rounded bg-secondary"><span className="font-semibold">{d}</span><span className="text-muted-foreground">{courses[i % courses.length].name}</span></div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Profile dialog ── */}
      <Dialog open={openAction === "profile"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><User className="h-5 w-5" /> My Profile</DialogTitle></DialogHeader>
          <div className="space-y-2 text-sm">
            <Row k="Name" v={displayName} />
            <Row k="Student ID" v={user.id} />
            <Row k="Program" v="B.Tech CSE" />
            <Row k="Batch" v="2024 – 2028" />
            <Row k="Email" v={`${displayName.split(" ")[0].toLowerCase()}@kmr.edu`} />
            <Row k="Mentor" v="Priya R." />
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Results dialog ── */}
      <Dialog open={openAction === "results"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" /> Semester Results</DialogTitle><DialogDescription>Internal & external marks for Semester 5</DialogDescription></DialogHeader>
          <div className="space-y-2 text-sm">
            {courses.map((c) => (
              <div key={c.code} className="flex justify-between items-center p-2 rounded bg-secondary">
                <div>
                  <div className="font-semibold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.code}</div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-gold/20 text-foreground text-xs font-bold">{c.grade}</span>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter><Button onClick={() => { toast.success("Results PDF download started"); setOpenAction(null); }} className="bg-magenta hover:bg-magenta/90"><Download className="h-4 w-4 mr-1" /> Download</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── ID Card dialog ── */}
      <Dialog open={openAction === "idcard"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><IdCard className="h-5 w-5" /> Student ID Card</DialogTitle><DialogDescription>Your official KMR Technologies identity card</DialogDescription></DialogHeader>
          <div className="rounded-xl bg-gradient-to-br from-navy to-navy-deep text-white p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-gold text-navy-deep grid place-items-center font-bold text-2xl">{displayName.charAt(0)}</div>
              <div>
                <div className="font-extrabold text-lg">{displayName}</div>
                <div className="text-xs text-white/70">{user.id}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-white/10">
              <div><div className="text-white/60 text-xs">Program</div><div className="font-semibold">B.Tech CSE</div></div>
              <div><div className="text-white/60 text-xs">Batch</div><div className="font-semibold">2024 – 2028</div></div>
              <div><div className="text-white/60 text-xs">Semester</div><div className="font-semibold">5</div></div>
              <div><div className="text-white/60 text-xs">Valid Until</div><div className="font-semibold">May 2028</div></div>
            </div>
          </div>
          <DialogFooter><Button onClick={() => { toast.success("ID Card PDF download started"); setOpenAction(null); }} className="bg-magenta hover:bg-magenta/90"><Download className="h-4 w-4 mr-1" /> Download ID Card</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Leave Application dialog ── */}
      <Dialog open={openAction === "leave"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><BadgeCheck className="h-5 w-5" /> Leave Application</DialogTitle><DialogDescription>Submit a leave request to your mentor</DialogDescription></DialogHeader>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Leave Type</label>
              <select className="mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                <option>Medical Leave</option>
                <option>Personal Leave</option>
                <option>Event / Hackathon</option>
                <option>Family Emergency</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">From Date</label>
                <input type="date" className="mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">To Date</label>
                <input type="date" className="mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reason</label>
              <textarea rows={3} placeholder="Briefly describe the reason..." className="mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
          </div>
          <DialogFooter><Button onClick={() => { toast.success("Leave application submitted to mentor"); setOpenAction(null); }} className="bg-magenta hover:bg-magenta/90"><Send className="h-4 w-4 mr-1" /> Submit Application</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Course Feedback dialog ── */}
      <Dialog open={openAction === "feedback"} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Course Feedback</DialogTitle><DialogDescription>Rate your courses for this semester</DialogDescription></DialogHeader>
          <div className="space-y-4 text-sm">
            {courses.map((c) => (
              <div key={c.code} className="p-3 rounded-xl bg-secondary space-y-2">
                <div className="font-semibold text-foreground">{c.name}</div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} className="text-gold hover:scale-110 transition"><Star className="h-5 w-5 fill-gold" /></button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter><Button onClick={() => { toast.success("Feedback submitted — thank you!"); setOpenAction(null); }} className="bg-magenta hover:bg-magenta/90"><Send className="h-4 w-4 mr-1" /> Submit Feedback</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between p-2 rounded bg-secondary"><span className="text-muted-foreground">{k}</span><span className="font-semibold text-foreground">{v}</span></div>
  );
}
