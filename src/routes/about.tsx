import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Award, Users, Target, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — KES Technologies" },
    { name: "description", content: "Learn about KES Technologies' mission to transform lives through training and technology." },
    { property: "og:title", content: "About Karthikeya Educational Society" },
    { property: "og:description", content: "Our mission, vision, and the team behind KES." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useT();
  return (
    <SiteLayout>
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t("about.title")}</h1>
          <p className="text-white/70 max-w-2xl text-lg">{t("about.intro")}</p>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("about.mission")}</h2>
          <p className="text-muted-foreground mb-4">{t("about.mission.p1")}</p>
          <p className="text-muted-foreground">{t("about.mission.p2")}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { i: Users, n: "5k+", l: t("stats.learners") },
            { i: Award, n: "150+", l: t("stats.partners") },
            { i: Target, n: "92%", l: t("stats.placement") },
            { i: Sparkles, n: "40+", l: t("about.stat.programs") },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border p-6">
              <s.i className="h-8 w-8 text-magenta mb-3" />
              <div className="text-3xl font-extrabold text-foreground">{s.n}</div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </SiteLayout>
  );
}
