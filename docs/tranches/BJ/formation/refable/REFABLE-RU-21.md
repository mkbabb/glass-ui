# REFABLE RU-21—GLASS7-INTERROGATE union (redo)

- **Unit**: RU-21—presumption-of-brokenness interrogation of the committed Glass 7
  surface, 7 domain batches (`wf_f95f21a3-f63`, `glass7-domain-interrogation`,
  2026-07-16 17:09-17:52). Its findings fed the BJ formation (family J targets, the
  worthless-test corroboration, two pre-publish cures).
- **Verified model**: this seat is powered by `claude-fable-5`—read verbatim from the
  system context ("The exact model ID is claude-fable-5"). The seven original seats
  (a2796653…ae213e6c) all ran `claude-opus-4-8` per `model-census.json`, despite the
  workflow script requesting `model: 'fable'`—the settings-level override class the
  REFABLE demarcation names.
- **HEAD at redo**: `16e72a49` (2026-07-18). The interrogation ran at BI-era
  `c181f0a7`+dirty (committed cut 490cc46e); where a claim's ground shifted between
  those trees the verdict says so.
- **Step-1 ANEW**: fresh presumption-of-brokenness interrogation of a stratified
  sample at HEAD, 2-3 components per charter domain—material (Surface, Card, Chip +
  the full CSS @import-closure sweep), motion (PagerDots+usePagerWorm+useLeadTrail,
  Carousel family, easing trap-grep), feedback (Toaster/Toast/use-toast, Alert,
  Progress), data (DataTable, Metric, GlassTimeline), navigation (SegmentedTabs,
  ScrollProgressRim, HeaderRibbon), procedural (useLiquidGrid, FourierField color
  seam, Constellation), story (SectionPreviewCard, manifest, DeckPager,
  useConfiguratorState). Opus-era wave/verdict docs unread throughout.
- **Step-2 boundary moment**: recorded—the ANEW pass closed (independent findings
  fixed in notes) immediately after the SectionPreviewCard/manifest read; only then
  were FEEDBACK-LEDGER.md, REGISTRY.md, the workflow journal, and the seven
  `bi-addenda/reports/interrogation/*.md` opened, assume-incorrect, every defect
  claim re-proven on disk at HEAD.
- **Step-3 UNION**: this sidecar. Verdicts per claim; ROUTING proposed only—no
  source file, band, or shipped wave touched.
- **Fences honored**: no browser; paint-only claims LIVE-DEFER; sibling repos
  untouched.

## The independent ANEW picture at HEAD

The sampled surface is mechanically strong—the presumption of brokenness mostly
failed to materialize at the code layer. What held: the reka contracts (zero
stale-binding no-ops), the PRM two-door system (CSS arms + `useReducedMotion`-gated
drivers, PagerDots' worm seats instantly and drops its filter), the marks model
(`valueDomain` adversarial-domain-proof), DataTable's `Object.is` row identity +
roving focus, the toast dismissal path (`onUpdate:open` documented against the old
no-op class), the light-dark()/`:global(.dark)` trap discipline (every co-occurrence
in the tree is a guard comment, zero live violations), and the deliberate
`oklch(0 0 0 / 0)` premultiply discipline. What did not hold is enumerated in the
FABLE-NEW rows below; the known 7.0.0 carries (chip @import orphan, the raw-literal
set) were re-confirmed live at HEAD: `glass-chip.css` + `glass-atom.css` in no
@import closure and in no SFC `<style src>` (every other colocated component CSS is
pulled by its SFC—the orphan pair is the sole true closure hole);
`drawer/styles.css:379 blur(14px)`; `SortableList.vue:144 999px`;
`segmented.css:169/306` raw radii.

## Per-claim verdict table

Sources: the seven reports at
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/interrogation/`
(MG=material-glass, DO=dock-overlay, MO=motion, CD=component-data, DC=demo-chassis,
PP=package-public, CF=core-feedback) + the workflow result rollup (RES).

### OPUS-WRONG (3)

| # | Claim | Verdict | Detail |
|---|---|---|---|
| W1 | CD—P091 Chip **DISPROVEN-BROKEN** ("could not break it"; traced modes/attrs/bindings, cited `.tags-input__chip has glass-chip` as pass) | OPUS-WRONG (the heavy miss) | `git ls-tree 490cc46e src/styles/glass/` proves `glass-chip.css`+`glass-atom.css` existed at the interrogated cut while `git show 490cc46e:src/styles/glass.css` has no @import for either—the chip's entire material layer was ALREADY dead in the closure the seat interrogated. Statically discoverable with one grep in the seat's own attr/class-authority scope; headless contract tests cannot see it, which is exactly why the clear was over-broad. R3a later live-confirmed it MAJOR (selected chip paints zero accent feedback). The honest verdict was DEFECT-FOUND, must-fix. The mode/binding MECHANICS the seat traced were correct (ratified as R20)—the verdict grade is what was wrong |
| W2 | RES—`must_fix: []` across all 7 domains | OPUS-WRONG | Falsified by W1: a must-fix-grade shipping defect (the one live-proven 7.0.0 major) sat inside the interrogated tree and scope. The rollup's empty must-fix list understated the cut's risk at the exact moment it was the decision input |
| W3 | MG—"no hardcoded `blur(Npx)` fork" in the sampled surfaces; DO quotes the Drawer immersive scrim `backdrop-filter: blur(16px)` verbatim and blesses it as "a FIXED depth" | OPUS-WRONG (soft) | The scrim IS a raw blur literal bypassing the `--glass-blur-*` ladder in the overlay family both seats sampled—precisely the site class BJ later made born-RED (`token-hygiene`; the literal rides at HEAD as `blur(14px)`, drawer/styles.css:379, retuned 16→14 since). The fixed-not-ramped MECHANISM defense is correct (ratified as R19); quoting the literal without flagging the token bypass is the miss |

### FABLE-NEW (10)

| # | Finding | Detail + routing |
|---|---|---|
| N1 | GlassTimeline's a11y arm is dead code with a false comment | `GlassTimeline.vue:209-213` sets `--glass-level: 0` on `.timeline-rail` under `(prefers-reduced-transparency), (prefers-contrast: more)`—but the rail's paint reads `var(--glass-blur-floating)`/`var(--glass-bg-resting)`, both declared at `:root` with `var(--glass-level)` baked at declaration time (tokens/glass.css:152,249). The repo documents this exact trap itself (surface-axis.css:81-84, feedback-tone.css:34). Under PRT the :root escape (a11y-fallback.css:14) masks the no-op; under `prefers-contrast: more` the :root bracket is 0.3, the element-level 0 never engages, and the comment's claimed "warm-but-opaque --card floor" is false. ROUTING: fold into `BJ.W-REDUCE-TIMELINE` (family C, F16 ground-up redesign) + a candidate `token-hygiene` lint arm: element-level `--glass-level` writes against :root-baked tokens |
| N2 | The one un-cured, un-routed interrogation note: `useScrollScene.ts:11` still cites `@mkbabb/keyframes.js@4.3.0` (installed 6.0.0) | MO note 5 found it; the other three motion doc-notes were cured (see R15) but this one is live at HEAD and ABSENT from `BJ.W-DOC-TRUTHUP`'s enumerated 7-target list—a dropped row. ROUTING: add as DOC-TRUTHUP target 8 |
| N3 | HeaderRibbon `role="toolbar"` with no roving tabindex/arrow-key contract | HeaderRibbon.vue:24—every item an individual tab stop, the APG toolbar pattern unmet; same pattern family as the K-family GlassDock roving ruling. ROUTING: join the BAND-A11Y roving/toolbar ruling row (one decision, both surfaces) |
| N4 | CarouselContent `arrival` misbehaves under embla `loop: true` | CarouselContent.vue:72—`t = |snap−progress|·(N−1)` is not shortest-path at the wrap seam, so the visually-adjacent seam slide takes the full 0.965/0.7 drop. Opt-in prop, default off. ROUTING: design-debt note on the FEEDBACK-MOTION motion-tune wave—use wrapped distance `min(|d|, 1−|d|)` when loop |
| N5 | Carousel root carries `tabindex="0"` unconditionally | Carousel.vue:89—a focusable generic with no role/name when `ariaLabel` is absent (role/roledescription are correctly conditional, the tab stop is not). ROUTING: BAND-A11Y note—condition the tab stop on the named-region arm |
| N6 | useLiquidGrid dispose reads `canvasRef.value` after Vue nulls template refs | useLiquidGrid.ts:220-222—`unbindPointer` is skipped on unmount (ref already null), leaving pointer listeners on the detached parent host. Benign today (host dies with the component; GC collects), latent-leak class if the pointer host ever outlives. ROUTING: rides whatever family-C wave owns liquid-grid's fate (registry lists it a prime-delete candidate); if kept, capture the host at bind time |
| N7 | liquid-grid entrance amp is frame-rate dependent | useLiquidGrid.ts:108 `amp += (target−amp)·0.04` per frame, un-scaled by dt—ramps 2× faster at 120Hz. Sub-perceptual; codex law 14 wants time-parameterized physics. ROUTING: same wave as N6, note-grade |
| N8 | PagerDots paintWorm does 2× `getComputedStyle` per rAF frame | usePagerWorm.ts:133-134 (`readPx` of `--pager-dot-size`/`--pager-dot-elongated` inside the per-frame `onFrame`)—a per-frame style-read/write interleave on the exact rAF-budget axis R3b made family E's headline gate. ROUTING: BAND-PERF note—cache token reads per seat/resize |
| N9 | Toast queue: shadcn `TOAST_REMOVE_DELAY = 1000000` residue + dismissed toasts occupy `TOAST_LIMIT` slots ~16.7min | use-toast.ts:6,74—closed entries count against the 5-slot cap until the remove timer fires; also a greenfield-no-meta smell (upstream idiom carried verbatim). ROUTING: fold into the family-G toast wave (F20 toast≡dialog) |
| N10 | The unit's structural verdict: the interrogation's coverage geometry missed where the breakage actually was | The 7 batches carried NO procedural suite (aurora/blob/liquid-grid/fourier/constellation/handmark), no toast/alert/skeleton, no timeline, no preview-card/perf surface. The user's 2026-07-17 corpus then broke precisely there: F08 aurora preset duplication (a statically-discoverable WGSL medium collapse, mediums 3/5/6/7→kuwahara), F16 timeline, F19/F20/F24 feedback motion, F34-F40 handmark, F01/F02/F46 preview/perf. Within its batches the interrogation was precise; the sample frame was the failure. ROUTING: lesson only—BJ's formation already institutionalized full-surface coverage (the 118-page Pass-E idiom, the 11-lens round-1); no new row needed |

### RATIFIED (20)

| # | Claim | Status at HEAD | Detail |
|---|---|---|---|
| R1 | MG/MO—`scheme-spring.css:31` dock prose stale: `(0.68s, ζ=0.64)` vs authority `response 0.3/ζ0.82` | RATIFIED—STILL LIVE | Verified: the comment persists at HEAD; springPresets.ts:95-96 says 0.3; the emitted `--spring-dock` curve is monotone (no overshoot), consistent with 0.30/0.82. Already J-family target 1 ("stale spring mirror"). Corollary the MO seat also called: the auto-memory `DOCK_SPRING={0.68,0.64}` note is stale against the shipped authority |
| R2 | MG—P016 stale comments asserting the forbidden static-stack-walk fallback (backdropLuminanceSample.ts:57-59,131-132) | RATIFIED—CURED | At HEAD those comment sites assert the inverse ("NEVER falls to the static stack-walk"). Real find, fixed post-interrogation |
| R3 | MG—P019 type-pair derivation provably single-source; the wave doc over-claims its test coverage (3 of 4 advertised checks absent) | RATIFIED | Derivation math re-checked and sound (`calc(clamp(...)·k)` preserves the exact ratio at floor/fluid/ceiling); the doc-over-claim half is BI-archival, superseded by the BJ gate collapse |
| R4 | CD—Tabs note-gap: no `aria-controls`/panel linkage reachable through the public API | RATIFIED—CURED, CONSEQUENTIAL | True at the interrogated tree; cured at `d5eba7bb` (2026-07-17 00:24, "true up the ARIA seams"—hours after the report landed). HEAD SegmentedTabs carries the `controls` option prop wired to `aria-controls` in both button branches |
| R5 | DC—P060 swallowed Clipboard error (`useClipboard.ts` empty `catch {}`) | RATIFIED—CURED, CONSEQUENTIAL | Cured in the same `d5eba7bb` ("surface clipboard write failures"); HEAD catch binds the error and rides it on the discriminated CopyResult |
| R6 | PP—CHANGELOG 7.0.0 HeaderRibbon bullet described the collapsible model the dirty code had removed | RATIFIED—CURED | HEAD CHANGELOG:77-80 describes persistent-only, matching the shipped component (the P114 lane closed the three-way desync) |
| R7 | PP—`peerDependenciesMeta["@mkbabb/value.js"].optional: true` vs MIGRATION "requires @mkbabb/value.js@^4.0.0" | RATIFIED—STILL LIVE | Verified at HEAD (package.json meta vs MIGRATION.md:148). Note-grade wording/meta disagreement, un-routed. ROUTING: DOC-TRUTHUP or the Q060 outbound truth-pass—move the word or the flag |
| R8 | CF—completion-seal dead constants `COMPLETION_SEAL_SETTLE_SPRING`/`_DRAW_SPRING` | RATIFIED—STILL LIVE | constants.ts:80-81 at HEAD, zero consumers, no public re-export. ROUTING: rides the family-C completion-seal wave (F26 relocation/prune) |
| R9 | CF—Progress out-of-range `modelValue` desyncs clamped fill from reka's unclamped `aria-valuenow`/`data-state` | RATIFIED | Mechanism confirmed in my ANEW read of Progress.vue (fraction clamps via `resolveValueFraction`; reka passes raw). Invalid-input edge, note-grade, correctly not escalated |
| R10 | CD—DataTable identity/selection/roving/caller-window claims | RATIFIED | My independent ANEW read reproduces every mechanism: `Object.is` keys, `closest()` nested-control guard with the row-is-currentTarget allowance, focus persistence via onBeforeUpdate/onUpdated, controlled-tabbable honest null. The no-fallback observation correctly filed as caller responsibility |
| R11 | CD/CF—the marks model (`valueDomain`) survives every adversarial domain; no hidden snapping | RATIFIED | Re-read at HEAD: strict-interior filter, Set-dedupe, finite gates, degenerate/reversed → `[]`; marks never enter the model |
| R12 | CD—reka stale-binding sweep zero-hit (`:pressed`, `v-model:search-term`, `tag=`) | RATIFIED | My ANEW sweep of the sampled components agrees—zero instances, `useForwardPropsEmits` discipline throughout |
| R13 | MG—no live light-dark() inset-fragment violation; zero scoped `:global(.dark)` | RATIFIED | Re-swept at HEAD with comment-stripped matching: every co-occurrence is a guard comment; the sole `:global(` hit is a warning comment (deck.vue:192) |
| R14 | MO—`useLeadTrail`/`usePointerVelocityField` hand-rolled integrators are a classified, disciplined family (PRM-gated, dt-clamped, scope-disposed), defensible against the P025 letter | RATIFIED | Verified: useLeadTrail carries `useReducedMotion` + seat-instantly PRM arm (lines 127-243); the 0.68/0.64 pager constants are documented pager-owned values, not a preset bypass |
| R15 | MO—the three motion doc-drift notes: springPresets t90 docstring, useSpring bare-default mislabel, useLiquidFlex maxStretch JSDoc 1.08-vs-1.14 | RATIFIED—ALL CURED | HEAD: t90 docstring rewritten ("NOT a single tight band"), useSpring documents 0.5/0.86 as "this primitive's own bare default", useLiquidFlex JSDoc says 1.14 |
| R16 | MG—worthless-test flags: token-graph test 1 (tautology + allowlist), springs-story test 1 (inline-style snapshot); CD/DO/DC/PP/CF—"no worthless tests" affirmative findings | RATIFIED-AT-TIME | Both flagged files still exist at HEAD (partially reworked); the round-1 gate lens's independent 1055-block census and the GATES W1 collapse supersede the per-file adjudication. The affirmative keeps were honest (each cited the pinned contract) |
| R17 | PP—export-map delta exact (82→74, 11/3), no dead keys, typesVersions coherent, MIGRATION sampled rows TRUE | RATIFIED (sampled) | Spot-checked at HEAD: peer meta present, subpath structure intact, 7.0.0 published green with provenance—the publish itself is the strongest post-hoc confirmation of the package-boundary clears |
| R18 | DC—FamilyTabs deleted-mechanism comment + SidebarDock NCSU-red comment stale | RATIFIED—CURED | Both comment sites at HEAD now agree with code |
| R19 | DO—Q023 boundary held: Sheet owns the graded edge; Drawer scrim blur is FIXED depth, never a `--stage-t` ramp; the engage-token orphan removed | RATIFIED (mechanism) | HEAD drawer/styles.css:365-379 preserves the fixed-depth rationale verbatim (value retuned 16→14px since). The un-flagged raw literal is W3's charge, not this row's |
| R20 | CD—Chip mode discrimination/attr authority/type-button ordering mechanics | RATIFIED (mechanics only) | My ANEW read confirms every traced mechanism (controlAttrs/staticAttrs strip sets, `type="button"` after `v-bind`, removable fail-loud). The P091 VERDICT remains overturned per W1—right mechanics, wrong grade |

Not re-adjudicated here (owned by sibling REFABLE units or beyond this sample's
depth, explicitly not counted): the deep dock traces (GCF-01/02, P035/P036/P041—the
dock greenfield + RU dock units own that ground), InstrumentChassis residue rows,
the Command/DropdownMenu/Tooltip depth rows, and the MO numeric parity table
(re-derivation not repeated; its emitted-token consistency was spot-confirmed
against scheme-spring.css).

## Verdict per sampled domain—did the interrogation find what is actually there?

- **material**: MISS-weighted. The stale-comment and token-math finds were real and
  precise, but the domain's one shipping major (the chip/glass-atom closure orphan,
  live in the interrogated tree, one grep away) was cleared through (W1), and a raw
  blur literal was quoted and blessed (W3).
- **motion**: STRONG. The numeric parity re-derivation is the best work in the
  corpus; all four doc-drift notes real (three since cured, one recovered here as
  N2); the classified-integrator judgment holds at HEAD.
- **feedback**: ACCURATE where it looked, half-absent. Progress/Pulse/StatusDot/rim
  rows all ratify; Toast and Alert were in no batch, and the user filed F19/F20
  there days later.
- **data**: ACCURATE where it looked, Timeline-absent. DataTable/marks rows ratify
  in full against my independent read; GlassTimeline was in no batch—F16 and my N1
  land in the hole.
- **navigation**: STRONG and consequential. The Tabs aria-controls gap and the
  HeaderRibbon CHANGELOG desync were real and both drove pre-publish cures; my N3
  toolbar-roving row is the pattern the era's lens (K-family dock ruling) already
  circles.
- **procedural**: NOT COVERED—the roster had no procedural batch at all. My ANEW
  read finds the lifecycle layer statically healthy (well-gated PRM, no rogue rAF),
  so no smoking gun was provably missed at the code layer, but the WGSL
  medium-collapse behind F08 was statically discoverable and waited for a later
  lens.
- **story**: ACCURATE within its fence. IA/a11y/copy rows ratify; the perf and
  preview-card halves (F01/F02/F46) were outside the no-browser fence and honestly
  so—those needed the R3a/R3b live seats, not this unit.

## The union verdict

The interrogation was mechanically precise inside its batches—every defect claim I
re-proved was true on disk, three findings drove same-day pre-publish cures
(d5eba7bb), and its honest UNPROVABLE-CODE-SIDE discipline was real, not
verdict-laundering. It fails retrospective adjudication on grade and geometry: it
cleared Chip while the chip's material CSS lay dead in the @import closure of the
very tree it read (the one defect class its static, no-browser fence was BUILT to
catch), returned `must_fix: []` on the strength of that clear, and its seven-batch
roster omitted the procedural/feedback-motion/timeline surfaces where the user's
verdict corpus subsequently found Glass 7 broken. Misses weigh heavier than false
alarms: one heavy miss, zero false alarms, high fidelity elsewhere.

## Proposed routings (PROPOSE only—no band, wave, or src edit)

1. `BJ.W-DOC-TRUTHUP` (family J): ADD target 8—`useScrollScene.ts:11` stale
   `@mkbabb/keyframes.js@4.3.0` citation (installed 6.0.0); the one un-cured,
   un-routed interrogation note (N2).
2. `BJ.W-DOC-TRUTHUP` or the Q060 truth-pass: reconcile
   `peerDependenciesMeta["@mkbabb/value.js"].optional: true` vs MIGRATION.md:148
   "requires" (R7).
3. `BJ.W-REDUCE-TIMELINE` (family C/F16): carry N1 as a named defect into the
   ground-up redesign—the element-level `--glass-level: 0` arm is dead against the
   :root-baked tokens and the prefers-contrast floor never engages; candidate
   `token-hygiene` lint arm for the element-level `--glass-level` write class.
4. `BAND-GATES` W3: evidence re-pinned live at HEAD for the born-RED set—drawer
   `blur(14px)`:379, SortableList `999px`:144, segmented raw radii 169/306, the
   chip/glass-atom closure orphan (no change needed; confirmation only).
5. `BAND-A11Y` (family K): fold N3 (HeaderRibbon toolbar roving) into the existing
   dock roving-tabindex ruling row—one pattern decision, two surfaces; add N5
   (Carousel unconditional tab stop) as a note-row.
6. `BAND-FEEDBACK-MOTION`: N4 (carousel arrival wrap-seam under loop) as a
   design-debt note on the motion-tune wave; N9 (toast remove-delay residue +
   queue-slot occupancy) folds into the F20 toast wave.
7. `BAND-PERF` (family E): N8 (PagerDots per-frame getComputedStyle pair) as a
   note under the rAF-budget gate scope.
8. Family C liquid-grid wave (whatever its kill/keep ruling): N6 (dispose-time
   unbind skip) + N7 (dt-unscaled amp ramp) ride it; moot on delete.
9. Lesson row, no new wave: N10 (coverage geometry)—batch rosters for any future
   interrogation must span the full component surface; BJ's 11-lens + Pass-E idioms
   already encode this.
