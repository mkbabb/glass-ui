// proof:shell-config — AZ.W-SHELL-CONFIG: the gear-hosted demo-configurator gate
// (born-RED, device-free SOURCE arm).
//
// R3-4 (refined by R4-3): the demo's gear opens the glass-ui demo CONFIGURATOR —
// re-framed (renamed from "Preset Editor"), exposing the post-W54 design axes
// (--glass-level, --ui-scale, an optional PRM control), and that configurator is the
// SINGLE chrome home for the dark-mode toggle. The floating FAB that hovered over
// every page is GONE (rehomed onto a SidebarDock gear DockIconButton); the composables
// reference VIEW is DELETED; the standalone SidebarDock DarkModeToggle is removed. The
// `,` shortcut + the window event survive (the keyboard/programmatic open is unchanged).
//
// THIS FILE IS THE DEVICE-FREE half (the deletion proofs + source-witnesses) — it
// carries `ci`. The π captures + the runtime slider/shortcut readbacks (the no-floating-
// gear capture, the live --glass-level/--ui-scale write readbacks, the `,`-shortcut
// toggle, the re-framed title render) are the LOCAL-ONLY π half in
// tests-visual/shell-config.spec.ts (auto-detected LIVE_VERIFIED_LOCAL_ONLY,
// ledger-backstopped under proof:live-verified-ledger). The house split — the
// W-REGISTER-IOS / W-SHELL-IDENTITY precedent.
//
// Bites (device-free):
//   1. FAB-GONE (deletion proof)  — PresetEditor.vue renders NO `fixed bottom-6
//      right-6 … rounded-full` FAB SheetTrigger, and imports no Settings2 FAB glyph.
//   2. COMPOSABLES-GONE (deletion proof) — manifest.ts has NO id:"composables"
//      category and NO Cog import.
//   3. SINGLE-DARK-HOME (deletion proof + source-witness) — SidebarDock.vue imports NO
//      DarkModeToggle and renders none; the configurator renders the canonical live
//      <DarkModeToggle> bound to useGlobalDark (BA.W-CONFIG-CHASSIS.3 — the prior
//      `darkModel`/<Switch> shadow was REMOVED, dark mode is owned SOLELY by the global
//      composable). The configurator's <DarkModeToggle> is the single chrome dark control.
//   4. AXES-PRESENT (source-witness) — ConfigBaseline carries the two REQUIRED axes
//      (glassLevel + scale), css-writers.ts writes --glass-level + --ui-scale to :root
//      (NOT --dock-scale), and PRM-if-present is verified (a `motion` field that DOES
//      ship must write --demo-reduce-motion — no dead field; PRM-absent is allowed).
//   5. RE-FRAMED (source-witness; the binding RENDER is the π arm) — PresetEditor.vue's
//      SheetTitle reads "glass-ui demo Configurator", not "Preset Editor".
//   6. REHOME (source-witness) — the SidebarDock #collapsed gear dispatches the SAME
//      glass-ui-demo:toggle-configurator event (the rehomed open).
//
// Born-RED at the pre-edit tree: PresetEditor.vue carried the fixed FAB + the "Preset
// Editor" title + no glass-level/scale/PRM + no canonical <DarkModeToggle> dark home;
// manifest.ts had id:"composables" + Cog; SidebarDock.vue imported + rendered the
// standalone DarkModeToggle. The single-dark-home check is born-RED on a tree whose
// configurator has neither the live <DarkModeToggle> nor the useGlobalDark binding.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:shell-config";

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

const presetEditor = strip(read("demo/configurator/PresetEditor.vue"));
const manifest = strip(read("demo/stories/manifest.ts"));
const sidebar = strip(read("demo/layout/SidebarDock.vue"));
const types = strip(read("demo/configurator/preset-editor/types.ts"));
const cssWriters = strip(read("demo/configurator/preset-editor/css-writers.ts"));

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── 1 — FAB-GONE ────────────────────────────────────────────────────────────────
// No `fixed bottom-6 right-6 … rounded-full` FAB SheetTrigger; no Settings2 glyph FAB.
const hasFixedFab =
    /fixed\s+bottom-6\s+right-6/.test(presetEditor) ||
    /<SheetTrigger\b/.test(presetEditor);
add(
    "fab-gone",
    !hasFixedFab,
    hasFixedFab
        ? "PresetEditor.vue STILL carries a fixed bottom-6 right-6 FAB SheetTrigger — the floating gear must be removed (rehomed onto the dock gear control)"
        : "PresetEditor.vue renders NO fixed-FAB SheetTrigger (the floating gear is gone; the open is rehomed onto the SidebarDock gear + the `,` shortcut) — D1",
);

// ── 2 — COMPOSABLES-GONE ──────────────────────────────────────────────────────────
// manifest.ts has NO id:"composables" category and NO Cog import.
const hasComposablesCategory = /id:\s*["']composables["']/.test(manifest);
const hasCogImport = /\bCog\b/.test(manifest);
add(
    "composables-gone",
    !hasComposablesCategory && !hasCogImport,
    hasComposablesCategory || hasCogImport
        ? `manifest.ts STILL declares the composables category (${hasComposablesCategory ? "id:\"composables\" present" : "absent"}) / the Cog import (${hasCogImport ? "present" : "absent"}) — the 22-story reference view must be DELETED (clean break, no alias)`
        : "manifest.ts has NO id:\"composables\" category and NO Cog import — the reference view is deleted; routes/rail derive automatically — D4",
);

// ── 3 — SINGLE-DARK-HOME ────────────────────────────────────────────────────────
// SidebarDock.vue imports NO standalone DarkModeToggle and renders none; the
// configurator renders the canonical live <DarkModeToggle> as its single chrome dark
// control (BA.W-CONFIG-CHASSIS.3 — the prior `darkModel`/<Switch> config-store shadow
// was REMOVED so there is no desync). The <DarkModeToggle> is SELF-SYNCING — it owns
// the useGlobalDark binding INTERNALLY (DarkModeToggle.vue calls useGlobalDark()), so
// the chrome dark home is the component RENDER (import + template use), not a direct
// useGlobalDark call in PresetEditor (dark mode is owned SOLELY by the global composable
// the component binds).
const sidebarHasDarkToggle = /\bDarkModeToggle\b/.test(sidebar);
const configImportsDarkToggle = /import\s*\{[^}]*\bDarkModeToggle\b[^}]*\}/.test(presetEditor);
const configRendersDarkToggle = /<DarkModeToggle\b/.test(presetEditor);
const configHasDarkHome = configImportsDarkToggle && configRendersDarkToggle;
add(
    "single-dark-home",
    !sidebarHasDarkToggle && configHasDarkHome,
    sidebarHasDarkToggle
        ? "SidebarDock.vue STILL imports/renders the standalone DarkModeToggle — the configurator's <DarkModeToggle> must be the SINGLE chrome dark control (D5)"
        : configHasDarkHome
          ? "SidebarDock.vue renders NO standalone DarkModeToggle; the configurator's canonical self-syncing <DarkModeToggle> is the single chrome home — D5"
          : "the configurator's canonical <DarkModeToggle> (the self-syncing single chrome dark control) is missing — it must be imported AND rendered after the standalone toggle removal",
);

// ── 4 — AXES-PRESENT (source-witness) ───────────────────────────────────────────
// ConfigBaseline carries glassLevel + scale (the two REQUIRED axes); css-writers writes
// --glass-level + --ui-scale (NOT --dock-scale); PRM-if-present writes --demo-reduce-motion.
const baselineHasGlassLevel = /\bglassLevel\s*:/.test(types);
const baselineHasScale = /\bscale\s*:/.test(types);
const writesGlassLevel = /setProperty\(\s*["']--glass-level["']/.test(cssWriters);
const writesUiScale = /setProperty\(\s*["']--ui-scale["']/.test(cssWriters);
const writesDockScaleDirect = /setProperty\(\s*["']--dock-scale["']/.test(cssWriters);
add(
    "axes-glass-level",
    baselineHasGlassLevel && writesGlassLevel,
    baselineHasGlassLevel && writesGlassLevel
        ? "ConfigBaseline carries glassLevel + css-writers writes --glass-level to :root (the W54 maximal-glass knob surfaced) — D3"
        : `the --glass-level axis is incomplete (ConfigBaseline.glassLevel ${baselineHasGlassLevel ? "present" : "ABSENT"}, css-writers --glass-level ${writesGlassLevel ? "written" : "NOT written"})`,
);
add(
    "axes-ui-scale-not-dock-scale",
    baselineHasScale && writesUiScale && !writesDockScaleDirect,
    baselineHasScale && writesUiScale && !writesDockScaleDirect
        ? "ConfigBaseline carries scale + css-writers writes --ui-scale (the GLOBAL knob — the dock's --dock-scale derives from it) and does NOT write --dock-scale directly — D3"
        : `the scale axis is wrong (ConfigBaseline.scale ${baselineHasScale ? "present" : "ABSENT"}, --ui-scale ${writesUiScale ? "written" : "NOT written"}, --dock-scale-direct ${writesDockScaleDirect ? "WRITTEN — must derive, not be written directly" : "correctly absent"})`,
);

// PRM is OPTIONAL (§3.4) but CONDITIONALLY binding (§6.4): a `motion` field that DOES
// ship must write a live --demo-reduce-motion signal — no dead field. PRM-absent is
// allowed (the two-required-axes floor is the hard requirement).
const baselineHasMotion = /\bmotion\s*:/.test(types);
const writesReduceMotion = /setProperty\(\s*["']--demo-reduce-motion["']/.test(cssWriters);
add(
    "axes-prm-if-present",
    !baselineHasMotion || writesReduceMotion,
    baselineHasMotion
        ? writesReduceMotion
            ? "the optional PRM `motion` field SHIPS and writes a live --demo-reduce-motion signal to :root (no dead field) — D3/§6.4"
            : "the `motion` field is declared but writes NO live --demo-reduce-motion signal — a dead field is disallowed (§6.4: PRM-if-present must write a live PRM signal)"
        : "the optional PRM control is absent — allowed (§3.4); the two-required-axes floor (glassLevel + scale) is the hard requirement",
);

// ── 5 — RE-FRAMED (source-witness; the π arm binds the RENDER) ───────────────────
const reFramedTitle =
    /glass-ui demo Configurator/.test(presetEditor) &&
    !/<SheetTitle[^>]*>\s*Preset Editor\s*<\/SheetTitle>/.test(presetEditor);
add(
    "re-framed-title",
    reFramedTitle,
    reFramedTitle
        ? 'PresetEditor.vue\'s SheetTitle reads "glass-ui demo Configurator", not "Preset Editor" — D2 (the painted title is bound by the π arm)'
        : 'PresetEditor.vue still titles itself "Preset Editor" — re-frame to "glass-ui demo Configurator" (D2)',
);

// ── 6 — REHOME (source-witness) ──────────────────────────────────────────────────
// The SidebarDock gear dispatches the SAME glass-ui-demo:toggle-configurator event.
const sidebarRehomesGear =
    /glass-ui-demo:toggle-configurator/.test(sidebar) &&
    /<Settings2\b/.test(sidebar);
add(
    "rehome-gear-dispatch",
    sidebarRehomesGear,
    sidebarRehomesGear
        ? "SidebarDock.vue rehomes the open onto a Settings2 gear DockIconButton that dispatches glass-ui-demo:toggle-configurator (the SAME event the `,` shortcut fires — one event path) — D1/D6"
        : "SidebarDock.vue does NOT rehome the configurator-open gear (a Settings2 control dispatching glass-ui-demo:toggle-configurator) — the dock-as-chrome rehome is missing",
);

// ── (z) — the π readback spec is wired (the BINDING close — the render/runtime arm) ─
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/shell-config.spec.ts")),
    "tests-visual/shell-config.spec.ts exists (the π/runtime arm: the no-floating-gear capture, the live --glass-level/--ui-scale slider→:root readbacks, the `,`-shortcut toggle, the re-framed title render — the BINDING visual/runtime truth, ledger-backstopped)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:shell-config — the gear-hosted demo-configurator gate (AZ.W-SHELL-CONFIG, device-free SOURCE arm)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_SHELL_CONFIG_OUT", "AZ-shell-config");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:shell-config",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm (deletion proofs + source-witnesses) — the floating-gear-gone capture, the live slider→:root write readbacks, the `,`-shortcut toggle, and the re-framed title RENDER are the LOCAL-ONLY π half (tests-visual/shell-config.spec.ts), ledger-backstopped. PRM is verified-if-present, allowed-if-absent (the two-required-axes floor is the hard requirement).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:shell-config] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:shell-config] the gear opens the re-framed glass-ui demo Configurator (the two removals landed, the post-W54 axes present, the single dark home); the π arm binds the render + the live slider/shortcut readbacks.",
);
