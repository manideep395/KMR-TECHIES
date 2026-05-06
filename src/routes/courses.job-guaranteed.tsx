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
    slug="job-guaranteed"
    title={t("cp.jobg.title")}
    tag={t("cp.jobg.tag")}
    intro={t("cp.jobg.intro")}
    courses={[
      { name: "Full-Stack Web Development", duration: "6 months", level: "Beginner → Pro", price: "₹89,000", outcomes: ["12 LPA avg CTC", "MERN + DevOps", "150+ hiring partners"] },
      { name: "Data Analytics & AI", duration: "5 months", level: "Beginner", price: "₹79,000", outcomes: ["Python, SQL, Power BI", "Capstone with mentor", "Interview prep"] },
      { name: "Cloud & DevOps Engineer", duration: "5 months", level: "Intermediate", price: "₹85,000", outcomes: ["AWS + Azure", "K8s, Terraform", "On-the-job training"] },
      { name: "Cybersecurity Specialist", duration: "6 months", level: "Beginner", price: "₹95,000", outcomes: ["CEH-aligned", "SOC labs", "Govt-recognized"] },
    ]} />;
}
