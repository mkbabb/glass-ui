<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref, computed } from "vue";
import { Filter, ListOrdered, Tags } from "lucide-vue-next";
import {
    ProgressiveSidebar,
    ProgressiveSidebarSection,
    type SidebarSection,
} from "../../../src/components/custom/sidebar";
import { useSidebarState } from "../../../src/composables/sidebar";

// Slotted-mode demo (P.W3 Lane B). Consumer #2 of the slotted chassis;
// pairs with words/frontend's WordlistProgressiveSidebar at P.W5 Lane E.
const slottedActive = ref<string | null>("filters");

const sections: SidebarSection[] = [
    {
        id: "foundations",
        title: "Foundations",
        children: [
            { id: "foundations/colors", title: "Colors" },
            { id: "foundations/typography", title: "Typography" },
            {
                id: "foundations/motion",
                title: "Motion",
                children: [
                    { id: "foundations/motion/easings", title: "Easings" },
                    { id: "foundations/motion/springs", title: "Springs" },
                    { id: "foundations/motion/choreography", title: "Choreography" },
                ],
            },
        ],
    },
    {
        id: "primitives",
        title: "Primitives",
        children: [
            { id: "primitives/button", title: "Button" },
            {
                id: "primitives/inputs",
                title: "Inputs",
                children: [
                    { id: "primitives/inputs/text", title: "Text" },
                    { id: "primitives/inputs/number", title: "Number" },
                    { id: "primitives/inputs/slider", title: "Slider" },
                ],
            },
            { id: "primitives/select", title: "Select" },
            { id: "primitives/toggle", title: "Toggle" },
        ],
    },
    {
        id: "containers",
        title: "Containers",
        children: [
            { id: "containers/card", title: "Card" },
            { id: "containers/dialog", title: "Dialog" },
            { id: "containers/sheet", title: "Sheet" },
            { id: "containers/popover", title: "Popover" },
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        children: [
            { id: "navigation/tabs", title: "Tabs" },
            { id: "navigation/dock", title: "Dock" },
            { id: "navigation/sidebar", title: "Sidebar" },
        ],
    },
];

const activeId = ref<string | null>("navigation/sidebar");

const activeRootId = computed<string | null>(() => {
    const id = activeId.value;
    if (!id) return null;
    // Walk the tree and find the root ancestor id.
    const stack: Array<{ node: SidebarSection; root: string }> = [];
    for (const root of sections) stack.push({ node: root, root: root.id });
    while (stack.length) {
        const { node, root } = stack.pop()!;
        if (node.id === id) return root;
        if (node.children) {
            for (const child of node.children) stack.push({ node: child, root });
        }
    }
    return null;
});

const state = useSidebarState({
    sections,
    activeId,
    activeRootId,
    scrollTo: (id: string) => {
        activeId.value = id;
    },
    scrollToTop: () => {
        activeId.value = sections[0]?.id ?? null;
    },
});
</script>

<template>
    <StoryPage>
        <section class="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
            <ProgressiveSidebar :state="state" class="lg:block" />

            <div class="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-6">
                <div class="flex items-baseline gap-2">
                    <span class="text-xs uppercase tracking-wider text-muted-foreground">active</span>
                    <code class="rounded bg-muted px-2 py-0.5 text-sm">{{ activeId ?? "—" }}</code>
                </div>
                <div class="flex items-baseline gap-2">
                    <span class="text-xs uppercase tracking-wider text-muted-foreground">root</span>
                    <code class="rounded bg-muted px-2 py-0.5 text-sm">{{ activeRootId ?? "—" }}</code>
                </div>
                <p class="text-sm text-muted-foreground">
                    Click any item in the sidebar to update <code class="rounded bg-muted px-1">activeId</code>.
                    The tree auto-expands the active root while remembering manual toggles.
                </p>
                <div class="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-3">
                    <button
                        v-for="id in ['foundations/colors', 'primitives/inputs/slider', 'navigation/dock']"
                        :key="id"
                        class="rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium hover:bg-muted"
                        @click="activeId = id"
                    >
                        jump → {{ id }}
                    </button>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-sm font-semibold text-foreground">API surface</h2>
            <ul class="list-disc pl-5 space-y-1">
                <li><code class="rounded bg-muted px-1">useSidebarState</code> takes the tree plus active + scroll hooks.</li>
                <li>Returns <code class="rounded bg-muted px-1">isExpanded</code>, <code class="rounded bg-muted px-1">toggleSection</code>, <code class="rounded bg-muted px-1">navigateTo</code>, <code class="rounded bg-muted px-1">isActive</code>, <code class="rounded bg-muted px-1">isInActiveChain</code>.</li>
                <li>Renders two nesting levels of children with an animated <code class="rounded bg-muted px-1">grid-template-rows</code> height transition.</li>
            </ul>
        </section>

        <!-- Slotted-mode demo (P.W3 Lane B HEADLINE). Chassis-only; sections
             register via DI. Mirrors the words/frontend WordlistProgressiveSidebar
             composition shape (filter + sort + tags), absorbing ~469 LOC of
             parallel implementation at P.W5 Lane E cross-repo write. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">Slotted chassis (P.W3 Lane B)</h2>
            <p class="text-sm text-muted-foreground">
                Omit <code class="rounded bg-muted px-1">state</code> and compose
                <code class="rounded bg-muted px-1">&lt;ProgressiveSidebarSection&gt;</code>
                children. Sections register with the chassis via DI; the
                <code class="rounded bg-muted px-1">active</code> prop drives
                per-section <code class="rounded bg-muted px-1">data-active</code>.
            </p>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
                <ProgressiveSidebar :active="slottedActive">
                    <ProgressiveSidebarSection id="filters" label="Filters" :icon="Filter">
                        <div class="flex flex-col gap-1 pt-2 text-sm">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" /> Active only
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" /> Has tags
                            </label>
                        </div>
                    </ProgressiveSidebarSection>

                    <ProgressiveSidebarSection id="sort" label="Sort" :icon="ListOrdered">
                        <div class="flex flex-col gap-1 pt-2 text-sm">
                            <label class="flex items-center gap-2">
                                <input type="radio" name="sort" /> Name
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" name="sort" /> Updated
                            </label>
                        </div>
                    </ProgressiveSidebarSection>

                    <ProgressiveSidebarSection id="tags" label="Tags" :icon="Tags">
                        <div class="flex flex-wrap gap-1 pt-2 text-xs">
                            <span class="rounded-full bg-muted px-2 py-0.5">vocab</span>
                            <span class="rounded-full bg-muted px-2 py-0.5">latin</span>
                            <span class="rounded-full bg-muted px-2 py-0.5">stem</span>
                        </div>
                    </ProgressiveSidebarSection>
                </ProgressiveSidebar>

                <div class="flex flex-col gap-2 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-6">
                    <div class="flex items-baseline gap-2">
                        <span class="text-xs uppercase tracking-wider text-muted-foreground">active</span>
                        <code class="rounded bg-muted px-2 py-0.5 text-sm">{{ slottedActive ?? "—" }}</code>
                    </div>
                    <div class="grid grid-cols-3 gap-2 pt-2">
                        <button
                            v-for="id in ['filters', 'sort', 'tags']"
                            :key="id"
                            class="rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium hover:bg-muted"
                            @click="slottedActive = id"
                        >
                            activate {{ id }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
