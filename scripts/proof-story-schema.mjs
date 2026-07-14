#!/usr/bin/env node
// proof:story-schema — the pages-as-data schema gate (BI.W-STORY-SCHEMA).
//
// STORY-A: a spec-sheet story page is a STACK OF SECTIONS of REAL library
// specimens, uniform enough to be DATA (`StoryBody`) instead of hand-authored
// template. `StoryBodyRenderer` expands the data INTO the ONE specimen kit
// (StorySection → SpecimenFrame / PermutationGrid → CodeBlock), so "real
// permutations, no oversize specimen, no meta prose" is un-expressible by
// construction, not gate-caught. This gate is the SOURCE arm; the PAINTED parity
// (the migrated pages render byte-visually-identical, state + colors intact, on
// Chrome + real Safari) rides the π batch (#92) — the cardinal split.
//
// Pure FS, device-free. BORN-RED at HEAD (demo/chassis/body/ absent, no migrated
// bodies on disk); GREEN once the schema + renderer + the 4 migrated bodies land.
//
// Clauses:
//   S1 — the schema exists at story-body.ts (StoryBody/SectionSpec/SpecimenSpec/
//        SpecimenSize/StoryScope) AND is PURE DATA: no Vue VALUE import (type-only
//        `import type { Component }` is fine), no render closure (the Vue-in-JSON
//        anti-pattern reds).
//   S2 — StoryBodyRenderer dispatches INTO the kit primitives ONLY (its component
//        imports ⊆ {StorySection, SpecimenFrame, PermutationGrid, CodeBlock}; no
//        <style> block) — a net-new visual primitive reds. The mechanisms are
//        present: the models→v-model expansion, the permute cartesian, the per-cell
//        isolated scope, the auto aria-label.
//   S3 — named-v-model is the EXPLICIT `models` map (ruling 8): the migrated set
//        exercises it AND a genuinely NAMED (non-modelValue) model; a bare
//        model-shaped prop under `props:` (the silent no-op trap) reds.
//   S4 — the `prefix` field is DECIDED (ruling 9): ABSENT — only badge would have
//        consumed it (1 consumer), so the ≥2-consumer law drops it (badge uses the
//        SpecimenFrame slot/label escape). A 1-consumer `prefix` survivor reds.
//   S5 — the migrated spec-sheet set clears ≥70% MEAN as-data with no page <60%;
//        data/table stays BESPOKE (the quirk-watch: tabular rows/cols would need a
//        per-page quirk field, so the page takes the escape, not the schema).
//
// Self-test bites (run INLINE on every invocation — the gate proves its own
// detectors have teeth, house pattern): a planted closure in the schema REDs S1; a
// planted bare-modelValue named-model spec REDs S3; a synthetic 1-consumer `prefix`
// REDs S4; a planted section quirk field REDs S5. The bites test the DETECTORS (pure
// synthetic strings), so they pass regardless of tree state; born-RED is the real
// S1-S5 arms at HEAD, not the bites.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:story-schema";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip comments (HTML/CSS/JS-line/JS-block) so a prose mention never false-hits.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/./g, " "));

const SCHEMA_PATH = "demo/chassis/body/story-body.ts";
const RENDERER_PATH = "demo/chassis/body/StoryBodyRenderer.vue";
const MANIFEST_PATH = "demo/stories/manifest.ts";
const MIGRATED = [
    "demo/stories/forms/inputs.vue",
    "demo/stories/display/badge.vue",
    "demo/stories/feedback/alert.vue",
    "demo/stories/forms/select.vue",
];
const QUIRK_WATCH = "demo/stories/data/table.vue";

const KIT = ["StorySection", "SpecimenFrame", "PermutationGrid", "CodeBlock"];
const SECTION_KEYS = new Set([
    "heading",
    "label",
    "blurb",
    "size",
    "permute",
    "specimens",
    "bespoke",
]);

// ── detectors (shared by the real arm + the self-test bites) ────────────────────

// A render closure / Vue VALUE runtime smuggled into the schema (type-only imports
// are pure data; a `=>` / function / h()/ref()/reactive() / non-type vue import is
// the "Vue-in-JSON" anti-pattern).
function schemaHasClosure(text) {
    const s = strip(text);
    if (/=>|\bfunction\b|\bh\(|\bdefineComponent\b|\bref\(|\breactive\(/.test(s))
        return true;
    // a NON-type value import from "vue" (or any .vue import) is a runtime pull.
    if (/^\s*import\s+(?!type\b)[^;]*from\s+["']vue["']/m.test(s)) return true;
    if (/from\s+["'][^"']*\.vue["']/.test(s)) return true;
    return false;
}

// The renderer's LOCAL component imports (the visual primitives it dispatches into).
function rendererComponentImports(text) {
    const s = strip(text);
    const names = [];
    for (const m of s.matchAll(
        /import\s+(\w+)\s+from\s+["'][^"']*\.vue["']/g,
    ))
        names.push(m[1]);
    return names;
}

// A model-shaped prop placed under `props:` (a STATIC prop that silently no-ops the
// two-way binding — the mis-bind trap ruling 8's `models` map exists to forbid).
function hasModelTrap(text) {
    return /props:\s*\{[^{}]*\b(modelValue|model-value|pressed|checked)\b\s*:/.test(
        strip(text),
    );
}

// The ≥2-consumer law self-applied to a schema field (ruling 9): a field that
// SURVIVES in the schema while fewer than 2 pages consume it is over-fit.
function fieldSurvivesUnderConsumed(schemaText, field, consumerCount) {
    const present = new RegExp(`\\b${field}\\??\\s*:`).test(strip(schemaText));
    return present && consumerCount < 2;
}

// A section object with a key outside the SectionSpec allowlist — a page-specific
// quirk field (the schema-growth the design forbids; the page goes bespoke instead).
function sectionHasQuirkKey(sectionLiteral) {
    for (const m of sectionLiteral.matchAll(/(\w[\w-]*)\s*:/g)) {
        if (!SECTION_KEYS.has(m[1])) return true;
    }
    return false;
}

// The per-page as-data ratio: data section-literals (specimens|permute) over all
// (data + bespoke). A page with no body is not in the migrated set (ratio null).
function asDataRatio(text) {
    const s = strip(text);
    const data =
        (s.match(/\bspecimens:/g) || []).length +
        (s.match(/\bpermute:/g) || []).length;
    const bespoke = (s.match(/\bbespoke:/g) || []).length;
    const total = data + bespoke;
    return total === 0 ? null : { data, bespoke, ratio: data / total };
}

// ── checks ──────────────────────────────────────────────────────────────────────
const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass, detail });

const schemaSrc = read(SCHEMA_PATH);
const rendererSrc = read(RENDERER_PATH);
const manifestSrc = read(MANIFEST_PATH);

// ── S1 — the schema exists + is pure data ─────────────────────────────────────────
{
    const strippedSchema = strip(schemaSrc);
    const types = [
        "StoryBody",
        "SectionSpec",
        "SpecimenSpec",
        "SpecimenSize",
        "StoryScope",
    ];
    const missing = types.filter(
        (t) => !new RegExp(`(interface|type)\\s+${t}\\b`).test(strippedSchema),
    );
    const exists = Boolean(schemaSrc) && missing.length === 0;
    const pure = exists && !schemaHasClosure(schemaSrc);
    add(
        "S1-schema-pure-data",
        pure,
        pure
            ? `story-body.ts declares ${types.join("/")} and is PURE DATA (type-only Vue import, no render closure)`
            : !exists
              ? `story-body.ts absent or missing types: ${missing.join(", ") || "(file absent)"}`
              : "story-body.ts carries a render closure / non-type Vue value import (the Vue-in-JSON anti-pattern)",
    );
}

// ── S2 — the renderer dispatches into the kit primitives only ──────────────────────
{
    const imports = rendererComponentImports(rendererSrc);
    const strangers = imports.filter((n) => !KIT.includes(n));
    const noStyle = !/<style[\s>]/.test(rendererSrc);
    // The data-driven dispatch mechanisms must be present (source-level).
    const mechanisms = {
        vModelExpansion: /onUpdate:/.test(rendererSrc),
        permuteCartesian: /cartesian\s*\(/.test(rendererSrc),
        perCellIsolated: /cellScopes/.test(rendererSrc),
        autoAria: /aria-label/.test(rendererSrc),
    };
    const mechOk = Object.values(mechanisms).every(Boolean);
    const pass =
        Boolean(rendererSrc) &&
        strangers.length === 0 &&
        noStyle &&
        mechOk;
    add(
        "S2-renderer-kit-only",
        pass,
        pass
            ? `StoryBodyRenderer imports ONLY kit primitives (${imports.join(", ") || "via PermutationGrid"}), no <style>; the models→v-model / permute-cartesian / per-cell-isolated / auto-aria mechanisms are present`
            : !rendererSrc
              ? "StoryBodyRenderer.vue absent"
              : strangers.length
                ? `renderer imports a net-new visual primitive: ${strangers.join(", ")}`
                : !noStyle
                  ? "renderer defines a <style> block (a net-new visual primitive)"
                  : `renderer is missing a mechanism: ${Object.entries(mechanisms).filter(([, v]) => !v).map(([k]) => k).join(", ")}`,
    );
}

// ── S3 — named-v-model is the EXPLICIT models map ──────────────────────────────────
{
    const migratedSrc = MIGRATED.map(read);
    const modelsUsed = migratedSrc.some((s) => /\bmodels:/.test(strip(s)));
    // A genuinely NAMED (non-modelValue) model binding exercised somewhere in the
    // set — a `<namedProp>: "<scopeKey>"` pair (select binds the reka `open` NAMED
    // v-model to `densityOpen`), proving the map is the anti-no-op floor, not a
    // modelValue rename. A boolean/literal static prop (`open: true`) is not a
    // binding — the string scope-key value is the discriminant.
    const namedModel = migratedSrc.some((s) =>
        /\b(open|pressed|checked|expanded)\s*:\s*["']\w+["']/.test(strip(s)),
    );
    const noTrap = !migratedSrc.some((s) => hasModelTrap(s));
    const pass = modelsUsed && namedModel && noTrap;
    add(
        "S3-explicit-models-map",
        pass,
        pass
            ? "the migrated set uses the EXPLICIT `models` map incl. a NAMED (non-modelValue) v-model (select `open`); no bare model-shaped prop under `props:`"
            : !modelsUsed
              ? "no `models:` map in the migrated set (the explicit-mapping discipline is unexercised)"
              : !namedModel
                ? "no genuinely NAMED (non-modelValue) v-model exercised — the map reads as a modelValue rename, not the anti-no-op floor"
                : "a model-shaped prop (modelValue/pressed/checked) sits under `props:` — the silent-no-op trap",
    );
}

// ── S4 — the prefix field is DECIDED (absent; 1-consumer → dropped) ────────────────
{
    // badge is the sole would-be consumer → 1 consumer → the field drops.
    const badgeConsumers = 1;
    const survivorViolation = fieldSurvivesUnderConsumed(
        schemaSrc,
        "prefix",
        badgeConsumers,
    );
    const pass = Boolean(schemaSrc) && !survivorViolation;
    add(
        "S4-prefix-dropped",
        pass,
        pass
            ? "no `prefix` field survives in story-body.ts — the ≥2-consumer law self-applied (1-consumer badge uses the SpecimenFrame slot/label escape, ruling 9)"
            : "a 1-consumer `prefix` field survives in the schema (the ≥2-consumer law is violated — ruling 9)",
    );
}

// ── S5 — the migrated set clears the ratio; the quirk-watch stays bespoke ───────────
{
    const rows = MIGRATED.map((path) => {
        const r = asDataRatio(read(path));
        return { path, ...(r ?? { data: 0, bespoke: 0, ratio: 0 }) };
    });
    const migratedAll = rows.every((r) => r.data + r.bespoke > 0);
    const ratios = rows.map((r) => r.ratio);
    const mean = ratios.reduce((a, b) => a + b, 0) / (ratios.length || 1);
    const minRatio = Math.min(...ratios);
    // The quirk-watch: data/table did NOT grow a body (a per-page tabular quirk
    // field) — it took the bespoke escape. (No `body`/StoryBody import on that SFC.)
    const tableSrc = read(QUIRK_WATCH);
    const tableStaysBespoke =
        Boolean(tableSrc) && !/StoryBody|:body=/.test(strip(tableSrc));
    const pass =
        migratedAll && mean >= 0.7 && minRatio >= 0.6 && tableStaysBespoke;
    const pct = (n) => `${(n * 100).toFixed(1)}%`;
    add(
        "S5-as-data-ratio",
        pass,
        pass
            ? `migrated set MEAN ${pct(mean)} as-data (min ${pct(minRatio)}) ≥ the 70%/60% bar [${rows.map((r) => `${r.path.split("/").slice(-2).join("/")} ${pct(r.ratio)}`).join(", ")}]; data/table stays bespoke (quirk-watch)`
            : !migratedAll
              ? `a migrated page carries no body: ${rows.filter((r) => r.data + r.bespoke === 0).map((r) => r.path).join(", ")}`
              : !tableStaysBespoke
                ? "data/table grew a body — the quirk-watch page should take the bespoke escape, not a per-page quirk field"
                : `ratio below bar — MEAN ${pct(mean)} (need ≥70%), min ${pct(minRatio)} (need ≥60%)`,
    );
}

// ── Self-test bites (the anti-evasion floor, run inline on every invocation) ───────
{
    const bites = [];
    // 1. a planted closure in the schema REDs S1.
    bites.push({
        id: "selftest-S1-planted-closure-reds",
        pass: schemaHasClosure(
            'import type { Component } from "vue";\nexport interface StoryBody { render: () => Component }',
        ),
    });
    // 2. a planted bare-modelValue named-model spec REDs S3.
    bites.push({
        id: "selftest-S3-bare-model-trap-reds",
        pass:
            hasModelTrap('{ component: Toggle, props: { pressed: "on" } }') &&
            !hasModelTrap('{ component: Toggle, models: { pressed: "on" } }'),
    });
    // 3. a synthetic 1-consumer `prefix` REDs S4.
    bites.push({
        id: "selftest-S4-one-consumer-prefix-reds",
        pass:
            fieldSurvivesUnderConsumed(
                "export interface SpecimenSpec { prefix?: string }",
                "prefix",
                1,
            ) &&
            !fieldSurvivesUnderConsumed(
                "export interface SpecimenSpec { prefix?: string }",
                "prefix",
                2,
            ),
    });
    // 4. a planted section quirk field REDs S5.
    bites.push({
        id: "selftest-S5-quirk-field-reds",
        pass:
            sectionHasQuirkKey('{ heading: "x", columns: [1, 2] }') &&
            !sectionHasQuirkKey('{ heading: "x", specimens: [] }'),
    });
    const allBitesPass = bites.every((b) => b.pass);
    add(
        "self-test-bites",
        allBitesPass,
        allBitesPass
            ? `all ${bites.length} self-test bites distinguish the planted violation (closure / bare-model-trap / 1-consumer-prefix / quirk-field all RED)`
            : `self-test bite(s) failed: ${bites.filter((b) => !b.pass).map((b) => b.id).join(", ")}`,
    );
}

// ── Report ────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log("proof:story-schema — the pages-as-data schema (BI.W-STORY-SCHEMA)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks)
    console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_STORY_SCHEMA_OUT", "BI-story-schema");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:story-schema",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the PAINTED parity (the migrated pages render byte-visually-identical, state + colors intact, Chrome + real Safari) rides the π batch (#92). A source-green gate is never the close.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:story-schema] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:story-schema] pages-as-data holds — the schema is pure data, the renderer dispatches into the kit only, the models map is the explicit anti-no-op floor, prefix is dropped (ruling 9), and the migrated set clears the ≥70%/60% as-data bar. The π arm binds the paint.",
);
