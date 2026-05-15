import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { Sparkles, Loader2, Clock, Award, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { u as useT } from "./router-CjN-_vpS.js";
import { u as useRealtimeData } from "./useRealtimeData-Cfb7rj-g.js";
function CourseListPage({ title, tag, intro, category, slug }) {
  const { t } = useT();
  const { data: items, loading, error } = useRealtimeData(category);
  if (loading) {
    return /* @__PURE__ */ jsxs(SiteLayout, { children: [
      /* @__PURE__ */ jsx("section", { className: "bg-navy text-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-gold/20 text-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " ",
          tag
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mt-4", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 max-w-2xl text-lg mt-3", children: intro })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8 flex justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-magenta" }) }) })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-red-500", children: [
      "Error loading data: ",
      error
    ] }) }) }) });
  }
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-navy text-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-gold/20 text-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        " ",
        tag
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mt-4", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 max-w-2xl text-lg mt-3", children: intro })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-6", children: items.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6 hover:shadow-elegant hover:-translate-y-0.5 transition", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground", children: item.title }),
        /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-bold whitespace-nowrap", children: item.price ? `₹${item.price}` : "Contact for pricing" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-xs text-muted-foreground mb-4", children: [
        item.duration && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
          " ",
          item.duration
        ] }),
        "level" in item && item.level && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Award, { className: "h-3.5 w-3.5" }),
          " ",
          item.level
        ] }),
        "type" in item && item.type && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Award, { className: "h-3.5 w-3.5" }),
          " ",
          item.type
        ] })
      ] }),
      item.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-5 line-clamp-3", children: item.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/enroll/$category/$courseId",
            params: { category: slug, courseId: item.id },
            className: "inline-flex items-center gap-2 rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90 transition",
            children: [
              t("clp.enroll"),
              " ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 text-sm font-bold text-magenta hover:gap-3 transition-all", children: [
          t("clp.enquire"),
          " ",
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }, item.id)) }) })
  ] });
}
export {
  CourseListPage as C
};
