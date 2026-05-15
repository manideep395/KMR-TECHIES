import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us — KES Technologies" },
    { name: "description", content: "Get in touch with KES Technologies for admissions, partnerships, and support." },
    { property: "og:title", content: "Contact KES Technologies" },
    { property: "og:description", content: "Reach our team for admissions and partnerships." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useT();
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t("contact.title")}</h1>
          <p className="text-white/70 max-w-2xl text-lg">{t("contact.intro")}</p>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-8">
        <div className="space-y-6 md:col-span-1">
          {[
            { i: MapPin, t: t("contact.office"), d: t("contact.office.value") },
            { i: Phone, t: t("contact.phone"), d: t("contact.phone.value") },
            { i: Mail, t: t("contact.email"), d: t("contact.email.value") },
          ].map((c, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0"><c.i className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold text-foreground">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
        <form className="md:col-span-2 rounded-2xl bg-card border border-border p-8 shadow-elegant space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success(t("contact.toast")); }}>
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder={t("contact.fullname")} required />
            <Input type="email" placeholder={t("contact.emailPh")} required />
          </div>
          <Input placeholder={t("contact.phonePh")} />
          <Input placeholder={t("contact.subject")} required />
          <Textarea placeholder={t("contact.message")} rows={5} required />
          <Button type="submit" className="bg-magenta text-white hover:bg-magenta/90 rounded-full px-8">{sent ? t("contact.sent") : t("contact.send")}</Button>
        </form>
        </div>
      </section>
    </SiteLayout>
  );
}
