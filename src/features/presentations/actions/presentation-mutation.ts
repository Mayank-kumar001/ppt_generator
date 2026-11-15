import { createServerFn } from "@tanstack/react-start";
import {
  createPresentationInputSchema,
  presentationIdInputSchema,
  updatePresentationInputSchema,
} from "../types/schema";
import { authCheckMiddleware } from "#/middleware/auth";
import { prisma } from "#/lib/db";
import { deriveTitle } from "../lib/server-helper";

export const createPresentation = createServerFn({ method: "POST" })
  .validator(createPresentationInputSchema)
  .middleware([authCheckMiddleware])
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const presentation = await prisma.presentation.create({
      data: {
        userId,
        title: deriveTitle(data.prompt),
        prompt: data.prompt,
        slideCount: data.slideCount,
        style: data.style,
        tone: data.tone,
        layout: data.layout,
        status: "GENERATING",
      },
    });

    //TODO: Add a background job to generate the presentation slides asynchronously(INNGEST)

    return presentation;
  });
export const updatePresentation = createServerFn({ method: "POST" })
  .validator(updatePresentationInputSchema)
  .middleware([authCheckMiddleware])
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { id, ...updates } = data;
    const existing = await prisma.presentation.findFirst({
      where: { id, userId },
    })
    if (!existing) throw new Error('Not found')

    return prisma.presentation.update({
      where: {
        id,
        userId,
      },
      data: updates,
    });
  });

export const deletePresentation = createServerFn({ method: "POST" })
  .validator(presentationIdInputSchema)
  .middleware([authCheckMiddleware])
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const existing = await prisma.presentation.findFirst({
      where: {
        id: data.id,
        userId,
      },
    });

    if (!existing) {
      throw new Error("Not found");
    }

    return prisma.presentation.delete({
      where: {
        id: data.id,
        userId,
      },
    });
  });


  export const regeneratePresentation = createServerFn({ method: "POST" })
  .validator(presentationIdInputSchema)
  .middleware([authCheckMiddleware])
  .handler(async ({ data, context }) => {
    const { userId } = context;
     const existing = await prisma.presentation.findFirst({
      where: { id: data.id, userId },
    })
    if (!existing) throw new Error('Not found')

    const presentation = await prisma.presentation.update({
      where: { id: data.id },
      data: { status: 'GENERATING' },
    })

    //TODO: Add a background job to generate the presentation slides asynchronously(INNGEST)

    return presentation;
  });