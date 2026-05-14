import { createFileRoute } from "@tanstack/react-router";
import { CourseListPage } from "@/components/site/CourseListPage";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses/job-guaranteed")({
  head: () => ({ meta: [
    { title: "Job Guaranteed Courses — KMR Technologies" },
    { name: "description", content: "Placement-backed programs designed with hiring partners — pay after you get a job." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useT();
  return <CourseListPage
    category="courses"
    slug="job-guaranteed"
    title={t("cp.jobg.title")}
    tag={t("cp.jobg.tag")}
    intro={t("cp.jobg.intro")}
  />;
}
