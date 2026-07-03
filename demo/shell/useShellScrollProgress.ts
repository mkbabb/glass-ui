// BG.W-DOCK-SCROLL-PROGRESS — the shell scroll-progress seam.
//
// The page-scroll progress is no longer a standalone bar: it is a BORDER ITEM on
// the leftside shell dock (the `<BorderProgress>` ring SidebarDock wears). The
// VALUE source is the shell route-scroller's scroll FRACTION
// (`scrollTop / (scrollHeight − clientHeight)`) — AppShell owns `<main
// class="demo-main-scroller">`, computes the fraction (rAF-coalesced passive
// listener + route-settle recompute), and provides it here; SidebarDock injects.
//
// (`useScrollProgress` — the library viewport-ENTRY mapper — is deliberately NOT
// the source: it maps a target's viewport position, not a container's scroll
// fraction. The directive's intent — the scroll position drives the value — is
// kept; the divergence is recorded in USER-0703-FIX-NOTES.md.)
//
// The dock ORIENTATION rides the same seam: the V↔H in-place morph settles the
// shell dock vertical (the left rail) or horizontal (the floating top bar), and
// the ring's coverage follows (inline-end-edge ↔ bottom-edge).

import { inject, ref, type InjectionKey, type Ref } from "vue";

/** The shell route-scroller's scroll fraction, 0..1. */
export const SHELL_SCROLL_PROGRESS: InjectionKey<Ref<number>> = Symbol(
    "demo:shell-scroll-progress",
);

/** The shell dock's SETTLED orientation (the V↔H morph commit). */
export const SHELL_DOCK_ORIENTATION: InjectionKey<
    Ref<"vertical" | "horizontal">
> = Symbol("demo:shell-dock-orientation");

/** Inject the shell scroll fraction (a detached host reads a static 0). */
export function useShellScrollProgress(): Ref<number> {
    return inject(SHELL_SCROLL_PROGRESS, () => ref(0), true);
}

/** Inject the shell dock's settled orientation (defaults vertical). */
export function useShellDockOrientation(): Ref<"vertical" | "horizontal"> {
    return inject(SHELL_DOCK_ORIENTATION, () => ref<"vertical" | "horizontal">("vertical"), true);
}
