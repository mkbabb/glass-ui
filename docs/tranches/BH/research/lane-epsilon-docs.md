# LANE ε — docs/ restructure · precepts-submodule extraction · CLAUDE.md deletion · BG-scope map

Read-only research for the BH cleanup tranche. Repo: `/Users/mkbabb/Programming/glass-ui` @ branch `tranche/BG`.
All paths absolute-relative to repo root. No repo file edited.

---

## TL;DR (the load-bearing conclusions)

1. **CLAUDE.md = 941L / ~317KB**, `grep -oE '[A-Z]{1,2}\.W…|W-…'` = **451 wave-token refs** (task said 301 — undercount; use 451). It is BOTH a live-contract map AND a wave-note archive. Deletion is safe ONLY after redistributing the live contracts.
2. **13 gates PARSE CLAUDE.md bytes** (read `readFileSync(CLAUDE.md)`); ~30 more `wf-*.js` orchestration scripts merely name it in agent-prompt strings (those retire naturally when the tranche workflows stop running — not BH's concern). The 13 split into 3 mechanical classes (structure-sync / doc-presence-assert / meta-clean) — all RE-HOMABLE.
3. **`docs/precepts` is a TRUE git submodule** (`git@github.com:mkbabb/precepts.git`, `.gitmodules` confirmed). `infra/` + `glossary/` are **fourier-analysis / feedback-coder content, NOT glass-ui** (deploy/TLS/domains/blob-DR — glass-ui is a published npm library with no deploy infra). The task's premise "infra/ is glass-ui-specific" is **inverted** — infra/ is BASE-but-irrelevant-to-glass-ui; the glass-ui-specific extraction targets are the DESIGN docs (design-idioms/motion-canon/tunable-anim/affordance-map), which are glass-ui-saturated.
4. **`docs/consumer-evidence/` = 61 files; only 17 referenced by any gate, 44 dead-to-gates** (6 of those 44 cited in CLAUDE.md prose only — citation evaporates on CLAUDE.md deletion). Needs an evidence policy + prune.
5. **BG is LOCKED / develop-ready (12 WS, ~110 waves)** and its write-set spans **the entire `src/` + `demo/` + `scripts/gates.mjs` + `src/index.ts`** (WS12 lists bare `src/`; WS10 rewrites all `ui/`; WS4/WS7 edit `src/index.ts`; WS1/WS7/WS10/WS12 edit `scripts/gates.mjs`). **15 BG converged specs reference CLAUDE.md** → BG waves will APPEND to it. ⇒ BH's file-MOVING + export-reshape + gate-consolidation + CLAUDE.md-deletion bands **MUST sequence after BG**; only pure-docs/precepts/README-authoring bands run concurrently (with caveats).

---

## A) CLAUDE.md DELETION PLAN

### A.0 — Inventory

| metric | value |
|---|---|
| lines | 941 |
| size | ~317 KB |
| wave-token refs (`X.W…`/`W-…`) | 451 |
| `consumer-evidence/*.md` citations | 6 |
| gates parsing its bytes | 13 |
| orchestration scripts naming it (prompt strings) | ~30 `wf-*.js` |

CLAUDE.md is structured as labelled prose sections, each a **live system contract** with an embedded **wave-note provenance trail** (`(BB.W-…)`, `(AZ.W-…)`). The content is NOT cleanly separable line-by-line; redistribution is **section→home**, stripping the wave-token provenance into the owning tranche FINAL.

### A.1 — Content categorization → new home map

**(i) LIVE component/system contracts → REDISTRIBUTE to modular homes**

| CLAUDE.md section | New home |
|---|---|
| `## Build` + `### Gate hygiene` cluster (gestalt bar, `:5199` default, close-battery, sibling-safety, ledger parser, disposition register, NDA-decide, carve-drain, strict-freshness) | `docs/canon/build-and-gates.md` |
| `## Structure` (the `src/` tree map, custom/ enumeration, tests-mirror, visual-π runner) | `docs/canon/structure.md` (the machine-checkable tree) |
| `## Conventions` (TS strict, color-token rules, cn(), focus-ring, invalid-ring, display-ladder tracking) | `docs/canon/conventions.md` |
| `## Dependencies` + peer table | `docs/canon/dependencies.md` (or fold into package.json + a thin canon note) |
| `## Entry point` / `## Subpath surface` / `### Subpath naming pairs` / `### Subpath-import discipline` / `### Vite manualChunks` | `docs/canon/exports-and-subpaths.md` — **BH REWRITES this for 5.0.0** (subpaths die, api folds) |
| `## Consumer wiring` (the `@import`, `@source`, `tw-animate-css`, override-the-primitive, css-critical) | `docs/canon/consumer-wiring.md` + the public `README.md` |
| `## Design Axes` (the 9 binding invariants) | `docs/canon/design-axes.md` (or `docs/precepts/` glass-ui design extract) |
| Per-component contracts (Glass-first canon, deep-glass, lensing, liquidhover, press-unify, dock orientation/sections/stack/cockpit, drawer modes, configurator, progress, border-progress, completion-seal, tabs, handmark, fading-scroll, easing, spa-view, surface-axis, feedback-tone, menu-glass, eyebrow-union, dark-material, adaptive-glass, no-gray, on-glass-fg, card-tier-alpha, card-pad, scroll-card, scroll-motion, metal-shimmer, viz suite, aurora-swraster, canvas-unify, gpu-substrate, pointer-velocity, …) | **Per-component `src/components/custom/<name>/README.md`** (the canonical-readme-shape; 28 missing — see below) + cross-cutting system contracts (glass ladder, adaptive-glass, dark-material) → `docs/canon/glass-system.md` + `docs/canon/motion-system.md` |
| `## Demo storybook chassis` (StorySection/StoryHero/ShowcaseFrame/DockStage/demo-design) | `demo/README.md` or `docs/canon/demo-chassis.md` |

**(ii) Historical wave-notes → ARCHIVE into owning tranche FINAL.md**

The 451 `(X.W-…)` provenance fragments are NOT contracts — they are the audit trail. Strip them at redistribution time; each belongs in `docs/tranches/<LETTER>/FINAL.md` of its owning tranche. Many already are. BH does NOT need to re-file 451 fragments — it strips them from the live-contract prose (the contract survives; the provenance dies in CLAUDE.md and lives once in the tranche). Recommend a one-time `proof:wave-note-archived` check is OVER-ENGINEERING; treat as KISS strip-on-redistribute.

**(iii) Build/gate canon → `docs/canon/build-and-gates.md`** (subset of (i)).

### A.2 — Proposed `docs/canon/` set

```
docs/canon/
├── README.md                  # index + "CLAUDE.md is deleted; here is its content" map
├── structure.md               # the src/ tree (machine-checkable — replaces proof:claude-structure-sync target)
├── build-and-gates.md         # build pipeline + gate-hygiene cluster
├── conventions.md             # TS + color-token + cn/focus/invalid-ring rules
├── dependencies.md            # peer table
├── exports-and-subpaths.md    # 5.0.0 export surface (BH rewrites)
├── consumer-wiring.md         # @import/@source/tw-animate/override-primitive  ← proof:doc-override-idiom re-homes here
├── design-axes.md             # the 9 invariants
├── glass-system.md            # ladder/adaptive/dark-material/no-gray/tint cross-cutting
└── motion-system.md           # spring clocks/press-unify/scroll-motion cross-cutting
```
(Per-component contracts go to component READMEs, NOT docs/canon — DRY: the contract lives once beside the code.)

### A.3 — Gates that PARSE CLAUDE.md → RETIRE or RE-HOME (the 13)

| Gate | Reads CLAUDE.md for | Disposition |
|---|---|---|
| `proof:claude-structure-sync` (`proof-claude-structure-sync.mjs`) | §Structure `custom/` enumeration ≡ disk + count + untracked-png arm | **RE-HOME** the structure arm onto `docs/canon/structure.md` (re-point the parse anchor); the untracked-png arm is CLAUDE-independent → SPLIT into `proof:visual-png-tracked`. Registered in gates.mjs L371. |
| `proof:doc-consistency` (`proof-doc-consistency.mjs`) | §Structure `custom/<dir>` cites resolve + §Dependencies table resolves | **RE-HOME** onto `docs/canon/structure.md` + `docs/canon/dependencies.md`. Registered L395. Has a test: `scripts/__tests__/proof-doc-consistency.test.ts` (re-point). |
| `proof:doc-override-idiom` (`proof-doc-override-idiom.mjs`) | Consumer-wiring override-the-primitive example byte-parity vs README.md + canon prose | **RE-HOME** onto `docs/canon/consumer-wiring.md` ↔ README.md. Registered L1367. |
| `proof:readme-meta-clean` (`proof-readme-meta-clean.mjs`) | CLAUDE.md no-phantom-symbol / keyframes-peer / luma-RESERVE (L219-233) | **RE-HOME** the CLAUDE arm onto the new canon homes (no-phantom over docs/canon + READMEs); the 4-shipped-README arm survives. Registered L1039. |
| `proof:crossrepo-asks` (`proof-crossrepo-asks.mjs`) | CLAUDE.md in a doc-set list (L56) | **RE-POINT** the list to docs/canon. Registered L1361. |
| `proof:dock-unify` (`proof-dock-unify.mjs` F5, L532) | nav-pattern / collapsed-floor-tokens / active-bg-glass recorded | **RE-HOME** the F5 recorded-canon clause onto `src/components/custom/dock/README.md`. **COLLIDES with BG-WS2** (dock convergence rewrites this) — coordinate. |
| `proof:dock-rail-realize` (`proof-dock-rail-realize.mjs` R5, L254-280) | doc-reconcile (no proof:rail3 / no seam-offset / documents facet mode) | **RE-HOME** R5 onto dock README. **COLLIDES BG-WS2.** |
| `proof:surface-axis` (`proof-surface-axis.mjs` L429-438) | `<Toast surface=…>`/`<Button surface=…>` documented | **RE-HOME** onto the Toast/Button component READMEs. |
| `proof:easing-primitive` (W5, L270-277) | EasingPicker + boundary-law recorded | **RE-HOME** onto `src/components/custom/easing/README.md` (already exists). |
| `proof:spa-view` (W5, L228-233) | SpaView + /spa-view recorded | **RE-HOME** onto `src/components/custom/spa-view/README.md` (already exists). |
| `proof:split-chars` (L286-289) | §Structure `split-chars/` enumerated | **RE-HOME** onto docs/canon/structure.md (mirrors structure-sync). |
| `proof:accent-tone` (L349-353) | §Structure `selectable-chip/` enumerated (degrades to WARN) | **RE-HOME** onto docs/canon/structure.md. Already soft. |
| `proof:dropdown-fix` (L255-256) | `scroll-gutter-stable` documented | **RE-HOME** onto consumer-wiring.md / scroll canon. |

**Mechanical pattern**: all 13 are either (a) §Structure-enumeration parsers → re-point to `docs/canon/structure.md`, or (b) "CLAUDE.md must record `<contract>`" doc-presence asserts → re-point to the component README / docs/canon home. NONE require deletion of the gate's INTENT — only the parse target moves. The cleanest BH move: a shared `scripts/lib/canon-doc.mjs` resolver (one place names the canon homes) so 13 gates re-point through one seam (DRY).

**`wf-*.js` orchestration scripts** (wf-ay-*, wf-ba-fleet, wf-az-*, wf-hardening-*): name CLAUDE.md in agent-prompt template literals. These are spent tranche-workflow drivers — NOT live gates, never run again. **No BH action** beyond noting they reference a deleted file (harmless dead prompt text).

### A.4 — CLAUDE.md deletion SEQUENCING
- BG appends to CLAUDE.md (15 specs reference it). **CLAUDE.md deletion is the LAST BH act, gated on full BG close.** If BH deletes it mid-BG, BG's wave-note appends fail / lose provenance.
- Also: `proof:readme-meta-clean` / `proof-doc-consistency` are in the CI/local gate sets — they RED the instant CLAUDE.md vanishes unless re-homed FIRST. **Order: redistribute → re-home gates → THEN delete.**

---

## B) PRECEPTS SUBMODULE — BASE vs GLASS-UI-SPECIFIC

`docs/precepts` = real submodule (`git@github.com:mkbabb/precepts.git`, confirmed `.gitmodules` + `.git` file). Editing it = a FOREIGN-REPO mutation (the inv-26 foreign-tree fence). BH must NOT silently mutate it.

| File | Classification | Evidence |
|---|---|---|
| `README.md` | BASE | submodule index |
| `design-idioms.md` (494L) | **GLASS-UI-SPECIFIC** | 46 lines cite `proof:`/`src/`/`--glass`/`@mkbabb`; it IS glass-ui's idiom home (proof:precept-current binds it to `src/styles/`) |
| `motion-canon.md` (16KB) | **GLASS-UI-SPECIFIC** | 32 lines cite `--spring`/`--glass`/`proof:`; it is the glass-ui motion P1-P6 doctrine |
| `tunable-anim.md` (9.5KB) | **GLASS-UI-SPECIFIC** | read by `proof:` gates; glass-ui anim tunables |
| `affordance-map.md` (15KB) | **GLASS-UI-SPECIFIC** (9 lib refs; lighter — verify) | mixed; likely glass-ui affordances |
| `canonical-readme-shape.md` | BASE | cross-repo README shape contract |
| `cross-repo-dev-iteration.md` / `cross-repo-dev-resolution.md` | BASE | cross-repo dev contracts (multi-repo) |
| `infra/{blob-backend-dr,deploy,domains,tls}.md` | **BASE-but-IRRELEVANT to glass-ui** | deploy.md is "promoted from fourier-analysis"; glass-ui is a published npm lib with NO deploy/TLS/domain/blob infra. **Task's "infra is glass-ui-specific" is INVERTED** — this is the LEAST glass-ui content. |
| `glossary/meta-terms.md` | **BASE-but-IRRELEVANT** | self-describes as "the feedback-coder project … tranches A→D" — not glass-ui |
| `instructions/` (16 files) | BASE | the tranche/wave/style/orchestration process canon, shared cross-repo |
| `audits/` | BASE | shared audit recipes |

### B.1 — Extraction proposal (the glass-ui design docs OUT of the shared submodule)
- **Extract glass-ui-specific design docs** (`design-idioms.md`, `motion-canon.md`, `tunable-anim.md`, `affordance-map.md`-glass-ui-parts) → into the repo proper at **`docs/design/`** (or `docs/idioms/`). Rationale: they are 30-46% glass-ui-saturated, bind glass-ui gates (proof:precept-current, proof:colocation, proof:easing-primitive, proof:phase-palette, proof:no-scoped-global), and do NOT belong in a SHARED submodule that other repos pull.
- **5 gates read `design-idioms.md`** (`proof-colocation`, `proof-easing-primitive`, `proof-no-scoped-global`, `proof-phase-palette`, `proof-precept-current`) + 3 read `cross-repo-dev-resolution.md` + 2 each `tunable-anim`/`motion-canon`/`affordance-map`. **Re-point these** to `docs/design/` after extraction (one-seam: a `scripts/lib/design-docs.mjs` path resolver).
- **infra/ + glossary/ stay in the submodule** (BASE) — they are simply IRRELEVANT to glass-ui and need no extraction; do NOT pull them into glass-ui's repo proper.

### B.2 — How to do the extraction WITHOUT silent foreign-repo mutation
The submodule is foreign-tree (inv-26). Two-step, fence-respecting:
1. **In glass-ui repo (BH's own tree):** `git mv` (well, `cp` then track) the glass-ui-specific docs OUT of `docs/precepts/` into `docs/design/` as NEW repo-proper files; re-point the 12 gate reads; the submodule files become BASE-only.
2. **Cross-repo by-name ask to `mkbabb/precepts`:** issue an ASK (the `docs/tranches/<BH>/coordination/` relay, the proof:crossrepo-asks channel) to DELETE the now-extracted glass-ui-specific docs from the precepts submodule upstream — a SEPARATE PR in the precepts repo, never an in-place glass-ui-side `docs/precepts/*.md` edit. Until that ask lands, the submodule pin still carries them (harmless duplication, flagged). **BH ships the extraction + the migration-map; the foreign repo's owner lands the upstream delete.**

---

## C) docs/instructions/README.md vs docs/precepts/instructions/

- `docs/instructions/README.md` (25L) = a thin glass-ui-LOCAL rules file. Line 3: "Read `docs/precepts/instructions/` first. Local glass-ui rules:" then 8 local bullets (Vue 3.5/Tailwind 4, shadcn-vue, token-first, four-state, proof cmds, browser-verify, no-overfitting).
- **It is NOT a duplicate** of precepts/instructions/ — it is the glass-ui-local override layer, correctly delegating the shared process canon to the submodule. **BUT it is STALE**: L17 "Current proof commands are `npm run typecheck` and `npm run build`" — the repo now has 343 `proof:*` gates + `gates.mjs --run`. The "Add Vitest only when tooling lands" clause is obsolete (vitest + tests-visual landed long ago).
- **Disposition: KEEP but REFRESH** (fold into the BH docs restructure). It is the natural successor home for some CLAUDE.md `## Conventions` content. Recommend it becomes `docs/README.md` or merges into `docs/canon/conventions.md`. The no-overfitting bullet (L23-25) points at `docs/audits/overfitting-audit.md` — keep that link live.

---

## D) docs/constellation/ — LIVE or STALE

13 files. Last git-touch: `MODERN-WEB-CLOSE.md` 2026-06-02, `next/audit/A1-glass-ui.md` 2026-06-02. **26+ days stale** (today 2026-06-28); the repo has shipped BA(4.0)→BB→BC(4.1)→BD(4.2)→BG since. These are a closed cross-repo "constellation" modernization audit/plan set (MODERN-WEB-* + next/audit/A1-A6 + next/design/bbnf/WC-*).
- **No gate reads them** (grep clean).
- **Disposition: ARCHIVE.** They are a spent cross-repo planning artifact. Move `docs/constellation/` → `docs/tranches/<owning-tranche>/archive/constellation/` or a `docs/archive/constellation/`. Do NOT keep at top-level docs/ (reads as live). If any A1-glass-ui finding is unclosed, fold it into the BH deferred-ledger; else archive wholesale.

---

## E) docs/consumer-evidence/ (61 files) — EVIDENCE POLICY + PRUNE

These are the `≥2-consumer` evidence files (J-inv-10 substrate-without-consumer bar). Cross-check: only **17 referenced by a gate**, **44 dead-to-gates**:
- **0-gate-ref (44):** README, animated-digit, animated-number, border-progress, build-section-layout, color-swatch, completion-seal, concentric, constellation, dot-flow-field, easing, expandable-container, find-section-offset, forced-section-window-range, fourier-math, goo-blob, handmark, header-ribbon, is-mac, metric-cell, metric-stack, resolve-active-section, resolve-section-window, section-layout, section-window-range, selectable-chip, sortable-list, spring-snapshot, status-dot, use-animated-number(+options), use-click-delegate, use-dark-mode-sync, use-gpu-substrate, use-lazy-loader, use-scroll-progress, use-scroll-to, use-sortable(+return), use-stagger-reveal, use-token-color, use-windowed-store, watercolor-dot.
- **1-gate-ref (12):** canvas-anchored-overlay, diff-rows, dock-search, glass-panel, labeled-field-action-slot, metal-glow, spa-view, split-chars, underline, use-glass-backdrop-luminance, use-scroll-trigger, use-virtual-section-window, use-viz-choreography.
- **2-4-gate-ref (5):** curl-fbm, use-celebration-burst, use-haptic, consumer-tier-class-lint (3), use-pointer-velocity-field (4).
- **6 cited in CLAUDE.md prose** (citation dies on CLAUDE.md deletion).

**Diagnosis:** the dir accreted a per-primitive evidence file regardless of whether a GATE consumes it — many are write-once-never-read. Some name RETIRED surfaces (`underline.md` — HandMark folded `/underline`; `is-mac.md` — trivial).

**Proposed policy** (KISS, evidence-not-decoration):
1. An evidence file EARNS its keep iff (a) a LIVE gate reads it (the ≥2-consumer machine-check), OR (b) it documents a CURRENTLY-OFF-ROOT-BARREL primitive whose ≥2-consumer bar is the ONLY thing keeping it shipped.
2. **PRUNE** every 0-gate-ref file whose primitive is either (i) retired (underline), (ii) trivial/inlined (is-mac), or (iii) has a story+barrel export making the evidence redundant. Estimate ~25-30 prunable.
3. **Replace the loose dir with a `proof:consumer-evidence-live` gate**: every file under `consumer-evidence/` MUST be referenced by a registered gate OR deleted (the same forcing-function `proof:claude-structure-sync` applies to the structure map). This kills the write-once-never-read class permanently.
4. The 6 CLAUDE.md-prose-only citations re-home into the relevant component README's "consumers" line (DRY — the evidence lives once beside the gate that needs it).

---

## F) docs/audits/ — ASSESS

9 files: `overfitting-audit.md` (the canned ≥2-consumer sweep prompt, last touch 2026-04-30 — **2 months stale**), `style-audit.md` (2026-06-16), `runs/2026-06-03-glass-ui-self/{a-ui,b-custom,c-styles,d-demo,e-composables,f-fourier,style-audit}.md` (a one-time self-audit run, 2026-06-03).
- `overfitting-audit.md` is referenced by `docs/instructions/README.md` (L23-25) as the live evidence-sweep prompt — **KEEP but REFRESH** (it predates the 343-gate world; the sweep is now largely machine-enforced by consumer-evidence gates).
- `runs/2026-06-03-glass-ui-self/` = a frozen audit RUN (7 lane reports). **ARCHIVE** into `docs/archive/audits/` or leave (small, dated, self-describing as a run). No gate reads it.
- `style-audit.md` (top-level) — verify it isn't a dup of `runs/.../style-audit.md`; if dup, collapse.
- **Disposition:** keep `overfitting-audit.md` (refresh), archive the dated `runs/`, dedup the two style-audit.md.

---

## G) BG-SCOPE MAP — the write-set + the BH partition (LOAD-BEARING)

### G.0 — BG state
BG is **LOCKED / develop-ready** (`FINAL.md` written, 12 WS converged, ~110-wave roster, commit `071c2610`). PLAN.md L3/L109: spec-only until user greenlight. The framing says BH executes INTERLEAVED with BG → when BG executes, its write-set is the ~110 waves.

### G.1 — BG write-set (extracted from the converged SPEC-pass*-converged.md per WS)

| WS | Title | Status | Key src/demo/scripts write-set |
|---|---|---|---|
| WS1 | Shell·Routing·Field | pass4 | `demo/layout/{AppShell.vue,ShellDockMorphStage.vue,dock-nav.css}`, `demo/{main,router}.ts`, `demo/stories/{SectionLanding,StoryHero,StoryPage,compositions/hero,motion/scroll-*}.vue` + `manifest.ts` + `*.ts`, `src/styles/{paper,liquid-enter,scroll-choreography,scroll-driven,transitions}.css` + `tokens/{property-regs,scroll-tokens}.css`, `src/components/custom/paper-backdrop/`, **`scripts/gates.mjs` + `scripts/proof-*.mjs`** |
| WS2 | Dock convergence | pass2 | `src/components/custom/dock/**` (33-file re-modularization), `src/styles/dock/**`, `src/composables/motion/useLiquidFlex.ts`, `demo/layout/{AppShell,SidebarDock}.vue`, `scripts/proof-morph-showcase.mjs` |
| WS3 | Glass standardization | pass4 | `src/styles/glass/{ladder,material,surfaces,glass-chip,liquid-morph}.css`, `src/styles/tokens/{glass,dark-arm,shadow}.css`, `src/styles/dock/{shape,shell}.css`, `src/components/custom/dock/GlassDock.vue`, `src/components/ui/button/index.ts`, `src/composables/glass/useGlassBackdropLuminance.ts`, `src/composables/motion/useBloomUp.ts`, `scripts/proof-glass-*.mjs` |
| WS4 | Components·Demo·Encapsulation | pass4 | **`demo/` (whole)**, **`src/index.ts`**, `src/components/ui/number-field/`, `src/composables/motion/useFlip.ts`, `scripts/proof-de-shadcn.mjs` |
| WS5 | Viz refinement | pass2 | `src/components/custom/{aurora,goo-blob,fourier-field,constellation,paper-grid,dot-*}/**`, substrate (`src/composables/glass/**`) |
| WS6 | Siri capabilities | pass1 | NEW components (glass island + waveform) — likely `src/components/custom/{siri-island,waveform}/` + dock wiring |
| WS7 | Quality·Coverage·Close | pass4 | **`scripts/gates.mjs`**, `scripts/proof-{ba-gestalt,route-navigates,field-aurora,safari-parity,ship-attestation,bg-deferred-ledger,…}.mjs`, `scripts/lib/{critical-path-walk,surface-closure,fold-ledger-core,…}.mjs`, `scripts/release.sh`, `scripts/lighthouse/floor.baseline.json`, **`src/index.ts`**, `src/components/custom/{calendar,chart}/*`, `src/composables/motion/morphSignatures.ts`, `demo/vite.demo-dist.config.ts` |
| WS8 | glass-deep | pass4 | glass tokens + WGSL tier (`src/styles/glass/**`, `src/composables/glass/webgpu/**`, shaders) |
| WS9 | paper-deep | pass1 | `src/styles/paper*.css`, paper/grain tokens, handmark |
| WS10 | de-shadcn / Tailwind4 | pass3 | **`src/components/ui/**` (broad rewrite)**, `src/styles/{configurator,menu,select}.css` + `theme/bridges.css` + `tokens/{color-radius,dark-arm,glass,light-dark,scale-paper}.css`, `src/components/custom/{metric-badge,timeline}/`, **`scripts/gates.mjs`** + `scripts/lib/shadcn-vocab.mjs` + `scripts/proof-{de-shadcn,no-shadcn-default,safari-webgl}.mjs` |
| WS11 | storybook-facility | pass4 | `demo/stories/**` (StoryPage api, scroll-progress, typewriter, suffuse) |
| WS12 | coherence-congruence | pass4 | **bare `src/` (every component+page)**, `src/components/ui/card/Card.vue`, `demo/stories/**` + `manifest.ts`, **`scripts/gates.mjs`** + `scripts/lib/{hue-at-l,spring-table,surface-closure}.mjs` + `scripts/proof-{coherence-census,hue-at-l,motion-one-clock}.mjs` |

**Plus: 15 BG converged specs reference `CLAUDE.md`** → BG waves APPEND wave-notes to it.

### G.2 — The HARD-COLLISION files (BH + BG both write)
- **`src/index.ts`** — WS4, WS7 vs BH export-reshape. **Hardest collision** (BH's 5.0.0 surface IS this file).
- **`scripts/gates.mjs`** — WS1, WS7, WS10, WS12 vs BH gate-consolidation/re-home. Hard.
- **`src/components/ui/**`** — WS10 (de-shadcn rewrite) + WS12 vs BH colocation/restructure. Hard.
- **`src/subpaths/` (79 mirror barrels)** — BH DELETES; verify no BG WS reads them (WS4/WS10/WS12 plausibly touch barrel wiring). Medium.
- **`src/api/` (505L index + types-extra)** — BH FOLDS into typed per-subpath; WS4/WS7 touch `src/index.ts` which re-exports api. Medium.
- **`CLAUDE.md`** — BG appends, BH deletes. Hard (sequencing).
- **god modules (15 >500L)** — `dock/GlassDock.vue`(711, BG-WS2/3), `dock/composables/useDockFission.ts`(604, WS2), `goo-blob/**`(WS5), `tabs/SegmentedTabs.vue`(WS10/12), `createCanvasLifecycle.ts`(695, WS5/8), `useWebGPUCanvas.ts`(606, WS8), `useGlassBackdropLuminance.ts`(542, WS3), `useBloomUp.ts`(507, WS3), `pager-dots`(509). **BH must NOT carve files BG carves** — BG-WS2/WS4/WS5/WS12 own the dock/viz/component carves. BH carves ONLY god modules in BG-untouched areas (few — substrate is WS5/WS8).

### G.3 — BH BAND PARTITION (concurrent-with-BG vs sequence-after-BG)

**TRULY CONCURRENT (no src/demo/gates.mjs/index.ts write; pure docs/precepts/coordination):**
- **BH-DOCS** — docs/ restructure: constellation archive (D), audits archive (F), consumer-evidence prune+policy (E), docs/instructions refresh (C). ⚠️ consumer-evidence prune touches files some gates read — but BH only REMOVES dead ones + adds a policy gate; coordinate with WS7's gate edits (gates.mjs collision if BH registers `proof:consumer-evidence-live` — sequence that registration after WS7 or use a separate gate file + a single gates.mjs insertion negotiated).
- **BH-PRECEPTS-EXTRACT** — the design-doc extraction (B): NEW `docs/design/` files + re-point the 12 precept-reading gates. ⚠️ re-pointing `proof-colocation`/`proof-precept-current`/etc. edits proof-*.mjs files BG-WS1/WS3/WS10/WS12 ALSO edit → coordinate at the gate level. The NEW docs/design/ files are collision-free; the gate re-points need negotiation.
- **BH-README-AUTHOR** — author the 28 missing per-component READMEs (canonical-readme-shape). NEW files in `src/components/custom/<name>/README.md`. ⚠️ the DIR is churning under BG-WS4/WS5/WS10/WS12 (component edits), but README.md is a new sibling file — LOW collision (BG edits .vue/.ts, BH adds .md). Safe to run concurrently per-dir EXCEPT dock (WS2 re-modularizes the whole dir) — author dock README after WS2.

**MUST SEQUENCE AFTER BG (or after the specific WS closes):**
- **BH-EXPORTS** (5.0.0 reshape: kill src/subpaths, fold src/api, reshape src/index.ts) — after **WS4 + WS7 + WS10 + WS12** close (all touch index.ts / ui barrels). This is the export surface; cannot interleave.
- **BH-RESTRUCTURE** (colocation, god-module carves, dir regrouping in src/) — after **WS2/WS4/WS5/WS10/WS12** (they own the component churn). BH carves only BG-untouched god modules; everything else waits.
- **BH-GATES** (gate consolidation, the 13 CLAUDE-parse re-homes, `scripts/gates.mjs` registry edits) — after **WS1/WS7/WS10/WS12** close (all edit gates.mjs). A mid-flight gates.mjs is a merge nightmare.
- **BH-CLAUDE-DELETE** — the LAST act, after FULL BG close (15 specs append to it) AND after BH-GATES re-homes the 13 parsers.

### G.4 — Collision-avoidance protocol (recommendation)
1. BH declares per-wave File Bounds (the proof:crossrepo-asks fence pattern) that are DISJOINT from BG's WS write-set above.
2. The pure-docs bands (BH-DOCS, BH-PRECEPTS-EXTRACT new files, BH-README-AUTHOR) run concurrently NOW.
3. The gate re-points (BH-PRECEPTS-EXTRACT gate edits, BH-DOCS policy gate, BH-GATES) batch into a SINGLE post-BG gates.mjs pass to avoid 5-way gates.mjs contention.
4. BH-EXPORTS / BH-RESTRUCTURE / BH-CLAUDE-DELETE are explicitly sequenced after the named BG WS closes — declared in the BH PLAN as `after: BG.WS{4,7,10,12}`.

---

## Target docs/ tree (BH end-state)

```
docs/
├── README.md                    # docs index (was docs/instructions/README.md, refreshed)
├── canon/                        # ← CLAUDE.md's LIVE contracts redistributed (NEW)
│   ├── README.md  structure.md  build-and-gates.md  conventions.md
│   ├── dependencies.md  exports-and-subpaths.md  consumer-wiring.md
│   ├── design-axes.md  glass-system.md  motion-system.md
├── design/                       # ← glass-ui design docs EXTRACTED from precepts submodule (NEW)
│   ├── design-idioms.md  motion-canon.md  tunable-anim.md  affordance-map.md
├── precepts/                     # submodule — BASE ONLY (infra/glossary stay; design docs asked-deleted upstream)
│   ├── README.md  canonical-readme-shape.md  cross-repo-dev-{iteration,resolution}.md
│   ├── infra/  glossary/  instructions/  audits/
├── consumer-evidence/            # PRUNED (~30 kept) + proof:consumer-evidence-live forcing gate
├── audits/                       # overfitting-audit.md (refreshed); runs/ → archived
├── archive/                      # NEW — constellation/ + dated audit runs
│   ├── constellation/  audits/2026-06-03-glass-ui-self/
└── tranches/                     # unchanged (FINAL.md absorbs stripped wave-notes)
            … BG (read-only to BH) … BH/
```
Per-component contracts live in `src/components/custom/<name>/README.md` (not docs/) — DRY.

---

## Open questions / risks
- Does any BG WS READ `src/subpaths/` or `src/api/` wiring? (WS4/WS10/WS12 plausibly) — verify before BH kills them.
- `affordance-map.md` BASE-vs-specific split is partial (only 9 lib refs) — read in full before extracting.
- The 451-vs-301 wave-note count discrepancy — task's 301 is an undercount; plan for 451.
- infra/glossary "glass-ui-specific" premise in the task is inverted — confirmed irrelevant-to-glass-ui; do NOT pull them into the repo proper.
- gates.mjs is a 5-way contention point (BG-WS1/7/10/12 + BH-GATES + BH-DOCS-policy) — the single-pass batching is mandatory.
