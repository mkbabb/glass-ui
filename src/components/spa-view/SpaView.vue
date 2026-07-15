<script setup lang="ts">
// SpaView — a bounded view-cache router pane (BB.B7 — W-SPAVIEW-CACHE).
//
// The platform mechanism for "cache the inactive view so switching back is
// instant — no re-mount, no re-fetch" is Vue's built-in `<KeepAlive>` — a
// bounded LRU of mounted-but-inactive component instances with a `max` cap. This
// component does NOT hand-roll a cache (the no-fork discipline): KeepAlive IS the
// cache, `<Transition mode="out-in">` IS the cross-fade. SpaView is the thin
// glass-ui chassis that wires the two together behind one prop surface so a
// consumer (a speedtest AdminDashboardLayout, an admin shell) gets the
// instant-back-switch + the out-in fade without re-deriving the KeepAlive +
// Transition pairing each time.
//
// The transition is COMPOSITOR-ONLY (opacity, the shared `.fade` recipe in
// transitions.css — never a layout property; proof:no-layout-animation owns the
// library-wide enforcement) and PRM-gated (the `.fade` recipe shortens to an
// effectively-instant swap under `prefers-reduced-motion: reduce`).

import { computed } from "vue";
import type { Component } from "vue";

export interface SpaViewProps {
    /**
     * The active view. Either a component (`<component :is>`) or a string key the
     * default-slot resolves against. When `view`/`is` is set, SpaView renders the
     * dynamic component directly; when unset, the default slot is the active view
     * (the consumer drives `:is` inside the slot themselves).
     */
    view?: Component | string;
    /** Alias of `view` (the `:is` ergonomics — same dynamic-component target). */
    is?: Component | string;
    /**
     * The LRU cap — the max number of cached inactive view instances. Threaded
     * straight onto `<KeepAlive :max>`; when unset, KeepAlive's default (unbounded)
     * applies. The visual-load-bearing register: a bounded admin shell sets `:max`
     * to its tab count so the cache never grows without bound.
     */
    max?: number;
    /** KeepAlive include allowlist (component name / RegExp / array — pass-through). */
    include?: string | RegExp | (string | RegExp)[];
    /** KeepAlive exclude denylist (component name / RegExp / array — pass-through). */
    exclude?: string | RegExp | (string | RegExp)[];
    /**
     * The Vue <Transition> recipe name driving the out-in cross-fade. Defaults to
     * `"fade"` — the shared opacity-only compositor recipe (transitions.css). A
     * consumer overrides it with another `mode="out-in"`-safe recipe name.
     */
    transition?: string;
    /**
     * The stable key the transition keys off (a re-render WITHOUT a key change is
     * not a view swap). Defaults to the resolved `view`/`is` target. A consumer
     * driving the active view from the default slot supplies its own `:view-key`.
     */
    viewKey?: string | number;
}

const props = withDefaults(defineProps<SpaViewProps>(), {
    transition: "fade",
});

// `is` is the ergonomic alias of `view`; `view` wins when both are set.
const resolvedView = computed(() => props.view ?? props.is);

// The transition keys off an explicit `viewKey` when supplied, else the resolved
// view target — a string key is stable, a component object identity is stable.
const resolvedKey = computed<string | number>(() => {
    if (props.viewKey !== undefined) return props.viewKey;
    const v = resolvedView.value;
    return typeof v === "string" ? v : (v as { name?: string })?.name ?? "spa-view";
});
</script>

<template>
    <!--
      KeepAlive must wrap EXACTLY ONE component child (a plain element is not a
      cacheable component — Vue warns "KeepAlive expects exactly one child
      component"). So the dynamic-component path rides INSIDE KeepAlive (the
      cached, keyed view for the out-in swap); the slot-only fallback (no
      `view`/`is` — the consumer drives `:is` inside the slot themselves) renders
      OUTSIDE KeepAlive, where its content is its own concern. The Transition has
      one conditional child (KeepAlive XOR the slot host) either way.
    -->
    <Transition :name="transition" mode="out-in">
        <KeepAlive
            v-if="resolvedView"
            :max="max"
            :include="include"
            :exclude="exclude"
        >
            <component
                :is="resolvedView"
                :key="resolvedKey"
                class="spa-view-active"
            />
        </KeepAlive>
        <div v-else :key="resolvedKey" class="spa-view-active">
            <slot />
        </div>
    </Transition>
</template>
