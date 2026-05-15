import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Briefcase, Building2, Award, BookOpen, Plane, LogIn, X, Menu, ChevronDown, Sun, Moon, Globe, Facebook, Linkedin, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { u as useT, c as cn, a as useTheme, L as LANGUAGES } from "./router-CjN-_vpS.js";
const kmrLogo = "/assets/kmr-logo-ByOCYS4c.png";
function LangSwitcher({ mobile = false }) {
  const { lang, setLang } = useT();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsxs("button", { className: cn(
      "flex items-center gap-1.5 rounded-full text-sm font-semibold transition-colors",
      mobile ? "px-3 py-2 bg-white/10 text-white w-full justify-between" : "px-3 py-2 text-white/90 hover:text-gold"
    ), children: [
      /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }),
      " ",
      current.native,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: cn(
      "absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
      mobile && "left-0 right-auto"
    ), children: /* @__PURE__ */ jsx("div", { className: "w-44 rounded-xl bg-navy-deep shadow-elegant border border-white/10 p-1.5", children: LANGUAGES.map((l) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setLang(l.code),
        className: cn(
          "w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/10 flex items-center justify-between",
          lang === l.code && "bg-white/10 text-gold font-bold"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: l.native }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-white/60", children: l.label })
        ]
      },
      l.code
    )) }) })
  ] });
}
function NavDropdown({ label, items }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors", children: [
      label,
      " ",
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 transition-transform group-hover:rotate-180" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50", children: /* @__PURE__ */ jsx("div", { className: "w-[420px] rounded-xl bg-navy-deep shadow-elegant border border-white/10 p-3", children: /* @__PURE__ */ jsx("div", { className: "grid gap-1", children: items.map((it) => /* @__PURE__ */ jsxs(Link, { to: it.to, className: "flex gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold shrink-0", children: /* @__PURE__ */ jsx(it.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold text-white text-sm", children: it.title }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-white/60", children: it.desc })
      ] })
    ] }, it.to)) }) }) })
  ] });
}
function ThemeToggle({ mobile = false }) {
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleTheme,
      "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      className: cn(
        "rounded-full transition-all duration-300",
        mobile ? "p-2.5 bg-white/10 text-white w-full flex items-center justify-center gap-2" : "p-2 text-white/90 hover:text-gold hover:bg-white/10"
      ),
      children: [
        theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }),
        mobile && /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: theme === "dark" ? "Light Mode" : "Dark Mode" })
      ]
    }
  );
}
function Header() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const courseItems = [
    { title: t("courses.jobGuaranteed"), desc: t("courses.jobGuaranteed.desc"), icon: Briefcase, to: "/courses/job-guaranteed" },
    { title: t("courses.govt"), desc: t("courses.govt.desc"), icon: Building2, to: "/courses/govt-sponsored" },
    { title: t("courses.cert"), desc: t("courses.cert.desc"), icon: Award, to: "/courses/certification" },
    { title: t("courses.academic"), desc: t("courses.academic.desc"), icon: BookOpen, to: "/courses/academic" }
  ];
  const careerItems = [
    { title: t("careers.kmr"), desc: t("careers.kmr.desc"), icon: Briefcase, to: "/careers/kmr" },
    { title: t("careers.abroad"), desc: t("careers.abroad.desc"), icon: Plane, to: "/careers/apprenticeship-abroad" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 bg-navy-deep/95 backdrop-blur-md border-b border-white/10", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 lg:h-20 items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: kmrLogo,
            alt: "Karthikeya Educational Society",
            className: "h-10 w-10 rounded-full object-contain bg-white p-0.5 shadow-md"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "text-white font-extrabold text-lg tracking-tight", children: "KMR" }),
          /* @__PURE__ */ jsx("div", { className: "text-gold text-[10px] font-semibold uppercase tracking-widest", children: "Technologies" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden lg:flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", activeOptions: { exact: true }, className: "px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors", activeProps: { className: "text-gold" }, children: t("nav.home") }),
        /* @__PURE__ */ jsx(NavDropdown, { label: t("nav.courses"), items: courseItems }),
        /* @__PURE__ */ jsx(NavDropdown, { label: t("nav.careers"), items: careerItems }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors", activeProps: { className: "text-gold" }, children: t("nav.about") }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors", activeProps: { className: "text-gold" }, children: t("nav.contact") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsx(LangSwitcher, {})
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/student-login", className: "hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy-deep hover:brightness-110 transition shadow-md", children: [
          /* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4" }),
          " ",
          t("nav.studentLogin")
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "lg:hidden p-2 text-white", "aria-label": t("nav.menu"), children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: cn("lg:hidden overflow-hidden transition-all duration-300", open ? "max-h-[90vh]" : "max-h-0"), children: /* @__PURE__ */ jsxs("div", { className: "px-4 pb-4 space-y-1 bg-navy-deep", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => setOpen(false), className: "block px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10", children: t("nav.home") }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setCoursesOpen(!coursesOpen), className: "flex w-full items-center justify-between px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10", children: [
        t("nav.courses"),
        " ",
        /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 transition", coursesOpen && "rotate-180") })
      ] }),
      coursesOpen && /* @__PURE__ */ jsx("div", { className: "pl-3 space-y-1", children: courseItems.map((i) => /* @__PURE__ */ jsx(Link, { to: i.to, onClick: () => setOpen(false), className: "block px-3 py-2 text-sm text-white/80 rounded-lg hover:bg-white/10", children: i.title }, i.to)) }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setCareersOpen(!careersOpen), className: "flex w-full items-center justify-between px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10", children: [
        t("nav.careers"),
        " ",
        /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 transition", careersOpen && "rotate-180") })
      ] }),
      careersOpen && /* @__PURE__ */ jsx("div", { className: "pl-3 space-y-1", children: careerItems.map((i) => /* @__PURE__ */ jsx(Link, { to: i.to, onClick: () => setOpen(false), className: "block px-3 py-2 text-sm text-white/80 rounded-lg hover:bg-white/10", children: i.title }, i.to)) }),
      /* @__PURE__ */ jsx(Link, { to: "/about", onClick: () => setOpen(false), className: "block px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10", children: t("nav.about") }),
      /* @__PURE__ */ jsx(Link, { to: "/contact", onClick: () => setOpen(false), className: "block px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10", children: t("nav.contact") }),
      /* @__PURE__ */ jsxs("div", { className: "pt-2 space-y-2", children: [
        /* @__PURE__ */ jsx(ThemeToggle, { mobile: true }),
        /* @__PURE__ */ jsx(LangSwitcher, { mobile: true })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/student-login", onClick: () => setOpen(false), className: "block text-center mt-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy-deep", children: t("nav.studentLogin") })
    ] }) })
  ] });
}
function Footer() {
  const { t } = useT();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear((/* @__PURE__ */ new Date()).getFullYear()), []);
  return /* @__PURE__ */ jsxs("footer", { className: "bg-navy-deep text-white/80", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: kmrLogo,
              alt: "Karthikeya Educational Society",
              className: "h-12 w-12 rounded-full object-contain bg-white p-0.5 shadow-md"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-white font-extrabold", children: "KMR" }),
            /* @__PURE__ */ jsx("div", { className: "text-gold text-[10px] font-semibold uppercase tracking-widest", children: "Technologies" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: t("footer.tagline") }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-3 mt-4", children: [Facebook, Linkedin, Twitter, Instagram].map((I, i) => /* @__PURE__ */ jsx("a", { href: "#", className: "h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep grid place-items-center transition", children: /* @__PURE__ */ jsx(I, { className: "h-4 w-4" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: t("footer.courses") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/courses/job-guaranteed", className: "hover:text-gold", children: t("courses.jobGuaranteed") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/courses/govt-sponsored", className: "hover:text-gold", children: t("courses.govt") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/courses/certification", className: "hover:text-gold", children: t("courses.cert") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/courses/academic", className: "hover:text-gold", children: t("courses.academic") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: t("footer.company") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-gold", children: t("nav.about") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/careers/kmr", className: "hover:text-gold", children: t("careers.kmr") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/careers/apprenticeship-abroad", className: "hover:text-gold", children: t("careers.abroad") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-gold", children: t("nav.contact") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: t("footer.contact") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Bengaluru, Karnataka, India" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-gold" }),
            /* @__PURE__ */ jsx("span", { children: "+91 80 1234 5678" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-gold" }),
            /* @__PURE__ */ jsx("span", { children: "hello@kmrtech.in" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/10 py-5 text-center text-xs text-white/60", children: [
      "© ",
      year,
      " KMR Technologies. ",
      t("footer.rights")
    ] })
  ] });
}
function SiteLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-hidden", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  SiteLayout as S
};
