# Questions for you, by release

These are the questions the three spec seats of 2026-11-10 left for you. Questions a seat answers by measuring are not here. Each has a default, so nothing waits on you: if no answer comes, the build follows the default and records it. A line each is plenty. Paths are under `docs/tranches/BL/` unless they start with `~` or name another repository. Where a picture does not exist yet, the question says which step takes it.

## 11.2.0, the dock (W-I.8)

**1. Which of the two strips is the dock?** (W-I.8 OQ-1) When the expanded dock swaps what it shows (Tools to a tool, say), strip A is the content exchange from the dock design loop, and strip B is a plain timed fade, where the old content is gone before the new arrives and both finish before the plate stops stretching.
- Default: B, the timed fade.
- Look at: strip A, `design/dock/pass-14/D2-Bp-crit-records/c/filmstrips/cl-1/main_strip-chromium-swap-long.png` (tiles 2 to 4 paint "Tools" as "ols" beside half a faded letter). Strip B has not been shot yet; the build's step 3 writes it to `design/dock/landing/strip-chromium-swap-long.png`. For comparison, today's 11.0.0 swap jumps 78 px a side in one frame: `design/dock-cluster/pass2/png/chromium-r6-swap-v1100-1440-light-design-in-t33.png`. `design/dock/LANDING.md` puts both side by side.

**2. With the bare seat outside the plate, what is centred: the plate and the seat together, or the plate alone?** (W-I.8 OQ-4) This is daraksha's theme control, which sits inside the plate when the dock is collapsed and steps out beside it, bare, when it expands.
- Default: the two together. The seat stays in the layout, so a host's centring, overflow and height see the true width, and the plate's own centre moves by half the seat's room when it expands.
- Look at: your frame `~/.dev-logs/owner-1110/shots/2.png`. The build's step 3 fixture (daraksha's one dock with the seat) captures the rest gap for you.

**3. May the landed dock make the boot payload any larger?** (W-I.8 OQ-8)
- Default: no. The landed dock's boot graph is no larger than master's at the cut; if it is, you rule the ceiling before the merge.
- Look at: `design/dock/REGISTRY.md` §P14-5 (31 bytes of margin on the old base). There is no capture; the number is read at the cut.

**4. Can you turn on Safari's remote automation so the dock is read in the Safari app before the tag?** (W-I.8 OQ-9)
- Default: not a release blocker. With the safaridriver checkbox on, one capture set (collapsed, mid-expand, expanded, mid-swap) is read before the tag; otherwise Safari is recorded as unmeasured.
- Look at: nothing exists yet. No Safari-app capture of this dock or of the loop's prototype has been taken, and Playwright's WebKit is not Safari.

## 12.0.0, restraint (W-R.1)

**5. When the page moves under a control you are holding, should the control glide to its new place or move with the page?** (W-R.1 OQ-1) A second pair sits beside it: the held control growing on the block axis only, against growing on both axes with the inline growth capped.
- Default: it moves with the page, and the grow is block-only.
- Look at: the glide, `design/engagement/pass-15/PE15-records/frames/glance/cand15-chromium-anchor-page-insert-before.png` and `…-act.png` (WebKit twins beside them). Moving with the page has not been shot; W-R.1's first step writes it to `design/engagement/landing/plain-chromium-anchor-page-insert-before.png` and its pair. The grow pair: `design/engagement/pass-15/PE15-records/frames/cap/cand15/frames-chromium/cand15-chromium-fine-light-slider-held.png` against `…-slider-rest.png`, and the block-only grow at `design/engagement/landing/block-chromium-fine-light-slider-held.png` once shot. `design/engagement/LANDING.md` lays them out.

**6. Which blur should every consumer get by default: the lighter u/dp set, or master's?** (W-R.1 OQ-2, O-226 (c)) The u/dp set is wash 4 px, quiet 6, resting 8, floating and overlay 0, saturate 1, no blur on controls. Master's is 10, 14, 16, 20, 22, saturate 1.5. atlas chose the u/dp set for its own pages.
- Default: no value is built on a guess. If you have not answered when the budget design pass runs, master's values stay, the "one blur value" check waits on you without holding the tag, and atlas keeps its set as overrides either way.
- Look at: the design pass shoots the same value.js popover and dock once per set. Until then, `src/styles/tokens/glass.css:69-79` on master against the `u/dp-integ-glass` branch.

**7. Which gradient fills may stay?** (W-R.1 OQ-3)
- Default: the colour space, the gradient editor, the aurora, the watercolour dot and the blob (the precept's list), plus the paper grid and grain and the gold recipes. Every other fill the check finds at the cut is deleted or shown to you.
- Look at: `docs/precepts/restraint.md`, Shading. The check lists the rest at the cut; on master they sit mostly in `src/styles/glass/overlay-plate.css`, `material.css` and `glass-chip.css`.

**8. Does the small grow on hover go along with the press squish?** (W-R.1 OQ-6)
- Default: yes. `--scale-hover` (1.08) and the capsule's hover lift are deleted; hover keeps its tier shift and its colour.
- Look at: no capture. The basis is `affordance-map.md`'s restraint amendment and the engagement loop's own retirement of it (CK-11).

**9. Do headings and titles drop from bold (700) to regular, as display does?** (W-R.1 OQ-8)
- Default: yes, shown to you on the design pass's page before the build.
- Look at: that page, once built. The tokens are `--type-weight-heading` and `--type-weight-title` in `src/styles/typography/scale.css:167-168`.

## 13.0.0, the blob run (W-G.1, W-B.9, W-G.5, W-G.5b)

**10. After the constellation moves to WebGPU, a browser without WebGPU shows no constellation, where today it shows one everywhere. Port it, or keep it on the 2D canvas?** (W-G.1 OQ-1) atlas's page background is the live case.
- Default: port it. The loss is written in the migration notes, and atlas decides in its own tranche whether to put the SVG still (`StillConstellation`, arriving in 11.2.0) under the live field. If you keep the 2D canvas, the constellation leaves the run and `useCanvas2D` stays exported.
- Look at: no capture. `waves/W-B.9.md` §0; `atlas/src/platform/chrome/background/Constellation.host.vue:64`.

**11. The blob's flatness gate (lightness spread 0.05 or less across the body): does it bound the whole read, palette included, or only the shading?** (W-G.5 OQ-4)
- Default: the whole read, as value wrote it. The default palette's body colours are chosen inside a 0.05 lightness band, with hue and chroma carrying the colour. If the result looks flat to you, the gate narrows to the shading alone.
- Look at: π-SHADE at the run's close, the default preset before and after in both themes, under `.cache/evidence/W-G.5/`. value's read is `e2e/smoke/o1109-blob-goo.spec.ts` at value.js `56979e978`.

**12. The blob's drop shadow: neutral grey, or lightly tinted with the palette's first colour?** (W-G.5 OQ-5)
- Default: neutral (chroma 0, lightness 0.28 to 0.34, the same in both themes), as `restraint.md` rules shadows.
- Look at: π-STAMP at the run's close shows both at 240 and 480 px, both themes, under `.cache/evidence/W-G.5/`.

**13. How faint may a bead get against the aurora before it no longer reads as a bead?** (W-G.5b OQ-7) The design loop goes first: it shoots eight hue-shifted seeds on the shell aurora and proposes the faintest one you still read as a bead.
- Default: until you have read those captures the gate records readings and holds nothing; the number you accept is written in before the build.
- Look at: the loop's first capture, once taken. Your aurora line of 2026-11-05 is the brief.

The run also brings you three captures at its close, π-LOOK (the hero blob at rest and in motion), π-SHADE and π-STAMP, and it does not tag before you have read them (`waves/W-G.5.md`).
