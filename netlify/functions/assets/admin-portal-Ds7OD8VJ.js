import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { Loader2, UserCog, Lock, EyeOff, Eye, Users, BookOpen, TrendingUp, Inbox, Search, Plus, Edit, Trash2 } from "lucide-react";
import { B as Button } from "./button-6iPTpLdE.js";
import { I as Input } from "./input-BAh5KpWR.js";
import { L as Label } from "./label-Tcyvbvnk.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-ErikS0wf.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BUjzrCUX.js";
import { c as cn, u as useT } from "./router-CjN-_vpS.js";
import { toast } from "sonner";
import { D as DashThemeToggle } from "./DashThemeToggle-2c_zWJwn.js";
import { u as useRealtimeData } from "./useRealtimeData-Cfb7rj-g.js";
import { u as useAuth } from "./useAuth-D-q7nYcU.js";
import { s as supabase } from "./client-1Cs0bkRN.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tabs";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
function AdminPortal() {
  const {
    t
  } = useT();
  const {
    user,
    loading: authLoading,
    signIn,
    signUp
  } = useAuth();
  const [q, setQ] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const ADMIN_EMAIL = "kasireddy@gmail.com";
  const ADMIN_PASSWORD = "mani@395";
  const ADMIN_NAME = "Admin User";
  const {
    data: courses,
    loading: coursesLoading
  } = useRealtimeData("courses");
  const {
    data: certifications,
    loading: certsLoading
  } = useRealtimeData("certifications");
  const {
    data: trainings,
    loading: trainingsLoading
  } = useRealtimeData("trainings");
  const {
    data: academicPrograms,
    loading: programsLoading
  } = useRealtimeData("academic_programs");
  const {
    data: careers,
    loading: careersLoading
  } = useRealtimeData("careers");
  const {
    data: profiles,
    loading: profilesLoading
  } = useRealtimeData("profiles");
  if (authLoading || coursesLoading || certsLoading || trainingsLoading || programsLoading || careersLoading || profilesLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-magenta" }) });
  }
  const currentProfile = profiles.find((profile) => profile.id === user?.id);
  const isAdmin = currentProfile?.role === "admin";
  if (!user) {
    const handleAdminLogin = async (e) => {
      e.preventDefault();
      setAdminLoading(true);
      const enteredEmail = adminEmail.trim().toLowerCase();
      const enteredPassword = adminPassword.trim();
      if (enteredEmail !== ADMIN_EMAIL.toLowerCase() || enteredPassword !== ADMIN_PASSWORD) {
        toast.error("Invalid admin credentials");
        setAdminLoading(false);
        return;
      }
      try {
        const {
          data,
          error
        } = await signIn(adminEmail, adminPassword);
        if (error) {
          const {
            data: signupData,
            error: signupError
          } = await signUp(adminEmail, adminPassword, {
            full_name: ADMIN_NAME
          });
          if (signupError) {
            if (signupError.message.toLowerCase().includes("already registered")) {
              const {
                data: retryData,
                error: retryError
              } = await signIn(adminEmail, adminPassword);
              if (retryError) {
                toast.error(retryError.message);
              } else if (retryData.user) {
                await supabase.from("profiles").upsert({
                  id: retryData.user.id,
                  email: adminEmail,
                  full_name: ADMIN_NAME,
                  role: "admin"
                });
                await supabase.from("admins").upsert({
                  id: retryData.user.id
                });
                toast.success("Admin login successful");
                setAdminEmail("");
                setAdminPassword("");
                setTimeout(() => window.location.reload(), 500);
              }
            } else {
              toast.error(signupError.message);
            }
          } else {
            const user2 = signupData?.user ?? signupData?.session?.user;
            if (user2) {
              const {
                error: profileError
              } = await supabase.from("profiles").upsert({
                id: user2.id,
                email: adminEmail,
                full_name: ADMIN_NAME,
                role: "admin"
              });
              if (profileError) {
                toast.error("Failed to create admin profile: " + profileError.message);
                setAdminLoading(false);
                return;
              }
              const {
                error: adminError
              } = await supabase.from("admins").upsert({
                id: user2.id
              });
              if (adminError) {
                toast.error("Failed to create admin record: " + adminError.message);
                setAdminLoading(false);
                return;
              }
              toast.success("Admin account created and signed in");
              setAdminEmail("");
              setAdminPassword("");
              setTimeout(() => window.location.reload(), 500);
            } else {
              toast.success("Admin signup successful. Please sign in.");
            }
          }
        } else if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: adminEmail,
            full_name: ADMIN_NAME,
            role: "admin"
          });
          await supabase.from("admins").upsert({
            id: data.user.id
          });
          toast.success("Admin login successful");
          setAdminEmail("");
          setAdminPassword("");
          setTimeout(() => window.location.reload(), 500);
        }
      } catch (err) {
        toast.error("Admin login failed");
      } finally {
        setAdminLoading(false);
      }
    };
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen grid lg:grid-cols-2 bg-secondary", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg bg-gold grid place-items-center", children: /* @__PURE__ */ jsx(UserCog, { className: "h-5 w-5 text-navy-deep" }) }),
          /* @__PURE__ */ jsx("div", { className: "font-extrabold", children: "KMR · Admin" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-extrabold leading-tight", children: "Admin Portal" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 mt-4 max-w-md", children: "Manage courses, certifications, trainings, and students in real-time." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-white/50", children: "© KMR Technologies" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6 lg:p-12", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleAdminLogin, className: "w-full max-w-md bg-card rounded-3xl shadow-elegant p-8 border border-border", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-navy mb-2", children: "Admin Login" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Enter your admin credentials to access the portal" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Email" }),
            /* @__PURE__ */ jsx(Input, { type: "email", value: adminEmail, onChange: (e) => setAdminEmail(e.target.value), placeholder: ADMIN_EMAIL, required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Password" }),
            /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { type: showAdminPassword ? "text" : "password", value: adminPassword, onChange: (e) => setAdminPassword(e.target.value), placeholder: "••••••••", className: "pl-9 pr-9", required: true }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowAdminPassword(!showAdminPassword), className: "absolute right-3 top-3 text-muted-foreground", children: showAdminPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: adminLoading, className: "w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold", children: adminLoading ? "Signing in..." : "Sign In" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-muted-foreground mt-4", children: [
            "Demo credentials: ",
            ADMIN_EMAIL,
            " / ",
            ADMIN_PASSWORD
          ] })
        ] })
      ] }) })
    ] });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground mb-4", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Your account does not have admin access." })
    ] }) });
  }
  const filteredCourses = courses.filter((c) => (c.title + c.description).toLowerCase().includes(q.toLowerCase()));
  const filteredCerts = certifications.filter((c) => (c.title + c.description).toLowerCase().includes(q.toLowerCase()));
  const filteredTrainings = trainings.filter((t2) => (t2.title + t2.description).toLowerCase().includes(q.toLowerCase()));
  const filteredPrograms = academicPrograms.filter((p) => (p.title + p.description).toLowerCase().includes(q.toLowerCase()));
  const filteredCareers = careers.filter((c) => (c.title + c.description).toLowerCase().includes(q.toLowerCase()));
  const stats = [{
    i: Users,
    l: "Total Students",
    v: profiles.length.toString(),
    c: "from-cyan-500 to-blue-600"
  }, {
    i: BookOpen,
    l: "Active Courses",
    v: (courses.length + certifications.length + trainings.length + academicPrograms.length).toString(),
    c: "from-magenta to-rose-600"
  }, {
    i: TrendingUp,
    l: "Open Positions",
    v: careers.length.toString(),
    c: "from-emerald-500 to-teal-600"
  }, {
    i: Inbox,
    l: "Total Programs",
    v: academicPrograms.length.toString(),
    c: "from-amber-500 to-orange-600"
  }];
  const handleAddItem = async (type, data) => {
    try {
      const {
        error
      } = await supabase.from(type).insert(data);
      if (error) throw error;
      toast.success("Item added successfully");
      setNewItem(null);
    } catch (error) {
      toast.error("Failed to add item");
    }
  };
  const handleUpdateItem = async (type, id, data) => {
    try {
      const {
        error
      } = await supabase.from(type).update(data).eq("id", id);
      if (error) throw error;
      toast.success("Item updated successfully");
      setEditItem(null);
    } catch (error) {
      toast.error("Failed to update item");
    }
  };
  const handleDeleteItem = async (type, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const {
        error
      } = await supabase.from(type).delete().eq("id", id);
      if (error) throw error;
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-navy-deep text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(UserCog, { className: "h-6 w-6 text-gold" }),
        /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: "KMR · Admin" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(DashThemeToggle, {}),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-white/70", children: "Real-time Admin Portal" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 lg:px-8 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-extrabold text-foreground", children: "Admin Portal" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Manage courses, certifications, trainings, and more in real-time" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxs("div", { className: `rounded-2xl bg-gradient-to-br ${s.c} text-white p-5 shadow-md`, children: [
        /* @__PURE__ */ jsx(s.i, { className: "h-7 w-7 opacity-90 mb-3" }),
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold", children: s.v }),
        /* @__PURE__ */ jsx("div", { className: "text-xs opacity-90 mt-1", children: s.l })
      ] }, i)) }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "courses", className: "bg-card rounded-2xl border border-border p-4", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid grid-cols-2 md:grid-cols-5 w-full", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "courses", children: "Courses" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "certifications", children: "Certifications" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "trainings", children: "Trainings" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "academic", children: "Academic" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "careers", children: "Careers" })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "courses", className: "space-y-4 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Search courses...", value: q, onChange: (e) => setQ(e.target.value), className: "pl-9" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { className: "bg-cyan-500 hover:bg-cyan-600 text-white", onClick: () => setNewItem({
              type: "courses",
              data: {
                title: "",
                description: "",
                category: "",
                duration: "",
                price: null
              }
            }), children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Course"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Duration" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Price" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredCourses.map((course) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: course.title }),
              /* @__PURE__ */ jsx(TableCell, { children: course.category }),
              /* @__PURE__ */ jsx(TableCell, { children: course.duration }),
              /* @__PURE__ */ jsx(TableCell, { children: course.price ? `₹${course.price}` : "N/A" }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditItem({
                  type: "courses",
                  data: course
                }), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteItem("courses", course.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }) })
            ] }, course.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "certifications", className: "space-y-4 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Search certifications...", value: q, onChange: (e) => setQ(e.target.value), className: "pl-9" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { className: "bg-cyan-500 hover:bg-cyan-600 text-white", onClick: () => setNewItem({
              type: "certifications",
              data: {
                title: "",
                description: "",
                provider: "",
                duration: "",
                price: null
              }
            }), children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Certification"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Provider" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Duration" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Price" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredCerts.map((cert) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: cert.title }),
              /* @__PURE__ */ jsx(TableCell, { children: cert.provider }),
              /* @__PURE__ */ jsx(TableCell, { children: cert.duration }),
              /* @__PURE__ */ jsx(TableCell, { children: cert.price ? `₹${cert.price}` : "N/A" }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditItem({
                  type: "certifications",
                  data: cert
                }), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteItem("certifications", cert.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }) })
            ] }, cert.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "trainings", className: "space-y-4 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Search trainings...", value: q, onChange: (e) => setQ(e.target.value), className: "pl-9" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { className: "bg-cyan-500 hover:bg-cyan-600 text-white", onClick: () => setNewItem({
              type: "trainings",
              data: {
                title: "",
                description: "",
                type: "",
                duration: "",
                price: null
              }
            }), children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Training"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Duration" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Price" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredTrainings.map((training) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: training.title }),
              /* @__PURE__ */ jsx(TableCell, { children: training.type }),
              /* @__PURE__ */ jsx(TableCell, { children: training.duration }),
              /* @__PURE__ */ jsx(TableCell, { children: training.price ? `₹${training.price}` : "N/A" }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditItem({
                  type: "trainings",
                  data: training
                }), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteItem("trainings", training.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }) })
            ] }, training.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "academic", className: "space-y-4 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Search programs...", value: q, onChange: (e) => setQ(e.target.value), className: "pl-9" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { className: "bg-cyan-500 hover:bg-cyan-600 text-white", onClick: () => setNewItem({
              type: "academic_programs",
              data: {
                title: "",
                description: "",
                level: "",
                duration: "",
                price: null
              }
            }), children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Program"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Level" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Duration" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Price" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredPrograms.map((program) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: program.title }),
              /* @__PURE__ */ jsx(TableCell, { children: program.level }),
              /* @__PURE__ */ jsx(TableCell, { children: program.duration }),
              /* @__PURE__ */ jsx(TableCell, { children: program.price ? `₹${program.price}` : "N/A" }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditItem({
                  type: "academic_programs",
                  data: program
                }), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteItem("academic_programs", program.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }) })
            ] }, program.id)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "careers", className: "space-y-4 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
              /* @__PURE__ */ jsx(Input, { placeholder: "Search careers...", value: q, onChange: (e) => setQ(e.target.value), className: "pl-9" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { className: "bg-cyan-500 hover:bg-cyan-600 text-white", onClick: () => setNewItem({
              type: "careers",
              data: {
                title: "",
                description: "",
                location: "",
                type: "",
                salary_range: "",
                requirements: [],
                benefits: []
              }
            }), children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }),
              " Add Career"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Location" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Salary" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: filteredCareers.map((career) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: career.title }),
              /* @__PURE__ */ jsx(TableCell, { children: career.location }),
              /* @__PURE__ */ jsx(TableCell, { children: career.type }),
              /* @__PURE__ */ jsx(TableCell, { children: career.salary_range }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditItem({
                  type: "careers",
                  data: career
                }), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteItem("careers", career.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }) })
            ] }, career.id)) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Dialog, { open: !!editItem, onOpenChange: () => setEditItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { children: [
          "Edit ",
          editItem?.type
        ] }) }),
        editItem && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.keys(editItem.data).map((key) => {
          if (key === "id" || key === "created_at" || key === "updated_at") return null;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: key }),
            /* @__PURE__ */ jsx(Input, { value: editItem.data[key] || "", onChange: (e) => setEditItem({
              ...editItem,
              data: {
                ...editItem.data,
                [key]: e.target.value
              }
            }) })
          ] }, key);
        }) }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setEditItem(null), children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { onClick: () => editItem && handleUpdateItem(editItem.type, editItem.data.id, editItem.data), children: "Save Changes" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Dialog, { open: !!newItem, onOpenChange: () => setNewItem(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { children: [
          "Add ",
          newItem?.type
        ] }) }),
        newItem && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.keys(newItem.data).map((key) => {
          if (key === "id" || key === "created_at" || key === "updated_at") return null;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: key }),
            /* @__PURE__ */ jsx(Input, { value: newItem.data[key] || "", onChange: (e) => setNewItem({
              ...newItem,
              data: {
                ...newItem.data,
                [key]: e.target.value
              }
            }) })
          ] }, key);
        }) }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setNewItem(null), children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { onClick: () => newItem && handleAddItem(newItem.type, newItem.data), children: "Add Item" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminPortal as component
};
