import { createFileRoute } from "@tanstack/react-router";
import { CourseListPage } from "@/components/site/CourseListPage";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses/govt-sponsored")({
  head: () => ({ meta: [
    { title: "Govt Sponsored Training — KMR Technologies" },
    { name: "description", content: "Skill India and state-sponsored programs at little to no cost." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useT();
  return <CourseListPage
    category="courses"
    slug="govt-sponsored"
    title={t("cp.govt.title")}
    tag={t("cp.govt.tag")}
    intro={t("cp.govt.intro")}
  />;
}
