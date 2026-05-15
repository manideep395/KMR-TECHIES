import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { ShieldCheck, Database, GraduationCap, ArrowRight } from "lucide-react";
import { u as useT } from "./router-CjN-_vpS.js";
import "react";
import "sonner";
import "clsx";
import "tailwind-merge";
const sisImg = "/assets/sis-card-SrWg0ogp.png";
const lmsImg = "/assets/lms-card-CXVOSAfx.png";
function PortalCard({
  title,
  tag,
  desc,
  img,
  to,
  Icon,
  btnLabel
}) {
  return /* @__PURE__ */ jsxs("div", { className: "group relative rounded-3xl bg-card border border-border overflow-hidden shadow-elegant hover:-translate-y-1 hover:border-gold/40 transition-all duration-300 flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-white", style: {
      height: "260px"
    }, children: [
      /* @__PURE__ */ jsx("img", { src: img, alt: title, loading: "lazy", className: "absolute inset-0 w-full h-full object-contain object-center p-6" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-16 pointer-events-none", style: {
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.95) 70%, white)"
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-7 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-block self-start text-xs font-bold uppercase tracking-widest text-magenta mb-3 px-2.5 py-1 rounded-full bg-magenta/10", children: tag }),
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-extrabold text-foreground mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-magenta shrink-0" }),
        " ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6 leading-relaxed flex-1", children: desc }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, { to, className: "inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-bold text-white hover:bg-magenta/90 hover:gap-3 transition-all duration-200", children: [
        tag,
        " ",
        btnLabel,
        " ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] })
  ] });
}
function LoginLanding() {
  const {
    t
  } = useT();
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-hero text-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
        " ",
        t("sl.tag")
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mt-4", children: t("sl.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 mt-3 max-w-2xl mx-auto", children: t("sl.sub") })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8 max-w-5xl", children: [
      /* @__PURE__ */ jsx(PortalCard, { title: t("sl.sis.title"), tag: "SIS", desc: t("sl.sis.desc"), img: sisImg, to: "/student-login/sis", Icon: Database, btnLabel: t("sl.btn") }),
      /* @__PURE__ */ jsx(PortalCard, { title: t("sl.lms.title"), tag: "LMS", desc: t("sl.lms.desc"), img: lmsImg, to: "/student-login/lms", Icon: GraduationCap, btnLabel: t("sl.btn") })
    ] }) })
  ] });
}
export {
  LoginLanding as component
};
