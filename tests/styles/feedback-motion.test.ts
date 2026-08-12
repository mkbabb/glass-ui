import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

// BK #28 W-FEEDBACK-MOTION — the close battery.
//
// SEATS +0. TERMINAL-ROSTER #28 ⊕⁵ rules WAVES:648's "Owns: G-3" a band-era id
// CONVICTED by G-DETECTOR-BLIND, so this wave owns no seat and these assertions file
// as close-battery rows against the SEATED MOTION family (`G-SPRING-ONE-JOB` and its
// clock-fence arm, `G-ENGAGE-RUNG`) per §B.5. The seat BIND is routed to #65 exactly
// as #23's `G-RADIUS-ROLE` executable was — authored here, bound there — so the
// register receipt stays byte-identical at `bound:8 unbound:50 violations:0`.
//
// BORN-RED, MEASURED, AND NOT OVERSTATED. On a pristine `git archive HEAD` tree:
//   · the retired-spinner census is RED at **2** files — `InfiniteScroll.vue` and
//     `EasingPicker.vue` — and GREEN at 0 in this cut;
//   · the eighteen dot-ring cases are RED on an ABSENT subject: `_shared/feedback/`
//     held `feedback-tone.css` and nothing else, so the register they read did not
//     exist. That is the honest form of born-RED for a register, and it is weaker
//     than a failing assertion — it is recorded as absent-subject, never counted as
//     eighteen independent reds;
//   · the ripple/splash lock is **NOT born-RED**: both detectors already read 0 at
//     HEAD. It is a KEEP-DEAD regression lock on a refusal, and saying otherwise
//     would be the inflation class this tranche keeps striking.
// Reproduction + the mutation battery are in the row's RECORD.md.

const SRC = resolve(process.cwd(), "src");
const REGISTER_PATH = resolve(SRC, "components/_shared/feedback/dot-ring.css");
const REGISTER = readFileSync(REGISTER_PATH, "utf8");
const COMPONENT = readFileSync(
    resolve(SRC, "components/_shared/feedback/DotRing.vue"),
    "utf8",
);
const MOTION_TOKENS = readFileSync(
    resolve(SRC, "styles/tokens/scheme-motion.css"),
    "utf8",
);
const PROPERTY_REGS = readFileSync(
    resolve(SRC, "styles/tokens/property-regs.css"),
    "utf8",
);
const STYLE_ENTRY = readFileSync(resolve(SRC, "styles/index.css"), "utf8");

/** The register with every comment removed — comments quote figures on purpose. */
const REGISTER_RULES = REGISTER.replace(/\/\*[\s\S]*?\*\//g, "");

/** The ROOT `.glass-dot-ring-leave-active` block — the arm Vue can actually measure. */
const LEAVE_ROOT_ARM =
    /\.glass-dot-ring-leave-active\s*\{([\s\S]*?)\}/.exec(REGISTER_RULES)?.[1] ?? "";
/** The descendant `.glass-dot-ring-leave-active .glass-dot-ring` block — the draw-home. */
const LEAVE_RING_ARM =
    /\.glass-dot-ring-leave-active \.glass-dot-ring\s*\{([\s\S]*?)\}/.exec(
        REGISTER_RULES,
    )?.[1] ?? "";
/** The host block, up to the first close brace — the entry arm. */
const HOST_ARM =
    /\.glass-dot-ring\s*\{([\s\S]*?)\n {4}\}/.exec(REGISTER_RULES)?.[1] ?? "";

const PHI = (1 + Math.sqrt(5)) / 2;
const BEADS = 7;

/** The inequality depth as SHIPPED — read off the register, never remembered. */
function shippedInequality(): number {
    const hit = /--dot-ring-inequality:\s*([0-9.]+)\s*;/.exec(REGISTER_RULES);
    expect(hit, "the register declares --dot-ring-inequality").not.toBeNull();
    return Number(hit![1]);
}

describe("dot-ring — the conserved luminous mass (BK #28 · EXEMPLARS-CODEX §B3)", () => {
    // THE HEADLINE LAW. B3: "the same luminous mass is impact flash, then pilot light,
    // then spinner — NOTHING CREATED, NOTHING DESTROYED." The register expresses it as
    // an identity rather than as a timing: bead k's radius scales as
    // sqrt(1 + c·cos(φ + k·2π/7)), so total area goes as Σ(1 + c·cos(...)) = 7 + c·0,
    // the seven unit vectors at the 7th roots of unity summing to zero for EVERY φ.
    //
    // Two halves, and both are needed. The numeric identity alone is vacuous — it holds
    // for any c — so the FORM is asserted first: it is the `1 + c·cos` envelope that
    // makes the sum collapse, and squaring it, or windowing it, or dropping a bead
    // breaks conservation without touching c.
    it("ships the sqrt(1 + c·e·cos(phase + k·pitch)) envelope, on the phase and the seat index", () => {
        const scale = /scale:\s*calc\(([\s\S]*?)\n {8}\);/.exec(REGISTER_RULES)?.[1] ?? "";
        expect(scale).toMatch(/sqrt\(/);
        expect(scale).toMatch(/var\(--dot-ring-inequality\)/);
        expect(scale).toMatch(/cos\(/);
        expect(scale).toMatch(/var\(--dot-ring-phase\)/);
        expect(scale).toMatch(/var\(--dot-ring-k\)\s*\*\s*\(1turn\s*\/\s*7\)/);
        // No second power, no clamp, no min/max: an envelope that is floored or
        // squared no longer sums to the bead count and the mass leaks.
        expect(scale).not.toMatch(/\b(clamp|min|max|pow)\(/);
    });

    it("conserves total area at EVERY phase — Σ(1 + c·cos(φ + 2πk/7)) = 7 exactly", () => {
        const c = shippedInequality();
        for (let step = 0; step < 360; step += 1) {
            const phase = (step * Math.PI) / 180;
            let sum = 0;
            for (let k = 0; k < BEADS; k += 1) {
                sum += 1 + c * Math.cos(phase + (k * 2 * Math.PI) / BEADS);
            }
            expect(sum).toBeCloseTo(BEADS, 10);
        }
    });

    it("bites: drop one bead, or square the envelope, and the mass stops being conserved", () => {
        const c = shippedInequality();
        const total = (n: number, envelope: (x: number) => number, phase: number) => {
            let sum = 0;
            for (let k = 0; k < n; k += 1) {
                sum += envelope(phase + (k * 2 * Math.PI) / n);
            }
            return sum;
        };
        const linear = (x: number) => 1 + c * Math.cos(x);
        const squared = (x: number) => (1 + c * Math.cos(x)) ** 2;
        // Six beads still sum to their own count (any regular n does) — so the mutation
        // that matters is the ENVELOPE, and it must move the sum off the count.
        expect(total(BEADS, squared, 0.7)).not.toBeCloseTo(BEADS, 6);
        // …and the seat count in the component must match the count the register's
        // pitch divides the circle by, or the beads are not at the roots of unity.
        const seats = /const BEAD_SEATS = \[([^\]]*)\]/.exec(COMPONENT)?.[1] ?? "";
        expect(seats.split(",").filter((s) => s.trim().length > 0)).toHaveLength(BEADS);
        expect(REGISTER_RULES).toMatch(/sin\(180deg\s*\/\s*7\)/);
        expect(total(BEADS, linear, 1.9)).toBeCloseTo(BEADS, 10);
    });

    it("conserves across the FISSION too — the extent gates the inequality, so the fused dot IS the ring's total", () => {
        // Two shipped bytes carry this, and both are read off the register rather than
        // remembered. FIRST the swell: at extent 0 the beads are coincident, so their
        // union is ONE disc, and one disc of radius s·r̄ has the area of BEADS discs of
        // radius r̄ only when s² = BEADS. That is the whole of why it is sqrt(7).
        const swellHit =
            /\(1 \+ \(sqrt\((\d+(?:\.\d+)?)\) - 1\) \* \(1 - var\(--dot-ring-extent\)\)\)/.exec(
                REGISTER_RULES,
            );
        expect(swellHit, "the register declares the sqrt(BEADS) fusion swell").not.toBeNull();
        const swell = Math.sqrt(Number(swellHit![1]));
        expect(swell ** 2).toBeCloseTo(BEADS, 10);

        // SECOND the gate. Coincident is not enough — coincident and UNEQUAL leaves the
        // union as the largest bead alone. The extent therefore rides INSIDE the sqrt,
        // multiplying the inequality, so at extent 0 all seven are the same size.
        const scale = /scale:\s*calc\(([\s\S]*?)\n {8}\);/.exec(REGISTER_RULES)?.[1] ?? "";
        expect(scale).toMatch(
            /var\(--dot-ring-inequality\)\s*\*\s*var\(--dot-ring-extent\)\s*\*\s*cos\(/,
        );

        // What the gate buys, at the SHIPPED depth, in bead-mean units: the fused union
        // equals the open ring's total at every phase — and the ungated form never does.
        const c = shippedInequality();
        const seats = Array.from({ length: BEADS }, (_, k) => k);
        const envelope = (extent: number, phase: number, k: number) =>
            1 + c * extent * Math.cos(phase + (k * 2 * Math.PI) / BEADS);
        for (let step = 0; step < 360; step += 1) {
            const phase = (step * Math.PI) / 180;
            const total = seats.reduce((sum, k) => sum + envelope(1, phase, k), 0);
            const fused = swell ** 2 * Math.max(...seats.map((k) => envelope(0, phase, k)));
            expect(fused).toBeCloseTo(total, 10);
            // Ungated (the extent dropped from inside the sqrt) the same union is
            // (1 + c·cos_max(φ))× the total — over by 21% and swinging with the phase.
            const ungated = swell ** 2 * Math.max(...seats.map((k) => envelope(1, phase, k)));
            expect(ungated / total).toBeGreaterThan(1.2);
        }

        // The OPEN end is a union, not a sum: tangency is pinned at MEAN size, so a
        // super-mean bead overlaps its neighbours and the open union runs a little under
        // the total (measured live at the row's RECORD §2.2). The conserved quantity the
        // register carries is the TOTAL, which is exact; the overlap is counted once.
    });
});

describe("dot-ring — the inequality is the house proportion, not a taste figure", () => {
    it("sets c = (φ−1)/(φ+1): the largest bead's AREA is φ× the smallest's", () => {
        const c = shippedInequality();
        expect(c).toBeCloseTo((PHI - 1) / (PHI + 1), 9);
        // area ratio = (1+c)/(1−c) = φ
        expect((1 + c) / (1 - c)).toBeCloseTo(PHI, 9);
        // …so the DIAMETER ratio is sqrt(φ) = 1.272, the sqrt-phi constant the overlay
        // padding ladder already rides.
        expect(Math.sqrt((1 + c) / (1 - c))).toBeCloseTo(1.272, 3);
    });

    it("derives the hue advance from the pitch and the inequality — no minted hue figure", () => {
        expect(REGISTER_RULES).toMatch(
            /calc\(h \+ var\(--dot-ring-k\) \* \(360 \/ 7\) \* var\(--dot-ring-inequality\)\)/,
        );
    });

    it("keeps the relative-colour hue advance UNITLESS — `calc(h + Ndeg)` is a type error", () => {
        // The register's first paint declared `calc(h + …deg)`. Relative-colour `h`
        // resolves to a <number> of degrees, so adding an <angle> invalidates the whole
        // declaration and every bead computed `rgba(0, 0, 0, 0)` — an invisible
        // indicator, which is the masking class exactly. Verified in live Chromium:
        // `oklch(from red l c calc(h + 12deg))` → rgba(0,0,0,0);
        // `oklch(from red l c calc(h + 12))`    → oklch(0.627966 0.257704 41.2346).
        const hue = /calc\(h \+[^)]*\)/.exec(REGISTER_RULES)?.[0] ?? "";
        expect(hue).not.toBe("");
        expect(hue).not.toMatch(/deg|turn|rad|grad/);
    });
});

describe("dot-ring — every clock is a named row (MOTION · G-SPRING-ONE-JOB clock-fence)", () => {
    it("carries no bare time literal — the register names tokens and nothing else", () => {
        const times = REGISTER_RULES.match(/(?<![\w-])\d+(\.\d+)?m?s(?![\w-])/g) ?? [];
        expect(times).toEqual([]);
    });

    it("enters on `dock` and exits on `dock`'s OWN exit reader (BK #26's law)", () => {
        expect(HOST_ARM).toMatch(/--dot-ring-extent var\(--spring-dock-duration\) var\(--spring-dock\)/);
        expect(LEAVE_RING_ARM).toMatch(/--dot-ring-extent var\(--spring-dock-exit-duration\)/);
    });

    it("gives the transition ROOT a clock — Vue measures the leave on the element itself", () => {
        // The consumer wraps the ROW that holds the ring, so the leave classes land on
        // an ancestor. Vue's `whenTransitionEnds` reads `getTransitionInfo(el)` off that
        // element ALONE and resolves immediately when it declares no transition — a
        // clock that lives only on the descendant is a clock Vue cannot see, and the row
        // is removed about two frames after the class lands. The root arm is therefore
        // load-bearing, not decoration: without it the re-fusion never paints.
        expect(LEAVE_ROOT_ARM, "the register declares a root-level leave-active arm").not.toBe(
            "",
        );
        expect(LEAVE_ROOT_ARM).toMatch(
            /transition: opacity var\(--spring-dock-exit-duration\) var\(--exit-curve\)/,
        );
        // The root is the arm that fades; the ring's own arm carries only the draw-home,
        // or the two opacity legs would multiply into a squared fade.
        expect(LEAVE_RING_ARM).not.toMatch(/opacity/);
    });

    it("exits on a bezier, never a spring — MOTION-CANON §7", () => {
        for (const arm of [LEAVE_ROOT_ARM, LEAVE_RING_ARM]) {
            expect(arm).toMatch(/var\(--exit-curve\)/);
            expect(arm).not.toMatch(/var\(--spring-[a-z]+\)/);
        }
    });

    it("rides the AMBIENT rung for its sustained loop — §4 REST bounds it at period ≥1s", () => {
        expect(REGISTER_RULES).toMatch(/--dot-ring-spin:\s*var\(--duration-xl\)/);
        const declared = /--duration-xl:\s*([0-9.]+)s\s*;/.exec(MOTION_TOKENS);
        expect(declared, "scheme-motion.css declares --duration-xl").not.toBeNull();
        expect(Number(declared![1])).toBeGreaterThanOrEqual(1);
    });

    it("sweeps the phase LINEARLY — an eased rotation reports a beginning and an end", () => {
        expect(REGISTER_RULES).toMatch(
            /animation: glass-dot-ring-redistribute var\(--dot-ring-spin\) linear infinite/,
        );
    });
});

describe("dot-ring — the fences it was built inside", () => {
    it("is FILTER-FREE — MOTION-CANON §8 names `filter: url()` FORBIDDEN for new primitives", () => {
        expect(REGISTER_RULES).not.toMatch(/(?<!backdrop-)filter\s*:/);
    });

    it("moves only `scale` and `translate` longhands — §8's safest channel", () => {
        // `rotate` seats the spoke once and never animates; nothing here writes
        // `transform`, whose composition order would scale the ring radius itself.
        expect(REGISTER_RULES).not.toMatch(/\btransform\s*:/);
    });

    it("registers both driven properties — an unregistered custom property jumps", () => {
        expect(PROPERTY_REGS).toMatch(
            /@property --dot-ring-phase \{\s*syntax: "<angle>";\s*inherits: true;/,
        );
        expect(PROPERTY_REGS).toMatch(
            /@property --dot-ring-extent \{\s*syntax: "<number>";\s*inherits: true;/,
        );
    });

    it("carries a prefers-reduced-motion arm that parks the loop and KEEPS the report", () => {
        const prm =
            /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n {4}\}/.exec(
                REGISTER_RULES,
            )?.[1] ?? "";
        expect(prm).toMatch(/animation: none/);
        // Parking is not hiding: a reduced-motion arm that removes the ring removes the
        // state report with it.
        expect(prm).not.toMatch(/display:\s*none|visibility:\s*hidden|opacity:\s*0/);
    });

    it("silences the LEAVE arms under reduced motion — a media query carries no specificity", () => {
        // `@media` adds no weight, so the PRM block's `.glass-dot-ring` arm (0,1,0),
        // which matches the RING, cannot reach the leave arms: they match the WRAPPER at
        // (0,1,0) and the ring at (0,2,0) in this same layer. Each has to be silenced on
        // a selector that ties it, and the block has to sit LATER in the file to win the
        // tie. Reading the PRM block's own text is not enough to see that — this arm
        // checks the form and the order.
        const prmAt = REGISTER_RULES.indexOf("@media (prefers-reduced-motion: reduce)");
        expect(prmAt).toBeGreaterThan(-1);
        const prm =
            /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n {4}\}/.exec(
                REGISTER_RULES,
            )?.[1] ?? "";
        expect(prm).toMatch(
            /\.glass-dot-ring-leave-active,\s*\.glass-dot-ring-leave-active \.glass-dot-ring\s*\{\s*transition: none;/,
        );
        expect(prmAt).toBeGreaterThan(
            REGISTER_RULES.indexOf(".glass-dot-ring-leave-active .glass-dot-ring"),
        );
    });

    it("is reached by the shipped stylesheet — a register nothing imports paints nothing", () => {
        expect(STYLE_ENTRY).toContain(
            '@import "../components/_shared/feedback/dot-ring.css";',
        );
    });

    it("sizes itself from its own box — one length token, the icon rung, and no pixels", () => {
        const lengths = REGISTER_RULES.match(/(?<![\w-])\d+(\.\d+)?(px|rem|em)(?![\w-])/g) ?? [];
        expect(lengths).toEqual([]);
        expect(REGISTER_RULES).toMatch(/inline-size: var\(--icon-lg\)/);
    });
});

describe("#28's two refusals, made standing locks", () => {
    it("retires the borrowed rotating-C spinner from src/ entirely", () => {
        // BORN-RED at 2: `InfiniteScroll.vue`'s `animate-spin … border-t-transparent`
        // and `EasingPicker.vue`'s rotating `LoaderCircle` glyph. A rotating C-shape is
        // the one loading idiom every framework ships and says nothing about this
        // library's material — EXEMPLARS-CODEX's design-language law forbids keeping it.
        const hits = grepSrc(/animate-spin/);
        expect(hits).toEqual([]);
    });

    it("REFUSES ripple/splash — the press answer is already owned (the decide row)", () => {
        // TERMINAL-ROSTER #28 carries the "ripple/splash decide row" routed from the
        // jubilance residue (RECONCILIATION §8-9 row 13: "genuinely unowned: haptics and
        // ripple/splash"). DECIDED: REFUSED, on three grounds recorded at the row —
        // (1) MOTION-CANON §4 PRESS already owns the press answer (`--scale-press` +
        // the `press-drain` envelope), so a ripple is a second authority over one fact;
        // (2) an expanding ink circle is Material Design's signature, which is the same
        // borrowed-signature objection §9.7 sustains against the halftone; (3) the
        // typed `--ripple-radius` was retired with the disco recipe family and took
        // zero consumers with it. This case is the lock that keeps it dead.
        //
        // [2026-08-10 · BK #17 W-COMMENT-DIET] The third assertion USED TO PIN THE
        // OBITUARY — `toMatch(/--ripple-radius — gone with the disco recipe/)` against
        // `property-regs.css`'s prose. A detector whose evidence is a sentence is the
        // exact inverse of `G-DETECTOR-BLIND`: it reads a comment as a fact, so it
        // greens on prose and REDs when prose is edited, which is what happened here.
        // It is re-homed onto the code fact it was standing in for. Strictly stronger:
        // `--ripple-radius\s*:` above cannot see a `@property --ripple-radius {`
        // registration, which is the form the token would actually return in.
        expect(grepSrc(/--ripple-radius\s*:/)).toEqual([]);
        expect(grepSrc(/@keyframes\s+[\w-]*(ripple|splash)/i)).toEqual([]);
        expect(PROPERTY_REGS).not.toMatch(/@property\s+--ripple-radius\b/);
        expect(grepSrc(/@property\s+--ripple-radius\b/)).toEqual([]);
    });
});

/**
 * Every `src/` file whose LIVE bytes match — the detector, stated once.
 *
 * [2026-08-10 · BK #17] COMMENT-BLIND, and that is `G-DETECTOR-BLIND` applied to this
 * file's own detector rather than asserted about someone else's. A raw `grep` over
 * source counts a mention inside a comment as a live declaration — `scheme-motion.css`
 * names `@property --ripple-radius` in an obituary, and the un-stripped form convicted
 * the corpus of carrying a registration that does not exist. Every case here asks "is
 * this thing DECLARED", so every case must read declarations only.
 */
function grepSrc(pattern: RegExp): string[] {
    const { execFileSync } = require("node:child_process") as typeof import("node:child_process");
    // `/usr/bin/grep` is PINNED, not `grep`: the login shell aliases it to `ugrep`,
    // whose flag semantics differ — #26 lost three seats to exactly that drift. `-e`
    // is mandatory, or a pattern that opens with `-` is read as a flag.
    let out = "";
    try {
        out = execFileSync(
            "/usr/bin/grep",
            ["-rlE", "-e", pattern.source, "src"],
            { cwd: process.cwd(), encoding: "utf8", env: { ...process.env, LC_ALL: "C" } },
        ).trim();
    } catch (error) {
        // grep exits 1 on "no match" — the expected clean case, not a failure.
        const status = (error as { status?: number }).status;
        if (status !== 1) throw error;
    }
    if (out === "") return [];
    // grep names the CANDIDATES cheaply; the verdict is taken on comment-stripped
    // bytes, so a file that only ever mentions the pattern in prose drops out.
    const { readFileSync } = require("node:fs") as typeof import("node:fs");
    return out.split("\n").filter((file) => {
        const live = readFileSync(file, "utf8")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
        return new RegExp(pattern.source, pattern.flags.replace("g", "")).test(live);
    });
}
