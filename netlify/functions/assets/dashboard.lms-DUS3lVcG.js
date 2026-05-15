import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { GraduationCap, LogOut, BookOpen, ClipboardCheck, BarChart3, Video, PlayCircle, Calendar } from "lucide-react";
import { B as Button } from "./button-6iPTpLdE.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BUjzrCUX.js";
import { u as useT } from "./router-CjN-_vpS.js";
import { toast } from "sonner";
import { D as DashThemeToggle } from "./DashThemeToggle-2c_zWJwn.js";
import { u as useSharedStore } from "./store-UkDc-Tuf.js";
import { u as useAuth } from "./useAuth-D-q7nYcU.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-tabs";
import "clsx";
import "tailwind-merge";
import "./client-1Cs0bkRN.js";
import "@supabase/supabase-js";
const ASSESSMENTS = [{
  id: "a1",
  course: "Full-Stack",
  title: "React State Quiz",
  due: "Nov 12",
  status: "inProgress",
  score: null
}, {
  id: "a2",
  course: "Full-Stack",
  title: "Node Routing Lab",
  due: "Nov 18",
  status: "notStarted",
  score: null
}, {
  id: "a3",
  course: "AWS",
  title: "EC2 Hands-on",
  due: "Nov 20",
  status: "notStarted",
  score: null
}, {
  id: "a4",
  course: "Full-Stack",
  title: "JavaScript Fundamentals",
  due: "Oct 30",
  status: "completed",
  score: 92
}];
const LIVE = [{
  title: "MERN deployment masterclass",
  time: "Wed 6:00 PM IST",
  host: "Priya R."
}, {
  title: "AWS exam strategy",
  time: "Fri 7:30 PM IST",
  host: "Vikram S."
}];
function LMSDash() {
  const nav = useNavigate();
  const {
    t
  } = useT();
  const {
    user,
    loading,
    signOut
  } = useAuth();
  const {
    state,
    updateCourse
  } = useSharedStore();
  const COURSES = state.courses;
  const [activeId, setActiveId] = useState(COURSES[0]?.id || "");
  const active = COURSES.find((c) => c.id === activeId) || COURSES[0];
  useEffect(() => {
    if (!loading && !user) {
      const timeout = window.setTimeout(() => {
        nav({
          to: "/student-login/lms",
          replace: true
        });
      }, 500);
      return () => window.clearTimeout(timeout);
    }
    return void 0;
  }, [loading, user, nav]);
  async function logout() {
    await signOut();
    nav({
      to: "/student-login"
    });
  }
  if (loading || !user) return null;
  const overallProgress = (() => {
    const totals = COURSES.reduce((acc, c) => {
      acc.done += c.lessons.filter((l) => l.done).length;
      acc.total += c.lessons.length;
      return acc;
    }, {
      done: 0,
      total: 0
    });
    return totals.total > 0 ? Math.round(totals.done / totals.total * 100) : 0;
  })();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-navy-deep text-white sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6 text-gold" }),
        /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: "KMR · LMS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(DashThemeToggle, {}),
        /* @__PURE__ */ jsxs(Button, { onClick: logout, variant: "ghost", size: "sm", className: "text-white hover:bg-white/10", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-1" }),
          " ",
          t("dash.logout")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 lg:px-8 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl md:text-3xl font-extrabold text-foreground", children: [
          t("lms.welcome"),
          ", ",
          user.user_metadata?.full_name || user.email,
          " 👋"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: t("lms.continue") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx(StatCard, { icon: BookOpen, label: t("lms.mycourses"), value: String(COURSES.length), grad: "from-cyan-500 to-blue-600" }),
        /* @__PURE__ */ jsx(StatCard, { icon: ClipboardCheck, label: t("lms.assessments"), value: String(ASSESSMENTS.length), grad: "from-magenta to-rose-600" }),
        /* @__PURE__ */ jsx(StatCard, { icon: BarChart3, label: t("lms.progress"), value: `${overallProgress}%`, grad: "from-emerald-500 to-teal-600" }),
        /* @__PURE__ */ jsx(StatCard, { icon: Video, label: t("lms.upcoming"), value: String(LIVE.length), grad: "from-amber-500 to-orange-600" })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "courses", className: "bg-card rounded-2xl border border-border p-4", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid grid-cols-3 w-full md:w-auto", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "courses", children: t("lms.mycourses") }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "assessments", children: t("lms.assessments") }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "live", children: t("lms.upcoming") })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "courses", className: "mt-4 grid lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 grid sm:grid-cols-2 gap-4", children: COURSES.map((c) => {
            const done = c.lessons.filter((l) => l.done).length;
            const pct = Math.round(done / c.lessons.length * 100);
            const isActive = active.id === c.id;
            return /* @__PURE__ */ jsxs("button", { onClick: () => setActiveId(c.id), className: `text-left rounded-2xl overflow-hidden border-2 transition ${isActive ? "border-magenta shadow-elegant" : "border-border hover:border-magenta/50"}`, children: [
              /* @__PURE__ */ jsx("div", { className: "h-24 grid place-items-center text-white", style: {
                background: c.thumb
              }, children: /* @__PURE__ */ jsx(PlayCircle, { className: "h-10 w-10 opacity-90" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold tracking-wider text-magenta", children: c.track }),
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground mt-1", children: c.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-2", children: [
                  done,
                  "/",
                  c.lessons.length,
                  " ",
                  t("lms.lessons")
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-secondary rounded-full mt-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-magenta rounded-full", style: {
                  width: `${pct}%`
                } }) })
              ] })
            ] }, c.id);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-secondary/40 border border-border p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-xl bg-navy-deep grid place-items-center text-white", children: /* @__PURE__ */ jsx(PlayCircle, { className: "h-14 w-14 text-gold" }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: t("lms.player.title") }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-foreground", children: active?.name })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-1 max-h-64 overflow-auto pr-1", children: active?.lessons?.map((l, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card transition", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: l.done, onChange: () => {
                const newLessons = [...active.lessons];
                newLessons[i] = {
                  ...l,
                  done: !l.done
                };
                updateCourse(active.id, {
                  lessons: newLessons
                });
              }, className: "accent-magenta" }),
              /* @__PURE__ */ jsx("span", { className: `flex-1 text-sm ${l.done ? "line-through text-muted-foreground" : "text-foreground"}`, children: l.title }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: l.duration })
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "assessments", className: "mt-4 space-y-3", children: ASSESSMENTS.map((a) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-secondary/40", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-foreground", children: a.title }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              a.course,
              " · ",
              t("lms.due"),
              ": ",
              a.due
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: a.status === "completed" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-emerald-600", children: [
              t("lms.score"),
              ": ",
              a.score,
              "%"
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => toast.info(a.title), children: t("lms.review") })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded-full ${a.status === "inProgress" ? "bg-cyan-100 text-cyan-700" : "bg-amber-100 text-amber-700"}`, children: a.status === "inProgress" ? t("lms.inProgress") : t("lms.notStarted") }),
            /* @__PURE__ */ jsx(Button, { size: "sm", className: "bg-magenta hover:bg-magenta/90 text-white", onClick: () => toast.success(a.title), children: a.status === "inProgress" ? t("lms.resume") : t("lms.start") })
          ] }) })
        ] }, a.id)) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "live", className: "mt-4 grid md:grid-cols-2 gap-4", children: LIVE.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-secondary/40 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-magenta mb-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: "Live" })
          ] }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-foreground", children: s.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            s.time,
            " · ",
            s.host
          ] }),
          /* @__PURE__ */ jsx(Button, { className: "mt-4 bg-magenta hover:bg-magenta/90 text-white rounded-full", onClick: () => toast.success(s.title), children: t("lms.join") })
        ] }, i)) })
      ] })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  grad
}) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl bg-gradient-to-br ${grad} text-white p-5 shadow-md`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7 opacity-90 mb-3" }),
    /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold", children: value }),
    /* @__PURE__ */ jsx("div", { className: "text-xs opacity-90 mt-1", children: label })
  ] });
}
export {
  LMSDash as component
};
