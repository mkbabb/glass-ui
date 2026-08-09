/* W-FIELD (#82) — the input · textarea · number-field lane's own battery.
 *
 * Six checks, one per lane gate: G-F1 ONE REGISTER · G-F2 PERIMETER + RECESS ·
 * G-F3 ENGAGED · G-F4 ONE INVALID / ONE SIZE / ONE RUNG · G-F5 TAB-WALK ·
 * G-F6 GEOMETRY + SURFACE HYGIENE. Each is the node-readable HALF of its gate.
 * The halves that are resolved pixels and composited colour — a measured
 * perimeter mass, a field L* against its page, a rest→hover paint delta, three
 * distinct block-sizes at a fine pointer, a 44×44 stepper's focus delta — are §6's
 * browser-seat probes owed to the π row, and they are NOT faked here: jsdom
 * returns the unresolved `var()` chain for every one of them, so an assertion on
 * `getComputedStyle` would convict nothing and certify less.
 *
 * SEATS +0. Nothing here claims a §B.5 seat name; this rides the tier-3 lane
 * acceptance class exactly as the card (#79), button (#80), picker (#81),
 * control-bit (#83) and toggle-row (#84) batteries do — per-lane born-RED gates
 * are component close-battery rows, not standing roster gates (CWT-3 §5;
 * TERMINAL-ROSTER E-7 extended to tier-3).
 *
 * TWO SPEC CLAUSES ARE FENCED ON ANOTHER ROW, and they are marked in place rather
 * than dropped:
 *   · G-F1's `rg -c "input-pill" src == 0` half — the 124-line dead register is
 *     `control-surfaces.css`'s owner's to strike (§9 row 1), not this lane's.
 *   · G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves — both resolve
 *     `--input-on-glass`, which is #22 W-FROST's token (§9 row 2, "both or
 *     nothing paints"). The other half of that two-part kill, `material.css`'s
 *     nested-cell blanket, has already landed.
 * To be exact about what is red and what is not: it is the SPEC gates G-F1/G-F2
 * that stay open until those owners cut, not the checks below. Each check asserts
 * only the direction this lane can honestly own and is GREEN as written; the fenced
 * half is named in the check's own title so nobody mistakes one for the other, and
 * nobody greens the fenced half by accident.
 *
 * THE LANE IS STATED ONCE and every check is scoped to it.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Input } from "@glass/components/input";
import { Textarea } from "@glass/components/textarea";
import {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
} from "@glass/components/number-field";

const ROOT = process.cwd();
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");
/** Strip comments so a prose mention can never satisfy or break a clause. */
const strip = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

const REGISTER = "src/components/_shared/field/control.css";
const EDGE = "src/styles/glass/control-edge.css";
const NF_SHEET = "src/components/number-field/styles.css";
const SHELLS = [
    "src/components/input/Input.vue",
    "src/components/textarea/Textarea.vue",
    "src/components/number-field/NumberFieldInput.vue",
];

describe("W-FIELD — the forms-seam lane battery", () => {
    it("G-F1 · ONE REGISTER — one material declaration, no shorthand reset, no plate composed on a well", () => {
        const register = strip(read(REGISTER));

        // The shorthand reset is what made `.glass-defined` inert on ~57 fields:
        // `border:` resets `border-color` and `background:` resets
        // `background-image`, so every channel a composed register contributed was
        // cancelled by a declaration whose author was not thinking about it.
        expect(register).not.toMatch(/(?:^|[\s;{])border:\s/);
        expect(register).not.toMatch(/(?:^|[\s;{])background:\s/);
        expect(register).toMatch(/border-width:\s*1px/);
        expect(register).toMatch(/border-style:\s*solid/);
        expect(register).toMatch(/border-color:/);
        expect(register).toMatch(/background-color:/);

        // The plate register leaves the four shells: a plate-over-floor image
        // stack under a fill ruled transmissive is composing-to-cancel.
        for (const shell of SHELLS) {
            expect(read(shell)).not.toContain("glass-defined");
            expect(read(shell)).toContain("glass-control-edge");
        }

        // KNOWN-RED half, fenced on W-CONTROL-REGISTER (§9 row 1): the 124 dead
        // `.input-pill` lines are that owner's strike. What this lane CAN own is
        // that no field shell, sheet or register mentions the dead class at all.
        expect(register).not.toContain("input-pill");
        for (const shell of SHELLS) expect(read(shell)).not.toContain("input-pill");
        expect(read(NF_SHEET)).not.toContain("input-pill");
    });

    it("G-F2 · PERIMETER + RECESS — the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)", () => {
        const register = strip(read(REGISTER));

        // ONE ink, the perimeter rung, at 1px. HEAD: 1.5px × 0.05 = a composited
        // mass of 0.075 against the ladder's 0.48.
        expect(register).toMatch(/--ink-perimeter/);
        expect(register).not.toMatch(/border-width:\s*1\.5px/);
        expect(register).not.toMatch(/border-width:\s*2px/);

        // The well is an INSET leg riding named ink rungs, deepening by exactly
        // one rung on hover — never a hand-set alpha.
        expect(register).toMatch(/--field-control-well:\s*var\(--ink-seam\)/);
        expect(register).toMatch(/--field-control-well:\s*var\(--ink-edge\)/);
        expect(register).toMatch(/--control-edge-inner:\s*inset/);

        // The fill still resolves the shared handle, un-forked: this lane does not
        // re-derive a transmissive fill locally while the token it would shadow is
        // another row's (two mechanisms, one value).
        expect(register).toMatch(/--control-surface-bg:\s*var\(--input-on-glass\)/);
        expect(register).toMatch(/backdrop-filter:\s*var\(--control-surface-blur\)/);
    });

    it("G-F3 · ENGAGED — the register carries a clock, a guarded hover, and a reduced-motion arm paired with a live one", () => {
        const register = strip(read(REGISTER));

        expect(register).toMatch(/transition:/);
        expect(register).toMatch(/--field-control-ease:\s*var\(--spring-press\)/);
        expect(register).toMatch(/--field-control-duration:\s*var\(--duration-control\)/);

        // Hover is fenced behind a real pointer; the PRM arm exists AND the live
        // arm above it does, so the reduce arm cannot pass on a dead tree.
        expect(register).toMatch(/@media\s*\(hover:\s*hover\)/);
        expect(register).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
        const transitions = register.match(/transition:/g) ?? [];
        expect(transitions.length).toBeGreaterThanOrEqual(1);

        // The invalid rung arrives on a bezier at its own slower clock — an error
        // must not bounce.
        expect(register).toMatch(/--field-control-ease:\s*var\(--ease-out\)/);
        expect(register).toMatch(/--field-control-duration:\s*var\(--duration-fast\)/);
    });

    it("G-F4 · ONE INVALID · ONE SIZE · ONE RUNG — one selector, one height mechanism, one type rung", () => {
        const register = strip(read(REGISTER));
        const nf = strip(read(NF_SHEET));

        // ONE invalid selector across the whole lane (`:is()` counts as one). The
        // lane shipped three.
        const invalidHeads = [...register.matchAll(/:user-invalid/g)];
        expect(invalidHeads.length).toBe(2); // the rung, and its :focus-visible compound
        expect(register).toContain(':is(:user-invalid, [data-state="invalid"])');
        expect(nf).not.toContain("invalid");

        // Validity may not move a box.
        expect(nf).not.toMatch(/border-width/);

        // ONE size mechanism: `data-size` re-points the height token and nothing
        // else. `sm` moving the FONT as well is what made the axis asymmetric.
        expect(register).toMatch(
            /\.field-control\[data-size="sm"\]\s*\{\s*--field-control-height:[^}]*\}/,
        );
        expect(register).not.toMatch(/--field-control-font/);
        expect(register).not.toMatch(/--control-text/);

        // ONE type rung: the bounded clamp, never multiplied past its own ceiling.
        expect(register).toMatch(/font-size:\s*var\(--type-small\)/);

        // NumberField no longer hard-pins a rung of its own.
        expect(nf).not.toMatch(/--field-control-height:\s*var\(--control-h-/);
    });

    it("G-F5 · TAB-WALK — focus arrives on `outline` for the field and the steppers cannot be erased by an emphasis", async () => {
        const register = strip(read(REGISTER));

        // The ring lives on `outline`, so no downstream `box-shadow: none` can
        // delete it — and `outline: none` is gone from the one element in a form a
        // keyboard user must be able to find.
        expect(register).toMatch(/:focus-visible\s*\{[^}]*outline:\s*var\(--focus-ring-width\)\s+solid/);
        expect(register).toMatch(/outline-offset:\s*2px/);
        expect(register).not.toMatch(/outline:\s*none/);

        // The steppers carry a resting material rather than the chromeless arm
        // that painted nothing at rest on a 44×44 target.
        const step = read("src/components/number-field/NumberFieldStep.vue");
        expect(step).toContain('emphasis="secondary"');
        expect(step).not.toContain('emphasis="quiet"');

        const wrapper = mount({
            components: { NumberField, NumberFieldInput, NumberFieldStep },
            template: `
                <NumberField :model-value="2" size="sm">
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput />
                    <NumberFieldStep direction="increment" />
                </NumberField>
            `,
        });
        // ONE size prop reaches the spinbutton AND both steppers.
        expect(wrapper.get('[role="spinbutton"]').attributes("data-size")).toBe("sm");
        for (const step of wrapper.findAll(".number-field__step")) {
            expect(step.attributes("data-size")).toBe("sm");
        }
    });

    it("G-F6 · GEOMETRY + SURFACE HYGIENE — series padding, a declared ceiling, no misfiled sheet, ARIA off the role-less root", () => {
        const register = strip(read(REGISTER));
        const edge = strip(read(EDGE));

        // 12 at rest, 8 below the breakpoint — both on the space series; 16 was on
        // neither. And the register finally HAS a media query.
        expect(register).toMatch(/padding-inline:\s*calc\(0\.75rem \* var\(--ui-scale\)\)/);
        expect(register).toMatch(/@media\s*\(width <= 768px\)/);
        expect(register).toMatch(/padding-inline:\s*calc\(0\.5rem \* var\(--ui-scale\)\)/);
        // A multi-line box's block padding equals its inline padding.
        expect(register).toMatch(/padding-block:\s*calc\(0\.75rem \* var\(--ui-scale\)\)/);

        // Growth is unconditional and the ceiling is a DECLARED token, not a
        // fallback pretending to be one.
        expect(register).toMatch(/field-sizing:\s*content/);
        expect(register).toMatch(/max-block-size:\s*var\(--textarea-content-max\)/);
        expect(register).not.toMatch(/min-block-size:\s*max\(5lh/);
        expect(read("src/styles/tokens/sizing.css")).toMatch(
            /--textarea-content-max:\s*12lh/,
        );

        // THE FLOOR, node-readable half. `field-sizing: content` ignores `rows`
        // outright — measured, `rows` 1 / 3 / 8 all render one line — so a floor
        // that only NAMES the attribute is a floor that does not exist. It is a
        // computed `min-block-size` over `--field-rows`, and the shell stamps that
        // variable from the attribute. BOTH halves are asserted because either
        // alone is inert: a register cannot floor on a value nothing stamps, and a
        // stamp nothing reads sizes nothing. The resolved pixels — three distinct
        // block-sizes at three `rows` values — are P7's, with the π seat.
        expect(register).toMatch(
            /min-block-size:\s*calc\(\s*var\(--field-rows,\s*2\)\s*\*\s*1lh/,
        );
        expect(read("src/components/textarea/Textarea.vue")).toContain(
            '"--field-rows":',
        );

        // The rim is declared exactly once, in the register that owns it, and the
        // field never re-declares `box-shadow` at any specificity.
        expect((edge.match(/box-shadow:/g) ?? []).length).toBe(1);
        expect(register).not.toMatch(/box-shadow:/);

        // …and that ONE declaration still ends in BOTH consumer slots. Counting
        // `box-shadow:` occurrences cannot see a deleted leg — the count is 1
        // either way — so the legs are asserted inside the list itself. Without
        // them C-7's append law has nothing to append THROUGH and every consumer
        // is back to re-listing the rim, which is the failure this row cured.
        const rim = edge.match(/box-shadow:\s*([^;}]+)/);
        expect(rim).not.toBeNull();
        expect(rim?.[1]).toContain("var(--control-edge-inner");
        expect(rim?.[1]).toContain("var(--control-edge-ring");

        // [2026-08-09 · BK #66 CLOSE · RT-18A] ~~The law is only a law if it holds on
        // every shell that composes the register. TagsInput re-declared the WHOLE list
        // at invalid and focus…~~ — STRUCK WITH ITS SUBJECT. The exemplar that carried
        // this half of the arm (`tags-input/styles.css`) is deleted. The law itself is
        // unmoved and is still proved above on `control-edge.css`, the register every
        // surviving shell composes; the three shells in `SHELLS` are asserted whole.

        // The misfiled 217-line sheet is gone from the field folder, and the
        // relocated register is imported once from the glass root.
        expect(() => read("src/components/_shared/field/field-surfaces.css")).toThrow();
        expect(read("src/styles/glass.css")).toContain(
            '@import "./glass/control-edge.css";',
        );
        expect(read("src/styles/index.css")).not.toMatch(
            /@import\s+"[^"]*field-surfaces\.css"/,
        );

        // ARIA validity/requirement live on the spinbutton, never on the role-less
        // root div.
        const wrapper = mount({
            components: { NumberField, NumberFieldInput },
            template: `
                <NumberField invalid required>
                    <NumberFieldInput />
                </NumberField>
            `,
        });
        const root = wrapper.get('[data-slot="number-field"]');
        expect(root.attributes("aria-invalid")).toBeUndefined();
        expect(root.attributes("aria-required")).toBeUndefined();
        const spin = wrapper.get('[role="spinbutton"]');
        expect(spin.attributes("aria-invalid")).toBe("true");
        expect(spin.attributes("aria-required")).toBe("true");

        // The vacuous wrapper node is gone: the root IS the grid.
        expect(strip(read(NF_SHEET))).not.toContain("number-field__content");
        expect(strip(read(NF_SHEET))).toMatch(
            /\.number-field\s*\{[^}]*grid-template-columns/,
        );

        // Textarea's growth is not a prop and `content` is not a resize member.
        expect(read("src/components/textarea/types.ts")).toMatch(
            /export type TextareaResize =\s*"vertical" \| "horizontal" \| "both" \| "none";/,
        );
        expect(read("src/components/textarea/Textarea.vue")).not.toContain("autosize");

        // Live: the shells render the register, and only it.
        expect(mount(Input).classes()).toEqual([
            "field-control",
            "glass-control-edge",
        ]);
        expect(mount(Textarea).classes()).toEqual([
            "field-control",
            "glass-control-edge",
        ]);
    });
});
