import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { Plane, Languages, ShieldCheck, Globe2 } from "lucide-react";
import { u as useT } from "./router-CjN-_vpS.js";
import "react";
import "@tanstack/react-router";
import "sonner";
import "clsx";
import "tailwind-merge";
const countries = [{
  c: "🇩🇪 Germany",
  roles: "Mechatronics, IT, Healthcare",
  stipend: "€1,200/mo"
}, {
  c: "🇯🇵 Japan",
  roles: "Manufacturing, IT, Caregiving",
  stipend: "¥160,000/mo"
}, {
  c: "🇦🇪 UAE",
  roles: "Hospitality, Retail, IT",
  stipend: "AED 3,500/mo"
}, {
  c: "🇦🇺 Australia",
  roles: "Construction, IT, Health",
  stipend: "AUD 2,200/mo"
}];
function Abroad() {
  const {
    t
  } = useT();
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-hero text-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur", children: [
        /* @__PURE__ */ jsx(Plane, { className: "h-4 w-4 text-gold" }),
        " ",
        t("cab.tag")
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mt-4", children: t("cab.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 max-w-2xl text-lg mt-3", children: t("cab.intro") })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 mb-12", children: [{
        i: Languages,
        t: t("cab.f1.title"),
        d: t("cab.f1.desc")
      }, {
        i: ShieldCheck,
        t: t("cab.f2.title"),
        d: t("cab.f2.desc")
      }, {
        i: Globe2,
        t: t("cab.f3.title"),
        d: t("cab.f3.desc")
      }].map((f, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6", children: [
        /* @__PURE__ */ jsx(f.i, { className: "h-8 w-8 text-magenta mb-3" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-navy", children: f.t }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: f.d })
      ] }, i)) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-navy mb-4", children: t("cab.openDest") }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: countries.map((c) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-navy", children: c.c }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: c.roles })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: t("cab.stipend") }),
          /* @__PURE__ */ jsx("div", { className: "font-bold text-magenta", children: c.stipend })
        ] })
      ] }, c.c)) })
    ] })
  ] });
}
export {
  Abroad as component
};
