<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import type { StoryBody } from "../../chassis/body/story-body";
import { defineAsyncComponent } from "vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import { SearchBar } from "@glass/components/search";

// The Forms INPUT family. Textarea, select, combobox (single + multiple), and
// label render as members of this ONE input-family page via the switcher below.
const familyMembers: FamilyMember[] = [
    {
        id: "textarea",
        label: "Textarea",
        component: defineAsyncComponent(() => import("./textarea.vue")),
    },
    {
        id: "select",
        label: "Select",
        component: defineAsyncComponent(() => import("./select.vue")),
    },
    {
        id: "combobox",
        label: "Combobox",
        component: defineAsyncComponent(() => import("./combobox.vue")),
    },
    {
        id: "label",
        label: "Label",
        component: defineAsyncComponent(() => import("./label.vue")),
    },
];

// The page as data — the section stack + its controlled-state harness. Each field
// binds through the EXPLICIT `models` map (the anti-no-op floor); the compound
// fields (Label over Input over hint) are one `stack` frame, not three.
const body: StoryBody = {
    kind: "sections",
    scope: {
        plain: "",
        withLabel: "",
        errored: "not-an-email",
        apiKey: "locked-down-xxxxxxxxxxxx",
        searchTerm: "",
        pillBare: "",
    },
    sections: [
        {
            heading: "Default",
            blurb: "Bare Input, no label.",
            size: "sm",
            specimens: [
                {
                    component: Input,
                    models: { modelValue: "plain" },
                    props: {
                        placeholder: "Type something…",
                        "aria-label": "Plain text input",
                    },
                },
            ],
        },
        {
            heading: "With label",
            blurb: "Label + Input, explicit for binding.",
            size: "sm",
            specimens: [
                {
                    stack: [
                        {
                            component: Label,
                            props: { for: "story-email" },
                            slots: { default: "Email" },
                        },
                        {
                            component: Input,
                            models: { modelValue: "withLabel" },
                            props: {
                                id: "story-email",
                                type: "email",
                                placeholder: "name@domain.tld",
                            },
                        },
                    ],
                },
            ],
        },
        {
            heading: "With error",
            blurb: "Error messaging lives below the field and borrows the destructive token.",
            size: "sm",
            specimens: [
                {
                    stack: [
                        {
                            component: Label,
                            props: {
                                for: "story-email-err",
                                class: "text-destructive",
                            },
                            slots: { default: "Email" },
                        },
                        {
                            component: Input,
                            models: { modelValue: "errored" },
                            props: {
                                id: "story-email-err",
                                "aria-invalid": "true",
                                "aria-describedby": "story-email-err-msg",
                                class: "border-destructive focus:border-destructive focus:shadow-[0_0_0_2px_color-mix(in_srgb,var(--destructive)_30%,transparent)]",
                            },
                        },
                        {
                            component: "p",
                            props: {
                                id: "story-email-err-msg",
                                class: "text-small text-destructive",
                            },
                            slots: {
                                default:
                                    "That doesn’t look like an email address.",
                            },
                        },
                    ],
                },
            ],
        },
        {
            heading: "Disabled",
            blurb: "The disabled attribute dims opacity and blocks pointer events.",
            size: "sm",
            specimens: [
                {
                    stack: [
                        {
                            component: Label,
                            props: {
                                for: "story-disabled",
                                class: "opacity-60",
                            },
                            slots: { default: "API key" },
                        },
                        {
                            component: Input,
                            models: { modelValue: "apiKey" },
                            props: { id: "story-disabled", disabled: true },
                        },
                    ],
                },
            ],
        },
        {
            heading: "SearchBar",
            blurb: "SearchBar from the search subpath, icon baked in.",
            size: "sm",
            specimens: [
                {
                    component: SearchBar,
                    models: { modelValue: "searchTerm" },
                    props: {
                        placeholder: "Search the catalogue…",
                        "aria-label": "Search the catalogue",
                    },
                },
            ],
        },
        {
            heading: ".input-pill utility",
            blurb: "Raw .input-pill from glass.css, no component wrapper.",
            size: "sm",
            specimens: [
                {
                    component: "input",
                    models: { modelValue: "pillBare" },
                    props: {
                        class: "input-pill text-sm",
                        placeholder: "Bare pill input…",
                        "aria-label": "bare pill input",
                    },
                },
            ],
        },
        {
            heading: "The input family",
            bespoke: {
                component: FamilyTabs,
                props: { members: familyMembers, ariaLabel: "Input family" },
            },
        },
    ],
};
</script>

<template>
    <StoryPage :body="body" />
</template>
