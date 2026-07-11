#!/usr/bin/env node
// proof:affordance-map — BC.W-AFFORDANCE-MAP (Band 7).
//
// The completeness gate for "every interactive element answers the pointer the same
// liquid way." It enumerates the interactive-element INVENTORY (a component package
// whose source carries a REAL pointer/keyboard interaction marker — a `role="button|
// radio|…"`, a `@click`/`@pointerdown`/`@keydown`, a reka `*Trigger`/`*Item` import, or
// a `tabindex` — and is not a pure display/decoration node), cross-checks each against
// the BINDING per-element MAP in docs/precepts/affordance-map.md, and reds an interactive
// element that is UNMAPPED, MAPPED-BUT-INERT (a `✓` cell whose affordance class is wired
// NOWHERE in its corpus), or DESYNCED/ABRUPT (an affordance leg on a raw bezier / a
// wall-clocked spring).
//
// THE PACKAGE AFFORDANCE CORPUS (the load-bearing read): an element's affordance class
// lives across THREE homes — the component dir (`v-specular`/`useLiquidPress` in the
// SFC), the register CSS the map's `source` cell cites (`menu.css` `--menu-row-lift`,
// `dock-controls/*.css` `--scale-hover-dock`), and the composed dependency
// (ToggleGroupItem composes `toggleVariants` → the `toggle` package; CarouselNext
// composes `<Button>` → the Button floor). The corpus = the dir files + the cited source
// files + the followed local component imports + the five shared affordance composables.
// The detector reads the WHOLE corpus, so a `✓` is satisfied wherever the class actually
// lives — never a false "inert" on a class that lives in the register partial.
//
// THE SINGLE SOURCE (A5): the required-affordance table + the per-row `source` cite are
// READ from affordance-map.md (gate + canon cannot drift — the proof:precept-current
// precedent). The gate hardcodes NO required-class list.
//
// THE CARDINAL SPLIT: this is the device-free SOURCE arm. The BINDING PAINT — the live
// pointer hover/press/click frame-series + the reka stale-binding catch — is
// tests-visual/affordance-map.spec.ts (the π arm), NEVER this gate alone (the cardinal
// AX headless-green-trap lesson).
//
// House style mirrors proof-glass-cohesion.mjs (the inventory walk + comment-strip +
// per-arm self-proving bite) + proof-precept-current.mjs (read-LIVE-from-canon).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:affordance-map";
const MAP = "docs/design/affordance-map.md"; // BH.B5c re-home off docs/precepts submodule
const SPEC = "tests-visual/affordance-map.spec.ts";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip CSS/JS block + line comments + HTML/Vue comments so a prose mention of a class
// (a comment naming the `.focus-ring` it composes) is not a false witness.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) =>
    checks.push({ arm, id, pass: Boolean(pass), detail });

// ── file walkers ──────────────────────────────────────────────────────────────────────
function dirFiles(dir, out = []) {
    if (!existsSync(dir)) return out;
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) {
            if (name === "__tests__" || name === "node_modules") continue;
            dirFiles(p, out);
        } else if (/\.(vue|ts)$/.test(name) && !/\.(test|spec)\.ts$/.test(name)) {
            out.push(p);
        }
    }
    return out;
}

function packageBody(relDir) {
    const abs = resolve(ROOT, relDir);
    if (!existsSync(abs)) return null;
    return dirFiles(abs)
        .map((f) => strip(read(relative(ROOT, f))))
        .join("\n");
}

// A REAL pointer/keyboard interaction marker — a sign the package paints an element a
// pointer/keyboard OPERATES. Two halves: (a) a literal markup marker (a `role="button|
// …"`, a `@click`/`@pointerdown`/`@keydown`, a `tabindex`); (b) a reka INTERACTIVE
// primitive — a `*Trigger`/`*Item`/`*Thumb` (inherently operable across reka) OR an
// enumerated operable ROOT (Switch/Checkbox/Slider/RadioGroup/Toggle/NumberField/
// TagsInput — the controls whose Root IS the operable element). The non-interactive
// display roots (Avatar/Label/Separator/Progress) are EXCLUDED — they wrap reka but
// carry no operable element (the false-positive the broad `from "reka-ui"` produced).
const INTERACTION_MARKER =
    /role=["'](?:button|radio|checkbox|switch|tab|menuitem|menuitemradio|menuitemcheckbox|option|slider)["']|@click\b|@pointerdown\b|@keydown\b|\btabindex\b|\b[A-Z]\w+(?:Trigger|Item|Thumb)\b|\b(?:Switch|Checkbox|Slider|RadioGroup|Toggle|NumberField|TagsInput)Root\b/;

// ── The five shared affordance composables (the closed vocabulary — available to every
//    package as the affordance substrate). ──────────────────────────────────────────────
const AFFORDANCE_COMPOSABLES = [
    "src/composables/glass/vSpecular.ts",
    "src/composables/glass/useSpecularTracking.ts",
    "src/composables/glass/useSpecularPointer.ts",
    "src/composables/motion/useLiquidPress.ts",
    "src/composables/motion/useSpringPress.ts",
    "src/composables/motion/useDragMorph.ts",
    "src/composables/motion/useTabIndicator.ts",
]
    .filter((p) => existsSync(resolve(ROOT, p)))
    .map((p) => strip(read(p)));

// ── The MAP parse: each row's `dir` cell (column 2) names the package(s); the H/G/P/D/F
//    cells (3-7) carry `✓`/`—`/GAP; the `source` cell (column 8) cites the register
//    files/composables that DELIVER the affordance (the corpus pointer). ─────────────────
function cellMark(cell) {
    if (/\bGAP\b/.test(cell)) return "GAP";
    if (/✓/.test(cell)) return "✓";
    return "—";
}

// Pull file paths + composable names cited in a `source` cell (e.g. `menu.css`,
// `dock-controls/icon-button.css`, `useSpringPress.ts`, `<Button>`).
function citedSources(cell) {
    const files = [];
    for (const m of cell.matchAll(/`([^`]+\.(?:css|ts|vue))`/g)) files.push(m[1]);
    // bare `foo.css` / `dir/foo.css` not in code-span
    for (const m of cell.matchAll(/\b([\w-]+\/)?[\w-]+\.(?:css|ts|vue)\b/g)) files.push(m[0]);
    return [...new Set(files)];
}

function parseMap(mapSrc) {
    const rows = [];
    const lines = mapSrc.split("\n");
    let inTable = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\|\s*element class\s*\|/.test(line)) { inTable = true; continue; }
        if (!inTable) continue;
        if (!line.trim().startsWith("|")) { inTable = false; continue; }
        if (/^\s*\|[-:\s|]+\|\s*$/.test(line)) continue;
        const cells = line.split("|").map((c) => c.trim());
        if (cells.length < 9) continue;
        const dirs = [...cells[2].matchAll(/(ui|custom)\/[a-z-]+/g)].map((m) => m[0]);
        const reveal = /reveal/i.test(cells[8]) || /BLOOM/i.test(cells[8]);
        rows.push({
            label: cells[1],
            dirs,
            H: cellMark(cells[3]),
            G: cellMark(cells[4]),
            P: cellMark(cells[5]),
            D: cellMark(cells[6]),
            F: cellMark(cells[7]),
            source: cells[8],
            sourceFiles: citedSources(cells[8]),
            routesButton: /<Button|<DockIconButton|the Button floor|Button-class|button-class/i.test(cells[8]),
            reveal,
            line: i + 1,
        });
    }
    return rows;
}

// ── Resolve a register-CSS cite to its on-disk file (the cite is a basename or a
//    dir/basename under src/styles/; we search src/styles/ for the match). ──────────────
const ALL_STYLE_FILES = (() => {
    const out = [];
    const walk = (d) => {
        const abs = resolve(ROOT, d);
        if (!existsSync(abs)) return;
        for (const name of readdirSync(abs)) {
            const p = join(d, name);
            if (statSync(resolve(ROOT, p)).isDirectory()) walk(p);
            else if (name.endsWith(".css")) out.push(p);
        }
    };
    walk("src/styles");
    return out;
})();

function resolveCite(cite) {
    // a composable name (useX.ts) resolves under src/composables/**
    if (/^use[A-Z]|^vSpecular/.test(cite)) {
        for (const root of ["src/composables/glass", "src/composables/motion"]) {
            const p = `${root}/${cite}`;
            if (existsSync(resolve(ROOT, p))) return p;
        }
    }
    if (cite.endsWith(".css")) {
        const hit = ALL_STYLE_FILES.find((f) => f.endsWith(`/${cite}`) || f.endsWith(cite));
        if (hit) return hit;
    }
    return null;
}

// ── The package affordance CORPUS: the dir body + the cited register/composable files +
//    the followed local component imports (Button/toggle) + the shared composables. ──────
function buildCorpus(row, dirBodies) {
    const parts = [];
    for (const dir of row.dirs) {
        const body = dirBodies.get(dir);
        if (body) parts.push(body);
        // follow local component imports one level (`from '../button'`, `from '../toggle'`)
        if (body) {
            for (const m of body.matchAll(/from\s+["']\.\.\/([\w-]+)["']/g)) {
                const depBody = dirBodies.get(`ui/${m[1]}`);
                if (depBody) parts.push(depBody);
            }
        }
    }
    for (const cite of row.sourceFiles) {
        const rel = resolveCite(cite);
        if (rel) parts.push(strip(read(rel)));
    }
    // a Button-routing package inherits the Button floor (its operable child IS a Button).
    if (row.routesButton) {
        const btn = dirBodies.get("ui/button");
        if (btn) parts.push(btn);
    }
    parts.push(...AFFORDANCE_COMPOSABLES);
    return parts.join("\n");
}

// ── The affordance-class detectors (what "the source carries the affordance" means). ────
const HAS_HOVER = (b) =>
    // BD.W-TAB-IOS-CAPSULE — `.glass-capsule-hover` is the SHARED specular-lift + scale
    // hover register (the iOS-27 catch-light lift), extracted ONCE and COMPOSED by the
    // button/chip/tab/atom family (the buttons greenfield moved the hover-lift off the
    // inline `--scale-hover-btn` onto this class). A component composing it IS wired with
    // a hover-lift affordance — its definition lives in glass/glass-capsule.css.
    /\bscale-hover(?:-btn|-dock)?\b|\btransition-control\b|--menu-row-lift\b|--scale-hover\b|data-held\b|\bcartoon-surface\b|\bglass-capsule-hover\b/.test(b);
const HAS_GLEAM = (b) =>
    /\bv-specular\b|\bglass-specular-track\b|useSpecularTracking|useSpecularPointer|createSpecularWriter|--specular-/.test(b);
const HAS_PRESS = (b) =>
    /\btap-squish\b|useSpringPress|useLiquidPress|--[\w-]*press-t\b|active:scale|:active\b|--scale-press\b|var\(--spring-snappy\)|var\(--spring-press\)/.test(b);
const HAS_DRAG = (b) =>
    /useDragMorph|:draggable|\bdraggable\b|SliderRoot|pointer-?capture|useSortable|useDrawerSnap|useTabIndicator/.test(b);
const HAS_FOCUS = (b) =>
    /\bfocus-ring\b|\btabindex\b|roving|--focus-ring-shadow|data-highlighted/.test(b);

const DETECTOR = { H: HAS_HOVER, G: HAS_GLEAM, P: HAS_PRESS, D: HAS_DRAG, F: HAS_FOCUS };

// ── The desync/abrupt detector (A3 — the affordance-scoped restatement of BC.W-SPRING-EASE
//    S6). A3 owns the ABRUPT-SHAPE axis on an affordance SPATIAL leg: a transform/scale/
//    translate transition timed by a raw `linear`/`ease`/`ease-in`/`ease-out` bezier
//    instead of a `--spring-*` register or the eased `--ease-out-expo` arrival (a
//    jerk-to-place, P1). It is the DISJOINT complement of the canonical library-wide gates
//    (cross-references, does NOT duplicate): the WALL-CLOCK shape (a `--spring-*` paired
//    with a generic `--duration-*`) is `proof:motion-one-clock` M3's / `proof:spring-ease`
//    S6's axis — those gates already vet the SHARED register CSS library-wide (menu.css's
//    `--menu-row-lift` micro-lift rides `--duration-fast var(--spring-smooth)`, an
//    M3-AUDITED-ACCEPTED register leg). So A3 scopes to a COMPONENT's OWN source (its dir
//    bodies — where a per-component desynced affordance could land), deferring the shared
//    corpus to the canonical gates. It reds the one shape it owns: an un-eased abrupt
//    spatial leg authored in a component's own style. ────────────────────────────────────
// A BARE bezier keyword on the spatial timing — `(?<![-\w])` excludes a keyword that is
// part of a `--ease-out`/`--ease-in-out`/`--ease-out-expo` CUSTOM property (those are
// EASED registers, P1-correct); only a raw unprefixed `linear`/`ease-in`/… reds. The
// trailing negative lookahead also clears a leg that ALSO names a `--spring-*` register.
const ABRUPT_SPATIAL =
    /transition:\s*(?:transform|scale|translate|rotate)\s+[^;{}]*?(?<![-\w])(?:linear|ease-in-out|ease-in|ease-out|ease)\b(?![^;{}]*--spring-)/;

function desyncViolations(body) {
    const out = [];
    if (ABRUPT_SPATIAL.test(body)) out.push("an abrupt spatial leg (transform/scale/translate on a raw linear/ease bezier, not a --spring-* register or the eased --ease-out-expo arrival)");
    return out;
}

// ── The inventory walk: every ui/ + custom/dock package carrying a REAL interaction
//    marker. The dock family is ONE inventory entry (its rows all key custom/dock). ───────
function walkInventory(dirBodies) {
    const inventory = [];
    // ui/* packages
    const uiAbs = resolve(ROOT, "src/components/ui");
    for (const name of existsSync(uiAbs) ? readdirSync(uiAbs) : []) {
        if (!statSync(join(uiAbs, name)).isDirectory()) continue;
        if (name === "_shared" || name === "focus-scope" || name === "section") continue;
        const dir = `ui/${name}`;
        const body = dirBodies.get(dir);
        if (body && INTERACTION_MARKER.test(body)) inventory.push(dir);
    }
    // the dock family
    const dockBody = dirBodies.get("custom/dock");
    if (dockBody && INTERACTION_MARKER.test(dockBody)) inventory.push("custom/dock");
    return inventory;
}

// ── build the dir-body map (ui/* + custom/dock) ────────────────────────────────────────
function buildDirBodies() {
    const m = new Map();
    const uiAbs = resolve(ROOT, "src/components/ui");
    for (const name of existsSync(uiAbs) ? readdirSync(uiAbs) : []) {
        if (!statSync(join(uiAbs, name)).isDirectory()) continue;
        const body = packageBody(`src/components/ui/${name}`);
        if (body) m.set(`ui/${name}`, body);
    }
    const dockBody = packageBody("src/components/custom/dock");
    if (dockBody) m.set("custom/dock", dockBody);
    return m;
}

// ── The booked-successor set: a rationale-bearing dir whose REAL affordance gap is fixed
//    by a component edit booked to a SUCCESSOR wave (out of this wave's footprint). Parsed
//    LIVE from the map's "Booked-successor gaps" section (`ui/<x>` code-spans there), so
//    the gate RECORDS the gap is KNOWN — a NEW interactive package NOT on the map and NOT
//    booked still reds (never a silent escape; the named-allowlist idiom). ────────────────
function parseBookedSuccessors(mapSrc) {
    const out = new Set();
    const m = mapSrc.match(/## Booked-successor gaps[\s\S]*?(?=\n## )/);
    if (!m) return out;
    for (const hit of m[0].matchAll(/`(ui|custom)\/([a-z-]+)/g)) out.add(`${hit[1]}/${hit[2]}`);
    return out;
}

// ── The pure detector (so a self-test feeds it synthetic rows + a synthetic corpus). ────
export function detectAffordanceGaps({ mapRows, inventory, dirBodies, booked = new Set() }) {
    const violations = [];
    const facts = {};
    const rowsFor = (dir) => mapRows.filter((r) => r.dirs.includes(dir));

    // A1 — every interactive package appears on the map (or is a recorded booked-successor).
    const unmapped = inventory.filter((dir) => rowsFor(dir).length === 0 && !booked.has(dir));
    facts.inventorySize = inventory.length;
    facts.unmapped = unmapped;
    for (const dir of unmapped)
        violations.push(`A1: interactive package \`${dir}\` carries a pointer/keyboard interaction marker but is ABSENT from affordance-map.md (GAP-3 unmapped)`);

    // A2 — no inert ✓ cell + the focus-ring hard floor.
    const inert = [];
    const focusGaps = [];
    for (const dir of inventory) {
        for (const row of rowsFor(dir)) {
            if (row.reveal) continue; // the sixth-register exemption
            const corpus = buildCorpus(row, dirBodies);
            for (const col of ["H", "G", "P", "D"]) {
                if (row[col] === "✓" && !DETECTOR[col](corpus))
                    inert.push(`${dir} [${row.label}] ${col}`);
            }
            if (row.F === "—")
                focusGaps.push(`${dir} [${row.label}] F:— on a keyboard-operable element (WCAG 2.4.7 — F is never — on an operable element)`);
            else if (row.F === "✓" && !HAS_FOCUS(corpus))
                focusGaps.push(`${dir} [${row.label}] F:✓ but the corpus carries no .focus-ring/roving-tabindex/data-highlighted (the a11y floor unwired)`);
        }
    }
    facts.inertCells = inert;
    facts.focusGaps = focusGaps;
    for (const c of inert) violations.push(`A2: map says ✓ but the corpus carries no wired class — ${c} (GAP-3 inert)`);
    for (const c of focusGaps) violations.push(`A2: ${c}`);

    // A3 — no abrupt affordance SPATIAL leg in a component's OWN source. Scoped to the dir
    // bodies (the per-component style a wave could desync), NOT the shared register CSS /
    // composables the canonical S6/M3/no-layout-animation gates already vet library-wide
    // (the disjoint-not-duplicate discipline — a shared-CSS wall-clock is M3-audited).
    const desynced = [];
    for (const dir of inventory) {
        if (booked.has(dir)) continue; // a booked-successor's reconcile is the recorded component edit (S6 records the same notification enter-transform reconcile on its named allowlist)
        if (rowsFor(dir).some((r) => r.reveal)) continue; // reveal surfaces ride the bloom register (S6-vetted)
        const own = dirBodies.get(dir);
        if (!own) continue;
        for (const v of desyncViolations(own)) desynced.push(`${dir}: ${v}`);
    }
    facts.desynced = [...new Set(desynced)];
    for (const c of facts.desynced) violations.push(`A3: ${c} (the §F lag root / the no-abrupt bar)`);

    return { facts, violations };
}

// ── runner ──────────────────────────────────────────────────────────────────────────
const mapSrc = read(MAP);
const mapRows = parseMap(mapSrc);
const booked = parseBookedSuccessors(mapSrc);
const dirBodies = buildDirBodies();
const inventory = walkInventory(dirBodies);

// docs/precepts is a git SUBMODULE (a sibling private repo). On a CI runner the
// checkout does not initialize it (and cannot — the default token has no cross-repo
// grant), so the dir is empty + affordance-map.md is absent. Absent-submodule →
// skip-by-policy (the sibling-gate convention) for the map-READING clauses ONLY
// (A1 map-exists/every-mapped, A2 inert/focus, A5 map-canon, the map-derived live
// violations); the src-derived A3 desync, A4 primitives, the inventory walk, and
// the π-spec/self-test bites keep biting. Locally the map clauses BITE.
// BH.B5c: re-homed off the docs/precepts submodule onto the in-repo docs/design
// extraction — present iff the extracted map resolves (always, on a fresh checkout).
const submodulePresent = existsSync(resolve(ROOT, MAP));
if (!submodulePresent) {
    console.log(
        "  affordance-map: SKIP-BY-POLICY — docs/design/affordance-map.md absent on this runner (A3/A4/inventory/π still bite)",
    );
}

if (submodulePresent) {
    add(
        "A1",
        "map-exists-non-trivial",
        mapSrc.length > 0 && mapRows.length >= 12,
        mapSrc.length > 0 && mapRows.length >= 12
            ? `affordance-map.md exists with ${mapRows.length} mapped element classes (the binding inventory)`
            : `affordance-map.md is ABSENT or trivial (${mapRows.length} rows) — born-RED before BC.W-AFFORDANCE-MAP`,
    );
}
add(
    "A1",
    "inventory-non-empty",
    inventory.length >= 15,
    `${inventory.length} interactive component packages enumerated (need ≥15 — the walk reaches the inventory)`,
);

const { facts, violations } = detectAffordanceGaps({ mapRows, inventory, dirBodies, booked });
if (submodulePresent) {
    add("A1", "every-interactive-mapped", facts.unmapped.length === 0, facts.unmapped.length === 0 ? "every interactive package is on the map" : `${facts.unmapped.length} unmapped: ${facts.unmapped.join(", ")}`);
    add("A2", "no-inert-cell", facts.inertCells.length === 0, facts.inertCells.length === 0 ? "no ✓ cell ships inert (every mapped affordance is wired in its corpus)" : `${facts.inertCells.length} inert: ${facts.inertCells.join(", ")}`);
    add("A2", "focus-ring-hard-floor", facts.focusGaps.length === 0, facts.focusGaps.length === 0 ? "every operable element resolves a visible focus indicator (F never — on an operable element, WCAG 2.4.7)" : `${facts.focusGaps.length} focus gap(s): ${facts.focusGaps.join("; ")}`);
}
add("A3", "no-desynced-abrupt-affordance", facts.desynced.length === 0, facts.desynced.length === 0 ? "no affordance leg reads abrupt/desynced/wall-clocked (the eased registers hold)" : `${facts.desynced.length}: ${facts.desynced.join("; ")}`);

// A4 — the closed vocabulary.
const PRIMITIVES = [
    "src/composables/glass/vSpecular.ts",
    "src/composables/glass/useSpecularTracking.ts",
    "src/composables/motion/useLiquidPress.ts",
    "src/composables/motion/useSpringPress.ts",
    "src/composables/motion/useDragMorph.ts",
];
const missingPrim = PRIMITIVES.filter((p) => !existsSync(resolve(ROOT, p)));
add(
    "A4",
    "closed-five-primitive-vocabulary",
    missingPrim.length === 0,
    missingPrim.length === 0
        ? "the five affordance primitives (vSpecular/useSpecularTracking/useLiquidPress/useSpringPress/useDragMorph) are the single delivery — no sixth engine"
        : `missing primitive(s): ${missingPrim.join(", ")}`,
);

// A5 — the map + the canon single-sourced (reads the submodule map).
if (submodulePresent) {
    add(
        "A5",
        "map-canon-single-sourced",
        /proof:affordance-map\b/.test(mapSrc) && /BC\.W-SPRING-EASE/.test(mapSrc),
        /proof:affordance-map\b/.test(mapSrc) && /BC\.W-SPRING-EASE/.test(mapSrc)
            ? "affordance-map.md names proof:affordance-map (the gate reads it) + the BC.W-SPRING-EASE eased-curve cross-ref (gate + canon single-sourced)"
            : "affordance-map.md does NOT record the gate single-source + the BC.W-SPRING-EASE cross-ref",
    );
}

// The π readback spec is wired.
add(
    "render",
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, SPEC)),
    `${SPEC} exists (the π render readback — the live hover-lift/gleam-track/press-squish frame-series + the reka stale-binding live-click catch, both modes; the BINDING paint, never this gate alone)`,
);

// ── A1-A3 self-test bites ──────────────────────────────────────────────────────────────
const selfFailures = [];
const SYNTH_DIRS = new Map([
    ["ui/zzz-planted", "<button @click='x'>hi</button>"],
    ["ui/zzz-inert", "<div>no affordance class at all</div>"],
    ["ui/zzz-reveal", "<div>a bloom surface</div>"],
    ["ui/zzz-nofocus", "<button @click class='scale-hover'>x</button>"],
]);

// A1 bite: a planted unmapped interactive package reds.
{
    const r = detectAffordanceGaps({ mapRows, inventory: ["ui/zzz-planted"], dirBodies: SYNTH_DIRS });
    if (!r.facts.unmapped.includes("ui/zzz-planted")) selfFailures.push("A1 self-test: a planted unmapped interactive package was NOT flagged (anti-gameability floor mute)");
}
// A2 bites: an inert ✓ reds; a reveal-surface row does NOT red for an inert pointer affordance.
{
    const synthMap = [
        { label: "Planted", dirs: ["ui/zzz-inert"], H: "✓", G: "—", P: "—", D: "—", F: "✓", source: "", sourceFiles: [], routesButton: false, reveal: false, line: 0 },
        { label: "PlantedReveal", dirs: ["ui/zzz-reveal"], H: "—", G: "—", P: "—", D: "—", F: "—", source: "reveal", sourceFiles: [], routesButton: false, reveal: true, line: 0 },
    ];
    const r = detectAffordanceGaps({ mapRows: synthMap, inventory: ["ui/zzz-inert", "ui/zzz-reveal"], dirBodies: SYNTH_DIRS });
    if (!r.facts.inertCells.some((c) => c.includes("ui/zzz-inert"))) selfFailures.push("A2 self-test: an inert ✓ cell (H:✓ with no wired class) was NOT flagged");
    if (r.violations.some((v) => v.includes("ui/zzz-reveal") && /A2/.test(v) && !/F:/.test(v))) selfFailures.push("A2 self-test: a reveal-surface row was WRONGLY flagged for an inert pointer affordance (the exemption is broken)");
}
// A2 focus bite: an operable element with F:— reds.
{
    const synthMap = [{ label: "PlantedNoFocus", dirs: ["ui/zzz-nofocus"], H: "✓", G: "—", P: "—", D: "—", F: "—", source: "", sourceFiles: [], routesButton: false, reveal: false, line: 0 }];
    const r = detectAffordanceGaps({ mapRows: synthMap, inventory: ["ui/zzz-nofocus"], dirBodies: SYNTH_DIRS });
    if (!r.facts.focusGaps.some((g) => g.includes("ui/zzz-nofocus"))) selfFailures.push("A2 focus self-test: an operable element with F:— was NOT flagged (the keyboard-floor catch mute)");
}
// A3 bites (A3 owns the un-eased-SHAPE axis; the wall-clock is M3's, deferred): an abrupt
// `ease-in` spatial leg reds; an EFFECTS-only color leg + a good spring + the eased
// `--ease-out-expo` arrival do NOT (the wall-clock `--duration-* var(--spring-*)` is
// M3-audited, recorded-not-A3 — proven by NOT firing on it here).
{
    if (desyncViolations(".x { transition: transform 0.3s ease-in; }").length === 0) selfFailures.push("A3 self-test: a planted `transition: transform 0.3s ease-in` (abrupt spatial) was NOT flagged");
    if (desyncViolations(".z { transition: background var(--duration-fast) var(--ease-standard); }").length !== 0) selfFailures.push("A3 self-test: an EFFECTS-only `transition: background … --ease-standard` was WRONGLY flagged");
    if (desyncViolations(".g { transition: transform var(--spring-smooth-duration) var(--spring-smooth); }").length !== 0) selfFailures.push("A3 self-test: a good `transform … --spring-smooth` was WRONGLY flagged");
    if (desyncViolations(".a { transition: transform var(--duration-normal) var(--ease-out-expo); }").length !== 0) selfFailures.push("A3 self-test: a spatial leg on the eased --ease-out-expo arrival was WRONGLY flagged");
    if (desyncViolations(".w { transition: transform var(--duration-normal) var(--spring-snappy); }").length !== 0) selfFailures.push("A3 self-test: a wall-clocked spring was flagged by A3 (it is M3's axis, deferred — A3 owns only the un-eased shape)");
}
add("self-proof", "a1-a3-bites-have-teeth", selfFailures.length === 0, selfFailures.length === 0 ? "the A1/A2/A3 self-test bites flag the planted unmapped/inert/no-focus/abrupt/wall-clock fixtures AND exempt the reveal-surface + effects-only + good-spring fixtures — the bites have teeth" : selfFailures.join("; "));

// ── Report ────────────────────────────────────────────────────────────────────────────
// On an absent submodule the A1/A2 live violations are map-DERIVED (empty mapRows →
// every package reads unmapped) — skip-by-policy. The A3 desync violations are
// src-DERIVED (the per-component corpus) and keep biting either way.
for (const v of violations) {
    if (!submodulePresent && !v.startsWith("A3:")) continue;
    add("live-violation", "map-violation", false, v);
}

const failed = checks.filter((c) => !c.pass);
const arms = [...new Set(checks.map((c) => c.arm))];

console.log("proof:affordance-map — the interaction-affordance completeness gate (BC.W-AFFORDANCE-MAP)");
console.log(`  mapped element classes : ${mapRows.length}`);
console.log(`  interactive inventory  : ${inventory.length} packages`);
for (const arm of arms) {
    const armChecks = checks.filter((c) => c.arm === arm);
    console.log(`  [${arm}] ${armChecks.filter((c) => c.pass).length}/${armChecks.length} pass`);
    for (const c of armChecks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
}

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_AFFORDANCE_MAP_OUT", "BC-affordance-map");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:affordance-map",
    command: COMMAND,
    note: "SOURCE arm only — the live pointer hover/press/click frame-series + the reka stale-binding catch is proven by tests-visual/affordance-map.spec.ts (the π arm), never this gate alone (the cardinal AX lesson).",
    mappedClasses: mapRows.length,
    inventorySize: inventory.length,
    facts,
    checks: checks.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:affordance-map] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:affordance-map] LOCKED — ${inventory.length} interactive packages on the map (${mapRows.length} classes); no inert/unmapped element, no F:— on an operable element, no desynced/abrupt affordance leg; the five-primitive vocabulary is closed; the π arm proves the live render.`,
);
