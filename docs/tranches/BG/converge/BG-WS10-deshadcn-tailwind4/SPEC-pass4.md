# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass4 (DEVELOPMENT EXECUTION)

> COMPLETELY abrogate default shadcn + tailwind paint while KEEPING the reka/shadcn
> behaviour substrate. The DEEP, dedicated form of WS4's de-shadcn-sweep.
> reka = BEHAVIOUR / glass-ui = 100% of MATERIAL.

**Base: `SPEC-pass3-converged.md` (adopted WHOLE — F1–F4, the three atomic commit-units, R2–R5,
N1–N4 all stand).** This is NOT a re-converge. Every MECHANISM is locked. pass-4 advances the
**DEVELOPMENT-EXECUTION frontier** by folding twelve on-disk corrections the pass-4 research fleet
surfaced + re-verified against `tranche/BG` HEAD `069db6c4` THIS session (file:line below). Each is an
EXECUTION fact that, left unfolded, ships a born-RED-never-GREEN gate, a dead capture, or a silent
no-run. The single load-bearing residual is unchanged: **the R2 grouped-Select WebKit-DARK separation
on REAL Safari** — and pass-4 makes its binding-judge TOOLING a build-prove prototype (it does not exist
yet; both on-disk Safari drivers are 256pt `loadFileURL` fixtures).

| # | pass-3 as written | on-disk truth (verified this session) | pass-4 correction |
|---|---|---|---|
| **E1** (CRITICAL — born-RED-never-GREEN) | §N1.2 opacity census = **9** `opacity-NN` utilities; the fold table lists 9. | The opacity-utility arm joins `proof:no-shadcn-default` (the ALL-`ui/` walker), and `grep -P` over `ui/` returns **11**: the 9 + `DialogContent.vue:244 opacity-70` + `SheetContent.vue:135 opacity-70` (the two overlay close-button dims). | **Census is 11.** The two close buttons are byte-near-identical (`focus-ring absolute … rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-{accent,secondary}`). **FOLD both into `_shared/OverlayClose.vue`** (the `_shared/ModalOverlay` precedent) — ONE place collapses the `opacity-70` hit, the `rounded-sm` radius leak (E2), AND the neutral `data-[state=open]:bg-{accent,secondary}` state-fill. The born-RED→GREEN bite count is **11**, not 9. |
| **E2** (directive-named leak unenforced) | The census has palette + opacity arms; "radius" is in the directive bar but no arm scans bare default radius (`proof:no-shadcn-default`'s radius arm is `rounded-md` ONLY). | Bare default radius leaks in `ui/`: `alert/index.ts:11 rounded-lg` (non-allowlist), the 2 close-button `rounded-sm` (E1), `data-table`×3 `rounded-lg` + `separator rounded-sm` (allowlisted). | **MINT a `raw-tw-radius` arm** `rounded-(sm\|md\|lg\|xl\|2xl\|3xl\|none)` (allowlist-defer data-table/separator; EXCLUDE `full` — 0 bare hits, legit for circles). Same shape as palette/opacity. Closes the directive's "no default radius leak." House radii: `rounded-{pill,card,button,panel,input}`. alert → `rounded-card`; the close-button `rounded-sm` dies in the `OverlayClose` fold. |
| **E3** (the DRY extract is not what it claims) | §N3: `shadcn-vocab.mjs` mints `stripComments`; "PURE refactor, bare-HEAD output BYTE-IDENTICAL." | `stripComments` is ALREADY canonical at `critical-path-walk.mjs:22` (re-used by `surface-closure.mjs`). The two gates' vocab ids have ALREADY DRIFTED (`shadow-sm-utility` vs `shadow-sm-util`; `bg-muted-slab` vs `bg-neutral-fill`). | **Import `stripComments` FROM `critical-path-walk.mjs` (no 4th copy); re-export from `shadcn-vocab.mjs`.** Reconcile the drifted ids to ONE canonical set. The CSS-recipe-body arms (`opacity-literal`, `hex-color-literal`) stay de-shadcn-LOCAL. **CORRECT the "byte-identical" claim:** pass/fail is unchanged, but printed violation-detail STRINGS shift (cosmetic id rename) — it is a born-GREEN refactor, not byte-identical output. |
| **E4** (R3 capture undercount) | R3 blast-radius capture = "the 10 `--focus-ring-shadow` consumers" over `/dock + /display/buttons`. | `grep -l var(--focus-ring-shadow)` = **14 readers**: 9 CSS focus recipes + `bridges.css` + **4 SFCs reading the token DIRECTLY** (`SegmentedTimeline.vue`, `ScrubberTimeline.vue`, `ContinuousMarkers.vue`, `Slider.vue`). | The SOLID-inner-stop calibration changes the **Slider thumb + the 3 timeline thumb** rings too. **The blast-radius capture ADDS `/data` (timeline/scrubber) + a Slider surface** beyond `/dock + /display/buttons`, BOTH modes BOTH engines, or no-regresses them explicitly. R3/R4's "10 consumers / 9-file recipe set" are undercounts; the true reader set is 14. |
| **E5** (R2 mechanism is INERT) | §R2: "all material in CSS (menu.css/select.css)"; the `:has(.glass-menu-group)` recede is the architectural fix. | `SelectGroup.vue:16` renders ONLY `p-1 w-full` — NOTHING renders `.glass-menu-group`. The scope is INERT until a node carries the class. `.glass-menu-group`/`--select-well-*`/`--menu-group-fill` are all 0-hit net-new. | **`SelectGroup.vue` RENDERS `.glass-menu-group`** (component-over-class, the brief's Axis 2). Grouped Select → SelectGroup → card; ungrouped Select has NO SelectGroup → stays flat warm-transmissive (the exact gestalt R2 wants, for free). `SelectGroup.vue` JOINS the FILES list. "All material in CSS" was incomplete — the trigger node is an SFC class. |
| **E6** (dead import path) | §N2: extract `assertServedDemoDoc` in `tests-visual/lib/served-app-sentinel.ts`. | The file is `tests-visual/served-app-sentinel.ts` (NO `lib/`). It exports `DEMO_TITLE` + `assertServedDemoAurora` ONLY. | **Path corrected to `tests-visual/served-app-sentinel.ts`.** ADD `export function assertServedDemoDoc(page)` (title===`DEMO_TITLE`, no aurora marker) beside `assertServedDemoAurora` for the 4 non-aurora WS10 routes. |
| **E7** (every live-π hits a dead port) | "over the LIVE `:5199` demo." | `playwright.config.ts:14-15` comment says "standardize on 5173"; `:22` code defaults `GLASS_UI_DEMO_PORT ?? 5199`. `package.json:666 "dev": "vite"` (bare) + `vite.config.ts` has NO `server.port` → `npm run dev` binds **:5173**. A capture pointed at `:5199` started via `npm run dev` hits a dead port → fail-closed / false-RED (the CHR-1 chronic). | **The live-π executor MUST start vite explicitly on 5199** — `npx vite --port 5199` or `GLASS_UI_DEMO_PORT=5199 …` — and verify the served port == the capture target before any getImageData. A standing operational precondition for ALL four live π. |
| **E8** (the R2/R5 binding judge has NO driver) | "REAL Safari via chrome-devtools-mcp / real-device." | `chrome-devtools-mcp` drives CHROME only (cannot drive Safari). Both on-disk Safari drivers (`wkdriver.swift:52`, `wkshot.m:26`) are `loadFileURL`-only 256pt fixtures — NO `:5199` route, NO `evaluateJavaScript`, NO `getImageData`, NO `colorScheme` toggle. `safaridriver` IS present (`/System/Cryptexes/App/usr/bin/safaridriver`, needs `--enable`). | **The real-Safari binding-judge tool is an UNBUILT PREREQUISITE** (PT-2). Build it BEFORE trusting R2/R5: extend `wkdriver.swift` to `loadRequest(:5199)` + `evaluateJavaScript` (navigate route, set `documentElement.style.colorScheme`, open the Select, `getImageData` on regions) at a forms-sized viewport, OR wire `safaridriver --enable` + a WebDriver client. Without it, R2 cannot close. |
| **E9** (gate stays blind to custom/ + `<style>`-body — the 5-tranche recurrence) | §R7: "BE's HOLE-2 (`<style>`-body popover-slab scan) is NOT re-picked by any arm — RECORDED as a known gap (book the structural fix)." | This silent booking IS the de-shadcn chronic's root: BE named HOLE-2 (`<style>`-body) + HOLE-3 (custom/ walk) TWO tranches ago; deferral = survival (MetricBadge/ScrubberTimeline residue rode 5 tranches because no GATE caught them). | **CONVERT the silent gap to an explicit named-successor booking + land the cheap half NOW.** (a) WIDEN the 3 new class-string vocab arms (palette/opacity/radius) to a `custom/` reach (same walker, wider glob) — so the anti-smuggle floor reaches custom/ for the leak-classes the directive names. (b) The `<style>`-body var(--popover)-slab scan is **BOOKED to a NAMED successor `BG.W-DESHADCN-STYLE-BODY`** (no-silent-drop), with the live ScrubberTimeline residue fixed by named edit THIS wave (§N4.2) so zero live residue ships under the booking. |
| **E10** (C2 lands the cascade twice on a divergent base) | C2: "land WS3-M5 first, rebase WS10's `--ring`/`--input` renames." | WS3-M5 (`BG.W-GLASS-TINT-UNIFY`) is NOT executed — git log shows only the converge marker. Four edit-streams converge on `color-radius.css`/`dark-arm.css`/`light-dark.css`. | **The concrete dependency directive:** WS10's cascade edits (the `--ring`→`--focus-ring-color` rename, `--input` delete, the deep-violet floor, the warm-hue flip) land as ONE coordinated diff. If M5 is unlanded at WS10's turn, **WS10 lands its cascade edits and M5 rebases onto WS10** (whichever lands first owns the base) — the orchestrator picks ONE owner; NEVER edit the 3 files on a divergent base twice. |
| **E11** (the gestalt verdict rides a moving gate) | §6: author the forms/controls gestalt-roster row + per-surface VERDICT. | `proof:ba-gestalt.mjs` + `critical-path-walk.mjs` are MODIFIED + `surface-closure.mjs` is untracked on the working tree (a mid-flight P6 paint-closure rewire). | **Sequence the BG forms/controls gestalt-roster authoring AFTER the surface-closure/P6 rewire LANDS** (it is uncommitted WIP). Authoring a roster row against a moving gate re-opens the self-cert hole the P6 leaf is fixing. The roster is greenfield (`docs/tranches/BG/audit/reflect/` does not exist) — mint it at the GATE wave, post-P6. |
| **E12** (re-point target mis-named) | §N1.2: `DropdownMenuShortcut.vue:11 opacity-60` → "the existing `--dropdown-secondary` ink." | The actual token is `--dropdown-text-secondary` (`bridges.css:31`); `DropdownMenuShortcut` ALREADY carries `text-dropdown-secondary` (the opacity-60 dims it further). | **Re-point: DROP `opacity-60`** (the `text-dropdown-secondary` register is the dim already; clean break, marginally less dim — accept). `ToastDescription.vue:21 opacity-90` → `text-(--popover-foreground)` (color-radius.css:75 exists). PREFER ink re-points over 1-use opacity tokens (DRY). |

**The honest convergence state at pass-4:** every MECHANISM (pass-2) + every pass-3 risk/critique mustFix
(F1–F4, N1–N4, R2–R5) is locked. The unconverged frontier is DEVELOPMENT EXECUTION, now with the twelve
on-disk corrections above threaded. The load-bearing residual remains R2-on-real-Safari; pass-4 makes the
binding-judge tool itself a build-prove prerequisite (E8/PT-2).

---

## GESTALT GOAL

Every glass-ui component is 100% glass-ui MATERIAL — warm-cream transmissive glass (light) / luminous-dark
transmissive (dark), warm focus accents, the house radius geometry, the `--shadow-cartoon-*` offset-stamp,
the iOS-26/27 Liquid-Glass register (control blur ≤20, AA-darken ≤24%, deep-glass 14–20px) — while the
reka/shadcn behaviour + a11y substrate is BYTE-UNTOUCHED. Zero default shadcn/tailwind paint survives on
ANY glass-ui component: no `bg-background`/`border-input`/`ring-ring`/`ring-2`/`rounded-md`/raw-palette
color/bare-default-radius/`opacity-NN`/`shadow-sm` utility, gate-asserted across `ui/` AND the leak-class
reach into `custom/`. Two gates lock it on ONE shared vocab (`proof:no-shadcn-default` the ui/-wide vocab
census; `proof:de-shadcn` the per-control state-coverage + recipe-reach), reconciled by the N3 single-source
extract so they cannot drift. Fully idiomatic Tailwind v4: token cascade end-to-end, `@theme` auto-exposing
var+utility, `@utility` for non-color recipes, zero `theme()` function-syntax, zero `<util>-[var(--x)]`
arbitrary wrap where a registered namespace resolves. Both modes. Chrome AND real Safari.

---

## MECHANISM (the idiomatic approach, concrete — pass-3 + the pass-4 advances)

### 1. The census closes on FOUR leak-classes, ONE shared vocab, ui/ + custom/ reach (E1/E2/E3/E9)

`scripts/lib/shadcn-vocab.mjs` is the single source — `export const SHADCN_VOCAB` (the 8 existing vocab arms
+ `raw-tw-palette` [F1-corrected] + `opacity-utility` + `raw-tw-radius` [E2]) and `export { stripComments }
from "./critical-path-walk.mjs"` (E3 — re-export, NOT a 4th copy). Both gates import it; the ids are
reconciled to ONE canonical set (E3). The recipe-body arms (`opacity-literal`, `hex-color-literal`) stay
de-shadcn-LOCAL (they scan CSS recipe bodies, not class strings).

- **`raw-tw-palette`** (F1-corrected): `(?<![\w-])(?:[\w.\[\]-]+:)*(?:text|bg|border|from|to|via|ring|fill|stroke|decoration|outline|shadow)-(?:red|orange|amber|…|stone)-\d{2,3}(?![\w-])` — catches `group-[.destructive]:text-red-300/50` AND `text-amber-700`, spares `--my-text-red-300x`. Born-RED on `ToastClose.vue:24`.
- **`opacity-utility`**: `(?<![\w:-])(?:[\w-]+:)?opacity-(?:[1-9]|[1-9]\d)(?![\w-])` — the 1–99 range (spares the `opacity-0`/`opacity-100` animation endpoints). Born-RED on the **11** sites (E1).
- **`raw-tw-radius`** (NEW, E2): `(?<![\w-])(?:[\w.\[\]-]+:)*rounded-(?:sm|md|lg|xl|2xl|3xl|none)(?![\w-])` with allowlist-defer (`data-table`, `separator` — the legibility-allowlist survivors) and an EXCLUDE of `full` (legit for circles, 0 bare hits). Born-RED on `alert/index.ts:11` + the 2 close-button `rounded-sm`.
- **custom/ reach (E9a):** the three class-string arms (palette/opacity/radius) walk `custom/` too (the same vocab over a wider file glob) — the leak-class anti-smuggle floor reaches custom/, closing BE's HOLE-3 for the directive-named classes. The per-control STATE-MATRIX for non-form custom/ components stays booked (§7).
- **`<style>`-body scan (E9b):** BOOKED to named successor `BG.W-DESHADCN-STYLE-BODY` (no-silent-drop); the live `ScrubberTimeline` `<style>` `var(--popover)` residue is fixed by named edit this wave (§N4.2) so zero live residue ships under the booking.

The N3 extract is born-GREEN (pass/fail unchanged; only printed id strings shift); the four leak arms are
the born-RED delta, ATOMIC born-GREEN as each folds.

### 2. The token re-points — re-point, never re-spell (E1/E12)

- **ToastClose red** → `text-destructive-foreground` (the W-FEEDBACK-TONE register; one-token clean break).
- **ai-amber** (`button/index.ts:170`) → `text-accent-ai`. **MINT KEPT (the no-contrivance bar is cleared):** the hue serves TWO readers — the line's `[--glass-accent:oklch(0.78 0.14 75)]` RIM accent + the GLYPH ink — so a per-mode `--accent-ai-ink` pair (`tokens/glass.css` light `oklch(0.55 0.13 75)` / `tokens/dark-arm.css` dark `oklch(0.80 0.13 75)`) + a `--text-accent-ai` bridge is ONE identity register with ≥2 channels, not a 1-use token. The arm has ZERO false-positives by construction (token-first IS the brief). Record the lighter alternative (read the inline value) as the falsifier IF a future audit judges the bridge a contrivance.
- **The 11 opacity sites:** the 2 steppers → `opacity-(--opacity-disabled-strong)` (W0 mints `:0.2`); the 3 search icons (Combobox/Command/MultiSelect) → `opacity-(--icon-decoration-opacity)` (W0 mints `:0.5`); `Label.vue:32` → `peer-disabled:opacity-(--opacity-disabled)` (the existing 0.5 rung); `DropdownMenuShortcut.vue:11` → DROP `opacity-60` (E12, `text-dropdown-secondary` is the dim already); `ToastDescription.vue:21` → `text-(--popover-foreground)` at full opacity (E12); `button/index.ts:171 active:opacity-80` → the named press register; the **2 close buttons** → the `OverlayClose` fold (E1).
- **The `OverlayClose` DRY fold (E1):** `_shared/OverlayClose.vue` (the `_shared/ModalOverlay` precedent) — ONE recipe collapsing the `opacity-70`/`hover:opacity-100`, the `rounded-sm`→house-radius, and the `data-[state=open]:bg-{accent,secondary}` neutral state-fill → a glass-tier register. `DialogContent`/`SheetContent` compose it.

### 3. The focus-ring 3-surface decouple — F3-calibrated, 14-reader blast radius (E4)

`--focus-ring-color` is a CALIBRATED warm focus accent (≥3:1 over the control's OWN solid fill, reads as a
luminous accent NOT 15:1 body ink), NOT a blind `--ring` value-rename. The complete consumer map: 3 defs
(`color-radius.css:102`, `dark-arm.css:100`, `light-dark.css:118`) → `--focus-ring-color`; `configurator.css:251`
crown → `--foreground` (fixes the dark H~95° yellow-green W-NO-GRAY violation); `control-surfaces.css:96+97`
(the input fold, phantom `--color-accent-opaque` first-arg deleted) → `--focus-ring-shadow`; `bridges.css:83`
`--color-ring` DELETED (ATOMIC with MetricBadge); `light-dark.css:125` DELETED (ATOMIC with the deep-violet
floor). After the re-points, `scale-paper.css:83+84 --focus-ring-shadow` is the SOLE `--focus-ring-color`
reader (one retint knob). **The blast-radius capture covers all 14 token readers** — 9 CSS recipes + the 4 SFCs
(`SegmentedTimeline`/`ScrubberTimeline`/`ContinuousMarkers`/`Slider`) + bridges — over `/dock + /display/buttons
+ /data + a Slider surface`, both modes both engines (E4).

### 4. The grouped-inset Select inversion — the LOAD-BEARING wave, SelectGroup renders the class (E5)

The five R2 folds stand (field-portal `::before` glow recede under `:has(.glass-menu-group)`; re-point not
re-spell via `--select-well-rung`/`--select-well-warm`; focus-ring inner inset WCAG 2.4.7; cartoon-stamp
clearance; dark-0.94 transmissive tune). **E5 resolves the inert-scope gap:** `SelectGroup.vue` renders
`.glass-menu-group` (component-over-class) — grouped Select gets floating cards, ungrouped (no SelectGroup)
stays flat warm-transmissive. STATIC `color-mix(in oklab)` fills (glass-cannot-sample-glass — NO 5th
backdrop-filter, `proof:nested-backdrop-budget` depth-4 ceiling). `SelectLabel` KEEPS `text-dropdown-secondary`
(`proof:dropdown-type-scale` GREEN; the mono-caption header is the DEFERRED falsifier). All other material in CSS.

### 5. The harness — wired, durable, real-port, real-Safari-driven (E6/E7/E8)

The `webkit-deshadcn` Playwright project (Desktop Safari, the 4 WS10 spec globs, `local` tag) + the F4
durability meta-assert (project-exists + all-4-globs-enrolled + all-4-files-exist, born-RED→GREEN + a
dropped-glob self-test bite). The sentinel is `tests-visual/served-app-sentinel.ts` + a new
`assertServedDemoDoc` (E6). The live-π executor starts vite on `:5199` explicitly (E7). The R2/R5 binding
PAINT runs on REAL Safari via the built PT-2 driver (E8) — Playwright-webkit is the CI WIRING proxy ONLY
(no AppKit accent `#100c10`; nested-backdrop compositing divergence). `webkit-deshadcn` is NOT added to
`PI_PROJECTS`.

### 6. Tailwind v4 idiom (small)

`@theme` mints `--text-control`/`--text-control-sm` + `--text-accent-ai` (auto-exposes var AND utility);
`@utility glass-blur-{wash,quiet,floating}`; `--alpha()`/`--spacing()` for any new color-mix/scale. Zero
`theme()` function-syntax, zero arbitrary `<util>-[var(--x)]` where a namespace resolves. Extend
`proof:tailwind-v4-idiom` clause-(d).

---

## FILES TOUCHED (pass-3 §4 + the pass-4 delta)

pass-3 §4 stands. **ADDED / CORRECTED by pass-4:**

- `scripts/lib/shadcn-vocab.mjs` — NEW; **re-export `stripComments` from `critical-path-walk.mjs`** (E3, no 4th copy); the reconciled canonical vocab + the F1-palette + opacity + **`raw-tw-radius`** (E2) arms.
- `scripts/proof-no-shadcn-default.mjs` — import the shared vocab; the 3 class-string arms widen to a **custom/ reach** (E9a).
- `src/components/ui/_shared/OverlayClose.vue` — NEW; the DRY close-button recipe (E1) — collapses opacity-70 + rounded-sm + the neutral state-fill.
- `src/components/ui/dialog/DialogContent.vue:244` + `sheet/SheetContent.vue:135` — compose `<OverlayClose>` (E1).
- `src/components/ui/select/SelectGroup.vue:16` — render `.glass-menu-group` (E5).
- `src/components/ui/alert/index.ts:11` — `rounded-lg` → `rounded-card` (E2).
- `src/components/ui/dropdown-menu/DropdownMenuShortcut.vue:11` — DROP `opacity-60` (E12); `toast/ToastDescription.vue:21` → `text-(--popover-foreground)` (E12).
- `tests-visual/served-app-sentinel.ts` — ADD `assertServedDemoDoc(page)` (E6 — path corrected, NO `lib/`).
- `docs/tranches/BG/audit/wkdriver.swift` (or a new driver) — extend to `loadRequest(:5199)` + `evaluateJavaScript` + `getImageData` + `colorScheme` toggle (E8/PT-2); OR a `safaridriver` WebDriver client harness.
- `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` — NEW (greenfield), authored at the GATE wave AFTER the P6 rewire lands (E11).
- The rest of pass-3 §4 (the four spec files, the durability meta-assert, the cascade-token edits, the R2/R3 CSS, the ai-amber/opacity mints, ToastClose, ToastAction, ScrubberTimeline, MetricBadge, the forced-colors set) — UNCHANGED.

**NOT touched (collision C1):** `theme/radius.css`, `proof-squircle-language.mjs` (RELINQUISHED to WS4;
no-regression GREEN). The new `raw-tw-radius` arm scans **class-string UTILITIES** (`rounded-md` &c.), NOT
the `--radius-*` token definitions — it is disjoint from the squircle/radius-token axis, no overlap.

---

## WAVE BREAKDOWN

> **Precondition W0 (WS4, `BG.W-DESHADCN-SWEEP`):** UNCHANGED from pass-3 — register `proof:de-shadcn`
> ATOMIC born-GREEN HEAD-mode (gates.mjs row + package.json script + ci tag; verified 0 package.json hits);
> clear the 9 form violations; add the steppers + the `opacity-utility` denylist arm; mint
> `--opacity-disabled-strong:0.2` + `--icon-decoration-opacity:0.5`; bare `node scripts/proof-de-shadcn.mjs`
> HEAD-mode GREEN; `proof:gate-script-parity` + `proof:gate-manifest-sound` GREEN on the committed tree.
> **E10:** resolve the cascade ownership — land WS3-M5 first then rebase WS10's renames, OR WS10 owns the
> cascade and M5 rebases (ONE owner; never edit the 3 files on a divergent base twice).

### BG.W-DESHADCN-CENSUS — EXTEND, never re-author
The N3 DRY extract (E3 — re-export stripComments) + the F1-palette + opacity + **`raw-tw-radius`** (E2) arms
+ the **custom/ reach** for the 3 class-string arms (E9a). NO new gate id. Born-RED on `ToastClose` red +
the **11** opacity utilities (E1) + the radius leaks (E2) + the 4 unenrolled forced-colors carriers.
**Acceptance:** the full ui/+custom/ sweep records ZERO false positives (ai-amber token-re-pointed,
`opacity-0`/`-100` excluded, `--my-text-red-300x` boundary-spared, `rounded-full` excluded); reds every
residual; ATOMIC born-GREEN as each folds. The `<style>`-body scan is BOOKED to `BG.W-DESHADCN-STYLE-BODY`
(E9b).

### BG.W-DESHADCN-TOKEN-REPLACE — replacement + dead deletes + focus-ring
pass-3 set PLUS: the `OverlayClose` DRY fold (E1), the alert `rounded-card` + DropdownMenuShortcut/ToastDescription
re-points (E2/E12), the F3-calibrated `--focus-ring-color` with the **14-reader blast radius** (E4). The THREE
atomic commit-units (§0) inseparable. **Acceptance:** the FULL affected-gate suite GREEN (NOT build-green);
π#1 (toggle DARK), π#3 (focus ring ≥3:1 + reads-as-warm-accent + the 14-reader blast capture incl. Slider +
timeline + the dark native checkbox/radio white glyph ≥4.5:1 REAL Safari + the dark crown reads `--foreground`);
each reskin re-earns `proof:ba-gestalt` on a FRESH non-authoring capture.

### BG.W-TAILWIND4-IDIOM — idiom closure (SMALL)
UNCHANGED. `--text-control`/`-sm` + `--text-accent-ai` `@theme` + `@utility glass-blur-*`; extend
`proof:tailwind-v4-idiom` clause-(d).

### BG.W-DESHADCN-MATERIAL — the grouped-inset Select inversion (LOAD-BEARING) + Switch
The five R2 folds + **SelectGroup.vue renders `.glass-menu-group`** (E5). STATIC `color-mix(in oklab)`, no
5th backdrop-filter. **Acceptance:** the binding NON-AUTHORING capture confirms 3 SEPARATED cards in BOTH
modes — **the R2 judge is REAL SAFARI via the built PT-2 driver** (E8), WebKit-dark ΔL≥0.06 by getImageData
on the FINAL design (SelectLabel-untouched), rows contained, gutter visible, ungrouped panels
warm-transmissive; the committed `deshadcn-select-grouped.spec.ts` + the on-disk uniform-slab-vs-3-cards pair;
the demo UP on `:5199` (E7); FULL affected-gate suite GREEN. **Falsifier:** if real-Safari-dark STILL fails →
escalate to the DEFERRED mono-caption header (§7).

### BG.W-DESHADCN-GATE — lock + paint + canon (the close)
Lock the extended `proof:no-shadcn-default` GREEN; confirm `proof:de-shadcn` GREEN; **wire `webkit-deshadcn`
AFTER all four specs exist + the durability meta-assert** (E6 sentinel path corrected); run the FULL
affected-gate suite via `node scripts/gates.mjs --run <tags>`; **author the BG forms/controls gestalt-roster
AFTER the P6 surface-closure rewire lands** (E11) + run the four binding π (the non-authoring judge, demo UP
on `:5199`, Chrome AND real Safari); commit the two on-disk born-RED→GREEN artifacts; **reuse the
`BD.W-DESHADCN-CANON.md §3` clause text VERBATIM** for the CLAUDE.md de-shadcn canon fold (it is already
authored, deferred BC→BD→BE→BF) + the coverage-arm + custom/-reach extension + the `BG.W-DESHADCN-STYLE-BODY`
booking note.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the FULL affected-gate suite, NOT vue-tsc+build)

The full affected-gate suite via `node scripts/gates.mjs --run <tags>`: `proof:no-shadcn-default` (extended —
palette + opacity + **radius** + custom/ reach), `proof:de-shadcn` (HEAD mode), `proof:dropdown-type-scale`
(STAYS GREEN), `proof:no-gray`, `proof:glass-cohesion`, `proof:no-layout-animation`, `proof:menu-glass`,
`proof:control-tokens`, `proof:squircle-language` (no-regression), `proof:tailwind-v4-idiom`,
`proof:webkit-backdrop` (after `npm run build`), `proof:nested-backdrop-budget`, `proof:safari-webgl` (S4 +
durability clause), `proof:visual-runner`, `proof:gate-script-parity`, `proof:gate-manifest-sound`. Rebuild
dist before the `dist/styles/index.css` gzip ≤140_000 budget. `verify-siblings-intact` before/after.

**The four born-RED π — NON-AUTHORING judge, BOTH modes, Chrome AND real Safari, demo UP on `:5199` (E7), getImageData:**

1. **Toggle selected (DARK):** `data-[state=on]` resolves a non-transparent oklab tinted fill + glyph ≥4.5:1. (Playwright-webkit sufficient.)
2. **Grouped-inset Select (LOAD-BEARING):** 3 SEPARATED cards (ΔL ≥ ~0.06 above the recessed panel-base, WebKit-dark, on **REAL Safari via the built PT-2 driver** — E8), rows contained, gutter visible, ungrouped warm-transmissive. Commit the uniform-slab-vs-3-cards pair.
3. **Focus ring (F3-calibrated, 14-reader blast radius — E4):** ≥3:1 over SOLID cream + L16 dark AND reads as a warm luminous accent + ≥1 NON-INPUT ring + the blast capture over `/dock + /display/buttons + /data + a Slider`; the dark native checkbox/radio white glyph ≥4.5:1 over deep violet (REAL Safari binding); the dark crown reads `--foreground`. Commit the falsified-bright-vs-fixed-deep pair.
4. **Forced-colors:** `@media (forced-colors:active)` → non-`none` outline on `.input-bar:focus-within` + every box-shadow focus carrier (Chromium AND Firefox).

**PLUS the census born-RED deltas:** `ToastClose` reds `raw-tw-palette`; the 11 opacity utilities red
`opacity-utility`; alert + close-buttons red `raw-tw-radius`; the ai-amber is NOT a hit (token-re-pointed) —
all GREEN after the folds. **PLUS:** the forms/controls gestalt-roster row + per-surface VERDICT (post-P6,
E11); distinguish befitting-SKIP from PASS.

---

## FOLDED / DEFERRED

pass-3 §7 stands. **AMENDED:**
- The four literal leak arms (palette + opacity + **radius**) are UN-DEFERRED. The full per-control
  STATE-COVERAGE archetype matrix for NON-form custom/ components stays booked.
- **`<style>`-body var(--popover)-slab scan** → BOOKED to NAMED successor `BG.W-DESHADCN-STYLE-BODY` (E9b,
  no-silent-drop); the live ScrubberTimeline residue fixed by named edit this wave.
- **The mono-caption picker section voice** → DEFERRED (the R2 escalation target).
- **`.glass-menu-group` extension to DropdownMenuGroup/ContextMenuGroup** → THIS-WAVE-or-BOOK (orchestrator
  call; SelectGroup is the binding ≥1, the menu groups are the ≥2 generalization).
- **The dark warm-hue flip** → ATOMIC-with-`proof:no-gray` or BOOKED.
- **The forced-colors hand-list retirement** → DEFERRED (Firefox/WHCM capture OWED; hand-list KEPT).
- **Single-site opacity rungs** → PREFER an ink re-point over a 1-use token (DRY).

---

## OPEN RISKS (the falsifiers)

- **R2 (HIGHEST, the unconverged frontier) + E8 (its tool):** the grouped-Select inversion might still not
  separate on REAL Safari dark — AND the binding-judge driver does not exist yet (both on-disk drivers are
  `loadFileURL` 256pt fixtures). PT-2 (build the `:5199`-route + getImageData Safari driver) is the
  prerequisite; if it cannot be built, the R2 verdict cannot be earned and the wave escalates to the DEFERRED
  mono-caption header by default. The field-portal glow recede (R2-fold-1) is the architectural separation fix.
- **E1/census-completeness:** the opacity arm reds 11, not 9 — a 9-fold table ships born-RED-never-GREEN. The
  `OverlayClose` fold + the full 11-site table is the catch.
- **E7/dead-port:** every live-π fails-closed if the demo binds `:5173` while the capture points `:5199`.
  Verify served-port == target before any getImageData.
- **F3/E4 focus-ring:** the calibrated `--focus-ring-color` must clear ≥3:1 AND read as a warm accent across
  ALL 14 readers (incl. Slider + timeline thumbs, the undercounted surface) — the two-ended π#3 + the
  expanded blast capture is the catch.
- **F2/native accent:** the deep-violet floor defended by crossover-robustness (NOT forced-white rescue);
  REAL Safari native-control capture OWED; EDIT-1↔EDIT-3 atomicity load-bearing; HUE-ONLY lockstep recorded.
- **E9/the 5-tranche recurrence:** the gate stays blind to custom/ + `<style>`-body unless the custom/ reach
  lands AND the `<style>`-body scan is an explicit named booking (not a silent gap). The cheap half lands now;
  the booking is named.
- **E10/cascade collision:** four streams edit 3 files; ONE owner, never a divergent double-edit.
- **E11/moving gate:** author the gestalt roster only AFTER the P6 surface-closure rewire lands.
- **F4/N2 durability:** the meta-assert must be BUILT (project-exists + all-4-globs + all-4-files, born-RED→GREEN
  + a dropped-glob self-test bite). webkit-deshadcn is `local`-tagged; NOT in `PI_PROJECTS`; config edit AFTER
  all four specs exist.

---

## CONVERGENCE STATE

Every MECHANISM (pass-2) + every pass-3 risk/critique mustFix (F1–F4, N1–N4, R2–R5) + the twelve pass-4
on-disk EXECUTION corrections (E1–E12) are folded. The UNCONVERGED FRONTIER is DEVELOPMENT EXECUTION: the
four born-RED π by a NON-AUTHORING judge over LIVE Chrome AND **a real-Safari driver that must first be
built** (E8/PT-2), both modes, demo UP on `:5199` (E7); the on-disk born-RED→GREEN artifacts committed; the
SFC/CSS edits landed (currently NOT on tree); the FULL affected-gate suite GREEN. The single load-bearing
residual is the R2 grouped-Select WebKit-DARK separation on REAL Safari — if it fails, escalate to the
DEFERRED mono-caption header.
