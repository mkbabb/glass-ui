// AY.W-COLOCATE — the dock feature-dir constants home. The module-scope magic
// constants the dock composables read live HERE (the feature-dir `constants.ts`
// convention) rather than being re-declared at the top of each composable. The
// DI context modules (`composables/*Context.ts`) import their `Symbol(label)`
// strings from here so a label is never re-typed at two call sites.

import type { Component } from "vue";
import { springPreset } from "../../composables/motion/springPresets";

/**
 * BC.W-DOCK-STACK-RAIL — one `<DockStack>` member descriptor: a stack member that fans
 * OUT of the macOS hover-expand stack (id + label + glyph + optional select handler).
 * A `<script setup>` SFC cannot re-export a named type through the `export { default }`
 * barrel, so the descriptor lives here (the colocated types home) and the SFC imports
 * it; the barrel re-exports it for consumers typing their `items` array. This is the
 * stack's MEMBER, not a facet chip — the divider-carousel `DockRailItem` is RETIRED
 * (clean break, no alias).
 */
export interface DockStackItem {
    /** Stable identifier — the `v-for` key + the selected-member id. */
    id: string;
    /** The member's accessible label (the `aria-label` + tooltip). */
    label: string;
    /** The member glyph (a `@lucide/vue` icon or any component). */
    icon?: Component;
    /** Optional per-member select handler (fired alongside the model write). */
    onSelect?: () => void;
    /**
     * BE.W-DOCK-RAIL-REALIZE — the per-FACET accent hue (the `mode="facets"` context
     * carousel only — IGNORED by the macOS `mode="stack"` glyph fan). A complete
     * `<color>` (a consumer DATA/context hue) written to the chip's `--glass-accent`
     * (the BB.W-GLASS-ACCENT per-instance chromatic-rim axis, `rim.css`/`material.css`),
     * so each context facet carries its OWN rim+glint hue — the AZ context-carousel
     * identity. Unset ⇒ the neutral warm-cream rim (the `--glass-accent: transparent`
     * no-op floor). NOT a plate-background fill (the accent rides the THIN rim/glint;
     * presets-in-consumers — no consumer hue enters a library token).
     */
    accent?: string;
}

/**
 * BA.W-DOCK-SECTIONS — the three named zone kinds the declarative `<DockSection>`
 * descriptor renders (the R8-9 "rail core + sections + nav" three-zone gestalt):
 *   - `"rail-core"` — the leading home/brand region (the ℱ wordmark / category trigger).
 *   - `"section"`   — a named, divider-demarcated group of controls; a section
 *                     carrying `layers` composes the existing `DockLayerGroup`/`DockLayer`
 *                     registry (NOT a parallel layer machine).
 *   - `"nav"`       — the trailing nav arrows / utility group.
 */
export type DockSectionKind = "rail-core" | "section" | "nav";

/**
 * BA.W-DOCK-SECTIONS — one declarative section descriptor. A consumer passes
 * `sections: readonly DockSectionDescriptor[]` to `<DockSection>` and the dock body
 * renders the tripartite silhouette (rail-core | divided named sections | nav)
 * demarcated by `<DockSeparator>` — the IG-A3 / R8-9 "abstract this into a re-usable
 * component for layering" library gap. A `<script setup>` SFC cannot re-export a named
 * type through its default barrel, so the descriptor lives here (the colocated types
 * home, beside `DockRailItem`) and `DockSection.vue` imports it; the barrel re-exports
 * it for consumers typing their `sections` array.
 */
export interface DockSectionDescriptor {
    /** Which of the three zone kinds this descriptor renders. */
    kind: DockSectionKind;
    /** Stable identifier — the `v-for` key + the layer-context id for a `section`. */
    id: string;
    /** Optional accessible label for the grouped zone. */
    label?: string;
    /**
     * For a `section` kind: the stack members this section carries. When present
     * (length > 1) the members ride the dock's `#rail` stack (the macOS hover-expand
     * stack, OUTSIDE the dock box — never re-inflating it). The descriptor names them;
     * `<DockStack :items>` fans them out.
     */
    layers?: readonly DockStackItem[];
}

/**
 * The ONE dock-morph spring authority — the iOS-26 interruptible-physics tuning the
 * dock's single `SpringProgress` orchestrator (`dockMorphContext.ts`) AND the
 * `useLayerTransition` engine both read. Co-located here so the `response`/`damping`
 * pair is defined ONCE rather than duplicated at the top of each composable (the two
 * prior copies were a DRY hazard — a re-tune had to touch both).
 */
export const DOCK_SPRING = {
    response: springPreset("dock").response,
    dampingFraction: springPreset("dock").dampingFraction,
} as const;

/**
 * BG.NF.1 W-FALLBACK-EXCISE — the JS token-mirror constants (the NO-MASKING-FALLBACK
 * single-source floor). The dock composables read a live root token but need a value
 * when the root is not yet mounted; that value lives HERE ONCE (never a bare drift-prone
 * literal duplicated at the read site — the 1.14/44 that had already drifted 1.08→1.14).
 */

/**
 * The shape-morph squish cap — mirrors `--dock-morph-max-stretch` (density.css). The
 * lifted iOS-27 register (BD.W-MOTION-WEIGHT C1·R3 drift fix: the prior 1.08 was stale).
 */
export const DOCK_MORPH_MAX_STRETCH = 1.14;

/**
 * The collapsed-endpoint floor in px — mirrors `--dock-morph-min`'s `2.75rem` = the
 * WCAG 2.5.5 touch floor at the 16px root (density.css). Used until the collapsed
 * state has been captured at rest.
 */
export const DOCK_TAP_FLOOR_PX = 44;

// BI.W-DOCK-RETIRES — the `SIRI_FORMS`/`SIRI_SQRT_PHI`/`siriFormOf` Siri-island form
// ladder is DEFINITION-ABSENT (the Siri capability retired decided-terminal; clean break,
// no alias — see the disposition register, retiredBy: BI.W-DOCK-RETIRES).

/** `Symbol()` label for the `DockContext` injection key (`dockContext.ts`). */
export const DOCK_CONTEXT_LABEL = "glass-ui:dock-context";

/** `Symbol()` label for the `DockCrossfadeContext` injection key (`dockCrossfadeContext.ts`). */
export const DOCK_LAYER_GROUP_LABEL = "glass-ui:dock-layer-group";

/** `Symbol()` label for the `DockMorphContext` injection key (`dockMorphContext.ts`). */
export const DOCK_MORPH_LABEL = "glass-ui:dock-morph-context";

/** The intent-dwell before a collapsed→hover expand commits (a sweeping-edge enter is
 *  canceled by the chasing leave inside this window) — the calmer hover register KEPT
 *  by W-DOCK-SPINE. BI.W-DOCK-RETIRES deleted the `EDGE_BAND_PX` moving-edge-sweep
 *  recheck band (the ~120L hysteresis): post-SPINE the hit frame is a STATIONARY
 *  state-sized box, so a mid-morph leave never sweeps a moving edge past the cursor. */
export const HOVER_INTENT_MS = 60;

/* R5-TAP (R5-3) — the MORPH-SETTLE window for the click-integrity guard
 * (`useDockClickIntegrity`). After the dock flips collapsed→expanded (a tap or a
 * hover-approach click that initiated the expand), the layer swap shifts every
 * control's coordinates as the box morphs. A click that arrives within this window
 * AND lands on a DIFFERENT element than the one under the pointer at pointerdown is
 * the post-swap-coordinate hit (a Home link under a gear tap, Next under a gear
 * click) — it is swallowed. The window is the `--spring-dock` settle ENVELOPE; it is
 * a floor backstop only — the live `[data-morphing]` attribute is the primary
 * settle signal, this caps the window so a never-settling morph can't trap clicks
 * forever. Mirrors the slides interim 320ms guard (now retired by this root fix). */
export const MORPH_SETTLE_MS = 840;
