import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student-login")({
  component: () => <Outlet />,
});