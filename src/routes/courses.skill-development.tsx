import { createFileRoute } from "@tanstack/react-router";
import { CourseListPage } from "@/components/site/CourseListPage";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses/skill-development")({
  head: () => ({ meta: [
    { title: "Skill Development Training — KES Technologies" },
    { name: "description", content: "Government and foundation sponsored skill development training programs." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useT();
  return <CourseListPage
    category="courses"
    slug="skill-development"
    title={t("cp.govt.title")}
    tag={t("cp.govt.tag")}
    intro={t("cp.govt.intro")}
  />;
}
