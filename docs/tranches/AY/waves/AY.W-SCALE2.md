# AY.W-SCALE2 — Form-atom touch-hit-area utility + the REAL touch-target axe gate

**Repo:** glass-ui · **State:** OPEN · **Band:** A (perfection) · **Letter:** AY

Hardening inputs: `audit/hardening/H-touch-scale.md` (Findings 2, 4, 5, 6 + convergence
criteria 2/4/5), `audit/hardening/H-a11y-perf.md` (H-5), `audit/hardening/H-overfitting.md`
(Finding 5 — the `proof:touch-target` named-but-absent gate).

---

## Goal criterion

Every interactive FORM ATOM that paints below the 44px WCAG-2.5.5 floor on a coarse
pointer — Switch, Checkbox, RadioGroupItem, the Slider thumb, the TagsInput item +
delete-X, the MultiSelect remove-X — acquires a ≥44px pointer-receptive hit-rect WITHOUT
ballooning its visual size, through ONE shared coarse-gated `@utility touch-hit-area`
(the timeline `::before` overlay pattern generalized; ≥2 consumers; keyed off the
EXISTING `--touch-target` token, no fourth floor token minted). The raw `text-sm`/`text-xs`
literals on TagsInput/MultiSelect re-point onto the comfort axis (`--control-text` /
`--control-text-sm`). And the gate the plan has always named but never possessed —
`proof:touch-target` — becomes a REAL artefact: a Playwright spec that mounts the live
control gallery at a coarse/touch emulation, asserts ZERO axe `target-size` violations
(best-effort secondary), and binds on a deterministic getComputedStyle hit-rect readback
≥44px for every atom (the artefact-valid primary).

## Completion criterion

The HARD GATE below verifies: `npm run proof:touch-target` (a new `package.json` script,
wired into the π set) runs `tests-visual/touch-target.spec.ts` against the live demo at
the new coarse/touch Playwright project and exits non-zero on any atom whose composited
hit-rect is < 44×44 under `@media (pointer: coarse)`; the new `@utility touch-hit-area`
exists with ≥2 SFC consumers; a `grep` proves NO new fourth touch-floor literal/token was
minted (the utility reads `var(--touch-target)`); and a born-RED witness confirms the gate
bites (revert any one SFC's `touch-hit-area` compose → that atom's readback REDs).

---

## The defect (file:line grounded, verified at HEAD)

### D1 — the coarse touch floor is a 3-selector allowlist; six form atoms paint sub-44px

`src/styles/utilities.css:1163-1170` — the ONLY `@media (pointer: coarse)` touch floor in
the library targets exactly three selectors:

```css
@media (pointer: coarse) {
    [data-size="icon"],
    .expandable-container__trigger,
    .segmented-tabs__trigger {
        min-block-size: var(--touch-target, 2.75rem);
        min-inline-size: var(--touch-target, 2.75rem);
    }
}
```

Every other small interactive atom is uncovered and paints below 44px on touch — a gross
WCAG 2.5.5 (Target Size, 44×44 CSS px) failure:

| atom | site (verified at HEAD) | painted touch geometry | on `--ui-scale` axis? |
|---|---|---|---|
| Switch root | `src/components/ui/switch/Switch.vue:30` (`h-6 w-11`) | **24px high** | NO (raw `h-6`) |
| Checkbox | `src/components/ui/checkbox/Checkbox.vue:25` (`h-4 w-4`) | **16×16px** | NO |
| RadioGroupItem | `src/components/ui/radio-group/RadioGroupItem.vue:29` (`h-4 w-4`) | **16×16px** | NO |
| Slider thumb | `src/components/ui/slider/Slider.vue:224-230` (`.slider-thumb` rule; `--slider-thumb-size, 1rem` × 0.46 wide @ `:228`, `height:100%` @ `:229`) | **~7.4px wide × track-tall** | NO (own token) |
| TagsInput item | `src/components/ui/tags-input/TagsInputItem.vue:19` (`h-6`) | **24px high** | NO |
| TagsInput delete | `src/components/ui/tags-input/TagsInputItemDelete.vue:19` (host `:class` `flex …`; `<X class="w-4 h-4">` glyph @ `:21`) | **16×16px** | NO |
| MultiSelect remove-X | `src/components/ui/multi-select/MultiSelect.vue:152` (`h-3 w-3` Button) + `:155` (`h-2 w-2` glyph) | **8–12px** | NO |

NONE of these is on the legitimate-stays-small allowlist (`avatar`/`label`/`separator`/
`skeleton`/`table`/Badge-pill per CLAUDE.md glass-first canon). Switch/Checkbox/Radio are
PRIMARY input controls; the MultiSelect remove-X at 8–12px is the worst offender.

### D2 — `text-xs` raw literal is OFF the comfort axis

`src/components/ui/multi-select/MultiSelect.vue:139` (`class="text-xs px-2 py-1"`, the
selected-chip Badge) carries a raw `text-xs` Tailwind literal instead of the
comfort-scaled `--control-text-sm` cohort (`src/styles/tokens.css:1198`). It paints a fixed
font that does NOT grow on the `--ui-scale` coarse lift — redundant/off-axis under the
AX.W51 D18 system. This is the ONE confirmed D2 target at HEAD.

**Stale-cite correction (verified at HEAD):** the H-touch-scale Finding-2 table listed
`TagsInputItemDelete.vue` as carrying a `text-sm` literal. At HEAD that is FALSE —
`TagsInputItemDelete.vue:19` is `:class="cn('flex rounded bg-transparent mr-1', props.class)"`
with NO `text-sm` (the glyph is `<X class="w-4 h-4" />` at `:21`, a glyph SIZE not a font),
and `TagsInputItem.vue:19` `:class` (`'flex h-6 items-center rounded bg-secondary …'`) also
carries NO text literal. So the TagsInput text-axis re-point is a NO-OP at HEAD — DROPPED
from D2. The TagsInput atoms still need the touch HIT-AREA fix (D1), just not a text re-point.
The gate's TEXT-AXIS arm (§HARD GATE #5) asserts ONLY the MultiSelect `text-xs` re-point.

### D3 — the named `proof:touch-target` gate DOES NOT EXIST (phantom gate)

`grep -rn "axe\|@axe-core\|injectAxe\|target-size\|touch-target" package.json scripts/` →
no `proof:touch-target` script, no `scripts/proof-touch-target.mjs`, no axe-core anywhere.
`AY.md:71` (W-SCALE1) and the H-lanes name `proof:touch-target` as the hard gate — it is a
phantom. The wave cannot close on a gate that does not exist; this violates
`TRANCHE-AND-WAVE-SPEC.md:38-42` (a hard gate is valid only when verified by an artefact;
grep-only / "API exists" is insufficient for a runtime feature).

### D4 — the `--touch-target` / `--dock-touch-target` / `--control-floor` three-floor tangle

`src/styles/tokens.css:1403` `--touch-target: 2.75rem`, `:1394` `--dock-touch-target:
2.75rem` (kept distinct, retunable independently — fine), `:1184` `--control-floor` (the
clamp seam, lifted to `--touch-target` by the coarse block at `:1788`). The fix MUST thread
the SAME `--touch-target` token; a fourth literal `44px` / `2.75rem` floor grows the tangle.
This is a constraint on the fix, not a fix target.

---

## Objective (gestalt; root-not-consumer; ≥2-consumer)

**The hit-target is decoupled from the visual size.** A 16px checkbox SHOULD stay 16px
visually — the ROOT fix is a coarse-pointer hit-area EXPANSION (a `::before` pseudo inset
to ≥44px that inherits pointer-events), NOT a `min-h-[44px]` balloon and NOT per-atom
patches. The pattern ALREADY exists at `src/components/custom/timeline/ContinuousMarkers.vue:296-311`
and `SegmentedTimeline.vue:208-214` (the boundary-dot 44×44 halo). W-SCALE2 GENERALIZES it
to ONE shared `@utility touch-hit-area` that the six atoms compose (≥2 consumers, DRY, one
source). No fourth token: the utility reads `var(--touch-target)`.

1. **Mint `@utility touch-hit-area`** in `src/styles/utilities.css` — a coarse-gated
   `::before` overlay keyed off `--touch-target`, sized so the host's hit-rect reaches
   ≥44×44 regardless of the visual size. The host needs `position: relative` (the utility
   declares `position: relative` on the element itself); the `::before` is
   `position: absolute`, centred, `pointer-events: auto`, `content: ""`.

   **The robust centred-min-size form (NOT the timeline's fixed-inset form).** The timeline
   precedent (`ContinuousMarkers.vue:296-315`, `SegmentedTimeline.vue:192-216`) uses
   `inset: calc((var(--touch-target) - dot-size) / -2)` — that works there ONLY because the
   dot is a KNOWN fixed square (`--timeline-dot-size-touch`, default 20px), so the symmetric
   inset math is exact. Our atoms are NOT square and NOT a known size (a 24px-tall × 44px-wide
   Switch, a 16px Checkbox, a ~7px-wide Slider cap) — a single symmetric `inset` would
   under/over-shoot one axis. So the utility uses the size-AGNOSTIC centred overlay:
   `min-width: var(--touch-target); min-height: var(--touch-target);` +
   `top: 50%; left: 50%; translate: -50% -50%;` (no `width/height:100%` needed — `min-*`
   alone floors each axis at 44px while the overlay centres on the visual atom). This floors
   BOTH dimensions at `--touch-target` for ANY visual size, the generalization the timeline's
   known-square inset cannot do. (Record this divergence-with-rationale in the `@utility`
   doc-comment — it is the gestalt generalization, not a copy of the timeline recipe.)

   **Coarse-gating (the fine-pointer-identity invariant).** The `::before` GEOMETRY emits
   ONLY under `@media (pointer: coarse)`. Author the `@utility` so the DEFAULT (fine-pointer)
   path declares NO `::before` (or a `::before` with no box: `content: none` / unset), and a
   `@media (pointer: coarse)` block inside the `@utility` body is what mints the
   `content:""` + the `min-*`/`position`/`translate` overlay. This is the AX.W51
   fine-pointer-byte-identical invariant — a fine-pointer build emits zero overlay geometry.
   (NOTE: this is STRICTER than the timeline, whose `::before` exists at fine pointer too
   with `inset:-15px`; our utility must be coarse-ONLY so the non-regression arm — §HARD GATE
   #3 — holds: at fine pointer the atom's `::before` width/height resolve to `auto`/`0`, NOT
   a 44px box.)

2. **Compose `touch-hit-area` on the six atom SFC roots** (the ≥2-consumer satisfaction;
   six consumers):
   - `Switch.vue:30` SwitchRoot `:class` — add `touch-hit-area` (root already `relative`-able;
     add `relative` if absent).
   - `Checkbox.vue:25` CheckboxRoot `:class` — add `touch-hit-area` + `relative`.
   - `RadioGroupItem.vue:29` RadioGroupItem `:class` — add `touch-hit-area` + `relative`.
   - `Slider.vue` `.slider-thumb` rule (`:224`) — the thumb is scoped CSS, not a Tailwind
     class chain. The `<SliderThumb>` template host is at `:159-163` and ALREADY carries
     `class="slider-thumb glass-specular-track"` (`:163`). Apply the `touch-hit-area` utility
     class there (append to the `:163` class string) and let the utility own the `::before`
     — the single-source route. If the scoped-CSS `:deep`/specificity fights the utility,
     fall back to a coarse `::before` block in the scoped `<style>` on `.slider-thumb` that
     reads the SAME `var(--touch-target)` (no new token). NOTE: the standard cap is the tap
     target; the reka SliderThumb owns the value-follow inline-inset POSITION, so the
     `::before` overlay must NOT carry `pointer-events` that intercept the thumb's own drag —
     verify drag still tracks after the halo lands (the binding-verification class; a halo
     that swallows the thumb's pointer-capture is a silent drag regression).
   - `TagsInputItemDelete.vue:19` — the DELETE control is the tap target; compose
     `touch-hit-area` + `relative` on `TagsInputItemDelete`'s host `:class` (`:19`). (No
     text re-point — D2 dropped: no `text-sm` exists at HEAD.)
   - `MultiSelect.vue:152` — the remove-`Button` host; compose `touch-hit-area` + `relative`
     (the inner `Button size="sm" h-3 w-3` keeps its visual size; the halo extends the tap).

3. **Re-point the ONE raw text literal onto the comfort axis** (D2 — MultiSelect only):
   - `MultiSelect.vue:139` `text-xs` → `text-[length:var(--control-text-sm)]` (the Tailwind
     v4 idiom for a token-backed font-size; mwg `feedback_tailwind_first`), NOT a re-pasted
     rem. (The TagsInput text re-point is DROPPED — no `text-sm` literal exists at HEAD, see
     D2.)

4. **Author `tests-visual/touch-target.spec.ts`** + the new coarse/touch Playwright project
   in `tests-visual/playwright.config.ts` + the `proof:touch-target` script in `package.json`
   wired into the π set. (Detailed in the HARD GATE.)

**No fourth token (D4):** the utility and every SFC read `var(--touch-target)`. The wave
mints ZERO new floor token/literal. (Verified by the gate's no-new-token grep arm.)

**Do NOT touch (out of scope, owned elsewhere):** the φ-display ladder; the body/control
FLUID clamp (that is W-SCALE1, Finding 3); the picker menu-row floor (Finding 5 — folds
into W-SCALE1's body-ladder reconcile or a successor, NOT this wave; this wave's apply-set
is the SEVEN form atoms in the D1 table). The `--ui-scale` master + the existing
`proof:ui-scale` STRUCTURE gate stay untouched (W-SCALE2's gate is the RUNTIME arm; they
are complementary, not duplicative).

---

## Edit-sites (exhaustive)

| File | Edit |
|---|---|
| `src/styles/utilities.css` | NEW `@utility touch-hit-area` (coarse-gated `::before`, reads `var(--touch-target)`); the existing 3-selector coarse block at `:1163-1170` STAYS (it covers icon/expandable/tabs triggers — orthogonal) |
| `src/components/ui/switch/Switch.vue` | `:30` SwitchRoot `:class` += `relative touch-hit-area` |
| `src/components/ui/checkbox/Checkbox.vue` | `:25` CheckboxRoot `:class` += `relative touch-hit-area` |
| `src/components/ui/radio-group/RadioGroupItem.vue` | `:29` `:class` += `relative touch-hit-area` |
| `src/components/ui/slider/Slider.vue` | `:163` `<SliderThumb class="slider-thumb glass-specular-track">` += `touch-hit-area` (utility route) OR scoped-CSS coarse `::before` halo on `.slider-thumb` (rule at `:224`) reading `var(--touch-target)`. SHARED-FILE — see Disjointness below. |
| `src/components/ui/tags-input/TagsInputItemDelete.vue` | `:19` host `:class` += `relative touch-hit-area` (NO text re-point — no `text-sm` at HEAD) |
| `src/components/ui/multi-select/MultiSelect.vue` | `:152` remove-`Button` `:class` += `relative touch-hit-area`; `:139` Badge `text-xs` → `text-[length:var(--control-text-sm)]` |
| `tests-visual/playwright.config.ts` | NEW project `coarse-touch` — `hasTouch: true`, `isMobile: true`, a coarse-pointer viewport (390×844, iPhone-class), the same ANGLE launch args |
| `tests-visual/touch-target.spec.ts` | NEW spec (the runtime gate body) |
| `tests-visual/package.json` | `scripts` += `"test:touch": "playwright test touch-target.spec.ts --project=coarse-touch"` |
| `package.json` | `scripts` += `"proof:touch-target": "..."` (runs the spec via the tests-visual workspace) |
| `scripts/gates.mjs` | register `proof:touch-target` in the gate registry (π-tagged; fail-CLOSED-when-workspace-present, befitting-SKIP on a zero-device runner per the established π pattern) |

---

## Disjointness (shared-file contention — sequence or merge on disjoint hunks)

- **`Slider.vue` — FIVE AY writers** (W-SCALE2, W-SLD1, W-SLD2 [reads only],
  W-GLASS, W-DOCK3). W-SCALE2 appends `touch-hit-area` to the `<SliderThumb>` class
  at `:163` (or a coarse `::before` on `.slider-thumb`); W-SLD1 edits the standard
  thumb SHAPE (`:224-253`) + spectrum (`:299-322`); W-GLASS routes the thumb onto
  `--glass-level`. These are DISTINCT line ranges, but the SFC must have ONE writer
  at a time — **sequence W-SLD1 → W-GLASS → W-SCALE2** (or any serial order); do NOT
  run them in parallel. (W-SLD1 §4a already names the W-SLD1↔W-GLASS sequencing; this
  extends it to W-SCALE2.)
- **`utilities.css` — SHARED** (W-SCALE2, W-CSS1, W-MOTION, W-COLOCATE). W-SCALE2 adds
  a NEW `@utility touch-hit-area` and does NOT touch the existing 3-selector coarse
  block at `:1163-1170`. Disjoint-hunk add; the orchestrator merges.
- **`tokens.css` — READ-ONLY here.** W-SCALE2 reads `--touch-target`/`--control-floor`;
  it does NOT edit `tokens.css`. (W-SCALE1's E2 is a comment-only add at `:1189-1196`,
  also non-overlapping.)
- **`playwright.config.ts` — SOLE coarse-project writer.** W-SCALE2 owns the NEW
  `coarse-touch` project. No other AY wave adds a playwright project (W-SLD1 was
  refined to drop its stale webkit/firefox-project demand; W-LIVE1 edits the backend
  args, not the projects array). No contention.
- **`gates.mjs` / `package.json` — NEW-id add.** W-SCALE2 registers a NEW gate id
  `proof:touch-target`; many AY waves edit `gates.mjs`, but each adds a distinct id —
  disjoint registry hunks.
- **`pi-manifest.ts` — READ-ONLY (no edit-site).** The four live galleries
  (`forms/checks`, `forms/slider`, `forms/multi-select`, `data/tags-input`) ALL exist
  at HEAD (verified) and resolve via `resolveScene` off the manifest's
  router-derived scene set (`pi-manifest.ts:36-46` rebuilds scenes from
  `demo/router.ts buildRoutes`) — so NO manifest edit is needed; the spec scans these
  routes directly. If a target route is unreachable, `resolveScene` fails HARD (it
  throws the renamed-route error at `:62-64`), not a silent pass.

## HARD GATE — `proof:touch-target` (RUNTIME arm) + the source-structure asserts

A NEW `package.json` script `proof:touch-target` runs `tests-visual/touch-target.spec.ts`
at the new `coarse-touch` Playwright project against the live demo. The gate is a REAL
runtime artefact (not grep), in the established π-lane shape (mirrors
`tests-visual/forced-colors-skin.spec.ts` + `dark-semantic-contrast.spec.ts`: a synthetic
+ live-route render, getComputedStyle readback as the BINDING assertion, axe as the
best-effort secondary — because tests-visual is deliberately axe-INDEPENDENT, the library
publish surface being zero-dep). It asserts ALL of:

1. **PRIMARY (binding, deterministic, dep-free) — hit-rect ≥ 44×44 readback.** The spec
   navigates to `/forms/checks` (Checkbox · Radio · Switch), `/forms/slider`,
   `/data/tags-input`, and `/forms/multi-select` (the live galleries; resolved via
   `pi-manifest.ts` `resolveScene`, fails-the-resolution on a dead route). At the
   `coarse-touch` project (so `@media (pointer: coarse)` matches), for EACH of the seven
   atoms it locates the host element, reads `el.getBoundingClientRect()` AND the
   `::before` pseudo geometry via `getComputedStyle(el, "::before")` (width/height/inset),
   composites the visible box ∪ the `::before` halo into the EFFECTIVE pointer-receptive
   rect, and asserts **both dimensions ≥ 44 CSS px**. Born-RED on HEAD: every atom in the
   D1 table fails (Checkbox 16, remove-X 8). Fail-CLOSED: a sub-44 readback exits non-zero.

2. **SECONDARY (best-effort) — axe `target-size` ZERO violations.** The spec attempts an
   axe-core inject (a global `window.axe` if a build is reachable, else a CDN inject — the
   `dark-semantic-contrast.spec.ts` mechanism verbatim), runs `axe.run` scoped to the
   gallery with ONLY the `target-size` rule enabled, and asserts `violations.length === 0`.
   When axe is unreachable (offline CI), this arm SKIPs and the PRIMARY readback is the
   close criterion (the precept-valid artefact; axe is the corroborating secondary, never
   the sole bar). The seed's "injects axe-core at coarse/touch emulation + asserts ZERO
   target-size violations" is honored as this arm.

3. **NON-REGRESSION (fine-pointer byte-identical).** The default `chromium-headless-new`
   project (fine-pointer — `pointer: fine`, no `hasTouch`) confirms the `touch-hit-area`
   `::before` emits NO 44px overlay under fine pointer (the AX.W51 fine-pointer-identical
   invariant): per the refined coarse-ONLY mechanism the `::before` has no `content`/box at
   fine pointer, so `getComputedStyle(el, "::before")` `min-width`/`min-height` resolve to
   `auto`/`0` (NOT `var(--touch-target)`) and the composited effective rect equals the bare
   visual box (16px Checkbox stays 16px on desktop). A coarse-overlay that leaked to desktop
   would resolve a 44px `::before` here and RED. (This is STRICTER than the timeline
   precedent, whose `::before` carries `inset:-15px` at fine pointer too — see Objective §1.)

4. **NO-NEW-TOKEN source arm (the D4 constraint).** A `grep` over the touched SFCs +
   `utilities.css` asserts (a) the new `@utility touch-hit-area` reads `var(--touch-target)`
   and (b) NO new floor token (`--touch-target-2`, `--tap-floor`, a bare `44px`/`2.75rem`
   literal in the hit-area rule) was minted. This arm runs on EVERY runner (device-free).

5. **TEXT-AXIS source arm.** A `grep` asserts `MultiSelect.vue` no longer carries a raw
   `text-xs` on the selected-chip Badge (`:139`) — re-pointed to
   `text-[length:var(--control-text-sm)]` (the comfort axis). (The TagsInput text-axis check
   is DROPPED — `TagsInputItemDelete.vue` carries no `text-sm` literal at HEAD, so asserting
   its absence would be a tautology that always passes; the binding D2 target is the
   MultiSelect Badge alone.)

6. **BORN-RED witness (the gate bites).** Reverting any ONE SFC's `touch-hit-area` compose
   (e.g. drop it from `Checkbox.vue`) REDs the PRIMARY readback for that atom; reverting the
   `@utility` body REDs all six. Recorded in the wave's PROGRESS at close as the bite proof.

**Captured DELTA artefact (the cardinal lesson):** the spec writes a JSON readback to
`.cache/touch-target.json` — per-atom `{ atom, route, hitRect: {w,h}, pass }` at the
coarse project — AND a paired before/after note: HEAD (pre-wave) readback shows the seven
sub-44 rects (born-RED), post-wave shows all ≥44. The DELTA (the seven rects crossing 44)
is the binding evidence, not a commit-message claim.

### Gate command

```
npm run proof:touch-target
```

which resolves to running `tests-visual/touch-target.spec.ts` at `--project=coarse-touch`
(the workspace `test:touch` script), fail-CLOSED when the tests-visual workspace +
device backend are present, befitting-SKIP (exit 0, logged) only on a zero-device runner
(the established π pattern, e.g. `proof:adaptive-glass` / `substrate-paints-color`).

---

## Named successor (on miss)

If the axe secondary cannot be wired in the wave window, it RETIRES to best-effort (the
PRIMARY readback IS the artefact-valid close — no miss). If the Slider-thumb halo fights
scoped-CSS specificity beyond the wave window, the thumb's coarse `::before` lands in the
scoped `<style>` reading `var(--touch-target)` (still no fourth token) — same gate, same
readback, recorded as the chosen route in PROGRESS. The picker menu-row floor (Finding 5)
is NOT this wave; its named successor is W-SCALE1's body-ladder reconcile.
