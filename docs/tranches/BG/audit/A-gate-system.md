# BG Audit A — the GATE/PROOF system + the headless-green / visually-broken gap

**Auditor brief:** why did the full 360-gate battery pass GREEN while routing, the field,
the previews, and the dock are visibly broken in shipped 4.2.0? Which gates are
STALE-WITNESS vs LOAD-BEARING? Is the π/gestalt layer reading live paint or grace-skipping?
Did the BD close's ~77 stale re-points mask regressions?

Model id surfaced verbatim: **claude-opus-4-8[1m]** · fable is DISABLED.

All evidence verified against real HEAD source (`master`, glass-ui 4.2.0,
`998136bb` BD SHIPPED).

---

## FINDINGS (what is actually true at HEAD)

### F1 — The keystone gestalt gate is GREEN but reads a FROZEN, WRONG-TRANCHE roster

`proof:ba-gestalt` is the designed close oracle for PAINT, tagged
`["local","ci","release"]` — it IS in the release battery. I ran it at HEAD:

```
proof:ba-gestalt — ... status: PASS
  roster ledger : docs/tranches/BC/audit/reflect/bc-gestalt-roster.md
  verdicts      : 16 PASS / 0 FAIL
  operative result: PASS (every surface paints warm-translucent ...)
```

Every one of the 16 surfaces is PASS. But the gate consts STILL point at the **BC**
tranche (`scripts/proof-ba-gestalt.mjs:70-73`):

```js
const REFLECT_DIR = resolve(ROOT, "docs/tranches/BC/audit/reflect");
const ROSTER = resolve(REFLECT_DIR, "bc-gestalt-roster.md");
const WAVES_DIR = resolve(ROOT, "docs/tranches/BC/waves");
const TRANCHE_DIR = resolve(ROOT, "docs/tranches/BC");
```

BD's own CHALLENGE rounds CAUGHT this exact defect:
`docs/tranches/BD/CHALLENGE-1.md` MAJOR-1 ("the `proof:ba-gestalt` roster is BC-frozen
with no BD wave owning the grow/re-point ... the gate either reds (frozen BC path) or
**false-greens against stale BC captures**"). The fix wave was specced —
`docs/tranches/BD/waves/BD.W-GESTALT-ROSTER-GROW.md` exists, CANDIDATE-WAVES.md:377-389
describes minting `docs/tranches/BD/audit/reflect/bd-gestalt-roster.md` + re-pointing
the 4 consts BC→BD. **It was NEVER executed.** Verified:

```
ls docs/tranches/BD/audit/reflect/ → (empty)
bd-gestalt-roster.md exists?: NO
sed -n '70,73p' proof-ba-gestalt.mjs → still docs/tranches/BC/...
```

The G8 "no-terminal-reflect deferral" scan walks `TRANCHE_DIR` = `docs/tranches/BC/`
(97 files) — it never even SEES the BD waves it is supposed to police. The keystone
PAINT oracle is, in 4.2.0, a vacuous pass over a frozen prior-tranche ledger.

### F2 — The freshness/auto-revoke mechanism is a SELF-CERTIFIED NARROW WHITELIST

The G7 auto-revoke (the intended defense: "ANY wave editing a painting source revokes
that surface's PASS") fires off a per-surface `<!-- surface-paths: … -->` header that the
WAVE AUTHOR declares. I dumped the entire watched surface across all 16 reflect records:

```
demo/stories/StoryPage.vue · StorySectionHeader.vue · story-hero.css
src/styles/{animations,configurator,dock-controls,dock,feedback-tone,glass,index,
            segmented-tabs}.css · dock/cta-seat.css · glass/{material,surfaces}.css ·
            tokens/{dark-arm,light-dark}.css · utilities/metal.css
src/subpaths/{aurora,goo-blob}.ts
```

That is the COMPLETE set of files any surface-hash watches — ~13 glass/dock/tabs styling
files. **NOT watched by ANY surface:**

- `src/styles/paper.css` — the metallic `.paper-field` (defect #2). **Zero watchers.**
- `demo/layout/AppShell.vue`, `demo/router.ts` — the routing freeze (defect #1, #9). **Zero.**
- `demo/stories/SectionLanding.vue` — the dead previews / wasted category cards (#6, #11). **Zero.**
- the substrate preview routes, the Configurator/Sheet drawer (#7), the dock scroll (#12).

So G7 auto-revoke is structurally INCAPABLE of catching a regression in any file the wave
author didn't volunteer into the whitelist. A wave breaks `paper.css` → no watched hash
drifts → `freshness:fresh` → the PASS stands. The "any wave editing a painting source
revokes" claim is false: only a wave editing one of the ~13 SELF-DECLARED paths revokes.
(`reflect-capture-verify.mjs:311 surfaceHash` hashes only the declared paths in order.)

### F3 — The probe regions are tiny boxes that never sample the actual defects

The pixel reader (`pngRegionStats`, `reflect-capture-verify.mjs:251`) averages OKLab-L +
chroma over a fractional box the roster row declares. The boxes are tiny and aimed at the
dock/floating plate only (`bc-gestalt-roster.md`):

- `dock`: `x=0.18,y=0.50,w=0.20,h=0.12` (a 20%×12% box mid-left)
- `aurora`: `x=0.20,y=0.20,w=0.60,h=0.50`
- `shell`: `x=0.15,y=0.10,w=0.20,h=0.12`

The expect band is purely `meanL=<lo>..0.99;meanChroma>=<floor>` — a **warm-cream-vs-grey**
test. It cannot detect: a red/maroon cast bleeding around the dock (#3 — the cast is a
DROP-SHADOW outside the plate probe box), a metallic conic sheen on the page field (the
probe box is on the dock plate, not the field), a top aberrative bar (#5 — y=0 is outside
every probe), corners that don't clip (#3), a frozen route (#1 — a stale page still has a
warm dock), or a dead preview (#6 — the previews aren't probed at all). A warm-cream dock
plate over a metallic field + frozen routing reads GREEN.

`meanChroma>=0.030` on `dock` actually PASSES with chroma `0.0891` — but a high chroma is
ALSO consistent with the red/maroon cast (#3). The chroma floor proves "not grey," not
"correct hue" (the band has no upper chroma bound, no hue check).

### F4 — `proof:black-bar` (release-tagged) is device-free SOURCE; its paint arm is the frozen roster

Defect #5 (aberrative top bar) has a same-named gate, `proof:black-bar`, in the release
set. But `scripts/proof-black-bar.mjs:4-7` states it plainly: "The SOURCE/MECHANISM arm of
proof:black-bar (device-free; **the PAINT arm is the bc-gestalt-roster pixel-read** ... the
π readback tests-visual/black-bar.spec.ts)." It checks `--glass-border-*` α ≤ 5% token
ceilings and a `--glass-rim-top/bottom` pair exists — never the live top edge. Its paint
arm is F1's frozen roster + a `local`-only spec. So the aberrative-bar defect has no live
release-gating witness.

### F5 — The "live" π layer is `local`-only AND dodges the live field via reducedMotion

`tests-visual/` carries ~79 specs. They are `local`-only (a real browser + demo + GPU);
CI/release runs NONE of them — only `proof:live-verified-ledger` (a paperwork gate, see
F6). Of the ~79, **32 use `reducedMotion: 'reduce'`** — which freezes the aurora/field
to a single static frame, structurally dodging the live metallic sheen and any
motion-driven defect. The `--run pi` runner is `local`-only and not in any CI/release
aggregate (`gates.mjs` GATES has `pi`-tag count = 0; it is a runner MODE, not a tag). So
the only layer that reads real pixels never runs at the gate that ships the tag.

### F6 — `proof:live-verified-ledger` is a PAPERWORK-COMPLETENESS gate, not a render gate

`proof:live-verified-ledger` (`["local","ci"]`) is the CI-side "proof the live verification
happened." It asserts that every PROGRESS row marked `live-verified`/`complete` has an
on-disk DELTA `.png` + π readback with matching `surface-paths`/`surface-hash` freshness
headers (`proof-live-verified-ledger.mjs:520-575`). It proves a screenshot was COMMITTED
with a fresh hash of the AUTHOR-DECLARED paths. It never decodes the screenshot, never
asserts the render is correct, and inherits F2's narrow-whitelist blindness. A wave can ship
a DELTA of a broken page with a fresh hash of an unrelated narrow path and pass.

### F7 — No gate asserts routing ACTUALLY navigates (the #1 linchpin defect is ungated)

I grepped every `proof-*.mjs` + `tests-visual/*.spec.ts` for `childCount`/`unmount`/
`leave hook`/`transition-type`/`router-view`. The hits (`proof-spa-view.mjs`,
`proof-dock-layering-polish.mjs`, `perf-producer.spec.ts`) test the SpaView cache, dock
layers, and perf — NONE assert "click nav → old page unmounts → new page mounts." The
routing root cause is visible in `demo/layout/AppShell.vue`: TWO `startViewTransition`
watchers (`:131` morph, `:220` category), the `useBloomUp` "take the first non-skeleton
element" hack (`:288`), THREE coexisting `<Transition>` branches (`:405`, `:497`, `:720`),
and the `.scroll-build` mount-animation colliding with the `fade-slide` `<Transition>`.
This entire over-contrived layer has zero gate. The defect ships green.

### F8 — The field-is-metallic, previews-render, dock-scrolls defects are all ungated

- `src/styles/paper.css:151-212`: `.paper-field` = a `conic-gradient` cel-sheen + 4
  high-chroma `radial-gradient`s + the `--paper-grain-tooth` feTurbulence speckle (the
  brown metallic wash, defect #2). The two gates that touch the field —
  `proof:demo-radial-calm` (token `--pulse-aura-strength` ≤ 0.25 + the FOUR hero files
  carry `<Aurora>`) and `proof:page-redesign` (`StoryHero` composes a `<Card>` + A
  substrate exists) — check token strengths and a substrate's PRESENCE, never that the
  field reads non-metallic and never the universal `.paper-field`. The user directive
  (every page gets an AURORA, not the paper wash) has no gate.
- `demo/stories/SectionLanding.vue:51`: the category-card `field` specimen is explicitly a
  "FROZEN STILL, NOT a live GL" — the dead previews (#6/#11). No gate asserts previews render.
- Dock scroll (#12), the Configurator drawer (#7), `/compositions/hero` over-scaled headers
  (#10), the V↔H modal+esc (#13), the useless ℱ brand section (#8): no live render gate.

### F9 — The BD close re-pointed ~77 gates "stale-vs-regression" — and took the SHORTCUT on the keystone

`docs/tranches/BD/IMPLEMENTATION-PROGRESS.md:75` (commit `b8aa7033`): "reconcile ~95 red
proof gates (stale-vs-regression) → near-green ... ~77 gates re-pointed to the new reality
(A-stale) + 11 REAL regressions FIXED. NONE force-passed." That is a large surface of
re-pointing trust. The interlock that matters: P10b.3 (`:76`) lists the ba-gestalt blocker
as "**ba-gestalt visual-π re-capture**" — i.e. the close flipped the keystone GREEN by
re-shooting the FROZEN BC roster's captures (`f0e1ef8d` "re-capture + re-stamp the
page-band gestalt surface") and re-stamping the narrow hashes — instead of running the
specced `BD.W-GESTALT-ROSTER-GROW` (F1) that would have grown the roster, widened the
watched surface, and made the BD repaints actually probed. The keystone was satisfied by
making the OLD evidence "fresh," not by proving the NEW pages render.

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — The gate system proves SOURCE STRUCTURE + PAPERWORK, and self-certifies its own PAINT scope

~340 of the 360 gates are device-free SOURCE scans (a token ceiling, a class present, a
fork absent, a marker string). These are genuinely load-bearing for the property they
assert — but "the source declares the right token" is orthogonal to "the page renders
correctly." The ONE gate designed to bridge that (`proof:ba-gestalt`) delegates its truth
to (a) a roster the WAVE AUTHOR fills, (b) probe boxes the AUTHOR places, and (c) a
freshness whitelist the AUTHOR declares. Every paint-truth input is author-controlled and
narrow. The gap is not a missing gate — it is that **the paint layer's scope is
self-certified**, so a defect in any unenrolled file/region/route is invisible by
construction. The cardinal recurrence (BB roster-never-grew, AZ source-green/visually-broken)
is the same disease: the close trusts the author's declared surface, and the author's
surface lags the real paint.

### RC2 — The live-pixel layer is structurally severed from the shipping gate

The only layer that decodes real pixels (`--run pi`, the ~79 `tests-visual` specs) is
`local`-only and is NOT a member of any CI/release aggregate. The release tag is gated by
SOURCE + the PAPERWORK ledger (F6) + the frozen gestalt (F1). So "the pixels painted" is
NEVER a precondition of the tag. The architecture explicitly chose this (CI has no GPU/demo),
and backstopped it with the ledger — but the ledger only proves a capture was committed, not
that it is correct, and inherits the narrow-whitelist blindness. The backstop does not
backstop render correctness.

### RC3 — The probe is a warm-cream-vs-grey test, not a "is the page right" test

`pngRegionStats` reads only mean L + mean chroma + mean alpha over a small box. It was
purpose-built to kill ONE disease (the grey `oklab(0.695)` slab). It has no hue band, no
upper chroma bound, no structural/edge/clip check, no per-route navigation check, no
field-vs-plate disambiguation. It cannot express "the dock has no red cast," "the field is
an aurora not a conic sheen," "this corner clips," "no bar at y=0," "the leaving page
unmounted." So even a live-pixel close over these probes would miss BG's defects.

### RC4 — The BD close optimized for "battery green," not "pages render"

Faced with the frozen-BC keystone, the close re-shot the frozen captures (RC1's self-cert)
rather than execute the roster-grow that would have widened the watched surface to the BD
files. ~77 stale re-points moved a lot of gates to "the new reality" — a reality the close
itself defined. With no live-render precondition on the tag (RC2) and a self-certified paint
scope (RC1), "all green" was reachable while the pages were broken. The discipline that
should have stopped it — `BD.W-GESTALT-ROSTER-GROW` + a CI-accurate full-battery close — was
specced and skipped.

**Did any of the ~77 stale re-points mask a regression?** The decisive one did: the
ba-gestalt re-capture masked the entire BD repaint surface (it re-froze the BC probe set
over re-stamped narrow hashes, so paper.css/AppShell/SectionLanding regressions were never
in scope). The other 76 are mostly source-token re-points (lower regression risk), but the
audit cannot certify them individually without per-gate diff review — the structural point
stands: a 77-gate "stale" sweep with no independent live-render check is exactly the
mechanism by which a regression hides inside a re-baseline.

---

## PROPOSED WAVES

### BG.W-GATE-ROUTING-LIVE — a gate that proves routing ACTUALLY navigates
- **Intent:** make the #1 linchpin (frozen routing) impossible to ship green.
- **Approach (gestalt):** a `local`+`ci`-eligible Playwright spec + a served-app sentinel:
  navigate `/foundations/intro` → `/substrates`, assert (a) the URL changed, (b) the OLD
  page heading is GONE from the DOM, (c) `<main>` settles to childCount 1 (no coexistence),
  (d) the new heading is present, within a bounded timeout. Run it across ≥6 cross-category
  hops. CI runs it headless (no GPU needed — it is DOM, not pixels), closing RC2 for the
  routing axis specifically. Pairs with the gestalt re-think of AppShell's transition layer
  (ONE idiomatic route transition; the bloom-find-child hack + the two no-op VT watchers
  removed) — the gate is born-RED on the current 3-Transition collision.
- **Files:** `tests-visual/route-navigates.spec.ts` (new), `scripts/proof-route-navigates.mjs`
  (the sentinel + headless runner), `gates.mjs` (enroll `["local","ci","release"]`).
- **π bar:** old-page-gone + single-child `<main>` + new-heading-present over ≥6 hops, both
  modes. **Folds:** the BB/AZ "source-green/visually-broken" chronic for the routing axis.

### BG.W-GATE-FIELD-AURORA — a no-metallic-field gate keyed to the new directive
- **Intent:** enforce "every page has an aurora, not a metallic paper wash."
- **Approach:** retire the `.paper-field` conic/radial/feTurbulence cascade (`paper.css`)
  as the page field (clean break, no alias); the gate (a) device-free: assert `paper.css`
  carries NO `conic-gradient` cel-sheen + no >1 high-chroma radial on the universal field +
  the grain-tooth opacity ≤ a calm floor; (b) live: a probe over a FULL-PAGE background
  region (not the dock plate) asserting the field reads the warm-aurora hue band with a
  bounded chroma CEILING (the metallic sheen exceeds it) — the missing upper-chroma + hue
  band RC3 names. Reconcile the one-GL-per-route budget: a shared offscreen-paused `<Aurora>`
  field (the `DockStage` pattern generalized to the page shell).
- **Files:** `src/styles/paper.css`, `src/components/custom/paper-backdrop/PaperBackdrop.vue`,
  `demo/layout/AppShell.vue`, `scripts/proof-field-aurora.mjs`,
  `tests-visual/field-aurora.spec.ts`. **π bar:** full-page field reads aurora-hue,
  chroma ≤ ceiling, no conic sheen, one GL context, offscreen-paused. **Folds:** defect #2,
  the red/maroon cast probe (#3, via the page-region probe).

### BG.W-GATE-PREVIEWS-RENDER — a gate that previews are LIVE real components
- **Intent:** kill the frozen-still / tiny-icon category cards; enforce live component previews.
- **Approach:** the category card hosts a LIVE mini-render of a real component (the user
  directive), not a `FROZEN STILL` (`SectionLanding.vue:51`) or a bare icon. Gate (a)
  device-free: `SectionLanding.vue` mounts a real component per category (no frozen-still
  branch, no icon-only fallback); (b) live: a probe over the preview region asserting
  non-empty, non-skeleton, content-bearing pixels (variance above a floor) for every
  category card. **Files:** `demo/stories/SectionLanding.vue`, `demo/stories/manifest.ts`
  (per-category live preview spec), `scripts/proof-previews-render.mjs`,
  `tests-visual/previews-render.spec.ts`. **π bar:** every category card paints a live
  content-bearing preview, both modes. **Folds:** defects #6, #11.

### BG.W-GATE-UNIFORM-BLUR + structural pixel predicates — widen the probe vocabulary
- **Intent:** give the pixel layer the predicates RC3 says it lacks (uniform blur, no cast,
  corners clip, no top bar, hue band).
- **Approach:** extend `reflect-capture-verify.mjs pngRegionStats` with structural readbacks
  the roster can express: (a) `meanHue=lo..hi` (a warm-amber hue band, not just chroma); (b)
  a `chromaCeiling` (kills the red cast + metallic sheen); (c) an EDGE probe (a thin band
  OUTSIDE a plate's bounding box must read the field, NOT a red drop-shadow — the cast test);
  (d) a y=0 strip probe (no aberrative bar); (e) a corner-clip probe (a card's top corner
  reads field, not opaque rect). ONE decoder leaf (the canvas-unify discipline). The roster
  rows gain these axes. **Files:** `scripts/reflect-capture-verify.mjs`,
  `scripts/proof-ba-gestalt.mjs` (parse the new axes),
  `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (new rows with the axes).
  **π bar:** the self-test bites for each new predicate (a synthetic red-cast/metallic/
  top-bar capture must RED). **Folds:** defects #3, #5; RC3.

### BG.W-GESTALT-ROSTER-RE-POINT — execute the deferred grow + WIDEN the watched surface
- **Intent:** un-freeze the keystone (F1) and close the self-certified-narrow-whitelist hole (F2).
- **Approach:** mint `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md`; re-point the 4
  gate consts (`proof-ba-gestalt.mjs:70-73`) BC→BG; re-label G6 BC→BG; G8 scans BG waves.
  CRITICAL widen: a surface's `surface-paths` MUST be DERIVED, not author-declared — compute
  it as the transitive paint-source set for the surface's routes (the CSS/SFC/router files
  the route renders), so paper.css/AppShell/SectionLanding land in the watched set
  automatically. A surface whose route renders a file NOT in its surface-paths → RED (close
  the self-cert loop). The fresh capture set is BG-dated and re-pixel-read. **Files:**
  `scripts/proof-ba-gestalt.mjs`, `scripts/reflect-capture-verify.mjs` (the derived-paths
  helper), the BG reflect dir. **π bar:** the BG roster is fresh + the derived-surface
  completeness self-test bites (a route file outside surface-paths REDs). **Folds:** F1
  (the un-executed `BD.W-GESTALT-ROSTER-GROW`), F2, RC1.

### BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION — make "pixels painted" a tag precondition
- **Intent:** sever RC2 — the release tag cannot ship until a live-render battery passes.
- **Approach:** add a `release`-eligible LIVE close arm that runs the `--run pi` enrolled set
  (incl. the new routing/field/previews gates) against a served demo on the close machine,
  BEFORE the irreversible tag, and records the DELTA. The ledger stays the CI backstop, but
  the TAG gains a live-render precondition (the close machine has a browser; the BD close ran
  on a Mac). Forbid the "re-capture to flip the keystone green" path: a gestalt PASS that only
  re-stamps an existing capture without a corresponding paint-source diff REDs (an anti-evasion
  bite — F9's shortcut becomes mechanically impossible). Run `gates.mjs --run full` siblings-
  AND-precepts-submodule-absent (the CI-accurate close BD specced but skipped). **Files:**
  `gates.mjs` (a `--run ship` arm + the live precondition), `release.sh`, `release.yml`,
  `scripts/proof-close-battery-parity.mjs` (extend to assert the live arm ran).
  **π bar:** the close-battery-parity self-test reds a `--run local`-only or re-stamp-only
  close. **Folds:** F9, RC4, the "close must run the real battery" cardinal lesson.

---

## SUMMARY OF THE GAP + HOW BG CLOSES IT

The battery was green because (1) the keystone PAINT gate read a frozen prior-tranche roster
(F1), (2) its freshness/probe/scope are all author-self-certified and narrow (F2/F3/RC1),
(3) the only live-pixel layer is severed from the shipping tag and half of it freezes the
field via reducedMotion (F5/RC2), (4) the backstop ledger proves paperwork not render (F6),
and (5) the defects' files/routes/regions are watched by nothing (F7/F8). The BD close then
flipped the keystone green by re-shooting the frozen captures rather than executing the
specced roster-grow (F9/RC4). BG closes the gap with three live render gates the defects
WOULD have tripped (routing-navigates, field-aurora/no-metallic, previews-render), a widened
structural pixel vocabulary (uniform-blur/hue-band/edge-cast/top-bar/corner-clip), a
DERIVED-surface roster re-point that ends author-self-certification, and a ship discipline
that makes "pixels actually painted" a precondition of the tag with an anti-re-stamp bite.
