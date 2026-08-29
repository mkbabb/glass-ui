# LANE α — UNIT 9 (R2 RESIDUAL CURE) · PASTE-BLOCKS

Literal blocks for the driver. `⊕ⁿ` and `<SHA>` are placeholders the driver fills at the
commit; nothing here invents either.

---

## 1 · COMMIT MESSAGE

```
fix(dock): the ring reserve gets a box model — a padding reserve on a border box
someone else has already fixed is a reserve that never materialises

The π re-capture came back with one α STILL-RED (PI-RERUN-BATTERY.md §π-RERUN-R2,
dfe6971f): the R2 cure's horizontal arm worked, and its vertical arm went
BACKWARDS. Cross-axis clip count had to reach 0 and read 21, and on the vertical
dock the cut GREW from 4px to 8px.

THE MECHANISM, off the battery's own numbers. `.dock-run` rides the same element as
`.dock-layer--full` (GlassDock.vue:464). The reserve is `padding` + an equal
negative `margin` on the cross axis, which grows the padding box the port clips to
ONLY on a box whose cross size is auto. Two rules in the band author a non-zero size
on that element and BOTH land on the axis the reserve pads:

  layers.css  .glass-dock.expanded:not(.fit-content) .dock-layer--full {width:100%}
                                        → the VERTICAL run's cross (inline) axis
  layers.css  .glass-dock:not(.vertical) .dock-layer {min-height: --dock-layer-height}
                                        → a HORIZONTAL run's cross (block) axis

With box-sizing:border-box the padding ate the CONTENT box and the negative margin
only shifted the box left. Measured at /dock/overview 1440, both themes identical:
the sidebar run read clientW 40 / scrollW 48 / content 32 / crossOverflow +8, its
margin box SHRANK 40→32, and the port cut 4px off the SEAT ITSELF (layout 20..60,
paint reaching 20..55.5) — the ring painted its left arc at cssX 16..17.5 and
nothing on the right. Horizontal i=5 lost 8px of DOCK height, 56→48, for the same
reason on its block axis.

THE CURE IS ONE DECLARATION, on the rule that already owns the reserve pair:
box-sizing: content-box. It does not fight the width:100% — it changes what the
authored 100% MEANS on this box. The authored size becomes the size the SEATS get,
the reserve adds on top of it, and the negative margin hands that addition back, so
the seats return to their pre-cure positions and the clip rectangle alone grows:
border 12..60, padding box 12..60, content 16..56, ring outer 12..60 === the clip.
Which is what the R2 comment always claimed; that clause is struck in place in
run.css and in unit-8's RECORD §2.2, where it was written without the auto-axis
qualifier it needed.

Rejected on the bytes, each for its own reason: a re-authored calc() size in
run.css loses the cascade (0,3,0 against 0,4,0) and does nothing for the min-height
arm; the same calc() written into layers.css smears ring knowledge into a rule that
is not about rings; overflow-clip-margin has NO EFFECT on a scroll container, which
this box is on its other axis; a wrapper buys the padding box at the cost of the
zero-new-DOM law at the head of the rule. No specificity arms race, no mask.

THE HORIZONTAL ARM IS NOT DISTURBED, and the widening is stated rather than
enjoyed: content-box and border-box agree on an AUTO axis, so every horizontal run
the paired JSON shows at border 48 / margin 40 is byte-unchanged. The one
horizontal run that was NOT auto — i=5, pinned by min-height — is cured by the same
root and gets its 8px of dock height back.

It also deletes a silent dependency on the consumer: the run was content-box or
border-box according to whether the host shipped a `*` reset. @layer components is
after base, so the declaration wins where a reset exists and states the intent
where none does.

THE 34 SCROLL-AXIS CLIPS ARE STILL REFUSED, restated in full rather than
cross-referenced: a scroller clips its scroll axis by definition, and curing it
means padding the SCROLL axis, which moves the snapport against scroll-padding P/2
and puts the W3 modular correction at risk for a 4px edge.

THE UNIT ARM PROVES THE COLLISION, NOT THE GEOMETRY, and says so. Static text: the
box model rides the same rule as the reserve; the band declares box-sizing exactly
once; and the census of size authorities on the run's element — 2 PINs, 3 zero
FLOORS — holds by equality, so a sixth row makes whoever adds it say what it does
to the reserve. Layout is jsdom's blind spot and is enqueued as π-RERUN2-R2, with
the expected figures stated in advance so the capture can falsify the cure. The
band's brace walk was PARAMETERISED for the census rather than copied;
outlineNoneSites() is now a two-line caller returning exactly what it returned.

Born RED via a `git show HEAD:` extraction (exit 1 at g-dock-lattice.test.ts:715,
box-sizing absent from the reserve rule) → green 33 passed | 1 xfail, exit 0.

VERIFY: vue-tsc 0 · battery 2f | 2156p | 10xf (2168) — one RED foreign (stale dist/
still shipping the deleted overflow.css), one α-owned by TIMESTAMP and stated as
such: boot-graph's freshness arm was GREEN before this write (dist-demo built
22:38:22.444Z vs newest foreign source 22:32:02.777Z) and any source byte REDs it
until the close build · receipt seats:60 … violations:0 UNMOVED, nothing minted ·
verify:package REDs before any ratchet arm, on a stale handmark .d.ts.

OWED: π-RERUN2-R2, one DELTA cell, 0 claimed. No browser was opened by this seat.
```

---

## 2 · ⊕ⁿ LEDGER APPEND

```
⊕ⁿ  LANE α UNIT 9 · R2 RESIDUAL CURE · <SHA>

The one α STILL-RED from the π re-capture, closed at the root by one declaration.

THE DEFECT was not the reserve, it was the reserve's box model. `.dock-run` rides
the same element as `.dock-layer--full`, and layers.css fixes that element's border
box on exactly the axis the reserve pads — width:100% on the vertical run's inline
axis, min-height on a horizontal run's block axis. Under border-box the padding ate
the CONTENT box: margin box 40→32, crossOverflow +8, and the port clipped 4px off
the SEAT (paint 20..55.5 against a 20..60 layout box), with the ring painting one
arc and not the other. Horizontal i=5 lost 8px of dock height the same way.

THE CURE `box-sizing: content-box` on the base run rule — the authored size becomes
the seats' size, the reserve adds on top, the negative margin hands it back, the
clip rectangle alone grows. Rejected with grounds: a calc() re-authoring (loses
(0,3,0) vs (0,4,0), and misses the min-height arm), the same calc() in layers.css
(smears ring knowledge into a non-ring rule), overflow-clip-margin (no effect on a
scroll container), a wrapper (breaks the zero-new-DOM law). The false clause is
STRUCK IN PLACE and dated in run.css and in unit-8 RECORD §2.2.

REFUSED, restated in full: the 34 scroll-axis extremity clips — a scroller property;
curing it means padding the scroll axis and risking the W3 modular correction.

THE ARM is honest about its halves: the COLLISION is static and proven here (same
rule, one owner, and the size-authority census by equality); the GEOMETRY is jsdom's
blind spot and is enqueued, not claimed. Born RED by `git show` extraction, exit 1
at :715 → green exit 0. The band's brace walk parameterised, not duplicated.

VERIFY: vue-tsc 0 · battery 2f | 2156p | 10xf — one foreign (stale dist/ ships the
deleted overflow.css), one α-owned by TIMESTAMP (boot-graph's freshness arm, GREEN
before this write, REDs on any source byte until the close build; not built here,
the driver's disposition routes it to the close) · receipt seats:60 … violations:0
UNMOVED · verify:package exits before the ratchet arm, on a stale handmark .d.ts.

OWED: π-RERUN2-R2, one cell, 0 claimed. No browser was opened by this seat.
```

---

## 3 · FILES THIS UNIT TOUCHED

```
src/components/dock/styles/run.css                   box-sizing: content-box + the
                                                     struck clause, dated in place
tests/components/custom/dock/g-dock-lattice.test.ts  the arm (G-DOCK-MATERIAL, no new
                                                     seat) + bandDeclSites(pred)
docs/…/2026-08-10-lanealpha-unit8/RECORD.md          the §2.2 bracket owed
docs/…/2026-08-10-lanealpha-unit9/                   RECORD · PI-QUEUE · PASTE-BLOCKS
                                                     · born-red-R2.log · green-R2.log
```

**NOT this unit's, do not stage** — lane γ, mid-flight, handmark surfaces; not read,
not edited, not reverted:

```
src/components/handmark/HandMark.vue
tests/components/custom/handmark/g-hm-layer.test.ts
docs/…/2026-08-10-lanegamma-unit6/RECORD.md
docs/…/2026-08-10-lanegamma-unit6/PI-QUEUE.md
```
