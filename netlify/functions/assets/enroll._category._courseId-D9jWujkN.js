import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, useParams, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { S as SiteLayout } from "./SiteLayout-AI7RwLlp.js";
import { B as Button } from "./button-6iPTpLdE.js";
import { I as Input } from "./input-BAh5KpWR.js";
import { T as Textarea } from "./textarea-Ddb-gSW7.js";
import { L as Label } from "./label-Tcyvbvnk.js";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { u as useT } from "./router-CjN-_vpS.js";
import { u as useRealtimeData } from "./useRealtimeData-Cfb7rj-g.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "./client-1Cs0bkRN.js";
import "@supabase/supabase-js";
const CATEGORY_MAP = {
  "job-guaranteed": "courses",
  "govt-sponsored": "courses",
  "certification": "certifications",
  "academic": "academic_programs"
};
function EnrollPage() {
  const {
    t
  } = useT();
  const nav = useNavigate();
  const {
    category,
    courseId
  } = useParams({
    from: "/enroll/$category/$courseId"
  });
  const tableName = CATEGORY_MAP[category];
  const {
    data: allCourses
  } = useRealtimeData(tableName);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (allCourses && courseId) {
      const found = allCourses.find((c) => c.id === courseId);
      setCourse(found || null);
    }
  }, [allCourses, courseId]);
  if (!course) {
    return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Course not found" }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-magenta mt-4 inline-block", children: "← Home" })
    ] }) });
  }
  const fee = course.price ?? 0;
  const gst = Math.round(fee * 0.18);
  const total = fee + gst;
  const fmt = (n) => n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}`;
  const [done, setDone] = useState(false);
  function submit(e) {
    e.preventDefault();
    setDone(true);
    toast.success(t("enroll.success"));
    setTimeout(() => nav({
      to: "/"
    }), 2500);
  }
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-navy text-white py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "..", className: "inline-flex items-center gap-1 text-white/70 hover:text-gold text-sm", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-4xl font-extrabold mt-3", children: [
        t("enroll.title"),
        " — ",
        course.title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 mt-2", children: t("enroll.intro") })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "lg:col-span-2 rounded-2xl bg-card border border-border p-8 space-y-4 shadow-elegant", children: done ? /* @__PURE__ */ jsxs("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-16 w-16 text-emerald-500 mx-auto mb-4" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground", children: t("enroll.success") })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: t("enroll.form.name") }),
            /* @__PURE__ */ jsx(Input, { required: true, className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: t("enroll.form.email") }),
            /* @__PURE__ */ jsx(Input, { type: "email", required: true, className: "mt-1" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: t("enroll.form.phone") }),
            /* @__PURE__ */ jsx(Input, { required: true, className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: t("enroll.form.qualification") }),
            /* @__PURE__ */ jsx(Input, { required: true, className: "mt-1" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: t("enroll.form.notes") }),
          /* @__PURE__ */ jsx(Textarea, { rows: 4, className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold", children: t("enroll.form.submit") })
      ] }) }),
      /* @__PURE__ */ jsxs("aside", { className: "rounded-2xl bg-secondary border border-border p-6 h-fit", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground mb-4", children: t("enroll.summary") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: course.title }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: fmt(fee) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: t("enroll.gst") }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: fmt(gst) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-2 flex justify-between text-base", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: t("enroll.total") }),
            /* @__PURE__ */ jsx("span", { className: "font-extrabold text-magenta", children: fmt(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-4", children: t("enroll.note") })
      ] })
    ] })
  ] });
}
export {
  EnrollPage as component
};
