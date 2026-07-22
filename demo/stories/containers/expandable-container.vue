<script setup lang="ts">
// ExpandableContainer — in-place vs Teleport-to-body fullscreen, with the
// body-overflow lock-depth counter so adjacent expanded hosts don't collide.
// the chrome-hook seam: a consumer re-skins the trigger
// via the contracted `[data-part]` descendant selector (no `:deep()`) AND replaces
// the fullscreen-overlay chrome via the `#fullscreen-chrome` named slot — the
// body-lock + teleport + Escape-to-exit stay the SFC's (the consumer changes the
// CHROME, never the BEHAVIOUR).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { ExpandableContainer } from "@glass/components/expandable-container";
import { Maximize2, X } from "@lucide/vue";

// reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
</script>

<template>
    <StoryPage>

        <StorySection
            label="buttonPosition + Teleport fullscreen"
            blurb="The Maximize2 button promotes inline content to a fixed full-viewport host via Teleport. Body overflow is locked while open; the lock-depth counter ensures adjacent expanded containers don't collide."
        >
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ShowcaseFrame pad="md">
                    <ExpandableContainer button-position="right">
                        <template #default="{ fullscreen }">
                            <div
                                class="flex h-48 items-center justify-center rounded-md bg-card text-muted-foreground"
                            >
                                <code class="fira-code text-sm">
                                    button-position=right · fullscreen={{ fullscreen }}
                                </code>
                            </div>
                        </template>
                    </ExpandableContainer>
                </ShowcaseFrame>

                <ShowcaseFrame pad="md">
                    <ExpandableContainer button-position="left">
                        <template #default="{ fullscreen }">
                            <div
                                class="flex h-48 items-center justify-center rounded-md bg-card text-muted-foreground"
                            >
                                <code class="fira-code text-sm">
                                    button-position=left · fullscreen={{ fullscreen }}
                                </code>
                            </div>
                        </template>
                    </ExpandableContainer>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="Chrome hook — [data-part] re-skin + #fullscreen-chrome replacement"
            blurb="The expand/fullscreen chrome is a CONTRACTED seam, not a fork. The trigger re-skins via the `[data-part='trigger']` descendant selector (a plain consumer style, no `:deep()`); the fullscreen overlay swaps its corner button for a branded toolbar via the `#fullscreen-chrome` named slot. The body-overflow lock, Teleport, and Escape-to-exit are byte-untouched — the consumer changes the chrome, the library keeps the behaviour."
        >
            <ShowcaseFrame pad="md">
                <ExpandableContainer class="reskinned">
                    <template #fullscreen-chrome="{ collapse, label }">
                        <header
                            class="flex items-center justify-between gap-3 border-b border-border/40 px-6 py-4"
                        >
                            <span class="text-small text-foreground">Branded toolbar</span>
                            <button
                                type="button"
                                class="inline-flex items-center gap-2 rounded-button bg-primary/10 px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/20"
                                :aria-label="label"
                                @click="collapse"
                            >
                                <X class="h-4 w-4" />
                                Close
                            </button>
                        </header>
                    </template>
                    <template #default="{ fullscreen }">
                        <div
                            class="flex h-48 items-center justify-center rounded-md bg-card text-muted-foreground"
                        >
                            <code class="fira-code text-sm">
                                re-skinned trigger + branded #fullscreen-chrome ·
                                fullscreen={{ fullscreen }}
                            </code>
                        </div>
                    </template>
                </ExpandableContainer>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="#expand-trigger — full expand-affordance replacement"
            blurb="A consumer renders its OWN expand affordance (its own glyph, its own placement) via the `#expand-trigger` named slot — the slot's `expand()` callback flips the same `v-model:open`, so the body-teleport + lock + Escape are still the library's."
        >
            <ShowcaseFrame pad="md">
                <ExpandableContainer>
                    <template #expand-trigger="{ expand, label }">
                        <button
                            type="button"
                            class="absolute right-2 top-2 z-10 inline-flex items-center gap-2 rounded-button bg-primary/10 px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/20"
                            :aria-label="label"
                            @click="expand"
                        >
                            <Maximize2 class="h-4 w-4" />
                            Open
                        </button>
                    </template>
                    <template #default>
                        <div
                            class="flex h-48 items-center justify-center rounded-md bg-card text-muted-foreground"
                        >
                            <code class="fira-code text-sm">custom #expand-trigger affordance</code>
                        </div>
                    </template>
                </ExpandableContainer>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Stacked Escape — dismiss-topmost (LIFO)"
            blurb="Overlays register their Escape handler ONLY while open, and the global dispatcher resolves Escape LIFO — the top-most open overlay consumes Escape, a second Escape pops the next. Expand the outer container, then the inner one nested inside it: the first Escape collapses the INNER (topmost), the second Escape collapses the OUTER — never the outer first. Fullscreen also traps Tab inside the panel and restores focus to the trigger on collapse."
        >
            <ShowcaseFrame pad="md">
                <ExpandableContainer class="esc-stack-outer">
                    <template #default="{ fullscreen }">
                        <div
                            class="flex h-48 flex-col items-center justify-center gap-4 rounded-md bg-card p-6 text-muted-foreground"
                        >
                            <code class="fira-code text-sm">
                                outer · fullscreen={{ fullscreen }}
                            </code>
                            <ExpandableContainer class="esc-stack-inner">
                                <template #default="{ fullscreen: innerFullscreen }">
                                    <div
                                        class="flex h-32 items-center justify-center rounded-md bg-background/60 px-8 text-muted-foreground"
                                    >
                                        <code class="fira-code text-sm">
                                            inner · fullscreen={{ innerFullscreen }}
                                        </code>
                                    </div>
                                </template>
                            </ExpandableContainer>
                        </div>
                    </template>
                </ExpandableContainer>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="API"
            blurb="Slot prop `fullscreen: boolean` lets the consumer paint differently in expanded mode. The `data-part` re-skin hooks (trigger/overlay/panel + `data-mode`) and the `#expand-trigger`/`#fullscreen-chrome` replacement slots are the contracted chrome seam."
        />
    </StoryPage>
</template>

<style>
/* the contracted `[data-part]` re-skin hook reached via a
   PLAIN descendant selector (NOT a `:deep()` scope leak). The `data-part` is a
   light-DOM contracted public surface, so a consumer styles it from its own
   (unscoped) stylesheet — this re-paints the expand glyph on the `.reskinned`
   instance library-wide, no fork. */
.reskinned [data-part="trigger"][data-mode="expand"] {
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    color: var(--foreground);
}
</style>
