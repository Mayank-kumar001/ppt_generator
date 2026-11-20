import { createServerFn } from "@tanstack/react-start";
import { presentationIdInputSchema } from "../types/schema";
import { authCheckMiddleware } from "#/middleware/auth";
import { prisma } from "#/lib/db";

export const getPersentation = createServerFn({ method: "GET" })
.validator(presentationIdInputSchema)
.middleware([authCheckMiddleware])
.handler(async ({ data, context }) => {
    const { userId } = context;
    const presentation = await prisma.presentation.findFirst({
        where: { id: data.id, userId },
    });

    if (!presentation) throw new Error('Not found')
    return presentation;
})


export const getPresentationWithSlides = createServerFn({ method: "GET" })
.validator(presentationIdInputSchema)
.middleware([authCheckMiddleware])
.handler(async ({ data, context }) => {
    const { userId } = context;``
    const presentation = await prisma.presentation.findFirst({
        where: { id: data.id, userId },
        include: {
            slides: { orderBy: { order: 'asc' } },
        },
    });

    if (!presentation) throw new Error('Not found')
    return presentation;
})


export const listPresentations = createServerFn({ method: "GET" })
.middleware([authCheckMiddleware])
.handler(async ({ context }) => {
    const { userId } = context;
    const presentations = await prisma.presentation.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
    });

    
    return presentations;
})