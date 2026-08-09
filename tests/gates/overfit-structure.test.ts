// BK.#19 gate — the three STRUCTURE arms of the standing `G-OVERFIT` seat:
// `EXPORT-REACH` · `NO-SHIM` · `ONE-SELECTION` (TR §B.5 declares all three as arms of
// that seat; this file BINDS them and mints nothing — the seat budget stays exactly 60).
//
// ── THE INVARIANTS ──────────────────────────────────────────────────────────────────
//
// (A) EXPORT-REACH. `export` is FREE, so the standing "≥ 2 sites OR exported" edict is
//     satisfied by typing a keyword. The result is a surface that reads alive and ships
//     nothing: a symbol referenced NOWHERE outside its own declaring module, and absent
//     from every published subpath, is not an export — it is a leak. Either it is
//     module-private (drop the keyword) or it is dead (delete it). There is a CSS twin
//     of exactly this gate (`orphan-css-partial`) and there was no TS/JS one.
//
// (B) NO-SHIM. The no-legacy edict, enforced. Three named shim shapes:
//       • a RE-EXPORT SHIM — module A holding `export { x } from "./b"` (or importing a
//         neighbour's symbol only to re-export it) purely to freeze a barrel path after
//         the implementation moved. The barrel points at the real owner instead; where a
//         published name would change, it changes (clean break).
//       • a RUNTIME DENY-LIST of retired props filtered out of `$attrs` — a shim that
//         swallows a consumer's markup with no error, no warning, and no effect.
//       • a `void x;` STATEMENT over a dead const — a suppression that reads as a use to
//         BOTH the unused check and the bundler's DCE, converting dead code into SHIPPED
//         code.
//     A package `index.ts` re-exporting its own directory's leaves is a BARREL, not a
//     shim, and is out of scope by construction (the arm scopes to non-barrel modules).
//
// (C) ONE-SELECTION. `useSelectionGroup` is the library's single headless selection
//     engine — the dock control run and `<SegmentedTabs>` are one roving-focus strip
//     with a traveling indicator, wearing different chrome, and both compose it. No
//     component assembles roving selection outside it: composing the roving machine
//     (`useTabRovingFocus`) or the indicator writer (`useSelectionIndicator`) DIRECTLY
//     from a component is the fork this arm forbids. `<ToggleGroup type="single">` is
//     the same strip BY SHAPE but composes neither house part (it delegates roving to
//     reka's `ToggleGroupRoot`), so it does not trip this arm; its adoption needs the
//     C-1 `SelectionOption["value"]` widening and is **BK #84's**. The engine's
//     consumer set is TWO until then, and the arm asserts exactly that.
//
// ── BORN-RED, FLIPPED IN THE SAME CUT (the RULING-2 "never RED-at-tag" law) ──────────
// Measured at the pre-cut tree by RUNNING THIS FILE against `git archive HEAD`. The
// figures below are the detectors' own output, not hand arithmetic:
//   (A) 33 leaks IN PLACE — aurora budget/shader/uniform-bridge constants, sortable
//       drop classes, the music-staff accidentals, … (see the SELF-MASKING note).
//   (B) 26 re-export shims across 14 non-entry modules + 1 38-entry
//       `RETIRED_FLOATING_ATTRS` deny-list applied on 6 floating surfaces + 5
//       `void`-kept dead consts (3 meta-arrays in `_shared/axes.ts` + 2 more).
//   (C) 2 fork rows — `SegmentedTabs.vue` composed `useSelectionIndicator` AND
//       `useTabRovingFocus` directly while the engine's own doc named it a consumer;
//       the engine's live-consumer count was 1, below this arm's floor of 2.
// Run receipt at the pre-cut tree: `Tests 6 failed | 4 passed (10)`.
// The #19 cut drove all three arms to zero, so this ships as the STANDING regression
// lock with self-test bites proving teeth, not as an `it.fails` scaffold.
//
// SELF-MASKING, STATED (the leak arm only). `externalSites` matches a bare `\bNAME\b`
// over raw file text, so a symbol NAMED IN ANY COMMENT under the census roots reads as
// a use site — including this file's own header. Held OUT of the census the same
// detector reports **37** leaks; the 4-name gap is exactly the leak names this header
// used to quote (`TOGGLE_GROUP_KEY` · `DOCK_MORPH_MAX_STRETCH` · `MOOD_AVA` ·
// `WEBGPU_ACQUIRE_TIMEOUT_MS`). The seat's remembered **38** is the same 37 plus
// `springSettleDurationSeconds`, which was a leak only before `scripts/` entered the
// census (see COUNTING METHOD) — all three figures reconcile, and 33 is what a
// re-runner sees in place. Hardening the matcher off raw text is routed **RT-19B→#65**
// with the seat bind.
//
// ── COUNTING METHOD (load-bearing) ──────────────────────────────────────────────────
// The reference census reads `src/` + `demo/` + `tests/` + `scripts/` — `scripts/` is IN
// because build/regen leaves are real consumers (`regen-spring-tokens.mjs` reads
// `springSettleDurationSeconds`, and a census that omits them privatises a live symbol).
// A module that merely RE-EXPORTS a name is not a use site of it, so a barrel cannot
// rescue a leak. The published set is the transitive export closure of the vite entry
// map (`libraryEntryMap()` — the same fail-closed leaf `package.json` exports are
// generated from), never a hand-list. Type-only exports are out of scope entirely: they
// carry no runtime bytes, which is the whole cost this gate prices.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { libraryEntryMap } from "../../scripts/lib/subpath-policy.mjs";

const REPO_ROOT = process.cwd();
const SRC = join(REPO_ROOT, "src");

const CODE_RE = /\.(ts|vue|mts|mjs)$/;

function walk(dir: string, out: string[] = []): string[] {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full, out);
        else if (CODE_RE.test(entry) && !entry.endsWith(".d.ts")) out.push(full);
    }
    return out;
}

const srcFiles = walk(SRC);
const censusFiles = [
    ...srcFiles,
    ...walk(join(REPO_ROOT, "demo")),
    ...walk(join(REPO_ROOT, "tests")),
    ...walk(join(REPO_ROOT, "scripts")),
];
const text = new Map<string, string>();
for (const f of censusFiles) text.set(f, readFileSync(f, "utf8"));
const read = (f: string): string =>
    text.get(f) ?? (existsSync(f) ? readFileSync(f, "utf8") : "");

function resolveSpec(fromFile: string, spec: string): string | null {
    if (!spec.startsWith(".")) return null;
    const base = resolve(dirname(fromFile), spec);
    for (const candidate of [base, `${base}.ts`, `${base}.vue`, join(base, "index.ts")]) {
        if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    }
    return null;
}

// A runtime export DECLARATION (`export const|let|var|function|class|enum X`). Type
// aliases and interfaces never match — they ship no bytes.
const DECL_RE =
    /^\s*export\s+(?:declare\s+)?(?:async\s+)?(?:const|let|var|function|class|enum)\s+([A-Za-z_$][\w$]*)/gm;
// A brace export list, with its optional `from` source.
const BRACE_RE = /export\s*\{([^}]*)\}\s*(?:from\s*["']([^"']+)["'])?/gms;
const STAR_RE = /export\s*\*\s*(?:as\s+\w+\s*)?from\s*["']([^"']+)["']/g;

function braceNames(body: string): string[] {
    const out: string[] = [];
    for (const raw of body.split(",")) {
        const token = raw.trim();
        if (!token || token.startsWith("type ")) continue;
        const name = token.split(/\s+as\s+/).pop()!.trim();
        if (/^[A-Za-z_$][\w$]*$/.test(name)) out.push(name);
    }
    return out;
}

/** The transitive runtime-export closure of the published entry map. */
function publishedSurface(): Set<string> {
    const published = new Set<string>();
    const seen = new Set<string>();
    const collect = (file: string | null): void => {
        if (!file || seen.has(file)) return;
        seen.add(file);
        const src = read(file);
        for (const m of src.matchAll(DECL_RE)) published.add(m[1]!);
        for (const m of src.matchAll(BRACE_RE)) {
            for (const name of braceNames(m[1]!)) published.add(name);
            if (m[2]) collect(resolveSpec(file, m[2]));
        }
        for (const m of src.matchAll(STAR_RE)) collect(resolveSpec(file, m[1]!));
    };
    for (const entry of Object.values(libraryEntryMap() as Record<string, string>)) {
        collect(entry);
    }
    return published;
}

interface ExportRow {
    name: string;
    declaredIn: string[];
    /** Modules that only RE-EXPORT the name — never a use site. */
    reexportedBy: string[];
    externalSites: string[];
    published: boolean;
}

function exportCensus(): ExportRow[] {
    const published = publishedSurface();

    const declaredIn = new Map<string, Set<string>>();
    const reexportedBy = new Map<string, Set<string>>();
    for (const file of srcFiles) {
        const src = read(file);
        const rel = relative(REPO_ROOT, file);
        for (const m of src.matchAll(DECL_RE)) {
            (declaredIn.get(m[1]!) ?? declaredIn.set(m[1]!, new Set()).get(m[1]!)!).add(rel);
        }
        for (const m of src.matchAll(BRACE_RE)) {
            if (!m[2]) continue; // `export { x }` of a local decl is not a re-export
            for (const name of braceNames(m[1]!)) {
                (
                    reexportedBy.get(name) ?? reexportedBy.set(name, new Set()).get(name)!
                ).add(rel);
            }
        }
    }

    const rows: ExportRow[] = [];
    for (const [name, decls] of declaredIn) {
        const barrels = reexportedBy.get(name) ?? new Set<string>();
        const word = new RegExp(`\\b${name.replace(/\$/g, "\\$")}\\b`);
        const externalSites: string[] = [];
        for (const file of censusFiles) {
            const rel = relative(REPO_ROOT, file);
            if (decls.has(rel) || barrels.has(rel)) continue;
            if (word.test(read(file))) externalSites.push(rel);
        }
        rows.push({
            name,
            declaredIn: [...decls],
            reexportedBy: [...barrels],
            externalSites,
            published: published.has(name),
        });
    }
    return rows;
}

/** Rows that are neither referenced outside their own module nor published. */
function leaks(rows: ExportRow[]): ExportRow[] {
    return rows.filter((r) => r.externalSites.length === 0 && !r.published);
}

describe("gate:G-OVERFIT — EXPORT-REACH arm (the TS twin of orphan-css-partial)", () => {
    const rows = exportCensus();

    it("every runtime export is reachable — no export leaks (zero external site AND unpublished)", () => {
        const offenders = leaks(rows).map(
            (r) => `${r.declaredIn[0]} :: ${r.name}`,
        );
        expect(
            offenders,
            `${offenders.length} runtime export(s) are referenced nowhere outside their own module AND ship on no published subpath. ` +
                `An unreachable export is not API — make it module-private or delete it:\n  ${offenders.join("\n  ")}`,
        ).toEqual([]);
    });

    it("the census sees a real population (the detector is not vacuously green)", () => {
        // A regex that silently stopped matching would green this gate for free.
        expect(rows.length).toBeGreaterThan(400);
        expect(rows.some((r) => r.published)).toBe(true);
    });

    it("self-test bite — an unpublished, self-referenced-only export IS a leak", () => {
        const synthetic: ExportRow[] = [
            {
                name: "__leak__",
                declaredIn: ["src/x.ts"],
                reexportedBy: [],
                externalSites: [],
                published: false,
            },
            // published with no internal consumer → legitimate API, NOT a leak
            {
                name: "__api__",
                declaredIn: ["src/y.ts"],
                reexportedBy: [],
                externalSites: [],
                published: true,
            },
            // unpublished but consumed by a sibling → module-internal, NOT a leak
            {
                name: "__used__",
                declaredIn: ["src/z.ts"],
                reexportedBy: [],
                externalSites: ["src/w.ts"],
                published: false,
            },
        ];
        expect(leaks(synthetic).map((r) => r.name)).toEqual(["__leak__"]);
    });

    it("self-test bite — a BARREL re-export does not rescue a leak", () => {
        // The pre-fix hole: counting the barrel line as a use site. `WEBGPU_ACQUIRE_TIMEOUT_MS`
        // was exactly this shape — declared in `webgpuDevice.ts`, re-exported by
        // `useWebGPUCanvas.ts`, read by nobody.
        const barrelRescued: ExportRow = {
            name: "__barrelled__",
            declaredIn: ["src/a.ts"],
            reexportedBy: ["src/index.ts"],
            externalSites: [],
            published: false,
        };
        expect(leaks([barrelRescued]).map((r) => r.name)).toEqual(["__barrelled__"]);
    });
});

// ── (B) NO-SHIM ─────────────────────────────────────────────────────────────────────

/** `void IDENT;` over a bare identifier — the dead-code suppression. */
const VOID_SUPPRESSION_RE = /^\s*void\s+[A-Za-z_$][\w$]*\s*;/gm;
/** A runtime deny-list of retired props filtered out of `$attrs`. */
const DENY_LIST_RE = /RETIRED_[A-Z_]*ATTRS/;

// A BARREL is a module the package PUBLISHES as an entry — a directory `index.ts` or a
// curated top-level entry (`src/forms.ts`, `src/components/blob/config.ts`). Its whole
// job is to name the surface, so gathering names is not a shim there. The set is DERIVED
// from the same fail-closed entry map `package.json` exports are generated from, never a
// hand-list — a hand-list would let a shim hide behind an invented exemption.
const ENTRY_FILES = new Set<string>(
    Object.values(libraryEntryMap() as Record<string, string>).map((f) =>
        relative(REPO_ROOT, f).replace(/\\/g, "/"),
    ),
);
function isBarrel(file: string): boolean {
    const rel = relative(REPO_ROOT, file).replace(/\\/g, "/");
    return /(^|\/)index\.ts$/.test(rel) || ENTRY_FILES.has(rel);
}

function reexportShims(): string[] {
    const offenders: string[] = [];
    for (const file of srcFiles) {
        if (isBarrel(file)) continue;
        const src = read(file);
        const rel = relative(REPO_ROOT, file);
        // shape 1 — a bare pass-through `export { x } from "./y"`
        for (const m of src.matchAll(BRACE_RE)) {
            if (!m[2]) continue;
            offenders.push(`${rel} :: export { ${m[1]!.trim()} } from "${m[2]}"`);
        }
        // shape 2 — import a neighbour's symbol, then re-export the local binding
        const imported = new Set<string>();
        for (const m of src.matchAll(/^\s*import\s*\{([^}]*)\}\s*from\s*["'](\.[^"']*)["']/gms)) {
            for (const name of braceNames(m[1]!)) imported.add(name);
        }
        for (const m of src.matchAll(/^\s*export\s*\{([^}]*)\}\s*;?\s*$/gm)) {
            for (const name of braceNames(m[1]!)) {
                if (imported.has(name)) offenders.push(`${rel} :: export { ${name} } (imported)`);
            }
        }
    }
    return offenders;
}

describe("gate:G-OVERFIT — NO-SHIM arm (the no-legacy edict, enforced)", () => {
    it("zero re-export-only modules — a barrel points at the real owner", () => {
        const offenders = reexportShims();
        expect(
            offenders,
            `${offenders.length} re-export shim(s). A non-barrel module holding a neighbour's symbol only freezes a ` +
                `published path after the implementation moved; re-point the barrel and let the name change:\n  ${offenders.join("\n  ")}`,
        ).toEqual([]);
    });

    it("zero runtime deny-lists of retired props", () => {
        const offenders = srcFiles
            .filter((f) => DENY_LIST_RE.test(read(f)))
            .map((f) => relative(REPO_ROOT, f));
        expect(
            offenders,
            `a retired-prop deny-list filters \`$attrs\` at runtime, so a consumer's markup produces no error, no ` +
                `warning, and no effect (it swallowed \`as-child\` on 6 floating surfaces):\n  ${offenders.join("\n  ")}`,
        ).toEqual([]);
    });

    it("zero `void`-kept dead arrays", () => {
        const offenders: string[] = [];
        for (const file of srcFiles) {
            for (const m of read(file).matchAll(VOID_SUPPRESSION_RE)) {
                offenders.push(`${relative(REPO_ROOT, file)} :: ${m[0].trim()}`);
            }
        }
        expect(
            offenders,
            `\`void x;\` reads as a USE to both the unused check and the bundler's DCE, so it converts dead code ` +
                `into shipped bytes:\n  ${offenders.join("\n  ")}`,
        ).toEqual([]);
    });

    it("self-test bites — each shim detector matches its own shape", () => {
        expect(VOID_SUPPRESSION_RE.test("    void AXIS_TUPLES;")).toBe(true);
        VOID_SUPPRESSION_RE.lastIndex = 0;
        expect(VOID_SUPPRESSION_RE.test("    void (await run());")).toBe(false);
        VOID_SUPPRESSION_RE.lastIndex = 0;
        expect(DENY_LIST_RE.test("const RETIRED_FLOATING_ATTRS = new Set([")).toBe(true);
        expect(DENY_LIST_RE.test("const FLOATING_ATTRS = new Set([")).toBe(false);
        // A published ENTRY is out of scope BY CONSTRUCTION, and only by that.
        expect(isBarrel(join(SRC, "components", "search", "index.ts"))).toBe(true);
        expect(isBarrel(join(SRC, "forms.ts"))).toBe(true);
        expect(isBarrel(join(SRC, "components", "search", "searchVariants.ts"))).toBe(false);
    });
});

// ── (C) ONE-SELECTION ───────────────────────────────────────────────────────────────

const SELECTION_ENGINE = "useSelectionGroup";
/** The two parts the engine assembles — composing either DIRECTLY is the fork. */
const ENGINE_PARTS = ["useTabRovingFocus", "useSelectionIndicator"] as const;
/** The engine itself, and the roving machine's own module, legitimately name the parts. */
const ENGINE_HOMES = [
    "src/composables/motion/morph/useSelectionGroup.ts",
    "src/composables/motion/morph/useSelectionIndicator.ts",
    "src/components/tabs/composables/useTabRovingFocus.ts",
];

describe("gate:G-OVERFIT — ONE-SELECTION arm (one selection engine, no forks)", () => {
    it("no component assembles roving selection outside `useSelectionGroup`", () => {
        const offenders: string[] = [];
        for (const file of srcFiles) {
            const rel = relative(REPO_ROOT, file).replace(/\\/g, "/");
            if (ENGINE_HOMES.includes(rel)) continue;
            const src = read(file);
            for (const part of ENGINE_PARTS) {
                // An IMPORT of the part is the fork; naming it in prose is not.
                const importRe = new RegExp(`import\\s*\\{[^}]*\\b${part}\\b[^}]*\\}`, "s");
                if (importRe.test(src)) offenders.push(`${rel} :: imports ${part} directly`);
            }
        }
        expect(
            offenders,
            `${offenders.length} component(s) fork the selection assembly. \`${SELECTION_ENGINE}\` documents itself as ` +
                `the ONE engine for the dock run and SegmentedTabs (single-select ToggleGroup is the same strip by ` +
                `shape but composes neither house part — its adoption is #84's) — either it IS the engine ` +
                `or the claim is deleted:\n  ${offenders.join("\n  ")}`,
        ).toEqual([]);
    });

    it("the engine is genuinely consumed (the claim has a live import graph behind it)", () => {
        const consumers = srcFiles.filter((f) => {
            const rel = relative(REPO_ROOT, f).replace(/\\/g, "/");
            if (rel === "src/composables/motion/morph/useSelectionGroup.ts") return false;
            return new RegExp(`import\\s*\\{[^}]*\\b${SELECTION_ENGINE}\\b[^}]*\\}`, "s").test(
                read(f),
            );
        });
        // The dock control run AND SegmentedTabs, at minimum — one consumer would make
        // the "same thing wearing different chrome" claim unfalsifiable.
        expect(consumers.length).toBeGreaterThanOrEqual(2);
    });
});

// ── (D) OVERLAY-SEAM — BK #89 W-OVERLAY's arms of the SAME `G-OVERFIT` seat ─────────
//
// Two contracts that were each re-implemented once per consumer until this row, and
// whose whole defect class is duplication rather than absence:
//
//   • PORTAL-ONE. A dock-owned overlay marks its TELEPORTED root with
//     `data-glass-dock-portal` + `data-glass-dock-owner`, and `isTeleportedTarget()`
//     reads the pair to keep the dock's click-away scoped to its own surfaces. Ten hand
//     stamps across five sites in three files wrote it — and the tooltip, the submenu
//     and the command list wrote NOTHING, so a dock-anchored hint collapsed the dock the
//     instant the pointer moved onto it. One writer, or the reader is guessing.
//
//   • ONE-LATCH. The dock's keep-open count is reference-counted, but the TOKEN — take
//     exactly one, give it back exactly once, including on teardown — was hand-rolled
//     four times. A leaked token is a dock that never idle-collapses again for the life
//     of the page, and four copies is four chances to leak it.
describe("gate:G-OVERFIT — OVERLAY-SEAM arm (BK #89 W-OVERLAY)", () => {
    const PORTAL_ATTR = "data-glass-dock-portal";
    const SEAM = "src/components/_shared/overlay/participation.ts";

    it("PORTAL-ONE — the dock-portal stamp has exactly one writer", () => {
        // A WRITER binds the attribute (`:data-glass-dock-portal="…"`) or spells it in a
        // returned object. Reading it in a selector is not writing it, so the predicate's
        // own `closest()` is out of scope by shape, not by an allow-list.
        const writers = srcFiles
            .map((f) => relative(REPO_ROOT, f).replace(/\\/g, "/"))
            .filter((rel) => {
                const src = read(join(REPO_ROOT, rel));
                return (
                    new RegExp(`:${PORTAL_ATTR}\\s*=`).test(src) ||
                    new RegExp(`["']${PORTAL_ATTR}["']\\s*:`).test(src)
                );
            });
        expect(
            writers,
            `the dock-portal stamp is written from ${writers.length} module(s). It is ONE contract with ONE ` +
                `reader (isTeleportedTarget); every extra writer is a surface that can silently omit it — which ` +
                `is exactly how the tooltip, the submenu and the command list ended up stampless:\n  ${writers.join("\n  ")}`,
        ).toEqual([SEAM]);
    });

    it("PORTAL-ONE — every portalled overlay root actually takes the seam", () => {
        // The bite the census above cannot see: a component that stamps nothing at all
        // passes a "one writer" count for free. These four are the portalled roots that
        // can sit under a dock; each must reach the seam rather than re-spell it.
        for (const rel of [
            "src/components/tooltip/TooltipContent.vue",
            "src/components/dropdown-menu/DropdownMenuSubContent.vue",
            "src/components/command/CommandList.vue",
            "src/components/select/SelectContent.vue",
        ]) {
            expect(read(join(REPO_ROOT, rel)), `${rel} takes the portal seam`).toMatch(
                /useDockParticipation\(/,
            );
        }
    });

    it("ONE-LATCH — exactly one keep-open token implementation", () => {
        // The token is the guarded acquire/release PAIR plus its teardown. Its shape on
        // disk is a call to the dock context's `keepOpen`; anything else calling it is a
        // second implementation of the same six lines.
        const callers = srcFiles
            .map((f) => relative(REPO_ROOT, f).replace(/\\/g, "/"))
            .filter((rel) => /\.keepOpen\(/.test(read(join(REPO_ROOT, rel))));
        expect(
            callers,
            `${callers.length} module(s) acquire a dock keep-open token directly. The ref-count is the dock's; the ` +
                `TOKEN discipline is ONE composable's, and a hand-rolled copy is a leak waiting for the teardown ` +
                `it forgot:\n  ${callers.join("\n  ")}`,
        ).toEqual([SEAM]);
    });

    it("self-test bites — each overlay detector matches its own shape", () => {
        // A regex that quietly stopped matching would green all three for free.
        expect(new RegExp(`:${PORTAL_ATTR}\\s*=`).test(`:${PORTAL_ATTR}="x"`)).toBe(true);
        expect(new RegExp(`:${PORTAL_ATTR}\\s*=`).test(`[${PORTAL_ATTR}]`)).toBe(false);
        expect(/\.keepOpen\(/.test("dock?.keepOpen('grasp')")).toBe(true);
        expect(/\.keepOpen\(/.test("// keepOpen is the ref-count")).toBe(false);
    });
});
