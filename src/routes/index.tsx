import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ArrowRight, Sparkles, Briefcase, Award, Building2, Users, TrendingUp, ShieldCheck, Star, ChevronLeft, ChevronRight, Code2, Cloud, BarChart3, Zap, Globe, Lightbulb, Clock, GraduationCap, Building, CheckCircle2, Trophy, Heart } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import heroCareer from "@/assets/hero-career.png";
import heroPlacement from "@/assets/hero-placement.png";
import heroSkillIndia from "@/assets/hero-skillindia.png";
import carouselClassroom from "@/assets/carousel-classroom.png";
import carouselWorkshop from "@/assets/carousel-workshop.png";
import carouselPlacement from "@/assets/carousel-placement.png";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "KES Technologies — Your Course to Success" },
    { name: "description", content: "Industry-led training and guaranteed-placement programs from KES Technologies. Get hired by tech employers." },
    { property: "og:title", content: "KES Technologies — Your Course to Success" },
    { property: "og:description", content: "Get trained by industry experts and hired by top tech employers." },
  ]}),
  component: Home,
});

/* ─── HERO IMAGES — one per slide ─── */
const HERO_IMAGES = [heroCareer, heroPlacement, heroSkillIndia];
const GALLERY_IMGS = [carouselClassroom, carouselWorkshop, carouselPlacement];
const HIGHLIGHT_ICONS = [Code2, Cloud, BarChart3, Zap, Globe, Lightbulb];


function Home() {
  const { t } = useT();

  /* ─── Translated gallery & highlights ─── */
  const GALLERY = [
    { src: GALLERY_IMGS[0], title: t("gallery.card1.title"), desc: t("gallery.card1.desc") },
    { src: GALLERY_IMGS[1], title: t("gallery.card2.title"), desc: t("gallery.card2.desc") },
    { src: GALLERY_IMGS[2], title: t("gallery.card3.title"), desc: t("gallery.card3.desc") },
  ];
  const HIGHLIGHTS = [
    { icon: HIGHLIGHT_ICONS[0], title: t("highlights.h1.title"), desc: t("highlights.h1.desc") },
    { icon: HIGHLIGHT_ICONS[1], title: t("highlights.h2.title"), desc: t("highlights.h2.desc") },
    { icon: HIGHLIGHT_ICONS[2], title: t("highlights.h3.title"), desc: t("highlights.h3.desc") },
    { icon: HIGHLIGHT_ICONS[3], title: t("highlights.h4.title"), desc: t("highlights.h4.desc") },
    { icon: HIGHLIGHT_ICONS[4], title: t("highlights.h5.title"), desc: t("highlights.h5.desc") },
    { icon: HIGHLIGHT_ICONS[5], title: t("highlights.h6.title"), desc: t("highlights.h6.desc") },
  ];

  const slides = [
    { eyebrow: t("hero.eyebrow1"), title: t("hero.title1"), sub: t("hero.sub1") },
    { eyebrow: t("hero.eyebrow2"), title: t("hero.title2"), sub: t("hero.sub2") },
    { eyebrow: t("hero.eyebrow3"), title: t("hero.title3"), sub: t("hero.sub3") },
  ];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const tm = setInterval(() => setI(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(tm);
  }, [slides.length, paused]);
  const go = (next: number) => { setPaused(true); setI((next + slides.length) % slides.length); };
  const s = slides[i];

  /* ─── Gallery carousel refs ─── */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [galIdx, setGalIdx] = useState(0);
  const galAuto = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToCard = useCallback((idx: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[idx] as HTMLElement | undefined;
    if (card) {
      // Scroll only within the container, not the whole page
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({ left: cardLeft - (containerWidth - cardWidth) / 2, behavior: "smooth" });
    }
    setGalIdx(idx);
  }, []);

  const galPrev = () => { const n = (galIdx - 1 + GALLERY.length) % GALLERY.length; scrollToCard(n); };
  const galNext = useCallback(() => { const n = (galIdx + 1) % GALLERY.length; scrollToCard(n); }, [galIdx, scrollToCard]);

  useEffect(() => {
    galAuto.current = setInterval(galNext, 4000);
    return () => { if (galAuto.current) clearInterval(galAuto.current); };
  }, [galNext]);

  return (
    <SiteLayout>
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        {/* Ambient background */}
        <div className="absolute inset-0 opacity-15">
          <img src={heroImg} alt="" width={1536} height={1024} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/85 to-navy-deep/40" />

        <div className="relative container mx-auto px-4 lg:px-8 py-12 md:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT — Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold border border-white/15">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> {s.eyebrow}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-5">
              {s.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gold">{s.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg text-white/80 mt-5 max-w-xl">{s.sub}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/courses/job-guaranteed" className="inline-flex items-center justify-center gap-2 rounded-full bg-magenta hover:bg-magenta/90 px-7 py-3.5 font-bold text-white shadow-lg transition">
                {t("hero.exploreCourses")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/student-login" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-7 py-3.5 font-bold text-white border border-white/20 transition">
                {t("nav.studentLogin")}
              </Link>
            </div>
            <div className="flex gap-2 mt-10">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => go(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-gold" : "w-4 bg-white/30"}`} aria-label={`Slide ${idx+1}`} />
              ))}
            </div>
          </div>

          {/* RIGHT — Sliding hero image */}
          <div className="hidden lg:block relative h-[420px]">
            {HERO_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  opacity: idx === i ? 1 : 0,
                  transform: idx === i
                    ? "translateX(0) scale(1)"
                    : idx < i
                      ? "translateX(-80px) scale(0.92)"
                      : "translateX(80px) scale(0.92)",
                }}
              >
                <img
                  src={img}
                  alt={slides[idx]?.eyebrow || ""}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/10"
                />
                {/* Decorative overlay badge */}
                <div className="absolute bottom-4 left-4 bg-navy-deep/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <div className="text-xs font-bold text-gold">{slides[idx]?.eyebrow}</div>
                </div>
              </div>
            ))}
            {/* Decorative circles behind the image */}
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-magenta/10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ═══════ MISSION BANNER ═══════ */}
      <section className="bg-navy-deep py-12 md:py-16 border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">{t("mission.title")}</h2>
          <p className="text-lg text-white/70 mt-4 max-w-3xl mx-auto">{t("mission.sub")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12 max-w-4xl mx-auto">
            {[
              { n: "25k+", l: t("stats.learners") },
              { n: "150+", l: t("stats.partners") },
              { n: "92%", l: t("stats.placement") },
              { n: "12 LPA", l: t("stats.ctc") },
            ].map(s => (
              <div key={s.l}>
                <div className="text-3xl md:text-4xl font-extrabold text-gold">{s.n}</div>
                <div className="text-sm text-white/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY CAROUSEL ═══════ */}
      <section id="gallery" className="py-12 md:py-20 overflow-hidden bg-background">
        <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase font-bold tracking-widest text-gold">{t("gallery.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">{t("gallery.title")}</h2>
            <p className="text-muted-foreground mt-3">{t("gallery.sub")}</p>
          </div>
          <div className="relative group">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {GALLERY.map((img, idx) => (
                <div key={idx} className="min-w-[85%] sm:min-w-[60%] lg:min-w-[38%] snap-center flex-shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-elegant border border-border bg-card transition-transform hover:scale-[1.02] hover:shadow-2xl">
                    <img src={img.src} alt={img.title} className="w-full h-56 md:h-64 object-cover" loading="lazy" />
                    <div className="p-5">
                      <h3 className="font-bold text-foreground text-lg">{img.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{img.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={galPrev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 backdrop-blur border border-border shadow-elegant grid place-items-center text-foreground hover:bg-gold hover:text-navy-deep transition opacity-0 group-hover:opacity-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={galNext} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 backdrop-blur border border-border shadow-elegant grid place-items-center text-foreground hover:bg-gold hover:text-navy-deep transition opacity-0 group-hover:opacity-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {GALLERY.map((_, idx) => (
              <button key={idx} onClick={() => scrollToCard(idx)} className={`h-2 rounded-full transition-all ${idx === galIdx ? "w-8 bg-gold" : "w-3 bg-muted-foreground/30"}`} aria-label={`Gallery slide ${idx + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROGRAM CATEGORIES ═══════ */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase font-bold tracking-widest text-gold">{t("programs.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">{t("programs.title")}</h2>
            <p className="text-muted-foreground mt-3">{t("programs.sub")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { to: "/courses/job-guaranteed", icon: Briefcase, title: t("programs.jobg.title"), desc: t("programs.jobg.desc"), cta: t("programs.explore") },
              { to: "/courses/govt-sponsored", icon: Building2, title: t("programs.govt.title"), desc: t("programs.govt.desc"), cta: t("programs.explore") },
              { to: "/courses/certification", icon: Award, title: t("programs.cert.title"), desc: t("programs.cert.desc"), cta: t("programs.explore") },
              { to: "/courses/academic", icon: Award, title: t("programs.acad.title"), desc: t("programs.acad.desc"), cta: t("programs.view") },
            ].map((p) => (
              <Link key={p.to} to={p.to} className="group relative rounded-3xl p-8 min-h-[15rem] flex flex-col justify-between overflow-hidden border border-white/10 hover:border-gold/40 hover:shadow-elegant hover:-translate-y-0.5 transition bg-gradient-to-br from-navy to-navy-deep text-white">
                <div>
                  <p.icon className="h-10 w-10 mb-3 text-gold" />
                  <h3 className="text-2xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-sm max-w-md text-white/75">{p.desc}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-gold group-hover:gap-2 transition-all">
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED HIGHLIGHTS ═══════ */}
      <section className="py-12 md:py-20 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase font-bold tracking-widest text-gold">{t("highlights.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">{t("highlights.title")}</h2>
            <p className="text-muted-foreground mt-3">{t("highlights.sub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HIGHLIGHTS.map((h, idx) => (
              <div key={idx} className="rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-elegant hover:-translate-y-0.5 transition group">
                <div className="h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center mb-4 group-hover:bg-gold/25 transition">
                  <h.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-lg">{h.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY KES ═══════ */}
      <section className="bg-navy-deep py-12 md:py-20 border-y border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase font-bold tracking-widest text-gold">{t("why.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">{t("why.title")}</h2>
            <p className="text-lg text-white/70 mt-4">{t("why.sub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { i: Clock, t: t("why.f1.title"), d: t("why.f1.desc") },
              { i: GraduationCap, t: t("why.f2.title"), d: t("why.f2.desc") },
              { i: Users, t: t("why.f3.title"), d: t("why.f3.desc") },
              { i: Building, t: t("why.f4.title"), d: t("why.f4.desc") },
              { i: CheckCircle2, t: t("why.f5.title"), d: t("why.f5.desc") },
              { i: Trophy, t: t("why.f6.title"), d: t("why.f6.desc") },
              { i: Heart, t: t("why.f7.title"), d: t("why.f7.desc") },
              { i: Globe, t: t("why.f8.title"), d: t("why.f8.desc") },
            ].map((f, idx) => (
              <div key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-gold/40 transition">
                <div className="h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center mb-4"><f.i className="h-6 w-6" /></div>
                <h3 className="font-bold text-white">{f.t}</h3>
                <p className="text-sm text-white/70 mt-1">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase font-bold tracking-widest text-gold">{t("testi.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">{t("testi.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: "B. Nageshwari", r: t("testi.role1"), q: t("testi.q1") },
              { n: "D. Tulasi", r: t("testi.role2"), q: t("testi.q2") },
              { n: "Harichanda Prasad", r: t("testi.role3"), q: t("testi.q3") },
            ].map(t => (
              <div key={t.n} className="rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-elegant transition">
                <div className="flex gap-0.5 text-gold mb-3">{Array.from({length:5}).map((_,i)=>(<Star key={i} className="h-4 w-4 fill-current" />))}</div>
                <p className="text-sm text-foreground/90 italic">"{t.q}"</p>
                <div className="mt-4">
                  <div className="font-bold text-gold text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-background pb-12 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-gradient-hero p-8 md:p-14 text-white text-center shadow-elegant">
            <h2 className="text-3xl md:text-4xl font-extrabold">{t("cta.title")}</h2>
            <p className="text-white/80 mt-3 max-w-xl mx-auto">{t("cta.sub")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
              <Link to="/contact" className="rounded-full bg-magenta hover:bg-magenta/90 px-7 py-3.5 font-bold flex justify-center items-center">{t("cta.talk")}</Link>
              <Link to="/courses/job-guaranteed" className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-7 py-3.5 font-bold flex justify-center items-center">{t("cta.browse")}</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
