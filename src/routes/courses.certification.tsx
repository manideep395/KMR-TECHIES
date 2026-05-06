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
    slug="certification"
    title={t("cp.cert.title")}
    tag={t("cp.cert.tag")}
    intro={t("cp.cert.intro")}
    courses={[
      { name: "AWS Solutions Architect", duration: "8 weeks", level: "Intermediate", price: "₹24,999", outcomes: ["Exam voucher included", "Hands-on labs", "Mock tests"] },
      { name: "Microsoft Azure Fundamentals", duration: "4 weeks", level: "Beginner", price: "₹14,999", outcomes: ["AZ-900 prep", "Live sessions", "Practice exams"] },
      { name: "Google Cloud Associate", duration: "8 weeks", level: "Intermediate", price: "₹22,999", outcomes: ["GCP labs", "Real projects", "Mentor support"] },
      { name: "Certified Scrum Master", duration: "2 weeks", level: "All", price: "₹19,999", outcomes: ["Scrum Alliance prep", "Workshops", "Case studies"] },
    ]} />;
}
