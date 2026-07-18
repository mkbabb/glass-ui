# REFABLE-RU-33 — RETRO-TRUTH (the docs/CHANGELOG retro-truth challenge/confirm ring)

verified-model: claude-fable-5 (system-context model ID, verbatim)
unit: RU-33 · priority P3 · redo mode: retrospective adjudication (ANEW → SCRUTINY → UNION)
date: 2026-07-18 · HEAD at adjudication: 454f6d64 (v7.0.0 tag verified drift-free for package.json/src/demo)

## 1. ANEW — the CHANGELOG 7.0.0 claims re-verified from primary sources

Method: every countable or on-disk-checkable claim in the CHANGELOG `## 7.0.0` section was
re-derived from package.json, git tags (v4.2.0/v5.0.0/v6.0.0/v7.0.0), src/ barrels via
`scripts/lib/subpath-policy.mjs` entry resolution, and component sources — the opus-era
wave/verdict docs unread. The RF-2 doc-truth defect classes (stale spring values, phantom
changesets) were hunted at the CHANGELOG layer and into src-comment/tooling layers.

### Verified true (selection — full verdict table in §3)

- Export-map delta: 82 → 74; exactly the 11 listed keys removed, exactly the 3 listed added
  (keyset diff v6.0.0 → HEAD reproduces the table row-for-row).
- Survivors `./labeled-field` / `./command` / `./expandable-container` all ship.
- `InstrumentChassis` on `/instrument-chassis` only — absent from the root barrel.
- `perfect-freehand` vendored (handmark/freehand.ts, transcribed from 1.2.3, MIT header),
  absent from peers; peer versions as stated.
- Every sampled member-level removal/successor row held: the 5 `/motion-core` swaps + the
  `usePrioritizedTask` companion types; `/surface`, `/card`, `/command`, `/button`, `/toast`,
  `/drawer`, `/instrument-chassis`, `/blob`, `/carousel`, and the root `METRIC_PLACEHOLDER` /
  `coalesceMetric` internalization (`coalesceMetric` survives as a file-local export consumed
  by the metric components — not on any public barrel — consistent with "coalescing is internal").
- The "~67 `/motion` keyframes re-exports" figure: v6.0.0 `suite.ts` counts 67; the block is
  gone at HEAD (consumers import from `@mkbabb/keyframes.js` directly).
- Component prose: HeaderRibbon exactly `{placement?, ariaLabel?, class}` + one `#items` slot,
  zero collapse/anchor/Escape machinery; Progress `status:"error"` + `orientation` + `marks` +
  `indeterminate` + arbitrary `max`; Dock has no DockSection/DockStack/fisheye and exports
  `DockSeparator`; Label/Avatar/Skeleton/Separator as written; DarkModeToggle on
  `/dark-mode-toggle` with no alias, no eclipse/long-press remnant, shared `useLiquidPress`,
  PRM block present; PaperBackdrop an 18-line mount over `.paper-underpaint` with no
  opacity/frequency props; ScrollProgressRim `z-index: 2` + `isolation: isolate` above the
  unindexed material pseudos (code-level — the paint claim itself is LIVE-DEFER).
- 6.0.0 section: the v5.0.0 → v6.0.0 keyset delta is exactly one removal, `./stacked-icons`,
  zero additions — tag-verified.
- Phantom-changesets: no `.changeset/`, no changeset references in CHANGELOG/MIGRATION/README —
  the RF-2 class does not recur at the CHANGELOG layer.

### The one false CHANGELOG 7.0.0 claim

**Slider: "coarse pointers use a real 44px root hit region without enlarging the visible
rail" — FALSE at v7.0.0/HEAD.** At 9a8761f0 (2026-07-15) the thumb carried
`class="slider-thumb glass-specular-track touch-hit-area"` plus the
`.slider-thumb.touch-hit-area::before` pointer-events override. The Glass 7 landing commit
490cc46e (2026-07-16) dropped BOTH the class and the override rule; no root-level or
track-level coarse floor replaced them (no `pointer: coarse` rule, no `min-height`/44px
geometry anywhere in Slider.vue; track heights top out at 28px at `lg`). The claim shipped in
the CHANGELOG anyway, and two comment layers still describe the removed wiring as live:
`Slider.vue:376/391-399` and `a11y-overrides.css:162`. Net: a WCAG 2.5.5 tap-target regression
shipped in 7.0.0 wearing a truth claim.

Adjacent census while proving it: the `touch-hit-area` utility header claims "the six sub-44
form atoms (Switch / Checkbox / RadioGroupItem / Slider-thumb / TagsInput-delete /
MultiSelect-remove-X) compose this ONE shared utility". At HEAD its only consumer is ONE demo
story (`demo/stories/forms/combobox.vue`); Switch/Checkbox/RadioGroup/TagsInput each carry
their own local coarse-pointer `var(--touch-target)` blocks in colocated styles.css, and
Slider has nothing. The utility's DRY claim is false in both directions.

### The RF-2 spring-stale class — new sites beyond RF-2's rows

- `src/styles/tokens/scheme-spring.css` §2 header transcribes the preset table and its dock
  row is stale: "(0.68s, ζ=0.64)" vs on-disk `springPreset("dock")` = (0.30, ζ 0.82); the
  header list also omits the `transient` row it emits. The EMITTED values are all in sync —
  regenerating stops + settle clocks from `springProjection`/`springSettleDurationSeconds`
  over the current SPRING_PRESETS reproduces every `--spring-*` line byte-for-byte (7/7
  curves, 7/7 settle clocks verified).
- `scripts/regen-spring-tokens.mjs` is BROKEN at HEAD: `BLOCK_START_MARKER` ("§2  EASING —
  Spring curves via linear()") no longer appears in scheme-spring.css, so `main()` throws
  before touching anything — and nothing outside the script imports its gate exports
  (`SPRING_LINES_RE`/`generateBlock`), so no gate catches it. The "edit the PRESETS table,
  re-run, commit" single-source mechanism both files advertise is dead; today's in-sync state
  is unguarded.
- `docs/canon/motion-system.md:16` — `--spring-smooth` "(ζ=0.86)"; the generated token is
  ζ=0.80 (0.86 is `useSpring`'s bare default, a different thing the doc conflates).
- `docs/precepts/tunable-anim.md` + `docs/design/tunable-anim.md` rows 60/65 — smooth
  "0.5, 0.86" and press "0.15, 0.86" vs on-disk (0.58, 0.80) and (0.20, 0.80). RF-2 routed
  the DOCK rows of these files; the smooth/press rows are additional stale pairs. Notable:
  the precepts submodule pin at HEAD (b0f6134) is the very commit titled "the 7.0.0 surface
  truth-up (design-idioms/motion-canon/tunable-anim)" (6f8b87ed) — the truth-up itself left
  these pairs stale.
- Minor: the CHANGELOG peer line parenthesizes only pencil-boil as optional;
  peerDependenciesMeta also marks `@mkbabb/keyframes.js` and `@mkbabb/value.js` optional
  (README §peers states this correctly). Imprecision, not a false assertion.

## 2. SCRUTINY — the opus-era record, assume-incorrect

**Boundary moment:** recorded after the full ANEW pass above (export diffs, member sweeps,
component prose, springs/changeset hunts all complete). Only then were opened: the RU-33 row
of CENSUS-CLASSIFICATION.md (unit identity), commit 2e44df18 "docs(retro-truth): correct the
5.0.0-7.0.0 ledger to primary-source truth" (the ring's record), the CORRECTION-marker text
it added to CHANGELOG/MIGRATION, 6f8b87ed (the precepts truth-up bump), and REFABLE-RF-2.md
(routing dedup only).

Every countable claim in the record was re-derived guilty-until-proven:

| Record claim | Verdict | Evidence |
|---|---|---|
| 5.0.0 dropped 20 export keys (not one), tag-verified v4.2.0→v5.0.0 | **RATIFIED** | keyset diff: 96→83, exactly 20 removed / 7 added |
| 203-symbol /api census: 141 re-homed, 62 removed (31@5.0.0, 2@6.0.0, 29@7.0.0) | **RATIFIED** | table has exactly 203 rows; dispositions tally 141/31/2/29; 16-row deterministic content sample all resolve to real exports at the claimed homes (AlertVariants→root via components/alert; PointerVec2 + UseTextHighlightControls reachable through the /motion-core barrel's sibling-dir re-exports) |
| misversioned removals re-attributed to 7.0.0 (icon-chip/icon-tooltip, metric-*, PagerWindow, the 11-symbol goo/metaball family) with inline-true 6.0.0 rows | **RATIFIED** | goo family verified public at v6.0.0 (`useGooMorph`/`MORPH_SIGNATURES` on the v6 motion-core barrel, `GooFilter` on v6 /dock, `useMetaballRenderer` on v6 /blob) and absent from every HEAD public barrel; CORRECTION markers present at MIGRATION 6.0.0 rows |
| member-level 7.0.0 removals documented via the v6.0.0→branch diff, "zero over-claims" | **RATIFIED** (sampled) | every sampled removal absent from HEAD barrels, every claimed successor present; internalized survivors (pagerWindow→PagerDots, useMetaballRenderer→Blob) are file-local, not public |
| keyset-wins recurrence rule + survivors named | **RATIFIED** | rule present in both docs; survivors verified in exports |
| corrections mechanism: MIGRATION inline-true with dated markers quoting prior text; CHANGELOG frozen-ledger appended bullets | **RATIFIED** | markers observed at MIGRATION 208/210/268/309/314 and CHANGELOG 192/223/231 |
| install-truth under-warn routed to a Q060 outbound | **RATIFIED** | `docs/tranches/BI/coordination/glass-outbound-2026-07-17-constellation-install-truth.md` exists |
| "six verification rounds" | NOT-VERIFIABLE on disk — process claim, no adverse evidence |
| the 7.0.0 section it confirmed is truthful end-to-end | **OPUS-WRONG (one row)** — the Slider 44px bullet (§1) is false at the tag the ring confirmed; the ring truth-checked the export/member ledger rigorously and never challenged the component-prose bullets |

## 3. UNION — per-claim verdicts

| # | Claim (layer) | Verdict |
|---|---|---|
| 1 | CHANGELOG 7.0.0 Slider "real 44px root hit region" | **OPUS-WRONG** — false at v7.0.0/HEAD; wiring dropped at 490cc46e, claim shipped |
| 2 | Slider coarse tap-target regression itself (src, shipped) | **FABLE-NEW** — defect row |
| 3 | Stale comment layers describing the unwired halo (Slider.vue:376/391, a11y-overrides.css:162) + the utility's false "six-atom" DRY claim (actual consumers: 1 demo story) | **FABLE-NEW** |
| 4 | scheme-spring.css §2 header: stale dock "(0.68s, ζ=0.64)" + transient omitted — emitted values all verified in-sync | **FABLE-NEW** |
| 5 | regen-spring-tokens.mjs broken (marker mismatch) + zero gate consumers — the advertised regen/sync mechanism dead | **FABLE-NEW** |
| 6 | motion-system.md ζ=0.86 + tunable-anim smooth/press stale pairs (both copies; beyond RF-2's dock rows; the 6f8b87ed truth-up missed them) | **FABLE-NEW** |
| 7 | CHANGELOG peer-line optionality phrasing (keyframes/value also optional; README correct) | **FABLE-NEW** (note-grade) |
| 8-31 | Export-map delta table (11+3, 82→74) · survivors · InstrumentChassis subpath-only · peer versions + perfect-freehand vendoring · /motion-core 5 swaps + companion types · /surface · /card · /command · /button · /toast · /drawer · /instrument-chassis · /blob · /carousel · root metric internalization + /metric re-homes · completeness per-prop rows · ~67 motion re-exports · HeaderRibbon · Progress · Slider CVA→typed props (44px carved out) · Dock removals · Label/Avatar/Skeleton/Separator · DarkModeToggle · PaperBackdrop · ScrollProgressRim (code-level; paint LIVE-DEFER) · 6.0.0 ./stacked-icons delta · record: 20-key 5.0.0 drop · 203-census arithmetic+content · goo-family re-attribution · corrections mechanism · Q060 outbound · no phantom changesets | **RATIFIED** (24 rows) |

Counts: OPUS-WRONG 1 · FABLE-NEW 6 · RATIFIED 24.

## 4. ROUTING (PROPOSE only — no src/band/wave edits by this unit)

1. **BJ defect row (a11y/interaction)** — restore the Slider coarse-pointer 44px floor
   (re-apply `touch-hit-area` on the thumb + the pointer-events override, or an equivalent
   root-level floor), then re-point the two comment layers to whatever ships. Chrome+Safari;
   coarse-pointer emulation check.
2. **BAND-DOC-TRUTH** — CHANGELOG 7.0.0 Slider bullet: appended dated [CORRECTION] bullet per
   the frozen-ledger mechanism once #1 resolves (either direction — fix-then-true or
   correct-the-claim).
3. **BAND-DOC-TRUTH / design-debt** — a11y-overrides.css `touch-hit-area` header: either
   re-wire the named atoms onto the one utility (the DRY claim made true — preferred, it is
   the utility's reason to exist) or truth the header to the actual consumer census.
4. **BAND-DOC-TRUTH** — scheme-spring.css §2 header: dock row → (0.30, ζ 0.82), add the
   transient row to the list.
5. **Infra/design-debt row** — repair `regen-spring-tokens.mjs` (re-anchor BLOCK_START_MARKER
   to the current scheme-spring.css header, or re-emit the marker); per the gates-abrogation
   mandate, at minimum make the script runnable so the single-source claim is mechanically
   true again — an invariant spring-sync gate is a candidate for the ~40-60 set.
6. **BAND-DOC-TRUTH (extends RF-2 route 5)** — motion-system.md ζ figure; tunable-anim
   smooth/press rows in BOTH copies, coordinated with RF-2's F1 dual-home resolution and the
   precepts-submodule flow (the stale pairs live in the pinned submodule too).
7. **Note** — CHANGELOG peer-line optionality phrasing; fold into any future 7.x correction
   bullet, not worth a standalone edit.
