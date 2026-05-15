import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Wallet, Calendar, Ticket, BarChart3, GraduationCap, LogOut, User, Bell } from "lucide-react";
import { B as Button } from "./button-6iPTpLdE.js";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { u as useT } from "./router-CjN-_vpS.js";
import { toast } from "sonner";
import { D as DashThemeToggle } from "./DashThemeToggle-2c_zWJwn.js";
import { u as useSharedStore } from "./store-UkDc-Tuf.js";
import { u as useAuth } from "./useAuth-D-q7nYcU.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./client-1Cs0bkRN.js";
import "@supabase/supabase-js";
const PERF = [{
  m: "Jun",
  score: 72
}, {
  m: "Jul",
  score: 78
}, {
  m: "Aug",
  score: 81
}, {
  m: "Sep",
  score: 76
}, {
  m: "Oct",
  score: 88
}, {
  m: "Nov",
  score: 92
}];
function Radial({
  value
}) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const off = c - value / 100 * c;
  return /* @__PURE__ */ jsxs("div", { className: "relative h-36 w-36", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 120 120", className: "h-36 w-36 -rotate-90", children: [
      /* @__PURE__ */ jsx("circle", { cx: "60", cy: "60", r, fill: "none", stroke: "hsl(var(--secondary))", strokeWidth: "10" }),
      /* @__PURE__ */ jsx("circle", { cx: "60", cy: "60", r, fill: "none", stroke: "#06B6D4", strokeWidth: "10", strokeDasharray: c, strokeDashoffset: off, strokeLinecap: "round" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-foreground", children: [
      value,
      "%"
    ] }) })
  ] });
}
function StudentDash() {
  const nav = useNavigate();
  const {
    t
  } = useT();
  const {
    user,
    signOut,
    loading
  } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      nav({
        to: "/student-login/sis"
      });
    }
  }, [user, loading, nav]);
  async function logout() {
    await signOut();
    nav({
      to: "/student-login"
    });
  }
  if (loading || !user) return null;
  const {
    state
  } = useSharedStore();
  const myStudent = state.students.find((s) => s.id === user.id);
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
  const actions = [{
    i: Wallet,
    l: t("dash.fee"),
    c: "from-cyan-500 to-blue-600",
    onClick: () => toast.success(t("dash.fee"))
  }, {
    i: Calendar,
    l: t("dash.attendance"),
    c: "from-magenta to-rose-600",
    onClick: () => toast.success(t("dash.attendance") + ": 92%")
  }, {
    i: Ticket,
    l: t("dash.hallTicket"),
    c: "from-amber-500 to-orange-600",
    onClick: () => toast.success(t("dash.hallTicket"))
  }, {
    i: BarChart3,
    l: t("dash.results"),
    c: "from-emerald-500 to-teal-600",
    onClick: () => toast.success(t("dash.results"))
  }];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-navy-deep text-white sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6 text-gold" }),
        /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: "KMR · SIS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-right hidden sm:block", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: profile.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-white/60", children: profile.id })
        ] }),
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
          t("dash.welcome"),
          ", ",
          profile.name.split(" ")[0],
          " 👋"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
          profile.program,
          " · ",
          t("dash.semester"),
          " ",
          profile.semester
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }),
            " ",
            t("dash.profile")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white text-xl font-extrabold", children: profile.name.split(" ").map((n) => n[0]).join("") }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-foreground", children: profile.name }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: profile.id })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "text-sm space-y-2", children: [
            /* @__PURE__ */ jsx(Row, { k: t("dash.program"), v: profile.program }),
            /* @__PURE__ */ jsx(Row, { k: t("dash.semester"), v: profile.semester }),
            /* @__PURE__ */ jsx(Row, { k: "CGPA", v: "8.7 / 10" }),
            /* @__PURE__ */ jsx(Row, { k: t("dash.attendance"), v: "92%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-foreground mb-4 self-start", children: t("dash.progress") }),
          /* @__PURE__ */ jsx(Radial, { value: 75 }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-3", children: t("dash.syllabus") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }),
            " ",
            t("dash.notices")
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm", children: [{
            tag: "Exam",
            t: "Mid-term schedule released"
          }, {
            tag: "Event",
            t: "Industry mentor session Friday 5pm"
          }, {
            tag: "Finance",
            t: "Fee installment due Nov 30"
          }].map((n, i) => /* @__PURE__ */ jsxs("li", { className: "border-l-2 border-cyan-500 pl-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-secondary text-cyan-600 mr-2", children: n.tag }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: n.t })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-foreground mb-4", children: t("dash.performance") }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: PERF, margin: {
          top: 10,
          right: 20,
          left: 0,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "m" }),
          /* @__PURE__ */ jsx(YAxis, { domain: [60, 100] }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "score", stroke: "#06B6D4", strokeWidth: 3, dot: {
            r: 5,
            fill: "#06B6D4"
          }, activeDot: {
            r: 7
          } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-6 border border-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-foreground mb-4", children: t("dash.actions") }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: actions.map((a, i) => /* @__PURE__ */ jsxs("button", { onClick: a.onClick, className: `group relative rounded-2xl bg-gradient-to-br ${a.c} text-white p-5 text-left hover:scale-[1.02] transition-transform shadow-md`, children: [
          /* @__PURE__ */ jsx(a.i, { className: "h-7 w-7 mb-3 opacity-90" }),
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: a.l })
        ] }, i)) })
      ] })
    ] })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-border/60 py-1.5", children: [
    /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsx("dd", { className: "font-semibold text-foreground", children: v })
  ] });
}
export {
  StudentDash as component
};
