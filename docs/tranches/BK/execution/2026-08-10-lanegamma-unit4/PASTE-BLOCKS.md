# LANE γ — UNIT 4 · PASTE-BLOCKS

Literal `⊕ⁿ` / `<SHA>` placeholders. The driver stamps them at the commit; nothing here
claims a number this seat could not read.

---

## 1 · COMMIT MESSAGE

```
test(visual): land BK #50 γ3 — the flood ceiling gets a plant it can be seen to fail against, and its own paintable denominator

γ3, opened at its ratified row and stopped there. #50 W1-W8 stay behind the π-W1 fence,
NO GLSL BYTE WAS DELETED, and no `src/` byte was written at all — this is an instrument
wave end to end. γ4 (#51) is unopened.

· THE CEILING HAD NO PLANT. The blob floor carries two bounds and exactly one plant:
  `blob-blank` drops the canvas from the composite, which bites the MIN and cannot
  touch the MAX. The non-flood ceil had never RED-ed in any run, self-test or
  otherwise — theatre by this file's own standard. It now has `blob-flood`: the canvas
  is given an opaque background, so every pixel it is allowed to paint contributes and
  no transparent margin survives. `grabBlobBaseline` hides the canvas with `opacity:0`,
  which hides the background with it, so the baseline stays the true ground and the
  differential IS the flood.

· AND IT IS ITS OWN ARM, not a member of `all`. The two blob plants are mutually
  exclusive mutations of one element — one hides the canvas, one paints it opaque, and
  `opacity:0` wins. Folding the flood into `all` would silently retire the blank bite
  AND leave the ceiling untested, so it gets its own invocation
  (`gate:pixel-floor:planted:flood`), wired into BOTH runners that already run the
  floor: ci.yml's pixel-floor job and release.sh's pre-tag real-GPU block. A plant with
  no runner is ABSENT, never GREEN.

· THE BITE IS NOW ATTRIBUTABLE PER PLANT. `FLOOR_BITE` was keyed by floor alone, one
  regex per title — so a flood run would have been credited to the blank floor's
  sentence, the wrong-assertion class that map already refuses one level up. Keyed per
  plant now, with `--plant=` telling the verifier which plant ran; a required floor
  that nothing in the run mutates is RED with its own message. Eight synthetic reports
  prove it in both directions, including the two REGRESSION arms: `--plant=all` and no
  `--plant` at all behave exactly as before.

· AND THE CEILING READS ITS OWN REGION. The readback box is the canvas BOUNDING BOX;
  the stage card is `overflow-hidden` and the canvas is 160% of its wrapper, so part of
  that box shows the page BEHIND the stage — pixels the canvas cannot paint, identical
  in the live and baseline reads, pure dilution of any coverage fraction. The ceiling
  now scores the interior INTERSECTED with the canvas's unclipped rect. The FLOOR is
  untouched and still reads the whole interior — the region its measured 0.166/0.000
  pair was taken on. `interiorCoverageDiff(inset)` becomes `coverageDiff(region)`, a
  clean break with no alias; `insetRegion(0.12)` reproduces the old sample box exactly,
  and an EMPTY region now throws rather than returning 0/0.

· THE ROUTED PREMISE IS CORRECTED, WITH THE ARITHMETIC. 4e201a3a routed this wave on
  "the stage card clips the canvas". The clip is real; its reach is not. From the CSS
  on disk — stage clips at `overflow-hidden` (blob.vue:503), the Blob box is <=78% of
  the stage's short axis (blob.vue:523 [2026-08-24 · CURE-2]), the canvas is 160% of it (Blob.vue:364-374),
  the wrapper contains layout+style but NOT paint — canvasSide <= 1.248 x
  min(stageW,stageH), so the visible band is >= 0.8013 of the canvas box on both axes
  at every viewport. The sampled interior is the central 0.76. 0.76 <= 0.8013: the
  interior was never diluted, and bisection puts the vacuity threshold at v = 0.6340,
  which HEAD is clear of. So the ceiling was hollow for the OTHER reason — no plant —
  and the paintable denominator is what keeps it honest when the geometry moves. That
  is not hypothetical: #50 W8's routed row is "canvas 160% -> orbit-envelope", the
  exact ratio, and the margin today is 4 points of the box.

· BANDS NOT RETUNED. 0.1 and 0.7 stand exactly where W00 put them; γ3 gives the ceil a
  plant and a denominator, not a number. Retuning a constant this seat cannot measure
  would be minting — the π receipt banks the figure.

Device-free proofs, all on scratch copies, zero repo bytes: the two metrics over
synthetic frames at eight clip severities (flood reads 1.000 on the paintable region at
every one; the whole-interior read decays to 0.215); the blank case still 0.000 on BOTH
regions, so the floor's pair is undisturbed; the plant selector across all five PI_PLANT
values; eight verifier reports; and a HEAD-control typecheck showing ZERO delta (the same
three pre-existing errors — tests-visual is in no repo tsconfig).

VERIFY: vue-tsc 0 (step-0 RED was a concurrent lane mid-write on demo/router.ts, cleared
during the run). Battery 1 failed | 2014 passed | 7 xf (2022) — this unit contributes
EXACTLY ZERO vitest tests (vitest collects tests/ and scripts/; tests-visual is
Playwright's), and the one FAIL is boot-graph's gitignored dist-demo mtime arm, already
RED at step 0. Gate receipt byte-identical: seats:60 active:46 reserved:5 worstCase:51
remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf
violations:0 — ZERO GATES MINTED. verify:package REDs lawfully on G-BUNDLE-RATCHET
(2607399 < 2633353), the batch-close rebind; this unit publishes nothing (`files` is
["dist"]; its five surfaces are tests-visual/, .github/, scripts/ and docs/).

π: ENQUEUED, RECEIPT OWED. The third arm has never run on a device; π-W1 still fences
#50 W1.

Record: docs/tranches/BK/execution/2026-08-10-lanegamma-unit4/RECORD.md
```

---

## 2 · LEDGER LINE (`docs/tranches/BK/EXECUTION-PROGRESS.md`)

```
⊕ⁿ · <SHA> · LANE γ UNIT 4 — #50 γ3 FLOOD-CEILING. The non-flood ceil gets `blob-flood`
(opaque canvas background — no transparent margin survives), its own runner arm
(`gate:pixel-floor:planted:flood`, wired into ci.yml AND release.sh), a per-plant
attributable bite in pi-gate-verify (`--plant=`), and its own paintable denominator
(interior ∩ the canvas's unclipped rect). Floor untouched — still the whole interior,
still its measured 0.166/0.000 pair. Bands NOT retuned. ROUTED PREMISE CORRECTED: the
stage clip does not reach the sampled interior at HEAD (canvasSide ≤ 1.248·min(stage),
visible band ≥ 0.8013 vs the 0.76 interior; vacuity threshold measured at v=0.6340) —
the ceiling was hollow for want of a PLANT, not a denominator. 5 surfaces, all one
instrument; `src/` untouched entire. SEATS +0, receipt byte-identical. π ENQUEUED,
RECEIPT OWED.
```

---

## 3 · THE THREE-ARM PIXEL FLOOR (for the π seat)

```
npm -w tests-visual run gate:pixel-floor                 # GREEN — both floors on the live paint
npm -w tests-visual run gate:pixel-floor:planted         # blank RED at MIN  (--plant=all)
npm -w tests-visual run gate:pixel-floor:planted:flood   # flood RED at MAX  (--plant=blob-flood)  ← NEW, never run on a device
```

Bank from the third arm's stdout, verbatim:

```
PI blob paintable=[x0,y0]-[x1,y1] paintableShareOfInterior=<n>
PI blob coverage=<n> floor=0.1 · paintedShare=<n> ceil=0.7
```

`paintableShareOfInterior` adjudicates §3 of the record: **1.000 confirms the derivation**
(visible band ≥ 0.8013 ⊃ the 0.76 interior); anything below it refutes the prose and the
ceiling arm keeps measuring correctly regardless — which is the property the denominator
buys.

---

## 4 · WHAT THIS UNIT DID NOT DO

```
· #50 W1-W8 — REFUSED, π-W1 fence (unit-3 §8.4). Zero GLSL bytes deleted.
· γ4 (#51 GF-HANDMARK) — unopened.
· BLOB_COVERAGE_MAX retune — refused; unmeasurable from this seat, and 0.7 separates
  1.000 (flood) from a green read the receipt will bank.
· `paintableShareOfInterior == 1` as an ASSERTION — refused; derived, not witnessed, and
  a seat that cannot run the page must not ship an assertion that can only false-RED.
· any src/ byte · any export key · any browser · any sibling-repo write · any index act.
```


---

[2026-08-24 · CURE-3 — commit-truth bracket] The `ci.yml` +6 and `scripts/release.sh`
+4 flood-arm hunks LANDED via the driver's β2 batch commit `96f0f257` (content γ3's,
verified verbatim by the adjudicator). γ3's OWN commit carries the three `tests-visual/`
files + this record dir only.
