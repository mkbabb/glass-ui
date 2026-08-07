# CURE-ORDER #46 GF-TIMELINE — driver-ratified residue of the Φ5 adjudication (2026-08-07)

Adjudicator (Fable, quartet seat, completed) ruled CURE-REQUIRED at HEAD `253b0f17`; the
driver ratifies the residue below verbatim as the cure order. What STANDS: the selection,
the 5→1 collapse (2,282 → 932 lines, 6 SFCs deleted), the G-RELAY walk (3 hits, all
corrected comments), tokens 14+2 → one (`--timeline-track-h`), `springPreset("dock")` by
name, the byte-identical register receipt (violations:1 provably the foreign #40
deletion), vue-tsc 0, row-own suites 33/33, the full battery's 11 failures all foreign by
provenance, and the genuine paint capture.

## Cures

- **C1 (HIGH, disqualifying alone):** the PRM settle release is structurally dead —
  `useSpring.ts:134-139`'s snap path assigns `isSettled` true-over-true, so the
  change-watch at `Timeline.vue:117-126` never fires while `onValue` still stretches the
  flex and sets crossing; the cap parks stretched and `data-crossing` latches forever —
  verbatim the failure the SFC's own comment at `:81-83` declares the release MANDATORY to
  prevent. The test at `timeline.contract.test.ts:109-117` asserts only source text.
  Cure: release on any settled state (watch `[travel.value.value, travel.isSettled.value]`,
  run `flex.squish(0)` + `crossing = null` when settled); upgrade the case to a BEHAVIORAL
  assert that REDS on current code (born-RED); re-verify `--stretch` returns to 1 and
  `data-crossing` clears under `reducedMotion: reduce`.
- **C2 (MEDIUM):** the coarse 44px floor is dead — scoped `.tl__mark[data-v-*]` (0,2,0)
  out-specifies `[data-control-target]` (0,1,0) on identical min-size properties; the
  comments at `Timeline.vue:416-418`/`:532-535` are false in paint. Cure: a
  component-level `pointer: coarse` arm reading `--touch-target` (or de-specify the 1.5rem
  fine floor) — or rule 24px intended, drop the attribute, and rewrite both comments. The
  390×844-coarse PAINT cell rides the row's π (routed #10 π-SUITE); prove the fix in
  emitted-CSS/unit terms this cut.
- **C3 (MEDIUM):** `role=progressbar` at `Timeline.vue:278` has no accessible name and
  `TimelineProps` offers none (axe `aria-progressbar-name` serious). Cure:
  `TimelineProps.label` → `aria-label` on the track + a mounted accessible-name assert.
- **C4 (MEDIUM):** 8.0.0 breaks unbooked — `MIGRATION.md` §8.0.0 (`CHANGELOG.md:3` bills
  it "the complete break list") has no timeline entry and `MIGRATION.md:564` still lists
  the deleted `TimelineSegmentGradient` as live. Cure: book the GlassTimeline→Timeline
  runtime rename, the type deletion, and the removed/added token table row (`abb1eba2`
  precedent); mark `:564`'s row removed-8.0.0.
- **C5 (LOW):** amend RECORD.md §6 with divergence #7 — translateX+overflow-hidden vs
  TR's `useAnisotropicExtent` clip-path clause, ground `NOVELTIES.md:46` (minted once at
  #67 W-2, 0 on disk, consume-never-remint — unexecutable as written); route Timeline's
  adoption question to #67 W-2's consumer walk; fix the "named in §5" self-reference at
  `RECORD.md:9`.

## Low riders (same cut)

- `onMarkLeave` `emit(hover, null)` outside its guard (`Timeline.vue:261-264`).
- Write-only `data-crossing` attribute (`:317`) — bind or delete.
- Comment arithmetic `:494-495`: 0.05+0.12=0.17 (0.16 is `--ink-edge`); the same false
  "=0.16" at `color-radius.css:122` — fix or route to #61.
- `DESIGN.md:248` stale `--timeline-dot-fill`/`--timeline-dot-stroke` forward reference
  (dated strike).
- Record nits: ContinuousMarkers 440 not 436; Timeline.vue 689 not 690; §5 photometry
  figures labelled light-mode (dark: fill-vs-groove 223.24, adjacent 112.33).

## Driver notes (binding at commit time, not the cure seat's)

- Re-run `npm run demo:dist:build` immediately before commit (boot-graph freshness arm);
  never `npm run build` (RT-39D foreign blocker).
- Re-read `git diff` before staging — live mutation-testing bytes were observed in the
  shared tree.
- `scale-paper.css` hunk `@@ -29,30` is the foreign #32/#71 eyeglass lane's; only
  `@@ -286,64` (§16) is #46's.

## Standing routes carried (correctly booked in RECORD §7)

Full π battery incl. real-Safari cells → #10 π-SUITE; speedtest consumer edits → its own
tranche; grabbed-thumb transport → #37 RETIRED-UNBUILT (stated temporary regression on
fourier-field); `Progress.vue:138` → W-SLIDER-PROGRESS; `.sr-only` → #31; SHA re-pin →
C-9 at band close; DESIGN.md library sweep → #61; aggregate-denominator ruling → OWNER
(pinned by T-PART-2).
