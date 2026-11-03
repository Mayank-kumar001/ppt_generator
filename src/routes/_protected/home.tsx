import { Navbar } from "#/components/navbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex justify-center ">
      <Navbar />
    </div>
  );
}
