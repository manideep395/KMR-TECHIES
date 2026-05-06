import { createFileRoute } from "@tanstack/react-router";
import { CourseListPage } from "@/components/site/CourseListPage";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses/academic")({
  head: () => ({ meta: [
    { title: "Academic Programs — KMR Technologies" },
    { name: "description", content: "UGC-recognized degree-aligned programs in partnership with universities." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useT();
  return <CourseListPage
    slug="academic"
    title={t("cp.acad.title")}
    tag={t("cp.acad.tag")}
    intro={t("cp.acad.intro")}
    courses={[
      { name: "B.Tech CSE (Industry Track)", duration: "4 years", level: "After 12th", price: "₹1.6L/yr", outcomes: ["UGC degree", "Industry capstones", "Placement track"] },
      { name: "MCA Online", duration: "2 years", level: "After Graduation", price: "₹95k/yr", outcomes: ["Online + on-campus", "Live classes", "Project work"] },
      { name: "M.Tech Data Science", duration: "2 years", level: "Working Pros", price: "₹2L/yr", outcomes: ["Weekend cohort", "Research thesis", "Industry mentor"] },
    ]} />;
}
