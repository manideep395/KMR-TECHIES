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
    slug="govt-sponsored"
    title={t("cp.govt.title")}
    tag={t("cp.govt.tag")}
    intro={t("cp.govt.intro")}
    courses={[
      { name: "PMKVY 4.0 — IT/ITES", duration: "3 months", level: "Entry", price: "Free", outcomes: ["Govt certificate", "Stipend eligible", "Placement drive"] },
      { name: "DDU-GKY Digital Skills", duration: "4 months", level: "Entry", price: "Free", outcomes: ["Residential training", "Free meals & lodging", "Job assurance"] },
      { name: "NAPS Apprenticeship", duration: "12 months", level: "All", price: "Stipend ₹9k/mo", outcomes: ["Earn while learning", "MSDE certificate", "OJT with employers"] },
    ]} />;
}
