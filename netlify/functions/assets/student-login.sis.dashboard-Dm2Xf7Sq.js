import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { GraduationCap, LogOut, Calendar, TrendingUp, BookOpen, Wallet, CalendarDays, Clock, MapPin, CheckCircle2, Bell, User, FileText, ClipboardList, IdCard, BadgeCheck, MessageSquare, Download, CreditCard, Send, Star } from "lucide-react";
import { B as Button } from "./button-6iPTpLdE.js";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { c as cn } from "./router-CjN-_vpS.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogDescription, d as DialogFooter } from "./dialog-ErikS0wf.js";
import { toast } from "sonner";
import { D as DashThemeToggle } from "./DashThemeToggle-2c_zWJwn.js";
import { u as useAuth } from "./useAuth-D-q7nYcU.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "./client-1Cs0bkRN.js";
import "@supabase/supabase-js";
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const courses = [{
  name: "Full-Stack Development",
  code: "FSD-401",
  grade: "A",
  progress: 78,
  attendance: 96
}, {
  name: "Cloud & DevOps",
  code: "CLD-302",
  grade: "A-",
  progress: 64,
  attendance: 91
}, {
  name: "Data Structures",
  code: "DSA-201",
  grade: "B+",
  progress: 92,
  attendance: 88
}, {
  name: "Communication Skills",
  code: "COM-101",
  grade: "A",
  progress: 100,
  attendance: 100
}];
const notices = [{
  t: "Mid-term exam schedule released",
  d: "2 hours ago",
  tag: "Exam"
}, {
  t: "Industry mentor session: Friday 5pm",
  d: "Yesterday",
  tag: "Event"
}, {
  t: "Fee installment due Nov 30",
  d: "3 days ago",
  tag: "Finance"
}, {
  t: "Library books renewal open",
  d: "Last week",
  tag: "Notice"
}];
const schedule = [{
  time: "09:00",
  course: "Full-Stack Development",
  room: "Lab 3",
  status: "done"
}, {
  time: "11:00",
  course: "Cloud & DevOps",
  room: "Room 204",
  status: "now"
}, {
  time: "14:00",
  course: "Data Structures",
  room: "Lab 1",
  status: "next"
}, {
  time: "16:00",
  course: "Mentor Hour — Priya R.",
  room: "Online",
  status: "next"
}];
function Dash() {
  const nav = useNavigate();
  const {
    user,
    loading,
    signOut
  } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email || "Student";
  const [openAction, setOpenAction] = useState(null);
  useEffect(() => {
    if (!loading && !user) {
      const timeout = window.setTimeout(() => {
        nav({
          to: "/student-login/sis",
          replace: true
        });
      }, 500);
      return () => window.clearTimeout(timeout);
    }
    return void 0;
  }, [loading, user, nav]);
  const avgAttendance = useMemo(() => Math.round(courses.reduce((a, c) => a + c.attendance, 0) / courses.length), []);
  async function logout() {
    await signOut();
    nav({
      to: "/student-login"
    });
  }
  if (loading || !user) return null;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-navy-deep text-white sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6 text-gold" }),
        /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: "KMR · SIS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-right hidden sm:block", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: user.user_metadata?.full_name || user.email }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-white/60", children: user.id })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-gold text-navy-deep grid place-items-center font-bold", children: (user.user_metadata?.full_name || user.email || "U").charAt(0) }),
        /* @__PURE__ */ jsx(DashThemeToggle, {}),
        /* @__PURE__ */ jsxs(Button, { onClick: logout, variant: "ghost", size: "sm", className: "text-white hover:bg-white/10", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-1" }),
          " Logout"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl md:text-3xl font-extrabold text-foreground", children: [
          "Welcome back, ",
          (user.user_metadata?.full_name || user.email || "Student").split(" ")[0],
          " 👋"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Semester 5 · Batch 2024" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [{
        i: Calendar,
        l: "Attendance",
        v: `${avgAttendance}%`,
        c: "bg-magenta/10 text-magenta"
      }, {
        i: TrendingUp,
        l: "CGPA",
        v: "8.7",
        c: "bg-navy/10 text-foreground"
      }, {
        i: BookOpen,
        l: "Active Courses",
        v: String(courses.length),
        c: "bg-gold/20 text-foreground"
      }, {
        i: Wallet,
        l: "Fees Due",
        v: "₹15,000",
        c: "bg-magenta/10 text-magenta"
      }].map((s, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-5 border border-border", children: [
        /* @__PURE__ */ jsx("div", { className: `h-10 w-10 rounded-lg grid place-items-center ${s.c} mb-3`, children: /* @__PURE__ */ jsx(s.i, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-foreground", children: s.v }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: s.l })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(CalendarDays, { className: "h-5 w-5" }),
                " Today's Schedule"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "4 classes" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: schedule.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-secondary", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-foreground w-14 flex items-center gap-1 shrink-0", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
                s.time
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground text-sm", children: s.course }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
                  s.room
                ] })
              ] }),
              s.status === "now" && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-magenta text-white animate-pulse shadow-md", children: "Live" }),
              s.status === "done" && /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-500" }),
              s.status === "next" && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gold/30 text-foreground", children: "Up next" })
            ] }, s.time)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }),
                " My Courses"
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: "View all" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: courses.map((c) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-secondary", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground truncate", children: c.name }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    c.code,
                    " · Attendance ",
                    c.attendance,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 rounded-full bg-gold/20 text-foreground text-xs font-bold shrink-0", children: c.grade })
              ] }),
              /* @__PURE__ */ jsx(Progress, { value: c.progress, className: "h-2" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                c.progress,
                "% complete"
              ] })
            ] }, c.code)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-gradient-hero text-white p-6 border border-border", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-gold" }),
              " Attendance"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-24 w-24", children: [
                /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 36 36", className: "h-24 w-24 -rotate-90", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "18", cy: "18", r: "15.9", fill: "none", stroke: "rgba(255,255,255,0.15)", strokeWidth: "3" }),
                  /* @__PURE__ */ jsx("circle", { cx: "18", cy: "18", r: "15.9", fill: "none", stroke: "oklch(0.83 0.16 85)", strokeWidth: "3", strokeDasharray: `${avgAttendance} 100`, strokeLinecap: "round" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 grid place-items-center text-xl font-extrabold", children: [
                  avgAttendance,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "text-white/80", children: "Above 75% required" }),
                /* @__PURE__ */ jsx("div", { className: "text-gold font-bold mt-1", children: "All clear ✓" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }),
              " Notices"
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: notices.map((n, i) => /* @__PURE__ */ jsxs("li", { className: "text-sm border-l-2 border-magenta pl-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-secondary text-magenta", children: n.tag }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: n.d })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground mt-0.5", children: n.t })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }),
              " Quick Actions"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
              /* @__PURE__ */ jsxs("button", { id: "qa-transcript", onClick: () => setOpenAction("transcript"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
                "Transcript"
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-fees", onClick: () => setOpenAction("fees"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(Wallet, { className: "h-4 w-4" }),
                "Pay Fees"
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-timetable", onClick: () => setOpenAction("timetable"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
                "Timetable"
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-profile", onClick: () => setOpenAction("profile"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                "Profile"
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-results", onClick: () => setOpenAction("results"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(ClipboardList, { className: "h-4 w-4" }),
                "Results"
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-idcard", onClick: () => setOpenAction("idcard"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(IdCard, { className: "h-4 w-4" }),
                "ID Card"
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-leave", onClick: () => setOpenAction("leave"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }),
                "Leave App."
              ] }),
              /* @__PURE__ */ jsxs("button", { id: "qa-feedback", onClick: () => setOpenAction("feedback"), className: "p-3 rounded-lg bg-secondary hover:bg-navy hover:text-white transition flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
                "Feedback"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "transcript", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
          " Academic Transcript"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Semester 1 – 4 grades summary" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 text-sm", children: [{
        s: 1,
        g: "8.42"
      }, {
        s: 2,
        g: "8.61"
      }, {
        s: 3,
        g: "8.74"
      }, {
        s: 4,
        g: "8.83"
      }].map((x) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-secondary", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Semester ",
          x.s
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-foreground", children: [
          "SGPA ",
          x.g
        ] })
      ] }, x.s)) }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
        toast.success("Transcript download started");
        setOpenAction(null);
      }, className: "bg-magenta hover:bg-magenta/90", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }),
        " Download PDF"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "fees", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }),
          " Pay Fees"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Outstanding installment for Semester 5" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-secondary p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Tuition installment" }),
          /* @__PURE__ */ jsx("span", { children: "₹15,000" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: "Due date" }),
          /* @__PURE__ */ jsx("span", { children: "Nov 30, 2026" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-base font-bold text-foreground mt-3 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { children: "₹15,000" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
        toast.success("Redirecting to payment gateway…");
        setOpenAction(null);
      }, className: "bg-magenta hover:bg-magenta/90", children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4 mr-1" }),
        " Pay now"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "timetable", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
        " Weekly Timetable"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1 text-sm", children: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d, i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-secondary", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: d }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: courses[i % courses.length].name })
      ] }, d)) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "profile", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }),
        " My Profile"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsx(Row, { k: "Name", v: displayName }),
        /* @__PURE__ */ jsx(Row, { k: "Student ID", v: user.id }),
        /* @__PURE__ */ jsx(Row, { k: "Program", v: "B.Tech CSE" }),
        /* @__PURE__ */ jsx(Row, { k: "Batch", v: "2024 – 2028" }),
        /* @__PURE__ */ jsx(Row, { k: "Email", v: `${displayName.split(" ")[0].toLowerCase()}@kmr.edu` }),
        /* @__PURE__ */ jsx(Row, { k: "Mentor", v: "Priya R." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "results", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ClipboardList, { className: "h-5 w-5" }),
          " Semester Results"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Internal & external marks for Semester 5" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 text-sm", children: courses.map((c) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-2 rounded bg-secondary", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: c.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: c.code })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 rounded-full bg-gold/20 text-foreground text-xs font-bold", children: c.grade }) })
      ] }, c.code)) }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
        toast.success("Results PDF download started");
        setOpenAction(null);
      }, className: "bg-magenta hover:bg-magenta/90", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }),
        " Download"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "idcard", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(IdCard, { className: "h-5 w-5" }),
          " Student ID Card"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Your official KMR Technologies identity card" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-gradient-to-br from-navy to-navy-deep text-white p-5 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-14 w-14 rounded-full bg-gold text-navy-deep grid place-items-center font-bold text-2xl", children: displayName.charAt(0) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-extrabold text-lg", children: displayName }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-white/70", children: user.id })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm pt-2 border-t border-white/10", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-white/60 text-xs", children: "Program" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "B.Tech CSE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-white/60 text-xs", children: "Batch" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "2024 – 2028" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-white/60 text-xs", children: "Semester" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "5" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-white/60 text-xs", children: "Valid Until" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "May 2028" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
        toast.success("ID Card PDF download started");
        setOpenAction(null);
      }, className: "bg-magenta hover:bg-magenta/90", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }),
        " Download ID Card"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "leave", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(BadgeCheck, { className: "h-5 w-5" }),
          " Leave Application"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Submit a leave request to your mentor" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Leave Type" }),
          /* @__PURE__ */ jsxs("select", { className: "mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold", children: [
            /* @__PURE__ */ jsx("option", { children: "Medical Leave" }),
            /* @__PURE__ */ jsx("option", { children: "Personal Leave" }),
            /* @__PURE__ */ jsx("option", { children: "Event / Hackathon" }),
            /* @__PURE__ */ jsx("option", { children: "Family Emergency" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "From Date" }),
            /* @__PURE__ */ jsx("input", { type: "date", className: "mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "To Date" }),
            /* @__PURE__ */ jsx("input", { type: "date", className: "mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Reason" }),
          /* @__PURE__ */ jsx("textarea", { rows: 3, placeholder: "Briefly describe the reason...", className: "mt-1 w-full rounded-lg bg-secondary border border-border p-2 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
        toast.success("Leave application submitted to mentor");
        setOpenAction(null);
      }, className: "bg-magenta hover:bg-magenta/90", children: [
        /* @__PURE__ */ jsx(Send, { className: "h-4 w-4 mr-1" }),
        " Submit Application"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: openAction === "feedback", onOpenChange: (o) => !o && setOpenAction(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5" }),
          " Course Feedback"
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Rate your courses for this semester" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 text-sm", children: courses.map((c) => /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-secondary space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: c.name }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx("button", { className: "text-gold hover:scale-110 transition", children: /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 fill-gold" }) }, star)) })
      ] }, c.code)) }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
        toast.success("Feedback submitted — thank you!");
        setOpenAction(null);
      }, className: "bg-magenta hover:bg-magenta/90", children: [
        /* @__PURE__ */ jsx(Send, { className: "h-4 w-4 mr-1" }),
        " Submit Feedback"
      ] }) })
    ] }) })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 rounded bg-secondary", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: v })
  ] });
}
export {
  Dash as component
};
