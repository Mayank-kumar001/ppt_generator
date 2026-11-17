// import { createServerFileRoute } from "@tanstack/react-start/server";
import { serve } from "inngest/edge";
import { createFileRoute } from "@tanstack/react-router";
import { inngest } from "#/integrations/inngest/client";
import { helloWorld } from "#/integrations/inngest/functions";

const handler = serve({
  client: inngest,
  functions: [
    helloWorld
  ],
});

export const Route = createFileRoute("/api/inngest")({
  server: {
    handlers: {
      GET: async ({ request }) => handler(request),
      POST: async ({ request }) => handler(request),
      PUT: async ({ request }) => handler(request),
    },
  },
});