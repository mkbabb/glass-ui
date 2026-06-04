// proof:vt-names — the gate that makes invariant η structural. AS.W2 hardened
// the mint-source detector with 4 new mint forms + a per-mint dataflow tracer,
// PROVEN against six throwaway fixtures that were then deleted. This spec
// re-commits them permanently so the gate itself is guarded: a regression that
// re-blinds the detector to any mint form (or relaxes the useId() dataflow
// requirement) now fails `npm test`.
//
// Invariant η (recap): every `view-transition-name` / `anchor-name` MINT must
// derive from an app-unique source — Vue `useId()` (directly or through a
// module-scope binding chain) — OR be a documented page-singleton literal on the
// STATIC_ALLOWLIST. A module-level numeric counter (`let X = 0; vt-${++X}`), a
// volatile source (.length / clock / random), an unsourced dynamic value, or an
// off-allowlist static literal are all VIOLATIONS.
//
// The spec drives the detector through its FS-free entry `detectSource(path,
// source)` — `path` selects the region kind (.ts / .css / .vue), `source` is the
// in-memory fixture. We assert the verdict shape, not the human summary.

import { describe, expect, it } from "vitest";

import { detectSource } from "../proof-vt-names.mjs";

// A fixture is clean iff the detector found ≥ 1 mint and ALL of them pass — a
// zero-mint result would be a false "clean" (the detector simply not seeing the
// mint), so we require at least one mint to have been classified.
function isClean(path: string, source: string): boolean {
    const { mints, violations } = detectSource(path, source);
    return mints.length > 0 && violations.length === 0;
}

function violationCount(path: string, source: string): number {
    return detectSource(path, source).violations.length;
}

describe("proof:vt-names — invariant η mint-source detector", () => {
    // -----------------------------------------------------------------------
    // KNOWN-GOOD — the two clean mint shapes the gate must keep passing.
    // -----------------------------------------------------------------------
    describe("known-good", () => {
        it("passes a dynamic mint whose value traces to useId() through a module binding chain", () => {
            // The canonical GlassDock-fixed shape: useId() → a module binding →
            // the mint. The per-mint tracer must follow `dockId` back to the
            // `useId()` RHS and rule it app-unique.
            const source = `
import { useId } from "vue";
const dockId = \`glass-dock-\${useId()}\`;
function mount(el) {
    el.style.viewTransitionName = dockId.replace(/[^a-z0-9-]/g, "-");
}
`;
            expect(isClean("Comp.ts", source)).toBe(true);
        });

        it("passes a documented page-singleton static name on the allowlist", () => {
            // --gl-tab-active is the UnderlineTabs position-anchor singleton —
            // one active tab per tablist, collision-free by construction.
            const source = `
.tab[aria-selected="true"] {
    anchor-name: --gl-tab-active;
}
`;
            expect(isClean("tabs.css", source)).toBe(true);
        });
    });

    // -----------------------------------------------------------------------
    // KNOWN-BAD — one fixture per hardened mint form, each must be FLAGGED.
    // -----------------------------------------------------------------------
    describe("known-bad — each hardened mint form is flagged", () => {
        it("flags an off-allowlist static literal name (CSS-static page-singleton check)", () => {
            // A brand-new static name is a VIOLATION until a maintainer makes a
            // conscious allowlist entry — keeps the gate a real guard.
            const source = `
.thumb {
    view-transition-name: --gl-some-new-thumb;
}
`;
            expect(violationCount("widget.css", source)).toBeGreaterThan(0);
        });

        it("flags a template-literal mint with non-useId interpolation", () => {
            // form (b): a backtick style-string carrying `view-transition-name`
            // with a `${…}` that does NOT trace to useId(). The interpolated
            // value `props.id` resolves to nothing app-unique → violation.
            const source = `
function paint(el, props) {
    el.style.cssText = \`view-transition-name: vt-\${props.id};\`;
}
`;
            expect(violationCount("paint.ts", source)).toBeGreaterThan(0);
        });

        it("flags a dynamic mint whose value flows from a module-level numeric counter (the GlassDock bug)", () => {
            // form (c) + dataflow: the `let dockInstanceId = 0` counter restarts
            // per module-graph copy and silently collides. The tracer must follow
            // `name` → `dockInstanceId` and rule it a counter violation.
            const source = `
let dockInstanceId = 0;
function mount(el) {
    const name = \`vt-\${++dockInstanceId}\`;
    el.style.viewTransitionName = name;
}
`;
            expect(violationCount("dock.ts", source)).toBeGreaterThan(0);
        });

        it("flags a setProperty 2-arg mint with no useId derivation", () => {
            // form (d): `.style.setProperty("view-transition-name", <expr>)` with
            // a string-literal property name and an unsourced dynamic value.
            const source = `
function paint(el, label) {
    el.style.setProperty("view-transition-name", \`vt-\${label}\`);
}
`;
            expect(violationCount("set.ts", source)).toBeGreaterThan(0);
        });

        it("flags a setAttribute('style', …) mint carrying the property dynamically", () => {
            // form (e): the property hides inside a `setAttribute("style", …)`
            // body. The detector must re-scan the style-string fragment.
            const source = `
function paint(el, key) {
    el.setAttribute("style", \`view-transition-name: vt-\${key};\`);
}
`;
            expect(violationCount("attr.ts", source)).toBeGreaterThan(0);
        });

        it("flags a dynamic mint that traces to a VOLATILE source (.length)", () => {
            // The dataflow case where the name flows from a non-useId source —
            // here a `.length` read, which is not app-unique.
            const source = `
function paint(el, items) {
    el.style.anchorName = \`anchor-\${items.length}\`;
}
`;
            expect(violationCount("vol.ts", source)).toBeGreaterThan(0);
        });

        it("flags a .vue <template> :style camelCase mint with non-useId interpolation", () => {
            // form (f): a `:style` object literal whose camelCase IDL key is
            // bound to an unsourced expression, scanned in the TEMPLATE region.
            const source = `
<template>
    <div :style="{ viewTransitionName: 'vt-' + row.id }" />
</template>
`;
            expect(violationCount("Row.vue", source)).toBeGreaterThan(0);
        });
    });

    // -----------------------------------------------------------------------
    // DATAFLOW LAUNDERING — a merely-mentioned useId() elsewhere in the file
    // must NOT launder an unrelated counter-fed mint (the AS.W2 hardening).
    // -----------------------------------------------------------------------
    it("does NOT launder a counter-fed mint just because useId() appears elsewhere in the file", () => {
        const source = `
import { useId } from "vue";
let counter = 0;
const unrelated = useId();
function mount(el) {
    el.style.viewTransitionName = \`vt-\${++counter}\`;
}
`;
        expect(violationCount("launder.ts", source)).toBeGreaterThan(0);
    });
});
