// BK #26 W-SPRING-RETUNE — the ONE spring authority.
//
// Two SEATED gates live here, plus the clock-fence ARM that rides the second
// (TR §B.5 MOTION family: `G-SPRING-HONEST` · `G-SPRING-ONE-JOB` (+clock-fence arm,
// ⊕⁴ U-39)). Seats +0 — nothing is minted here; the seat names are carried in the
// `describe` titles the runner prints, which is the binding surface #65 reads.
//
// WHY THESE TWO AND NOT MORE. The register's figures are already gated by
// `tests/composables/motion/springTokenMirror.test.ts` (the generator is a fixed point
// on the committed CSS, and the mirror is its output byte-for-byte). Restating a
// settle or a peak here would be the duplicated-derived-data class this tranche
// strikes, so this file asserts only what THAT gate cannot see: the relationship
// between a row's PHYSICS and the words beside it, the one-job partition of the
// table, and the pairing of a curve with a clock.
//
// BORN-RED, MEASURED — not asserted. Every arm here was run against a pristine
// `git archive HEAD` tree (HEAD `bd68705b`, before any byte of this cut) and the
// receipt is banked at the row's RECORD.md §BORN-RED. No `it.fails` latch is left
// behind: a latch that must be hand-flipped is a second state to keep true, and the
// pristine-tree run proves the RED on the real detector rather than on an inverted one.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
    SPRING_PRESETS,
    type SpringPresetName,
} from "@glass/composables/motion/spring/springPresets";

const SRC = join(process.cwd(), "src");
/** The generator's own output — figures live here BY CONSTRUCTION, gated elsewhere. */
const EMISSION = join("src", "styles", "tokens", "scheme-spring.css");

function walk(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path, out);
        else if (/\.(css|vue|ts|md)$/.test(entry)) out.push(path);
    }
    return out;
}

const SOURCES = walk(SRC).map((path) => ({
    path: path.slice(process.cwd().length + 1),
    text: readFileSync(path, "utf8"),
}));

/** The six ruled names, read from the table rather than restated. */
const ROWS = SPRING_PRESETS.map((row) => row.name);
/** Retired register names + the `transient` name-grave (C-5). None may reappear. */
const GRAVES = ["smooth", "snappy", "bouncy", "gentle", "orb-drop", "transient"];

/** LAW 0 — the first peak of a second-order step response. */
function peakFraction(dampingFraction: number): number {
    if (dampingFraction >= 1) return 0;
    const z = dampingFraction;
    return Math.exp((-z * Math.PI) / Math.sqrt(1 - z * z));
}

/** Words that CLAIM a visible rebound. A row may use them iff its own band ships one. */
const REBOUND_CLAIM = /rebound|bounce|overshoot|springy|spring-back/i;

describe("G-SPRING-HONEST — a register may claim a rebound iff its own band ships one", () => {
    it("carries exactly the six ruled names, each once", () => {
        expect(ROWS).toEqual(["press", "present", "dock", "panel", "bloom", "world"]);
        expect(new Set(ROWS).size).toBe(ROWS.length);
    });

    it("LAW 0 — a row's text claims a rebound only when M > its own settleBand", () => {
        for (const row of SPRING_PRESETS) {
            const shipsPeak = peakFraction(row.dampingFraction) > row.settleBand;
            const claimsPeak = REBOUND_CLAIM.test(row.comment);
            expect(
                claimsPeak,
                `${row.name}: text ${claimsPeak ? "CLAIMS" : "makes no"} rebound, ` +
                    `curve ${shipsPeak ? "SHIPS" : "ships no"} peak`,
            ).toBe(shipsPeak);
        }
    });

    it("exactly ONE row rebounds, and it is the fired deploy", () => {
        const rebounding = SPRING_PRESETS.filter(
            (row) => peakFraction(row.dampingFraction) > row.settleBand,
        );
        expect(rebounding.map((row) => row.name)).toEqual(["panel"]);
    });

    it("no comment in the table states a figure — the generator states them", () => {
        for (const row of SPRING_PRESETS) {
            expect(row.comment, `${row.name} comment`).not.toMatch(
                /ζ|\d+(\.\d+)?\s*(s\b|ms\b|%)/,
            );
        }
    });

    it("no source line names a row AND states a spring figure beside it", () => {
        const names = ROWS.join("|");
        const NAMED = new RegExp(
            `--spring-(?:${names})\\b|springPreset\\("(?:${names})"\\)|` +
                "`(?:" + names + ")` (?:row|preset|spring)",
        );
        // A settle in seconds, a peak in percent, a damping ratio, a response literal.
        const FIGURE = /ζ\s*[≈=]\s*\d|\+\d+(\.\d+)?%|\b\d*\.\d+s\b|\bresponse\s*0?\.\d/;
        const claims: string[] = [];
        for (const { path, text } of SOURCES) {
            if (path === EMISSION) continue;
            text.split("\n").forEach((line, index) => {
                if (NAMED.test(line) && FIGURE.test(line)) {
                    claims.push(`${path}:${index + 1}  ${line.trim()}`);
                }
            });
        }
        expect(claims, claims.join("\n")).toEqual([]);
    });

    it("bite: a hand-written figure beside a row name is caught", () => {
        const NAMED = /--spring-press\b/;
        const FIGURE = /ζ\s*[≈=]\s*\d|\+\d+(\.\d+)?%|\b\d*\.\d+s\b/;
        const planted = "/* --spring-press settles 0.12s with a +1.5% peak */";
        expect(NAMED.test(planted) && FIGURE.test(planted)).toBe(true);
    });
});

describe("G-SPRING-ONE-JOB — no job owned twice, no row without a rider", () => {
    it("every retired register name is gone from src — no alias, no shim", () => {
        const found: string[] = [];
        for (const grave of GRAVES) {
            const form = new RegExp(`--spring-${grave}\\b|springPreset\\("${grave}"\\)`);
            for (const { path, text } of SOURCES) {
                if (form.test(text)) found.push(`${grave} @ ${path}`);
            }
        }
        expect(found, found.join("\n")).toEqual([]);
    });

    // A RIDER reads the row: a `var(--spring-<n>…)` in paint, or the row at a VALUE
    // position in a composable. The generator's emission, the table itself and the
    // token MANIFEST are rosters, not riders — a roster that listed a riderless row
    // would green this arm on the strength of its own bookkeeping.
    //
    // A TYPE position is not a rider either, and it is the harder case: a union
    // member (`Extract<SpringPresetName, … "bloom">`, a hand-typed alias) spells the
    // name while NOTHING rides it, so an arm that counts occurrences greens a dead
    // row on its own vocabulary. Only three shapes count as a value: a keyed value
    // (`preset: "<n>"`), a default or assignment (`?? "<n>"`, `= "<n>"`, `return
    // "<n>"`), and array-literal membership. Type-DECLARING lines are dropped before
    // the match, so an alias body cannot supply either shape.
    const ROSTERS = [
        EMISSION,
        join("src", "composables", "motion", "spring", "springPresets.ts"),
        join("src", "styles", "tokens", "manifest.ts"),
    ];
    /** A line that DECLARES a type — every row name on it is a name, not a use. */
    const TYPE_LINE = /^\s*(?:export\s+)?(?:type|interface)\b|Extract<|Exclude</;

    function riderlessRows(sources: typeof SOURCES, rows: readonly string[]): string[] {
        const riderless: string[] = [];
        for (const name of rows) {
            const cssRead = new RegExp(`var\\(--spring-${name}\\b`);
            const q = `["'\`]${name}["'\`]`;
            const jsValue = new RegExp(
                `:\\s*${q}|(?:\\?\\?|=|return)\\s*${q}|[[(,]\\s*${q}\\s*[,)\\]]`,
            );
            const rides = sources.some(({ path, text }) => {
                if (ROSTERS.includes(path)) return false;
                if (cssRead.test(text)) return true;
                if (!/\.(ts|vue)$/.test(path)) return false;
                if (!/SpringPresetName|ElementMorphPreset|SpringPreset\b/.test(text))
                    return false;
                return text
                    .split("\n")
                    .some((line) => !TYPE_LINE.test(line) && jsValue.test(line));
            });
            if (!rides) riderless.push(name);
        }
        return riderless;
    }

    it("every row has at least one real rider — a reader, not a roster entry", () => {
        const riderless = riderlessRows(SOURCES, ROWS);
        expect(riderless, `riderless rows: ${riderless.join(", ")}`).toEqual([]);
    });

    it("bite: a type-only union member is not a rider", () => {
        const declaration =
            'export type PlantedPreset = Extract<SpringPresetName, "bloom" | "panel">;\n' +
            'type LegacyPreset = "bloom" | "panel";\n' +
            "declare const chosen: PlantedPreset;\n";
        const typeOnly = [{ path: join("src", "planted.ts"), text: declaration }];
        expect(riderlessRows(typeOnly, ["bloom"])).toEqual(["bloom"]);

        const withValue = [
            {
                path: join("src", "planted.ts"),
                text: declaration + 'const opts = { preset: given.preset ?? "bloom" };\n',
            },
        ];
        expect(riderlessRows(withValue, ["bloom"])).toEqual([]);
    });

    it("no module but the table declares a named register TABLE", () => {
        // A per-primitive default (one named pair, documented, JS-only) is the seam
        // `springPresets.ts` sanctions. A second TABLE — a keyed collection mapping
        // names to (response, ζ) pairs — is the second authority the row exists to end.
        const tables: string[] = [];
        for (const { path, text } of SOURCES) {
            if (path.endsWith("springPresets.ts")) continue;
            for (const match of text.matchAll(/[:=]\s*(\{|\[)/g)) {
                const window = text.slice(match.index, (match.index ?? 0) + 900);
                const pairs = window.match(/response:\s*[\d.]/g) ?? [];
                const named = window.match(/name:\s*["'`]/g) ?? [];
                if (pairs.length >= 2 && named.length >= 2) tables.push(path);
            }
        }
        expect([...new Set(tables)], tables.join("\n")).toEqual([]);
    });
});

describe("G-SPRING-ONE-JOB · the clock-fence arm — a spring owns its own clock", () => {
    // A `--spring-<n>` timing function — directly or through the shared
    // `--transition-liquid-spatial` vocabulary token — pairs ONLY with its own
    // `--spring-<n>-duration` / `-exit-duration`. A spring replayed over a foreign
    // span is the curve compressed into the head of the clock, which is the measured
    // t90 defect this register was parity-fixed for once already.
    //
    // A leg carrying a curve and NO time at all is a curve ALIAS, not a paired leg,
    // and is out of scope by construction — the fence bites where a clock exists.
    //
    // SCOPE, stated so no reader over-reads a green. THREE shapes are outside it —
    // all clean on this tree today, each verified by hand, none of them checkable
    // here yet; the hardening is routed to #65 / RT-26A:
    //   · a SPLIT declaration pair (`transition-duration:` + `transition-timing-
    //     function:`, or the `animation-*` forms) — the fence reads one declaration
    //     at a time, so a curve and a clock in two declarations are never compared.
    //     Live at `view-transition.css:41-42`, `disclosure.css:95-96`,
    //     `dark-mode-toggle.css:76-77`, all correctly paired.
    //   · a FALLBACK clock — `TIMEISH` requires `var(--x)` to close immediately, so
    //     `var(--duration-normal, 0.3s)` matches nothing and the leg drops out of
    //     scope entirely. That row's `ContinuousMarkers.vue` site was that shape and
    //     was found by hand, NOT by this arm (the file itself died at BK #46).
    //   · a curve ALIAS other than `--transition-liquid-spatial`: only that one
    //     indirection resolves, so `--ease-scroll-spring` · `--vt-ease` ·
    //     `--dock-resize-spring` · `--enter-overlay-spring` · `--enter-menu-spring`
    //     each hide a foreign clock beside them.
    // `SOURCES` is `src` only — `demo/` is unfenced (swept clean by hand at this cut).

    /** Named clocks that ARE a row's clock: `--x: var(--spring-<row>-duration)`. */
    function aliasMap(sources: typeof SOURCES): Map<string, SpringPresetName> {
        const map = new Map<string, SpringPresetName>();
        for (const { text } of sources) {
            for (const m of text.matchAll(
                /(--[a-z0-9-]+):\s*var\(--spring-([a-z]+)-(?:exit-)?duration\)\s*;/g,
            )) {
                map.set(m[1], m[2] as SpringPresetName);
            }
        }
        return map;
    }

    function fenceViolations(sources: typeof SOURCES): string[] {
        const alias = aliasMap(sources);
        const TIMEISH =
            /var\(--duration-[a-z]+\)|var\(--[a-z0-9-]*(?:duration|clock)[a-z0-9-]*\)|(?:^|\s)\d*\.?\d+m?s(?:\s|$|,)/;
        const found: string[] = [];
        for (const { path, text } of sources) {
            for (const decl of text.matchAll(/([a-z-]+|--[a-z0-9-]+)\s*:\s*([^;{}]+);/g)) {
                if (!/transition|animation|--/.test(decl[1])) continue;
                for (const leg of decl[2].split(/,(?![^()]*\))/)) {
                    const direct = leg.match(/var\(--spring-([a-z]+)\)/);
                    const indirect = /var\(--transition-liquid-spatial\)/.test(leg);
                    if (!direct && !indirect) continue;
                    if (!TIMEISH.test(leg)) continue;
                    // The indirection resolves to the interactive-spatial default row.
                    const row = direct ? direct[1] : "press";
                    const own = new RegExp(`var\\(--spring-${row}-(?:exit-)?duration\\)`);
                    const viaAlias = [...leg.matchAll(/var\((--[a-z0-9-]+)\)/g)].some(
                        (m) => alias.get(m[1]) === row,
                    );
                    if (!own.test(leg) && !viaAlias) {
                        found.push(`${path}  ${leg.trim()}`);
                    }
                }
            }
        }
        return found;
    }

    it("pairs every spring curve with its own clock, indirection included", () => {
        const violations = fenceViolations(SOURCES);
        expect(violations, violations.join("\n")).toEqual([]);
    });

    it("bite: a foreign clock beside a spring curve is caught", () => {
        const planted = [
            {
                path: "planted.css",
                text: ".x { transition: width var(--duration-fast) var(--spring-dock); }",
            },
        ];
        expect(fenceViolations(planted)).toHaveLength(1);
    });

    it("bite: the indirection is not a hiding place", () => {
        const planted = [
            {
                path: "planted.css",
                text: ".x { transition: scale var(--duration-fast) var(--transition-liquid-spatial); }",
            },
        ];
        expect(fenceViolations(planted)).toHaveLength(1);
    });

    it("a curve alias with no clock is out of scope, not a violation", () => {
        const planted = [
            { path: "planted.css", text: ":root { --my-curve: var(--spring-dock); }" },
        ];
        expect(fenceViolations(planted)).toEqual([]);
    });
});
