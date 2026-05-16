/**
 * Provide/inject context for `<ProgressiveSidebar>` + `<ProgressiveSidebarSection>`.
 *
 * P.W3 Lane B — canonical typed-key + helper-pair DI shape per invariant 25.
 * The chassis provides the context; slotted `<ProgressiveSidebarSection>` children
 * register on mount + unregister on unmount, surfacing per-section identity and
 * (optionally) an icon/label for chassis-level coordination (e.g. active-section
 * highlighting, scroll-spy registration).
 *
 * The chassis's TOC-mode `state` prop is unrelated — TOC mode renders sections
 * from `state.sections` and does NOT install this context. Slotted mode (the
 * new shape that absorbs words/frontend's `WordlistProgressiveSidebar` chassis
 * + glass-ui demo's recipe) installs the context and tracks DOM-registered
 * sections via DI.
 *
 * Paired helpers:
 *  - `provideProgressiveSidebarContext(context)` — wraps the raw provide call.
 *  - `useProgressiveSidebarContext()` — strict; throws when used outside
 *    `<ProgressiveSidebar>` (chassis-bearing slot mode).
 *  - `useOptionalProgressiveSidebarContext()` — befitting silent default for
 *    sections that may render standalone or be tested in isolation.
 */
import {
    inject,
    provide,
    type Component,
    type ComputedRef,
    type InjectionKey,
} from "vue";

export interface ProgressiveSidebarSectionDescriptor {
    id: string;
    label?: string;
    icon?: Component;
}

export interface ProgressiveSidebarContext {
    register(desc: ProgressiveSidebarSectionDescriptor): void;
    unregister(id: string): void;
    /** Currently-active section id (matches an active-section DOM target). */
    activeSectionId: ComputedRef<string | null>;
    /** True when the consumer-supplied id matches `activeSectionId`. */
    isActive(id: string): boolean;
}

export const PROGRESSIVE_SIDEBAR_CONTEXT_KEY: InjectionKey<ProgressiveSidebarContext> =
    Symbol("glass-ui:progressive-sidebar");

export function provideProgressiveSidebarContext(
    context: ProgressiveSidebarContext,
): void {
    provide(PROGRESSIVE_SIDEBAR_CONTEXT_KEY, context);
}

/** Strict — throws when used outside `<ProgressiveSidebar>` (slotted mode). */
export function useProgressiveSidebarContext(): ProgressiveSidebarContext {
    const ctx = inject(PROGRESSIVE_SIDEBAR_CONTEXT_KEY);
    if (!ctx) {
        throw new Error(
            "[glass-ui:sidebar] <ProgressiveSidebarSection> must be used inside <ProgressiveSidebar> (slotted mode); use useOptionalProgressiveSidebarContext() for standalone-tested sections.",
        );
    }
    return ctx;
}

/** Befitting silent default — sections may render standalone for testing. */
export function useOptionalProgressiveSidebarContext(): ProgressiveSidebarContext | null {
    return inject(PROGRESSIVE_SIDEBAR_CONTEXT_KEY, null);
}
