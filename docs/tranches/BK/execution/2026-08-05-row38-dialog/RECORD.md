# BK Row #38 · W-DIALOG (cut 1) — RECORD

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`).
**Seat:** scout + implement. **Date:** 2026-08-05. **Base HEAD at open:** `660cfaf8`.

---

## §0 · SELECTION + GROUNDS

**Selected: row #38 · W-DIALOG (cut 1).** Grounds, in TR order over the Φ5 table
(`EXECUTION-PROGRESS.md:1162-1220`), skipping SEALED / IN-FLIGHT / gated:

| # | state | disposition |
|---|---|---|
| 18 · 19 · 23 · 24 · 26 · 27 · 28 · 29 · 30 · 31 | LANDED / LANDED-IN-PART | not selectable |
| 21 | UNSTARTED | **SKIPPED** — hard dep `#17` (`EXECUTION-DAG:32`), and #17 is Φ4-UNSTARTED |
| 22 | ~~CODE-COMMITTED → CURE-CUT~~ **SEALED** | ~~IN-FLIGHT, never selectable (⊕³⁰)~~ **[2026-08-05 CURE-C3: THE GROUND WAS STALE. #22 is SEALED at cursor ⊕³⁵, not IN-FLIGHT at ⊕³⁰ — the seat read a superseded ledger entry. The SELECTION still stands (see the procession note below), but not on this reason.]** |
| 25 | UNSTARTED | **SKIPPED** — its own rides-clause: `#82` (owns `field-control.css`, C-13k), `#27`'s ladder and `#22`'s rung; TR#25 rules *"a wave cannot be verified before what it rides"* |
| 32 | UNSTARTED | **SKIPPED** — fenced behind `#22` F-1/F-3/F-4 (T-C) |
| 33 · 34 | UNSTARTED | **SKIPPED** — hard fence `G-FROST-TRANSMISSION` (#22) green first; #34 sequenced after #33 |
| 35 | UNSTARTED | **SKIPPED** — `#22` authors the S-B frost rung first |
| **38** | **UNSTARTED** | **SELECTED** — hard blockers **none** (`EXECUTION-DAG:49`) |

No ASK gate and no owner gate on this row. It also RECEIVES **RT-18C** from #18's landing
(`2026-08-05-row18-delete/RECORD.md:423`): `compositions/gate-pattern.vue` +
`feedback/confirm-dialog.vue` + the `dialog.confirm-preset.test.ts` fixture — discharged
here in full (§2 item 9).

**[2026-08-05 CURE-C3 · THE #22 SEAL AND WHAT IT DISCHARGES.]** With #22 SEALED at ⊕³⁵,
three of the five skip-grounds above are no longer fences: **#32**'s T-C fence (#22 F-1 /
F-3 / F-4) is an intra-cut π-ordering the seal satisfies, **#33 / #34**'s hard
`G-FROST-TRANSMISSION` fence is green, and **#35**'s S-B rung is authored. The driver has
RULED all four **selectable**; the next scout re-derives the frontier rather than
inheriting this table. **#21** (hard dep `#17`, Φ4-UNSTARTED) and **#25** (its own
rides-clause) are unaffected and stay skipped. This row's own selection is untouched:
#38's hard blockers were and remain **none**, so nothing above it being newly selectable
makes a row already cut the wrong one — it changes what comes NEXT, not what happened.

**[2026-08-05 CURE-C3 · INBOUND ROUTES FROM #30, NAMED.]** §0 asserted RT-18C was this
row's only inbound. Three more were routed here by #30's landing
(`EXECUTION-PROGRESS.md:1098-1104`, `TERMINAL-ROSTER.md:180`) and are dispositioned now:

| route | subject | disposition |
|---|---|---|
| **RT-30F** | the scrim-as-STEP half — its `backdrop-filter` delete, "X6/ALREADY-SEATED at #38" | **DISCHARGED IN FULL** by §10's delete (both legs, `ModalOverlay.vue` + `DrawerOverlay.vue`). #30 refused it with grounds precisely so this row would cut it, and it did — the record simply never named the route. Nothing owed. |
| **RT-30D** | `.glass-vaporize` adoption at dialog | **ROUTED ON → #39** (the dialog's second cut, which carries the drawer MERGE-INTO and therefore owns the whole overlay family's exit at once). NOT adopted here, and the ground is measured, not argued: this row's exit is a `useSpringMount` scalar co-terminating scrim and plate (§2 item 7), so adopting a KEYFRAME exit on the same element would give one surface two exit clocks — the exact desync §2 item 7 exists to end. Adoption is a re-cut of the exit, not a class added to it. |
| **RT-30G** | `.glass-reveal[data-motion="off"][data-state="closed"]` out-ranking the vaporize's closed rule at (0,2,0) outside PRM | **ROUTED ON → #39, with RT-30D** (its own routing pairs them). It is LATENT here by construction: the contest needs a `useMotionAxis` surface WEARING `.glass-vaporize`, and this cut deleted the plate's `.glass-reveal`/`data-reveal` composition outright (§2 item 7) without adding the vaporize — so neither side of the cascade contest is present on the dialog at this HEAD. It becomes live the moment RT-30D lands, which is why it travels with it. |

---

## §1 · THE WORK ORDER (TR cell, verbatim)

> `| 38 | W-DIALOG (cut 1) | CWT-2 :170-385 | Φ5 | 2 minted = close-battery class. + the
> scrim `backdrop-filter` delete (`ModalOverlay.vue:83`/`DrawerOverlay.vue:53`) +
> `DialogContent.vue:496` dead pair + the `sm:` strike |`
> — `TERMINAL-ROSTER.md:188`

Spec of record: `COMPONENT-WAVES-TERMINAL-2.md:170-385` (§1 THESIS → §9 ROUTED), read whole.

---

## §2 · PER-ITEM LEDGER

### 1 · The `dismiss` axis (§3.1) — absorbs F25 + F45

`DialogContent.vue` declares `dismiss?: "free" | "deliberate" | "locked"`, exported as
`DialogDismiss`. `free` shows the ✕ and lets Esc/outside dismiss; `deliberate` drops the
✕; `locked` REFUSES both and rebuffs. `showClose` folded into it. No `Confirm*`/`Gate*`
symbol minted. `CommandDialog.vue` sets `dismiss="deliberate"` — which is DLG-17's only
available remedy (the ✕ painted 27px inside the search field; the field's pad is already
0 and the ✕ is positioned off the plate's pad, so no padding axis reaches it) and it
hands initial focus back to the input, which `command.contract.test.ts:203` measures.

Traces: `src/components/dialog/DialogContent.vue:19-39,133-149,186-204` ·
`src/components/command/CommandDialog.vue:24-33`.

### 2 · The rebuff — the wave's ONE mint (§3.1)

Lateral translate only, ≤4px, ~2 visible cycles on the PRESS row, `translate: calc(-50% +
var(--rebuff-x)) -50%` so the shake can never overwrite the plate's centring. PRM keeps
the REFUSAL and drops the GEOMETRY: one perimeter flash at ink α 0.48 on the same clock —
not a masking fallback, the affordance is intact and only its channel changes.

**Re-armable by construction, and the construction is load-bearing.** DLG-04's cure was a
scoped-CSS class over a PORTALED node: zero `data-v-*` attributes ever reached it, so
`animation-name` resolved to `none`, the completion event never fired, and the latch it set
could never clear. Here a monotonically-increasing refusal count drives a PARITY rung
(`a`/`b`) and CSS restarts an animation only when `animation-name` CHANGES — so
consecutive refusals each get a fresh run with no handshake to miss. The two keyframe
bodies are duplicated ON PURPOSE and the reason is written beside them; collapsing them to
one name re-introduces exactly the defect this replaces.

Traces: `src/components/dialog/styles.css:125-215` · `DialogContent.vue:138-149`.

### 3 · Proportion (§3.2) — every value a NAMED RUNG

The three citations were verified on disk before use: **PROPORTION.md:233** binds room 24
to *"dialog, sheet, drawer, big-dock card, showcase frame"* BY NAME; **:52** gives room 24
→ *"residue exactly 4"* with `30.53` in its replaces column; **:56** the pairing law
`pad(role) = r(role) − 4`; **:79** *"Type keeps its own clamp and never rides
`--ui-scale`"*.

| axis | HEAD | now | rung |
|---|---|---|---|
| radius | 16 (`rounded-dialog` → card) | **24** | `--radius-3xl` (room) |
| pad (block = inline) | 30.528 / 24 | **20 / 12** | `--space-family` |
| viewport gutter | 0 (`x 0, w 393`) | **20/side at 393** | `min(100% − 2 × --space-section, 32rem)` |
| section gap | 16 | **12 / 8** | `--space-body` |
| title ↔ description | 6 | **8 / 4** | `--space-atom` |
| footer peer gap | 8 / **0.00** at mobile | **12 / 8** | `--space-body` |
| header align | center@393 / left@1440 | **start, both** | — |

The mobile arm is not authored here at all. `tokens/sizing.css` §1.1 is the ONE
width-conditional spacing declaration in the library and it steps every rung down exactly
one at ≤768px, so reading the rungs transposes the whole plate for free — which is
precisely what `sizing.css:576-579` says the component lanes are for. **`--overlay-pad-*`
and the `×1.272` block lift are gone from the dialog**; 30.528 is on no series and a block
axis that disagrees with the inline one is not a pad.

Traces: `src/components/dialog/styles.css:14-72`.

### 4 · Type (§3.2 P2) — one derived interval, and ONE clause corrected with its falsifier

Description → `--type-body` (rung 0; **18.608px at 1440**, the spec's own figure). Title →
`calc(var(--type-body) * 1.272)` — √φ above it, **23.67px at 1440**, again the spec's
figure. This is the house's own paired-interval idiom (`typography/scale.css:126-131`,
`--type-proportional-kicker-size`): derive the pair from ONE fluid value so the ratio holds
at the clamp floor, through the fluid arm, and at the ceiling.

**CORRECTED WITH A FALSIFIER — G-DLG-ROOM's clause *"`font-size` identical at both
viewports (P2)"*.** That clause is falsified by the house's own ladder: `--type-body` is
`clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` (`typography/scale.css:109-113`), and a rung with
a vw arm cannot be identical across viewports by construction. P2's actual text is *"Type
keeps its own clamp and never rides `--ui-scale`"* — the checkable invariant is that NO
type rung appears in §1.1's transposition block, and that is what the gate asserts. Stated
verbatim in the executable at `dialog-room.test.ts:139-153`.

### 5 · Concentricity (§3.2, closes DLG-05 / F45)

`field-control.css:46-48`'s modal-scoped `border-radius: var(--radius-field)` DELETED — it
was the operative producer of the inversion (16px input inside a 16px plate across a 24px
inset). A roled child never takes the relay: the field is a CONTROL and keeps its control
silhouette. `radius.css`'s *"dialog-nested single input"* canon row struck with it, and the
`--radius-field` prose that named the modal exception corrected on the text.

The spec also directs deleting `DialogContent.vue:439`'s `isCenter ? {} :` gate while
**"saying plainly the second cut alone changes nothing in paint"** — it went out with the
whole centre/side fork.

Traces: `src/components/_shared/field/field-control.css:37-44` ·
`src/styles/theme/radius.css:20-22`.

### 6 · The radius token — REFUSED-IN-PART, routed, with the falsifier

§3.2 rules *"`--radius-dialog`/`--radius-3xl` die"*. **That byte is not this row's**, and
the falsifier is measured, not argued:

- §9 ROUTED and §COLLISIONS both assign the radius role TOKENS to **W-RADIUS-ROLE (O-7)**,
  whose line is *"dialog consumes room 24 / control 10 / pill"* — dialog CONSUMES.
- #23 W-RADIUS-ROLE **LANDED** (`a6d7db90`) and **REFUSED the §4 rename with four
  grounds**, leaving `--radius-dialog` in the CARD role.
- Two **ACTIVE** register seats state the card bind by predicate —
  `radius.dialog.card-bind` and `radius.context.card-relay`, both
  `owner: BJ.W-GATE-COLLAPSE`, both `sourcePath: tests/styles/radius-dialog-bind.test.ts`.
  Re-pointing the alias reds them; repairing them edits
  `GATE-SEMANTIC-ROSTER-C19.json` and moves `rosterSha256` — **the ONE batched pin
  `gates/ROSTER.md:53` reserves to band close**, which #18 already refused to spend for
  this exact class (RT-18A).

So: **the SURFACE takes the room rung directly** (`border-radius: var(--radius-3xl)` in the
one lane; the sheet's inner edges likewise), the ALIAS is untouched, both seats stay TRUE
of the token graph they were authored for, and the receipt stays byte-identical. The
alias re-point + the two predicates are **ROUTED → #65** as **RT-38A**.

A second consequence, stated rather than hidden: `tests/styles/radius-dialog-bind.test.ts`
is on §5's RETIRE list. Retiring it un-homes those two active seats and forces the same
reserved pin, so **it survives, amended** — its F45 block now asserts the override's
DELETION (three clauses) instead of its presence. Its retirement is **RT-38B → #65**.

`rounded-3xl` was NOT used: #23's census swept raw `rounded-(none|sm|…|3xl|full)` in `src`
to 0 and a utility would have re-red it. A `var()` declaration in the component's own lane
is on-ladder for `token-hygiene` and touches no `class-names.ts` regex — §9's *"widens no
regex"* honoured.

### 7 · Motion (§3.3)

- ~~**Entrance UNTOUCHED.**~~ **[2026-08-05 CURE-C3: FALSE AS WRITTEN — the CURVE is
  intended-identical, the MECHANISM changed for every real consumer, and the difference is
  the whole of what P14 has to capture.]** `scale:` and `opacity` ride their own longhands;
  `transform: none` clears any utility matrix. The centring `translate: -50% -50%` moved
  INTO the stylesheet so it holds at `motion="off"`, where no spring style is written at
  all. **What actually moved:** at HEAD the spring armed only when `springPreset != null`
  (`git show HEAD:src/components/dialog/DialogContent.vue:95-102,235`), and `springPreset`
  had **zero passers in `src/` and `demo/`** — so every real dialog took the CSS
  `.glass-reveal` LIQUID-ENTER bloom through `data-reveal="overlay"` +
  `defaultMotionClasses`. `DialogContent.vue:85-94` now writes `springStyle`
  unconditionally and `.glass-reveal`/`data-reveal` are gone. The intent is a no-op —
  MOTION-CANON gives MODAL one curve (`present`, 0.22 / ζ 1.00) and that is the curve on
  both sides — but "untouched" describes a file this cut rewrote for 100% of consumers.
  **The F20 entrance byte-parity capture at §6 P14 is therefore LOAD-BEARING and OWED**:
  it is the only evidence that the CSS bloom and the JS spring land the same, and it is
  not run at this seat.
- **DLG-14's cure is deletion.** `springPreset` gone — MOTION-CANON gives MODAL one curve
  (`present`), and the setup-time non-reactive capture that lost both bloom and spring on a
  live PRM flip loses its substrate. Cheaper than a `watchEffect`; the KISS cut.
- **DLG-13's cure is CO-TERMINATION.** Scrim and plate read the SAME live scalar on every
  path — `scrimSlideT` is no longer `null` on the centre path, which is what made
  `:375-377`'s *"the two never desync"* a false sentence. It is true now.
- The `animation: none` leg was **removed** and the reason recorded in the source: the
  plate composes no `animate-in`/`animate-out` and no `.glass-reveal`, so there is no
  keyframe to defeat — and writing one there would silence the rebuff.

Traces: `DialogContent.vue:71-111` · `dialog-spring.test.ts` (amended).

### 8 · The ✕ (§3.4)

44×44 via `--touch-target`, glyph 16, capsule on an inset `::before`, `--radius-pill`,
`cursor: pointer`, rest ink `--foreground`. Hover (pointer-gated) and press are DISTINCT in
both fill and scale — they were byte-identical, and the press had no material response at
all.

**[2026-08-05 CURE-C3 · ONE SPEC FIGURE DIVERGES, disclosed with its ground.]** §3.3 asks
for **1.05 / 0.96** on the ✕; the shipped rule reads `var(--scale-hover)` = **1.08**
(`src/styles/tokens/scale-paper.css:9`) and `var(--scale-press)` = 0.96 (exact). §3.4 names
a `--scale-hover-btn` that **does not exist in the tree** (`grep` → 0). So the choice was
between a house rung one step off the spec's figure and a minted literal or a minted token
— and minting is forbidden at this row (`--scale-hover` is the register's byte, and the
whole §3.2 argument is that every value must be a NAMED RUNG). The rung wins: 1.08 is the
library's hover scale everywhere else, and a dialog ✕ that hovers by a different amount
than every other control is a worse defect than 0.03 of scale. **Recorded as a divergence,
not a match.** If 1.05 is wanted as a distinct rung it is the scale register's byte, not
this component's. Focus: `outline: 2px solid ink/0.48` + `outline-offset: 2px`, replacing an
`outline: 3px none` that painted nothing. The blanket `opacity-70` that compounded every
state into one wash is gone with the three dead classes (`data-[state=open]:*` ×2 on a node
that never carries `data-state`, `disabled:pointer-events-none` on a button never disabled).
**DOM-FIRST** inside the content, so tab order, DOM order and visual order agree.

The glyph is INLINE SVG rather than a `@lucide/vue` import — two strokes, this surface's
only icon, and the static import put the whole icon module in the eager boot graph of every
consumer mounting a Dialog, including the command palette which renders no ✕ at all. This
is also what brought the boot graph back under its ceiling (§4).

Traces: `styles.css:74-123` · `DialogContent.vue:186-204`.

### 9 · The dialog/sheet SPLIT (§3.5) + RT-18C

`src/components/sheet/` **SEEDED**: `SheetContent.vue` (the eleven `isCenter` branches, now
unconditional) · `styles.css` (the geometry, re-slotted onto
`[data-slot="sheet-content"][data-side]`) · `motion.ts` · `index.ts`. `placement.css` and
`sheet-motion.ts` deleted. `SheetContent` exported from the root barrel; the `./sheet`
package subpath rides the batched export cut (§9 ROUTED), and `subpath-policy.mjs`
classifies `sheet: "INTERNAL"` so the fail-closed generator stays closed.

`_shared/overlay/` NOT minted (that is #89's); `SheetContent` composes `dialog/ModalOverlay`.

DELETED props: `showClose` · `stage` (+ enum + `dialogStageContext.ts`) · `backdrop` ·
`springPreset` · `placement` (leaves with the split) · `ModalOverlay.scrim`.
`DialogTrigger`/`DialogClose` now re-export reka's own primitives — the two house SFCs
forwarded props and nothing else behind a justification that argued a `.ts` file cannot do
a 1-line re-export, inside a `.ts` file.

**THE STAGE, in toto.** `[data-stage-wrapper]` had ZERO receivers repo-wide and ~150 lines
drove one attribute for nothing, with prose asserting the opposite — a masking fallback
with a comment. Gone from `Dialog.vue`, `DialogContent.vue`, `ModalOverlay.vue`, and
`dialogStageContext.ts` deleted. In `drawer/styles.css` (row 8's file — *"dialog deletes
its reads"*) the `[data-stage-flip]` transition rule went with its only writer, and the
three `:not([data-backdrop="graded"])` guards went with the prop that was theirs: a
condition that can never again be false is a masking no-op, not a guard. Drawer's own
`data-stage-scale`/`-immersive` writers (`useDrawerSnap.ts:114,118`) are untouched, so its
paint is byte-identical.

**RT-18C DISCHARGED.** `demo/stories/feedback/confirm-dialog.vue` (265) and
`demo/stories/compositions/gate-pattern.vue` (201) deleted with their manifest rows;
`tests/components/dialog.confirm-preset.test.ts` retired (its subject left the tree).
`/containers/dialog` rewritten around the three `dismiss` rows, with the locked row's
`aria-describedby` wired to its live error text. Manifest `s(` rows **83 → 81**, so the
**π story-index route-count DELTA for this row is −2** — the owed browser capture is
checked against −2.

### 10 · The scrim (§3.3, §9) + the veil

`ModalOverlay.vue`'s `[backdrop-filter:var(--glass-blur-wash)]` DELETED, and
`DrawerOverlay.vue`'s with it (both named in the TR cell). The mechanism's sign is wrong:
a wash blur pulls bright neighbours into every sampled pixel, so the "backdrop" measurably
BRIGHTENED what it occluded — +5.1% core / +31.3% below-plate in light, **+76.0% in dark**.
No re-inking fixes that. **No α is minted here** — that token is the scrim register's and
this seat supplies measurement only (R-F-ALPHA).

**The veil binding SURVIVES, and this is a deliberate supersession.** §STRIKE puts
`backdrop="graded"` + `--glass-halo-*` out of dialog, written when the graded arm WAS the
defective private recipe. **#24 W-GRADIENT-BLUR has since landed** (`f29212bd`) the §9
re-derivation as the shared `.glass-focus-veil` — five tokens, a registered centre, no
`--glass-bg-overlay`, ~~no 20px halo blur~~ **[2026-08-05 CURE-C3: FALSE, AND IT WAS THE
LOAD-BEARING HALF OF THIS SUPERSESSION'S GROUND. MEASURED LIVE:
`getComputedStyle(veil).backdropFilter === "blur(20px) saturate(1.5)"` on the open dialog
at 1440×900. The indirection is right and the NUMBER is exactly the one the canon struck:
`tokens/glass.css:142` `--glass-focus-veil-blur: var(--glass-blur-floating-radius)` →
`tokens/glass.css:88` `--glass-blur-floating-radius: 20px`, against `MOTION-CANON.md:95`
("20px violates the ≤15px budget band declared eleven lines above it") and `:248` (the veil
row: "= 11px … Replaces `--glass-halo-blur: 20px`, which busts the ladder's own ≤15px
budget band"). So the veil the dialog composes carries the canon-struck radius, not the
11px the canon ruled. The token is `tokens/glass.css`'s byte and moving it repaints every
floating surface in the library — one-owner-per-file — so it is MEASURED here and ROUTED,
not cut: **RT-38C** to the glass lane (#86 / #22).]** — and `ModalOverlay.vue` is one of
only two named consumers `focus-veil.test.ts` recognises. Deleting the binding would orphan
a primitive built one row earlier. So: the KNOB dies (declined at BJ-7, zero consumers
after the demo cut) and the veil rides ~~**UNCONDITIONALLY**~~ **[2026-08-05 CURE-C2: on
an explicit `veil` boolean — see §CURE C2. "Unconditional" was true of the CENTRED case and
wrong for the side sheet, which composes the same scrim.]** — a centred modal IS the
definitional focus event and sits at the veil's own 50% rest, exactly as #24's own text
says. P13's `grep glass-halo src/components/dialog → 0` holds.

**[2026-08-05 CURE-C3 · THE POOL-vs-PLATE GEOMETRY, measured and routed.]** DLG-07 booked
"pool fixed 416×416 vs 384×214 plate (1.94×)" as part of its defect; §10 discussed the blur
and the dim and never the geometry. Measured now on the centred dialog at 1440×900: core
`13rem` × `13rem` + `7rem` bloom = a **640×640** pool against a **512×276** plate —
**2.32× on the block axis**, and neither `ModalOverlay.vue` nor `DialogContent.vue` writes
`--glass-focus-veil-core-x/-y` from a rect (`src/components/slider/Slider.vue:234-235` is
the only consumer in the library that does). The core tokens are `tokens/glass.css:143-144`
— the same owner as the blur — so the pool geometry rides **RT-38C** with it.

### 11 · Five CSS lanes → ONE

`src/components/dialog/styles.css` is the single place the plate's geometry is authored.
The SFCs ship zero `<style>` blocks and carry no inline structural strings. The five lanes
that fed it before: the SFC's inline strings, `placement.css`, the `field-control.css`
override, the `radius.css` doc row, and `base.css`'s `focus-ring` (which the ✕ no longer
composes — `base.css:113-117` is #80's byte and is untouched).

`placement.css:12`'s false sentence — *"ALWAYS emits in dist/glass-ui.css"* — is REWRITTEN,
not struck (R-B1-STRIKE12: the rule is live, the sentence is false), and re-stated
truthfully on `sheet/styles.css`. DLG-16's manifest half is **MOOT ON DISK**:
`gen-component-styles.mjs` no longer carries a MEMBERS allowlist — it derives members from
the build's own ordered style closure via a `hasComponentStyles` probe — so there is no
hand-list to be incomplete. Recorded, not silently dropped.

### 12 · DLG-10 (the eight boundary legs) — ROUTED, with the falsifier

§3.2's plate-edge row wants 1px ink + ONE drop + ONE specular. §9 ROUTED assigns *"specular
ring K2 + legs >0.12 K3"* to the glass wave, with dialog handing over *"the
8-legs-on-one-element count"*. The legs live on the SHARED `.glass-floating` tier, not in
`dialog/`, so cutting them here would re-paint every floating surface in the library and
breach the one-owner-per-file law (#86 W-SURFACE-MATERIAL / #22 W-FROST). **Handed over,
not cut. RT-38C.**

---

## §3 · GATES — 2 authored, close-battery class, **seats +0**

Both file against seated registers (PROPORTION and OVERFIT); neither mints a seat. The
`gate-register.mjs` receipt is byte-identical pre and post (§4).

| gate | executable | clauses |
|---|---|---|
| **G-DLG-ROOM** | `tests/components/dialog/dialog-room.test.ts` | 15 |
| **G-DLG-DISMISS** | `tests/components/dialog/dialog-dismiss.test.ts` | 9 |

**BORN-RED, measured on a pristine `git archive HEAD` tree** (`660cfaf8`), the same two
files copied in unchanged:

```
22 of 24 clauses RED
 2 GREEN, both standing locks, named:
   dialog-room  · "takes no part in the §1.1 space transposition"  (P2 already held)
   dialog-dismiss · "mints no Confirm* or Gate* symbol"            (the duplicates lived in demo/)
```

They were made to red PER CLAUSE, not at module load: the first authoring read its subject
files at module scope, which turned a missing file into one load error and *"no tests"* —
ABSENT under the ⊕²⁵ vocabulary, not RED. Every read is now lazy and inside its clause.

The G-DLG-DISMISS grep is **SCOPED, and the scope is the spec's own**. The literal clause
greps the dismiss intents over `src/components/dialog` AND `demo/` for a total of 0; over
`src/components/dialog` that is self-contradictory, because `locked` cannot rebuff what it
never observes — and §3.5 says so one section earlier: *"Reka's dismiss-intent emits STAY —
observing is legitimate; guarding is what the gate forbids."* The consumer half is asserted
at 0. The library half is asserted as a CONFINEMENT: the binding exists in exactly ONE
file, so the mechanism cannot sprawl back into the components that hand-rolled it.

**Retired** (§5, census re-verified): `dialog-show-close.test.ts` ·
`dialog-stage-ownership.test.ts` · `graded-backdrop.test.ts` · `dialog.confirm-preset.test.ts`.
`radius-dialog-bind.test.ts` REFUSED-IN-PART → RT-38B (§2 item 6).
**Relocated with sheet/:** `dialog-graded-edge.test.ts` → `tests/components/sheet/sheet-graded-edge.test.ts` ·
`sheet-motion.test.ts` → `tests/components/sheet/`.
**Amended:** `dialog-spring.test.ts` (preset clauses die, entrance clauses stay) ·
`ModalOverlay.test.ts` (scrim-axis clause dies) · `dialog-close-contrast.test.ts` (its
subject was the dead open-state pair; re-pointed onto the ink that IS painted) ·
`dialog-focus-return.test.ts` (the spring is unconditional now) ·
`focus-veil.test.ts` · `radius-role-canon.test.ts` (the ✕ bind's ADDRESS moved into the one
lane; a ROOM-role clause added beside it).
**Relocated:** `tests/components/ui/dialog/` → `tests/components/dialog/` (the `ui/` hop is invented).

---

## §4 · VERIFY GATE (verbatim)

**[2026-08-05 CURE-C1 · THE GATE ITSELF WAS TOO NARROW, and that is this row's own law
now.]** The battery below is `tests/styles tests/components tests/gates`. It left FOUR RED
tests standing in the live tree, in two files outside it: `tests/demo/skip-link.a11y.test.ts`
(#31's own gate, broken by this cut's story deletion) and `tests/public-surface.spec.ts`
(broken by this cut's root-barrel export and by a `dist/` never rebuilt). Both were
reachable only by the full runner. **RULED, and stated here as the row's law: a cut that
DELETES DEMO STORIES or TOUCHES THE ROOT BARREL verifies on full `npx vitest run`, not on a
component-directory subset.** A battery scoped to the files you edited cannot see the files
you broke. The superseded receipt is kept below the cured one, struck, because the figures
it carries are true of the tree it was run on.

### The CURED receipt (post-C1…C6)

```
$ npx vue-tsc --noEmit
(exit 0, no output)

$ npx vitest run                          # FULL — the row's law, per the ruling above
 Test Files  217 passed (217)
      Tests  1727 passed | 3 expected fail (1730)
   Duration  22.48s
                                          # two consecutive clean full runs

$ npx vitest run tests/styles tests/components tests/gates    # the narrow battery, for continuity
 Test Files  156 passed (156)
      Tests  1310 passed | 3 expected fail (1313)
                                          # five clean runs (3 serial + 2 under deliberate concurrent load)

$ npm run build                           # exit 0 — dist carries components/dialog/styles.css
                                          # + components/sheet/styles.css, 0 hits for placement.css
$ npm run demo:dist:build                 # exit 0 — grep -c modulepreload dist-demo/index.html = 60

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

**ONE INTERMITTENT, disclosed and named rather than re-run away.**
`tests/components/dropdown-menu.contract.test.ts:118` — *"keeps the click branch to one
portaled menu and restores focus on execute"* — failed in 2 of 7 full/battery runs and was
**12/12 green on three consecutive isolated runs**. It is **#29's known one**, already
measured at pristine HEAD by row 31 at the same rate; this cut's only contact with that
component is nothing at all. The two clean full runs above are the receipt.

### The superseded receipt (pre-cure, narrow battery)

```
$ npx vue-tsc --noEmit
=== vue-tsc: CLEAN ===

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  156 passed (156)
      Tests  1304 passed | 3 expected fail (1307)
   Duration  12.75s
   [2026-08-05 CURE-C1: GREEN AND INCOMPLETE — 4 tests were RED in the tree it did not read.]

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
    roster title: TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)
```

Receipt **byte-identical pre and post**: `seats:60 … bound:8 … unbound:50 … violations:0`,
`rosterSha256:dc05df91` unchanged. The one `drift:1` is the pre-existing tags-input row
already routed to #65 — it is not this cut's.

**The boot-graph ceiling was busted mid-cut and CURED, not raised.** Splitting one
component into two split its rollup chunk, and the demo shell eagerly mounts both, hoisting
four modules into their own eager chunks: **61 modulepreloads against a hard 60**. Three
candidate cures were measured and two rejected on the numbers — `defineAsyncComponent` at
either shell site made it WORSE (65 and 68, the async boundaries fragmenting shared deps),
and deep-importing the barrel changed nothing. The cure that worked is the honest one:
inline the ✕ glyph so the icon module leaves the eager graph of every Dialog consumer,
including the palette that renders no ✕. **61 → 60, exactly at the ceiling, ceiling
untouched.** `npm run demo:dist:build` re-run; `boot-graph` 14/14.

---

## §5 · git diff --stat

```
 47 files changed, 639 insertions(+), 3039 deletions(-)
```
~~` 42 files changed, 577 insertions(+), 3031 deletions(-)`~~ **[2026-08-05 CURE: the
cut's own figure. The five files the cures added are `tests/demo/skip-link.a11y.test.ts`,
`demo/shell/dock-layer-contexts.ts`, `src/components/index.ts`,
`src/components/_shared/axes.ts`, `demo/stories/containers/sheet.vue`.]**

(plus untracked: `src/components/dialog/styles.css`, `src/components/sheet/` ×4,
`tests/components/dialog/` ×7, `tests/components/sheet/` ×2, this record)

`src/components/dialog/` 1,016 → **616** · `src/components/sheet/` **400** (seeded) ·
demo −466 (the two deleted stories) − 607 net on `/containers/dialog`.

---

## §6 · ROUTED / OWED

| id | what | owner |
|---|---|---|
| **RT-38A** | `--radius-dialog` re-point onto the room rung + the two seat predicates (`radius.dialog.card-bind`, `radius.context.card-relay`) — one batched roster byte | **#65** W-GATE-COLLAPSE |
| **RT-38B** | retire `tests/styles/radius-dialog-bind.test.ts` (§5's list) — same batched byte as RT-38A | **#65** |
| **RT-38C** | DLG-10: the eight boundary legs on the SHARED floating tier; dialog hands over the count. **[2026-08-05 CURE-C3 — GROWN, two measured items:] (a)** `--glass-blur-floating-radius: 20px` (`tokens/glass.css:88`), which `--glass-focus-veil-blur` reads (`:142`) and the dialog's veil therefore paints — **`blur(20px)` measured live** — against `MOTION-CANON.md:95`/`:248`'s ruling of **11px** and its own ≤15px budget band. **(b)** the pool-vs-plate geometry: core `13rem`+`13rem` with a `7rem` bloom (`:143-145`) = a fixed **640×640** pool against a **512×276** plate, **2.32×** on the block axis, written from no rect by any consumer but the Slider | glass wave (#86 / #22) |
| **RT-38D** | `./sheet` package subpath (`−./drawer +./sheet` in `public-surface.spec.ts`) — the batched export cut | **#65** (C-9) |
| **RT-30D** | `.glass-vaporize` adoption at the dialog — **inbound from #30, ROUTED ON** with its ground (§0) | **#39** |
| **RT-30G** | the `data-motion="off"` cascade contest — **inbound from #30, ROUTED ON** with RT-30D; latent at this HEAD (neither `.glass-reveal` nor `.glass-vaporize` is on the plate) | **#39** |
| **RT-30F** | the scrim-as-STEP `backdrop-filter` delete — **inbound from #30, DISCHARGED IN FULL** here (§10, both legs). Nothing owed | — |
| **RT-38E** | **[2026-08-05 CURE-C6]** two DANGLING PATHS in other owners' files, both PAST-TENSE provenance rather than live-file claims, so neither is a false sentence — but both name `dialog/placement.css`, which this cut deleted: `src/styles/tokens/glass.css:118` ("lifted out of `placement.css`") and `src/styles/glass/focus-veil.css:11` ("`dialog/placement.css` FORM 2 **was** this exact geometry"). Left untouched under one-owner-per-file; they ride RT-38C's lane. A third, `tests/gates/trap-gates.test.ts:9`, cites the deleted `tests/components/ui/dialog/graded-backdrop.test.ts` and is the gate lane's | glass wave (#86 / #22) · #65 |
| **RT-38F** | **[2026-08-05 CURE-C6]** `src/components/index.ts` has **ZERO importers repo-wide** (`grep` over `src/ demo/ tests/ scripts/` → 0) and `src/index.ts:46` documents that the root barrel re-exports per package *rather than* walking it. The `sheet` row was added because an index that omits one of its 31 members is the drift the next reader trips on — but the orphan barrel ITSELF is the dead-export class, not a prose fix | **#19** (dead-export shim) |
| **π-38** | The §6 capture battery P1-P15, Chromium **and** real safari-app. **NOT RUN this seat** — the receipt records *"Safari NOT run"* per P15. Story-index route-count delta to check: **−2** (83 → 81). **[2026-08-05 CURE: P14 is now LOAD-BEARING** — the entrance MECHANISM changed for every preset-less consumer (§2 item 7) and the byte-parity capture is the only evidence the curve did not. **P3 is unmeetable as written** — it asks for "field = control 10 inside plate 24/pad 20", but `--radius-control: var(--radius-pill)` since #23, so the delivered input is a 40px pill (effective r≈20) inside a 24px plate across a 20px inset: check it as **outer-24 / inset-20 NON-INVERSION**, which is what was actually cured, not as true concentricity.** Two Chromium cells are already banked at `cells/` by the cure seat (C2's paired veil delta + C5's gutter) and are NOT a substitute for the battery | driver browser seat |
| owed | §9's standing hand-offs, unchanged: drawer fold + `useDrawerSnap` + detents (row 8) · `command/styles.css` inversion (row 25) · `aria-modal`/`aria-hidden` (#31) · `compositions/` remainder (#21, RT-18D) · PROPORTION §1.1 label erratum. **[2026-08-05 CURE-C4: `origin="element"` (row 37) is no longer a bare hand-off — the ROOT SEAM IS SHIPPED (§CURE C4); row 37 lands the consumption or deletes the prop.]** | as named |

---

## §CURE · 2026-08-05, adjudication CURE-REQUIRED (C1…C6)

Applied by the row-38 CURE seat, **modelId `claude-opus-5[1m]`**, on the same uncommitted
tree. Nothing staged, nothing committed. Every mutation restored **from a scratch copy**,
never `git checkout` (§8, shared tree).

### C1 · BLOCKER — the four RED tests the row's own battery could not see

| site | cure |
|---|---|
| `tests/demo/skip-link.a11y.test.ts:75` | `"gate-pattern"` removed from `COMPOSITIONS` (2 tests RED on `ENOENT`). It was #31's W1-F gate, landed two rows earlier, and this cut deleted its subject discharging RT-18C. A constraint comment now says why the list must track the tree. |
| `demo/shell/dock-layer-contexts.ts:363` | the dead `{ storyId: "gate-pattern", label: "Gate Pattern" }` registry row deleted — the manifest rows were cut 83 → 81, this second registry was not. |
| `tests/public-surface.spec.ts` | `"SheetContent"` added to the `rootRuntimeExports` literal. **This is not RT-38D**: RT-38D routes the `./sheet` package SUBPATH to #65; the root barrel key is this row's own byte (`src/index.ts:294`). |
| `dist/` closure | `npm run build` re-run — the seat had re-run only `demo:dist:build`, so `dist/` still carried `components/dialog/placement.css` and lacked both new partials. Now: `dialog/styles.css` ✓ · `sheet/styles.css` ✓ · `placement.css` **0 hits**. `npm run demo:dist:build` re-run after it; **60** modulepreloads, ceiling held. |

### C2 · HIGH — the veil is a GEOMETRY, so it is a parameter

`ModalOverlay.vue` takes an explicit **`veil?: boolean`** (default `false`) and gates the
`.glass-focus-veil` span on it. `DialogContent.vue:180` passes `veil`; `SheetContent.vue:147`
passes nothing, with the reason written at both sites.

**Why it had to change.** `ModalOverlay` is the scrim for BOTH surfaces. The veil's core is
the FIXED `--glass-focus-veil-core-x/-y: 13rem` at `--veil-x`/`--veil-y`'s 50% rest — a
~640×640 pool at the middle of the viewport. Slide-gating could never have fixed it: the
SHEET is the arm that sets `slideT`, and the centre path leaves it `null`, so a null-check
veils exactly the wrong one of the two.

**PAINT, paired, at 1440×900 (`/containers/sheet`, `Open Right`):**

| | sheet rect | `.glass-focus-veil` | scrim |
|---|---|---|---|
| PRE (`veil` forced on) | `x 1056, w 384, h 900` | PRESENT · `0,0,1440,900` · `blur(20px) saturate(1.5)` · core `13rem`/`13rem` · bloom `7rem` · `--veil-x/y` `50%` | dim |
| POST (shipped) | `x 1056.4, w 384, h 900` | **ABSENT** — `null` on all four sides (`top`/`right`/`bottom`/`left`) | dim, `backdrop-filter: none`, **0 children** |

Cells: `cells/sheet-right-1440-veil-PRE.png` (the frost pool, centred, with nothing engaged
inside it) ∥ `cells/sheet-right-1440-noveil.png`. The PRE cell was produced by re-adding
`veil` to `SheetContent.vue` and **restored from the scratch copy byte-exact**
(`62316779c1f7…`) before the final build.
The centred plate is unaffected: veil PRESENT on all three `dismiss` rungs at
`/containers/dialog`.

**Arms:** `tests/components/dialog/ModalOverlay.test.ts` — veil present when asked, **absent
by default**, and asked for by the centred plate (mounting real `DialogContent`) ·
`tests/components/sheet/sheet-graded-edge.test.ts` — **no veil on any of the four sides**,
with the dim asserted intact so the clause cannot pass by deleting the scrim.

### C4 · SHIPPED — the origin-rect seam (driver ruling (c), no falsifier found)

`Dialog.vue` declares `origin?: DOMRectReadOnly | null`. It is a HOLE, exactly as CWT-2:280
words it (*"the root accepts an origin rect so row 37 lands `origin="element"` without
re-cutting the entrance"*) and §4 ADD lists it (*"one prop-shaped hole, no machinery"*).
Nothing reads it; the entrance is byte-identical with and without it.

**The one thing that is not zero machinery, and why:** `origin` is withheld from the
`useForwardPropsEmits` set (a 3-line computed). reka's root does not know the prop, and
forwarding an unknown prop to a component that renders no element of its own can only
produce a stray — a rect stringified onto the DOM the day that root grows one.

**The falsifier I considered and rejected:** an accepted prop that produces no effect is a
silent no-op, and CWT-2:1568 names the risk itself (*"row 37 must land the fold or the seam
is a dangling prop-hole"*). It does not carry, because the class §STRIKE cut here was
~150 lines of machinery driving an attribute **with prose asserting it worked**. This is
the opposite: no machinery, and the doc-block says plainly that it is unconsumed and that
it leaves with the refusal if row 37 refuses. Refusing it would also cost row 37 the exact
re-cut the seam exists to prevent.

**Arm:** `tests/components/dialog/dialog-attrs.test.ts` — the root declares the typed rect,
and passing one never reaches the DOM (no `[origin]` element, no `DOMRect` in the markup).
The second clause stays true after row 37 lands the consumption.

### C5 · the ✕ gutter — reserved, and only where a ✕ renders

`dialog/styles.css`: `:where([data-slot="dialog-content"]:has([data-slot="dialog-close"]))
:where([data-slot="dialog-header"]) { padding-inline-end: calc(var(--touch-target) +
var(--space-atom)); }`. The `:has()` sits on the CONTENT because the ✕ is the header's
SIBLING, not its child.

The ✕ is absolutely positioned at `inset-inline-end: var(--space-family)` — the plate's own
inline pad — so it occupies the last `--touch-target` of the content box, over whatever the
header flows there. At the shipped 16px glyph that was a 16px collision zone; the 44px
target this wave owes A6 tripled it.

**PAINT at 1440×900:** `free` → header `padding-inline-end: 52px`, title box `470 → 418`
wide, title right edge **903** against the ✕'s left edge **911** = an exact **8px**
(one `--space-atom`) gap. A deliberately long title now WRAPS at 868.5 — **42.5px clear**
of the glyph — instead of running under it. `deliberate` and `locked` render no ✕ and
measure `padding-inline-end: 0px` with the full 470px title width, so the reservation
costs the two closeless rungs nothing. Cell: `cells/dialog-1440-close-gutter.png`.
**Arm:** `dialog-room.test.ts` — the scoped rule carries the calc AND the unconditional
header rule carries no `padding-inline-end`.

### C6 · five prose fixes

| site | was | now |
|---|---|---|
| `src/components/index.ts:25` | ``// `sheet` RETIRED — folded onto `<DialogContent placement>` `` | `export * from "./sheet";` — **decided on the merits.** 30 of 31 component directories have a row; an index that omits one member is drift, the line is inert (the barrel has zero importers), and the orphan-barrel deletion is a bigger call routed as **RT-38F → #19**. |
| `src/components/_shared/axes.ts:44-46` | *"Sheet's side-slide folds onto Dialog `placement`"* | the anchored-edge axis, `SheetContent side`, stated as what it is |
| `src/components/_shared/axes.ts:54` | same fold claim on the `PLACEMENTS` doc | names the two real consumers that exclude `center` (`SidePlacement`, `FloatingSide`) |
| `demo/stories/containers/sheet.vue:38-40` | **user-visible**: *"different `placement` prop"* | *"different `side` prop"* — the story's own bindings had already been rewritten to `side` |
| `tests/public-surface.spec.ts:77` | `// Sheet folded onto <DialogContent placement> (clean break).` | states why `Sheet` is off the wrapper list while `SheetContent` is a root key |
| `tests/styles/focus-veil.test.ts:19` | cites `tests/components/ui/dialog/graded-backdrop.test.ts:95-115`, **deleted by this cut** | re-pointed onto `tests/components/dialog/ModalOverlay.test.ts` + the sheet's negative twin |

### Mutation battery for the cure arms — 4 planted, 4 BITE

| # | mutation | result |
|---|---|---|
| M1 | drop `veil` from `DialogContent`'s `<ModalOverlay>` | **2 RED** (the overlay's caller-asked clause + the centred-plate composition clause) |
| M2 | add `veil` to `SheetContent`'s `<ModalOverlay>` | **1 RED** (the four-side sheet clause) |
| M3 | delete the `:has()`-scoped gutter rule | **1 RED** |
| M4 | delete `origin?: DOMRectReadOnly \| null` from the root | **1 RED** |

Every target restored from its scratch copy and re-hashed byte-exact
(`DialogContent 1fd5da14…` · `SheetContent 62316779…` · `styles.css 2b353976…` ·
`Dialog.vue 7521d078…`).
