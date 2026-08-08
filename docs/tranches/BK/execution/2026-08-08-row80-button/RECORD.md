# BK #80 W-BUTTON — execution record

> **[CORRECTION 2026-08-08 · CURE-ORDER-80]** This record was adjudicated CURE-REQUIRED
> (Fable quartet seat `wf_52fcc8ff-8d2`) and the four cures + FOLD-1 are applied below by a
> cure seat (**modelId: `claude-opus-5[1m]`**). The record is UNTRACKED, so the corrections
> are made PLAIN in place rather than as strike-brackets; this note is the audit trail.
> Corrected: **C1** two `outline-none` strikes landed in code (§3.2 addendum, §6 re-run,
> §7 item 4) · **C2** `focus-visible.test.ts` reclassified as a shared-dirty file (§9) ·
> **C3** item 31's ground (a), item 30's blast radius + the #47 notice (b, §8), #54 added to
> §0 (c), item 2's `backdrop-filter` figure (d), the diff-stat caption + splittability (e),
> the `@media (hover: hover)` fence + R-C's decorative ground (f) · **C4** §7 item 4 and the
> banked cells · **FOLD-1** `tabs/styles/drag.css` + `utilities/a11y-overrides.css`.
> TWO defects the order did not reckon with are recorded in §4 (items 3 and 4) and were NOT
> silently fixed. The shared-dirty count is **FOUR**, not three: C2's reclassification makes
> it three, and FOLD-1's own edit to the already-#32-dirty `drag.css` makes it four —
> arithmetic shown in §9.

**modelId: `claude-opus-5[1m]`** (scout + implement seat) · date 2026-08-08 · base HEAD `bf959b8d`
Spec of record: **TR#80** → `docs/tranches/BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-3.md`
§LANE button (lines 149-176), read whole this seat. TR wins on divergence; every divergence below is
stated with its ground.

---

## 0 · SELECTION

Next canonical **UNSTARTED** Φ5 row in TR §A order. Everything numerically ahead of #80 is SEALED,
LANDED, IN-FLIGHT, or gated — re-derived from `EXECUTION-DAG-2026-08-03.md` **and** `git status`,
never from a cursor list (⊕⁴⁸/⊕⁵⁶'s own instruction):

| row | why not selectable |
|---|---|
| #21 | hard dep `#17` (Φ4-UNSTARTED) |
| #25 | rides-clause: `#82` `field-control.css` cut unbuilt |
| #32 · #33 · #35 · #40 · #71 | **IN-FLIGHT** — uncommitted in this shared tree (`tabs/`, `alert/`, `slider/`, `carousel/`+`deck/`+`pager-dots/`, `morph/eyeglass.ts`) |
| #34 | dep `#33` (not landed) |
| #42 | HARD-GATED on `#47` |
| #44 | sequenced behind `#43`'s cut (Φ6, unstarted) |
| #45 · #52 | `#52` deps `#35` (C12, in-flight); `#45` deps `#52` |
| #47 · #48 | `#47` still gated (⊕⁵⁵); `#48` after `#47` W7 |
| #49 · #50 · #51 · #53 | ASK-gated (g3/g7 · g1 · g12+atlas ACK · g4) |
| **#54** | **DUAL-ENGINE — completion RIDES the ASK-gated pair `#50` W0 + `#53` (cursor:1698), so it cannot complete ahead of them.** Omitted from this table on the first pass; the omission was a record gap, never a wrong pick — #54 was not selectable either way |
| #56 · #64 | after ALL ten tier-3 lane cuts / after #79-#88 |
| #58 · #73 | ASK g11 |
| #67 | OWNER-GATE: R-7 footage ×3 |
| #74 | executes inside `#88`'s cut |
| #79 | SEALED ⊕⁵⁶ |
| **#80** | **OPEN** — sole dep `#68` (SEALED ⊕³⁶); "precedes the K2 strike (#86)" is an ordering it satisfies by going first |

## 1 · THE WORK ORDER (TR#80 cell, verbatim)

> | **80** | **W-BUTTON** | CWT-3 §LANE button | Φ5 | cited whole; owns the `base.css:113-117` focus edit (C-7) · precedes the K2 strike (C-8) · `size="xs"` deletion REFUSED (atlas `YearScrubber.vue:65`). After #68. ⊕⁴ U-40 (lane C): `useLiquidPress`'s `el` unthreaded at `Button.vue:61-64` — **⊕⁵ ratified default THREAD at this lane's cut** (SE-4: the static path is a fallback masking an unthreaded primitive — the [[feedback-no-masking-fallback]] class — so "record the static fallback as terminal" is not a legal branch; if threading proves impossible the static path is STRUCK, loud, not kept); the silent half-wire dies either way. ⊕⁷ atlas herald A-5 (∥#23): the stadium bound rides #23's role rung resolved against `--control-h-*`, landed at this lane's cut after #68—bare `min()` REFUSED (near-vacuous + the GF-DOCK §STRIKE token-coupling precedent); o19 A-1 stays the CWT-3 §3.9 (T-9b) mechanism—the DEV-gated `$attrs` misuse error; the allowlist form is the F14 class, no escalation seat |

§B.7 collisions this row owns, verbatim:

> | C-7 | `base.css:113-117` focus | #80 | outline-only wins on ground; glow legal only where a lane owns the complete resting list |
> | C-8 | K2 specular-ring strike | #80 before/with #86 | Button edge first; P10 precondition; GF-DOCK notified |

## 2 · PER-ITEM LEDGER

### §3.1 — one material owner

| # | act | trace |
|---|---|---|
| 1 | host swaps `glass-wash` → `glass-specular-track` (T-1) | `Button.vue:119`. Ground re-verified on disk: `material.css:269` lists `.glass-specular-track::before` in the transition cohort **unqualified**, while every ladder rung appears only as `:hover`/`:active` — so a rung-seated gleam has no transition on leave (240ms in, 0 out) and the track's does. |
| 2 | both `backdrop-filter` DECLARATIONS struck | Detector, stated because the bare figure was wrong: `grep -c backdrop-filter src/components/button/styles.css` = **1**, not 0 — the single hit is `styles.css:5`, a PROSE line in the header comment ("no `backdrop-filter` and no bare `--glass-capsule-fill`"). `grep -c` counts lines, not declarations, and a comment naming the property is not the property. The DECLARATION count is **0** (was 2); the earlier "= 0" figure quoted a detector that does not return 0 |
| 3 | both bare `--glass-capsule-fill` writes struck | the only surviving write is destructive's, and it composes `var(--glass-veil)` |
| 4 | primary composes `.glass-deep` **+** `--glass-depth: var(--glass-depth-content)` (adjudicator catch iii) | `Button.vue:120`, `styles.css` `[data-emphasis="primary"]`. Re-verified: `deep.css:105-113`'s tier map is `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` — none of which this host carries, so without the grade the registered `initial-value: 1` paints the menu ceiling. |
| 5 | `glassMaterial` drops `tone === "neutral"` | `Button.vue:88-91`; D10's gate/paint disagreement dies |

### §3.2 — the ring (C-7)

| # | act | trace |
|---|---|---|
| 6 | `.focus-ring:focus-visible` → `outline: var(--focus-ring-width) solid <--ink-perimeter mix>` + `outline-offset: 2px`; **both** the `box-shadow` and the `border-radius` writes dropped | `base.css:132-140` |
| 7 | `.interactive-item:focus-visible` takes the same inversion | `base.css` |
| 8 | forced-colors block's premise corrected on the text | `a11y-overrides.css` — the `Highlight` outline now RE-KEYS two entries and RESCUES the rest; geometry identical either way |
| 9 | no bloom leg (§7 R5) | none authored |
| **9b** | **`outline-none` STRUCK from the two consumers that composed it beside the ring (CURE-ORDER-80 C1)** | `chip/chipVariants.ts:6` (the interactive arm) + `_shared/menu/menuRowClass.ts:6`. Ground, in the built sheet: `.focus-ring:focus-visible` and `.interactive-item:focus-visible` sit in **`@layer components`** (byte offsets 116253 / 117687), `.outline-none { outline-style: none }` sat in **`@layer utilities`** (209175). Layer order beats specificity outright, so the inversion at item 6/7 handed those two consumers an `outline` that a later layer immediately set to `none` — the chip's interactive arm had NO focus indicator at all, and menu rows kept only the row fill. The token's whole job was killing the UA ring in the box-shadow era; an author-origin `outline` supersedes it, so nothing replaces it. **Verified live post-strike:** the bare `.outline-none` rule is now ABSENT from the built sheet entirely (nothing composes it), and the only surviving `outline-none` byte is `.focus\:outline-none:focus` — `EasingPicker.vue:388`'s SVG bezier handle, which composes neither utility and paints its own `focus-visible:stroke-*` indicator. 0 `outline-none` hits in `tests/`, so gate-safe. |

**The strike does NOT close the class library-wide, and §4 item 3 records what it leaves.**
`SelectItem` (via `menuRowClass`) now paints the ring; the four `DropdownMenu` rows and
`CommandItem` still do not, by a different mechanism the cure order did not reach.

### §3.3 — tone tints

| # | act | trace |
|---|---|---|
| 10 | `tone?: Extract<Tone, "neutral" \| "destructive">` — `success`/`warning`/`info` deleted, no alias | `Button.vue:46`, `ButtonTone` exported from both barrels |
| 11 | the three dead tone blocks + the opaque tone paint + the fourth border ink + `--shadow-sm` struck | `styles.css` — ONE `[data-tone="destructive"]` rule survives |
| 12 | destructive fill = the composed plate mixed toward `--destructive` at `--feedback-tone-strength` | byte-identical mix SHAPE to `feedback-tone.css:71-76`, which is what makes P4's grammar-identity capture meaningful |
| 13 | the edge takes the perimeter rung at the tone's hue | `--button-edge: color-mix(in oklab, var(--destructive) calc(var(--ink-perimeter)*100%), transparent)` |
| 14 | emphasis stays live under tone | asserted: no selector names two axes (`Button.test.ts` §TONE) |

### §3.4 — the box axis

| # | act | trace |
|---|---|---|
| 15 | pad `{8, 8, 12, 12}`, gap `{4, 4, 8, 8}`, text pad 4 | read off `--space-atom`/`--space-body`/`--space-residue` |
| 16 | mobile transposition 12→8, 8→4, 4→4 | **inherited, not authored** — `tokens/sizing.css:595-604` is the ONE width query and its steps are exactly the spec's; the file carries no `@media (max-width` and the test asserts it |
| 17 | three type faces over four boxes | `--control-text-sm` (xs, sm) · `--control-text` (md) · `--type-body` (lg) |
| 18 | `data-control-target` stamps unconditionally (T-7) | `Button.vue:171`; `responsive.css:6`'s `min-inline-size` leg is the live one, and HEAD stamped it only on the arm that was already square |
| 19 | `size="xs"` KEPT | REFUSED deletion per TR (atlas `YearScrubber.vue:65`) |
| 20 | stadium bound (atlas A-5) | already on disk from #23's landing, re-read and kept verbatim; bare `min()` still refused |

### §3.5 / §3.6 — states and press

| # | act | trace |
|---|---|---|
| 21 | `activationBlocked = loading \|\| disabled`; native `disabled` writes for `disabled` ONLY | `Button.vue:75-82` |
| 22 | guard widened to every host | `Button.vue:153-157` — a loading native button carries no `disabled`, so the guard is what stops the submit |
| 23 | `cursor: progress` reachable | the `pointer-events: none` in front of it is gone |
| 24 | disabled recast: no blanket `opacity`, no `pointer-events`, ink alone recedes and loses chroma | `styles.css` `:disabled` → `--button-ink: oklch(from var(--foreground) l 0 h / var(--opacity-disabled))` |
| 25 | the PRM block struck | `grep prefers-reduced-motion src/components/button/styles.css` → 0; the spatial legs stay PRM-zeroed by `.tap-squish` + `.glass-capsule-hover` + `respectReducedMotion` |
| 26 | the merged transition list authored on `.button` (T-2) | mirrors `.tap-squish`'s five surface legs + the spring `scale` leg |
| 27 | `el` threaded into `useLiquidPress` (TR ⊕⁵ U-40) | `Button.vue:105-116` via `asElement` (the ONE resolver) + a function ref on `Primitive`; the silent half-wire is gone |
| 28 | press LERP re-keyed off `.glass-wash` | `.button.glass-specular-track:active::before` |
| 29 | `--scale-press: var(--scale-press-sm)`; the `--scale-press-btn` alias DELETED | `scale-paper.css`; `SegmentedTabs.vue` re-points and drops the `"0.97"` masking literal; five prose citations corrected on the text |
| 30 | `--glass-specular-btn-hover` → `--glass-specular-capsule-hover`, declared on `.glass-capsule-hover` (T-9c) | `property-regs-specular.css` both arms + `glass-capsule.css`. That is the ruled design — the rung is the capsule's, `btn` leaves the name. **Blast radius, RE-COMPOSED (the first statement over-claimed it):** the rung only reaches a host that has a `::before` for `material.css` to light, so of the named composers exactly ONE changes paint — **`.dock-icon-button`** (`DockControl.vue:92`), which IS a `material.css` `::before`-cohort member, moves 0.10→0.14 light / 0.08→0.11 dark on hover. That surface is **#47 GF-DOCK's**. The chip, the segmented pill and the drag-lift hosts carry `.glass-capsule`/`.glass-chip`, which are in NO `::before` cohort (§8 row 4), so they had no gleam to change and still have none. ONE live delta, not four. |
| 31 | the dead host gleam literal + its false comment struck, **both arms** | `glass-capsule.css` — `--specular-intensity` is `inherits: false` (`property-regs.css:102`) AND `material.css:178` declares it ON the pseudo, so the host write was doubly dead. **Ground CORRECTED — the first one was false.** It read "`.glass-drag-lift` loses nothing live: `material.css`'s `[data-dragging]::before` cohort already gives it the active rung." It does not, two ways: (i) that cohort keys on the ATTRIBUTE `[data-dragging]`, and the library's SOLE `data-dragging` writer is `sheet/SheetContent.vue:301` — `.glass-drag-lift` is a CLASS `useDragMorph`/`useDockItemDrag` write, and nothing sets the attribute alongside it; (ii) even with the attribute the host must also match the cohort's class list (`.glass-floating`, `.glass-overlay`, `.glass-specular-track`, the four dock controls), and the drag-lift host is `.segmented-indicator` carrying `.glass-capsule` (`SegmentedTabs.vue:373`), which is in none of them. **The true ground is stronger than the false one: the host has no `::before` AT ALL**, so there is no gleam to lose. The citation this left dangling in `tabs/styles/drag.css:29-34` is corrected by FOLD-1. |

### §3.9 / §4 — the voice, and the rest of the strike list

| # | act | trace |
|---|---|---|
| 32 | DEV-gated `console.error` on `variant` / `size ∈ {icon, default}` (T-9b, o19 A-1) | `Button.vue:131-146`; `import.meta.env.DEV`-branched, prod-stripped, never a throw |
| 33 | the false import-rationale sentence struck | `glass.css` — replaced with the real mechanism (cascade-tie order, not resolution) |
| 34 | the `tests/components/ui/` hop dies | `tests/components/ui/button/Button.test.ts` DELETED → `tests/components/button/Button.test.ts` |
| 35 | demo: the 4×2 emphasis×tone matrix, an `as-child` mount on the story surface, the loading specimen, xs kept | `demo/stories/display/buttons.vue` |
| 36 | demo: the `<StatusDot>` pseudo-spinner, the PRM prose frame, the two false blurbs struck | same file |

## 3 · REFUSED / DEVIATED — with grounds

| # | spec clause | disposition | ground |
|---|---|---|---|
| R-A | §3.5 the **loading TRACK** (a seam track along the capsule's bottom arc, clock = the MOTION-CANON `transient` row) | **REFUSED; replaced by `<DotRing>`** | TWO independent grounds, both post-dating the spec. (1) **#28 W-FEEDBACK-MOTION LANDED** (⊕⁴³, `1ffa4d95`) and its subject is *"the library's ONE work-in-flight affordance"* — a button-local seam track is precisely the second mark #28 spent a row collapsing. (2) T-9a sequences the clock behind W-MOTION's `orb-drop → transient` rename and forbids minting it here; **#26 LANDED the rename as `orb-drop → present`, and `transient` is not a row** (`springPresets.ts` names `press · present · dock · panel · bloom · world`), so the named precondition can never arrive. The Button mounts `<DotRing>` on `loading`, following the `EasingPicker.vue:494` precedent (no `<Transition>`: the ring hands off to the label, and a `<Transition>` schedules a rAF shim this contract asserts it leaves none of). §5 G-BTN-STATE's "track `animation-name ≠ none`" is satisfied by the register's own `glass-dot-ring-redistribute`. |
| R-B | §3.4 "`[data-icon-only]` takes the control rung **r10**" | **REFUSED — superseded** | **#23 W-RADIUS-ROLE LANDED** (⊕³⁷, `a6d7db90`) and its role spine assigns `icon / single tap-target → 50% / --radius-pill, circle` (`theme/radius.css:19`). The host's `calc(var(--button-size) / 2)` on a square box IS that resolved 50%. Minting a 10px corner would fork the spine a later row owns. |
| R-C | §5 G-BTN-MATERIAL "every `--glass-capsule-fill` write contains the **warm-floor** `color-mix`" | **DEVIATED in wording, kept in substance** | The write is single-level over `var(--glass-veil)`, so the tier, the earned-darken clamp and `--glass-level` all survive inside the mix (which is what D3's sin was about); the tone replaces the warm floor as the chroma source, and a destructive command carrying destructive chroma instead of cream is the better answer. The executable asserts the substance: `color-mix(` ∧ `var(--glass-veil)` ∧ ¬`var(--glass-plate-*)`. **The Safari-nesting ground is DECORATIVE and is withdrawn as load-bearing.** It read: "the literal form requires a `color-mix` whose endpoint is itself a `color-mix` — the exact declaration-drop trap `material.css:199-201` names, and #6's `G-WK-COLORMIX-BUDGET` subject." But the house ALREADY nests color-mix through `var()` indirection, in this very register: `glass-capsule.css:49-56` writes `color-mix(in oklab, var(--glass-veil), …)` and `--glass-veil` is itself `color-mix(` (`glass/veil.css:65`). The library therefore ships nested color-mix on every capsule, and a second level here would break nothing Safari does not already survive. **The deviation stands on its PAINT merit alone** — the tone as chroma source is the better answer — not on an engine hazard that is not real here. |
| R-H | §3.5's hover arms, UNDISCLOSED on the first pass | **DEVIATED — an `@media (hover: hover)` fence added, and it is a behaviour change** | The quiet/text hover arms (`styles.css:183-186`ff) are fenced behind a fine pointer. Correct on merit, and the SAME idiom the library already rules with at `utilities/base.css:217` (`.interactive-item:hover` under the identical guard): `:hover` LATCHES on a coarse pointer and stays latched until something else is tapped, so an unfenced hover paints a tapped command as permanently pointed-at. But it **changes coarse-pointer behaviour for two arms** — on touch, `quiet` and `text` no longer take their hover ink/fill at all, and the coarse acknowledgement is the press rung alone. It was authored without being declared, which is why it is on the record now rather than only in the diff. |
| R-D | §3.5 disabled ink "**0.45**" | **DEVIATED to `--opacity-disabled` (0.50)** | 0.45 has no token home; minting it is the literal the lane's own header forbids. The delta is sub-perceptual and `--opacity-disabled` is the library's ONE disabled rung. |
| R-E | §5's five gates as **minted seats** | **SEATS +0** | §B.5 acceptance class, the #79 precedent: execution-time probes, authored as ordinary cases in `tests/components/button/Button.test.ts`. Register receipt byte-identical pre→post. |
| R-F | §3.1 the honest ≈1.75px primary/secondary blur caveat | **IMPROVED to ≈4.6px** | secondary re-points `--glass-blur-floating: var(--glass-blur-quiet)` — the quiet rung on BOTH axes, which the HEAD file's own comment already demanded ("one rung's paint and another's thickness … the monotone-dilution law broken at the surface"). Forced by the defect at §4 below. |
| R-G | `--focus-ring-shadow` full retirement | **NOT this row's** | §9 routes it to BAND-A11Y (#31, LANDED ⊕⁴⁶). Its remaining readers are all UNSTARTED tier-3 lanes' own surfaces — `#81` (select trigger) · `#82` (input-pill, field-control) · `#83` (checkbox/radio) · `#84` (toggle-group item) · `#85` (easing) · `#87` (marks) · `#88` (progress) — plus `dropdown-menu`/`dialog`/`sortable-list`/`slider`/`tags-input`/`toast`/`chip`. Each lane owns its own indicator; the token SURVIVES until they cut. |

## 4 · FOUND BESIDE THE ORDER — recorded, not silently fixed

**`.glass-deep` is INVERTED at HEAD: the deep register paints a THINNER blur than the plain
floating rung it is supposed to exceed, at every grade.** Detector, verbatim:

```
$ grep -n -- "--glass-blur-floating-radius:\|--glass-blur-deep-radius:" \
      src/styles/tokens/glass.css src/styles/tokens/glass-deep.css
src/styles/tokens/glass.css:88:    --glass-blur-floating-radius: 20px;
src/styles/tokens/glass-deep.css:56:    --glass-blur-deep-radius:    16px; /* … STRICTLY > calm floating 11px … */
```

`deep.css:63-70` LERPs `floating + (deep − floating) × depth`, so:

```
depth-content 0.35 → 18.60px   vs plain floating 20px
depth-popover 0.70 → 17.20px   vs plain floating 20px
depth-menu    1.00 → 16.00px   vs plain floating 20px
```

The prose in `glass-deep.css:56-58` and `deep.css:49` still cites an 11px floating floor and a
`content ~13px < popover ~14px < menu 16px` ladder; that floor died when the calm ladder re-tuned to
20px. Every `.glass-deep` surface in the library — deep Card, dialog, menu content — is therefore
LESS blurred than the same surface without the decoration.

**Not this row's fix** (the calm ladder radii are #22 W-FROST's, SEALED; the deep endpoints are the
token canon's, #68, SEALED) and not silently worked around: #80 sidesteps it by making secondary the
quiet rung on both axes, so `blur(primary) 18.6 > blur(secondary) 14` holds on merit rather than by
luck. **Routed → #69 W-PERF** (which owns the F-6 blur budget, and this is a blur-budget decision:
raise the deep endpoint above 20px, or lower the calm floating rung) **with #68 named as the token
home**; the two stale prose sites ride with it.

Second item: **`material.css:327`'s comment** ("Settles back on leave via the opacity transition
above") remains FALSE for every ladder-class consumer, which is D5's mechanism. §4's STRIKE list does
not include it and §9 routes doc-truth there — **→ #61 W-DOC-TRUTH**, untouched here.

---

Third item, **found by CURE-ORDER-80 C1's own sweep and NOT in the order**: the C-7 inversion is
**still dead on five components**, by a mechanism C1 does not reach. C1 struck the `outline-none`
UTILITY; these kill the same ring with a bare `outline: none` in **UNLAYERED** SFC-imported CSS,
which beats *every* layered rule regardless of specificity — no contest at all.

```
$ node  # brace-walk over dist-demo/assets/index-BeXl3sSF.css
.focus-ring:focus-visible        @116253 → "@layer components"
.interactive-item:focus-visible  @117687 → "@layer components"
.dropdown-menu__sub-trigger      @347342 → "UNLAYERED"
```

| host | composes | the killer |
|---|---|---|
| `DropdownMenuItem.vue:43` · `DropdownMenuCheckboxItem.vue:46` · `DropdownMenuRadioItem.vue:43` | `dropdown-menu__item interactive-item glass-menu-row` | `dropdown-menu/styles.css:54` — `.dropdown-menu__item, .dropdown-menu__sub-trigger { outline: none }` |
| `DropdownMenuSubTrigger.vue:36` | `dropdown-menu__sub-trigger interactive-item glass-menu-row` | same rule |
| `CommandItem.vue:39` | `command__item interactive-item glass-menu-row` | `command/styles.css:96` — `.command__item { outline: none }` |

Both sheets ship via `<style src="./styles.css">` on their SFC (`DropdownMenu.vue:101`), which emits
them unlayered. **C1 therefore creates a live INCONSISTENCY it did not have before**: `SelectItem`
(the sixth `interactive-item` composer, via `menuRowClass`, and `select/` contains no `outline` write
at all) now paints the C-7 outline on `:focus-visible`, while the four DropdownMenu rows and
CommandItem — structurally the same row, same three classes — do not. Before C1 all six were
uniformly ring-less. None of the five is indicator-LESS: `menu.css:43-47` paints a background fill +
`--accent-foreground` on `:focus` / `[data-highlighted]` / `[data-state=open]`, which is the
roving-highlight idiom a menu is supposed to use. So this is a CONSISTENCY defect and a C-7
completeness defect, not a bare a11y hole.

**NOT fixed here, deliberately.** `dropdown-menu/styles.css` and `command/styles.css` are named by
neither the cure order nor this row's fence, and the shared-tree law is literal. It is also a design
call, not a mechanical strike: a menu row that takes BOTH the fill highlight and an outline may be
one mark too many, and whoever owns it should decide whether the answer is striking the
`outline: none`, or layering those two sheets, or ruling the row-fill the menu's indicator and
exempting `.glass-menu-row` from the C-7 outline. **Routed → the lane that owns each surface**
(`dropdown-menu` and `command` are both still UNSTARTED tier-3 rows), with **#31 BAND-A11Y** named as
the consistency home since it owns the focus register.

Fourth item, **the twin of FOLD-1 and equally not in the order**: `glass-capsule.css:28` and
`:92-93` still say `.glass-drag-lift` "also composes" / "re-composes" the shared specular-lift step.
That is the SAME dangling citation FOLD-1 corrects at `tabs/styles/drag.css:29-34`, left by the SAME
deletion in THIS cut — and this file is in this row's own fence. Item 31 above establishes the true
ground (the drag-lift host has no `::before` at all). Recorded rather than fixed because the order
names only the `drag.css` site; it is a two-sentence correction whoever commits this should fold in.

## 5 · EXECUTABLE + MUTATION BITES

`tests/components/button/Button.test.ts` — 355 lines, **24 cases**, 6 describes (contract + the five
§5 clauses). Every new assertion mutation-bitten this seat, each mutation applied alone and reverted
**byte-exact** (`diff -q` against the pre-mutation copies: IDENTICAL):

```
RED    MATERIAL/backdrop          restore `backdrop-filter: var(--glass-blur-deep)` on primary
RED    MATERIAL/bare-fill         swap the fill's `var(--glass-veil)` for `var(--glass-plate-floating)`
RED    MATERIAL/depth             drop `--glass-depth` from primary (the 16px menu freeze)
RED    FOCUS/box-shadow           restore the box-shadow + border-radius writes in `.focus-ring:focus-visible`
RED    STATE/prm                  restore `@media (prefers-reduced-motion) { .button { transition: none } }`
RED    STATE/disabled-opacity     restore the blanket `opacity` + `pointer-events: none`
RED    STATE/loading-refold       re-fold `loading` into the native `disabled` write
RED    RUNG/pad16                 restore `padding-inline: calc(1rem * var(--ui-scale))`
RED    RUNG/control-target        re-invert `data-control-target` onto the iconOnly arm
RED    TONE/paint-block           re-mint a per-tone `background` + `--shadow-sm` block
RED    TONE/compound-selector     re-mint `[data-emphasis][data-tone]` + `font-weight: 650`
```

11/11 bite. No `it.fails` latch left on disk.

## 6 · VERIFY GATE — RE-RUN IN FULL after CURE-ORDER-80 C1 + FOLD-1

Every figure below is the POST-cure run, and every one byte-matches the pre-cure run.

```
$ npx vue-tsc --noEmit
TSC_EXIT=0                                     (no output)

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 150 passed (156)
      Tests  11 failed | 1437 passed | 5 expected fail (1453)

$ npx vitest run tests/components/button
 Test Files  1 passed (1)
      Tests  24 passed (24)

$ node scripts/gate-register.mjs                      # PRE-cut and POST-cut, byte-identical
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1

$ node scripts/regen-exports.mjs
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0

$ npm run demo:dist:build
✓ built in 1.47s                               EXIT 0
```

Two shell facts the first pass left off, both benign and both worth stating so a re-runner does
not read them as regressions:

- **`gate-register.mjs` exits 1, not 0.** The RECEIPT LINE is the artefact of record and it is
  byte-identical pre→post; the non-zero exit is the script reporting the one VIOLATION in that
  same line (`violations:1`), which is **#40's** — `pager.tabs.panel-linkage` rosters
  `tests/components/pager-dots.contract.test.ts`, a path #40 moved out from under. It reports the
  `drift:1` row too (`reka.tags-input.value-binding`, routed **#65**). Nothing here is this row's.
- **`tests/gates/boot-graph.test.ts`'s build arm RED's on the first battery run after ANY source
  edit** and goes GREEN once `demo:dist:build` runs, because it compares `dist-demo` freshness
  against source mtimes. It did exactly that again for the cure edits: the first post-C1 battery
  read **12 failed | 1436 passed**, the rebuild restored **11 / 1437**. Run the build before the
  battery, or discount that one arm.

**ALL 11 FAILURES ARE FOREIGN**, every one traced to an uncommitted lane in this shared tree, none in
this fence:

| failure | owner |
|---|---|
| `carousel/contract.test.ts` ×1 · `pager-dots/contract.test.ts` ×4 · `pager-dots/morph.test.ts` ×1 | **#40 W-PAGER** (in-flight `carousel/`, `deck/`, `pager-dots/`) |
| `gate-register.test.ts` ×3 | **#40** — all three trace to `tests/components/pager-dots.contract.test.ts`, moved out from under its rostered `sourcePath`; it is the pre-existing `violations:1` in the receipt above |
| `overfit-structure.test.ts` ×1 | **#40** — `LEAD_TRAIL_TAU_E_S` / `trailOffset` in the untracked `morph/useLeadTrail.ts` |
| `stacked-url-filter.test.ts` ×1 | **#7** — its own title says so: "BORN-RED on PagerDots.vue:493, #40 W-PAGER owns the flip" |

`tests/public-surface.spec.ts` (outside the stated gate paths, run anyway because this cut touches
the barrel) fails **2**, both the pre-existing pair #79's record already names verbatim: the
uncommitted `package.json`/lockfile `embla-carousel*` disagreement aborts `verifyExportTypes`, and
the stale `dist/` is downstream of it. Neither mentions button.

`tests/gates/boot-graph.test.ts` build arm RED'd on the FIRST run of this cut and is GREEN now: it
compares `dist-demo` freshness against source mtimes, so any source edit RED's it until rebuild.
`npm run demo:dist:build` run at the cut (exit 0, `✓ built in 1.31s`) — the demo story therefore
also compiled clean, which is the only build path this fence can green (`npm run build` stays RED on
#40's lockfile, per #79 ⊕⁵⁶).

## 7 · π NOT CLAIMED

P1-P9 are owed to **#10** at its serialized browser seat, Chromium 150 **and** real `safari-app`
26.4 banked separately and never cross-inferred. The delta table to capture against:

1. primary resolves `backdrop-filter ≠ none` for the first time (HEAD: `none`, α 0.808) — and the
   Safari saturate compression (1.28/1.1 vs Chromium 1.6) must be where `primary > secondary` is
   proven, not only where it is easy.
2. `blur(primary) 18.6px > blur(secondary) 14px`; `α(primary)` at the floating rung `>` `α(secondary)`
   at the quiet rung; both α < 0.92; meanChroma ≥ 0.02 in both modes.
3. the tab-walk strip over all 8 emphasis×tone cells: `outline-style ≠ none`, ≥2px, ≥3:1 vs own fill,
   `box-shadow` **and** `border-radius` byte-identical focused vs rest.
4. **P7 collateral — two free with the ring inversion, the third bought by C1.** `border-radius`
   rest ≡ focus on `/containers/dialog` ✕, `/feedback/toast` action and `/display/chip` cell arm.
   The first two ARE free: they compose `.focus-ring` and nothing else, so the `border-radius`
   write leaving `base.css` is the whole fix. **The chip cell arm was NOT free and the earlier
   "three components fixed by one declaration leaving" over-claimed it** — `chipVariants.ts:6`
   composed `outline-none` beside `focus-ring`, so on the chip the declaration leaving bought
   nothing but a corner: it stopped snapping to a stadium on Tab and still had NO indicator,
   `@layer utilities` beating `@layer components`. The chip arm is fixed by C1's strike, not by
   C-7 alone. Capture it as **two-plus-one**, and capture ONE menu row on `/display/select`
   (post-C1) beside it: `outline-style ≠ none`, ≥2px, ≥3:1 vs own fill. **Do NOT capture a
   `/display/dropdown-menu` or `/display/command` row as a pass** — §4 item 3 records why they
   are still dark, and #10 should bank them as the known-RED cell rather than as a defect it found.
5. the `::before` gleam across enter **and leave** (HEAD: 240/0).
6. primary-destructive vs secondary-destructive pairwise Δ (HEAD: **0**), paired against a
   destructive Alert on `/feedback/alert` for grammar identity.
7. the disabled recast: full-alpha silhouette, ink at 0.5 with chroma 0, `not-allowed` resolving.
8. the loading cell: DotRing running, Tab-reachable, `aria-busy`, `cursor: progress` resolving.
9. P8: dev build fires the console.error, prod build renders — the capture the consumer addenda carry.
10. P6 (press reciprocal on quiet and destructive, `--motion-weight: 0` → cap 1.0 proving `el`
    arrived) stays **BLOCKED on #3 W-CAPTURE-MOTION** by the spec itself.

`/display/buttons` void baseline moves: the story is re-authored (the 4×2 matrix + as-child +
loading), so the banked 229 Chromium / 222 Safari node counts are **superseded, not violated** —
#10 re-takes the baseline at this route rather than checking the old figure.

## 8 · RESIDUE ROUTED

| item | owner |
|---|---|
| **NOTICE — `.dock-icon-button`'s hover gleam moves 0.10→0.14 light / 0.08→0.11 dark** (item 30's ONE live delta, on the dock's surface). The dock is PARKED; this row does not wait on it and does not paint it. **#47 GF-DOCK must read this at UNPARK** and either ratify the capsule rung on its controls or re-point `--glass-specular-capsule-hover` at its own seat. No dock capture is owed by #80 and none is claimed. (The C-8 pattern: the notice is the handoff, not a gate.) | **#47 GF-DOCK**, at unpark |
| **The C-7 outline is still dead on the four `DropdownMenu` rows + `CommandItem`** (unlayered `outline: none`, §4 item 3) — a consistency defect C1 exposed rather than caused | each surface's own UNSTARTED tier-3 lane; consistency home **#31 BAND-A11Y** |
| `glass-capsule.css:28` + `:92-93`'s dangling `.glass-drag-lift` citation (§4 item 4) — FOLD-1's twin, in this row's own file | ~~fold in at commit, or **#61 W-DOC-TRUTH**~~ **[FOLDED BY THE DRIVER AT COMMIT 2026-08-08: both comments corrected in place — the specular step lives on `.glass-capsule-hover` alone; `.glass-drag-lift` carries no `::before`]** |
| `.glass-deep` blur inversion + the two stale prose sites | **#69 W-PERF** (token home `#68`) |
| `material.css:327`'s false leave-transition comment | **#61 W-DOC-TRUTH** |
| `--focus-ring-shadow` full retirement + the aria-invalid twin | the remaining component lanes (**#81 · #82 · #83 · #84 · #85 · #87 · #88**) — each owns its own indicator |
| `.glass-capsule` (+`.glass-chip`) joining `material.css`'s `::before` cohorts; a capsule-only host still has no `::before` | **the glass register wave** (§9 row 1; P11's bare-capsule RED) |
| the T-4 per-repo per-prop consumer census + the `variant`/`size="icon"` migration rows | **#76 LIB-SEAM** |
| K2 `::before`-ring strike + K3 retune — **P10 blocks K2's cut**, and the Button edge landed FIRST as C-8 requires | **#86** |
| `--control-text` riding `--ui-scale`; the sub-JND 36/40/44 heights; the 44px floor | the control-cohort wave / **RT-19C → #31** |
| `Tone` membership (`info` 0 everywhere, `warning` 0 as a Button tone) + the corrected `text` census | **`_shared/axes` owner** |
| PROPORTION §1.1's gap-8 derivation broken by its own C1 | PROPORTION owner |
| `corner-shape: squircle` engine qualifier | PROPORTION §5e owner |

## 9 · FENCE

**THE BLOCK BELOW IS FENCE-FILTERED — it is not what `git diff --stat` prints in this tree, and
the first pass presented it as if it were.** The real command, run at the same tree, emits the
whole shared working tree including the five foreign lanes:

```
$ git diff --stat | tail -1
 91 files changed, 2911 insertions(+), 3698 deletions(-)      # POST-cure
                                                              # (89 / +2881 / −3685 pre-cure;
                                                              #  the delta is C1's two files
                                                              #  and FOLD-1's two edits)
```

What follows is that output RESTRICTED to the paths this row owns outright — the filter is
`git diff --numstat -- <these paths>`, stated so no reader mistakes it for the repo figure:

```
 M demo/stories/display/buttons.vue                    70   36
 M src/components/_shared/menu/menuRowClass.ts          1    1     ← CURE C1
 M src/components/button/Button.vue                    98   13
 M src/components/button/index.ts                       1    0
 M src/components/button/styles.css                   177   84
 M src/components/chip/chipVariants.ts                  1    1     ← CURE C1
 M src/composables/motion/engage/engageLadder.ts        1    1
 M src/composables/motion/spring/useLiquidPress.ts      1    1
 M src/index.ts                                         7    1
 M src/styles/glass.css                                 9    4
 M src/styles/glass/glass-capsule.css                  16   15
 M src/styles/tokens/property-regs-specular.css        10   10
 M src/styles/tokens/scheme-motion.css                  1    1
 M src/styles/utilities/a11y-overrides.css             24   12     ← FOLD-1 (was 13/6)
 M src/styles/utilities/base.css                       39    8
 D tests/components/ui/button/Button.test.ts            0  139
?? tests/components/button/Button.test.ts             355  new
                                                     ───  ───
                              15 M + 1 D  =  16 files  456  327
```

### The FOUR shared-dirty files, and how to split them

The first pass said **two**. It is **four**. C2 makes it three by reclassifying
`focus-visible.test.ts`; FOLD-1 makes it four by editing `drag.css`, which #32 had already
dirtied. Each carries hunks of this row's in regions the foreign diff does not touch.

**Split at `-U0` by index surgery. At the default `-U3` the split is not available** —
`scale-paper.css`'s `--scale-press-btn` deletion sits at line 26 and the nearest foreign hunk
starts at line 32, so three lines of context on each side overlap at line 29 and git emits them as
ONE hunk. `-U0` separates them cleanly.

| file | foreign owner | `-U0` hunks that are **#80's** | `-U0` hunks that are **NOT** |
|---|---|---|---|
| `src/components/tabs/SegmentedTabs.vue` | **#32 W-TABS** | `@@ -270 +277,4 @@` — 4 lines: `readToken("--scale-press-btn","0.97")` → `readToken("--scale-press-sm","")` plus its 3-line rationale | the other 18 hunks |
| `src/styles/tokens/scale-paper.css` | **#71 GF-EYEGLASS** (not "the tab-indicator retune" as first stated — the foreign hunks delete `--tab-indicator-blob-max` and cite `composables/motion/morph/eyeglass.ts`) | `@@ -15,2 +15,4 @@` (the comment sentence) · `@@ -26 +27,0 @@` (the `--scale-press-btn` declaration) | `@@ -32,5 +33,3 @@` · `@@ -41,6 +40,7 @@` · `@@ -49,7 +48,0 @@` |
| `tests/components/a11y/focus-visible.test.ts` | **#35 W-SLIDER** | `@@ -43 +43,3 @@` ONLY — the DROPDOWN comment | `@@ -30 +30 @@` — **hunk 1 is #35's, take it NOWHERE NEAR this commit** |
| `src/components/tabs/styles/drag.css` | **#32 W-TABS** | `@@ -31,5 +31,17 @@` — FOLD-1's citation correction | `@@ -59,0 +72,7 @@` · `@@ -68,4 +87,6 @@` |

**Why hunk 1 of `focus-visible.test.ts` is BLOCKING (C2).** It re-points
`const SLIDER = "src/components/slider/Slider.vue"` → `"src/components/slider/styles.css"`, and
that file is **UNTRACKED** (`git status` → `?? src/components/slider/styles.css`). Committing it
with #80 RED's a clean checkout on `readFileSync`: the test reads a path that does not exist at
that commit. It belongs to **#35 W-SLIDER**, which is creating the file — and the twin re-point in
`tests/components/a11y/coarse-target.test.ts:38`, a file #80's fence never claimed, proves the
class rather than the coincidence. Only the dropdown-comment hunk is #80's.

Accounting: **15 tracked modified + 1 tracked deletion + 1 new file** owned outright, **plus four
shared-dirty files** carrying 1, 2, 1 and 1 hunks of this row's respectively. No completion riders.
