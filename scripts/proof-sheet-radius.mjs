// proof:sheet-radius — BI.W-SHEET-RADIUS (UF-A3 rounding half / FAM-4 / GEO-2):
// the Sheet primitive reads ROUNDED, and the shipped squircle @supports rule is no
// longer vacuous on a 0-radius box (born-RED → GREEN; device-free SOURCE arm).
//
// The defect (ss-23, "the drawer is not rounded"): `sheetVariants` set `border-l/-r`
// per side but NO `border-radius` → the panel is fully SQUARE at the screen edge, and
// the `.glass-floating.sheet-animate` `corner-shape` @supports coupling (glass/
// squircle.css) is DEAD on a 0-radius box — a superellipse needs a base radius to
// read (the vacuous-gate GEO-2: the squircle rule greens over a box it can never
// paint).
//
// The fix (D-GLASS PASS-1 §4 Law 2 — a multi-row section/sheet wears a card radius):
// per-side INNER radius classes on `sheetVariants` (right→rounded-l-dialog, left→
// rounded-r-dialog, top→rounded-b-dialog, bottom→rounded-t-dialog — the dialog/card
// rung). The edge flush against the viewport stays SQUARE (it meets the screen edge);
// only the INNER corners round. With a non-zero radius the shipped squircle rule
// becomes LIVE. The Sheet ALSO publishes the Law-1 concentric relay (--radius-ctx +
// --radius-inset) on its content root so the gear-sheet nested Configurator sections
// derive concentric (W-CONFIG-IN-SHEET, site #3).
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE (each side arm rounds its inner
// edge; the flush edge stays square; the squircle host resolves a non-zero radius —
// GEO-2 dead; the relay publish present). The π arm (tests-visual/sheet-radius.spec.ts)
// proves the RENDER this gate cannot: the gear Configurator sheet's inner corners
// resolve ≈ --radius-dialog + the viewport-flush edge square + the squircle curve
// reads on Chrome/Safari, both modes.
//
// It asserts (S1–S6 + self-test):
//   S1 — every `side` arm (top/bottom/left/right) carries a NON-ZERO inner-edge
//        rounded class (born-RED at HEAD: none — fully square).
//   S2 — the rounding is INNER-ONLY (the viewport-flush edge stays SQUARE): no
//        flush-edge round, no flush-corner round, no all-corners round.
//   S3 — the squircle @supports coupling rule is present (`.glass-floating.sheet-
//        animate` → `corner-shape: var(--corner-shape-sheet)` under `@supports
//        (corner-shape: superellipse(2))`).
//   S4 — the coupling is NON-VACUOUS: the named radius rung (--radius-dialog) resolves
//        to a NON-ZERO length in theme/radius.css, so the squircle host has a real
//        base radius (the GEO-2 vacuous-gate kill).
//   S5 — the Law-1 concentric relay is PUBLISHED: SheetContent.vue writes --radius-ctx
//        + --radius-inset on the content root (site #3, the CONFIG-IN-SHEET parent).
//   S6 — the π readback spec (tests-visual/sheet-radius.spec.ts) is wired.
//
// Born-RED at HEAD: `sheetVariants` carries NO radius (S1 fails all four sides), and
// the squircle rule is vacuous on the 0-radius box (S4's intent).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:sheet-radius";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip JS `//` + `/* */` comments so a prose mention of a class/token in a comment
// is NOT a false hit — the gate is comment-blind. Preserve newlines.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const SHEET_RAW = read("src/components/ui/sheet/index.ts");
const SHEET = strip(SHEET_RAW);
const CONTENT_RAW = read("src/components/ui/sheet/SheetContent.vue");
const CONTENT = strip(CONTENT_RAW);
const SQUIRCLE = read("src/styles/glass/squircle.css");
const RADIUS_CSS = read("src/styles/theme/radius.css");

// ── The per-side inner/flush geometry contract ───────────────────────────────────
// A right sheet is flush against the RIGHT viewport edge → its right corners stay
// SQUARE, its LEFT (inner) corners round. Symmetrically per side.
const EDGE_INNER = { top: "b", bottom: "t", left: "r", right: "l" };
const EDGE_FLUSH = { top: "t", bottom: "b", left: "l", right: "r" };
const CORNERS_FLUSH = {
    top: ["tl", "tr"],
    bottom: ["bl", "br"],
    left: ["tl", "bl"],
    right: ["tr", "br"],
};
const SIDES = ["top", "bottom", "left", "right"];

// ── Classify a `rounded-*` class token ───────────────────────────────────────────
//   rounded-l-dialog → { kind:'edge',   key:'l',  name:'dialog', nonzero:true }
//   rounded-tl-sm    → { kind:'corner', key:'tl', name:'sm',     nonzero:true }
//   rounded-dialog   → { kind:'all',    key:null, name:'dialog', nonzero:true }
//   rounded-l-none   → { kind:'edge',   key:'l',  name:'none',   nonzero:false }
const classifyRounded = (token) => {
    const rest = token.replace(/^rounded-/, "");
    const cornerM = /^(tl|tr|bl|br)-(.+)$/.exec(rest);
    const edgeM = /^([tblr])-(.+)$/.exec(rest);
    let kind, key, name;
    if (cornerM) {
        kind = "corner";
        key = cornerM[1];
        name = cornerM[2];
    } else if (edgeM) {
        kind = "edge";
        key = edgeM[1];
        name = edgeM[2];
    } else {
        kind = "all";
        key = null;
        name = rest;
    }
    const nonzero = name !== "none" && name !== "0";
    return { kind, key, name, nonzero };
};

const roundedTokens = (rung) => (rung.match(/\brounded-\S+/g) ?? []).map(classifyRounded);

// S1 — the inner edge is rounded (non-zero).
const innerRounded = (rung, side) =>
    roundedTokens(rung).some(
        (t) => t.kind === "edge" && t.key === EDGE_INNER[side] && t.nonzero,
    );

// S2 — the flush edge stays square: NO non-zero round reaches the flush edge (neither a
// flush-edge form, a flush-corner form, nor an all-corners form).
const flushSquare = (rung, side) =>
    !roundedTokens(rung).some(
        (t) =>
            t.nonzero &&
            ((t.kind === "edge" && t.key === EDGE_FLUSH[side]) ||
                (t.kind === "corner" && CORNERS_FLUSH[side].includes(t.key)) ||
                t.kind === "all"),
    );

// ── Extract the `side: { … }` variant block, then each side's class string ───────
const sideBlock = (() => {
    const m = /side\s*:\s*\{/.exec(SHEET);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    while (i < SHEET.length && depth > 0) {
        const ch = SHEET[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
    }
    return SHEET.slice(start, i - 1);
})();

const rungString = (name) => {
    if (sideBlock == null) return null;
    const re = new RegExp(`\\b${name}\\s*:\\s*(['"\`])([\\s\\S]*?)\\1`);
    const m = re.exec(sideBlock);
    return m ? m[2] : null;
};

// ── A minimal radius-token resolver over theme/radius.css (follows var() chains) ──
const resolveRadiusToken = (name, depth = 0) => {
    if (depth > 8) return null;
    const bare = name.replace(/^--/, "");
    const re = new RegExp(`--${bare}\\s*:\\s*([^;]+);`);
    const m = re.exec(RADIUS_CSS);
    if (!m) return null;
    const val = m[1].trim();
    const varM = /^var\(\s*(--[\w-]+)\s*\)$/.exec(val);
    if (varM) return resolveRadiusToken(varM[1], depth + 1);
    return val;
};
const isNonZeroLength = (v) =>
    v != null && v !== "none" && /\d/.test(v) && !/^0(?:px|rem|em|%)?$/.test(v.trim());

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── S1 — every side arm carries a non-zero inner-edge radius ─────────────────────
const s1Misses = [];
for (const side of SIDES) {
    const s = rungString(side);
    if (s == null) {
        s1Misses.push(`${side} [rung absent]`);
        continue;
    }
    if (!innerRounded(s, side))
        s1Misses.push(`${side} [no non-zero rounded-${EDGE_INNER[side]}-* inner radius]`);
}
add(
    "S1-side-arms-inner-radius",
    sideBlock != null && s1Misses.length === 0,
    sideBlock != null && s1Misses.length === 0
        ? `all ${SIDES.length} sheet side arms round their INNER edge (top→rounded-b, bottom→rounded-t, left→rounded-r, right→rounded-l on the dialog/card rung) — the Sheet reads ROUNDED (UF-A3/FAM-4 closed)`
        : `S1 FAIL — ${sideBlock == null ? "side variant block not found" : `side(s): ${s1Misses.join("; ")}`}`,
);

// ── S2 — the viewport-flush edge stays SQUARE ────────────────────────────────────
const s2Misses = [];
for (const side of SIDES) {
    const s = rungString(side);
    if (s == null) continue; // S1 already flags an absent rung
    if (!flushSquare(s, side))
        s2Misses.push(`${side} [flush edge (rounded-${EDGE_FLUSH[side]}/corner/all) rounded]`);
}
add(
    "S2-flush-edge-square",
    sideBlock != null && s2Misses.length === 0,
    sideBlock != null && s2Misses.length === 0
        ? "every side rounds ONLY its inner corners — the viewport-flush edge stays square (it meets the screen edge); no flush-edge/flush-corner/all-corners round"
        : `S2 FAIL — ${s2Misses.join("; ")}`,
);

// ── S3 — the squircle @supports coupling rule is present ─────────────────────────
const hasSupports = /@supports\s*\(\s*corner-shape\s*:\s*superellipse\(2\)\s*\)/.test(SQUIRCLE);
const hasSheetCoupling =
    /\.glass-floating\.sheet-animate\s*\{[^}]*corner-shape\s*:\s*var\(\s*--corner-shape-sheet\s*\)/.test(
        SQUIRCLE,
    );
add(
    "S3-squircle-coupling-present",
    hasSupports && hasSheetCoupling,
    hasSupports && hasSheetCoupling
        ? "glass/squircle.css couples `.glass-floating.sheet-animate → corner-shape: var(--corner-shape-sheet)` under `@supports (corner-shape: superellipse(2))` — the squircle enhancement over the round contract"
        : `S3 FAIL (@supports superellipse(2): ${hasSupports}; sheet-animate corner-shape coupling: ${hasSheetCoupling})`,
);

// ── S4 — the coupling is NON-VACUOUS: the host radius rung resolves non-zero ──────
const dialogResolved = resolveRadiusToken("--radius-dialog");
const dialogNonZero = isNonZeroLength(dialogResolved);
add(
    "S4-squircle-host-radius-non-zero",
    dialogNonZero,
    dialogNonZero
        ? `--radius-dialog resolves to a NON-ZERO length (${dialogResolved}) in theme/radius.css — the squircle host (the sheetVariants-rounded content) has a real base radius, so the corner-shape rule is not vacuous (GEO-2 vacuous-gate DEAD)`
        : `S4 FAIL — --radius-dialog resolved to '${dialogResolved}' (not a non-zero length); the squircle rule would be vacuous`,
);

// ── S5 — the Law-1 concentric relay is published on the content root ─────────────
const publishesCtx = /['"]--radius-ctx['"]\s*:/.test(CONTENT);
const publishesInset = /['"]--radius-inset['"]\s*:/.test(CONTENT);
add(
    "S5-relay-publish",
    publishesCtx && publishesInset,
    publishesCtx && publishesInset
        ? "SheetContent.vue publishes --radius-ctx + --radius-inset on the content root (Law-1 concentric relay, site #3 — the gear-sheet Configurator sections derive their corner concentric)"
        : `S5 FAIL (--radius-ctx: ${publishesCtx}; --radius-inset: ${publishesInset})`,
);

// ── S6 — the π readback spec is wired (the BINDING close) ─────────────────────────
add(
    "S6-pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/sheet-radius.spec.ts")),
    "tests-visual/sheet-radius.spec.ts exists (the π: the gear Configurator sheet inner corners ≈ --radius-dialog + the viewport-flush edge square + the squircle corner-shape reads on Chrome/Safari, both modes — the BINDING close)",
);

// ── Self-test bites (anti-evasion) — the distinguishing reds ─────────────────────
const selfTest = (() => {
    const bites = [];
    // A 0-radius side arm (the HEAD form — no rounded class) flags S1.
    bites.push({
        id: "bite-0-radius-flags",
        reds: !innerRounded("border-l data-[state=open]:slide-in-from-right", "right"),
    });
    // A `rounded-l-none` inner arm (zero radius) flags S1.
    bites.push({
        id: "bite-rounded-none-flags",
        reds: !innerRounded("rounded-l-none border-l", "right"),
    });
    // The honest per-side inner round passes BOTH S1 and S2.
    bites.push({
        id: "bite-inner-round-passes",
        reds:
            innerRounded("rounded-l-dialog border-l", "right") &&
            flushSquare("rounded-l-dialog border-l", "right"),
    });
    // Rounding the FLUSH edge (right arm rounds rounded-r) flags S2.
    bites.push({
        id: "bite-flush-edge-round-flags",
        reds: !flushSquare("rounded-r-dialog border-l", "right"),
    });
    // An all-corners round (rounds the flush edge too) flags S2.
    bites.push({
        id: "bite-all-corners-round-flags",
        reds: !flushSquare("rounded-dialog border-l", "right"),
    });
    // A non-zero radius token resolves non-zero (the S4 detector is not hollow).
    bites.push({
        id: "bite-non-zero-radius-detected",
        reds: isNonZeroLength("1rem") && !isNonZeroLength("0px") && !isNonZeroLength("none"),
    });
    return bites;
})();
const selfTestPasses = selfTest.every((b) => b.reds);
add(
    "self-test-bite",
    selfTestPasses,
    selfTestPasses
        ? `the distinguishing bites all hold: ${selfTest.map((b) => b.id).join(", ")}`
        : `self-test FAIL — a bite did not hold: ${selfTest.filter((b) => !b.reds).map((b) => b.id).join(", ")}`,
);

// ── Report ───────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:sheet-radius — the Sheet reads rounded; the dead squircle rule made live (BI.W-SHEET-RADIUS / UF-A3 / GEO-2)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_SHEET_RADIUS_OUT", "BI-sheet-radius");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:sheet-radius",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm (S1 every side arm rounds its inner edge; S2 the viewport-flush edge stays square; S3 the squircle @supports coupling present; S4 the host radius rung resolves non-zero — GEO-2 vacuous-gate dead; S5 the Law-1 --radius-ctx/--radius-inset relay published; S6 π-spec wired; + a 6-bite self-test). The RESOLVED render (the gear Configurator sheet inner corners ≈ --radius-dialog + the flush edge square + the squircle curve reads on Chrome/Safari, both modes) is proven by tests-visual/sheet-radius.spec.ts, never this gate alone.",
    sides: SIDES,
    dialogResolved,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:sheet-radius] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:sheet-radius] the Sheet rounds its inner edge (flush edge square) on the dialog rung; the squircle host has a real radius so the corner-shape rule reads; the Law-1 relay is published — the π arm binds the resolved render.",
);
