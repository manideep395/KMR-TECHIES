import { SiteLayout } from "@/components/layout/SiteLayout";
import { Clock, Award, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import type { Tables } from "@/integrations/supabase/types";

type Course = Tables<'courses'>;
type Certification = Tables<'certifications'>;
type Training = Tables<'trainings'>;
type AcademicProgram = Tables<'academic_programs'>;

type Item = Course | Certification | Training | AcademicProgram;

interface CourseListPageProps {
  title: string;
  tag: string;
  intro: string;
  category: 'courses' | 'certifications' | 'trainings' | 'academic_programs';
  slug: string;
}

export function CourseListPage({ title, tag, intro, category, slug }: CourseListPageProps) {
  const { t } = useT();
  const { data: items, loading, error } = useRealtimeData<Item>(category);

  if (loading) {
    return (
      <SiteLayout>
        <section className="bg-navy text-white py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 text-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> {tag}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">{title}</h1>
            <p className="text-white/70 max-w-2xl text-lg mt-3">{intro}</p>
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-magenta" />
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (error) {
    return (
      <SiteLayout>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-red-500">Error loading data: {error}</p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 text-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> {tag}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">{title}</h1>
          <p className="text-white/70 max-w-2xl text-lg mt-3">{intro}</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div key={item.id} className="rounded-2xl bg-card border border-border p-6 hover:shadow-elegant hover:-translate-y-0.5 transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <span className="px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-bold whitespace-nowrap">
                  {item.price ? `₹${item.price}` : 'Contact for pricing'}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                {item.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {item.duration}
                  </span>
                )}
                {'level' in item && item.level && (
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> {item.level}
                  </span>
                )}
                {'type' in item && item.type && (
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> {item.type}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                  {item.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/enroll/$category/$courseId"
                  params={{ category: slug, courseId: item.id }}
                  className="inline-flex items-center gap-2 rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90 transition"
                >
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
