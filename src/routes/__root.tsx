import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { ChatBot } from "@/components/site/ChatBot";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

/* ── Cursor Glow ── */
function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const SIZE_DOT = 12;   // small crisp dot
    const SIZE_RING = 36;  // soft outer ring

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Dot snaps instantly to cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - SIZE_DOT / 2}px, ${e.clientY - SIZE_DOT / 2}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);

    // Ring trails with lerp
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

  return (
    <>
      {/* Trailing soft ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid oklch(0.72 0.22 330 / 0.55)",
          boxShadow: "0 0 8px 2px oklch(0.72 0.22 330 / 0.18)",
          background: "transparent",
        }}
      />
      {/* Crisp dot — snaps to cursor exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "oklch(0.72 0.22 330)",
          boxShadow: "0 0 6px 2px oklch(0.72 0.22 330 / 0.6)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
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
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1496bdfc-d668-464d-9699-4060bc543208" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { location } = useRouterState();
  // Bot persists across dashboard per spec; hide only on legacy SIS dashboard
  const hideBot = location.pathname.startsWith("/student-login/sis/dashboard");
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CursorGlow />
        <Outlet />
        <Toaster richColors position="top-right" />
        {!hideBot && <ChatBot />}
      </LanguageProvider>
    </ThemeProvider>
  );
}

