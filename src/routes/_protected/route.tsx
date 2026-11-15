import { authMiddleware } from "#/middleware/auth";
import { getSession } from "#/lib/auth.functions";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Navbar } from "#/components/navbar";

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
    <div className="h-screen w-full flex flex-col items-center gap-4">
      <Navbar />
      <main className="w-full flex justify-center  min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
