import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/careers/kes")({
  head: () => ({ meta: [
    { title: "KES Careers — Join Our Team" },
    { name: "description", content: "Open roles at KES Technologies across India." },
  ]}),
  component: KmrCareers,
});

function KmrCareers() {
  const { t } = useT();
  const jobs = [
    { t: "Senior Full-Stack Engineer", l: "Bengaluru", type: t("ck.fulltime") },
    { t: "Curriculum Designer — Cloud", l: t("ck.remote"), type: t("ck.fulltime") },
    { t: "Placement Officer", l: "Hyderabad", type: t("ck.fulltime") },
    { t: "Marketing Manager", l: "Bengaluru", type: t("ck.fulltime") },
  ];
  return (
    <SiteLayout>
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{t("ck.title")}</h1>
          <p className="text-white/70 max-w-2xl text-lg">{t("ck.intro")}</p>
        </div>
      </section>
      <section className="py-16 container mx-auto px-4 lg:px-8">
        <div className="grid gap-4">
          {jobs.map(j=>(
            <div key={j.t} className="rounded-2xl bg-card border border-border p-6 flex flex-wrap items-center justify-between gap-4 hover:shadow-elegant transition">
              <div>
                <h3 className="font-bold text-navy text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-magenta" /> {j.t}</h3>
                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {j.l}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {j.type}</span>
                </div>
              </div>
              <button className="rounded-full bg-magenta text-white px-5 py-2 text-sm font-bold hover:bg-magenta/90">{t("ck.apply")}</button>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
