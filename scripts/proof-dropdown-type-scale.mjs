// proof:dropdown-type-scale — AX.W50 D17: the uniform picker-family type-scale gate.
//
// The device-free SOURCE arm: a source-parse + deletion-proof + token-cascade gate
// over the shadcn picker family (select / dropdown-menu / combobox / context-menu /
// command / _shared/menuItemVariants). Asserts (a) NO raw text-sm/text-xs literal
// survives in any family type-bearing surface (the shadcn leak excised); (b) every
// family surface reads the family token (`text-dropdown` primary / `text-dropdown-
// secondary` secondary, via the @theme bridge); (c) the token resolves on the cascade
// (tokens.css → theme.css bridge); (d) the two filter inputs read the shared
// `--dropdown-input-height` register (no surviving h-10/h-11 literal on Combobox/
// Command input).
//
// THE PAINTED FONT-SIZE PARITY IS PROVEN BY THE π ARM (the orchestrator's live
// getComputedStyle readback — the family open side-by-side at one scale + the
// single-override-scales-the-family demo), NEVER this source gate alone (the cardinal
// AX lesson). This arm proves the class-string + token-cascade STRUCTURE; the π arm
// proves the family paints at ONE scale.
//
// Born-RED at HEAD `6569b7a`: ≥ 14 raw text-sm/text-xs literals across the family,
// 0 token reads, no --dropdown-text token defined.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:dropdown-type-scale";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const stripCss = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const tokens = stripCss(readMonolith(ROOT, "tokens"));
// AZ.W-CARVE — theme.css drained into theme/*.css partials; the
// --text-dropdown / --text-dropdown-secondary @theme-inline bridges live in
// theme/bridges.css, so read composed (root + partials in cascade order).
const theme = stripCss(readMonolith(ROOT, "theme"));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── 1. The token pair + the input-height register are minted + resolve on cascade ─
add(
    "dropdown-text-minted",
    /--dropdown-text:\s*var\(--control-text\)/.test(tokens),
    "--dropdown-text: var(--control-text) (the PRIMARY rung, a specialization of W51's comfort register — one scale system)",
);
add(
    "dropdown-text-secondary-minted",
    /--dropdown-text-secondary:\s*var\(--control-text-sm\)/.test(tokens),
    "--dropdown-text-secondary: var(--control-text-sm) (the SECONDARY/caption rung)",
);
add(
    "dropdown-input-height-minted",
    /--dropdown-input-height:\s*var\(--control-h-md\)/.test(tokens),
    "--dropdown-input-height: var(--control-h-md) (the unified filter-input register, a W51 specialization)",
);
add(
    "theme-bridge-intact",
    /--text-dropdown:\s*var\(--dropdown-text\)/.test(theme) &&
        /--text-dropdown-secondary:\s*var\(--dropdown-text-secondary\)/.test(theme),
    "theme.css @theme inline bridges --text-dropdown / --text-dropdown-secondary (the text-dropdown utility resolves — CHAIN-INTACT)",
);

// ── 2. The family dirs carry NO raw text-sm/text-xs (the deletion-proof) ─────────
// Scan every .vue / .ts under the picker family dirs + the shared item CVA. The
// allow-list: the MultiSelect selected-badge chip (a Badge-family surface, NOT a
// picker menu surface — the ratified leave-on-Badge disposition; the gate scopes the
// picker SURFACES, not the chip).
const FAMILY_DIRS = [
    "src/components/ui/select",
    "src/components/ui/dropdown-menu",
    "src/components/ui/combobox",
    "src/components/ui/context-menu",
    "src/components/ui/command",
];
const EXEMPT = new Set([
    // The MultiSelect selected-badge chip rides the Badge family scale, not the picker
    // scale (ratified). MultiSelect.vue is in multi-select/, not the family dirs above,
    // so it is already out of scope — listed here only for the record.
]);

const walk = (dir) => {
    const abs = resolve(ROOT, dir);
    if (!existsSync(abs)) return [];
    const out = [];
    for (const ent of readdirSync(abs, { withFileTypes: true })) {
        const rel = join(dir, ent.name);
        if (ent.isDirectory()) out.push(...walk(rel));
        else if (/\.(vue|ts)$/.test(ent.name)) out.push(rel);
    }
    return out;
};

const familyFiles = [
    ...FAMILY_DIRS.flatMap(walk),
    "src/components/ui/_shared/menuItemVariants.ts",
];

// A raw text-sm / text-xs as a standalone Tailwind class (or an arbitrary-selector
// variant like `[&_[cmdk-group-heading]]:text-xs`). The token form is
// `text-dropdown` / `text-dropdown-secondary`, which does NOT match these.
const rawTextRe = /(?:^|['"\s:])text-(?:sm|xs)(?=['"\s]|$)/;
const offenders = [];
for (const f of familyFiles) {
    if (EXEMPT.has(f)) continue;
    // strip comments so a literal named in a comment is not a false hit
    const raw = f.endsWith(".vue")
        ? read(f).replace(/<!--[\s\S]*?-->/g, "")
        : stripCss(read(f));
    const lines = raw.split("\n");
    lines.forEach((line, i) => {
        if (rawTextRe.test(line)) offenders.push(`${f}:${i + 1}`);
    });
}
add(
    "no-raw-text-literal-in-family",
    offenders.length === 0,
    offenders.length === 0
        ? "ZERO raw text-sm/text-xs literals in the picker family (the shadcn leak excised)"
        : `raw text-sm/text-xs survives at: ${offenders.join(", ")}`,
);

// ── 3. Every family type-bearing surface reads the token ─────────────────────────
// The shared item base.
add(
    "item-base-reads-token",
    /text-dropdown\b/.test(read("src/components/ui/_shared/menuItemVariants.ts")),
    "menuItemVariants base reads text-dropdown (the 13 item SFCs inherit in ONE edit)",
);
// Each named surface reads the expected rung.
const surfaceReads = [
    ["select/SelectTrigger.vue", /text-dropdown\b/, "SelectTrigger → primary"],
    ["select/SelectLabel.vue", /text-dropdown-secondary\b/, "SelectLabel → secondary"],
    ["dropdown-menu/DropdownMenuLabel.vue", /text-dropdown-secondary\b/, "DropdownMenuLabel → secondary"],
    ["dropdown-menu/DropdownMenuShortcut.vue", /text-dropdown-secondary\b/, "DropdownMenuShortcut → secondary"],
    ["context-menu/ContextMenuLabel.vue", /text-dropdown-secondary\b/, "ContextMenuLabel → secondary"],
    ["context-menu/ContextMenuShortcut.vue", /text-dropdown-secondary\b/, "ContextMenuShortcut → secondary"],
    ["combobox/ComboboxInput.vue", /text-dropdown\b/, "ComboboxInput → primary"],
    ["combobox/ComboboxEmpty.vue", /text-dropdown\b/, "ComboboxEmpty → primary"],
    ["combobox/ComboboxGroup.vue", /text-dropdown-secondary\b/, "ComboboxGroup heading → secondary"],
    ["command/CommandInput.vue", /text-dropdown\b/, "CommandInput → primary"],
    ["command/CommandEmpty.vue", /text-dropdown\b/, "CommandEmpty → primary"],
    ["command/CommandShortcut.vue", /text-dropdown-secondary\b/, "CommandShortcut → secondary"],
    ["command/CommandGroup.vue", /text-dropdown-secondary\b/, "CommandGroup headings → secondary"],
];
for (const [rel, re, label] of surfaceReads) {
    add(
        `surface-reads-token-${rel.replace(/[/.]/g, "-")}`,
        re.test(read(`src/components/ui/${rel}`)),
        `${label} reads the family token`,
    );
}

// ── 4. The two filter inputs share the height register (witness 3) ───────────────
// strip HTML comments AND `//` line comments so a literal named in a comment (the
// migration note "was h-11") is not a false surviving-literal hit.
const stripVueComments = (s) =>
    s.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\/[^\n]*/g, "");
const comboInput = read("src/components/ui/combobox/ComboboxInput.vue");
const cmdInput = read("src/components/ui/command/CommandInput.vue");
// AY.W-CSS1 — accept BOTH the v4 shorthand h-(--x) and the arbitrary h-[var(--x)]
// form (the shorthand is the post-conversion canonical; both compile identically).
const inputHeightRe = /h-(?:\[var\(--dropdown-input-height\)\]|\(--dropdown-input-height\))/;
add(
    "filter-inputs-share-height",
    inputHeightRe.test(comboInput) &&
        inputHeightRe.test(cmdInput) &&
        !/(?:^|['"\s])h-1[01](?=['"\s])/.test(stripVueComments(comboInput)) &&
        !/(?:^|['"\s])h-1[01](?=['"\s])/.test(stripVueComments(cmdInput)),
    "Combobox + Command filter inputs read h-[var(--dropdown-input-height)] — ONE register (no surviving h-10/h-11 split)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log("proof:dropdown-type-scale — the uniform picker-family type-scale gate (AX.W50 D17)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_DROPDOWN_TYPE_SCALE_OUT", "AX-dropdown-type-scale");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:dropdown-type-scale",
    command: COMMAND,
    note: "SOURCE arm only — the painted font-size parity + the single-override-scales-the-family truth is proven by the live π readback, never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:dropdown-type-scale] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:dropdown-type-scale] the picker family reads ONE governed type-scale — every surface on --dropdown-text(-secondary), the two filter inputs on ONE height register; the π arm proves the uniform paint.",
);
