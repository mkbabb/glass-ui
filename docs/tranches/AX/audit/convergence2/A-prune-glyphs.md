# A-prune-glyphs — prune disco-glyph + glyph-face (P2/P3)

**Lane** A-prune-glyphs · **Severity** major · **Verdict** augment-existing-wave (**AX.W19**) ·
**Covers** USER-DEFECTS pass-2 P2 (`/primitives/disco-glyph` → remove) + P3 (`/primitives/glyph-face`
→ likely remove). HEAD `b919137` (the prompt's `5cf2980` is stale; findings re-proven against live HEAD).

## Bottom line

**AX.W19 already owns both prunes in full** — header-ribbon + glyph-face + disco-glyph excision, with the
glyph-face↔disco-glyph silhouette DI coupling severance ordered correctly (glyph-face before disco-glyph).
Every file-touch P2/P3 imply is in W19's FileBounds. **No net-new wave. No design call escalation needed**
— the overfitting bar is decisively failed for both, so P3's "likely remove" resolves to a clean PRUNE
(not needs-user-decision). The lane's job here is to **confirm the W19 census is complete vs live HEAD**
and surface two trivial doc-comment-cruft touch-ups W19's file list does not yet name.

## The overfitting verdict (the ≥2-consumer bar)

Both primitives FAIL the bar (≥2 binary consumers OR exported-with-a-real-consumer OR demo-private helper).
Re-proven live at HEAD `b919137`:

### disco-glyph — PRUNE (overfit substrate; manufactured 2nd consumer)

- On the root barrel (`src/index.ts:121` + the `:54` cherry-pick rationale token), `/disco-glyph` subpath
  (`src/subpaths/disco-glyph.ts`), package.json exports + typesVersions, CSS (`src/styles/disco-glyph.css`
  + `index.css:131` `@import` + comment `:103`), demo story (`primitives/disco-glyph.vue`) + manifest row
  (`:132`) + IA slug.
- **Non-self consumer census (live grep):** the ONLY non-story touch-point is
  `demo/stories/foundations/chart-chassis-palette.vue:16,60-99`. Its own `:6` comment dates it
  "L.W3 Lane B — second-consumer wiring," i.e. a demo **authored to clear the ≥2-consumer bar** (the
  circular justification). Its `:61` blurb claims "primary-audacious CTAs compose it" — **no `src` grep
  bears this out** (confirmed: zero `<DiscoGlyph>` renders in `src/components` outside disco-glyph's own
  dir). The one other demo hit is a passing prose mention in `primitives/glyph-face.vue:150`, not a render.
- Zero in-repo binary consumers, zero cross-repo consumers (see siblings below). **PRUNE.**

### glyph-face — PRUNE (P3 "likely remove" → resolves to remove)

- On the root barrel (`src/index.ts:120` + `:53` rationale, one of the 7 cherry-picks), `/glyph-face`
  subpath, package.json exports + typesVersions, CSS (`src/styles/glyph-face.css` + `index.css:130`),
  demo story + manifest row (`:131`) + IA slug. Manufactures an **intra-library DI coupling**: it
  provides `GLYPH_FACE_SILHOUETTE_KEY` (`keys.ts`) which only `DiscoGlyph.vue:3,82-91` consumes — a
  seam built to wire the two demo-only primitives to each other (overfit substrate per the no-overfitting
  precept).
- **Non-self consumer census (live grep):** two demo touch-points —
  `demo/stories/compositions/instrument-chassis.vue:9,174,228` (a composition **slated for retire under
  W28/W29** with instrument-chassis itself) + a prose blurb in `chart-chassis-palette.vue:61`. No
  standalone binary consumer. The silhouette DI's sole compositional purpose (feeding a GlyphFace cap clip
  from a DiscoGlyph) is dead weight once both are pruned.
- The `disco-glyph` render-coupling makes them a **coupled pair** — pruning one without the other dangles
  an import. W19 already orders the severance (glyph-face severance FIRST so the disco-glyph delete doesn't
  dangle). **PRUNE.** P3's "likely" hedge is dischargeable to a hard remove — there is no live consumer to
  preserve and no design ambiguity.

## Cross-repo sibling census (the "is this load-bearing somewhere?" check)

Grepped all `~/Programming/*` siblings (keyframes.js, speedtest, slides, feedback-coder, value.js,
latex-paper, muster, dns-speedtest). **Two hits, both non-live:**

1. `speedtest/src/__tests__/App.surveyEntry.test.ts:100` — a `vi.mock("@mkbabb/glass-ui/glyph-face")` STUB.
   It mocks the import so the survey-wizard test stays cheap under jsdom; **no speedtest `.vue` source
   renders GlyphFace** (confirmed: zero non-test source hits in `speedtest/src`). It's a **dead test mock**
   — the speedtest repo's own §8-repatriation cleanup, NOT glass-ui's prune (W19 FileBounds already
   excludes it as out-of-bounds). Severing the subpath 404s this mock's import path, but `vi.mock` factory
   stubs don't resolve the real module, so the speedtest test survives the prune untouched.
2. `keyframes.js/demo/playground/dist/assets/index-*.css` — a stale BUILT artifact in `dist/`, not source.
   No `glyph-face`/`disco-glyph` in keyframes.js SOURCE (`src/` + `demo/` grep clean).

Neither is a live source consumer. The cross-repo concern that gates W19's PUBLISH is **HeaderRibbon**
(keyframes `EditorShell.vue`, migrated via W35) — disco-glyph/glyph-face have NO such cross-repo consumer,
so this lane's two primitives are publish-safe to prune independent of W35.

## Census deltas vs the W19 plan (two trivial doc-comment touch-ups W19's file list omits)

W19's FileBounds is essentially complete. Two stale **doc-comment** references survive that W19's named
file list does not yet enumerate — both are cosmetic (no structural coupling), fold into W19's existing
edits, NOT a new wave:

1. `src/styles/dock-controls.css:324` — a doc-comment ("The inner `<GlyphFace>` halo
   (`.glyph-face-backplate { inset: -25% }`) gets clipped …") describing a `::before` phase-tint lift. The
   **CSS rule itself does not depend on the glyph-face component** (it's a standalone pill `::before` that
   replaced the GlyphFace-halo approach); only the explanatory comment name-drops `<GlyphFace>`. W19 should
   trim the stale name-drop when it deletes `glyph-face.css` (add `dock-controls.css:324` to its comment-trim
   sweep alongside `createContext.ts:5` + `gates.mjs:387`).
2. `src/composables/context/createContext.ts:5` — already in W19's FileBounds (the doc-comment consumer list
   trim). Confirmed present at HEAD; no delta.

Both are inside W19's spirit ("documentation-is-part-of-the-change" — trim the deleted glyph-face from
doc-comments). They do NOT warrant a separate wave.

## Dedup statement

**Folds entirely into AX.W19** (`docs/tranches/AX/waves/AX.W19-primitive-prune-A-headerribbon-glyphface-discoglyph.md`,
status `planned` in PROGRESS.md:35). W19 already: (a) excises both dirs + subpaths + root-barrel lines +
cherry-pick tokens + package.json exports/typesVersions + CSS + `@import`s + demo stories + manifest rows +
IA slugs + the 3 gate ledgers; (b) severs the silhouette DI coupling in the correct order; (c) re-expresses
the `chart-chassis-palette` swatch grid as a plain token tile (the manufactured-consumer removal); (d)
routes the speedtest dead-mock + the instrument-chassis composition consumer to their owning waves (W28/W29).
The CONVERGENCE-PLAN dedup anchor "W18/W19/W21/W40 → the prunes (P1-P5)" is correct for P2/P3 → **W19**.

**This lane adds:** (1) live re-confirmation at HEAD `b919137` that the consumer census is unchanged (zero
binary consumers for both; the two sibling hits are dead mock + stale dist); (2) the resolution of P3's
"likely remove" hedge to a hard PRUNE (no design call — the overfitting bar fails decisively); (3) the
`dock-controls.css:324` stale doc-comment delta for W19's comment-trim sweep.

## Verdict: augment-existing-wave (AX.W19) — no net-new wave, no needs-user-decision
