<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import type { StoryBody, SpecimenSpec } from "../../chassis/body/story-body";
import { Badge } from "@glass/components/badge";
import { StatusDot } from "@glass/components/status-dot";
import { cn } from "@glass/components/_shared/class-names";
import { BadgeCheck } from "@lucide/vue";

// The display band's ONE coherent --section-color-5 identity.

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

// The leading mark is `<StatusDot>`, which is what this page's own semantic-tones
// blurb has told the reader to use since it was written. It used to hand-roll four
// `rounded-full` divs painted from the VIZ palette — a basis-function colour ramp
// standing in for semantics — which meant the demo taught the opposite of the
// library. Every state below is a real `StatusDotState` with its own silhouette.
const leadingMark = [
    { state: "active", label: "Active" },
    { state: "online", label: "Syncing" },
    { state: "idle", label: "Idle" },
    { state: "error", label: "Error" },
] as const;

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
            label: "with leading status mark",
            blurb: "The compact state mark is StatusDot — every state carries its own silhouette, so the row survives monochrome and forced-color modes.",
            specimens: leadingMark.map((d) => ({
                component: Badge,
                props: { variant: "outline", class: "gap-1.5" },
                slots: {
                    default: [
                        { component: StatusDot, props: { state: d.state } },
                        d.label,
                    ],
                },
            })),
        },
        {
            label: "size axis",
            blurb: "Type by ROLE on the canonical series (caption · control-label · control-value); pad on the spacing series, off the --ui-scale scalar. The single-character specimens sit on the circular floor at EVERY rung — the floor is the badge's own box height, and the inline pad is ceilinged at the slack that floor leaves over one character, which is what makes it bind. The two-character specimen grows off the floor.",
            specimens: [
                { component: Badge, props: { size: "sm" }, slots: { default: "sm · caption" } },
                { component: Badge, props: { size: "md" }, slots: { default: "md · control-label (default)" } },
                { component: Badge, props: { size: "lg" }, slots: { default: "lg · control-value" } },
                { component: Badge, props: { size: "sm" }, slots: { default: "1" } },
                { component: Badge, props: { size: "md" }, slots: { default: "7" } },
                { component: Badge, props: { size: "lg" }, slots: { default: "9" } },
                { component: Badge, props: { size: "lg" }, slots: { default: "12" } },
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
            blurb: "Compose --success / --warning / --info plates with their --*-foreground glyph counterparts. The compact noncolor state mark is StatusDot — see the leading-mark row above.",
            // The four "<tone> with dot" twins are GONE. They repeated the four
            // specimens beside them to demonstrate a hand-rolled `rounded-full` dot
            // that this library ships a component for, and that component now
            // appears one section up with its real states.
            specimens: semanticTones.map((tone) => ({
                component: Badge,
                props: { tone },
                slots: { default: tone },
            })),
        },
        {
            label: "baseline alignment in text-small context",
            // Prose with an inline specimen — the bespoke escape.
            bespoke: {
                component: "p",
                props: { class: "text-small" },
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
    </StoryPage>
</template>
