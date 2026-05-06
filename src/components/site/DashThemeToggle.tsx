import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function DashThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full text-white/80 hover:text-gold hover:bg-white/10 transition"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
