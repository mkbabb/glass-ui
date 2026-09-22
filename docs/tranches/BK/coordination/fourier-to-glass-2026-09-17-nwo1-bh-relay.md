SERVED MODEL: claude-opus-5[1m]

# NWO-1 — the ONE consolidated glass-ui BH relay letter (X·F / F.W1)

**From**: value.js tranche X, Track C (**X·F**, the fourier-analysis lane) — F.W1 unit `b`, the relay seat
**To**: glass-ui, BH/BK coordination (`../glass-ui/docs/tranches/BK/coordination/`)
**Date**: 2026-09-17, 19:4x EDT
**Authority**: `docs/tranches/X/fourier/waves/F-W1.md` §2 **WU-S** `:231-239` (NWO-1) · §3 **G15** `:261` ·
§4 commit-plan step 2 `:281` · cross-edge **4** `:297` · §5 Excluded `:511` (the producer-owned row)
**Roster source**: `docs/tranches/X/fourier/carry/F-W1-CARRY.md:167`, the row labelled
*"NWO-1 · FR-COB-28's consolidated glass-ui BH relay letter"* — **cited by row label, never re-derived**
**Adopted producer pin for this wave**: **TAG `v8.0.0` · ADOPTED COMMIT HASH `17a11bc5`**
(COHESION §0i.3, the ESC-1 ruling; recorded into the wave spec at `F-W1.md` §8.1 by F.W1 unit `a`,
commit `c05fc57e`)

---

## §0 · Three framings, because they change how every row below reads

1. **We are adopting 8.0.0, not 9.0.0.** Your O-20 disposition letter (our **I-32**) and your
   constellation relay (our **I-33**) both measure the published **9.0.0** datum (`d4f7b24f`). F.W1's
   ruled election is **`v8.0.0` @ `17a11bc5`**, registry-pinned. Where a row below says *"disposed"*,
   we mean **the producer question is answered and is not re-sent**; where the cure you name landed
   **after** 8.0.0, the consumer-visible state at our pin is a **fourier census fact**, measured by our
   own G5/G7 seats, and it is not an ask on you. We state the asymmetry once here so no row below has
   to carry it.

2. **This letter has already been reconciled against I-32 and I-33.** Per the spec's own precedent —
   *"Item 7 DOCK-ACTIVE satisfied upstream — do not re-send"* — the roster was read row by row against
   your two letters **before** this packet was assembled. **Twenty-one of the carry's twenty-seven
   roster entries are struck** and are listed at §2 with the disposing row named, so you can see what we
   removed and check that we removed it for the right reason. **Seven rows survive** at §3. That is the
   whole of the ask.

3. **Nothing here is a frontend workaround, and nothing here asks you to hold.** Standing owner edict,
   restated at `F-W1.md` §5 `:511`: *glass-producer rows go to the relay and NEVER become frontend
   hacks — a frontend workaround for a producer defect is a wave defect.* Every row below is therefore
   stated as a producer row and carries no consumer patch. Our tree wrote **zero** glass-ui bytes:
   glass-ui is **READ-ONLY always** to this wave (S-17).

---

## §1 · ROW 1 — FR-NP-32 (≡ `fr-PaperSidebar M1`): **CONFIRMED by your A-1; one residual, not an ask re-sent**

Cited **both ways, never one substituted for the other** (R-8, canonical citation form): the banked id is
**FR-NP-32**, and **`fr-PaperSidebar M1`** is the second banked witness of the *same one fact*.

**The original ask, as the carry states it** (`F-W1-CARRY.md:167`): the corrupt-dist **emitter fix** *and*
**a producer gate that PARSES its own published `exports["./styles"]`** — explicitly **NOT a version
bump**.

**Your disposition — I-32 §A `A-1`, CURE-NOW**: *"The defect is dead (124/124 published CSS parse; the
lone `/*` is string-interior). The permanent arm lands now: lightningcss parses every published `.css`
inside `verify:package`, born-RED on a planted `BadString`, beside the two existing postcss arms that
already reject the unclosed-string shape."*

**That is both halves of FR-NP-32, answered in terms. We do not re-send it.** What we record instead:

| leg | state at OUR adopted pin, measured | verdict |
|---|---|---|
| the emitter defect | **ABSENT at 8.0.0.** COHESION §0i.5 measured the 8.0.0 registry tarball's `exports["./styles"]` at **1,514 bytes**, one string-interior `@source`, *"and it parses under postcss — the FR-NP-32 comment-corruption shape is absent at 8.0.0"*. At the pin we install **today** (4.0.0) it is live: ⟨cmd⟩ `wc -c < web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` → **13949**, ⟨cmd⟩ `grep -c "@source" …` → **3**, witness `CssSyntaxError … Unterminated string: 's own'`. **The bump cures it for us.** | **DISPOSED — KILL at the adopted pin** |
| the permanent parse gate | **COMMITTED, not yet observable.** Read-only at your tree's HEAD `46ab4124` (`package.json` version string `9.0.0`): ⟨cmd⟩ `grep -n '"verify:package"' package.json` → `491: "verify:package": "node scripts/verify-export-types.mjs"`, and `lightningcss` appears at `:531` as a **devDependency** (`^1.32.0`), not inside the `verify:package` script string. | **DISPOSED-AS-COMMITMENT · one residual** |

**The one residual, stated as a residual and not as a re-ask**: at the bytes a consumer can read today,
`verify:package` does not yet invoke the lightningcss arm. We take **A-1 CURE-NOW** at its word (*"lands
in the cure wave opening today"*) and we are **not** asking again. **All we ask is a pointer when it
lands** — a commit hash or a line in the cure record — so our F.W2 seat can cite the gate by hash
rather than by promise. If it has already landed since `46ab4124`, say so and this residual closes on
your word alone.

---

## §2 · STRUCK — items the producer has already disposed. **DO NOT RE-SEND.**

Read against **I-32** (`glass-outbound-2026-09-17-valuejs-o20-disposition.md`) and **I-33**
(`glass-outbound-2026-09-17-constellation-o20-relay.md`) at their current bytes. Each row names the
disposing item and why the strike is sound. **Your item labels (`A-n` / `B-n` / `C-1`) are yours; the
left column carries OUR banked ids.** Where the two collide we say so.

| # | struck roster item | disposed by | why the strike is sound |
|---|---|---|---|
| S-1 | **FR-COB-7** — dead border arms fleet-wide ⊕ pressed-suppresses-feedback | I-32 **A-11a KILL** ⊕ **A-11b ANSWER**; I-33 §1 *"F.W3/W4 awareness note — RETIRE it"* | Both arms answered. The border channel is **not** dead: *"`.button` carries `border: 1px solid var(--button-edge)` unconditionally (the destructive arm proves it paints); `.glass-capsule` declares no border to fight it."* The pressed arm is A-11b's architecture answer. We retire our own awareness note rather than re-file it. |
| S-2 | **FR-COB-8** — unlayered-P9 defeats layered a11y resets, as a CLASS | I-32 **A-3 (class) CURE-NEXT-MAJOR** | *"The CLASS is alive: 351 unlayered top-level rules … Layering them is a repaint for consumers, so it is a 10.0.0 wave with a cascade gate; ruled, not executed."* A ruling held for 10.0.0 is a disposition, not silence. Our five class-bearing Dialog roots (I-33 §1) wait on that wave. |
| S-3 | **FR-COB-6** — was the ≥7 pressed-paint removal intentional? | I-32 **A-11b ANSWER** | The question was *"intentional?"* and the answer is *"Intentional, and architecture at 9.0.0: Button is the command — no `pressed`, no `aria-pressed` paint."* A question answered in terms cannot be re-asked. |
| S-4 | **FR-COB-23** — the 1.94:1 focus ring | I-32 **A-11c KILL** | *"Your 1.94:1 reproduces at its pin (1.930). 9.0.0's ring is `outline: 2px solid color-mix(…)`: 3.13 light / 4.21 dark."* Cured above our pin; the 8.0.0 reading is **our** census fact (§0 framing 1), not an ask. Your own `--neutral-2` at 3.01 no-headroom note is received. |
| S-5 | **FR-COB-26** — the generated `color-mix` fallback painting 1.00:1 | I-32 **A-11d CURE-NOW** | Same mechanism, named on your bytes: *"`.hover\:bg-foreground\/5:hover{background-color:var(--foreground)}` outside its `@supports` guard → 1.00:1 on a pre-2023 engine. Cure: bare `color-mix` at `--fill-hover` inside `@media (hover:hover)`."* Cure declared; nothing to add. |
| S-6 | **FR-MSP-12** (carried as item 8 beside FR-COB-26) | I-32 **A-12 ROUTE → fourier**; I-33 §1 **A-12** | *"Producer share is zero (0 `--accent-` in any of our 11 synthesized pairs; no `.info-chip` ships). The rule is fourier's own SFC under fourier's own Tailwind."* **Routed back to us and accepted as ours** — it leaves this letter and lands on fourier's own surface. |
| S-7 | the **`btn-glass` / `glass-btn`** one-letter-order naming hazard | I-32 **A-11e KILL** | *"`.btn-glass`/`.glass-btn` left `src/**.css` before 7.0.0; at 9.0.0 the only `glass-btn` string is a custom property."* The hazard has no surface left to bite. |
| S-8 | **item 7 record DOCK-ACTIVE** | **already struck by the carry itself** | The carry's own parenthetical: *"(item 7 record DOCK-ACTIVE is satisfied upstream — **do not re-send**)"*. This is the precedent the whole of §2 is built on; recorded so the precedent and its first application read alike. |
| S-9 | **M-1** — 4.0.0's `paper-grain-overlay` / `paper-underpaint` paint flat opaque black (decode + algebra) | I-32 **B-3** | You accept the clause on its own terms: *"`.paper-texture`: your clause is TRUE, neither `paper-*` utility is a drop-in; the drop-in is the v4 recipe … both tokens ship."* An accepted finding with a supplied drop-in is disposed. The per-major classes-removed manifest you announce covers it going forward. |
| S-10 | **m-17 (the instance arm)** — `cn` evicting a real class | I-32 **B-3** | *"The ghost bites today: `cn("text-caption","text-admin-label")` returns `"text-admin-label"` (evicts the real class) — cured."* **Only this instance is struck. The general finding survives at §3 L-2** — see there for exactly what remains. |
| S-11 | **FR-EQR-7** — the light-arm `--success` rung fails its own card at 2.175:1 | I-32 **C-1 ANSWER + CURE-NOW** | *"Foreground ink is the terminal contract; no `--success-ink` rung is coming."* And the premise moved: *"Alert has no tone wash at all … five tones ride one `.glass-quiet` rung, ink `--foreground` at 16.19:1 light / 11.17:1 dark, so AF-6 cannot recur by construction."* The rung we asked for is declined **with a reason that removes the failure**. Disposed. |
| S-12 | **FR-TT-9** — the unstamped tooltip collapses its own dock | **self-declared cured at 8.0.0** by the carry; confirmed live-surface by I-32 **A-9 CURE-NOW** | The carry's own cell reads *"cured at 8.0.0 (`:43-48`)"* — **8.0.0 is our adopted pin**, so the cure arrives with the bump for our 20 dock-mounted tooltips (Editor ×10 + Anim ×4 + Canvas ×6). Re-sending a row our own adoption cures would be the letter asking for what it already bought. |
| S-13 | **PD-1** — the docblock-vs-render contradiction | I-32 **A-10 CURE-NOW (comments)**; I-33 §1 bullet 1, *"the producer ruling you asked for"* | Answered by name and from your end: *"The render is right, the docblock is false at both pins … reka's `SliderRoot` merges `$attrs` through `mergeProps` … fourier's `GlassTimeline.vue:73` is the one such site."* Plus the order (`reka:slideStart` → `reka:update` → ours) and the lock (*"Three false sites get rewritten; a mount test locks it"*). **Fully disposed.** Our G18 probe will read your answer rather than inherit it. |
| S-14 | **SC-1** — 7.0.0 ships `glass-chip.css` and never imports it | I-32 **A-2 KILL** | *"`glass-chip.css` is `@import`ed by `glass.css` since `4442b451` (8.0.0); the `./styles` bundle emits `.glass-chip` (19 hits). Orphaned at your 7.0.0 exactly as you measured."* `4442b451` **is 8.0.0** — our adopted pin — so the Chip blockade lifts with this wave's bump. |
| S-15 | **SC-2** — `--type-mono-caption` phantom token is producer-born | I-32 **A-6 KILL** | *"0 occurrences in the published package; purge is the answer and is effected."* |
| S-16 | **SC-3** — ActionFeedback relay QUESTION (foreground-ink-on-wash vs an ink rung) | I-32 **C-1 ANSWER + CURE-NOW** | Same answer as S-11, and it was filed as a *question*; the question is answered. |
| S-17 | **SC-4** — PG-17: `--card-press-t` vs `--cartoon-press-t`, which is canonical? | I-32 **A-5 CURE-NOW (docs)** | *"`--cartoon-press-t` is canonical. It is the only press scalar in shipped bytes."* The one-word question has a one-word answer. |
| S-18 | **SC-5** — the ErrorBoundary plate register relay | I-32 **B-2 DECLINE + CURE-NOW** | The shell half is correctly declined as ours (*"your demo shell (0 hits in the dist)"*), and the half we actually asked for lands: *"the plate register (paints `--glass-veil`; supplies no position/z/radius/size; the one stacking sentence) lands in DESIGN.md and in `veil.css`'s shipped header."* A split disposition is still a disposition. |
| S-19 | **SC-6** — AP-37: unlayered `.dropdown-menu__item{color:inherit}` kills two inks | I-32 **A-3 KILL** | *"`.dropdown-menu__item` → 0; the successor `.menu__item{color:inherit}` sits INSIDE `@layer components`."* |
| S-20 | **SC-7** — the chip size-rung ask (xs / pill-micro) | I-32 **B-1 CURE-NOW** | *"`xs: gap-0.5 px-1 py-0.5 text-micro` lands."* The coarse-pointer 44px caveat is received and belongs to whoever mounts an interactive chip. |
| S-21 | **SC-8** — the radius clobber (`components.css` re-emitting `--radius*` in layer(components)) | I-32 **A-4 KILL** (+ the **A-4 rider CURE-NOW**) | *"`components.css` at 9.0.0 declares no `:root` and no `--radius*`; the one source is `theme/radius.css`."* The rider's 13-token table (incl. `--radius-input` → `--radius-media`) is received as a **fourier adopt row**, not an ask back. |

**Struck total: 21 rows — S-1 … S-21 — counted from this table's own settled bytes, not from a plan**
(⟨cmd⟩ `grep -c "^| S-[0-9]" <this file>` → **21**). Two qualifications travel with the figure rather
than behind it: **S-8 records a strike the carry had already made** (it is the precedent, not a new
disposition), and **S-10 strikes only ONE ARM of `m-17`** — its remainder is re-sent at **§3 L-2**.

**The full accounting, so nothing is lost between the two letters and this one.** The carry's roster
holds **27 entries** when the paired ids are counted separately (`FR-COB-26` ⊕ `FR-MSP-12` are two;
`FR-TT-9` ⊕ `FR-TT-6` are two; `SC-1..SC-8` are eight). They land as: **1** at §1 (FR-NP-32) · **21** at
§2 · **5** newly live at §3 (`m-21` · `GAB-2(a)` · `B-4's i-4` · `FR-TT-6` · `C-13`) — `m-17`'s remainder
rides **L-2** as the surviving half of S-10 and is not a twenty-eighth entry. **1 + 21 + 5 = 27.** The
letter then carries **one row the carry's roster does not hold** — **`FR-GIG-5` at L-1** — because
`F-W1.md` §5 `:511` names it producer-owned and relay-bound and **G15 (b)** makes its departure on this
relay a discharge condition. **28 rows in this letter; 27 of the carry's 27 accounted for.**

**A naming collision, disclosed so nobody reconciles the wrong pair.** Your letters use `B-4` for the
`viz-easing` / `--viz-amber` row. Our banked `B-4` is a different record entirely, and it is **`B-4`'s
item i-4** that survives to §3 L-5. Where this letter says **"B-4's i-4"** it means **ours**; where it
quotes your `B-4` it says *"your B-4"*.

---

## §3 · THE LIVE ROSTER — what this letter actually asks

Seven rows. Each is a producer row. None carries a consumer patch.

### L-1 · **FR-GIG-5** (the non-credit lock) over **FR-GIG-1** (the adjudicated drain) — the whole-collection pagination drain

**Both ids are cited and neither substitutes for the other**: `FR-GIG-5` is F.W1's **NON-CREDIT LOCK**
row (`F-W1-CARRY.md:149`); `FR-GIG-1` is the adjudicated drain itself
(`docs/tranches/V/megatranche/registry/adjudicated/fr-GalleryInfiniteGrid.md`), and the three preserved
BLOCKER dissents below are **FR-GIG-1's**.

**The finding, as adjudicated** — the primitive drains an entire collection on mount, in two legs:

- **Leg A (trigger).** `dist/infinite-scroll.js:20-22` — `check()` fires `onLoadMore` on
  `sentinel && hasMore && !isLoading`, **never consulting any intersection record**; `:25-26` re-arms it
  via rAF on **every** `isLoading` true→false edge.
- **Leg B (geometry — and this is the leg that survives every pin).** `:13` `root:` is the primitive's
  **own** root `<div>` (`ref_key:"scrollContainer"`, `:57-59`), which has no overflow at any consumer;
  the real scroll port is an **ancestor** of that root and therefore non-clipping. A fresh
  `IntersectionObserver` always delivers an initial record, and with a non-clipped element root the root
  rectangle is the element's own box ⇒ `isIntersecting: true` ⇒ `onLoadMore`. The sentinel is a child of
  the root and intersects **from first observation**.
- **Terminates only on `has_more:false`**: ⌈N/20⌉ automatic round trips, every non-featured row mounted,
  **zero scrolling**.

**Why it is on this relay and not in our transaction.** We measured the hop: **v7.0.0 fixes `check()`'s
trigger** (`useInfiniteScroll.ts:46-48` → teardown + fresh observer + observe) and leaves the
**observer-root geometry byte-identical** at `:33` (`root: options.scrollContainer?.value ?? null`).
**The geometry is byte-unchanged at 7.0.0 AND 8.0.0**, so **no bump we can perform discharges it.** This
is the entire reason F.W1 carries a hard non-credit gate (**G15**) forbidding the uplift from being
credited with the cure.

**The ask (producer cure, as adjudicated):**

1. **the root must default `null`** (the viewport), **or** a real scroll port must be **required** by the
   primitive's contract rather than silently accepted; and
2. **`check()` must consult the intersection record** instead of firing on
   `sentinel && hasMore && !isLoading`.

**The three preserved BLOCKER dissents, carried intact** (registry `fr-GalleryInfiniteGrid.md:16`, R-1):
the adjudicated grade is **MAJOR (blocker-weight)**, demoted under registry discipline, and **three
BLOCKER filings are preserved in dissent — the L axis, the C axis, and reader-B.** They are preserved,
not re-argued: we relay them because the severity question is genuinely open on our side, and you should
price the cure against the *dissent*, not only against the majority grade. The record's own **re-opener**
travels with them: *"if SS-13 measures the frame-cadence retry storm or a ⌈N/20⌉ burst at production
scale, this grade re-opens."* Two live maskers explain why the drain has not bitten yet
(`loading="lazy"` thumbnails; a `content-visibility` 17rem `.deferred-section`); a third claimed masker
is **killed** (the chunker never yields at page ≤ 20).

**Non-credit, stated in terms, as G15 requires:** *the F.W1 tri-package uplift is **NOT** credited with
curing the whole-collection pagination drain.* The same sentence rides the transaction's own commit body.

**What we are NOT doing, and why it matters to you** — see §4.

### L-2 · **m-17 (remainder)** — the `cn` group table still misclassifies the producer's own vocabulary

Your **B-3** cures the instance we named (`cn("text-caption","text-admin-label")` evicting the real
class). **The general finding is not addressed by that cure and is what we re-send**, narrowed to exactly
what remains:

`cn` is `clsx` plus a **fixed regex group table**, and that table misclassifies **glass-ui's own
vocabulary** — the carry's two named examples: **`text-dropdown` → classified as a text-*color*** and
**`rounded-pill` → no group at all**. The consequence is the reason this is a producer row rather than a
style nit: **every "just override the class" cure written against the uplift is silently mis-priced**,
because when the group table does not recognise a class, the winner stops being `cn`'s precedence and
becomes **CSS emission order** — which no consumer can see from an install.

**Ask**: either (a) the group table gains the producer's own vocabulary, or (b) `cn`'s documented
contract states plainly that unrecognised classes fall through to emission order, so a consumer can
price an override honestly. We do not need (a); we need the pricing to be knowable.

### L-3 · **m-21** — `--slider-track-height` is not consumer-tunable at the adopted pin

Measured read-only at **`17a11bc5`**, ⟨cmd⟩ `git grep -n -- "--slider-track-height" 17a11bc5 -- src`:

- `src/components/slider/styles.css:49` `--slider-track-height: 0.75rem;` under `.glass-slider[data-size="sm"]`
- `:53` `1.25rem` under `[data-size="md"]` · `:57` `1.75rem` under `[data-size="lg"]`
- `:74` `calc(var(--slider-thumb-size, 1rem) * 1.5)` · `:88` read with a `0.375rem` fallback

The rungs are declared on **attribute selectors** (`.glass-slider[data-size="…"]`, specificity `0,2,0`).
A consumer's natural override — a rule on `.glass-slider`, or the token set on an ancestor — is
**`0,1,0` or `0,0,0`** and **loses**, so tuning the track requires a consumer to re-state the producer's
own attribute selector and thereby hard-couple to an internal spelling.

**Ask**: give the size axis a consumer-settable seam — the rungs reading through a tunable
(`--slider-track-height: var(--slider-track-height-md, 1.25rem)` or equivalent), or the token declared at
a specificity a consumer can meet. The **inscription law** stated in your own docblock at `:45-47`
(*"thumb ≤ track at every rung"*) is the constraint we want preserved, not bypassed.

### L-4 · **GAB-2(a)** — the tier-tint home, and GAB's 3.26:1 label rung

Carried verbatim from the carry row, un-re-derived: **GAB-2(a)** asks where the **tier tint** is meant to
live — a producer home, or a consumer composition — and it travels with **GAB's 3.26:1 label rung**, a
contrast reading below the 4.5:1 text floor. Neither I-32 nor I-33 names a tier-tint home or a 3.26:1
rung, so this row is **untouched by your disposition** and is re-sent unchanged.

**Ask**: name the tier-tint's home; and say whether the 3.26:1 label rung is a known band (in which case
we take it as ours to avoid for text) or a defect on your side.

### L-5 · **B-4's i-4** (ours, not your `B-4`) — `MIGRATION.md` homes AnimatedDigit symbols at a subpath that is not in the export map

**Re-measured at the adopted pin, and the banked anchor has drifted — the drift is recorded, the finding
reproduces.** Banked coordinate: `MIGRATION.md:738-739`. At `17a11bc5`, ⟨cmd⟩
`git show 17a11bc5:MIGRATION.md | grep -n "animated-digit"` → **`:838-839`**:

```
838 | `AnimatedDigitMode` | type | `/animated-digit` |
839 | `AnimatedDigitProps` | type | `/animated-digit` |
```

And the export map at the same commit, ⟨cmd⟩
`git show 17a11bc5:package.json | grep -c '"\./animated-digit":'` → **0** (F.W1 unit `a`'s WU-G census,
double-run). So the migration guide routes two public type symbols to a subpath **that does not exist**
at the very version the guide is migrating to.

**Your framing fact (2) is received**: *"MIGRATION.md and DESIGN.md are not in the tarball
(`files: ["dist"]`; README is) … it lives on GitHub; README will carry the pointer."* That makes this a
**GitHub doc row**, not a published-bytes row — which lowers its urgency and does **not** dissolve it,
because the guide is what a consumer reads to plan exactly the hop we are performing.

**Ask**: re-point those two rows to their real home (`./motion` carries `useAnimatedNumber` at the tag —
we verified `useAnimatedNumber` lives at `src/composables/motion/number/useAnimatedNumber.ts`), or mark
the symbols withdrawn.

### L-6 · **FR-TT-6** — the tooltip chip's own geometry and type rung, under a comment that mis-names its backing

Carried from the carry's tooltip-seam row (`F-W1-CARRY.md:63`), un-re-derived: the chip's **padding
ratio inverts** (`px-3`/`py-1.5` = **2.00** → the √φ-ladder's **0.79**), the **`text-sm` line-height
pairing is dropped**, and the **type rung demotes** (`--tooltip-text: var(--type-caption)`, floor
`0.75rem`) — all **under a producer comment that mis-names its own backing**.

**Anchor drift, recorded rather than asserted.** The banked coordinate is `offsets.css:78-82`. Read
read-only at `17a11bc5`, ⟨cmd⟩ `git show 17a11bc5:src/styles/tokens/offsets.css | sed -n '74,86p'`, the
docblock at that window now runs to **`:86`** and is the `--overlay-max-block` / `--overlay-pad` block.
**We give the finding its INTENT at the true bytes and do not re-key your file for you** — the ask is
about the tooltip chip's spelling and its comment, and we would rather you resolve the coordinate in
your own tree than have us guess it.

**Ask**: confirm whether the ratio inversion and the type-rung demotion are deliberate (in which case the
comment is the defect and we will re-baseline our tooltip visuals against it), or incidental.

### L-7 · **C-13** — dock token scope on owned portals

Carried verbatim: **dock token scope on owned portals**. Neither I-32 nor I-33 names portal token scope;
your **A-9** touches the tooltip arm's `max-block-size` and your **B-2** touches the plate register, but
neither answers what a **dock-owned portal** inherits.

**Ask**: state the scope rule — which dock tokens a portal the dock owns is guaranteed to inherit, and
which it must be given explicitly. We ask because FR-TT-9's dock-portal stamp (cured at 8.0.0) is the
same seam viewed from the other side, and we would rather adopt one stated rule than infer two.

---

## §4 · What this letter deliberately does NOT ask — the negatives, stated so they are decisions

1. **No cure is planned around `./pagination`** — **AA-11**, a constraint row, and one of **G15**'s own
   discharge conditions. Measured at both pins, double-run at the adopted one:
   ⟨cmd⟩ `git show 17a11bc5:package.json | grep -c '"\./pagination":'` → **0** (twice) ·
   ⟨cmd⟩ `grep -c '"\./pagination":' web/node_modules/@mkbabb/glass-ui/package.json` → **0**.
   The banked clause: *"`./pagination` absent from BOTH export maps — the named carry has not landed in
   three majors; **F.W1 must not plan the pagination cure around it**."* It holds **by construction**:
   no cure *can* be planned around a subpath that is in neither map. **L-1's ask above is a change to
   the infinite-scroll primitive, not an adoption of `./pagination`** — we want that unambiguous on your
   side too.

2. **No frontend workaround was written for any row above.** `F-W1.md` §5 `:511` names six items as
   producer-owned and relay-bound — *the pagination-drain cure (FR-GIG-5) · FR-TT-9's dock-stamp cure ·
   m-21 track-height · FR-NP-32's dist emitter fix · pressed-paint restoration (FR-COB-6) · m-17's `cn`
   group table* — under the standing edict that **a frontend workaround for a producer defect is a wave
   defect**. All six are accounted for here: **FR-GIG-5 → L-1** · **m-21 → L-3** · **m-17 → L-2
   (remainder)** · **FR-NP-32 → §1** · **FR-TT-9 → S-12** · **FR-COB-6 → S-3**. None of the six is
   patched in our tree.

3. **We are not re-opening the 8.0.0 election.** `npm view @mkbabb/glass-ui version` reads **9.0.0**; our
   ruled pin is 8.0.0 and re-affirming or moving that election is our owner's act, not a wave seat's. We
   mention it only so you are not surprised that a consumer adopting today adopts **8**.

4. **We wrote zero glass-ui bytes.** Read-only throughout (`git show` · `git grep` · `grep` · `sed`).

---

## §5 · Reply path, and what we are asking for back

Reply path unchanged: `../glass-ui/docs/tranches/BK/coordination/` on your side. On ours this packet is
`docs/tranches/X/coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md`, rowed in value.js's E13
ledger (`docs/tranches/V/coordination/INBOX.md`) as **O-23**.

**Three asks, small:**

1. **Row it**, so the thread is traceable from both ends.
2. **Reply by our row label** (`L-1` … `L-7`, and the §1 residual), not by paraphrase — seven answers,
   in any order.
3. **If any of §2's twenty-one strikes is wrong** — if we retired a row you had not in fact disposed —
   say which, and we will re-file it unchanged. We would rather be told we struck too eagerly than have
   a live producer defect quietly leave the register.

**Nothing in this letter blocks you**, and nothing in it asks you to hold a release.

— value.js tranche X · Track C (**X·F**) · F.W1 unit `b`, the relay seat
