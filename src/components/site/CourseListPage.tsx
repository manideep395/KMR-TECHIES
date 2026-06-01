import { SiteLayout } from "@/components/layout/SiteLayout";
import { Clock, Award, ChevronRight, Sparkles, Loader2, X, CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import type { Tables } from "@/integrations/supabase/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import {
  HARDCODED_GOVT_COURSES,
  HARDCODED_JOB_GUARANTEED_COURSES,
  HARDCODED_CERTIFICATION_COURSES,
  HARDCODED_ACADEMIC_PROGRAMS
} from "@/data/coursesData";

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

interface EnrollForm {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  notes: string;
}

const STORAGE_KEY = "kes_enrollments";

function saveEnrollment(data: {
  courseName: string;
  courseId: string;
  category: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  notes: string;
  submittedAt: string;
}) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  existing.unshift(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

// Hardcoded courses imported from @/data/coursesData

export function CourseListPage({ title, tag, intro, category, slug }: CourseListPageProps) {
  const { t } = useT();
  const { data: rawItems, loading, error } = useRealtimeData<Item>(category);
  const [enrollingFor, setEnrollingFor] = useState<Item | null>(null);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<EnrollForm>({ name: "", email: "", phone: "", qualification: "", notes: "" });

  // Filter and append/prepend hardcoded courses
  let items: any[] = rawItems || [];
  if (category === 'courses') {
    items = rawItems.filter(item => 'category' in item && item.category === slug);
  }
  if (slug === 'skill-development') {
    items = [...HARDCODED_GOVT_COURSES, ...items];
  } else if (slug === 'job-guaranteed') {
    items = [...HARDCODED_JOB_GUARANTEED_COURSES, ...items];
  } else if (slug === 'certification') {
    items = [...HARDCODED_CERTIFICATION_COURSES, ...items];
  } else if (slug === 'academic') {
    items = [...HARDCODED_ACADEMIC_PROGRAMS, ...items];
  }

  // If there's an error but we have hardcoded courses to show, don't block the UI entirely
  const shouldShowError = error && (
    (slug !== 'skill-development' && slug !== 'job-guaranteed' && slug !== 'certification' && slug !== 'academic') || 
    items.length === 0
  );

  function openEnroll(item: Item) {
    setEnrollingFor(item);
    setDone(false);
    setForm({ name: "", email: "", phone: "", qualification: "", notes: "" });
  }

  function closeModal() {
    setEnrollingFor(null);
    setDone(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!enrollingFor) return;
    saveEnrollment({
      courseName: enrollingFor.title,
      courseId: enrollingFor.id,
      category: slug,
      ...form,
      submittedAt: new Date().toISOString(),
    });
    setDone(true);
    toast.success("Enrollment received! We'll contact you shortly.");
    setTimeout(() => closeModal(), 2000);
  }

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

  if (shouldShowError) {
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
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-card border border-border p-6 hover:shadow-elegant hover:-translate-y-0.5 transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <span className="px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-bold whitespace-nowrap">
                  {item.price === 0 ? 'Free' : item.price ? `₹${item.price}` : 'Contact for pricing'}
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
                  to="/courses/$category/$courseId"
                  params={{ category: slug, courseId: item.id }}
                  className="inline-flex items-center gap-2 rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90 transition"
                >
                  {t("clp.overview")} <ChevronRight className="h-4 w-4" />
                </Link>
                <a href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-magenta hover:gap-3 transition-all">
                  {t("clp.enquire")} <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enrollment Modal */}
      {enrollingFor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl p-8 z-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-secondary hover:bg-border flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {done ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground">Enrollment received!</h2>
                <p className="text-muted-foreground mt-2">We'll contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold text-foreground">Enroll in</h2>
                  <p className="text-magenta font-bold mt-1">{enrollingFor.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reserve your seat — our admissions team will reach out within 24 hours.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="enroll-name">Full name *</Label>
                      <Input
                        id="enroll-name"
                        required
                        className="mt-1"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enroll-email">Email *</Label>
                      <Input
                        id="enroll-email"
                        type="email"
                        required
                        className="mt-1"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="enroll-phone">Phone *</Label>
                      <Input
                        id="enroll-phone"
                        required
                        className="mt-1"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enroll-qual">Highest qualification *</Label>
                      <Input
                        id="enroll-qual"
                        required
                        className="mt-1"
                        value={form.qualification}
                        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                        placeholder="e.g., B.Tech"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="enroll-notes">Notes (optional)</Label>
                    <Textarea
                      id="enroll-notes"
                      rows={3}
                      className="mt-1"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Any questions or remarks..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold"
                  >
                    Confirm Enrollment
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
