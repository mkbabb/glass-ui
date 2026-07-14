<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import type { StoryBody, SpecimenSpec } from "../../chassis/body/story-body";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@glass/components/ui/select";
import { Label } from "@glass/components/ui/label";
import { IconChip } from "@glass/components/custom/icon-chip";
import { ListFilter } from "@lucide/vue";
// The forms band's ONE coherent --section-color-3 teal identity (the cool stop).
const FORMS_STOP = 3;

// A SelectItem node — `value` is the item value, `text` the label, `extra` any
// per-item prop (a viz-dot style, a `disabled`).
const item = (
    value: string,
    text: string,
    extra: Record<string, unknown> = {},
): SpecimenSpec => ({
    component: SelectItem,
    props: { value, ...extra },
    slots: { default: text },
});

const group = (label: string, items: SpecimenSpec[]): SpecimenSpec => ({
    component: SelectGroup,
    slots: {
        default: [{ component: SelectLabel, slots: { default: label } }, ...items],
    },
});

// A labeled picker field — Label over Select. `models` is the EXPLICIT v-model map
// (ruling 8, no convention magic): the value binds `modelValue`, and the third
// field controls the reka `open` NAMED v-model — the anti-no-op floor made visible.
const field = (
    id: string,
    labelText: string,
    placeholder: string,
    content: SpecimenSpec[],
    models: Record<string, string>,
): SpecimenSpec => ({
    stack: [
        { component: Label, props: { for: id }, slots: { default: labelText } },
        {
            component: Select,
            models,
            slots: {
                default: [
                    {
                        component: SelectTrigger,
                        props: { id },
                        slots: { default: { component: SelectValue, props: { placeholder } } },
                    },
                    { component: SelectContent, slots: { default: content } },
                ],
            },
        },
    ],
});

const body: StoryBody = {
    kind: "sections",
    scope: {
        font: "plus-jakarta-sans",
        basis: "fourier",
        density: "",
        densityOpen: false,
    },
    sections: [
        {
            heading: "Grouped items",
            blurb: "Labeled groups with a separator between them.",
            size: "sm",
            specimens: [
                field(
                    "sel-font",
                    "Font family",
                    "Choose a typeface",
                    [
                        group("Display + serif", [
                            item("plus-jakarta-sans", "Plus Jakarta Sans"),
                            item("plus-jakarta-sans-fallback", "Plus Jakarta Sans Fallback"),
                        ]),
                        { component: SelectSeparator },
                        group("Sans", [
                            item("inter", "Inter"),
                            item("system-ui", "System UI"),
                        ]),
                        { component: SelectSeparator },
                        group("Mono", [
                            item("fira-code", "Fira Code"),
                            item("jetbrains-mono", "JetBrains Mono"),
                        ]),
                    ],
                    { modelValue: "font" },
                ),
            ],
        },
        {
            heading: "Viz-basis fills",
            blurb: "Items inherit the fourier/chebyshev/legendre dot color.",
            size: "sm",
            specimens: [
                field(
                    "sel-basis",
                    "Orthogonal basis",
                    "Pick a basis",
                    [
                        item("fourier", "Fourier", {
                            style: { "--select-dot-color": "var(--viz-fourier)" },
                        }),
                        item("chebyshev", "Chebyshev", {
                            style: { "--select-dot-color": "var(--viz-chebyshev)" },
                        }),
                        item("legendre", "Legendre", {
                            style: { "--select-dot-color": "var(--viz-legendre)" },
                        }),
                    ],
                    { modelValue: "basis" },
                ),
            ],
        },
        {
            heading: "Disabled item + controlled open",
            blurb: "A disabled item, and the reka open state bound as a NAMED v-model.",
            size: "sm",
            specimens: [
                field(
                    "sel-density",
                    "Density",
                    "Pick a density",
                    [
                        item("cozy", "Cozy"),
                        item("comfortable", "Comfortable"),
                        item("compact", "Compact"),
                        item("spacious", "Spacious", { disabled: true }),
                    ],
                    { modelValue: "density", open: "densityOpen" },
                ),
            ],
        },
    ],
};
</script>

<template>
    <StoryPage :body="body">
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ListFilter" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Select
                </span>
                <p class="text-small text-muted-foreground">
                    Single-choice dropdown pickers — the section identity is the
                    ONE color event; the controls stay ink.
                </p>
            </div>
        </header>
    </StoryPage>
</template>
