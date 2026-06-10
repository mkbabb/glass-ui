# AZ.W-SHELL-IDENTITY — the Foundations-ℱ becomes the Foundations entry: the Compass dup drops, the DockSeparator demarcates, the glyph is optically centered by the measured ink-mass offset, the hover pill gains its glass register

**Tranche** AZ (glass-ui) · **Batch** 3 (S band; runs ‖ W-SHELL-CONFIG ‖ the dock/blob/motion waves) · **Type** demo-shell defect fix (logo dedup + optical centering + hover register) · **Status** SPEC · **Repo** glass-ui · **Base** tranche/AY @ v3.10.1 · **HEAD** tranche/AZ

This wave fixes two MEASURED R3 defects in the demo shell's home control. **R3-12:** the script-ℱ wordmark and the first primary-category DockIconButton (which renders the Compass icon — and Compass IS the Foundations category icon) stack as TWO Foundations affordances with no divider — the user's "duplicated compass." The fix: make ℱ BE the Foundations entry (drop the redundant Compass row), demarcate it with a `<DockSeparator>`, size it slightly larger. **R3-15:** the ℱ is NOT centered in its hover/shadow area — measured at dx=+2.38px/dy=+3.25px ink-mass offset (the italic script-F slant + ink asymmetry), and the link is a bare 40×40 rounded-full with NO hover-pill background or shadow of its own (the "hover/shadow area" is the bare circle). The fix: optical centering (a transform nudge, NOT geometric flex-churn) + a proper glass hover pill on the home control.

It is a DEMO-shell fix (the SidebarDock + the manifest), not a library-source change. The library's `DockIconButton` + `DockSeparator` + the glass register are CONSUMED; the demo's home control is re-shaped onto them.

---

## §0 — RE-GROUND (step-0 re-grep mandate)

Before any edit, re-grep EVERY cite at HEAD and confirm it reads as recorded — the measured offsets + the line numbers are load-bearing; the SidebarDock template shifts. Grounding finding ids: **C8-R3-12-a** (FLEET-DIGEST.md:599-600 — the duplicated-compass, MEASURED), **C8-R3-15-b** (FLEET-DIGEST.md:601-602 — the ink-mass offset, MEASURED), **C1-R3-12-foundations-logo-corroborate** (FLEET-DIGEST.md:442-443), **F2** (FLEET-DIGEST.md:880 — the cross-lane verify, offset corroborated). User items: **R3-12** (USER-AUDIT-2026-06-10-R3.md:33) + **R3-15** (USER-AUDIT-2026-06-10-R3.md:36). Ground captures: `docs/tranches/AZ/audit/ground/C8-rail-home-region.png`, `C8-fourier-f-livescan.mjs` (offset dx+2.38 dy+3.25), `C8-hover-pill-probe.mjs` (link bg `rgba(0,0,0,0)`, boxShadow `none`).

Re-grounded at authoring (HEAD):

- **The duplicated compass (R3-12), MEASURED.** `demo/layout/SidebarDock.vue:98-122` — the `#persistent` slot renders the ℱ (U+2131 script-F) wordmark as a `RouterLink to="/"`; `/` redirects to `firstStoryPath()` = `/foundations/intro` (`demo/router.ts:14-15`). Directly below, with NO divider, the FIRST `primaryCategories` `DockIconButton` (`SidebarDock.vue:124-148`) renders `category.icon` — and the Foundations category's icon IS `Compass` (`demo/stories/manifest.ts:109` — `icon: Compass`). So the rail stacks TWO Foundations affordances (ℱ→foundations/intro AND Compass→foundations category) at the top. The ℱ-then-Compass adjacency is the "duplicated compass" (ground: `C8-rail-home-region.png`).
- **The ink-mass offset (R3-15), MEASURED.** `SidebarDock.vue:99-121` — the `RouterLink` is `h-10 w-10 rounded-full` (40×40), `flex items-center justify-center` (geometric centering already in place); the inner `<span>` is `italic` with `font-variation-settings: 'WONK' 1`, `font-size: 1.875rem`, the `&#x2131;` glyph. A live red-ink pixel scan over the exact 40×40 link rect (`C8-fourier-f-livescan.mjs`) measures the ℱ ink-mass center at dx=+2.38px (right) / dy=+3.25px (below) of the circle's geometric center — the italic script-F slant + the script-F's intrinsic ink asymmetry push the painted ink off the advance-box center. The fix is OPTICAL centering (a small translate of ≈ −2.4px x / −3.3px y), NOT geometric flex-centering (already present).
- **The bare home control — no hover pill (R3-15).** `C8-hover-pill-probe.mjs` measures the link's bg `rgba(0,0,0,0)` + boxShadow `none` — the link paints transparent; the rounded-full circle IS the hover/shadow shape, with no glass register of its own (the only pill behind is the dock rail plate). The `focus-ring` + `tap-squish` are present but no hover-pill bg/shadow. The home control should carry the same glass hover register the dock controls do (the R3-6/W-REGISTER-IOS register — re-ground confirms the post-W-REGISTER-IOS hover register, this wave consumes it).

If any cite has shifted (the SidebarDock template lines, the manifest icon, the measured offsets if the font changed), STOP, RE-MEASURE the offset (re-run the `C8-fourier-f-livescan.mjs` probe), and reconcile §3 before editing — the optical nudge is keyed to the MEASURED number, not a guessed value (invariant 3).

---

## Goal criterion

The demo shell's home region reads as ONE Foundations entry: the script-ℱ IS the Foundations affordance (no redundant Compass row), demarcated below by a hairline `<DockSeparator>`, slightly larger than the category glyphs; the ℱ sits OPTICALLY centered in its hover/shadow area (the painted ink-mass on the circle's geometric center, not the advance-box center); and hovering it lifts a proper glass pill (the iOS-glassy register the dock controls carry), not a bare transparent circle.

## Completion criterion

The hard-gate set (§4) verifies on captured artefacts: **HG1** — the duplicated Compass is GONE: the Foundations category's `DockIconButton` no longer renders a redundant Compass home affordance; the ℱ IS the Foundations entry (a captured before/after of the home region showing ONE Foundations affordance, demarcated by a `<DockSeparator>`, the ℱ slightly larger). **HG2** — the ℱ ink-mass is optically centered: a re-run of the `C8-fourier-f-livescan.mjs` probe over the 40×40 (or slightly larger) link rect measures the ink-mass offset within a tight tolerance of the geometric center (the +2.38/+3.25 offset corrected to ≈0 by the transform nudge). **HG3** — the home control carries a glass hover pill: a captured hover-state DELTA showing the glass register (bg + the specular gleam) on hover, NOT a bare transparent circle (the `C8-hover-pill-probe.mjs` bg/boxShadow now non-transparent on hover). **HG4** — `proof:shell-identity` (born-RED) asserts the dedup (no redundant Foundations affordance), the optical-nudge transform present, and the glass hover register on the home control.

---

## §1 — The verified defects (file:line, source-grounded — MEASURED)

**D1 — the duplicated Foundations affordance (R3-12).** `SidebarDock.vue:98-122` renders the ℱ wordmark `RouterLink to="/"` (→ `firstStoryPath()` = `/foundations/intro`, `router.ts:14-15`). `SidebarDock.vue:124-148` then renders the FIRST `primaryCategories` `DockIconButton`, whose `category.icon` for Foundations IS `Compass` (`manifest.ts:109`). So the home region stacks ℱ→foundations AND Compass→foundations — two Foundations affordances, no divider between them (C8-R3-12-a, MEASURED; ground `C8-rail-home-region.png`). The user's "duplicated compass."

**D2 — the ℱ is NOT optically centered (R3-15), MEASURED dx=+2.38/dy=+3.25.** `SidebarDock.vue:99-121` — the 40×40 `rounded-full` link is geometrically `flex items-center justify-center` centered, but the painted ink-mass of the italic script-ℱ (`WONK 1`, `font-size 1.875rem`) sits at dx=+2.38px / dy=+3.25px off the circle's geometric center (`C8-fourier-f-livescan.mjs`). The italic slant + the script-F intrinsic asymmetry push the ink off the advance-box center. Geometric centering CANNOT fix this — only an optical transform nudge (≈ −2.4px x / −3.3px y) re-seats the ink-mass on the circle center.

**D3 — the home control has no glass hover pill (R3-15).** `C8-hover-pill-probe.mjs` — the link bg is `rgba(0,0,0,0)`, boxShadow `none`; the rounded-full circle is the bare hover/shadow shape with no glass register of its own. The home control should carry the same glass hover pill the dock controls do (the iOS-glassy register, R3-6 / W-REGISTER-IOS) — a bg → glass tier + a specular gleam on hover.

---

## §2 — Objective

Fix the home-region identity defects on the demo shell. Four moves:

1. **Drop the duplicate Compass; make ℱ the Foundations entry (D1).** The Foundations category no longer needs its own `DockIconButton` home affordance (the ℱ wordmark `RouterLink to="/"` already lands on `/foundations/intro`). Either (a) the `primaryCategories` list excludes Foundations from the `DockIconButton` loop (the ℱ IS its entry), OR (b) the Foundations category's icon is no longer rendered as a redundant nav row. The ℱ becomes the single Foundations affordance. (Re-ground: confirm whether dropping Foundations from the loop leaves a gap in the category nav — if the user still wants a Foundations nav row distinct from "home," the resolution is the ℱ stays home + the Compass row is re-iconed to a non-Compass glyph; but R3-12's words are "make ℱ BE the Foundations entry," so the dedup is the default.)

2. **Demarcate with a `<DockSeparator>` + size the ℱ slightly larger (D1).** Add a `<DockSeparator>` below the ℱ home control (the home-top / utility-at-the-end nav-pattern the dock already speaks — the existing `referenceCategories` separator at `SidebarDock.vue:161` is the idiom). Size the ℱ slightly larger than the 16px category glyphs (the `font-size: 1.875rem` is already larger; "slightly larger" may mean a touch more, or a larger link box — re-ground the relative scale and bump per the user's "slightly larger").

3. **Optically center the ℱ (D2) — a transform nudge keyed to the MEASURED offset.** Add a `transform: translate(-2.38px, -3.25px)` (or the RE-MEASURED value at HEAD) on the inner `<span>` so the painted ink-mass re-seats on the circle's geometric center. NOT a flex-center change (already present) — a small optical translate. The nudge is keyed to the live measurement, not a guess; if the font/size changes, re-measure first.

4. **Give the home control a glass hover pill (D3).** The `RouterLink` gains the glass hover register the dock controls carry (the iOS-glassy register — bg → the `--dock-control-hover-bg` glass tier, the specular gleam 0→~0.1 on hover, `--scale-hover-dock`). Compose the EXISTING dock-control hover register (re-ground the post-W-REGISTER-IOS hover token), NOT a hand-rolled hover bg — the home control reads as a first-class dock control.

This honors gestalt (composes the existing `DockSeparator` + the dock-control glass hover register, not a hand-rolled home chrome — the nav-pattern the dock already speaks), no-workaround (the optical nudge is the correct fix for an ink-asymmetry that geometric centering structurally cannot reach), root-not-consumer (the library `DockSeparator` + glass register are consumed; the DEMO home control is re-shaped), and the cardinal DELTA (a captured before/after + a re-run live ink-scan, not a claim).

---

## §3 — Files + exact edit-sites (re-grep at HEAD before editing)

| file | edit |
|---|---|
| `demo/layout/SidebarDock.vue:124-148` | the duplicate-Compass drop (D1 / move 1): exclude Foundations from the `primaryCategories` `DockIconButton` loop (the ℱ IS its entry) OR re-icon the redundant row — re-ground the chosen path. The ℱ `RouterLink to="/"` (`:98-122`) STAYS as the single Foundations affordance. |
| `demo/layout/SidebarDock.vue` (after `:122`) | add a `<DockSeparator />` below the ℱ home control (D1 / move 2) — the home-top demarcation (the idiom at `:161`). |
| `demo/layout/SidebarDock.vue:99-121` | size the ℱ slightly larger (move 2 — bump the link box or the `font-size: 1.875rem` per the user's "slightly larger"); add the optical-center transform on the inner `<span>` (move 3): `transform: translate(-2.38px, -3.25px)` (or the RE-MEASURED HEAD value — re-run `C8-fourier-f-livescan.mjs` first). |
| `demo/layout/SidebarDock.vue:99-121` + a demo-scoped style | the glass hover pill (D3 / move 4): the `RouterLink` composes the dock-control glass hover register (bg → `--dock-control-hover-bg`, the specular gleam, `--scale-hover-dock` on hover) — re-ground the post-W-REGISTER-IOS hover token names. NOT a hand-rolled hover bg. |
| `demo/stories/manifest.ts:109` | re-ground the Foundations `icon: Compass` — if the dedup re-icons the row (path b of move 1) rather than dropping it, the icon changes here; if the row is dropped, no edit. |
| NEW `scripts/proof-shell-identity.mjs` | the born-RED gate: clause S1 — no redundant Foundations affordance (the ℱ is the single Foundations entry; the Compass home dup is gone); S2 — the ℱ carries the optical-center transform (the nudge present, not bare flex-center); S3 — the home control composes the dock-control glass hover register (not a bare transparent `rounded-full`); S4 — a `<DockSeparator>` demarcates the home control. (A π twin asserts the rendered home-region DOM: ONE Foundations affordance, the separator present, the hover bg non-transparent.) |
| `package.json` | add `"proof:shell-identity": "node scripts/proof-shell-identity.mjs"`; `proof:gen-ci-fresh` re-lock if it joins CI. |
| NEW `docs/tranches/AZ/audit/visual/W-SHELL-IDENTITY-DELTA.md` | the write-up: the home-region before/after (the dedup + separator + larger ℱ — HG1), the re-run `C8-fourier-f-livescan.mjs` ink-mass offset (now ≈0 — HG2), the glass hover-pill before/after + the re-run `C8-hover-pill-probe.mjs` (bg/boxShadow now non-transparent on hover — HG3), the `proof:shell-identity` born-RED/GREEN stdout. |

---

## §4 — HARD GATE (evidence-backed, born-RED)

The named born-RED gate is **`proof:shell-identity`**. A SET of structural + MEASURED conditions backed by artefacts — the centering + hover claims are backed by a RE-RUN live probe (the cardinal lesson: a measured delta, not a claim).

**HG1 — the duplicated Compass is GONE; ℱ is the Foundations entry, demarcated, slightly larger.** A captured before/after of the home region: BEFORE — ℱ-then-Compass (two Foundations affordances, no divider); AFTER — the ℱ alone as the Foundations entry, a `<DockSeparator>` below it, the ℱ slightly larger than the category glyphs. Born-RED side: `proof:shell-identity` S1 REDs if a redundant Foundations `DockIconButton` (the Compass home dup) survives. Captured: the home-region before/after in the DELTA.

**HG2 — the ℱ ink-mass is OPTICALLY centered (the measured fix).** A re-run of `C8-fourier-f-livescan.mjs` over the link rect measures the ℱ ink-mass offset within a tight tolerance (≈ ±1px) of the circle's geometric center — the +2.38/+3.25 offset corrected by the transform nudge. Born-RED side: S2 REDs if the optical-center transform is absent (a bare geometric flex-center leaves the +2.38/+3.25 offset). Captured: the BEFORE offset (dx+2.38/dy+3.25) + the AFTER offset (≈0) from the re-run probe in the DELTA. (The probe is the MEASUREMENT artefact — the centering is not a claim.)

**HG3 — the home control carries a glass hover pill.** A captured hover-state DELTA: on hover the home control lifts the glass register (bg → the `--dock-control-hover-bg` glass tier + the specular gleam), NOT a bare transparent circle. A re-run of `C8-hover-pill-probe.mjs` measures the hover bg + boxShadow as NON-transparent (the BEFORE was `rgba(0,0,0,0)` / `none`). Born-RED side: S3 REDs if the home control paints a bare transparent `rounded-full` with no glass hover register. Captured: the hover before/after + the re-run probe numbers in the DELTA.

**HG4 — the dedup + centering + hover + separator are structurally asserted.** `proof:shell-identity` clauses S1–S4 GREEN; the π twin asserts the rendered home-region DOM (one Foundations affordance, the separator present, the hover bg non-transparent). Born-RED: a re-add of the Compass home dup, a removal of the optical nudge, a bare-circle hover, or a missing separator REDs the gate. Captured: the born-RED diff + the GREEN stdout.

**The single binding condition:** the duplicated Compass is gone and ℱ is the single demarcated, slightly-larger Foundations entry (HG1, captured); the ℱ ink-mass is optically centered to ≈0 offset (HG2, re-measured); the home control carries a glass hover pill (HG3, re-measured); and `proof:shell-identity` REDs on any regression of the four (HG4). The centering + hover fixes are PROVEN by re-run probes (the measured-delta cardinal lesson), not asserted.

---

## §5 — Scope fence

- ONLY the demo-shell home-region identity: the Compass dedup, the `<DockSeparator>` demarcation, the ℱ size bump, the optical-center transform, the glass hover pill. The library `DockSeparator` + the dock-control glass hover register are CONSUMED, not edited (this is a demo-shell fix).
- The hover register itself (the iOS-glassy register definition — the `--dock-control-hover-bg` token, the specular) is W-REGISTER-IOS's domain (Batch 1) — this wave CONSUMES the post-W-REGISTER-IOS register, it does not redefine it (§6 coordination).
- The dock nav-pattern (home-left, nav, separator) is W-DOCK-NORMALIZE's domain — this wave's home-region fix must keep `proof:dock-unify` GREEN (the home control stays the `#persistent` anchor).
- The optical nudge is keyed to the LIVE-MEASURED offset — NOT a hardcoded guess that drifts if the font/size changes (re-measure on any glyph/size edit).

## §6 — Coordination

- **W-REGISTER-IOS (Batch 1, predecessor).** The iOS-glassy hover/active register is redefined there (the R3-6 de-red + the glass luminance-lift). This wave's home-control hover pill (D3/move 4) CONSUMES that register — it must run after W-REGISTER-IOS lands so the home control reads the SAME hover register the dock controls do (no parallel hover bg). Re-ground confirms the post-W-REGISTER-IOS hover token names before wiring the home control.
- **W-DOCK-NORMALIZE (Batch 2, sibling).** The shell docks gain the normalized persistent nav-pattern (home-left + nav + separator). This wave's home-region fix is part of that pattern — the ℱ IS the home-left anchor. Coordinate: the `<DockSeparator>` this wave adds below the ℱ is the SAME demarcation W-DOCK-NORMALIZE's census expects; the two must not double-add it. The `proof:dock-unify` F4 census + this wave's `proof:shell-identity` S4 both read the home-region separator — they assert the same artefact, not two.
- **W-DOCK-TAXONOMY / W-RAIL-EXTEND (Batch 2).** The shell's vertical dock is renamed/re-shaped there; this wave's home-region edits target the post-rename SidebarDock. Re-ground the SidebarDock template AFTER those waves land (the line numbers shift).

## §7 — Named successors (for any deferral)

- If the Foundations-dedup path (drop vs re-icon, move 1) needs a user call (the user may want a Foundations nav row distinct from "home"), the dedup decision is recorded in the DELTA and the chosen path lands; if the user defers the call, the ℱ-as-Foundations default ships (R3-12's literal words) with the re-icon path booked as a one-line successor.
- If the dock-control glass hover register (W-REGISTER-IOS) is not yet landed when this wave runs (a batch-ordering slip), the home-control hover pill BOOKS to a one-line successor that wires it once the register lands; the dedup + separator + optical-centering (HG1/HG2) ship this wave regardless (they have no W-REGISTER-IOS dependency), and HG3 carries the BOOK marker until the register is present.
