# REFABLE-RU-20 — R3-LIVE browser verification redo (paint + perf/engagement baselines)

- **Unit:** RU-20 (P2). Members redone: `ae10b02586d226484` (R3A paint lens), `af9908b72f7650eb9`
  (R3B perf/engagement lens). Artifacts: `../round-3-live/R3A-DIGEST.md`, `R3B-DIGEST.md`.
- **Edict (verbatim intent):** re-run the live verification of the 5 carried defect claims
  (chip-CSS orphan, F02 blank cards, F06 transition flash, V-A95 aurora black slab, dock material
  truth) + the perf DEV-baselines (/, /foundations, blob cold route) + the A01/A11 engagement
  sample (/forms/slider, /feedback/progress, /dock/overview, one button-heavy page).
- **Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
  claude-fable-5").
- **Step-2 boundary:** 2026-07-20 — the ANEW pass (all A1–A5 paint probes, both boot traces, the
  blob rAF-gap route probe, all four engagement interactions, `ANEW-readbacks.json`) ran against
  the CURRENT tree with both digests UNREAD; only the two seats' opening edicts were extracted
  from their transcripts (first user message only). The digests were then read assume-incorrect
  and every claim re-proven by targeted probe (on-disk import grep, remove-button readback,
  /display tile ladder, saved-trace RunTask parses, `getAnimations` sweeps, root-landing capture).
- **Instrument:** Chrome via chrome-devtools MCP (trusted CDP hover/keys for :hover/keyboard),
  dev server `127.0.0.1:5199` (vite 8.1.5), 1440×900, dark mode, live WebGPU
  (`WebGPU · apple · metal-3` page badge). Browser-seat singleton honored — sole browser seat.
- **Captures (session scratchpad, cited by path, never in the repo):**
  `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/scratchpad/ru20/`
  — A1-chip-page.png + A1-chip-selectable-ON.png (the identical pair IS the no-paint delta),
  A2-foundations-{immediate,after-2.5s,scrolled}.png, A3-dock-{landing,rail-immediate,overview-immediate}.png,
  A4-aurora-{baseline,stage-inview,after-drag1,after-drag2-reverse,after-rapid-reverse-drags,after-sweep}.png,
  A5-dock-overview-trays.png, B1-{root-boot,blob-after-cold-route}.png,
  B2-{slider-rest,slider-moved,progress-rest,dock-hover-mid-expand,buttons-rest,buttons-hover-primary}.png,
  S-display-tile-ladder.png, ANEW-readbacks.json (paired figures),
  trace-{root,blob}.json.json.gz (parsed).
- **The opus captures in `../round-3-live/` stay valid as instrument evidence** (charter ruling);
  this redo adds an independent second-instrument set, it does not replace them.

## The ANEW layer (current tree, digests unread)

1. **Chip:** 9 `.glass-chip` on /forms/chip; **0 CSS rules target `glass-chip` in any loaded
   stylesheet**; base lozenge painted entirely by `.glass-capsule` (oklab bg ≈0.9 alpha, inset
   rims); `--chip-flood-t` unset, `::after` none; selectable toggle flips `aria-pressed` +
   `data-state="on"` with **byte-identical background and class list** — zero painted selection.
2. **/foundations:** preview tiles render as blank slabs with the label duplicated beneath;
   unchanged at +2.5s and after scroll; DOM shows the tile is
   `.section-preview-card-tile.section-preview-card-identity` — a deliberate typographic identity
   rung, not a failed mount.
3. **Dock chain / → rail → overview:** immediate post-commit captures fully painted, zero
   console errors/warnings across the chain.
4. **Aurora (live WebGPU):** right→left drag, the reverse, two rapid reverse-drag pairs, then a
   40-step no-button sweep — the field visibly recomposes after every gesture, **no black slab
   ever**, renderer stays live. No `getContext` call was ever made on the live canvas
   (context-steal law).
5. **Dock material:** all 14 `.glass-dock` roots transparent (`rgba(0,0,0,0)`, no backdrop);
   material rides the absolute `.dock-plate` child — `color(srgb …/0.56)` +
   `backdrop-filter: blur(7px) saturate(1.3) brightness(1.14)`; trays visibly painted.
6. **Perf (DEV-baseline):** LCP root 417–418ms / foundations 426ms / blob 542ms, all
   render-delay-dominated (~99%), CLS 0.00; blob cold-route rAF probe: ONE 64ms long frame at
   t≈78ms, 289/290 frames fluid over 3s.
7. **Engagement:** slider fill `.glass-liquid-fill` animates on a 0.3s damped-spring `linear()`
   (overshoot to 1.22); progress +10 animates the fill (42→52 mid-flight captured); dock
   56px pill → 221px four-control tray under trusted hover; primary button hover = scale 1.015 +
   slight bg darken. Synthetic PointerEvents do NOT drive the reka-ui slider; CDP keyboard does.

## Verdict table

### OPUS-WRONG

None. Zero material errors survived scrutiny in either digest — every checkable figure
replicated on the second instrument (many byte-identically: 28 progressbars, 2×4000ms
indeterminate sweeps, 9 idle animations, scale 1.015, remove-button ~10×23px radius-0 block,
plate alpha 0.56, 14 docks, ~40k/~52k RunTasks, the 2-long-task boot signature, the blob
ForcedReflow insight).

### RATIFIED (16 claims)

| # | claim | second-instrument proof |
|---|---|---|
| R3A-1 | chip-css-orphan CONFIRMED-DEFECT (major) | On disk: `src/styles/glass/glass-chip.css` EXISTS with the selectable-ON flood + remove rules, `glass.css` never @imports it, `grep -rln glass-chip.css src demo` → zero importers. Live: 0 rules, flood-t unset, ::after none, selectable-ON zero paint delta, remove = display:block 9.9×23 radius-0. Captures A1-*, readbacks in ANEW-readbacks.json |
| R3A-2 | F02 blank cards = identity-fallback rung, DRIFT-EXPLAINED / CLEARED | Identity tile class confirmed in DOM; static at +2.5s/scroll; /display ladder proves the authored rung renders where authored (Buttons tile = real Primary/Default/Quiet; Card = skeleton mock; Surface/Badge/Atoms = identity). S-display-tile-ladder.png, A2-* |
| R3A-3 | F06 no white flash; cold ~186ms one-time stall, warm 32–52ms hitch | Immediate post-commit captures fully painted, console clean; my warm-route instrument reads a single 64ms gap — same order. Verdict stands (see N1 method caveat). A3-* |
| R3A-4 | V-A95 CLEARED on live WebGPU; original claim likely context-steal artifact | Not reproduced across 4 gesture variants incl. the exact two-rapid-reverse repro; sweep residual healthy (field recomposes visibly). Consistent with the standing live-π context-steal trap. A4-* (6 captures) |
| R3A-5 | dock material on `.dock-plate` child, trays paint — architecture, not a bug | Readback figures match to the third decimal (0.56 alpha, blur 7px, saturate 1.3, brightness 1.14; root fully transparent; children [dock-plate, dock-controls] ×14). A5-, A3-dock-overview-immediate.png |
| R3B-1 | LCP DEV-baselines 391/405/488, CLS 0, clean boot | Mine 417/426/542 (+5–10% session noise), CLS 0.00, render-delay ~99% — magnitudes and structure ratified as DEV-baseline |
| R3B-2 | 2-boot-long-task signature, ~208–210ms light / 283ms blob | Trace parse: root exactly 2 (129.9+89.4=219ms), blob exactly 2 (176.1+134.4=310ms). Signature exact, magnitudes within noise |
| R3B-3 | idle main-thread churn ~40k RunTasks light / ~52k blob; blob ForcedReflow (major) | Root 40,426 / blob 52,871 RunTasks (theirs 39,823/52,225); blob trace re-trips ForcedReflow + CLSCulprits. The dominant-idle-cost framing holds |
| R3B-4 | route-transition into blob: single ~83–119ms freeze then fluid; CLS 0.04 | Freeze ratified (my instrument: one 64ms gap, then 5–12ms class gaps). The 0.04 transition-CLS rests on their NO_NAVIGATION trace — unreplicated here, unrefuted, kept PLAUSIBLE on their capture |
| R3B-5 | dock strongly engaged (hover-to-expand morph) | 56px collapsed pill → 221px 4-control tray under trusted CDP hover. B2-dock-hover-mid-expand.png |
| R3B-6 | progress has true always-on breath | getAnimations: 9 running incl. 2× `progress-indeterminate-sweep@4000ms`; 28 progressbars — figures identical |
| R3B-7 | slider engages on interaction, no idle breath | Keyboard 42→44 grows the fill 541→567px with live label; rest state runs zero animations |
| R3B-8 | buttons the weak link: hover 1.5% scale, no idle breath (major) | Hover scale exactly 1.015 (+ slight bg darken, rim brighten — still modest); plain buttons at rest run zero animations. Design verdict CONCURRED by this Fable seat: the delta under-reads at arm's length; ENGAGE-AFFORD scope stands |
| R3B-9 | idle-breath scope: only looping progress + live fields breathe; atoms inert (major) | Buttons-page idle animations = scroll-edge fades + one `feedback-mark-pulse` (a state indicator, not idle breath); slider/button/collapsed-pill rest = zero. Table ratified |
| R3B-10 | slider a11y node not hittable; synthetic pointers no-op; keyboard works | Independently hit all three: click/hover on `role=slider` uid timed out; synthetic pointerdown/move left value unchanged; CDP ArrowRight moved it. Strongest ratification in the set |
| R3B-11 | root landing: blank bento previews + detached yellow goo-blob right of hero | Both reproduce in B1-root-boot.png (blob at top-right, mid-air, no container) |

### FABLE-NEW

| # | finding | routing |
|---|---|---|
| N1 | **F06 sampler blind spot:** the opus white-flash detector read only `documentElement`/`body` backgroundColor per rAF — blind to compositor-level white frames from swapped-in elements. The CLEARED verdict survives only because full-frame captures (theirs and mine) corroborate it; the method alone cannot prove a no-flash claim. | Method note for BAND-GATES / any future transition-paint gate: full-frame capture or screencast, not style readback |
| N2 | **The liquid register on the slider fill:** `.slider-range.glass-liquid-fill` rides `transform 0.3s linear(damped-spring, overshoot 1.22)` — the opus digest quoted only the thumb's 0.2s. The slider's interaction engagement is stronger than R3B recorded; it is the atoms' REST state that is inert. | Strengthens the ENGAGE-AFFORD exemplar row; no scope change |
| N3 | **Fix-path confirmation for the chip orphan:** the DOM already emits `data-mode="selectable"/"removable"` on the right chips, so `@import "./glass/glass-chip.css"` after `glass-capsule.css` revives the flood + remove geometry with zero component changes — the R3A proposed disposition is executable as written. | BJ chip-CSS defect wave — carry as the wave's one-line mechanism |
| N4 | **tags-input remove-affordance gap:** /data/tags-input renders 5 `.glass-chip` with ZERO `.glass-chip__remove` descendants — the consumer's delete affordance doesn't ride the chip's remove class, so the re-import alone won't style tag deletion there. | Scope note for the chip wave: verify tags-input delete paint post-fix |
| N5 | **One mechanism, two sightings:** the root-landing blank bento previews (R3B-11) and the F02 foundations tiles are the SAME identity-fallback rung — the landing categories, like foundations stories, ship no authored tiles. The duplicated label (tile text + caption directly beneath) is the actual design weakness on both surfaces. | Fold R3B-11 + F02 into ONE design row (authored tiles / de-duplicated label) for the story/preview band — not two defects |
| N6 | **Second-instrument DEV baselines (2026-07-20 tree):** LCP 417–418/426/542ms; boot long tasks 129.9+89.4 (root), 176.1+134.4 (blob); RunTasks 40,426/52,871; blob ForcedReflow reproduced; warm-route freeze 64ms. | BAND-PERF PENDING-R3 seeds — two instrument points now bracket the DEV baseline |

## Disposition

- Both digests are **sound end to end** — the union stamps them RATIFIED in place; no claim
  rewritten. The carried-defect dispositions they feed (chip-CSS → CONFIRMED-DEFECT wave;
  V-A95 → retire/caveat as context-steal artifact) are re-affirmed on the current tree by an
  independent instrument.
- The opus-era R3 seats were competent instruments here; the redo's value is the second
  instrument point, the N1 method caveat, and the N3/N4 fix-path facts the chip wave needs.
- Routings: N3+N4 → the BJ chip-CSS defect wave; N5 → the story/preview design band (merge the
  two sightings); N6 → BAND-PERF baselines; N1 → gate-method note. V-A95 disposition
  (retire-as-artifact) stands and is now twice-instrumented.
