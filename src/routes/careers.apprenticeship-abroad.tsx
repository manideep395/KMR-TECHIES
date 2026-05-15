import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Plane, Globe2, Languages, ShieldCheck } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/careers/apprenticeship-abroad")({
  head: () => ({ meta: [
    { title: "Apprenticeship Abroad — KES Technologies" },
    { name: "description", content: "International placement portal — work-and-learn opportunities in Germany, Japan, UAE and more." },
  ]}),
  component: Abroad,
});

const countries = [
  { c: "🇩🇪 Germany", roles: "Mechatronics, IT, Healthcare", stipend: "€1,200/mo" },
  { c: "🇯🇵 Japan", roles: "Manufacturing, IT, Caregiving", stipend: "¥160,000/mo" },
  { c: "🇦🇪 UAE", roles: "Hospitality, Retail, IT", stipend: "AED 3,500/mo" },
  { c: "🇦🇺 Australia", roles: "Construction, IT, Health", stipend: "AUD 2,200/mo" },
];

function Abroad() {
  const { t } = useT();
  return (
    <SiteLayout>
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur"><Plane className="h-4 w-4 text-gold" /> {t("cab.tag")}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">{t("cab.title")}</h1>
          <p className="text-white/80 max-w-2xl text-lg mt-3">{t("cab.intro")}</p>
        </div>
      </section>
      <section className="py-16 container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { i: Languages, t: t("cab.f1.title"), d: t("cab.f1.desc") },
            { i: ShieldCheck, t: t("cab.f2.title"), d: t("cab.f2.desc") },
            { i: Globe2, t: t("cab.f3.title"), d: t("cab.f3.desc") },
          ].map((f,i)=>(
            <div key={i} className="rounded-2xl bg-card border border-border p-6">
              <f.i className="h-8 w-8 text-magenta mb-3" />
              <h3 className="font-bold text-navy">{f.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-navy mb-4">{t("cab.openDest")}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {countries.map(c=>(
            <div key={c.c} className="rounded-2xl bg-card border border-border p-6 flex justify-between items-center">
              <div>
                <div className="text-xl font-bold text-navy">{c.c}</div>
                <div className="text-sm text-muted-foreground">{c.roles}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{t("cab.stipend")}</div>
                <div className="font-bold text-magenta">{c.stipend}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
