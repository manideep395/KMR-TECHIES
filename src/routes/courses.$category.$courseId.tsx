import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { 
  ArrowLeft, 
  Clock, 
  Award, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Share2, 
  Calendar, 
  Sparkles,
  Users,
  Building,
  Check
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { ALL_HARDCODED_COURSES, type DetailedCourse } from "@/data/coursesData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type CourseType = Tables<'courses'> | Tables<'certifications'> | Tables<'trainings'> | Tables<'academic_programs'>;

const CATEGORY_MAP: Record<string, 'courses' | 'certifications' | 'trainings' | 'academic_programs'> = {
  "job-guaranteed": "courses",
  "skill-development": "courses",
  "certification": "certifications",
  "academic": "academic_programs",
};

const CATEGORY_LABEL_MAP: Record<string, string> = {
  "job-guaranteed": "Job Guaranteed Program",
  "skill-development": "Skill Development Training",
  "certification": "Professional Certification",
  "academic": "Academic Degree Program",
};

const CATEGORY_ROUTER_MAP: Record<string, any> = {
  "job-guaranteed": "/courses/job-guaranteed",
  "skill-development": "/courses/skill-development",
  "certification": "/courses/certification",
  "academic": "/courses/academic",
};

export const Route = createFileRoute("/courses/$category/$courseId")({
  head: ({ params }) => {
    // Attempt to pre-match course title for tab title
    const course = ALL_HARDCODED_COURSES.find(c => c.id === params.courseId);
    const title = course ? `${course.title} — KES Technologies` : "Course Overview — KES Technologies";
    const desc = course ? course.description : "Review course details, syllabus, eligibility, and outcomes.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc }
      ],
    };
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { t } = useT();
  const { category, courseId } = useParams({ from: "/courses/$category/$courseId" });
  const tableName = CATEGORY_MAP[category] || "courses";
  
  // Real-time data in case it's a dynamic DB-created course
  const { data: dbCourses } = useRealtimeData<any>(tableName);
  const [course, setCourse] = useState<DetailedCourse | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // 1. Check static data first
    const staticCourse = ALL_HARDCODED_COURSES.find(c => c.id === courseId);
    if (staticCourse) {
      setCourse(staticCourse);
      return;
    }

    // 2. Check dynamic database data
    if (dbCourses && courseId) {
      const found = dbCourses.find((c: any) => c.id === courseId);
      if (found) {
        // Map database schema to DetailedCourse structure
        setCourse({
          id: found.id,
          title: found.title,
          category: category,
          duration: found.duration || "Self-Paced",
          price: found.price ?? 0,
          image_url: found.image_url || null,
          description: found.description || "",
          level: found.level || "Beginner",
          provider: found.provider || undefined,
          skills_covered: found.skills_covered || (found.skills ? [found.skills] : []),
          modules: found.syllabus ? JSON.parse(found.syllabus) : [
            { title: "Module 1: Foundations", topics: ["Introduction & Core concepts"] },
            { title: "Module 2: Advanced Topics", topics: ["Practical applications & Capstone project"] }
          ],
          whatYouWillLearn: found.outcomes ? found.outcomes.split(";") : [
            "Gain industry-relevant skills and practical exposure",
            "Build real-world case studies and projects",
            "Learn directly from certified trainers and experts"
          ],
          careerOpportunities: found.careers ? found.careers.split(";") : ["Industry Professional", "Consultant"],
          eligibility: found.prerequisites || "Open to all interested learners.",
          certificationText: "Certificate of Completion aligned with industry standards."
        });
      }
    }
  }, [dbCourses, courseId, category]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success("Page link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!course) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-extrabold text-foreground">Course Overview Not Found</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            The requested course could not be located. It might have been updated or moved.
          </p>
          <Link to="/" className="text-magenta font-bold mt-6 inline-flex items-center gap-2 hover:gap-3 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const categoryLabel = CATEGORY_LABEL_MAP[category] || "Training Program";
  const parentRoute = CATEGORY_ROUTER_MAP[category] || "/";
  const formattedPrice = course.price === 0 ? "Free" : `₹${course.price.toLocaleString("en-IN")}`;

  return (
    <SiteLayout>
      {/* ─── HERO HEADER SECTION ─── */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-16 md:py-24">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        {/* Glow Spheres */}
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-magenta/10 blur-3xl" />

        <div className="relative container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs / Back button */}
          <Link 
            to={parentRoute}
            id="back-to-courses-btn"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm font-semibold transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to {categoryLabel}s
          </Link>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Left Col: Main details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/25 text-gold px-4 py-1 text-xs font-bold uppercase tracking-wider border border-gold/30">
                <Sparkles className="h-3.5 w-3.5" />
                {categoryLabel}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">
                {course.title}
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Badges / Quick Metrics */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <Clock className="h-5 w-5 text-gold" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Duration</div>
                    <div className="text-sm font-bold text-white">{course.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <Award className="h-5 w-5 text-gold" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Level</div>
                    <div className="text-sm font-bold text-white">{course.level}</div>
                  </div>
                </div>

                {course.provider && (
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                    <Building className="h-5 w-5 text-gold" />
                    <div>
                      <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Provider</div>
                      <div className="text-sm font-bold text-white">{course.provider}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Price</div>
                    <div className="text-sm font-bold text-white">{formattedPrice}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Quick action block */}
            <div className="bg-card border border-border/40 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 text-foreground h-full relative">
              <div className="space-y-4">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Admissions Status</div>
                <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Applications Open for Next Batch
                </div>
                <div className="border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground">Investment</div>
                  <div className="text-3xl font-extrabold text-foreground mt-1 flex items-baseline gap-2">
                    {formattedPrice}
                    {course.price > 0 && <span className="text-xs text-muted-foreground font-normal">one-time / plan options</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/enroll/$category/$courseId"
                  params={{ category, courseId: course.id }}
                  id="enroll-hero-btn"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-magenta text-white px-6 py-3.5 font-bold hover:bg-magenta/90 active:scale-[0.98] transition-all shadow-lg shadow-magenta/25"
                >
                  Enroll in Course <ChevronRight className="h-4 w-4" />
                </Link>

                <button
                  onClick={handleShare}
                  id="share-course-btn"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background hover:bg-secondary px-6 py-3 text-sm font-bold transition-colors"
                >
                  <Share2 className="h-4 w-4" /> {isCopied ? "Link Copied!" : "Share Syllabus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT BODY ─── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* Left 2 Cols: Syllabus, outcomes */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Section 1: Outcomes */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
                <span className="h-8 w-1.5 rounded-full bg-magenta" />
                What You Will Learn
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((outcome, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-3 bg-secondary/30 border border-border/30 rounded-xl p-5 hover:border-magenta/20 hover:bg-secondary/40 transition group"
                  >
                    <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-500 grid place-items-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {outcome.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Syllabus Accordion */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
                  <span className="h-8 w-1.5 rounded-full bg-magenta" />
                  Course Curriculum
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Explore the modular path structured by industry leaders. Expand each module to view details.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                {course.modules.map((mod, idx) => (
                  <AccordionItem 
                    value={`module-${idx}`} 
                    key={idx}
                    className="border border-border/60 rounded-xl px-5 bg-card overflow-hidden transition-all hover:border-gold/30"
                  >
                    <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:no-underline py-4">
                      {mod.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm space-y-2 pb-5">
                      <ul className="space-y-2.5 pl-2">
                        {mod.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Section 3: Skills Covered (if available) */}
            {course.skills_covered && course.skills_covered.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills_covered.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3.5 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Eligibility, Career Opportunities, Bottom Sticky Actions */}
          <div className="space-y-8">
            {/* Card 1: Eligibility */}
            <div className="rounded-2xl border border-border/50 p-6 bg-card space-y-4 shadow-sm hover:border-gold/30 transition">
              <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gold" />
                Eligibility & Prerequisites
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {course.eligibility}
              </p>
            </div>

            {/* Card 2: Career opportunities */}
            <div className="rounded-2xl border border-border/50 p-6 bg-card space-y-4 shadow-sm hover:border-magenta/20 transition">
              <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-magenta" />
                Career Prospects
              </h3>
              <div className="flex flex-col gap-2.5">
                {course.careerOpportunities.map((job, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-secondary/40 border border-border/30 rounded-xl p-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold text-foreground">{job.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Certificate Details */}
            <div className="rounded-2xl border border-border/50 p-6 bg-card space-y-4 shadow-sm hover:border-gold/30 transition">
              <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" />
                Certification
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {course.certificationText}
              </p>
              <div className="border border-dashed border-border/80 rounded-xl p-4 bg-secondary/10 text-center">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Verifiable Credentials</div>
                <div className="text-xs text-foreground font-semibold mt-1">NSDC / Skill India & University Co-Branded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM ENROLL CTA SECTION ─── */}
      <section className="py-16 bg-secondary border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Reserve your seat today. Get matched with leading employers or learn key foundational skills with no upfront payment needed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to="/enroll/$category/$courseId"
              params={{ category, courseId: course.id }}
              id="enroll-bottom-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-magenta text-white px-8 py-4 text-base font-bold hover:bg-magenta/90 active:scale-[0.98] transition-all shadow-lg shadow-magenta/25"
            >
              Enroll Now <ChevronRight className="h-5 w-5" />
            </Link>

            <Link
              to="/contact"
              id="enquire-bottom-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background hover:bg-secondary px-8 py-4 text-base font-bold transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
