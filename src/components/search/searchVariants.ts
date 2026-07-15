// custom/search/searchVariants.ts — the SearchBar/FuzzySearch field-VARIANT CVA
// (BC.W-SEARCH-CUSTOM).
//
// The `variant` axis paints the field CHROME directly — REPLACING the
// `!important`-fighting-CVA escape FuzzySearch.vue carried (`!border-none
// !bg-transparent !p-0 !rounded-none`, the missing-variant-rung smell,
// component-customizability.md §4 class 6 / CLEANUP-PLAN HOLD-4). The borderless
// field is now a REAL CVA rung: it wins on its OWN specificity over the
// `.input-bar` recipe (a later unlayered utility beats the `@layer components`
// recipe — no `!important` needed), so the `!`-cluster is DELETED, not aliased.
//
//   inline   — the boxed glass search pill (the DEFAULT). The `.input-bar` recipe
//              paints the floating glass plate; this rung adds NOTHING (identity).
//   bare     — the chromeless field: the box border/fill/pad/radius stripped so the
//              field reads as plain text on whatever plate hosts it (a search field
//              seated INSIDE another surface — a rail header, a card). The legibility
//              feather without a competing box edge.
//   floating — the same chromeless field tuned for an OVERLAY morph aperture (the
//              dock-search pill→field; BC.W-DOCK-SEARCH CONSUMES this rung — it does
//              not re-author it). Borderless so the field floats over the morph
//              surface with no double edge.
//
// The SIZE axis is NOT here — it rides the SHARED `controlSizeClass(size)`
// (_shared/useControlSize.ts), re-exported below so the search SFCs reach ONE
// import. ZERO new magnitude register: the variant emits CHROME classes only; the
// height/font/glyph magnitudes stay the `--control-*`/`--ui-glyph` cohort tokens.

import { cva, type VariantProps } from "class-variance-authority";
import {
    type ControlSize,
    controlSizeClass,
} from "../_shared/useControlSize";

/**
 * The search field-CHROME variant. `inline` is the boxed glass pill (identity over
 * the `.input-bar` recipe); `bare`/`floating` strip the box to a chromeless field —
 * the real CVA rung the `!important` cluster was fighting (clean break, no `!`).
 *
 *   searchFieldVariants()                    → ""                                          (the boxed pill)
 *   searchFieldVariants({ variant: "bare" }) → "border-none bg-transparent p-0 rounded-none"
 */
export const searchFieldVariants = cva("", {
    variants: {
        variant: {
            inline: "",
            // The chromeless field — the box border/fill/pad/radius removed AS THE
            // VARIANT (no `!important`; a later unlayered utility wins over the
            // `@layer components` `.input-bar` recipe by layer order). This is the
            // exact class set the deleted `!border-none !bg-transparent !p-0
            // !rounded-none` cluster encoded — now a paint-decision rung, not a fight.
            bare: "border-none bg-transparent p-0 rounded-none",
            floating: "border-none bg-transparent p-0 rounded-none",
        },
    },
    defaultVariants: { variant: "inline" },
});

export type SearchVariant = NonNullable<
    VariantProps<typeof searchFieldVariants>["variant"]
>;

/** The CVA's variant-prop shape — the `/api` discovery surface (the SFCs cannot
 *  re-export a type, so this CVA home is the type source). */
export type SearchVariants = VariantProps<typeof searchFieldVariants>;

// The shared control-size axis re-exported through the search home so the SFCs
// reach the height/font rung + the field-chrome variant from ONE import. The
// magnitudes stay the `--control-*` cohort — `controlSizeClass` only re-points the
// `--control-pill-h`/`--control-pill-text` element seam the `.input-bar` recipe reads.
export { controlSizeClass };
export type { ControlSize };
