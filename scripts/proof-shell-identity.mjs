// proof:shell-identity — AZ.W-SHELL-IDENTITY: the demo-shell home-region identity
// gate (born-RED, device-free SOURCE arm S1–S4).
//
// R3-12 ("duplicated compass") + R3-15 ("the ℱ is not centered in its hover/shadow
// area"). The demo's SidebarDock home region stacked TWO Foundations affordances —
// the script-ℱ wordmark (RouterLink to="/" → /foundations/intro) AND the Foundations
// category's Compass DockIconButton — with no divider, and the ℱ was a bare transparent
// rounded-full circle (no glass hover register, the painted ink off-center). This wave:
//   1. drops the redundant Foundations DockIconButton (the ℱ IS the single Foundations
//      entry) — primaryCategories excludes id === "foundations";
//   2. demarcates the home control with a <DockSeparator> in the #persistent region;
//   3. renders the ℱ AS a DockIconButton (as-child onto the RouterLink) so it carries
//      the first-class dock-control glass hover register (--dock-control-hover-bg +
//      the specular gleam + --scale-hover-dock), NOT a bare transparent circle;
//   4. optically centers the italic script-ℱ ink-mass via a transform nudge on the
//      inner <span> (the .demo-sidebar-home > span rule in dock-nav.css).
//
// THE DEVICE-FREE SOURCE ARM (this file, S1–S4) proves the TEMPLATE/STYLE STRUCTURE;
// the π arm (tests-visual/shell-identity.spec.ts, S5) proves the RENDER — the ink-mass
// re-seats within the ±0.5px band (the bite S2 cannot give: a present-but-wrong nudge
// passes S2 and REDs S5). This arm asserts (SidebarDock.vue + dock-nav.css src-scan):
//   S1 — no redundant Foundations affordance: primaryCategories EXCLUDES
//        id === "foundations" (the ℱ wordmark is the single Foundations entry; the
//        Compass home dup is gone).
//   S2 — the ℱ carries the optical-center transform: .demo-sidebar-home > span declares
//        a `transform: translate(<x>, <y>)` with a NON-ZERO x AND y (not bare flex-center,
//        not translate(0,0)).
//   S3 — the home control composes the dock-control glass hover register: the ℱ renders
//        as a <DockIconButton> (the .dock-icon-button / glass-specular-track class) via
//        as-child, NOT a bare transparent rounded-full <RouterLink>.
//   S4 — a <DockSeparator> demarcates the home control (the #persistent region carries it).
//
// Born-RED at the pre-edit tree: primaryCategories filtered only `!c.reference` (S1),
// the RouterLink was a bare `rounded-full` with no DockIconButton wrapper + no optical
// transform (S2/S3), and the #persistent region carried no separator (S4).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:shell-identity";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip JS/CSS comments so a prose mention in a comment is NOT a false hit — the
// whole gate is comment-blind. Preserve newlines so line geometry holds.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const sidebar = strip(read("demo/layout/SidebarDock.vue"));
const dockNav = strip(read("demo/layout/dock-nav.css"));

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── S1 — no redundant Foundations affordance ─────────────────────────────────────
// primaryCategories EXCLUDES id === "foundations" (the ℱ wordmark is its single entry).
add(
    "no-redundant-foundations",
    /primaryCategories\s*=\s*computed\(\s*\(\)\s*=>[\s\S]*?c\.id\s*!==\s*["']foundations["']/.test(
        sidebar,
    ),
    'primaryCategories excludes c.id === "foundations" — the Compass home dup is dropped; the ℱ wordmark is the single Foundations affordance (R3-12)',
);

// ── S2 — the ℱ carries a NON-TRIVIAL optical-center transform ────────────────────
// The .demo-sidebar-home > span rule declares transform: translate(<x>, <y>) with a
// non-zero x AND y (not bare flex-center, not translate(0, 0)).
const homeSpanRule = dockNav.match(
    /\.demo-sidebar-home\s*>\s*span\s*\{([\s\S]*?)\}/,
);
const homeSpanBody = homeSpanRule ? homeSpanRule[1] : "";
const translateMatch = homeSpanBody.match(
    /transform:\s*translate\(\s*(-?[\d.]+)px\s*,\s*(-?[\d.]+)px\s*\)/,
);
const tx = translateMatch ? Number(translateMatch[1]) : 0;
const ty = translateMatch ? Number(translateMatch[2]) : 0;
add(
    "optical-center-transform-present",
    Boolean(translateMatch) && Math.abs(tx) > 0.01 && Math.abs(ty) > 0.01,
    translateMatch
        ? `.demo-sidebar-home > span declares transform: translate(${tx}px, ${ty}px) — a non-trivial optical-center nudge (re-seats the italic ℱ ink-mass; the ±0.5px BAND is bound by the π arm S5)`
        : ".demo-sidebar-home > span carries NO transform: translate(<x>px, <y>px) optical-center nudge (the bare flex-center leaves the ink off-center — R3-15)",
);

// ── S3 — the home control composes the dock-control glass hover register ──────────
// The ℱ renders AS a <DockIconButton> (carries .dock-icon-button / glass-specular-track)
// via as-child onto the RouterLink, NOT a bare transparent rounded-full link. The
// #persistent slot must wrap a <DockIconButton as-child> around the home RouterLink.
const persistentBlock = sidebar.match(
    /<template\s+#persistent>([\s\S]*?)<\/template>/,
);
const persistentBody = persistentBlock ? persistentBlock[1] : "";
add(
    "home-control-glass-register",
    /<DockIconButton[\s\S]*?as-child[\s\S]*?<RouterLink[\s\S]*?to="\/"/.test(
        persistentBody,
    ),
    "the ℱ home RouterLink renders inside <DockIconButton as-child> — it carries the first-class dock-control glass hover register (--dock-control-hover-bg + specular gleam + --scale-hover-dock), NOT a bare transparent rounded-full circle (R3-15 / D3)",
);

// ── S4 — a <DockSeparator> demarcates the home control ───────────────────────────
add(
    "home-separator",
    /<DockSeparator\s*\/?>/.test(persistentBody),
    "a <DockSeparator> demarcates the ℱ home control in the #persistent region (the home-top divider, R3-12 / D1)",
);

// ── (z) — the π readback spec is wired (the BINDING close — S5 measured band) ─────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/shell-identity.spec.ts")),
    "tests-visual/shell-identity.spec.ts exists (the S5 measured ±0.5px ink-mass band + the home-region DOM/hover readback — the BINDING close)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:shell-identity — the demo-shell home-region identity gate (AZ.W-SHELL-IDENTITY, S1–S4)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_SHELL_IDENTITY_OUT", "AZ-shell-identity");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:shell-identity",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm (S1–S4) — the optically-centered ink-mass within the ±0.5px band is proven by tests-visual/shell-identity.spec.ts (the S5 live re-run of the C8 ink-scan), never this gate alone (S2 passes with ANY transform value; S5 binds the band).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:shell-identity] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:shell-identity] the home region is ONE Foundations entry — the ℱ alone, demarcated by a <DockSeparator>, carrying the dock-control glass hover register, with the optical-center nudge present; the π arm binds the ±0.5px ink-mass band.",
);
