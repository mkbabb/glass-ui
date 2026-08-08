# BK #87 · W-MARKS — IMPLEMENT RECORD

**Date** 2026-08-08 · **Seat** SCOUT+IMPLEMENT · **modelId** `claude-opus-5[1m]`
**Base HEAD** `5183f3af` (the brief cited `4917a042`; HEAD had advanced two commits —
`1bc09dde` #85 W-EASING plus its two back-annotations)
**Spec of record** `docs/tranches/BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-3.md`
§LANE display-atoms (`:1386-1571`) · **TR cell** `TERMINAL-ROSTER.md:237`
**State** `code_state = landed-in-tree` (shared tree; the driver commits) ·
`evidence_state = π owed` (§6's 17 rows are browser rows; see §6 below)

---

## §0 · SELECTION + GROUNDS

**Selected: #87 W-MARKS.** Not #86, which is next by bare TR order.

The cursor's own procession, written by the driver at ⊕⁶² (`EXECUTION-PROGRESS.md:3030-3032`),
reads verbatim:

> With #85 landed, the remaining Φ5 frontier is **#87 W-MARKS** (unblocked,
> unentangled) → then the **joint #86 + #88** (they cut `track-well.css`
> **JOINTLY**, C-1) → **#89**, whose sever precedes **#47**'s first build.

#86 is not selectable by a single seat: C-1 of the tier-3 collision ledger makes its
`track-well.css` eviction a JOINT cut with #88, and #86 additionally carries #89's
`resolve.ts` move. #87 is named unblocked and unentangled in the same sentence. The
row-state table confirms `| 87 | W-MARKS | Φ5 | UNSTARTED |` (`:3207`).

Sequencing preconditions re-derived on disk rather than trusted (§9 lists both as
"land before or with this wave"):

| precondition | on-disk reading | verdict |
|---|---|---|
| `--ink-{seam,edge,perimeter}` | `src/styles/tokens/color-radius.css:138-140` | **LANDED** |
| `--control-label` | `src/styles/tokens/sizing.css:104` | **LANDED** |
| `tests/public-surface.spec.ts:483` RED at HEAD | GREEN at HEAD; the row now reads `:493` | **DISCHARGED** |

**Step-0 baseline** (4th-recurrence protocol, ⊕⁶⁰/⊕⁶¹):
`/tmp/bk-row-baseline-1786206754.diff` · `git status --porcelain | wc -l` = **102**

---

## §1 · WHAT THIS WAVE IS

Six components — badge · separator · label · avatar · skeleton · status-dot — are
the library's entire **inert-mark register**: non-interactive atoms that annotate a
neighbour. Measured at the wave, all six already had zero `:hover`/`:focus`/`:active`
rules and zero `backdrop-filter`. The right answer, reached by omission. This wave
makes it law and then fixes the four C-severity paint defects the omission was hiding.

The headline is **D1**: `490cc46e` replaced StatusDot's entire API two majors ago and
wrote **zero** migration rows, while `v-bind="$attrs"` made every retired prop a
silent no-op. No DAG row named it. One bench found it. This wave writes the record.

---

## §2 · PER-ITEM LEDGER

Every trace is a file:line read this seat, or a command whose output is quoted.

### mark.css — the register (§3.1, §4 ADD)

| item | trace |
|---|---|
| `src/styles/glass/mark.css` NEW, 106 lines | four laws, all `:where()` (specificity 0) so a member's own sheet always wins its own channel |
| `@import` at `glass.css:124` | immediately after `glass-atom.css`, same `@layer components` |
| the `backdrop-filter: none` law | the ONE glass claim that is engine-invariant (EXEC-STATE sixth-Écoute (d)) — the only one that can be gated identically in Chromium and Safari |
| the state-change engagement | **MECHANISM SUBSTITUTION, see §3** |

### Badge (§3.5)

| item | trace |
|---|---|
| `surface` axis + `SURFACE` map + `--badge-glass-strength` + 7 tint rules DELETED | `glass-atom.css` −34 lines; census 0 demo mounts / 1 cross-repo (routed §5) |
| RESOLVED axis stamps | `Badge.vue` — one source (`BADGE_AXIS_DEFAULTS`), two consumers (class map + stamps) |
| outline `border` → `inset 0 0 0 1px var(--ink-perimeter)` | +2.00px of layout box died at every rung |
| contrast arm takes the same inset spelling | the arm that was concealing D7 by re-adding the box |
| `wrap-anywhere` → `whitespace-nowrap` | applied to 39/39 badges; "Paid" → P/ai/d |
| glyph `--ui-glyph-sm` → `1em` | W-SEARCH ruling 3, inherited verbatim |
| type rungs → caption / `--control-label` / `--control-text`; pad → 4/8 · 4/12 · 8/12 | off `--ui-scale` per §1.1 |
| **A-22** circular floor | the badge's own box height — `1lh` of content plus both padding-block legs [CORRECTION 2026-08-08 · CURE-87-1: previously read "`min-w-[calc(1lh+<pad-block>×2)]` … spelled on the rung that owns the pad". Spelled that way, beside a bare `px-3`, the floor was INERT at sm and md and the cell overstated a landed law. The floor now comes WITH its precondition, and both are `mark.css` law (6): the rung states its two legs as REQUESTS, the register states the box and ceilings the inline leg at the slack the floor leaves over `1ch`. Measured at every rung in §9] |

### Separator (§3.3)

| item | trace |
|---|---|
| D3 `block-size: 100%` → `align-self: stretch` | percentage-of-indefinite resolves `auto`; `auto` on an empty div is 0 |
| D2 labelled un-clamp at **(0,2,0)** | the specificity gap IS the defect — a (0,1,0) `block-size: auto` loses to the (0,2,0) hairline clamp |
| `--separator-ink` → `--ink-seam` | token struck at `color-radius.css:183` |
| segment floor 1rem → 0.75rem | a control-sized minimum on a line that is not a control |
| label leaves `--font-mono` for `--control-label` | mono is the value face; "or" is a section label |
| `fixedHostAttrs` | 1 of 4 hand-rolled destructures |

### Label (§3.7)

| item | trace |
|---|---|
| `.glass-label` → `.label` | D29 — zero glass in the file (`Label.vue:64` carried font/colour only) |
| `--type-small` → `--control-label` | D12 — the old rung is the same source `--control-text` derives from: ratio 1.000 desktop / 0.667 coarse vs the ruled 0.887 |
| destructive requirement arm STRUCK | D13 — a pristine required field wore the exact error red |
| `*` stays hidden; **"optional" is announced** | S13 — requiredness is the control's channel; there is no control-side attribute meaning *optional* |
| disabled: blanket `opacity` → `oklch(… l 0 h / 0.45)` | stops the α-compounding on the nested annotation |
| `margin-inline-start` 0.35em → 4px | |
| `fixedHostAttrs` | 2 of 4 |

### Avatar (§3.2, §3.7)

| item | trace |
|---|---|
| `.glass-avatar*` → `.avatar*` | D29, same law as Label |
| layer split — SHAPE SEAM ONLY | D6; Skeleton's own `:38-47` is the model the sheet was violating |
| φ ladder `sm=--control-h-md · md=×1.618 · lg=×2.618` | ONE FRAME PER FIGURE — **desktop** (`--ui-scale` 1): 40/64/128 → 40/64.72/104.72, where only `lg` moves; **coarse** (1.5): 60/64/128 → 60/97/157, where `md` moves +51.7% and the 1.067 sm:md collapse dies [CORRECTION 2026-08-08 · CURE-87-4: previously read "60/64/128 (ratio 1.067) → 60/97/157; only `lg` moves" — one figure with its `sm` from the coarse frame, its `md`/`lg` from the desktop literals (`4rem`/`8rem` are frame-independent, which is the defect), and its two clauses from different frames. `avatar/styles.css:18` and `:24` already keep them apart] |
| status slot **font-size seam** | **S15/D34** — see §3 |
| border `--glass-border-wash` → `--ink-edge` | C9, elevation earns the edge |
| `data-image-state` / `loadingStatusChange` / `AvatarImageStatus` DELETED | D20 — 0 readers, 0 listeners, six repos |
| `delay-ms` FORWARDED | D21 — the reka silent-no-op class |
| `fixedHostAttrs` ×2 + 2 named contract comments | 3 and 4 of 4; S8's fences kept, each naming `MIGRATION.md:118/121` |
| specular UNTOUCHED | S6 — avatar is a READER of the shared token; PROPORTION 5b's edit is library-wide |
| the `.glass-avatar`→`.avatar` selector follow-through in `tests-visual/` | [ADDED 2026-08-08 · CURE-87-4: in-remit at the cut and delivered, but unledgered — a rename that leaves a probe selecting the old class does not fail, it selects NOTHING] `_capture_css.spec.ts:72` (1 line) · `w1-radius-redress.spec.ts:423,429,431,435,437` (5) · `w1-radius-redress.webkit.spec.ts:193,194,224,225,233,234` (4). Mechanical, one selector per site, no assertion figure touched |

### Skeleton (§3.4)

| item | trace |
|---|---|
| the whole sweep apparatus DELETED | `::after` gradient · `skeleton-scan` · `will-change` · the no-op `prefers-reduced-transparency` branch (its body was byte-identical to the base rule) |
| `skeleton-breathe 1.1s var(--ease-standard) infinite alternate` | width-invariant by type; opacity is compositor-only |
| **A-9** fill `--muted` → `--ink-seam` | a mark's ink comes off the ladder; the shimmer/surface variant stays DECLINED on S2's four falsifiers |
| `fixedHostAttrs` + contract comment | S8 |

### StatusDot (§3.6) — the headline

| item | trace |
|---|---|
| base default → the **unknown** paint | D9's root: an 8th state can never again ship as live |
| `[data-state="active"]` explicit rule | it had NONE, for two majors, in the component its own README headlines |
| the orbit at EVERY motion value | S3(iii) — at `motion="off"` the LIVE state was the deadest-looking mark of seven; D10 dissolves **by identity** (the pulse IS the silhouette, animated) |
| `50%` ×4 → `--radius-pill`; 18%/22% enumerated as silhouette geometry | |
| rungs rem → **em** | K17; and it is what makes S15's avatar seam possible |
| `feedback.ts` → `states.ts`; `FeedbackSize` → `StatusDotSize` **at source** | the export line was doing the design's work |
| `cn()` merge | replaced the array-literal class merge |
| root barrel +1 | `src/index.ts` — absent from BOTH barrels while 7 external importers used the subpath |
| README corrected, NOT deleted | S10 — its two false claims become TRUE under the cure |
| **MIGRATION rows** | `MIGRATION.md` §8.0.0 — the deliverable |

### Metric (TR#87 ✦³ · SL-2 · A-21)

| item | trace |
|---|---|
| `MetricCell.vue` DELETED → `<Metric posture="cell">` | three of four members re-implemented one readout |
| `MetricRow` → **pure layout composer** (slot only) | it stamped `data-empty`/`data-loading`/`aria-busy` — a second source of truth for the readout's own facts |
| `MetricStack` unchanged in kind | container grid + density, paints nothing |
| `orientation` → `posture` (`inline\|stacked\|cell\|row`) | |
| `delta` + `polarity`, status **ink** on neutral material | house `--success`/`--destructive`; no plate, no bespoke green/red |
| **A-21** `compact` via `Intl.NumberFormat notation:"compact"` | in `coalesceMetric`, the family's ONE data-shaping seam — no standalone atom |
| label type → `--control-label`; loading plate → `--ink-seam` | zero local type/spacing mints |
| rest is STILL (#27 rest rung) | the loading mask is a plate + `aria-busy`, never a shimmer |
| `./metric` surface | `Metric · MetricRow · MetricStack · coalesceMetric · metricPolarity` + types |

### Demo (§3.8)

| item | trace |
|---|---|
| `badge.vue` mounts `<StatusDot :state>` | kills 8 `rounded-full` corners (Chromium `1.67772e+07px` / Safari `3.4e38px` — 20 orders apart on the identical declaration), the viz-palette-as-semantics row, and 4 dead "with dot" specimens; makes its own blurb true (F14) |
| `separator.vue` twins fold to one plate | the whole delta was in the a11y tree, where a plate cannot show it; it is stated in copy |
| `avatar.vue` `:deep()` rim override DELETED | it existed only because the component's whole sheet was layered |
| `metric.vue` dogfoods the new API | + a delta/compact section |
| badge size axis gains 1-char specimens | the A-22 floor is now visible on the page |

---

## §3 · THE THREE SUBSTITUTIONS, EACH WITH ITS FALSIFIER

Stated plainly because each departs from a literal clause of the spec.

**(1) `springPreset("snappy")` DOES NOT EXIST — and a gate proved it.** §3.1 asks for
that preset, "read from `springPresets.ts` at implementation time, never a remembered
literal". The table read at implementation time has six rows: `press · present · dock
· panel · bloom · world`. The name is not among them.

It is worse than absent: it is **RETIRED**, and `tests/styles/spring-authority.test.ts`
(`G-SPRING-ONE-JOB`) greps `src/` for every retired register name. The first draft of
`mark.css` merely *quoted* the spec's citation in a comment, and the gate RED'd:

```
AssertionError: snappy @ src/styles/glass/mark.css: expected [ Array(1) ] to deeply equal []
```

That is the cleanest possible receipt that the substitution was owed. The name is
recorded HERE, and the REGISTER FORM of it — the only form the gate detects —
appears nowhere in `src/`.

[CORRECTION 2026-08-08 · CURE-87-4: the sentence previously read "does not appear in
`src/`", a universal that is FALSE. `grep -rn "snappy" src` returns SIX hits, all of
them adjectival prose about feel, none a register reference:
`useSelectionIndicator.ts:258` · `pointerFieldMappings.ts:26` ·
`usePointerVelocityField.ts:20,73` · `utilities/btn.css:92` · `useBlobPointer.ts:55`.
The gate's own detector is narrower than the word, verbatim from
`spring-authority.test.ts:129`: `` new RegExp(`--spring-${grave}\\b|springPreset\("${grave}"\)`) ``,
and `grep -rn -- '--spring-snappy\|springPreset("snappy")' src` returns **0**. The
operative claim is the detector's, not the vocabulary's.]

**What replaces it**, on the mirror's own clause (`scheme-spring.css:52-56`): *"an
EFFECTS transition (a colour cross-fade) rides `--ease-*`, because a colour cross-fade
on a spring reads as a wobble."* A mark's state change is TWO channels, so it takes
two curves — ink cross-fades on `--ease-standard`/`--duration-fast`; the silhouette's
`scale`, the only geometry channel a mark moves, rides `press` via
`--spring-press`/`--spring-press-duration`, the table's fastest dead-landing row.

**(2) §3.5(3)'s LOCAL BADGE RIM IS REFUSED — ITS GROUND IS ALREADY CURED.** The reason
for going local was D15: two live definitions of `--glass-material-rim` decided by
ancestry (12 vs 27 elements on one route). That fork is DEAD at HEAD —
`tokens/shadow.css:37` records its strike verbatim ("`--glass-material-rim` is NOT
declared here… ONE declaration now, in rim.css") and `glass/rim.css:54` is the sole
declaration, top leg **0.10 light / 0.08 dark**, already inside the spec's own ≤0.12
ceiling. Forking a badge-local copy of a rim that is finally single-sourced is the
per-site paste S6 refused for the specular. The ambient read stays; the ceiling is met.

**(3) `MetricRow` BECAME A SLOT, WHICH COSTS THE CONSUMER VERBOSITY.** TR#87 rules
`MetricRow`/`MetricStack` "pure layout composers — zero visual authority of their own".
Taken literally, `MetricRow` cannot take `label`/`value`/`unit`, so the ledger idiom is
now `<MetricRow><Metric posture="row" …/></MetricRow>`. That is longer than what it
replaces, and it is the ruling: the alternative (a composer that forwards metric props
into a `<Metric>` it renders) is not a layout composer, it is the fourth copy of the
readout under a new name — which is the defect SL-2 exists to end.

---

## §4 · GATES

**Four born-RED source batteries + two folds. ZERO SEATS MINTED.** The register
receipt is **byte-identical** pre and post (§5).

`tests/styles/mark-register.test.ts` (NEW, 9 rows) — the register's mechanism battery.
Each row quotes its HEAD reading; each was verified RED against `git show HEAD:` this
seat:

| detector | HEAD reading | verdict |
|---|---|---|
| `mark.css` exists + declares the law for all six roots | `fatal: path … exists on disk, but not in 'HEAD'` | RED |
| `--separator-ink` refs in `src/` | `Separator.vue:2`, `color-radius.css:2` | RED |
| `block-size: 100%` in Separator | 1 | RED |
| `skeleton-scan\|will-change\|translate3d` | 5 | RED |
| `.feedback-mark[data-state="active"]` | **0** | RED |
| `border-radius: 50%` in StatusDot | 4 | RED |
| `border: 1px solid` under `.badge-atom` | 2 | RED |
| `wrap-anywhere\|ui-glyph-sm` in badge index | 1 line, both | RED |
| zero hover/press/focus on any member | GREEN at HEAD **by omission** | **regression fence, declared as such** |

`tests/gates/token-hygiene.test.ts` — the ONE-INK arm folded under the **existing**
`gate:token-hygiene` seat, per §5's own routing ("Ink rows → token-hygiene").

`tests/components/status-dot.contract.test.ts` — **REWRITTEN** per S11. What it was:
six assertions mirroring the template back at itself ("the state prop I passed appears
on `data-state`" ×7). It could not have caught D9 (never read a rule) or D1 (never read
the record). It now asserts (a) every state reaches an explicit rule, (b) the `active`
silhouette is unconditional and the animated arm adds ONLY the animation, and (c) the
7.0.0 MIGRATION rows exist — a row that REDs if the deliverable is deleted.

Close-battery rows also added to `badge` (3), `label` (2), `avatar` (2), `separator`
(1), `metric` (5), `ui/skeleton` (3) contract files. All born-RED, detectors verbatim.

**A DETECTOR-DESIGN LESSON, RECORDED — it bit five times in one seat.** Every source
detector must strip comments before scanning. This wave's own prose NAMES what it
struck (`wrap-anywhere`, `50%`, `block-size: 100%`, `badge-atom--glass`,
`skeleton-scan`) — a strike that does not say what it struck is one nobody can audit
later — so a raw-text detector fires on the EXPLANATION of the cure and calls it the
defect. Five rows greened only after a `stripComments` pass. The standing form: **a
detector that greps a file that documents its own history is measuring the
documentation.**

**DELETED, not repaired** (§4 STRIKE): `tests-visual/separator.spec.ts` (218) +
`tests-visual/badge-align.spec.ts` (242). The first probed only the labelled arm and
never measured a box — it shipped D2 AND D3 through two majors; the second pins a
line-height a unit test already freezes. **−460 lines.**

**THE TR'S "−789 GATE LINES" IS A DIVERGENCE, RECONCILED** [ADDED 2026-08-08 ·
CURE-87-4]. `TERMINAL-ROSTER.md:237` credits this lane with retiring −789 gate
lines. This record never claimed the figure and does not now: it is not delivered,
and the reason is that the credit was scored against a DELETION column only.
Measured at the cure round, `git diff --shortstat` over this row's own test files:

| group | delivered |
|---|---|
| `tests-visual/` (2 specs struck + the 3 rename follow-throughs) | +10 / **−470** |
| the rewritten contract suites (10 files) | +557 / −134 |
| `tests/styles/mark-register.test.ts` (new, untracked) | +253 |
| **net** | **+216 gate lines** |

The −470 the TR was reaching for is real and is exactly the tests-visual deletion
column. What it omitted is that a strike whose mechanism is not re-bound elsewhere
is not a saving but a hole: `status-dot.contract.test.ts` alone runs +111/−40 in the
same pass, because its six template-mirror rows are replaced by rows that read the
cascade. **The standing form: line credits scored on one column of a diffstat
reward deletion, and a gate suite is the one place where the deletion is only half
the transaction.**

**STRUCK, DEAD BY SUBJECT:** the `Δ-F24-1` shimmer-rung block in
`tests/components/ui/skeleton/Skeleton.test.ts`. It bound `skeleton-scan`'s CLOCK
against a defect that was a CURVE and a GEOMETRY — both of its figures move together
when the clock is retuned and the 5.8× ratio never does, so it could pass forever. It
is replaced in place by three rows binding the MECHANISM, including the mutation that
bites: *retune the clock, keep the ±110% translate → still RED.*

---

## §5 · VERIFY GATE (verbatim)

```
$ npx vue-tsc --noEmit
(no output — clean)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**BYTE-IDENTICAL to the pre-cut baseline**, taken before the first byte was written.
The single `violations:1` is `pager.tabs.panel-linkage: sourcePath missing —
tests/components/pager-dots.contract.test.ts`: the uncommitted **#40 W-PAGER** lane
moved that file into `tests/components/pager-dots/`. Pre-existing, foreign, unchanged
by this row. The brief's expected `violations:0` does not hold at HEAD-dirty; the real
invariant — byte-identity across the row — does.

```
$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 155 passed (161)
      Tests  11 failed | 1507 passed | 5 expected fail (1523)
```

**PARITY with the pre-cut baseline: the same 11 failures, in the same 6 files.**
Baseline was `6 failed | 154 passed (160)` / `11 failed | 1498 passed (1514)`. Net
+5 passing tests, +1 file, **zero new failures**. All 11 belong to uncommitted foreign
lanes (#40 W-PAGER's pager-dots ×5 + `stacked-url-filter`, carousel ×1,
`gate-register` ×3, `overfit-structure` ×1 — the last two leaks are both
`useLeadTrail.ts`, also #40's).

Three suites went RED under this cut and were repaired **in-lane**, with grounds:

1. `tests/styles/spring-authority.test.ts` — see §3(1). Repaired at the source.
2. `tests/styles/contrast-computed.test.ts` — its error-ink consumer list named
   `Label.vue`, which D13 removes from that role. Struck **in place with a dated
   bracket**; `LabeledField.vue:113` is the real consumer and still holds the floor.
3. `tests/components/ui/skeleton/Skeleton.test.ts` — dead by subject, replaced (§4).
4. `tests/gates/boot-graph.test.ts` build arm — `dist-demo` staleness. Restored with
   `npm run demo:dist:build` (gitignored; outside the fence).

---

## §6 · WHAT IS OWED — π, and the one blocker

`evidence_state = owed`. §6 specifies **17 π rows**, Chromium 150 AND real
`safari-app` 26.4, two of them **safari-MANDATORY** (P6: the identical `rounded-full`
declaration computing `1.67772e+07px` in Chromium and `3.4e38px` in Safari; P17:
`corner-shape: squircle` true/false across the two). Those are browser rows and are
not claimed here. The source batteries in §4 bind every MECHANISM the π rows measure.

**`npm run build` IS RED AT HEAD-DIRTY, AND IT IS NOT THIS ROW'S:**

```
Error: package.json/package-lock.json root metadata mismatch:
  devDependencies, peerDependencies, peerDependenciesMeta
```

`package.json` carries an uncommitted foreign edit (`git diff --stat package.json` →
10 deletions, present in the step-0 baseline). Consequences, both recorded rather than
worked around:

- `dist/` cannot be regenerated, so `tests/public-surface.spec.ts`'s *"ships exactly
  the style closure"* row reads 115 shipped vs 124 expected (dist is from **Aug 6**,
  eight rows stale — `mark.css` is one of nine missing members, not the cause).
- The same row's sibling, *"keeps package and lock root metadata in exact agreement"*,
  reports the mismatch directly.

Both are **pre-existing and foreign**. Touching `package.json` to green them is
refused: it is genuinely another row's, and doing it would silently absorb a foreign
lane's edit into this fence. The two `public-surface` rows this wave DOES own — the
exact root surface (+`StatusDot`, +`STATUS_DOT_STATES`) and the exact `metric` surface
(−`MetricCell`, +`coalesceMetric`, +`metricPolarity`) — are updated and GREEN.

## §7 · ROUTED (§9, carried forward unchanged)

`./avatar` + `./skeleton` subpaths → export-surface wave (S9: a 10-row rule lands
wholesale) · `--glass-specular` 0.45→0.12 → PROPORTION landing wave (S6) ·
`G-RELAY` · `G-NO-DEAD-ATTRIBUTE` · `G-LAYER-SEAM` → W-GATE-COLLAPSE (S11) ·
consumer relays (atlas ×3 + slides ×1 StatusDot · sci-report `Point.vue:101` badge
surface · **keyframes.js's undeclared `@mkbabb/glass-ui` dependency** — 7.0.0
installed, 39 importer files, `package.json`+lock grep 0) → LIB-SEAM addenda batch ·
`--type-caption` 14.384 vs canonical 12.97 → typography wave · skeleton 1.1s rank-table
conformance → MOTION-CANON · 10-README policy → structure lane · missing
`skeleton.contract.test.ts` → tests-isomorphism wave (NOT created here; §9 routes it) ·
control-side `aria-required` fence (S13) → control cohort.

---

## §8 · FENCE

Derived **final minus baseline**, per the ⊕⁶¹ protocol.

[CORRECTION 2026-08-08 · CURE-87-3 — this paragraph previously read: *"Every file
this row touched is **NEW to the working diff** — zero overlap with the 80
baseline-dirty files, so **no per-hunk split was needed anywhere**."* **That
universal is FALSE, and it is the 4th-recurrence protocol's own subject.**
`src/index.ts` was baseline-dirty (a foreign lane's ToggleGroup type strikes) and
this row added the 11-line StatusDot barrel hunk to it. Re-derived at the cure, per
file, `git diff -U0` against the step-0 baseline: **80 baseline files · 79
byte-identical · exactly ONE mutated — `src/index.ts`.** The split is clean and
unambiguous at `-U0`: **`+310,11` is this row's StatusDot hunk**, the five
`type ToggleGroup*` deletions (`-365` and `-368,4`) are **foreign and stay foreign**
(RT-84E → #65). So one
per-hunk split WAS needed, in exactly one file, and the fence is:]

```
46 files changed, 1527 insertions(+), 1166 deletions(-)
```

`45 / +1516 / −1166` — the shipped figure — is the **new-files-only** stat: it is
correct for the 45 files that are new to the working diff and silently drops the one
overlap file. `+1527` is `+1516` plus `src/index.ts`'s own `+11`; the `−5` there is
the foreign lane's and is excluded from both columns.

[CURE ROUND DELTA 2026-08-08: the cure round adds NO file to the fence — every byte
it writes lands in files already inside it (`mark.css`, `badge/index.ts`,
`badge.contract.test.ts`, `demo/stories/display/badge.vue`, `MIGRATION.md`) or in
this row's untracked record directory. Re-derived after the cure the tracked stat
reads **46 files / +1584 / −1168**; membership is unchanged, and the driver derives
its own figure at the scoped add.]

**Plus 3 untracked adds**, invisible to a `-U0` baseline (the ⊕⁶² blind spot, expected
and named rather than rediscovered):

```
src/styles/glass/mark.css              141   (106 at the cut; law (6) is +35 — CURE-87-1)
src/components/status-dot/states.ts     27   (rename of feedback.ts; `git mv` staged it,
tests/styles/mark-register.test.ts     253    unstaged immediately — index verified clean)
```

`src/components/status-dot/feedback.ts` appears in the tracked stat as an 18-line
deletion; it is the other half of that rename.

---

## §9 · CURE ROUND (2026-08-08)

The adjudicator (Fable, quartet run `wf_1f8d4ce0-993`) ruled CURE-REQUIRED and the
driver ratified four cures (`CURE-ORDER-87.md`). All four are executed here. Seat
`modelId` `claude-opus-5[1m]`. Nothing in the selection, the substance, or the verify
gate is reopened — what stands, stands.

**The through-line of all four: a claim published ahead of its mechanism.** The floor
was stated and did not bind; the fence's *"no baseline file touched"* was stated over
a file that was; a type was listed LIVE that was never declared; a ladder was stated
in two viewport frames at once and a lane credit in one column of a diffstat. Three
of the four are RECORD defects and one is a shipped byte, and every one of them would
have read as true to anyone who did not run the detector.

### CURE-87-1 · A-22 — BIND (the ratified branch)

**Branch taken: BIND.** No conflict was measured; the refuse branch is not reached.

*The defect.* `min-w-[calc(1lh+<pad-block>×2)]` is the badge's own box height, and it
is INERT beside `px-3`: a one-glyph badge's natural width is that glyph plus TWO
INLINE legs, so the floor binds only when `glyph < 1lh + 2·pad-block − 2·pad-inline`
— at md, `glyph < 1lh − 16px`, which no glyph satisfies. sm's near-circle was a `px-2`
coincidence.

*The cure.* The floor now ships WITH its precondition, both `mark.css` law (6),
`:where()` specificity-0 preserved. The register states the box; the rung states its
two legs as REQUESTS (`[--mark-pad-block:--spacing(n)]` /
`[--mark-pad-inline:--spacing(n)]`, the house idiom already carried by
`TooltipContent.vue:49` and `Toast.vue:131`, and the shape `vite.utility-emit.ts:104`'s
`propertySetter` exists to emit):

```css
:where(.badge-atom) {
    --mark-pad-block: 0.25rem;
    --mark-pad-inline: 0.75rem;
    --mark-floor: calc(1lh + var(--mark-pad-block) * 2);

    min-inline-size: var(--mark-floor);
    padding-block: var(--mark-pad-block);
    padding-inline: min(var(--mark-pad-inline), calc((var(--mark-floor) - 1ch) / 2));
}
```

The ceiling is `1ch` — the "0" advance, which is the glyph a COUNT is made of, and
the unit that says "one character" in the language the box is written in. The pad
series is unchanged as a REQUEST (4/8 · 4/12 · 8/12, off `--ui-scale`); what changed
is that a leg the floor cannot afford is no longer painted.

*Measured LIVE* (`npm run dev`, Chromium 150 via chrome-devtools, `1440×900`,
`--ui-scale 1`; computed `getBoundingClientRect` + `getComputedStyle`):

| specimen | before (w × h) | after (w × h) | ratio after |
|---|---|---|---|
| sm one-glyph `1` | 24.398 × 23.820 | **23.820 × 23.820** | **1.0000** |
| md one-glyph `7` | 32.492 × 23.992 | **23.992 × 23.992** | **1.0000** |
| lg one-glyph `9` | *(no specimen — the lg cell shipped `12`)* | **34.031 × 34.031** | **1.0000** |
| lg two-glyph `12` (control) | 43.148 × 34.031 | 43.148 × 34.031 | 1.2679 |
| md multi-glyph `Verified` (control) | 95.461 × 23.992 | 86.961 × 23.992 | 3.6246 |
| lg multi-glyph `Verified` (control) | 103.820 × 34.031 | 103.820 × 34.031 | 3.0507 |

Used inline leg after the ceiling: sm `8 → 7.711` · md `12 → 7.751` · **lg `12 → 12`,
uncapped** — the rung whose floor already had the slack is untouched, which is the
ceiling proving it is a ceiling and not a retune. The two-glyph control is
**byte-identical** before and after: it grows off the floor exactly as A-22 says.
Re-measured at coarse (`430×932×3`, `--ui-scale 1.5`) the floor binds at all three
rungs as well: sm `21.477 × 21.492` (0.9993, sub-pixel) · md `28.477 × 28.477` · lg
`39.094 × 39.094`.

*The one cost, stated rather than hidden.* The md multi-glyph control loses 8.50px
(the two 4.25px legs the floor could not afford), which brings md within 0.79px of sm
for the same string (86.961 vs 86.172). That convergence is NOT the cure's: `sm` and
`md` already ship 0.157px apart in type (`--type-caption` 14.384 vs `--control-label`
14.541), the `--type-caption` 14.384-vs-canonical-12.97 defect this row ROUTED at §7
to the typography wave. Measured under that cure's own value (`--type-caption:
12.97px` set live at the root): sm one-glyph `22.266 × 22.266` — still bound, ratio
1.0000 — and sm `Verified` 79.070 against md's 86.961, a 7.9px separation restored.
The pad was masking a type defect; the ceiling stops it masking and the routed row
cures it. **No masking fallback** (`feedback_no_masking_fallback`).

*Demo.* `demo/stories/display/badge.vue:119` shipped `12` as an lg "single-character
specimen" — a two-character string in the row that demonstrates the one-character
floor. lg now carries a `9` beside it, so the page shows the floor AND the growth,
and its blurb states the ceiling that makes the floor bind.

*The detector.* `badge.contract.test.ts:84-86` was the class-string mirror §4
condemns — three `toContain("min-w-[calc(…)]")` rows, which is a suite asserting that
a string is present while the box it names does nothing. It is replaced by a node
assertion that reads the cascade: `mark.css` comments stripped (the file's own prose
names every declaration it states — the detector lesson), the `:where(.badge-atom)`
block extracted, and the floor, the block leg, and the `min(…, calc((floor − 1ch)/2))`
ceiling each matched; plus a row that REDS if any rung reintroduces a `px-*`/`py-*`/
`min-w-` utility, since a utility-layer leg would win over the register and un-bind
the floor. The aspect cell stays π's (#10).

*BORN-RED, verbatim.* The pre-cure `mark.css` bytes were reconstructed into a scratch
copy (the cure is two pure insertions; the inverse is exact — verified 106 lines,
`:55` and `:106` matching the cut) and the REAL suite was run against them by pointing
`process.cwd()` at the scratch tree:

```
$ cd <scratch>/precure && npx vitest run --root <repo> tests/components/badge.contract.test.ts

 ❯ tests/components/badge.contract.test.ts (7 tests | 1 failed) 27ms
     × states the circular floor WITH the pad ceiling that lets it bind 3ms

 FAIL  … > states the circular floor WITH the pad ceiling that lets it bind
AssertionError: mark.css declares the badge box law: expected null not to be null
 ❯ tests/components/badge.contract.test.ts:113:69

 Test Files  1 failed (1)
      Tests  1 failed | 6 passed (7)
```

At HEAD-cured: `Test Files 1 passed (1) · Tests 7 passed (7)`.

### CURE-87-2 · `MIGRATION.md:824-825` — the strike-in-place law

*Detector.* `grep -n "MetricCellProps" src/components/metric/types.ts` → **0 hits**;
the file declares `MetricProps`, `MetricRowProps`, `MetricStackProps`, and
`MetricPosture = "inline" | "stacked" | "cell" | "row"`.

| line | before | after |
|---|---|---|
| `:824` | `MetricCellAppearance` … `removed 7.0.0 — /metric-cell consolidated into /metric (`MetricCell`)` | the trailing pointer STRUCK by dated bracket — it named the symbol that absorbed the subpath, and `MetricCell` is itself removed at 8.0.0; the surviving destination is `Metric` |
| `:825` | `MetricCellProps` · type · `` `/metric` `` — asserted LIVE | `removed 8.0.0 — use `MetricProps` (/metric) with `posture="cell"``, dated bracket quoting what it previously read and the detector |

MIGRATION.md is committed text, so both are strike-in-place brackets in the house
form (`[CORRECTION <date>: previously read "…" — …]`), never silent rewrites. Pipe
count verified against the table's own header (4).

### CURE-87-3 · `RECORD.md` §8 — the 4th-recurrence protocol's own subject

*Detector*, run per file rather than trusted, `git diff -U0` against
`/tmp/bk-row-baseline-1786206754.diff`: **80 baseline files · 79 byte-identical · 1
mutated: `src/index.ts`.** Before: *"Every file this row touched is NEW to the working
diff — zero overlap … no per-hunk split was needed anywhere"*, and the fence
`45 / +1516 / −1166`. After: the universal struck in place, `src/index.ts` named as
the ONE overlap with its split stated at `-U0` (`+310,11` this row's; `-365` and
`-368,4` foreign), and the fence restated **46 / +1527 / −1166**. See §8.

**A row whose whole protocol is "derive the fence, never assume it" published an
assumed fence.** The derivation it ran was `final minus baseline` over NEW files, and
that derivation cannot see an overlap by construction — it answers a different
question than the sentence it produced.

### CURE-87-4 · four record figures, one pass

| site | before | after |
|---|---|---|
| §2 Avatar table | the three `tests-visual/` rename follow-throughs unledgered | one row, per-file line sites named (`_capture_css.spec.ts:72` · `w1-radius-redress.spec.ts` ×5 · `…webkit.spec.ts` ×4) |
| §2 `:112` avatar ladder | `60/64/128 (ratio 1.067) → 60/97/157; only lg moves` — `sm` coarse, `md`/`lg` desktop literals, two clauses two frames | ONE FRAME PER FIGURE: desktop 40/64/128 → 40/64.72/104.72 (only `lg` moves); coarse 60/64/128 → 60/97/157 (`md` +51.7%) |
| §3 `:188` "does not appear in `src/`" | a universal; `grep -rn "snappy" src` returns SIX adjectival prose hits | the operative claim, with the gate's own detector quoted and its reading (`0`) |
| §4 TR "−789 gate lines" | uncontested in the record | reconciled as a dated divergence with the measured columns: `tests-visual` +10/−470 · contract rewrites +557/−134 · `mark-register.test.ts` +253 · **net +216** |

### Verify, after all four cures

`dist-demo` rebuilt FIRST (boot-graph's staleness arm). `npm run build` is NOT run —
the blocker at §6 is foreign and stands correctly refused.

```
$ npm run demo:dist:build
✓ built in 1.31s

$ npx vue-tsc --noEmit
EXIT=0

$ npx vitest run tests/components/badge.contract.test.ts
 Test Files  1 passed (1)
      Tests  7 passed (7)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 155 passed (161)
      Tests  11 failed | 1508 passed | 5 expected fail (1524)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ node scripts/regen-exports.mjs
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

The register receipt is **byte-identical** to the pre-cut baseline for the third
time. The 11 failures are the same 11 foreign rows in the same 6 files as §5, named
one by one so the parity is auditable rather than asserted: `#40 W-PAGER` ×10
(`pager-dots/contract.test.ts` ×4 · `pager-dots/morph.test.ts` ×1 ·
`gate-register.test.ts` ×3, the roster's `sourcePath missing` on #40's file move ·
`overfit-structure.test.ts` ×1, the `useLeadTrail.ts` leak · `carousel/contract.test.ts`
×1) and `#7` ×1 (`stacked-url-filter.test.ts`, BORN-RED on `PagerDots.vue:493`).

[§5 DELTA 2026-08-08: §5's battery line read `11 failed | 1507 passed (1523)`. The
cure round moves the PASSING count by exactly **+1** — the badge suite's three
class-string rows become one cascade row plus the retained one-line/glyph row — and
moves no failure, no file, and no receipt figure.]

**The dist emission was checked rather than assumed**, because the cure moves the
rungs onto arbitrary-PROPERTY utilities. `index.css:287-288` warns that
fully-arbitrary bracket utilities are rejected by the emitter's `classish` filter and
are not reliably reachable by a JIT scan; `vite.utility-emit.ts:104` is the answer
for this shape specifically (`propertySetter = /^\[--[\w-]+:[^\s]+\]$/`, added
because `classish` "shipped the readers with nothing anywhere in the cascade setting
the value" — the same seam `TooltipContent.vue:49` and `Toast.vue:131` already ride).
Note the direction of the risk: the OLD spelling put the FLOOR ITSELF on that path
(`min-w-[calc(1lh+0.5rem)]`, a value-bracket utility, in no pre-compiled list), so a
missed scan dropped the floor AND the pad. Now the box is plain CSS in `mark.css`,
shipped unconditionally, and only the rung's REQUEST rides a utility — a missed scan
falls back to the register's md defaults and the badge still has a box. Verified in
the built demo CSS:

```
[--mark-pad-inline\:--spacing\(2\)\]{--mark-pad-inline:calc(var(--spacing) * 2)}
[--mark-pad-inline\:--spacing\(3\)\]{--mark-pad-inline:calc(var(--spacing) * 3)}
…padding-inline:min(var(--mark-pad-inline), calc((var(--mark-floor) - 1ch) / 2))}
```

The library-side emission runs through the same `propertySetter` over `dist/*.js`; it
cannot be re-verified at HEAD because `dist/` cannot regenerate behind §6's foreign
blocker. Named here, not assumed away.
