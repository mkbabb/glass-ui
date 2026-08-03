# Candidate-2 exemplar critic — material / taste

**Seat:** independent material/taste critic, candidate 2  
**Date:** 2026-07-21 (America/New_York)  
**Scope:** formation and audit only; no product, test, gate, owner, or commit change  
**Overall verdict:** **HOLD**

Candidate 2 has the right restraint in several important places, but its material row is not yet acceptance-ready. It correctly treats F1 as a structural referent rather than a palette to clone, names F4 shine and F5/Slider opacity as falsifiers, refuses a browser-specific aesthetic, rejects screenshot-only GREEN, and does not resurrect mandatory idle motion. Those are real passes. The hold is narrower and concrete: the external lab does not exercise the production tabs or Slider, the stills depict a discrete four-step selector rather than the continuous Slider, and “contextual warm frost” is not yet converted into a paint test that can distinguish translucent glass from a warm opaque lozenge. Current source also contains state-path defects that would make the proposed rest/hover/focus/coarse/drag matrix dishonest at this seat.

The post-G6 relay reported in `REGISTRY.md` / `GATES.md` does not change this result. It is coordination state, not new exemplar paint evidence.

## Evidence pins and method

### Candidate authority at audit close

| Input | SHA-256 |
|---|---|
| `EXEMPLAR-RECONCILIATION.md` | `30a42431ef2e87a7ec146d497dd7233f2990b5821e3299a21ad8eae38313f753` |
| `VISUAL-HARDENING.md` | `73e2409eafe6d9899945e795b6d1cb5234c6c574cadd607f46ae538cd33d1f67` |
| `REGISTRY.md` | `95e685fcaf6e4dce6986d1aed6be9b4d10da913ed76bf9cf27bfcab69bed8080` |
| `GATES.md` | `c5c148e6705c12f779e4a0650a553104b595898241a2e805fc976b2873a09f2b` |

### Exemplar media

| Input | SHA-256 | Inspection |
|---|---|---|
| external `glass-momentum-lab.html` | `614e4e3fc68c6682bd8039000c9348a9ac76ea0dfc0650d36cee1714ccb216b9` | complete HTML/CSS/JS source; expected digest matched |
| `IMG_2287.PNG` | `05275f5fa3d5449a7c081213671e7ba126b4067a0a96f530e569ff4388a2b8ab` | original 1206×2622 pixels |
| `IMG_2288.PNG` | `4660e58b68fb18ac589286d7e0fdf53fb507f29bf7afd7f43f241aa3920f192b` | original 1206×2622 pixels |
| `ScreenRecording_07-17-2026 22-46-16_1.MP4` | `8a3156fc8e07f4a1aa524c62c7e176b085abc28095da018ee0f3aa35aeb55c41` | 47.425 s; six evenly sampled frames |
| `ScreenRecording_07-18-2026 14-56-16_1.MP4` | `217a00e895d12e65091522e18588d0c1d763b4ad44afc90f05300d4320daddc8` | 66.045 s; six evenly sampled frames |
| `ScreenRecording_07-18-2026 15-11-44_1.MP4` | `cfef75d854154841594f551224cf8c23a966d4cc4113a2f9f24097c280d7ecac` | 14.236 s; six evenly sampled frames |
| `ScreenRecording_07-18-2026 15-12-32_1.MP4` | `0abf37cd7124b787a452d0e5c5dfcbda9ca1cfe4d8b6a84d2f3130c15a2def4f` | 10.068 s; six evenly sampled frames |

Video conclusions below are scene-level observations from those evenly spaced samples, not frame-accurate motion measurements. The in-app browser had no available browser instance, so the lab could not receive a live Safari/Chromium paint pass in this seat. I did not substitute a different rendering surface. Lab paint, interaction, overflow, and cross-engine claims therefore remain **HOLD**, while source-derived claims are exact.

### Product and historical comparators

The current production inspection pinned `SegmentedTabs.vue` (`aba129ba…`), `segmented.css` (`12c50288…`), `Slider.vue` (`af3aae36…`), `glass-capsule.css` (`c2370468…`), `liquid-fill.css` (`9b7a9a8a…`), `material.css` (`1817a8ec…`), `glass-refract.css` (`5956f6ca…`), the tabs story (`f5c5ed68…`), and the Slider story (`ceb18a7e…`). I also inspected F1 (`a9875cd0…`), F4 (`164e0a29…`), F5 (`daa997a0…`), the frosted-cure probe (`d0a53daa…`), `BAND-MATERIAL` (`1ec27127…`), and `BAND-A11Y` (`5d45e797…`).

The prior IOS27 record was used as precedent, not re-ratified by citation: current BJ `MARKS-A/B` and `IOS27-CODEX`; IOS27-MICRO `MARKS-C-APPS`, `MARKS-C-MUSIC`, `MARKS-D-POPOVER`, `MARKS-D-SIRI`, `MARKS-E-NOTIFICATION`; `NOVELTY-ROSTER`; and the design/mechanism novelty critics.

Method: compare the measured media semantics first; inspect the lab mechanism; inspect the current production substrate and state readers/writers; then test candidate language against the old F1/F4/F5 falsifiers and the current material/A11Y owners. No prior GREEN count was treated as paint evidence.

## Findings, in priority order

### 1. **DEFECT — P0:** the lab does not test its own material proposition

**Evidence.** The material selector changes `data-material`, but its three paint arms target only `.gml-plate` (`glass-momentum-lab.html:138-160`). The tabs are three generic host `.btn.btn-ghost` buttons (`:48-52`) with no selection listener, moving indicator, or production material composition. The “Effort” specimen is a host-styled native `<input type="range" class="form-range">` (`:30-34`); JavaScript only changes its text label (`:273-275`). The halo is a foreground radial gradient with `filter: blur(1rem)` (`:118-125`), not a progressive `backdrop-filter` or masked backdrop sample. No authored hover, `:focus-visible`, coarse-pointer, touch-onset, drag, settle, or material-state CSS exists. The fragment also depends on unpinned host definitions such as `.btn`, `.form-range`, `--card`, and `--foreground`; its exact HTML digest does not pin the final paint.

**Mechanism.** Selecting “warm contextual frost” versus either falsifier compares three dock-plate recipes, while the candidate gate asks for the same production substrate and state sequence across tabs and Slider. The specimen under test never changes with the selector. A browser-native range additionally makes its thumb/track proportions engine-owned, precisely where the candidate forbids engine-special design.

**Born-RED / falsifier.** Source assertions are already RED if they require: (a) the material selector to affect a production tab indicator and production Slider range, (b) an authored focus/coarse/drag state, (c) a backdrop-sampling attention field, or (d) a self-contained host-theme pin. A live screenshot of the current fragment cannot turn those missing mechanisms GREEN.

**Smallest amendment.** Keep the lab as a formation sketch and label its material verdict **HOLD / non-evidence** in `EXEMPLAR-RECONCILIATION` §4 and the receipt. For the existing `R-EXEMPLAR-MATERIAL` / IOS FINAL W5 gate, use one production `SegmentedTabs` plus one production `Slider` fixture on a pinned structured substrate. If the fragment remains part of evidence, pin the host stylesheet/theme digest and replace its host tabs/range with those production components. No new lab, primitive, owner, or wave is needed.

### 2. **DEFECT — P0:** the still selector is semantically conflated with continuous Slider

**Evidence.** `IMG_2287/2288` show one four-step effort selector: the stadium contains an active solid light segment followed by discrete dots. At source pixels, the outer track is approximately 1022×213 px (about 341×71 pt under the evident 3× scale). The active segment grows from approximately 465 px to 625 px (about 155→208 pt), almost exactly one dot pitch (~160 px / 53 pt). This is a value-state transition from High to Extra High, not evidence of a continuous free-drag track. Both are resting screenshots; neither shows hover, keyboard focus, touch onset, drag, release, or reduced motion.

**Mechanism.** Importing the large white fill-pill into `Slider` changes the component’s semantic and proportional grammar. Conversely, routing the still’s directional attention band through the discrete selector owner is unnecessary: that band is environmental focus staging and can legitimately inform `V-ALENS` without converting the underlying selector into a Slider.

**Born-RED / falsifier.** A reconciliation statement fails if it calls the photographed control a continuous Slider, cites either still as drag evidence, or requires the production Slider to acquire its ~71 pt stadium / solid white fill. A Slider drag can only be proved by Slider interaction evidence.

**Smallest amendment.** In `EXEMPLAR-RECONCILIATION` H3 and the registry/gate row, split the import explicitly: **attention field only** → existing `V-ALENS` / `X-GRADBLUR`; **discrete fill-plus-dots geometry** → the existing discrete-progress/effort owner; **continuous Slider** → independently judged under `R-SLIDER`. Preserve the already-correct sentence that broad white fill is not the material target.

### 3. **DEFECT — P0:** “contextual warm frost” lacks an operational anti-plastic threshold

**Evidence.** The current selected tab composes `.glass-capsule`. Its base starts from floating glass alpha `0.80` (`tokens/glass.css:53-57`) and mixes 16% toward the opaque warm capsule token (`glass-capsule.css:38-63`), yielding an effective opaque contribution of about `0.832` before compositing. The Slider’s `.glass-liquid-fill` mixes an opaque warm tint at 88% against a zero-alpha warm leg (`liquid-fill.css:40-57`), leaving only about 12% direct substrate contribution before blur. These are not automatically wrong values, but they are exact mechanisms by which a surface can satisfy “warm” and “blurred” while still reading as F5-style plastic. The lab’s “frost” label likewise supplies no explicit warm source or transmission criterion; it merely mixes unpinned `--card` at 58%.

The recordings support contextual transmission as the taste target: Maps/Music docks retain scene tint and hierarchy; the Siri/notification surface keeps contextual content legible through/around the plate; the Photos popover transmits the source image/grid while remaining a separate foreground body. They do not authorize a cream opacity slab.

**Mechanism.** Hue, blur radius, and opacity are independent legs. Warmth can hide substrate loss; extra blur can further erase structure; a bright inset edge can simulate “glass” on an opaque body. The result is the exact F4/F5 trap the row intends to exclude.

**Born-RED / falsifier.** On a pinned substrate containing a high-contrast boundary, fine texture, and warm/cool regions, the contextual arm is RED if the selected tab or Slider fill erases the boundary like the opaque-plastic arm, if a static rim dominates the body, or if nested use becomes a near-solid cream lozenge. “Uses `backdrop-filter`” and “has warm chroma” are insufficient assertions.

**Smallest amendment.** Add one sentence to the existing registry/gate acceptance: contextual frost must preserve **resolved spatial transmission**, not merely a blur declaration—visible substrate region/boundary identity under direct and nested specimens, readable labels, and a bounded rim whose interaction delta exceeds its idle emphasis. Capture the same coordinates for contextual, shine, plastic, and no-glass arms in current Safari and Chromium. The existing IOS FINAL W3/W4/W5 and MATERIAL W1/W2/W7/W8 owners already cover this; mint nothing.

### 4. **DEFECT — P1:** the proposed state script is not currently paint-complete

**Evidence.** `SegmentedTabs` gives unselected pills `.glass-capsule-hover` and the moving selected indicator `.glass-capsule.glass-lens`; drag adds `.glass-drag-lift` (`SegmentedTabs.vue:155-167,362-377`). Both hover and drag write `--specular-intensity: 0.14` (`glass-capsule.css:91-128`). But the specular `::before` reader is created only for the selectors in `material.css:36-47,135-145`; `.glass-capsule`, `.glass-capsule-hover`, and `.glass-lens` are absent. The tab writer therefore has no local paint reader: scale/geometry can change, but its claimed catch-light does not.

For Slider, `data-touch-active` is emitted (`Slider.vue:193-205`) but has no CSS reader. Standard focus is painted with `:focus-within` (`:405-413`), so pointer focus can masquerade as the keyboard-focus state. The thumb lacks the existing `touch-hit-area` class. `BAND-A11Y` W2-E/W2-F already owns the latter two defects and calls both RED; they must not be duplicated here.

**Mechanism.** A state-matrix screenshot can look unchanged because a custom property has no consuming pseudo, or look “focused” merely because the pointer caused focus. Neither proves the promised material sequencing. Touch metadata without a reader cannot establish a distinct coarse-onset material response.

**Born-RED / falsifier.** At fixed geometry and substrate, computed/paint delta assertions are RED when tabs hover/drag write no visible specular reader, when Slider pointer press paints the keyboard ring, when coarse onset has no authored state, or when the effective hit floor is below 44 px. PRM must retain the legibility/rim floor while eliminating smear/overshoot; it must not substitute a different static material.

**Smallest amendment.** Make `R-EXEMPLAR-MATERIAL` GREEN contingent on existing `BAND-A11Y` W2-E/W2-F. Route the tab reader/writer repair to existing IOS FINAL W5 `R-TABS` and the Slider touch-state decision to existing `R-SLIDER`; add fixed-coordinate pixel-delta assertions for rest→hover/focus/coarse-onset/drag→settle/PRM. Do not add a second specular primitive or a new accessibility owner.

### 5. **DEFECT — P1:** direct and nested material truth are currently collapsed

**Evidence.** The tabs story places pill tabs inside `.glass-card`. Canonical plates deliberately seed descendants with `--glass-cell-backdrop-filter: none` so there is one backdrop sample per visual plate (`material.css:51-67`). Thus a nested tab indicator is not equivalent to the same indicator on a bare structured substrate: it inherits the parent’s already-resolved plate and paints its high-alpha warm body without another backdrop sample. The Slider story is organized as raw sibling sections and does not provide the same pinned substrate/nesting pair.

**Mechanism.** Adding a child backdrop sample produces double-glass mush and doubled edges. Suppressing it without reducing the child’s opacity can instead produce a plastic lozenge on a flattened parent. One direct screenshot cannot distinguish these opposite failures.

**Born-RED / falsifier.** Evidence is RED if the fixture lacks both (a) standalone controls over a structured substrate and (b) the same controls inside one real `.glass-card`; if two blur samples appear in the nested case; or if the nested child destroys the parent’s contextual boundary. Portaled/floating surfaces remain independent plates and are not the same case.

**Smallest amendment.** Extend the existing W5 fixture, not the primitive API: one direct pair and one real-card nested pair, same substrate and states. Acceptance is exactly one sampling plate per visual body, preserved contextual identity, no doubled rim, and no opacity compensation that turns the child solid.

### 6. **HOLD — P1:** the old “22/26 px cure” and current unified 7 px base are unresolved precedents, not a numeric prescription

**Evidence.** F1’s card used a comparatively deep contextual blur and restrained rim; F4 combined high saturation with multiple bright edge legs and a near-white Slider fill; F5 used 7 px blur, brightness, a strong gloss lip, and an autonomous sweep. The old frosted-cure probe diagnosed F5’s 7 px plate as insufficient and demonstrated 22/26 px parent recipes. Current `BAND-MATERIAL` W2, however, explicitly treats quiet==resting at 7 px as the intentional base and separately asks whether the whole ladder should become subtler after live paint review (`BAND-MATERIAL:243-260`). Candidate 2 does not resolve this authority conflict, and static source cannot do so.

**Mechanism.** Blur has a role and sampling-depth dependency. A parent plate may require enough defocus to gather context into a field; a nested control should usually inherit that resolved field and add restrained tint/rim rather than sample and blur it again. Copying one radius across both roles either leaves the parent raw or turns the child to mush.

**Falsifier.** “Lower blur is always more refined,” “F1 means 22/26 everywhere,” and “one 7 px value proves one material” are all invalid. A lower radius that exposes noisy detail, or a higher radius that erases spatial context, fails regardless of token conformance.

**Smallest amendment.** In the candidate rider, defer numeric blur selection to existing MATERIAL W2 live-π and state the role rule: **the parent owns contextual defocus; a nested control preserves that context with tint/rim and no second sample**. Judge the result against spatial transmission and hierarchy, not radius alone.

### 7. **HOLD — P2:** proportion and story hierarchy need one explicit acceptance cut

**Evidence.** The still’s ~341×71 pt four-step stadium is intentionally large and cannot set continuous Slider proportions. Current horizontal `SegmentedTabs` already has a compact basis—roughly 13–14 px labels, modest inline/block padding, and a bounded-radius vertical arm—so its geometry is closer to the desired control grammar than the photographed effort selector. Its story, however, repeats many glass-card sections at nearly equal weight. The Slider story uses raw sections and labels “keyboard/touch/reduced motion” as specimens without actually capturing those states. Neither arrangement proves page hierarchy or nesting in a real route.

**Mechanism.** A materially restrained control can still read as a giant white action if selected-fill area, padding, and section repetition overpower content. A story label is not state evidence.

**Falsifier.** RED if pill tabs become a tall luminous banner, continuous Slider inherits the still’s solid fill-pill, vertical tabs approach a near-rectangle without bounded corners, repeated glass cards compete with the page protagonist, or state labels are accepted without induced state.

**Smallest amendment.** Keep current compact tab proportions as the starting baseline. Require the existing `R-HIERARCHY` W4 review to include one representative tabs/Slider story and one real route after material work, with induced states rather than labels. No new proportion token or story wave follows from the exemplar.

### 8. **PASS — P2:** the cross-engine direction and restraint clauses are sound

`SegmentedTabs` now uses one JS-measured indicator path for all engines, which is the correct geometry direction. The runtime refraction-latch goal—enhanced refraction where paint-proven, honest blur otherwise without changing the design language—is also correct. Candidate 2 correctly refuses old battery counts as proof, rejects broad white fill as the target, and does not require an autonomous rest animation. These clauses should remain.

The pass does not extend to the lab’s UA range, nor to a PE curve that materially changes the visual role by engine. A progressive enhancement may refine an edge; the fallback must remain recognizably the same control and material.

## Minimal candidate-2 amendment set

No new owner, wave, primitive, or prototype is warranted. The smallest coherent reconciliation is:

1. In H3, identify `IMG_2287/2288` as a **discrete four-step effort selector**. Route only its directional attention field to `V-ALENS` / `X-GRADBLUR`; keep continuous Slider evidence independent.
2. In §4, mark the current external lab **formation-only / HOLD** for material because its selector changes only the dock plate, its range is UA-owned, its host theme is unpinned, and it lacks the requested states.
3. In `R-EXEMPLAR-MATERIAL` / `GATES`, define contextual transmission operationally and require production tabs + Slider on the same pinned structured substrate in both standalone and real-card nested cases.
4. Make the state proof depend on existing A11Y W2-E/W2-F, and route the dead tabs specular reader plus Slider touch-state decision to existing W5 owners.
5. Let MATERIAL W2 choose radii live by role; preserve the one-sample nesting law. Cross-link one post-fix story and one route to existing hierarchy review.

## Explicit rejections

- No transplant of the still’s solid white fill-pill, 71 pt stadium, or discrete-dot grammar into continuous Slider.
- No radial foreground glow presented as progressive backdrop blur.
- No UA-native range or screenshots-only receipt as production material evidence.
- No “warm + blurred” adjective gate without spatial-transmission falsifiers.
- No blanket 22/26 px F1 clone, blanket “less blur,” or numeric-radius-only GREEN.
- No second backdrop sample inside a canonical glass plate; no opacity slab used to compensate for its absence.
- No double-lit static rim, brightness boost, cyan idle cast, F5 gloss lip, or autonomous 5.6 s sweep.
- No mandatory idle breath restored through exemplar language.
- No Safari/Chromium-specific material skin or materially different geometry; enhanced refraction may only refine a common base.
- No new primitive, novelty slot, owner, wave, route posture, or spectacle slot.

## Release judgment

**PASS** the candidate’s restraint, precedence, F1/F4/F5 role assignment, one-design-language degrade, and refusal of screenshot-only GREEN.  
**DEFECT** the lab’s material validity, the still-to-Slider semantic conflation, the missing anti-plastic transmission criterion, and the incomplete production state readers.  
**HOLD** final material taste, blur magnitude, nested paint, touch/focus/drag continuity, proportions in context, and Safari/Chromium parity until the amended production fixture is captured.

Candidate 2 should advance only after the five minimal text/gate amendments above are absorbed by the already-named owners. It should not advance on the current lab or stills as material proof.
