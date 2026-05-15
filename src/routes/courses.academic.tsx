import { createFileRoute } from "@tanstack/react-router";
import { CourseListPage } from "@/components/site/CourseListPage";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses/academic")({
  head: () => ({ meta: [
    { title: "Academic Programs — KES Technologies" },
    { name: "description", content: "UGC-recognized degree-aligned programs in partnership with universities." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useT();
  return <CourseListPage
    category="academic_programs"
    slug="academic"
    title={t("cp.acad.title")}
    tag={t("cp.acad.tag")}
    intro={t("cp.acad.intro")}
  />;
}
