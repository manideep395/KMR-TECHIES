import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { Users, Award, Target, Sparkles } from "lucide-react";
import { u as useT } from "./router-CjN-_vpS.js";
import "react";
import "@tanstack/react-router";
import "sonner";
import "clsx";
import "tailwind-merge";
function AboutPage() {
  const {
    t
  } = useT();
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-navy text-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4", children: t("about.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 max-w-2xl text-lg", children: t("about.intro") })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-foreground mb-4", children: t("about.mission") }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: t("about.mission.p1") }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: t("about.mission.p2") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [{
        i: Users,
        n: "25k+",
        l: t("stats.learners")
      }, {
        i: Award,
        n: "150+",
        l: t("stats.partners")
      }, {
        i: Target,
        n: "92%",
        l: t("stats.placement")
      }, {
        i: Sparkles,
        n: "40+",
        l: t("about.stat.programs")
      }].map((s, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6", children: [
        /* @__PURE__ */ jsx(s.i, { className: "h-8 w-8 text-magenta mb-3" }),
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-foreground", children: s.n }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: s.l })
      ] }, i)) })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
