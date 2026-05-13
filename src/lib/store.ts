import { useSyncExternalStore } from "react";

export type Student = { id: string; name: string; program: string; cgpa: string; status: "Active" | "Alumni"; semester: string };
export type Lesson = { title: string; duration: string; done: boolean };
export type Course = { id: string; name: string; modules: number; price: string; track: string; thumb: string; lessons: Lesson[] };
export type Lead = { id: string; name: string; email: string; subject: string; status: "Open" | "Contacted" | "Closed" };
export type Staff = { id: string; name: string; role: string; assignment: string };

export type StoreState = {
  students: Student[];
  courses: Course[];
  leads: Lead[];
  staff: Staff[];
};

const defaultState: StoreState = {
  students: [
    { id: "KMR-101", name: "Aarav Sharma", program: "B.Tech CSE", cgpa: "8.4", status: "Active", semester: "5" },
    { id: "KMR-102", name: "K. Manideep", program: "CSE-AI", cgpa: "8.7", status: "Active", semester: "5" },
    { id: "KMR-103", name: "Priya R.", program: "Full-Stack", cgpa: "9.1", status: "Alumni", semester: "8" },
    { id: "KMR-104", name: "Arjun M.", program: "Cloud DevOps", cgpa: "8.2", status: "Active", semester: "3" },
    { id: "KMR-105", name: "Sana K.", program: "Data Analytics", cgpa: "8.9", status: "Alumni", semester: "8" },
  ],
  courses: [
    {
      id: "fsd",
      name: "Full-Stack Web Development",
      modules: 12,
      price: "₹85,000",
      track: "Job Guaranteed",
      thumb: "linear-gradient(135deg,#06B6D4,#1E40AF)",
      lessons: [
        { title: "JavaScript fundamentals", duration: "32m", done: true },
        { title: "React state & hooks", duration: "48m", done: true },
        { title: "Node + Express APIs", duration: "55m", done: true },
        { title: "MongoDB & Mongoose", duration: "41m", done: false },
        { title: "Auth with JWT", duration: "38m", done: false },
        { title: "Deploying full-stack", duration: "29m", done: false },
      ],
    },
    {
      id: "aws",
      name: "AWS Solutions Architect",
      modules: 9,
      price: "₹65,000",
      track: "Certification",
      thumb: "linear-gradient(135deg,#F59E0B,#DC2626)",
      lessons: [
        { title: "AWS global infra", duration: "18m", done: true },
        { title: "EC2 & VPC basics", duration: "44m", done: false },
        { title: "S3 storage classes", duration: "36m", done: false },
        { title: "IAM & policies", duration: "40m", done: false },
      ],
    },
    {
      id: "data",
      name: "Data Analytics & AI",
      modules: 8,
      price: "₹35,000",
      track: "Job Guaranteed",
      thumb: "linear-gradient(135deg,#EC4899,#7C3AED)",
      lessons: [
        { title: "Python crash course", duration: "52m", done: false },
        { title: "Pandas & NumPy", duration: "48m", done: false },
        { title: "Visualization with Power BI", duration: "39m", done: false },
      ],
    },
  ],
  leads: [
    { id: "L-001", name: "Rohan Gupta", email: "rohan@example.com", subject: "Admission inquiry", status: "Open" },
    { id: "L-002", name: "Meera J.", email: "meera@example.com", subject: "Govt program eligibility", status: "Contacted" },
    { id: "L-003", name: "Kunal V.", email: "kunal@example.com", subject: "Fees installment", status: "Open" },
  ],
  staff: [
    { id: "S-01", name: "Priya Raman", role: "Lead Mentor", assignment: "Full-Stack" },
    { id: "S-02", name: "Vikram S.", role: "Cloud Architect", assignment: "DevOps" },
    { id: "S-03", name: "Anita D.", role: "Placement Lead", assignment: "Careers" },
  ],
};

const STORE_KEY = "kmr_realtime_store";

function getSnapshot(): StoreState {
  if (typeof window === "undefined") return defaultState;
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return defaultState;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultState;
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORE_KEY) listener();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function updateStore(updater: (state: StoreState) => StoreState) {
  const next = updater(getSnapshot());
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function useSharedStore() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => defaultState);
  
  return {
    state,
    setStudents: (students: Student[]) => updateStore(s => ({ ...s, students })),
    setCourses: (courses: Course[]) => updateStore(s => ({ ...s, courses })),
    setLeads: (leads: Lead[]) => updateStore(s => ({ ...s, leads })),
    setStaff: (staff: Staff[]) => updateStore(s => ({ ...s, staff })),
    updateCourse: (id: string, partial: Partial<Course>) => updateStore(s => ({
      ...s,
      courses: s.courses.map(c => c.id === id ? { ...c, ...partial } : c)
    })),
    updateStudent: (id: string, partial: Partial<Student>) => updateStore(s => ({
      ...s,
      students: s.students.map(st => st.id === id ? { ...st, ...partial } : st)
    })),
  };
}
