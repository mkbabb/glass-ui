# BK #79 — banked paste blocks (driver applies; OUT of the implementing seat's fence)

The implementing seat commits nothing and edits neither the cursor nor the roster. Both blocks below
are ready to paste **verbatim** by the driver at the landing commit, with `<SHA>` replaced by the
commit that carries the cut.

**Re-folded at the CURE PASS (2026-08-08, `CURE-ORDER-79.md`, 8/8 executed).** The figures below
are the post-cure ones: battery **11 failed | 1419 passed | 5 xfail (1435)** on the ⊕⁵⁵-comparable
three-directory cell (Δ row-own **+3 passed**, not +1); the S1 detector stated with its two
distinct greps; the §4 ADD rate stated as **6/7 + 1 refused**, never 8/8; the `/display/card` void
baseline **unchanged at 299** (the `CardAction` −1 and the scroll-viewport +1 cancel); the eight
cures themselves folded in. The ⊕-index is written `⊕ⁿ` and derived at commit time from the cursor
tail — never a remembered number.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — Φ5 table, row #79

Replace the row's `state` cell:

```
| 79 | W-CARD-MATERIAL | Φ5 | UNSTARTED | TR#79 → CWT-3 §LANE card | lane gates, close-battery class (CWT-3 §5); C-2/C-3/C-4 per §B.7; after #68 |
```

with:

```
| 79 | W-CARD-MATERIAL | Φ5 | ⊕⁵⁶ **SEALED 2026-08-08** at `4a04b43c` ~~UNSTARTED~~ — the first tier-3 lane, and the one where the plate stopped lying about what it is. **THE ROOT FIX IS A COMPOSITION**: `[data-material][data-shadow]` (`material-roles.css:20-22`, (0,2,0)) REPLACED the rung's whole box-shadow with one role leg, so the DEFAULT card — the one plate in the library that declares itself elevated — resolved a single `--shadow-md` and **zero white channels**; the rung stack is now stated ONCE as `--card-cast` and composed at `.card.glass-resting[data-shadow]` (0,3,0), four legs, in card's own file, with `material-roles.css` untouched because C-2 gives that file to #86 (whose DELETE cures every other Surface a fortiori). **THE EDGE GETS TWO ARMS**: `--glass-border-rung` re-pointed to `--ink-seam` 0.08 flush / `--ink-edge` 0.16 elevated — HEAD painted foreground **4% in BOTH arms**, so elevation had no boundary at all; the accent seam is untouched, so atlas's "the ring, not the slab" still reaches it. **THE REGISTER THE CARD ADVERTISED, BUILT**: zero hover and zero focus rules existed in the whole module (`grep -ci "hover\|focus"` → 0 at HEAD, both files) under a `surfaces.css` comment asserting the opposite — `.card[role="option"]` now carries the bracketed hover (`--fill-hover`), the persistent `--fill-selected` (Δ 0.12 exactly), their 0.17 DERIVATION for both-at-once (a rung §1.3 forbids minting), the `outline` ring at `--ink-perimeter` (a box-shadow ring loses to `button/styles.css`'s (0,4,0)), and the shipped `--scale-press-sm` press on the spatial spring leg — all keyed on `.card`, **no `:where(.glass-card, .card)` widening** (C-4: the class splits by halves and dies; `surfaces.css` gets zero bytes here). **AND C-4's OTHER HALF, which is not a selectable-card state at all**: `.card:has(:focus-visible)` lifts the group ONE rung while a control INSIDE it holds keyboard focus — one leg re-pointed (`--card-cast-rung`, resting → floating) so the lift cannot fork the stack, plus the edge seam → edge, and deliberately NOT on to the control/focus-ring `--ink-perimeter` (a group that merely contains a focused control must not out-shout the control's own ring; the predecessor's 4% → 5% border lift was a step under the noise floor). `.card` gains the base `box-shadow`/`border-color` transition the lift needs to be liquid rather than to snap. **PRESENCE IS THE SIGNAL** — `selected` present arms `role="option"` + tab stop + `aria-selected`; `selected: undefined` is declared in `withDefaults` because Vue's boolean casting otherwise resolves absent → `false` and makes **every card in the library an option** (caught by this row's own contract case on its first run). **THE GENERATOR DIES**: six declarations multiplying one seed by √φ/φ/φ² painted 30.528 ×13 · 18.8677 ×3 · 20.352 ×2 · 9.1673 ×7 · 11.6611 ×3 · 6.11154 ×1, not one of them a rung — replaced by ONE `--card-pad` (12/sm 8) + two gaps (8/4 intra, 12/8 group) on `--space-*`, `r : pad = 16 : 12` with residue exactly one rung, and type off the ONE ratio (title `×1.272` = 23.67 · description `/1.127838` = 16.50 · content rung 0 = 18.608 · shrink pair `×2.058 → ×1.618` = 38.29 → 30.10), every value derived from the single fluid `--type-body` so the intervals hold at the clamp floor, through the fluid arm and at the ceiling. **−7 props +1** (`cartoon`/`grid`/`metal`/`variant`/`dataHue`/`dataHueStrength` + `material` severed), −4 type/component exports, `CardAction` DELETED (0 external importers; its pin MOVED to `retiredSubpathRuntimeMembers`, so the deletion is asserted not merely un-asserted), 5 byte-duplicate defaults struck + `grain: true` (C-3), 2 class-less `[data-variant]` globals struck, `container-type` with **0 `@container` readers** struck, the double `attrs.style` write cured, the `shadow && !cartoon` silent zeroing gone. **SHRINK IS COMPOSITOR-ONLY**: `card-scroll.css` → `card/scroll.css` in `@layer components`; the `::before` loses the nested `backdrop-filter` that read `--glass-blur-resting` directly (a backdrop root inside the card's own glass the cell-suppression seam never reached) for `background: var(--glass-veil)` — the plate's own resolved colour; `padding` and `font-size` FLIP at the threshold and the glyphs travel on a `scale` glide (√φ in, 1/√φ out) armed by the FIRST crossing only; the description leaves via `visibility` + `allow-discrete` instead of a `display: none` that cut the fade at frame zero, and the header carries `aria-live="polite"`. `.card-scroll-host` absorbed out of `base-misc.css` with a TRAILING-edge feather off the ONE `§FADING-SCROLL` register (a mask is fixed to the padding box, so a leading ramp would feather the sticky header this host exists to carry) — `scrollbar-hidden`, welded unconditionally over 207 hidden px, is gone. **THE HOST IS NEVER THE PLATE**: the class rides an element INSIDE the `<Card>` — the viewport holding header + content — because a mask clips the element's WHOLE rendering, so worn by the `<Card>` it dissolved the plate's own bottom edge over the ramp and clipped `--card-cast` away with it; the constraint is now stated at `CardHeader.vue`'s `shrink` doc-block and at the rule itself, and the demo composes it that way (this restores the class's ORIGINAL contract — "apply to the scroll wrapper inside a `<Card>`", `CHANGELOG.md:700`). **AND THE GLIDE ANSWERS A FLIP, NOT A CROSSING**: `onCross` computes the next state first and arms `data-shrink-glide` only when it differs, so a condense crossing on a header with no room to condense animates nothing; `syncInitialState` clears the glide when the scroll root re-resolves. `aria-live="polite"` is stated honestly — a live region announces ADDITIONS, so the description's DEPARTURE is silent by construction on every shipping screen reader and what the attribute buys is the RETURN trip. `.paper-grid` + its PRT arm relocate to `styles/paper.css` **and stay in `@layer components`** — a decoration class does not escalate out of the cascade to win a slot fight; the one collision it has (`.card[role="option"]`'s state fill writes the same `background-image`, and the plate's `::before`/`::after` are already the specular ring and the grain tooth) is NAMED and routed to #62 rather than resolved by escalation, and no site combines them today. `tests/components/ui/card/` → `tests/components/card/`. **THE 8.0.0 PUBLIC SURFACE IS BOOKED**: `MIGRATION.md` §8.0.0 carries a Card block in the house shape (per-prop table with successors — `cartoon`/`grid`/`metal` → the `cartoon-surface` / `paper-grid` / `metal-{gold,silver,bronze}-border` classes they always wrapped, the `variant` trio → `selected`, `dataHue`* → `--glass-accent`, `material` severed; the export table; the custom-property table; the scroll-host recipe; the paint deltas), the three `/api`-census rows for `CardMetal`/`CardTier`/`CardVariant` are re-dispositioned "removed 8.0.0" with successors, and the §5.0.0 fold example's now-deleted `CardTier` import is swapped for a census symbol that survives (`BadgeVariants`, `/badge`); `CHANGELOG.md` §8.0.0 gains a `### Changed` and a `### Fixed`. **MINTED NOTHING**: no token value, no component, no composable, no gate seat — the six CWT-3 §5 gates are execution-time probes by their own heading and sit in §B.5's acceptance class. **§4 ADD executed 6 of 7, with the 7th refused on record** — the spec's ADD sentence names seven items and this record's A-rows number eight because one spec item bundles three mechanisms; the rate is 6/7 + 1 refused, never 8/8. Divergences RECORDED not averaged: `--card-shrink-threshold` REFUSED (a custom property no rule reads is a dead token; the thresholds are JS inputs, now `CONDENSE_PX`/`RELEASE_PX` on `--space-family`/`--space-body`, and the `/2+24` room test reads the constant) · release rung **12** taken over §3.6's own "release 8" (the same sentence pair names "the 12/20 rungs"; 8 collapses the hysteresis band) · the cast rule scoped to `.glass-resting` so no other rung is forked. **U-18(a) DECLINED ON RECORD and the window CLOSES** — the `useHeaderCondense` seed is absent from disk (`rg -l` → 0), so it retires consumed by nothing. **THE FENCE, re-derived at this back-annotation and never carried**: 18 tracked files **+527/−450**, plus 2 new (`src/components/card/scroll.css` 175 · `tests/components/card/Card.test.ts` 268) and `src/styles/index.css`'s surgical **+3/−2** — the ONE import re-point, split out by index surgery INSIDE the cut, so this landing carries **no completion riders** and #32/#35/deck's hunks in that same file stay uncommitted in the tree; staged total **21 code files, +973/−452** (the commit's 24 files / +1,567 insertions carry the 3 record docs on top). **VERIFY at the cut** (post-cure): `vue-tsc --noEmit` exit 0, no output · `demo:dist:build` green · `tests/styles tests/components tests/gates` **11 failed \| 1419 passed \| 5 expected fail (1435)** across 6 files, every one FOREIGN and byte-identical in composition to the ⊕⁵⁵ baseline (#40's uncommitted pager/carousel lane ×6, its deleted `pager-dots.contract.test.ts` in `gate-register` ×3, its untracked `useLeadTrail.ts` in `overfit-structure` ×1, `stacked-url-filter` born-RED by its own title ×1); Δ row-own = **+3 passed, +0 failed** (the header-announce case + the cure pass's glide-flip and threshold-pin cases, both mutation-verified — and the glide-flip case was **BORN FALSE-GREEN and RE-ARMED**: it passed against the defect on its first run because the scroll was dispatched before the post-flush `scrollRoot` watcher had settled, so `syncInitialState`'s own reset answered the assertion instead of `onCross`; a `nextTick()` settles the binding and the case now FAILS against a restored unconditional `glide.value = true`, which is the only evidence it tests anything — §6) · the WHOLE-tree `vitest run` reports **13 failed \| 1821 passed \| 5 xfail (1839)** — the same 11 plus TWO in `tests/public-surface.spec.ts` that the three-directory cell does not reach, **both FOREIGN and both downstream of ONE condition**: an uncommitted lane removed `embla-carousel*` from `package.json` without a lockfile update (**#32's bytes, DRIVER-CONFIRMED at this back-annotation**; RECORD §9 attributes the same edit to "the carousel lane", #40 — both attributions stand, neither averaged), which fails the package/lock agreement case AND aborts `npm run build` at `verifyExportTypes`, leaving `dist/` stale enough to fail the style-closure case (it still lists `card-scroll.css` and `carousel/styles.css`). **`npm run build` cannot be made green from inside this row's fence** — DRIVER-side, flagged, not worked around · `node scripts/gate-register.mjs` **byte-identical pre→post**, `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1` — the violation is #40's uncommitted deletion, recorded and not this row's to reach; no seat pointed at `tests/components/ui/card/`, so the directory move moved no binding. **π NOT CLAIMED** — §6's P1-P9 are owed to **#10** at its serialized browser seat (Chromium 150 AND real `safari-app` 26.4, cells never cross-inferred, `/display/card` **299-node baseline UNCHANGED** — the `CardAction` −1 and the scroll-viewport +1 cancel), and **P6 is BLOCKED on #3 W-CAPTURE-MOTION** by the spec itself; the π-owed list is stated in full at the record §7 — the `grain: true` strike (C-3), the 4% → 0.16/0.08 edge, the composing cast, the series/type re-derivation, the NEW descendant-focus lift, the four `settings.vue` cards' `--shadow-sm` → `--shadow-card` (they keep the `material-roles.css` substitution until #86 — §5.4), the `auth-shell.vue` sub-`lg` panel pad 30.528 → 32 (transposing to 20 at ≤768, which the frozen literal never did), and the scroll-host re-home on the `/display/card` specimen. ROUTED: `material-roles.css` DELETE · `.glass-card` material half · K1/K2/K3 → **#86** · veil α + blur ladder (both arithmetic constraints; Fable's 0.46 non-binding) → **W-BLUR-LADDER/#22** · saturate-on-Safari + the +62% reachability → **#22** · field chroma → **#49** · `cartoon-surface` re-home + K18/K20 → **#62** · `.card-board` 17rem → **#59** · the ONE-`background-image`-slot seam (`.paper-grid` decoration vs the card's state fill; both plate pseudo-elements already spoken for, so it needs a slot CONTRACT not a per-class `:not()`) → **#62** · residual `tests/components/ui/**` → the DAG §5 sweep · 10 `cards.css` phantoms + `surfaces.css:44-45`'s false comment + `ladder.css` ~318 + `glass/deep.css:19`'s `CardTier` map prose + `demo/chassis/code/Code.vue:65`'s `--card-pad-title-gap-scale` prose + **`MIGRATION.md:1270`, which instructs consumers to put `card-scroll-host` on the `<Card>` — the exact placement this cut forbids, a live wrong instruction in a historical section this lane's fence does not open** → **#61** · atlas/speedtest/keyframes/bbnf addenda → **#76** · **R-4 idle breath → OWNER, not built**. Record: `docs/tranches/BK/execution/2026-08-08-row79-card-material/RECORD.md`. | TR#79 → CWT-3 §LANE card | lane gates (acceptance/π class, seats +0), close-battery class (CWT-3 §5); C-2/C-3/C-4 per §B.7; after #68 ✓ |
```

Then append the procession block after the last ⊕ entry:

```
⊕⁵⁶ **#79 W-CARD-MATERIAL LANDS (2026-08-08, `4a04b43c`) — the tier-3 wall's first lane.** [body as
recorded in the row cell above; the seat-level detail lives at
`docs/tranches/BK/execution/2026-08-08-row79-card-material/RECORD.md`.]

**Φ5 procession: next = re-scout.** #79 unblocks no DAG row by itself — #56 waits on "after lane
cuts" (all ten) and #64 on "#79-#88", so neither opens on one lane. The rest of the tier-3 band
(#80 · #81 · #83 · #84 · #85 · #86 · #87 · #88 · #89) has the same single satisfied
precondition (#68, SEALED ⊕³⁶) and is selectable in TR order, with these sequencing notes carried
from §B.7 and re-derived, never assumed: **#82** stays behind **#83** (C-6, `_shared/control.ts`)
and ASK g6 · **#80** lands its edge BEFORE or WITH **#86**'s K2 strike (C-8) · **#86** and **#88**
cut `track-well.css` JOINTLY (C-1) and **#86** carries #89's `resolve.ts` move · **#84** is hard
behind #19's `SelectionOption` widening (LANDED ⊕³⁹, so satisfied) · **#89**'s sever precedes #47's
first build commit · and **C-10 stands for all ten**: ONE batched export-surface cut and ONE
`public-surface.spec.ts` re-pin for the subpath mints, which no lane bumps solo (this row's
`CardAction` pin move is a component deletion's own negative pin, the #39/#57 precedent, not a
subpath mint). #21 stays gated on #17 (Φ4-UNSTARTED), #25 on its rides-clause, #22 is CURE-CUT,
#42/#44/#45/#47/#48/#52 stay behind their DAG edges, #49/#50/#51/#53 are ASK-gated, #58/#73 on
ASK g11, #67 on the owner's R-7 footage, #74 inside #88's cut. **#32 · #33 · #35 · #40 · #71 STILL
SIT UNCOMMITTED IN THIS WORKING TREE** (~~#34~~ **STRUCK at this back-annotation** — `git status`
re-derived at the paste carries NO `toast/` path, and RECORD §0's CURE-8g says it outright: #34 is
DAG-gated *"after #33"*, not in flight. ⊕⁵⁵'s identical list carried the same error and is left
standing as the historical record) — all eleven of this cut's foreign failures trace to #40 and #7.
The cursor alone cannot show a lane that has not committed (⊕⁴⁸), so the next scout re-derives from
the DAG **and** `git status`, never from this block's list.

**RE-DERIVED AT THIS BACK-ANNOTATION, nothing carried**: fence **18 tracked +527/−450** + 2
new (175 · 268) + `src/styles/index.css` **+3/−2** = **21 code files, +973/−452** staged (24
files / +1,567 with the 3 record docs) · subset battery **11 failed | 1419 passed | 5 xfail
(1435)**, every failure FOREIGN · `vue-tsc --noEmit` exit 0, no output · `tests/components/card`
**11 passed (11)** · `node scripts/gate-register.mjs` byte-identical, `seats:60 active:48
reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1
rosterSha256:dc05df91 violations:1` — the violation is #40's.

**FOUND BESIDE THE ORDER — four items, recorded, none silently fixed.** (1) **`npm run build` is
RED and cannot be greened from inside this row's fence**: an uncommitted `package.json`/lockfile
`embla-carousel*` disagreement aborts `verifyExportTypes`, leaving `dist/` stale — ~~**#32's bytes,
DRIVER-CONFIRMED**, where RECORD §9 names "the carousel lane" (#40); both attributions stand,
neither averaged~~ **[RULED 2026-08-08, driver: #40 W-PAGER's bytes — the ✦³ DECK-APOTHEOSIS widening owns the deck/carousel rework and the embla removal; #32 is W-TABS; RECORD §9 was right]**, and the two whole-tree `public-surface.spec.ts` failures are both downstream of
it. (2) **`MIGRATION.md:1270` instructs consumers to put `card-scroll-host` on the `<Card>`** —
the exact placement CURE-1 forbids, a LIVE wrong instruction sitting in a historical 5.0.0 section
this lane's fence does not open → **#61**. (3) **The cure pass's glide-flip contract case was BORN
FALSE-GREEN and is RE-ARMED** — it passed against the defect on its first run (the scroll fired
before the post-flush `scrollRoot` watcher settled, so `syncInitialState`'s own reset answered the
assertion); a `nextTick()` settles the binding and it now fails against a restored unconditional
`glide.value = true`. (4) **The `/display/card` void baseline is 299, not 298** — the `CardAction`
−1 and the scroll-viewport +1 cancel, so #10 must expect the count UNCHANGED.

**π STAYS OWED TO #10, in full** — P1-P9 at #10's serialized browser seat, Chromium 150 **and**
real `safari-app` 26.4 banked separately and never cross-inferred, against RECORD §7's complete
nine-row delta table (the `grain: true` strike · the 4% → `--ink-seam` 0.08 / `--ink-edge` 0.16
edge · the composing four-leg cast · the space series · the type ladder off `--type-body` · the NEW
descendant-focus lift, with its negative pointer-focus pair · `settings.vue`'s four
`--shadow-sm` → `--shadow-card` · `auth-shell.vue`'s sub-`lg` pad 30.528 → 32, transposing to 20
at ≤768 · the scroll-host re-home on the "Shrinkable header" specimen). **P6 stays BLOCKED on #3
W-CAPTURE-MOTION** by the spec itself.
```

---

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` — §A row #79

Append to the row's last cell (strike-in-place, dated bracket, nothing rewritten):

```
⊕⁵⁶ **LANDED 2026-08-08 (`4a04b43c`)** — cut per CWT-3 §LANE card as amended by fold §2 **C-2/C-3/C-4**:
the cast COMPOSES in `card/styles.css` (`material-roles.css` untouched, #86's to delete), Card's
props stay `Omit<SurfaceProps,"material">` + `{size, selected}` so they *become* the 3-prop
extension when #86 cuts `Surface.vue` (untouched here), and **both** halves of C-4's engagement
split re-home on `.card` — the selectable register on `.card[role="option"]` and the descendant
focus-elevation on `.card:has(:focus-visible)` — with **no `:where(.glass-card, .card)` widening**
(`surfaces.css` untouched). ~~U-18(a) the ScrollCardHeader absorb door~~ **CLOSED — DECLINED ON
RECORD** at this cut; the `useHeaderCondense` seed is absent from disk and retires consumed by
nothing. §4 ADD executed **6 of 7, 1 refused on record** (`--card-shrink-threshold`: a custom
property no rule reads is a dead token). The **8.0.0 public surface is BOOKED** in `MIGRATION.md` +
`CHANGELOG.md` (`CardTier`/`CardVariant`/`CardMetal`/`CardAction` with successors; the `/api`
census rows re-dispositioned). Gate seats **+0** (§5's six are execution-time probes, §B.5
acceptance class); register receipt byte-identical pre→post. π NOT CLAIMED — P1-P9 → **#10**
(`/display/card` void baseline **unchanged at 299**: the `CardAction` −1 and the scroll-viewport +1
cancel), P6 BLOCKED on **#3**. **DRIVER NOTE**: `npm run build` cannot go green while an uncommitted lane's
`package.json`/lockfile disagree over `embla-carousel*` — `verifyExportTypes` aborts and the two
`tests/public-surface.spec.ts` failures in the whole-tree battery are both downstream of it (~~**#32's bytes, DRIVER-CONFIRMED at the back-annotation**; RECORD §9 names the carousel lane,
#40 — both stand~~ **[RULED 2026-08-08, driver: #40 W-PAGER's bytes — the ✦³ DECK-APOTHEOSIS widening owns the deck/carousel rework and the embla removal; #32 is W-TABS; RECORD §9 was right]**).
**FENCE re-derived at the back-annotation**: 18 tracked **+527/−450** + 2 new (`card/scroll.css` 175 · `tests/components/card/Card.test.ts` 268) + `src/styles/index.css` **+3/−2**, the one import re-point split out by index surgery inside the cut — **no completion riders**; staged total **21 code files, +973/−452**. Verify, re-run this seat: `vue-tsc` exit 0, no output · subset battery **11 failed \| 1419 passed \| 5 xfail (1435)**, every failure FOREIGN · `tests/components/card` **11 passed (11)** · receipt byte-identical, `violations:1` = #40's. The cure pass's glide-flip case was **BORN FALSE-GREEN and RE-ARMED** (a `nextTick()` settles the `scrollRoot` binding; it now fails against a restored unconditional `glide.value = true`). `MIGRATION.md:1270`'s live wrong instruction — `card-scroll-host` on the `<Card>`, the placement CURE-1 forbids — is routed **#61**, not edited here.
Record: `docs/tranches/BK/execution/2026-08-08-row79-card-material/RECORD.md` (cure pass §10b —
`CURE-ORDER-79.md`, 8/8 executed).
```
