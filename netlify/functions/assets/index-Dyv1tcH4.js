import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { Code2, Cloud, BarChart3, Zap, Globe, Lightbulb, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Briefcase, Building2, Award, Users, TrendingUp, ShieldCheck, Star } from "lucide-react";
import { u as useT } from "./router-CjN-_vpS.js";
import "sonner";
import "clsx";
import "tailwind-merge";
const heroImg = "/assets/hero-C3_jknLy.jpg";
const heroCareer = "/assets/hero-career-8lpxQgfj.png";
const heroPlacement = "/assets/hero-placement-eUvRvmkS.png";
const heroSkillIndia = "/assets/hero-skillindia-2-2z9YQS.png";
const carouselClassroom = "/assets/carousel-classroom-D54YTTwu.png";
const carouselWorkshop = "/assets/carousel-workshop-C-CPdXOs.png";
const carouselPlacement = "/assets/carousel-placement-C6GNVnlX.png";
const HERO_IMAGES = [heroCareer, heroPlacement, heroSkillIndia];
const GALLERY_IMGS = [carouselClassroom, carouselWorkshop, carouselPlacement];
const HIGHLIGHT_ICONS = [Code2, Cloud, BarChart3, Zap, Globe, Lightbulb];
function Home() {
  const {
    t
  } = useT();
  const GALLERY = [{
    src: GALLERY_IMGS[0],
    title: t("gallery.card1.title"),
    desc: t("gallery.card1.desc")
  }, {
    src: GALLERY_IMGS[1],
    title: t("gallery.card2.title"),
    desc: t("gallery.card2.desc")
  }, {
    src: GALLERY_IMGS[2],
    title: t("gallery.card3.title"),
    desc: t("gallery.card3.desc")
  }];
  const HIGHLIGHTS = [{
    icon: HIGHLIGHT_ICONS[0],
    title: t("highlights.h1.title"),
    desc: t("highlights.h1.desc")
  }, {
    icon: HIGHLIGHT_ICONS[1],
    title: t("highlights.h2.title"),
    desc: t("highlights.h2.desc")
  }, {
    icon: HIGHLIGHT_ICONS[2],
    title: t("highlights.h3.title"),
    desc: t("highlights.h3.desc")
  }, {
    icon: HIGHLIGHT_ICONS[3],
    title: t("highlights.h4.title"),
    desc: t("highlights.h4.desc")
  }, {
    icon: HIGHLIGHT_ICONS[4],
    title: t("highlights.h5.title"),
    desc: t("highlights.h5.desc")
  }, {
    icon: HIGHLIGHT_ICONS[5],
    title: t("highlights.h6.title"),
    desc: t("highlights.h6.desc")
  }];
  const slides = [{
    eyebrow: t("hero.eyebrow1"),
    title: t("hero.title1"),
    sub: t("hero.sub1")
  }, {
    eyebrow: t("hero.eyebrow2"),
    title: t("hero.title2"),
    sub: t("hero.sub2")
  }, {
    eyebrow: t("hero.eyebrow3"),
    title: t("hero.title3"),
    sub: t("hero.sub3")
  }];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const tm = setInterval(() => setI((p) => (p + 1) % slides.length), 6e3);
    return () => clearInterval(tm);
  }, [slides.length, paused]);
  const go = (next) => {
    setPaused(true);
    setI((next + slides.length) % slides.length);
  };
  const s = slides[i];
  const scrollRef = useRef(null);
  const [galIdx, setGalIdx] = useState(0);
  const galAuto = useRef(null);
  const scrollToCard = useCallback((idx) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[idx];
    if (card) {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: cardLeft - (containerWidth - cardWidth) / 2,
        behavior: "smooth"
      });
    }
    setGalIdx(idx);
  }, []);
  const galPrev = () => {
    const n = (galIdx - 1 + GALLERY.length) % GALLERY.length;
    scrollToCard(n);
  };
  const galNext = useCallback(() => {
    const n = (galIdx + 1) % GALLERY.length;
    scrollToCard(n);
  }, [galIdx, scrollToCard]);
  useEffect(() => {
    galAuto.current = setInterval(galNext, 4e3);
    return () => {
      if (galAuto.current) clearInterval(galAuto.current);
    };
  }, [galNext]);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-gradient-hero text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-15", children: /* @__PURE__ */ jsx("img", { src: heroImg, alt: "", width: 1536, height: 1024, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/85 to-navy-deep/40" }),
      /* @__PURE__ */ jsxs("div", { className: "relative container mx-auto px-4 lg:px-8 py-12 md:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold border border-white/15", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-gold" }),
            " ",
            s.eyebrow
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-extrabold leading-tight mt-5", children: [
            s.title.split(" ").slice(0, -1).join(" "),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gold", children: s.title.split(" ").slice(-1) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 mt-5 max-w-xl", children: s.sub }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-8", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/courses/job-guaranteed", className: "inline-flex items-center justify-center gap-2 rounded-full bg-magenta hover:bg-magenta/90 px-7 py-3.5 font-bold text-white shadow-lg transition", children: [
              t("hero.exploreCourses"),
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/student-login", className: "inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-7 py-3.5 font-bold text-white border border-white/20 transition", children: t("nav.studentLogin") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-10", children: slides.map((_, idx) => /* @__PURE__ */ jsx("button", { onClick: () => go(idx), className: `h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-gold" : "w-4 bg-white/30"}`, "aria-label": `Slide ${idx + 1}` }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:block relative h-[420px]", children: [
          HERO_IMAGES.map((img, idx) => /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 transition-all duration-700 ease-in-out", style: {
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "translateX(0) scale(1)" : idx < i ? "translateX(-80px) scale(0.92)" : "translateX(80px) scale(0.92)"
          }, children: [
            /* @__PURE__ */ jsx("img", { src: img, alt: slides[idx]?.eyebrow || "", className: "w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/10" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 bg-navy-deep/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gold", children: slides[idx]?.eyebrow }) })
          ] }, idx)),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gold/10 blur-2xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-magenta/10 blur-2xl" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-navy-deep py-12 md:py-16 border-b border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-extrabold text-white", children: t("mission.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-white/70 mt-4 max-w-3xl mx-auto", children: t("mission.sub") }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12 max-w-4xl mx-auto", children: [{
        n: "25k+",
        l: t("stats.learners")
      }, {
        n: "150+",
        l: t("stats.partners")
      }, {
        n: "92%",
        l: t("stats.placement")
      }, {
        n: "12 LPA",
        l: t("stats.ctc")
      }].map((s2) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-extrabold text-gold", children: s2.n }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-white/70 mt-1", children: s2.l })
      ] }, s2.l)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "gallery", className: "py-12 md:py-20 overflow-hidden bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-widest text-gold", children: t("gallery.eyebrow") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-foreground mt-2", children: t("gallery.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3", children: t("gallery.sub") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsx("div", { ref: scrollRef, className: "flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none", style: {
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }, children: GALLERY.map((img, idx) => /* @__PURE__ */ jsx("div", { className: "min-w-[85%] sm:min-w-[60%] lg:min-w-[38%] snap-center flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden shadow-elegant border border-border bg-card transition-transform hover:scale-[1.02] hover:shadow-2xl", children: [
          /* @__PURE__ */ jsx("img", { src: img.src, alt: img.title, className: "w-full h-56 md:h-64 object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground text-lg", children: img.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1.5 leading-relaxed", children: img.desc })
          ] })
        ] }) }, idx)) }),
        /* @__PURE__ */ jsx("button", { onClick: galPrev, "aria-label": "Previous", className: "absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 backdrop-blur border border-border shadow-elegant grid place-items-center text-foreground hover:bg-gold hover:text-navy-deep transition opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("button", { onClick: galNext, "aria-label": "Next", className: "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 backdrop-blur border border-border shadow-elegant grid place-items-center text-foreground hover:bg-gold hover:text-navy-deep transition opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-5", children: GALLERY.map((_, idx) => /* @__PURE__ */ jsx("button", { onClick: () => scrollToCard(idx), className: `h-2 rounded-full transition-all ${idx === galIdx ? "w-8 bg-gold" : "w-3 bg-muted-foreground/30"}`, "aria-label": `Gallery slide ${idx + 1}` }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-widest text-gold", children: t("programs.eyebrow") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-foreground mt-2", children: t("programs.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3", children: t("programs.sub") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: [{
        to: "/courses/job-guaranteed",
        icon: Briefcase,
        title: t("programs.jobg.title"),
        desc: t("programs.jobg.desc"),
        cta: t("programs.explore")
      }, {
        to: "/courses/govt-sponsored",
        icon: Building2,
        title: t("programs.govt.title"),
        desc: t("programs.govt.desc"),
        cta: t("programs.explore")
      }, {
        to: "/courses/certification",
        icon: Award,
        title: t("programs.cert.title"),
        desc: t("programs.cert.desc"),
        cta: t("programs.explore")
      }, {
        to: "/courses/academic",
        icon: Award,
        title: t("programs.acad.title"),
        desc: t("programs.acad.desc"),
        cta: t("programs.view")
      }].map((p) => /* @__PURE__ */ jsxs(Link, { to: p.to, className: "group relative rounded-3xl p-8 min-h-[15rem] flex flex-col justify-between overflow-hidden border border-white/10 hover:border-gold/40 hover:shadow-elegant hover:-translate-y-0.5 transition bg-gradient-to-br from-navy to-navy-deep text-white", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(p.icon, { className: "h-10 w-10 mb-3 text-gold" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold", children: p.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm max-w-md text-white/75", children: p.desc })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "mt-6 inline-flex items-center gap-1 text-sm font-bold text-gold group-hover:gap-2 transition-all", children: [
          p.cta,
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }, p.to)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-20 border-y border-border bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-widest text-gold", children: t("highlights.eyebrow") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-foreground mt-2", children: t("highlights.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3", children: t("highlights.sub") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: HIGHLIGHTS.map((h, idx) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-elegant hover:-translate-y-0.5 transition group", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center mb-4 group-hover:bg-gold/25 transition", children: /* @__PURE__ */ jsx(h.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground text-lg", children: h.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: h.desc })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-navy-deep py-12 md:py-20 border-y border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-widest text-gold", children: t("why.eyebrow") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mt-2", children: t("why.title") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: [{
        i: Users,
        t: t("why.f1.title"),
        d: t("why.f1.desc")
      }, {
        i: TrendingUp,
        t: t("why.f2.title"),
        d: t("why.f2.desc")
      }, {
        i: ShieldCheck,
        t: t("why.f3.title"),
        d: t("why.f3.desc")
      }].map((f) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-gold/40 transition", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center mb-4", children: /* @__PURE__ */ jsx(f.i, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: f.t }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70 mt-1", children: f.d })
      ] }, f.t)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-widest text-gold", children: t("testi.eyebrow") }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-foreground mt-2", children: t("testi.title") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: [{
        n: "Priya R.",
        r: t("testi.role1"),
        q: t("testi.q1")
      }, {
        n: "Arjun M.",
        r: t("testi.role2"),
        q: t("testi.q2")
      }, {
        n: "Sana K.",
        r: t("testi.role3"),
        q: t("testi.q3")
      }].map((t2) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-elegant transition", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 text-gold mb-3", children: Array.from({
          length: 5
        }).map((_, i2) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, i2)) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-foreground/90 italic", children: [
          '"',
          t2.q,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-gold text-sm", children: t2.n }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: t2.r })
        ] })
      ] }, t2.n)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-background pb-12 md:pb-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-gradient-hero p-8 md:p-14 text-white text-center shadow-elegant", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold", children: t("cta.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 mt-3 max-w-xl mx-auto", children: t("cta.sub") }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-3 mt-7", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "rounded-full bg-magenta hover:bg-magenta/90 px-7 py-3.5 font-bold flex justify-center items-center", children: t("cta.talk") }),
        /* @__PURE__ */ jsx(Link, { to: "/courses/job-guaranteed", className: "rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-7 py-3.5 font-bold flex justify-center items-center", children: t("cta.browse") })
      ] })
    ] }) }) })
  ] });
}
export {
  Home as component
};
