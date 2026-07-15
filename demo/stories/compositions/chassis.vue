<script setup lang="ts">
// compositions/chassis — the demo-kit reference (BI.W-SPECIMEN-FRAME). ONE page
// showing the folded storybook chassis: the ONE `<SpecimenFrame>` specimen host
// (across its glass-tier axis) + the ONE `<PermutationGrid>` variant grid — the
// gestalt-cohesion cure "N bespoke spec-sheets → one product with natural variation."
// Every specimen reads as glass over the shared warm field, and a lone interactive
// child never balloons to the article width (the bounded w-full carve).
import StoryPage from "../../chassis/page/StoryPage.vue";
import {
    SpecimenFrame,
    PermutationGrid,
    type PermutationGridCell,
} from "../../chassis";
import { Button } from "@glass/components/button";
import { Badge } from "@glass/components/badge";
import { Switch } from "@glass/components/switch";

// The grid cells — each renders a glassy specimen cell hosting a Badge.
const toneCells: (PermutationGridCell & {
    variant: "default" | "secondary" | "outline";
})[] = [
    { id: "default", heading: "default", variant: "default" },
    { id: "secondary", heading: "secondary", variant: "secondary" },
    { id: "outline", heading: "outline", variant: "outline" },
];

const cellVariant = (id: string | number) =>
    toneCells.find((c) => c.id === id)?.variant ?? "default";
</script>

<template>
    <StoryPage>
        <!-- SPECIMEN — one glassy sub-card hosting a single specimen (the base). A
             lone Button is a direct body child yet sizes to its content (the bounded
             w-full carve), never the column. -->
        <SpecimenFrame
            heading="Specimen"
            label="chassis · specimen"
            blurb="One glassy sub-card hosting a single demo specimen — the conformity floor. A lone interactive child sizes to content, never the article width."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="primary-audacious">Primary</Button>
                <Badge tone="success">shipped</Badge>
            </div>
        </SpecimenFrame>

        <!-- INTERACTION — the library's own interactives on the lifted `floating`
             tier (never a hand-rolled lozenge). -->
        <SpecimenFrame
            tier="floating"
            heading="Interaction"
            label="chassis · interaction"
            blurb="A glassy card hosting the library's own interactives — real Buttons and Switches on the lifted glass tier."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="glass" size="sm">Run</Button>
                <Button variant="ghost" size="sm">Reset</Button>
            </div>
            <div class="flex items-center justify-between gap-3">
                <span class="text-small">Reduced motion</span>
                <Switch />
            </div>
        </SpecimenFrame>

        <!-- GRID — a responsive grid of specimen cells (the variant matrix). -->
        <PermutationGrid
            heading="Grid"
            label="chassis · grid"
            blurb="A responsive grid of specimen cells — the variant matrix / preset gallery, each cell a glassy sub-card."
            :cells="toneCells"
            min-cell="12rem"
        >
            <template #cell="{ cell }">
                <Badge :variant="cellVariant(cell.id)">{{ cell.heading }}</Badge>
            </template>
        </PermutationGrid>

        <!-- COMPOSITION — a glassy scene composing ≥2 library components into the
             surface they were built for. The `lg` pad gives the scene room. -->
        <SpecimenFrame
            pad="lg"
            heading="Composition"
            label="chassis · composition"
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
        </SpecimenFrame>
    </StoryPage>
</template>
