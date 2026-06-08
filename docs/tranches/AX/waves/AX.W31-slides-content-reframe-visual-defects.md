# AX.W31 — Slides content reframe + visual defects (Slide04 what-if anomaly · $5M figure-clip · lock reconcile · access-modal glass · mobile guards)

**Band** L · SLIDES · **Severity** major · **dependsOn** AX.W30 (the slides baseline — the H working-tree
landed on a clean `tranche/AX-slides` branch + the constellation Canvas2D leak fixed + the 7 e2e specs
EXECUTED; W31 cannot reframe a slide whose dev work is still stranded as dirty tree under 6 intervening
commits) · *(SEPARATE REPO — `~/Programming/slides`, tracked here for cross-repo coordination only; glass-ui
writes NO slides source itself — the slides session executes, the orchestrator owns the slides index)* ·
**Charter** AX.md §3 (the `### AX.W31` block, lines 1550-1581) + §2 band-L row + §2b band-L precept row
(lines 224) + §4 note 9 (line 2038 — the slides band is a separate repo folded for tracking; the genuinely-
unaddressed content gap is the §12.2 Slide04 hypothetical/what-if reframe) + §4 note 18 (the `.deck-progress`
→ `<DeckProgress>` port is W32, NOT here — W31 does NOT touch the deck-progress bar) · **Audit**
`deep-audit-corpus.json` slice `slides-content` (index 29 — F0 the $5M figure-clip, F1 the Slide04
hypothetical/what-if reframe MAJOR, F2/F3/F4/F5 the verify-only §12 items) + slice `slides-visual-mobile`
(index 30 — F2 the homepage lock at-rest affordance, F3 the access-modal glass restyle + portal-scheme leak,
F4 the mobile-reflow guards, F8 the SlideNutrition excision + access-key redaction) +
`constellation-analysis-corpus.json` result[3] (`hist:slides`), result[13] (`idiom:slides` — the
SlideNutrition orphan-with-live-import confirm + the pptx-popover SATISFIED), result[24] (`aw-delivery` — the
ADDENDUM-2-vs-W31 lock contradiction RECONCILE + the xray negative-space/Open-AI-XRAY-button-removal fold).

> **NOTE on the W31 number-collision.** The deep-audit slice-31 (`aw-plan-delivery-audit`) `routesToWave`
> field reads `"AX.W31 (Lighthouse/perf-a11y)"` — a STALE route from when the charter had 34 waves and W31
> was the Lighthouse slot. The CONVERGE pass reassigned the Lighthouse audit to **AX.W39** (§1 line 149) and
> made the final AX.W31 the **Slides content reframe**. This wave is the Slides content reframe ONLY; the
> Lighthouse work is W39's, NOT W31's (digest aw-delivery line 321 records the reassignment).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FIVE falsifiable witnesses against the slides repo `~/Programming/slides` at branch
`deck/feedback-coder` (the dirty H working-tree W30 lands on `tranche/AX-slides`). The §12 deck restructure
(G.W5 commit `d8f3dbb`) + the H.W2-W10 visual pass already RESOLVED most slides items at the CODE level — but
the Slide04 framing transposition was a single word-swap not the framing reframe, two visual defects survive,
and two hygiene defects ship. Each witness is re-proven in the W30 wave-open live-re-diagnosis ritual before
W31 touches a file (do NOT proceed on the audit's word).

- **RED witness 1 (Slide04 is a NAMED real DIT/DPI incident, not the hypothetical/what-if register the user
  directed — the one MAJOR content gap; slice 29 F1).** `grep -n "DIT\|DPI" src/decks/til-briefing/slides/Slide04.vue`
  returns DIT at lines 26, 65, 124 (×5+ across the file) and DPI at lines 69, 72 (×2). The G.W4 (commit
  `18b26e9`) + H.W9 passes removed the single literal `Pitt County` token but kept the slide's editorial spine
  as a SPECIFIC, named DIT/DPI invoice incident (`Slide04.vue:26` — *"DIT's invoice system bills the wrong
  number"*; `:72` — *"no one at DPI read them line by line"*). The user's directive is a FRAMING
  transposition (real named incident → general anomaly what-if: *"Frequently, agencies are billed for
  trivially small amounts, or outrageously large ones"* with the ~$5M and $3.50 as ILLUSTRATIVE both-ends
  examples). RED: the slide still reads as a specific incident, not a generalized anomaly thesis. Falsifiable:
  *`grep -c "DIT\|DPI" Slide04.vue ≥ 1` AND the editorial spine names a specific agency invoice.*

- **RED witness 2 (the $5M figure rides an `overflow:hidden` clip whose ONLY job is to mask the `::before`
  glow — the figure can crop; slice 29 F0).** `src/decks/til-briefing/slides/Slide04.vue:280` is
  `position: relative; overflow: hidden` on `.hero`, and the dominant figure `~$5M` (`:67`, `:52`) is the
  FIRST of 7 stacked rows in a `flex:1` column with NO min-height budget. Nothing GUARANTEES the hero height
  ≥ figure height + the other 6 rows; on a short-landscape or the portrait stack the `overflow:hidden` eats
  the top figure — the slide's single most important number is the clipped element. The clip exists ONLY to
  bound the `::before` red glow (which can be `inset`-clipped on a separate pseudo-layer). Falsifiable:
  *`grep -n "overflow: hidden" Slide04.vue` hits `.hero` AND the figure is not height-budget-guaranteed.*

- **RED witness 3 (the homepage lock affordance is an `opacity:0` hover-only scrim while the deck is
  un-gated — the at-rest cue does not exist AND a dead scrim no deck triggers; slice 30 F2 + the ADDENDUM-2
  contradiction).** `src/views/HomeView.vue:134` is `opacity: 0` on the lock scrim, revealed only on
  hover/focus (`:113-114` comment); the `.deck-card--gated` branch (`:31`) keys off `d.softGated || d.protected`
  — but `src/decks/til-briefing/meta.ts:16` is `softGated: false` and `:9` is `protected: false` (H.W6 retired
  the gate). So at REST there is NO lock cue, and the hover-scrim machinery is dead (no deck triggers it). The
  user asked for *"slightly blurred + a lock symbol at-a-glance, at REST"*. RED: no at-rest lock cue paints,
  and a dead hover-only scrim sits unused. **CONTRADICTION witness:** ADDENDUM-2 retired the lock; the W31
  charter line restores it — UNRESOLVED at HEAD (RATIFY-BEFORE-IMPL, below).

- **RED witness 4 (the access-key modal escapes the deck's pinned `color-scheme` — `light-dark()` tokens
  resolve to `:root`'s scheme, not the deck's; flat-grey not warm-cream glass; slice 30 F3).** `src/views/DeckGate.vue:44`
  teleports a reka-ui `DialogContent` (`:3` `import { Dialog, DialogContent } from "@mkbabb/glass-ui/dialog"`);
  the teleported overlay escapes the slide's scoped `color-scheme`, so `light-dark()` tokens resolve to
  `:root`'s scheme (the digest measured `dialogBg srgb 0.118.../0.8` — a near-black flat-grey, not the warm
  glass the deck pins). The scoped `<style>` in DeckGate cannot reach the teleported node (only the §8
  `close-X portal-pierce` reaches across today). RED: a portal-scheme-inheritance gap leaves the modal ugly
  flat-grey. (Coupled to witness 3 — if the gate is formally retired, this folds into the retirement.)

- **RED witness 5 (two hygiene defects ship — the SlideNutrition orphan-with-live-import + the access-key
  plaintext leak across committed docs; slice 30 F8).** `src/decks/til-briefing/deck.ts:18` documents
  *"SlideNutrition itself is retired"* (folded into SlideConclusion) and the manifest (`:34-35`) does NOT
  import or list it — yet `src/decks/til-briefing/slides/SlideNutrition.vue` STILL exists, still imports
  `StatusDot` from glass-ui, and was still EDITED in the H.W10 working tree (the dedup-pulse spec can never
  assert on a slide that never mounts). `grep -rln SlideNutrition src/` = ONLY `deck.ts` (the retirement
  comment) + the orphan file itself — confirmed zero non-self refs. AND `grep -rln "wolfpack-ledger-2026" docs/`
  hits ≥10 committed docs (H.md, the H/E/F tranche docs); `grep -rln "wolfpack-ledger-2026" src/` = 0 (the
  standing src/-clean rule holds). RED: a phantom slide ships in src/ and a live access key is leaked in
  plaintext across committed docs.

The wave is RED at HEAD on all five; the HardGate drives each to GREEN (the reframe verified live, the figure
un-clippable, the lock RECONCILED, the modal scheme-pinned, the orphan deleted + key redacted, the mobile
guards gating).

---

## Goal

Re-author Slide04 to the hypothetical/what-if anomaly register the user supplied, un-clip the $5M figure,
RECONCILE-then-implement the homepage lock affordance (or formally retire it), glass-restyle the access-key
modal by pinning its teleported `color-scheme`, add the mobile-reflow regression guards, and excise the dead
SlideNutrition slide + redact the leaked access key — so the live deck reads as a confident generalized
anomaly thesis with no clipped figure, no flat-grey modal, and no phantom or leaked artefact, verified on a
live render-matrix audit.

---

## Scope (the gestalt fix — content framing transposition + the four sidestepped defects + hygiene; no word-swap, no dead scrim)

The audit's findings converge on one truth: G.W5 + H restructured the deck and fixed most §12 items at the
CODE level, but Slide04 got a word-swap not the FRAMING transposition the directive demanded, and the H pass
SIDESTEPPED two HIGH requirements (the at-rest lock; the access-modal restyle) by retiring the gate rather
than fixing them — leaving a half-broken modal + dead scrim. W31 ships the genuine reframe + the four
sidestepped/missed defects + the hygiene excisions, on the W30-landed clean branch. **It is a SLIDES-repo
wave**: glass-ui authors this spec; the slides session executes it (the orchestrator owns the slides index;
agents stay read-only — the hardened agent git clause, K invariant 5).

### 1. Slide04 hypothetical/what-if reframe — the framing transposition, not a word-swap (slice 29 F1, MAJOR)

Re-author Slide04's copy SPINE to the hypothetical/what-if register: LEAD with the general anomaly thesis
(*"agencies are billed for trivially small amounts, or outrageously large ones"* — re-expressed in the deck's
established editorial voice per the G-tranche `WRITING-CONFORMANCE.md`: the begotten-workflow register, em-
dashes without spaces, plain voice — the user's sentence is a DIRECTION, not verbatim copy to paste), present
the **~$5M and the $3.50 as ILLUSTRATIVE both-ends examples** ("large" and "small" anomalies), and EXCISE the
named DIT/DPI/specific-incident callouts so the slide reads as a generalized anomaly what-if, not a specific
real billing incident. The $3.50 receipt prose (`Slide04.vue:39,47,52`) re-touches into the new "small
anomaly" illustrative register (slice 29 F5 folds here — the de-shoehorn line lands in the what-if frame).
The slide's RED-discipline (the $3.50 receipt reads neutral, the ~$5M is the single focal event) is preserved.

### 2. The $5M figure-clip — drop `overflow:hidden`, bound the glow on a clipped pseudo-layer (slice 29 F0)

Audit the hero LIVE at the export frame + a short-landscape + portrait. **Drop `overflow:hidden` from `.hero`
(`Slide04.vue:280`)** — it exists ONLY to clip the `::before` red glow, which is `inset`-bounded on a SEPARATE
clipped pseudo-layer instead (a `::after`/clipped wrapper carrying the glow, so the figure never rides the
clip). Give the hero a content-height BUDGET (a min-height that fits the 7 rows) instead of clamping the
figure against a hidden overflow; let the hero grow / the slide scroll rather than eat the top figure. The
figure is the slide's most important number — it must NEVER be the clipped element.

### 3. Homepage lock affordance — RATIFY-BEFORE-IMPL, then lift the cue to REST or formally retire (slice 30 F2; the ADDENDUM-2 contradiction)

**RATIFY-BEFORE-IMPL (the lock contradiction — the single decision gate of this wave).** ADDENDUM-2 RETIRED
the soft-gate (`meta.ts:16` `softGated: false`, H.W6); the W31 charter line RESTORES the lock-affordance.
These CANNOT both stand. The orchestrator ratifies ONE path BEFORE impl and records the re-reversal so the
RETIRED→re-instated path is auditable (digest aw-delivery action: *"confirm with the orchestrator whether the
lock is removed (ADDENDUM-2) or restored (W31)"*):

- **RECOMMENDED PATH — re-gate ONE demo deck to demonstrate-and-fix (RATIFY).** Restore the lock as a genuine
  ≥1-gated-deck demonstrator (a `_fixture` or one demo deck with `softGated: true`), so the at-rest affordance
  and the access-modal restyle are LIVE-EXERCISED (not a dead scrim no deck triggers). til-briefing STAYS
  public; the gated demonstrator is the lock's consumer. Then implement: lift the lock cue OUT of the
  `opacity:0` scrim onto the RESTING state — a standing glass lock-disc badge (top-right, matching DeckGate's
  lock-disc vocabulary) + a resting `filter: blur(~1px)` on the card BODY ONLY (title/summary/tag stay sharp —
  blur the surface, not the text), with hover DEEPENING from there. Honor `prefers-reduced-motion`. This
  satisfies the user's at-rest-blur+lock-symbol ask AND the ≥1-consumer discipline (no dead scrim).
- **ALTERNATIVE PATH — formally retire the homepage-lock affordance (per §0 excise-or-fail).** If the
  orchestrator ratifies removal: DELETE the dead hover-only scrim (`HomeView.vue:134-144`) + the gated branch
  + DeckGate + `useDeckUnlock` rather than carrying an unconsumed half-broken modal. Then §3.4 (the access-
  modal restyle) FOLDS into the retirement (no modal to style).

**Do NOT carry both directives unresolved** (the charter's strike-or-re-justify mandate). The wave-spec
records the ratified path in `audit/W31-slides-content.json` before impl.

### 4. Access-key modal glass restyle — pin the teleported `color-scheme` (slice 30 F3; coupled to §3)

IF the gated demonstrator is retained (§3 RECOMMENDED): fix the portal-scheme-inheritance gap — pin
`color-scheme` (+ apply `.dark` when the app is dark) on the teleported `DialogContent`/portal root so
`light-dark()` tokens resolve to the deck's PINNED scheme, not `:root`'s; warm+blur the `DialogOverlay` scrim
via a `:global()`/deck.css §8 portal-pierce; raise `.deck-gate` text-align specificity; add
`box-shadow: var(--glass-shadow-floating)` for floating elevation + the lock-disc highlight. The result is
warm-cream glass, not flat-grey shadcn. **Cross-routing note:** the GENERIC portal-scheme-inheritance helper
(a glass-ui-side `color-scheme`-pinning utility for any teleported reka Dialog under a scoped scheme) is a
glass-ui library concern flagged for the ≥2-consumer discipline — it routes to a glass-ui AX primitive wave
(AX.W21/W37 census), NOT here; W31 fixes the slides-SIDE instance directly.

### 5. Mobile-reflow regression guards (slice 30 F4 + F6)

The durable mobile fixes are IN PLACE and source-correct (the shared fixed-rem `--marker-*` tokens consumed
per close-slide `@container` block; the per-breakpoint `--chart-min-h` chart floor). KEEP both recipes (they
are idiomatic + DRY). ADD the regression GUARDS so the class cannot silently recur:

- **The unreset `calc(N*var(--cqx))` lint** — a lint/test flagging any `calc(N*var(--cqx))` with N≥24 inside
  an `@container` portrait block that is NOT floored (`--cqx = calc(1cqi/12.8)` collapses to ~0.305px at a
  390px stage, so N≥24 chrome vanishes — the original squish root cause).
- **The graph/chart min-height starvation guard** — a per-breakpoint min-height assertion (the drift sliver +
  EKG spike clear ≥80px at 390/768/1280; the 768 tablet stacks) so a width-driven figure can never collapse
  to a hairline (the 600/72-ratio ~40px starvation).

These guards are the headless half of the gate; the live render-matrix audit is the binding close.

### 6. Hygiene — excise SlideNutrition + redact the access key (slice 30 F8)

- **DELETE `src/decks/til-briefing/slides/SlideNutrition.vue`** (per §0 excise-or-fail) — confirmed genuinely
  orphaned (`deck.ts:18` retired it, zero non-self refs, the H.W10 edit was wasted work on an unmounted
  slide). Back out the W10 edits to it. PRESERVE the cartoon-shadow deck-private namespace (it is NOT
  SlideNutrition-private). The mulberry32 PRNG dup dies with the `/constellation` adoption (W30/W17), NOT
  here.
- **REDACT the access key `wolfpack-ledger-2026`** from all committed docs (replace with a placeholder
  `<ACCESS_KEY>` + a pointer to the gitignored `.env`). Since til-briefing is public the key is unused — but
  the leak persists and a future re-gate would resurrect a compromised key. The digest's stronger
  recommendation: ROTATE the key, not just redact (so a future re-gate uses a fresh key). The redaction is
  SECURITY severity — decoupled from the content reframe so it lands even if the reframe slips (it MAY be
  promoted to W30 as a hygiene gate; W31 carries it if W30 did not).

### 7. Verify-only §12 items (slice 29 F2/F3/F4, slice 30 F3/F5/F6/F7 — live-audit, NOT code)

These are RESOLVED at the code level by G/H — they need an EXECUTED live audit, not a redesign (the
visual-truth discipline: a "done" claim is not closed until live-verified):

- **Slide08 headline/AI-caption overlap (29 F2)** — the F.W rework re-laid head + lanes; confirm LIVE the head
  bottom clears the lanes top with margin (lift `.loop` margin-top to a real rung if the 8px gap is too tight
  on a 2-line head). Likely no-change.
- **XRAY own-slide + no Open-AI-XRAY button + full-height mobile (29 F3, 30 F5; aw-delivery fold).** Met by
  G.W5 + H.W7/W8 (the button was already gone at HEAD; the portrait `aspect-ratio:auto + min-height:48cqh`
  flex-fill). Verify LIVE the mobile window fills the column with no dead band; add the xray-slide
  negative-space/density pass the aw-delivery fold asks (the slide reads with breathing room, the portal opens
  the XRAY — no redundant button). Route the COMMIT of the (W30-landed) uncommitted work + the live-audit gate.
- **CONCLUSION reads as a confident close (29 F4)** — verify; trim the minor proof-lockup/track-record copy
  redundancy.
- **Graph aspect-ratios (30 F6)** + **mobile markers (30 F4)** — source-correct; live-verify at 390/768/1280.
- **pptx-download popover (30 F7) — SATISFIED** (DeckSettings ships the icons + light/dark rows; the artifacts
  are deploy-time). Mark **DONE** in the §4 ledger; the deploy-200 resolve check + the light/dark download-UI
  polish beyond it is a **W32 note**, NOT here.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

All paths are in the SLIDES repo `~/Programming/slides`, on the W30-landed `tranche/AX-slides` branch. glass-ui
writes NO file here; the slides session executes. (No glass-ui `src/` file is in scope — W31 is repo-disjoint
from every other AX wave by REPO.)

| File (slides repo) | Edit |
|------|------|
| `src/decks/til-briefing/slides/Slide04.vue` | **§1** Re-author the copy spine to the hypothetical/what-if register (excise DIT/DPI named callouts at `:26,65,69,72,124`; lead with the general anomaly thesis; ~$5M + $3.50 as illustrative both-ends examples; the $3.50 receipt prose `:39,47,52` re-touches). **§2** DROP `overflow:hidden` (`:280`); move the `::before` glow onto a clipped pseudo-layer; give `.hero` a content-height budget instead of clamping the figure. |
| `src/views/HomeView.vue` | **§3** Per the RATIFIED path: EITHER lift the lock cue to REST (standing glass lock-disc + resting `filter:blur(~1px)` on the card body, PRM-honored, replacing the dead `opacity:0` scrim `:134-144`) OR DELETE the dead scrim + gated branch (the retirement path). |
| `src/decks/til-briefing/meta.ts` | **§3** IF re-gating a demonstrator: a sibling demo/`_fixture` deck's meta flips `softGated:true` (NOT til-briefing — `:16` stays `false`, public). IF retiring: no edit (or remove the now-dead `softGated`/`protected` fields per excise). |
| `src/views/DeckGate.vue` | **§4** Pin `color-scheme` (+ `.dark`) on the teleported `DialogContent` root; warm+blur the `DialogOverlay`; raise `.deck-gate` text-align specificity; add the floating shadow + lock-disc highlight. OR DELETE entirely (retirement path). |
| `src/styles/deck.css` | **§4** The `:global()`/deck.css-§8 portal-pierce for the `DialogOverlay` warm-glass restyle (the ONE existing global reach the modal scheme-fix extends). **§5** the `--marker-*`/`--chart-min-h` recipes are PRESERVED (no edit) — the guards assert ON them. **fold §E** retune (or drop) the slides-local `--constellation-alpha` override (`:237` light / `:793` dark) DOWNWARD to the W17 recessive legible-but-recessive balance; the §24 `--constellation-line` plain-hex fix (`:279`/`:809`) stays UNTOUCHED. |
| `src/decks/til-briefing/slides/SlideXray.vue` | **§7** verify-only + the xray negative-space/density pass (the aw-delivery fold) IF the live audit flags density; the Open-AI-XRAY button is already gone (verify). |
| `src/decks/til-briefing/slides/SlideConclusion.vue` | **fold §D** ADD the RESOLVED constellation backdrop canvas (the `data-constellation data-resolved data-anomaly` markup + the `.scatter` mask recipe ported from Slide10, retuned for the two-column lede-grid dead space) so the terminal ask slide carries the bookend. **§7** verify-only; trim the minor proof-lockup/track-record copy redundancy if the live audit flags it. |
| `src/decks/til-briefing/slides/Slide10.vue` | **fold §B** REMOVE the `.land__link` xray reference (the dedup). **fold §D** REMOVE the RESOLVED constellation backdrop (`:14-18` canvas + `:97-105` `.scatter` recipe) — the bookend moves to SlideConclusion (#7); #5 reverts to a clean recap (or a quieter field — live-audit decides). |
| `src/decks/til-briefing/slides/SlideNutrition.vue` | **§6 DELETE** (the orphan; back out the H.W10 edits). |
| `tests/e2e/mobile-reflow.spec.ts` | **§5** EXTEND with the unreset-`calc(N*var(--cqx))` (N≥24, unfloored, portrait `@container`) lint + the chart/graph min-height starvation guard (≥80px at 390/768/1280). (This spec was AUTHORED by H but UNRUN — W30 executes it; W31 extends the guards.) |
| `docs/tranches/{E,F,H}/**/*.md` (the leak set) | **§6** REDACT `wolfpack-ledger-2026` → `<ACCESS_KEY>` + a `.env` pointer (security; may be W30's if promoted there). |
| `docs/tranches/AX-slides/W31-slides-content.json` (or the slides-side AX tracking dir) | **NEW** — the wave's audit artefact (the ratified lock disposition + the born-RED→GREEN evidence + the paired-π BEFORE/AFTER reframe captures). |

**OUT of bounds:** ANY glass-ui `src/` file (W31 is a slides-repo wave; the GENERIC portal-scheme helper +
the Input invalid-state contract → glass-ui AX waves W21/W37, NOT here); `src/decks/til-briefing/constellation.ts`
+ the `--constellation-edge` Canvas2D leak (**AX.W30** — the baseline owns the constellation fix); the
`.deck-progress` → `<DeckProgress>` port + the `--progress-rail-*` override + the page-bottom placement
(**AX.W32** — §4 note 18, W31 does NOT touch the deck-progress bar); `src/deck/reveal.ts` / `useCountup.ts`
adoption + the DeckGate LabeledField error pattern + the glass-ui pin bump (**AX.W32**); the second
feedback-coder Fourier deck + FourierField.vue (**AX.W30** disposition — W31 preserves it untouched); the
pptx deploy-200 resolve check + the download-UI polish (**AX.W32**).

---

## Disjointness (sibling waves it must NOT overlap; the shared files + how to avoid collision)

W31 is REPO-DISJOINT from every glass-ui wave (it touches only `~/Programming/slides`). Within the L band
(W30-W32) it shares the slides repo + a SEQUENTIAL dependency chain — disjoint by FILE + by ORDER:

- **vs AX.W30 (slides baseline — the hard predecessor).** W31 **dependsOn W30** — SEQUENTIAL, never
  concurrent. W30 LANDS the dirty H tree on `tranche/AX-slides`, fixes the **constellation.ts** Canvas2D leak,
  and EXECUTES the 7 e2e specs; W31 then reframes content + fixes the four visual defects on that clean
  branch. Shared FILE risk: `tests/e2e/mobile-reflow.spec.ts` (W30 EXECUTES it; W31 EXTENDS its guards) +
  `src/styles/deck.css` (W30 adds `--constellation-edge`; W31 adds the §8 portal-pierce — DIFFERENT sections,
  append-only, three-way-merge-safe) + the `docs/` key-redaction (W30 MAY own it if promoted there as a
  hygiene gate; W31 carries it if not — coordinate in `coordination/CONSTELLATION.md` so it is owned ONCE).
  Because W31 dependsOn W30, the shared files are SEQUENTIAL writes, not concurrent — no merge race.

- **vs AX.W32 (slides motion + form adoption — the SUCCESSOR).** W32 **dependsOn W24 + W31** — SEQUENTIAL
  AFTER W31. W32 owns the `.deck-progress` → `<DeckProgress>` port (§4 note 18 — explicitly NOT W31), the
  reveal.ts/useCountup.ts adoption, the DeckGate LabeledField error pattern, the glass-ui pin bump, and the
  pptx deploy verification. Shared FILE risk: `src/views/DeckGate.vue` (W31 glass-restyles the modal IF
  re-gated; W32 adopts the LabeledField error pattern on the SAME form). Sequence W31-then-W32: W31's restyle
  lands first (the scheme-pin + warm glass), W32's error-pattern adoption layers on. Coordinate via
  `coordination/CONSTELLATION.md` — the DeckGate is owned by W31 for LOOK, W32 for the error CONTRACT. Also
  `src/views/HomeView.vue` (W31 owns the lock at-rest; W32 dedups the local `[data-reveal]` keyframe — DIFFERENT
  concerns, different lines — but coordinate the file write order: W31 first).

- **vs the glass-ui library waves (every other AX wave).** REPO-DISJOINT entirely — W31 writes no glass-ui
  source. The GENERIC portal-scheme helper + the Input invalid-state contract are glass-ui-side (W21/W37/W32);
  W31 fixes the slides-SIDE instances directly and FLAGS the generic helper for the ≥2-consumer census — no
  glass-ui file edit here.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

All three lanes operate in the SLIDES repo (the slides session executes; the orchestrator owns the slides
index — agents stay read-only per K invariant 5). The actual count is 3, within the AX ≤6-implementation /
≤7-read-only ceiling.

- **Implement (≤1 agent — the reframe + the four defects + hygiene).** Re-author Slide04 to the what-if
  register (excise DIT/DPI; both-ends illustrative examples; the deck voice); drop the `overflow:hidden` clip +
  bound the glow on a pseudo-layer + budget the hero height; lift the lock cue to REST (or retire it) per the
  RATIFIED path; pin the modal `color-scheme` + warm-glass the overlay (or fold into retirement); DELETE
  SlideNutrition; redact the access key. Lint + typecheck at every interval (`npm run typecheck` on the slides
  tree). Writes NO glass-ui source.

- **Adversarially-verify (≤1 read-only lane — the LIVE render-matrix probe).** (a) Re-runs the five RED
  witnesses on the patched tree: `grep DIT/DPI Slide04.vue` = 0 named-incident spine; `overflow: hidden` gone
  from `.hero`; the lock paints AT REST (or is fully deleted); the modal resolves the deck's pinned scheme
  (warm glass, not flat-grey); SlideNutrition.vue absent; `wolfpack-ledger-2026` redacted from docs. (b) On the
  device (Playwright + frontend-design): the render-matrix audit at ≥3 viewports × light/dark. ADVERSARIAL
  twists: (i) confirms the $5M figure does NOT crop at the export frame, short-landscape, AND portrait (the
  clip is truly gone, not merely flex-centered); (ii) confirms the at-rest lock blur is on the card BODY only
  (title/summary/tag stay SHARP — the blur is the surface, not the text) AND honors `prefers-reduced-motion`;
  (iii) confirms the modal is glass under BOTH app-light and app-dark (the scheme-pin holds, not a one-mode
  fix); (iv) confirms the reframe READS as a generalized anomaly thesis, not a thinly-reworded incident (a
  copy-register read, not a token-grep); (v) confirms the mobile guards FAIL on a deliberately-reintroduced
  unfloored `calc(50*var(--cqx))` (the guard bites). (vi) confirms the deck still BOOTS public + the
  feedback-coder Fourier deck is untouched.

- **Gate-author (≤1 agent — born-RED→GREEN).** Authors the mobile-reflow + chart-min-height regression guards
  in `tests/e2e/mobile-reflow.spec.ts` (the unreset-`calc(N*var(--cqx))` N≥24 lint + the per-breakpoint
  ≥80px min-height starvation assertion); confirms each FAILS on a reintroduced defect and PASSES on the
  patched tree; registers them in the slides `npm run audit` set. (The slides repo's gate harness, NOT a
  glass-ui `proof:*` — W31 is a slides-repo wave; the gate is the slides e2e suite.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live Playwright + frontend-design audit)

**Headless / regression gate — born-RED→GREEN (the slides e2e + lint suite).**

- **The mobile-reflow regression guards (born-RED on a reintroduced defect → GREEN).** `tests/e2e/mobile-reflow.spec.ts`
  asserts (a) NO `calc(N*var(--cqx))` with N≥24 sits UNFLOORED inside an `@container` portrait block (the
  squish-class lint — a static/AST assertion over `src/styles/deck.css` + the slide SFCs); (b) the
  graph/chart figures clear ≥80px min-height at 390/768/1280 and the 768 tablet stacks (the starvation guard —
  a live per-breakpoint measure). Born-RED witness: re-introduce an unfloored `calc(50*var(--cqx))` in a
  portrait `@container` block → the lint RED; the guard is the regression-lock. This is a static-assertion +
  runtime-measure artefact (the precept-valid form — NOT a grep for runtime behaviour).
- **The hygiene assertions (born-RED at HEAD → GREEN).** A no-SlideNutrition assertion (`ls
  src/decks/til-briefing/slides/SlideNutrition.vue` = absent — RED at HEAD, the file exists) + a
  no-`wolfpack-ledger-2026`-in-docs sweep (`grep -rl wolfpack-ledger-2026 docs/` = 0 — RED at HEAD, ≥10 hits).
  Build-source-absence assertions (an accepted SPEC.md §Hard-Gates form).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion, NOT a headless proof alone).**
A live Playwright + frontend-design pass on the LIVE deck, at **≥3 viewports** (390×844 mobile / 768×1024
tablet / 1280×720 desktop + the 1280 export frame — the §0 probe-coverage stop-rule) in **light AND dark**:

- **Slide04 reads as a generalized anomaly what-if** — the general thesis leads, the ~$5M and $3.50 are
  illustrative both-ends examples, no named DIT/DPI incident, the RED-discipline holds (the $5M is the single
  focal event). The figure is NEVER clipped at the export frame, a short-landscape, OR portrait.
- **The homepage lock affordance reads AT REST** (per the ratified path): a standing glass lock-disc + a
  resting body-blur with sharp text, deepening on hover, PRM-honored — OR the gated branch is cleanly gone (no
  dead scrim). No half-broken in-between.
- **The access-key modal is warm-cream GLASS, not flat-grey shadcn**, under both app-light and app-dark (the
  scheme-pin resolves the deck's scheme through the portal). OR it is cleanly retired.
- **The mobile squish is gone** — the close-slide badges + the AI cross-referencing bullet block + the
  graph/chart figures render legibly at 390×844; the xray slide reads with negative space, the portal opens
  the XRAY (no redundant button).
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the EXECUTED live render-matrix audit, captured as a
**paired-π BEFORE/AFTER + DELTA artefact** (the W00 protocol: the named-incident/clipped-figure/no-lock/flat-
grey-modal/squished BEFORE vs the what-if/un-clipped/at-rest-lock/glass-modal/legible AFTER, at ≥3 viewports ×
light/dark), is the binding close criterion. A green guard proves the squish-class cannot recur; only the live
audit proves the reframe READS right and the figure never crops.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open; against the W30-landed clean branch).** Re-confirm the five RED
   witnesses on `tranche/AX-slides`: DIT/DPI named in Slide04; `overflow:hidden` on `.hero`; the `opacity:0`
   hover-only scrim + `meta.softGated:false`; the modal flat-grey under the portal-scheme gap; SlideNutrition
   present + the key leaked. Record as the born-RED baseline. Do NOT proceed on the audit's word.
2. **RATIFY the lock disposition (RATIFY-BEFORE-IMPL).** The orchestrator confirms the ADDENDUM-2-vs-W31 lock
   contradiction resolution (RECOMMENDED: re-gate ONE demonstrator deck + implement the at-rest cue; ALT:
   formally retire). Record the ratified path + the re-reversal rationale in `W31-slides-content.json` so the
   RETIRED→re-instated path is auditable. §3.4 (the access-modal restyle) is conditional on this.
3. **Capture the paired-π BEFORE state.** Screenshot the render-matrix BEFORE (Slide04 named-incident, the
   clip-risk hero, the no-rest-lock home, the flat-grey modal, the mobile squish) at ≥3 viewports × light/dark.
4. **Author the born-RED regression guards.** The mobile-reflow `calc(N*var(--cqx))` lint + the chart-min-height
   starvation guard; confirm each FAILS on a reintroduced defect.
5. **Implement §1-§2 (Slide04).** Re-author the copy spine to the what-if register; drop the clip + bound the
   glow + budget the hero. Typecheck + lint.
6. **Implement §3-§4 (lock + modal) per the ratified path.** Lift the lock to REST (or retire); pin the modal
   scheme + warm-glass the overlay (or fold into retirement). Typecheck + lint.
7. **Implement §6 (hygiene).** DELETE SlideNutrition + back out its W10 edits; redact (rotate) the access key.
8. **§5 + §7 verify.** Run the mobile guards GREEN; the verify-only §12 items (Slide08 overlap, XRAY, conclusion,
   graphs, markers) live-audited; mark pptx-popover DONE in the ledger.
9. **Capture the paired-π AFTER + DELTA + run the binding live render-matrix audit.** Compare BEFORE/AFTER;
   the executed audit is the close. Emit `W31-slides-content.json`.

---

## Artefacts (the audit json + evidence it emits)

- **`docs/tranches/AX-slides/W31-slides-content.json`** (slides-side AX tracking) — the wave's audit artefact:
  the born-RED→GREEN evidence per witness; the **RATIFIED lock disposition** (re-gate-and-implement vs retire,
  with the ADDENDUM-2 re-reversal rationale); the Slide04 reframe before/after copy diff; the per-viewport
  paired-π BEFORE/AFTER screenshot paths + the DELTA; the verify-only §12 dispositions (Slide08 / XRAY /
  conclusion / graphs / markers — each with its live-audit verdict); the pptx-popover DONE marker.
- **The paired-π BEFORE/AFTER + DELTA capture set** — render-matrix screenshots at ≥3 viewports × light/dark,
  named per the W00 π-lane template (the named-region baseline).
- **`tests/e2e/mobile-reflow.spec.ts`** (extended) — the executed-GREEN regression guards (the
  unreset-`calc(N*var(--cqx))` lint + the chart-min-height starvation assertion).
- **The `coordination/CONSTELLATION.md` L-band entry** — records the W30→W31→W32 shared-file ownership
  (deck.css sections, mobile-reflow.spec.ts, DeckGate.vue, HomeView.vue, the docs key-redaction owner), the
  slides sibling-baseline-capture (HEAD + `git status --porcelain` at coordination time), and the
  commit-vs-handoff disposition for the dirty slides tree.

---

## CommitPlan (conventional-commit messages, one per sub-step; slides repo, orchestrator-owned index)

1. `test(slides-AX.W31): mobile-reflow calc(N*--cqx) lint + chart-min-height starvation guards (born-RED)`
2. `content(slides-AX.W31): Slide04 hypothetical/what-if anomaly reframe — excise named DIT/DPI incident, ~$5M + $3.50 as illustrative both-ends examples`
3. `fix(slides-AX.W31): un-clip the $5M figure — drop .hero overflow:hidden, bound the ::before glow on a clipped pseudo-layer, budget the hero height`
4. `feat(slides-AX.W31): restore the homepage at-rest lock affordance — standing glass lock-disc + resting body-blur (sharp text), PRM-honored [RATIFIED: re-gate demonstrator]` (OR `chore(slides-AX.W31): formally retire the homepage soft-gate + dead hover scrim + DeckGate [RATIFIED: retire]`)
5. `fix(slides-AX.W31): glass-restyle the access-key modal — pin teleported color-scheme so light-dark() resolves the deck's scheme, warm-blur the overlay` (conditional on the re-gate path)
6. `chore(slides-AX.W31): excise orphaned SlideNutrition.vue (deck.ts retired it, zero refs)`
7. `chore(slides-AX.W31): redact + rotate the leaked access key wolfpack-ledger-2026 across committed docs → <ACCESS_KEY>`
8. `docs(slides-AX.W31): W31-slides-content.json + the paired-π BEFORE/AFTER/DELTA render-matrix audit (close)`

---

## Dependencies (dependsOn from the charter + why)

- **dependsOn AX.W30** (charter §3 line 1551 — HARD). W31 cannot reframe Slide04 or fix the visual defects
  until the H working-tree is LANDED on the clean `tranche/AX-slides` branch (it is stranded as dirty tree
  under 6 intervening commits on `deck/feedback-coder` today — the files W31 edits carry both H's uncommitted
  edits AND the committed feedback-coder history). W30 also fixes the constellation Canvas2D leak + EXECUTES
  the 7 e2e specs (the visual-truth baseline W31's audit builds on) and decides the two-deck disposition
  (preserving the Fourier deck). Touching slides before W30 baselines it = editing a moving, unrecoverable
  tree.
- **Successor: AX.W32 dependsOn AX.W31** (charter §3 line 1586). W32's motion + form adoption (vReveal/
  useCountup/DeckProgress + the DeckGate LabeledField error pattern) lands on the W31-reframed + restyled deck.
- **Publish-currency note (§4 note 12).** The slides adoption legs (W32's glass-ui pin bump) are gated on the
  AX cut PUBLISHING — but W31's content reframe + visual defects are SLIDES-LOCAL (no glass-ui pin dependency;
  vReveal is already adoptable at `^3.4.0`). W31 does NOT wait on the AX publish; W32 does.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited as evidence)

- **The §12 deck restructure (slides repo).** `git show d8f3dbb` — G.W5-deck-restructure collapsed the prior
  11-slide sequence to 7, carved the XRAY portal to its own slide, added the net-new CONCLUSION (slice 29 F4
  evidence). `git show 18b26e9` — the G.W4 reframe that NAMED DIT/DPI/Pitt (the word-swap-not-framing root the
  reframe corrects; slice 29 F1 evidence). `git show 05b3c80` — the G restructure docs.
- **The H.W2-W10 visual pass (UNCOMMITTED, stranded).** `git log deck/feedback-coder` shows only H.W1
  (`97ce874`, the dock 3.4.0 consume) committed; W2-W10 (mobile reflow, constellation, complex-graphs, lock-
  removal, XRAY restyle, language tuning, pulse de-dup) are dirty working-tree under `edc23e7` (feedback-coder)
  + 5 fourier commits (the FourierField net-new deck the W30 disposition preserves). H/PROGRESS.md records the
  e2e specs *"authored but NOT executed"* — the textbook headless-green/visually-broken gap the AX mandate
  names. (slice 29 F6 + slice 30 F1 evidence.)
- **The lock retirement (ADDENDUM-2 / H.W6).** `meta.ts:11-16` — the prior soft-gate (`VITE_TIL_ACCESS_KEY` /
  DeckGate) was retired (`softGated:false`); H.W6 made til-briefing public, removing the only gated consumer —
  the SIDESTEP the W31 reframe RECONCILES (re-gate-and-implement or formally retire; the aw-delivery digest
  contradiction). The hover-only `opacity:0` scrim (`HomeView.vue:134`) is the dead residue.
- **The SlideNutrition retirement (G restructure).** `deck.ts:18` — *"SlideNutrition itself is retired"*
  (folded into SlideConclusion); the file was never deleted (the H.W10 dedup-pulse edit was wasted work on an
  unmounted slide) — the orphan-with-live-import the idiom:slides digest confirmed (result[13]).
- **The W31 number-collision lineage (glass-ui charter).** The deep-audit slice-31 `routesToWave` field still
  reads `"AX.W31 (Lighthouse/perf-a11y)"` (the stale 34-wave route); the CONVERGE pass reassigned Lighthouse
  to AX.W39 and made the final W31 the Slides content reframe (digest aw-delivery line 321 — the reassignment
  record).
- **The live re-diagnosis ritual (§4 note 11 lineage).** Per AX.W00's gate-philosophy: the AW.W1 dock spec
  misdiagnosed from a hypothesis, not a live re-diagnosis. W31 re-proves all five RED witnesses LIVE against
  the W30-landed branch before touching a file — recorded in this §Archaeology as the wave-open ritual.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §17.2 + the §2b band-L precept row, W31 is pursuant to `docs/precepts/` (pinned `63240e6`):

- **π visual-runtime lane — binding on the CONSUMER repo (SPEC.md §π; LESSONS-LEARNED "Runtime Truth Beats
  Source Claims" 2026-04-29 + "Visual-Runtime Probe Coverage Stop-Rule" 2026-05-06).** PURSUES: the wave
  closes on an EXECUTED live render-matrix audit (≥3 viewports × light/dark + the export frame), NOT a green
  guard — the cardinal AX antidote to the H pass's authored-but-unrun specs. The probe covers ≥3 viewports +
  the state-toggles W31 modified (the lock hover, the modal open) + the rendered-contrast of the new at-rest
  lock surface. MUST NOT VIOLATE: a "done" claim that is not live-verified is not closed.
- **one-path / no-legacy-code; abrogate-before-patch.** PURSUES: the Slide04 reframe is a FRAMING
  transposition, not a word-swap layered over the named incident (the prior G.W4/H.W9 patch was the legacy
  half-measure W31 abrogates); the lock is RECONCILED to ONE path (re-gate-and-implement OR retire — never
  both directives carried unresolved, never a dead hover-only scrim no deck triggers). MUST NOT VIOLATE: no
  workaround layered over the half-broken modal; the clip is removed at its root (the glow moves to a
  pseudo-layer), not masked.
- **excise-or-fail (§0 mandate; instructions/README "No silent deferrals").** PURSUES: SlideNutrition is
  DELETED (a phantom slide that never mounts is excised, not maintained); the dead lock scrim is either
  re-consumed (a real gated demonstrator) or deleted; the leaked access key is redacted+rotated. MUST NOT
  VIOLATE: no dead-but-present artefact carried forward.
- **substrate-with-consumer / wire-before-retire (instructions/README + LESSONS-LEARNED 2026-05-14 + the
  "Visual Load-Bearing-ness Bar" 2026-05-06).** PURSUES: the homepage lock affordance is restored ONLY with a
  genuine ≥1-gated-deck consumer that visually EXERCISES it at default tone (the RECOMMENDED re-gate path) —
  not a quantitatively-wired-but-visually-unmade scrim; if no consumer is justified, it is formally retired
  with rationale, not left a dead substrate.
- **cross-repo coordination doc + sibling-baseline-capture (LESSONS-LEARNED 2026-05-11 + 2026-05-18 "Cross-Repo
  Dirty-Tree Coordination Must Be Checked Up Front").** PURSUES: the L-band entry in
  `coordination/CONSTELLATION.md` records the slides HEAD + `git status --porcelain` at coordination time, the
  W30→W31→W32 shared-file ownership, and the dirty-tree commit-vs-handoff disposition (the slides tree is
  dirty → orchestrator-commit on the W30-landed clean branch, not a foreign-dirty-tree commit). MUST NOT
  VIOLATE: the slides index is orchestrator-owned; agents stay read-only (K invariant 5, the hardened agent
  git clause).
- **no-overfitting (audits/overfitting-audit.md; the band-L row).** PURSUES: the verify-only §12 items
  (Slide08 / XRAY / conclusion / graphs / markers / pptx-popover) are LIVE-VERIFIED and marked DONE — not
  re-redesigned (no speculative rework of correct surfaces); the generic portal-scheme helper is FLAGGED for
  the ≥2-consumer glass-ui census, not over-built into slides. MUST NOT VIOLATE: no parallel slides-local
  abstraction that duplicates a glass-ui primitive (the W32 vReveal/useCountup/DeckProgress adoptions, NOT
  here).
- **Presets-in-consumers + writing-style (the deck `WRITING-CONFORMANCE.md`; the user MEMORY writing-style
  feedback).** PURSUES: the Slide04 reframe is re-expressed in the deck's established editorial register (the
  begotten-workflow voice, em-dashes without spaces, plain register, no grandiloquence) — the user's supplied
  what-if sentence is a DIRECTION, not verbatim copy to paste. MUST NOT VIOLATE: the deck's voice + the
  red-discipline (the $5M is the single focal event).

---

## Live-feedback fold (§23/§24)

Folds REQUIREMENTS §23.1 + §23.4 (the live-review xray items, 2026-06-08) into this wave's XRAY scope.
The slice's ground-truth slide map (deck.ts manifest order): #5 = `Slide10.vue` (teach-to-fish close), #6
= `SlideXray.vue` (the transparency portal), #7 = `SlideConclusion.vue`. RECONCILED against §3.7's existing
verify-only XRAY line + §12 (xray-own-slide / full-height-mobile / negative-space / Open-AI-XRAY-button) +
§20 + §24 — the genuinely-NEW residue below is what §3.7 does NOT yet specify; the rest is already owned.

**ALREADY ADDRESSED here / elsewhere (do NOT re-fold).**
- *XRAY is its own slide; no Open-AI-XRAY button; full-height mobile flex-fill* — §12 items, MET by G.W5 +
  H.W7/W8 at HEAD, carried in §3.7 as verify-only (the `@container (width<700px)` `aspect-ratio:auto +
  min-height:48cqh` block, `SlideXray.vue:272-299`; grep confirms NO "Open AI XRAY" launch button survives —
  the portal window IS the launch). KEEP as §3.7 verify-only.
- *xray negative-space/density pass (desktop)* — §3.7 already routes "add the xray-slide negative-space/
  density pass IF the live audit flags density." §23.1 makes the density fix CONCRETE (the two-column
  restructure, below) — this REPLACES the vague §3.7 density line with a specified gestalt, not a new task.
- *constellation translucency per-mode (§23.3)* — owned by AX.W17 (the `--constellation-*` opacity token) +
  AX.W30 (slides adopts). NOT this slice.
- *slide ordering / terminal-constellation (§23.2)* — the 7-slide order is correct at HEAD (Conclusion is
  terminal #7); the §23.2 ordering reconcile is the W31 conclusion-restructure concern, not the xray slice.
- *the StatusDot live-pulse dedup* — the W30 `dedup-pulse.spec.ts` covers the PULSE-DOT single-sourcing; it
  is a DIFFERENT "dedup" from the §23.4 URL-reference dedup below.

**ROUTING DETERMINATION — x-ray-panel: SLIDES-LOCAL, not a glass-ui idiom.** §23 asks whether the xray-styled
faux-browser surface should become a glass-ui "x-ray panel" primitive. It must NOT. The faux-browser-window
chrome (`.window` / `.window__bar` / traffic-light dots / `--portal-*` tokens) recurs in EXACTLY ONE place:
`SlideXray.vue` + its `--portal-*` token block in `deck.css`. Zero occurrences in glass-ui `src/`, zero other
slides consumers (`grep -rln "window__bar\|faux-browser\|portal-window"` = the one slide + deck.css only). Per
the visual-load-bearing-ness invariant (J inv-10 / L inv-8 — a primitive ships only at ≥2 consumers or is
retired with rationale), a single-consumer deck chrome is slides-LOCAL deck decoration, not a library
primitive. NO route to W18 (storybook IA) or W21 (primitive-additions). If a SECOND consumer ever wants the
faux-browser frame, THEN it earns a glass-ui census — flagged for the W34 cross-consumer ledger as a watch
item, not built now. (This mirrors §3.4's generic-portal-scheme-helper handling: fix the slides instance, do
not over-abstract into the library.)

### Fold §A — Slide #6 (SlideXray) desktop TWO-COLUMN layout (§23.1, MAJOR — replaces the vague §3.7 density line)

The xray slide reads negative-space-heavy on desktop because it is a STACKED column: `.xray__intro` (head +
copy) ABOVE → `.xray__bar` heavy rule → `.xray__stage` full-width portal BELOW (`SlideXray.vue:157-195`). The
intro `display:grid; grid-template-columns:1.1fr 1fr` only splits the HEAD from the SUB within the intro band
— the portal still spans full width underneath, pooling dead space. The user's directive: a proper
TWO-COLUMN DESKTOP layout — the portal PORTAL on the RIGHT, the heading + descriptive copy on the LEFT. The
gestalt fix (idiomatic, not a one-off): restructure the slide body as a desktop two-column grid
(`grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr)` — copy-left subordinate, portal-right dominant)
with the header spanning both columns; the LEFT column carries `.xray__intro` (head + sub stacked vertically,
not the current side-by-side intra-intro split) + the `.xray__bar` rule as a left-column accent; the RIGHT
column carries `.xray__stage` portal HERO filling the column height. This eliminates the negative space by
giving the portal a tall right column rather than a short full-width band, and reads as the canonical
"feature + framing copy" editorial two-up. The `@container (width<700px)` portrait block ALREADY collapses to
single-column flex-fill (§3.7 verify-only) — the two-column rule is the DESKTOP `@container (width≥700px)`
default; the portrait stack is preserved unchanged. Every axis stays on the deck's `--cqx` / `--space-*` /
`--portal-*` token grammar (no new magic numbers — the column ratio + gaps are the only new tokens, deck-local).

### Fold §B — DEDUP the duplicate xray.friday.institute reference (#5 vs #6) (§23.4)

`grep` confirms TWO slides reference the live portal URL: **#5 `Slide10.vue:66`** (*"See the live portal at
xray.friday.institute"* — a hyperlinked `.land__link <a>`) AND **#6 `SlideXray.vue:83,118`** (the intro
*"Open xray.friday.institute"* + the faux-browser address-bar `xray.friday.institute`). The xray slide (#6) IS
the portal's home; #5's inline link is redundant messaging now that the portal has its own slide
(`Slide10.vue:6-7` even comments *"The XRAY transparency portal is its OWN slide now — here it is demoted to
one inline link"* — the demotion-to-link was the half-measure). The gestalt dedup: REMOVE the `.land__link`
xray reference from `Slide10.vue` (the close lands on the teach-to-fish statement + sign-off; the portal CTA
belongs to #6, one slide later). The xray URL is then referenced ONCE in the narrative-CTA register — on
slide #6 where it is the subject. (NOTE the THIRD hit `SlideNutrition.vue:181` `method · xray.friday.institute`
dies with the §6 SlideNutrition deletion — no separate action.)

### Fold §C — Slide #6 proper hyperlinks (all render states) + x-ray styling slide-6-ONLY (§23.4)

The xray-styling treatment is ALREADY substantially present on #6 (the `--portal-*` faux-browser chrome, the
dark-by-composition window, the lock glyph, the LIVE/PREVIEW StatusDot) — and it is correctly scoped to #6
ONLY (the chrome is `SlideXray.vue`-scoped `<style scoped>`, not deck-global). So "x-ray styled, slide-6-only"
is MOSTLY MET — verify-live it reads as a coherent x-ray treatment after the §A two-column restructure (the
chrome must survive the right-column reflow). The genuinely-NEW residue is the HYPERLINK reliability: today the
address-bar URL is a real `<a>` ONLY in the `liveFrame` branch (`SlideXray.vue:109-119`); in the poster/coarse
state the addr is a `<span>` and the WINDOW is the launch `<a>` (to avoid a nested anchor). The §23.4 "proper
HYPERLINKS (clickable, not just text)" ask is SATISFIED in both states (window-as-launch in poster, addr-as-
link when live) — the verify-only task is to CONFIRM the link is operable + visibly affordant (cursor, hover,
focus-visible) in ALL THREE render states (live / poster-desktop / poster-coarse), since the live-feedback
screenshot was a desktop poster where the clickability must read. No structural change needed unless the live
audit finds the poster-window affordance unclear; if so, ADD a visible "open in new tab" arrow glyph to the
poster window-bar (matching `Slide10.vue:67`'s `.land__link-arr` vocabulary, now FREED by the §B dedup) so the
launch affordance reads without hover. This is the durable cross-state affordance, not a one-off.

### Fold §D — Slide ORDERING: the terminal slide must be constellation-backed (§23.2 — the conclusion-restructure residue §A's routing table handed here; reconciles §12.4)

The §A xray slice (above) correctly routed §23.2 to "the W31 conclusion-restructure concern, not the xray
slice" — this fold OWNS it. A live review of the now-7-slide deck surfaces an ordering/backdrop incoherence
the verify-only §7 CONCLUSION note did NOT catch. Ground-truthed from `src/decks/til-briefing/deck.ts:28-36`,
the manifest order is: Slide01 (cover) · Slide04 (problem) · Slide08 (operating model) · Slide09
(audit→monitoring) · **Slide10 (#5)** · **SlideXray (#6)** · **SlideConclusion (#7)**. The defect is the
constellation BACKDROP placement, NOT a re-sequence:

- **Slide10 (#5) reads conclusion-class but is NOT terminal, AND it is the ONLY late slide carrying the
  constellation.** Its header comment (`Slide10.vue:4`) literally calls it "a single-column **close**"; it
  signs off with a `<PresenterCard variant="close" tag="Presented by">` and carries the RESOLVED constellation
  (`Slide10.vue:14-18` — `data-constellation data-resolved`, the "found · contained" bookend to the cover).
  That is why §23.2 reads "#5 reads like it might belong LAST." But #5 is a content recap (teach-to-fish), not
  the ask — the deck deliberately lands the ASK last (SlideConclusion #7, the G.W5 restructure choice). So the
  FIX is NOT to move #5 to the end; the fix is the BACKDROP.
- **SlideConclusion (#7) — the true terminal slide — carries NO constellation** (`grep -c
  "constellation\|scatter" SlideConclusion.vue` = 0). It signs off with its own `<PresenterCard
  variant="close" tag="Let's talk">` but the cover↔close constellation bookend dies one slide short of the
  real close. §23.2's intent: *the closing slide should carry the constellation backdrop* — and it is the
  wrong slide that has it.

**The gestalt fix (idiomatic — the constellation is a deck-private backdrop motif driven off the manifest, not
per-SFC ad-hoc):** MOVE the RESOLVED constellation bookend from Slide10 (#5) ONTO SlideConclusion (#7), so the
cover's anomaly-found motif (Slide01 `data-constellation`) RESOLVES on the terminal ask slide (the
"found · contained" payoff lands where the deck closes). Slide10 (#5) reverts to a clean recap without the
backdrop (it is no longer the bookend) — or keeps a quieter field; the live audit decides which reads better,
but the RESOLVED bookend belongs on #7. This reuses the EXISTING `data-constellation data-resolved
data-anomaly` attribute contract the `constellation.ts onMount` scanner already drives (`deck.ts:38-41`
`createConstellations(root)` → the per-canvas attribute reader) — **no new mechanism**, the canvas markup
moves SFCs. The `.scatter` mask/positioning recipe (`Slide10.vue:97-105`) ports with it, retuned for the
Conclusion's two-column lede-grid dead space (mask off the type, seed the resolved anomaly clear of the `.cta`
and `.next` columns) — the same `-webkit-mask-image` linear-gradient idiom, not a new approach. The
RED-discipline holds: ONE resolved anomaly, recessive behind the ask. **COORDINATES with §B** (both edit
`Slide10.vue`: §B removes the `.land__link` xray reference, §D removes the `.scatter` constellation canvas —
different blocks, one file, sequenced). **Reconciles §12.4** ("#6 proper conclusion + restructure 5+6" against
the now-7-slide reality): the conclusion IS proper (SlideConclusion exists, the G.W5 5+6 restructure landed);
the residual §12.4 left unfinished is the constellation-backdrop placement on the terminal slide, not a fresh
restructure.

### Fold §E — Constellation translucency: slides adopts the recessive per-mode override (§23.3 — the slides-side leg of W17's library token)

The §23.3 *"more translucent on BOTH light + dark, legible-but-recessive, the right balance, per-mode"*
calibration is the GENERALIZED `--constellation-alpha` field-dimmer token. **AX.W17 OWNS the library-side
token + its recessive DEFAULT calibration** (W17 fold §7); this fold is the SLIDES-SIDE adoption (the §A
routing table's "W17 + W30" disposition, sharpened to a concrete W31 slides edit). The deck currently sets
`--constellation-alpha: 0.92` (light, `deck.css:237`) / `1.0` (dark, `deck.css:793`) — values H.W4 tuned for
MAXIMUM legibility, which §23.3 now reads as "too present." Per W17's recessive recalibration, slides either
(a) DROPS its local `--constellation-alpha` override and inherits the library's recessive default, or (b)
retunes the override DOWNWARD per-mode to the legible-but-recessive balance (lower on light where the cream
ground already lifts the lattice; a smaller drop on dark where the ink ground needs more presence). This is a
TUNE on the EXISTING token — the §24 I-session light-mode fix (`--constellation-line: #1c1815` light /
`#e8e6df` dark, plain-hex) stays UNTOUCHED; translucency rides ON TOP of the resolved-color fix, never redoes
it. The per-mode balance is a live-audit judgment captured in the BEFORE/AFTER matrix (the lattice recedes
behind type yet stays visible on both grounds — neither the invisible-on-dark §12/§16 failure NOR the
too-present §23.3 failure).

> **NON-DUP note (§23.3 vs §12/§16).** §23.3 is the INVERSE-balance refinement of the §12/§16 "not visible
> ENOUGH" direction, not a contradiction: §12/§16 lifted the lattice off the perceptual floor (the H.W4
> legibility win); §23.3 says the lift over-shot to "too present" and asks for the recessive balance. ONE token
> (`--constellation-alpha`), tuned to the legible-but-recessive midpoint per-mode — recorded so a future pass
> does not see them as opposed asks.

### Routing summary

| §23/§24 item | Disposition | Owner |
|------|------|------|
| §23.1 xray desktop two-column (portal-right / copy-left) | NEW — fold §A (replaces §3.7 vague density line) | **W31** |
| §23.4 dedup `xray.friday.institute` #5 vs #6 | NEW — fold §B (remove Slide10 `.land__link`) | **W31** |
| §23.4 slide-6 hyperlinks (all states) | verify-only + conditional poster-arrow (fold §C) | **W31** |
| §23.4 x-ray styling slide-6-ONLY | already MET (`SlideXray` scoped `--portal-*` chrome) — verify-live | **W31** |
| x-ray-panel-as-glass-ui-idiom | NO — single-consumer, slides-local (J inv-10 / L inv-8); watch-flag for W34 | — |
| §23.3 constellation translucency per-mode | library token + recessive default → **W17 fold §7**; slides adopts → NEW **fold §E** | W17 + **W31 §E** |
| §23.2 slide ordering / terminal-constellation | NEW — fold §D (move the RESOLVED constellation bookend from #5 onto #7) | **W31 §D** |
| §12 xray-own-slide / full-height-mobile / no Open-AI-XRAY button | already MET (G.W5 + H.W7/W8) — verify-only | W31 §3.7 |

**FileBounds delta (additive to the §FileBounds table — reflected in the table rows above):** `Slide10.vue`
GAINS a §B edit (remove the `.land__link` block + its `.land__link*` scoped CSS + the now-unused `XRAY_URL`
const) AND a §D edit (remove the `.scatter` RESOLVED constellation canvas `:14-18` + its `:97-105` recipe);
`SlideConclusion.vue` GAINS the §D RESOLVED constellation backdrop (the ported `data-constellation
data-resolved data-anomaly` canvas + `.scatter` mask, retuned for the lede-grid dead space); `SlideXray.vue`
GAINS the §A two-column desktop `@container` grid restructure + the §C conditional poster-arrow; `deck.css`
GAINS the §E `--constellation-alpha` recessive retune (`:237` light / `:793` dark — the §24
`--constellation-line` color fix at `:279`/`:809` stays untouched). All are `~/Programming/slides` files
already in scope class (no glass-ui `src/` touched). The §A/§B/§C/§D/§E edits ride the existing §7 XRAY +
CONCLUSION verify-only lines — they SHARPEN them from "verify + maybe density" to the concrete two-column +
dedup + hyperlink-affordance + terminal-constellation + recessive-translucency gestalt.

**HardGate delta:** the live render-matrix audit (the §HardGate VISUAL-TRUTH pass) gains: (1) the xray slide
reads as a balanced two-column on desktop (portal-right, copy-left, NO negative-space band) at 1280×720 +
the export frame, light AND dark; (2) `grep -c "xray.friday.institute" Slide10.vue` = 0 after the dedup (the
URL is referenced ONCE in the narrative, on #6); (3) the #6 portal launch is operable + visibly affordant in
all three render states; (4) the TERMINAL slide (SlideConclusion #7) carries the RESOLVED constellation
backdrop and Slide10 (#5) no longer does — `grep -c "data-constellation" SlideConclusion.vue` = 1, `= 0` on
`Slide10.vue` — and the live audit reads the cover↔close bookend resolving on the real close (§D); (5) the
constellation reads legible-but-recessive on BOTH light and dark — recedes behind type yet visible, neither
invisible-on-dark nor too-present (§E), at ≥3 viewports × light/dark. The portrait single-column flex-fill
(§3.7) is unregressed.
