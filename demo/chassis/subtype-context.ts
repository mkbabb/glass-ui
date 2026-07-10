// The demo SUB-TYPE taxonomy context (BG.W-STORY-PAGE-API — the §4-D restore).
//
// The storybook demo pages were bespoke spec-sheets — N locally-plausible
// scaffolds, no shared demo-KIND vocabulary (the gestalt-cohesion root, audit
// A2/GA-5). This module + the five sibling SFCs mint that vocabulary: a small,
// CLOSED set of demo KINDS, each a THIN composition over the StoryPage chassis
// that GUARANTEES the conformity invariants (a glassy sub-card · a header/rule ·
// the shared warm field) while the CONTENT varies. The direct cohesion cure —
// "N spec-sheets → one product with natural variation."
//
// The five KINDS (refined from the BD-era Pass-E page classification):
//   stage        — a full-bleed live FIELD hosting a demo (the studio pattern;
//                  the viz/aurora hero over the page substrate).
//   specimen     — ONE glassy sub-card hosting a single demo specimen (the base
//                  conformity rung every other kind extends).
//   interaction  — a glassy card hosting the library's own interactives (a
//                  controls column — never a hand-rolled lozenge).
//   matrix       — a responsive GRID of specimen cells (variant matrices, dot
//                  grids, the repetition tiles).
//   composition  — a glassy scene card composing ≥2 library components into the
//                  surface they were built for (settings · gate · empty-state).
//
// This is the DEMO-side chassis — NOT a library export (like StorySection /
// ShowcaseFrame / VizStudio, the demo-private chassis family).

import type { ComputedRef, InjectionKey } from "vue";
import type { StoryBackground } from "./hero/aurora-hero";

/** The closed demo-KIND vocabulary — the taxonomy is exactly these five. */
export const DEMO_SUBTYPES = [
    "stage",
    "specimen",
    "interaction",
    "matrix",
    "composition",
] as const;

export type DemoSubtype = (typeof DEMO_SUBTYPES)[number];

/**
 * The page FIELD context — StoryPage provides its manifest-declared background
 * (the warm field every demo floats over) so a nested sub-type (chiefly
 * `<DemoStage>`) reads "what field am I over?" WITHOUT mounting a second GL
 * context (the one-GL-per-route budget). The value is `undefined` outside a
 * StoryPage (the sub-type degrades to a self-contained glass frame).
 */
export const DEMO_FIELD_KEY: InjectionKey<
    ComputedRef<StoryBackground | undefined>
> = Symbol("glass-ui:demo-field");
