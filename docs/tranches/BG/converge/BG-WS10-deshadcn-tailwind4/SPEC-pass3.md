# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass3 (DEVELOPMENT EXECUTION)

> COMPLETELY abrogate default shadcn + tailwind paint while KEEPING the reka/shadcn
> behaviour substrate. The DEEP, dedicated form of WS4's de-shadcn-sweep. reka = BEHAVIOUR /
> glass-ui = 100% of MATERIAL.

**Base: `SPEC-pass2-converged.md` (adopted WHOLE — its five frontier rulings R1–R5 + the two collision
rulings C1/C2 + the §0.1 dropped-BE custom/ residuals stand exactly as written).** This pass-3 does NOT
re-converge the mechanisms — they ARE converged. It advances the **unconverged frontier: DEVELOPMENT
EXECUTION**, and folds the four NET-NEW risks the pass-3 research fleet surfaced (each re-verified on
`tranche/BG` HEAD `069db6c4` this session, file:line on disk):

| # | NET-NEW (not in pass-2) | on-disk truth | ruling |
|---|---|---|---|
| **N1** | The directive's "zero default tailwind paint on **ANY** component" bar is GENUINELY UNMET — the converged vocab census does NOT catch raw Tailwind **palette** nor **opacity-NN utilities**. | `ToastClose.vue:24 text-red-300 / text-red-50` (shadcn destructive-toast residual); **9** live `opacity-NN` utilities across `ui/`; `proof-no-shadcn-default.mjs:74-140` FORBIDDEN list = 8 vocab items, NO palette arm, NO opacity-utility arm. | **UN-DEFER the minimal slice.** pass-2 §7 BOOKED "the vocab census already satisfies ANY component" — that is FALSIFIED. Add TWO vocabulary arms (raw-palette + opacity-NN-utility) to the census, born-RED on the real residuals, each folded to a token (§N1). NOT the full archetype state-matrix (still booked) — only the two literal **color/opacity-leak** arms the directive names verbatim. |
| **N2** | The four binding π would run **chromium-only** — the "Safari arm" silently no-runs. | `playwright.config.ts:117-121` webkit project `testMatch: ["safari-webgl.spec.ts","aurora-swraster.spec.ts"]` ONLY; the four WS10 specs route to `chromium-headless-new` + `coarse-touch` (both Desktop Chrome). webkit browsers ARE installed. | **Harness gap is a hard FILES-TOUCHED item.** Add the four WS10 specs to a `webkit-deshadcn` project (or widen the webkit `testMatch`); `playwright.config.ts` JOINS FILES TOUCHED. AND: Playwright-webkit ≠ shipping Safari for nested-backdrop compositing — the R2 Select capture's binding judge is **real Safari via chrome-devtools-mcp / a real-device run**, with Playwright-webkit as the CI proxy only (§N2). |
| **N3** | The shadcn denylist VOCAB is DUPLICATED across the two gates. | `proof-de-shadcn.mjs` + `proof-no-shadcn-default.mjs` each re-spell `bg-background`/`border-input`/`ring-ring`/`ring-offset`/`rounded-md`/`shadow-sm` (6-7 shared ids). `scripts/lib/` already hosts shared gate leaves (`critical-path-walk`, `paint-arm`, `surface-closure`). | **DRY single-source.** Extract `scripts/lib/shadcn-vocab.mjs`; both gates import it. A 9th vocab item (the N1 palette/opacity arms) then lands in ONE place (§N3). |
| **N4** | Two converged folds are imprecise — a naive fold drops live behaviour. | `ToastAction.vue:26` carries 4 `group-[.destructive]:` arms NOT in `buttonVariants`; `ScrubberTimeline.vue:258-259` is a **2-prop** slab (color AND background), not the 1-prop `ContinuousTimeline` precedent. | **Fold-precision corrections** (§N4): ToastAction → `cn(buttonVariants({outline\|secondary,sm}), <the 4 destructive arms preserved as a tail>)`; ScrubberTimeline → 2 props (color→`var(--popover-foreground,var(--foreground))` AND background→a glass register). |

Plus the W0 stepper-coverage gap (confirmed: `CONTROLS.NumberField.sfcs = ["NumberFieldInput.vue"]` only;
`NumberFieldIncrement/Decrement.vue:25 disabled:opacity-20` SLIP the CSS-decl opacity regex) and the
unregistered-gate fact (`grep "de-shadcn" package.json` → 0; gates.mjs → 2 note-strings only).

**The honest convergence state at pass-3:** every MECHANISM is locked (pass-2). What pass-3 adds is (a) the
two coverage arms that make "ANY component" literally true, (b) the harness wiring so the Safari arm actually
runs, (c) the DRY leaf, (d) the two fold corrections — and then the EXECUTION discipline: the four born-RED π
by a NON-AUTHORING judge over a LIVE dev server in **Chrome AND real Safari, both modes**, with the R2
grouped-Select WebKit-dark separation as the single load-bearing capture.

---

## 0. WHAT CARRIES FORWARD UNCHANGED (read pass-2 §0–§3 as authoritative)

The five frontier rulings are ADOPTED VERBATIM from `SPEC-pass2-converged.md`:

- **R1** — the selected toggle: `.glass-toggle` MARKER class on `toggleVariants` base + widen
  `surfaces.css:282` `:where(...)` to include `.glass-toggle` (NOT compose `.glass-capsule`); couple the glyph
  re-point (`text-accent-foreground`→`text-foreground`) + hover-well (`--glass-bg-quiet`) in the SAME edit.
- **R2** — grouped-inset Select: RECESS `SelectContent` to a WELL tier, FLOAT `.glass-menu-group` cards,
  per-mode LIFTING `--menu-group-fill` (dark LIFTS toward warm-ink), token-first rim
  (`--glass-edge-light`/`--glass-material-rim`/`--shadow-cartoon-md`, NO raw hsl), scoped
  `[data-slot=select-content]:has(.glass-menu-group)`, ΔL≥0.06 **WebKit-dark specifically**.
- **R3** — the focus-ring 3-surface decouple: make the `--focus-ring-shadow` INNER 2px stop SOLID (the
  library-wide WCAG 1.4.11 FIX), fold the input, `--ring`→`--focus-ring-color`, crown→`--foreground`, native
  deep-violet floor, dead-token deletes (`--input`/`--color-input`/`--color-ring`/phantom `--color-accent-opaque`).
- **R4** — forced-colors: base `outline: 2px solid transparent; outline-offset: 2px` on every box-shadow focus
  recipe; KEEP the hand-list this wave (additive coexist).
- **R5** — native accent: **EDIT 1 (delete `light-dark.css:125`) ATOMIC with EDIT 3** (`dark-arm.css .dark`:
  `--accent-color: oklch(from var(--primary) 0.532 0.180 h)`).

The two collision rulings stand: **C1** `--corner-k-*`/squircle → RELINQUISHED to WS4 (run
`proof:squircle-language` as a no-regression GREEN check only). **C2** land WS3-M5 first, rebase WS10's
`--ring`/`--input` renames onto it (line-disjoint, merge-conflict risk only).

The §0.1 hard prerequisites stand: **MetricBadge.vue:108 `outline-ring`→`.focus-ring` is ATOMIC with the
`--color-ring` delete** (sole live `--color-ring` consumer in all `src/` — re-confirmed this session: exactly
one hit); ScrubberTimeline.vue:258-259 fold (now §N4-precise).

**THE THREE ATOMIC COMMIT-UNITS (binding in the multi-agent loop):**
1. (delete `light-dark.css:125`) + (`dark-arm.css` deep-violet floor) — else ships the falsified bright violet.
2. (MetricBadge `outline-ring`→`.focus-ring`) + (`--color-ring` bridge delete) — else silently kills the ring.
3. (dark `--focus-ring-color` warm-hue flip hsl-48→hsl-30) + (`proof:no-gray` `warm-hue-dark-focus-ring`
   witness) — OR BOOK both (the rename/fold/decouple/dead-deletes are hue-neutral, land regardless).

---

## N1. THE COVERAGE-HOLE CLOSURE — make "ANY component" literally true (the pass-3 ADVANCE)

The directive bar is verbatim: *"no default ring/shadow/radius/**color**/**variant** leak."* The converged
vocab census catches `bg-background`/`border-input`/`ring-*`/`rounded-md`/`shadow-sm`/`bg-{muted,secondary,
primary,accent}` — but a **raw Tailwind palette `text-red-300`** and a **raw `opacity-90` utility** are
literally a default-tailwind color/opacity leak the census is BLIND to. pass-2 §7 BOOKED this as "satisfied by
the vocab census"; the on-disk residuals FALSIFY that. pass-3 closes it with TWO bounded vocabulary arms — NOT
the full archetype state-matrix (that stays booked).

### N1.1 The raw-Tailwind-palette arm

**Add to the shared vocab (`scripts/lib/shadcn-vocab.mjs`, §N3):**
```
id: "raw-tw-palette"
re: /(?<![\w:-])(?:text|bg|border|from|to|via|ring|fill|stroke|decoration|outline|shadow)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}(?![\w-])/
why: "a raw Tailwind palette color (a default-tailwind paint leak) — read a glass-ui --section-color/--viz/--neutral token"
```
Comment-stripped (the gate already runs `stripComments`), so `button/index.ts:165`'s commented
`bg-amber-500` is NOT a hit. Born-RED on the **one real residual**: `ToastClose.vue:24
group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50`.

**THE FOLD — `ToastClose` destructive-red → the feedback-tone register.** The toast destructive context
already speaks `--destructive`/`--destructive-foreground` (the W-FEEDBACK-TONE family). Re-point the two raw
reds: `group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground`
(or a `/80`→`/100` hover lift on the SAME token). One-token, clean break.

**THE ai-variant AMBER RULING (the fenced-keep, NOT a residual).** `button/index.ts:170 text-amber-700
dark:text-amber-400` is the AI-gleam GLYPH ink, paired 1:1 with the line's own
`[--glass-accent:oklch(0.78 0.14 75)]` warm-amber rim accent — a DELIBERATE brand identity, not a shadcn
default. A naive palette arm would false-RED it. **Ruling: re-point to a token (token-first IS the brief),
do NOT allowlist.** Mint a per-mode `--accent-ai-ink` pair (`tokens/glass.css` light = the amber-700 OKLCh
equivalent `oklch(0.55 0.13 75)`; `tokens/dark-arm.css` dark = the amber-400 equivalent `oklch(0.80 0.13 75)`
— hue 75 matching the existing `--glass-accent`), bridge `--text-accent-ai` in `theme/bridges.css`, the glyph
reads `text-accent-ai`. This is the SAME warm-amber the `--glass-accent` rim already carries — ONE hue, two
channels (rim accent + glyph ink), zero raw palette. The arm then has ZERO false-positives by construction.

### N1.2 The opacity-NN-utility arm (the library-wide opacity-literal twin)

The converged `proof-de-shadcn.mjs` opacity arm is `/opacity:\s*0?\.\d+\s*;/` — a CSS **declaration** regex
(W0's witness is `control-surfaces.css:153 opacity:0.5`). It is BLIND to the Tailwind **utility** form
`disabled:opacity-20`. The census-wide truth: **9 live `opacity-NN` utilities across `ui/`**, each a
hardcoded-magic-number opacity leak.

**Add to the shared vocab:**
```
id: "opacity-utility"
re: /(?<![\w:-])(?:[\w-]+:)?opacity-(?:[1-9]|[1-9]\d)(?![\w-])/   // opacity-1..99, NOT opacity-0 / opacity-100 / opacity-disabled
why: "a hardcoded opacity-NN utility — read a named --opacity-* token via opacity-(--token)"
```
NEUTRAL exclusions (NOT hits): `opacity-0`/`opacity-100` (full transparent/opaque — animation endpoints, not a
disabled/dim magic number), `opacity-disabled` (already the token), the `data-[state]:`/`group-hover:opacity`/
`focus:opacity` liquid-reveal/animation grammar (the `:`-lookbehind fence keeps these — they are MOTION, not a
static material magic number). Born-RED on the **9** static-dim residuals:

| site | utility | fold |
|---|---|---|
| `NumberFieldIncrement.vue:25` + `NumberFieldDecrement.vue:25` | `disabled:opacity-20` | `opacity-(--opacity-disabled-strong)` (W0 mints `--opacity-disabled-strong:0.2`) |
| `ComboboxInput.vue` + `CommandInput.vue` + `MultiSelect.vue` icon | `opacity-50` | `opacity-(--icon-decoration-opacity)` (W0 mints `--icon-decoration-opacity:0.5`) |
| `DropdownMenuShortcut.vue:11` | `opacity-60` | `opacity-(--opacity-shortcut)` (mint `:0.6`, OR re-point onto the existing `--dropdown-secondary` ink which already dims) |
| `Label.vue:32` | `peer-disabled:opacity-70` | `peer-disabled:opacity-(--opacity-disabled)` (the 0.5 named rung — a disabled label is a disabled control) |
| `ToastDescription.vue:21` | `opacity-90` | `text-(--popover-foreground)` at full opacity, OR `opacity-(--opacity-quiet)` (mint `:0.9` IF a 90% dim is a real register) — prefer the ink re-point |
| `button/index.ts` | `opacity-80` (an active-state arm) | re-point onto a named `--opacity-*` rung or fold into the press register |

**The mint discipline:** every new `--opacity-*` rung carries ≥2 consumers OR re-points an EXISTING named ink
(the no-contrivance bar). `--opacity-disabled-strong` (2 steppers) + `--icon-decoration-opacity` (3 search
icons) clear it by construction. The shortcut/description single-site ones PREFER an ink re-point over a 1-use
token (DRY). W0 owns the steppers + the two strong mints; **the remaining 7 ui/ sites fold in
`BG.W-DESHADCN-TOKEN-REPLACE`** (they are not form-control-disabled, so they are out of W0's 9-violation form
scope — they are the N1 census-extension residuals).

### N1.3 Where the arms run

Both arms join `proof:no-shadcn-default` (the 233-file `ui/` walker) via the shared vocab — NOT a new gate id
(the no-new-id fence). The palette + opacity arms are CLASS-STRING arms (they scan the same SFC/CVA class
strings the existing 8 vocab arms scan), comment-stripped, with the SAME `:`-lookbehind grammar fence so the
liquid-reveal/animation `opacity-0`/`data-[state]:` forms are spared. Born-RED on the residuals enumerated
above; ATOMIC born-GREEN as each folds.

---

## N2. THE HARNESS GAP — wire the Safari arm so it actually runs (N2 hard FILES-TOUCHED)

**The trap (verified `playwright.config.ts:117-121`):** the `webkit` project `testMatch` is EXACTLY
`["safari-webgl.spec.ts","aurora-swraster.spec.ts"]`. The four WS10 binding specs
(`deshadcn-toggle.spec.ts`, `deshadcn-select-grouped.spec.ts`, `deshadcn-focus-ring.spec.ts`,
`deshadcn-forced-colors.spec.ts`) match only `chromium-headless-new` + `coarse-touch` (both Desktop Chrome).
**Without a config edit the "Chrome AND Safari" mandate silently runs chromium-only = the exact
headless-green/visually-broken trap that shipped 3×.**

**The fix (two acceptable forms, pick one):**
- **(A) a dedicated `webkit-deshadcn` project** appended to the projects array, `testMatch` = the four WS10
  spec globs, `use: { ...devices["Desktop Safari"], viewport }`, the `local` tag (a real WebKit + demo). This
  keeps the existing 2-spec cross-engine project untouched.
- **(B) widen the existing webkit `testMatch`** to include the four globs. Simpler, but couples the WS10 set
  to the BC.W-SAFARI-WEBGL project's intent.

**Prefer (A)** — it is additive, names the intent, and does not re-time the existing cross-engine project.
`playwright.config.ts` JOINS the FILES TOUCHED list (the pass-2 §4 omitted it — the load-bearing correction).

**The Playwright-webkit ≠ shipping-Safari caveat (N2, the compositing divergence).** Playwright's bundled
WebKit historically diverges from shipping Safari on nested `backdrop-filter` compositing — exactly the R2
grouped-Select mechanism (a static color-mix card POPPING off a backdrop-filter-recessed panel). A getImageData
ΔL≥0.06 PASS on Playwright-webkit is NECESSARY but not SUFFICIENT. **The R2 binding judge is real Safari** —
captured by a non-authoring judge via `chrome-devtools-mcp` driving an actual Safari (or a real-device run) over
the LIVE `:5199` demo, both modes. Playwright-webkit is the CI-runnable proxy (the WIRING proof); real Safari is
the PAINT proof (the §6 split). The other three π (toggle/focus-ring/forced-colors) are NOT
nested-backdrop-sensitive, so Playwright-webkit is sufficient for them — but real Safari is still run for the
gestalt verdict.

---

## N3. THE DRY SINGLE-SOURCE — `scripts/lib/shadcn-vocab.mjs`

The shadcn denylist vocabulary is duplicated across `proof-de-shadcn.mjs` and `proof-no-shadcn-default.mjs`
(6-7 shared ids). `scripts/lib/` already hosts shared gate leaves. Extract:
```
// scripts/lib/shadcn-vocab.mjs
export const SHADCN_VOCAB = [ {id, re, why}, ... ]   // the 8 existing + raw-tw-palette + opacity-utility
export const stripComments = (s) => ...               // the shared comment-strip (both gates have a copy)
```
Both gates import it. The N1 palette + opacity arms land in ONE place. The `:`-lookbehind grammar fence
(`(?<![\w:-])`) is encoded in each `re` (NOT a pre-strip — a grammar pre-strip BREAKS the fence; a leading
`bg-primary` on a form well still reds). This is a pure refactor — the bare-HEAD output of both gates is
byte-identical before the N1 arms are added (the extract is born-GREEN; the N1 arms are the born-RED delta).

---

## N4. FOLD-PRECISION CORRECTIONS (the two imprecise converged folds)

**N4.1 — ToastAction preserves its destructive arms.** `ToastAction.vue:26` =
`border bg-transparent hover:bg-secondary h-[calc(2rem*var(--ui-scale))] text-sm transition-colors` PLUS four
toast-context arms: `group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30
group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground`. A bare
`buttonVariants({outline\|secondary,sm})` fold DROPS the red-on-hover. **Fold as:**
`cn(buttonVariants({ variant: 'outline', size: 'sm' }), '<the 4 group-[.destructive] arms, verbatim>',
props.class)`. The destructive arms ride as a `cn()` tail (they are toast-context, not a button variant).

**N4.2 — ScrubberTimeline is a 2-prop fold.** `ScrubberTimeline.vue:258-259` carries BOTH
`color: var(--popover-foreground)` AND `background: var(--popover)` — the `ContinuousTimeline.vue:334`
precedent folds only the TEXT color. **Fold both:** `color: var(--popover-foreground, var(--foreground))`
AND `background: <a glass register>` (the floating-panel/menu plate the caret reads against — read the
existing `--glass-bg-floating` or the `--card` plate, NOT the bare `var(--popover)` shadcn slab). 2 props.
Coordinate with WS4's `BG.W-TIMELINE-ENCAPSULATE` (same SFC — the 2-line re-point is line-disjoint from the
CSS-externalization, but flag it so the WS4 encapsulation lands the re-point not the slab).

---

## 4. FILES TOUCHED (delta from pass-2 §4)

pass-2 §4 stands. **ADDED by pass-3:**
- `scripts/lib/shadcn-vocab.mjs` — NEW (the DRY single-source vocab + comment-strip leaf, §N3).
- `scripts/proof-de-shadcn.mjs` — import the shared vocab; **add the steppers** to `CONTROLS.NumberField.sfcs`
  (`NumberFieldIncrement.vue` + `NumberFieldDecrement.vue`) + an **`opacity-utility` denylist arm** so
  `disabled:opacity-20` reds (W0 owns the clear). (W0-scoped, recorded here for the coverage truth.)
- `scripts/proof-no-shadcn-default.mjs` — import the shared vocab; the **raw-tw-palette arm** + the
  **opacity-NN-utility arm** (§N1) on top of the pass-2 forced-colors-enrollment + whole-`src/` focus-shim arms.
- `tests-visual/playwright.config.ts` — the `webkit-deshadcn` project (the four WS10 specs on Desktop Safari,
  §N2) — **the pass-2 omission corrected.**
- `src/components/ui/toast/ToastClose.vue:24` — `text-red-300`/`text-red-50` → `text-destructive-foreground`
  (the feedback-tone register, §N1.1).
- `src/components/ui/button/index.ts:170` — the ai-variant `text-amber-700 dark:text-amber-400` →
  `text-accent-ai` (the minted warm-amber token, §N1.1).
- `src/styles/tokens/glass.css` + `tokens/dark-arm.css` + `theme/bridges.css` — mint `--accent-ai-ink`
  per-mode pair + the `--text-accent-ai` bridge (§N1.1); mint `--icon-decoration-opacity:0.5` +
  `--opacity-disabled-strong:0.2` (W0) + the shortcut/description opacity rungs (§N1.2).
- `src/components/ui/number-field/NumberFieldIncrement.vue:25` + `NumberFieldDecrement.vue:25` →
  `opacity-(--opacity-disabled-strong)` (W0 form-scope); `dropdown-menu/DropdownMenuShortcut.vue:11`,
  `label/Label.vue:32`, `toast/ToastDescription.vue:21`, `combobox/ComboboxInput.vue`, `command/CommandInput.vue`,
  `multi-select/MultiSelect.vue`, `button/index.ts` opacity-80 → the named-token re-points (§N1.2,
  TOKEN-REPLACE scope).
- `src/components/ui/toast/ToastAction.vue:26` — `cn(buttonVariants({outline,sm}), <4 destructive arms>)` (§N4.1).
- `src/components/custom/timeline/ScrubberTimeline.vue:258-259` — the 2-prop glass-register fold (§N4.2).

---

## 5. WAVE BREAKDOWN (the five waves — pass-2 §5 amended)

> **Precondition W0 (WS4, `BG.W-DESHADCN-SWEEP`):** register the untracked `proof:de-shadcn` (gates.mjs row +
> `package.json` script + ci tag, ATOMIC born-GREEN HEAD-mode — NOT `--post-fix`); clear the **9** form
> violations; **add the steppers** (`NumberFieldIncrement/Decrement.vue`) to `CONTROLS.NumberField.sfcs` + the
> `opacity-utility` denylist arm + the born-RED→GREEN bite for `disabled:opacity-20`; mint
> `--opacity-disabled-strong:0.2` + `--icon-decoration-opacity:0.5`; reconcile the 7-vs-9 narrative to ONE
> count = **9**. Acceptance = BARE `node scripts/proof-de-shadcn.mjs` HEAD-mode. **WS10 sequences strictly
> AFTER W0.** Run `proof:gate-script-parity` + `proof:gate-manifest-sound` GREEN on the COMMITTED tree (never
> born-RED on ci). Confirm the `:5199` live-gate default + the `--run full` close discipline.

### BG.W-DESHADCN-CENSUS — the complete census (EXTEND, never re-author)
pass-2 arms (deep-vocabulary + state-arm-neutral classifier + menuItemVariants allowlist +
forced-colors-enrollment VERIFIED selector set + whole-`src/` focus-shim + EXACTLY-ONE-LIST closure) **PLUS
the §N1 coverage arms** (raw-tw-palette + opacity-NN-utility) **PLUS the §N3 DRY extract**
(`scripts/lib/shadcn-vocab.mjs`, both gates import it). NO new gate id. Born-RED on: the HEAD residuals + the
`ToastClose` red-palette + the 9 opacity-NN utilities + the 4 unenrolled forced-colors carriers. ATOMIC
born-GREEN as TOKEN-REPLACE/MATERIAL fold each. **Acceptance:** the full 233-file sweep records ZERO false
positives (the ai-variant amber is token-re-pointed, so it is NOT a hit; the liquid-reveal/animation `opacity-0`
+ `data-[state]:` forms are fence-spared); reds every residual.

### BG.W-DESHADCN-TOKEN-REPLACE — the replacement sweep + dead-token deletes + the focus-ring fix
pass-2 set (§2.1 toggle marker + §2.2 close-button/ToastAction folds + §2.4 focus-ring inner-stop-SOLID +
3-surface decouple + dead-token deletes + MetricBadge/ScrubberTimeline custom/ folds + base transparent-outline)
**PLUS the §N1 token re-points** (ToastClose→destructive, ai-amber→`--accent-ai`, the 7 non-form opacity-NN
sites) **PLUS the §N4 fold corrections** (ToastAction destructive cn() tail, ScrubberTimeline 2-prop). Clean
break, no alias. The THREE atomic commit-units (§0) are inseparable. **Acceptance:** the FULL affected-gate
suite GREEN (NOT build-green); each visual reskin re-earns `proof:ba-gestalt` on a FRESH NON-AUTHORING capture,
both modes + Chrome AND Safari — π#1 (toggle DARK oklab fill + glyph ≥4.5:1), π#3 (focus ring ≥3:1 over solid
cream+L16 + ≥1 non-input ring + the dark native checkbox/radio white glyph ≥4.5:1 BOTH engines + the dark crown
reads `--foreground`), π#4 (forced-colors non-`none` outline, Chromium AND Firefox). The warm-hue flip ATOMIC
with `proof:no-gray` or BOOKED.

### BG.W-TAILWIND4-IDIOM — the idiom closure (SMALL, polish)
Mint `--text-control`/`--text-control-sm` `@theme` bridges + `@utility glass-blur-{wash,quiet,floating}`; the
N1 `--text-accent-ai` + the opacity `@theme` rungs land idiomatically here (a `@theme` token auto-exposes the
var AND the utility — NO `theme()` function-syntax, NO `<util>-[var(--x)]` arbitrary wrap where a registered
namespace resolves). Extend `proof:tailwind-v4-idiom` clause-(d) completeness; keep GREEN. SANCTIONED-KEEP the
comma-fallback + custom-prop-write brackets. Low investment.

### BG.W-DESHADCN-MATERIAL — the grouped-inset Select elevation-INVERSION (the DEPTH) + Switch material
pass-2 §2.3 envelope (RECESS scoped, FLOAT groups, per-mode LIFTING `--menu-group-fill`, token-first rim, inset
geometry `overflow:hidden` + concentric radius + inter-group gutter, portal-blur confirm). SelectLabel KEEPS
`text-dropdown-secondary` (`proof:dropdown-type-scale` STAYS GREEN). Switch material READS the
`--switch-*`/`--control-*` quads. All material in CSS (menu.css/select.css) — no SFC > 500L. STATIC
`color-mix(in oklab)` fill, NOT a 5th backdrop-filter (the `proof:nested-backdrop-budget` depth-4 ceiling +
glass-cannot-sample-glass). NO new gate. **Acceptance:** the binding NON-AUTHORING capture confirms 3 SEPARATED
correctly-elevated cards in BOTH modes — **the R2 judge is REAL SAFARI** (chrome-devtools-mcp / real-device,
§N2), WebKit-dark ΔL≥0.06 by getImageData, rows contained, gutter visible, UNGROUPED panels warm-transmissive;
dev server UP; FULL affected-gate suite GREEN (SKIP-vs-PASS distinguished for live-π gates). If real-Safari-dark
STILL fails to separate → escalate to the DEFERRED mono-caption header (the lockstep four-label change + the
sized `proof:dropdown-type-scale` re-point — §7).

### BG.W-DESHADCN-GATE — the lock + paint + canon (the close)
Lock the extended `proof:no-shadcn-default` GREEN; confirm the WS4 `proof:de-shadcn` precondition GREEN; **wire
the `webkit-deshadcn` Playwright project (§N2)**; run the FULL affected-gate suite (§6) via
`node scripts/gates.mjs --run <tags>`; enroll the forms/controls gestalt roster + run the four binding π
(six-state matrix, both modes + Chrome AND Safari + the forced-colors arm + the R2 real-Safari capture, the
non-authoring judge, dev server UP); commit the on-disk born-RED→GREEN artifacts (the native-accent
falsified-bright-vs-fixed-deep pair + the Select uniform-slab-vs-3-cards pair); fold the CLAUDE.md de-shadcn
CANON (the deshadcn axiom + the coverage-arm extension + the deep-violet/inner-stop-SOLID rulings).

---

## 6. ACCEPTANCE / REAL-PAINT-π BAR (pass-2 §6 + the pass-3 amendments)

The acceptance is the FULL affected-gate suite — `proof:no-shadcn-default` (extended with the N1 arms),
`proof:de-shadcn` (WS4, HEAD mode), `proof:dropdown-type-scale` (STAYS GREEN), `proof:no-gray`,
`proof:glass-cohesion`, `proof:no-layout-animation`, `proof:menu-glass`, `proof:control-tokens`,
`proof:squircle-language` (no-regression), `proof:tailwind-v4-idiom`, `proof:webkit-backdrop`,
`proof:nested-backdrop-budget`, `proof:gate-script-parity`, `proof:gate-manifest-sound` — run via
`node scripts/gates.mjs --run <tags>`, **NOT vue-tsc+build** (the cardinal lesson). `proof:webkit-backdrop`
runs AFTER `npm run build` (it reads SHIPPED dist; author UNPREFIXED `backdrop-filter` only — the build injects
the `-webkit-` prefix-parity). Rebuild dist before asserting the `dist/styles/index.css` gzip ≤140_000 budget
(current draw ~126.7k; the at-HEAD file is a stale ~6KB `@import` shell until built). Run
`verify-siblings-intact` before/after any close-battery.

**The four born-RED π — each by a NON-AUTHORING judge, BOTH modes, Chrome AND Safari, dev server UP, getImageData:**

1. **Toggle selected (DARK, e2e-paint, media-rich backdrop):** `data-[state=on]` resolves a non-transparent
   oklab tinted fill (NOT the raw rung, NOT transparent) AND the glyph clears ≥4.5:1. (Playwright-webkit
   sufficient — not nested-backdrop-sensitive.)
2. **Grouped-inset Select (the LOAD-BEARING capture):** 3 SEPARATED correctly-elevated cards (card ΔL ≥ ~0.06
   above the recessed panel-base, **WebKit-dark specifically, on REAL Safari via chrome-devtools-mcp / a
   real-device run** — Playwright-webkit is the CI proxy, NOT the binding judge, §N2), rows contained, gutter
   visible, ungrouped panels warm-transmissive. `proof:dropdown-type-scale` GREEN. Commit the
   uniform-slab-vs-3-cards born-RED→GREEN pair on disk.
3. **Focus ring (folded, inner-stop-SOLID):** ≥3:1 WCAG 1.4.11 over SOLID cream + L16 dark (the control's own
   fill, NOT a busy field) + ≥1 NON-INPUT ring; the dark native checkbox/radio white glyph ≥4.5:1 over the deep
   violet (BOTH engines, checkbox + radio-dot, on `/forms/checks`); the dark configurator crown reads
   `--foreground`. Commit the falsified-bright-violet-vs-fixed-deep-violet born-RED→GREEN artifact on disk.
4. **Forced-colors:** `@media (forced-colors:active)` → non-`none` outline on `.input-bar:focus-within` + every
   box-shadow focus carrier (Chromium AND Firefox — the transparent-outline recolouring confirmed by a real WHCM
   capture).

**PLUS the pass-3 born-RED census deltas (source gate, born-RED→GREEN):** the `ToastClose` red-palette reds the
`raw-tw-palette` arm (GREEN after the destructive re-point); the 9 `opacity-NN` utilities red the
`opacity-utility` arm (GREEN after the token re-points); the ai-variant amber is NOT a hit (token-re-pointed).

**PLUS:** the close-hover well VISIBLE over the 0.68/0.76 dialog plate (§2.2); the forms/controls gestalt-roster
row + per-surface VERDICT recorded; the demo launched + dist rebuilt; distinguish befitting-SKIP from PASS for
the live-π gates (`nested-backdrop-budget`, `ba-gestalt` — both fail-closed when device+demo present,
befitting-SKIP only on a zero-device runner).

---

## 7. FOLDED / DEFERRED (pass-2 §7 + the pass-3 delta)

pass-2 §7 stands. **AMENDED:**
- **The "ANY component" non-form vocab leak is NO LONGER fully booked.** pass-3 §N1 UN-DEFERS the two literal
  color/opacity-leak arms (raw-tw-palette + opacity-NN-utility) — they ARE the directive's named "color leak."
  What STAYS booked is only the full per-control STATE-COVERAGE archetype matrix (well/trigger/container/toggle/
  range × six states) for the NON-form components — a structural-completeness gate, not a leak the directive
  names verbatim.
- **The mono-caption picker section voice** — DEFERRED (R2 escalation target). Keeps `text-dropdown-secondary`.
- **`.glass-menu-group` extension to DropdownMenuGroup/ContextMenuGroup** — THIS-WAVE-or-BOOK (orchestrator call).
- **The dark `--focus-ring-color` warm-hue flip** — ATOMIC-with-`proof:no-gray` or BOOKED.
- **The forced-colors hand-list retirement** — DEFERRED (needs base outline on EVERY recipe + Chromium+Firefox
  no-regression capture; the hand-list is KEPT, additive outlines coexist).
- **The single-site opacity rungs (`--opacity-shortcut`, the ToastDescription 90% dim)** — PREFER an ink
  re-point over a 1-use token (DRY); mint only if a real ≥2-consumer register emerges.

---

## 8. OPEN RISKS (the falsifiers — what would break pass-3)

- **R2 (HIGHEST residual, UNCHANGED) — the grouped-Select inversion might still not separate on REAL Safari dark.**
  The N2 sharpening: a Playwright-webkit PASS is necessary-not-sufficient (the nested-backdrop compositing
  divergence). The binding judge is real Safari. If real-Safari-dark fails → the DEFERRED mono-caption header.
  **The unconverged frontier.**
- **N1-a — the raw-palette/opacity arms might false-RED a legitimate keep.** The ai-variant amber is the only
  known brand-palette keep, and pass-3 re-points it to a token (zero false-positive by construction). Risk: a
  `data-[state]:opacity-N` motion-grammar form leaks past the `:`-lookbehind into the static arm — mitigated by
  the fence (the motion forms carry a `:` variant prefix; the static `opacity-NN` base does not). The 233-file
  zero-false-positive fixture is the gate's own self-test.
- **N2 — the harness widen might re-time CI or the webkit project might not be `local`-tagged correctly.** The
  dedicated `webkit-deshadcn` project (form A) is additive; the four specs are `local`-tagged (real WebKit +
  demo), so CI proves WIRING and the local run proves PAINT (the proof:visual-runner split). A mis-tag would run
  webkit headless in CI without a GPU/demo — the served-app sentinel fail-closes.
- **R1/R3/R4/R5 — RESOLVED-to-mechanism (pass-2).** R3 colorimetrically exact; R5 EDIT-1↔EDIT-3 atomicity is the
  load-bearing constraint (the on-disk artifact is owed); R4 Chromium-confirmed, Firefox capture owed (non-blocking,
  hand-list KEPT); R1 e2e-paint π is the only catch (fallback: element-level color-mix re-declare).
- **R6 — sequencing.** WS4-W0 must land `proof:de-shadcn` born-GREEN HEAD-mode + the stepper teeth + the
  opacity-utility arm BEFORE WS10's ci arms (a born-RED ci arm ahead of its clear is the self-inflicted CI break).
  C2: land WS3-M5, rebase WS10 onto the 3 shared cascade files. **The N3 DRY extract must be born-GREEN** (a pure
  refactor — both gates' bare output byte-identical pre-N1-arms).
- **R7 — the dropped-BE custom/ residuals.** MetricBadge.vue:108 HARD prerequisite (atomic with `--color-ring`
  delete); ScrubberTimeline 2-prop fold (§N4.2). The whole-`src/` focus-shim arm catches future cross-scope
  outline-ring; BE's HOLE-2 (`<style>`-body popover-slab scan) is NOT re-picked by any arm — RECORDED as a known
  gap (a future custom/ `<style>`-body shadcn slab ships unguarded; book the structural fix).
