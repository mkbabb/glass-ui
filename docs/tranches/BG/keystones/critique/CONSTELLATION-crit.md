# CONSTELLATION-crit — adversarial critique of KS-CONSTELLATION.md

**Critic:** KS-C adversarial (opus) · **Date:** 2026-07-01 · **glass-ui HEAD:** `f6fa1767`
**Verdict:** strong, near-binding-ready. Two MAJOR accuracy defects in the CENTRAL deliverable (the
by-name ask roster's atlas break enumeration + the dock-density blocker scope) + two MINORs. No CRITICAL.
**Convergence: 84%.** Every disk claim below was re-verified read-only 2026-07-01 (assuming nothing,
including prior lens/research priors — per mandate).

---

## What holds (re-verified, not asserted)

- **§0 pins — ALL 9 verified byte-exact.** value.js `1.2.0` `file:../glass-ui` devDep + `file:../keyframes.js`;
  keyframes `5.1.0` `~4.0.0` optionalDep + value `^1.2.0`; speedtest `^4.0.1` + kf `^4.3.0` STALE + value
  `^0.13.0` STALE; atlas `>=4.2.0` peer + kf `^5` + value `^1.2.0`; muster `^3.1.0`; bbnf `^3.9.0`;
  fourier-analysis(web) `^4.0.0`; slides `3.13.0`; words `^3.0.0` + vendored `words/frontend/glass-ui/`.
- **The break-site pins verified LIVE:** value.js `App.vue:115` imports `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`
  from `/goo-blob`; speedtest `PhaseTimeline.vue:52` `TimelineSegment` from `/api`; muster
  `useAuroraConfig.ts:47` `DEFAULT_AURORA_CONFIG,AuroraConfig` from `/api`; bbnf `preset.css:230`
  `--glass-blur-dock`; kf `draggable.ts:87` `snap?: number[]` (DISCHARGED, correct); the 3 orphans
  (`Surface`/`MenuItemVariants`/`ControlSize`) all in `src/api/index.ts:71/109/115`.
- **The oklchSpectrum fiction — CORRECTLY CAUGHT.** `grep oklchSpectrum value.js/src` = 0; the discharge
  attribution at `border-progress/README.md:37` is fictional. §3.Q1/§4.2/§4.3/§7.5 all correct.
- **The row-4 witness re-base — ACCURATE and NEEDED.** `asks-and-consumes.md` row 4 + the "row-4 asymmetry"
  note STILL cite the KILLED `proof:retired-token-consumers` (verified in-doc); SYNTHESIS §2.3 + row 0.7
  kill it. §4.1 deliverable (2) correctly targets the fix.
- **B4e disk targets verified:** `MIGRATION.md:1` = `# MIGRATION—v0.9.x → v1.0 → v2.0` (retitle valid);
  `CHANGELOG.md:212` `## Unreleased` mis-ordered between 3.3.0(:182) and 3.2.0(:360) (delete valid).
- **Peer floor correct:** value `^1.0.0→^1.1.1` NEVER `^1.2.0`, kf `^5.0.0→^5.1.0` — matches
  EXECUTION-PROGRESS:130 + research §1.
- **Wave binding clean:** all four ids exist (EXECUTION-PROGRESS:130/133/136/137); preconds untouched
  (`[WS12]`, `[C]/[WS12]`, `cutReady`); zero self-inserted rows; `W5-viz-disposition` (NOT W4) matches
  row 136. Foreign-tree fence restated per ask; zero sibling writes proposed. Greenfield loop genuine
  (Q1/Q2/Q3 each carry ≥3 directions → GOLDEN → self-challenge → final form).

---

## MAJOR-1 — the atlas `GlassPanel variant→tier` ask cites COMMENT lines, double-counts, and MISSES a live site

The lane's central deliverable is the by-name ask roster with precise sibling file:line for THEIR edit.
The atlas `GlassPanel variant→tier` row is the spec's declared "single largest external break" (§7 note 3),
the WIDENED covered-floor row (§4.1). Its enumeration is **wrong on 4 of 5 citations**:

Spec (§3.Q1 row 2, §4.1, research §4) cites the ≥5 sites as:
`HoverCard.vue:283 · GalleryMasthead.vue:58,165 · AuroraVeilStage.vue:3 · TaxonomyApparatus.vue:58`.

Disk truth (grepped `src/`):
| cited | reality | live element |
|---|---|---|
| `HoverCard.vue:283` | HTML COMMENT (`<!-- THE FLOATING TIER … -->`) | live at `platform/charts/HoverCard.vue:288` `variant="floating"` |
| `GalleryMasthead.vue:58` | HTML COMMENT | live at `platform/chrome/GalleryMasthead.vue:67` `variant="floating"` |
| `GalleryMasthead.vue:165` | CSS COMMENT (`/* … */`) — SAME veil as :58 (double-count) | (same :67 element) |
| `AuroraVeilStage.vue:3` | JS COMMENT (`// Wraps … <GlassPanel variant="floating">`) | live at `platform/chrome/AuroraVeilStage.vue:75` `variant="floating"` |
| `TaxonomyApparatus.vue:58` | LIVE ✓ | `dashboards/vft-germination/features/taxonomy/TaxonomyApparatus.vue:58` |

TRUE live `<GlassPanel variant=…>` element set (5): `HoverCard.vue:288` · `AuroraVeilStage.vue:75` ·
`GalleryMasthead.vue:67` · `TaxonomyApparatus.vue:58` (all `floating`) **+ `GalleryView.vue:224`
`variant="resting"`** — a live break the spec never lists.

Compounding, §3.Q1 row 2 carries a **materially FALSE assurance**: *"Card surface/tier 4-member axis is
PRESERVED — GalleryView.vue sites do NOT break."* `GalleryView.vue` has BOTH a `<Card surface tier>`
(:284-287, safe) AND a `<GlassPanel variant="resting">` (:224, BREAKS under `variant→tier`). Telling atlas
"GalleryView is safe" would strand `:224`.

**Why it matters:** the "≥5 sites" count is coincidentally true (5 live elements exist), but the roster
hands atlas 4 prose lines + a double-count + a missing site — the exact imprecision a maintainer greps
against and loses time on. This is an inherited research-file error (§4) the spec propagated without
re-verification.

**Fix:** re-cite the FIVE live element lines (with the real `platform/…`/`dashboards/…` paths, not bare
filenames); collapse the GalleryMasthead double-count; ADD `GalleryView.vue:224` `variant="resting"`;
delete the "GalleryView sites do NOT break" assurance (scope it to the Card sites :284/:640 only, and
state the GalleryView GlassPanel:224 DOES break). Note: a `variant→tier` prop rename breaks EVERY
`variant=` value, not just `floating` — the enumeration must be value-agnostic.

## MAJOR-2 — the dock-density PRE-CUT BLOCKER over-scopes atlas as a co-victim

§7 note 1 + §4.4 checklist item 3 frame the [OPEN — pre-cut blocker-class] density-vs-size disposition as
*"audacious/spacious are live dock rungs consumed by speedtest ×2 + atlas's /dock ×5 … the cut must not
fire with the disposition open, else **two repos break silently**."*

Disk truth: speedtest ×2 is REAL (`src/components/Dock.vue:258` `density="audacious"`;
`src/components/survey/SurveyResultDock.vue:42` `density="spacious"` — both live, verified). **atlas is NOT
at risk:**
- atlas's ONE GlassDock density is `density="comfortable"` (`platform/chrome/Dock.vue:102`) — the preserved
  middle rung; it survives any `sm/md/lg` or 4-rung collapse.
- atlas has ZERO `audacious`/`spacious` DENSITY usage (grep `audacious|spacious` in atlas/src = only the
  `text-audacious` TYPOGRAPHY display rung — unrelated).
- atlas's "/dock ×5" are COMPONENT imports (`DockIconButton`/`DockSeparator`/`DockDropdownTrigger`/
  `GlassDock` — VizPlate:29, DockFoot:23, DockSettings:17, DockStepperRender:17, Dock:41), none carrying
  the at-risk rung. (Aside: the raw `grep glass-ui/dock` = 8 incl. 3 comment lines; the ×5 live-import
  count is right, but they're irrelevant to the DENSITY fold.)

**Why it matters:** the blocker is genuine for speedtest ×2, but roping atlas in as a co-victim
mis-scopes a PRE-CUT gate — it invites a needless "exempt atlas too" motion (atlas was never at risk) and
erodes trust in the census that the lane's whole value rests on. The "two repos break silently" alarm is
one-repo.

**Fix:** scope the blocker to speedtest ×2. State atlas's dock density is `comfortable` (SAFE) and its
/dock imports are component-only (not density consumers) — so atlas is NOT a density-fold victim. The
disposition recommendation (dock density EXEMPT via its own `--dock-scale` grammar) stands, but on
speedtest's evidence alone.

## MINOR-1 — `proof:crossrepo-asks:bh` is a NOT-YET-MINTED gate; "[H] doc-only" undersells B6+B7

`proof:crossrepo-asks:bh` does not exist on disk — only `proof:crossrepo-asks` (BB-scoped,
`scripts/proof-crossrepo-asks.mjs`, zero BH/5.0.0/`>=4`-floor awareness). The spec (§2/§4.1/§4.4/§5)
presents `:bh` as a GREEN gate ARM and correctly distinguishes it from the vacuous BB gate, but §4 opens
*"All four are doc/structure waves"* and §4.1 says *"(H wave; doc-only)"* — while the `:bh` arm requires
MINTING a new source-doc-auto-scan gate (a `scripts/` add + a `:bh` npm arm). That's real gate-authoring,
not doc-only. This reconciles with EXECUTION-PROGRESS:136 (which lists `:bh` GREEN as the wave's
deliverable), so it is not disk-false — but the spec should state plainly that B6+B7 MINTS the `:bh`
gate, so a reader does not assume it exists.

## MINOR-2 — the "16 accreted 4.x blockquotes" collapse count is unverified (inherited from BH PLAN)

§4.3 deliverable 3 says "Collapse the 16 accreted 4.x blockquotes." Disk grep of MIGRATION.md 4.x
blockquote-bold lines returns ~10, not 16 (the count is fuzzy — multi-line blockquotes complicate it).
This is a B4e/BH-PLAN-inherited figure, not the spec's novel claim, so LOW severity — but B4e should
re-derive the exact collapse-target count against the landed MIGRATION.md rather than carry "16" as a
literal (the KS-B stale-literal lesson).

---

## The five critique axes (on the spec itself)

1. **Precepts + folded rules.** Conformant. Foreign-tree fence literal + restated per ask; clean breaks
   (the one sanctioned interim — the consumer-side `var(--focus-ring-color, var(--ring))` straddle —
   correctly attributed as THEIRS); presets-in-consumers held (showcase asks name library primitives,
   hues stay sibling); ≥2-consumer fed by constellation evidence; killed gate stays killed. No issue.
2. **Wave-binding correctness.** Ids exist, preconds untouched, no self-inserted rows, wants→§7. Clean.
3. **Disk re-verification.** MAJOR-1 + MAJOR-2 are the two disk-accuracy failures (inherited from
   research §4/§5); everything else re-verified true. `--focus-ring-color` correctly a rename TARGET (not
   yet on disk — expected; `--ring`/`--focus-ring-shadow` are what exist, and EXECUTION-PROGRESS:133 names
   `--focus-ring-color` as the target, so consistent).
4. **Sibling READ-ONLY fence.** Held — every sibling change is a by-name ask; zero edits/mv/rm/install
   proposed. The value.js EARLY-ask exception is correctly recorded as a relay-noted timing exception, not
   a fence breach.
5. **Executability.** Strong once MINOR-1's `:bh` mint is stated. Gate targets real (`proof:build`,
   `verify-export-types`, `proof:subpath-enumeration`, `public-surface.spec` map arm); doc targets real
   (MIGRATION:1, CHANGELOG:212, README:37).

## Must-fix for binding (in priority)

1. **[MAJOR]** Re-cite atlas GlassPanel to the 5 LIVE element lines (HoverCard:288, AuroraVeilStage:75,
   GalleryMasthead:67, TaxonomyApparatus:58, **GalleryView:224 resting**), drop the GalleryMasthead
   double-count, delete/scope the false "GalleryView sites do NOT break" assurance, make the rename
   value-agnostic.
2. **[MAJOR]** Re-scope the dock-density blocker to speedtest ×2; state atlas's `comfortable` (safe) +
   component-only /dock imports; drop the "two repos break silently"/"atlas /dock ×5" co-victim framing.
3. **[MINOR]** State that B6+B7 MINTS `proof:crossrepo-asks:bh` (a scripts add + `:bh` arm); soften the
   "[H] doc-only" framing accordingly.
4. **[MINOR]** Flag the "16 blockquotes" as re-derive-at-B4e, not a carried literal.

*None is CRITICAL. The spec's identity delineation, greenfield loop, choreography, and honesty-ledger
work are binding-grade; the two MAJORs are census-precision fixes to the roster's atlas rows.
— KS-C CONSTELLATION adversarial critic.*
