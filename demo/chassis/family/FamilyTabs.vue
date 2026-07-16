<script setup lang="ts">
// FamilyTabs — the demo-private FAMILY register.
//
// The mechanism the family-page collapse needs: ONE page shows N component-family
// members (textarea · combobox · select … under `forms/inputs`) as a SegmentedTabs
// switcher, dogfooding the library's OWN nav. It composes the shipped
// `<SegmentedTabs variant="underline">` (the paper ink-mark material — a family
// switcher is a paper affordance, not a glass pill toggle) as the tab strip, and
// renders the active member's SFC via `<component :is>`.
//
// The member SFCs each wrap `<StoryPage>` (their own chrome). `provide(STORY_NESTED_KEY,
// true)` here makes every descendant StoryPage render BARE (its slot body only) — so
// the family page owns the ONE identity header and the members contribute only their
// section bodies. Zero member content re-authored (the DRY family collapse).
import { computed, provide } from "vue";
import type { Component } from "vue";
import {
    SegmentedTabs,
    type SegmentedTabOption,
} from "@glass/components/tabs";
import { STORY_NESTED_KEY } from "./story-nested";

export interface FamilyMember {
    /** The stable member id (the tab value). */
    id: string;
    /** The tab label. */
    label: string;
    /** The member SFC (pass `defineAsyncComponent(() => import("../../stories/textarea.vue"))`). */
    component: Component;
}

const props = defineProps<{
    members: readonly FamilyMember[];
    /** Accessible name for the family switcher. */
    ariaLabel?: string;
}>();

// The member bodies render BARE (no per-member hero/chrome header — the family page
// owns the ONE identity header).
provide(STORY_NESTED_KEY, true);

const options = computed<SegmentedTabOption[]>(() =>
    props.members.map((m) => ({ label: m.label, value: m.id })),
);

const active = defineModel<string>({ default: "" });
// Seat the first member once (defineModel default "" is the un-seated marker).
if (!active.value && props.members.length) active.value = props.members[0]!.id;

const activeMember = computed<FamilyMember | undefined>(
    () => props.members.find((m) => m.id === active.value) ?? props.members[0],
);
</script>

<template>
    <div class="story-family flex flex-col gap-6">
        <!-- The family switcher — the library's own SegmentedTabs, paper material.
             `responsive` collapses it to a <Select> on a narrow viewport (a long
             family list must not overflow the mobile shell). -->
        <SegmentedTabs
            v-model="active"
            :options="options"
            variant="underline"
            responsive
            :aria-label="ariaLabel ?? 'Family members'"
            class="story-family__switcher self-start"
        />
        <!-- The active member's body, rendered bare (STORY_NESTED_KEY provided). Keyed
             on `active` so switching members remounts a fresh instance (clean local
             state and a fresh entrance) rather than reusing one across families. -->
        <div class="story-family__panel">
            <component :is="activeMember?.component" :key="active" />
        </div>
    </div>
</template>
