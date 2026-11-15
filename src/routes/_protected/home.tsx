import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Slider } from "#/components/ui/slider";
import { Textarea } from "#/components/ui/textarea";
import {
  LAYOUT_OPTIONS,
  SLIDE_STYLES,
  TONE_OPTIONS,
} from "#/features/presentations/constants/presentation-options";
import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_protected/home")({
  component: RouteComponent,
});

type HomeFormState = {
  content: string;
  slideCount: number;
  style: (typeof SLIDE_STYLES)[number]["value"];
  tone: (typeof TONE_OPTIONS)[number]["value"];
  layout: (typeof LAYOUT_OPTIONS)[number]["value"];
};

const handleGenerate = () => {}

function RouteComponent() {
  const [form, setForm] = useState<HomeFormState>({
    content: "",
    slideCount: 8,
    style: "minimal",
    tone: "formal",
    layout: "balanced",
  });
  return (
    <div className="h-full max-w-6xl overflow-y-auto flex flex-col items-center px-4 py-8">
      {/* header */}
      <div className="text-center mb-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          What do you want to{" "}
          <span className="text-gradient-peach">create?</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Enter your content and we'll generate a beautiful presentation
        </p>
      </div>
      {/* main text area */}
      <div className="glass rounded-3xl p-4 md:p-6 space-y-4">
        {/* Textarea */}
        <div className="space-y-1.5">
          <Textarea
            placeholder="Describe your presentation topic, paste your notes, or outline your key points..."
            value={form.content}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                content: e.target.value,
              }))
            }
            className="h-[160px] min-h-[160px] max-h-[160px] overflow-y-auto text-base bg-background/50 border-border/50 rounded-2xl resize-none focus-visible:ring-primary/30"
          />
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>{form.content.length.toLocaleString()} characters</span>
            <span>Markdown supported</span>
          </div>
        </div>
        {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Slide count */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Slides: {form.slideCount}
          </Label>
          <Slider
            value={[form.slideCount]}
            onValueChange={(value) => {
              const slideCount = Array.isArray(value) ? value[0] : value;

              if (typeof slideCount === "number") {
                setForm((s) => ({
                  ...s,
                  slideCount,
                }));
              }
            }}
            min={3}
            max={20}
            step={1}
            className="py-2"
          />
        </div>
        {/* Style */}
        <div className="space-y-2">
              <Label className="text-sm font-medium">Style</Label>
              <Select
                value={form.style}
                onValueChange={(value) =>
                  setForm((s) => ({
                    ...s,
                    style: value as HomeFormState['style'],
                  }))
                }
              >
                <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass">
                  {SLIDE_STYLES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tone</Label>
              <Select
                value={form.tone}
                onValueChange={(value) =>
                  setForm((s) => ({
                    ...s,
                    tone: value as HomeFormState['tone'],
                  }))
                }
              >
                <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass">
                  {TONE_OPTIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Layout */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Layout</Label>
              <Select
                value={form.layout}
                onValueChange={(value) =>
                  setForm((s) => ({
                    ...s,
                    layout: value as HomeFormState['layout'],
                  }))
                }
              >
                <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass">
                  {LAYOUT_OPTIONS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          

          {/* Generate button */}
          <div className="flex justify-end pt-1">
            <Button
              size="lg"
              onClick={handleGenerate}
              // disabled={createMut.isPending || !form.content.trim()}
              className="rounded-xl px-8 gap-2 font-semibold"
            >
              
                  <Wand2 className="size-5" />
                  Generate PPT
              
            </Button>
          </div>
        </div>
      </div>
      

      </div>
  );
}
