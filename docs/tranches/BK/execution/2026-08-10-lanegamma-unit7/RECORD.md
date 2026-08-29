# LANE γ — UNIT 7 · THE R6 RESIDUAL · THE FRAME THAT HAD NO SIZE OF ITS OWN

**Seat:** `claude-opus-5[1m]`, asserted at step 0 and `&&`-gated into every command below.
**Session:** 2026-08-29. **Base:** `dfe6971f` (the π re-capture battery's landing commit).
**Scope:** ONE commit-unit — the STILL-RED half of `π-RERUN-R6`
(`2026-08-25-pi-band/rerun/PI-RERUN-BATTERY.md` §π-RERUN-R6), routed by the battery to
`BK #51 (GF-HANDMARK) / src/components/handmark/HandMark.vue`.
**This seat commits nothing.** The tree is shared; the driver commits.

---

## §0 · STEP-0 BASELINE, BANKED BEFORE ANY BYTE

```
HEAD                      dfe6971f  test(BK/π): bank the re-capture battery — 10 of 12
                                    cures CURED-GREEN in paint, two residuals routed
git status --porcelain    0 lines          ← the tree was CLEAN at open
untracked (enumerated)    none
git diff -U0              /tmp/bk-lanegamma-baseline-1788030526.diff  (0 bytes)
receipt                   seats:60 active:46 reserved:5 worstCase:51 remaining:9
                          external:11 bound:13 armOnly:2 unbound:45 drift:0
                          rosterSha256:282d05cf violations:0        REAL_EXIT 0
handmark gates at base    2 files · 58 passed · REAL_EXIT 0
```

**A dispatch premise the tree contradicts, stated rather than acted on.** The dispatch
describes lane β's unit-β0 dirt — `MIGRATION.md`, `src/composables/dark/darkModeSyncScript.ts`
and its test — as awaiting cure in the working tree. **No such dirt exists at `dfe6971f`:**
`git status --porcelain` returned **zero lines** at open. Whatever became of β0, it is not
in this tree, and this seat neither touched nor searched for it. Everything that appeared
in `git status` during this session and is not in §6's fence belongs to **Lane α unit 9**,
which ran concurrently on dock styles and was never read as this seat's own.

---

## §1 · WHAT THE BATTERY SAID, VERIFIED ON DISK BEFORE CUTTING

Read in full first, in this order: `rerun/PI-RERUN-BATTERY.md` §π-RERUN-R5 and
§π-RERUN-R6 (committed `dfe6971f`), then the two banked instrument files, then the
subject SFC, then the γ unit-6 record and queue for the carried rulings.

**The battery's own correlation, restated from its §π-RERUN-R5:**

> *every mount whose `.hm-mark` box width is 0 paints nothing; every mount with a real
> width paints.*

**The instrument file, read directly** — `rerun/pi-RERUN-R6-RING-reservation-1440-dark-cured.json`,
1440 dpr 2, `htmlClass: dark`. Every figure below is that file's, not a paraphrase:

| # | mount | markup class | host rect w | **`.hm-mark` w** | paints? |
|---|---|---|---|---|---|
| 0 | `pays in` ×3 | bare slot, underline | 162.04 / 100.14 / 61.88 | **162.04 / 100.14 / 61.88** | ✅ |
| 3 | `Friday` | **`<del>`**, strike | 87.81 | **0** | ❌ |
| 4 | `threefold` | bare slot, **ring-reserved** (`padding-inline` 18.2611px) | 190.45 | **0** | ❌ |
| 5 | `Hpqjy really matters` | **`<mark>` over TWO lines** | 353.09 | **0, 0** | ❌ |
| 6 | `rose` | `<mark>`, one line | 61.48 | **61.48** | ✅ |
| 7 | `violet` | `<mark>`, one line | 73.78 | **73.78** | ✅ |
| 8 | `drawn` | bare slot, underline | 139.29 | **139.29** | ✅ |

Identically at `390×844×3` (`rerun/pi-RERUN-R7-MOBILE-wrap-390x844-light-cured.json`:
`Friday` **0**, `threefold` **0**, `Hpqjy` **0, 0**, everything else its real width), and
in both themes. **CONFIRMED — the census's coordinates land exactly.**

### 1.1 · AND THE SECOND INSTRUMENT NAMES THE MECHANISM

`rerun/pi-RERUN-R6-RING-reservation-and-mask-window-1440-light-cured.json` reports the
frame's rect **and its parent's** side by side. That pairing is what settles it:

```
Friday      markRect [794.8, 324.2,   0, 73.6]   parentRect [794.8, 324.2,  87.8, 37.5]
threefold   markRect [1059.5, 347.2,  0, 73.6]   parentRect [1010.3, 347.2, 190.4, 73.6]
Hpqjy ×2    markRect [321,   820.6,   0, 73.6]   parentRect [133,   820.6, 353.1, 73.6]
rose        markRect [298.1, 904.9, 61.5, 37.5]  parentRect [298.1, 904.9,  61.5, 37.5]
```

Three readings, and together they are a proof rather than a suspicion:

1. **The frame's box is not the parent's box.** For `threefold` the frame's origin sits
   **49.2px** right of the host's; for `Hpqjy`, **188px** right. A `width: 100%` that
   resolves against a box whose left edge is 188px from the word's is not measuring the
   word at all.
2. **Its height exceeds the parent's** on `Friday` — 73.6 against 37.5, i.e. two line
   boxes against one.
3. **Where it works, it works by coincidence.** On every mount that paints, the frame's
   rect is *byte-identical* to the parent's: single-fragment inlines, where the box CSS
   2.1 §10.1.4 builds between an inline's **first and last fragments** happens to be the
   word's box.

That is the class: `.hm-mark` is absolutely positioned inside a `display: inline` host,
so its percentage sizes resolve against the inline containing block — a box the engine
builds from the host's fragments, which Chromium resolves to **`width: 0`** for the four
mount classes that carry a wrapper, a reservation, or a wrap. **An SVG viewport of zero
width renders nothing at all**, whatever geometry and whatever mask window it carries.

### 1.2 · THE FALSIFIED CLAIM, NAMED

γ unit 6 banked, in its own words, that this box was *"a measurement the window cure
makes harmless, not a second defect papered over"*, and its queue banked the width
reading as *"unchanged and no longer load-bearing"*. **Both are false**, and π-RERUN-R6
is what falsified them: the window cure is CURED-GREEN — all ten masks carry four finite
user-space numbers with area > 0 — and the ring on `threefold` is *still* never painted.
The reasoning behind "harmless" was that `overflow: visible` plus absolute coordinates
make the frame's extent irrelevant. It does not: `overflow` governs the **clip**, and a
zero-width viewport is not a clip the ink can escape — it is an element the engine does
not render. Both sentences are **struck in place, dated, nothing deleted** (§2.4).

---

## §2 · THE ACT LEDGER

Order was **detectors first**, as unit 6 did it: every arm was written and run against
the **uncured** tree, so born-RED is an observation at this seat and not a claim about
one. No scratch-copy or `git archive` was needed — the cure had not landed yet, which is
the honest form of the same law.

### 2.1 · BORN-RED, RUN AT `dfe6971f` + the gate file only

```
npx vitest run tests/components/custom/handmark --reporter=verbose
BORNRED_REAL_EXIT=1     Test Files 1 failed | 1 passed (2)
                        Tests 6 failed | 58 passed (64)
```

Six arms, every one this defect route. Verbatim, from `/tmp/gamma7-bornred.txt`:

```
× G-HM-LAYER 2 › 'underline · bare slot':        the RENDERED frame declares its own viewport, and it is never zero
× G-HM-LAYER 2 › 'strike · <del> wrapper':       …
× G-HM-LAYER 2 › 'circle · bare slot, ring-reserved': …
× G-HM-LAYER 2 › 'highlight · <mark>, one line': …
× G-HM-LAYER 2 › 'highlight · <mark>, two lines': …
    → the frame declares no width: with no viewport of its own it takes 100% of the
      INLINE containing block, which Chromium resolves to 0 for a wrapped or
      wrapper-bearing mount: expected undefined to be type of 'string'

× G-HM-LAYER 2 › no rule sizes the frame as a percentage of the inline containing block
    → .hm-mark sizes the frame in percentages — an inline containing block is not the
      word's box, and Chromium resolves it to 0 width for the <del> mount, the
      ring-reserved slot and both line rects of a wrapped <mark>:
      expected '\n    position: absolute;\n    left: …' not to match
      /(?:^|;)\s*(?:width|height|inline-size…/
```

The five mount rows RED on the **absence** of a declared size — which is the defect
stated exactly: the frame has no viewport of its own, so it borrows one. The sixth REDs
on the authored `width: 100%` that supplies the borrowed box. Neither can be satisfied
by the other's fix.

### 2.2 · THE CURE — `src/components/handmark/HandMark.vue`

**The frame is an ORIGIN, not a layer over the word.** The geometry inside it is already
absolute, in 1:1 CSS px, emitted per `Range` rect against the frame's own measured rect;
`overflow: visible` already lets it out past every edge. The `width:100%/height:100%` was
the last vestige of a *cover-the-host* model the per-Range architecture replaced — and
the one line in the family that still asked an inline containing block a question.

So the frame states its own viewport, per mark, in those same user units: **the LINE
RECT the mark was made for** — the same measurement the geometry already comes from, so
the component has one source of truth for extent rather than two that can disagree.

```diff
 interface Mark {
     window: Frame;
+    box: { width: number; height: number };
 }
+const up   = (v: number) => Math.ceil(v * 1000) / 1000;
+const down = (v: number) => Math.floor(v * 1000) / 1000;

 // measure()
+    box: { width: up(frame.width), height: up(frame.height) },

 <!-- template -->
+    :width="m.box.width"
+    :height="m.box.height"

 .hm-mark {
     position: absolute;
     left: 0;
     top: 0;
-    width: 100%;
-    height: 100%;
     overflow: visible;
     pointer-events: none;
 }
```

**Three properties this cure has, and each was chosen for:**

- **`left` / `top` stay `0`.** `measure()` reads its origin from `frames[0]`'s rect. A
  size cannot move an element pinned at `left: 0; top: 0`, so that reading stays a fixed
  point and **not one emitted coordinate changes**. Any cure that repositioned the frame
  to contain its own ink would feed the frame's rect back into the origin the geometry
  is measured against — a loop with no fixed point. It was considered and refused.
- **It cannot regress the six mounts that already paint.** For them the line rect *is*
  what `width: 100%` resolved to. Emitted at this seat over the story corpus, using the
  page's own measured widths as the fixture:
  ```
  pays in    underline bare      frames=[162.04 x 37.5]        (was 162.04 — unchanged)
  Friday     strike <del>        frames=[87.81 x 37.5]         (was 0)
  threefold  circle reserved     frames=[153.93 x 37.5]        (was 0)
  rose       mark 1 line         frames=[61.48 x 37.5]         (was 61.48 — unchanged)
  Hpqjy      mark 2 lines        frames=[171.58 x 37.5  |  108.63 x 37.5]   (was 0, 0)
  ```
- **It states a law, not a constant.** A `1px` frame would have satisfied "never zero"
  and would have been a masking fallback wearing a cure's clothes — no mount's ink would
  lie inside its own viewport. The arm in §2.3 pins the frame to the line rect precisely
  so that dodge REDs.

**One de-duplication rode along, and it is stated because it touched a landed cure.**
`maskWindow()` carried three inline copies of *round to three decimals, outward*; they
are now the single `up`/`down` pair the box also uses. `maskWindow`'s output is
arithmetically identical — `up(hi − lo)` is the same number as the old
`out(lo, hi)` — and the R6 window arms, which read those numbers, stayed green across
the change.

### 2.3 · THE DETECTOR — `G-HM-LAYER 2 · CONTAINMENT`, EXTENDED

Extended, **not duplicated**: the unit-6 rendered-window arm and this one are the same
failure twice — *a length authored as a percentage of a box an inline host is free to
collapse* — so they read the same DOM, in the same describe, through the same
`renderShape` helper, which now also returns each frame's declared size.

```
tests/components/custom/handmark/g-hm-layer.test.ts
  + frameOf()      the RENDERED frame, as windowOf() reads the rendered mask
  + STORY_MOUNTS   the five mount classes of /motion/handmark, with the page's own
                   measured widths (162.04 · 87.81 · 153.93 · 61.48 · 171.58 + 108.63)
                   and the two-line case shaped as the page shapes it — line 2 starting
                   LEFT of line 1, which is what collapses the containing block
  + 5 arms         per mount class: one frame per line rect; each declares a width and a
                   height; neither carries a %; both parse as user-space lengths; both
                   are > 0; and each IS the line rect it was made for (never narrower,
                   never more than the 3-decimal outward rounding wider)
  + 1 arm          no rule whose selector names .hm-mark may size it in percentages —
                   read off the SFC's own <style> block, comment-stripped by the existing
                   DETECTOR-BLIND `live()` so prose cannot satisfy it
```

No seat was minted: `g-hm-layer.test.ts` is an ordinary vitest file, holds no roster
name, and the receipt is byte-identical to §0 (§4).

### 2.4 · THE THREE STRIKES, IN PLACE AND DATED

Nothing deleted, all three citing the battery and the instrument by path:

```
2026-08-10-lanegamma-unit6/RECORD.md  §2.3  "Not touched, and stated:" → dated STRIKE block
2026-08-10-lanegamma-unit6/RECORD.md  §3    the "made irrelevant" bullet → dated bracket
2026-08-10-lanegamma-unit6/PI-QUEUE.md §π-RERUN-R6  the "unchanged and no longer
                                                    load-bearing" claim cell → dated STRIKE
```

**WHAT SURVIVES in all three: the window cure itself, and every arm that proved it.** The
box was a second defect of the same class standing behind the first; unit 6 cured the
first and misjudged the second. The misjudgement is the entry, not the cure.

---

## §3 · WHAT THIS SEAT DID **NOT** DO

```
· THE CURE IS NOT π-VERIFIED. It changes paint on four mounts and this seat observed
  ZERO pixels. π-RERUN2-R6 is enqueued in PI-QUEUE.md beside this file and the cure is a
  CLAIM until that cell returns GREEN. This record asserts headless arms, emitted
  attributes and the battery's own banked numbers — nothing more.
· No browser, no dev server, no capture, no getContext(). π ENQUEUES; it does not run here.
· No git add / commit / stash / checkout. Baseline banked before the first byte.
· NO OTHER LANE'S BYTE. α unit 9 was live in this tree the whole session on
  src/components/dock/styles/run.css and tests/components/custom/dock/g-dock-lattice.test.ts;
  neither was opened.
· dist/ and dist-demo/ were NOT rebuilt — 19 days and one day stale respectively, shared
  with a concurrent lane; rebuilding bakes two lanes' uncommitted edits into a shared
  artifact. See §4.1, where they are the only two REDs.
· The two π-BAND colour windows are STILL not cured and are still not this unit's route:
  the paper-grain-overlay lifting the dark band to ≈0.485 against a [0.42,0.48] window,
  and oklch(0.86 0.16 270) gamut-mapping to C 0.07256 under the cell's own 0.08 floor —
  the second corroborated to within rounding by π-RERUN-R5. Both stay OPEN on #51.
· π-SCROLL's kill criterion is NOT disposed of. π-RERUN-R8 read it as inertia at 0.36 CSS
  px against a 1.5 px cap and left the disposition with the owner. Untouched here.
· No aurora byte, no blob byte, no export key. γ0-γ3 are other units' order.
```

---

## §4 · VERIFY, VERBATIM, WITH REAL EXIT CODES

Assertion `&&`-gated into every line; no figure below is a piped tail's.

```
MODEL_ID_ASSERT=claude-opus-5[1m]  →  GATE_OPEN

npx vue-tsc --noEmit                              VUE_TSC_SRC_EXIT=0
npx vue-tsc --noEmit -p tsconfig.test.json        VUE_TSC_TEST_EXIT=0

npx vitest run tests/components/custom/handmark   HANDMARK_REAL_EXIT=0
    Test Files  2 passed (2)
         Tests  64 passed (64)        ← 58 standing + the 6 born-RED, flipped

npx vitest run                                    BATTERY_REAL_EXIT=1
    Test Files  2 failed | 223 passed (225)
         Tests  2 failed | 2156 passed | 10 expected fail (2168)

node scripts/gate-register.mjs                    RECEIPT_REAL_EXIT=0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**THE RECEIPT DID NOT MOVE.** Byte-identical to §0's baseline and to units 5 and 6. Six
arms landed inside an ORDINARY vitest file; no seat minted, no roster name added,
`drift:0`.

### 4.1 · THE BATTERY LINE, WITH ITS TWO REDs ATTRIBUTED

**γ-owned failures: ZERO.** Both REDs are the build-freshness class unit 6 attributed,
and neither reads a handmark byte. The standing figure moved with the batch as the
dispatch said it would (last quiesced-class read `2015 passed | 7 xf`); the movement is
the concurrent lanes' landed arms plus this unit's six.

| RED | reads | attribution |
|---|---|---|
| `tests/public-surface.spec.ts` › *ships exactly the style closure plus the three generated members* | `dist/` | **FOREIGN AND PRE-EXISTING, no lane's source byte.** `dist/components/dock/styles/` is stamped **2026-08-10T14:07** — 19 days stale. `git cat-file -e HEAD:src/components/dock/styles/run.css` → **exists**; `…/overflow.css` → **ABSENT at HEAD**, yet `dist/` ships it. Identical to unit 6 §4.1 |
| `tests/gates/boot-graph.test.ts` › *the dist-demo it measures is NEWER than every source it is built from* | `dist-demo/` | **BUILD FRESHNESS — and this seat's file is one of its two triggers, said plainly.** `dist-demo/index.html` was rebuilt **2026-08-28T18:38:22**; `find src demo -newermt '2026-08-28 18:38:22'` returns **exactly two** files: `src/components/dock/styles/run.css` (15:17:14 — **α unit 9**, concurrent) and `src/components/handmark/HandMark.vue` (15:21:44 — **this unit**). The arm measures build staleness against a live working tree; it cannot be green while any lane holds an uncommitted source edit |

**Owner: build freshness** (`npm run build`, `npm run demo:dist:build`) at the driver's
close — not α, not γ. Neither RED is a defect in a source byte.

### 4.2 · `verify:package` — RED, AND G-BUNDLE-RATCHET NOT REACHED

```
npm run verify:package                            VERIFY_PACKAGE_REAL_EXIT=1
Error: Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
requires direct dependency ownership of @mkbabb/pencil-boil
    at verifyExportTypes (scripts/verify-export-types.mjs:811:32)
```

Stated, never papered — and **unchanged from unit 6, byte for byte**. It is the same
stale-`dist/` class as §4.1: `dist/components/handmark/geometry.d.ts` is from a build
stamped **2026-08-10**, i.e. before #51's twelve-files-to-three cut (`5a69ed9f`), and
`@mkbabb/pencil-boil` is not in `package.json` at all.

**G-BUNDLE-RATCHET was NOT reached.** `verify-export-types.mjs:811` throws on the
declaration failures collected at `:809`; `ratchetEvidence()` is called at `:828`, behind
both that throw and the `--pack` flag. The dispatch's ruling — that the ratchet arm REDs
lawfully by route, the single batch-close rebind carrying β0's +1215 against the driver's
−71 — **stands un-contradicted and un-observed by this seat**, which does not claim to
have seen it either way. The dispatch's companion premise about β0's working-tree dirt is
separately contradicted by §0's clean porcelain.

---

## §5 · π — ENQUEUED, NOT DISCHARGED

`PI-QUEUE.md` beside this file carries **π-RERUN2-R6**, paired against the battery's own
`pi-RERUN-R5-crop-*` and `pi-RERUN-R6-*` artifacts so the re-capture is a DELTA against
banked pixels rather than a fresh opinion. **Said plainly: this seat cured the defect
that keeps four mounts blank and has not seen a single one of them paint.** The one arm
that would settle it — does ink lying wholly outside a small `overflow: visible` viewport
still paint — is a live-engine question, and it is asked in the queue rather than
answered here.

---

## §6 · FENCE

Written by this seat, and nothing else:

```
src/components/handmark/HandMark.vue                              the frame's own viewport
tests/components/custom/handmark/g-hm-layer.test.ts               frameOf + 6 arms
docs/tranches/BK/execution/2026-08-10-lanegamma-unit6/RECORD.md   2 dated strikes
docs/tranches/BK/execution/2026-08-10-lanegamma-unit6/PI-QUEUE.md 1 dated strike
docs/tranches/BK/execution/2026-08-10-lanegamma-unit7/{RECORD,PASTE-BLOCKS,PI-QUEUE}.md
```

Untouched and unread as this seat's own: every dock, search, overlay-plate, demo-story,
aurora, blob and δ surface; **α unit 9's live edits** (`src/components/dock/styles/run.css`,
`tests/components/custom/dock/g-dock-lattice.test.ts`, `…/lanealpha-unit8/RECORD.md`,
`…/lanealpha-unit9/`); `src/styles/glass/material.css` and
`tests/styles/material-css-syntax.test.ts` — tracked and attributed since `2cfc1124`,
still not lane surfaces; `stroke.ts`; every other lane's records; `dist/`, `dist-demo/`,
`.bundle-ratchet`; `demo/stories/motion/handmark.vue` (read as the mount-class corpus,
never written). One throwaway probe file was written under
`tests/components/custom/handmark/` to read the emitted frame sizes and was **deleted in
the same command that ran it**; it appears in no `git status`.
