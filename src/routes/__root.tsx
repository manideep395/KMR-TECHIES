import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { ChatBot } from "@/components/site/ChatBot";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";


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
      { title: "KES Technologies — Your Course to Success" },
      { name: "description", content: "Industry-led training and guaranteed-placement programs from KES Technologies." },
      { name: "author", content: "KES Technologies" },
      { property: "og:title", content: "KES Technologies — Your Course to Success" },
      { property: "og:description", content: "Industry-led training and guaranteed-placement programs from KES Technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@KESTech" },
      { name: "twitter:title", content: "KES Technologies — Your Course to Success" },
      { name: "twitter:description", content: "Industry-led training and guaranteed-placement programs from KES Technologies." },
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
        <Outlet />
        <Toaster richColors position="top-right" />
        {!hideBot && <ChatBot />}
      </LanguageProvider>
    </ThemeProvider>
  );
}

