# AX pass-3 defect routing — Q2 / Q5 / Q6 / Q8 / Q3 source-diagnosis + owning-wave routing

Routes the un-owned pass-3 user defects (`USER-DEFECTS-2026-06-08-pass3.md`) to their owning
waves with the SOURCE root cause for each. PLANNING artefact — no `src`/`demo` edits. HEAD
`89edffc` (3.8.0 + the AX integrated band + the I.W6 specular-bloom coordination commit).

Five defects in scope: **Q2** (aurora preset thumbnail black bar), **Q5** (`/motion/transitions`
∪ `/foundations/motion` union), **Q6** (broken motion section + needs rich background), **Q8**
(`/compositions/gate-pattern` locks you out — BLOCKER), **Q3** (hover-not-noticeable — re-confirm
vs W52). Each row below: the live defect, the grepped source root cause, the owning wave + the
fold it joins, and the dedup note (how it folds without duplicating an existing wave or row).

---

## Routing table (the one-glance map)

| # | Defect | Source root cause (grepped) | Routes to | Fold |
|---|--------|------------------------------|-----------|------|
| Q2 | Aurora preset PREVIEW black bar (top) | `usePresetThumbnails.ts` bake-time render artefact — `gl.clearColor(0,0,0,0)` showing through an unpainted band from a resize-race / offscreen-park during the synchronous `renderAt(1.0)` | **W47** (primary) · **W38** (cross-ref) | NEW fold on W47 (the aurora preset/demo wave) — the thumbnail-bake fix |
| Q5 | `/motion/transitions` ∪ `/foundations/motion` union | TWO motion pages in TWO categories: `motion/transitions.vue` (Vue `<Transition>` class gallery) + `foundations/motion.vue` (easing-curve tour) — NOT byte-duplicates, two facets of one Motion story | **W18** (IA category authority) | EXISTING pattern (the blob-trio / dock-scatter consolidation idiom) — a NEW Motion-category row note |
| Q6 | Broken motion section + needs rich background | "broken" NOT source-reproducible (transitions.css is sound + PRM-gated) → live-π re-verify; the *background* fold is the page-redesign | **W60** (background) · **W18** (the consolidated Motion page that carries the live fix) | rides the W60 per-page-background seam + the W18 Motion consolidation |
| Q8 | `/compositions/gate-pattern` LOCKS YOU OUT on page-load (BLOCKER) | `gate-pattern.vue` opens a non-dismissable full-screen `<Dialog>` at mount (`open = ref(true)` + `@escape-key-down.prevent` + `@interact-outside.prevent`) — the story-as-pattern traps the visitor | **W60** (page-redesign — glass card, not a page-trapping modal) | NEW fold on W60 (the gate becomes a contained glass-card demo, not a route-wide modal) |
| Q3 | Hover not noticeable (dock + buttons) — only on click | the W52 hover lift reads as NOTHING before click — re-confirmed live in pass-3 | **W54** (already routed — RED witness 5 / fold 5) | ALREADY OWNED — no new wave; re-confirm flag |

---

## Q2 — Aurora preset thumbnail black bar → W47 (cross-ref W38)

**Live defect** (`pass3:27`): *"Aurora PREVIEWS have a noticeable BLACK BAR in the top preview (the
preset thumbnails)."* The preset-picker strip's baked thumbnails carry a dark band at the top edge.

**Source root cause.** The thumbnails are baked offscreen in
`demo/stories/aurora/usePresetThumbnails.ts` and consumed by `PresetPickerRow.vue` + `substrates/aurora.vue`.
The bake (`usePresetThumbnails.ts:48-83`):
1. creates a `<canvas>` with the backing store set DIRECTLY (`shared.width = w; shared.height = h`)
   AND `style.cssText = "width:320px;height:200px;position:fixed;left:-99999px;top:0"` (`:53-56`);
2. `createAurora(shared, …, { mode: "capture" })` (`:61`) which arms SYNCHRONOUSLY — the capture
   path forces eager arm (`createCanvasLifecycle.ts:239` `if (options.mode === "capture") arm()`),
   so `build()` → `resize()` (`createCanvasLifecycle.ts:190-193`) runs at construct time;
3. per preset: `aurora.update(...)` → `aurora.renderAt(1.0)` → `shared.toDataURL("image/webp", 0.85)`
   (`:71-77`).

The black bar is the WebGL clear color bleeding through an unpainted band. `runtime.ts:239` sets
`gl.clearColor(0, 0, 0, 0)` (transparent black) and the resize reads `canvas.clientWidth/clientHeight`
(`runtime.ts:213-223`). THREE compounding bake-time mechanisms produce an unpainted top band, any of
which the implementer confirms live:

- **Resize race (most likely).** The runtime defends the first-paint layout with a `requestAnimationFrame`-chained
  double-resize (`runtime.ts:256-259`) that fires AFTER the synchronous construct-time `resize()`. But the
  bake's FIRST `renderAt(1.0)` runs synchronously right after `createAurora` returns (`:71-74`), BEFORE that
  rAF settles — so the first preset (`PRESET_KEYS[0]`, the *top* preview) can draw into a viewport sized
  from a not-yet-laid-out `clientHeight`, leaving a band of `clearColor` at the top that webp encodes as the
  black bar. Subsequent presets `await setTimeout(0)` (`:76`), giving the rAF a chance to settle — consistent
  with the bar being worst on the TOP/first preview.
- **DPR double-application.** The bake computes its own `dpr = Math.min(devicePixelRatio, 1.5)` and sets
  `shared.width = widthCss*dpr` (`:49-55`), then `resize()` OVERWRITES `canvas.width = clientWidth * resolveBudgetDpr()`
  (`runtime.ts:215-222`). If `resolveBudgetDpr()` (the `AV_DPR_MAX` clamp) disagrees with the bake's clamp, the
  backing store is re-sized and the viewport/UV aspect can mismatch the `toDataURL` crop.
- **Offscreen-park.** The canvas sits at `left:-99999px` (offscreen). The AV.W7 substrate parks the rAF loop
  for content-hidden / offscreen / backgrounded hosts. Capture mode bypasses the loop (it draws via `renderAt`
  not the rAF tick), so this is the LEAST likely — but the implementer should confirm the offscreen position
  does not trip a content-visibility / intersection park that leaves the buffer partially cleared.

**Owning wave: W47** (`AX.W47-aurora-preset-roster-reconcile.md`) — the demo aurora preset/roster wave,
the natural home for a preset-thumbnail-bake fix (it already owns the preset strip the thumbnails decorate).
The fix is a NEW fold: force a synchronous `resize()` (or a layout flush) BEFORE the first `renderAt`, OR
seed an opaque clear color, OR render-twice-discard-first per preset so every thumbnail bakes from a settled
viewport. **Cross-ref W38** (`AX.W38-aurora-configurator-glass-atoms-restyle.md`) — W38 owns the aurora
configurator glass-atoms, the surface where the thumbnails are mounted; if the fix touches the picker chrome
(the `bg-card` clip the `PresetPickerRow.vue:107` comment already flags as a dark-mode top-band hazard), W38
coordinates. The PRIMARY owner is W47 (the bake is a preset-demo concern); W38 is the consume-site cross-ref.

**Dedup.** Folds onto W47's existing aurora-preset scope without a new wave — W47 already owns the preset
strip + the demo aurora seam. It does NOT touch the aurora SHADER or the runtime substrate (W07-W14 / the
WebGL substrate own those); the fix is bounded to the bake harness `usePresetThumbnails.ts` + (if needed) the
picker clip in `PresetPickerRow.vue`. No overlap with W57 (the demo-radial reauthor — a different background
class).

---

## Q5 — `/motion/transitions` ∪ `/foundations/motion` union → W18

**Live defect** (`pass3:30`): *"`/motion/transitions` should be UNIONED with `/foundations/motion` —
deduplicate (one motion page)."*

**Source root cause.** There are TWO motion story pages registered across TWO categories:
- `demo/stories/foundations/motion.vue` (manifest `foundations/motion`, `manifest.ts:78` "Motion — Easings,
  damped spring linear() curves") — the EASING-CURVE tour: 10 `--ease-*`/`--spring-*` rows, each playing a
  500px WAAPI translate on click.
- `demo/stories/motion/transitions.vue` (manifest `motion/transitions`, `manifest.ts:206` "Transitions") —
  the Vue `<Transition>` CLASS gallery: 6 transition class-sets (`fade`/`fade-slide`/`pop`/`dialog-scale`/
  `dropdown`/`tab-fade`), each a `v-if` toggle.

They are NOT byte-duplicates — one is the easing-curve vocabulary, the other the `<Transition>` class
vocabulary — but they are TWO FACETS OF ONE "Motion" story split across `foundations/` and `motion/`. The
user wants ONE motion page. The natural union is the Motion category holding BOTH as stacked `<StorySection>`
blocks (easings + transition classes), with `foundations/motion` folding INTO the `motion/` category
(easings belong in Motion, not Foundations).

**Owning wave: W18** (`AX.W18-storybook-ia-reinvention.md`) — the IA category authority. W18 already owns the
`manifest.ts` category tree + the Motion category (`manifest.ts:202-211`) and already executes EXACTLY this
consolidation idiom for the blob trio (`substrates/goo-blob` + `blob-interaction` + `blob-mood` → ONE
`substrates/blob`, four stacked `<StorySection>` blocks — `W18:47`) and the five-route dock scatter → one
`dock` category (`W18:49`). The motion-page union is the SAME pattern: fold `foundations/motion` into the
Motion category as a section of a consolidated `motion/transitions` (or a renamed `motion/animation` page),
deleting the `foundations/motion` row (clean break, no `MissingStory` tombstone — `proof:no-orphan-demo-route`
guards it). W18 owns the manifest row collapse + the `EXPECTED_TREE` re-baseline; the SFC merge couples to it
(the easings tour + the transition gallery stack as two `<StorySection>` blocks on the shipped chassis).

**Dedup.** Folds onto W18's existing IA-consolidation scope — it is the same row-collapse + SFC-fold +
gate-re-baseline mechanism W18 already owns for the blob trio and the dock scatter, just applied to the
motion pages. It does NOT duplicate W60 (W60 wraps each SURVIVING page in a glass card + background; the
union DECIDES which pages survive — a W18 IA concern that PRECEDES W60's per-page wrapping). The
`EXPECTED_TREE` re-baseline (W18 Scope-9, LAST) absorbs the deleted `foundations/motion` row.

---

## Q6 — Broken motion section + needs rich background → W60 (background) + W18 (the live fix)

**Live defect** (`pass3:31`): *"'None of these items work' (a motion/transitions section) — broken; AND
to demonstrate glass we need an INTERESTING/involved BACKGROUND — paper, constellation, fourier, aurora
(different types) to display against."*

**Source root cause — TWO sub-claims, routed separately:**

1. **"None of these work" — NOT source-reproducible; needs a LIVE-π re-verify (the cardinal lesson).**
   The transition class-sets the `motion/transitions.vue` gallery references ALL exist and are sound:
   `transitions.css:11-105` defines every class (`.fade-*`/`.fade-slide-*`/`.pop-*`/`.dialog-scale-*`/
   `.dropdown-*`/`.tab-fade-*`) inside `@layer components` (`:11`, deliberately layered so a Vue
   `<Transition>` class shares the recipe cascade rung — `:3-9`), and the `v-if` toggle wiring
   (`transitions.vue:55-61`) is correct. So "broken" is NOT a missing-class / missing-import defect. The
   THREE live hypotheses the implementer re-confirms via chrome-devtools-mcp:
   - **PRM collapse.** Under `prefers-reduced-motion: reduce`, the transform legs collapse to opacity-only
     short fades (`transitions.css:194-223` forces `transition-property: opacity` + `0.15s` on every
     transform transition) — so a PRM-on user sees a near-instant fade and reads it as "nothing happens."
     If the user's OS has PRM on, this is WORKING-AS-SPECIFIED, not broken — but it READS as broken.
   - **Snap-back read (the `foundations/motion` easing tour).** `foundations/motion.vue:39-42` plays the
     500px translate with `fill: "none"`, so the dot snaps back to start the instant the 900ms animation
     ends — a blink-and-miss read that looks like "nothing happened."
   - **A genuine live regression** (a real broken state the source statics do not show) — only the live π
     pass confirms or refutes it.
   This is a ROUTING insight, not a source-fix: the "broken" claim must be re-proven live BEFORE the fix is
   authored (the cardinal lesson — do not patch on the audit's word). The fix (if a real regression) is a
   demo SFC fix that rides the consolidated Motion page.

2. **"Needs a rich background" — the page-redesign fold.** The demos render against `bg-background/40` /
   `bg-card` panels (`transitions.vue:71-91`, `foundations/motion.vue:55-57`) — flat, no rich substrate to
   demonstrate the glass against. This is the per-page-background seam.

**Owning waves: W60** (the rich per-page background — `AX.W60-page-redesign-container-layer.md` already
owns the `StoryBackground` descriptor seam at `W60:162`, "paper / grid / aurora / constellation / fourier"
per Q6/Q9) + **W18** (the consolidated Motion page that carries the live-re-verified fix, per Q5 above). The
background fold rides W60's per-page descriptor; the broken-section fix (if confirmed live) rides the W18
Motion consolidation SFC.

**Dedup.** Q6's TWO halves split cleanly: the *background* is W60's existing `StoryBackground` seam (no new
mechanism — Motion gets a befitting background like every other page); the *broken-section* is the same
consolidated Motion page W18 already authors for Q5 (no separate wave). No duplication — Q6 is the
intersection of Q5 (the page) and the W60 background seam, with a live-re-verify gate the cardinal lesson
mandates.

---

## Q8 — `/compositions/gate-pattern` LOCKS YOU OUT → W60 (BLOCKER)

**Live defect** (`pass3:33`): *"`/compositions/gate-pattern` literally GATES you from the page on click
(broken — it locks you out). Should leverage glass cards."* — flagged **blocker**.

**Source root cause.** `demo/stories/compositions/gate-pattern.vue` is "the story IS the pattern"
(`:2-3`) — it renders a full-screen non-dismissable `<Dialog>` that auto-opens at mount:
- `const open = ref(true)` (`:23`) — the gate is OPEN the instant the route mounts;
- `<DialogContent :show-close="false" @escape-key-down.prevent @interact-outside.prevent
  @pointer-down-outside.prevent>` (`:66-73`) — esc, scrim-click, and pointer-outside are ALL suppressed;
- only the correct key `"wolfpack"` (`:30`) dismisses it (`submit()` sets `open.value = false`, `:32-37`).

So navigating to `/compositions/gate-pattern` immediately presents a modal that traps the visitor on the
page until they type the secret key — the "literally gates you from the page" defect. The story DEMONSTRATES
the non-dismissable-modal idiom by ACTUALLY TRAPPING the storybook visitor, which is a route-wide UX trap, not
a contained demo. (The key is shown in the blurb `:58` — "the right key is 'wolfpack'" — but the visitor
must read it and type it to escape their own storybook, which is the trap.)

**Owning wave: W60** (`AX.W60-page-redesign-container-layer.md`) — the page-redesign umbrella, the natural
home given the user's own remedy: *"Should leverage glass cards."* The gestalt fix is to STOP demonstrating
the gate as a route-wide modal that traps the visitor and instead demonstrate it as a CONTAINED glass-card
demo: the gate-modal renders INSIDE a story panel (a `<Dialog>` scoped to a relative-positioned container, or
an inline glass-card mock of the gate), with an explicit "Open the gate" trigger button so the visitor
CHOOSES to see the trap rather than being trapped on arrival. The non-dismissable-idiom is still
demonstrated — but the demonstration is bounded to a card, not the whole route. This is a NEW fold on W60's
"contain items in glass cards" scope (Q7).

**Dedup.** Folds onto W60's page-redesign scope (every story in a glass container) — the gate-pattern page
becomes a contained glass-card demo like every other page, which IS the W60 remedy. It does NOT need a new
wave: the fix is the page-redesign applied to this one route, plus the load-bearing behaviour change
(`open` no longer defaults `true` on mount / the modal scopes to a container, not the viewport). Because Q8 is
a **blocker** (the page is unusable live), W60 should treat the gate-pattern row as a priority sub-step. No
overlap with W18 (the IA category — the gate-pattern row STAYS in `compositions`, only its BODY changes).

---

## Q3 — Hover not noticeable → W54 (ALREADY ROUTED — re-confirm flag)

**Live defect** (`pass3:28`): *"The HOVER effect for the dock + buttons is NOT noticeable — only on CLICK
is it visible. The hover state must read on hover, not just active."* — re-confirmation vs W52's "live-verified"
mark.

**Source diagnosis + routing — ALREADY OWNED by W54.** Q3 is NOT un-owned: `AX.W54-glass-first-class.md`
explicitly carries the Q3 hover re-tune as **RED witness 5** (`W54:85-93` — *"the hover lift reads as
NOTHING on hover — Q3, the W52 overshoot … pass-3 Q3 reports the consequence live"*) and **fold 5**
(`W54:211` — *"Fold the Q3 hover re-tune so the hover READS on hover"*), with the title itself naming it
(*"the Q3 hover re-tune so the lift reads on HOVER"*). The root cause is the W52 hover-scale re-tune: W52
lowered the hover lift to `~1.03–1.04` on `--spring-smooth` (a sub-perceptual settle, ζ≈0.86) which — combined
with the glass-default surfaces — made the hover register imperceptible before click. W54 re-tunes it so the
glass-default hover READS on hover (a perceptible lift + the surface legs), while keeping the press/active a
distinct crisper register.

**The CARDINAL re-confirm flag (the load-bearing routing note).** Q3 directly CONTRADICTS W52's
"live-verified" mark — W52 closed claiming a smooth coherent hover, yet the live pass-3 audit found the hover
imperceptible. This is the headless-green/visually-broken class the AX cardinal lesson exists to close
(`MASTER-PLAN.md:49` flags it: *"Q3 hover contradicts W52's 'live-verified' mark — a cardinal re-verify
candidate"*). The routing consequence: W54's close MUST include a fail-CLOSED live-π hover pass (hover the
dock + the default/glass/audacious buttons SLOWLY at ≥2 viewports × light/dark, assert the lift reads on
`:hover` not just `:active`) — a green source gate over a still-imperceptible hover is NOT done. The W52
"live-verified" mark is downgraded to re-verify-pending until W54 re-confirms the hover live.

**Dedup.** NO new wave — Q3 is W54's existing RED witness 5 / fold 5. The only routing action is the
re-confirm flag: W54 owns the fix AND the cardinal-lesson live re-verify that W52's mark failed to deliver.
No overlap with W52 (W52 built the material LOOK + the hover SMOOTHING register; W54 re-tunes the hover
MAGNITUDE so the glass-default lift is perceptible — a value re-baseline on W52's register, the same
W52→W54 relationship as the `--glass-level` opacity multiply).

---

## Summary — routing dispositions

| Defect | Disposition | Owning wave(s) | New wave? |
|--------|-------------|----------------|-----------|
| Q2 (aurora thumbnail black bar) | NEW fold — bake-harness resize-race / clear-color fix | **W47** (primary) · W38 (cross-ref) | no |
| Q5 (motion-page union) | EXISTING consolidation idiom — fold `foundations/motion` into Motion | **W18** | no |
| Q6 (broken motion + background) | SPLIT — background→W60 seam; broken→W18 page + live re-verify | **W60** + **W18** | no |
| Q8 (gate-pattern locks you out) | NEW fold — contained glass-card demo, not a route-wide modal (BLOCKER) | **W60** | no |
| Q3 (hover not noticeable) | ALREADY OWNED — re-confirm flag (cardinal re-verify vs W52) | **W54** | no |

Every defect routes to an EXISTING wave (no new wave minted) — W47, W18, W60, W54. The two load-bearing
routing INSIGHTS for the implementers: (1) Q8 is a live BLOCKER requiring a behaviour change (the modal
must not auto-trap the visitor on mount), and (2) Q3 + Q6's "broken" claim are CARDINAL re-verify candidates —
both contradict prior "works"/"live-verified" marks, so their owning waves MUST close on a fail-CLOSED live-π
pass, never a green source gate alone.
