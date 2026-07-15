// BG.W-DOCK-SCROLL-PROGRESS — the shell scroll-progress seam.
//
// The page-scroll progress is no longer a standalone bar: it is a BORDER ITEM on
// the leftside shell dock (the `<ScrollProgressRim>` SidebarDock wears). The
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
// BI.W-DOCK-RETIRES — the `SHELL_DOCK_ORIENTATION` seam is DEFINITION-ABSENT (the V↔H
// in-place dock morph retired decided-terminal; the shell dock is a STATIC vertical rail,
// so the ring coverage is the fixed inline-end edge, no orientation follow).

import { inject, ref, type InjectionKey, type Ref } from "vue";

/** The shell route-scroller's scroll fraction, 0..1. */
export const SHELL_SCROLL_PROGRESS: InjectionKey<Ref<number>> = Symbol(
    "demo:shell-scroll-progress",
);

/** Inject the shell scroll fraction (a detached host reads a static 0). */
export function useShellScrollProgress(): Ref<number> {
    return inject(SHELL_SCROLL_PROGRESS, () => ref(0), true);
}
