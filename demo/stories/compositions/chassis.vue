<script setup lang="ts">
// compositions/chassis — the demo SUB-TYPE taxonomy reference (BG.W-STORY-PAGE-API
// §4-D). ONE page demonstrating the five demo KINDS side by side — the direct
// gestalt-cohesion cure: "N bespoke spec-sheets → one product with natural
// variation." Every KIND is a thin composition over the StoryPage chassis
// guaranteeing the SAME conformity (a glassy sub-card · a header/rule · the warm
// field) while its content varies.
import StoryPage from "../../chassis/page/StoryPage.vue";
import {
    DemoStage,
    DemoSpecimen,
    DemoInteraction,
    DemoMatrix,
    DemoComposition,
    type DemoMatrixCell,
} from "../../chassis";
import { Button } from "@glass/components/ui/button";
import { Badge } from "@glass/components/ui/badge";
import { Switch } from "@glass/components/ui/switch";

// The matrix cells — each renders a glassy specimen cell hosting a Badge.
const toneCells: (DemoMatrixCell & { variant: "default" | "secondary" | "outline" })[] = [
    { id: "default", heading: "default", variant: "default" },
    { id: "secondary", heading: "secondary", variant: "secondary" },
    { id: "outline", heading: "outline", variant: "outline" },
];

const cellVariant = (id: string | number) =>
    toneCells.find((c) => c.id === id)?.variant ?? "default";
</script>

<template>
    <StoryPage>
        <!-- STAGE — a full-bleed field hosting a demo (the studio pattern). -->
        <DemoStage
            heading="Stage"
            label="demo · stage"
            blurb="A full-bleed live field hosting a demo — the studio pattern, glass controls floating over the warm field."
        >
            <template #stage>
                <div class="chassis-stage-fill paper-grain-overlay" />
            </template>
            <template #controls>
                <p class="section-label">controls</p>
                <Button variant="glass" size="sm">Adjust</Button>
                <div class="flex items-center justify-between gap-3">
                    <span class="text-small text-muted-foreground">Animate</span>
                    <Switch :default-value="true" />
                </div>
            </template>
        </DemoStage>

        <!-- MATRIX — a responsive grid of specimen cells (the variant matrix). -->
        <DemoMatrix
            heading="Matrix"
            label="demo · matrix"
            blurb="A responsive grid of specimen cells — the variant matrix / preset gallery, each cell a glassy sub-card."
            :cells="toneCells"
            min-cell="12rem"
        >
            <template #cell="{ cell }">
                <Badge :variant="cellVariant(cell.id)">{{ cell.heading }}</Badge>
            </template>
        </DemoMatrix>

        <!-- SPECIMEN — one glassy sub-card hosting a single specimen (the base). -->
        <DemoSpecimen
            heading="Specimen"
            label="demo · specimen"
            blurb="One glassy sub-card hosting a single demo specimen — the conformity floor every kind extends."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="primary-audacious">Primary</Button>
                <Badge tone="success">shipped</Badge>
            </div>
        </DemoSpecimen>

        <!-- INTERACTION — a glassy card hosting the library's own interactives. -->
        <DemoInteraction
            heading="Interaction"
            label="demo · interaction"
            blurb="A glassy card hosting the library's own interactives — real Buttons and Switches, never a hand-rolled lozenge."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="glass" size="sm">Run</Button>
                <Button variant="ghost" size="sm">Reset</Button>
            </div>
            <div class="flex items-center justify-between gap-3">
                <span class="text-small">Reduced motion</span>
                <Switch />
            </div>
        </DemoInteraction>

        <!-- COMPOSITION — a glassy scene composing ≥2 library components. -->
        <DemoComposition
            heading="Composition"
            label="demo · composition"
            blurb="A glassy scene composing ≥2 library components into the surface they were built for."
        >
            <div class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-1">
                    <span class="text-subheading">Notifications</span>
                    <span class="text-small text-muted-foreground">
                        Email me when a run completes.
                    </span>
                </div>
                <Switch :default-value="true" />
            </div>
            <div class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-1">
                    <span class="text-subheading">Theme</span>
                    <span class="text-small text-muted-foreground">
                        Follow the system appearance.
                    </span>
                </div>
                <Button variant="outline" size="sm">System</Button>
            </div>
        </DemoComposition>
    </StoryPage>
</template>

<style scoped>
/* The stage field illustration — a warm-cream radial wash so the stage reads as a
   live field aperture even on a static-wash route (the global page field also
   transmits through the transparent frame). */
.chassis-stage-fill {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(
            120% 90% at 20% 15%,
            color-mix(in oklab, var(--section-color-3) 22%, transparent),
            transparent 60%
        ),
        radial-gradient(
            110% 80% at 85% 90%,
            color-mix(in oklab, var(--section-color-7) 20%, transparent),
            transparent 55%
        ),
        var(--card);
}
</style>
