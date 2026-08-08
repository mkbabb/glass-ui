/* W-CONTROL-BIT (#83) — the checkbox · switch · radio-group lane's own battery.
 *
 * Five checks, one per lane gate: G-BIT-ONE · G-BIT-GEO · G-BIT-FINDABLE ·
 * G-BIT-ALIVE · G-BIT-SEAT. Each is the node-readable HALF of its gate; the halves
 * that are geometry and colour (a computed 20×20 face, a measured ≥3:1 border, an
 * `elementFromPoint` hit map, the mark's 8-frame entrance) are browser-seat probes
 * owed to the π row and are deliberately NOT faked here with a jsdom measurement that
 * cannot see a resolved pixel. A gate that asserts what jsdom returns for
 * `getComputedStyle` on an unresolved `var()` chain is a gate that convicts nothing.
 *
 * SEATS +0. Nothing here claims a §B.5 seat name; this rides the tier-3 lane's
 * acceptance class exactly as the card (#79), button (#80) and picker (#81) batteries
 * do — per-lane born-RED gates are component close-battery rows, not standing roster
 * gates (CWT-3 batch ruling; TERMINAL-ROSTER E-7 extended to tier-3).
 *
 * THE LANE IS STATED ONCE and every check is scoped to it. A lane gate that ranges
 * over the library convicts other rows' files and can only be greened by editing
 * them — the fence violation the roster forbids.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Checkbox } from "@glass/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { Switch } from "@glass/components/switch";

const ROOT = process.cwd();
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

const REGISTER = "src/styles/glass/control-bit.css";
const SHELL_SHEETS = [
    "src/components/checkbox/styles.css",
    "src/components/switch/styles.css",
    "src/components/radio-group/styles.css",
];
const SHELL_SFCS = [
    "src/components/checkbox/Checkbox.vue",
    "src/components/switch/Switch.vue",
    "src/components/radio-group/RadioGroup.vue",
    "src/components/radio-group/RadioGroupItem.vue",
];
/* Every byte the lane owns. The register is where a law may be declared; a shell
 * sheet is where a ROLE residue may be. */
const LANE_CSS = [REGISTER, ...SHELL_SHEETS];

/* Strip comments so a defect NAMED in prose is never counted as a defect SHIPPED.
 * This lane's sheets and SFCs both carry their derivations in comments — including
 * the names of the very classes and tokens that were deleted — so a gate reading raw
 * text would convict the record of the cure. */
const code = (p: string) => read(p).replace(/\/\*[\s\S]*?\*\//g, "");
const markup = (p: string) =>
    read(p)
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");
/* The forced-colors arm is a legitimate SECOND statement of a law in the one place a
 * law must be restated (the system palette replaces every colour). Clauses that count
 * "exactly one" read the sheet with that arm removed, so the arm is never mistaken
 * for a fork — and its own single-block clause is asserted separately. */
const withoutForcedColors = (css: string) =>
    css.replace(/@media \(forced-colors: active\)\s*\{[\s\S]*?\n {4}\}/g, "");

describe("W-CONTROL-BIT — the binary triad", () => {
    /* G-BIT-ONE — one answer per law, and the structural half of the press cure.
     * Born-RED at HEAD: 3 press grammars · 3 focus deliveries · 4 invalid grammars ·
     * 3 disabled arms · 3 forced-colors blocks · 2 host-targeting shorthands. The
     * host clause is the load-bearing one: `.tap-squish` is the declared press
     * register, and a `transition` shorthand on the HOST replaces its property list
     * wholesale, so the checkbox's 4-leg shorthand with no `scale` leg landed the
     * squish in 0ms. Face, mark and thumb are different elements — a clobber is
     * impossible by construction rather than by discipline. */
    it("declares each control law exactly once, and no transition targets a host", () => {
        const register = code(REGISTER);
        const shells = SHELL_SHEETS.map(code).join("\n");

        // the register owns each law; the shells own none of them
        expect(register).toContain(":focus-visible .control-bit__face");
        expect(register).toContain("forced-colors: active");
        expect(register).toContain("prefers-reduced-motion: reduce");
        expect(register).toContain("[data-invalid]");
        expect(shells).not.toMatch(/:focus-visible/);
        expect(shells).not.toMatch(/forced-colors/);
        expect(shells).not.toMatch(/\[data-invalid\]/);
        expect(shells).not.toMatch(/opacity-disabled/);

        /* Exactly one focus block, one invalid arm, one forced-colors block. Counted
         * over RULE HEADS rather than over raw substrings: a head is the assertion's
         * real subject, and a substring count silently doubles the moment a selector
         * is line-wrapped. */
        const heads = (css: string) =>
            [...css.matchAll(/([^{}]+)\{[^{}]*\}/g)].map(([, h]) => h!.replace(/\s+/g, " ").trim());
        const plain = heads(withoutForcedColors(register));
        expect((register.match(/@media \(forced-colors: active\)/g) ?? []).length).toBe(1);
        /* ONE indicator rule, and ONE host suppression beside it — the host's
         * `outline: none` is not a second focus recipe, it is the reason the face may
         * own the only one. */
        expect(
            plain.filter((h) => h.includes(":focus-visible") && h.includes("__face"))
                .length,
        ).toBe(1);
        expect(plain.filter((h) => h === ".control-bit:focus-visible").length).toBe(1);
        expect(plain.filter((h) => h.includes("data-invalid")).length).toBe(1);
        expect(plain.filter((h) => h.includes(":hover")).length).toBe(1);
        expect(plain.filter((h) => h.includes(":active")).length).toBe(1);

        /* THE DISABLED RUNG MUST RE-POINT THE EDGE, not only the mark (A4, cure
         * round 2026-08-08). An UNCHECKED disabled bit paints no mark at all — the
         * mark is force-mounted at `opacity: 0` until `[data-state]` says otherwise —
         * so a rung that softens `--control-bit-mark-ink` alone leaves fill, border
         * and geometry byte-identical to the enabled control, and the whole disabled
         * arm reduces to `cursor: not-allowed`: a state a pointer can feel and an eye
         * cannot see. Every disabled specimen on `/forms/checks` is unchecked, so the
         * one arm the rung did paint was the one arm no route displayed. Spec
         * CWT-3:728's "geometry and border at full alpha" clause is REFUSED on that
         * measurement — the GEOMETRY stays at full alpha (dim ≠ shrink), the BORDER
         * softens with the ink. The checked arm's rung is (0,3,0) against this
         * (0,2,0) and still overrides both properties. */
        const ruleBody = (css: string, want: string) => {
            for (const [, h, b] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
                if (h!.replace(/\s+/g, " ").trim() === want) return b!;
            }
            return null;
        };
        const disabledBase = ruleBody(
            register,
            ".control-bit:is(:disabled, [data-disabled])",
        );
        expect(disabledBase).not.toBeNull();
        expect(disabledBase).toContain("--control-bit-mark-ink:");
        expect(disabledBase).toContain("--control-bit-edge:");
        expect(disabledBase).not.toMatch(/(^|;|\s)opacity\s*:/);

        /* ZERO transition declarations targeting a HOST anywhere in the lane. A host
         * rule is one whose last compound selector is the root class rather than an
         * element part — checked by walking each rule head. */
        for (const path of LANE_CSS) {
            for (const [, head, body] of code(path).matchAll(
                /([^{}]+)\{([^{}]*)\}/g,
            )) {
                const target = head.trim().split(",")[0]!.trim();
                const isHost =
                    !/__(face|mark|thumb|dot)\s*$/.test(target) &&
                    !/^@/.test(target) &&
                    !/^\.radio-group\b/.test(target);
                if (isHost && /(^|;|\s)transition\s*:/.test(body)) {
                    throw new Error(`host transition in ${path}: ${target}`);
                }
            }
        }
    });

    /* G-BIT-GEO — one object size, one corner spelling, one kept silhouette.
     * Born-RED at HEAD: faces 16 and 18 (two object sizes in a one-answer chassis),
     * the checkbox pointed at `--radius-control` → `--radius-pill` (D1: a circle,
     * silhouette-identical to an unchecked radio), and `50%` spelled three times
     * beside `9999px`. The switch clauses guard the KEPT symmetry against a "fix" of
     * the refuted 48×24/pad-2 re-derivation: with the register's 1px perimeter,
     * pad 1 gives rest inset 2 and checked far inset 44−1−1−20−20 = 2. */
    it("carries one object size, one corner spelling, and the kept switch geometry", () => {
        const register = code(REGISTER);
        const checkbox = code("src/components/checkbox/styles.css");
        const radio = code("src/components/radio-group/styles.css");
        const switchSheet = code("src/components/switch/styles.css");

        expect(register).toContain("--control-bit-size: 1.25rem"); // 20

        /* ONE DECLARATION OF THE CORNER, and it is the FALLBACK — not a host default
         * (cure round 2026-08-08). `.control-bit { --control-bit-radius: … }` and
         * `.checkbox { --control-bit-radius: … }` are both (0,1,0) on the SAME host in
         * the SAME layer, so which corner a checkbox wears was decided by stylesheet
         * source order alone — the register is @import-ed from `styles/glass.css` and
         * the shell sheet arrives with its SFC, so D1's headline (a checkbox is a tick,
         * not a disc) rode bundler ordering rather than the cascade. The register's own
         * fallback idiom removes the tie: the ROLE declares or it does not, and the
         * face's `var()` fallback is the disc every non-declaring member wears. */
        expect(checkbox).toContain("--control-bit-radius: var(--radius-md)"); // 6 = 0.30 × 20
        expect(register).toContain(
            "border-radius: var(--control-bit-radius, var(--radius-pill))",
        );
        expect(register).not.toMatch(/^\s*--control-bit-radius:/m);

        // `50%` is gone from the triad; the stadium is spelled once, on the register
        for (const path of LANE_CSS) expect(code(path)).not.toMatch(/border-radius:\s*50%/);
        expect(radio).not.toMatch(/--radio-face|--radio-seat/);

        // the switch silhouette, byte-kept — and travel == thumb == the one object
        expect(switchSheet).toContain("--control-bit-face-inline: 2.75rem"); // 44
        expect(switchSheet).toContain("--control-bit-face-block: 1.5rem"); // 24
        expect(switchSheet).toContain("--control-bit-face-pad: 0.0625rem"); // 1
        expect(switchSheet).toContain(
            "calc(var(--control-bit-face-inline) - var(--control-bit-face-block))",
        );
        expect(switchSheet).toContain("inline-size: var(--control-bit-size)");
    });

    /* G-BIT-FINDABLE — the source half of "the unchecked mark can be seen".
     * Born-RED at HEAD: both faces read `--control-ring`, a colour-valued ink forked
     * off the one-ink register; the focus indicator was delivered on `box-shadow`, so
     * on every surface painting its own shadow the ring REPLACED the resting material
     * (the switch re-listed `--glass-material-rim, --glass-shadow-wash` on three
     * separate focus rules purely to survive its own delivery mechanism). The
     * measured contrast cells are the π row's. */
    it("reads the perimeter rung and keeps the resting rim under focus", () => {
        const register = code(REGISTER);

        expect(register).toContain("var(--ink-perimeter)");
        expect(register).toContain("outline: 2px solid var(--control-bit-ink)");
        expect(register).toContain("outline-offset: 2px");

        // the retired ink has no readers anywhere in the library
        for (const path of [...LANE_CSS, "src/styles/tokens/scale-paper.css"]) {
            expect(code(path)).not.toContain("var(--control-ring)");
        }
        expect(code("src/styles/tokens/scale-paper.css")).not.toMatch(
            /^\s*--control-ring:/m,
        );

        // the two rim legs are byte-identical at rest and under focus
        const rims = [...register.matchAll(/var\(--glass-rim-top\),\s*\n?\s*var\(--glass-rim-bottom\)/g)];
        expect(rims.length).toBe(2);

        // the ring lives on `outline`; no lane sheet delivers focus on box-shadow
        expect(register).not.toContain("--focus-ring-shadow");
        for (const path of SHELL_SHEETS) expect(code(path)).not.toContain("--invalid-ring");
    });

    /* G-BIT-ALIVE — the mark exists before it is needed, and the lane answers a
     * pointer. Born-RED at HEAD: the indicator mounted ON state in two of three
     * members (so the only checked-state motion anywhere was a fill cross-fade), and
     * `grep hover` over the whole lane returned ZERO — the exact inverse of the 39
     * unguarded hovers convicted elsewhere. */
    it("force-mounts the mark at every state and answers a guarded pointer", () => {
        const register = code(REGISTER);

        expect(register).toMatch(/@media \(hover: hover\)/);
        expect(register).toContain("var(--fill-hover)");
        expect(register).toContain("var(--fill-selected)");
        // the spring vocabulary, not a bezier — liquid weight on the entrance
        expect(register).toContain(
            "scale var(--spring-press-duration) var(--transition-liquid-spatial)",
        );

        for (const path of SHELL_SFCS) expect(markup(path)).not.toContain("v-if=\"state\"");
        expect(read("src/components/checkbox/Checkbox.vue")).toContain("force-mount");
        expect(read("src/components/radio-group/RadioGroupItem.vue")).toContain(
            "force-mount",
        );

        // and the DOM half: the mark is present while the control is UNCHECKED
        const unchecked = mount(Checkbox, { props: { modelValue: false } });
        expect(unchecked.find(".control-bit__mark").exists()).toBe(true);
        const radio = mount(
            {
                components: { RadioGroup, RadioGroupItem },
                template:
                    '<RadioGroup model-value="b"><RadioGroupItem value="a" /></RadioGroup>',
            },
            { global: { components: { RadioGroup, RadioGroupItem } } },
        );
        expect(radio.get('[role="radio"]').attributes("data-state")).toBe("unchecked");
        expect(radio.find(".control-bit__mark").exists()).toBe(true);
    });

    /* G-BIT-SEAT — the seat is the host, in flow, and it does not lie.
     * Born-RED at HEAD: the checkbox's rect read 16×16 while an absolutely-positioned
     * span bled 14px past it in every direction, and the radio carried −13px margins
     * whose derived tiling gap the component's OWN demo route already broke (gap-6 =
     * 24px on an 18px effective box → 42px pitch under a 44px seat = a 2px hit-rect
     * overlap). The measured non-overlap map is the π row's; this is its source and
     * DOM half. */
    it("seats every member on the host with no overhanging span and no negative margin", () => {
        for (const path of LANE_CSS) {
            expect(code(path)).not.toMatch(/margin:\s*var\(--radio-seat-offset\)/);
            expect(code(path)).not.toMatch(/position:\s*absolute/);
            expect(code(path)).not.toMatch(/margin:\s*-|margin:\s*calc\([^)]*\/\s*-/);
        }
        expect(code(REGISTER)).toContain("var(--touch-target)");
        expect(code(REGISTER)).toContain("margin: 0");
        expect(code("src/components/radio-group/styles.css")).toContain("gap: 0");

        // no member renders a seat node beside its face
        for (const path of SHELL_SFCS) expect(markup(path)).not.toContain("__seat");

        // all three roots carry the register, and each renders exactly one face
        /* Selected by ROLE, not by `wrapper.element`: a form-associated Reka root
         * renders its hidden native input as a SIBLING, so the wrapper's element is a
         * fragment and reading `className` off it silently returns "" — a gate that
         * would then pass or fail on a rendering detail instead of on the class list
         * it claims to assert. Each specimen is also mounted the way it ships (a
         * radio item only exists inside its group; Reka injects the root context). */
        const roots = [
            mount(Checkbox, { props: { modelValue: false } }).get('[role="checkbox"]')
                .element as HTMLElement,
            mount(Switch, { props: { modelValue: false } }).get('[role="switch"]')
                .element as HTMLElement,
            mount({
                components: { RadioGroup, RadioGroupItem },
                template:
                    '<RadioGroup model-value="a"><RadioGroupItem value="a" /></RadioGroup>',
            }).get('[role="radio"]').element as HTMLElement,
        ];
        for (const root of roots) {
            expect(root.classList.contains("control-bit")).toBe(true);
            expect(root.classList.contains("tap-squish")).toBe(true);
            expect(root.querySelectorAll(".control-bit__face")).toHaveLength(1);
        }
    });
});
