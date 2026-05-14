import { createFileRoute } from "@tanstack/react-router";
import { CourseListPage } from "@/components/site/CourseListPage";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses/certification")({
  head: () => ({ meta: [
    { title: "Certification Programs — KMR Technologies" },
    { name: "description", content: "Industry-recognized short certifications to upskill fast." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useT();
  return <CourseListPage
    category="certifications"
    slug="certification"
    title={t("cp.cert.title")}
    tag={t("cp.cert.tag")}
    intro={t("cp.cert.intro")}
  />;
}
