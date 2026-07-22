# GESTALT-1 — B-visual sweep #1 (pass TWO of the twice-challenged law)

**Seat:** Fable GESTALT auditor B-visual · **model:** `claude-opus-4-8` · **date:** 2026-07-21
**Lens:** feature + visual. I own the browser seat (chrome-devtools MCP, singleton). Every wave
presumed suboptimal until a capture or computed-style figure shows otherwise. Live localhost demo
served on `:5199` at HEAD `6bfd71fe`; every claim below rides a screenshot or an rAF/computed-style
DELTA under `…/scratchpad/caps/` — never `getContext`.

**Surfaces walked (12 routes, all console-clean):** `/` · `/motion/deck` · `/navigation/pager-dots`
· `/display/atoms` (Status dot family) · `/dock/overview` · `/dock/layers` · `/containers/command`
· `/containers/combobox` (→404) · `/dock/liquid-morph` (→404) · `/substrates/aurora` · `/forms/inputs`.

**Headline verdict:** no visual DEFECT among the ten, and no visual SUBOPTIMAL — the felt layer is
genuinely at-bar. The worm morphs with real weight on BOTH the deck and the pager (captured neck
elongation → clamp → overshoot → reunion). The dock spring arrives with a true underdamped overshoot
(`--dock-morph-t` peaks 1.011, settles to 1.000), not a mechanical tick. The absorbed pulse breathes
on `active`, opts down on `motion=off`, and goes quiet-static under PRM. No deleted family leaves a
corpse — every retired path resolves to the semantic 404, every surviving route paints whole. The
dissonances that survive are two low-severity liquid-weight/polish seams and one model-tier
transparency note; plus a visual corroboration of A-tranche INC-1 (the feedback cluster is a
single-consumer split, and it renders perfectly — the concern is colocation hygiene, not paint).

---

## §1 Per-wave verdict table

| # | Wave (commit) | Visual surface + what was captured | Verdict |
|---|---|---|---|
| 1 | GATES W3 static-hygiene (`26868000`) | No direct visual surface (test-gate authoring). Verified INDIRECTLY: every surface the three gates fence (token-hygiene, orphan-CSS, radius longhands) renders clean across the 12-route walk — no regression the gates would have caught slipped visually. | **OPTIMAL** (no visual surface; verified by absence of regression) |
| 2 | GATES W2 pixel floor + CI split (`260c66fc`+`8c05f925`) | No direct visual surface (CI instrument). The floored substrates paint: `/substrates/aurora` mounts a live canvas and paints whole, `/` paints the chromatic aurora ellipse — the pixel-floor's subjects are alive, not black. | **OPTIMAL** (no visual surface; floored subjects paint) |
| 3 | FINAL W-1 spring registers (`e374b3ad`) | `/dock/overview`. Recorded the collapse→expand morph frame-by-frame: `--dock-morph-t` runs a clean S-curve 0.038→0.60→0.928→1.002 over ~232ms, then OVERSHOOTS to **1.011** and settles 1.011→1.000. That overshoot is the arrival weight; `--spring-dock` is a real generated `linear()` register. No mechanical tick. | **OPTIMAL** (captured underdamped overshoot = arrival weight) |
| 4 | PERF W1 boot diet (`5b34bb12`) | `/` + all 12 routes. Front door boots + paints WHOLE: hero, aurora ellipse (eager wash paints), blob mascot, bento grid, both docks. Zero console errors on any route; no missing-chunk / blank-white artifacts. Bento preview panels are intentional CSS-tinted DIVs (no canvas/img to fail), not unpainted tiles. | **OPTIMAL** (boots + paints whole, no chunk corpses) |
| 5 | DOC-TRUTH sweep (`6bcd4c61`) | No direct visual surface (prose/comment truth-up). Verified INDIRECTLY: the surfaces whose spring/motion prose it re-trued render with those exact values live (dock register, StatusDot motion axis). | **OPTIMAL** (no visual surface; trued values render true) |
| 6 | REDUCTION W3 + pulse→StatusDot (`bda718ac`) | `/display/atoms` → Status dot. The pulse absorbed as a `.feedback-mark` child: `active·full` breathes (`feedback-mark-pulse @1.8s` on `[data-motion]::after`), `active·off` is dead-still (0 anims), sm/md/lg all pulse, PRM → `animation:none; scale:1; opacity:.28` (quiet static orbit, source-confirmed `FeedbackMark.vue:150`), forced-colors legible. No pulse corpse. | **OPTIMAL** (absorbed pulse breathes / opts down / honors PRM) |
| 7 | COLOCATION W1 (`7d0c77ac`) | Cross-route. No visual corpse from the aurora/chip moves or the `_shared` carve — moved surfaces render, no broken imports anywhere in the walk. The single-consumer `_shared/feedback` shape it enshrined renders perfectly (see V-INC-1 — a hygiene item, not paint). | **OPTIMAL** (visual; V-INC-1 is code-side) |
| 8 | REDUCTION W8 DeckPager cut (`85089b3b`) | `/motion/deck` + `/navigation/pager-dots`. ONE goo engine per surface (single `pager-worm-filter-v-*`, one worm layer, one bed layer). The worm crawls with weight on BOTH: deck jump 1→4 held a 36px neck-clamp t196–446 with body overshoot then reunion; pager boundary 6→8 elongated to 34px, leading body overshot to x821 then settled to 818. Deck warm-field restored (warm field behind the stage, not flat taupe). No DeckPager corpse — the deck pages via PagerDots. | **OPTIMAL** (one engine, worm weight on both surfaces) |
| 9 | FM W6 goo-morph signature (`01310c9c`) | `/motion/deck`. The signature is FELT: neck flips `opacity 0→1` and never returns to 0 mid-transit (connective existence), elongates to a 36px clamp held ~250ms, bodies squish (h 13→11→13 = liquid weight), leading body overshoots then the pair reunites (neck 36→7, bodies converge to 7px). 4× zoom shows the `feGaussianBlur+feColorMatrix` capsule fusing two dots into one liquid peanut. | **OPTIMAL** (worm signature present + felt) |
| 10 | A11Y W2 linkage (`e369be7b`) | `/dock/layers` + `/forms/inputs`. Accessibility tree reads correctly: 9 `aria-labelledby` + 9 `aria-controls` all resolve (0 dangling, 0 duplicate ids), the switcher rail exposes proper `tab`/`tabpanel` with a selected tab + matching labelled panel, 25/25 form inputs accessibly named (0 dangling). The INC-8c `idSafe` collision is LATENT — 0 duplicate ids on the real surfaces. | **OPTIMAL** (a11y tree resolves end-to-end) |

---

## §2 Incongruity register

Each row: what is dissonant — why it matters — the DISPOSITION.

### V-INC-1 · The absorbed pulse renders perfectly, and it is a single-consumer split (visual corroboration of A-tranche INC-1)
**Dissonant.** DOM inspection at `/display/atoms` confirms StatusDot's ONLY child is `.feedback-mark`,
and `FeedbackMark.vue` carries the ENTIRE liveness axis the wave demonstrates — the `feedback-mark-pulse`
keyframe, the `[data-motion]::after` breath, the `prefers-reduced-motion` quiet-orbit arm, the
`forced-colors` mapping. So the abstraction that still lives in `_shared/feedback/` has exactly one
consumer. The PAINT is optimal; this is purely where the file sleeps.
**Why it matters.** It is the same single-consumer shape COLO W3's own hygiene fence exists to police,
and the KISS oath prefers the cure that deletes an abstraction. My visual pass adds the ground truth A
lacked from code alone: the merge is visually complete, so nothing blocks the move.
**Disposition (routed row — same owner as A INC-1).** REDUCTION's next touch or a COLO W1 tail: move
`FeedbackMark.vue` + `feedback.ts` into `src/components/status-dot/` (or inline FeedbackMark into
StatusDot.vue — the fuller KISS cure), leave `feedback-tone.css` in `_shared/`, prove with the
hash-normalized dist identity W-COLO-1 precedented. If declined, record the decline in
`BAND-REDUCTION.md` W6 §Status so the silence stops being silent.

### V-INC-2 · The collapsed-dock hover-scale releases to 1.0 at expand-start — a micro-seam against the "one continuous spring" claim
**Dissonant.** On the collapsed pill, hover scales it 56→61.6px (~1.1×) and holds ~50ms; then at
expand-start the scale RESETS to 56px in one frame (t2980→2998: 61.6→56) as `--dock-morph-t` takes over
the width. The page's own copy says "the collapsed pill scales up on hover on the same `--spring-dock`
vocabulary… so hover-to-expand reads as one continuous spring." The captured curve shows a brief
scale-back-to-1.0 seam at the exact handoff, not a continuous scale→width blend. It reads continuous at
speed and is plausibly the intended hint→commit handoff — but on close inspection it is a ~1-2 frame
contraction that nicks the "one continuous spring" promise.
**Why it matters.** Liquid-weight binds every motion surface, and the dock is the tranche's headline
primitive; the copy makes the continuity an explicit contract, so a visible discontinuity there is a
contract nick.
**Disposition (lead/owner question, one sentence).** Is the collapsed-pill hover-scale meant to release
to 1.0 as the expand begins, or should the hover-scale carry continuously into the first width-morph
frames so the silhouette never contracts? Owner: the dock spring owner (GF-DOCK / FINAL W-1's consumer),
low severity, owner-reversible.

### V-INC-3 · Front-door section-preview panels read as half-loaded placeholders (adjacent to the ten, not a wave regression)
**Dissonant.** The bento cards on `/` render `.section-preview-card-preview` as flat dark-tinted DIVs
with no vignette, still, or icon inside. They are intentionally styled (not blank tiles, not a boot-diet
chunk failure — PERF W1's "paints whole" claim HOLDS), but against the rich chromatic hero they read at
a glance like loading placeholders rather than idiom-true section previews.
**Why it matters.** The front door is the boot-diet wave's showcase surface and the demo's first
impression; flat dark panels undersell it. This is design polish, NOT a defect in any of the ten waves —
flagged because my lens walks the nav and the seam is on the same surface PERF W1 owns.
**Disposition (owner question — out of ten-wave scope).** Should the section-preview panels carry a
light idiom-true frozen-still (per the manifest's tile ladder) so the front door doesn't read as
half-loaded? Owner: demo chassis (SectionPreviewCard), not a BJ wave — record only if the owner wants it.

### V-INC-4 · This audit seat is model-labeled "Fable" but runs as Opus (tier-declaration transparency)
**Dissonant.** The seat prompt names me "Fable GESTALT auditor B-visual," and the model-split law files
audit/critique/paint-taste under the Fable tier — but my system context reports `claude-opus-4-8`, and I
report it honestly per the instruction. A gestalt paint-taste challenge on Opus is defensible as
mechanical fanout (I grounded every verdict in a capture or computed-style DELTA, not free taste), and
the owner's "fanout = Opus, not Fable" order may intend exactly this — but the label/tier mismatch is the
class the model-enforcement law exists to surface, so I surface it rather than let it pass silent.
**Disposition (lead confirm-intent, one sentence).** Confirm the browser/paint-taste GESTALT sweep is
intended to run at the Opus tier (mechanical capture-grounded fanout), or re-dispatch it to Fable if the
audit=Fable law governs; either way the findings above stand on their captured evidence. Owner:
orchestrator, low priority.

---

## §3 Standing-law visual spot-audit (cross-wave)

- **Live-π = captured DELTA, screenshot/computed-style only, never getContext:** honored throughout —
  every motion claim is an rAF geometry timeline or a computed `--dock-morph-t`/`animation` read; the one
  canvas surface (`/substrates/aurora`) was verified by `querySelector('canvas')` existence + paint, never
  by stealing its context (the context-steal trap).
- **Liquid-weight + breath-of-life:** confirmed felt, not asserted — the worm carries elongation +
  overshoot + reunion on both surfaces, the dock morph carries a true underdamped overshoot, the StatusDot
  `active` breathes. The one nick is V-INC-2 (hover-scale seam).
- **No deleted-family corpses:** every retired path (`/containers/combobox`, `/dock/liquid-morph`)
  resolves to the semantic 404 with a Browse-stories escape; the fold target `/containers/command` renders
  whole; no surviving route throws a broken-import console error across the 12-route walk.
- **PRM / motion opt-down honored:** StatusDot `active·off` is dead-still, PRM collapses the pulse to a
  quiet static orbit (source-confirmed), forced-colors keeps every state legible.
- **Band file + fresh census win:** the pager keeps its active indicator CENTERED and scrolls the bed
  (iOS-idiom windowing), so mid-range steps show no worm crawl and only boundary steps do — correct
  behavior, not a dissonance; the deck (fixed dots) shows the full crawl every step.
