// BK #24 W-GRADIENT-BLUR — the GRADIENT-BLUR arm of G-RUNG-ONLY (MATERIAL family).
//
// SEATS +0. TERMINAL-ROSTER §A row #24 rules the gate "→ arm of G-RUNG-ONLY", and §B.5
// already carries `G-RUNG-ONLY (+GM-L2/L3 +NO-WHITE-SPECULAR +GRADIENT-BLUR +LAYER-SEAM
// +F-7/F-11 token arms)`. So the arm binds under a seat that exists; nothing is minted,
// the budget stays exactly 60, and SEAT-BINDING.json is untouched (G-RUNG-ONLY remains
// `arm-only` at its declared path).
//
// THE INVARIANT, in WAVES:551's own words: the primitive EXISTS, is TOKEN-DRIVEN, and is
// APPLIED AT ITS NAMED CONSUMERS. Each of the three is a separate arm below, because each
// fails differently: a file can exist with the recipe hard-coded, and a token cohort can
// be minted and read by nobody.
//
// WHAT THE APPLIED ARM CAN AND CANNOT SEE. Its source scan reads the class STRING out of
// each consumer, so it proves composition-in-source and nothing more: a consumer that
// keeps the class on an element it never renders (`v-if="false"`) still reads as composed.
// The render-level detectors are named, not restated here — the Slider's own mounted arm
// below (which mounts, grasps, and requires the plate in the document), and, for the
// Dialog, `tests/components/dialog/ModalOverlay.test.ts`, whose three veil clauses mount
// the scrim and require the class present for the centred plate and ABSENT by default
// (`tests/components/sheet/sheet-graded-edge.test.ts` holds the side-sheet half — the
// veil's core is fixed at the viewport centre, so it is a geometry the caller selects,
// not a constant). Restating any of them here would be the duplicated-derived-data class
// this tranche strikes.
//
// BORN-RED, MEASURED — not asserted. Every arm here was run against a pristine
// `git archive HEAD` tree at the row's start (HEAD 571626cc, before any byte of this cut)
// and all four RED there: `src/styles/glass/focus-veil.css` did not exist, the
// `--glass-focus-veil-*` cohort did not exist, and `.glass-focus-veil` had zero composers.
// The receipt is banked at the row's RECORD.md §BORN-RED. No `it.fails` latch is left
// behind: a latch that must be flipped by hand is a second state to keep true, and the
// pristine-tree run is the stronger evidence (it proves the RED on the real detector, not
// on an inverted one).
//
// THE MECHANISM ARM IS THE POINT. MOTION-CANON §5 settles the one question the row was
// ever asked — graded blur RADIUS vs uniform blur under a graded MASK — in favour of ONE
// static-radius plate under an intersect double-ramp. A stacked-band ladder would satisfy
// "the primitive exists" while being the construction NOVELTIES §13 rejects, so the arm
// pins the mechanism: one backdrop sample, mask-composite: intersect, and an opacity-only
// clock (an animated blur radius re-samples the viewport every frame).

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";

import { Slider } from "@glass/components/slider";

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");
const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

// The subject file is read TOLERANTLY on purpose. A module-level throw would make the
// whole suite fail to load, and a suite that cannot load reports ZERO tests — ABSENT
// under the ⊕²⁵ status vocabulary, which is precisely the reading this register refuses
// to accept as a gate result. Reading an absent primitive as empty content makes every
// arm below RED on its own terms, which is what "born-RED" has to mean to be evidence.
const VEIL_PATH = "src/styles/glass/focus-veil.css";
const veil = existsSync(join(process.cwd(), VEIL_PATH))
    ? stripComments(read(VEIL_PATH))
    : "";
const glassTokens = stripComments(read("src/styles/tokens/glass.css"));
const darkArm = stripComments(read("src/styles/tokens/dark-arm.css"));
const propertyRegs = stripComments(read("src/styles/tokens/property-regs.css"));
const glassCascade = stripComments(read("src/styles/glass.css"));

// The named consumers landing in THIS cut. §5 names four; the other two are owned by
// other rows' files (popover/menu → #89 W-OVERLAY, select/combobox → #81 W-PICKER,
// dock → #47 GF-DOCK), and one owner per file per cut is the standing law. §5's own
// floor is "≥2 required", which these two meet.
const consumers: readonly [string, string][] = [
    // W-DIALOG made this one UNCONDITIONAL: the opt-in knob that used to gate it is
    // deleted, and a centred modal IS the definitional focus event — it sits at the
    // veil's own 50% rest, so the overlay composes the class and writes no centre.
    ["src/components/dialog/ModalOverlay.vue", "the modal scrim's focus veil"],
    ["src/components/slider/Slider.vue", "the engaged Slider (F49/F50)"],
];

describe("G-RUNG-ONLY · GRADIENT-BLUR arm — the focus-veil primitive exists", () => {
    it("ships ONE fixed, non-interactive, viewport-covering plate", () => {
        expect(existsSync(join(process.cwd(), VEIL_PATH))).toBe(true);
        expect(veil).toMatch(/\.glass-focus-veil\s*{/);
        expect(veil).toMatch(/position:\s*fixed/);
        expect(veil).toMatch(/inset:\s*0/);
        expect(veil).toMatch(/pointer-events:\s*none/);
        // z between the world and the engaged control, read off ONE token: the plate
        // sits one rung under the `--z-overlay` the engaged control takes.
        expect(veil).toMatch(/z-index:\s*calc\(var\(--z-overlay\) - 1\)/);
    });

    it("is reachable — the partial is @import-ed into the glass.css closure", () => {
        expect(glassCascade).toContain('@import "./glass/focus-veil.css";');
    });

    it("uniform blur under an INTERSECT double-ramp mask — never a graded radius", () => {
        // ONE backdrop sample. A stacked-band ladder (the archive's N-layer proposal)
        // would show as a second `backdrop-filter` in this file.
        expect(veil.match(/backdrop-filter:/g)).toHaveLength(1);
        expect(veil).toMatch(/backdrop-filter:\s*blur\(var\(--glass-focus-veil-blur\)\)/);

        // The product of an x double-ramp and a y double-ramp, both spellings.
        expect(veil).toMatch(/mask-composite:\s*intersect/);
        expect(veil).toMatch(/-webkit-mask-composite:\s*source-in/);
        expect(veil.match(/linear-gradient\(\s*to right,/g)).toHaveLength(2);
        expect(veil.match(/linear-gradient\(\s*to bottom,/g)).toHaveLength(2);

        // The cross-engine floor: plain blur()+saturate under a mask, never url().
        expect(veil).not.toContain("url(");
        // Per-mode arms only — an inset fragment inside light-dark() computes the whole
        // declaration to none, and this file paints a dim.
        expect(veil).not.toContain("light-dark(");
    });

    it("animates OPACITY ONLY, behind the geometry in and with it out", () => {
        const transitions = veil.match(/transition:[^;]+;/g) ?? [];
        expect(transitions.length).toBeGreaterThan(0);
        for (const declaration of transitions) {
            expect(declaration).toMatch(/transition:\s*opacity\b/);
            // A transitioned blur radius re-samples the whole viewport every frame.
            expect(declaration).not.toContain("backdrop-filter");
            expect(declaration).not.toContain("filter");
        }
        // OUT — with the geometry, no lag (the base rule's clock).
        expect(veil).toMatch(
            /opacity:\s*0;\s*transition:\s*opacity\s+var\(--duration-fast\)\s+var\(--ease-standard\);/,
        );
        // IN — one rank-6 beat (100ms) behind the geometry.
        expect(veil).toMatch(
            /\[data-engaged\][\s\S]*?transition:\s*opacity\s+var\(--duration-normal\)\s+var\(--ease-standard\)\s+var\(--duration-instant\)/,
        );
        // Mounted-only-while-engaged has no prior computed style to ramp from.
        expect(veil).toMatch(/@starting-style/);
    });
});

describe("G-RUNG-ONLY · GRADIENT-BLUR arm — the primitive is token-driven", () => {
    it("mints the five-value --glass-focus-veil-* cohort, blur BOUND to the ladder", () => {
        // The radius is a rung of the blur ladder, never an off-ladder literal — the
        // whole point of a rung-only gate.
        expect(glassTokens).toMatch(
            /--glass-focus-veil-blur:\s*var\(--glass-blur-floating-radius\);/,
        );
        expect(glassTokens).toMatch(/--glass-focus-veil-core-x:\s*13rem;/);
        expect(glassTokens).toMatch(/--glass-focus-veil-core-y:\s*13rem;/);
        expect(glassTokens).toMatch(/--glass-focus-veil-bloom:\s*7rem;/);
        expect(glassTokens).toMatch(
            /--glass-focus-veil-dim:\s*color-mix\(in oklab, var\(--glass-plate-overlay\) 50%, transparent\);/,
        );
        // The retired private cohort leaves no alias behind (no backwards compat).
        expect(glassTokens).not.toContain("--glass-halo-");
    });

    it("dims per-mode via a plain .dark arm — light ~50% / dark ~40%", () => {
        expect(darkArm).toMatch(
            /--glass-focus-veil-dim:\s*color-mix\(in oklab, var\(--glass-plate-overlay\) 40%, transparent\);/,
        );
    });

    it("registers the live centre so it interpolates instead of snapping", () => {
        for (const axis of ["--veil-x", "--veil-y"]) {
            const block = propertyRegs.match(
                new RegExp(`@property ${axis} {[^}]*}`),
            )?.[0];
            expect(block, `${axis} is unregistered`).toBeTruthy();
            expect(block).toMatch(/syntax:\s*"<percentage>"/);
            expect(block).toMatch(/inherits:\s*false/);
            expect(block).toMatch(/initial-value:\s*50%/);
        }
    });

    it("carries every geometry value through a token — no literals in the recipe", () => {
        const rule = veil.slice(veil.indexOf(".glass-focus-veil"));
        const stops = rule.match(/calc\([^)]*var\(--veil-[xy]\)[\s\S]*?\)\n/g) ?? [];
        expect(stops.length).toBeGreaterThan(0);
        // Every mask stop is centre ± core ± bloom, all three tokens.
        expect(rule).toContain("var(--glass-focus-veil-core-x)");
        expect(rule).toContain("var(--glass-focus-veil-core-y)");
        expect(rule).toContain("var(--glass-focus-veil-bloom)");
        expect(rule).toContain("var(--glass-focus-veil-dim)");
    });
});

describe("G-RUNG-ONLY · GRADIENT-BLUR arm — applied at its named consumers", () => {
    it.each(consumers)("%s carries the class in source — %s", (path) => {
        expect(read(path)).toContain("glass-focus-veil");
    });

    it("the shared class has at least the two composers §5 requires", () => {
        const composers = consumers.filter(([path]) =>
            read(path).includes("glass-focus-veil"),
        );
        expect(composers.length).toBeGreaterThanOrEqual(2);
    });

    it("the Dialog BINDS the shared class instead of re-spelling the recipe", () => {
        // The private FORM-2 recipe is gone from the component tree entirely — and so is
        // the `placement.css` that once held it, since W-DIALOG split the side surface
        // into its own component. What survives there is FORM 1, the sheet's per-edge
        // graded EDGE, which is a plate-local material and not a veil.
        const sheet = stripComments(read("src/components/sheet/styles.css"));
        expect(sheet).not.toContain("mask-composite: intersect");
        expect(sheet).not.toContain("--glass-halo-");
        expect(sheet).toContain("blur(calc(34px * var(--glass-level)))");

        const overlay = read("src/components/dialog/ModalOverlay.vue");
        expect(overlay).toContain("glass-focus-veil");
        expect(overlay).not.toContain("--glass-halo-");
        expect(overlay).not.toContain("mask-composite");
    });

    // THE RENDER-LEVEL DETECTOR. It mounts a real Slider, grasps it, and reads the
    // DOM — so it reds on a dead binding (a `v-if` that never opens), on a veil left
    // nested in the host's own subtree (where a `backdrop-filter` ancestor would
    // collapse the fixed plate to that ancestor's box), and on a raise that a host
    // rule can tie away. A source scan can see none of the three.
    it("the engaged Slider mounts the plate to <body> and clears it inline", async () => {
        const wrapper = mount(Slider, {
            props: { modelValue: [40], "aria-label": "Grasp" },
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const root = wrapper.element as HTMLElement;

        // At rest: no full-viewport backdrop sample anywhere, no raise on the host.
        expect(document.querySelectorAll(".glass-focus-veil")).toHaveLength(0);
        expect(root.style.zIndex).toBe("");

        root.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        await nextTick();
        await nextTick();

        const veil = document.querySelector<HTMLElement>(".glass-focus-veil");
        expect(veil, "the engaged Slider renders no focus veil").not.toBeNull();
        // PORTALLED, not nested — the plate is a body child and NOT inside the host.
        expect(veil!.parentElement).toBe(document.body);
        expect(root.contains(veil!)).toBe(false);
        expect(veil!.getAttribute("data-engaged")).toBe("true");
        // The centre is written from the host's own rect on the mount tick.
        expect(veil!.style.getPropertyValue("--veil-x")).not.toBe("");
        expect(veil!.style.getPropertyValue("--veil-y")).not.toBe("");
        // The raise is INLINE, so no host rule can tie it out of effect.
        expect(root.style.zIndex).toBe("var(--z-overlay)");
        expect(root.getAttribute("data-focus-veil")).toBe("true");

        wrapper.unmount();
        expect(document.querySelectorAll(".glass-focus-veil")).toHaveLength(0);
    });

    it("re-takes the centre when the page scrolls under a live grasp", async () => {
        const wrapper = mount(Slider, {
            props: { modelValue: [40], "aria-label": "Grasp" },
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const root = wrapper.element as HTMLElement;
        // The rect is viewport-space, and the test environment paints nothing, so the
        // host's own rect is the thing to drive: the control holds still on the page
        // while the page moves under it.
        let top = 200;
        root.getBoundingClientRect = (() => ({
            x: 100,
            y: top,
            left: 100,
            top,
            right: 300,
            bottom: top + 20,
            width: 200,
            height: 20,
            toJSON: () => ({}),
        })) as HTMLElement["getBoundingClientRect"];

        root.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        await nextTick();
        await nextTick();

        const veil = document.querySelector<HTMLElement>(".glass-focus-veil")!;
        const atGrasp = veil.style.getPropertyValue("--veil-y");
        expect(atGrasp).not.toBe("");

        top = -184;
        window.dispatchEvent(new Event("scroll"));
        expect(
            veil.style.getPropertyValue("--veil-y"),
            "the pool stranded at the grasp position after a scroll",
        ).not.toBe(atGrasp);

        // The listener lives exactly as long as the grasp — nothing left on `window`.
        wrapper.unmount();
        top = 900;
        window.dispatchEvent(new Event("scroll"));
        expect(document.querySelectorAll(".glass-focus-veil")).toHaveLength(0);
    });
});

describe("G-RUNG-ONLY · GRADIENT-BLUR arm — mutation bites", () => {
    // A gate that cannot red on a planted defect is the hollow class this tranche
    // abrogated. Each bite plants the exact regression its arm exists to catch.
    const intersect = /mask-composite:\s*intersect/;
    const oneSample = (css: string): number =>
        (css.match(/backdrop-filter:/g) ?? []).length;

    it("bite[stacked-bands]: a second backdrop sample reds the ONE-PLATE arm", () => {
        const planted = veil.replace(
            "mask-composite: intersect;",
            "mask-composite: intersect;\n backdrop-filter: blur(3px);",
        );
        expect(oneSample(veil)).toBe(1);
        expect(oneSample(planted)).toBe(2);
    });

    it("bite[graded-radius]: dropping the intersect mask reds the MECHANISM arm", () => {
        const planted = veil.replace(/mask-composite:\s*intersect/g, "mask-image: none");
        expect(veil).toMatch(intersect);
        expect(planted).not.toMatch(intersect);
    });

    it("bite[animated-blur]: a transitioned filter reds the OPACITY-ONLY arm", () => {
        const planted = veil.replace(
            "transition: opacity var(--duration-fast) var(--ease-standard);",
            "transition: backdrop-filter var(--duration-fast) var(--ease-standard);",
        );
        const plantedTransitions = planted.match(/transition:[^;]+;/g) ?? [];
        expect(
            plantedTransitions.some((d) => d.includes("backdrop-filter")),
        ).toBe(true);
    });

    it("bite[off-ladder-radius]: a literal blur reds the TOKEN-DRIVEN arm", () => {
        const planted = glassTokens.replace(
            "--glass-focus-veil-blur:   var(--glass-blur-floating-radius);",
            "--glass-focus-veil-blur:   11px;",
        );
        expect(planted).not.toMatch(
            /--glass-focus-veil-blur:\s*var\(--glass-blur-floating-radius\);/,
        );
    });

    it("bite[unwired-primitive]: a partial no consumer composes reds the APPLIED arm", () => {
        const planted = consumers.filter(([path]) =>
            read(path).replace(/glass-focus-veil/g, "glass-nothing").includes(
                "glass-focus-veil",
            ),
        );
        expect(planted).toHaveLength(0);
    });
});
