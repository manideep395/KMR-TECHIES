import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Database, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import sisImg from "@/assets/sis-card.png";
import lmsImg from "@/assets/lms-card.png";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/student-login/")({
  head: () => ({ meta: [
    { title: "Student Login — KMR Technologies" },
    { name: "description", content: "Access your Student Information System (SIS) or Learning Management System (LMS)." },
    { property: "og:title", content: "Student Portals — KMR Technologies" },
    { property: "og:description", content: "Two portals: SIS for academics, LMS for course content." },
  ]}),
  component: LoginLanding,
});

function PortalCard({ title, tag, desc, img, to, Icon, btnLabel }: { title: string; tag: string; desc: string; img: string; to: string; Icon: typeof Database; btnLabel: string }) {
  return (
    <div className="group relative rounded-3xl bg-card border border-border overflow-hidden shadow-elegant hover:-translate-y-1 hover:border-gold/40 transition-all duration-300 flex flex-col">
      {/* Image area — always white so white-bg illustrations blend in naturally */}
      <div className="relative overflow-hidden bg-white" style={{ height: "260px" }}>
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain object-center p-6"
        />
        {/* Bottom fade gradient blending image into card content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.95) 70%, white)" }}
        />
      </div>

      {/* Content area */}
      <div className="p-7 flex flex-col flex-1">
        <span className="inline-block self-start text-xs font-bold uppercase tracking-widest text-magenta mb-3 px-2.5 py-1 rounded-full bg-magenta/10">
          {tag}
        </span>
        <h3 className="text-xl font-extrabold text-foreground mb-2 flex items-center gap-2">
          <Icon className="h-5 w-5 text-magenta shrink-0" /> {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">{desc}</p>
        <div>
          <Link
            to={to}
            className="inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-bold text-white hover:bg-magenta/90 hover:gap-3 transition-all duration-200"
          >
            {tag} {btnLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoginLanding() {
  const { t } = useT();
  return (
    <SiteLayout>
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-gold" /> {t("sl.tag")}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">{t("sl.title")}</h1>
          <p className="text-white/80 mt-3 max-w-2xl mx-auto">{t("sl.sub")}</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8 max-w-5xl">
          <PortalCard title={t("sl.sis.title")} tag="SIS" desc={t("sl.sis.desc")} img={sisImg} to="/student-login/sis" Icon={Database} btnLabel={t("sl.btn")} />
          <PortalCard title={t("sl.lms.title")} tag="LMS" desc={t("sl.lms.desc")} img={lmsImg} to="/student-login/lms" Icon={GraduationCap} btnLabel={t("sl.btn")} />
        </div>
      </section>
    </SiteLayout>
  );
}
