# BK #79 W-CARD-MATERIAL — execution record

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`) · scout+implement seat ·
2026-08-08 · tree base `d4221195` (the prompt's `4917a042` had already been superseded by
`d4063dda`/`d4221195` — #72's landing and its ⊕⁵⁵ back-annotation).

**CURE PASS 2026-08-08** — same model class, cure seat, executing `CURE-ORDER-79.md` (eight cures,
driver-ratified off the Fable quartet adjudication `wf_b4e09545-822`). **All eight executed, none
refused.** The ledger is §10b; every correction below carries a dated `[CORRECTION 2026-08-08]`
bracket naming the text it replaces, and no earlier claim is deleted without one.

**Spec of record:** TR#79 → `COMPONENT-WAVES-TERMINAL-3.md` §LANE card (cited whole), **as amended
by CWT-3 fold §2 C-2 / C-3 / C-4** (keyed at TR §B.7). TR wins on divergence, and it diverges from
the lane body in three places — every one is executed the fold's way, with the lane's own text
recorded beside it below.

---

## 0 · SELECTION + GROUNDS

Walked the Φ5 table in TR order (`docs/tranches/BK/EXECUTION-PROGRESS.md` §Φ5, numeric = TR §A
order), re-deriving from `EXECUTION-DAG-2026-08-03.md` **and** `git status` per ⊕⁴⁸/⊕⁵⁵'s standing
instruction, never from the last block's list:

| row | disposition |
|---|---|
| #18 · #19 · #23 · #24 · #26–#31 · #38 · #39 · #41 · #46 · #55 · #57 · #59 · #72 | LANDED / LANDED-IN-PART — not UNSTARTED |
| #22 | CURE-CUT, never selectable |
| #21 | gated on **#17** (hard; #17 is Φ4-UNSTARTED) |
| #25 | its own rides-clause — #82's `field-control.css` cut, #27's ladder, #22's rung |
| **#32 · #33 · #35 · #40 · #71** | **IN-FLIGHT** — uncommitted in this shared tree (`SegmentedTabs.vue`, `tabs/styles/*`, `tests/gates/tabs-seam.test.ts`, `alert/*`, `tests/gates/feedback-tint-seam.test.ts`, `slider/*`, `carousel/*`, `pager-dots/*` deletions, `morph/eyeglass.ts`). Never selectable. |
| #34 | **GATED "after #33"** (`EXECUTION-PROGRESS:2115`), and #33 is itself UNSTARTED-in-flight. **[CORRECTION 2026-08-08 (CURE-8g): this row previously sat inside the IN-FLIGHT cell above. It is not in flight — `git status` carries no `toast/` path; the uncommitted feedback-family bytes are #33 W-ALERT's (`src/components/alert/*`). The disposition is a DAG gate, not a live lane.]** |
| #42 | HARD-GATED on #47 (`EXECUTION-DAG:53`) |
| #44 | LAND sequenced behind #43's cut (#43 is Φ6-UNSTARTED) |
| #45 · #52 | #45 on #52, #52 on #35 (C12) |
| #47 · #48 | #47 keeps #89's sever, the #7 fence and ASK g11; #48 is behind #47 W7 |
| #49 · #50 · #51 · #53 | ASK-gated (g3+g7 · g1 · g12+atlas ACK · g4) |
| **#54** | **before/with #50 W0 and #53** (`EXECUTION-PROGRESS:2094`), both ASK-gated — so #54 cannot open ahead of them. **[CORRECTION 2026-08-08 (CURE-8g): the row was omitted from this table entirely; it is walked and dispositioned here.]** |
| #56 | "after lane cuts" — i.e. after #79-#88 |
| #58 · #73 | ASK g11 (#73 also rides #58's chassis) |
| #67 | **SKIPPED — cannot be executed IN FULL.** Its R-7 cell is an OWED CAPTURE the owner alone can supply (footage ×3), and the cursor's own cell says **"every other arm proceeds"** (`EXECUTION-PROGRESS:2139`) — so the marks block no other arm and this is NOT a whole-row owner gate. It is passed over because a lane that can only land in part is not the next canonical UNSTARTED row, not because it is fenced. **[CORRECTION 2026-08-08 (CURE-8g): previously read "OWNER-GATE — R-7 footage ×3", which asserted a fence the cursor does not carry.]** |
| #74 | inside #88's cut |
| **#79** | **dep = `#68` ONLY, and #68 is SEALED (⊕³⁶). No ASK, no owner gate, no in-flight tree. → SELECTED.** |

#79 is also the head of the ten tier-3 lanes, whose completion is #56's and #64's stated
precondition. The one open door on the row — ⊕⁴ U-18(a), the ScrollCardHeader absorb — is
**DECLINE-ON-RECORD** by ⊕⁵ ratified default; the window closes with this cut. The
`useHeaderCondense` seed it names is **absent from disk** (`rg -l useHeaderCondense src demo tests`
→ 0 files), so it retires with the record and nothing was left unconsumed.

---

## 1 · THE WORK ORDER — TR#79 cell, verbatim

> | **79** | **W-CARD-MATERIAL** | CWT-3 §LANE card | Φ5 | cited whole; collisions C-2/C-3/C-4 per §B.7. After #68. ⊕⁴ U-18(a) (lane C): the ScrollCardHeader absorb door — **⊕⁵ ratified default DECLINE-ON-RECORD** (SE-4 — the bare either/or was the SL-7 class; the `useHeaderCondense` seed stays unconsumed and retires with the record, matching U-18(b)'s decline-default at #22); owner-reversible in one word while the window is open, and the window closes with the cut |

Cursor cell: `lane gates, close-battery class (CWT-3 §5); C-2/C-3/C-4 per §B.7; after #68`.

**Gate seats: +0.** CWT-3 §5's six card gates are declared **execution-time probes** by their own
heading ("abrogation budget respected; nothing lands in `tests/gates/`") and sit in TR §B.5's
acceptance/π class ("tier-3 55"). Nothing was minted, bound, or armed; the register receipt is
byte-identical pre→post.

---

## 2 · THE THREE FOLD AMENDMENTS, EXECUTED THE FOLD'S WAY

| id | lane body said | CWT-3 fold §2 / TR §B.7 rules | executed |
|---|---|---|---|
| **C-2** | §3.1 "One edit at `material-roles.css:20-22`" | `material-roles.css` is **#86's, DELETE**; card's cast leg moves into `card/styles.css` as an **APPENDED** leg; G-CARD-RIM re-keys to "default card resolves the rung's full multi-leg stack" | `material-roles.css` **untouched**. `card/styles.css` states the rung stack **once** as `--card-cast` and composes it at `.card.glass-resting[data-shadow]` — (0,3,0), which beats `[data-material][data-shadow]`'s (0,2,0) on specificity, not on import order. Four legs: `--glass-material-rim`, `--glass-under-shadow-default`, `--glass-shadow-resting`, `--shadow-card`. |
| **C-3** | §3.7 `Omit<SurfaceProps, "material">` | Surface goes 3-prop (**#86 owns `Surface.vue`**); `shadow` survives CARD-owned; **`grain` dies everywhere, including Card.vue's `grain: true` default** | `Surface.vue` **untouched** (7-prop at HEAD). `CardProps extends Omit<SurfaceProps, "material">` — §3.7 verbatim, and it *becomes* the 3-prop extension the moment #86 lands, with no second edit. `grain: true` **struck** (§3.7's `withDefaults → { size: "md", shadow: true }`); the K1 register strike itself is #86's file. |
| **C-4** | §3.4 "the selector widens `:where(.glass-card, .card)`; `.glass-card` survives" | **split by halves, the class DIES**; the material half folds onto `.glass-resting` (#86); the **engagement/focus-elevation half re-homes keyed on `.card`** (card's lane); **no `:where()` widening** | `glass/surfaces.css` **untouched** — zero bytes. The whole engagement register is authored fresh on `.card[role="option"]` in `card/styles.css`. `surfaces.css:44-45`'s false comment stays for **W-DOC-TRUTH** (§9 ROUTED names it). |

---

## 3 · PER-ITEM LEDGER — §4 STRIKE

| # | item | trace |
|---|---|---|
| S1 | 6 card-owned props + `material` via sever | `Card.vue` props: `{size, selected}` + `Omit<SurfaceProps,"material">`. `cartoon`/`grid`/`metal`/`variant`/`dataHue`/`dataHueStrength` gone. **The figure, with its detector verbatim** — five alternatives (`dataHueStrength` is `dataHue`-prefixed, so the union is five, not six): `grep -oE "cartoon\|grid\|metal\|variant\|dataHue" Card.vue \| wc -l` → **32 at HEAD, 10 now** (OCCURRENCES); `grep -cE "cartoon\|grid\|metal\|variant\|dataHue" Card.vue` → **25 at HEAD, 3 now** (LINES). The 10 surviving occurrences are all prose on those 3 lines of the interface doc-block. **[CORRECTION 2026-08-08 (CURE-8a): previously read "25 occurrences … now 3", which stated the LINE count under the word "occurrences" — two different detectors reported as one.]** |
| S2 | 3 exported types | `CardTier`/`CardVariant`/`CardMetal` struck from `card/index.ts` and `src/index.ts`. |
| S3 | `CardAction` | file DELETED (−14); dropped from both barrels, from the demo route, and from `public-surface.spec.ts`'s `rootRuntimeExports` — **moved into `retiredSubpathRuntimeMembers`**, which is the negative pin, so the deletion is asserted rather than merely un-asserted. The `.card-header:has(> [data-slot="card-action"])` grid fork dies with it. |
| S4 | 2 dead attribute bindings + their test assertions | `data-cartoon`/`data-grid` were bound and read by nothing; both bindings and both `Card.test.ts` assertions gone. |
| S5 | 5 re-declared defaults (+`grain` with K1) | `material`/`surface`/`deep`/`specular`/`as` byte-duplicated `Surface.vue:33-41` and are gone; `grain: true` struck per C-3. `withDefaults` is now `{ size: "md", shadow: true, selected: undefined }`. |
| S6 | the 6-declaration √φ generator | `styles.css:4-8` + the `sm` override GONE. HEAD painted 30.528 ×13 · 18.8677 ×3 · 20.352 ×2 · 9.1673 ×7 · 11.6611 ×3 · 6.11154 ×1 — six values, none of them a rung of the six-rung series. |
| S7 | 2 unscoped globals | `[data-variant="selection"]` and `[data-variant="selection"][data-selected="true"]` — class-less globals emitted from a component file — gone with the prop. |
| S8 | the nested backdrop root's `backdrop-filter` | `card-scroll.css:18` read `--glass-blur-resting` DIRECTLY inside the card's own glass, so the cell-suppression seam never reached it. The backplate is now `background: var(--glass-veil)` — the plate's own **resolved** colour, inherited, so it cannot disagree with the plate it sits on. |
| S9 | dead `container-type`/`container-name` | struck. `rg "@container size\|@container card-header" src demo` → **0 readers**, re-run this seat. |
| S10 | unconditional `scrollbar-hidden` | off the class list; the trailing feather is the affordance now. |
| S11 | layout-property transitions | `card-scroll.css:8` (`padding-block-start`) and `:31` (`font-size`) both gone. Nothing in `scroll.css` transitions a layout property. |
| S12 | the double `attrs.style` write | `useAttrs`, `hostStyle`, `selectionStyle`, `metalBorderClass` all deleted; `v-bind="$attrs"` carries `style` exactly once. |
| S13 | the `metal-*-border` composition | gone (the `.metal-*-border` utility itself lives on, demoed at `/substrates/glass-material`). |
| S14 | the `shadow && !cartoon` coupling | `:shadow="shadow"`. A prop no longer silently zeroes another. |

## 4 · PER-ITEM LEDGER — §4 ADD + §3 DESIGN

**THE TALLY, STATED HONESTLY: 6 of 7 executed, 1 REFUSED with grounds.** CWT-3 §4's ADD
sentence names **SEVEN** items — `selected` standalone · ARIA/cursor on the selectable arm ·
the `outline` ring · `--fill-hover`/`--fill-selected` consumption · the FLIP-scale glide +
`allow-discrete` exit + `aria-live` line · the scroll feather · `--card-shrink-threshold`.
Six are executed below; the seventh (`--card-shrink-threshold`) is REFUSED with grounds at
§5.1. The A-rows below number **eight** because the spec's fifth item bundles three
mechanisms and this ledger splits the glide (A6) from the exit + live-region line (A7) —
eight ROWS against seven ITEMS. **[CORRECTION 2026-08-08 (CURE-8d): any reading of this
table as "8/8 §4 ADD executed" conflates this ledger's row count with the spec's item
count and silently absorbs the refusal. The rate is 6/7 + 1 refused-on-record.]**

A9 is not the spec's; it is the C-4 half this lane owed and had not authored (see §5.6).

| # | item | trace |
|---|---|---|
| A1 | `selected` standalone (replacing 3 props) | `selected?: boolean`, **presence not truth**. `selected: undefined` is declared in `withDefaults` so Vue's BOOLEAN CASTING does not fire — without it an absent `Boolean` prop resolves to `false` and **every card in the library becomes an option with a tab stop**. My own contract case caught exactly that on the first run; see §6. |
| A2 | ARIA + cursor on the selectable arm | `role="option"`, `tabindex="0"`, `aria-selected="true\|false"`, `cursor: pointer` — armed by presence, absent otherwise. |
| A3 | the `outline` ring | `outline: 2px solid oklch(from var(--foreground) l c h / var(--ink-perimeter))` + `outline-offset: 2px`. Outline, not `box-shadow`: a shadow ring loses to `button/styles.css`'s (0,4,0) on any card that contains a button. The A1 glow leg (`0 0 8px` ink/0.15) rides the one rule that owns the COMPLETE resting list — C-7's stated condition — by appending to `--card-cast` instead of replacing it. |
| A4 | `--fill-hover` / `--fill-selected` consumption | both already PROPORTION §6 tokens; **nothing minted**. hover 0.05 (bracketed in `@media (hover: hover)`), selected 0.12, and hover-on-selected is the register's own DERIVATION `calc(--fill-hover + --fill-selected)` = 0.17 — §1.3 forbids minting a token for it. Fill Δ selected↔unselected = **0.12** (G-CARD-ENGAGE's floor, met exactly). The fill rides a `linear-gradient` on `background-image`, **not** `background-color`: the plate's colour IS the `background` `@utility glass-plate` writes, and a state that clobbers it erases the material to paint 5% of ink. `--card-fill` is a registered `@property` so it interpolates (the `@property --fade-start` in `utilities/base.css` is the stated precedent for a typed property riding its own recipe file). |
| A5 | press | the SHIPPED vocabulary — `--scale-press-sm` (0.97) on the spatial spring leg (`--spring-press-duration` / `--transition-liquid-spatial`). No literal, no composable, no per-atom token. The `.interactive-item` CLASS is deliberately not composed: it would drag `accent 50%` hover onto a glass plate. |
| A6 | FLIP-scale glide | title font-size FLIPS at the threshold (real geometry, once) and the glyphs travel to it on the compositor: `scale 1.272 → 1` in, `0.786151 → 1` out — √φ and 1/√φ, the same ratio the two rungs are apart. `data-shrink-glide` is set by the FIRST crossing only, so a card that mounts already-condensed plays no entrance. |
| A7 | `allow-discrete` exit + `aria-live` | description leaves via `visibility: hidden` + `opacity` + `transition-behavior: allow-discrete` — the discrete leg lands at the END of the fade instead of cutting it at frame zero. The header carries `aria-live="polite"` exactly when `shrink` is set. **WHAT THAT ACTUALLY BUYS, corrected:** a live region announces ADDITIONS. The condense REMOVES the description from the a11y tree, and no shipping screen reader announces a removal — **the departure is silent by construction**. The attribute earns the RETURN trip: on release the description re-enters the tree inside a live region and is read. The asymmetry is deliberate — narrating "description hidden" on every threshold crossing is scroll noise, not information — and the alternative offered by the cure (arming a real announce mechanism for the removal) is REFUSED on that ground. **[CORRECTION 2026-08-08 (CURE-8e): this row and `scroll.css`'s comment both read as though the attribute announced the removal. Both are restated; the comment at `card/scroll.css` §description-exit carries the same correction.]** |
| A9 | descendant focus-elevation (the C-4 half) | `.card:has(:focus-visible)` re-points **one leg**, `--card-cast-rung`, from `--glass-shadow-resting` to `--glass-shadow-floating` — the ladder's own next rung, substituted into the `--card-cast` list stated once, so the lift cannot fork the stack and the focus-ring rule still appends to the same name. The edge lifts `--ink-seam` → `--ink-edge` (a no-op on an already-elevated card) and stops there: `--ink-perimeter` (0.48) is the register's CONTROL rung, and a group that merely CONTAINS a focused control must not out-shout the control's own ring. `.card` gains the base `box-shadow`/`border-color` transition the lift needs to be liquid rather than to snap (`--engage-control-engage-release`; the PRM wildcard in `transitions.css` still zeroes it). **Not in the spec's §4 ADD list** — it is the half CWT-3 fold §2 C-4 assigns to this lane ("the engagement/focus-elevation half re-homes keyed on `.card`"), and §5.6 records why it was missing. |
| A8 | the scroll feather | `.card-scroll-host` absorbed out of `base-misc.css:183-187` into `card/scroll.css`, now with `overflow-y: auto` and the trailing ramp off the ONE `§FADING-SCROLL` register — same `--fade-end` custom, same `--fade-scroll-width` (16px) knob, same `gl-fade-end-out` keyframe. |
| D3.2 | field — subtraction, **no minted number** | S-6 honored to the letter: the card mints no veil α. `--glass-opacity-resting` untouched; Fable's 0.46 stays a non-binding seed. |
| D3.3 | edge — one ink, two arms | `--glass-border-rung` re-pointed on the card: `--ink-seam` (0.08) flush, `--ink-edge` (0.16) with `[data-shadow]`. HEAD painted `--glass-border-resting` = foreground **4%** in BOTH arms, so elevation carried no boundary discrimination at all. The rung ink is re-pointed, never the accent seam — `--glass-border-accent` still mixes a consumer's `--glass-accent` onto it, which is how atlas's "the ring, not the slab" keeps working. |
| D3.5 | proportion — generator → values | `--card-pad` **12** / sm **8** (`--space-body` / `--space-atom`); intra-group gap **8/4**; group gap **12/8**; radius **16** unchanged. `r : pad = 16 : 12`, residue exactly one rung. Type off the ONE ratio (PROPORTION §1.4): title `calc(--type-body × 1.272)` = rung +2 = **23.67**, description `calc(--type-body / 1.127838)` = rung −1 = **16.50**, content inherits rung 0 = **18.608**; shrink pair `× 2.058 → × 1.618` = **38.29 → 30.10**. HEAD's `--type-heading` was 25.888 — a φ rung of a *different* ladder — and the shrink pair was 53.28 → 41.888, right ratio, both ends off. Every rung derives from the one fluid `--type-body`, the `dialog/styles.css:65-72` idiom, so the intervals hold at the clamp floor, through the fluid arm and at the ceiling. |
| D3.7 | public surface, after | `{Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter}` + `{CardProps, CardSize}`. `CardSize` kept as the named sub-range (S-10). |
| D3.8 | on-disk | `card-scroll.css` → `card/scroll.css`, `@layer components`, `.card-scroll-host` absorbed · `.paper-grid` + its PRT arm → `styles/paper.css` · `[data-variant]` globals gone · `tests/components/ui/card/` → `tests/components/card/` with the dead-attribute assertions dropped · `styles/index.css` import re-pointed. |

## 5 · DIVERGENCES FROM THE LANE BODY, WITH GROUNDS

1. **`--card-shrink-threshold` (§4 ADD) — REFUSED.** The thresholds are inputs to a JS scroll
   trigger; a CSS custom property that no rule reads is a dead token, which is the exact class this
   tranche strikes (D8/D11's own charge). D20's real complaint — *"shrink literals 24/24/12 +
   `/2+24`; 24 off-series"* — is answered where the values live: `CONDENSE_PX = 20` and
   `RELEASE_PX = 12` are named constants in `CardHeader.vue` sitting on `--space-family` and
   `--space-body`, and the `/2 + 24` room test now reads `CONDENSE_PX`. Zero literals off the series
   remain in the shrink path.
2. **Release threshold 12, not 8.** §3.6 states both *"condense 20 down, release 8 up"* and
   *"Literals → `--card-shrink-threshold` on the 12/20 rungs"* in consecutive sentences. Taken: the
   rung statement — it names the pair's rungs explicitly, keeps the shipped release rung, and
   preserves a wider hysteresis band than 8 would (a band that narrow re-opens the flicker the band
   exists to prevent). Recorded, not silently averaged.
3. **The feather is TRAILING-EDGE ONLY.** A mask is fixed to the padding box, not the scrolled
   content, so a leading ramp would feather the STICKY header this host exists to carry — the one
   element that must stay crisp. D18's defect is *hidden content below* (207px, no feather); that is
   the edge that gets the ramp.
4. **The cast rule is scoped to `.glass-resting`.** `elevated` resolves to the resting rung, which is
   D1's actual subject. Restating a rung stack under a bare `.card[data-shadow]` would fork the
   ladder for `tier="quiet"`/`"floating"` cards (`tier` is heavy-live across five repos), so this
   lane cures the rung `elevated` actually resolves and leaves the rest alone. **What that means
   for a non-resting shadowed card, stated without hedging: it KEEPS the `material-roles.css`
   substitution, and therefore keeps LOSING the ladder's multi-leg stack, until #86 deletes that
   file.** `[data-material][data-shadow]` is (0,2,0) and beats `.glass-quiet`'s (0,1,0) box-shadow
   whatever this lane writes; a `tier="quiet"` card still resolves the single role leg. That is the
   defect surviving one more cut in a narrower scope — not a cured case — and C-2 gives the cure to
   #86's DELETE, which fixes every non-card Surface a fortiori at the same stroke. The live
   instances are the four `demo/stories/compositions/settings.vue` cards (§7).
   **[CORRECTION 2026-08-08 (CURE-8b): previously read "Every other rung keeps the ladder's own
   stack — and keeps the `material-roles.css` substitution", which asserts both halves of a
   contradiction in one sentence. Keeping the substitution IS losing the stack.]**
5. **`grain: true` struck now.** C-3 rules it dies and names Card.vue's default specifically; §4's
   "(+`grain` with K1)" sequences the K1 *register* strike, which is `grain-overlay.css` — #86's
   file. Cards now resolve `data-grain="false"`, which `surface-axis.css:32` already suppresses.
   **This is a real paint delta** and is owed to π (see §7).

6. **The C-4 focus-elevation half was MISSING, and is now authored (A9).** The C-4 cell in §2 read
   "the whole engagement register is authored fresh on `.card[role="option"]`" — true of the
   hover/selected/press/ring register, and it silently omitted the OTHER thing `.glass-card`
   carried: `:has(:focus-visible)` DESCENDANT focus-elevation (`glass/surfaces.css:52-55`), which
   is not a selectable-card state at all but a group's answer to holding the keyboard focus of
   something inside it. Keying it on `[role="option"]` would have lost it outright — an inert
   content group with a `<Button>` in its footer is exactly the case it exists for. It is now
   `.card:has(:focus-visible)`, one leg re-pointed (§4 A9). The border leg of the predecessor is
   deliberately NOT carried past `--ink-edge`: `.glass-card` lifted its border 4% → 5%, a step
   below the noise floor, and the only rung above `--ink-edge` is the control/focus-ring
   `--ink-perimeter`, which a container must not wear.

7. **`.paper-grid` restored to `@layer components`; the collision NAMED rather than dodged.** The
   relocation into `styles/paper.css` had also escalated the rule OUT of the cascade layer it
   lived in at HEAD (`card/styles.css`'s own `@layer components`). Unlayered, it outranks every
   component register in the library — an escalation that buys one thing: it wins the
   `background-image` slot against `.card[role="option"]`'s state fill (A4). That is a workaround
   wearing a relocation. Restored to the layer; the collision is real either way and is recorded
   here rather than resolved by cascade position: **on a card that is BOTH ruled and selectable,
   the state fill (0,2,0) wins the one `background-image` slot and the ruling does not paint.**
   The plate has exactly one such slot — `::before` is `glass/material.css`'s specular ring and
   `::after` is `glass/grain-overlay.css`'s tooth, both already spoken for — so composing the two
   needs a decoration/state slot CONTRACT, not a card-local `:not(.paper-grid)`. Routed to #62
   (§8), beside the `cartoon-surface` re-home it belongs with. **No site on disk combines them**
   (the demo's ruled card is `tier="quiet"` and inert; the selectable cards are unruled), so the
   seam is latent, not a live defect. In-layer it fails toward the DECORATION; unlayered it would
   have failed toward the STATE, which is the functional half — the layer restore is also the
   safer failure direction.

## 6 · BORN-RED, AND WHAT BIT

The lane's six gates are execution-time probes (§5), so nothing was seated. The unit contract was
re-authored instead, and it bit twice on its first run against my own implementation:

- **`role="option"` on every card.** `expected 'option' to be undefined` ×2 —
  Vue's boolean casting resolves an absent `Boolean` prop to `false`, so `selected !== undefined`
  was universally true and every inert content group had a tab stop and an `aria-selected`. Cured by
  declaring `selected: undefined` in `withDefaults`; both cases green.
- **`--card-pad-inline` / `--card-pad-block` published with no source.**
  `tests/styles/token-graph.test.ts` red: the two names are in `tokens/manifest.ts`'s public `space`
  domain and the collapse to ONE `--card-pad` orphaned both. Cured at the manifest (clean break, no
  alias) and at the one demo reader (`auth-shell.vue:118`, which was reading `--card-pad-block`
  behind a `calc(--spacing(6) * 1.272)` literal fallback — the generator, pasted into a consumer).

HEAD traces for the other born-RED rows, re-derived this seat:
`git show HEAD:src/components/card/styles.css | grep -ci "hover\|focus"` → **0**;
same for `Card.vue` → **0** (D3: the module carried zero engagement rules under a comment in
`surfaces.css` asserting `<Card>` "owns its own hover composition"). Now **24** lines in
`styles.css` (16 before the cure pass; A9's descendant-focus block is the +8).
`rg "@container size|@container card-header" src demo` → **0** (D19).

**THE CURE PASS ADDED TWO CASES, AND ONE OF THEM WAS BORN FALSE-GREEN.** Both are in
`tests/components/card/Card.test.ts`; the file is now 11 cases (9 → 11):

- `arms no glide when a condense crossing finds no room to condense` (CURE-2's contract).
  **It passed against the defect on its first run** — a false green. The scroll was dispatched
  before the post-flush `scrollRoot` watcher had settled, so `syncInitialState`'s own
  glide reset (added by the same cure) landed AFTER the crossing and answered the assertion
  instead of `onCross`. Cured by settling the binding with a `nextTick()` before the scroll;
  re-run against a restored unconditional `glide.value = true` it now FAILS, which is the only
  evidence that it tests anything.
- `condenses past 20 and not at 19 — the threshold is pinned, not approximated` (CURE-7).
  Mutation-verified in **both** directions this seat: `CONDENSE_PX` 20 → 12 fails it (19 crosses
  a lowered threshold), 20 → 24 fails it (21 no longer crosses a raised one). The pre-cure suite
  only ever scrolled to 30 and stayed green under the 20 → 12 mutant.

## 7 · π — NOT CLAIMED

No paint cell is claimed. §6's P1-P9 are owed to **#10 π-SUITE** at its serialized browser seat
(port 5400, Chromium 150 **and** real `safari-app` 26.4, cells banked separately, never
cross-inferred), with the `/display/card` 299-node void baseline carried and **−1 expected** after
the `CardAction` cut. **P6 (shrink frame-series) is declared BLOCKED on W-CAPTURE-MOTION** by the
spec itself (`capture.css:29-38` kills motion under `data-capture`) — blocked, not narrated.

**THE π-OWED LIST, COMPLETE.** Every paint delta this lane authored, named, so #10 captures a
pair for each rather than re-deriving the set:

| delta | where | why it is owed |
|---|---|---|
| `grain: true` struck (C-3) | every `<Card>` in every consumer | cards resolve `data-grain="false"`; the tooth stops painting on the whole family |
| edge 4% both arms → `--ink-seam` 0.08 flush / `--ink-edge` 0.16 elevated | every `<Card>` | the first boundary the elevation axis has ever had |
| the cast COMPOSES (four legs) instead of substituting one | the default elevated card | D1's root fix; leg count and identity, both modes |
| the √φ generator → the space series | every `<Card>`; `md` and `sm`, 1440 and 402 | 30.528 ×13 / 18.8677 ×3 / 9.1673 ×7 all move to rungs |
| the type ladder re-derived off `--type-body` | title / description / content / the shrink pair | four rungs move; the clamp floor and ceiling both need a cell |
| **descendant focus-elevation (A9, NEW this cure pass)** | any card containing a focusable child — the `/display/card` "Explicit action" and narrow specimens both do | a rung lift + an edge lift that did not exist at HEAD in ANY form on `.card`; needs a keyboard-focus pair, and a NEGATIVE pair on pointer focus (`:focus-visible`, never `:focus`) |
| **`material="content"` → `tier="quiet"` on four cards (NEW to this list)** | `demo/stories/compositions/settings.vue` ×4 | HEAD resolved `[data-material="content"]` → `--surface-role-shadow: var(--shadow-sm)`; the cards now carry Surface's default `elevated` role, so `[data-material][data-shadow]` (0,2,0) paints **`--shadow-card`** and still beats `.glass-quiet`'s own rung (§5.4 — the substitution these four keep until #86). `--shadow-sm` → `--shadow-card`, ×4 |
| **the auth-shell panel pad (NEW this cure pass, CURE-6)** | `demo/stories/compositions/auth-shell.vue` sign-in panel, sub-`lg` arm only | HEAD painted a frozen **30.528px** (`calc(--spacing(6) * 1.272)`, the generator pasted into a consumer behind an unresolvable `--card-pad-block`); it is now `--space-section` = **32px**, and it TRANSPOSES to 20px at ≤768 where the literal never moved. Δ +1.472px at fine, −10.528px at ≤768. The `lg:` arm (3.5rem) is byte-unchanged |
| **the scroll-host re-home (NEW this cure pass, CURE-1)** | `/display/card` "Shrinkable header" specimen | the feather mask and `overflow-y` move off the `<Card>` onto an inner viewport: the plate's bottom edge stops dissolving over the ramp and `--card-cast` stops being clipped. This is the P1 rim cell's own subject on that specimen and needs its own pair. **Node-count note: the specimen gains ONE `<div>`, so the `/display/card` void baseline is 299 − 1 (`CardAction`) + 1 (the viewport) = 299 again.** |

The `CardAction` −1 and the viewport +1 cancel; #10 should expect **299 nodes, unchanged**, not
298. **[CORRECTION 2026-08-08 (CURE-8c): the pre-cure §7 named only two deltas ("the grain-default
strike and the edge move are the two most owed") and carried a bare −1 node expectation. Both are
restated above.]**

## 8 · ROUTED — named owners, no silent drops

- `material-roles.css` DELETE · `.glass-card` material half · K1 grain / K2 specular ring / K3 rim
  legs (top 0.30→≤0.12, side leg, `::before` plus-lighter ring) → **#86 W-SURFACE-MATERIAL**
- resting veil α + the blur ladder, with both arithmetic constraints (monotone dilution; the +40%
  ceiling at `saturate(1.4)`) → **W-BLUR-LADDER / #22 W-FROST**
- `saturate` on the Safari arm · the +62% reachability · Surface-mounts-sampler → **#22 W-FROST**
- field chroma capacity (`vividness: 0`) → **#49 GF-AURORA**
- `@utility cartoon-surface` re-home + the K18/K20 cast retune → **#62 W-COLOCATION** (§9 names it;
  the exclusivity doc line asked for by §3.8 is written at the utility in place)
- **the ONE-`background-image`-slot seam** — `.paper-grid` (decoration) and `.card[role="option"]`
  (state fill) both write it, and the plate's `::before`/`::after` are already `glass/material.css`'s
  ring and `glass/grain-overlay.css`'s tooth, so a composition needs a decoration/state SLOT
  CONTRACT rather than a per-class `:not()` → **#62 W-COLOCATION** (§5.7; latent — no site combines
  them today)
- `.card-board` 17rem → 21rem cel → **#59 W-LAYOUT**
- residual `tests/components/ui/**` (10 dirs + `reka-binding-idiom.test.ts`) → the **DAG §5
  tests-isomorphism sweep**, one owner; card moved only its own
- P6 harness → **#3 W-CAPTURE-MOTION**
- the 10 `cards.css` phantoms (`index.css:103,104` · `scale-paper.css:132,137,144,156` ·
  `dock/styles/shape.css:170,182` · `AppShell.vue:218` · `settings.vue:66`) · `surfaces.css:44-45`'s
  false comment · `ladder.css` ~318's stale dead-knob clause → **#61 W-DOC-TRUTH**
- **three more stale-prose sites, added this cure pass (CURE-8f + one found beside them)** →
  **#61 W-DOC-TRUTH**: `src/styles/glass/deep.css:19` ("the CardTier map is `deep →
  'glass-floating glass-deep'`" — `CardTier` is struck at 8.0.0 and the map it names is Surface's)
  · `demo/chassis/code/Code.vue:65` (a comment citing `--card-pad-title-gap-scale`, a name that is
  not on disk at HEAD *or* after this cut — it names the φ²-tight intra rhythm the generator strike
  deleted) · **`MIGRATION.md:1270`** (the 5.0.0 `BI.W-SURFACE-EXTRACT` block instructs consumers to
  "compose `Card` with `class="card-scroll-host"`" — the plate is now exactly where that class must
  NOT go; a historical section, so it is routed rather than edited by this lane, but it is a live
  wrong instruction, not a stale label)
- consumer addenda — atlas (`variant`+`selected`+`data-hue` → `selected` + `--glass-accent`; the
  already-broken `CardSurface` type import) · speedtest (`:grid` → `class="paper-grid"`) ·
  keyframes.js (7 `cartoon` setters → `.cartoon-surface`, + the undeclared-dependency S1) ·
  bbnf-buddy / bbnf-lang (legacy-pin notes) → **#76 W-CONSUMER-BAND / LIB-SEAM batch**
- **R-4 idle engagement → OWNER.** Hard-blocks card breath; **not built**, not approximated.

## 9 · VERIFY GATE — verbatim

**Re-run in full at the CURE PASS (2026-08-08). The figures below are the post-cure run;
the pre-cure run differed only in the passed count (1417 → 1419, this pass's two added
cases) and is superseded.**

```
$ npx vue-tsc --noEmit
(no output; exit 0)

$ npm run demo:dist:build
✓ built in 1.42s

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 150 passed (156)
      Tests  11 failed | 1419 passed | 5 expected fail (1435)

 FAIL  tests/components/carousel/contract.test.ts > Carousel landmark contract > exposes a named carousel region — and its tab stop — when the caller supplies a name
 FAIL  tests/components/pager-dots/contract.test.ts > PagerDots SVG resources > allocates a fresh namespace on remount and removes definitions on unmount
 FAIL  tests/components/pager-dots/contract.test.ts > PagerDots SVG resources > keeps filter and clip ids unique per instance and stable across rerender
 FAIL  tests/components/pager-dots/contract.test.ts > PagerDots boundaries > clamps selection when a dynamic count shrinks
 FAIL  tests/components/pager-dots/contract.test.ts > PagerDots boundaries > normalizes fractional semantic selection and keeps keyboard steps integral
 FAIL  tests/components/pager-dots/morph.test.ts > PagerDots goo-morph signature (BJ.W-PAGER-DOT-MORPH) > is ONE reunited body at rest — no bridge, no gap
 FAIL  tests/gates/gate-register.test.ts > the gate register binds (G-GATE-BUDGET) > BITE — a `describe.skip(` block leaves every rostered row beneath it ABSENT
 FAIL  tests/gates/gate-register.test.ts > the gate register binds (G-GATE-BUDGET) > BITE — a live `it.only(` leaves its rostered siblings ABSENT, itself bound
 FAIL  tests/gates/gate-register.test.ts > the gate register binds (G-GATE-BUDGET) > every seat and every rostered row resolves to an executable
 FAIL  tests/gates/overfit-structure.test.ts > gate:G-OVERFIT — EXPORT-REACH arm (the TS twin of orphan-css-partial) > every runtime export is reachable — no export leaks (zero external site AND unpublished)
 FAIL  tests/styles/stacked-url-filter.test.ts > stacked url() filter — the row #7 unit case > no file paints filter: url(#…) co-occurring with its own backdrop-filter lens — BORN-RED on PagerDots.vue:493, #40 W-PAGER owns the flip

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
  VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts
```

**Every one of the 11 is FOREIGN and byte-identical in composition to the ⊕⁵⁵ baseline** (11 failed
| 1416 passed | 5 expected fail (1432), six files): #40's uncommitted pager/carousel lane (6) ·
`gate-register` on #40's uncommitted deletion of `pager-dots.contract.test.ts` (3) ·
`overfit-structure` on #40's untracked `useLeadTrail.ts` (1) · `stacked-url-filter`, born-RED by its
own title, owned by #7/#40 (1). **Δ row-own = +3 passed, +0 failed** — the header-announce case
plus the cure pass's two (`arms no glide when a condense crossing finds no room to condense`,
`condenses past 20 and not at 19`); 1432 → 1435 total.

The register receipt is **byte-identical pre→post**, including `drift:1` and `violations:1` — the
violation is #40's uncommitted deletion, recorded and not this row's to reach (⊕⁵¹/⊕⁵³/⊕⁵⁵
precedent). **No seat pointed at `tests/components/ui/card/`**, so the directory move moved no
binding.

**THE WHOLE-TREE RUN, and the two extra failures it surfaces.** The gate above is the
three-directory subset (the ⊕⁵⁵-comparable cell). `npx vitest run` over the WHOLE `tests/` tree
reports **13 failed | 1821 passed | 5 expected fail (1839)** across 7 files — the same 11 plus
TWO in `tests/public-surface.spec.ts`, which the subset does not reach (it sits at the tests root,
not under `styles`/`components`/`gates`). **Both are FOREIGN and both trace to ONE condition:**

- `Row 8 package falsifiers > keeps package and lock root metadata in exact agreement` —
  `package.json` has `embla-carousel` / `embla-carousel-vue` removed from `peerDependencies`,
  `peerDependenciesMeta` and `devDependencies` with **no lockfile update**. That is the
  uncommitted carousel lane's edit (`git diff package.json`), not this row's.
- `Row 8 built-artifact acceptance > ships exactly the style closure plus the three generated
  members` — a STALE `dist/`, which still lists `components/card/card-scroll.css` (the pre-rename
  name) and `components/carousel/styles.css` (deleted by the same carousel lane).

**`npm run build` CANNOT refresh `dist/` while that lane sits uncommitted**: the
`glass-ui:publish-style-assets` plugin's `verifyExportTypes` aborts the build with
`package.json/package-lock.json root metadata mismatch: devDependencies, peerDependencies,
peerDependenciesMeta`. `npm run demo:dist:build` is unaffected and green (it is what clears the
`boot-graph` build-arm freshness case, which fails on any un-rebuilt source edit). **This is a
DRIVER-side blocker, flagged here and not worked around**: the commit-time `npm run build` /
`--run release` arm will not pass until the carousel lane's lockfile is reconciled, and no edit
in this row's fence can reach it.

## 10 · DIFF

Post-cure, re-derived this seat (`git diff --stat` over the lane's fence):

```
 CHANGELOG.md                             |  28 ++++
 MIGRATION.md                             |  84 +++++++++-
 demo/chassis/code/CodeBlock.vue          |   2 +-
 demo/stories/compositions/auth-shell.vue |   9 +-
 demo/stories/compositions/settings.vue   |   8 +-
 demo/stories/display/card.vue            |  90 ++++++----
 src/components/card/Card.vue             |  93 ++++------
 src/components/card/CardAction.vue       |  14 --
 src/components/card/CardHeader.vue       |  50 ++++--
 src/components/card/card-scroll.css      |  56 -------
 src/components/card/index.ts             |  10 +-
 src/components/card/styles.css           | 280 ++++++++++++++++++++++++-------
 src/index.ts                             |   4 -
 src/styles/paper.css                     |  54 ++++++
 src/styles/tokens/manifest.ts            |   3 +-
 src/styles/utilities/base-misc.css       |   8 +-
 tests/components/ui/card/Card.test.ts    | 180 --------------------
 tests/public-surface.spec.ts             |   4 +-
 18 files changed, 527 insertions(+), 450 deletions(-)
+ src/components/card/scroll.css          | 175 (new, untracked)
+ tests/components/card/Card.test.ts      | 268 (new, untracked)
+ src/styles/index.css                    |   3 +- (the one import re-point; the file also carries
                                                   #32/#40's uncommitted hunks, untouched here)
```

**[CORRECTION 2026-08-08: the pre-cure §10 read "16 files changed, 319 insertions(+), 429
deletions(-)" and omitted `MIGRATION.md` / `CHANGELOG.md` entirely — the 8.0.0 public-surface
booking was never written until CURE-3. The stat above is the post-cure re-derivation.]**

LOC, measured (`wc -l`, this seat): `Card.vue` **96 → 63** · `styles.css` **108 → 260** (the
engagement register the card never had — hover/selected/press/ring plus the descendant-focus lift —
with the law stated where it is executed) · `card-scroll.css` 56 → `scroll.css` **175** (absorbs
`.card-scroll-host` + the feather + the glide + the never-on-the-plate constraint) ·
`CardHeader.vue` **60 → 88** · `index.ts` **14 → 6** · `CardAction.vue` **−14** · `base-misc.css`
**−7**. The module is 408 → 660; the reduction is in the *decisions*
(−7 props, −4 exports, −1 component, −6 generator declarations, −2 unscoped globals), not in the
byte count, and this record says so rather than quoting a net that flatters.

## 10b · THE CURE PASS — driver order `CURE-ORDER-79.md`, 2026-08-08

Eight cures ordered on the adjudicated residue; **8 executed, 0 refused.** The seat is the same
`claude-opus-5[1m]` model class asserted at the head of this record.

| cure | disposition | what changed |
|---|---|---|
| **1** feather re-homed off the plate | DONE | `demo/stories/display/card.vue` — an inner `<div class="card-scroll-host card-scroll-example" tabindex="0">` inside `<Card>` now carries the header + content; the ceiling and the tab stop move onto it. Constraint stated at `CardHeader.vue`'s `shrink` doc-block AND in `scroll.css`'s own `.card-scroll-host` comment (with the reason: a mask clips the element's WHOLE rendering, plate edge and cast included). **Selector contract unchanged** — `.card-scroll-host` was always the host's name and `closest()` still resolves it; what was wrong was the ELEMENT wearing it, not the selector. `CHANGELOG.md:700`'s original 8.0-era line already said "apply to the scroll wrapper inside a `<Card>`", so this restores the class's first contract rather than inventing one |
| **2** glide arms on a FLIP, not a crossing | DONE | `CardHeader.vue` `onCross` computes `next` first and returns early when `next === condensed.value`; `syncInitialState` clears `glide` on a scroll-root re-resolve. Contract case added and **mutation-verified** (§6) |
| **3** the 8.0.0 card cut booked | DONE | `MIGRATION.md` §8.0.0 gains a Card block in the house shape (lead paragraph + `_Props_` / `_Runtime + type exports_` / `_CSS custom properties_` / `_Paint deltas_` tables), matching the LabeledSelect and dock bookings above it; `CHANGELOG.md` §8.0.0 gains a `### Changed` and a `### Fixed`. The three `/api`-census rows (`CardMetal` / `CardTier` / `CardVariant`) are re-dispositioned "removed 8.0.0" with successors, and the `:534` example import swaps the now-deleted `CardTier` for `BadgeVariants` (`/badge`) — a symbol that is in the 203-symbol census AND still exported. Existing #72/#57 sections untouched |
| **4** the C-4 focus-elevation half | DONE (authored, not refused) | `.card:has(:focus-visible)` — §4 A9, §5.6 |
| **5** `.paper-grid` back in `@layer components` | DONE | `styles/paper.css` — the rule, its `.dark` arm and its PRT arm move into the layer; the PRT block that stays unlayered is the one holding the two `@utility` registers, which a components-layer rule could not override. Collision named and routed — §5.7, §8 |
| **6** the auth-shell pad | DONE | `--space-section` written directly; §7 carries the sub-`lg` delta |
| **7** the condense threshold pinned | DONE | 19-must-not / 21-must; mutation-verified both directions (§6) |
| **8** record accuracy (a–g) | DONE, all seven | (a) §3 S1 · (b) §5.4 · (c) §7 · (d) §4 header · (e) §4 A7 + `scroll.css` comment · (f) §8 · (g) §0. Each carries a dated `[CORRECTION 2026-08-08]` bracket naming what it replaced. `PASTE-BLOCKS.md` §A is re-folded with the corrected figures |

**Found beside the order, recorded not silently fixed:** `MIGRATION.md:1270` tells consumers to
put `class="card-scroll-host"` on the `<Card>` — the exact placement CURE-1 forbids. It sits in a
historical 5.0.0 section that the order fences ("do not touch the existing sections"), so it is
routed to #61 (§8) and flagged to the driver rather than edited here. It is a live wrong
instruction, not a stale label, and it deserves a faster owner than a doc-truth sweep.

## 11 · WHAT DID NOT MOVE

`glass/material-roles.css` · `glass/surfaces.css` · `glass/ladder.css` · `glass/rim.css` ·
`surface/Surface.vue` · `glass/grain-overlay.css` · `styles/glass/material.css` — every one of them
another row's file per C-1…C-9. Zero bytes.
