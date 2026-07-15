<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import type { StoryBody, SpecimenSpec } from "../../chassis/body/story-body";
import { Badge } from "@glass/components/badge";
import { IconChip } from "@glass/components/icon-chip";
import { cn } from "@glass/components/_shared/class-names";
import { BadgeCheck } from "@lucide/vue";

// The display band's ONE coherent --section-color-5 identity.
const DISPLAY_STOP = 5;

// The section-color tone axis as a documented Badge fill row (the 13-stop
// jewel-tone ramp as a saturated-pill teaching axis). Each pill's label reads a
// per-fill contrast-color() ink so the light/lightened fills stay legible in dark.
const sectionToneBadges = [
    { stop: 0, label: "rose" },
    { stop: 3, label: "teal" },
    { stop: 5, label: "amber" },
    { stop: 9, label: "slate" },
    { stop: 12, label: "indigo" },
];

const coreVariants: ("default" | "secondary" | "outline")[] = [
    "default",
    "secondary",
    "outline",
];

const semanticTones: ("destructive" | "success" | "warning" | "info")[] = [
    "destructive",
    "success",
    "warning",
    "info",
];

const vizBadges = [
    { cls: "bg-viz-fourier text-white", token: "fourier", label: "fourier" },
    { cls: "bg-viz-chebyshev text-white", token: "chebyshev", label: "chebyshev" },
    { cls: "bg-viz-legendre text-white", token: "legendre", label: "legendre" },
];

const leadingDot = [
    { dot: "bg-viz-fourier", label: "Active" },
    { dot: "bg-viz-chebyshev", label: "Syncing" },
    { dot: "bg-muted-foreground", label: "Idle" },
    { dot: "bg-destructive", label: "Error" },
];

// One BadgeCheck-and-label specimen at a given size (the optical-centering row).
const verified = (size: string): SpecimenSpec => ({
    component: Badge,
    props: { size },
    slots: { default: [{ component: BadgeCheck }, " Verified"] },
});

const body: StoryBody = {
    kind: "sections",
    sections: [
        {
            label: "section-color tone axis",
            blurb: "Compose a --section-color-N fill as a documented Badge tone — the 13-stop jewel-tone ramp as a saturated-pill teaching axis.",
            specimens: sectionToneBadges.map((t) => ({
                component: Badge,
                props: {
                    class: "border-transparent text-white",
                    style: {
                        backgroundColor: `var(--section-color-${t.stop})`,
                        color: `contrast-color(var(--section-color-${t.stop}))`,
                    },
                },
                slots: { default: t.label },
            })),
        },
        {
            label: "variants",
            permute: {
                base: { component: Badge },
                axes: [{ prop: "variant", values: coreVariants }],
            },
        },
        {
            label: "viz-basis via inline fill",
            specimens: vizBadges.map((v) => ({
                component: Badge,
                props: {
                    class: cn("border-transparent", v.cls),
                    style: { color: `contrast-color(var(--viz-${v.token}))` },
                },
                slots: { default: v.label },
            })),
        },
        {
            label: "with leading dot",
            specimens: leadingDot.map((d) => ({
                component: Badge,
                props: { variant: "outline", class: "gap-1.5" },
                slots: {
                    default: [
                        {
                            component: "span",
                            props: { class: `h-1.5 w-1.5 rounded-full ${d.dot}` },
                        },
                        d.label,
                    ],
                },
            })),
        },
        {
            label: "size axis",
            specimens: [
                { component: Badge, props: { size: "sm" }, slots: { default: "sm · text-xs" } },
                { component: Badge, props: { size: "md" }, slots: { default: "md · text-sm (default)" } },
                { component: Badge, props: { size: "lg" }, slots: { default: "lg · text-base" } },
            ],
        },
        {
            label: "glyph optical centering",
            blurb: "The leading-line-box tracks the --ui-scale-scaled font, so the glyph and the label share ONE optical center at every size (and at coarse pointer).",
            // The optical-centering harness reads a `[data-badge-optical]` container
            // — a page-specific hook, so it renders bespoke (frameless, verbatim).
            bespoke: {
                component: "div",
                props: {
                    "data-badge-optical": "",
                    class: "flex flex-wrap items-center gap-3",
                },
                slots: { default: [verified("sm"), verified("md"), verified("lg")] },
            },
        },
        {
            label: "size × variant",
            permute: {
                base: { component: Badge, slots: { default: "Badge" } },
                axes: [
                    { prop: "variant", values: coreVariants },
                    { prop: "size", values: ["sm", "md", "lg"] },
                ],
            },
        },
        {
            label: "semantic tones",
            blurb: "Compose --success / --warning / --info plates with their --*-foreground glyph counterparts. Pair with status-dot for richer pulse compositions.",
            specimens: [
                ...semanticTones.map((tone) => ({
                    component: Badge,
                    props: { tone },
                    slots: { default: tone },
                })),
                ...semanticTones.map((tone) => ({
                    component: Badge,
                    props: { tone, class: "gap-1.5" },
                    slots: {
                        default: [
                            { component: "span", props: { class: "size-1.5 rounded-full bg-current" } },
                            ` ${tone} with dot`,
                        ],
                    },
                })),
            ],
        },
        {
            label: "baseline alignment in text-sm context",
            // Prose with an inline specimen — the bespoke escape.
            bespoke: {
                component: "p",
                props: { class: "text-sm" },
                slots: {
                    default: [
                        "Row text aligned with ",
                        {
                            component: Badge,
                            props: { variant: "outline", size: "md" },
                            slots: { default: 'size="md"' },
                        },
                        " badge — the badge line-box reads a relative leading-[1.1] that tracks the --control-text-scaled font, so it centres in the surrounding line.",
                    ],
                },
            },
        },
    ],
};
</script>

<template>
    <StoryPage :body="body">
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${DISPLAY_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="BadgeCheck" :section="DISPLAY_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Display · Badge
                </span>
                <p class="text-small text-muted-foreground">
                    Loud-pill status badges — the section identity is the ONE
                    color event; the loud pills carry their own register.
                </p>
            </div>
        </header>
    </StoryPage>
</template>
