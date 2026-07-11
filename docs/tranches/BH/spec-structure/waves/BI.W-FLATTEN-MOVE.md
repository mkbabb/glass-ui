# BI.W-FLATTEN-MOVE — ATOM A steps 3–8 (the physical 91-family flatten + close battery)

> **Wave id:** `BI.W-FLATTEN-MOVE` · **band:** S1 (FLATTEN — ATOM A) · **class:** `H` (device-free) · **gate:**
> `proof:no-tier-literal` (G7) + THE CLOSE BATTERY · **preconds:** BI.W-FLATTEN-PREP. **ATOMIC with
> BI.W-FLATTEN-PREP** (one commit-set). This is riskiest-wave #1 — highest blast radius, atomic-or-nothing.
> Runs SOLO (batch B4; nothing parallel during the flatten).

## §0 — Verdict

The core move: `components/{ui,custom}/* → components/*` flat peers (90 barrel-bearing families + `_shared`
exempt = 91 dirs; viz VIRTUAL in the README). Re-PROVEN GREEN end-to-end at live HEAD (CODEMOD-SPEC): typecheck
0, vite build EXACTLY 190 chunks, `proof:subpath-classify` EXACT_REPRODUCTION=true (`package.json` BYTE-IDENTICAL),
94/94 subpaths resolve, 638 git renames (301 R100). The move is entry-count- AND export-surface-NEUTRAL — the
strongest perf-neutrality result for a 91-family move. **A half-migration breaks the tree; it lands atomically.**

## §1 — The core insight (ONE elision)

The move is the removal of ONE path SEGMENT — `ui` or `custom` — wherever it immediately follows `components`.
Every downstream rewrite is a corollary. The recompute needs NO module resolver — `elide` removes only a MIDDLE
segment, so the specifier tail is byte-identical old↔new:

```
newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))
```

`@glass` is DROPPED — pure-relative dropSegment (the CODEMOD-SPEC's `@glass` alias forms are STALE; the canonical
retired them). `src` stays RELATIVE (dts self-containment, G10 permanent lock).

## §2 — The steps (3–8)

3. **src recompute** — `elide` is a UNIFORM segment-drop `components/(ui|custom)/X → components/X`. ~568
   flatten-VARIANT specifiers recompute; the ~1218 invariant re-emit byte-identical. Rewrite content FIRST (files
   still at old paths), THEN move dirs (`custom/*` first so `components/tabs` exists, then `ui/tabs` nests).
4. **The migration axis is by MOVEMENT, not SPACE** (blocker-fold #5 — the exact trap):
   - **tests MOVE → RECOMPUTE** via the SAME elide-both-sides formula. The tests-DIRECTORY flatten moves the test
     FILE up one level, so `../../../../src/…/ui/button` → `../../../src/…/button` (depth −1 AND segment drop) —
     NOT the uniform single-side drop (which overshoots root by one). Re-point the 12 fixture-gate paths.
   - **demo STAYS → all-text single-side DROP** (demo not reorganized; only the `ui|custom` segment drops from the
     TARGET text). ~521 specifiers, alias UNTOUCHED.
   - **The demo STAY pass MUST enumerate the NON-IMPORT reference classes** (a `from/import`-only codemod MISSES
     them, and they are build-affecting): (a) `@source` Tailwind globs — LIVE at `demo/demo.css:96-97`
     (`@source "../src/components/ui/_shared/*.ts"` + `"../src/components/custom/**/*Variants.ts"` — break TWICE:
     the tier-drop AND the §2.1 un-mix `*Variants.ts → variants.ts` rename, silently dropping `menuItemVariants` +
     every custom CVA class — an unstyled-render break the visual gate ALONE catches); (b) `readFileSync` fixture-
     path STRINGS; (c) prose in READMEs/CSS comments.
   - **5b — tier-root LOOSE files** (a DISTINCT move+recompute): `custom/PROCEDURAL-SUITE.md → components/` root
     (loose doc, no domain-map row); a loose test file → move AND specifier-RECOMPUTE. Enumerate every tier-root
     loose file.
5. **scripts codemod — ONE UNIFORM ALL-TEXT-RECURSIVE `dropSegment` over ALL 229 files** (NOT the 218 `.mjs` — the
   11 `wf-ay-*.js`/subdir-`.mjs`/`.vue`-fixtures must be covered or G7 stays RED; EXCLUDE only
   `subpath-policy.mjs`) PLUS TWO semantic reconciles:
   - **subpath-policy.mjs two-set merge** — a `readTree` PARTITION of ONE flat `dirsWithIndex('src/components')`
     read, split by `classMap` membership (`CLASS = {...UI_CLASS, ...CUSTOM_CLASS}`, custom-wins → `tabs=PUBLISH`),
     preserving the `{ui,custom,composable}` `readTree` contract. Verified EXACT_REPRODUCTION=true.
   - **the DEAD-BARREL GATE-RECONCILE (3 gates)** — `proof-tabs-std.mjs:95` LIVE-READS the deleted `ui/index.ts`
     → RETIRE the vacuous ui-barrel-read, KEEP only the `tabs/primitives` internal-keep witness (re-point to
     `src/index.ts` + `tabs/primitives`); `proof-consumers-static` + `proof-component-orphan` carry the barrel
     path as list/skip STRINGS → PRUNE.
6. **`ui/tabs → tabs/primitives` override** (a one-entry override BEFORE the uniform drop). `components/tabs/`
   holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `variants.ts` + `index.ts` + `README.md` at root,
   `primitives/{Tabs.vue,…}` nested; `DockLayerGroup` repaths. (The 5 tabs primitives carry NO `<style scoped>` —
   the `tabs→primitives` id rotation touches ZERO golden CSS.) NOTE: `primitives`, NOT the stale `reka` name.
7. **The dead `ui/index.ts` aggregate barrel is EXPLICITLY DELETED** — `unlink` + `rmdir` the emptied
   `ui/`/`custom/` shells; assert `no surviving src/components/{ui,custom}` (a codemod SKIPPING the unlink leaves
   `ui/` non-empty → `rmdir` fails → the post-condition THROWS — confirmed load-bearing).
8. **config + docs** — adopt the parent-scoped generator (landed in FLATTEN-PREP) + sweep stale
   `components/(ui|custom)/` prose from READMEs + CSS comments (edict 8), INCLUDING `src/index.ts:118`
   `components/ui/tabs/*` (a doc-comment outside G7's `scripts/` scope, owed a hand-sweep). The machine-locked
   `components/README.md` domain-map (90 families, one row each; viz membership DERIVED from the `useGpuSubstrate`
   edge ∪ {goo-filter}, `watercolor-dot` tagged `mark`) lands here — the SSOT reconcile (`paper-grid`→
   `liquid-grid`; `watercolor-dot` mark) is the MIGRATION PRECONDITION.

## §3 — The CLOSE BATTERY (CRITICAL)

G7-GREEN (0 literals) is NECESSARY but NOT SUFFICIENT (G7 asserts ABSENCE, not CORRECTNESS — blind to the
dead-barrel mis-target). The battery:

- `proof:no-tier-literal` (G7) — 0 survivors (born-RED 865/229). Self-test 9/9.
- **the DIFFERENTIAL resolves-on-disk floor** — `{post-flatten danglers} \ {pre-flatten danglers} == ∅`
  (flatten-induced = 0), NOT an absolute "every path resolves" (46 pre-existing danglers are orthogonal; PRUNED
  in BI.W-DIFFERENTIAL-CLOSE).
- `proof:subpath-classify` + `proof:build` (build-verify FIRST, then classify/regen-exports/regen-structure).
- **`vue-tsc -p tsconfig.test`** (blocker-fold #5 — the SOLE gate that catches the tests-recompute-vs-drop
  mislabel; a mis-dropped test specifier overshoots root by one and typechecks RED).
- the 12 fixture-reading gates (tests-dir soundness).
- **the `@source`-glob resolves-on-disk assertion** (blocker-fold #5 — every `@source` in demo/scripts CSS points
  at an existing dir/glob; a stale scan-glob born-REDs).
- the dead-barrel post-condition (`no surviving src/components/{ui,custom}`).
- the DEAD-BARREL GATE-RECONCILE landed (proof-tabs-std retired + re-pointed; proof-consumers-static +
  proof-component-orphan pruned).
- `proof:barrel-pure` GREEN on glass-ui (the FLATTEN-PREP un-mix landed).

## §4 — Fences

- **Atomic.** FLATTEN-PREP + FLATTEN-MOVE commit together as ATOM A (G7 requires atomicity). Runs SOLO — nothing
  parallel during the flatten (it rewrites every specifier).
- ZERO PUBLIC-EXPORT churn (the subpath surface is `src/*.ts` entry files, 0 package.json keys).
- `src/styles/` is UNTOUCHED by A (ATOM B is separate, S2).
- The 500-breacher carves are CEDED to BG (no double-carve); RATCHET must be `{}` (asserted by CENSUS-RECOMPUTE).
- Grep-locked provenance comments carry VERBATIM into the host file post-move.

## §5 — Cross-refs

CODEMOD-SPEC (executed prototype); blocker-fold #5 (migration axis by movement); §3 ATOM-A steps 3–8 + close
battery; §9.4/§9.5/§9.8; Appendix A5 (the provenance flatten).
