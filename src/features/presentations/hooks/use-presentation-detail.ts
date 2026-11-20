import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  SlideLayout,
  SlideStyle,
  SlideTone,
} from "../constants/presentation-options";
import { presentationQueryKeys } from "./query-key";
import { getPresentationWithSlides } from "../api/presentation-query";
import { useEffect, useMemo, useState } from "react";
import { deletePresentation, regeneratePresentation, updatePresentation } from "../actions/presentation-mutation";
import { toast } from "#/components/ui/toast";
import {
  presentationLayoutSchema,
  presentationStyleSchema,
  presentationToneSchema,
} from "../types/schema";

type SettingsForm = {
  title: string;
  prompt: string;
  slideCount: number;
  style: SlideStyle;
  tone: SlideTone;
  layout: SlideLayout;
};

export function usePresentationDetail(
  presentationId: string,
  opts?: { onDeleted?: () => void },
) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: presentationQueryKeys.detail(presentationId),
    queryFn: () => getPresentationWithSlides({ data: { id: presentationId } }),
    refetchInterval: (q) =>
      q.state.data?.status === "GENERATING" ? 3000 : false,
  });

  const [form, setForm] = useState<SettingsForm>({
    title: '',
    prompt: '',
    slideCount: 8,
    style: 'minimal',
    tone: 'persuasive',
    layout: 'balanced',
  })

  useEffect(() => {
    if (!query.data) return
    setForm({
      title: query.data.title,
      prompt: query.data.prompt,
      slideCount: query.data.slideCount,
      style: presentationStyleSchema.parse(query.data.style),
      tone: presentationToneSchema.parse(query.data.tone),
      layout: presentationLayoutSchema.parse(query.data.layout),
    })
  }, [query.data])

  const updateMut = useMutation({
    mutationFn: () =>
      updatePresentation({
        data: {
          id: presentationId,
          title: form.title,
          prompt: form.prompt,
          slideCount: form.slideCount,
          style: form.style,
          tone: form.tone,
          layout: form.layout,
        },
      }),
    onSuccess: () => {
        toast.add({
          type: "success",
          description: "Presentation saved",
        })
      queryClient.invalidateQueries({ queryKey: presentationQueryKeys.list() })
      queryClient.invalidateQueries({
        queryKey: presentationQueryKeys.detail(presentationId),
      })
    },
    onError: (e) => {
        toast.add({
          type: "error",
          description: e instanceof Error ? e.message : "Could not save",
        })
    },
  })

  const regenerateMut = useMutation({
    mutationFn: () => regeneratePresentation({ data: { id: presentationId } }),
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Regenerating slides…",
      })
      queryClient.invalidateQueries({
        queryKey: presentationQueryKeys.detail(presentationId),
      })
    },
    onError: (e) => {
      toast.add({
        type: "error",
        description: e instanceof Error ? e.message : "Could not regenerate",
      })
    },
  })
   const deleteMut = useMutation({
    mutationFn: () => deletePresentation({ data: { id: presentationId } }),
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Presentation deleted",
      })
      queryClient.invalidateQueries({ queryKey: presentationQueryKeys.list() })
      queryClient.removeQueries({
        queryKey: presentationQueryKeys.detail(presentationId),
      })
      opts?.onDeleted?.()
    },
    onError: (e) => {
      toast.add({
        type: "error",
        description: e instanceof Error ? e.message : "Could not delete",
      })
    },
  })

  const slides = query.data?.slides ?? []
  const isGenerating = query.data?.status === 'GENERATING'

  const updatedLabel = useMemo(() => {
    if (!query.data?.updatedAt) return ''
    return new Date(query.data.updatedAt).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }, [query.data?.updatedAt])

  return {
    query,
    slides,
    isGenerating,
    updatedLabel,
    form,
    setForm,
    updateMut,
    regenerateMut,
    deleteMut,
  }

}
