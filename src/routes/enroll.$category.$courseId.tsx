import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

const CATALOG: Record<string, { name: string; price: number }[]> = {
  "job-guaranteed": [
    { name: "Full-Stack Web Development", price: 89000 },
    { name: "Data Analytics & AI", price: 79000 },
    { name: "Cloud & DevOps Engineer", price: 85000 },
    { name: "Cybersecurity Specialist", price: 95000 },
  ],
  "govt-sponsored": [
    { name: "PMKVY 4.0 — IT/ITES", price: 0 },
    { name: "DDU-GKY Digital Skills", price: 0 },
    { name: "NAPS Apprenticeship", price: 0 },
  ],
  certification: [
    { name: "AWS Solutions Architect", price: 24999 },
    { name: "Microsoft Azure Fundamentals", price: 14999 },
    { name: "Google Cloud Associate", price: 22999 },
    { name: "Certified Scrum Master", price: 19999 },
  ],
  academic: [
    { name: "B.Tech CSE (Industry Track)", price: 160000 },
    { name: "MCA Online", price: 95000 },
    { name: "M.Tech Data Science", price: 200000 },
  ],
};

export const Route = createFileRoute("/enroll/$category/$courseId")({
  head: () => ({ meta: [{ title: "Enroll — KMR Technologies" }] }),
  component: EnrollPage,
});

function EnrollPage() {
  const { t } = useT();
  const nav = useNavigate();
  const { category, courseId } = useParams({ from: "/enroll/$category/$courseId" });
  const course = CATALOG[category]?.[Number(courseId)];
  const [done, setDone] = useState(false);

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

  const fee = course.price;
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
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{t("enroll.title")} — {course.name}</h1>
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
            <div className="flex justify-between"><span className="text-muted-foreground">{course.name}</span><span className="font-semibold">{fmt(fee)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t("enroll.gst")}</span><span className="font-semibold">{fmt(gst)}</span></div>
            <div className="border-t border-border pt-2 flex justify-between text-base"><span className="font-bold">{t("enroll.total")}</span><span className="font-extrabold text-magenta">{fmt(total)}</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{t("enroll.note")}</p>
        </aside>
      </section>
    </SiteLayout>
  );
}
