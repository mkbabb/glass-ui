# BJ Band — the doc-truth sweep (registry family J)

**Status:** DRAFT — awaiting the Fable two-challenge pass
**Registry family:** J (doc-truth sweep) · REGISTRY.md:178-186
**Verdict (lead):** "prose drifted from landed reality in named places; one truth-up wave
clears it" + one design-idioms rewrite wave sourced from the round-2 colocation census.
**Mode:** TRANCHE DEVELOPMENT. Waves edit prose and code-comments only — no runtime/paint
surface is touched (see the byte-diff guard on each wave). The enumerated target list IS the
spec: every row is `file:line → the false statement → the corrected statement`, grounded in a
cited census finding and verified on disk at HEAD (`git describe = v6.0.0-61-g5e466ccb`,
package.json version `7.0.0`, untagged).

Two waves:

- **BJ.W-DOC-TRUTHUP** — the enumerated one-commit truth-up sweep (everything NOT in
  `design-idioms.md`). Mechanical `file:line → corrected statement`, born-RED per target.
- **BJ.W-IDIOMS-COLOCATION-REWRITE** — the substantive `design-idioms.md` §3 home-map + §7
  colocation-doctrine rewrite (needs the round-2 colocation census as its source). Owns ALL
  `design-idioms.md` edits so no two waves touch that file (the no-re-drift discipline).

**File-ownership split (no cross-wave collision):** `design-idioms.md` → Wave 2 exclusively.
Every other target file → Wave 1. Family J does NOT construct the corrected Q060 sibling
outbound mail (that is family B / the consumer-truth relay); J only truth-ups the FALSE
in-repo STATEMENTS that contradict landed disk reality.

---

## BJ.W-DOC-TRUTHUP — the enumerated one-commit truth-up sweep

### Mission

Land one commit that corrects every stale-prose / stale-comment site named by round-1
(plan-vs-landed-diff, doc-and-canon-drift, consumer-truth, cross-repo) and round-2
(aurora-preset) where the prose contradicts landed disk reality. The list below is exhaustive
and closed — the sweep adds no new prose, invents no new scope, and leaves no re-drift vector.
This is the same discipline as the prior blur-prose true-up (`d0de60d9 "true-up the three stale
blur-prose sites"`).

### Exact scope

**In (7 targets across 6 files):**

| # | file:line | the false statement (today) | the corrected statement | source of truth | census cite |
| --- | --- | --- | --- | --- | --- |
| T1 | `src/styles/tokens/scheme-spring.css:31` | dock mirror row reads `dock: (0.68s, ζ=0.64) — the WEIGHTY iOS-27 gooey morph … slow inertial mass; … a monotone weighty settle` | `dock: (0.30s, ζ=0.82) — a brisk liquid morph for the dock and its coordinated contents` (match the emitted `--spring-dock` curve + `--spring-dock-settle:0.19s`) | `src/composables/motion/spring/springPresets.ts:95-99` (response 0.3 / dampingFraction 0.82 / "A brisk liquid morph") | plan:stale-mirror-comment-desync; verify claim 5 |
| T2 | `src/styles/tokens/scheme-spring.css:27-32` (mirror table) | table lists 6 rows (smooth/snappy/bouncy/gentle/dock/press); **transient row absent** | add the missing row: `transient: (0.62s, ζ=0.90) — a centered materialize bloom for brief surfaces such as Toast` | `springPresets.ts:109-113` (transient) + the already-emitted token `--spring-transient` at `scheme-spring.css:101` | plan:stale-mirror-comment-desync |
| T3 | `src/components/dialog/placement.css:93` | `` `glass-graded-halo` (name-locked jointly with BI.W-ENGAGE-AFFORD) `` | drop the wave-id token; keep the name-lock rationale: `` generalised from the shipped `dialog-graded-edge` to `glass-graded-halo` `` | greenfield-no-meta edict (global-zero declared at `2d1584a5`; this is the lone post-zero regression, added by `189ae15c`) | plan:meta-reintroduction-post-scrub |
| T4 | `src/components/aurora/composables/uniformBridge.ts:76-79` | `The WGSL primary renders the smooth core for every painterly id (1-7) — a kuwahara config on WebGPU degrades to the smooth core` | the WGSL primary renders real bodies for pastel(1)/watercolor(2)/crayon(4)/metal(8)/metal-gradient(9) and routes oil(3)/vangogh(5)/oil-pastel(6)/kuwahara(7) to `mediumKuwahara` — a real painterly read, **NEVER a silent smooth degrade** | `aurora-mediums.wgsl.ts:391-402` (the real `applyMedium` switch) + `aurora.wgsl.ts:13-16` header ("NEVER a silent smooth degrade") | aurora:stale-doc-comment-drift |
| T5 | `docs/precepts/tunable-anim.md:121` | `reveal blur ǀ --glass-reveal-blur ǀ 4px ǀ [0,8px]` (a single 4px default) | replace the fictional 4px default with the per-register model: overlay 6px / menu 2px / tooltip 0px / transient 8px, range `[0,8px]` | `src/styles/tokens/motion-registers.css:57/64/71/80` bound via `src/styles/glass/reveal.css` (no `--glass-reveal-blur: 4px` root default exists) | canon:stale-canon-default |
| T6 | `src/styles/theme/radius.css:113-118` | `--corner-k-soft/-sharp … ARE pinned by proof:squircle-language (the TOKEN-AXIS-EXISTS clause) … KEPT, not swept; the clean-break delete is a coordination follow-up once the gate re-anchors` | `--corner-k-soft/-sharp have zero runtime `var()` consumers and are NOT gate-pinned (proof:squircle-language was abrogated)` — then EITHER (a) delete the two dead rungs, OR (b) re-justify their keep as the consumer-tunable k-primitive vocabulary. **See OPEN-1.** | 0 `var(--corner-k-soft\|--corner-k-sharp)` consumers in `src/`; no `proof-squircle-language.mjs` / `squircle` script in `scripts/` or `package.json` (gate abrogation) | canon:stale-gate-rationale-over-dead-token; verify claim 8 |
| T7 | `docs/tranches/BI/coordination/asks-and-consumes.md:50` (row 15) | `cell/stack/badge SHARED-KEEP` + the offer to "reproduce it as a ~6-line local wrapper over the published `<MetricBadge>` (`@mkbabb/glass-ui/metric-badge`)" | badge is **NOT** a shared-keep: `MetricBadge` is removed at 7.0.0, folded into `/metric` — the wrapper offer must compose `Metric` from `/metric` (not the deleted `/metric-badge`) | disk: `grep MetricBadge src` = 0; `./metric-badge` absent from `package.json` exports; `MIGRATION.md:420-422` ("removed 7.0.0 … compose `Metric`") | dag:surface-cut-ahead-of-consumer-relay |
| T8 | `docs/tranches/BI/coordination/asks-and-consumes.md:49` (row 14) + `:94` | `migrate the two <IconTooltip> sites onto the Tooltip preset. IconTooltip is a **Tooltip PRESET**` | `compose the canonical Tooltip family (TooltipProvider + TooltipTrigger + TooltipContent) — there is no `preset` prop` (align the roster with the already-correct `MIGRATION.md:33`) | `src/components/tooltip/Tooltip.vue:4-11` `TooltipProps = { open, defaultOpen, delayDuration, disabled }` — **no `preset`**; `MIGRATION.md:33` "There is no icon-only tooltip wrapper" | crossrepo:phantom-successor-api-adopted-by-consumer |
| T8b | `docs/tranches/BI/waves/BI.W-SPEEDTEST-ONLY-PAIR.md:27,39` | `<Tooltip preset="icon"> or equivalent` / `→ the Tooltip preset` | same correction as T8 (compose the Tooltip family; no `preset` prop) | as T8 | crossrepo:phantom-successor-api-adopted-by-consumer |

**Out (explicit non-goals — do NOT touch in this wave):**

- `docs/precepts/design-idioms.md` — owned entirely by Wave 2 (BJ.W-IDIOMS-COLOCATION-REWRITE).
- The `MIGRATION.md:886/949/1083` "no consumer import" clauses — a family-B fix that REQUIRES
  the enumerated sibling roster (it cannot be corrected as a pure prose sweep). Cross-ref
  family B / dag:in-repo-scoped-consumer-probe-vacuous.
- The construction/sending of the corrected Q060 sibling outbound mail — family B.
- `asks-and-consumes.md:45` row-10 status marker ("proposal-gated; file when BI.W-metric-move
  lands", while the consolidation already landed at `490cc46e`) — **See OPEN-2** (leans
  family B).
- `package.json` `version: 7.0.0` + `MIGRATION.md:8` dated `7.0.0 (2026-07-17)` on the untagged
  cut — **ADJUDICATED RETIRED by the lead** (REGISTRY.md:16-18: "the dating is authorized" by
  the user's CUT-NOW order). Do not re-open.

### Acceptance gates (born RED — the probe that reds each today)

Every target is born RED because the stale text is live at HEAD. The gate is a grep on the
stale string plus, where a source-of-truth exists, a cross-check that the corrected value
matches it. GREEN = 0 stale-string hits AND the corrected value equals the source of truth.

| gate | born-RED probe (fails TODAY) | GREEN condition |
| --- | --- | --- |
| G-T1 | `grep -n '0.68s, ζ=0.64' src/styles/tokens/scheme-spring.css` → line 31 | 0 hits; the dock row reads `0.30s, ζ=0.82`, equal to `springPresets.ts` dock row |
| G-T2 | mirror table (lines 27-32) has 6 rows while 7 `--spring-*` tokens are emitted (`--spring-transient` at :101); `sed -n '27,32p' … ǀ grep -c transient` → 0 | mirror row-count == emitted-token-count (7); a `transient` row present |
| G-T3 | `grep -rn 'BI\.W-' src/` → exactly 1 hit (`placement.css:93`) | 0 hits in `src/` |
| G-T4 | `grep -n 'renders the smooth core for every painterly id' src/components/aurora/composables/uniformBridge.ts` → :77 | 0 hits; the comment enumerates the real `applyMedium` routing (1/2/4/8/9 real bodies, 3/5/6/7→Kuwahara, no smooth degrade) |
| G-T5 | `grep -n -- '--glass-reveal-blur.*4px' docs/precepts/tunable-anim.md` → :121 **AND** `grep -rq -- '--glass-reveal-blur: 4px' src/` → no match (a documented default with zero code backing) | row states the per-register model; no unbacked single default |
| G-T6 | `grep -n 'proof:squircle-language' src/styles/theme/radius.css` → :114 **AND** `grep -rq 'squircle' package.json scripts/` → no match (rationale cites an abrogated gate) | rationale no longer cites `proof:squircle-language`; disposition per OPEN-1 |
| G-T7 | `grep -n 'badge SHARED-KEEP' docs/tranches/BI/coordination/asks-and-consumes.md` → :50 **AND** `grep -rq MetricBadge src` → no match (doc keeps a surface disk deleted) | row 15 states badge removed/folded to `/metric`; the wrapper offer composes `Metric` |
| G-T8 | `grep -nE 'Tooltip preset\|preset="icon"' docs/tranches/BI/coordination/asks-and-consumes.md docs/tranches/BI/waves/BI.W-SPEEDTEST-ONLY-PAIR.md` → matches **AND** `grep -q preset src/components/tooltip/Tooltip.vue` → no match (phantom API) | 0 `preset` references; both docs say "compose the Tooltip family, no `preset` prop" |

### π / DELTA obligation

**None.** No visual or paint surface is touched. T3 (`placement.css`) and T4 (`uniformBridge.ts`)
are **comment-only** edits inside CSS/TS files — the guard is a `git diff` check that the change
touches only comment lines (no selector, declaration, token value, or executable statement
changes). All other targets are `.md`/comment prose. Any claim otherwise is out of scope.

### KISS / parsimony (no re-drift)

- **Gestalt, not patchwork (T1/T2):** the `--spring-*` curves are machine-regenerated from
  `SPRING_PRESETS` but the PROSE mirror comment is hand-maintained — that hand-maintenance IS
  the re-drift vector this wave just paid down twice. Preferred fix: regenerate the prose mirror
  from `springPresets.ts` at the same step that regenerates the curves (kills re-drift at the
  root). Parsimony floor if no generator hook exists: a one-line `keep in sync with
  springPresets.ts` pin. **See OPEN-3.**
- One commit, fewest lines: no reflow of surrounding prose, no re-wording beyond the corrected
  clause, no new sections.
- The list is closed: if a would-be target is not in the table above, it is NOT this wave.

### Non-goals

- No code behavior change; no token value change; no export-map change.
- No sibling-repo probing or outbound mail (family B).
- No `design-idioms.md` edits (Wave 2).

---

## BJ.W-IDIOMS-COLOCATION-REWRITE — the design-idioms §3/§7 rewrite

### Mission

Rewrite `docs/precepts/design-idioms.md` §3 (the `@utility`/style home-map) and §7 (the
colocation CSS-half doctrine) from describing a DEAD file layout to describing the shipped
post-A07 colocation reality: per-component styles live in the feature-dir
(`components/<dir>/styles.css` or `components/<dir>/styles/*`) and are `@import`ed from
`src/styles/index.css` at their correct cascade rung — **the index.css @import POSITION is the
cascade order**, so colocation and cascade-safety are not in tension. §1 declares this doc
BINDING for "where does a new `@utility`/style go?", so its being false is a live-authority
defect, not cosmetic.

### Exact scope

**Source of truth (read before rewriting):** the round-2 colocation census
(`round-2/colocation-census-edict-a07-src-and-demo-structure-vs-the-co.md`, finding
`dead-idiom-doctrine-contradicts-shipped-layout`) + `src/styles/index.css:181-247`.

**In — §3 home-map (`design-idioms.md:82-135`), six rows point at absent `src/styles/*` files:**

| # | row (line) | cited home (ABSENT) | actual shipped home | index.css @import |
| --- | --- | --- | --- | --- |
| I1 | feedback tone (:94) | `src/styles/feedback-tone.css` | `src/components/_shared/feedback-tone.css` | :186 |
| I2 | menu glass (:95) | `src/styles/menu.css` | `src/components/_shared/menu.css` | :203 |
| I3 | card / cartoon surface (:97) | `src/styles/cards.css` | `src/components/card/styles.css` (`.cartoon-surface`) | :185 |
| I4 | dock control (:98) | `src/styles/dock-controls.css` | `src/components/dock/styles/controls.css` | :184 |
| I5 | instrument chassis (:99) | `src/styles/instrument-chassis.css` | `src/components/instrument-chassis/styles.css` | :206 |
| I6 | popover / entry animation (:91) | `src/styles/utilities/animate.css` | **UNRESOLVED — see OPEN-4** | — |

**In — §7 doctrine (`design-idioms.md:218-238`):**

- §7 body (:227-238) mandates a component's visual recipe "lives in a CENTRAL partial (a
  `src/styles/*.css` file) … NOT in the component's feature-dir." This is the INVERSE of the
  shipped layout (15 feature-dir styles @imported at `index.css:181-247`). Rewrite to the
  colocate-plus-@import pattern; retain the cascade-order invariant but bind it to `@import`
  POSITION, not file location.
- Keep the carve-out: a recipe ≥2 surfaces compose (or one needing a fixed cascade seat as a
  shared register) stays CENTRAL — `glass-chip.css`, `surfaces-pager.css`, `glass-capsule.css`,
  `feedback-tone.css`, `menu.css` are correctly central per the census.
- §7 cross-refs (:224-225): "See `CLAUDE.md` §Structure for the convention; `proof:colocation`
  enforces it." **Both dead** — `CLAUDE.md` was deleted (never recreate) and no
  `proof:colocation` gate exists post-abrogation. Drop or re-point both.

**In (recommended, flagged) — the other `CLAUDE.md` dangling cross-refs in this same file**
(lines 57, 67, 77, 322, 393) all point at a deleted file. Fold their correction into this wave
since it already owns `design-idioms.md` (one-file-one-owner). **See OPEN-5** for whether these
§5/§9/§12 refs are pure-delete or must re-point to surviving content.

**Out:**

- The `_shared/` submodule carve, the `glass/wave`→liquid-grid / `textureUpload`→aurora /
  `sidebar`→demo MOVES, and `accent-tone.css`→chip — these are family-H RESTRUCTURE waves
  (code moves), NOT this doc rewrite. This wave only makes the doctrine describe reality; it
  does not move files.
- §9 deliberate-keep additions (recording `useAccentTone`'s value.js-quarantine as a §9 keep)
  are a family-H concern once the restructure lands — **See OPEN-6**.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails TODAY) | GREEN condition |
| --- | --- | --- |
| G-I-§3 | `ls src/styles/feedback-tone.css src/styles/menu.css src/styles/cards.css src/styles/dock-controls.css src/styles/instrument-chassis.css src/styles/utilities/animate.css` → 6× "No such file", while `design-idioms.md:91-99` cites them as homes | every §3 home row names a path that exists on disk and matches its `index.css` @import |
| G-I-§7-inversion | `sed -n '227,238p' docs/precepts/design-idioms.md` mandates "CENTRAL partial … NOT in the component's feature-dir", while `grep -c 'components/.*/styles' src/styles/index.css` → 19 feature-dir @imports (census counts ~15 component recipes) | §7 states the colocate-plus-@import pattern; cascade invariant bound to @import position |
| G-I-§7-deadrefs | `grep -n 'proof:colocation' docs/precepts/design-idioms.md` → :225 (gate absent from `scripts/`+`package.json`) **AND** `ls CLAUDE.md` → "No such file" while :224 cites it | §7 cites no deleted `CLAUDE.md` §Structure and no absent `proof:colocation` gate |

### π / DELTA obligation

**None** — `.md` prose only, no runtime/paint surface.

### KISS / parsimony (no re-drift)

- **Gestalt fix:** state the invariant as "the `index.css` @import ORDER is the cascade order"
  once, then the home-map rows become simple `feature-dir + @import-line` pairs that cannot
  re-invert. Do not enumerate a parallel cascade-rung numbering that will drift from
  `index.css` — cite the @import line instead.
- Keep §7 to the rewritten doctrine + the ≥2-surface carve-out; do not import the full census
  migration table into the precept (that lives in the family-H waves).

### Non-goals

- No file MOVES (family H). No code change. No new precept sections.
- No edits outside `design-idioms.md`.

---

## OPEN markers for the Fable two-challenge pass

- **OPEN-1 (T6 disposition):** `--corner-k-soft/-sharp` have 0 consumers and the gate that
  "kept" them is gone. Does family J (a) just correct the rationale to "unpinned, kept as the
  k-primitive vocabulary", or (b) delete the two dead rungs (clean break)? Delete is a code
  change that may belong to family F's radius reformation. Recommend J corrects the prose;
  cross-ref F for the delete decision. Needs a ruling.
- **OPEN-2 (row-10 status):** `asks-and-consumes.md:45` marks the metric-family move
  "proposal-gated; file when BI.W-metric-move lands" though it landed at `490cc46e`. Correcting
  the stale status marker is doc-truth (J), but activating/constructing the ask is family B.
  Split: does J flip the status word, or leave the whole row to B? Leaning B (avoid two waves
  editing the same roster rows — but T7/T8 already edit rows 14/15 of this file, so folding the
  row-10 status word into Wave 1 may be more parsimonious). Needs a ruling.
- **OPEN-3 (T1/T2 no-re-drift mechanism):** is there a generator that emits the `--spring-*`
  curves from `SPRING_PRESETS` that the prose mirror can hook into, or is the mirror purely
  hand-maintained? If a generator exists, route the prose through it; else add the sync pin.
  Needs a source check at execution.
- **OPEN-4 (§3 animate.css home):** the census resolved 5 of 6 dead §3 homes; the "popover /
  entry animation" row (`design-idioms.md:91`, cited `src/styles/utilities/animate.css`, ABSENT)
  is unresolved. Candidates in `src/styles/`: `animations.css`, `transitions.css`,
  `glass/reveal.css`, `liquid-enter.css`. `index.css:137` still references a `utilities/{animate,…}`
  root in a comment that may itself be stale. Resolve the actual home (grep the entry/PRM-carve
  grammar) before rewriting the row.
- **OPEN-5 (design-idioms CLAUDE.md refs at §5/§9/§12):** lines 57/67/77/322/393 cite a deleted
  `CLAUDE.md`. Pure-delete, or re-point to where that content (cartoon-shadow override,
  warm-chroma floor, dark-register material, color-mix rule, boundary law) now lives if it
  survived the CLAUDE.md deletion? If they must re-point, that exceeds the census's cited scope
  — decide fold-into-Wave-2 vs a separate precepts-wide dead-cross-ref sweep.
- **OPEN-6 (§9 deliberate-keep):** the census asks that `useAccentTone`'s value.js-quarantine be
  recorded as a §9 deliberate-keep. That is coupled to the family-H `accent-tone.css`→chip move,
  so it belongs with H, not this doc-truth rewrite. Confirm the routing.
- **OPEN-7 (historical-doc edit convention):** `MIGRATION.md` uses inline
  `[CORRECTION 2026-07-17: …]` notes for truth-ups on shipped/dated records (e.g. :211). The BI
  coordination/wave docs (T7/T8/T8b) are working formation records — direct correction is likely
  fine, but confirm whether J appends bracketed CORRECTION notes or rewrites in place. House
  style leans: inline CORRECTION on dated shipped docs, in-place on working docs.
