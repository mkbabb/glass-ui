<script setup lang="ts">
// SpaView — the bounded view-cache router pane (BB.B7 — W-SPAVIEW-CACHE). The
// demo proves the cache is LIVE: each view carries a counter; switch away, switch
// back, and the count survives (the KeepAlive cache restored the live instance,
// no re-mount). The :max cap bounds the LRU.
import { defineComponent, h, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { SpaView } from "../../../src/components/custom/spa-view";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { Layers } from "@lucide/vue";


// Three views, each with its OWN local counter. The counter is the cache witness:
// after the KeepAlive caches the inactive view, switching back restores the SAME
// live instance, so its count is preserved (a re-mount would reset it to 0).
function makeView(name: string, accent: string) {
    return defineComponent({
        name,
        setup() {
            const count = ref(0);
            return () =>
                h(
                    "div",
                    {
                        class: "spa-demo-view flex h-44 flex-col items-center justify-center gap-3 rounded-md",
                        style: { background: `color-mix(in oklab, var(--glass-bg-quiet), ${accent} 8%)` },
                    },
                    [
                        h("code", { class: "fira-code text-sm text-muted-foreground" }, name),
                        h(
                            "button",
                            {
                                class: "rounded-button border px-4 py-2 text-small font-medium",
                                onClick: () => count.value++,
                            },
                            `clicked ${count.value}× — survives the switch`,
                        ),
                    ],
                );
        },
    });
}

const VIEWS: Record<string, ReturnType<typeof makeView>> = {
    assets: makeView("assets", "var(--section-color-2)"),
    layers: makeView("layers", "var(--section-color-7)"),
    library: makeView("library", "var(--section-color-9)"),
};

const active = ref<string>("assets");
const tabs = [
    { value: "assets", label: "Assets" },
    { value: "layers", label: "Layers" },
    { value: "library", label: "Library" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Cached views, out-in fade"
            label=":max LRU + KeepAlive + Transition mode=out-in"
            blurb="Click the counter in a view, switch tabs, switch back — the count SURVIVES (the cache restored the live instance, no re-mount). The :max cap bounds the LRU; include/exclude pass through to KeepAlive. The fade is opacity-only (compositor-safe) and shortens to an instant swap under prefers-reduced-motion."
        >
            <ShowcaseFrame pad="md">
                <div class="flex flex-col gap-4">
                    <SegmentedTabs
                        v-model="active"
                        :options="tabs"
                        variant="pill"
                        aria-label="Cached views"
                    />
                    <SpaView :is="VIEWS[active]" :view-key="active" :max="3" />
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
