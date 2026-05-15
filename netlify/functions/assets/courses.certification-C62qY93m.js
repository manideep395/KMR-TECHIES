import { jsx } from "react/jsx-runtime";
import { C as CourseListPage } from "./CourseListPage-7i4DqI-n.js";
import { u as useT } from "./router-CjN-_vpS.js";
import "./SiteLayout-AI7RwLlp.js";
import "react";
import "@tanstack/react-router";
import "lucide-react";
import "./useRealtimeData-Cfb7rj-g.js";
import "./client-1Cs0bkRN.js";
import "@supabase/supabase-js";
import "sonner";
import "clsx";
import "tailwind-merge";
function Page() {
  const {
    t
  } = useT();
  return /* @__PURE__ */ jsx(CourseListPage, { category: "certifications", slug: "certification", title: t("cp.cert.title"), tag: t("cp.cert.tag"), intro: t("cp.cert.intro") });
}
export {
  Page as component
};
