# BI.W-GRADED-BACKDROP — the progressive-backdrop halo EXPERIMENT (adopt-or-defer; one box-following mechanism)

Band B2 (glass taxonomy; overlay-owned surface). MINTED 2026-07-16 at the glass-subtlety triumvirate pass
(BI-addenda; RESEARCH → HARDEN → TRANCHE-WRITE, two-consecutive-clean). The user's 2026-07-16 directive to
*experiment with a gradient-blurring backdrop for popups and modals and judge its effectiveness* had NO
owning wave — the shipped Q023 side-sheet graded edge is per-edge/inset-within only; nothing generalizes it
to center modals or popups, and nothing owns the experiment's adopt/decline judgment. Sources of record:
`…/reports/glass-subtlety/research.md` (RESEARCH arm, lineage) + `…/glass-subtlety/harden.md` (HARDEN arm,
NORMATIVE — the prior-art over-claim struck on two counts, the radial/linear dual path removed, the plate
cost made honest, the ink source corrected, the experiment sequenced pre-freeze-or-defer). The hardened
contract below is the terminal execution specification; RESEARCH is lineage, not a broader license.

**Citation currency.** Re-verified against real HEAD `ca23d54f` (the task/research cite the stale
`e7da7b5c`): the shipped Q023 graded edge (`placement.css:79-135` — host `backdrop-filter: none` at :90,
the graded child `blur(calc(40px*--glass-level))` at :106, `mask-image: linear-gradient(…)` at :108, and
the dimming `background: color-mix(in oklab, var(--glass-bg-overlay) …%, transparent)` at :101-104 — NOT
`--overlay-scrim`), the dialog default `stage="none"` (`DialogContent.vue:59`) and the 1px wash scrim
(`ModalOverlay.vue:67`), the immersive 16px stage scrim (`drawer/styles.css:371`). Line numbers RE-PINNED
at execution (PROCESS-CODEX §3); file+symbol durable.

## §Wave shape — why this is a SEPARATE wave (the split argued in BI.W-GLASS-SUBTLETY §Wave shape)

This is Contract 3 of the glass-subtlety triumvirate, split from Contracts 1+2 (`BI.W-GLASS-SUBTLETY`) on
merit. The bright line: Contracts 1+2 are **freeze-ready** (they ship in immutable Glass 7 unconditionally);
this is an **experiment with a live decline path** whose deliverable is "the experiment + the recorded
judgment (+ the API iff adopted)" — **adoption is NOT presumed**. Its lifecycle is categorically different:
it must **resolve pre-freeze or defer entirely** (harden C-TAG — you cannot freeze an experimental
`data-backdrop` public API into an immutable major). It also owns a live **cross-dependency** with the
already-minted `BI.W-ENGAGE-AFFORD` (whose coarse-pointer slider modal consumes the graded surface and must
coordinate the token name) and with the shipped Q023 side-sheet — it needs a clean named owner. Bundling it
into the 7.0.0 recalibration would weld a maybe-declined experiment to a must-ship identity cut, the exact
process-coupling PROCESS-CODEX warns against. It is its own wave.

## §Intent — the user directive, quoted (+ the reference reframe)

User directive (2026-07-16), verbatim:

> "The background blur could be made a bit better… our popups and modals should likely have something like
> this gradient blurring effect — let's experiment with it and judge the effectiveness and design thereof."

Reference media (read in full):
`…/reports/glass-subtlety/refs/openai-popup-1.png` + `…/openai-popup-2.png` (**a ChatGPT-APP treatment, NOT
OS canon** — the codex catalogs it as IMG_2287/2288: the "5.6 Sol High / Extra High" segmented popup reads as
a **dark focus-pool that hugs the surface and dissolves outward** — content immediately behind the popup is
de-emphasized while the far page stays legible. The de-emphasis is **substantially a graded DIM** (an
edge-anchored scrim, **co-equal with the blur** — see ADOPT-1), and the blur itself is a **UNIFORM-radius
plate** whose localized-focus READ is produced by the mask + the graded dim — **not a graded blur kernel**
(§Provenance corrected below, `:70-76`). The plate is barely-there; the drama is the graded backdrop),
`…/current-dialog.png` (ours — one flat heavy warm-frost plate blurring the page edge-to-edge at a single
depth: context *destroyed*, not receded).

**The reference reframe (harden D0b — the strongest case for THIS wave).** `current-dialog.png`'s CONTENT is
the demo "Standard dialog" story (`dialog.vue:69-71` — "Rename workspace" / "Slug must be lowercase,
kebab-cased"), but NOT at its defaults — the two cannot both be literally true, so state it precisely: an
all-defaults dialog takes `stage="none"` + a 1px wash scrim, which renders the verified sub-perceptual wash,
NOT the ref's edge-to-edge illegibility. So the story CONTENT matches while a **non-default stage was
engaged at capture** — the ref's heavy uniform blur is the opt-in **immersive 16px stage scrim**
(`drawer/styles.css:371`) plus the scale recede, and the ref renders **bottom-anchored/full-width** (a
side-sheet / coarse-pointer signature, not a centered dialog). So the headline "context-destroying
background blur" is a **scrim/stage target — exactly this wave's territory**, and it is the strongest
adoption case: replacing the flat 16px immersive scrim with a frost-near / sharp-far bloom is roughly
cost-neutral or cheaper (most of the viewport becomes transparent beyond the bloom) AND is the effect the
ref actually shows. Build the experiment on the **immersive-stage config — the immersive Dialog OR the
coarse-pointer sheet, confirmed at the paint lane** (the ref's bottom-anchored render leaves the exact
surface open), not only the default.

An anchoring canon fact (`apple-glass.md §1.2`): apple.com's *web* dropdown is a flat `blur(20px)` — Apple
did NOT ship progressive backdrop blur to the web.

**Provenance, corrected (the borrowed-authority strike).** The prior formation asserted "the OpenAI graded
halo is the iOS-27 *OS* register" and framed this experiment as "us shipping the OS-intent progressive blur
the web SOTA skipped." The codex refutes both halves, so state it honestly:
- The reference is an **app-level surface, not OS canon.** The OpenAI "5.6 Sol High / Extra High" popup is a
  **ChatGPT APP** treatment — the codex catalogs it as IMG_2287/2288 with a **dark radial focus-pool**
  backdrop, an application's own composited effect, not an OS affordance.
- **iOS-27's OS does not ship progressive-falloff backdrop blur** either (CODEX §1.2, HL2, Open Q6): the OS
  blur is **uniform-radius**. The OS achieves its localized-focus READ via an **edge-anchored scrim + graded
  DIM at uniform radius**, not a graded blur kernel.
- **This does not weaken the wave — it corrects only the authority claim; the mechanism is codex-correct.**
  D1 already specifies a **fixed-radius** blur under a four-edge `mask-image` — a uniform blur whose READ is
  graded by the mask + the co-equal graded dim, the bloom band (~80-120px) sitting inside the corpus's
  measured ~50-180px scrim falloff. So we are matching the OS's *uniform-radius + graded-scrim/dim* READ, and
  taking an **app-level graded effect** to our overlay surfaces — judged on OUR content, not presented as OS
  canon.
- **Open Q6 reinforces adopt-not-presumed:** the reference's OS-canon status is unconfirmed, so the effect
  earns its place at the paint lane on its own merits, never by borrowed provenance.

## §Design — the hardened contract (normative)

### D1 · The single mechanism — ONE box-following four-edge composite (harden C3-ONE-PATH; drop radial)

The research proposed a **radial primary** with a **four-edge linear fallback for wide modals**, selected by
aspect ratio. HARDEN **struck it** as a latent masking fallback: an aspect-ratio-switched second mechanism
that exists to hide the first's corner-mismatch is a **dual path the laws forbid** ("primary works or fails
loud, no ladder of approximations"). And the radial is the *inferior* option — a CSS radial gradient is
elliptical, so it **cannot hug a rounded-rect modal's corners**; the frost ellipse and the modal edge
visibly disagree exactly at the border where a seam is most obvious.

**Ruling: the four-edge linear composite is the SINGLE primary** for center modals AND popups (side sheets
already use the per-edge linear form). It is box-following (it hugs any aspect ratio; **corner FIDELITY is a
paint-lane judgment, not a geometric guarantee** — four axis-aligned linear gradients overlap **additively**
at each corner, yielding a 45° diagonal blend, NOT a curve concentric with the modal's corner radius), it
is the *proven* Q023 mechanism generalized rather than a second one, and four edge-gradients blooming
outward around a rect read as an omnidirectional halo — **closer to the OpenAI look than an ellipse** (which
ignores the box outline entirely; the four-edge form follows the edges, and the corner-seam read is the
open question the ADOPT gate settles). This removes the aspect-ratio branch entirely: one mechanism, one
path, KISS-clean and law-clean. Radial is the tempting-but-worse idea; **dropped**.

The mechanism (generalizing `placement.css`'s shipped arm from per-edge/inset-within to outset-around a
centered rect):
- a non-interactive full-viewport child `<span data-slot="glass-graded-halo" aria-hidden>` between the page
  and the surface (z below the surface, above the page), `pointer-events:none`;
- `backdrop-filter: blur(var(--glass-halo-blur)) saturate(var(--glass-saturate-overlay))` — ONE plate; the
  `-webkit-backdrop-filter` pair is build-injected (the `vite.style-assets.ts` ladder prefix pass; source
  stays unprefixed);
- `mask-image:` a **four-edge linear composite** — one gradient per side, each `black` at the surface edge
  fading to `transparent` at the surface-extent + bloom band (~80-120px). Frost holds full over/at the
  surface edge and eases to sharp page outward;
- `background:` the dimming on the **same** four-edge geometry — `color-mix(in oklab, var(--glass-bg-overlay)
  <stops>, transparent)` (**the proven Q023 ink**, harden §3.3 correction — NOT `--overlay-scrim`, which is
  a separate warm-near-black family the shipped arm never uses);
- disabled under `@media (prefers-reduced-transparency: reduce), (forced-colors: active)` (the a11y arm,
  same as Q023);
- **No `backdrop-filter: url()`** anywhere — plain `blur()+saturate()` under a `mask-image`, the fully
  cross-engine floor.

Where the mask alpha is partial, a fixed-radius blurred layer composites at partial alpha over the sharp
page — a cross-fade between frosted and sharp that reads as a smooth bloom. Keep the transition band tight
(~80-120px) so the partial-alpha zone does not double-image.

### D2 · What the prior art does and does NOT prove (harden C3-PRIOR-ART — the two unproven counts)

The shipped Q023 side-sheet edge proves the **primitive** (`blur()+saturate()` under `mask-image`, no
`url()`) is cross-engine. It does **NOT** prove the two things this wave newly needs — the wave may claim
only the primitive, and MUST stress the two new counts on Safari:
1. **Geometry: inset-within ≠ outset-around.** Q023's edge is `inset:0; border-radius:inherit` *inside the
   sheet's own box*, grading the sheet's own frost inward and sampling the page *behind the sheet*. It does
   NOT blur the page *around/beyond* the surface. The outset-around-a-centered-rect mask geometry is **NEW
   and unproven**.
2. **Nesting: Q023 sets the host `backdrop-filter: none` precisely to be a SINGLE sampler.** A center-modal
   halo is a full-viewport backdrop plate with the **modal's own floating backdrop-filter stacked on top** —
   a **nested/stacked backdrop-filter**, which the prior art deliberately never exercises and which is the
   historically Safari-fragile case (an inner filtered element sampling a filtered ancestor has a WebKit bug
   lineage).

The Safari stress on **outset seam + nesting** is a hard **pass/fail decline gate** (§Experiment), not a
nicety.

### D3 · Plate-count cost — honest (harden C3 §3.3; "Δ0 plates" is true for count, misleading for cost)

- **Default center dialog:** scrim `blur(1px)` wash (~free) + dialog floating plate = 2. Graded halo:
  viewport `blur(11px)+mask` (NOT free) + dialog floating = 2. **Δ0 count**, but the scrim goes from
  1px-viewport (~free) to 11px-viewport-with-mask, and the two plates now **NEST** (the modal re-samples the
  halo). On the mobile GPU the ref is captured on, a full-viewport masked backdrop re-rasterized per frame
  over the live WebGPU canvas is a genuine Q003 cost — a net *increase* on the default modal path.
- **Immersive stage (the ref's real config):** scrim `blur(14px)` flat (post-recalibration) + dialog. The
  graded halo REPLACES the flat scrim with a frost-near / sharp-far bloom → roughly cost-neutral or cheaper
  (most of the viewport becomes transparent beyond the bloom). **This is the strongest case and the one the
  ref shows** — build here first.
- **Popovers:** +1 plate, no scrim to swap; stacked submenus → +N. **Default-DECLINE the popover halo.**
  Only the modal scrim-swap is a Δ0-count candidate. A popover earns a halo only if it clears the 60fps
  frame budget (`tests-visual/nested-backdrop-budget.spec.ts` + a manual frame trace) over the live aurora on
  a **mid mobile GPU** — not on a desktop.

Contract 1's radius drop (`BI.W-GLASS-SUBTLETY`) makes every plate cheaper, partially offsetting — but the
default-modal scrim was already ~free, so the halo is a net increase there. The immersive path is where it
pays.

### D4 · Tokens / API (the opt-in surface — minimal)

A **`backdrop` axis** on overlay surfaces (mirrors the existing `surface` axis), not a new component:
- `data-backdrop="scrim"` — today's flat scrim (default; byte-identical to now — the no-op floor).
- `data-backdrop="graded"` — the halo. The **immersive Dialog** opts in first; popovers only explicitly,
  default-declined.
- Generalize the existing `data-slot="dialog-graded-edge"` to `data-slot="glass-graded-halo"` (the four-edge
  composite; side sheets keep their per-edge form via the existing direction knob).

Tokens (new, minimal — bounded, `:root`-overridable per presets-in-consumers):
- `--glass-halo-blur` — the halo blur radius. Default = the recalibrated overlay rung (11px), OR the
  recalibrated deep-frost endpoint (34px, from `BI.W-GLASS-SUBTLETY` row 10) for a dramatic OpenAI-like
  frost; the experiment picks which.
- `--glass-halo-core` — the extent out to which the frost holds full (≈ the surface half-extent).
- `--glass-halo-bloom` — the extent at which the frost reaches zero (surface half-extent + ~120px).
- Dimming reuses the proven `color-mix(in oklab, var(--glass-bg-overlay) …)` ink (no new ink family).

Overfitting bar: every new `--glass-halo-*` token has ≥2 opt-in sites (the immersive Dialog + the
ENGAGE-AFFORD slider modal at minimum) or is held until a second consumer arrives; the `backdrop` axis is a
first-class public API iff adopted, never a demo helper.

## §EXPERIMENT protocol — adoption is an OUTCOME, not a precondition

The user asked to *experiment and judge*. This wave **defines the judgment; it does not presume adoption.**

**Build behind a demo knob** (one story/configurator variant; no new route):
- `data-backdrop: scrim | graded` on **(1) the immersive Dialog** (the ref's real config — build here
  first) and **(2) one Popover/DropdownMenu**, over the live aurora substrate;
- the single four-edge composite (NO radial branch);
- captured in **both** schemes and on **both** Chrome and Safari, plus a **mobile-GPU frame capture** (the
  ref and the risk are mobile).

**ADOPT iff (all hold):**
1. **Localized-focus read — blur AND dim, co-equal.** Content immediately behind the surface reads clearly
   de-emphasized while the far page stays legible — the "focus hugs, dissolves outward" read, distinct from
   today's flat full-screen frost. **The graded DIM is co-equal with the blur in this read, not subordinate
   to it:** the codex reads the reference as *substantially a dim* (an edge-anchored graded scrim), so D1's
   `color-mix(in oklab, var(--glass-bg-overlay) …)` dim on the SAME four-edge geometry (D1 `:100-104`) is a
   first-class arm of ADOPT-1, judged as the blur+dim composite — a de-emphasis that reads primarily off the
   graded dim (blur near-flat) is a legitimate adopt, not a blur failure.
2. **Clean bloom, no ghost — incl. corner fidelity.** The cross-fade transition band reads as a smooth
   graded blur, not a muddy double-image — **and the corners hold.** The four axis-aligned gradients overlap
   additively there (a 45° diagonal blend, not a curve concentric with the modal's corner radius), so read
   the corner seam explicitly: if the additive-corner frost reads as a visible mismatch against the
   rounded-rect corner, the geometry does not hold → tighten the band or DECLINE.
3. **Plate-count honored.** The immersive-modal scrim-swap stays Δ0-count and holds frame budget; the
   default-modal path's net-increase and any popover halo clear the 60fps frame budget
   (`tests-visual/nested-backdrop-budget.spec.ts` + a manual frame trace) over the live canvas on a mid mobile GPU.
4. **Cross-engine parity — the hard gate.** The masked backdrop renders equivalently on Chrome and Safari,
   INCLUDING the **outset-around seam** and the **nested halo+modal** (D2). A halo that mis-composites on
   Safari and silently flattens to a Chrome-only effect is a **no-masking-law violation → DECLINE** (do not
   ship a Chrome-only halo).
5. **Both schemes** read correct (light + dark), dimming subtle in both.

**DECLINE if:** the cross-fade ghosts/muddies irrecoverably; or Safari mis-renders the masked backdrop /
the nested composite / the outset seam; or the popover halo hurts frame budget and modals-only is judged too
narrow to be worth the API; or side-by-side it reads gimmicky next to the (now-quieter, Contract 1) flat
scrim.

**On decline — the decline-residual, stated honestly (repair S3-residual).** The user's HEADLINE complaint
is the *context-destroying background blur*, which the ref shows as the immersive 16px scrim. On decline,
the ONLY thing that remains on that exact surface is `BI.W-GLASS-SUBTLETY` row 9's **16→14 scrim reduction —
a 2px drop**, which does NOT resolve "the background blur destroys context." So "Contract 1 already quieted
the modal" **overstates** a 2px change: the headline fix rides **substantially on this experiment adopting**.
If this declines, the still-heavy immersive scrim is NOT implicitly handled — route it to a **named follow**
(`BI.W-IMMERSIVE-SCRIM`, a booked follow to redesign or further quiet the flat immersive scrim, not minted
this pass), with the recorded decline reason. The flat scrim stays in the interim, and the recorded reason
ships with the wave. The honest escalation if a single clean mechanism cannot read is **stacked masked
bands** (a true stepped-radius at +plate cost, declared loud) — never a silent radial/aspect swap.

**Deliverable = the experiment + the recorded judgment (+ the token/attribute API iff adopted).**

## §Cross-dependency (sequencing stated)

- **`BI.W-ENGAGE-AFFORD` (minted) — the token-name coordination.** ENGAGE-AFFORD's coarse-pointer slider
  modal (`useEngageModal`) sits over a graded backdrop and its §CROSS-DEPENDENCY explicitly asks to
  "coordinate the graded-backdrop token NAME with the concurrent glass-subtlety wave before either lands."
  **This wave IS that owner.** Agree the token name (`--glass-halo-*` / `data-slot="glass-graded-halo"`)
  before either lands. If this experiment DECLINES, ENGAGE-AFFORD falls back to the plain `.glass-reveal`
  scrim (its stated no-masking fallback) — the decline does not block ENGAGE-AFFORD.
- **Q023 (shipped) — the static side-sheet surface.** Q023 built the static graded sheet-edge and DECLINED
  only the *animated* asymmetric backdrop-blur engage ramp. This wave CONSUMES/generalizes the static
  surface; it designs NO blur ramp, parallel clock, or radius animation, and does NOT reopen Q023's declined
  animated register. The side-sheet's own blur value (40→34) is recalibrated by `BI.W-GLASS-SUBTLETY` row 10
  — read that recalibrated endpoint here.
- **`BI.W-GLASS-SUBTLETY` — the baseline.** The halo is judged against the *already-quieted* flat scrim
  (Contract 1), so build this after the recalibration lands (or judge both baselines side-by-side).

## §Consumer census

**No forced consumer impact.** `data-backdrop` defaults to `scrim` = byte-identical to today; an un-opted
surface is unchanged. atlas/slides/sci-report are unaffected until a surface opts in. If adopted, it is
additive (new opt-in axis + tokens, no rename, no break). Censused: zero adverse shift.

## §Work — the manifest (exact files; RE-PIN at execution; ONLY if the experiment ADOPTS)

**Experiment scaffold (always — behind the demo knob):**
- `demo/stories/containers/dialog.vue` (+ a popover story) — a `backdrop: scrim | graded` toggle on the
  **immersive** Dialog + one Popover, over the live aurora; both schemes; the mobile-GPU capture target.

**Adopted surface (iff ADOPT):**
- `src/components/dialog/placement.css` (or a sibling `glass-graded-halo` home) — the four-edge composite
  generalized from the shipped inset-within arm to outset-around; the `data-slot="glass-graded-halo"` child.
- `src/styles/tokens/glass.css` (or `glass-fx.css`) — the `--glass-halo-blur/-core/-bloom` cohort (bounded,
  `:root`-overridable); dimming reuses the `--glass-bg-overlay` mix.
- `src/components/dialog/DialogContent.vue` + the overlay surface — the `data-backdrop` axis plumbing
  (default `scrim`; `graded` opts the immersive Dialog in first).
- `MIGRATION.md` (`## 7.0.0 (unreleased)`, additive) — the `data-backdrop` axis + `--glass-halo-*` cohort as
  a new opt-in public surface (default `scrim` = byte-identical). ONLY if adopted before the freeze.

**Focused tests** (iff adopted; ordinary vitest):
- `tests/components/dialog/graded-backdrop.test.ts` (NEW) — the `data-backdrop="graded"` surface mounts the
  `glass-graded-halo` child with a four-edge mask; `data-backdrop="scrim"` (default) is byte-identical to
  today; the reduced-transparency arm disables the halo. BORN-RED at HEAD (no axis exists).

**If the experiment DECLINES:** the deliverable is the recorded judgment (the DELTA below) + the decline
reason. No source lands; no API is minted; the flat scrim stays.

## §Acceptance

Gate ruling (user, 2026-07-16 — binding): NO minted proof/gate script, no census tool, no CI line. Standing
checks = the dev toolchain only. The Q003 60fps frame-budget fence — the EXISTING check the halo answers to
over the live aurora, NOT a new mint — survives on disk as `tests-visual/nested-backdrop-budget.spec.ts`
(the `proof:*` npm namespace is abrogated; `proof:nested-backdrop-budget` is that spec's retired name, so the
operational path is the surviving spec + a manual DevTools 60fps frame trace, never a new gate).

- **`vue-tsc` + `npm run build`** — iff adopted, the `data-backdrop` axis + `--glass-halo-*` tokens type and
  emit clean; the subpath-export policy rides the build.
- **Focused `vitest`** — iff adopted, the graded-backdrop test BORN-RED → GREEN; the default-scrim
  byte-identity assertion guards the no-op floor.
- **The recorded judgment** (adopt or decline) is the wave's terminal deliverable — the paint verdict at
  Q002/Q003, never CI.

## §π/DELTA — native-verification debt (the experiment IS the visual sweep; the judgment rides the browser queue)

Not unit-provable — the whole wave is a paint judgment. Recorded as debt on Q002/Q003:
1. **The immersive Dialog** `backdrop: scrim | graded` over the live aurora, both schemes, Chrome + Safari
   + a **mobile-GPU frame capture** — read the localized-focus (ADOPT-1), the clean bloom (ADOPT-2), and
   critically the **Safari outset seam + nested halo+modal composite** (ADOPT-4, the hard decline gate).
2. **One Popover** `backdrop: graded` — the +1-plate cost against the 60fps frame budget
   (`tests-visual/nested-backdrop-budget.spec.ts` + a manual frame trace) on a mid mobile GPU (default-declined
   unless it clears).
3. Side-by-side the graded halo vs the (Contract-1-quieted) flat scrim — the "no better than flat" decline
   check.
- DELTA: `docs/tranches/BI/audit/visual/W-GRADED-BACKDROP-DELTA.md` — carries the adopt/decline verdict, the
  Safari-composite screenshots, and the mobile-GPU frame trace. **This DELTA, resolved, is what gates whether
  the wave rides 7.0.0 or defers.**

## §Obligations

- **The experiment MUST conclude before the 7.0.0 freeze** (harden C-TAG) — an experimental `data-backdrop`
  public API cannot be frozen into the immutable major half-baked. If it cannot conclude in time, **defer the
  whole wave** (it is additive and can wait); Contracts 1+2 ship 7.0.0 without it.
- Coordinate the token name with `BI.W-ENGAGE-AFFORD` before either lands; if declined, ENGAGE-AFFORD uses
  its `.glass-reveal` fallback.
- Read the recalibrated side-sheet deep-frost endpoint (40→34) from `BI.W-GLASS-SUBTLETY` row 10.
- Build the experiment on the **immersive-stage config** (the immersive Dialog OR the coarse-pointer sheet —
  the ref renders bottom-anchored/full-width; confirm the exact surface at the paint lane), not only the
  default.
- If the experiment DECLINES, the headline "context-destroying blur" is left with only row 9's 2px scrim
  reduction — route the still-heavy immersive scrim to the booked `BI.W-IMMERSIVE-SCRIM` follow (§EXPERIMENT
  decline-residual), do not treat it as implicitly handled.
- A fresh `npm run build` before any `/dialog` `.d.ts` surface claim (iff adopted).

## §Dispositions

- **The graded-backdrop halo: EXPERIMENT — adopt-or-defer, adoption NOT presumed.** The single four-edge
  box-following composite is BUILT behind a demo knob and JUDGED; the API + tokens land iff the judgment
  adopts before the freeze.
- **Radial mechanism: STRUCK** — elliptical, cannot hug a rounded-rect, and the aspect-ratio branch is a
  latent masking fallback (harden C3-ONE-PATH). One box-following mechanism only.
- **Popover halo: DEFAULT-DECLINE** — earns its +1 plate only against the Q003 mobile-GPU budget; modals-only
  is the Δ0-count candidate.
- **Ink source: `--glass-bg-overlay` mix** (the proven Q023 ink), NOT `--overlay-scrim` (harden §3.3
  correction).
- **Safari nested/outset mis-composite: HARD DECLINE GATE** — a Chrome-only halo that flattens on Safari is a
  no-masking-law violation; decline rather than ship it.
- **Decline-residual: NAMED, not implicitly handled (repair S3-residual)** — if the experiment declines, the
  headline "context-destroying background blur" is addressed ONLY by `BI.W-GLASS-SUBTLETY` row 9's 2px scrim
  reduction (16→14), which does not resolve it; the residual still-heavy immersive scrim routes to a booked
  follow (`BI.W-IMMERSIVE-SCRIM`). The headline fix rides substantially on this experiment ADOPTING — that
  is stated, not glossed.
- **Q023's declined animated backdrop-blur engage register: NOT REOPENED** — this wave is the static graded
  surface generalized; the animated ramp stays declined (its second-consumer signal has not arrived).

## §Tag-sequencing ruling (harden §6, C-TAG — the decisive constraint)

**SEQ: build POST (net-new opt-in surface, re-pin at execution) · judge PRE-TAG (the Q002/Q003 Fable lane) ·
ride 7.0.0 ONLY IF the experiment resolves to ADOPT before the freeze, else DEFER entirely.** You cannot
freeze an experimental public API into an immutable major. Nothing here delays pinned consumers (6.x/3.x are
untouched; the axis defaults `scrim` = byte-identical). If the experiment adopts, it is additive in 7.0.0; if
it declines or cannot conclude pre-freeze, it defers to a later minor/major with the recorded reason — and
Contracts 1+2 (`BI.W-GLASS-SUBTLETY`) ship 7.0.0 on their own regardless.

## §Implementation model note (the standing split)

Opus IMPLEMENTS the single four-edge mechanism behind the demo knob (and the adopted surface iff the
judgment adopts); Fable JUDGES the effectiveness and design at the pre-tag paint lane (Q002) + the native
batch (Q003) — the adopt/decline decision is Fable's, evidenced by the §π/DELTA artifacts (captured Safari
composite + mobile-GPU frame trace), never a commit-message claim (the paint-claim inflation class,
PROCESS-CODEX §3). Adoption is an outcome the browser queue returns, not a formation presumption.

## §Two-challenge gate note

Converged two-consecutive-clean under the triumvirate dispatch (PROCESS-CODEX §5): RESEARCH (unknown grade →
read-only survey of the shipped Q023 graded edge, the iOS-27 OS register, the Q003 plate mechanism, the
references) → HARDEN (suspicious grade → refute-default). HARDEN **REFUTED/CORRECTED four fronts**: (1) the
"prior art proves it cross-engine" claim is **overstated on two counts** — inset-within ≠ outset-around
(new geometry) and Q023 is a single sampler while a center halo NESTS (new, Safari-fragile) — both must be
explicitly stressed on Safari; (2) the **radial-primary + linear-wide-modal fallback is a latent masking
fallback** (aspect-ratio-switched dual path) AND radial is the inferior mechanism (elliptical, cannot hug a
rounded-rect) — **struck for one box-following four-edge composite**; (3) the **plate cost is honest** — Δ0
count but a net increase on the default modal path (+full-viewport masked plate + nesting on mobile GPU), the
immersive path the only cost-neutral one; (4) the **ink source is `--glass-bg-overlay` mix**, not
`--overlay-scrim`. HARDEN CONFIRMED the primitive is cross-engine, the experiment protocol, and the
opt-in/default-scrim floor. The TRANCHE-WRITE arm split this from Contracts 1+2 on the freeze-ready vs
adopt-or-defer line, named the `BI.W-ENGAGE-AFFORD` token-name coordination it owns, ruled the immersive
Dialog the first build target (the ref's real config), and folded the hardened contract as the normative
spec. The **FORMATION-REPAIR pass (design seat, round 1)** then: **restated the D0b config muddle** (the
ref's content matches the story but a non-default stage was engaged at capture; the ref renders
bottom-anchored/full-width = a sheet/coarse-pointer signature, so the first build target is softened to "the
immersive Dialog OR the coarse-pointer sheet, confirmed at the paint lane"); and **stated the
decline-residual honestly** — on decline the headline "context-destroying blur" is left with only row 9's
2px scrim reduction, so the headline fix rides substantially on this experiment adopting, and the still-heavy
immersive scrim routes to the booked `BI.W-IMMERSIVE-SCRIM` follow rather than being glossed as handled.

The **FORMATION-REPAIR pass (design seat, round 2)** then closed the r2 SHOULD-FIX **retired `proof:*` gate
nomenclature**: every `proof:nested-backdrop-budget` reference is reworded to the surviving
`tests-visual/nested-backdrop-budget.spec.ts` (+ a manual DevTools 60fps frame trace), since the `proof:*` npm
namespace is abrogated (no `proof:*` script, no `proof/` dir) — the substantive claim ("the EXISTING frame-budget
check, not a new mint") was true but named stale, and the reword removes the mild self-contradiction with the
"NO minted proof/gate script" line while keeping ADOPT-3 executable via the surviving spec. No third challenge is
owed on substance; the round-2 repair closed the fault with source-line evidence and the two-clean law resets to
one confirming pass.

The **CODEX-INFORMED round (round 3, gestalt+codex confirm → FAULTED narrow → repaired)** struck a
**borrowed-authority provenance claim**: §Intent asserted the OpenAI graded halo was "the iOS-27 OS register /
us shipping the OS-intent progressive blur," which the measured corpus refutes — iOS-27 OS blur is
**uniform-radius, never progressive falloff** (CODEX §1.2, HL2, Open Q6), and the reference is a **ChatGPT
APP surface** (the codex's own IMG_2287/2288, read as "a dark radial focus pool"). The repair reworded
§Provenance (`:67-83`) to the four-point honest account (app surface, not OS canon; the OS's graded READ =
edge-anchored scrim + graded dim at uniform radius — which D1's fixed-radius-under-mask mechanism matches,
band ~80-120px inside the corpus's measured ~50-180px; Open Q6 reinforcing adopt-not-presumed) and gave the
graded DIM co-equal billing in ADOPT-1. The r3 confirm verified the reword faithful in BOTH directions (no
residual borrowed authority; no reverse-overclaim of codex endorsement) — the mechanism was codex-correct
throughout; only the authority claim was borrowed.

The **FORMATION-REPAIR pass (design seat, round 4)** then closed the carried SHOULD-FIX in the reference-media
descriptor: the §Intent descriptor **led with graded blur** ("blurred to illegibility… eases smoothly to
sharp", dimming subordinate — "subtle dimming rides the same gradient"), which contradicted the wave's own
corrected §Provenance (`:70-72` "a dark radial focus-pool", an app treatment; `:76` "not a graded blur
kernel") and ADOPT-1's **co-equal dim**. Reworded to **lead with the dim / focus-pool read** and treat the
blur as the **uniform-radius plate component** (its graded READ produced by the mask + the graded dim), and
the "**iOS-27 —**" prefix re-framed to **app-not-OS** ("a ChatGPT-APP treatment, NOT OS canon", IMG_2287/2288)
so the §Intent lead no longer front-runs the correction that follows it. Prose-only, no design/mechanism
change (D1 already specifies the uniform-radius blur + graded mask + co-equal dim); the two-clean law resets
to one confirming pass.
