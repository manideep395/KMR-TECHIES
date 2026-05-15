import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { u as useT } from "./router-CjN-_vpS.js";
import "react";
import "@tanstack/react-router";
import "sonner";
import "clsx";
import "tailwind-merge";
function KmrCareers() {
  const {
    t
  } = useT();
  const jobs = [{
    t: "Senior Full-Stack Engineer",
    l: "Bengaluru",
    type: t("ck.fulltime")
  }, {
    t: "Curriculum Designer — Cloud",
    l: t("ck.remote"),
    type: t("ck.fulltime")
  }, {
    t: "Placement Officer",
    l: "Hyderabad",
    type: t("ck.fulltime")
  }, {
    t: "Marketing Manager",
    l: "Bengaluru",
    type: t("ck.fulltime")
  }];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-navy text-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mb-3", children: t("ck.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 max-w-2xl text-lg", children: t("ck.intro") })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: jobs.map((j) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6 flex flex-wrap items-center justify-between gap-4 hover:shadow-elegant transition", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-navy text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Briefcase, { className: "h-5 w-5 text-magenta" }),
          " ",
          j.t
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-1 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            " ",
            j.l
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
            " ",
            j.type
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90", children: t("ck.apply") })
    ] }, j.t)) }) })
  ] });
}
export {
  KmrCareers as component
};
