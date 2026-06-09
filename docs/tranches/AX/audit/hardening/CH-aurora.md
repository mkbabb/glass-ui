# CH-aurora — adversarial red-team of the aurora band (W07, W10-W14, W38, W47)

**Lane** CH-aurora · **Verdict** WEAK · **HEAD** 89edffc · **Date** 2026-06-09

Red-teams the aurora band against the AX bar (gestalt, glass-first, dock-perfection-adjacent,
the cardinal lesson, the chronic classes). The CORE (W07/W10/W11/W12/W13) is DONE and
live-verified — no challenge lands there. The TAIL (W14/W38/W47) is three NOT-STARTED waves,
and the red-team finds the wave docs that PLAN that tail are STALE in load-bearing places, the
headline user defect (D1 "animate faster/springier") is ORPHANED by W38's own scope, and the
Q2 black-bar has no owned root-cause. The band passes its headless gates but the specs that
will drive it are partly diagnosing a HEAD that no longer exists.

---

## CHALLENGE 1 (BREAKS W38/W47/convergence diagnosis) — the BouncyTabs born-RED witnesses are STALE; W53 already migrated the aurora demo to SegmentedTabs

The W38 wave doc, the W47 wave doc, the convergence `A-waves-aurora.md`, and `D1.md` ALL
diagnose the aurora demo against `BouncyTabs` — and that component no longer exists at the
call sites. W53 (commit `d4c2910`, AFTER all those docs were authored at the `002bda5`/`f2fc614`
ledger heads) unified `BouncyTabs`→`SegmentedTabs` with a clean break (no alias).

Falsifiable, source-grounded at HEAD 89edffc:
- `grep -rn "BouncyTabs" demo/stories/aurora/` → **ZERO** matches. W38's born-RED witness 2
  ("`grep -rn 'BouncyTabs' demo/stories/aurora/config/` returns **6** at HEAD (RED)") is
  **FALSE at HEAD** — it returns 0. The gate `proof:aurora-chrome-idiomatic` as specified
  (clause 2: "the 6 enum-picker `BouncyTabs` sites … `grep -rn 'BouncyTabs'` returns 0") is
  **born-GREEN, not born-RED** — it cannot witness anything.
- The actual current state: `MediumLayer.vue:45,54,63,72` + `FlowLayer.vue:26` +
  `CompositionLayer.vue:20` = **6 `<SegmentedTabs variant="pill">` enum-picker sites**, plus
  the 2 legitimate panel-nav sites in `AuroraConfigDock.vue:102,122`.
- **The deeper break:** W38/D1's diagnosis is that these are an "enum-as-panel-nav category
  error (`role="tablist"` on a control with no `tabpanel`)." But `SegmentedTabs variant="pill"`
  resolves `role="group"` + `aria-pressed` (`SegmentedTabs.vue:341,386` — "`segmented`/`pill`
  are the ToggleGroup-shaped surface"). So the **a11y category error the spec's entire
  diagnosis rests on is ALREADY FIXED by W53** — pill IS the ToggleGroup-shaped surface
  CLAUDE.md prescribes for "single-select-of-an-enum mutating one surface." The remaining
  issue is purely VISUAL (a 7-segment cramped pill strip — `mediumOptions` has 7 entries,
  `options.ts:14-22`) and a cross-surface RENDERING divergence (Atoms = native `<select>`,
  Advanced = `SegmentedTabs pill`), NOT an ARIA bug.

**Impact:** W38's Arm-2 born-RED gate is mis-authored against a deleted component; if executed
as-written it is born-GREEN and proves nothing. The W-aurora inventory (§5 gap 2) FLAGGED this
hazard ("re-census the actual current call-sites, don't assume") but the WAVE DOC itself was
never amended — the inventory's warning sits in a separate file the impl agent may not read.
This is the clean-break-misses-the-mirror chronic class, one tranche removed: W53 renamed the
component, the aurora wave docs that cite it by name were not re-swept.

## CHALLENGE 2 (BREAKS W38's coverage of the actual user ask) — D1's "animate FASTER, smoother, SPRINGY" is ORPHANED; W38 only restyles, never re-times

The pass-3 user defect D1 (USER-DEFECTS-2026-06-08-pass3.md:19) is literally: **"The
configurator/settings should animate much FASTER, smoother, SPRINGY."** This is a MOTION-SPEED
ask. W38's entire scope (both arms) is about GLASS-TIER STYLING + IDIOM + a `.tap-squish` press
on buttons. It never touches the panel/section/crossfade TIMING that is the substance of the
ask.

Source-grounded at HEAD:
- `ConfiguratorLayer.vue:140` — the section reveal is `transition-[grid-template-rows]
  duration-200 ease-out` — a **flat 200ms bezier**, NOT a spring, NOT fast, NOT bouncy.
- `ConfiguratorLayer.vue:121` — the chevron is `transition-transform duration-200`.
- `ConfiguratorLayer.vue:103` — the trigger is `transition-colors hover:bg-foreground/5`.
- W38 bullet 2 only re-targets the chevron's channel onto "`--spring-*`/`--duration-*`" and
  adds `.tap-squish` to the trigger PRESS — it does NOT speed up or spring-ify the
  `grid-template-rows` REVEAL (the thing that actually "animates" when you open a section).
- The Advanced layer crossfade rides `DockLayerGroup`'s `useLayerTransition` — and W38's plan
  is to RETIRE that for `ConfiguratorLayer` collapse sections, which would REMOVE the crossfade
  entirely rather than make it "faster/springier."

So D1 has TWO disjoint halves: (a) the idiom half (native→LabeledSelect) which W38 owns, and
(b) the MOTION half (faster/springier reveal+crossfade) which **no wave owns**. The convergence
`D1.md` captured ONLY the idiom half — it never mentions speed/spring/duration (grep over
`D1.md` for `faster|spring|duration` = the only "spring" hit is "press-spring," the button
press, not the panel reveal). The user's actual word is unaddressed.

**Impact:** W38 can close GREEN on its gate + a "looks idiomatic" frontend-design verdict while
the configurator still opens at the same sluggish 200ms-ease-out it does today — the user's D1
ask un-met, a headless-green/visually-unchanged-on-the-axis-they-asked-about gap. This is the
"passes a gate, misses the intent" failure the bar names.

## CHALLENGE 3 (Q2 black bar — no owned root-cause; the audit mis-routes it) — the preview BLACK BAR is not in W47's scope and W47's harness can't fix it

Q2 (USER-DEFECTS pass-3:27): "Aurora PREVIEWS have a noticeable BLACK BAR in the top preview
(the preset thumbnails)." The MASTER-PLAN routes Q2 to "Batch 5 — demo IA" and tags it
"(aurora — W47/usePresetThumbnails)" (USER-DEFECTS:27). But W47's FileBounds are EXPLICITLY
`presets.ts` + the gate only — it lists `usePresetThumbnails.ts` as **OUT of bounds** ("the
bake machinery — it re-bakes the changed configs AUTOMATICALLY … no edit needed", W47:179).
So the wave the plan points Q2 at is contractually forbidden from touching the file the black
bar lives in. Q2 is effectively un-owned.

Source-grounded root-cause candidates (none diagnosed in any wave doc):
- The bake is `usePresetThumbnails.ts:50-51` → `320×200 × dpr` (16:10); the card renders
  `aspect-[16/10]` + `object-cover` (`PresetPickerRow.vue:111-117`). If the live offscreen
  canvas's `resize()` (`runtime.ts:213-223` `gl.viewport(0,0,w,h)`) races the `renderAt(1.0)`
  draw — the canvas CSS-sizes via `shared.style.cssText` (`:56`) but the drawing-buffer
  dimensions are set to `w/h` (`:54-55`) — a first-bake-before-layout viewport of 0-height or
  a DPR-rounding letterbox would clear `gl.clearColor(0,0,0,0)` (`runtime.ts:239`) transparent
  but composite over the card's `bg-card`, which in DARK MODE is near-black → reads as a black
  bar at the top edge.
- `toDataURL("image/webp", 0.85)` (`:74`) — WebP from a `preserveDrawingBuffer` capture; if
  the buffer's top rows were never drawn (viewport under-set on the very first `renderAt` before
  the rAF-chained double-resize at `runtime.ts:257-258` settles), those rows bake black/empty
  into the cached data-URL permanently (the thumbnail is cached, never re-baked once `ready`).
- The 200ms `onMounted` delay (`:92`) + the first `renderAt` happening in CAPTURE mode (which
  forces eager `:105` but does NOT guarantee a post-layout viewport on the offscreen `fixed;
  left:-99999px` node) is the exact first-paint-before-layout class the live runtime defends
  against with its double-resize — and the capture path has NO such defense.

**Impact:** Q2 is a real, reproducible visual defect with at least three plausible source
mechanisms, NONE of which any wave doc has diagnosed, and the wave the plan names for it
(W47) is bounded OUT of the file. It needs its own micro-wave (or an explicit W47 FileBounds
extension to `usePresetThumbnails.ts` with a captured before/after of the thumbnail strip in
dark mode at ≥1 viewport).

## CHALLENGE 4 (W14 — the dead scaffold has survived 3+ tranches as forbidden dead substrate) — the EXCISE decision is recommended but un-ratified, and the "parity" framing is dishonest

W14 is sound AS A SPEC (the convergence audit correctly blessed it). The CHALLENGE is the
CHRONIC deferral: `painterly.wgsl.ts` + `wake.wgsl.ts` are **dead exports since birth**
(`753c281`, AW.W7c — confirmed `git log -S "PAINTERLY_TENSOR_WGSL"` shows the strings only in
their creating commit + comments). They are substrate-WITHOUT-consumer, which Design-Axis-3 +
the §0 "dead scaffold is forbidden" precept BAN at every close — yet they have ridden through
the entire AW tranche AND most of AX as forbidden dead scaffold, shipped in 3.8.0.

- The `device.lost` silent-failure trap (`createGPUCanvas.ts:122-123` punt — a lost GPU freezes
  the aurora black forever, no WebGL2 fallback) is BORN at `c17b74c` and STILL unhandled at HEAD
  (W-aurora inventory §3.1: "NO `device.lost` handling anywhere in aurora/"). This is a real
  user-facing freeze-to-black bug shipped in production.
- The W14 ratify (Branch B EXCISE) has an autonomous default — good — but it has NOT been
  ratified, and the band cannot close coherently while forbidden dead scaffold ships. The
  "re-enable WebGPU on medium parity" framing is UNMEETABLE (W13 ships the 6 mediums in GLSL
  only; the WGSL twin has no `uMedium` dispatch) — so the CHANGELOG "KNOWN LIMITATION" entry is
  a dishonest promise that will never be kept.

**Impact:** a precept-violating dead-scaffold + a real freeze-to-black device-loss bug have
shipped across multiple tranches. W14 is well-specced to fix both but is NOT-STARTED and
un-ratified. The challenge is not the spec — it's that the band has been allowed to ship 3.8.0
with both, and the close keeps slipping.

## CHALLENGE 5 (cardinal lesson) — ZERO aurora visual DELTA captures exist; W07/W10/W13 "live-verified" rest on commit-message claims

The cardinal lesson: "complete" needs a captured DELTA artefact. `docs/tranches/AX/audit/visual/`
contains ONLY `CAPTURE-PROTOCOL.md` — **zero actual captures, zero `.png`, zero `W<NN>-DELTA.md`**.
The aurora CORE waves (W07/W10/W13) are marked `complete`/`live-verified` in PROGRESS and the
inventory, but there is no `W07-DELTA.md`/`W10-DELTA.md`/`W13-DELTA.md`. The CAPTURE-PROTOCOL
itself names the retroactive-backfill debt for W45/W52/W53/W56/W57/W59 but does NOT even list
the aurora core — so the aurora "live-verified" marks are doubly unbacked (no DELTA AND not on
the backfill ledger). Per the protocol's own rule ("a wave's PROGRESS status is `live-verified`
ONLY when its DELTA.md exists"), every aurora "live-verified" mark is currently INVALID.

**Impact:** the band's "DONE-core" claim — the spine the whole tail's sequencing rests on — has
no captured proof. If W07's black-canvas fix or W13's van-Gogh sparse-fill regressed on a real
device today, nothing in the repo would catch it. The inventory's "live-verified" verdicts cite
"re-probed GREEN on real Metal" but the artefact is absent.

## CHALLENGE 6 (glass-cohesion / MAXIMAL glass-first) — the aurora demo chrome is the LEAST glass-first surface in the library, and W38 only half-fixes it

Under the USER-DECIDED MAXIMAL glass-first hinge (R3: "everything glass — containers, chrome,
buttons, AND content panels"), the aurora studio chrome is the worst offender in the repo:
`AuroraAtomsPanel.vue` is 9 raw native controls (4 `<select class="rounded border bg-card">`,
4 `<input type=range>`, 1 `<input type=color>`) — UA-styled, opaque, zero glass. This is the
DEFAULT-visible surface (`dockTab` defaults to "atoms"). W38 Arm-2 transposes them onto
`LabeledSelect`/`LabeledSlider` (glass-tinted) — good — but:
- the 3 `type=color` swatches stay native (RATIFY Option B), so the seed swatch remains a raw
  opaque UA color input even after W38 — a glass-cohesion hole the MAXIMAL hinge does not
  obviously bless;
- the 7-segment `SegmentedTabs pill` medium picker is not glass-first-evaluated against W54;
- W38 was authored BEFORE the MAXIMAL-glass R3 ratification, so it never asks "should these
  panels be glass content panels?" — it only asks "are they idiomatic primitives?". Idiomatic ≠
  glass-first.

The ONE-model gap: the aurora chrome will be made idiomatic by W38 but not cohered onto the W54
glass-first ROOT, leaving the most-visible demo surface diverging from the MAXIMAL-glass default
the user decided.

---

## CHRONIC slip-history

1. **Clean-break rename misses the downstream doc/witness sweep.** W53 renamed
   BouncyTabs→SegmentedTabs (clean break, no alias — correct per MEMORY) but the aurora wave
   docs (W38, W47, convergence A-waves-aurora, D1.md) that cite BouncyTabs by name were never
   re-swept; their born-RED grep-witnesses are now false. Recurs from the MEMORY
   "glass-ui-binding-verification" class (stale reka/tabs bindings silently no-op) AND the
   "clean-break renames that miss test-mirrors/barrels/sibling-consumers" chronic — here it's
   sibling WAVE DOCS, not code. The inventory caught it (W-aurora §5.2) but only as a note in a
   separate file; the wave doc was never amended.

2. **The dead WebGPU scaffold (`painterly.wgsl.ts`+`wake.wgsl.ts`) + the `device.lost` punt.**
   Dead since `753c281` (AW.W7c); the device-loss freeze-to-black born `c17b74c` (AW.W7b);
   both shipped through AW non-close AND 3.8.0 AND remain un-fixed at AX HEAD. W14 is the named
   fix but NOT-STARTED across the whole tranche. Multi-tranche slip of a precept-banned dead
   scaffold + a real production bug.

3. **No captured visual DELTAs (cardinal lesson recurrence, round N).** The CAPTURE-PROTOCOL
   exists BECAUSE this recurred ("waves marked live-verified from commit-message claims with no
   captured artefact") — yet the aurora core's "live-verified" marks STILL have no DELTA.md and
   aren't even on the backfill ledger. The discipline was written but not applied to the band
   that pre-dates it.

4. **D1's motion half repeatedly narrowed to the idiom half.** The user asked "faster, smoother,
   springy" (pass-3) — the convergence D1.md captured only "not idiomatic" (the components),
   W38 inherited only that, and the speed/spring ask has now slipped through two planning passes
   un-owned.

---

## HARDENING ACTIONS (planning only — to PERFECT the band)

1. **AMEND W38 + W47 + the convergence audits to the post-W53 reality (BEFORE either drives).**
   Re-author W38 Arm-2 born-RED witness 2 + the `proof:aurora-chrome-idiomatic` clause-2 from
   "`BouncyTabs` = 6" to "`SegmentedTabs variant=pill` enum-pickers = 6"; DELETE the "enum-as-
   panel-nav / role=tablist category error" diagnosis (W53 fixed the ARIA — pill is role=group).
   Re-frame the remaining issue as VISUAL ONLY (the cross-surface rendering divergence: Atoms
   `<select>` vs Advanced `pill`, + the 7-segment cramped pill). Without this, W38's gate is
   born-GREEN and witnesses nothing.

2. **ADD a wave (or a W38 third arm) for D1's MOTION half — "configurator faster/springier."**
   Re-target `ConfiguratorLayer.vue:140` (`duration-200 ease-out` reveal) + `:121` (chevron)
   onto a fast spring register (`--spring-snappy`/`--spring-bouncy` per the §6 easing doctrine:
   enter→bouncy/snappy). Gate it with a live rAF-sampled timing capture (≥5 frames) per the
   CAPTURE-PROTOCOL motion clause. This is the half of D1 the user actually asked for and no
   wave owns it.

3. **MINT a Q2 micro-wave (or extend W47 FileBounds to `usePresetThumbnails.ts`).** Diagnose
   the black bar at source: prototype a capture-path `resize()` defense mirroring the live
   runtime's rAF-chained double-resize (`runtime.ts:257-258`) so the first `renderAt(1.0)` never
   bakes an under-set viewport into the cached data-URL; verify the 320×200 bake vs `aspect-
   [16/10]` + `object-cover` has no letterbox; capture a before/after of the thumbnail strip in
   DARK mode (where `bg-card` reads black) at ≥1 viewport. The plan currently mis-routes Q2 to a
   wave bounded OUT of the file.

4. **RATIFY + EXECUTE W14 Branch B (EXCISE) NOW — do not let it close the band as dead scaffold.**
   The autonomous default is EXCISE; ratify it, delete `painterly.wgsl.ts`+`wake.wgsl.ts`,
   subscribe `device.lost`→WebGL2 fallback (the real freeze-to-black fix), port
   `mixPaletteOklchArc` to the WGSL `samplePalette`, and RESOLVE the dishonest "KNOWN LIMITATION"
   CHANGELOG entry. This is a real shipped bug + a precept violation, not a nicety.

5. **BACKFILL the aurora-core visual DELTAs (cardinal lesson).** Add W07/W10/W13 to the
   CAPTURE-PROTOCOL retroactive-backfill ledger and capture the owed paired-π + screenshots
   (≥2 viewports × light/dark on the live `/substrates/aurora`), OR revert their PROGRESS marks
   to `live-pending` per the protocol's own rule. The DONE-core claim has no proof today.

6. **Run a glass-first cohesion pass on the aurora chrome against W54 (MAXIMAL hinge).** After
   W38's idiom pass, evaluate the atoms-panel + medium picker + seed swatch against the W54
   glass-first ROOT — the default-visible demo surface must conform to the ONE glass model the
   user decided, not merely become "idiomatic primitives." Decide the `type=color` swatch's
   glass disposition explicitly (the RATIFY Option-B keep-native leaves an opaque hole).
