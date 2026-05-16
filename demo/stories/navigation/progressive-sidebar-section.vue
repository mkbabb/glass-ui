<script setup lang="ts">
// ProgressiveSidebarSection — slotted-mode SECTION primitive (P.W3 Lane B).
//
// The sibling sidebar.vue story shows the full slotted CHASSIS; this story
// focuses on the SECTION primitive in isolation — state, scroll-spy active
// cascade, header composition (icon + label vs custom #header slot), and
// the standalone fallback when no chassis context is present.
import { ref } from "vue";
import { Filter, ListOrdered, Tags, Wand2 } from "lucide-vue-next";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    ProgressiveSidebar,
    ProgressiveSidebarSection,
} from "../../../src/components/custom/sidebar";

const active = ref<string | null>("filters");

const sections = [
    { id: "filters", label: "Filters", icon: Filter, items: ["Active only", "Has tags", "Recently used"] },
    { id: "sort", label: "Sort", icon: ListOrdered, items: ["Name", "Updated", "Length"] },
    { id: "tags", label: "Tags", icon: Tags, items: ["vocab", "latin", "stem", "loan"] },
    { id: "effects", label: "Effects", icon: Wand2, items: ["Highlight", "Underline", "Strikethrough"] },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="four sections, one chassis"
            blurb="Each `<ProgressiveSidebarSection>` registers itself with the parent chassis via DI; the chassis drives per-section `data-active` from a single `active` prop. Click a section name on the right panel to flip the cascade."
        >
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
                <ProgressiveSidebar :active="active">
                    <ProgressiveSidebarSection
                        v-for="section in sections"
                        :key="section.id"
                        :id="section.id"
                        :label="section.label"
                        :icon="section.icon"
                    >
                        <div class="flex flex-col gap-1 pt-2 pl-2 text-sm">
                            <label
                                v-for="item in section.items"
                                :key="item"
                                class="flex items-center gap-2"
                            >
                                <input type="checkbox" />
                                {{ item }}
                            </label>
                        </div>
                    </ProgressiveSidebarSection>
                </ProgressiveSidebar>

                <ShowcaseFrame pad="md" tier="quiet">
                    <div class="flex flex-col gap-3">
                        <div class="flex items-baseline gap-2">
                            <span class="text-mono-caption text-muted-foreground">active</span>
                            <code class="fira-code text-mono-caption bg-muted px-2 py-0.5 rounded">
                                {{ active ?? "—" }}
                            </code>
                        </div>
                        <p class="text-prose text-muted-foreground">
                            Activating a section flips its <code class="fira-code">data-active</code>
                            attribute. Headers re-tint to <code class="fira-code">--primary</code>;
                            consumers extend the active cascade locally via the section's scoped CSS.
                        </p>
                        <div class="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-4">
                            <button
                                v-for="section in sections"
                                :key="section.id"
                                class="rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium scale-on-hover"
                                :class="active === section.id ? 'bg-primary text-primary-foreground' : 'bg-card'"
                                @click="active = section.id"
                            >
                                {{ section.label }}
                            </button>
                        </div>
                        <button
                            class="rounded-md border border-border/40 bg-muted/40 px-3 py-1.5 text-xs font-medium scale-on-hover w-fit"
                            @click="active = null"
                        >
                            clear active
                        </button>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="custom #header slot"
            blurb="Replace the default icon + label composition with a fully custom header. The chassis still drives the active cascade — only the rendered chrome changes."
        >
            <ShowcaseFrame pad="md">
                <ProgressiveSidebar :active="active">
                    <ProgressiveSidebarSection id="custom">
                        <template #header>
                            <div class="flex items-center justify-between w-full px-2.5 py-1 rounded-md bg-gradient-to-r from-violet-500/10 to-rose-500/10 border border-border/40">
                                <span class="text-mono-caption text-foreground font-semibold">
                                    Curated header
                                </span>
                                <code class="fira-code text-mono-caption text-muted-foreground">id=custom</code>
                            </div>
                        </template>
                        <div class="pt-2 pl-2 text-sm text-muted-foreground">
                            Section body content. Sections may render standalone — without a chassis
                            ancestor, the DI helper falls back to a no-op and the section just paints
                            its header + body.
                        </div>
                    </ProgressiveSidebarSection>
                </ProgressiveSidebar>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="API surface"
            blurb="Three optional props bind the section; everything else is slot composition."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">id: string</code>
                        — unique key the chassis uses to track active state.
                    </li>
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">label?: string</code>
                        — default header text (skipped when <code class="fira-code">#header</code> is provided).
                    </li>
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">icon?: Component</code>
                        — lucide-vue-next or any 16px-square icon SFC.
                    </li>
                    <li>
                        Slots: <code class="fira-code">#header</code> (override), <code class="fira-code">#default</code> (body).
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
