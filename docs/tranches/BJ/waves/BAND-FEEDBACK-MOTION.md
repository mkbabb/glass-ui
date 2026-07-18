# BAND-FEEDBACK-MOTION — the feedback family held to the motion canon

Drafted 2026-07-17 by the lead at the ASSEMBLY orphan cure: the crosswalk
(`../formation/ASSEMBLY-CROSSWALK.md`) proved registry visual-family-9
(feedback-motion-brokenness, `REGISTRY.md:148`) plus the family-F alert straggler were named as
findings but owned by NO band — five rows (F19/F20/F21/F22/F24) that would have silently dropped
at execution. This band is their owner. The user's verdicts: toast "awful" vs the refined dialog
(F20); scroll-progress rim draws broken partial arcs (F21); the loop progress eases wrong/jitters
(F22); skeleton pulses too slow (F24); alert is neither glassy nor rounded nor idiomatic (F19).

Design authority: the iOS-27 codex (`../formation/ios27/IOS27-CODEX.md`) — law 8 (staggered
reactive entry; no bare fades) governs W1, law 12 (discrete progress as fill-pill + dots) names
W2's replacement model, laws 1/3/4 (material/rim/radius grammar) govern W4. R3b live evidence
(`../formation/round-3-live/R3B-DIGEST.md`): progress indeterminate/loop variants are the
engagement exemplar (true idle breath, 4000ms sweep) — W1-W4 REFINE that motion. Idle breath for
the INERT atoms (button/collapsed-dock/slider) is genuinely unowned — the crosswalk over-credited
`BI.W-ENGAGE-AFFORD` (sustained-engage only) — so J1 mints it as W5 here; W6 owns F33's orphaned
pager-dot refinement.

Ordering: W4 consumes `BJ.W-RADIUS-ROLE` (BAND-MATERIAL W1) + `BJ.W-BLUR-LADDER` (W2) — it runs
after both. W1-W3 have no material dependency and may run early. All live-π in this band observes
via screenshot + computed-style only — never getContext on a live canvas (the context-steal trap,
memory `feedback-livepi-context-steal`).

| W | id | charter | born-RED at HEAD |
|---|----|---------|------------------|
| 1 | `BJ.W-TOAST-DIALOG-PARITY` | Re-home Toast onto the dialog spring/transition contract | Yes — toast enter/exit diverges from the dialog springs (F20's verdict is the delta) |
| 2 | `BJ.W-PROGRESS-RIM-REPLACE` | Replace the broken-arc scroll-progress rim with the law-12 fill-pill + dots model | Yes — the rim's partial-arc geometry is the shipped state (F21) |
| 3 | `BJ.W-FEEDBACK-MOTION-TUNE` | Loop-progress easing + skeleton shimmer retuned against the motion canon | Yes — the canon values do not exist as assertions; F22/F24 verdicts stand unmeasured |
| 4 | `BJ.W-ALERT-IDIOM` | Alert consumes the radius role table + the blur ladder + the codex identity laws | Yes — no alert-specific paint assertion exists; F19's verdict is live |
| 5 | `BJ.W-IDLE-BREATH` | Idle/always-on breath for the inert atoms (buttons first · collapsed-dock pill · slider-at-rest) + the A01 hover-strengthening | Yes — the R3b table: button/collapsed-dock/slider carry ZERO idle animation, and button hover is a barely-visible 1.5% scale (A01/A11) |
| 6 | `BJ.W-PAGER-DOT-MORPH` | The pager-dot goo-morph/worm refinement over PagerDots/usePagerWorm, sequenced with the vestigial DeckPager.vue cut | Yes — no worm/goo-morph behavioral assertion exists; F33's dot-refinement half is unowned at HEAD |

## Wave 1 — `BJ.W-TOAST-DIALOG-PARITY` (F20)

The dialog is the user-named refinement bar; the toast must ride the SAME motion contract — the
shared spring tokens (`springPreset`), origin-anchored entry (codex law 5: the toast grows from
its arrival edge, not a bare fade), staggered inner content (law 8), and a matched exit. One
contract, two consumers; no toast-local easing forks survive.

Gates (born-RED): (a) a live-π REGISTER-PARITY guard (J4 — the "toast carries its own curve"
premise is stale: the reka slide-in is already retired and `Toast.vue:82-103` rides
`.glass-reveal`): assert toast's transient register (scale-from-0.5) against the dialog's
overlay/center-spring register, π baseline = the CURRENT toast — the guard pins the two registers
as the intended transient-vs-overlay parity, not a byte match; (b) paired before/after
capture: toast entry at 3 frame samples vs the dialog's, filed under the band's π dir; (c) the
overfit rule — any toast-only motion helper that survives the wave needs 2 sites or dies.

## Wave 2 — `BJ.W-PROGRESS-RIM-REPLACE` (F21)

Not a retune — a REPLACEMENT. Codex law 12 names the model the rim never achieved: discrete
progress reads as a filled pill that grows and swallows the next dot (the F49/F50 segmented
control) — instantly legible, weighty. The broken-arc rim geometry retires. Scroll-progress
(continuous) takes the same fill-pill grammar with a continuous fill fraction.

**The phantom bank, NAMED** (per `chronic:phantom-bank-landing-vehicle`, `REGISTRY.md:150`): the
rim-only branch banked at `worktree-agent-ad45af8a27c9ce531` (EXEC-STATE) is this wave's
reference corpus — harvested for its geometry lessons, then RETIRED; it does not land as-is.

Gates (born-RED): (a) a geometry assertion that no progress indicator renders a partial-arc
stroke — RED while the rim ships; (b) the fill-pill grows monotonically with value (assertable
via computed clip/width across 3 value steps); (c) paired capture at value ∈ {0, 0.5, 1} + one
dot-swallow transition frame.

## Wave 3 — `BJ.W-FEEDBACK-MOTION-TUNE` (F22 + F24)

The loop-progress easing and the skeleton shimmer measured against the motion canon and retuned.
R3b confirms the animations RUN (progress-indeterminate-sweep 4000ms; the loop bar continuous) —
the complaint is quality, not existence: the loop's ease reads mechanical/jittery, the skeleton's
pulse reads dead-slow. Wave order: (1) live-π measure the shipped periods/easings; (2) set the
canon values (the tempo/spring authorities in `src/styles/`, not component-local); (3) retune;
(4) re-capture.

Gates (born-RED): (a) canon assertions for loop period + easing function and skeleton shimmer
period — RED because no such assertions exist at HEAD; (b) the values live in the token/canon
layer, not per-component literals (grep gate); (c) paired before/after capture of one full loop
cycle (frame-sampled) for each.

**Driver re-home (J7).** The loop jitter is not a token-canon miss — it is the demo's
`setInterval(120ms)` + 3% step interrupting a 300ms fill transition (`progress.vue:22-45`): a
discrete tick fights a continuous CSS transition. The demo re-homes to a continuous eased loop
ALONGSIDE the canon-easing retune, so this wave fixes both the canon values (the loop period +
easing) AND the demo driver in one cut; the born-RED add is a driver-shape assertion (no
`setInterval` progress driver survives against the eased-loop path).

## Wave 4 — `BJ.W-ALERT-IDIOM` (F19)

Alert becomes a first-class glass citizen: card-role radius from the `BJ.W-RADIUS-ROLE` table,
material from the `BJ.W-BLUR-LADDER` rung for its role, the law-3 rim treatment (bright top rim,
quiet sides — not a uniform border), and the law-10 type ladder inside (bold title ≫ body ≫ no
mono-caption idiom). Runs AFTER Material W1/W2 land their canons.

Gates (born-RED): (a) an alert paint assertion — radius equals the card-role token, backdrop
carries the role's blur rung — RED at HEAD where alert is neither; (b) the rim asymmetry
assertion (top rim luminance > side rim); (c) capture: alert in light + dark against a busy
substrate, filed under the band's π dir.

## Wave 5 — `BJ.W-IDLE-BREATH` (A01/A11)

Idle-breath is genuinely unowned (J1 / D-A11): the crosswalk over-credited `BI.W-ENGAGE-AFFORD`
(sustained-engage only; buttons were demoted "adequate"). This wave mints the missing half — idle /
always-on breath for the inert atoms: **buttons FIRST**, the collapsed-dock pill, the slider-at-rest —
registers shimmer / pulse / specular drift, `prefers-reduced-motion`-gated, and **compositor-only by
construction** (CSS animation, no rAF) so it cannot re-inflate the BAND-PERF W2 idle budget it lives
beside. A01's hover-strengthening (the 1.5% scale reads as nothing; the affordance must read
grow/glow/lift) joins THIS wave as its interaction half — idle breath and interaction affordance are one
engagement contract, not two.

Born-RED scope = the R3b presence/absence table verbatim
(`../formation/round-3-live/R3B-DIGEST.md`, finding `engagement-idle-breath-scope`):

| axis | Progress | Substrate/section field | Slider | Button | Collapsed dock |
|------|----------|-------------------------|--------|--------|----------------|
| Idle-breath | YES | YES | **NO** | **NO** | **NO** |
| Interaction-engagement | n/a | n/a | strong (ring + spring fill) | **weak (1.5% scale)** | strong (morph) |

Only looping-progress and the live substrate/section fields satisfy the "every component always displays
engagement" edict; the atoms are inert until touched. Buttons rank highest-priority (the weakest current
signal); slider/dock/progress interaction-engagement stand as reference exemplars.

Gates (born-RED): (a) an idle-animation PRESENCE assertion per inert atom — `getAnimations()` on the
at-rest button, the collapsed-dock pill, and the slider each returns a running breath loop (RED at HEAD:
all three return zero); (b) the PRM arm — under `prefers-reduced-motion: reduce` the breath loops are
absent (no motion leaks past the gate); (c) a compositor-only gate — the breath registers add ZERO rAF
callbacks (pure CSS animation; verified by a rAF-count delta of 0 vs the pre-wave idle baseline, so the
BAND-PERF W2 idle budget is provably untouched); (d) the hover-strengthening capture — the button
hover/press reads grow/glow/lift well past the 1.5% scale (paired before/after, filed under the band's π
dir).

## Wave 6 — `BJ.W-PAGER-DOT-MORPH` (F33 dot-refinement)

F33's "dot animations need dramatic refinement" half was orphaned — the ORPHAN-cure closed F19-F24 but
never re-homed F33's dot half (J3 / Δ-F33-1), so it had NO owner. This wave owns it: the pager-dot
goo-morph/worm refinement over `src/components/pager-dots/PagerDots.vue` +
`src/components/pager-dots/composables/usePagerWorm.ts` (the active-dot elongation/goo-morph both
`DeckPager` and `CarouselPager` ride), per the standing liquid-weight edict — a goo-morph "worm" between
dot states. Same born-RED-then-π discipline as W3's loop/skeleton retune.

**Sequenced WITH the vestigial `DeckPager.vue` cut (SUPERFLUITY F33):**
`src/components/deck/DeckPager.vue:1-2` is a thin `PagerDots` wrapper; the cut lands FIRST or in the SAME
wave, and the refinement then targets the SURVIVING pager path only (`PagerDots`/`usePagerWorm`, ridden by
the CarouselPager) — no refinement work lands on a to-be-cut wrapper.

Gates (born-RED): (a) a worm/goo-morph behavioral assertion — an index change elongates the active dot and
the neighbor "worms" toward it (the shared `usePagerWorm` morph), asserted across an index step; RED at
HEAD because no such behavioral assertion exists; (b) the DeckPager.vue cut precondition — `grep -rn
'deck/DeckPager' src/ demo/` is empty (the vestigial wrapper is gone) before or with the refinement lands;
(c) paired-π of the dot morph across an index change on `/motion/deck` + `/motion/carousel`.

## Open questions

- `OPEN-FM-1` — W2 scope: does loop/indeterminate progress ALSO take the fill-pill grammar, or
  does law 12 govern only determinate/segmented? Lead lean: indeterminate keeps the sweep (its
  breath is the R3b exemplar), determinate + scroll take the pill. Decide at wave start, not in
  execution.
- `OPEN-FM-2` — W4: does Alert admit a status-tinted material (success/warn/error hue on the
  glass) or stay neutral glass + status ink only? Routed to the unified BJ ASK — it is an
  identity call.

**In-scope summary:** toast re-homed on the dialog contract (W1); the rim replaced by the law-12
fill-pill model with the phantom bank named and retired (W2); loop + skeleton retuned against
canon values that become assertions, the demo loop-driver re-homed off `setInterval` (W3); alert
made idiomatic off the material canons (W4); idle/always-on breath minted for the inert atoms
(buttons first) with the A01 hover-strengthening as its interaction half (W5); the pager-dot
goo-morph refined off the surviving `usePagerWorm` path, sequenced with the vestigial DeckPager.vue
cut (W6). The band closes the crosswalk's five orphans PLUS A01/A11 (W5) and F33's dot-refinement
half (W6) — zero silent drops.
