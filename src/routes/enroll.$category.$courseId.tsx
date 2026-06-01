import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import type { Tables } from "@/integrations/supabase/types";
import { ALL_HARDCODED_COURSES } from "@/data/coursesData";

type Course = Tables<'courses'>;
type Certification = Tables<'certifications'>;
type Training = Tables<'trainings'>;
type AcademicProgram = Tables<'academic_programs'>;

type CourseType = Course | Certification | Training | AcademicProgram;

const CATEGORY_MAP: Record<string, 'courses' | 'certifications' | 'trainings' | 'academic_programs'> = {
  "job-guaranteed": "courses",
  "skill-development": "courses",
  "certification": "certifications",
  "academic": "academic_programs",
};

export const Route = createFileRoute("/enroll/$category/$courseId")({
  head: () => ({ meta: [{ title: "Enroll — KES Technologies" }] }),
  component: EnrollPage,
});

function EnrollPage() {
  const { t } = useT();
  const nav = useNavigate();
  const { category, courseId } = useParams({ from: "/enroll/$category/$courseId" });
  const tableName = CATEGORY_MAP[category];
  const { data: allCourses } = useRealtimeData<CourseType>(tableName);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1. Try to find the course in hardcoded list first
    const staticCourse = ALL_HARDCODED_COURSES.find(c => c.id === courseId);
    if (staticCourse) {
      setCourse(staticCourse as any);
      return;
    }

    // 2. Fallback to database
    if (allCourses && courseId) {
      const found = allCourses.find(c => c.id === courseId);
      setCourse(found || null);
    }
  }, [allCourses, courseId]);
  if (!course) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Course not found</h1>
          <Link to="/" className="text-magenta mt-4 inline-block">← Home</Link>
        </div>
      </SiteLayout>
    );
  }

  const fee = (course as any).price ?? 0;
  const gst = Math.round(fee * 0.18);
  const total = fee + gst;
  const fmt = (n: number) => n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    toast.success(t("enroll.success"));
    setTimeout(() => nav({ to: "/" }), 2500);
  }

  return (
    <SiteLayout>
      <section className="bg-navy text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to=".." className="inline-flex items-center gap-1 text-white/70 hover:text-gold text-sm"><ArrowLeft className="h-4 w-4" /> Back</Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{t("enroll.title")} — {course.title}</h1>
          <p className="text-white/70 mt-2">{t("enroll.intro")}</p>
        </div>
      </section>
      <section className="py-12 container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="lg:col-span-2 rounded-2xl bg-card border border-border p-8 space-y-4 shadow-elegant">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground">{t("enroll.success")}</h2>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>{t("enroll.form.name")}</Label><Input required className="mt-1" /></div>
                <div><Label>{t("enroll.form.email")}</Label><Input type="email" required className="mt-1" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>{t("enroll.form.phone")}</Label><Input required className="mt-1" /></div>
                <div><Label>{t("enroll.form.qualification")}</Label><Input required className="mt-1" /></div>
              </div>
              <div><Label>{t("enroll.form.notes")}</Label><Textarea rows={4} className="mt-1" /></div>
              <Button type="submit" className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold">{t("enroll.form.submit")}</Button>
            </>
          )}
        </form>
        <aside className="rounded-2xl bg-secondary border border-border p-6 h-fit">
          <h3 className="font-bold text-foreground mb-4">{t("enroll.summary")}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{course.title}</span><span className="font-semibold">{fmt(fee)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("enroll.gst")}</span><span className="font-semibold">{fmt(gst)}</span></div>
            <div className="border-t border-border pt-2 flex justify-between text-base"><span className="font-bold">{t("enroll.total")}</span><span className="font-extrabold text-magenta">{fmt(total)}</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{t("enroll.note")}</p>
        </aside>
      </section>
    </SiteLayout>
  );
}
