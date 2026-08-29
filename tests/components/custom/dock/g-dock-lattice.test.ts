import { readFileSync, readdirSync } from "node:fs";
import { join, sep } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import { useDockExpandedSize } from "@glass/components/dock/composables/dockMorphMeasure";

import { mountComposable } from "../../../utils/mountComposable";

// ─────────────────────────────────────────────────────────────────────────────
// BK #47 GF-DOCK — THE FOUR DOCK SEATS (G-DOCK-BUDGET · G-DOCK-RUN · G-DOCK-REACH ·
// G-DOCK-MORPH · G-DOCK-STATE), authored at W2-W9.
//
// SEATS +0, AND THAT IS A RULE RATHER THAN A CONVENIENCE. These are ORDINARY tests
// under `ordinaryTestLaw.ordinaryTestsConsumeBudget: false`
// (GATE-SEMANTIC-ROSTER-C20.json), which is the same standing the `G-ONE-NAME` rail arm
// (tests/styles/dock-name-canon.test.ts) and `G-HM-MARK` already hold. GF-DOCK §5 says
// it in one line — "G-SERIES cited, not minted" — and the register receipt is
// byte-identical across this cut: `seats:60 … rosterSha256:282d05cf violations:0`.
// `scripts/gate-register.mjs` validates roster → executable, never executable → roster,
// so a G-named ordinary seat cannot move a count. SEAT-BINDING.json is untouched.
//
// WHY THIS FILE EXISTS AT ALL. GF-DOCK §5 tables six invariants "born-RED, each with a
// biting mutation", and until this file the whole dock rewrite had none of them on
// disk: the lane's own verify term — four DOCK seats born-RED→green — could not be RUN,
// while `run.css` and `useDockRun.ts` cited `G-DOCK-BUDGET`/`G-DOCK-REACH` by name as if
// they were live. Figures naming absent detectors is the exact class the register's own
// status vocabulary refuses ("an unwired gate is ABSENT, never GREEN"). Every assertion
// below was run against `git archive`d pre-wave bytes before it was run against the
// tree; the RED transcripts are banked in the unit RECORD §GATES.
//
// WHY MOSTLY SOURCE DETECTORS. jsdom has no layout: `clientWidth` is 0, no rule
// cascades, no scroll offset exists, and no `@property` registers. An invariant like
// "interior rests ≡ P/2 (mod P)" is a π obligation and is enqueued as one — asserting it
// here would produce a gate that greens on a page that never painted, which is worse
// than no gate. What IS decidable without a compositor is whether the DESIGN LAW is
// declared: the tokens registered, the grammar authored, the arithmetic and the geometry
// shipping together. The behavioural arms below use only DOM facts jsdom really has
// (attributes, focus, event dispatch, element identity).
// ─────────────────────────────────────────────────────────────────────────────

const DOCK = "src/components/dock";
const STYLES = `${DOCK}/styles`;

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

/**
 * CSS with every comment removed. Every declaration detector below runs on this, never
 * on raw text — the dock band strikes retired code IN PLACE inside `~~…~~` comment
 * brackets (a house law), so a raw-text grep for `mask-image` or `max-inline-size` finds
 * the tombstone and reports the corpse as alive. A gate that cannot tell a strike from
 * a declaration would RED this wave for doing exactly what the wave was asked to do.
 */
function declarations(rel: string): string {
    return read(rel).replace(/\/\*[\s\S]*?\*\//g, "");
}

/**
 * Every `.css` partial in the dock band, as `{ file, declarations }`.
 *
 * [2026-08-25 · BK #47 W2-W9 CURE] THE WALK IS RECURSIVE, AND THAT IS THE WHOLE POINT.
 * ~~`readdirSync(STYLES)`~~ — a flat read listed 15 partials and silently omitted the
 * four under `styles/controls/` (`icon-button` · `tab-button` · `touch-floor` ·
 * `triggers`), because `controls` is a DIRECTORY entry and `.endsWith(".css")` drops it.
 * Every arm below that says "the whole band" was therefore quantifying over a SUBSET
 * while reading as if it quantified over the band — the worst failure mode a
 * band-wide detector has, since it greens by not looking. Mutation-proven, not
 * theorised: a keyframed `border-radius` planted in `controls/` survived the §5b
 * biconditional intact (M4), and five live `outline: none` declarations sat unseen
 * under the one-licensed-suppressor arm. Recursion is the fix; the arms did not change.
 */
function bandCss(): Array<{ file: string; css: string }> {
    return readdirSync(join(process.cwd(), STYLES), { recursive: true })
        .map((entry) => String(entry).split(sep).join("/"))
        .filter((name) => name.endsWith(".css"))
        .sort()
        .map((name) => ({ file: `${STYLES}/${name}`, css: declarations(`${STYLES}/${name}`) }));
}

/**
 * Every DECLARATION in the band matching `pred`, each resolved to its full nested
 * selector chain. `pred` must not carry `/g` — `RegExp.test` is stateful with it.
 *
 * [2026-08-29 · BK π-RERUN-R2] Parameterised. The walk was written for `outline: none`
 * and is now the band's one declaration detector; the ring-reserve arm's size census
 * needs exactly the same three properties (recursive, brace-aware, `&`-resolving), and a
 * second copy of it is a second thing to forget to fix. `outlineNoneSites` below is the
 * original caller, unchanged in what it returns.
 *
 * [2026-08-25 · BK #47 W2-W9 CURE] A BRACE WALK, BECAUSE THE REGEX SAW A SUBSET. The
 * previous detector was `/([^{}]*)\{[^{}]*outline:\s*none[^{}]*\}/` — `[^{}]*` cannot
 * cross a nested rule, so a declaration sitting in a block that ALSO contains `&`-nested
 * rules is invisible to it. That is not a corner case in this band: it hid
 * `.dock-icon-button` (icon-button.css:59) and `.dock-tab-button` (tab-button.css:51)
 * even after the walk went recursive, so the arm below would still have enumerated 4 of
 * 6 while reading as though it enumerated the band. Two independent blindnesses stacked
 * on one another — the directory and the nesting — is precisely how a detector greens on
 * a defect it was written to catch.
 *
 * This walk is brace-aware and `&`-resolving: it tracks the open-block stack, drops
 * at-rule frames (`@layer`, `@media`), and substitutes each `&` with its resolved
 * parent, so what it reports is the selector the CASCADE sees rather than the text the
 * author typed. It runs on `declarations()` output, so struck prose inside `~~…~~` is
 * already gone.
 */
function bandDeclSites(pred: RegExp): Array<{ file: string; chain: string; decl: string }> {
    const sites: Array<{ file: string; chain: string; decl: string }> = [];
    for (const { file, css } of bandCss()) {
        const stack: string[] = [];
        let buf = "";
        const flush = (): void => {
            if (pred.test(buf)) {
                const chain = stack
                    .filter((frame) => !frame.startsWith("@"))
                    .reduce(
                        (acc, frame) =>
                            acc && frame.includes("&")
                                ? frame.split("&").join(acc)
                                : acc
                                  ? `${acc} ${frame}`
                                  : frame,
                        "",
                    );
                sites.push({ file, chain, decl: buf.trim().replace(/\s+/g, " ") });
            }
            buf = "";
        };
        for (const ch of css) {
            if (ch === "{") {
                stack.push(buf.trim().replace(/\s+/g, " "));
                buf = "";
            } else if (ch === "}") {
                flush();
                stack.pop();
                buf = "";
            } else if (ch === ";") {
                flush();
            } else {
                buf += ch;
            }
        }
    }
    return sites;
}

/** Every `outline: none` declaration in the band, as `file: resolved chain`. */
function outlineNoneSites(): string[] {
    return bandDeclSites(/^\s*outline\s*:\s*none\s*$/).map(
        ({ file, chain }) => `${file}: ${chain}`,
    );
}

/** Members of an exported `interface` — one `name:` / `name?:` per line. */
function interfaceMembers(rel: string, name: string): string[] {
    const body = read(rel).match(new RegExp(`interface ${name} \\{([\\s\\S]*?)\\n\\}`))?.[1];
    if (body == null) throw new Error(`${name} not found in ${rel}`);
    return [...body.matchAll(/^\s{4}(\w+)\??:/gm)].map((m) => m[1]!);
}

// ═════════════════════════════════════════════════════════════════════════════
// G-DOCK-BUDGET
// ═════════════════════════════════════════════════════════════════════════════

describe("G-DOCK-BUDGET — the run is the sole flexible member, and the surface is six", () => {
    /**
     * BORN-RED at `ac471032^` (pre-W1): `DockProps` carried **14** members. The six
     * survivors are GF-DOCK §4's Keep list exactly; the eight struck (`overflow`,
     * `collapseDelay`, `search`, `position`, `size`, `layout`, `interaction`, and the
     * `alwaysExpanded`/`startCollapsed` pair folded into `collapse`) are its Delete list.
     */
    it("DockProps is at most six members", () => {
        const props = interfaceMembers(`${DOCK}/composables/useDockShellProps.ts`, "DockProps");
        expect(props.length, `DockProps: ${props.join(", ")}`).toBeLessThanOrEqual(6);
    });

    /**
     * THE BUDGET LAW ITSELF. Exactly one `flex: 1` declaration exists in the whole dock
     * band, and it lands on the run. This is the assertion GF-DOCK names the mutation
     * for: "any second `flex: 1` member → RED".
     *
     * BORN-RED at HEAD in the ABSENT direction, which is the more interesting RED: the
     * pre-lattice band declared `flex: 1` **zero** times. The run was the sole flexible
     * member by accident of `.dock-layers`' default, which is exactly why it absorbed
     * every chrome overrun down to `clientWidth: 0` on a 377px plate with nothing on
     * disk saying it should not. An unstated law cannot be violated and cannot be relied
     * on; stating it is the wave.
     */
    it("exactly one member flexes, and it is the run", () => {
        const flexed = bandCss().flatMap(({ file, css }) =>
            [...css.matchAll(/([^{}]+)\{[^{}]*?\bflex:\s*1\b[^{}]*\}/g)].map((m) => ({
                file,
                selector: m[1]!.trim().replace(/\s+/g, " "),
            })),
        );
        expect(flexed.map((f) => `${f.file} ${f.selector}`)).toHaveLength(1);
        expect(flexed[0]!.selector).toContain(".dock-layers");
    });

    /** Counted chrome is stated, not assumed — the other half of the same law. */
    it("the persistent regions are counted, never flexible", () => {
        const run = declarations(`${STYLES}/run.css`);
        expect(run).toMatch(/\.dock-persistent\s*\{[^{}]*flex:\s*0\s+0\s+auto/);
    });

    /**
     * THE CONSUMER CAP IS GONE. GF-DOCK's second stated mutation for this seat is
     * "restore the consumer cap → RED", and this is the arm that bites.
     *
     * BORN-RED at HEAD: `shell.css:179` declared `max-inline-size:
     * var(--dock-max-inline-size)` on the dock root. The cap was `overflow.css`'s
     * PRECONDITION — that file needed a box that could be too small for its content in
     * order for "does the row fit?" to have a false branch. At 393px `80vw` is 314px,
     * narrower than the measured 377px plate, so the cap clamped the dock below the
     * width the viewport offered and left chrome and lattice fighting over the
     * remainder. A root cap and a budget law cannot both hold.
     *
     * `--dock-max-block-size` is deliberately NOT covered: a column cap hands the
     * vertical run its scrollable extent, which is the lattice working.
     */
    it("no dock rule consumes the inline consumer cap", () => {
        const offenders = bandCss()
            .filter(({ css }) => /max-inline-size:[^;]*--dock-max-inline-size/.test(css))
            .map(({ file }) => file);
        expect(offenders).toEqual([]);
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// G-DOCK-RUN — the lattice, the detent engine, and the cut cap
// ═════════════════════════════════════════════════════════════════════════════

describe("G-DOCK-RUN — the platform is the detent engine", () => {
    /**
     * The pitch pair is `@property`-REGISTERED, and registration is load-bearing rather
     * than tidy: `useDockRun.anchorFor` reads both through `getComputedStyle`, and an
     * unregistered custom property hands JS back the literal author text
     * (`calc(var(--dock-seat) + var(--dock-run-gap))`) which `parseFloat` reads as NaN.
     * Registered, the same read resolves to a used length. The `<number>` on
     * `--dock-open-pitches` is what keeps `m` an integer count rather than a string.
     *
     * BORN-RED at HEAD: neither property existed.
     */
    it("the pitch pair is registered with resolvable syntax", () => {
        const index = read(`${STYLES}/index.css`);
        expect(index).toMatch(/@property --dock-pitch \{[^}]*syntax:\s*"<length>"/);
        expect(index).toMatch(/@property --dock-open-pitches \{[^}]*syntax:\s*"<number>"/);
    });

    /**
     * P IS DERIVED, NEVER A LITERAL. `2.75rem` is right at a 16px root and wrong at every
     * other one, and a consumer setting `font-size` on `html` is not exotic. Binding the
     * pitch to the painted seat makes it correct on every register the density cascade
     * can reach — fine, coarse, cockpit, a consumer `--dock-mobile-scale` — with no
     * re-derivation anywhere.
     */
    it("the pitch is seat + gap, computed", () => {
        expect(declarations(`${STYLES}/run.css`)).toMatch(
            /--dock-pitch:\s*calc\(\s*var\(--dock-seat\)\s*\+\s*var\(--dock-run-gap\)\s*\)/,
        );
    });

    /**
     * THE FIVE DECLARATIONS THAT REPLACE THE GESTURE ENGINE, on both axes. Together they
     * delete the flick projector, the detent table, the item census, the bias filter, the
     * rubber band and `useDockTouchGate`. All five measured supported in Chromium 149 and
     * real Safari 26.4.
     *
     * `mandatory`, not `proximity`, is the mutation GF-DOCK names: proximity lets a rest
     * land off-pitch, which voids the peek, the reach anchor and the modular law at once.
     *
     * BORN-RED at HEAD: `overflow.css` declared none of the five — `touch-action` was
     * `auto` universally, which is the one universally-true RED in the audit.
     */
    it.each([
        ["horizontal", "x", "scroll-padding-inline", "pan-x"],
        ["vertical", "y", "scroll-padding-block", "pan-y"],
    ] as const)("the %s run is a snapped, contained, single-owner scroller", (_o, axis, pad, pan) => {
        const run = declarations(`${STYLES}/run.css`);
        expect(run).toContain(`scroll-snap-type: ${axis} mandatory`);
        expect(run).toMatch(new RegExp(`${pad}:\\s*calc\\(var\\(--dock-pitch\\) / 2\\)`));
        expect(run).toContain(`touch-action: ${pan}`);
        expect(run).toContain("overscroll-behavior: contain");
        expect(run).toMatch(/\.dock-run > \*\s*\{[^{}]*scroll-snap-align:\s*start/);
    });

    /** `proximity` anywhere in the band is the de-quantisation mutation, spelled out. */
    it("no run snaps on proximity", () => {
        for (const { file, css } of bandCss()) {
            expect(css, file).not.toContain("proximity");
        }
    });

    /**
     * THE CUT CAP IS A NAMED, SCOPED TIMELINE — and the name is the whole mechanism.
     * `timeline-scope` on `.glass-dock` (already the common ancestor: zero new DOM),
     * `scroll-timeline` on the port, `animation-timeline` on the plate.
     *
     * The anonymous form is the mutation GF-DOCK names, and it is a REAL trap rather than
     * a style preference: `animation-timeline: scroll(self inline)` on the plate measured
     * 9999px INERT in both engines, because the plate is a `position: absolute` overlay
     * SIBLING of the port and scroll timelines resolve DOWN, never up.
     * `styles/scroll-driven.css:30-46` documents that trap already.
     */
    it("the cap rides a named scoped timeline, never an anonymous one", () => {
        const run = declarations(`${STYLES}/run.css`);
        expect(run).toMatch(/\.glass-dock\s*\{[^{}]*timeline-scope:\s*--dock-run/);
        expect(run).toMatch(/scroll-timeline:\s*--dock-run (inline|block)/);
        expect(run).toMatch(/animation-timeline:\s*--dock-run, --dock-run/);
        for (const { file, css } of bandCss()) {
            expect(css, `${file}: anonymous timeline on a sibling overlay is inert`).not.toMatch(
                /animation-timeline:\s*scroll\(/,
            );
        }
    });

    /**
     * BOTH ENDPOINTS ARRIVE THROUGH THE TOKEN PAIR, so retargeting a shape is a token
     * line and never a keyframe edit — and `from: 9999px`, which the half-box clamp pins
     * until t=0.9988 (measured: t=0.999 still reads 25.98px), appears nowhere.
     * `--dock-cap-rest` is `50%` on the stadium precisely because 50% IS the resolved
     * corner with no plate-height token to couple to.
     */
    it("the cap keyframes only through the rest/cut token pair", () => {
        const run = read(`${STYLES}/run.css`);
        const frames = [...run.matchAll(/@keyframes gl-dock-cap-[\w-]+ \{([\s\S]*?)\n\}/g)];
        expect(frames).toHaveLength(4);
        for (const [, body] of frames) {
            for (const [, value] of body!.matchAll(/border-[\w-]+-radius:\s*([^;]+);/g)) {
                expect(value!.trim()).toMatch(/^var\(--dock-cap-(rest|cut)\)$/);
            }
        }
        const decls = declarations(`${STYLES}/run.css`);
        expect(decls).toMatch(/--dock-cap-rest:\s*50%/);
        // Declarations only: `from: 9999px` is NAMED in the docblock as the rejected
        // alternative, and a detector that cannot tell a rejection from a declaration
        // would RED the file for explaining itself.
        expect(decls).not.toContain("9999px");
    });

    /**
     * BOTH EDGE FADES ARE GONE, and nothing re-declares one. They died on their own
     * measurements — 0/255 over 40px (not received as a cue) while erasing an active edge
     * item to visFrac 0.24 (a real legibility cost). The struck prose that records them
     * is invisible here by construction: this reads declarations only.
     *
     * BORN-RED at HEAD: `overflow.css` and `shell.css` both declared a `mask-image` edge.
     */
    it("no edge fade survives on either axis", () => {
        const offenders = bandCss()
            .filter(({ css }) => /(-webkit-)?mask-image:/.test(css))
            .map(({ file }) => file);
        expect(offenders).toEqual([]);
    });

    /** The three deleted owners stay deleted — no live reference outside struck prose. */
    it.each(["useDockTouchGate", "useDockOverflowFit", "data-dock-overflow"])(
        "%s has no live reference in the dock band",
        (name) => {
            const live = readdirSync(join(process.cwd(), `${DOCK}/composables`))
                .concat(readdirSync(join(process.cwd(), DOCK)))
                .filter((f) => /\.(ts|vue)$/.test(f));
            expect(live).not.toContain(`${name}.ts`);
            for (const { file, css } of bandCss()) {
                expect(css, file).not.toContain(name);
            }
        },
    );
});

// ═════════════════════════════════════════════════════════════════════════════
// G-DOCK-REACH
// ═════════════════════════════════════════════════════════════════════════════

describe("G-DOCK-REACH — the anchor is closed-form, and its geometry ships with it", () => {
    /**
     * THE PAIRING LAW — the arm this seat exists for, and the one defect it was authored
     * in response to.
     *
     * Between W3 and W4 the tree carried the `openExtra` term — `[openIdx < i]·(m−1)·P` —
     * in `useDockRun.anchorFor` while `--dock-open-seat` had **zero consumers**:
     * arithmetic for a geometry no rule produced. On any dock whose seats carry
     * `aria-current` (which `RouterLink` sets natively) reach overshot by exactly
     * `(m−1)·P` for every seat after the open one — a silent, correct-looking miss.
     *
     * So the invariant is stated as a BICONDITIONAL rather than as two independent
     * assertions: the term and the rule ship together or neither ships. Delete the CSS
     * and this REDs; delete the term and GF-DOCK's own stated mutation ("drop the
     * `(m−1)·P` term → RED for every seat after the open one") REDs the arm below it.
     */
    it("the openExtra term and the open-seat rule are the same act", () => {
        const js = read(`${DOCK}/composables/useDockRun.ts`);
        const css = declarations(`${STYLES}/run.css`);
        const termShipped = /\(m - 1\)\s*\*\s*pitch/.test(js);
        const geometryShipped = /inline-size:\s*var\(--dock-open-seat\)/.test(css);
        expect(
            geometryShipped,
            "the anchor pushes every later seat by (m−1)·P; a rule must make the open seat that wide",
        ).toBe(termShipped);
        // …and the width is authored from the pitch, never measured back off the DOM.
        expect(css).toMatch(
            /--dock-open-seat:\s*calc\(\s*var\(--dock-open-pitches\) \* var\(--dock-pitch\) - var\(--dock-run-gap\)\s*\)/,
        );
    });

    /**
     * THE MODULAR CORRECTION, in the JS half. With `scroll-padding: P/2` an interior rest
     * is ≡ P/2 (mod P), so an anchor computed without the −P/2 term is not a snap position
     * and the engine drags the glide off it the instant it settles. Both prior arms of the
     * adjudication shipped a gate asserting ≡ 0 — a gate that REDs the design it protects.
     */
    it("the anchor carries the −P/2 term and clamps to the real terminals", () => {
        const js = read(`${DOCK}/composables/useDockRun.ts`);
        expect(js).toMatch(/i \* pitch \+ openExtra - pitch \/ 2/);
        expect(js).toMatch(/Math\.min\(Math\.max\(raw, 0\), scrollMax\(run\)\)/);
    });

    /** `touch-action: auto` on the run gives the gesture back to the document. */
    it("the run never returns the gesture to the page", () => {
        for (const { file, css } of bandCss()) {
            expect(css, file).not.toMatch(/touch-action:\s*auto/);
        }
    });

    /**
     * ROVING TABINDEX — a real DOM fact jsdom can hold, and the total RED this replaces:
     * every focusable seat carried `tabIndex 0` across all five docks (13/13, 9/9, 7/7,
     * 5/5, 15/15) while `keydown` was bound 0/0. Tabbing a route dock cost one stop per
     * destination and arrow keys did nothing — neither the toolbar pattern nor any other.
     */
    function dockWithSeats(current = -1) {
        return mount(GlassDock, {
            props: { collapse: "open" as const },
            slots: {
                default: [0, 1, 2, 3]
                    .map(
                        (i) =>
                            `<button data-seat="${i}"${i === current ? ' aria-current="page"' : ""}>s${i}</button>`,
                    )
                    .join(""),
            },
            attachTo: document.body,
        });
    }

    it("exactly one seat holds the tab stop", async () => {
        const w = dockWithSeats();
        await nextTick();
        const tabbable = w.findAll("[data-seat]").filter((s) => s.attributes("tabindex") === "0");
        expect(tabbable).toHaveLength(1);
        expect(tabbable[0]!.attributes("data-seat")).toBe("0");
        w.unmount();
    });

    /**
     * …and the stop FOLLOWS the open seat. Returning to a dock should put focus where you
     * are, not where the list begins. This is also the arm that proves `openIndexOf` and
     * the `[aria-current]` selector in `run.css` read the same predicate — two owners of
     * "which seat is open" that can disagree is the class this rewrite exists to delete.
     */
    it("the tab stop follows aria-current", async () => {
        const w = dockWithSeats(2);
        await nextTick();
        const tabbable = w.findAll("[data-seat]").filter((s) => s.attributes("tabindex") === "0");
        expect(tabbable).toHaveLength(1);
        expect(tabbable[0]!.attributes("data-seat")).toBe("2");
        w.unmount();
    });

    /**
     * ARROW TRAVEL, AND NO WRAP. A toolbar's ends are real: wrapping a route dock sends
     * the user from the last destination to the first on one keypress with no cue that it
     * happened, and the lattice's terminals are exactly where the cap teaches
     * "flush = completeness".
     */
    it("arrows travel, Home/End jump, and the ends hold", async () => {
        const w = dockWithSeats();
        await nextTick();
        const seats = w.findAll("[data-seat]");
        const press = async (from: number, key: string) => {
            await seats[from]!.trigger("keydown", { key });
            await nextTick();
            return document.activeElement?.getAttribute("data-seat");
        };
        expect(await press(0, "ArrowRight")).toBe("1");
        expect(await press(1, "End")).toBe("3");
        expect(await press(3, "ArrowLeft")).toBe("2");
        expect(await press(2, "Home")).toBe("0");
        // The terminals refuse rather than wrap.
        expect(await press(0, "ArrowLeft")).toBe("0");
        w.unmount();
    });

    /** A vertical dock takes the other arrow pair, or its tab order reads across the wrong axis. */
    it("a vertical dock answers the block-axis arrows", async () => {
        const w = mount(GlassDock, {
            props: { collapse: "open" as const, orientation: "vertical" as const },
            slots: { default: `<button data-seat="0">a</button><button data-seat="1">b</button>` },
            attachTo: document.body,
        });
        await nextTick();
        await w.findAll("[data-seat]")[0]!.trigger("keydown", { key: "ArrowDown" });
        await nextTick();
        expect(document.activeElement?.getAttribute("data-seat")).toBe("1");
        w.unmount();
    });

    /** The live region exists and is a region — reach announces through it or silently. */
    it("reach has a live region to announce through", () => {
        const status = mount(GlassDock).get(".dock-run-status");
        expect(status.attributes("role")).toBe("status");
        expect(status.attributes("aria-live")).toBe("polite");
        // Outside the run: every direct child of the run is a snap target, and a
        // zero-width announcement node inside it would be one the user can land on.
        expect(status.element.closest(".dock-run")).toBeNull();
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// G-DOCK-MORPH — including the falsifier the pre-measure guard shipped without
// ═════════════════════════════════════════════════════════════════════════════

describe("G-DOCK-MORPH — a morph never starts against an unmeasured target", () => {
    function sized(size: () => number): HTMLElement {
        const el = document.createElement("div");
        Object.defineProperties(el, {
            offsetWidth: { get: size },
            offsetHeight: { get: () => 48 },
        });
        el.getBoundingClientRect = () =>
            ({ width: size(), height: 48, top: 0, left: 0, right: size(), bottom: 48 }) as DOMRect;
        return el;
    }

    /**
     * THE FALSIFIER. GF-DOCK calls the defect this guards "the largest motion defect in
     * the component" and it shipped, in the cure's first draft, with no test that could
     * tell the cure from the defect: reverting the guard survived 29/29 of the dock's
     * existing motion seats. This is the assertion whose absence let that stand.
     *
     * THE MECHANISM, reproduced exactly. On a collapsed→expanded flip the `watch` fires in
     * the same tick the ref changes: `expanded.value` is already `true` while the root is
     * still laid out at its COLLAPSED span. An unconditional capture reads that collapsed
     * number and stores it as `expandedPx` — the expanded ENDPOINT seeded with the
     * collapsed box. The morph then arms against it, runs to the wrong target, holds there
     * while the spring settles, and snaps to the real span the moment the ResizeObserver
     * delivers an honest measurement: 186 of 311, ~350ms of hold, then +125px in one frame
     * at t≈657.
     *
     * THE BITE. Make `capture()` unconditional again (delete the `if (source === "layout")`
     * arm) and the root below publishes `--dock-expanded-px: 64px` — identical to
     * `--dock-collapsed-px`, i.e. a dock whose expand travels nowhere and then jumps. With
     * the guard, the fallback path reads the FULL PANE'S own rendered span (220 + chrome),
     * which is real from mount because the inactive pane stays laid out under
     * `visibility`. The guard is not masking a measurement — the flip write was strictly
     * worse than the fallback it overrode.
     */
    it("a posture flip never seeds the expanded endpoint from the collapsed box", async () => {
        const COLLAPSED_SPAN = 64;
        const expanded = ref(false);
        // The root NEVER re-lays out: it stays at its collapsed span for the whole test,
        // which is precisely the frame the flip watcher fires in.
        const root = sized(() => COLLAPSED_SPAN);
        const content = sized(() => 44);
        const full = sized(() => 220);
        const summary = sized(() => 44);
        root.append(content);

        const { unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                expandedEl: ref(full),
                collapsedEl: ref(summary),
                axis: ref("horizontal" as const),
                expanded,
            }),
        );
        await nextTick();
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe(`${COLLAPSED_SPAN}px`);

        expanded.value = true;
        await nextTick();

        const expandedPx = Number.parseFloat(root.style.getPropertyValue("--dock-expanded-px"));
        expect(
            expandedPx,
            "the expanded endpoint was seeded from the collapsed root — the morph will run to the wrong target and then jump",
        ).not.toBe(COLLAPSED_SPAN);
        // It is the full pane's own span that survives, which is the honest number.
        expect(expandedPx).toBeGreaterThanOrEqual(220);
        unmount();
    });

    /** The source half: only a post-layout event may move an endpoint. */
    it("only the ResizeObserver and the initial attach claim a layout capture", () => {
        const src = read(`${DOCK}/composables/dockMorphMeasure.ts`);
        expect(src).toMatch(/new ResizeObserver\(\(\) => capture\("layout"\)\)/);
        expect(src).toMatch(/watch\(expanded, \(\) => capture\("flip"\)\)/);
        expect(src).toMatch(/if \(source === "layout"\)/);
    });

    /**
     * THE HOVER PRE-SCALE STAYS STRUCK. It ran 56→61.6 and then snapped un-tweened 54ms
     * before the expand — a motion that contradicts the one it precedes. GF-DOCK names
     * reinstating it as this seat's second mutation.
     *
     * BORN-RED at HEAD: live in `morph.css`, guarded `:not([data-morphing])`, which is
     * what made it snap rather than tween — the rule stopped matching the instant the
     * morph began.
     */
    it("no collapsed hover pre-scale precedes the morph", () => {
        for (const { file, css } of bandCss()) {
            expect(css, file).not.toMatch(/--dock-collapsed-hover-scale\s*\)/);
        }
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// G-DOCK-MATERIAL / PROPORTION — the W8 and W9 arms that landed in-fence
// ═════════════════════════════════════════════════════════════════════════════

describe("G-DOCK-MATERIAL — the focus ring composes instead of competing", () => {
    /**
     * BORN-RED at HEAD: `index.css` declared `box-shadow: var(--dock-ring); outline:
     * none` on the four control families. One property was carrying two independent
     * facts — the focus ring AND every control's hover/press/selected elevation — so
     * whichever rule won the cascade erased the other. The file's own comment documented
     * the workaround (keep class specificity, "NOT `:where()`, which would … let a
     * per-control :hover box-shadow override the focus ring"), which is the defect
     * describing itself: a specificity ladder holding up a keyboard user's focus ring
     * until the next control ships a more specific hover.
     *
     * `outline` is a different property, so it composes with any elevation; it is what
     * forced-colors mode honours (a box-shadow ring vanishes there entirely — total loss
     * of focus visibility, not degraded); and `outline-offset` seats it outside the box.
     */
    it("the ring is an outline, and every outline: none in the band is licensed", () => {
        const idx = declarations(`${STYLES}/index.css`);
        expect(idx).toMatch(/:focus-visible[^{}]*\{[^{}]*outline:\s*var\(--dock-ring-width\)/);
        expect(idx).toMatch(/outline-offset:\s*var\(--dock-ring-offset\)/);

        // The recursion this arm's truth depends on. If `bandCss()` ever goes flat again,
        // the four `controls/` partials leave the band and this whole arm starts greening
        // on a subset — the exact failure it was cured of. Assert coverage, not trust.
        expect(bandCss().filter(({ file }) => file.includes("/controls/")).length).toBe(4);

        // The whole band: an `outline: none` is the mutation that silently restores the
        // old collision by deleting the channel the ring now rides. SIX are licensed and
        // each is licensed for a STATED reason; anything else RED.
        //
        // TWO GROUNDS license a suppressor, and every entry below is tagged with the one
        // it stands on. Document order — this is a census, so it reads in the order a
        // reader opening the files would meet them.
        //
        // [SHADOWED] The control's BASE rule zeroes the UA outline at (0,1,0); the ring
        //   rule (index.css:271-277) re-declares it at (0,2,0) on the same element for
        //   `:focus-visible`. (0,2,0) > (0,1,0), so the ring wins wherever it applies and
        //   the reset only ever governs the non-focus-visible states — which is its job:
        //   suppress the UA ring on mouse/programmatic focus, where the design shows
        //   nothing. `.dock-select-trigger` and `.dock-dropdown-trigger` are named in the
        //   ring rule directly. `.dock-trigger` is NOT, and does not need to be: no
        //   element ever wears it alone. `DockTrigger.vue:42-49` builds the class list
        //   unconditionally as `dock-trigger` + (`dock-select-trigger` when
        //   `for="select"`, else `dock-dropdown-trigger`), so every `.dock-trigger`
        //   element carries a ringed companion BY CONSTRUCTION.
        //
        // [DISJOINT] Stronger than shadowing, and independent of specificity:
        //   `:not(:focus-visible)` makes the rule's match set provably disjoint from the
        //   ring's `:focus-visible` match set, so it cannot suppress the ring in any
        //   state at any weight. (The DEAD `box-shadow: none` halves that sat beside
        //   these two were a separate defect and were struck — see the source files.)
        //
        // [YIELD] The one suppressor that suppresses the ring ON PURPOSE, for a control
        //   hosting consumer indicator content; it names its own subject (arm below).
        expect(outlineNoneSites()).toEqual([
            /* SHADOWED */ `${STYLES}/controls/icon-button.css: .dock-icon-button`,
            /* DISJOINT */ `${STYLES}/controls/icon-button.css: .dock-icon-button:focus:not(:focus-visible)`,
            /* SHADOWED */ `${STYLES}/controls/tab-button.css: .dock-tab-button`,
            /* SHADOWED */ `${STYLES}/controls/triggers.css: .dock-trigger, .dock-select-trigger, .dock-dropdown-trigger`,
            /* DISJOINT */ `${STYLES}/controls/triggers.css: .dock-trigger:focus:not(:focus-visible), .dock-select-trigger:focus:not(:focus-visible), .dock-dropdown-trigger:focus:not(:focus-visible)`,
            /* YIELD    */ `${STYLES}/index.css: .glass-dock [data-ring-yield]:focus-visible`,
        ]);
    });

    /**
     * THE RESERVE MUST GROW THE BOX, AND ONLY `content-box` LETS IT.
     *
     * [2026-08-29 · BK π-RERUN-R2 · owner #47 W8 + W3] BORN-RED at `dfe6971f`: the
     * reserve shipped as `padding` + negative `margin` on the cross axis with NO
     * statement of the box model, and the re-capture measured it going backwards on the
     * two runs whose cross size is authored elsewhere — the sidebar run's margin box
     * SHRANK `40 → 32` (`content 32`, `scrollW 48`, `crossOverflow +8`) and the port cut
     * 4px off the SEAT, and horizontal `i=5` lost 8px of dock height (`56 → 48`). A
     * padding reserve inside a border box someone else has fixed eats the content box.
     *
     * WHAT THIS ARM PROVES AND WHAT IT CANNOT. The COLLISION is static text and is
     * proven here: which rules author a size on the run element, on which axis, and
     * whether the reserve states the box model that survives them. The GEOMETRY — that
     * the padding box actually grows, that `crossOverflow` reads 0, that both arcs of the
     * ring paint — is layout, which jsdom does not do; it is π's half, enqueued as
     * π-RERUN2-R2. Neither half is claimed for the other.
     */
    it("the ring reserve is stated in the box model that lets it exist", () => {
        const run = declarations(`${STYLES}/run.css`);

        // 1. THE BOX MODEL RIDES THE SAME SUBJECT AS THE RESERVE. Not `run.css` somewhere
        //    — the one rule that declares the pair. A `box-sizing` that drifted onto a
        //    different selector would leave the reserve exactly as defeated as it was.
        const reserveRules = [...run.matchAll(/\.glass-dock \.dock-run \{([^{}]*)\}/g)]
            .map((m) => m[1]!)
            .filter((body) => /padding-block:\s*var\(--dock-ring-reserve\)/.test(body));
        expect(reserveRules.length).toBe(1);
        expect(reserveRules[0]).toMatch(/box-sizing:\s*content-box/);
        expect(reserveRules[0]).toMatch(/margin-block:\s*calc\(-1 \* var\(--dock-ring-reserve\)\)/);

        // 2. ONE OWNER. The vertical rotation swaps the AXIS, not the box model; a
        //    restatement there is the two-owners defect the R1 cure struck in
        //    `shell-regions.css`, and a `border-box` restatement anywhere in the band
        //    silently restores the defect this arm exists for.
        expect(
            bandDeclSites(/^\s*box-sizing\s*:/).map(
                ({ file, chain, decl }) => `${file}: ${chain} { ${decl} }`,
            ),
        ).toEqual([`${STYLES}/run.css: .glass-dock .dock-run { box-sizing: content-box }`]);

        // 3. THE CENSUS THE BOX MODEL ANSWERS TO — every size declaration in the band
        //    whose subject is the run's own element (`dock-layer dock-layer--full
        //    dock-run`, GlassDock.vue:464). Two are PINS, and both land on a cross axis
        //    the reserve pads; three are FLOORS at zero, which release rather than fix.
        //    A sixth row arriving is a new size authority on this element, and whoever
        //    adds it has to say what it does to the reserve.
        const sized = bandDeclSites(/^\s*(min-|max-)?(width|height|inline-size|block-size)\s*:/)
            .filter(({ chain }) =>
                /\.dock-run(?![-\w])|\.dock-layer--full(?![-\w])|\.dock-layer(?![-\w])/.test(
                    chain.split(/\s+/).pop() ?? "",
                ),
            )
            .map(({ file, chain, decl }) => `${file}: ${chain} { ${decl} }`);
        expect(sized).toEqual([
            /* PIN   · a horizontal run's cross (block) axis */
            `${STYLES}/layers.css: .glass-dock:not(.vertical) .dock-layer { min-height: var(--dock-layer-height, 2.5rem) }`,
            /* PIN   · the vertical run's cross (inline) axis */
            `${STYLES}/layers.css: .glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100% }`,
            /* FLOOR · releases the flex/grid min-content floor on the scroll axis */
            `${STYLES}/run.css: .glass-dock .dock-run { min-inline-size: 0 }`,
            /* FLOOR · the same release, rotated */
            `${STYLES}/run.css: .glass-dock.vertical .dock-run { min-block-size: 0 }`,
            /* FLOOR · vertical layer stack */
            `${STYLES}/shell-regions.css: .glass-dock.vertical .dock-layer { min-width: 0 }`,
        ]);
    });

    /**
     * THE YIELD MUST NAME THE PROPERTY THE RING IS ON. When the ring moved to `outline`,
     * a yield still written as `box-shadow: none` would have suppressed nothing while
     * still deleting whatever elevation the control carried — a silent double miss.
     */
    it("the ring yield suppresses the ring that actually exists", () => {
        expect(declarations(`${STYLES}/index.css`)).toMatch(
            /\[data-ring-yield\]:focus-visible \{\s*outline:\s*none;\s*\}/,
        );
    });

    /**
     * THE CORNER HAS ONE ANIMATED OWNER, AND IT IS THE CUT CAP.
     *
     * BORN-RED at HEAD: `shape.css` LERPed `.glass-dock`'s `border-radius` between a
     * `--dock-shape-from`/`--dock-shape-to` pair on `--dock-expand-t`, and resolved a
     * `clip-path` from a `--dock-shape-clip-*` pair across two `[data-morphing]` forks.
     * Measured, the four tokens had ZERO setters: their only declarations in the repo
     * were density.css's own, assigning exactly the fallbacks the rules already read.
     * So the corner arithmetic was `r + (r − r)·t` — the identity at every t — and every
     * clip branch resolved `none`, the property's initial value.
     *
     * That is worse than dead code: it is a live-looking SECOND CLAIMANT on the dock's
     * corner, indistinguishable from a working parameter until someone sets a token and
     * discovers the design. W5's cut cap is the real animated corner (`.dock-plate`,
     * run.css, two rungs down the series on the edge that still hides content), and it
     * can only mean "there is more that way" if nothing else is moving a radius.
     *
     * The arm is a BICONDITIONAL over the band, the same shape as the pairing law: the
     * shell's resting corner is STATIC, and the ONLY `border-*radius` under an
     * `animation`/`@keyframes` in the whole band is the cap's. Re-introduce either half
     * — a token-driven lerp on the shell, or a second animated radius anywhere — and it
     * REDs.
     */
    it("the shell's corner is static and the cut cap is the band's only animated radius", () => {
        // 1. The four struck tokens are gone from every DECLARATION in the band. The
        //    strike prose naming them survives in `~~…~~` brackets, which `declarations`
        //    strips — a detector that could not tell those apart would RED the wave for
        //    doing exactly what the wave was asked to do.
        const resurrected = bandCss().filter(({ css }) => /--dock-shape-/.test(css));
        expect(resurrected.map(({ file }) => file)).toEqual([]);

        // 2. The shell's resting corner is one static token read, not a calc().
        expect(declarations(`${STYLES}/shape.css`)).toMatch(
            /\.glass-dock \{\s*border-radius:\s*var\(--radius-dock\);\s*\}/,
        );

        // 3. The band's ONLY keyframed radius is the cut cap's, on the plate.
        const keyframed = bandCss()
            .flatMap(({ file, css }) =>
                [...css.matchAll(/@keyframes\s+([\w-]+)\s*\{[\s\S]*?\n\}/g)].map((m) => ({
                    file,
                    name: m[1]!,
                    body: m[0],
                })),
            )
            .filter(({ body }) => /border-[\w-]*radius/.test(body));
        expect(keyframed.map(({ name }) => name).sort()).toEqual([
            "gl-dock-cap-block-end",
            "gl-dock-cap-block-start",
            "gl-dock-cap-inline-end",
            "gl-dock-cap-inline-start",
        ]);
        expect(new Set(keyframed.map(({ file }) => file))).toEqual(
            new Set([`${STYLES}/run.css`]),
        );
    });
});

describe("G-DOCK-PROPORTION — the run's gap is the run's own", () => {
    /**
     * THE SEAM, USED ONCE. W3 declared `--dock-run-gap` as a second name for a number
     * that was identical to `--dock-layer-gap` at the time; W9 is what the second name
     * was for. The family's gap spaces the persistent regions, the layer group, the
     * switcher and the stack — retuning IT to hit the lattice's proportion would move
     * all four to serve a number only the run's pitch cares about.
     *
     * The arm asserts the divergence is REAL (the run does not simply re-alias the
     * family token), because a re-alias would silently re-couple them on the next retune.
     */
    it("the run's gap is authored, not aliased to the family gap", () => {
        const run = declarations(`${STYLES}/run.css`);
        const gap = run.match(/--dock-run-gap:\s*([^;]+);/)![1]!.trim();
        expect(gap).not.toContain("--dock-layer-gap");
        expect(gap).toBe("0.5rem");
        // …and the value the run PAINTS is the same token P is computed from, so the
        // painted spacing and the lattice arithmetic cannot come apart.
        expect(run).toMatch(/\.dock-run \{[\s\S]*?gap:\s*var\(--dock-run-gap\)/);
    });
});

// ═════════════════════════════════════════════════════════════════════════════
// G-DOCK-STATE
// ═════════════════════════════════════════════════════════════════════════════

describe("G-DOCK-STATE — one selected seat, carried on at least two channels", () => {
    /**
     * ≥2 CARRIERS, ONE GEOMETRIC. Selection today is a 1.032:1 fill ratio — a single
     * channel, weaker than the container edge at 1.128:1, i.e. the dock's own border
     * out-signals its selected destination. The geometric carrier is the open seat's
     * width: `m·P − gap` against a closed seat's one pitch.
     *
     * GF-DOCK's stated mutation is `--dock-open-pitches: 1`, and it bites here directly:
     * at m=1 the open seat is `1·P − gap` = exactly a closed seat, the geometric carrier
     * vanishes, and the count drops to one.
     */
    it("the geometric carrier is real on both orientations", () => {
        const css = declarations(`${STYLES}/run.css`);
        const inline = Number(css.match(/\.glass-dock \{[\s\S]*?--dock-open-pitches:\s*(\d+)/)![1]);
        const block = Number(
            css.match(/\.glass-dock\.vertical \{[\s\S]*?--dock-open-pitches:\s*(\d+)/)![1],
        );
        expect(inline).toBeGreaterThanOrEqual(2);
        expect(block).toBeGreaterThanOrEqual(2);
        // …and the rail's m is SMALLER, deliberately: at m=3 a block-axis open seat is
        // 148px tall around a 24px glyph and an 11.5px label.
        expect(block).toBeLessThan(inline);
        expect(css).toMatch(/block-size:\s*var\(--dock-open-seat\)/);
    });

    /**
     * ONE PREDICATE FOR "WHICH SEAT IS OPEN", read the same way in both languages.
     * `aria-current` is the one expression of selection every arm of this tree agrees on
     * (GF-DOCK ratifies it over `role="tab"` for a dock whose seats are routes), and both
     * readers negate the false pole so any truthy token — `page`, `true`, `step` — counts.
     */
    it("selection is aria-current, negated the same way in CSS and JS", () => {
        expect(declarations(`${STYLES}/run.css`)).toContain(
            '[aria-current]:not([aria-current="false"])',
        );
        expect(read(`${DOCK}/composables/useDockRun.ts`)).toMatch(
            /current != null && current !== "false"/,
        );
        // No `role="tab"` anywhere: a route dock's seats are links, and tab semantics
        // promise a tabpanel relationship the dock does not have.
        expect(read(`${DOCK}/GlassDock.vue`)).not.toContain('role="tab"');
    });

    /**
     * ONE STATE EXPRESSION — **KNOWN RED, and recorded as one rather than omitted.**
     *
     * [2026-08-24 · BK #47 W2-W9] This arm belongs to **W1 SURFACE**, not to this unit.
     * GF-DOCK §4 charges W1 with replacing the four state classes and their 47 selectors
     * with `data-dock-state="collapsed|hover|pinned"`. W1 landed the PROP half (14→6,
     * asserted green in G-DOCK-BUDGET above) and did not land the ATTRIBUTE half:
     * `data-dock-state` exists nowhere in `src/`, and 20 state-class selectors remain
     * live across three partials (dock.css 3 · layers.css 4 · morph.css 13 — `shape.css`
     * and `shell.css` are ZERO), with one root still emitting `expanded pinned
     * always-expanded` together.
     *
     * [2026-08-25 · BK #47 W2-W9 CURE] THE FIGURE WAS 30-ACROSS-FIVE AND IT WAS WRONG.
     * The struck count came from a RAW-TEXT read; this arm's own method strips comments
     * first (`declarations()`), and the dock band strikes retired code IN PLACE inside
     * `~~…~~` brackets — so the raw count was scoring tombstones as live selectors,
     * which is the precise defect `declarations()` exists to prevent. Re-measured by the
     * arm's own method the census is 20 across three, and the two partials that dropped
     * out (`shape.css` 1, `shell.css` 2) had no live state selector at all. Broken out
     * by class: `.collapsed` 10 · `.expanded` 6 · `.always-expanded` 4 · `.pinned` 0.
     *
     * It is authored `it.fails` because the alternatives are both worse. Omitting the arm
     * would leave the seat ABSENT on its central invariant while the file above it reads
     * green — the "unwired gate is ABSENT, never GREEN" defect the register's own status
     * vocabulary (⊕²⁵) refuses. Weakening it to what the tree does today would ratify the
     * co-emission as the design. Landing the attribute is a W1 act on 20 selectors across
     * three partials, outside this unit's W2-W9 charter and outside its measured reach.
     *
     * WHEN W1's ATTRIBUTE HALF LANDS this test starts PASSING, which makes vitest RED on
     * the `it.fails` — that is the intended trigger, not a defect: the wave that cures it
     * flips this line to `it` in the same commit and the seat closes green.
     */
    it.fails("no state class survives in the dock band (W1 residue — see the docblock)", () => {
        const offenders = bandCss().flatMap(({ file, css }) =>
            [...css.matchAll(/\.(expanded|collapsed|pinned|always-expanded)\b/g)].map(
                (m) => `${file}: .${m[1]}`,
            ),
        );
        expect(offenders).toEqual([]);
    });
});
