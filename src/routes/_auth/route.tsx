import { authMiddleware } from "#/middleware/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  server: {
    middleware: [authMiddleware],
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  );
}
