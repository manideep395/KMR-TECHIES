import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Database, User, Lock, EyeOff, Eye } from "lucide-react";
import { B as Button } from "./button-6iPTpLdE.js";
import { I as Input } from "./input-BAh5KpWR.js";
import { L as Label } from "./label-Tcyvbvnk.js";
import { toast } from "sonner";
import { u as useT } from "./router-CjN-_vpS.js";
import { u as useAuth } from "./useAuth-D-q7nYcU.js";
import { s as supabase } from "./client-1Cs0bkRN.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
function SISLogin() {
  const nav = useNavigate();
  const {
    t
  } = useT();
  const {
    user,
    signIn,
    signUp
  } = useAuth();
  const [mode, setMode] = useState("login");
  const isSisDashboardRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/student-login/sis/dashboard");
  const [email, setEmail] = useState("demo@kmrtechies.com");
  const [password, setPassword] = useState("demo1234");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  }, [user, nav]);
  if (isSisDashboardRoute) {
    return /* @__PURE__ */ jsx(Outlet, {});
  }
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        const {
          data,
          error
        } = await signUp(email, password, {
          full_name: name
        });
        if (error) {
          if (error.message.toLowerCase().includes("already registered")) {
            toast.error("Account already exists. Please sign in.");
            setMode("login");
          } else {
            toast.error(error.message);
          }
        } else {
          const user2 = data?.user ?? data?.session?.user;
          if (user2) {
            await supabase.from("profiles").insert({
              id: user2.id,
              email,
              full_name: name,
              role: "student"
            });
            toast.success(t("lf.signupSuccess"));
            sessionStorage.setItem("sis_user", JSON.stringify({
              name,
              id: user2.id
            }));
            nav({
              to: "/student-login/sis/dashboard",
              replace: true
            });
          } else {
            toast.success("Signup successful. Please sign in.");
            setMode("login");
          }
        }
      } else {
        const {
          data,
          error
        } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          const authUser = data?.user ?? data?.session?.user;
          if (authUser) {
            toast.success(t("lf.welcome"));
            sessionStorage.setItem("sis_user", JSON.stringify({
              name: authUser.user_metadata?.full_name || email,
              id: authUser.id
            }));
            nav({
              to: "/student-login/sis/dashboard",
              replace: true
            });
          } else {
            const sessionData = await supabase.auth.getSession();
            const sessionUser = sessionData.data.session?.user;
            if (sessionUser) {
              toast.success(t("lf.welcome"));
              sessionStorage.setItem("sis_user", JSON.stringify({
                name: sessionUser.user_metadata?.full_name || email,
                id: sessionUser.id
              }));
              nav({
                to: "/student-login/sis/dashboard",
                replace: true
              });
            } else {
              toast.error("Login succeeded but user session was not available. Please refresh.");
            }
          }
        }
      }
    } catch (err) {
      toast.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  if (user) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen grid lg:grid-cols-2 bg-secondary", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg bg-gold grid place-items-center", children: /* @__PURE__ */ jsx(Database, { className: "h-5 w-5 text-navy-deep" }) }),
          /* @__PURE__ */ jsx("div", { className: "font-extrabold", children: "KMR · SIS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-extrabold leading-tight", children: "Already Logged In" }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/70 mt-4 max-w-md", children: [
            "You are currently logged in as ",
            user.email,
            ". What would you like to do?"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-white/50", children: "© KMR Technologies" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6 lg:p-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md bg-card rounded-3xl shadow-elegant p-8 border border-border", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-navy", children: "Welcome back!" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
          "You are already logged in as ",
          user.email,
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => nav({
            to: "/student-login/sis/dashboard"
          }), className: "w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold", children: "Go to Dashboard" }),
          /* @__PURE__ */ jsx(Button, { onClick: async () => {
            await supabase.auth.signOut();
            toast.success("Logged out successfully");
          }, variant: "outline", className: "w-full rounded-full h-11 font-bold", children: "Logout & Sign In Again" })
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen grid lg:grid-cols-2 bg-secondary", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex bg-gradient-hero text-white p-12 flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg bg-gold grid place-items-center", children: /* @__PURE__ */ jsx(Database, { className: "h-5 w-5 text-navy-deep" }) }),
        /* @__PURE__ */ jsx("div", { className: "font-extrabold", children: "KMR · SIS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-extrabold leading-tight", children: t("lf.headline.sis") }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 mt-4 max-w-md", children: t("lf.sub.sis") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-white/50", children: "© KMR Technologies" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6 lg:p-12", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "w-full max-w-md bg-card rounded-3xl shadow-elegant p-8 border border-border", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-navy", children: mode === "register" ? t("lf.sisRegisterTitle") : t("lf.sis.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: mode === "register" ? t("lf.sisRegisterSub") : t("lf.sis.sub") }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        mode === "register" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: t("lf.fullName") }),
          /* @__PURE__ */ jsx(Input, { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: t("lf.email") }),
          /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
            /* @__PURE__ */ jsx(User, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "pl-9", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: t("lf.password") }),
          /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
            /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 absolute left-3 top-3 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { type: show ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), className: "pl-9 pr-9", required: true }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-3 top-3 text-muted-foreground", children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-magenta hover:bg-magenta/90 text-white rounded-full h-11 font-bold", children: loading ? mode === "register" ? t("lf.signingUp") : t("lf.signingIn") : mode === "register" ? t("lf.signUp") : t("lf.signIn") }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-muted-foreground", children: mode === "login" ? /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMode("register"), className: "underline text-magenta", children: t("lf.createAccount") }) : /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMode("login"), className: "underline text-magenta", children: t("lf.alreadyHaveAccount") }) })
      ] })
    ] }) })
  ] });
}
export {
  SISLogin as component
};
