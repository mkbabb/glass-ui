// Pages-as-data story schema.
//
// A spec-sheet story page is a STACK OF SECTIONS, each showing REAL library
// specimens (a bare Input, a variant grid of Badges, an Alert per tone). The
// dominant shape is so uniform that the page can be DATA, not hand-authored
// template: a `StoryBody` object declares the sections + their specimens, and
// `StoryBodyRenderer` expands it into the ONE specimen kit (StorySection →
// ShowcaseFrame → CodeBlock). "Real permutations, no oversize
// specimen, no meta prose" becomes UN-EXPRESSIBLE by construction, not gate-caught.
//
// This module is PURE DATA — types only, ZERO Vue runtime (no `ref`/`reactive`,
// no `h()`, no render closure, no `.vue` import). The reactive StoryScope harness
// + the per-cell isolated models live in the RENDERER; the schema only names the
// shape. Render closures do not belong in the data contract.
//
// `Component` is a TYPE-only import (a specimen references a real library
// component by value in the story SFC, where the imports are code-split per route;
// the schema only types the slot). A demo-private chassis schema — NOT a library
// export.
import type { Component } from "vue";

/**
 * The reading-measure cap applied to a section's flat specimen row. `fluid` leaves
 * the row uncapped; the other rungs preserve an intentional reading measure.
 */
export type SpecimenSize = "sm" | "md" | "prose" | "fluid";

/**
 * A component reference OR a native HTML tag name. A specimen is usually a real
 * library component (`Input`, `Badge`), but a leaf of raw markup (an error `<p>`,
 * a bare `<input class="input-pill">`) is a string tag rendered via `<component
 * :is>` — so a compound field stays DATA instead of falling to the bespoke escape.
 */
export type SpecimenTag = Component | string;

/**
 * The content of a specimen slot: a literal label string, a nested specimen node,
 * or a mixed list of the two (an Alert's icon node + title node; a Badge's dot node
 * + " Active" label). Recursive, but still pure data — a node is `{ component,
 * props, slots }`, never a closure.
 */
export type SlotContent = string | SpecimenSpec | ReadonlyArray<string | SpecimenSpec>;

/**
 * ONE specimen — a real library instance the renderer mounts bare in a section or
 * inside a ShowcaseFrame permutation cell. A leaf node (`component` + props +
 * models + slots) OR a composed field (`stack` of child nodes). Never both.
 */
export interface SpecimenSpec {
    /**
     * The component (or native tag) to instantiate. Omitted only when `stack`
     * composes the frame from child nodes.
     */
    component?: SpecimenTag;
    /**
     * Static props (component-specific, open shape). MODEL bindings do NOT live
     * here — a `modelValue` / `pressed` / `open` placed in `props` is a STATIC
     * prop that silently no-ops the two-way binding (the mis-bind trap). Reactive
     * bindings go through `models`.
     */
    props?: Record<string, unknown>;
    /**
     * The EXPLICIT v-model map: `{ modelProp: scopeKey }`. EVERY
     * reactive binding is written here — no convention magic. `{ modelValue:
     * "plain" }` for a default v-model; `{ pressed: "on" }` / `{ open: "isOpen" }`
     * for a named v-model. The map is the anti-no-op FLOOR (a named v-model
     * silently no-ops when mis-bound), and it COUNTS toward the schema, never the
     * escape hatch. A specimen that needs a two-way binding declares it in `models`
     * rather than leaning on a bare `modelValue` prop.
     */
    models?: Record<string, string>;
    /** Slot content by name (`default` the common case). */
    slots?: Record<string, SlotContent>;
    /**
     * A composed field: child nodes stacked vertically inside ONE frame (a Label
     * over its Input over its error hint reads as one control, not three frames).
     */
    stack?: SpecimenSpec[];
    /**
     * An explicit accessible name for the specimen. Absent, the renderer
     * AUTO-derives one from the model/prop combo (`variant: outline, size: sm`) so
     * a permutation cell is never an unlabeled swatch.
     */
    ariaLabel?: string;
}

/**
 * One axis of a cartesian permutation: `prop` takes each of `values` in turn. The
 * The renderer multiplies axes into a bounded labeled grid of REAL instances,
 * each cell its own isolated model (a permute cell never shares state with its
 * neighbour) + an auto aria-label from the combo.
 */
export interface PermuteAxis {
    /** The prop varied across `values`. */
    prop: string;
    /** The values the axis sweeps (each produces one column/cell of the grid). */
    values: readonly unknown[];
    /** Optional per-value cell caption (else the raw value is shown). */
    labels?: readonly string[];
}

/**
 * The cartesian permutation of a base specimen across one or more axes — the
 * structural answer to "every component page shows real usage permutations". The
 * base's `slots.default`, absent, defaults per cell to that cell's combo label, so
 * a `<Badge variant="outline">outline</Badge>` grid is one terse axis.
 */
export interface PermuteSpec {
    /** The specimen every cell instantiates (the axes overwrite its props per cell). */
    base: SpecimenSpec;
    /** The axes multiplied into the grid. */
    axes: PermuteAxis[];
    /** The min cell inline-size the ordinary auto-fit grid reflows against. */
    minCell?: string;
}

/**
 * One section of a story body — a labeled group under a canonical <StorySection>.
 * A section is EITHER data (`permute` OR `specimens`) OR a `bespoke` escape — never
 * a data section with a hidden page-specific quirk field. The three are mutually
 * exclusive; the renderer dispatches on which is present.
 */
export interface SectionSpec {
    /** The section heading — a semantic <h2> at the canonical text-subheading rung. */
    heading?: string;
    /** The mono-caption EYEBROW above the heading. */
    label?: string;
    /** Muted supporting prose under the header, before the specimens. */
    blurb?: string;
    /** The size cap applied to this section's flat specimen row. */
    size?: SpecimenSize;
    /** A cartesian variant grid rendered as ShowcaseFrame cells. */
    permute?: PermuteSpec;
    /**
     * A flat list of specimens — rendered as a BARE wrap-row directly under the
     * <StorySection> (a row of Badges, an Alert, an Input in its measure), never a
     * redundant glass-on-glass frame per item (byte-identical to the hand-authored
     * original). ShowcaseFrame is reserved for labeled permutation cells.
     */
    specimens?: SpecimenSpec[];
    /**
     * The BESPOKE escape — the bound the design measures against, NOT a general
     * quirk hatch. A section the schema cannot frame as clean permute/specimens
     * (prose with an inline specimen, a `data-*`-hooked container, a page-specific
     * scene) names a node that renders VERBATIM — directly under the section, with
     * NO ShowcaseFrame — so the page's irreducible custom markup is honest. A page
     * whose MEAN drifts below the as-data bar has reached for this too often: the
     * honest signal to keep the page `bespoke` at the StoryPage slot, not to grow
     * the schema a quirk field.
     */
    bespoke?: SpecimenSpec;
}

/**
 * The controlled-state harness: the initial values of the reactive model bag the
 * specimens' `models` maps bind into. Pure data (initial values only) — the
 * renderer makes it reactive. A `<Input v-model>` page states `{ plain: "" }`; the
 * specimen states `models: { modelValue: "plain" }`.
 */
export type StoryScope = Record<string, unknown>;

/**
 * A story page expressed as DATA. `kind: "sections"` is the only kind — the
 * discriminant a StoryPage reads to swap its `<slot/>` for a <StoryBodyRenderer>.
 * A page that is NOT a section stack (a hero scene, a bespoke composition) declares
 * no `body` and stays a hand-authored slot — the escape is the bound.
 */
export interface StoryBody {
    kind: "sections";
    /** The controlled-state harness (initial model values). */
    scope?: StoryScope;
    /** The ordered sections. */
    sections: SectionSpec[];
}
