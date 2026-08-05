// BK #27 W-ENGAGE-LADDER+AFFORD — breath of life, made checkable.
//
// ONE SEATED gate lives here — TR §B.5 MOTION family: `G-ENGAGE-RUNG` (+PRM arm,
// +field-well, +the #77 census as evidence table). Seats +0: nothing is minted, the
// seat name is carried in the `describe` titles the runner prints, which is the
// binding surface #65 reads at the band-close pass. The SEAT-BINDING.json entry is
// #65's cut (RT-27A below), exactly as #26's two gates were routed — so the register
// receipt is byte-identical across this landing.
//
// WHAT THIS FILE ASSERTS AND WHAT IT DELIBERATELY DOES NOT. `ENGAGE_LADDER` restates
// no figure from `springPresets.ts` or `engageEnvelopes.ts`, so the physics of a rung
// is already gated by `springTokenMirror` and `spring-authority`. Duplicating a settle
// or a τ here would be the duplicated-derived-data class this tranche strikes. What
// only THIS file can see is the RELATIONSHIP: that a rung's light clock comes from the
// register that owns light rather than from whatever generic duration was nearest,
// that the two channels' exit asymmetries are ruled rather than colliding, and that
// the shared interactive seat answers inside the budget it publishes.
//
// THE CENSUS ARM IS `it.fails`, AND THE LATCH IS THE POINT. G-ENGAGE-RUNG's seat text
// is a claim about all 63 components, and this cut builds the shared vocabulary rather
// than retrofitting 63 components — those are the component rows (#28/#29/#30,
// #79-#88, #31-#42). A latch that must be hand-flipped would be a second state to keep
// true; `it.fails` is self-flipping in the correct direction — the day the last
// component row lands its rung, this case FAILS with "expected to fail but passed" and
// forces the seat GREEN. The born-RED figures were measured on a pristine
// `git archive HEAD` tree (HEAD `c381cec2`, before any byte of this cut) and are
// banked at the row's RECORD.md §BORN-RED.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
    ENGAGE_LADDER,
    CHANNEL_BUDGET,
    HOVER_GEOMETRY_BUDGET,
    LADDER_EXIT_LAW,
    engageRung,
    rungsForEnvelope,
} from "@glass/composables/motion/engage/engageLadder";
import {
    ENGAGE_ENVELOPES,
    ENGAGE_ATTACK_CLASS,
    ACKNOWLEDGE_WINDOW_MS,
    engageAttackT90Ms,
} from "@glass/composables/motion/engage/engageEnvelopes";
import { SPRING_PRESETS } from "@glass/composables/motion/spring/springPresets";

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const REGISTERS = read("src/styles/tokens/motion-registers.css");
const BASE = read("src/styles/utilities/base.css");
const MENU = read("src/components/_shared/menu/menu.css");
const SCALES = read("src/styles/tokens/scale-paper.css");

/** Strip CSS comments so prose quoting a retired clock never scores as a live one. */
const decomment = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * The text from `open` through the `}` that closes the first `{` at or after it — real
 * containment, brace-matched. An `indexOf`-to-`indexOf` slice cannot tell "inside this
 * block" from "anywhere after it", which is how a guard wrapped around the wrong rule,
 * or a PRM arm read as running to EOF, stays green while asserting nothing.
 */
function braceBlock(css: string, open: number): string {
    if (open < 0) throw new Error("braceBlock: anchor not found");
    const start = css.indexOf("{", open);
    if (start < 0) throw new Error("braceBlock: no block opens after the anchor");
    let depth = 0;
    for (let i = start; i < css.length; i += 1) {
        if (css[i] === "{") depth += 1;
        else if (css[i] === "}" && (depth -= 1) === 0) return css.slice(open, i + 1);
    }
    throw new Error("braceBlock: unterminated block");
}

/** The `transition` shorthand value declared by the rule whose header is `rule`. */
function transitionOf(css: string, rule: string): string {
    const block = braceBlock(css, css.indexOf(rule));
    const declared = /(?:^|[{;])\s*transition:\s*([^;]+);/.exec(block);
    if (!declared) throw new Error(`no transition declaration in ${rule}`);
    return declared[1];
}

/** The property names a `transition` shorthand animates, in declaration order. */
const legs = (value: string): string[] =>
    value
        .split(",")
        .map((leg) => leg.trim().split(/\s+/)[0])
        .filter(Boolean);

const COMPONENTS = join(process.cwd(), "src", "components");

/** Every component directory at HEAD, `_shared` excluded (it is not a component). */
const COMPONENT_DIRS = readdirSync(COMPONENTS)
    .filter((entry) => entry !== "_shared")
    .filter((entry) => statSync(join(COMPONENTS, entry)).isDirectory());

function readDirText(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) readDirText(path, out);
        else if (/\.(css|vue|ts)$/.test(entry)) out.push(readFileSync(path, "utf8"));
    }
    return out;
}

/**
 * THE CENSUS DETECTOR, stated so the figure re-derives (the J-10 law). A component
 * implements a rung BEYOND hover when its own `*.vue|*.ts|*.css` bytes carry a press
 * (`:active`), a hold (`[data-held]`), an engagement (`data-engaged`), or when it
 * composes one of the two SHARED ladder recipes that carry those rungs from the token
 * set (`tap-squish` / `interactive-item`), or reads an `--engage-*` clock directly.
 * Hover alone never counts — the seat text says "beyond hover" and this is that word
 * made executable.
 *
 * `:active` MATCHES IN CSS PSEUDO-CLASS CONTEXT ONLY — the lookahead requires a
 * selector-continuation character after it. A bare `/:active/` scores a Vue prop
 * binding (`:active="isActive(…)"`) and a prose mention (`v-model:active`) as press
 * rungs, and both are sole-match false positives that inflate ADOPTION — the one
 * direction a born-RED census may never be wrong in.
 */
const RUNG_BEYOND_HOVER =
    /:active(?=[\s,){:.#[>+~])|\[data-held\]|data-engaged|tap-squish|interactive-item|--engage-/;

const withRung = COMPONENT_DIRS.filter((name) =>
    readDirText(join(COMPONENTS, name)).some((text) => RUNG_BEYOND_HOVER.test(text)),
);

describe("G-ENGAGE-RUNG — every interactive component implements a rung beyond hover", () => {
    // BORN-RED AND STILL RED. This is the seat's own claim and it is the honest state
    // of the library: the vocabulary now exists, the components have not adopted it.
    // `it.fails` flips the moment they do — see the header.
    it.fails("every component directory carries a rung beyond hover", () => {
        expect(withRung).toEqual(COMPONENT_DIRS);
    });

    it("the census is measurable, and its denominator is the directory count", () => {
        // No figure is frozen here — freezing "63" would be a second authority that
        // drifts the next time a component lands. What IS asserted is that the
        // detector discriminates.
        //
        // DISCRIMINATION IS ASSERTED ON THE DETECTOR, NOT ON THE CENSUS. Asserting
        // `withRung.length < COMPONENT_DIRS.length` reads as the same claim and is not:
        // it forbids the row's own GOAL state, so the day the last component row lands
        // its rung this plain `it` REDs the suite on success and the `it.fails` census
        // above can never self-flip. A gate may not make the win a failure.
        expect(COMPONENT_DIRS.length).toBeGreaterThan(0);
        expect(withRung.length).toBeGreaterThan(0);
        expect(withRung.length).toBeLessThanOrEqual(COMPONENT_DIRS.length);
        expect(RUNG_BEYOND_HOVER.test("<div class='x' @click='go'>hover only</div>")).toBe(
            false,
        );
        expect(RUNG_BEYOND_HOVER.test(':active="isActive(option.value)"')).toBe(false);
        expect(RUNG_BEYOND_HOVER.test(".x:active { scale: 1; }")).toBe(true);
    });

    it("the shared token set the seat refers to is REACHABLE, not notional", () => {
        // The seat says "from the shared token set". Before this cut there was no
        // shared token set for the light channel at all — the envelope table had zero
        // consumers of any kind — so the seat's own precondition was unmet and the
        // gate could not have gone green by any amount of component work.
        for (const row of ENGAGE_ENVELOPES) {
            expect(REGISTERS).toContain(`--engage-${row.role}-attack:`);
            expect(REGISTERS).toContain(`--engage-${row.role}-release:`);
        }
    });
});

describe("G-ENGAGE-RUNG · mirror arm — the CSS light clocks ARE the table", () => {
    it("every emitted --engage-* pair equals its row, verbatim", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(REGISTERS).toContain(
                `--engage-${row.role}-attack: ${row.attackMs}ms;`,
            );
            expect(REGISTERS).toContain(
                `--engage-${row.role}-release: ${row.releaseMs}ms;`,
            );
        }
    });

    it("emits exactly one pair per row and no orphan --engage-* token", () => {
        const emitted = [...decomment(REGISTERS).matchAll(/--engage-[a-z-]+:/g)].map(
            (m) => m[0],
        );
        expect(emitted).toHaveLength(ENGAGE_ENVELOPES.length * 2);
        expect(new Set(emitted).size).toBe(emitted.length);
    });

    it("the mirror REDS on drift — a hand-edited clock cannot survive", () => {
        // THE MUTATION BITE, and it must bite the MIRROR rather than the mutation. The
        // shape `expect(text.replace(X, X')).not.toContain(X)` asserts a property of
        // `String.prototype.replace` and is true for every input INCLUDING one where X
        // never occurred — rename the token in the CSS and it stays green while the
        // mirror it claims to protect is gone. So: prove the needle is live, then re-run
        // the mirror's OWN assertion against the mutated text and require it to fail.
        const row = ENGAGE_ENVELOPES[0];
        const live = `--engage-${row.role}-attack: ${row.attackMs}ms;`;
        expect(REGISTERS).toContain(live);

        const mutated = REGISTERS.replace(
            live,
            `--engage-${row.role}-attack: ${row.attackMs + 1}ms;`,
        );
        expect(() => {
            for (const candidate of ENGAGE_ENVELOPES) {
                expect(mutated).toContain(
                    `--engage-${candidate.role}-attack: ${candidate.attackMs}ms;`,
                );
                expect(mutated).toContain(
                    `--engage-${candidate.role}-release: ${candidate.releaseMs}ms;`,
                );
            }
        }).toThrow();
    });
});

describe("G-ENGAGE-RUNG · ladder arm — §4's checkable seven, given a subject", () => {
    it("carries exactly the five rungs of §4, in ascending engagement order", () => {
        expect(ENGAGE_LADDER.map((row) => row.rung)).toEqual([
            "rest",
            "hover",
            "press",
            "engaged",
            "modal",
        ]);
    });

    it("G2 SINGLE LEAD — every rung that ranks at all leads at rank 0, exactly once", () => {
        for (const row of ENGAGE_LADDER) {
            if (row.rung === "rest") expect(row.rank).toBeNull();
            else expect(row.rank).toBe(0);
        }
    });

    it("G3 CHANNEL BUDGET — no rung moves more than two channels", () => {
        for (const row of ENGAGE_LADDER) {
            expect(row.channels.length).toBeLessThanOrEqual(CHANNEL_BUDGET);
            expect(new Set(row.channels).size).toBe(row.channels.length);
        }
    });

    it("G6 ENGAGED SINGLETON — exactly one rung declares itself a singleton", () => {
        expect(ENGAGE_LADDER.filter((row) => row.singleton).map((row) => row.rung)).toEqual(
            ["engaged"],
        );
    });

    it("G7 HOVER GUARD — exactly one rung is pointer-fine, and it is hover", () => {
        expect(
            ENGAGE_LADDER.filter((row) => row.pointerFine).map((row) => row.rung),
        ).toEqual(["hover"]);
    });

    it("HOVER GEOMETRY BUDGET — the shipped hover scales sit inside the ladder's ceiling", () => {
        // §4 HOVER says "size ≤8%", and the ladder owns that ceiling rather than a
        // per-component token (DIVERGENCE 2 — `--scale-hover-btn` is #80's to mint, not
        // this row's). An exported constant nothing imports is a ruling with no
        // detector: `--scale-hover` could drift past it with every oracle green.
        const declared = [
            ...decomment(SCALES).matchAll(/(--scale-hover[a-z-]*):\s*([\d.]+)/g),
        ].map((m) => ({ token: m[1], value: Number(m[2]) }));
        expect(declared.length).toBeGreaterThan(0);

        const canonical = declared.find((row) => row.token === "--scale-hover");
        expect(canonical).toBeDefined();
        expect(canonical!.value).toBeLessThanOrEqual(HOVER_GEOMETRY_BUDGET);

        // Exactly one token exceeds the ceiling and it is the dock's own — NAMED, so a
        // new exceedance REDs here instead of joining an unbounded set. The dock rows
        // own that token; the ladder owns the ceiling it is measured against.
        expect(
            declared.filter((row) => row.value > HOVER_GEOMETRY_BUDGET).map((r) => r.token),
        ).toEqual(["--scale-hover-dock"]);
    });

    it("the ladder MINTS nothing — every cited row exists in its own root", () => {
        const springs = new Set(SPRING_PRESETS.map((row) => row.name));
        const envelopes = new Set(ENGAGE_ENVELOPES.map((row) => row.role));
        for (const row of ENGAGE_LADDER) {
            if (row.spring) expect(springs.has(row.spring)).toBe(true);
            if (row.envelope) expect(envelopes.has(row.envelope)).toBe(true);
        }
    });

    it("no graved spring name survives in the ladder", () => {
        // §4's MODAL rung named `--spring-transient`, which #26 retired. A ladder that
        // quietly kept the grave would re-point a live rung at a token that resolves
        // to nothing — the silent-no-op class.
        const cited = ENGAGE_LADDER.map((row) => row.spring).filter(Boolean);
        for (const grave of ["smooth", "snappy", "bouncy", "gentle", "orb-drop", "transient"]) {
            expect(cited).not.toContain(grave);
        }
    });

    it("lookup throws on an unknown rung rather than returning a default", () => {
        expect(() => engageRung("floating" as never)).toThrow(/Unknown engage rung/);
    });

    it("the reverse index agrees with the table", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(rungsForEnvelope(row.role).every((r) => r.envelope === row.role)).toBe(
                true,
            );
        }
        expect(rungsForEnvelope("control-engage").map((r) => r.rung)).toEqual([
            "hover",
            "engaged",
        ]);
    });
});

describe("G-ENGAGE-RUNG · acknowledge arm — a rung answers inside its own budget", () => {
    it("G1 ACKNOWLEDGE — every laddered envelope's t90 lands inside the window", () => {
        for (const row of ENGAGE_LADDER) {
            if (!row.envelope) continue;
            expect(engageAttackT90Ms(row.envelope)).toBeLessThanOrEqual(
                ACKNOWLEDGE_WINDOW_MS,
            );
        }
    });

    it("every attack sits inside the shared acknowledge class band", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(row.attackMs).toBeGreaterThanOrEqual(ENGAGE_ATTACK_CLASS.minMs);
            expect(row.attackMs).toBeLessThanOrEqual(ENGAGE_ATTACK_CLASS.maxMs);
        }
    });

    it("the shared interactive seat no longer runs its light on a generic duration", () => {
        // THE DEFECT THIS ROW CURED, held as a regression lock. `.interactive-item` and
        // `.tap-squish` are the two recipes most of the library composes; both ran
        // every light leg on `--duration-fast` (0.2s) while publishing a 150ms
        // acknowledge budget, so the shared answer sat outside its own budget
        // everywhere it painted.
        const base = decomment(BASE);
        for (const rule of [".interactive-item {", ".tap-squish {"]) {
            const block = braceBlock(base, base.indexOf(rule));
            expect(block).toContain("--engage-control-engage-release");
            expect(block).not.toContain("background-color var(--duration-fast)");
        }
    });

    it("the asymmetry is carried by which rule owns which clock", () => {
        const base = decomment(BASE);
        // The hover rule lands the ATTACK, the base rule lands the RELEASE — a
        // transition reads its clock from the state it lands IN.
        const hover = braceBlock(base, base.indexOf(".interactive-item:hover {"));
        expect(hover).toContain("--engage-control-engage-attack");
        expect(hover).not.toContain("--engage-control-engage-release");
    });

    it("the menu row carries the shared recipe's WHOLE leg set — the cascade drops none", () => {
        // THE SEAM THIS ROW'S CURE LIVES OR DIES AT. `.glass-menu-row` and
        // `.interactive-item` share a layer and a 0-1-0 specificity, and menu.css is
        // imported LAST by the documented design at styles/index.css — so on the six
        // shipped rows that compose both (menuRowClass.ts, the four DropdownMenu items,
        // CommandItem) the menu row's `transition` SHORTHAND is the list that paints. A
        // leg declared in base.css and absent there has ZERO frames, whatever the
        // re-point above says, and no string check on base.css alone can see it.
        const menu = decomment(MENU);
        const base = decomment(BASE);
        const shared = legs(transitionOf(base, ".interactive-item {"));
        expect(shared).toContain("background-color");

        for (const rule of [
            ".glass-menu-row {",
            ".glass-menu-row:hover:not([data-disabled]) {",
        ]) {
            const carried = legs(transitionOf(menu, rule));
            for (const leg of shared) expect(carried).toContain(leg);
            // And the row's OWN spatial leg, which the shared recipe knows nothing
            // about: the -1px lift must EASE in, not snap in and ease out.
            expect(carried).toContain("translate");
        }

        // Attack on the state it lands IN, release on the rule it rests in — the same
        // law base.css follows, restated where the cascade actually resolves it.
        expect(transitionOf(menu, ".glass-menu-row {")).toContain(
            "--engage-control-engage-release",
        );
        expect(
            transitionOf(menu, ".glass-menu-row:hover:not([data-disabled]) {"),
        ).toContain("--engage-control-engage-attack");
    });

    it("LIGHT and GEOMETRY exit in OPPOSITE directions, and both are ruled", () => {
        // The two roots disagree by charter and the ladder is where that is settled.
        // Asserting it keeps a later gate from "fixing" the envelope table to match
        // the spring table's direction, which would delete the drain.
        expect(LADDER_EXIT_LAW.geometry).toBe("faster-than-entry");
        expect(LADDER_EXIT_LAW.light).toBe("slower-than-entry");
        for (const row of ENGAGE_ENVELOPES) {
            expect(row.releaseMs).toBeGreaterThan(row.attackMs);
        }
    });
});

describe("G-ENGAGE-RUNG · PRM arm — every rung has a reduced-motion terminal parity", () => {
    it("the shared press rung retires its transform and keeps its light", () => {
        // TERMINAL PARITY, precisely: under PRM the press still ARRIVES at its pressed
        // state — the acknowledgement becomes the light channel alone rather than the
        // squish. The bound that actually holds here is stated at the recipe: the press
        // has no `:active` light clock of its own, so its answer runs on the RELEASE
        // leg, which is deliberately OUTSIDE the acknowledge window. Wiring the press
        // envelope to close that is the press row's cut, not this one's.
        const base = decomment(BASE);
        const prm = braceBlock(base, base.indexOf("@media (prefers-reduced-motion: reduce)"));
        expect(prm).toContain(".tap-squish:not([data-press-armed]):active");
        expect(prm).toContain("scale: 1;");
    });

    it("the PRM arm retires the SPATIAL leg and nothing else", () => {
        // A PRM arm that also reset a light property, or the transition itself, would
        // leave a reduced-motion user with NO acknowledgement at all — suppressing
        // motion may not remove the state report. (The no-resurrection direction is
        // gated separately by `prm-no-resurrection.test.ts`; this is no-erasure.)
        //
        // The slice is BRACE-MATCHED, not run to EOF, and the assertion is one that can
        // actually fire: `not.toContain("background-color: none")` names a string that
        // is not valid CSS and appears nowhere, so it holds for every possible file.
        const base = decomment(BASE);
        const prm = braceBlock(base, base.indexOf("@media (prefers-reduced-motion: reduce)"));
        const touched = [...prm.matchAll(/(?:^|[{;])\s*([a-z][a-z-]*)\s*:/g)].map((m) => m[1]);
        expect(touched.length).toBeGreaterThan(0);
        for (const property of touched) expect(property).toBe("scale");
    });

    it("the pointer-fine rung is guarded at BOTH shared seats, by containment", () => {
        // G7 at the ladder's own recipe AND at the menu row that outranks it. An
        // ordering check ("the guard appears before the rung") stays green when the
        // guard wraps something else entirely, so both arms are brace-matched.
        const base = decomment(BASE);
        const guarded = braceBlock(base, base.indexOf("@media (hover: hover)"));
        expect(guarded).toContain(".interactive-item:hover");

        // The menu row is the rule that actually paints the hover fill and lift on all
        // six consumers (0-3-0, later import). Left unguarded, the coarse-pointer latch
        // the base.css guard exists to prevent stays fully live, and NONE of the six
        // composes `.tap-squish`, so the press rung is not their touch answer either.
        const menu = decomment(MENU);
        const menuGuard = braceBlock(menu, menu.indexOf("@media (hover: hover)"));
        expect(menuGuard).toContain(".glass-menu-row:hover");
        expect(menu.replace(menuGuard, "")).not.toContain(".glass-menu-row:hover");
        // Its touch answer survives the guard: reka SETS AND CLEARS `data-highlighted`,
        // so a tap gets the fill and cannot keep it.
        expect(menu).toContain(".glass-menu-row[data-highlighted]:not([data-disabled])");
    });

    it("the menu row's PRM arm retires the spatial legs and keeps the light", () => {
        // Same no-erasure direction as the shared seat. A bare `transition: none` here
        // kills the light legs this row just gave the menu row — the state report and
        // the motion are not the same thing.
        const menu = decomment(MENU);
        const prm = braceBlock(menu, menu.indexOf("@media (prefers-reduced-motion: reduce)"));
        expect(prm).not.toMatch(/transition:\s*none/);
        const carried = legs(transitionOf(prm, ".glass-menu-row {"));
        expect(carried).toContain("background-color");
        expect(carried).not.toContain("translate");
    });
});
