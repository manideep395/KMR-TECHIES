import { SiteLayout } from "@/components/layout/SiteLayout";
import { Clock, Award, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export type Course = { name: string; duration: string; level: string; price: string; outcomes: string[] };

export function CourseListPage({ title, tag, intro, courses, slug }: { title: string; tag: string; intro: string; courses: Course[]; slug: string }) {
  const { t } = useT();
  return (
    <SiteLayout>
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 text-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5" /> {tag}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">{title}</h1>
          <p className="text-white/70 max-w-2xl text-lg mt-3">{intro}</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-6">
        {courses.map((c, idx) => (
          <div key={c.name} className="rounded-2xl bg-card border border-border p-6 hover:shadow-elegant hover:-translate-y-0.5 transition">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl font-bold text-foreground">{c.name}</h3>
              <span className="px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-bold whitespace-nowrap">{c.price}</span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.duration}</span>
              <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> {c.level}</span>
            </div>
            <ul className="space-y-1.5 mb-5">
              {c.outcomes.map(o=>(<li key={o} className="text-sm text-muted-foreground flex gap-2"><ChevronRight className="h-4 w-4 text-magenta shrink-0 mt-0.5" /> {o}</li>))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/enroll/$category/$courseId" params={{ category: slug, courseId: String(idx) }} className="inline-flex items-center gap-2 rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90 transition">
                {t("clp.enroll")} <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-magenta hover:gap-3 transition-all">
                {t("clp.enquire")} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
        </div>
      </section>
    </SiteLayout>
  );
}
