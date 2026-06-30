# RESPEC SEED CONTEXT — the convergent audit/re-spec ground truth

**Date:** 2026-06-29 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · **Base:** `master` (121 commits ahead)

The user PAUSED the joint BG+BH 5.0.0 build (gracefully stopped workflow `wnwo5l004`) because
they are **not confident the implemented items hitherto were done properly**. This audit does a
FULL re-spec: **what's been done (verified), what's half-baked, what to amend vs restart.**

> **LIVE-INTERACTION DEFECTS (user-reported — must address):** see `DEFECT-LEDGER.md` (this dir). Concrete
> live/pointer-interaction regressions the device-free gates CANNOT catch: **D-1 constellation — ALL dots track
> the cursor + shift around** (root-cause hypothesis: the BC.W-VIZ-CONSTELLATION parallax-depth screen offset
> `parallax·z·(pointer−center)` applied to every node; `constellationField.ts:~71`), **D-2 paper-grain issues**
> (the W-PAPER-GRAIN-OPTIN demote `3f200f1d`), **D-3 dock issues** (the W-GLASS-BLUR-PEER dock-deep demote
> `cd9ce46` + the standing dock cluster). These are first-class re-spec inputs; the live-defect-hunt diagnoses +
> specs the fix-waves. D-1 is a named must-fix.

## The execution state (cursor: `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`)

Cursor status distribution (raw grep, ~147 rows): **39 DONE · 6 PAINT-PENDING · 128 PENDING · 10 DEFERRED · 2 BLOCKED.**

### What is ACTUALLY built (real build commits, not spec-convergence records)
- **WS7 ground-freeze (Phase 0, rows 0.1–0.6)** — 9 commits — DONE. The gate machine: PAINT-IS-THE-GATE
  (proof:ba-gestalt born-RED Metal), GESTALT-ROSTER, SHIP-DISCIPLINE (tag-blocker live), 3 ledgers, DISPOSITION-RESTAMP.
- **BH [C] concurrent-safe band (Phase 1, rows 1.x)** — 19 commits — DONE. Scratch-sweep, lucide-payload,
  value-destraddle, snap-excise, @glass-alias + codemods, B2.1 regen-mechanism, B2.4a carves, B4 docs-skeleton.
- **WS1 shell/routing/field (Phase 2, rows 2.1–2.7)** — 16 commits — DONE + dual-engine PAINTED.
  ROUTE-TRANSITION (linchpin), FIELD-AURORA (re-paint-fixed a CATASTROPHIC dark-AA defect 2.14:1→13.87:1),
  SCROLL-PROGRESS-RAIL, FIELD-ACCENT-RECONCILE, PAPER-GRAIN-OPTIN, HERO-FIT, VT-ROUTE-ENHANCE (deferred).
  Plus row 10.25 BG.W-CATEGORY-CARD-WARM (the user's "metallic wash on sub-category cards" defect) — fixed + painted DONE.
- **WS3 glass standardization (Phase 3, rows 3.1–3.11)** — 9 commits — **PARTIAL / IN-FLIGHT (the frontier where the pause hit).**
  3.1 CARTOON-INK-GAMUT [paint-pending], 3.6 GLASS-BLUR-PEER [paint-pending], 3.7 GLASS-IDIOM-FACTOR DONE.
  3.2–3.5, 3.8–3.11 PENDING (NOT built).

### What is NOT built (PENDING — the bulk)
- WS2 dock convergence (4.x), WS5 viz (rows), WS6 siri, WS4 components/demo, WS8 glass-deep, WS9 paper-deep,
  WS10 de-shadcn, WS11 storybook, WS12 coherence capstone, + the BH [WS12] restructure (subpaths-delete, /api-fold,
  CLAUDE.md-delete). The WS8/WS10/WS11/WS12 git commits are **spec-CONVERGENCE records from tranche-DEV**
  ("spec CONVERGED — 72%"), NOT execution — do not mistake them for landed features.

## The KEY QUESTIONS this audit must answer (per workstream + per landed wave)
1. **DONE-verified?** Does each DONE row's code actually do what `bg-build-map.md` specs? Gate GREEN AND non-vacuous?
   Paint claim backed by an on-disk DELTA + PNGs that resolve (the cardinal-lesson: "live-verified" needs an artifact)?
2. **Half-baked?** Landed device-free but paint-pending forever; weak/vacuous gate; spec says X, code does ½X.
3. **Clobbered?** Did out-of-order or batch landings overwrite earlier-wave intent? (hot files: gates.mjs, package.json,
   src/index.ts, the glass token cascade, CLAUDE.md.)
4. **Keep / Amend / Restart?** For the PENDING bulk: is the spec still sound, or should the approach be re-thought
   first-principles given what we learned building WS1/WS3? Is the build ORDER (WS3 spine → WS8/WS12) still correct?

## The design language (non-negotiable identity)
Liquid-glass / iOS-26-27 transmissive material; warm-everywhere / no-gray (warm-amber hue family, chroma floor);
W-DARK-MATERIAL luminous-dark (low-L warm-ember, never charcoal); compositor-only motion + PRM-carved; spring-iff-spatial /
bezier-iff-effect; Tailwind v4 + @theme/@utility token-first; clean breaks, no legacy aliases (the no-backwards-compat law);
≥2-consumer bar for every primitive; presets-in-consumers (library owns its identity, consumers own themed presets).

## FENCE (ABSOLUTE — the catastrophic failure mode)
Operate ONLY under `/Users/mkbabb/Programming/glass-ui`. NEVER mv/rm/move/touch any path outside it — ESPECIALLY no
sibling repo under `~/Programming` (a parked-sibling incident orphaned 11 repos for hours; NEVER again). Worktrees ONLY at
`.claude/worktrees/`. Run `node scripts/verify-siblings-intact.mjs --quiet` (exit 0) when in doubt. Audit agents are
READ-MOSTLY (write ONLY under `docs/tranches/BG/audit/RESPEC/`); prototype agents work ONLY in their own worktree.

## Prior tranche-DEV research (rich, reusable — `docs/tranches/BG/audit/`)
A-*.md (11 architecture audits: dock/glass-token/motion/viz/gate-system/component-families/deadcode/demo-arch/composables/a11y-perf),
D-*.md (design decisions: aliasing-clip/category-previews/configurator/dock-morph/field-aurora/hero-type/routing/scroll),
P-*.md (bd-coverage/be-bf-fold/chronic-deferred/design-adherence). Read these before re-deriving.
