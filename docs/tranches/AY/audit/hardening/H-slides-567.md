# H-slides-567 — adversarial hardening of L.W1 (slides 5/6/7 close-arc rebuild)

**Lane:** RED-TEAM the til-briefing 5/6/7 cohesive rebuild (`slides` tranche L, wave L.W1).
**Verdict: GAPS-FOUND.** The wave is well-grounded and gestalt-framed, but it is UNDER-SPECCED
on the load-bearing axis it names headline (the xray-redolent rebuild has no token/composition
spec), its single-close invariant gate is checking the WRONG attribute and is therefore
defeatable, the nutrition-TRUTH "fix" is a non-fix (it ratifies the existing copy rather than
correcting it), and the cohesion + xray-redolence gates are eyeball-screenshot gates with no
machine floor — a violation of the tranche's own "the gate counts, it does not eyeball"
precept (`L.md §6`).

Source-of-truth read: the real `xray.friday.institute` poster (`/tmp/xray-poster-new.png` =
`public/xray-poster.png`), the three live slide SFCs, `deck.css`, `constellation.ts`, and the
wave spec `docs/tranches/L/waves/L.W1-close-arc-rebuild.md`.

---

## FINDINGS (source-grounded)

### F1 — HARD GATE #2 checks the WRONG attribute; the "one resolved constellation" invariant is already FALSE and the gate would pass it green
The spec's invariant 2 says "exactly one `data-resolved` constellation … `grep -c` confirms
each = 1". `grep -c data-resolved` IS 1 (only `SlideAsk.vue:39`). But `constellation.ts:91`
reads the *callout label* from `data-anomaly-label`, and that attribute = `"resolved"` on
**BOTH** `SlideHandoff.vue:15` AND `SlideAsk.vue:40`. So `constellation.ts:359` (`if
(this.resolved)`) paints the check-skin only on Ask (correct), but `this.label` (`:91`)
renders a dashed callout literally reading **"resolved"** on the Handoff slide TOO — slide 5
displays a "resolved" label while slide 7 is the designed resolution beat. Handoff's own
comment (`:13`) even claims "The RESOLVED bookend moves to the close (SlideAsk)" while `:15`
contradicts it. This is a narrative-bookend contradiction inside the exact arc L.W1 exists to
make cohere, and the spec's `grep -c data-resolved` gate is blind to it (it greps the wrong
token). The gate would certify the arc GREEN with the bookend broken.

### F2 — the xray-redolent rebuild (the HEADLINE ask) is under-specced: no token set, no composition, no measured gate
The wave names "dark + mono numbered nav (`01 HOME…06 ABOUT`) + blue text-highlight +
nutrition-facts motif" but specifies NONE of the concrete material an authoring agent needs:
- **Dark surface:** the spec says "dark surface for the framing rail" but the deck has no
  light-surface→dark-rail mechanism that isn't a `.slide--dark` force-dark (which the deck's
  own canon at `deck.css:792` calls "the ONE deliberate interruption"). Is the WHOLE slide 6
  going `.slide--dark` (contradicting the "no force-dark slides" discipline the review praises
  at SLIDES-REVIEW §3.6/§4), or only the rail? Unspecified. The current Xray is
  dark-by-composition (the portal window only). A dark RAIL on a cream slide is a new
  composition with no token or scoping rule named.
- **The site is near-black BLUISH (`~hsl(220 14% 6%)`), not the deck's warm ink.** The
  existing `--portal-window-bg: hsl(24 10% 9%)` (`deck.css:59`) is a WARM dark; the real site
  is a COOL near-black. "Redolent of the real site" with the warm-ink window token is a visible
  mismatch the spec never reconciles. No token is minted for the cool-ink rail.
- **Blue text-highlight is mis-described.** On the real site the blue is a SOLID KNOCKOUT
  HIGHLIGHT BLOCK behind the headline ("for the models" sits on a bright periwinkle
  `~hsl(218 90% 70%)` block, dark text knocked out) — NOT blue ink on text. The spec says
  "the site's blue pick-out replaces (or joins) the deck-red on the Xray beats" — that
  describes blue TEXT on the beats, which is NOT what the site does. And the deck ALREADY has
  an `--ai-blue` register (`deck.css:42-49`, `hsl(212 …)`) that is a DIFFERENT blue from the
  site's `hsl(218 90% 70%)`. The spec doesn't say whether to reuse `--ai-blue`, mint a new
  `--xray-blue`, or whether the highlight is a block or a color. Three unresolved forks on the
  single most-named visual element.
- **"nutrition-facts motif"** — the spec says "rendered as the site's nutrition-facts block,
  not prose" but gives no composition (the site's actual nutrition-label is a tabular
  facts-panel; the deck currently has only an 8px `.xray__bar` heavy-rule at `SlideXray.vue:85`
  + three prose beats). What rows? What data? This is the differentiator the review (§3.6.5)
  calls "the one portal-native idea" and it's left as a one-word gesture.
- **The headline text is WRONG in every doc.** PROMPT-CORPUS §16, L.W1, and L.md all say the
  site reads "nutrition facts for LLMs". The real site headline (poster) is **"Nutrition facts
  for the models you rely on."** with the brand sub-line "NUTRITION FACTS FOR LLMS". If an
  agent authors "nutrition facts for LLMs" as the redolent headline it will NOT match the site
  — the redolence gate (screenshot vs the site) would then fail on the agent's own copy.

### F3 — HARD GATE #3 (xray-redolent) + #1 (cohesion) + #4 (no overlap) are EYEBALL gates, violating L.md §6 "the gate counts, it does not eyeball"
Three of the six hard gates resolve to "verified by screenshot against the live site" /
"an adversarial read confirms" / "screenshot diff". There is no machine floor: no DOM-class
assertion (e.g. slide-6 root carries the dark-rail class + a `[data-xray-nav]` mono index +
the blue-highlight element + a nutrition-facts table node), no computed-style readback (the
rail bg resolves to the cool-ink token), no geometry assertion for the overlap (the resolved
canvas's masked region does not intersect the STEPS column bbox). `L.md §6` explicitly says
"Measured floor over presence check (the gate counts, it does not eyeball)" and the cardinal
lesson (MEMORY) requires a CAPTURED DELTA + paired readback, not a claim. As written, L.W1's
acceptance is an unfalsifiable "it looks like the site" — the exact failure class the precepts
forbid.

### F4 — the nutrition-label TRUTH gate is a NON-FIX (ratifies, doesn't correct)
The user's directive is "the nutrition-label claim is UNTRUE → reword to a TRUE statement"
(PROMPT-CORPUS §17: "xray's labels are real + live; the state-feed label is a GOAL").
`SlideAsk.vue:75` reads `Each monitored feed will publish a nutrition label.` HARD GATE #6
only asks that the callout "makes no present-tense existence claim (forward tense holds)" —
i.e. it accepts the existing `will publish` as-is. But "Each monitored feed WILL publish" is a
UNIVERSAL FUTURE claim about feeds that do not yet exist (zero monitored feeds at pitch), to a
skeptical auditor that is the same over-promise class the deck elsewhere scrubs ("the model is
ready", Monitoring's "as it lands"). The directive wants the truth-relation made explicit
(xray's labels exist and are live; the state-feed label is the goal). The spec's gate
ratifies the weaker reading and never requires the goal/real distinction the user asked for.
This is a CHRONIC-MISS: SLIDES-REVIEW §3.7 marked this line "Clean" in K, the user re-flagged
it, and L.W1 again defers it to a forward-tense check.

### F5 — Slide 6 has NO mono numbered nav surface and the spec doesn't say where it lives
The site's signature is the top nav `01 HOME · 02 LEADERBOARD · 03 STATISTICS · 04 LABELS ·
05 METHODOLOGY · 06 ABOUT`. The current `SlideXray.vue` window chrome is a faux-BROWSER bar
(traffic-light dots + address pill + LIVE/PREVIEW), NOT the site's nav. "Mono numbered nav"
is named in the gate but the spec never says whether it (a) replaces the browser chrome,
(b) sits in the framing rail, or (c) is rendered INSIDE the poster (it already is — the poster
IS the site, nav included). If the poster already shows the nav, "add a mono numbered nav" may
be redundant decoration duplicating what the poster paints. The spec needs to decide: is the
redolence carried by the POSTER (already showing nav + blue highlight + nutrition headline),
or re-built in the rail? Building a second nav beside a poster that already has one is the
"chrome on a repeated message" defect the review (§3.6) already flagged on the copy.

### F6 — the de-dup-URL directive is silently DONE but the spec mis-states the residual
L.md §0 and PROMPT-CORPUS §16 both carry "de-dup the duplicate 'see the live portal' (was on
both 5 and 6)". Verified: `SlideHandoff.vue` no longer carries any portal URL (the hinge is
`Next: see it run.` at `:61`, no link), and `xray.friday.institute` prints exactly once in the
template (`SlideXray.vue:119`). So the de-dup is already landed — good — but L.W1's defect
list (`§The defect`) does not state this is already-satisfied, so an agent may re-hunt a
non-existent duplicate. Minor, but the spec should mark it DONE-IN-K not re-open it.

### F7 — the STEPS-cull decision is DEFERRED to L.W4 inside a wave whose gate depends on it
L.W1 §"Slide 7" says "cull the orphaned STEPS scaffolding … OR restore a value-prop-backed
`02` (decision deferred to L.W4 / OQ21)". But HARD GATE #4 (no constellation overlap) and the
review's "Watch" (§3.7) both turn on whether STEPS is one item (the column floats, the resolved
overlay drifts into dead space) or two. You cannot fix the overlap (gate #4) without settling
the STEPS count, yet the count is deferred to a LATER wave. The wave's own gate is gated on a
decision the wave declines to make. Either pull OQ21 into L.W1 or drop gate #4 from L.W1.

### F8 — `data-slide` stale-metadata is in-scope-by-edit but un-named
L.W1 rewrites all three SFC bodies. `SlideHandoff.vue:9` carries `data-slide="10"` (no slide
10 exists; it is position 5). Xray/Ask use semantic `data-slide` (`"xray"`/`"conclusion"`).
SLIDES-REVIEW §8.3 confirms `data-slide` is read by nothing (cosmetic), but it is "exactly the
leftover-scaffolding tell the rename pass was meant to scrub" sitting in a file L.W1 edits. A
ground-up rebuild of these three SFCs that leaves `data-slide="10"` is not a ground-up
rebuild. Name it in the fix-if-touching set.

---

## CHRONIC-MISSES (deferred across ≥2 passes)
- **Nutrition-label truth** (F4): user-flagged → K marked "Clean" (forward-tense) → L.W1 again
  reduces it to a forward-tense check rather than the goal/real distinction the user named.
- **The resolved/anomaly-label bookend** (F1): the Handoff "resolved" label has survived the
  whole K single-close restructure (Handoff comment claims it moved, the attribute didn't),
  and L.W1's gate greps the wrong token, so it would carry forward again.
- **Eyeball gates on a visual rebuild** (F3): the redolence/cohesion acceptance has been a
  screenshot-claim across F→G→H→K; L.W1 repeats it despite L.md §6 demanding a measured floor.

---

## FOLD-INTO (routing)
- F1, F8 → **L.W1** (in-scope SFC edits; the bookend + stale-metadata are part of the rebuild).
- F2, F5 → **L.W1** (the xray-redolent spec MUST be authored before execution — net-new spec
  detail folded into L.W1's "Slide 6" section: the token set + composition + the
  block-vs-color blue decision + the nav-source decision).
- F3 → **L.W1 + L.W4** (machine-floor gate authored into L.W1; the rendered-DOM gate harness
  is L.W4's gate-coverage wave — extend it to assert slide-6 redolence DOM, not just CTA regex).
- F4 → **L.W1** (truth-correct the copy, not a tense check) with the audience-decision touching
  **L.W2** (the over-claim P0 pass).
- F6 → **L.W1** (mark DONE-IN-K, do not re-open).
- F7 → pull **OQ21** decision into **L.W1** (it is a gate-#4 precondition).

---

## CONVERGENCE CRITERIA (what "perfected" concretely means for this lane)
The 4→5→6→7 close arc is "perfected" when ALL hold, each MACHINE-CHECKED (not eyeballed):
1. **One resolution beat, machine-proven.** `data-anomaly-label="resolved"` appears exactly
   once across the seven SFCs (Ask), AND `data-resolved` exactly once (Ask). Handoff's anomaly
   carries a NON-resolved label (or none). `grep -c` on BOTH attributes = 1.
2. **Slide 6 is provably xray-redolent by DOM + computed-style readback**, not screenshot
   alone: the slide carries (a) a cool-ink dark rail/surface whose computed bg resolves to the
   minted cool-ink token (NOT the warm `--portal-window-bg`), (b) a mono numbered-nav element
   with the exact `01…06` index OR an explicit recorded decision that the poster carries it,
   (c) a blue-highlight element whose blue matches a single recorded token (the
   block-vs-color + which-blue fork resolved), (d) a nutrition-facts table node (rows
   specified). A Playwright readback asserts each; a captured screenshot is the DELTA artefact
   PAIRED with the readback (cardinal lesson).
3. **No restatement across 5/6/7** (the cohesion bar): no clause appears verbatim on two of
   the three slides — checked by the L.W4 rendered-DOM gate, not an adversarial read.
4. **The nutrition-label copy states the truth-relation** (xray's labels are real+live; the
   state-feed label is the goal) — no universal-future existence claim about non-existent feeds.
5. **No geometry overlap**: the resolved canvas's painted (un-masked) region does not intersect
   the STEPS column bounding box at the target resolution — asserted by a bbox readback, and
   this requires the STEPS-count (OQ21) settled IN L.W1.
6. **No new spaced em dashes** over the edited files (this one IS already machine-checkable —
   keep it).

---

## waveSpecInputs (concrete material the fully-authored L.W1 spec needs)

1. **DEFECT (F1):** `SlideHandoff.vue:15` `data-anomaly-label="resolved"` makes slide 5 render
   a "resolved" callout while `SlideAsk.vue:40` is the designed resolution beat; the Handoff
   comment `:13` claims the bookend moved but the attribute didn't. **EDIT-SITE:**
   `SlideHandoff.vue:14-15` (drop the resolved label, or give the in-progress anomaly a
   neutral/anomaly label consistent with the cover's `data-anomaly-label="anomaly"`).
   **HARD GATE (evidence-backed):** `grep -c 'data-anomaly-label="resolved"' src/decks/til-briefing/slides/*.vue`
   = 1 AND `grep -c 'data-resolved' …` = 1.

2. **DEFECT/OBJECTIVE (F2,F5):** the xray-redolent rebuild has no concrete spec. **AUTHOR INTO
   L.W1 §Slide 6:** (a) MINT a cool-ink token (e.g. `--xray-ink: hsl(220 14% 6%)`) distinct
   from the warm `--portal-window-bg` (`deck.css:59`), recorded in `deck.css §portal` block;
   (b) DECIDE block-vs-color for the blue highlight and which blue — RECORD as `--xray-blue`
   (the site's `~hsl(218 90% 70%)` knockout block) vs reuse `--ai-blue` (`deck.css:42`); the
   site uses a SOLID KNOCKOUT BLOCK, not blue ink; (c) DECIDE nav-source: poster-carried vs
   rail-rebuilt mono `01 HOME…06 ABOUT`; (d) SPECIFY the nutrition-facts block rows (the
   published-label-per-feed: sources / cadence / reviewer / confidence). **FILES:**
   `SlideXray.vue` (template + scoped style), `src/styles/deck.css` (the cool-ink + xray-blue
   tokens). **HARD GATE:** the four DOM/computed-style assertions in Convergence #2.

3. **DEFECT (F2 copy):** every doc says the site reads "nutrition facts for LLMs"; the real
   headline (poster `/tmp/xray-poster-new.png`) is **"Nutrition facts for the models you rely
   on."** **EDIT-SITE:** correct PROMPT-CORPUS §16, L.md, L.W1 to the real headline before any
   redolent copy is authored. **HARD GATE:** the redolent headline string matches the live site.

4. **DEFECT (F3):** three of six hard gates are eyeball/screenshot only, violating L.md §6.
   **OBJECTIVE:** replace gates #1/#3/#4 with machine readbacks (Convergence #2/#3/#5).
   **EDIT-SITE:** the gate harness — fold the slide-6 redolence DOM assertions into the L.W4
   rendered-DOM gate (the same harness that learns to grep rendered text for the CTA defect).
   **HARD GATE:** a Playwright/JSDOM readback asserts the dark-rail token, the nav index, the
   blue-highlight token, the nutrition-facts node, and the no-overlap bbox — each captured as a
   PAIRED screenshot+readback DELTA.

5. **DEFECT (F4):** `SlideAsk.vue:75` `Each monitored feed will publish a nutrition label.` is
   a universal-future existence claim about zero-existent feeds. **OBJECTIVE:** reword to the
   truth-relation the user named (xray's labels are real+live; the state-feed label is the
   goal). **EDIT-SITE:** `SlideAsk.vue:75` (+ the `.cta__fold` framing `:60-76`). **HARD GATE:**
   the callout names xray's labels as existing/live AND the state-feed label as a goal — no
   universal-future "each feed will" claim; verified by the L.W4 rendered-text gate's
   over-claim rule.

6. **DEFECT (F7):** L.W1 gate #4 (overlap) depends on the STEPS-count decision (OQ21) that
   L.W1 defers to L.W4. **OBJECTIVE:** pull OQ21 into L.W1 (single titled callout vs restored
   `02`). **EDIT-SITE:** `SlideAsk.vue:24-30` (STEPS array), `:81-89` (the `v-for`),
   `:211-216`/`:276-278` (the dead `.next__item::after` spine CSS). **HARD GATE:** if single
   item, the `01` numeral + `v-for` + spine CSS are removed (a lone `01` does not render); the
   resolved canvas does not overlap the now-settled column (bbox readback).

7. **DEFECT (F8):** `SlideHandoff.vue:9` `data-slide="10"` is stale. **EDIT-SITE:** make it
   semantic (`data-slide="handoff"`) matching Xray/Ask. **HARD GATE:** no numeric `data-slide`
   survives a ground-up rebuild of the three SFCs.
