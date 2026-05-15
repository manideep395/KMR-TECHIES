import { jsx } from "react/jsx-runtime";
import { Sun, Moon } from "lucide-react";
import { a as useTheme } from "./router-CjN-_vpS.js";
function DashThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      className: "p-2 rounded-full text-white/80 hover:text-gold hover:bg-white/10 transition",
      children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" })
    }
  );
}
export {
  DashThemeToggle as D
};
