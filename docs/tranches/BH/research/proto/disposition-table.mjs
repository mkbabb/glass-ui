#!/usr/bin/env node
// P2 — the authoritative gate-disposition table, hand-verified against PATH:LINE
// evidence (the heuristic detector's 4 bespoke-reader misclassifications corrected).
import { writeFileSync } from "node:fs";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/b6d23e41-2f2a-4407-ba89-e126e9497583/scratchpad/bh-research/proto/DISPOSITION-TABLE.json";

// Each row: gate, file, kind, breakOnDelete, asserts (what), disposition, newTarget, canonKey
const T = [
  // ── HARD content-asserts (RED or ENOENT on delete) — MUST re-home ─────────
  { gate:"proof:claude-structure-sync", file:"scripts/proof-claude-structure-sync.mjs",
    evidence:"L74 readFileSync(CLAUDE_MD) UNGUARDED; L129/133/143 violations",
    kind:"HARD_ASSERT", breakOnDelete:"ENOENT (direct readFileSync, no guard)",
    asserts:"§Structure custom/ enumeration ≡ disk + declared dir-count",
    disposition:"RE-HOME (split)", newTarget:"docs/canon/structure.md", canonKey:"structure",
    note:"split the clean-tree untracked-png arm into a new proof:visual-png-tracked (no doc dep)" },
  { gate:"proof:doc-consistency", file:"scripts/proof-doc-consistency.mjs",
    evidence:"L83 citedCustomDirs(claudeMd); L120 citedDeps(claudeMd); L164/173 violations; in CI+local",
    kind:"HARD_ASSERT", breakOnDelete:"RED (cites 0 → vacuous) + it's a CI/local close gate",
    asserts:"every custom/<dir> CLAUDE cites resolves on disk; every Dependencies-table pkg resolves in package.json",
    disposition:"RE-HOME (split)", newTarget:"docs/canon/structure.md + docs/canon/dependencies.md", canonKey:"structure+dependencies",
    note:"DIRS arm→structure.md parser; DEPS arm→dependencies.md table parser" },
  { gate:"proof:doc-override-idiom", file:"scripts/proof-doc-override-idiom.mjs",
    evidence:"L56 readFileSync; L113 read(CLAUDE); L117 if null push; L143/166/192/202 W1-W4",
    kind:"HARD_ASSERT", breakOnDelete:"RED (claudeMd==null → push 'CLAUDE.md is missing')",
    asserts:"Consumer-wiring override-the-primitive example + canon line present in BOTH CLAUDE.md & README.md, byte-parity",
    disposition:"RE-HOME (drop CLAUDE arm)", newTarget:"README.md (sole)", canonKey:"readme",
    note:"the example already lives in README.md; W3 cross-parity collapses to a README self-check + docs/canon/consumer-wiring.md" },
  { gate:"proof:dock-unify", file:"scripts/proof-dock-unify.mjs",
    evidence:"L630 readFileSync; L534-554 F5 violations on claudeMd",
    kind:"HARD_ASSERT", breakOnDelete:"RED (F5 nav-pattern/collapsed-floor/active-bg not found)",
    asserts:"CLAUDE records dock nav-pattern (home-left #persistent + <DockSeparator>), collapsed-floor tokens, glass-first active register",
    disposition:"RE-HOME", newTarget:"src/components/custom/dock/README.md", canonKey:"readme:dock",
    note:"author dock README AFTER BG WS2; F5 re-points to the dock README contract section" },
  { gate:"proof:dock-rail-realize", file:"scripts/proof-dock-rail-realize.mjs",
    evidence:"L258 readRel(CLAUDE_MD); L266-280 R5 violations (stale proof:rail3/seam-offset GONE + facet mode documented)",
    kind:"HARD_ASSERT", breakOnDelete:"RED (R5 doc-reconcile: facet mode must be documented)",
    asserts:"CLAUDE has NO stale proof:rail3/rail3.spec/--dock-rail-seam-offset/proof:rail-extend AND documents mode=facets carousel",
    disposition:"RE-HOME", newTarget:"src/components/custom/dock/README.md", canonKey:"readme:dock",
    note:"the negative (stale-gone) + positive (facet documented) reconcile move into the dock README" },
  { gate:"proof:dropdown-fix", file:"scripts/proof-dropdown-fix.mjs",
    evidence:"L401 readFileSync; L255-259 D3 violation on claudeMd (.scroll-gutter-stable)",
    kind:"HARD_ASSERT", breakOnDelete:"RED (D3 .scroll-gutter-stable discipline not documented)",
    asserts:"CLAUDE documents the .scroll-gutter-stable presets-in-consumers discipline (scrollbar-gutter: stable)",
    disposition:"RE-HOME", newTarget:"docs/canon/consumer-wiring.md", canonKey:"consumer-wiring",
    note:"the consumer-facing scroll-gutter note is a consumer-wiring contract" },
  { gate:"proof:easing-primitive", file:"scripts/proof-easing-primitive.mjs",
    evidence:"L87 readFileSync; L270-281 W5 violations on claudeMd",
    kind:"HARD_ASSERT", breakOnDelete:"RED (W5 EasingPicker/easing + boundary law not recorded)",
    asserts:"CLAUDE names <EasingPicker>/'/easing' + the boundary law (MATH=value.js · playback=keyframes.js · editor=glass-ui)",
    disposition:"RE-HOME (split)", newTarget:"src/components/custom/easing/README.md + docs/canon/motion-system.md", canonKey:"readme:easing+motion-system",
    note:"component-naming arm→easing README; boundary-law arm→motion-system.md" },
  { gate:"proof:on-glass-fg", file:"scripts/proof-on-glass-fg.mjs",
    evidence:"L399 read('CLAUDE.md'); L230-232 asserts on-glass-muted/--input-on-glass/--progress-track-on-glass",
    kind:"HARD_ASSERT", breakOnDelete:"RED (the three-rung on-glass family not documented)",
    asserts:"CLAUDE records the on-glass-muted / --input-on-glass / --progress-track-on-glass three-rung family",
    disposition:"RE-HOME", newTarget:"docs/canon/glass-system.md", canonKey:"glass-system",
    note:"the surface-aware foreground register is a glass-system contract" },
  { gate:"proof:phase-palette", file:"scripts/proof-phase-palette.mjs",
    evidence:"L73/335 readFileSync CLAUDE; L199 + L227 W4 violation on claudeMd",
    kind:"HARD_ASSERT", breakOnDelete:"RED (W4 InstrumentChassis phase canon / --phase-complete-color)",
    asserts:"CLAUDE's InstrumentChassis phase-canon records --phase-complete-color consumer seam",
    disposition:"RE-HOME", newTarget:"src/components/custom/instrument-chassis/README.md", canonKey:"readme:instrument-chassis",
    note:"design-idioms.md is a second optional reader (already submodule); phase-canon contract homes in the component README" },
  { gate:"proof:readme-meta-clean", file:"scripts/proof-readme-meta-clean.mjs",
    evidence:"L20 read()→readFileSync; L221 cm; L222-233 phantom/peer/luma violations; CI+local close-canary",
    kind:"HARD_ASSERT", breakOnDelete:"RED (cm null → asserts skip, but it's the deletion CANARY in CI/local)",
    asserts:"CLAUDE has no phantom composable (useDockTransition/useSpringOrchestrator) / no removed gate (proof:glass-one-model); keyframes peer ^5 spine; no stale luma-demo-private claim",
    disposition:"RE-HOME (split)", newTarget:"README.md + docs/canon/dependencies.md", canonKey:"readme+dependencies",
    note:"meta-clean discipline generalizes to the docs/canon set; the deps-line arm→dependencies.md" },
  { gate:"proof:spa-view", file:"scripts/proof-spa-view.mjs",
    evidence:"L74 readFileSync; L228-233 W5 violation on claudeMd (SpaView + /spa-view)",
    kind:"HARD_ASSERT", breakOnDelete:"RED (W5 SpaView + /spa-view subpath not recorded)",
    asserts:"CLAUDE names SpaView + the /spa-view subpath (§Structure custom-dir bump + the note)",
    disposition:"RE-HOME (split)", newTarget:"src/components/custom/spa-view/README.md + docs/canon/structure.md", canonKey:"readme:spa-view+structure",
    note:"component note→spa-view README; the §Structure dir-bump→structure.md (shared with structure-sync)" },
  { gate:"proof:split-chars", file:"scripts/proof-split-chars.mjs",
    evidence:"L99 readFileSync; L289 inClaudeStructure; L311 SP6 violation",
    kind:"HARD_ASSERT", breakOnDelete:"RED (SP6 split-chars not enumerated in §Structure custom/)",
    asserts:"CLAUDE §Structure custom/ enumerates split-chars/ (+ root barrel + api)",
    disposition:"RE-HOME", newTarget:"docs/canon/structure.md", canonKey:"structure",
    note:"the §Structure enumeration clause is the SAME parser as structure-sync — folds onto structure.md" },
  { gate:"proof:surface-axis", file:"scripts/proof-surface-axis.mjs",
    evidence:"L499 readFileSync; L438-465 W7 doc-honesty violations on claudeMd",
    kind:"HARD_ASSERT", breakOnDelete:"RED (W7 documented <Toast/Button surface=…> must match prop declarations)",
    asserts:"CLAUDE surface-axis canon names <Toast surface=…>/<Button surface=…> examples that match the .vue prop declarations (doc-honesty)",
    disposition:"RE-HOME", newTarget:"docs/canon/glass-system.md", canonKey:"glass-system",
    note:"doc-honesty arm reads the surface-axis section; homes with on-glass-fg in glass-system.md" },
  { gate:"proof:close-battery-parity", file:"scripts/proof-close-battery-parity.mjs",
    evidence:"L88 read('CLAUDE.md')??''; L93 clause-4 violation (close-battery rule not recorded)",
    kind:"HARD_ASSERT", breakOnDelete:"RED (clause 4 --run full close-battery canon not recorded)",
    asserts:"CLAUDE gate-hygiene records the --run full = local∪ci∪release siblings-absent-before-tag canon",
    disposition:"RE-HOME", newTarget:"docs/canon/build-and-gates.md", canonKey:"build-and-gates",
    note:"the gate-hygiene/close-battery canon is a build-and-gates contract" },
  { gate:"proof:handmark", file:"scripts/proof-handmark.mjs",
    evidence:"L249 rd('CLAUDE.md'); L252 W6 violation (three-register fence + family)",
    kind:"HARD_ASSERT", breakOnDelete:"RED (W6 three-register fence + HandMark family not recorded)",
    asserts:"CLAUDE records the three-underline-register fence + the HandMark/InkMark family",
    disposition:"RE-HOME", newTarget:"src/components/custom/handmark/README.md", canonKey:"readme:handmark",
    note:"the fence + family contract homes in the handmark README" },

  // ── WARN-degrade (reads but soft; would silently lose a WARN-fact) ────────
  { gate:"proof:accent-tone", file:"scripts/proof-accent-tone.mjs",
    evidence:"L353 inClaudeStructure test; L361 'recorded but NOT a hard violation'",
    kind:"WARN_DEGRADE", breakOnDelete:"SILENT (WARN-fact flips to PENDING, no RED)",
    asserts:"§Structure custom/ enumerates selectable-chip/ (WARN-fact, structure-sync owns the hard arm)",
    disposition:"RE-HOME (or DROP arm)", newTarget:"docs/canon/structure.md (or delete the WARN read)", canonKey:"structure",
    note:"selectable-chip §Structure presence — duplicates structure-sync; cleanest is DROP the WARN read, let structure-sync own it" },

  // ── FENCE (CLAUDE.md only in a write-allowlist; not a content read) ───────
  { gate:"proof:crossrepo-asks", file:"scripts/proof-crossrepo-asks.mjs",
    evidence:"L56 'CLAUDE.md' inside the allowed-touch path array (foreign-tree fence), never content-read",
    kind:"FENCE", breakOnDelete:"NONE (allowlist membership; harmless)",
    asserts:"(nothing on CLAUDE content) — CLAUDE.md is a member of this wave's allowed write-set",
    disposition:"EDIT (remove allowlist entry)", newTarget:"n/a — drop 'CLAUDE.md' from the array", canonKey:"none",
    note:"no doc home needed; just remove the now-deleted path from the fence list" },

  // ── DEAD_VAR (defines a CLAUDE_MD path it never reads) ────────────────────
  { gate:"proof:expandable-part", file:"scripts/proof-expandable-part.mjs",
    evidence:"L66 CLAUDE_MD: resolve(...) defined but only P.SFC is safeRead (L363); CLAUDE never read",
    kind:"DEAD_VAR", breakOnDelete:"NONE (dead key)",
    asserts:"(nothing) — dead CLAUDE_MD declaration",
    disposition:"EDIT (delete dead key)", newTarget:"n/a", canonKey:"none",
    note:"remove the unused CLAUDE_MD key from the P object" },

  // ── MENTION (CLAUDE.md only in comments) — no action, no break ───────────
  ...["proof:page-chassis","proof:page-hierarchy","proof:peer-optional","proof:scroll-trigger",
      "proof:spring-tokens-synced","proof:storybook-meta","proof:visual-runner","proof:viz-configurator-suite"]
    .map((gate)=>({ gate, file:`scripts/${gate.replace(":","-")}.mjs`, evidence:"CLAUDE.md only in a // comment / docstring",
      kind:"MENTION", breakOnDelete:"NONE", asserts:"(nothing — comment reference)",
      disposition:"NO-OP (optional comment scrub)", newTarget:"n/a", canonKey:"none",
      note:"may refresh the comment to point at the new doc home; not load-bearing" })),
];

const summary = T.reduce((m,r)=>((m[r.kind]=(m[r.kind]||0)+1),m),{});
writeFileSync(OUT, JSON.stringify({ summary, total:T.length, rows:T }, null, 2));
console.log("KIND SUMMARY:", JSON.stringify(summary));
console.log("TOTAL refs:", T.length, "| content-readers (HARD+WARN):", T.filter(r=>/HARD|WARN/.test(r.kind)).length);
console.log();
console.log("GATE".padEnd(30), "KIND".padEnd(13), "NEW TARGET");
for (const r of T) if (r.kind!=="MENTION") console.log(r.gate.padEnd(30), r.kind.padEnd(13), r.newTarget);
