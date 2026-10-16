// authored/p6-test-splits.mjs — AUTHORED input to derive/compose.mjs (step S67; B-S14 and
// B-S16, P5-R3, P5-R5, LAW §9 pass 6). The tests B2 still found reading a unit's inside from a
// consumer zone, cut by what each test reads (B16 names the home of each part):
//   - the part whose subject is one unit (or the kernel container's own files) lives in that
//     unit's __tests__ slot: a colocated test reads its home's subtree, may read the tests
//     zone, and never reads demo;
//   - the part that reads a story, walks a directory, or spans units or kernel modules stays in
//     tests/ beside where it was, and reads published names only.
// Each cut is authored/p6/b2/split.mjs: a part is the original text, byte for byte, plus its
// own imports, and every describe and child of the source lands in exactly one part. Where a
// unit part loses the demo fixture it measured (the Fourier shapes), its claim is re-stated on
// the library's own fixtures, named in the part's edits. The WGSL splice contract's census
// walks src, so it stays in tests/; each module's claims go to the module that assembles it,
// and the resolver to the harness (tests/harness/wgsl.ts), which both read. use-accent-tone
// reads the token files (styles) beside color, so its subject spans two kernel modules: it
// stays in tests/ and reads ./color only.
// Also here: the three page-driving specs P5-R5 homes in one unit, moved by row as *.visual.ts
// (their capture directory one level deeper).
// Pass 7 (P6-R2): the tabs-seam cut no longer widens the motion morph door. The tabs part states
// the eyeglass geometry its sheets are read against (span 1.6, swell 1.22, the annotation delay
// 100 ms), and the arms whose subject is the eyeglass law itself move, verbatim, to
// motion/morph/__tests__/eyeglass.test.ts, which pins the same three numbers on the law.
export const why = "B-S14/B-S16 (P5-R3, P5-R5): tests that read a unit's inside from a consumer zone are cut by what they read; the one-unit part colocates, the part that reads a story, walks a directory or spans units stays in tests/ on published names; the WGSL splice contract splits into a census (tests/), per-module claims (each assembling module) and the resolver (tests/harness); three single-unit page specs move to their unit as *.visual.ts";

const AURORA = "tests/components/custom/aurora/harness.test.ts";
const AURORA_U = "src/components/aurora/__tests__/probe-harness.test.ts";
const AURORA_D = "tests/components/custom/aurora/probe-surface.test.ts";
const HM = "tests/components/custom/handmark/g-hm-mark.test.ts";
const HM_U = "src/components/handmark/__tests__/g-hm-mark.test.ts";
const HM_D = "tests/components/custom/handmark/story-rungs.test.ts";
const EASE = "tests/components/easing/frame.test.ts";
const EASE_U = "src/components/easing/__tests__/frame.test.ts";
const EASE_D = "tests/components/easing/frame-consumers.test.ts";
const FF = "tests/components/fourier-field/field.smoke.test.ts";
const FF_U = "src/components/fourier-field/__tests__/field.test.ts";
const FF_D = "tests/components/fourier-field/shapes-mint.test.ts";
const SEARCH = "tests/composables/search/search-contracts.test.ts";
const SEARCH_U = "src/components/dock/search/__tests__/cache-and-debounce.test.ts";
const SEARCH_D = "tests/composables/search/search-listbox.test.ts";
const WGSL = "tests/components/fourier-field/wgsl-splice-contract.test.ts";
const WGSL_CENSUS = "tests/components/wgsl-splice-census.test.ts";
const WGSL_HARNESS = "tests/harness/wgsl.ts";
const WGSL_FF = "src/components/fourier-field/renderer/__tests__/wgsl-splice.test.ts";
const WGSL_AURORA = "src/components/aurora/runtime/webgpu/__tests__/wgsl-splice.test.ts";
const WGSL_BLOB = "src/components/blob/renderer/webgpu/__tests__/wgsl-splice.test.ts";
const WGSL_CHUNKS = "src/composables/glass/procedural/__tests__/chunk-requirements.test.ts";
const VISUAL = [
    ["tests-visual/components/collections/sortable-list.contract.spec.ts", "src/components/sortable-list/__tests__/sortable-list.contract.visual.ts"],
    ["tests-visual/components/surfaces/esc-stack.spec.ts", "src/components/expandable-container/__tests__/esc-stack.visual.ts"],
    ["tests-visual/components/surfaces/expandable-container.spec.ts", "src/components/expandable-container/__tests__/expandable-container.visual.ts"],
];
const TABS = "src/components/tabs/__tests__/tabs-seam.test.ts";
const TABS_D = "tests/components/custom/tabs/tabs-seam-sheets.test.ts";
const EYEGLASS = "src/composables/motion/morph/__tests__/eyeglass.test.ts";
const AVATAR = "src/components/avatar/__tests__/avatar.contract.test.ts";
const AVATAR_D = "tests/components/avatar-status-slot.test.ts";
const KERNEL_D = "src/components/_shared/__tests__/public-contracts.test-d.ts";
const DARK_D = "src/composables/dark/__tests__/color-schema.test-d.ts";
const ACCENT = "tests/composables/color/use-accent-tone.test.ts";

export const reasons = {
    [AURORA]: "cut: the library half colocates in aurora, the story half (the probe surface) stays here",
    [AURORA_U]: "the drift demand gate, interactivity defaults and the settle beacon read aurora's inside (presets, the runtime contract, a mocked runtime)",
    [AURORA_D]: "the probe surface reads the aurora story (AuroraStage, NucleiOverlay, the story's setup order); it reads the library through ./aurora and ./aurora-config",
    [HM]: "cut: the mark's geometry arms colocate in handmark, the story's rung count stays here",
    [HM_U]: "the mark's arms read handmark's stroke law and its emitted geometry",
    [HM_D]: "the route half of the ratio arm reads the handmark story's text",
    [EASE]: "cut: the frame, touch and split arms colocate in easing; the two that read the curve-gallery story or walk src and demo stay here",
    [EASE_U]: "the frame, touch and split arms read easing's constants and its sources",
    [EASE_D]: "the consumer halves: the gallery route mounts one picker, and no file in src or demo names the deleted configurator",
    [FF]: "cut: the law across src and demo stays here; the mint's own claims, the rings and the clock colocate in fourier-field; the drawn shapes' claims get their own file",
    [FF_U]: "the mint's reference stage, its paint floor, the rings and the clock read fourier-field's inside; the floor and the rings are re-stated on the library's figures and a seeded elliptic spectrum",
    [FF_D]: "the studio's drawn shapes through the published mint: their term counts of record, amplitude order, at least one term, reference identity and the reach of amplitude order",
    [SEARCH]: "cut: the index cache and the debounce colocate in dock/search; the /data/search listbox stays beside it",
    [SEARCH_U]: "the index cache and the debounce cleanup read dock/search's inside (match, useFuzzySearch)",
    [SEARCH_D]: "the /data/search listbox reads the route's rendered DOM; it reads no library name past an entry",
    [WGSL]: "split: the census walks src (tests/), each module's claims go to the module that assembles it, the resolver to the harness",
    [WGSL_CENSUS]: "§1, the census: every createShaderModule call site in src names a registered module, and each registered module is resolved in its own module's test",
    [WGSL_HARNESS]: "the resolver every splice test reads (the harness is the module that reads the tree, R-3)",
    [WGSL_FF]: "§1-§3 for fourier-field's two modules (renderer/), and the D1 regression by name",
    [WGSL_AURORA]: "§1-§3 for aurora's two WGSL modules (runtime/webgpu/)",
    [WGSL_BLOB]: "§1-§3 for the metaball WGSL module (renderer/webgpu/)",
    [WGSL_CHUNKS]: "§3: the shared chunks' requirements are real (PI), read from the chunks' own text",
    ...Object.fromEntries(VISUAL.flatMap(([f, t]) => [[f, `P5-R5: moves to ${t} (the one story it opens drives one unit)`], [t, "P5-R5: the unit's page-driving spec; its capture directory is one level deeper"]])),
    [TABS]: "cut: the arms that read the tabs unit stay colocated and state the eyeglass geometry they observe (P6-R2: the morph door does not grow for a test); the eyeglass law's own arms move to the module that holds the law; the two arms that walk the styles directory move to tests/",
    [TABS_D]: "arms (b) and (d) walk the tabs styles directory (LAW §9: a walk belongs to the harness); they read no library name",
    [EYEGLASS]: "P6-R2: the eyeglass law's own arms (its span, clamp, swell, origin and cascade algebra, and the numbers the tabs sheets are read against) read motion/morph/eyeglass.ts, so they live in morph's slot and read the law from inside its module",
    [AVATAR]: "cut: the status-slot arm composes StatusDot, a second unit, so it moves to tests/",
    [AVATAR_D]: "the avatar's status slot holds the status-dot unit: two units, read through the root and ./status-dot",
    [KERNEL_D]: "cut: GlobalColorSchema is the dark module's contract, so its parity row moves to composables/dark",
    [DARK_D]: "the dark module's color-schema parity with VueUse's BasicColorSchema",
    [ACCENT]: "its subject spans color and the styles tokens, so it stays in tests/: the isolated load reads the ./color entry, and the solve leaf's shape is stated where it is read",
};

const up = (n) => "../".repeat(n);

// P6-R2: the eyeglass law's arms inside tabs-seam's arm (e), by their exact text. LAW_SPANS are
// the law's half of three mixed `it`s (the overflow licence, the origin algebra, the cascade
// ladder); LAW_ITS are three whole `it`s whose subject is the law alone. Each occurs once in the
// source; the tabs part drops it and eyeglass.test.ts takes it, re-indented one level.
const LAW_SPANS = [
    "            // The licence is DERIVED from the swell, and the two measurements agree:\n            // a symmetric 1.22 swell hangs 11% per side against the seat's own ~10%.\n            expect(EYEGLASS_OVERFLOW_LICENSE).toBeCloseTo(0.11, 5);\n            expect(EYEGLASS_OVERFLOW_LICENSE).toBeGreaterThan(0.09);\n            expect(EYEGLASS_OVERFLOW_LICENSE).toBeLessThan(0.13);\n",
    "            // Scaling by k about f-from-the-leading-edge: leading travels (1−f)(k−1)w,\n            // trailing f(k−1)w. The ratio must be the measured one, exactly.\n            const f = EYEGLASS_ORIGIN_FRACTION;\n            expect((1 - f) / f).toBeCloseTo(EYEGLASS_EDGE_RATIO, 12);\n            expect(eyeglassOriginPercent(1)).toBeCloseTo(100 - f * 100, 12);\n            expect(eyeglassOriginPercent(-1)).toBeCloseTo(f * 100, 12);\n            expect(eyeglassOriginPercent(0)).toBe(50);\n",
    "            // The frame is the unit that reconciles the ladder with the milliseconds\n            // the same seat measured — all three of them, or the unit is wrong.\n            expect(CASCADE_RANK_MS).toBeCloseTo(1000 / 60, 12);\n            expect(cascadeRankMs(CASCADE_RANKS.annotation)).toBeGreaterThanOrEqual(80);\n            expect(cascadeRankMs(CASCADE_RANKS.annotation)).toBeLessThanOrEqual(160);\n            expect(cascadeRankMs(CASCADE_RANKS.content)).toBeCloseTo(250, 0);\n            expect(cascadeRankMs(CASCADE_RANKS.light)).toBeCloseTo(500, 0);\n",
];
const LAW_IT_TITLES = [
    "the span is the UNION of origin and destination",
    "the boundary CLAMPS rather than spanning",
    "the swell is largest at travel extremes",
];
// a whole `it` of arm (e), from its line through its closing line and the blank line after it
let LAW_ITS = [];
const lawSpan = (x) => x.replace(/^ {4}/gm, "");

export function compose({ read, ts, splitTests }) {
    const out = {};
    const cut = (from, parts) => {
        for (const p of splitTests(ts, from, read(from), parts)) out[p.to] = p.text;
        if (!(from in out)) out[from] = null;
    };

    // ---- aurora: the probe harness
    cut(AURORA, [
        {
            to: AURORA_U,
            copy: [
                ["// GF-AURORA W0 — THE PROBE HARNESS", "import { flushPromises"],
                `// The probe surface, the story's half, is ${AURORA_D}.\n\n`,
                `import { flushPromises, mount, shallowMount, type VueWrapper } from "@vue/test-utils";\nimport { afterEach, beforeEach, describe, expect, it, vi } from "vitest";\nimport { read } from "${up(4)}tests/harness/source";\nimport { nextTick } from "vue";\n\nimport type { RendererStatus } from "@glass/index";\n\n`,
                ["// ── THE ARM DOOR", "import AuroraStage from"],
                ["/** The three render loops", null],
                ["// ── THE FRAME CLOCK", 'describe("GF-AURORA W0 · the settle beacon'],
            ],
            describes: { "GF-AURORA W0 · the drift demand gate": "all", "GF-AURORA W0 · aurora interactivity": "all", "GF-AURORA W0 · the settle beacon": "all" },
        },
        {
            to: AURORA_D,
            copy: [
                `// GF-AURORA W0 — the probe surface (BK #49, lane γ unit 2): the aurora story's observers\n// leave the stage under ?probe=1, the forced engine is real, and the forced medium is seated\n// before the config dock seeds its atoms. The library half (the drift demand gate, the\n// interactivity default, the settle beacon) is ${AURORA_U}.\n\n`,
                `import { shallowMount } from "@vue/test-utils";\nimport { describe, expect, it } from "vitest";\nimport { read } from "../../../harness/source";\nimport { Aurora } from "@glass/components/aurora";\nimport { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora/aurora-config";\n\nimport AuroraStage from "../../../../demo/stories/substrates/aurora/AuroraStage.vue";\nimport NucleiOverlay from "../../../../demo/stories/substrates/aurora/NucleiOverlay.vue";\n\n`,
            ],
            describes: { "GF-AURORA W0 · the probe surface": "all" },
        },
    ]);

    // ---- handmark: G-HM-MARK
    cut(HM, [
        {
            to: HM_U,
            copy: [
                ["// G-HM-MARK — one continuous painted stroke", "import { readFileSync }"],
                `// The route half of arm 6 (the story names three rungs) is ${HM_D}.\n\n`,
                `import { mount } from "@vue/test-utils";\nimport { nextTick } from "vue";\nimport { afterEach, describe, expect, it } from "vitest";\nimport { HandMark } from "@glass/components/handmark";\nimport { handLine, minJerk, nib } from "@glass/components/handmark/stroke";\nimport { type Line, installMeasure, restoreMeasure } from "${up(4)}tests/components/custom/handmark/measure-frame";\n\n`,
                ["/** The three on-ladder rungs", "/** The φ multiples"],
                ["afterEach(restoreMeasure);", null],
                ["/**\n * The EMITTED `linear()`", 'describe("G-HM-MARK 7'],
            ],
            describes: Object.fromEntries(["G-HM-MARK 1 ", "G-HM-MARK 2 ", "G-HM-MARK 3 ", "G-HM-MARK 4a ", "G-HM-MARK 5 ", "G-HM-MARK 7 ", "G-HM-MARK 8 "].map((d) => [d, "all"]).concat([["G-HM-MARK 6 ", { except: ["the route carries three rungs"] }]])),
        },
        {
            to: HM_D,
            copy: [
                `// G-HM-MARK 6, the route half: the handmark story names both φ multiples of the one\n// root, so three rungs are on the route the ratio arm runs. The arm itself, and the\n// mark's other seven, are ${HM_U}.\n\n`,
                `import { readFileSync } from "node:fs";\nimport { resolve } from "node:path";\nimport { describe, expect, it } from "vitest";\n\n`,
                ["/** The φ multiples", "afterEach(restoreMeasure);"],
            ],
            describes: { "G-HM-MARK 6 ": { only: ["the route carries three rungs"] } },
        },
    ]);

    // ---- easing: G-E1, G-E3, G-E5, G-E6
    cut(EASE, [
        {
            to: EASE_U,
            copy: [
                ["// G-E1, G-E3, G-E5 and G-E6", "import { mount }"],
                `// The two consumer halves (the gallery route, the configurator's importers) are\n// ${EASE_D}.\n\n`,
                `import { mount } from "@vue/test-utils";\nimport { afterEach, describe, expect, it, vi } from "vitest";\nimport { EasingCurve } from "@glass/components/easing";\nimport {\n    FRAME_MAX,\n    FRAME_MIN,\n    HANDLE_HIT_RADIUS_PX,\n    HANDLE_HIT_RADIUS_TOUCH_PX,\n    STEP_COUNT_MAX,\n    VIEW_BOX,\n} from "@glass/components/easing/constants";\nimport { bezierPresets } from "@mkbabb/value.js/easing";\nimport { files } from "${up(4)}tests/harness/source";\nimport { EASING_DIR, source, LANE_SOURCE, clipboardDescriptor, mountPicker, curve } from "${up(4)}tests/components/easing/picker";\n\n`,
                ["afterEach(() => {", null],
            ],
            describes: { "G-E1 FRAME": "all", "G-E3 VOID+CEL": { except: ["renders exactly one plot"] }, "G-E5 TOUCH": "all", "G-E6 SPLIT": { except: ["leaves no configurator"] } },
        },
        {
            to: EASE_D,
            copy: [
                `// G-E3 and G-E6, the consumer halves: the curve-gallery route mounts one picker, and no\n// file in src/ or demo/ names the deleted configurator. The unit halves are\n// ${EASE_U}; the mount helpers are in ./picker.ts.\n\n`,
                `import { afterEach, describe, expect, it, vi } from "vitest";\nimport { files, read } from "../../harness/source";\nimport { EASING_DIR, source, clipboardDescriptor, mountPicker } from "./picker";\n\n`,
                ["/** The files of a zone", null],
            ],
            describes: { "G-E3 VOID+CEL": { only: ["renders exactly one plot"] }, "G-E6 SPLIT": { only: ["leaves no configurator"] } },
        },
    ]);

    // ---- fourier-field: the close battery
    cut(FF, [
        {
            to: FF,
            copy: [
                ["// The fourier-field close battery.", "// fourier-field: one renderer and no ceiling"],
                `// fourier-field: one renderer and no ceiling, across src and demo (this file reads text
// only). The mint's own claims, the rings and the clock are ${FF_U};
// the studio's drawn shapes are ${FF_D}.\n\n`,
                `import { describe, expect, it } from "vitest";\nimport { files, read } from "../../harness/source";\n\n`,
                ["// F-1's file set", "const shape = "],
            ],
            describes: { "fourier-field — ONE LAW": "all" },
        },
        {
            to: FF_U,
            copy: [
                `// fourier-field's own claims: the mint's reference stage and paint floor, the rings (drawn\n// only when they read as rings) and the clock (the head never runs backward; one gesture is\n// one impulse). The law across src and demo is ${FF};\n// the studio's drawn shapes are ${FF_D}.\n\n`,
                `import { describe, expect, it } from "vitest";\nimport { read } from "${up(4)}tests/harness/source";\nimport { mulberry32 } from "@glass/composables/glass";\nimport { FOURIER_FIGURES, makeEllipticSpectrum, makeHarmonicFigure } from "../math";\nimport { mintSpectrum, type MintedSpectrum } from "@glass/components/fourier-field";\nimport { FOURIER_REFERENCE_DIAGONAL_PX, FOURIER_PAINT_FLOOR_PX, ringsAt } from "@glass/components/fourier-field/renderer/mint";\nimport { createFourierClock, FOURIER_SETTLE_ZETA_FLOOR, FOURIER_TRAVEL_SPRING } from "@glass/components/fourier-field/clock";\n\n`,
                ["const figure = ", "// ── local helpers"],
                "// The mint's own fixtures: the library's harmonic figures and a seeded elliptic spectrum\n// at full richness, rich enough that a small stage sheds rings.\nconst rich = (): MintedSpectrum => mintSpectrum(makeEllipticSpectrum(mulberry32(7), 1));\nconst fixtures = (): MintedSpectrum[] => [\n    ...(Object.keys(FOURIER_FIGURES) as (keyof typeof FOURIER_FIGURES)[]).map(figure),\n    rich(),\n];\n\n",
            ],
            describes: {
                "fourier-field — THE MINT": { only: ["states its own reference stage", "keeps every emitted term above the paint floor"] },
                "fourier-field — THE RINGS": "all",
                "fourier-field — THE CLOCK": "all",
            },
            edits: [
                { from: `        for (const key of ["f-mark", "heart", "star"]) {\n            const m = shape(key);\n            const pxPerModel`, to: `        for (const m of fixtures()) {\n            const pxPerModel` },
                { from: `const m = shape("f-mark");`, to: `const m = rich();`, all: true },
                { from: `        expect(m.terms.length).toBe(61);`, to: `        expect(m.terms.length).toBe(rich().terms.length);` },
            ],
        },
        {
            to: FF_D,
            copy: [
                `// The Fourier studio's drawn shapes through the published mint: the term counts of\n// record at the reference stage, amplitude order with the DC term hoisted, at least one\n// term, reference identity, and the reach of amplitude order. The mint's own claims (its\n// reference stage, the paint floor, the rings, the clock) are\n// ${FF_U}.\n\n`,
                `import { describe, expect, it } from "vitest";\nimport { FOURIER_FIGURES, makeHarmonicFigure } from "@mkbabb/glass-ui/fourier-math";\nimport { mintSpectrum, type MintedSpectrum } from "@glass/components/fourier-field";\nimport { FOURIER_SHAPES } from "../../../demo/stories/substrates/fourier-field/fourier-paths";\n\n`,
                ["const shape = ", "// ── local helpers"],
                ["// ── local helpers", null],
            ],
            describes: { "fourier-field — THE MINT": { except: ["states its own reference stage", "keeps every emitted term above the paint floor"] } },
        },
    ]);

    // ---- search: the index, the debounce, the /data/search listbox
    cut(SEARCH, [
        {
            to: SEARCH_U,
            copy: [
                `import { nextTick, ref } from "vue";\nimport { afterEach, describe, expect, it, vi } from "vitest";\nimport { buildIndex, clearSearchCache, searchIndex } from "../match";\nimport { useFuzzySearch } from "../useFuzzySearch";\nimport type { SearchableItem } from "../types";\nimport { mountComposable } from "${up(5)}tests/harness/mountComposable";\n\n`,
                ["// The `FuzzySearch.vue` overlay component retired", null],
                `// The /data/search listbox (the route's rendered combobox) is ${SEARCH_D}.\n\n`,
            ],
            describes: { "fuzzy search index caching": "all", "useFuzzySearch debounce cleanup": "all" },
        },
        {
            to: SEARCH_D,
            copy: [
                `import { nextTick } from "vue";\nimport { mount } from "@vue/test-utils";\nimport { createMemoryHistory, createRouter } from "vue-router";\nimport { afterEach, describe, expect, it } from "vitest";\nimport SearchRoute from "../../../demo/stories/data/search.vue";\n\n// The engine's index cache is scoped to the index instance (${SEARCH_U}\n// pins that), and each mount below builds its own route and index.\n\n`,
            ],
            describes: { "/data/search — the listbox": "all" },
            edits: [{ from: `        while (mountedRoutes.length) mountedRoutes.pop()?.unmount();\n        clearSearchCache();\n`, to: `        while (mountedRoutes.length) mountedRoutes.pop()?.unmount();\n` }],
        },
    ]);

    // ---- tabs: G-TABS-SEAM
    const tabsSrc = read(TABS);
    const once = (x) => { const i = tabsSrc.indexOf(x); if (i < 0 || tabsSrc.indexOf(x, i + 1) >= 0) throw new Error(`tabs-seam: ${JSON.stringify(x.slice(0, 60))} does not occur once`); return i; };
    for (const x of LAW_SPANS) once(x);
    LAW_ITS = LAW_IT_TITLES.map((t) => {
        const a = once(`        it("${t}`);
        const end = "\n        });\n\n";
        const b = tabsSrc.indexOf(end, a);
        if (b < 0) throw new Error(`tabs-seam: the it ${t} has no end`);
        return tabsSrc.slice(a, b + end.length - 1);
    });
    cut(TABS, [
        {
            to: TABS,
            copy: [
                ["// BK #32 W-TABS", "import { describe"],
                `// Arms (b) and (d) walk the tabs styles directory, so they are ${TABS_D}.\n\n`,
                `import { describe, it, expect } from "vitest";\nimport { read } from "${up(4)}tests/harness/source";\nimport { mount } from "@vue/test-utils";\nimport { nextTick } from "vue";\nimport { SegmentedTabs } from "../index";\n\n// The eyeglass geometry the tabs sheets are read against, stated as this test observes it.\n// The law's own arms pin the same three numbers on motion/morph/eyeglass.ts:\n// ${EYEGLASS}.\nconst SPAN_CEILING = 1.6;\nconst SWELL_CEILING = 1.22;\n/** The annotation rank's delay: 6 frames at 60 Hz. */\nconst ANNOTATION_DELAY_MS = 100;\n\n`,
                ["const SEGMENTED =", "const styleSheets"],
                ["const OPTIONS = [", null],
            ],
            describes: { "gate:G-TABS-SEAM": { except: ["G-TABS-SEAM arm (b)", "G-TABS-SEAM arm (d)"] } },
            edits: [
                { from: `it("the declared ceiling IS the measured one — no second authority"`, to: `it("the declared ceilings are the eyeglass law's: span 1.6, swell 1.22"` },
                { from: `it("the track may not clip the organ — the swell's own overflow licence"`, to: `it("the track may not clip the organ"` },
                { from: `it("the 2:1 lead falls out of ONE transform-origin, and the algebra closes"`, to: `it("the 2:1 lead falls out of ONE transform-origin"` },
                { from: `it("the cascade delay is DERIVED from the rank ladder, not remembered"`, to: `it("the cascade delay is the annotation rank's, 100 ms"` },
                { from: "expect(Number(declared![1])).toBe(EYEGLASS_SPAN_MAX);", to: "expect(Number(declared![1])).toBe(SPAN_CEILING);" },
                { from: "expect(Number(clamp![1])).toBe(EYEGLASS_SWELL_MAX);", to: "expect(Number(clamp![1])).toBe(SWELL_CEILING);" },
                ...LAW_SPANS.map((x) => ({ from: x, to: "" })),
                ...LAW_ITS.map((x) => ({ from: `${x}\n`, to: "" })),
                { from: "            expect(Number(declared![1])).toBe(\n                Math.round(cascadeRankMs(CASCADE_RANKS.annotation)),\n            );\n", to: "            expect(Number(declared![1])).toBe(ANNOTATION_DELAY_MS);\n" },
            ],
        },
        {
            to: TABS_D,
            copy: [
                `// G-TABS-SEAM arms (b) and (d), the sheets' side: no styles partial keys an ARIA attribute\n// as a state selector, and no anchor-positioning engine survives in the tabs sheets. Both\n// walk the styles directory, and both strip comments first (the seat's account is\n// ${TABS}).\n\n`,
                `import { describe, expect, it } from "vitest";\nimport { files, read } from "../../../harness/source";\n\n`,
                ["const TABS_STYLES =", "const OPTIONS = ["],
            ],
            describes: { "gate:G-TABS-SEAM": { only: ["G-TABS-SEAM arm (b)", "G-TABS-SEAM arm (d)"] } },
        },
    ]);
    // the eyeglass law's own arms (P6-R2): whole `it`s verbatim, and the law's half of three
    // mixed ones, re-indented one level (arm (e) is a nested describe)
    out[EYEGLASS] = [
        "// The eyeglass law's own arms (BK #32 W-TABS, G-TABS-SEAM arm (e)). The tabs sheets are read\n",
        `// against this law in ${TABS},\n`,
        "// which states the three numbers the first arm pins here; the span, clamp, swell, origin and\n",
        "// cascade algebra are the law's alone.\n\n",
        'import { describe, it, expect } from "vitest";\n',
        "import {\n    EYEGLASS_SPAN_MAX,\n    EYEGLASS_SWELL_MAX,\n    EYEGLASS_EDGE_RATIO,\n    EYEGLASS_ORIGIN_FRACTION,\n    EYEGLASS_OVERFLOW_LICENSE,\n    CASCADE_RANKS,\n    CASCADE_RANK_MS,\n    cascadeRankMs,\n    eyeglassSpan,\n    eyeglassSwell,\n    eyeglassOriginPercent,\n} from \"../eyeglass\";\n\n",
        'describe("the eyeglass law (G-TABS-SEAM arm (e))", () => {\n',
        '    it("the ceilings and the annotation delay the tabs sheets declare are the law\'s", () => {\n',
        "        expect(EYEGLASS_SPAN_MAX).toBe(1.6);\n        expect(EYEGLASS_SWELL_MAX).toBe(1.22);\n        expect(Math.round(cascadeRankMs(CASCADE_RANKS.annotation))).toBe(100);\n    });\n\n",
        '    it("the swell\'s own overflow licence", () => {\n', lawSpan(LAW_SPANS[0]), "    });\n\n",
        '    it("the 2:1 lead\'s algebra closes", () => {\n', lawSpan(LAW_SPANS[1]), "    });\n\n",
        ...LAW_ITS.map((x) => `${lawSpan(x)}\n`),
        '    it("the cascade ladder\'s frame unit reconciles the measured milliseconds", () => {\n', lawSpan(LAW_SPANS[2]), "    });\n",
        "});\n",
    ].join("");

    // ---- avatar: the status slot composes a second unit
    cut(AVATAR, [
        {
            to: AVATAR,
            copy: [
                `import { flushPromises, mount } from "@vue/test-utils";\nimport { h } from "vue";\nimport { describe, expect, expectTypeOf, it, vi } from "vitest";\n\nimport * as AvatarSurface from "@glass/components/avatar";\nimport {\n    Avatar,\n    AvatarFallback,\n    AvatarImage,\n    type AvatarProps,\n} from "@glass/components/avatar";\n\n// The status slot holding a StatusDot (a second unit) is ${AVATAR_D}.\n\n`,
                ["type ImageProps =", null],
            ],
            describes: { Avatar: { except: ["positions the existing semantic status owner"] } },
        },
        {
            to: AVATAR_D,
            copy: [
                `// The avatar's status slot holds the existing semantic status owner (StatusDot) beside\n// the image identity. The avatar's own contract is ${AVATAR}.\nimport { mount } from "@vue/test-utils";\nimport { h } from "vue";\nimport { describe, expect, it } from "vitest";\n\nimport { Avatar, AvatarFallback } from "@glass/index";\nimport { StatusDot } from "@glass/components/status-dot";\n\n`,
            ],
            describes: { Avatar: { only: ["positions the existing semantic status owner"] } },
        },
    ]);

    // ---- the kernel container's type contracts: the dark row is the dark module's
    {
        const t = read(KERNEL_D);
        const edits = [
            [`import type { BasicColorSchema } from "@vueuse/core";\n`, ``],
            [`import type { GlobalColorSchema } from "@glass/composables/dark";\n`, ``],
            [`type DarkContract = Assert<Equivalent<GlobalColorSchema, BasicColorSchema>>;\n\n`, ``],
            [`    DarkContract,\n`, ``],
        ];
        let next = t;
        for (const [a, b] of edits) { if (next.split(a).length !== 2) throw new Error(`${KERNEL_D}: ${a}`); next = next.replace(a, b); }
        out[KERNEL_D] = next;
        out[DARK_D] = `// The dark module's color-schema contract: GlobalColorSchema is VueUse's BasicColorSchema,
// both ways (the kernel container's own parity rows are
// src/components/_shared/__tests__/public-contracts.test-d.ts).
import type { BasicColorSchema } from "@vueuse/core";
import type { GlobalColorSchema } from "@glass/composables/dark";

type Assignable<From, To> = [From] extends [To] ? true : false;
type Equivalent<Left, Right> =
    Assignable<Left, Right> extends true ? Assignable<Right, Left> : false;
type Assert<Condition extends true> = Condition;

export type DarkContract = Assert<Equivalent<GlobalColorSchema, BasicColorSchema>>;
`;
    }

    // ---- use-accent-tone: stays in tests/, on the ./color entry
    {
        const t = read(ACCENT);
        const edits = [
            [`import { useAccentTone } from "@glass/composables/color";\n`, `import { useAccentTone, type UseAccentToneOptions } from "@glass/composables/color";\n`],
            [`            const { useAccentTone: isolatedUseAccentTone } = await import(\n                "@glass/composables/color/useAccentTone"\n            );`, `            const { useAccentTone: isolatedUseAccentTone } = await import("@glass/composables/color");`],
            [`            const { useAccentTone: isolatedUseAccentTone } = await import("@glass/composables/color/useAccentTone");`, `            const { useAccentTone: isolatedUseAccentTone } = await import("@glass/composables/color");`],
            [`async function settledInk(`, `/** The solve leaf's one export, as the tests below call it (the leaf is not published). */\ntype SolveLeaf = { solveAccentInk: (toneCss: string, opts?: UseAccentToneOptions) => string };\n\nasync function settledInk(`],
        ];
        let next = t;
        for (const [a, b] of edits) { if (next.split(a).length !== 2) throw new Error(`${ACCENT}: ${a.slice(0, 60)}`); next = next.replace(a, b); }
        const leafType = `await vi.importActual<\n            typeof import("@glass/composables/color/accent-tone-solve")\n        >("@glass/composables/color/accent-tone-solve")`;
        if (next.split(leafType).length !== 3) throw new Error(`${ACCENT}: the two importActual sites`);
        out[ACCENT] = next.split(leafType).join(`await vi.importActual<SolveLeaf>("@glass/composables/color/accent-tone-solve")`);
    }

    // ---- the WGSL splice contract
    const w = read(WGSL);
    const span = (a, b) => { const i = w.indexOf(a), j = b === null ? w.length : w.indexOf(b); if (i < 0 || j < 0 || w.indexOf(a, i + 1) >= 0 || j <= i) throw new Error(`wgsl span ${a.slice(0, 40)}`); return w.slice(i, j); };
    const resolver = span("/** WGSL comments carry prose", "/** The whole `createShaderModule");
    const sites = span("/** The whole `createShaderModule", 'describe("WGSL splice contract — §1');
    const exported = (t) => t
        .replace("function stripComments(", "export function stripComments(")
        .replace("const UPPER =", "export const UPPER =")
        .replace("const DECLARES =", "export const DECLARES =")
        .replace("const declared =", "export const declared =")
        .replace("const referenced =", "export const referenced =")
        .replace("function requirements(", "export function requirements(")
        .replace("const CALL_SITE =", "export const CALL_SITE =")
        .replace("const CODE_PROP =", "export const CODE_PROP =")
        .replace("const LABEL_PROP =", "export const LABEL_PROP =");
    out[WGSL] = null;
    out[WGSL_HARNESS] = `// The WGSL splice resolver: the house shader idiom is textual (a primary interpolates its
// chunks at module load), so no compiler stands between the splice and
// \`device.createShaderModule\`. These functions resolve each module-scope constant an
// assembled module REFERENCES against the ones it DECLARES. The census of call sites is
// ${WGSL_CENSUS}; each module is resolved in the test of the module that
// assembles it (\`expectSpliceResolved\`), and the shared chunks' requirements in
// ${WGSL_CHUNKS}.
//
${span("// WHY UPPER_SNAKE IS THE UNIVERSE", "import { describe")}import { expect } from "vitest";

${exported(resolver)}${exported(sites)}/**
 * One registered module's splice contract (§1, §2): it assembles to real WGSL, and it
 * references no module constant it never declares. The census reads the call
 * \`expectSpliceResolved("NAME", …)\` in the module's own test, so the name is literal.
 */
export function expectSpliceResolved(name: string, code: string): void {
    expect(code, name).toBeTypeOf("string");
    expect(code.length, name).toBeGreaterThan(200);
    expect(code, name).toContain("fn ");
    // Anti-vacuity: a module that references nothing would pass this trivially.
    expect(referenced(code).size, \`\${name} references no constants\`).toBeGreaterThan(0);
    expect(requirements(code), name).toEqual([]);
}
`;
    out[WGSL_CENSUS] = `${span("// THE SPLICE CONTRACT", "// WHY UPPER_SNAKE IS THE UNIVERSE").replace(/\/\/\n$/, "")}//
// The census is here because it walks src. Each registered module's own claims (it
// assembles, it resolves every constant it references) are the test of the module that
// assembles it, and the resolver they share is tests/harness/wgsl.ts.

import { describe, expect, it } from "vitest";
import { files, read } from "../harness/source";
import { CALL_SITE, CODE_PROP, LABEL_PROP } from "../harness/wgsl";

/**
 * The registry of assembled modules, keyed by the EXPORTED IDENTIFIER each
 * \`createShaderModule\` call site names, with the test that resolves it. The census
 * reconciles these keys against the call sites found in \`src/\`, in both directions.
 */
const MODULES: Record<string, string> = {
    FOURIER_FIELD_RENDER_WGSL: "${WGSL_FF}",
    FOURIER_FIELD_COMPUTE_WGSL: "${WGSL_FF}",
    AURORA_WGSL: "${WGSL_AURORA}",
    AURORA_IMAGE_WGSL: "${WGSL_AURORA}",
    METABALL_WGSL: "${WGSL_BLOB}",
};

${span("/** Every `.ts` file under `src/`", "/** WGSL comments carry prose")}${span('describe("WGSL splice contract — §1', 'describe("WGSL splice contract — §2').replace(
        /    it\("assembles each registered module to real WGSL, not an empty string", \(\) => \{\n[\s\S]*?\n    \}\);\n/,
        `    it("resolves every registered module in its own module's test", () => {
        for (const [name, test] of Object.entries(MODULES)) {
            expect(read(test), \`\${name} is not resolved in \${test}\`).toContain(\`expectSpliceResolved("\${name}",\`);
        }
    });
`,
    )}`;
    const unitTest = (unit, depth, imports, names, extra = "") => `// The WGSL splice contract for ${unit}: each module assembles to real WGSL and references no
// module constant it never declares (the census of call sites is
// ${WGSL_CENSUS}; the resolver is tests/harness/wgsl.ts).
import { describe, expect, it } from "vitest";
import { OKLCH_MATRICES_WGSL } from "@glass/composables/glass";
import { declared, expectSpliceResolved } from "${up(depth)}tests/harness/wgsl";
${imports}
describe("WGSL splice contract — ${unit}", () => {
${names.map((n) => `    it("${n} resolves every constant it references", () => {\n        expectSpliceResolved("${n}", ${n});\n    });\n`).join("\n")}
${names.filter((n) => n !== "FOURIER_FIELD_COMPUTE_WGSL").map((n) => `    it("${n} splices the PI-requiring OKLCh chunk and declares PI", () => {\n        expect(${n}).toContain(OKLCH_MATRICES_WGSL);\n        expect(declared(${n}).has("PI")).toBe(true);\n    });\n`).join("\n")}${extra}});
`;
    out[WGSL_FF] = unitTest("fourier-field", 5, `import { FOURIER_FIELD_COMPUTE_WGSL } from "../compute.wgsl";\nimport { FOURIER_FIELD_RENDER_WGSL } from "../render.wgsl";\n`, ["FOURIER_FIELD_RENDER_WGSL", "FOURIER_FIELD_COMPUTE_WGSL"], `
${span('    it("the fourier render module is one of them', null).replace(/\n\}\);\n?$/, "\n")}`);
    out[WGSL_AURORA] = unitTest("aurora", 6, `import { AURORA_IMAGE_WGSL } from "../aurora-image.wgsl";\nimport { AURORA_WGSL } from "../aurora.wgsl";\n`, ["AURORA_WGSL", "AURORA_IMAGE_WGSL"]);
    out[WGSL_BLOB] = unitTest("blob", 6, `import { METABALL_WGSL } from "../metaball.wgsl";\n`, ["METABALL_WGSL"]);
    out[WGSL_CHUNKS] = `// The WGSL splice contract, §3: the shared chunks' requirements are real, re-derived from
// each chunk's own text rather than trusted from its comment. Every module that splices a
// PI-requiring chunk declares PI in its own module's test (\`expectSpliceResolved\`).
import { describe, expect, it } from "vitest";
import { requirements } from "${up(5)}tests/harness/wgsl";
import { OKLCH_MATRICES_WGSL, PALETTE_RAMP_WGSL } from "../color.wgsl";

describe("WGSL splice contract — §3 the chunks' requirements are real", () => {
${span('    it("OKLCH_MATRICES_WGSL requires PI', '    it("every module that splices a PI-requiring chunk')}});
`;

    // ---- the three single-unit page specs, by row
    for (const [from, to] of VISUAL) {
        out[from] = null;
        out[to] = read(from).replace(/new URL\("\.\.\/\.\.\/\.\.\/docs\//g, 'new URL("../../../../docs/');
    }
    return out;
}
