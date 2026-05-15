import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouterState, createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { useState, useEffect, createContext, useContext, useRef, useMemo } from "react";
import { Toaster as Toaster$1 } from "sonner";
import { MessageCircle, Sparkles, X, Send } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const appCss = "/assets/styles-Ck_-krur.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" }
];
const en = {
  // Nav
  "nav.home": "Home",
  "nav.courses": "Courses",
  "nav.careers": "Careers",
  "nav.about": "About Us",
  "nav.contact": "Contact Us",
  "nav.studentLogin": "Student Login",
  "nav.menu": "Menu",
  // Course menu
  "courses.jobGuaranteed": "Job Guaranteed Courses",
  "courses.jobGuaranteed.desc": "100% placement-backed programs",
  "courses.govt": "Govt Sponsored Training",
  "courses.govt.desc": "Skill India & state-funded programs",
  "courses.cert": "Certification",
  "courses.cert.desc": "Industry-recognized certificates",
  "courses.academic": "Academic Program",
  "courses.academic.desc": "Degree-aligned curriculum",
  "careers.kmr": "KMR Career",
  "careers.kmr.desc": "Join our team in India",
  "careers.abroad": "Apprenticeship Abroad",
  "careers.abroad.desc": "International placement portal",
  // Hero
  "hero.eyebrow1": "Career-focused programs",
  "hero.title1": "Your Course to Success.",
  "hero.sub1": "Get trained by Industry Experts & Hired By Tech Employers in these career-focused programs.",
  "hero.eyebrow2": "100% Placement-backed",
  "hero.title2": "Learn. Build. Get Hired.",
  "hero.sub2": "Pay-after-placement programs designed with 150+ hiring partners across India.",
  "hero.eyebrow3": "Govt of India Partner",
  "hero.title3": "Skill India. Future Ready.",
  "hero.sub3": "Free and subsidized programs under PMKVY, NAPS, and DDU-GKY.",
  "hero.exploreCourses": "Explore Courses",
  "hero.chip.live": "Live mentor classes",
  "hero.chip.classes": "this week",
  "hero.chip.placed": "Placement rate",
  // Mission / stats
  "mission.title": "Transforming Lives Through Training & Technology",
  "mission.sub": "Succeed in today's data-driven world. Master in-demand skills and achieve your career goals.",
  "stats.learners": "Learners trained",
  "stats.partners": "Hiring partners",
  "stats.placement": "Placement rate",
  "stats.ctc": "Avg highest CTC",
  // CTA
  "cta.title": "Ready to start your success story?",
  "cta.sub": "Talk to our admissions team and find the right program for your career goals.",
  "cta.talk": "Talk to admissions",
  "cta.browse": "Browse courses",
  // Footer
  "footer.tagline": "Transforming lives through training & technology.",
  "footer.courses": "Courses",
  "footer.company": "Company",
  "footer.contact": "Get in Touch",
  "footer.rights": "All rights reserved.",
  "lang.label": "Language",
  // Gallery section
  "gallery.eyebrow": "Gallery",
  "gallery.title": "Campus & Training Highlights",
  "gallery.sub": "A glimpse into life at KMR Technologies — where careers are built every day.",
  "gallery.card1.title": "Modern Training Labs",
  "gallery.card1.desc": "State-of-the-art computer labs equipped with the latest tools and dual-monitor setups for hands-on coding sessions.",
  "gallery.card2.title": "Industry Expert Workshops",
  "gallery.card2.desc": "Weekly workshops led by senior engineers from Google, Microsoft, and Flipkart sharing real-world insights.",
  "gallery.card3.title": "Placement Success Stories",
  "gallery.card3.desc": "Over 25,000 learners placed across 150+ top tech companies with an average CTC of 6.4 LPA.",
  // Highlights section
  "highlights.eyebrow": "What Sets Us Apart",
  "highlights.title": "Everything you need to succeed",
  "highlights.sub": "Our programs go beyond lectures — we build job-ready engineers with real projects, mentorship, and career support.",
  "highlights.h1.title": "Live Project-Based Learning",
  "highlights.h1.desc": "Build 15+ real-world projects including e-commerce apps, dashboards, and APIs during your bootcamp.",
  "highlights.h2.title": "Cloud-First Curriculum",
  "highlights.h2.desc": "Every course includes hands-on AWS/Azure/GCP labs with exam vouchers for certification.",
  "highlights.h3.title": "Data-Driven Placement Prep",
  "highlights.h3.desc": "Mock interviews, resume workshops, and aptitude training with 98% interview clearance rate.",
  "highlights.h4.title": "Fast-Track Programs",
  "highlights.h4.desc": "Intensive 3-6 month programs designed for career-switchers and fresh graduates.",
  "highlights.h5.title": "Global Opportunities",
  "highlights.h5.desc": "Apprenticeship abroad programs in Germany, Japan, and UAE with visa and relocation support.",
  "highlights.h6.title": "24/7 Mentor Access",
  "highlights.h6.desc": "Unlimited doubt resolution via chat, video calls, and dedicated mentor hours every week.",
  // Programs
  "programs.eyebrow": "Programs",
  "programs.title": "Pathways built for outcomes",
  "programs.sub": "From government-funded skilling to job-guaranteed bootcamps and university-backed degrees — there's a path for every ambition.",
  "programs.explore": "Explore",
  "programs.view": "View programs",
  "programs.jobg.title": "Job Guaranteed Courses",
  "programs.jobg.desc": "Pay-after-placement bootcamps with a signed offer guarantee from our hiring partners.",
  "programs.govt.title": "Govt Sponsored",
  "programs.govt.desc": "PMKVY, NAPS & DDU-GKY programs.",
  "programs.cert.title": "Certifications",
  "programs.cert.desc": "AWS, Azure, GCP & more.",
  "programs.acad.title": "Academic Programs",
  "programs.acad.desc": "UGC-recognized B.Tech, MCA & M.Tech in partnership with top universities.",
  // Why KMR
  "why.eyebrow": "Why KMR",
  "why.title": "Built around your career, not the calendar",
  "why.f1.title": "Industry mentors",
  "why.f1.desc": "Learn from senior engineers from Google, Microsoft, Flipkart and more.",
  "why.f2.title": "Outcome obsessed",
  "why.f2.desc": "92% placement rate with average CTC of 6.4 LPA — and rising.",
  "why.f3.title": "Govt recognized",
  "why.f3.desc": "Programs accredited by NSDC, MSDE, and partner universities.",
  // Testimonials
  "testi.eyebrow": "Testimonials",
  "testi.title": "Real stories from our learners",
  "testi.role1": "Software Engineer, Infosys",
  "testi.q1": "KMR's Full-Stack bootcamp transformed my career. The mentors and placement team were always there for me.",
  "testi.role2": "Cloud Engineer, TCS",
  "testi.q2": "From college dropout to AWS-certified cloud engineer in 6 months. Forever grateful to the KMR team.",
  "testi.role3": "Data Analyst, Flipkart",
  "testi.q3": "Got placed before I even completed the program. The interview prep was honestly the best part.",
  // SIS Dashboard
  "dash.welcome": "Welcome back",
  "dash.profile": "Student Profile",
  "dash.name": "Name",
  "dash.id": "Student ID",
  "dash.program": "Program",
  "dash.semester": "Semester",
  "dash.progress": "Academic Progress",
  "dash.syllabus": "Syllabus Completed",
  "dash.performance": "Performance — Last 6 Months",
  "dash.actions": "Quick Actions",
  "dash.fee": "Fee Payment",
  "dash.attendance": "Attendance",
  "dash.hallTicket": "Hall Ticket",
  "dash.results": "Exam Results",
  "dash.logout": "Logout",
  "dash.notices": "Notices",
  // Admin
  "admin.title": "Admin Command Center",
  "admin.sub": "Manage students, courses, leads and staff.",
  "admin.totalStudents": "Total Students",
  "admin.activeCourses": "Active Courses",
  "admin.placement": "Placement Rate",
  "admin.leads": "Pending Leads",
  "admin.students": "Student Management",
  "admin.courses": "Course Manager",
  "admin.inbox": "Application Inbox",
  "admin.staff": "Staff Directory",
  "admin.search": "Search…",
  "admin.add": "Add new",
  "admin.edit": "Edit",
  "admin.delete": "Delete",
  "admin.view": "View",
  "admin.contacted": "Contacted",
  "admin.closed": "Closed",
  "admin.open": "Open",
  "admin.status": "Status",
  "admin.actions": "Actions",
  "admin.active": "Active",
  "admin.alumni": "Alumni",
  "admin.modules": "modules",
  "admin.syllabus": "Syllabus",
  "admin.newCourse": "New Course",
  "admin.coursePlaceholder": "Course name",
  "admin.pricePlaceholder": "Price (e.g., ₹50,000)",
  "admin.create": "Create",
  "admin.save": "Save",
  "admin.mock": "Mock environment",
  "admin.deleted": "Deleted",
  "admin.removed": "Removed",
  "admin.saved": "Saved",
  "admin.courseAdded": "Course added",
  "admin.editCourse": "Edit course",
  "admin.syllabusUploaded": "Syllabus uploaded (mock)",
  // Bot
  "bot.name": "KMR Assist",
  "bot.greet": "Hi! I'm KMR Assist 🤖 — ask me about courses, placements, or how to apply.",
  "bot.greet.dash": "Hi! Need help navigating your dashboard? Ask about fees, attendance, or results.",
  "bot.placeholder": "Ask about courses, fees…",
  "bot.online": "Online",
  // About
  "about.title": "About KMR Technologies",
  "about.intro": "We bridge the gap between education and employment through industry-aligned, outcome-driven training.",
  "about.mission": "Our Mission",
  "about.mission.p1": "To empower learners with future-ready skills and connect them with leading tech employers — making quality education and meaningful careers accessible to all.",
  "about.mission.p2": "Founded by industry veterans, KMR has trained thousands of learners across India in partnership with the Government of India, NSDC, and leading enterprises.",
  "about.stat.programs": "Programs",
  // Contact
  "contact.title": "Contact Us",
  "contact.intro": "Questions about admissions, careers, or partnerships? Our team will get back within 24 hours.",
  "contact.office": "Office",
  "contact.phone": "Phone",
  "contact.email": "Email",
  "contact.fullname": "Full name",
  "contact.emailPh": "Email address",
  "contact.phonePh": "Phone number",
  "contact.subject": "Subject",
  "contact.message": "Your message",
  "contact.send": "Send Message",
  "contact.sent": "Sent ✓",
  "contact.toast": "Message sent! We'll get back soon.",
  // Course list page
  "clp.duration": "Duration",
  "clp.level": "Level",
  "clp.enquire": "Enquire now",
  "clp.enroll": "Enroll now",
  "clp.outcomes": "Outcomes",
  // Enrollment
  "enroll.title": "Enroll in",
  "enroll.intro": "Reserve your seat — our admissions team will reach out within 24 hours to confirm.",
  "enroll.success": "Enrollment received! We'll contact you shortly.",
  "enroll.form.name": "Full name",
  "enroll.form.email": "Email",
  "enroll.form.phone": "Phone",
  "enroll.form.qualification": "Highest qualification",
  "enroll.form.notes": "Notes (optional)",
  "enroll.form.submit": "Confirm enrollment",
  "enroll.summary": "Order summary",
  "enroll.fee": "Course fee",
  "enroll.gst": "GST (18%)",
  "enroll.total": "Total",
  "enroll.note": "Payment will be collected after admissions confirmation. No upfront charge.",
  // LMS
  "lms.title": "Learning Hub",
  "lms.welcome": "Welcome back",
  "lms.continue": "Continue learning",
  "lms.mycourses": "My Courses",
  "lms.assessments": "Assessments",
  "lms.progress": "Progress",
  "lms.completed": "Completed",
  "lms.lessons": "lessons",
  "lms.startNow": "Start now",
  "lms.resume": "Resume",
  "lms.due": "Due",
  "lms.score": "Score",
  "lms.notStarted": "Not started",
  "lms.inProgress": "In progress",
  "lms.start": "Start",
  "lms.review": "Review",
  "lms.player.title": "Now playing",
  "lms.upcoming": "Upcoming live sessions",
  "lms.join": "Join",
  // Course pages
  "cp.jobg.title": "Job Guaranteed Courses",
  "cp.jobg.tag": "100% Placement Backed",
  "cp.jobg.intro": "Industry-designed programs with a guaranteed job offer or your money back. Learn, build, get hired.",
  "cp.govt.title": "Govt Sponsored Training",
  "cp.govt.tag": "NSDC & State Funded",
  "cp.govt.intro": "Affordable, certified programs partnered with the Government of India and state skill councils.",
  "cp.cert.title": "Certification Programs",
  "cp.cert.tag": "Industry Recognized",
  "cp.cert.intro": "Short, focused certifications aligned with global standards. Upskill in weeks, not years.",
  "cp.acad.title": "Academic Programs",
  "cp.acad.tag": "UGC Recognized",
  "cp.acad.intro": "Degree-aligned programs co-designed with leading universities — earn a degree while getting industry-ready.",
  // Careers KMR
  "ck.title": "Careers at KMR",
  "ck.intro": "Help us shape the next generation of tech talent in India.",
  "ck.apply": "Apply",
  "ck.fulltime": "Full-time",
  "ck.remote": "Remote",
  // Careers Abroad
  "cab.tag": "International Placement Portal",
  "cab.title": "Apprenticeship Abroad",
  "cab.intro": "Earn a global apprenticeship contract with end-to-end visa, language training, and relocation support.",
  "cab.f1.title": "Language Training",
  "cab.f1.desc": "German, Japanese, Arabic — taught by certified trainers.",
  "cab.f2.title": "Visa & Compliance",
  "cab.f2.desc": "End-to-end paperwork managed by our partners.",
  "cab.f3.title": "Relocation Support",
  "cab.f3.desc": "Housing, on-arrival assistance and continuous mentoring.",
  "cab.openDest": "Open destinations",
  "cab.stipend": "Avg stipend",
  // Student-login landing
  "sl.tag": "Secure Student Access",
  "sl.title": "Welcome back, Learner",
  "sl.sub": "Choose your portal to continue your journey with KMR Technologies.",
  "sl.sis.title": "Student Information System",
  "sl.sis.desc": "Manage your profile, attendance, fees, and academic records in one place.",
  "sl.lms.title": "Learning Management System",
  "sl.lms.desc": "Access course videos, labs, assessments, and live mentor sessions.",
  "sl.btn": "LOGIN",
  // Login forms
  "lf.sis.title": "SIS Login",
  "lf.sis.sub": "Sign in with your student ID.",
  "lf.lms.title": "LMS Login",
  "lf.lms.sub": "Sign in to access your courses.",
  "lf.studentId": "Student ID",
  "lf.password": "Password",
  "lf.signIn": "Sign in",
  "lf.signingIn": "Signing in...",
  "lf.demo": "Demo credentials prefilled. This is a mock login.",
  "lf.welcome": "Welcome back!",
  "lf.headline.sis": "Your academic life, beautifully organized.",
  "lf.sub.sis": "Track attendance, view marks, pay fees, and stay updated — all from one secure dashboard.",
  "lf.headline.lms": "Learn anywhere, anytime.",
  "lf.sub.lms": "Pick up where you left off across videos, labs, and live sessions."
};
function build(overrides) {
  return { ...en, ...overrides };
}
const hi = build({
  "nav.home": "होम",
  "nav.courses": "कोर्स",
  "nav.careers": "करियर",
  "nav.about": "हमारे बारे में",
  "nav.contact": "संपर्क करें",
  "nav.studentLogin": "छात्र लॉगिन",
  "nav.menu": "मेनू",
  "courses.jobGuaranteed": "जॉब गारंटी कोर्स",
  "courses.jobGuaranteed.desc": "100% प्लेसमेंट-समर्थित कार्यक्रम",
  "courses.govt": "सरकारी प्रायोजित प्रशिक्षण",
  "courses.govt.desc": "स्किल इंडिया और राज्य-वित्त पोषित कार्यक्रम",
  "courses.cert": "प्रमाणन",
  "courses.cert.desc": "उद्योग-मान्यता प्राप्त प्रमाणपत्र",
  "courses.academic": "शैक्षणिक कार्यक्रम",
  "courses.academic.desc": "डिग्री-संरेखित पाठ्यक्रम",
  "careers.kmr": "केएमआर करियर",
  "careers.kmr.desc": "भारत में हमारी टीम में शामिल हों",
  "careers.abroad": "विदेश में अप्रेंटिसशिप",
  "careers.abroad.desc": "अंतर्राष्ट्रीय प्लेसमेंट पोर्टल",
  "hero.eyebrow1": "करियर-केंद्रित कार्यक्रम",
  "hero.title1": "सफलता का आपका कोर्स।",
  "hero.sub1": "उद्योग विशेषज्ञों से प्रशिक्षण लें और टेक नियोक्ताओं द्वारा नियुक्त हों।",
  "hero.eyebrow2": "100% प्लेसमेंट गारंटी",
  "hero.title2": "सीखें। बनाएं। नौकरी पाएं।",
  "hero.sub2": "150+ हायरिंग पार्टनर्स के साथ पे-आफ्टर-प्लेसमेंट कार्यक्रम।",
  "hero.eyebrow3": "भारत सरकार का साझेदार",
  "hero.title3": "स्किल इंडिया। भविष्य के लिए तैयार।",
  "hero.sub3": "PMKVY, NAPS और DDU-GKY के तहत मुफ्त और सब्सिडी वाले कार्यक्रम।",
  "hero.exploreCourses": "कोर्स देखें",
  "hero.chip.live": "लाइव मेंटर क्लासेस",
  "hero.chip.classes": "इस सप्ताह",
  "hero.chip.placed": "प्लेसमेंट दर",
  "mission.title": "प्रशिक्षण और तकनीक के माध्यम से जीवन बदलना",
  "mission.sub": "आज की डेटा-संचालित दुनिया में सफल हों। मांग वाले कौशल सीखें।",
  "stats.learners": "प्रशिक्षित शिक्षार्थी",
  "stats.partners": "हायरिंग पार्टनर्स",
  "stats.placement": "प्लेसमेंट दर",
  "stats.ctc": "औसत उच्चतम CTC",
  "cta.title": "अपनी सफलता की कहानी शुरू करने के लिए तैयार हैं?",
  "cta.sub": "हमारी प्रवेश टीम से बात करें।",
  "cta.talk": "प्रवेश से बात करें",
  "cta.browse": "कोर्स ब्राउज़ करें",
  "footer.tagline": "प्रशिक्षण और तकनीक के माध्यम से जीवन बदलना।",
  "footer.courses": "कोर्स",
  "footer.company": "कंपनी",
  "footer.contact": "संपर्क करें",
  "footer.rights": "सर्वाधिकार सुरक्षित।",
  "lang.label": "भाषा",
  "gallery.eyebrow": "गैलरी",
  "gallery.title": "कैम्पस और प्रशिक्षण की झलकियाँ",
  "gallery.sub": "केएमआर टेक्नोलॉजीज में जीवन की एक झलक — जहाँ हर दिन करियर बनता है।",
  "gallery.card1.title": "आधुनिक प्रशिक्षण लैब",
  "gallery.card1.desc": "अत्याधुनिक कंप्यूटर लैब जिसमें नवीनतम उपकरण और ड्युअल-मॉनिटर सेटअप हैं।",
  "gallery.card2.title": "उद्योग विशेषज्ञ कार्यशालाएं",
  "gallery.card2.desc": "Google, Microsoft और Flipkart के वरिष्ठ इंजीनियरों द्वारा साप्ताहिक कार्यशालाएं।",
  "gallery.card3.title": "प्लेसमेंट सफलता की कहानियाँ",
  "gallery.card3.desc": "150+ शीर्ष टेक कंपनियों में 25,000+ शिक्षार्थियों की नियुक्ति, औसत CTC 6.4 LPA।",
  "highlights.eyebrow": "हमें अलग क्या बनाता है",
  "highlights.title": "सफलता के लिए जो चाहिए वो सब",
  "highlights.sub": "हमारे कार्यक्रम केवल व्याख्यान से परे हैं — हम वास्तविक परियोजनाओं, मेंटरशिप और करियर समर्थन के साथ नौकरी-तैयार इंजीनियर बनाते हैं।",
  "highlights.h1.title": "लाइव प्रोजेक्ट-आधारित शिक्षा",
  "highlights.h1.desc": "बूटकैम्प के दौरान 15+ वास्तविक दुनिया की परियोजनाएं बनाएं।",
  "highlights.h2.title": "क्लाउड-फर्स्ट पाठ्यक्रम",
  "highlights.h2.desc": "हर कोर्स में AWS/Azure/GCP लैब और परीक्षा वाउचर शामिल हैं।",
  "highlights.h3.title": "डेटा-संचालित प्लेसमेंट तैयारी",
  "highlights.h3.desc": "मॉक इंटरव्यू, रिज्यूमे वर्कशॉप और 98% इंटरव्यू क्लियरेंस दर।",
  "highlights.h4.title": "फास्ट-ट्रैक कार्यक्रम",
  "highlights.h4.desc": "करियर-स्विचर्स और ताजा स्नातकों के लिए 3-6 महीने के गहन कार्यक्रम।",
  "highlights.h5.title": "वैश्विक अवसर",
  "highlights.h5.desc": "जर्मनी, जापान और UAE में वीज़ा और स्थानांतरण समर्थन के साथ अप्रेंटिसशिप।",
  "highlights.h6.title": "24/7 मेंटर एक्सेस",
  "highlights.h6.desc": "चैट, वीडियो कॉल और हर हफ्ते मेंटर घंटों के माध्यम से असीमित समाधान।",
  "programs.eyebrow": "कार्यक्रम",
  "programs.title": "परिणामों के लिए बनाए गए मार्ग",
  "programs.sub": "सरकारी कौशल कार्यक्रमों से लेकर जॉब-गारंटी बूटकैंप और विश्वविद्यालय-समर्थित डिग्री तक — हर महत्वाकांक्षा के लिए एक रास्ता है।",
  "programs.explore": "अन्वेषण करें",
  "programs.view": "कार्यक्रम देखें",
  "programs.jobg.title": "जॉब गारंटी कोर्स",
  "programs.jobg.desc": "हायरिंग पार्टनर्स से हस्ताक्षरित ऑफर गारंटी के साथ पे-आफ्टर-प्लेसमेंट बूटकैंप।",
  "programs.govt.title": "सरकारी प्रायोजित",
  "programs.govt.desc": "PMKVY, NAPS और DDU-GKY कार्यक्रम।",
  "programs.cert.title": "प्रमाणन",
  "programs.cert.desc": "AWS, Azure, GCP और बहुत कुछ।",
  "programs.acad.title": "शैक्षणिक कार्यक्रम",
  "programs.acad.desc": "शीर्ष विश्वविद्यालयों के साथ साझेदारी में UGC-मान्यता प्राप्त B.Tech, MCA और M.Tech।",
  "why.eyebrow": "केएमआर क्यों",
  "why.title": "आपके करियर के लिए बनाया गया",
  "why.f1.title": "उद्योग मेंटर",
  "why.f1.desc": "Google, Microsoft, Flipkart के वरिष्ठ इंजीनियरों से सीखें।",
  "why.f2.title": "परिणाम-केंद्रित",
  "why.f2.desc": "92% प्लेसमेंट दर, औसत CTC 6.4 LPA।",
  "why.f3.title": "सरकार मान्यता प्राप्त",
  "why.f3.desc": "NSDC, MSDE और साझेदार विश्वविद्यालयों द्वारा मान्यता प्राप्त।",
  "testi.eyebrow": "प्रशंसापत्र",
  "testi.title": "हमारे शिक्षार्थियों की वास्तविक कहानियां",
  "testi.role1": "सॉफ्टवेयर इंजीनियर, इंफोसिस",
  "testi.q1": "केएमआर के फुल-स्टैक बूटकैंप ने मेरा करियर बदल दिया।",
  "testi.role2": "क्लाउड इंजीनियर, टीसीएस",
  "testi.q2": "कॉलेज ड्रॉपआउट से 6 महीनों में AWS-प्रमाणित क्लाउड इंजीनियर।",
  "testi.role3": "डेटा एनालिस्ट, फ्लिपकार्ट",
  "testi.q3": "कार्यक्रम पूरा करने से पहले ही प्लेसमेंट मिल गया।",
  "dash.welcome": "वापस स्वागत है",
  "dash.profile": "छात्र प्रोफ़ाइल",
  "dash.name": "नाम",
  "dash.id": "छात्र आईडी",
  "dash.program": "कार्यक्रम",
  "dash.semester": "सेमेस्टर",
  "dash.progress": "शैक्षणिक प्रगति",
  "dash.syllabus": "पाठ्यक्रम पूरा",
  "dash.performance": "प्रदर्शन — पिछले 6 महीने",
  "dash.actions": "त्वरित कार्य",
  "dash.fee": "शुल्क भुगतान",
  "dash.attendance": "उपस्थिति",
  "dash.hallTicket": "हॉल टिकट",
  "dash.results": "परीक्षा परिणाम",
  "dash.logout": "लॉग आउट",
  "dash.notices": "सूचनाएं",
  "admin.title": "एडमिन कमांड सेंटर",
  "admin.sub": "छात्रों, कोर्सेज़, लीड्स और स्टाफ का प्रबंधन करें।",
  "admin.totalStudents": "कुल छात्र",
  "admin.activeCourses": "सक्रिय कोर्स",
  "admin.placement": "प्लेसमेंट दर",
  "admin.leads": "लंबित लीड्स",
  "admin.students": "छात्र प्रबंधन",
  "admin.courses": "कोर्स प्रबंधक",
  "admin.inbox": "आवेदन इनबॉक्स",
  "admin.staff": "स्टाफ निर्देशिका",
  "admin.search": "खोजें…",
  "admin.add": "नया जोड़ें",
  "admin.edit": "संपादित करें",
  "admin.delete": "हटाएं",
  "admin.view": "देखें",
  "admin.contacted": "संपर्क किया",
  "admin.closed": "बंद",
  "admin.open": "खुला",
  "admin.status": "स्थिति",
  "admin.actions": "क्रियाएँ",
  "admin.active": "सक्रिय",
  "admin.alumni": "पूर्व छात्र",
  "admin.modules": "मॉड्यूल",
  "admin.syllabus": "पाठ्यक्रम",
  "admin.newCourse": "नया कोर्स",
  "admin.coursePlaceholder": "कोर्स का नाम",
  "admin.pricePlaceholder": "मूल्य (जैसे ₹50,000)",
  "admin.create": "बनाएँ",
  "admin.save": "सहेजें",
  "admin.mock": "मॉक वातावरण",
  "admin.deleted": "हटा दिया गया",
  "admin.removed": "हटाया गया",
  "admin.saved": "सहेजा गया",
  "admin.courseAdded": "कोर्स जोड़ा गया",
  "admin.editCourse": "कोर्स संपादित करें",
  "admin.syllabusUploaded": "सिलेबस अपलोड (मॉक)",
  "bot.name": "केएमआर असिस्ट",
  "bot.greet": "नमस्ते! मैं केएमआर असिस्ट 🤖 — कोर्स, प्लेसमेंट या आवेदन के बारे में पूछें।",
  "bot.greet.dash": "नमस्ते! डैशबोर्ड में मदद चाहिए?",
  "bot.placeholder": "कोर्स, फीस के बारे में पूछें…",
  "bot.online": "ऑनलाइन",
  "about.title": "केएमआर टेक्नोलॉजीज के बारे में",
  "about.intro": "हम उद्योग-संरेखित प्रशिक्षण के माध्यम से शिक्षा और रोजगार के बीच की खाई को पाटते हैं।",
  "about.mission": "हमारा मिशन",
  "about.mission.p1": "शिक्षार्थियों को भविष्य-तैयार कौशल देना और उन्हें शीर्ष टेक नियोक्ताओं से जोड़ना।",
  "about.mission.p2": "केएमआर ने भारत सरकार, NSDC और प्रमुख उद्यमों के साथ साझेदारी में हजारों शिक्षार्थियों को प्रशिक्षित किया है।",
  "about.stat.programs": "कार्यक्रम",
  "contact.title": "संपर्क करें",
  "contact.intro": "प्रवेश, करियर या साझेदारी के बारे में प्रश्न? हमारी टीम 24 घंटे में जवाब देगी।",
  "contact.office": "कार्यालय",
  "contact.phone": "फ़ोन",
  "contact.email": "ईमेल",
  "contact.fullname": "पूरा नाम",
  "contact.emailPh": "ईमेल पता",
  "contact.phonePh": "फ़ोन नंबर",
  "contact.subject": "विषय",
  "contact.message": "आपका संदेश",
  "contact.send": "संदेश भेजें",
  "contact.sent": "भेज दिया ✓",
  "contact.toast": "संदेश भेज दिया गया!",
  "clp.duration": "अवधि",
  "clp.level": "स्तर",
  "clp.enquire": "पूछताछ करें",
  "clp.enroll": "अभी नामांकन करें",
  "clp.outcomes": "परिणाम",
  "enroll.title": "नामांकन",
  "enroll.intro": "अपनी सीट आरक्षित करें — हमारी प्रवेश टीम 24 घंटे में संपर्क करेगी।",
  "enroll.success": "नामांकन प्राप्त हुआ! हम जल्द ही संपर्क करेंगे।",
  "enroll.form.name": "पूरा नाम",
  "enroll.form.email": "ईमेल",
  "enroll.form.phone": "फ़ोन",
  "enroll.form.qualification": "उच्चतम योग्यता",
  "enroll.form.notes": "नोट्स (वैकल्पिक)",
  "enroll.form.submit": "नामांकन की पुष्टि करें",
  "enroll.summary": "ऑर्डर सारांश",
  "enroll.fee": "कोर्स शुल्क",
  "enroll.gst": "जीएसटी (18%)",
  "enroll.total": "कुल",
  "enroll.note": "प्रवेश पुष्टि के बाद भुगतान लिया जाएगा। कोई अग्रिम शुल्क नहीं।",
  "lms.title": "लर्निंग हब",
  "lms.welcome": "वापस स्वागत है",
  "lms.continue": "सीखना जारी रखें",
  "lms.mycourses": "मेरे कोर्स",
  "lms.assessments": "मूल्यांकन",
  "lms.progress": "प्रगति",
  "lms.completed": "पूर्ण",
  "lms.lessons": "पाठ",
  "lms.startNow": "अभी शुरू करें",
  "lms.resume": "जारी रखें",
  "lms.due": "देय",
  "lms.score": "स्कोर",
  "lms.notStarted": "शुरू नहीं हुआ",
  "lms.inProgress": "प्रगति में",
  "lms.start": "शुरू करें",
  "lms.review": "समीक्षा",
  "lms.player.title": "अभी चल रहा है",
  "lms.upcoming": "आगामी लाइव सत्र",
  "lms.join": "शामिल हों",
  "cp.jobg.title": "जॉब गारंटी कोर्स",
  "cp.jobg.tag": "100% प्लेसमेंट समर्थित",
  "cp.jobg.intro": "उद्योग-निर्मित कार्यक्रम जॉब गारंटी या पैसा वापस के साथ।",
  "cp.govt.title": "सरकारी प्रायोजित प्रशिक्षण",
  "cp.govt.tag": "NSDC और राज्य वित्तपोषित",
  "cp.govt.intro": "भारत सरकार के साथ साझेदारी में सस्ते, प्रमाणित कार्यक्रम।",
  "cp.cert.title": "प्रमाणन कार्यक्रम",
  "cp.cert.tag": "उद्योग मान्यता प्राप्त",
  "cp.cert.intro": "वैश्विक मानकों के अनुरूप छोटे, केंद्रित प्रमाणन।",
  "cp.acad.title": "शैक्षणिक कार्यक्रम",
  "cp.acad.tag": "UGC मान्यता प्राप्त",
  "cp.acad.intro": "प्रमुख विश्वविद्यालयों के साथ डिग्री-संरेखित कार्यक्रम।",
  "ck.title": "केएमआर में करियर",
  "ck.intro": "भारत में अगली पीढ़ी के तकनीकी प्रतिभा को आकार देने में हमारी मदद करें।",
  "ck.apply": "आवेदन करें",
  "ck.fulltime": "पूर्णकालिक",
  "ck.remote": "रिमोट",
  "cab.tag": "अंतर्राष्ट्रीय प्लेसमेंट पोर्टल",
  "cab.title": "विदेश में अप्रेंटिसशिप",
  "cab.intro": "वैश्विक अप्रेंटिसशिप अनुबंध — वीज़ा, भाषा प्रशिक्षण, स्थानांतरण समर्थन।",
  "cab.f1.title": "भाषा प्रशिक्षण",
  "cab.f1.desc": "जर्मन, जापानी, अरबी — प्रमाणित प्रशिक्षकों द्वारा।",
  "cab.f2.title": "वीज़ा और अनुपालन",
  "cab.f2.desc": "हमारे साझेदारों द्वारा अंत-से-अंत कागजी कार्रवाई।",
  "cab.f3.title": "स्थानांतरण समर्थन",
  "cab.f3.desc": "आवास, आगमन सहायता और निरंतर मार्गदर्शन।",
  "cab.openDest": "खुले गंतव्य",
  "cab.stipend": "औसत वजीफा",
  "sl.tag": "सुरक्षित छात्र पहुंच",
  "sl.title": "वापस स्वागत है, शिक्षार्थी",
  "sl.sub": "अपनी यात्रा जारी रखने के लिए अपना पोर्टल चुनें।",
  "sl.sis.title": "छात्र सूचना प्रणाली",
  "sl.sis.desc": "अपनी प्रोफ़ाइल, उपस्थिति, शुल्क और शैक्षणिक रिकॉर्ड एक स्थान पर प्रबंधित करें।",
  "sl.lms.title": "शिक्षण प्रबंधन प्रणाली",
  "sl.lms.desc": "कोर्स वीडियो, लैब, मूल्यांकन और लाइव मेंटर सत्रों तक पहुंचें।",
  "sl.btn": "लॉगिन",
  "lf.sis.title": "SIS लॉगिन",
  "lf.sis.sub": "अपनी छात्र आईडी से साइन इन करें।",
  "lf.lms.title": "LMS लॉगिन",
  "lf.lms.sub": "अपने कोर्स तक पहुंचने के लिए साइन इन करें।",
  "lf.studentId": "छात्र आईडी",
  "lf.password": "पासवर्ड",
  "lf.signIn": "साइन इन करें",
  "lf.signingIn": "साइन इन हो रहा है...",
  "lf.demo": "डेमो क्रेडेंशियल पहले से भरे हुए हैं।",
  "lf.welcome": "वापस स्वागत है!",
  "lf.headline.sis": "आपका शैक्षणिक जीवन, सुंदर व्यवस्थित।",
  "lf.sub.sis": "उपस्थिति ट्रैक करें, अंक देखें, शुल्क भुगतान करें।",
  "lf.headline.lms": "कहीं भी, कभी भी सीखें।",
  "lf.sub.lms": "वीडियो, लैब और लाइव सत्रों में जहां छोड़ा था वहीं से जारी रखें।"
});
const ta = build({
  "nav.home": "முகப்பு",
  "nav.courses": "பாடநெறிகள்",
  "nav.careers": "தொழில்",
  "nav.about": "எங்களைப் பற்றி",
  "nav.contact": "தொடர்பு கொள்ள",
  "nav.studentLogin": "மாணவர் உள்நுழைவு",
  "nav.menu": "மெனு",
  "courses.jobGuaranteed": "வேலை உத்தரவாத பாடநெறிகள்",
  "courses.jobGuaranteed.desc": "100% இடவசதி உறுதி திட்டங்கள்",
  "courses.govt": "அரசு வழங்கும் பயிற்சி",
  "courses.govt.desc": "ஸ்கில் இந்தியா & அரசு நிதியளிப்பு",
  "courses.cert": "சான்றிதழ்",
  "courses.cert.desc": "தொழில்துறை அங்கீகாரம் பெற்ற சான்றிதழ்கள்",
  "courses.academic": "கல்வித் திட்டம்",
  "courses.academic.desc": "பட்டப்படிப்பு பாடத்திட்டம்",
  "careers.kmr": "KMR தொழில்",
  "careers.kmr.desc": "இந்தியாவில் எங்கள் குழுவில் சேருங்கள்",
  "careers.abroad": "வெளிநாட்டில் பயிற்சி",
  "careers.abroad.desc": "சர்வதேச இடவசதி போர்டல்",
  "hero.eyebrow1": "தொழில் சார்ந்த திட்டங்கள்",
  "hero.title1": "வெற்றிக்கான உங்கள் பாடநெறி.",
  "hero.sub1": "தொழில்துறை நிபுணர்களால் பயிற்சி பெற்று வேலை பெறுங்கள்.",
  "hero.eyebrow2": "100% இடவசதி உத்தரவாதம்",
  "hero.title2": "கற்க. உருவாக்க. வேலை பெறுக.",
  "hero.sub2": "150+ பணியமர்த்தல் பங்காளிகளுடன் திட்டங்கள்.",
  "hero.eyebrow3": "இந்திய அரசு பங்காளி",
  "hero.title3": "ஸ்கில் இந்தியா. எதிர்காலத்திற்கு தயார்.",
  "hero.sub3": "PMKVY, NAPS, DDU-GKY கீழ் இலவச திட்டங்கள்.",
  "hero.exploreCourses": "பாடநெறிகளைப் பார்க்க",
  "hero.chip.live": "நேரடி வழிகாட்டி வகுப்புகள்",
  "hero.chip.classes": "இந்த வாரம்",
  "hero.chip.placed": "வேலைவாய்ப்பு விகிதம்",
  "mission.title": "பயிற்சி & தொழில்நுட்பம் மூலம் வாழ்க்கையை மாற்றுதல்",
  "mission.sub": "தரவு உலகில் வெற்றி பெற தேவையான திறன்களை கற்றுக்கொள்ளுங்கள்.",
  "stats.learners": "பயிற்சி பெற்றவர்கள்",
  "stats.partners": "பணியமர்த்தல் பங்காளிகள்",
  "stats.placement": "வேலைவாய்ப்பு விகிதம்",
  "stats.ctc": "சராசரி உயர் CTC",
  "cta.title": "உங்கள் வெற்றிக் கதையைத் தொடங்க தயாரா?",
  "cta.sub": "எங்கள் சேர்க்கை குழுவுடன் பேசுங்கள்.",
  "cta.talk": "சேர்க்கையில் பேசு",
  "cta.browse": "பாடநெறிகளை உலாவ",
  "footer.tagline": "பயிற்சி & தொழில்நுட்பம் மூலம் வாழ்க்கையை மாற்றுதல்.",
  "footer.courses": "பாடநெறிகள்",
  "footer.company": "நிறுவனம்",
  "footer.contact": "தொடர்பு கொள்ள",
  "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  "lang.label": "மொழி",
  "gallery.eyebrow": "கேலரி",
  "gallery.title": "கேம்பஸ் & பயிற்சி சிறப்பம்சங்கள்",
  "gallery.sub": "KMR தொழில்நுட்பங்களில் வாழ்க்கையின் ஒரு பார்வை — ஒவ்வொரு நாளும் தொழில்கள் கட்டமைக்கப்படும் இடம்.",
  "gallery.card1.title": "நவீன பயிற்சி ஆய்வகங்கள்",
  "gallery.card1.desc": "நவீன கணினி ஆய்வகங்கள் சமீபத்திய கருவிகள் மற்றும் இரட்டை மானிட்டர் அமைப்புடன்.",
  "gallery.card2.title": "தொழில்துறை நிபுணர் பட்டறைகள்",
  "gallery.card2.desc": "Google, Microsoft மற்றும் Flipkart இன் மூத்த பொறியாளர்களால் வழிகாட்டப்படும் வாராந்திர பட்டறைகள்.",
  "gallery.card3.title": "வேலைவாய்ப்பு வெற்றிக் கதைகள்",
  "gallery.card3.desc": "150+ தொழில்நுட்ப நிறுவனங்களில் 25,000+ கற்பவர்கள் வேலை, சராசரி CTC 6.4 LPA.",
  "highlights.eyebrow": "நம்மை தனித்துவமாக்குவது என்ன",
  "highlights.title": "வெற்றிக்கு தேவையான அனைத்தும்",
  "highlights.sub": "எங்கள் திட்டங்கள் வெறும் விரிவுரைகளை தாண்டி — உண்மையான திட்டங்கள், வழிகாட்டுதல் மற்றும் தொழில் ஆதரவுடன் வேலை தயார் பொறியாளர்களை உருவாக்குகிறோம்.",
  "highlights.h1.title": "நேரடி திட்ட-அடிப்படை கற்றல்",
  "highlights.h1.desc": "பூட்காம்பில் 15+ உண்மையான திட்டங்களை உருவாக்குங்கள்.",
  "highlights.h2.title": "கிளவுட்-ஃபர்ஸ்ட் பாடத்திட்டம்",
  "highlights.h2.desc": "ஒவ்வொரு பாடத்திலும் AWS/Azure/GCP ஆய்வகங்கள் மற்றும் தேர்வு வாவுச்சர்கள்.",
  "highlights.h3.title": "டேட்டா-சார்ந்த வேலைவாய்ப்பு தயாரிப்பு",
  "highlights.h3.desc": "மாக் நேர்முகம், ரெஸ்யூம் பட்டறை மற்றும் 98% நேர்முகம் தேர்வு விகிதம்.",
  "highlights.h4.title": "வேகமான திட்டங்கள்",
  "highlights.h4.desc": "3-6 மாத தீவிர திட்டங்கள் தொழில் மாற்றியவர்கள் மற்றும் புதிய பட்டதாரிகளுக்கு.",
  "highlights.h5.title": "உலகளாவிய வாய்ப்புகள்",
  "highlights.h5.desc": "ஜெர்மனி, ஜப்பான், UAE பயிற்சி திட்டங்கள் விசா மற்றும் இடமாற்றம் ஆதரவுடன்.",
  "highlights.h6.title": "24/7 வழிகாட்டி அணுகல்",
  "highlights.h6.desc": "அரட்டை, வீடியோ அழைப்புகள் மற்றும் வழிகாட்டி நேரங்கள் மூலம் வரம்பற்ற சந்தேக தீர்வு.",
  "programs.eyebrow": "திட்டங்கள்",
  "programs.title": "முடிவுகளுக்காக உருவாக்கப்பட்ட பாதைகள்",
  "programs.sub": "அரசு நிதியளிப்பு பயிற்சி முதல் வேலை-உத்தரவாத பூட்காம்ப்கள் வரை — ஒவ்வொரு லட்சியத்திற்கும் ஒரு பாதை.",
  "programs.explore": "ஆராய",
  "programs.view": "திட்டங்களைப் பார்",
  "programs.jobg.title": "வேலை உத்தரவாத பாடநெறிகள்",
  "programs.jobg.desc": "பணியமர்த்தல் பங்காளிகளிடமிருந்து சலுகை உத்தரவாதத்துடன் பூட்காம்ப்கள்.",
  "programs.govt.title": "அரசு வழங்கும்",
  "programs.govt.desc": "PMKVY, NAPS & DDU-GKY திட்டங்கள்.",
  "programs.cert.title": "சான்றிதழ்கள்",
  "programs.cert.desc": "AWS, Azure, GCP & மேலும்.",
  "programs.acad.title": "கல்வித் திட்டங்கள்",
  "programs.acad.desc": "சிறந்த பல்கலைக்கழகங்களுடன் UGC-அங்கீகாரம் பெற்ற B.Tech, MCA & M.Tech.",
  "why.eyebrow": "ஏன் KMR",
  "why.title": "உங்கள் தொழிலுக்காக கட்டமைக்கப்பட்டது",
  "why.f1.title": "தொழில்துறை வழிகாட்டிகள்",
  "why.f1.desc": "Google, Microsoft, Flipkart மூத்த பொறியாளர்களிடமிருந்து கற்றுக்கொள்ளுங்கள்.",
  "why.f2.title": "முடிவு கவனம்",
  "why.f2.desc": "92% இடவசதி விகிதம், சராசரி CTC 6.4 LPA.",
  "why.f3.title": "அரசு அங்கீகாரம்",
  "why.f3.desc": "NSDC, MSDE மற்றும் பங்காளி பல்கலைக்கழகங்களால் அங்கீகரிக்கப்பட்டது.",
  "testi.eyebrow": "சான்றுகள்",
  "testi.title": "எங்கள் கற்பவர்களின் உண்மையான கதைகள்",
  "testi.role1": "மென்பொருள் பொறியாளர், Infosys",
  "testi.q1": "KMR இன் ஃபுல்-ஸ்டாக் பூட்காம்ப் என் தொழிலை மாற்றியது.",
  "testi.role2": "கிளவுட் இன்ஜினியர், TCS",
  "testi.q2": "கல்லூரி இடைநிறுத்தத்தில் இருந்து 6 மாதங்களில் AWS சான்றிதழ்.",
  "testi.role3": "டேட்டா அனலிஸ்ட், Flipkart",
  "testi.q3": "திட்டம் முடிக்கும் முன்பே வேலை கிடைத்தது.",
  "dash.welcome": "மீண்டும் வரவேற்கிறோம்",
  "dash.profile": "மாணவர் சுயவிவரம்",
  "dash.name": "பெயர்",
  "dash.id": "மாணவர் ஐடி",
  "dash.program": "திட்டம்",
  "dash.semester": "செமஸ்டர்",
  "dash.progress": "கல்வி முன்னேற்றம்",
  "dash.syllabus": "பாடத்திட்டம் முடிந்தது",
  "dash.performance": "செயல்திறன் — கடந்த 6 மாதங்கள்",
  "dash.actions": "விரைவு செயல்கள்",
  "dash.fee": "கட்டண செலுத்துகை",
  "dash.attendance": "வருகை",
  "dash.hallTicket": "ஹால் டிக்கெட்",
  "dash.results": "தேர்வு முடிவுகள்",
  "dash.logout": "வெளியேறு",
  "dash.notices": "அறிவிப்புகள்",
  "admin.title": "நிர்வாக கட்டுப்பாட்டு மையம்",
  "admin.sub": "மாணவர்கள், பாடநெறிகள், லீட்கள் மற்றும் ஊழியர்களை நிர்வகிக்கவும்.",
  "admin.totalStudents": "மொத்த மாணவர்கள்",
  "admin.activeCourses": "செயல்பாட்டு பாடநெறிகள்",
  "admin.placement": "இடவசதி விகிதம்",
  "admin.leads": "நிலுவையில் உள்ள லீட்கள்",
  "admin.students": "மாணவர் மேலாண்மை",
  "admin.courses": "பாடநெறி மேலாளர்",
  "admin.inbox": "விண்ணப்ப இன்பாக்ஸ்",
  "admin.staff": "ஊழியர் கோப்பு",
  "admin.search": "தேடு…",
  "admin.add": "புதிது சேர்க்க",
  "admin.edit": "திருத்து",
  "admin.delete": "நீக்கு",
  "admin.view": "பார்",
  "admin.contacted": "தொடர்பு கொண்டது",
  "admin.closed": "மூடப்பட்டது",
  "admin.open": "திற",
  "admin.status": "நிலை",
  "admin.actions": "செயல்கள்",
  "admin.active": "செயலில்",
  "admin.alumni": "முன்னாள் மாணவர்",
  "admin.modules": "தொகுதிகள்",
  "admin.syllabus": "பாடத்திட்டம்",
  "admin.newCourse": "புதிய பாடநெறி",
  "admin.coursePlaceholder": "பாடநெறி பெயர்",
  "admin.pricePlaceholder": "விலை (உதா: ₹50,000)",
  "admin.create": "உருவாக்கு",
  "admin.save": "சேமி",
  "admin.mock": "மாதிரி சூழல்",
  "admin.deleted": "நீக்கப்பட்டது",
  "admin.removed": "அகற்றப்பட்டது",
  "admin.saved": "சேமிக்கப்பட்டது",
  "admin.courseAdded": "பாடநெறி சேர்க்கப்பட்டது",
  "admin.editCourse": "பாடநெறியை திருத்து",
  "admin.syllabusUploaded": "பாடத்திட்டம் பதிவேற்றப்பட்டது (மாதிரி)",
  "bot.name": "KMR உதவி",
  "bot.greet": "வணக்கம்! நான் KMR உதவி 🤖 — பாடநெறிகள் பற்றி கேளுங்கள்.",
  "bot.greet.dash": "வணக்கம்! டாஷ்போர்டில் உதவி தேவையா?",
  "bot.placeholder": "பாடநெறிகள், கட்டணம் பற்றி கேளுங்கள்…",
  "bot.online": "ஆன்லைன்",
  "about.title": "KMR டெக்னாலஜிஸ் பற்றி",
  "about.intro": "தொழில்துறை சீரமைவு பயிற்சி மூலம் கல்விக்கும் வேலைக்கும் இடையேயான இடைவெளியை இணைக்கிறோம்.",
  "about.mission": "எங்கள் நோக்கம்",
  "about.mission.p1": "கற்பவர்களுக்கு எதிர்கால திறன்களை வழங்கி முன்னணி தொழில்நுட்ப நிறுவனங்களுடன் இணைப்பது.",
  "about.mission.p2": "KMR இந்திய அரசு, NSDC மற்றும் முன்னணி நிறுவனங்களுடன் ஆயிரக்கணக்கான மாணவர்களை பயிற்றுவித்துள்ளது.",
  "about.stat.programs": "திட்டங்கள்",
  "contact.title": "தொடர்பு கொள்ள",
  "contact.intro": "சேர்க்கை, தொழில் அல்லது பங்காண்மை பற்றி கேள்விகள்? 24 மணி நேரத்தில் பதிலளிப்போம்.",
  "contact.office": "அலுவலகம்",
  "contact.phone": "தொலைபேசி",
  "contact.email": "மின்னஞ்சல்",
  "contact.fullname": "முழு பெயர்",
  "contact.emailPh": "மின்னஞ்சல் முகவரி",
  "contact.phonePh": "தொலைபேசி எண்",
  "contact.subject": "பொருள்",
  "contact.message": "உங்கள் செய்தி",
  "contact.send": "செய்தி அனுப்பு",
  "contact.sent": "அனுப்பப்பட்டது ✓",
  "contact.toast": "செய்தி அனுப்பப்பட்டது!",
  "clp.duration": "காலம்",
  "clp.level": "நிலை",
  "clp.enquire": "விசாரிக்க",
  "clp.enroll": "இப்போது பதிவு செய்க",
  "clp.outcomes": "முடிவுகள்",
  "enroll.title": "பதிவு",
  "enroll.intro": "உங்கள் இடத்தை முன்பதிவு செய்யுங்கள் — 24 மணி நேரத்தில் தொடர்பு கொள்வோம்.",
  "enroll.success": "பதிவு பெறப்பட்டது! விரைவில் தொடர்பு கொள்வோம்.",
  "enroll.form.name": "முழு பெயர்",
  "enroll.form.email": "மின்னஞ்சல்",
  "enroll.form.phone": "தொலைபேசி",
  "enroll.form.qualification": "உயர் தகுதி",
  "enroll.form.notes": "குறிப்புகள் (விருப்பம்)",
  "enroll.form.submit": "பதிவை உறுதிப்படுத்து",
  "enroll.summary": "ஆர்டர் சுருக்கம்",
  "enroll.fee": "பாடநெறி கட்டணம்",
  "enroll.gst": "GST (18%)",
  "enroll.total": "மொத்தம்",
  "enroll.note": "சேர்க்கை உறுதிக்குப் பிறகு கட்டணம் பெறப்படும்.",
  "lms.title": "கற்றல் மையம்",
  "lms.welcome": "மீண்டும் வரவேற்கிறோம்",
  "lms.continue": "கற்றலைத் தொடரவும்",
  "lms.mycourses": "என் பாடநெறிகள்",
  "lms.assessments": "மதிப்பீடுகள்",
  "lms.progress": "முன்னேற்றம்",
  "lms.completed": "நிறைவு",
  "lms.lessons": "பாடங்கள்",
  "lms.startNow": "இப்போது தொடங்கு",
  "lms.resume": "தொடர",
  "lms.due": "காலக்கெடு",
  "lms.score": "மதிப்பெண்",
  "lms.notStarted": "தொடங்கப்படவில்லை",
  "lms.inProgress": "முன்னேற்றத்தில்",
  "lms.start": "தொடங்கு",
  "lms.review": "மதிப்பாய்வு",
  "lms.player.title": "இப்போது இயங்குகிறது",
  "lms.upcoming": "வரவிருக்கும் நேரடி அமர்வுகள்",
  "lms.join": "சேர",
  "cp.jobg.title": "வேலை உத்தரவாத பாடநெறிகள்",
  "cp.jobg.tag": "100% இடவசதி உறுதி",
  "cp.jobg.intro": "வேலை உத்தரவாதம் அல்லது பணம் திரும்பப் பெறும் தொழில்துறை திட்டங்கள்.",
  "cp.govt.title": "அரசு வழங்கும் பயிற்சி",
  "cp.govt.tag": "NSDC & மாநில நிதியளிப்பு",
  "cp.govt.intro": "இந்திய அரசுடன் இணைந்த சான்றளிக்கப்பட்ட திட்டங்கள்.",
  "cp.cert.title": "சான்றிதழ் திட்டங்கள்",
  "cp.cert.tag": "தொழில்துறை அங்கீகாரம்",
  "cp.cert.intro": "உலகளாவிய தரத்திற்கு ஏற்ற குறுகிய சான்றிதழ்கள்.",
  "cp.acad.title": "கல்வித் திட்டங்கள்",
  "cp.acad.tag": "UGC அங்கீகாரம்",
  "cp.acad.intro": "முன்னணி பல்கலைக்கழகங்களுடன் இணைந்த பட்டப்படிப்பு திட்டங்கள்.",
  "ck.title": "KMR இல் தொழில்",
  "ck.intro": "இந்தியாவில் அடுத்த தலைமுறை திறமைகளை வடிவமைக்க உதவுங்கள்.",
  "ck.apply": "விண்ணப்பிக்கவும்",
  "ck.fulltime": "முழு நேரம்",
  "ck.remote": "தொலைதூரம்",
  "cab.tag": "சர்வதேச இடவசதி போர்டல்",
  "cab.title": "வெளிநாட்டில் பயிற்சி",
  "cab.intro": "உலகளாவிய பயிற்சி ஒப்பந்தம் — விசா, மொழி பயிற்சி, இடமாற்றம் ஆதரவு.",
  "cab.f1.title": "மொழி பயிற்சி",
  "cab.f1.desc": "ஜெர்மன், ஜப்பானிய, அரபு — சான்றளிக்கப்பட்ட பயிற்றுநர்கள்.",
  "cab.f2.title": "விசா & இணக்கம்",
  "cab.f2.desc": "எங்கள் பங்காளிகளால் முழு ஆவண நிர்வாகம்.",
  "cab.f3.title": "இடமாற்றம் ஆதரவு",
  "cab.f3.desc": "வீட்டுவசதி, வரும்போது உதவி, தொடர் வழிகாட்டுதல்.",
  "cab.openDest": "திறந்த இடங்கள்",
  "cab.stipend": "சராசரி உதவித்தொகை",
  "sl.tag": "பாதுகாப்பான மாணவர் அணுகல்",
  "sl.title": "மீண்டும் வரவேற்கிறோம், கற்பவர்",
  "sl.sub": "உங்கள் பயணத்தைத் தொடர உங்கள் போர்டலைத் தேர்ந்தெடுக்கவும்.",
  "sl.sis.title": "மாணவர் தகவல் அமைப்பு",
  "sl.sis.desc": "உங்கள் சுயவிவரம், வருகை, கட்டணங்கள், கல்வி பதிவுகள் ஒரே இடத்தில்.",
  "sl.lms.title": "கற்றல் மேலாண்மை அமைப்பு",
  "sl.lms.desc": "பாடநெறி வீடியோக்கள், ஆய்வகங்கள், மதிப்பீடுகள் மற்றும் நேரடி அமர்வுகள்.",
  "sl.btn": "உள்நுழைவு",
  "lf.sis.title": "SIS உள்நுழைவு",
  "lf.sis.sub": "உங்கள் மாணவர் ஐடி மூலம் உள்நுழையவும்.",
  "lf.lms.title": "LMS உள்நுழைவு",
  "lf.lms.sub": "உங்கள் பாடநெறிகளை அணுக உள்நுழையவும்.",
  "lf.studentId": "மாணவர் ஐடி",
  "lf.password": "கடவுச்சொல்",
  "lf.signIn": "உள்நுழை",
  "lf.signingIn": "உள்நுழைகிறது...",
  "lf.demo": "டெமோ அடையாளங்கள் முன்-நிரப்பப்பட்டன.",
  "lf.welcome": "மீண்டும் வரவேற்கிறோம்!",
  "lf.headline.sis": "உங்கள் கல்வி வாழ்க்கை, அழகாக ஒழுங்கமைக்கப்பட்டது.",
  "lf.sub.sis": "வருகையை கண்காணித்து, மதிப்பெண்களை பார்த்து, கட்டணங்களை செலுத்தவும்.",
  "lf.headline.lms": "எங்கேயும், எப்போதும் கற்றுக்கொள்ளுங்கள்.",
  "lf.sub.lms": "வீடியோக்கள், ஆய்வகங்கள், நேரடி அமர்வுகளில் தொடரவும்."
});
const te = build({
  "nav.home": "హోమ్",
  "nav.courses": "కోర్సులు",
  "nav.careers": "కెరీర్లు",
  "nav.about": "మా గురించి",
  "nav.contact": "సంప్రదించండి",
  "nav.studentLogin": "విద్యార్థి లాగిన్",
  "nav.menu": "మెను",
  "courses.jobGuaranteed": "ఉద్యోగ హామీ కోర్సులు",
  "courses.jobGuaranteed.desc": "100% ప్లేస్‌మెంట్-మద్దతు కార్యక్రమాలు",
  "courses.govt": "ప్రభుత్వ ప్రాయోజిత శిక్షణ",
  "courses.govt.desc": "స్కిల్ ఇండియా & ప్రభుత్వ నిధులు",
  "courses.cert": "సర్టిఫికేషన్",
  "courses.cert.desc": "పరిశ్రమ గుర్తింపు సర్టిఫికెట్లు",
  "courses.academic": "అకడమిక్ ప్రోగ్రామ్",
  "courses.academic.desc": "డిగ్రీ-సమలేఖన పాఠ్యప్రణాళిక",
  "careers.kmr": "KMR కెరీర్",
  "careers.kmr.desc": "భారతదేశంలో మా బృందంలో చేరండి",
  "careers.abroad": "విదేశాల్లో అప్రెంటిస్‌షిప్",
  "careers.abroad.desc": "అంతర్జాతీయ ప్లేస్‌మెంట్ పోర్టల్",
  "hero.eyebrow1": "కెరీర్-కేంద్రిత కార్యక్రమాలు",
  "hero.title1": "మీ విజయానికి కోర్సు.",
  "hero.sub1": "పరిశ్రమ నిపుణులచే శిక్షణ పొంది ఉద్యోగం పొందండి.",
  "hero.eyebrow2": "100% ప్లేస్‌మెంట్ హామీ",
  "hero.title2": "నేర్చుకోండి. నిర్మించండి. ఉద్యోగం పొందండి.",
  "hero.sub2": "150+ హైరింగ్ భాగస్వాములతో కార్యక్రమాలు.",
  "hero.eyebrow3": "భారత ప్రభుత్వ భాగస్వామి",
  "hero.title3": "స్కిల్ ఇండియా. భవిష్యత్తుకు సిద్ధం.",
  "hero.sub3": "PMKVY, NAPS, DDU-GKY కింద ఉచిత కార్యక్రమాలు.",
  "hero.exploreCourses": "కోర్సులను అన్వేషించండి",
  "hero.chip.live": "లైవ్ మెంటార్ క్లాసులు",
  "hero.chip.classes": "ఈ వారం",
  "hero.chip.placed": "ప్లేస్‌మెంట్ రేటు",
  "mission.title": "శిక్షణ & సాంకేతికత ద్వారా జీవితాలను మార్చడం",
  "mission.sub": "డేటా-ఆధారిత ప్రపంచంలో విజయం సాధించండి.",
  "stats.learners": "శిక్షణ పొందిన వారు",
  "stats.partners": "హైరింగ్ భాగస్వాములు",
  "stats.placement": "ప్లేస్‌మెంట్ రేటు",
  "stats.ctc": "సగటు అత్యధిక CTC",
  "cta.title": "మీ విజయ కథ ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
  "cta.sub": "మా అడ్మిషన్ టీమ్‌తో మాట్లాడండి.",
  "cta.talk": "అడ్మిషన్‌తో మాట్లాడండి",
  "cta.browse": "కోర్సులు బ్రౌజ్ చేయండి",
  "footer.tagline": "శిక్షణ & సాంకేతికత ద్వారా జీవితాలను మార్చడం.",
  "footer.courses": "కోర్సులు",
  "footer.company": "కంపెనీ",
  "footer.contact": "సంప్రదించండి",
  "footer.rights": "అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
  "lang.label": "భాష",
  "gallery.eyebrow": "గ్యాలరీ",
  "gallery.title": "క్యాంపస్ & శిక్షణ ముఖ్యాంశాలు",
  "gallery.sub": "KMR టెక్నాలజీస్‌లో జీవితంలో ఒక చూపు — ప్రతి రోజూ కెరీర్లు నిర్మించబడే చోటు.",
  "gallery.card1.title": "ఆధునిక శిక్షణ ల్యాబ్‌లు",
  "gallery.card1.desc": "అత్యాధునిక కంప్యూటర్ ల్యాబ్‌లు తాజా సాధనాలు మరియు డ్యూయల్-మానిటర్ సెటప్‌లతో.",
  "gallery.card2.title": "పరిశ్రమ నిపుణుల వర్క్‌షాప్‌లు",
  "gallery.card2.desc": "Google, Microsoft మరియు Flipkart సీనియర్ ఇంజనీర్లచే వారాంతర వర్క్‌షాప్‌లు.",
  "gallery.card3.title": "ప్లేస్‌మెంట్ విజయ కథలు",
  "gallery.card3.desc": "150+ సంస్థలలో 25,000+ అభ్యాసకులు నియమించబడ్డారు, సగటు CTC 6.4 LPA.",
  "highlights.eyebrow": "మనల్ని వేరుగా మార్చేది",
  "highlights.title": "విజయానికి అవసరమైన అన్నీ",
  "highlights.sub": "మా కార్యక్రమాలు వ్యాఖ్యానాలకు మించి — నిజమైన ప్రాజెక్టులు, మార్గదర్శనం మరియు కెరీర్ మద్దతుతో ఉద్యోగ-సిద్ధ ఇంజనీర్లను తయారు చేస్తాయి.",
  "highlights.h1.title": "లైవ్ ప్రాజెక్ట్-ఆధారిత అభ్యాసం",
  "highlights.h1.desc": "బూట్‌క్యాంప్‌లో 15+ నిజమైన ప్రాజెక్టులు నిర్మించండి.",
  "highlights.h2.title": "క్లౌడ్-ఫర్స్ట్ పాఠ్యప్రణాళిక",
  "highlights.h2.desc": "ప్రతి కోర్సులో AWS/Azure/GCP ల్యాబ్‌లు మరియు పరీక్ష వోచర్లు.",
  "highlights.h3.title": "డేటా-ఆధారిత ప్లేస్‌మెంట్ సన్నద్ధత",
  "highlights.h3.desc": "మాక్ ఇంటర్వ్యూలు, రెజ్యూమె వర్క్‌షాప్‌లు మరియు 98% ఇంటర్వ్యూ క్లియరెన్స్ రేటు.",
  "highlights.h4.title": "వేగవంతమైన కార్యక్రమాలు",
  "highlights.h4.desc": "కెరీర్ మార్పు మరియు కొత్త గ్రాడ్యుయేట్లకు 3-6 నెలల తీవ్రమైన కార్యక్రమాలు.",
  "highlights.h5.title": "గ్లోబల్ అవకాశాలు",
  "highlights.h5.desc": "జర్మనీ, జపాన్, UAE లో వీసా మరియు రిలొకేషన్ మద్దతుతో అప్రెంటిస్‌షిప్.",
  "highlights.h6.title": "24/7 మెంటార్ అందుబాటు",
  "highlights.h6.desc": "చాట్, వీడియో కాల్‌లు మరియు ప్రతి వారం మెంటార్ గంటల ద్వారా అపరిమిత సందేహ నివృత్తి.",
  "programs.eyebrow": "కార్యక్రమాలు",
  "programs.title": "ఫలితాల కోసం రూపొందించిన మార్గాలు",
  "programs.sub": "ప్రభుత్వ నిధుల శిక్షణ నుండి ఉద్యోగ-హామీ బూట్‌క్యాంప్‌లు వరకు — ప్రతి ఆశయానికి ఒక మార్గం.",
  "programs.explore": "అన్వేషించండి",
  "programs.view": "కార్యక్రమాలు చూడండి",
  "programs.jobg.title": "ఉద్యోగ హామీ కోర్సులు",
  "programs.jobg.desc": "హైరింగ్ భాగస్వాముల నుండి సంతకం చేసిన ఆఫర్ హామీతో బూట్‌క్యాంప్‌లు.",
  "programs.govt.title": "ప్రభుత్వ ప్రాయోజిత",
  "programs.govt.desc": "PMKVY, NAPS & DDU-GKY కార్యక్రమాలు.",
  "programs.cert.title": "సర్టిఫికేషన్లు",
  "programs.cert.desc": "AWS, Azure, GCP & మరిన్ని.",
  "programs.acad.title": "అకడమిక్ ప్రోగ్రామ్‌లు",
  "programs.acad.desc": "ఉత్తమ విశ్వవిద్యాలయాలతో UGC-గుర్తింపు పొందిన B.Tech, MCA & M.Tech.",
  "why.eyebrow": "KMR ఎందుకు",
  "why.title": "మీ కెరీర్ చుట్టూ నిర్మించబడింది",
  "why.f1.title": "పరిశ్రమ మెంటార్లు",
  "why.f1.desc": "Google, Microsoft, Flipkart సీనియర్ ఇంజనీర్ల నుండి నేర్చుకోండి.",
  "why.f2.title": "ఫలితాలపై దృష్టి",
  "why.f2.desc": "92% ప్లేస్‌మెంట్ రేటు, సగటు CTC 6.4 LPA.",
  "why.f3.title": "ప్రభుత్వ గుర్తింపు",
  "why.f3.desc": "NSDC, MSDE మరియు భాగస్వామ్య విశ్వవిద్యాలయాలచే గుర్తింపు పొందినవి.",
  "testi.eyebrow": "ప్రశంసలు",
  "testi.title": "మా అభ్యాసకుల నిజమైన కథలు",
  "testi.role1": "సాఫ్ట్‌వేర్ ఇంజనీర్, Infosys",
  "testi.q1": "KMR ఫుల్-స్టాక్ బూట్‌క్యాంప్ నా కెరీర్‌ని మార్చింది.",
  "testi.role2": "క్లౌడ్ ఇంజనీర్, TCS",
  "testi.q2": "కాలేజీ డ్రాపౌట్ నుండి 6 నెలల్లో AWS సర్టిఫైడ్.",
  "testi.role3": "డేటా అనలిస్ట్, Flipkart",
  "testi.q3": "ప్రోగ్రామ్ పూర్తి కాకముందే ప్లేస్‌మెంట్ వచ్చింది.",
  "dash.welcome": "తిరిగి స్వాగతం",
  "dash.profile": "విద్యార్థి ప్రొఫైల్",
  "dash.name": "పేరు",
  "dash.id": "విద్యార్థి ఐడి",
  "dash.program": "ప్రోగ్రామ్",
  "dash.semester": "సెమిస్టర్",
  "dash.progress": "విద్యా పురోగతి",
  "dash.syllabus": "సిలబస్ పూర్తయింది",
  "dash.performance": "పనితీరు — గత 6 నెలలు",
  "dash.actions": "త్వరిత చర్యలు",
  "dash.fee": "ఫీజు చెల్లింపు",
  "dash.attendance": "హాజరు",
  "dash.hallTicket": "హాల్ టికెట్",
  "dash.results": "పరీక్ష ఫలితాలు",
  "dash.logout": "లాగ్ అవుట్",
  "dash.notices": "నోటీసులు",
  "admin.title": "అడ్మిన్ కమాండ్ సెంటర్",
  "admin.sub": "విద్యార్థులు, కోర్సులు, లీడ్స్ మరియు సిబ్బందిని నిర్వహించండి.",
  "admin.totalStudents": "మొత్తం విద్యార్థులు",
  "admin.activeCourses": "క్రియాశీల కోర్సులు",
  "admin.placement": "ప్లేస్‌మెంట్ రేటు",
  "admin.leads": "పెండింగ్ లీడ్స్",
  "admin.students": "విద్యార్థి నిర్వహణ",
  "admin.courses": "కోర్సు నిర్వాహకుడు",
  "admin.inbox": "దరఖాస్తు ఇన్‌బాక్స్",
  "admin.staff": "సిబ్బంది డైరెక్టరీ",
  "admin.search": "శోధించండి…",
  "admin.add": "కొత్తది జోడించండి",
  "admin.edit": "సవరించు",
  "admin.delete": "తొలగించు",
  "admin.view": "చూడు",
  "admin.contacted": "సంప్రదించబడింది",
  "admin.closed": "మూసివేయబడింది",
  "admin.open": "తెరవండి",
  "admin.status": "స్థితి",
  "admin.actions": "చర్యలు",
  "admin.active": "క్రియాశీల",
  "admin.alumni": "పూర్వ విద్యార్థి",
  "admin.modules": "మాడ్యూల్స్",
  "admin.syllabus": "సిలబస్",
  "admin.newCourse": "కొత్త కోర్సు",
  "admin.coursePlaceholder": "కోర్సు పేరు",
  "admin.pricePlaceholder": "ధర (ఉదా: ₹50,000)",
  "admin.create": "సృష్టించు",
  "admin.save": "సేవ్ చేయండి",
  "admin.mock": "మాక్ వాతావరణం",
  "admin.deleted": "తొలగించబడింది",
  "admin.removed": "తొలగించబడింది",
  "admin.saved": "సేవ్ చేయబడింది",
  "admin.courseAdded": "కోర్సు జోడించబడింది",
  "admin.editCourse": "కోర్సును సవరించండి",
  "admin.syllabusUploaded": "సిలబస్ అప్‌లోడ్ (మాక్)",
  "bot.name": "KMR అసిస్ట్",
  "bot.greet": "నమస్కారం! నేను KMR అసిస్ట్ 🤖 — కోర్సుల గురించి అడగండి.",
  "bot.greet.dash": "నమస్కారం! డాష్‌బోర్డ్‌లో సహాయం కావాలా?",
  "bot.placeholder": "కోర్సులు, ఫీజు గురించి అడగండి…",
  "bot.online": "ఆన్‌లైన్",
  "about.title": "KMR టెక్నాలజీస్ గురించి",
  "about.intro": "పరిశ్రమ-సమలేఖన శిక్షణ ద్వారా విద్య మరియు ఉపాధి మధ్య అంతరాన్ని పూడ్చుతున్నాము.",
  "about.mission": "మా లక్ష్యం",
  "about.mission.p1": "అభ్యాసకులకు భవిష్యత్-సిద్ధ నైపుణ్యాలను అందించడం మరియు అగ్రశ్రేణి ఉద్యోగదాతలతో అనుసంధానించడం.",
  "about.mission.p2": "KMR భారత ప్రభుత్వం, NSDC మరియు ప్రముఖ సంస్థలతో వేలాది మందికి శిక్షణ ఇచ్చింది.",
  "about.stat.programs": "కార్యక్రమాలు",
  "contact.title": "సంప్రదించండి",
  "contact.intro": "అడ్మిషన్లు, కెరీర్లు లేదా భాగస్వామ్యాల గురించి ప్రశ్నలు? 24 గంటల్లో సమాధానం ఇస్తాము.",
  "contact.office": "కార్యాలయం",
  "contact.phone": "ఫోన్",
  "contact.email": "ఇమెయిల్",
  "contact.fullname": "పూర్తి పేరు",
  "contact.emailPh": "ఇమెయిల్ చిరునామా",
  "contact.phonePh": "ఫోన్ నంబర్",
  "contact.subject": "విషయం",
  "contact.message": "మీ సందేశం",
  "contact.send": "సందేశాన్ని పంపండి",
  "contact.sent": "పంపబడింది ✓",
  "contact.toast": "సందేశం పంపబడింది!",
  "clp.duration": "వ్యవధి",
  "clp.level": "స్థాయి",
  "clp.enquire": "విచారించండి",
  "clp.enroll": "ఇప్పుడు నమోదు చేసుకోండి",
  "clp.outcomes": "ఫలితాలు",
  "enroll.title": "నమోదు",
  "enroll.intro": "మీ సీటును రిజర్వ్ చేయండి — 24 గంటల్లో సంప్రదిస్తాము.",
  "enroll.success": "నమోదు అందింది! త్వరలో సంప్రదిస్తాము.",
  "enroll.form.name": "పూర్తి పేరు",
  "enroll.form.email": "ఇమెయిల్",
  "enroll.form.phone": "ఫోన్",
  "enroll.form.qualification": "ఉన్నత అర్హత",
  "enroll.form.notes": "గమనికలు (ఐచ్ఛికం)",
  "enroll.form.submit": "నమోదును నిర్ధారించండి",
  "enroll.summary": "ఆర్డర్ సారాంశం",
  "enroll.fee": "కోర్సు ఫీజు",
  "enroll.gst": "GST (18%)",
  "enroll.total": "మొత్తం",
  "enroll.note": "అడ్మిషన్ నిర్ధారణ తర్వాత చెల్లింపు సేకరించబడుతుంది.",
  "lms.title": "లెర్నింగ్ హబ్",
  "lms.welcome": "తిరిగి స్వాగతం",
  "lms.continue": "నేర్చుకోవడం కొనసాగించండి",
  "lms.mycourses": "నా కోర్సులు",
  "lms.assessments": "మదింపులు",
  "lms.progress": "పురోగతి",
  "lms.completed": "పూర్తయింది",
  "lms.lessons": "పాఠాలు",
  "lms.startNow": "ఇప్పుడే ప్రారంభించండి",
  "lms.resume": "కొనసాగించు",
  "lms.due": "గడువు",
  "lms.score": "స్కోరు",
  "lms.notStarted": "ప్రారంభించలేదు",
  "lms.inProgress": "పురోగతిలో",
  "lms.start": "ప్రారంభించు",
  "lms.review": "సమీక్ష",
  "lms.player.title": "ఇప్పుడు ప్లే అవుతోంది",
  "lms.upcoming": "రాబోయే లైవ్ సెషన్లు",
  "lms.join": "చేరండి",
  "cp.jobg.title": "ఉద్యోగ హామీ కోర్సులు",
  "cp.jobg.tag": "100% ప్లేస్‌మెంట్ మద్దతు",
  "cp.jobg.intro": "ఉద్యోగ హామీ లేదా డబ్బు వాపసుతో పరిశ్రమ-రూపొందించిన కార్యక్రమాలు.",
  "cp.govt.title": "ప్రభుత్వ ప్రాయోజిత శిక్షణ",
  "cp.govt.tag": "NSDC & రాష్ట్ర నిధులు",
  "cp.govt.intro": "భారత ప్రభుత్వంతో భాగస్వామ్యంతో సర్టిఫైడ్ కార్యక్రమాలు.",
  "cp.cert.title": "సర్టిఫికేషన్ ప్రోగ్రామ్‌లు",
  "cp.cert.tag": "పరిశ్రమ గుర్తింపు",
  "cp.cert.intro": "ప్రపంచ ప్రమాణాలకు అనుగుణంగా చిన్న సర్టిఫికేషన్లు.",
  "cp.acad.title": "అకడమిక్ ప్రోగ్రామ్‌లు",
  "cp.acad.tag": "UGC గుర్తింపు",
  "cp.acad.intro": "అగ్ర విశ్వవిద్యాలయాలతో కలిసి డిగ్రీ-సమలేఖన కార్యక్రమాలు.",
  "ck.title": "KMR లో కెరీర్లు",
  "ck.intro": "భారతదేశంలో తదుపరి తరం టెక్ ప్రతిభను రూపొందించడంలో సహాయం చేయండి.",
  "ck.apply": "దరఖాస్తు చేయండి",
  "ck.fulltime": "పూర్తి సమయం",
  "ck.remote": "రిమోట్",
  "cab.tag": "అంతర్జాతీయ ప్లేస్‌మెంట్ పోర్టల్",
  "cab.title": "విదేశాల్లో అప్రెంటిస్‌షిప్",
  "cab.intro": "గ్లోబల్ అప్రెంటిస్‌షిప్ ఒప్పందం — వీసా, భాషా శిక్షణ, స్థానమార్పిడి మద్దతు.",
  "cab.f1.title": "భాషా శిక్షణ",
  "cab.f1.desc": "జర్మన్, జపనీస్, అరబిక్ — సర్టిఫైడ్ శిక్షకులు.",
  "cab.f2.title": "వీసా & సమ్మతి",
  "cab.f2.desc": "మా భాగస్వాములు అన్ని పత్రాలను నిర్వహిస్తారు.",
  "cab.f3.title": "స్థానమార్పిడి మద్దతు",
  "cab.f3.desc": "నివాసం, రాకతో సహాయం, నిరంతర మార్గదర్శనం.",
  "cab.openDest": "ఓపెన్ గమ్యస్థానాలు",
  "cab.stipend": "సగటు స్టైపెండ్",
  "sl.tag": "సురక్షిత విద్యార్థి యాక్సెస్",
  "sl.title": "తిరిగి స్వాగతం, అభ్యాసకుడు",
  "sl.sub": "మీ ప్రయాణాన్ని కొనసాగించడానికి మీ పోర్టల్‌ను ఎంచుకోండి.",
  "sl.sis.title": "విద్యార్థి సమాచార వ్యవస్థ",
  "sl.sis.desc": "మీ ప్రొఫైల్, హాజరు, ఫీజులు మరియు రికార్డులను ఒకే చోట.",
  "sl.lms.title": "లెర్నింగ్ మేనేజ్‌మెంట్ సిస్టమ్",
  "sl.lms.desc": "కోర్సు వీడియోలు, ల్యాబ్‌లు, మదింపులు మరియు లైవ్ సెషన్లు.",
  "sl.btn": "లాగిన్",
  "lf.sis.title": "SIS లాగిన్",
  "lf.sis.sub": "మీ విద్యార్థి ఐడితో సైన్ ఇన్ చేయండి.",
  "lf.lms.title": "LMS లాగిన్",
  "lf.lms.sub": "మీ కోర్సులను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి.",
  "lf.studentId": "విద్యార్థి ఐడి",
  "lf.password": "పాస్‌వర్డ్",
  "lf.signIn": "సైన్ ఇన్",
  "lf.signingIn": "సైన్ ఇన్ అవుతోంది...",
  "lf.demo": "డెమో అనుమతులు ముందుగా నింపబడ్డాయి.",
  "lf.welcome": "తిరిగి స్వాగతం!",
  "lf.headline.sis": "మీ అకడమిక్ జీవితం, అందంగా నిర్వహించబడింది.",
  "lf.sub.sis": "హాజరును ట్రాక్ చేయండి, మార్కులు చూడండి, ఫీజులు చెల్లించండి.",
  "lf.headline.lms": "ఎక్కడైనా, ఎప్పుడైనా నేర్చుకోండి.",
  "lf.sub.lms": "వీడియోలు, ల్యాబ్‌లు మరియు లైవ్ సెషన్లలో కొనసాగించండి."
});
const dict = { en, hi, ta, te };
const LangCtx = createContext({ lang: "en", setLang: () => {
}, t: (k) => k });
function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("kmr_lang") || "en";
    if (stored !== lang) setLangState(stored);
    setHydrated(true);
  }, []);
  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("kmr_lang", l);
  };
  const activeLang = hydrated ? lang : "en";
  const t = (key) => dict[activeLang][key] ?? dict.en[key] ?? key;
  return /* @__PURE__ */ jsx(LangCtx.Provider, { value: { lang: activeLang, setLang, t }, children });
}
const useT = () => useContext(LangCtx);
const SUGGESTIONS = {
  en: ["What courses do you offer?", "Is placement guaranteed?", "How do I apply?", "Talk to admissions"],
  hi: ["आप कौन से कोर्स देते हैं?", "क्या प्लेसमेंट गारंटी है?", "मैं कैसे आवेदन करूं?", "प्रवेश से बात करें"],
  ta: ["என்ன பாடநெறிகள் உள்ளன?", "வேலை உத்தரவாதமா?", "எப்படி விண்ணப்பிப்பது?", "சேர்க்கையில் பேசு"],
  te: ["మీరు ఏ కోర్సులు అందిస్తారు?", "ప్లేస్‌మెంట్ హామీయా?", "ఎలా దరఖాస్తు చేయాలి?", "అడ్మిషన్‌తో మాట్లాడండి"]
};
const DASH_SUGG = {
  en: ["Show fees", "Attendance status", "Hall ticket", "Latest results"],
  hi: ["फीस दिखाएं", "उपस्थिति", "हॉल टिकट", "नवीनतम परिणाम"],
  ta: ["கட்டணம் காட்டு", "வருகை", "ஹால் டிக்கெட்", "சமீபத்திய முடிவுகள்"],
  te: ["ఫీజు చూపించు", "హాజరు", "హాల్ టికెట్", "తాజా ఫలితాలు"]
};
const CHAT_URL = `${"https://futpesvgoxhhkchwhmte.supabase.co"}/functions/v1/chat-bot`;
function ChatBot() {
  const { lang, t } = useT();
  const { location } = useRouterState();
  const onDash = location.pathname.startsWith("/dashboard");
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const greeting = onDash ? t("bot.greet.dash") : t("bot.greet");
  const [msgs, setMsgs] = useState([{ role: "assistant", content: greeting }]);
  const endRef = useRef(null);
  useEffect(() => {
    setMsgs([{ role: "assistant", content: onDash ? t("bot.greet.dash") : t("bot.greet") }]);
  }, [lang, onDash]);
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open, loading]);
  const suggestions = useMemo(() => onDash ? DASH_SUGG[lang] : SUGGESTIONS[lang], [lang, onDash]);
  async function send(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg = { role: "user", content: trimmed };
    const history = [...msgs.filter((m) => m.content), userMsg];
    setMsgs((prev) => [...prev, userMsg]);
    setVal("");
    setLoading(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"sb_publishable_jZj1gUd6vbdZ_JP04rSarw_eOv9MNug"}`
        },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
          lang,
          context: onDash ? "dashboard" : "site"
        })
      });
      if (!resp.ok || !resp.body) {
        const errText = resp.status === 429 ? "Too many requests — please wait a moment." : resp.status === 402 ? "AI usage limit reached. Please try later." : "Sorry, I couldn't reach the assistant.";
        setMsgs((prev) => [...prev, { role: "assistant", content: errText }]);
        setLoading(false);
        return;
      }
      setMsgs((prev) => [...prev, { role: "assistant", content: "" }]);
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      let done = false;
      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });
        let nl;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantText += chunk;
              setMsgs((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("chat error:", err);
      setMsgs((prev) => [...prev, { role: "assistant", content: "Connection error — please try again." }]);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        "aria-label": "Open chat assistant",
        className: cn(
          "fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full bg-cyan-500 hover:bg-cyan-600 shadow-elegant grid place-items-center text-white hover:scale-105 transition-transform",
          open && "opacity-0 pointer-events-none"
        ),
        style: { backgroundColor: "#06B6D4" },
        children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold border-2 border-white" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "fixed bottom-5 right-5 z-[60] w-[92vw] max-w-sm rounded-2xl bg-card shadow-elegant border border-border overflow-hidden flex flex-col origin-bottom-right transition-all duration-200",
          open ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        ),
        style: { height: "min(560px, 80vh)" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-white px-4 py-3 flex items-center justify-between", style: { background: "linear-gradient(135deg,#06B6D4,#0E7490)" }, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-white/20 grid place-items-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-sm leading-tight", children: t("bot.name") }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-white/80 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-300" }),
                  " ",
                  t("bot.online")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), className: "p-1 rounded hover:bg-white/10", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/40", children: [
            msgs.map((m, i) => /* @__PURE__ */ jsx("div", { className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"), children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user" ? "text-white rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"
                ),
                style: m.role === "user" ? { backgroundColor: "#06B6D4" } : void 0,
                children: m.content || (loading && i === msgs.length - 1 ? "…" : "")
              }
            ) }, i)),
            loading && msgs[msgs.length - 1]?.role === "user" && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" }),
              /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:120ms]" }),
              /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:240ms]" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { ref: endRef })
          ] }),
          msgs.length <= 1 && /* @__PURE__ */ jsx("div", { className: "px-3 pb-2 flex flex-wrap gap-1.5", children: suggestions.map((s) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => send(s),
              disabled: loading,
              className: "text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-cyan-500 hover:text-white transition border border-border disabled:opacity-50",
              children: s
            },
            s
          )) }),
          /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                send(val);
              },
              className: "p-3 border-t border-border bg-card flex gap-2",
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: val,
                    onChange: (e) => setVal(e.target.value),
                    placeholder: t("bot.placeholder"),
                    disabled: loading,
                    className: "flex-1 rounded-full bg-secondary px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400/40 disabled:opacity-50"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: !val.trim() || loading,
                    className: "h-9 w-9 rounded-full text-white grid place-items-center disabled:opacity-50 transition",
                    style: { backgroundColor: "#06B6D4" },
                    "aria-label": "Send",
                    children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("kmr_theme") || "dark";
    }
    return "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("kmr_theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => t === "dark" ? "light" : "dark");
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
}
function useTheme() {
  return useContext(ThemeContext);
}
function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef(0);
  useEffect(() => {
    const SIZE_DOT = 12;
    const SIZE_RING = 36;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - SIZE_DOT / 2}px, ${e.clientY - SIZE_DOT / 2}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.18;
      cur.current.y += (pos.current.y - cur.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cur.current.x - SIZE_RING / 2}px, ${cur.current.y - SIZE_RING / 2}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: ringRef,
        "aria-hidden": "true",
        className: "pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform",
        style: {
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid oklch(0.72 0.22 330 / 0.55)",
          boxShadow: "0 0 8px 2px oklch(0.72 0.22 330 / 0.18)",
          background: "transparent"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: dotRef,
        "aria-hidden": "true",
        className: "pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform",
        style: {
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "oklch(0.72 0.22 330)",
          boxShadow: "0 0 6px 2px oklch(0.72 0.22 330 / 0.6)",
          mixBlendMode: "difference"
        }
      }
    )
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$i = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KMR Technologies — Your Course to Success" },
      { name: "description", content: "Industry-led training and guaranteed-placement programs from KMR Technologies." },
      { name: "author", content: "KMR Technologies" },
      { property: "og:title", content: "KMR Technologies — Your Course to Success" },
      { property: "og:description", content: "Industry-led training and guaranteed-placement programs from KMR Technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@KMRTech" },
      { name: "twitter:title", content: "KMR Technologies — Your Course to Success" },
      { name: "twitter:description", content: "Industry-led training and guaranteed-placement programs from KMR Technologies." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1496bdfc-d668-464d-9699-4060bc543208" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1496bdfc-d668-464d-9699-4060bc543208" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { location } = useRouterState();
  const hideBot = location.pathname.startsWith("/student-login/sis/dashboard");
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(LanguageProvider, { children: [
    /* @__PURE__ */ jsx(CursorGlow, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" }),
    !hideBot && /* @__PURE__ */ jsx(ChatBot, {})
  ] }) });
}
const $$splitComponentImporter$h = () => import("./student-login-BFsOu0JM.js");
const Route$h = createFileRoute("/student-login")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./contact-BZW2Ez2p.js");
const Route$g = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact Us — KMR Technologies"
    }, {
      name: "description",
      content: "Get in touch with KMR Technologies for admissions, partnerships, and support."
    }, {
      property: "og:title",
      content: "Contact KMR Technologies"
    }, {
      property: "og:description",
      content: "Reach our team for admissions and partnerships."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./admin-portal-Ds7OD8VJ.js");
const Route$f = createFileRoute("/admin-portal")({
  head: () => ({
    meta: [{
      title: "Admin Portal — KMR Technologies"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./about-Ciw72uYh.js");
const Route$e = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Us — KMR Technologies"
    }, {
      name: "description",
      content: "Learn about KMR Technologies' mission to transform lives through training and technology."
    }, {
      property: "og:title",
      content: "About KMR Technologies"
    }, {
      property: "og:description",
      content: "Our mission, vision, and the team behind KMR."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-Dyv1tcH4.js");
const Route$d = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "KMR Technologies — Your Course to Success"
    }, {
      name: "description",
      content: "Industry-led training and guaranteed-placement programs from KMR Technologies. Get hired by tech employers."
    }, {
      property: "og:title",
      content: "KMR Technologies — Your Course to Success"
    }, {
      property: "og:description",
      content: "Get trained by industry experts and hired by top tech employers."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./student-login.index-As34fdkC.js");
const Route$c = createFileRoute("/student-login/")({
  head: () => ({
    meta: [{
      title: "Student Login — KMR Technologies"
    }, {
      name: "description",
      content: "Access your Student Information System (SIS) or Learning Management System (LMS)."
    }, {
      property: "og:title",
      content: "Student Portals — KMR Technologies"
    }, {
      property: "og:description",
      content: "Two portals: SIS for academics, LMS for course content."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./student-login.sis-BjcGuEbT.js");
const Route$b = createFileRoute("/student-login/sis")({
  head: () => ({
    meta: [{
      title: "SIS Login — KMR Technologies"
    }, {
      name: "description",
      content: "Sign in to the Student Information System."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./student-login.lms-CIEKDC5D.js");
const Route$a = createFileRoute("/student-login/lms")({
  head: () => ({
    meta: [{
      title: "LMS Login — KMR Technologies"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./dashboard.student-DFYXNnaH.js");
const Route$9 = createFileRoute("/dashboard/student")({
  head: () => ({
    meta: [{
      title: "Student Dashboard — KMR Technologies"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./dashboard.lms-DUS3lVcG.js");
const Route$8 = createFileRoute("/dashboard/lms")({
  head: () => ({
    meta: [{
      title: "LMS Dashboard — KMR Technologies"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./courses.job-guaranteed-BAb0s4fJ.js");
const Route$7 = createFileRoute("/courses/job-guaranteed")({
  head: () => ({
    meta: [{
      title: "Job Guaranteed Courses — KMR Technologies"
    }, {
      name: "description",
      content: "Placement-backed programs designed with hiring partners — pay after you get a job."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./courses.govt-sponsored-DG8l4LNr.js");
const Route$6 = createFileRoute("/courses/govt-sponsored")({
  head: () => ({
    meta: [{
      title: "Govt Sponsored Training — KMR Technologies"
    }, {
      name: "description",
      content: "Skill India and state-sponsored programs at little to no cost."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./courses.certification-C62qY93m.js");
const Route$5 = createFileRoute("/courses/certification")({
  head: () => ({
    meta: [{
      title: "Certification Programs — KMR Technologies"
    }, {
      name: "description",
      content: "Industry-recognized short certifications to upskill fast."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./courses.academic-BLRvSxdb.js");
const Route$4 = createFileRoute("/courses/academic")({
  head: () => ({
    meta: [{
      title: "Academic Programs — KMR Technologies"
    }, {
      name: "description",
      content: "UGC-recognized degree-aligned programs in partnership with universities."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./careers.kmr-D-dszMmv.js");
const Route$3 = createFileRoute("/careers/kmr")({
  head: () => ({
    meta: [{
      title: "KMR Careers — Join Our Team"
    }, {
      name: "description",
      content: "Open roles at KMR Technologies across India."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./careers.apprenticeship-abroad-BOgMxNnj.js");
const Route$2 = createFileRoute("/careers/apprenticeship-abroad")({
  head: () => ({
    meta: [{
      title: "Apprenticeship Abroad — KMR Technologies"
    }, {
      name: "description",
      content: "International placement portal — work-and-learn opportunities in Germany, Japan, UAE and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./student-login.sis.dashboard-Dm2Xf7Sq.js");
const Route$1 = createFileRoute("/student-login/sis/dashboard")({
  head: () => ({
    meta: [{
      title: "SIS Dashboard — KMR Technologies"
    }, {
      name: "description",
      content: "Student dashboard."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./enroll._category._courseId-D9jWujkN.js");
const Route = createFileRoute("/enroll/$category/$courseId")({
  head: () => ({
    meta: [{
      title: "Enroll — KMR Technologies"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const StudentLoginRoute = Route$h.update({
  id: "/student-login",
  path: "/student-login",
  getParentRoute: () => Route$i
});
const ContactRoute = Route$g.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$i
});
const AdminPortalRoute = Route$f.update({
  id: "/admin-portal",
  path: "/admin-portal",
  getParentRoute: () => Route$i
});
const AboutRoute = Route$e.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const StudentLoginIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => StudentLoginRoute
});
const StudentLoginSisRoute = Route$b.update({
  id: "/sis",
  path: "/sis",
  getParentRoute: () => StudentLoginRoute
});
const StudentLoginLmsRoute = Route$a.update({
  id: "/lms",
  path: "/lms",
  getParentRoute: () => StudentLoginRoute
});
const DashboardStudentRoute = Route$9.update({
  id: "/dashboard/student",
  path: "/dashboard/student",
  getParentRoute: () => Route$i
});
const DashboardLmsRoute = Route$8.update({
  id: "/dashboard/lms",
  path: "/dashboard/lms",
  getParentRoute: () => Route$i
});
const CoursesJobGuaranteedRoute = Route$7.update({
  id: "/courses/job-guaranteed",
  path: "/courses/job-guaranteed",
  getParentRoute: () => Route$i
});
const CoursesGovtSponsoredRoute = Route$6.update({
  id: "/courses/govt-sponsored",
  path: "/courses/govt-sponsored",
  getParentRoute: () => Route$i
});
const CoursesCertificationRoute = Route$5.update({
  id: "/courses/certification",
  path: "/courses/certification",
  getParentRoute: () => Route$i
});
const CoursesAcademicRoute = Route$4.update({
  id: "/courses/academic",
  path: "/courses/academic",
  getParentRoute: () => Route$i
});
const CareersKmrRoute = Route$3.update({
  id: "/careers/kmr",
  path: "/careers/kmr",
  getParentRoute: () => Route$i
});
const CareersApprenticeshipAbroadRoute = Route$2.update({
  id: "/careers/apprenticeship-abroad",
  path: "/careers/apprenticeship-abroad",
  getParentRoute: () => Route$i
});
const StudentLoginSisDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => StudentLoginSisRoute
});
const EnrollCategoryCourseIdRoute = Route.update({
  id: "/enroll/$category/$courseId",
  path: "/enroll/$category/$courseId",
  getParentRoute: () => Route$i
});
const StudentLoginSisRouteChildren = {
  StudentLoginSisDashboardRoute
};
const StudentLoginSisRouteWithChildren = StudentLoginSisRoute._addFileChildren(
  StudentLoginSisRouteChildren
);
const StudentLoginRouteChildren = {
  StudentLoginLmsRoute,
  StudentLoginSisRoute: StudentLoginSisRouteWithChildren,
  StudentLoginIndexRoute
};
const StudentLoginRouteWithChildren = StudentLoginRoute._addFileChildren(
  StudentLoginRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminPortalRoute,
  ContactRoute,
  StudentLoginRoute: StudentLoginRouteWithChildren,
  CareersApprenticeshipAbroadRoute,
  CareersKmrRoute,
  CoursesAcademicRoute,
  CoursesCertificationRoute,
  CoursesGovtSponsoredRoute,
  CoursesJobGuaranteedRoute,
  DashboardLmsRoute,
  DashboardStudentRoute,
  EnrollCategoryCourseIdRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  LANGUAGES as L,
  useTheme as a,
  cn as c,
  router as r,
  useT as u
};
