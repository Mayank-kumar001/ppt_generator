import { authMiddleware } from "#/middleware/auth";
import { getSession } from "#/lib/auth.functions";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  server: {
    middleware: [authMiddleware],
  },
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    return { session };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  );
}
