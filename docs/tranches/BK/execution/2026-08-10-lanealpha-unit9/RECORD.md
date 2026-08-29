# LANE α — UNIT 9 · THE R2 RESIDUAL CURE

**One commit-unit. One declaration, one unit arm, one π cell enqueued.** The π re-capture
battery came back with exactly one α STILL-RED, and this unit closes the half of it that
is code. The other half is geometry and is owed to the browser seat, not claimed here.

---

## §0 · SEAT, MODEL, BASELINE

**Model asserted first, and it gates the chain:** `claude-opus-5[1m]` — the implement
seat's required class.

**BASELINE, banked before any byte.** HEAD `dfe6971f` (*"test(BK/π): bank the re-capture
battery — 10 of 12 cures CURED-GREEN in paint, two residuals routed"*), the commit that
carries the order of record this unit executes.

```
git diff -U0 > /tmp/bk-lanealpha-baseline-1788030510.diff   → 0 bytes
git status --porcelain | wc -l                              → 0
git ls-files --others --exclude-standard                    → (empty)
```

**THE DISPATCH'S TREE DESCRIPTION IS CORRECT HERE AND IT IS WORTH SAYING SO.** It warned
that lane β's unit-β0 dirt would be on the tree; it is not, and neither is anything else.
The tree was **clean** at open — a seat told to expect foreign dirt and finding none must
say so, or a later reader assumes it was swept. HEAD is `dfe6971f`, ahead of the
dispatch's `2cfc1124` floor, which is the commit the order of record needs.

**FOREIGN DIRT ARRIVED DURING THE UNIT, and it is not mine.** The tree was clean at open
and carried four foreign modifications at close — **lane γ, mid-flight, handmark
surfaces**:

```
 M src/components/handmark/HandMark.vue                        (+62 / −17)
 M tests/components/custom/handmark/g-hm-layer.test.ts         (+92)
 M docs/…/2026-08-10-lanegamma-unit6/RECORD.md                 (+19)
 M docs/…/2026-08-10-lanegamma-unit6/PI-QUEUE.md               (+9)
```

Not read for adoption, not edited, not reverted. They are inside the battery figure at
§5 and are attributed there. **This unit's own set is 3 modified + 1 untracked dir**, and
nothing in it overlaps γ's.

---

## §1 · THE ORDER OF RECORD, READ FIRST

`docs/tranches/BK/execution/2026-08-25-pi-band/rerun/PI-RERUN-BATTERY.md` §π-RERUN-R2,
committed at `dfe6971f`. Its numbers, not this seat's opinion, define the defect:

| | control | HEAD (post-R2-cure) |
|---|---|---|
| total | 67 | 68 |
| clippedCount | 63 | 49 |
| **any cross-axis clip** | — | **21** |
| any scroll-axis clip | — | 34 |

**The horizontal arm works. The vertical arm went backwards.** The cross-axis count had
to reach 0 and reached 21, and on the vertical dock the cut GREW from 4px to 8px.

---

## §2 · THE CURE — one declaration, at the root

### §2.1 · The defect, in the box model

`.dock-run` rides the SAME element as `.dock-layer--full` (`GlassDock.vue:464`,
`'dock-layer dock-layer--full dock-run'`). The R2 cure reserved the ring as
`padding-inline: var(--dock-ring-reserve)` + `margin-inline: calc(-1 * …)` on the
vertical run (`run.css`), which grows the padding box the port clips to **only if the
box's cross size is auto**. It is not. Two rules in the band author a non-zero size on
that element, and — this is the whole finding — **both of them land on the axis the
reserve pads**:

```
layers.css  .glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100% }
                                          → the VERTICAL run's cross (inline) axis
layers.css  .glass-dock:not(.vertical) .dock-layer
              { min-height: var(--dock-layer-height, 2.5rem) }
                                          → a HORIZONTAL run's cross (block) axis
```

The first is the rule the battery names. The second is why the battery ALSO caught a
horizontal dock losing height, which the dispatch's "the horizontal arm works" did not
cover — see §2.4. With `box-sizing: border-box` inherited from the host's `*` reset, the
padding therefore ate the CONTENT box and the negative margin only shifted the box left.
Measured at `/dock/overview` @1440, both themes identical:

```
sidebar vertical run    runRect x=16 w=40   clientW 40   scrollW 48   content 32
                        crossOverflow +8    (pre-cure 0)
                        margin box 40 → 32  · padding box 16..56 · seat layout 20..60
                        seat PAINT reaching 20..55.5 — 4px of the BUTTON cut off
                        ring ink at cssX 16, 16.5, 17, 17.5 only — right arc absent
horizontal i=5          dockRect h 56 → 48  · runMarginBox h 40 → 32
```

**The declaration `.glass-dock.vertical .dock-run` is (0,3,0). `layers.css`'s
`width: 100%` rule is (0,4,0).** A re-authored size in `run.css` loses the cascade; an
out-specified one is the arms race the order forbids.

### §2.2 · The cure

```css
.glass-dock .dock-run {
    box-sizing: content-box;
    padding-block: var(--dock-ring-reserve);
    margin-block: calc(-1 * var(--dock-ring-reserve));
}
```

One declaration, on the base rule — the one that already owns the reserve pair, so the
box model and the reserve are one act and one owner. It does not fight the `width: 100%`;
it changes what the authored 100% **means** on this box: the size becomes the size the
SEATS get, the reserve adds on top of it, and the negative margin hands that addition
back to the parent. Which is what the R2 comment always claimed, and now is.

Arithmetic on the sidebar run (parent content box `20..60`, width 40):

```
border-box (HEAD)      border 16..56 · padding box 16..56 · content 20..52 (32)
                       seats 20..60 overflow by 8 → the port clips the seat at 56
content-box (cured)    border 12..60 · padding box 12..60 · content 16..56 (40)
                       seats 16..56 · ring outer 12..60 === the clip rect
                       margin box 16..56 — the parent's own box, unmoved
```

The seats return to their **pre-cure** positions and the clip rectangle alone grows,
which is the invariant the whole reserve was for.

**It also deletes a silent dependency on the consumer.** The run was `border-box` or
`content-box` according to whether the host shipped a `*` reset — Tailwind's preflight
does, in `@layer base`. The dock band is `@layer components`, which is **after** `base`
in `@layer theme, base, components, utilities` (`src/styles/index.css:1`), so this
declaration wins where a reset exists and states the intent where none does.

### §2.3 · The alternatives, rejected on the bytes

| idiom | why not |
|---|---|
| `width: calc(100% + 2 * var(--dock-ring-reserve))` re-authored in `run.css` | loses the cascade — (0,3,0) against (0,4,0) — and out-specifying it is the arms race the order forbids. Does nothing for the `min-height` arm. |
| the same `calc()` written INTO `layers.css:334` | smears ring knowledge into a layer rule that is not about rings, and makes every `.dock-layer--full` pay for the run's reserve. |
| `overflow-clip-margin` | **has no effect on a scroll container**, and this box is one on its other axis. It would have been a non-cure that reads like a cure — and it needs paint to falsify, which this seat cannot take. |
| a wrapper element around the seats | buys the padding box at the cost of the zero-new-DOM law stated at the head of the rule (`run.css:153-158`); seats become grandchildren of the flex run. |
| padding an ancestor (dock plate, `.dock-layers`) | the clip is the RUN's padding box. Padding elsewhere cannot grow it. Non-cure. |

### §2.4 · What it does to the horizontal arm — a stated widening of the order

The order says *"the horizontal arm works — do not disturb it."* On the bytes that is
true of the horizontal runs whose cross axis is AUTO and **false of one**: the battery's
own §π-RERUN-R2 records horizontal `i=5` losing 8px of dock height for the same reason on
its block axis, because `min-height: var(--dock-layer-height, 2.5rem)` pins its border
box at 40 and the reserve ate the content box down to 32.

**`content-box` and `border-box` agree on an auto axis**, so the working horizontal runs
(`i=1, 2, 3, 4, 6, 7, 8, …`) are byte-unchanged by this declaration — their `height` is
auto and the paired JSON already shows them at `border 48 / margin 40`, the designed
shape. The one horizontal run that is NOT auto gets its 8px of dock height back
(`min-height` now floors the CONTENT box: content 40, border 48, margin 40 → `dockRect
h 56`). The horizontal arm is not disturbed; the one horizontal run that was broken by
the same root is cured by the same root. This is stated rather than quietly enjoyed
because it is wider than the order's words.

---

## §3 · THE REFUSED CLASS, RESTATED — the 34 scroll-axis clips

**NOT CURED, and not meant to be.** A scroller clips its scroll axis by definition: the
leading seat at `scrollLeft/Top: 0` is flush with the port edge and its outward 4px has
nowhere to go. Curing it means padding the **scroll** axis, which joins the scrollable
length, moves the snapport against `scroll-padding: P/2`, and puts the W3 modular
correction — the `≡ P/2 (mod P)` interior rest the whole lattice rests on — at risk for a
4px edge.

The refusal is unit-8 RECORD §2.2's, unchanged, and it is restated here rather than
cross-referenced so that a reader of this unit alone cannot mistake the residual for an
oversight. The π cell (§4 of `PI-QUEUE.md`, arm 4) requires the number to be reported and
NOT folded away: a capture that comes back with 0 scroll-axis clips has changed something
it was told not to change.

---

## §4 · THE UNIT ARM — which half is provable without a browser

**Extended, not minted.** The arm lands inside the existing `G-DOCK-MATERIAL` describe in
`tests/components/custom/dock/g-dock-lattice.test.ts`. No new gate seat; the receipt does
not move (§5).

**HONESTLY SPLIT, because the two halves are not the same kind of fact:**

* **UNIT-PROVABLE — the collision.** Which rules author a size on the run's element, on
  which axis, and whether the reserve states a box model that survives them. This is
  static text and is proven here.
* **π'S HALF — the geometry.** That the padding box actually grows, that `crossOverflow`
  reads 0, that both arcs of the ring paint, that `i=5`'s dock is 56 again. jsdom does no
  layout; **none of it is claimed anywhere in this unit.** Enqueued as π-RERUN2-R2.

Three clauses, all over the recursive brace walk that already exists:

1. the reserve pair and `box-sizing: content-box` ride the **same rule** — a `box-sizing`
   that drifted onto another selector leaves the reserve exactly as defeated;
2. **one owner** — the band declares `box-sizing` exactly once, and it is the run's
   `content-box`. A `border-box` restatement anywhere silently restores this defect, and
   a restatement on the vertical rule is the two-owners defect the R1 cure struck;
3. **the census of size authorities on the run's element, by equality** — 2 PINs and 3
   zero FLOORS, each labelled. A sixth row is a new size authority on this element, and
   whoever adds it has to say what it does to the reserve.

**The walk was parameterised, not copied.** `outlineNoneSites()` was the band's one
brace-aware `&`-resolving declaration detector; the size census needs the same three
properties, and a second copy is a second thing to forget to fix. It is now
`bandDeclSites(pred)` with `outlineNoneSites()` as a two-line caller returning exactly
what it returned before — the licensed-suppressor arm's six-row expectation is untouched
and still green (§5).

**BORN-RED, re-proved at this seat against a `git show HEAD:` extraction** — not
theorised, not inherited:

```
git show HEAD:src/components/dock/styles/run.css > src/components/dock/styles/run.css
npx vitest run …/g-dock-lattice.test.ts -t "box model"       REAL EXIT 1
  × the ring reserve is stated in the box model that lets it exist
    expected … to match /box-sizing:\s*content-box/
    at tests/components/custom/dock/g-dock-lattice.test.ts:715
  Tests  1 failed | 33 skipped (34)
```

Banked verbatim at `born-red-R2.log`; the cured file was restored from a scratch copy and
`git diff` confirms only the intended bytes. Clause 3 (the census) is GREEN at HEAD by
construction — the cure adds no size authority — so the arm is born-RED on precisely the
byte the cure adds.

---

## §5 · VERIFY — real exit codes, never a piped tail's

```
npm run typecheck                                    REAL EXIT 0
  (vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json)

npx vitest run …/g-dock-lattice.test.ts              REAL EXIT 0
  Test Files  1 passed (1)
       Tests  33 passed | 1 expected fail (34)      → green-R2.log

npm test                                             REAL EXIT 1
  Test Files  2 failed | 223 passed (225)
       Tests  2 failed | 2156 passed | 10 expected fail (2168)

node scripts/gate-register.mjs                       REAL EXIT 0
  seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
  armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0

npm run verify:package                               REAL EXIT 1
```

**THE BATTERY LINE, with both REDs attributed by owner.**

1. `tests/public-surface.spec.ts` › *Row 8 built-artifact acceptance* — **FOREIGN,
   pre-existing, stale `dist/`.** The shipped census still lists
   `components/dock/styles/overflow.css`, the file W3 **deleted whole**, and lacks
   `components/dock/styles/run.css`, the file that replaced it. That build predates the
   dock rewrite entirely; nothing in this unit touches exports. Clears at the close build.
2. `tests/gates/boot-graph.test.ts` › *the dist-demo it measures is NEWER than every
   source it is built from* — **α-OWNED BY TIMESTAMP, and the dispatch's framing needs a
   correction.** This is not a standing stale-dist RED: measured, it was GREEN before this
   unit's write. `dist-demo/index.html` was built `2026-08-28T22:38:22.444Z`; the newest
   source EXCLUDING my file is `demo/chassis/landing/vizPreviewStill.ts` at
   `22:32:02.777Z` — six minutes older than the build. My `run.css` write at
   `2026-08-29T19:17:14.040Z` is now the newest source, and the gate compares mtimes. It
   is a build-FRESHNESS arm, not a defect arm: **any** source byte in this batch REDs it
   until `npm run demo:dist:build` runs, and any concurrent lane write REDs it again
   immediately after. Not built here — the driver's disposition routes it to the close
   build, and building mid-batch greens a tree that is still moving.

**So: zero α-owned failures of SUBSTANCE, one α-owned FRESHNESS red, stated with its
cause rather than papered.** The 10 expected-fails are the standing xfail class.

**THE FIGURE MOVED INSIDE THIS UNIT, which is what a concurrent batch does.** Measured
twice, ten minutes apart: `2150 passed` at 15:17 and `2156 passed` at 15:23, same 225
files and the same two REDs. The +6 is lane γ's `g-hm-layer.test.ts` landing more arms
between the two runs. **The line above is the LATER reading**, and the earlier one is
recorded here rather than overwritten so the delta reads as γ's work rather than as
drift in mine.

**`verify:package` REDs, and the RED it actually reports is not the one the dispatch
predicted.** It does not reach a bundle-ratchet arm; it throws first, at
`scripts/verify-export-types.mjs:811`:

```
Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
requires direct dependency ownership of @mkbabb/pencil-boil
```

A stale `dist/` `.d.ts` on a **handmark** surface — foreign to α on both counts (the
artifact is a build output, the surface is γ's). The G-BUNDLE-RATCHET disposition stands
as the driver ruled it; this seat simply cannot observe that arm, because the script exits
before it, and says so rather than reporting a ratchet result it never saw.

**RECEIPT UNMOVED** — `seats:60 … violations:0`, `rosterSha256:282d05cf`, identical to
unit 8's line. Nothing minted: one CSS declaration, one `it()` inside an existing describe.

**CSS parses** — `postcss.parse(run.css)` → OK, 7 top-level nodes. The file is comment-
heavy and this unit struck text in place inside a block comment; a brace or `*/` slip
would have been invisible to the unit arms, which read `declarations()` output.

---

## §6 · WHAT THIS UNIT DID NOT DO

* **Did not open a browser.** π-RERUN2-R2 is ENQUEUED (`PI-QUEUE.md`), with the expected
  figures stated **in advance** so the capture can falsify the cure rather than confirm
  it. No geometry is claimed anywhere above.
* **Did not cure the 34 scroll-axis clips** — refused with grounds, §3.
* **Did not build** `dist/` or `dist-demo/` — §5.2.
* **Did not touch the horizontal reserve pair, the vertical reserve pair, the token, or
  `layers.css`.** The two PIN rules are *cited* by the cure and the arm; not one of their
  bytes moved.
* **Did not touch γ's `g-hm-layer.test.ts`** or any handmark, search, or fourier surface.

---

## §7 · FENCE

**Written — tracked trio +149 / −8 by git numstat, plus the unit-9 record files
enumerated as NEW (not diffstat rows) [2026-08-29 · adjudicated cure — the prior
figures (+51/−6, +93/−3, header +240/−9) matched no accounting and are replaced by
the measured values]:**

```
src/components/dock/styles/run.css                        (+49 / −2)
tests/components/custom/dock/g-dock-lattice.test.ts       (+87 / −6)
docs/…/2026-08-10-lanealpha-unit8/RECORD.md               (+13 / −0)  — the bracket owed
docs/…/2026-08-10-lanealpha-unit9/{RECORD,PI-QUEUE,PASTE-BLOCKS}.md
docs/…/2026-08-10-lanealpha-unit9/{born-red-R2,green-R2}.log
```

**THE ONE WIDENING, STATED.** The fence as dispatched reads
`src/components/dock/styles/** + this unit's record dir + the unit-8 record`. The order
in the same breath requires *"land/extend the unit-testable arm where the collision is
expressible (the recursive `bandCss` walk exists)"* — and that walk lives in
`tests/components/custom/dock/g-dock-lattice.test.ts`, which the fence's file list does
not name. The act cannot be performed inside the literal fence. Taken as written, with
grounds: the file is the dock band's own gate file, α-exclusive, foreign to γ's handmark
lane and δ's fourier lane, and it was clean at open. Stated here rather than assumed.

**Untouched and foreign (lane γ, mid-flight):** `src/components/handmark/HandMark.vue` ·
`tests/components/custom/handmark/g-hm-layer.test.ts` ·
`docs/…/2026-08-10-lanegamma-unit6/{RECORD,PI-QUEUE}.md`.

No sibling repo, no `package.json`, no `subpath-policy.mjs`, no `public-surface.spec.ts`,
no `layers.css` (the two PIN rules are cited, never edited), no `dist/`, no commit, no
stash, no checkout — the driver commits.
