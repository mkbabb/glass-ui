<script setup lang="ts">
import { ref } from "vue";
import { ChevronUp } from "lucide-vue-next";
import type { SidebarState, SidebarSection } from "./types";

const props = withDefaults(
    defineProps<{
        state: SidebarState;
        mode?: "sticky" | "drawer";
        renderTitle?: (title: string) => string;
    }>(),
    {
        mode: "sticky",
        renderTitle: (title: string) => title,
    },
);

defineSlots<{
    search?: () => any;
}>();

const sidebarNav = ref<HTMLElement | null>(null);
defineExpose({ sidebarNav });
</script>

<template>
    <aside class="progressive-sidebar" :class="`progressive-sidebar--${mode}`">
        <nav ref="sidebarNav" class="sidebar-nav scrollbar-thin">
            <slot name="search" />
            <div class="sidebar-header">
                <p class="sidebar-label">Contents</p>
                <button
                    class="sidebar-top-btn"
                    @click="state.scrollToTop()"
                    title="Scroll to top"
                >
                    <ChevronUp class="h-3 w-3" />
                </button>
            </div>
            <ol class="sidebar-list">
                <li v-for="(section, si) in state.sections" :key="section.id">
                    <button
                        :data-toc-id="section.id"
                        @click="state.toggleSection(section.id)"
                        class="sidebar-link"
                        :class="{ 'is-active': state.activeRootId.value === section.id }"
                    >
                        <span v-html="renderTitle(section.title)" />
                    </button>
                    <!-- Subsections (animated expand) -->
                    <div
                        v-if="section.children"
                        class="sidebar-sublist-wrapper"
                        :class="{ 'is-expanded': state.isExpanded(section.id) }"
                    >
                        <ol class="sidebar-sublist">
                            <li v-for="sub in section.children" :key="sub.id">
                                <button
                                    :data-toc-id="sub.id"
                                    @click="state.navigateTo(sub.id)"
                                    class="sidebar-link sidebar-sublink"
                                    :class="{ 'is-active-sub': state.isActive(sub.id) || state.isInActiveChain(sub.id) }"
                                >
                                    <span v-html="renderTitle(sub.title)" />
                                </button>
                                <!-- Sub-subsections -->
                                <ol
                                    v-if="sub.children && state.isInActiveChain(sub.id)"
                                    class="sidebar-subsublist"
                                >
                                    <li v-for="subsub in sub.children" :key="subsub.id">
                                        <button
                                            :data-toc-id="subsub.id"
                                            @click="state.navigateTo(subsub.id)"
                                            class="sidebar-link sidebar-subsublink"
                                            :class="{ 'is-active-sub': state.isActive(subsub.id) }"
                                        >
                                            <span v-html="renderTitle(subsub.title)" />
                                        </button>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                </li>
            </ol>
        </nav>
    </aside>
</template>

<style scoped>
.progressive-sidebar {
    --sidebar-top-inset: 1rem;
    --sidebar-bottom-inset: 1.5rem;
}

.progressive-sidebar--sticky {
    display: none;
}

@media (min-width: 1024px) {
    .progressive-sidebar--sticky {
        display: block;
        position: sticky;
        top: var(--sidebar-top-inset);
        align-self: start;
        min-height: 0;
        max-height: calc(100dvh - var(--sidebar-top-inset) - var(--sidebar-bottom-inset));
    }
}

.sidebar-nav {
    max-height: calc(100dvh - var(--sidebar-top-inset) - var(--sidebar-bottom-inset));
    overflow-y: auto;
    overscroll-behavior-y: contain;
    overscroll-behavior-x: contain;
    scrollbar-gutter: stable;
    scroll-padding-bottom: var(--sidebar-bottom-inset);
    touch-action: pan-y;
    padding: 0.625rem 0.625rem var(--sidebar-bottom-inset);
    border-radius: var(--radius-xl);
    border: 2px solid hsl(var(--foreground) / 0.15);
    background: hsl(var(--card));
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.625rem;
    margin-bottom: 0.5rem;
}

.sidebar-label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: hsl(var(--muted-foreground) / 0.6);
    margin: 0;
}

.sidebar-top-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--radius-sm);
    border: 1px solid hsl(var(--border) / 0.4);
    background: none;
    color: hsl(var(--muted-foreground) / 0.45);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-standard);
}

.sidebar-top-btn:hover {
    color: hsl(var(--foreground));
    border-color: hsl(var(--border));
    background: hsl(var(--muted) / 0.5);
}

.sidebar-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.0625rem;
}

.sidebar-link {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.35;
    padding: 0.28rem 0.625rem;
    border-radius: var(--radius-md);
    color: hsl(var(--muted-foreground));
    transition:
        color var(--duration-normal) var(--ease-out-expo),
        background-color var(--duration-normal) var(--ease-out-expo),
        font-weight var(--duration-fast) var(--ease-standard);
}

.sidebar-link:hover {
    color: hsl(var(--foreground));
    background: hsl(var(--muted) / 0.5);
}

.sidebar-link.is-active {
    background: none;
    font-weight: 600;
    color: hsl(var(--primary));
}

.sidebar-link.is-active-sub {
    font-weight: 600;
    background: hsl(var(--muted) / 0.4);
    color: hsl(var(--primary));
}

/* Animated subsection expand/collapse */
.sidebar-sublist-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition:
        grid-template-rows 0.4s var(--ease-out-expo),
        opacity 0.3s var(--ease-out-expo);
}

.sidebar-sublist-wrapper.is-expanded {
    grid-template-rows: 1fr;
    opacity: 1;
}

.sidebar-sublist-wrapper > .sidebar-sublist {
    overflow: hidden;
}

.sidebar-sublist {
    list-style: none;
    padding: 0 0 0 0.625rem;
    margin: 0.0625rem 0 0.125rem;
}

.sidebar-sublink {
    font-size: 0.78rem;
    padding: 0.2rem 0.45rem;
}

.sidebar-subsublist {
    list-style: none;
    padding: 0 0 0 0.5rem;
    margin: 0.03125rem 0 0.0625rem;
}

.sidebar-subsublink {
    font-size: 0.72rem;
    padding: 0.15rem 0.32rem;
}

/* Drawer mode */
.progressive-sidebar--drawer .sidebar-nav {
    max-height: 100%;
    border: none;
    border-radius: 0;
    background: transparent;
}
</style>
