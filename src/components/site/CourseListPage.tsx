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

const HARDCODED_GOVT_COURSES: Item[] = [
  {
    id: "govt-comm-skills",
    title: "Communication Skills",
    description: "This course focuses on developing effective communication for personal, educational, and professional success. Learners gain knowledge in verbal, non-verbal, and written communication, along with listening skills and confidence-building for both formal and informal settings. Provided by Ratna Foundation.",
    category: "govt-sponsored",
    duration: "30 Hours",
    price: 0,
    image_url: null,
    syllabus: null,
    prerequisites: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "govt-english-basics",
    title: "English Skills Basics for Beginners",
    description: "Designed for rural and semi-urban youth, this course introduces learners to the basics of spoken and written English. It covers everyday vocabulary, grammar, sentence formation, and conversational skills to improve confidence in using English in daily life and workplaces. Provided by Ratna Foundation.",
    category: "govt-sponsored",
    duration: "30 Hours",
    price: 0,
    image_url: null,
    syllabus: null,
    prerequisites: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "govt-digital-literacy",
    title: "Digital Literacy for Rural Youth",
    description: "This course equips learners with essential knowledge to navigate the digital world. Modules include using computers and smartphones, online transactions, communication through social media, and cyber safety best practices, enabling rural youth to become digitally empowered and future-ready. Provided by Ratna Foundation.",
    category: "govt-sponsored",
    duration: "30 Hours",
    price: 0,
    image_url: null,
    syllabus: null,
    prerequisites: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any
];

const HARDCODED_JOB_GUARANTEED_COURSES: Item[] = [
  {
    id: "job-fullstack",
    title: "Full-Stack Web Development (MERN)",
    description: "Master front-end and back-end development with MongoDB, Express, React, and Node.js. Build 15+ real-world projects and secure a guaranteed job as a Software Engineer. Includes 1-on-1 mentor support and interview prep.",
    category: "job-guaranteed",
    duration: "24 Weeks",
    price: 75000,
    image_url: null,
    syllabus: null,
    prerequisites: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "job-datascience",
    title: "Data Science & AI Engineering",
    description: "Learn Python, SQL, machine learning algorithms, deep learning, and AI application development. Designed in collaboration with industry leaders to guarantee your placement as a Data Analyst, Data Engineer, or ML Specialist.",
    category: "job-guaranteed",
    duration: "28 Weeks",
    price: 85000,
    image_url: null,
    syllabus: null,
    prerequisites: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "job-devops",
    title: "Cloud & DevOps Engineering",
    description: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code (Terraform). Get hands-on cloud credits and 1-on-1 mentorship to transition into a Cloud Architect or DevOps Engineer role with 100% placement assurance.",
    category: "job-guaranteed",
    duration: "20 Weeks",
    price: 90000,
    image_url: null,
    syllabus: null,
    prerequisites: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any
];

const HARDCODED_CERTIFICATION_COURSES: Item[] = [
  {
    id: "cert-digi-marketing",
    title: "Digital Marketing & E-Commerce",
    description: "Learn the essentials of SEO, social media marketing, email marketing, and e-commerce platform management. Designed by Ratna Foundation to help rural entrepreneurs and youth start and scale online businesses.",
    provider: "Ratna Foundation",
    duration: "6 Weeks",
    price: 0,
    image_url: null,
    skills_covered: ["SEO", "Social Media", "Email Marketing", "E-commerce"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "cert-healthcare-assistant",
    title: "Healthcare Assistant (General Duty Assistant)",
    description: "Comprehensive healthcare training covering patient care, basic nursing protocols, communication, and medical emergency responses. Certified by Ratna Foundation with hospital placement assistance.",
    provider: "Ratna Foundation",
    duration: "12 Weeks",
    price: 0,
    image_url: null,
    skills_covered: ["Patient Care", "First Aid", "Nursing Protocols", "Sanitation"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "cert-agri-tech",
    title: "Modern Agricultural Technology & Agri-business",
    description: "Master modern farming techniques, organic agriculture, soil management, micro-irrigation, and agricultural marketing. Empowering farmers and rural youth with sustainable agri-business skills.",
    provider: "Ratna Foundation",
    duration: "8 Weeks",
    price: 0,
    image_url: null,
    skills_covered: ["Modern Farming", "Organic Agriculture", "Agri-business", "Irrigation"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any
];

const HARDCODED_ACADEMIC_PROGRAMS: Item[] = [
  {
    id: "acad-btech-cse",
    title: "B.Tech in Computer Science & Engineering (AI & ML)",
    description: "A UGC-recognized 4-year undergraduate degree program co-designed with top university partners. Learn algorithms, data structures, cloud systems, machine learning, and deep learning with guaranteed industry placement support.",
    level: "Bachelor's Degree",
    duration: "4 Years",
    price: 180000,
    image_url: null,
    curriculum: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "acad-mca",
    title: "Master of Computer Applications (MCA)",
    description: "UGC-recognized postgraduate program specializing in Cloud Computing, Big Data Analytics, and Software Architecture. Includes hands-on labs, university exams, and placement preparation.",
    level: "Master's Degree",
    duration: "2 Years",
    price: 95000,
    image_url: null,
    curriculum: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any,
  {
    id: "acad-mtech-se",
    title: "M.Tech in Software Engineering & DevOps",
    description: "Advanced postgraduate degree focusing on large-scale software engineering, distributed systems, DevOps practices, and enterprise cloud architecture. Ideal for working professionals looking to upskill.",
    level: "Master's Degree",
    duration: "2 Years",
    price: 110000,
    image_url: null,
    curriculum: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any
];

export function CourseListPage({ title, tag, intro, category, slug }: CourseListPageProps) {
  const { t } = useT();
  const { data: rawItems, loading, error } = useRealtimeData<Item>(category);
  const [enrollingFor, setEnrollingFor] = useState<Item | null>(null);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<EnrollForm>({ name: "", email: "", phone: "", qualification: "", notes: "" });

  // Filter and append/prepend hardcoded courses
  let items = rawItems || [];
  if (category === 'courses') {
    items = rawItems.filter(item => 'category' in item && item.category === slug);
  }
  if (slug === 'govt-sponsored') {
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
    (slug !== 'govt-sponsored' && slug !== 'job-guaranteed' && slug !== 'certification' && slug !== 'academic') || 
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
                <button
                  onClick={() => openEnroll(item)}
                  className="inline-flex items-center gap-2 rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90 transition"
                >
                  {t("clp.enroll")} <ChevronRight className="h-4 w-4" />
                </button>
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
