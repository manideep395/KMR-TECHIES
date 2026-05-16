import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Briefcase, Award, BookOpen, Building2, Plane, LogIn, Globe, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, LANGUAGES, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import kesLogo from "@/assets/kes-logo.png";

function LangSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang } = useT();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return (
    <div className="relative group">
      <button className={cn(
        "flex items-center gap-1.5 rounded-full text-sm font-semibold transition-colors",
        mobile
          ? "px-3 py-2 bg-white/10 text-white w-full justify-between"
          : "px-3 py-2 text-white/90 hover:text-gold"
      )}>
        <Globe className="h-4 w-4" /> {current.native}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className={cn(
        "absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
        mobile && "left-0 right-auto"
      )}>
        <div className="w-44 rounded-xl bg-navy-deep shadow-elegant border border-white/10 p-1.5">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code as Lang)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/10 flex items-center justify-between",
                lang === l.code && "bg-white/10 text-gold font-bold"
              )}
            >
              <span className="text-white">{l.native}</span>
              <span className="text-xs text-white/60">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavDropdown({ label, items }: { label: string; items: { title: string; desc: string; icon: typeof Briefcase; to: string }[] }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors">
        {label} <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="w-[420px] rounded-xl bg-navy-deep shadow-elegant border border-white/10 p-3">
          <div className="grid gap-1">
            {items.map((it) => (
              <Link key={it.to} to={it.to} className="flex gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold shrink-0">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{it.title}</div>
                  <div className="text-xs text-white/60">{it.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "rounded-full transition-all duration-300",
        mobile
          ? "p-2.5 bg-white/10 text-white w-full flex items-center justify-center gap-2"
          : "p-2 text-white/90 hover:text-gold hover:bg-white/10"
      )}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      {mobile && <span className="text-sm font-semibold">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
    </button>
  );
}

export function Header() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);

  const courseItems = [
    { title: t("courses.jobGuaranteed"), desc: t("courses.jobGuaranteed.desc"), icon: Briefcase, to: "/courses/job-guaranteed" },
    { title: t("courses.govt"), desc: t("courses.govt.desc"), icon: Building2, to: "/courses/govt-sponsored" },
    { title: t("courses.cert"), desc: t("courses.cert.desc"), icon: Award, to: "/courses/certification" },
    { title: t("courses.academic"), desc: t("courses.academic.desc"), icon: BookOpen, to: "/courses/academic" },
  ];
  const careerItems = [
    { title: t("careers.kes"), desc: t("careers.kes.desc"), icon: Briefcase, to: "/careers/kes" },
    { title: t("careers.abroad"), desc: t("careers.abroad.desc"), icon: Plane, to: "/careers/apprenticeship-abroad" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-deep/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={kesLogo}
              alt="Karthikeya Educational Society"
              className="h-10 w-10 rounded-full object-contain bg-white p-0.5 shadow-md"
            />
            <div className="leading-tight">
              <div className="text-gold font-extrabold text-lg tracking-tight">Karthikeya</div>
              <div className="text-gold text-[10px] font-semibold uppercase tracking-widest">Educational Society</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" activeOptions={{ exact: true }} className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors" activeProps={{ className: "text-gold" }}>{t("nav.home")}</Link>
            <NavDropdown label={t("nav.courses")} items={courseItems} />
            <NavDropdown label={t("nav.careers")} items={careerItems} />
            <Link to="/about" className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors" activeProps={{ className: "text-gold" }}>{t("nav.about")}</Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors" activeProps={{ className: "text-gold" }}>{t("nav.contact")}</Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1">
              <ThemeToggle />
              <LangSwitcher />
            </div>
            <Link to="/student-login" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy-deep hover:brightness-110 transition shadow-md">
              <LogIn className="h-4 w-4" /> {t("nav.studentLogin")}
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-white" aria-label={t("nav.menu")}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={cn("lg:hidden overflow-hidden transition-all duration-300", open ? "max-h-[90vh]" : "max-h-0")}>
        <div className="px-4 pb-4 space-y-1 bg-navy-deep">
          <Link to="/" onClick={() => setOpen(false)} className="block px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10">{t("nav.home")}</Link>
          <button onClick={() => setCoursesOpen(!coursesOpen)} className="flex w-full items-center justify-between px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10">
            {t("nav.courses")} <ChevronDown className={cn("h-4 w-4 transition", coursesOpen && "rotate-180")} />
          </button>
          {coursesOpen && (
            <div className="pl-3 space-y-1">
              {courseItems.map(i => (
                <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-white/80 rounded-lg hover:bg-white/10">{i.title}</Link>
              ))}
            </div>
          )}
          <button onClick={() => setCareersOpen(!careersOpen)} className="flex w-full items-center justify-between px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10">
            {t("nav.careers")} <ChevronDown className={cn("h-4 w-4 transition", careersOpen && "rotate-180")} />
          </button>
          {careersOpen && (
            <div className="pl-3 space-y-1">
              {careerItems.map(i => (
                <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-white/80 rounded-lg hover:bg-white/10">{i.title}</Link>
              ))}
            </div>
          )}
          <Link to="/about" onClick={() => setOpen(false)} className="block px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10">{t("nav.about")}</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block px-3 py-3 text-white font-semibold rounded-lg hover:bg-white/10">{t("nav.contact")}</Link>
          <div className="pt-2 space-y-2">
            <ThemeToggle mobile />
            <LangSwitcher mobile />
          </div>
          <Link to="/student-login" onClick={() => setOpen(false)} className="block text-center mt-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy-deep">{t("nav.studentLogin")}</Link>
        </div>
      </div>
    </header>
  );
}
