import { jsxs, jsx } from "react/jsx-runtime";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { MapPin, Phone, Mail } from "lucide-react";
import { B as Button } from "./button-6iPTpLdE.js";
import { I as Input } from "./input-BAh5KpWR.js";
import { T as Textarea } from "./textarea-Ddb-gSW7.js";
import { useState } from "react";
import { toast } from "sonner";
import { u as useT } from "./router-CjN-_vpS.js";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ContactPage() {
  const {
    t
  } = useT();
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-navy text-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4", children: t("contact.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 max-w-2xl text-lg", children: t("contact.intro") })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-6 md:col-span-1", children: [{
        i: MapPin,
        t: t("contact.office"),
        d: "12th Main, HSR Layout, Bengaluru, KA 560102"
      }, {
        i: Phone,
        t: t("contact.phone"),
        d: "+91 80 1234 5678"
      }, {
        i: Mail,
        t: t("contact.email"),
        d: "hello@kmrtech.in"
      }].map((c, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl bg-gold/15 text-gold grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(c.i, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: c.t }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: c.d })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("form", { className: "md:col-span-2 rounded-2xl bg-card border border-border p-8 shadow-elegant space-y-4", onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
        toast.success(t("contact.toast"));
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Input, { placeholder: t("contact.fullname"), required: true }),
          /* @__PURE__ */ jsx(Input, { type: "email", placeholder: t("contact.emailPh"), required: true })
        ] }),
        /* @__PURE__ */ jsx(Input, { placeholder: t("contact.phonePh") }),
        /* @__PURE__ */ jsx(Input, { placeholder: t("contact.subject"), required: true }),
        /* @__PURE__ */ jsx(Textarea, { placeholder: t("contact.message"), rows: 5, required: true }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-magenta text-white hover:bg-magenta/90 rounded-full px-8", children: sent ? t("contact.sent") : t("contact.send") })
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
