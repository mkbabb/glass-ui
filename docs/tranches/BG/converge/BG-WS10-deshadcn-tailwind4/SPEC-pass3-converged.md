# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass3-CONVERGED (DEVELOPMENT EXECUTION)

> COMPLETELY abrogate default shadcn + tailwind paint while KEEPING the reka/shadcn
> behaviour substrate. The DEEP, dedicated form of WS4's de-shadcn-sweep.
> reka = BEHAVIOUR / glass-ui = 100% of MATERIAL.

**Base: `SPEC-pass2-converged.md` (adopted WHOLE — R1–R5 + C1/C2 + the §0.1 dropped-BE residuals stand) +
`SPEC-pass3.md` (the four NET-NEW risks N1–N4).** This CONVERGED revision folds every pass-3 critique
mustFix, adopts each validated prototype mechanism, and CORRECTS the three spec-as-written defects the
pass-3 prototype/critique fleet surfaced (each re-verified on `tranche/BG` HEAD `069db6c4` THIS session,
file:line on disk):

| # | spec-as-written | on-disk truth (verified this session) | converged correction |
|---|---|---|---|
| **F1** (CRITICAL) | §N1.1 raw-palette regex `(?<![\w:-])…` is asserted born-RED on `ToastClose.vue:24`. | The `:` in the lookbehind BLOCKS the variant-prefixed `group-[.destructive]:text-red-300` (preceded by `:`). `node` falsification: the verbatim regex returns `false` on BOTH real residuals → **born-GREEN/vacuous**. | **The palette arm regex is corrected** to `(?<![\w-])(?:[\w.\[\]-]+:)*…` — drop `:` from the lookbehind, allow zero-or-more variant prefixes (incl. bracket forms). Verified: catches both `group-[.destructive]:text-red-300/50`, zero false-positive on `--my-text-red-300x` (§N1.1). |
| **F2** | R5 §c: "EDIT-1-alone ships a forced-WHITE sub-3:1 glyph in BOTH engines." | Chromium does NOT force white — it **ADAPTS** the bright violet to a DARK glyph at **4.58:1**. The forced-white premise is FALSE for Chromium. | **The deep-violet rationale is RE-FRAMED** to its TRUE basis: a CROSSOVER-ROBUSTNESS move (push L off the ~0.71 ambiguity boundary into the unambiguous zone for all engines) + brand-violet identity over the neutral `--ring` — NOT a forced-white rescue. Do not land defended by a falsified premise (§2.4-native). |
| **F3** | R3: "rename `--ring` → `--focus-ring-color` (keep the value); a solid ink ring measures 8–16:1 → good." | `--ring` light = `hsl(24 10% 10%)` = NEAR-BLACK (L~0.10). A SOLID inner stop off it paints **~15:1 body-ink-heavy** across ALL 10 consumers in light — OFF the warm iOS-soft identity. | **`--focus-ring-color` is a CALIBRATED warm focus accent, NOT a blind `--ring` value-rename** — a luminous warm accent that clears ≥3:1 over the control's OWN solid fill (cream / L16) while reading as an accent (not 15:1 body ink), BOTH modes (§2.4-#3). |
| **F4** | N2: "wire the webkit project; the four π run on Safari." | The wiring alone is silently un-durable: a future glob-drop re-opens the no-run hole one layer up (the 3×-shipped trap). | **BUILD the durability meta-assert** (a source-presence gate clause: the `webkit-deshadcn` project exists w/ `devices['Desktop Safari']` + enrolls ALL FOUR WS10 globs + all four spec FILES exist on disk, born-RED→GREEN). Wiring + the meta-assert TOGETHER (§N2). |

**The honest convergence state at pass-3:** every MECHANISM is locked (pass-2) and every pass-3 risk + critique
mustFix is folded (this spec). The unconverged frontier is **DEVELOPMENT EXECUTION** — the four born-RED π by a
NON-AUTHORING judge over a LIVE dev server in **Chrome AND real Safari, both modes**, the on-disk born-RED→GREEN
artifacts committed, the SFC/CSS edits landed, the FULL affected-gate suite GREEN. The single load-bearing
capture is the **R2 grouped-Select WebKit-DARK getImageData separation on REAL Safari** (Playwright-webkit is the
CI proxy, NOT the binding judge — the nested-backdrop compositing divergence). If it fails → escalate to the
DEFERRED mono-caption header.

---

## 0. WHAT CARRIES FORWARD UNCHANGED (pass-2 §0–§3 authoritative)

The five frontier rulings R1–R5, the two collision rulings C1/C2, and the §0.1 dropped-BE residuals are ADOPTED
VERBATIM from `SPEC-pass2-converged.md`, with the F2/F3 corrections above threaded in.

**THE THREE ATOMIC COMMIT-UNITS (binding in the multi-agent loop) — RE-CONFIRMED + DECONFLICTED:**
1. **(delete `light-dark.css:125`) + (`dark-arm.css` `.dark` deep-violet floor `--accent-color: oklch(from
   var(--primary) 0.532 0.180 h)`)** — inseparable; a split ships the falsified bright violet. **DECONFLICT with
   R3:** R3 does NOT rename `light-dark.css:125`'s `var(--ring)` — that LINE IS DELETED by this unit. `--accent-color`
   (native control accent) is a SEPARATE concern from `--focus-ring-color`; keep them disjoint. R5 removes one
   `--ring` consumer (helps R3's "exactly one consumer" claim), but the two edits are co-resident-line-disjoint, NOT
   conflated.
2. **(MetricBadge.vue:108 `outline-ring`→`.focus-ring`) + (`--color-ring` bridge delete, bridges.css:83)** —
   inseparable; the delete makes `outline-ring` an unknown utility → MetricBadge's ring silently dies (sole live
   `--color-ring` consumer, re-confirmed this session: exactly one hit). The prototype's "keep `--color-ring` alive"
   is contra-spec — the delete is the point.
3. **(dark `--focus-ring-color` warm-hue flip hsl-48→hsl-30) + (`proof:no-gray` `warm-hue-dark-focus-ring` witness)**
   — OR BOOK both. The rename/fold/decouple/dead-deletes are hue-neutral and land regardless.

---

## N1. THE COVERAGE-HOLE CLOSURE — make "ANY component" literally true (F1-CORRECTED)

The directive bar is verbatim: *"no default ring/shadow/radius/**color**/**variant** leak."* pass-3 closes the two
literal color/opacity-leak arms the converged vocab census was BLIND to — NOT the full archetype state-matrix
(still booked, §7).

### N1.1 The raw-Tailwind-palette arm (F1-CORRECTED regex)

**Add to the shared vocab (`scripts/lib/shadcn-vocab.mjs`, §N3):**
```
id: "raw-tw-palette"
re: /(?<![\w-])(?:[\w.\[\]-]+:)*(?:text|bg|border|from|to|via|ring|fill|stroke|decoration|outline|shadow)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}(?![\w-])/
why: "a raw Tailwind palette color (a default-tailwind paint leak) — read a glass-ui --section-color/--viz/--neutral token"
```
**THE F1 CORRECTION (the load-bearing census fix):** the pass-3 verbatim form `(?<![\w:-])…` is BORN-GREEN/VACUOUS
on its ONE residual — the `:` in the lookbehind blocks `group-[.destructive]:text-red-300` (it is preceded by `:`).
The corrected form drops `:` from the lookbehind and prepends `(?:[\w.\[\]-]+:)*` so zero-or-more variant prefixes
(plain `hover:` AND bracket `group-[.destructive]:`) are matched, and the leading `(?<![\w-])` + trailing
`(?![\w-])` boundaries keep it tight. Verified this session (`node` falsification):
- `group-[.destructive]:text-red-300` → **true** (was `false`), `group-[.destructive]:hover:text-red-50` → **true**,
  `text-red-300` → true, `bg-amber-500` → true, `--my-text-red-300x` → **false** (no false-positive).

Comment-stripped (the gate runs `stripComments`), so `button/index.ts:165`'s commented `bg-amber-500` is NOT a hit.
Born-RED on the **one real residual**: `ToastClose.vue:24 group-[.destructive]:text-red-300
group-[.destructive]:hover:text-red-50`.

**THE FOLD — `ToastClose` destructive-red → the feedback-tone register.** The toast destructive context already
speaks `--destructive-foreground` (W-FEEDBACK-TONE). Re-point the two raw reds:
`group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground` (a
`/80`→`/100` hover lift on the SAME token is acceptable). One-token, clean break.

**THE ai-variant AMBER RULING (the fenced-keep, token-re-pointed — NOT allowlisted).** `button/index.ts:170
text-amber-700 dark:text-amber-400` is the AI-gleam GLYPH ink, paired 1:1 with the line's own
`[--glass-accent:oklch(0.78 0.14 75)]` warm-amber rim accent — a DELIBERATE brand identity. The corrected palette
arm WOULD red it (it matches `text-amber-700`), so **re-point to a token (token-first IS the brief), do NOT
allowlist.** Mint a per-mode `--accent-ai-ink` pair (`tokens/glass.css` light = `oklch(0.55 0.13 75)`;
`tokens/dark-arm.css` dark = `oklch(0.80 0.13 75)` — hue 75 matching `--glass-accent`), bridge `--text-accent-ai`
in `theme/bridges.css`, the glyph reads `text-accent-ai`. ONE hue, two channels (rim accent + glyph ink), zero raw
palette → the arm has ZERO false-positives by construction.

### N1.2 The opacity-NN-utility arm (the library-wide opacity-literal twin)

The converged `proof-de-shadcn.mjs` opacity arm is a CSS-DECLARATION regex (`/opacity:\s*0?\.\d+\s*;/`,
W0's `control-surfaces.css:153 opacity:0.5` witness). It is BLIND to the Tailwind UTILITY form `disabled:opacity-20`.
Census-wide truth: **9 live `opacity-NN` utilities across `ui/`**.

**Add to the shared vocab:**
```
id: "opacity-utility"
re: /(?<![\w:-])(?:[\w-]+:)?opacity-(?:[1-9]|[1-9]\d)(?![\w-])/   // opacity-1..99
why: "a hardcoded opacity-NN utility — read a named --opacity-* token via opacity-(--token)"
```
Verified this session: catches `disabled:opacity-20`, `opacity-50/60/70/80/90`; spares `opacity-0`, `opacity-100`,
`opacity-disabled`.

**PROSE PRECISION (the census critique correction):** the spec's "the `:`-lookbehind fence keeps the motion forms"
is IMPRECISE. The actual sparing is via the **`opacity-0`/`opacity-100` EXCLUSION** (the 1–99 numeric range) — those
are the animation endpoints (`data-[state]:opacity-0`, `group-hover:opacity-100`). A hypothetical mid-range
`group-hover:opacity-50` WOULD be caught — but none exist in `ui/`, and a static-looking mid-range opacity IS a
magic number worth flagging. (A bracket-variant `group-[.destructive]:opacity-90` is spared by the `:`-lookbehind, an
acceptable edge — no such residual exists.) **The 9 real residuals are all caught.** Born-RED on:

| site | utility | fold |
|---|---|---|
| `NumberFieldIncrement.vue:25` + `NumberFieldDecrement.vue:25` | `disabled:opacity-20` | `opacity-(--opacity-disabled-strong)` (W0 mints `:0.2`) |
| `ComboboxInput.vue` + `CommandInput.vue` + `MultiSelect.vue` icon | `opacity-50` | `opacity-(--icon-decoration-opacity)` (W0 mints `:0.5`) |
| `DropdownMenuShortcut.vue:11` | `opacity-60` | re-point onto the existing `--dropdown-secondary` ink (PREFER, DRY) OR `--opacity-shortcut:0.6` |
| `Label.vue:32` | `peer-disabled:opacity-70` | `peer-disabled:opacity-(--opacity-disabled)` (the 0.5 named rung) |
| `ToastDescription.vue:21` | `opacity-90` | `text-(--popover-foreground)` at full opacity (PREFER the ink re-point) |
| `button/index.ts` | `opacity-80` (active-state arm) | re-point onto a named `--opacity-*` rung OR fold into the press register |

**The mint discipline:** every new `--opacity-*` rung carries ≥2 consumers OR re-points an EXISTING named ink (the
no-contrivance bar). `--opacity-disabled-strong` (2 steppers) + `--icon-decoration-opacity` (3 search icons) clear
it. Single-site rungs PREFER an ink re-point (DRY). **W0 owns the steppers + the two strong mints; the remaining 7
`ui/` sites fold in `BG.W-DESHADCN-TOKEN-REPLACE`** (out of W0's 9-violation form scope).

### N1.3 Where the arms run

Both arms join `proof:no-shadcn-default` (the 233-file `ui/` walker) via the shared vocab — NO new gate id. They are
CLASS-STRING arms (the same SFC/CVA class strings the existing 8 vocab arms scan), comment-stripped. Born-RED on the
residuals above; ATOMIC born-GREEN as each folds. The 233-file zero-false-positive fixture is the arm's own self-test.

---

## N2. THE HARNESS GAP + THE DURABILITY META-ASSERT (F4 — wire it AND lock it)

**The trap (verified `playwright.config.ts:117-123`):** the `webkit` project `testMatch` is EXACTLY
`["safari-webgl.spec.ts","aurora-swraster.spec.ts"]`; the four WS10 specs route only to `chromium-headless-new` +
`coarse-touch` (both Desktop Chrome). Without a config edit the "Chrome AND Safari" mandate silently runs
chromium-only = the 3×-shipped trap.

**THE FIX — form (A) the dedicated project + the DURABILITY META-ASSERT (both, inseparable):**

- **(A) a dedicated `webkit-deshadcn` Playwright project** appended to the projects array (additive — does NOT
  re-time the existing cross-engine project): `testMatch` = the four WS10 spec globs
  (`deshadcn-toggle.spec.ts`, `deshadcn-select-grouped.spec.ts`, `deshadcn-focus-ring.spec.ts`,
  `deshadcn-forced-colors.spec.ts`), `use: { ...devices["Desktop Safari"], viewport }`, the `local` tag.
  `playwright.config.ts` JOINS THE FILES TOUCHED list.
  - **Verified non-regressive:** `proof-safari-webgl.mjs` S4 reads `pw.indexOf('name: "webkit"')` (exact, quote
    after `webkit`) + `/name:\s*["']webkit["']/` — neither false-matches `name: "webkit-deshadcn"` (the `-` after
    `webkit` breaks both). S4 STAYS GREEN.

- **THE DURABILITY META-ASSERT (the F4 critique mustFix — BUILD it, don't recommend it).** Add a source-presence
  clause (a new `S5`-style clause in `proof-safari-webgl.mjs`, OR a clause in the `BG.W-DESHADCN-GATE` gate) that
  asserts, born-RED→GREEN:
  - (a) the `webkit-deshadcn` project EXISTS with `devices['Desktop Safari']`;
  - (b) its `testMatch` enrolls ALL FOUR WS10 spec globs (a dropped glob REDs);
  - (c) ALL FOUR spec FILES exist on disk (a missing spec REDs).
  Without this, the silent-glob hole IS the 3×-shipped trap re-introduced one layer up. **The self-test bite:** a
  synthetic config dropping one glob / one missing spec file MUST red.

- **The Playwright-webkit ≠ shipping-Safari caveat (the compositing divergence).** Playwright's bundled WebKit
  diverges from shipping Safari on nested `backdrop-filter` compositing — exactly the R2 grouped-Select mechanism.
  Worse, **Playwright-webkit renders NO AppKit accent paint** for native checkbox/radio (R5: captured `#100c10`, no
  glyph). So Playwright-webkit is the **WIRING proof** (CI-runnable); **real Safari is the PAINT proof** for BOTH
  R2 (nested-backdrop separation) AND R5 (native accent glyph) — captured by a NON-AUTHORING judge via
  `chrome-devtools-mcp` driving an actual Safari (or a real-device run) over the LIVE `:5199` demo, both modes. The
  other two π (toggle, forced-colors) are not nested-backdrop/native-accent sensitive — Playwright-webkit is
  sufficient, real Safari run for the gestalt verdict.

- **`gates.mjs --run pi` does NOT run `webkit-deshadcn` (verified `gates.mjs:2260` `PI_PROJECTS =
  ["chromium-headless-new","coarse-touch"]`, hardcoded).** **Do NOT add `webkit-deshadcn` to `PI_PROJECTS`** — the
  Safari arm runs via direct `npx playwright test --project=webkit-deshadcn` (the WIRING) + real-Safari
  `chrome-devtools-mcp` (the R2/R5 binding PAINT). Correct any "cross-routes to webkit-deshadcn" framing (true only
  for a bare unfiltered run). Make this explicit in the wave doc + a code comment.

- **Sequence the config edit AT `BG.W-DESHADCN-GATE`** (§5), AFTER all four real spec FILES exist on disk — else
  3/4 globs silently vanish and the wiring cannot be end-to-end validated. **Do NOT commit a throwaway wiring stub
  under a real WS10 spec filename** (`deshadcn-toggle.spec.ts` is the binding toggle π authored in TOKEN-REPLACE/GATE
  — a stub masquerading as it is forbidden); a wiring demonstration uses a clearly-throwaway name or is local-only.
  Strip any `PW_NO_WEBSERVER` throwaway env gate; demonstrate fail-close via the foreign-port served-app sentinel
  only.

- **DRY the sentinel (the F4 critique mustFix).** Import the exported `DEMO_TITLE` from `served-app-sentinel.ts`
  (do not hardcode `"glass-ui Feature Demo"`); extract a generic `assertServedDemoDoc(page)` (title===DEMO_TITLE, no
  aurora marker) in `served-app-sentinel.ts` for the four non-aurora WS10 routes to share (beside the existing
  aurora-route-specific `assertServedDemoAurora`).

- **Run the ACTUAL affected gates on the committed config:** `proof:safari-webgl` (S4 + the new durability clause),
  `proof:visual-runner`, `proof:gate-manifest-sound`, `proof:gate-script-parity` — not just a bare `npx playwright
  test`.

---

## N3. THE DRY SINGLE-SOURCE — `scripts/lib/shadcn-vocab.mjs`

The shadcn denylist vocab is duplicated across `proof-de-shadcn.mjs` + `proof-no-shadcn-default.mjs` (6-7 shared ids).
`scripts/lib/` already hosts shared gate leaves (`critical-path-walk`, `paint-arm`, `surface-closure`). Extract:
```
// scripts/lib/shadcn-vocab.mjs
export const SHADCN_VOCAB = [ {id, re, why}, ... ]   // the 8 existing + raw-tw-palette + opacity-utility
export const stripComments = (s) => ...               // the shared comment-strip (both gates have a copy)
```
Both gates import it. The N1 palette + opacity arms land in ONE place. The grammar fence is encoded in each `re`
(the palette arm's `(?:[\w.\[\]-]+:)*` variant-prefix + `(?<![\w-])` boundary; the opacity arm's 0/100 exclusion) —
NOT a pre-strip (a grammar pre-strip BREAKS the fence). **This is a PURE refactor — the bare-HEAD output of both
gates is BYTE-IDENTICAL before the N1 arms are added (the extract is BORN-GREEN; the N1 arms are the born-RED delta).**

---

## N4. FOLD-PRECISION CORRECTIONS (the two imprecise converged folds)

**N4.1 — ToastAction preserves its destructive arms.** `ToastAction.vue:26` = the base reroll PLUS four toast-context
arms (`group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30
group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground`). A bare
`buttonVariants({outline|secondary,sm})` fold DROPS the red-on-hover. **Fold as:**
`cn(buttonVariants({ variant: 'outline', size: 'sm' }), '<the 4 group-[.destructive] arms, verbatim>', props.class)`.
The destructive arms ride as a `cn()` tail (toast-context, not a button variant).

**N4.2 — ScrubberTimeline is a 2-prop fold.** `ScrubberTimeline.vue:258-259` carries BOTH `color:
var(--popover-foreground)` AND `background: var(--popover)` (the `ContinuousTimeline.vue:334` precedent folds only
the TEXT color). **Fold both:** `color: var(--popover-foreground, var(--foreground))` AND `background: <a glass
register>` (`--glass-bg-floating` or `--card`, NOT the bare `var(--popover)` shadcn slab). 2 props. Coordinate with
WS4's `BG.W-TIMELINE-ENCAPSULATE` (same SFC — flag it so the WS4 encapsulation lands the re-point, not the slab).

---

## R2. THE GROUPED-INSET SELECT INVERSION — the critique-folded depth (the LOAD-BEARING wave)

pass-2 §2.3 envelope stands (RECESS `SelectContent` to a WELL tier, FLOAT `.glass-menu-group` cards, per-mode
LIFTING `--menu-group-fill`, token-first rim, scoped `[data-slot=select-content]:has(.glass-menu-group)`,
ΔL≥0.06 WebKit-dark). The pass-3 critique adds **five hard folds** (each verified on disk this session):

1. **R2-MUSTFIX (the real cause of weak light-mode separation) — RECEDE the always-on `.glass-field-portal::before`
   warm glow under the grouped scope.** Verified `select.css:157-171`: the field-portal `::before` paints a
   3-stop warm radial at `z-index:-1` (light `oklch(0.92 0.08 …/0.55)` etc., dark `oklch(0.30 0.10 …)`) over the
   WHOLE portal `inset:0`. When the panel recedes, this glow shows through MORE in the well/gutter — LIFTING the well
   (worst in LIGHT where stops are L~0.88-0.92), collapsing the ΔL. **The card-L-headroom story is NOT the cause —
   the always-on field glow is.** Add a grouped-scope `::before` opacity/alpha reduction (e.g.
   `[data-slot="select-content"]:has(.glass-menu-group) .glass-field-portal::before { opacity: <reduced> }`, or
   recede the field stops under the same scope) so the WELL genuinely recedes in BOTH modes. This is THE
   architectural correction to the separation budget.

2. **RE-POINT, don't RE-SPELL (the DRY substitution idiom).** Parameterize the base `[data-slot=select-content]`
   background on `--select-well-rung` + `--select-well-warm` tokens (the existing `color-mix` expression reads the
   two tokens), and have the `:has(.glass-menu-group)` rule OVERRIDE ONLY those two tokens — NOT duplicate the
   whole `color-mix(in oklab, …)` chain. The card fill is the same DRY substitution (`--menu-group-fill` per-mode
   pair). One recipe, token-substituted per scope — the house substitution-over-redeclaration discipline.

3. **The focus-ring clip (WCAG 2.4.7, NOT a polish item).** The card's `overflow:hidden` (the inset-geometry
   container) would CLIP the top/bottom `SelectItem` focus rings. Give the rows an inner inset ≥ the ring width
   (`--focus-ring-width` 2px + the 8px outer halo), OR use `border-radius`+`clip-path` WITHOUT `overflow:hidden`, OR
   inset the row stack within the card. The ring must read complete on the first + last row.

4. **The cartoon under-stamp must not truncate.** Verify the cards' `--shadow-cartoon-md` (7px bottom-left) under-stamp
   is not clipped by `SelectViewport`'s forced `overflow:auto` (the forced cross-axis clip per CSS Overflow §3 — the
   `--dock-control-safe-inset` precedent). Reduce/inset the stamp OR widen the viewport bottom padding so the bottom
   card's stamp reads.

5. **Confirm dark `--select-plate-alpha 0.94` STILL reads as transmissive glass (not a near-opaque slab).** Verified
   `select.css:142`: dark keeps 0.94. The WELL recede must drop the well's effective alpha enough that the panel's own
   `--glass-blur-floating` + the (receded) field TRANSMIT — a 94%-opaque well largely defeats the blur AND the recede.
   Tune the dark well rung so the recessed base reads as DIM GLASS, not a flat dark slab.

**SelectLabel KEEPS `text-dropdown-secondary`** (`proof:dropdown-type-scale` STAYS GREEN — the mono-caption header is
the DEFERRED R2 escalation target). STATIC `color-mix(in oklab)` fill, NOT a 5th `backdrop-filter` (the
`proof:nested-backdrop-budget` depth-4 ceiling + glass-cannot-sample-glass). All material in CSS (menu.css/select.css)
— no SFC > 500L. NO new gate.

**THE BINDING ACCEPTANCE (the OWED pass-2/pass-3 deliverable — the single load-bearing capture):**
- The R2 judge is **REAL SAFARI** (chrome-devtools-mcp / real-device) over the LIVE `:5199` demo, on the FINAL design
  (SelectLabel-untouched) — **the scratch webkit PNGs validate a stale iteration and DO NOT count.** `getImageData`,
  WebKit-DARK specifically: card ΔL ≥ ~0.06 above the recessed panel-base, 3 SEPARATED correctly-elevated cards, rows
  contained, gutter visible, UNGROUPED panels stay warm-transmissive, in BOTH modes.
- Confirm Playwright-webkit PASSES on the final design as the CI proxy.
- **Author the committed `tests-visual/deshadcn-select-grouped.spec.ts`** (getImageData 3-separated-cards / ΔL≥0.06
  dark / rows-contained / ungrouped-warm-transmissive, both modes) — routed to `webkit-deshadcn` (§N2).
- **Commit the on-disk uniform-slab-vs-3-cards born-RED→GREEN pair** to `docs/tranches/BG/audit/visual/` (currently
  ABSENT — only W-BACKDROP-SAMPLE + W-REFRACT present).
- Add the forms/controls gestalt-roster row + per-surface VERDICT (the wave-close bar — none currently met).
- Run the FULL affected-gate suite GREEN (`proof:menu-glass`, `proof:no-gray`, `proof:glass-cohesion`,
  `proof:dropdown-type-scale`, `proof:nested-backdrop-budget`).
- **THE FALSIFIER:** if real-Safari-dark STILL does not separate → escalate to the DEFERRED mono-caption header (the
  lockstep four-label change + the sized `proof:dropdown-type-scale` re-point, §7). **This is the unconverged frontier.**

---

## R3. THE FOCUS-RING 3-SURFACE DECOUPLE — the library-wide WCAG FIX (F3-CORRECTED)

pass-2 §2.4 mechanism stands (make the `--focus-ring-shadow` INNER 2px stop SOLID — the library-wide WCAG 1.4.11
fix; fold the input; rename; crown→`--foreground`; native deep-violet floor; dead-token deletes). The pass-3 critique
adds **the F3 calibration correction + the blast-radius capture + the precise baseline narrative:**

1. **F3 — `--focus-ring-color` is a CALIBRATED warm focus accent, NOT a blind `--ring` value-rename.** Verified
   `color-radius.css:102 --ring: hsl(24 10% 10%)` (NEAR-BLACK L~0.10 light) / `dark-arm.css:100 --ring: hsl(48 10%
   70%)` (L~0.70 yellow-green dark). A SOLID inner stop off the near-black `--ring` paints **~15:1 body-ink-heavy**
   across ALL 10 `--focus-ring-shadow` consumers in light — OFF the warm iOS-soft identity. **Calibrate
   `--focus-ring-color` to a luminous warm accent** that clears ≥3:1 over the controls' OWN solid fills (cream light
   / L16 dark) WHILE reading as a luminous accent (the own-fill adjacency, NOT a busy field, IS the WCAG surface — so
   a SOFTER warm tint still passes ≥3:1). The dark warm-flip (hsl-48→hsl-30, commit-unit #3) is part of this
   calibration. The π#3 bar is TWO-ENDED: ≥3:1 (the WCAG floor) AND the gestalt judge confirms it reads as a warm
   luminous accent (NOT 15:1 body ink) — both falsifiable.

2. **The corrected baseline narrative (the F3 phantom correction).** `--color-accent` IS defined
   (`bridges.css:102` → `--accent` → `--neutral-3`, L82) — so the input TODAY paints a SOLID near-black `--ring`
   border (`var(--color-accent-opaque, var(--ring))`, the phantom first-arg falls back to `--ring`) + a faint L82
   box-shadow. Only `--color-accent-opaque` is a TRUE phantom. Fix the before/after to the actual painted values per
   surface (NOT "the 30%-alpha mix").

3. **The 3-surface decouple (precise):**
   - **FOCUS register (reads 1–4)** → `--ring` renamed to `--focus-ring-color` (slots beside
     `--focus-ring-{width,shadow}`; last shadcn-named token retired, clean break) — VALUE calibrated per #1, NOT
     blind. After the fold + crown/native decouple, `--focus-ring-color` has EXACTLY ONE consumer
     (`--focus-ring-shadow`) — a single retint knob. (R5 removing the `--accent-color` `--ring` read HELPS this.)
   - **configurator crown** (`configurator.css:251 inset 0 0 0 2px var(--ring)`) → `--foreground` (NOT
     `--focus-ring-color`). A DARK-MODE DEFECT FIX: dark `--ring` = H~95° yellow-green → the crown currently paints
     yellow-green = a LIVE W-NO-GRAY violation; `--foreground` fixes it. π#3 checks the dark crown reads `--foreground`.
   - **native `accent-color`** → the deep-violet floor (the F2-CORRECTED rationale, R5/§2.4-native).
   - **`--color-ring` bridge** (`bridges.css:83`) → DELETED, ATOMIC with the MetricBadge fold (commit-unit #2).
4. **DELETE the dead set (one diff):** the phantom `--color-accent-opaque` first-arg; `--input` (`color-radius.css`) +
   `--color-input` bridge (`bridges.css:82`) — `border-input`/`bg-input` are live-ABSENT (prose only — confirm before
   deleting).

**THE BLAST-RADIUS CAPTURE (the F3 critique mustFix — capture the 10 consumers, not just the input).** The SOLID inner
stop hits ALL `--focus-ring-shadow` readers (verified this session): `dock.css`, `dark-mode-toggle.css`,
`surfaces.css` (`.focus-ring`/`.glass-btn`), `liquid-morph.css`, `base.css` (×2), `btn.css`, `components.css` (×2),
`layer-group.css`, `scale-paper.css`. **Non-authoring gestalt capture over `/dock` + `/display/buttons` in BOTH
modes, Chrome AND real Safari** — every ring reads as a warm luminous accent ≥3:1 over its own fill, none paints
heavy body ink.

**Native `accent-color` — the deep-violet floor (F2-CORRECTED rationale).** EDIT 1 (delete `light-dark.css:125`)
ATOMIC with EDIT 3 (`dark-arm.css .dark`: `--accent-color: oklch(from var(--primary) 0.532 0.180 h)`). The deep-violet
floor is a **CROSSOVER-ROBUSTNESS** move (push L off the ~0.71 boundary into the unambiguous-white zone for ALL
engines) + brand-violet identity over the neutral `--ring` — **NOT** a forced-white sub-3:1 rescue (Chromium ADAPTS
EDIT-1-alone's bright violet to a DARK glyph at 4.58:1; the §c forced-white premise is FALSE for Chromium). **Record
the HUE-ONLY lockstep nuance:** `oklch(from var(--primary) 0.532 0.180 h)` pins L=0.532 and C=0.180 as LITERALS — only
the HUE follows `--primary` (re-inking `--primary`'s L/C does NOT move the accent). Acceptable for the library default;
documented so it is not mistaken for full re-ink lockstep. The light floor `color-radius.css:114 --accent-color:
var(--primary)` STAYS (capture LIGHT mode empirically — the cascade reasoning is sound but the prototype only ran
`colorScheme:dark`). NO new token.

**THE BINDING π#3 ACCEPTANCE (NON-AUTHORING, BOTH modes, Chrome AND real Safari, `documentElement.style.colorScheme='dark'`
— a class-only toggle silently re-tests light tokens):**
- ≥3:1 WCAG 1.4.11 over SOLID cream (light) + the L16 dark plate (dark) — the control's OWN fill, NOT a busy field —
  on ≥1 NON-INPUT ring (a button ring over a glass tier, checkbox/radio, select-trigger, the dialog-close, a badge).
- The dark native checkbox/radio WHITE glyph ≥4.5:1 over the deep violet — **the BINDING JUDGE is REAL SAFARI**
  (chrome-devtools-mcp / real-device; Playwright-webkit paints NO AppKit accent — captured `#100c10`, no glyph), both
  modes, `/forms/checks`, getImageData on the deep-violet FILL AND the glyph (or document Safari's adaptation).
- The dark configurator crown reads `--foreground`.
- **Commit the on-disk born-RED→GREEN artifact** (the falsified bright-violet vs fixed deep-violet: swatch paint +
  native-control capture pair, BOTH engines, BOTH modes) to `docs/tranches/BG/audit/visual/` (currently ABSENT).
- Run the actual acceptance: the FULL affected-gate suite via `node scripts/gates.mjs --run <tags>` (NOT vue-tsc+build).

---

## R4. FORCED-COLORS (transparent-outline-on-base + KEEP the hand-list) — unchanged from pass-2

pass-2 §2.5 stands: base `outline: 2px solid transparent; outline-offset: 2px` on EVERY box-shadow focus recipe (the
VERIFIED 9-file/10+-recipe set); SFC-inline `:focus-within` carriers get companion inline outline classes; KEEP
`a11y-overrides.css:78-91` (additive coexist). The census arm enrolls the VERIFIED selector set (composition-aware —
the `.liquid-pill` inheritance is not a false-RED; `.glass-card.is-focus-within` is NOT a carrier). π#4: a
`@media (forced-colors:active)` capture (Chromium emulate-forced-colors AND a real Firefox/WHCM capture) asserts a
non-`none` outline on `.input-bar:focus-within` + every box-shadow focus carrier. The Firefox capture is OWED
(non-blocking — the hand-list is KEPT). Decide `:focus` (mouse) base-outline coverage explicitly; record the
`:focus-within` CanvasText focus-COLOR downgrade.

---

## 4. FILES TOUCHED (delta — pass-2 §4 + pass-3 §4, consolidated)

pass-2 §4 stands. **ADDED / corrected by pass-3:**
- `scripts/lib/shadcn-vocab.mjs` — NEW (the DRY single-source vocab + comment-strip, §N3; born-GREEN refactor).
- `scripts/proof-de-shadcn.mjs` — import the shared vocab; add `NumberFieldIncrement/Decrement.vue` to
  `CONTROLS.NumberField.sfcs` + the `opacity-utility` denylist arm (W0-scoped).
- `scripts/proof-no-shadcn-default.mjs` — import the shared vocab; the **F1-CORRECTED** raw-tw-palette arm + the
  opacity-NN-utility arm (§N1) on top of the pass-2 arms.
- `scripts/proof-safari-webgl.mjs` (or the GATE wave's gate) — the **durability meta-assert** (webkit-deshadcn
  project exists + all-four-globs-enrolled + all-four-files-exist), born-RED→GREEN + a self-test bite (§N2).
- `tests-visual/playwright.config.ts` — the `webkit-deshadcn` project (form A, §N2) — **the pass-2 omission corrected.**
- `tests-visual/lib/served-app-sentinel.ts` — extract `assertServedDemoDoc(page)` + export `DEMO_TITLE` (DRY, §N2).
- `tests-visual/deshadcn-{toggle,select-grouped,focus-ring,forced-colors}.spec.ts` — the four binding π (authored in
  TOKEN-REPLACE/MATERIAL/GATE; ALL FOUR must exist before the config edit lands, §N2).
- `src/components/ui/toast/ToastClose.vue:24` — `text-red-300`/`text-red-50` → `text-destructive-foreground` (§N1.1).
- `src/components/ui/button/index.ts:170` — ai-variant `text-amber-700 dark:text-amber-400` → `text-accent-ai` (§N1.1).
- `src/styles/tokens/glass.css` + `tokens/dark-arm.css` + `theme/bridges.css` — mint `--accent-ai-ink` per-mode pair
  + `--text-accent-ai` bridge (§N1.1); mint `--icon-decoration-opacity:0.5` + `--opacity-disabled-strong:0.2` (W0) +
  the shortcut/description opacity re-points (§N1.2).
- `src/components/ui/number-field/NumberFieldIncrement.vue:25` + `NumberFieldDecrement.vue:25` →
  `opacity-(--opacity-disabled-strong)` (W0); `DropdownMenuShortcut.vue:11`, `Label.vue:32`, `ToastDescription.vue:21`,
  `ComboboxInput.vue`, `CommandInput.vue`, `MultiSelect.vue`, `button/index.ts` opacity-80 → the named-token re-points
  (§N1.2, TOKEN-REPLACE).
- `src/components/ui/toast/ToastAction.vue:26` — `cn(buttonVariants({outline,sm}), <4 destructive arms>)` (§N4.1).
- `src/components/custom/timeline/ScrubberTimeline.vue:258-259` — the 2-prop glass-register fold (§N4.2).
- `src/styles/select.css` — the `:has(.glass-menu-group)` panel recede via `--select-well-rung`/`--select-well-warm`
  token substitution + the field-portal `::before` glow recede under the grouped scope (R2-folds 1+2+5).
- `src/styles/menu.css` — the `.glass-menu-group` inset envelope (per-mode lifting `--menu-group-fill`, token-first
  rim, inset geometry, focus-ring inner inset + cartoon-stamp clearance, R2-folds 3+4).
- `src/styles/tokens/scale-paper.css:83` — `--focus-ring-shadow` inner stop SOLID + the CALIBRATED `--focus-ring-color`
  (F3, NOT a blind `--ring` rename).
- `src/styles/configurator.css:251` — crown → `--foreground`.
- `src/styles/tokens/light-dark.css:125` — DELETE (EDIT 1, ATOMIC).
- `src/styles/tokens/dark-arm.css` — the `.dark` deep-violet floor (EDIT 3, ATOMIC) + `--ring`→`--focus-ring-color`
  lockstep + the GATED warm-hue flip.
- `src/styles/tokens/color-radius.css` — DELETE `--input`; `--ring`→`--focus-ring-color`.
- `src/styles/theme/bridges.css:82-83` — DELETE `--color-input`, `--color-ring`; MINT `--text-control`/`-sm` +
  `--text-accent-ai`.
- `src/components/custom/metric-badge/MetricBadge.vue:108` — `outline-ring`→`.focus-ring` (ATOMIC, commit-unit #2).
- `src/styles/utilities/a11y-overrides.css` + the box-shadow focus recipes (9 files) — base transparent-outline;
  KEEP the hand-list (§R4).
- `src/components/ui/combobox/ComboboxInput.vue:34`, `tags-input/TagsInput.vue:33` — companion inline
  transparent-outline (§R4).

**NOT touched (collision C1):** `theme/radius.css`, `proof-squircle-language.mjs` (RELINQUISHED to WS4;
`proof:squircle-language` runs as a no-regression GREEN check only).

---

## 5. WAVE BREAKDOWN (the five waves — each with its validated mechanism + real-paint-π bar)

> **Precondition W0 (WS4, `BG.W-DESHADCN-SWEEP`):** register the untracked `proof:de-shadcn` (gates.mjs row +
> `package.json` script + ci tag, ATOMIC born-GREEN HEAD-mode — NOT `--post-fix`; verified 0 `package.json` hits +
> gates.mjs note-strings only); clear the **9** form violations; add the steppers
> (`NumberFieldIncrement/Decrement.vue`) to `CONTROLS.NumberField.sfcs` + the `opacity-utility` denylist arm + the
> born-RED→GREEN bite for `disabled:opacity-20`; mint `--opacity-disabled-strong:0.2` +
> `--icon-decoration-opacity:0.5`; reconcile the 7-vs-9 narrative to ONE count = **9**. Acceptance = BARE
> `node scripts/proof-de-shadcn.mjs` HEAD-mode. **WS10 sequences strictly AFTER W0.** Resolve the C2 land-then-rebase
> order vs WS3-M5 (land M5, rebase WS10's `--ring`/`--input` renames onto the 3 shared cascade files). Run
> `proof:gate-script-parity` + `proof:gate-manifest-sound` GREEN on the COMMITTED tree.

### BG.W-DESHADCN-CENSUS — the complete census (EXTEND, never re-author)
pass-2 arms PLUS the §N1 coverage arms (**F1-CORRECTED** raw-tw-palette + opacity-NN-utility) PLUS the §N3 DRY extract
(`scripts/lib/shadcn-vocab.mjs`, both gates import it, born-GREEN). NO new gate id. Born-RED on the HEAD residuals +
the `ToastClose` red-palette + the 9 opacity-NN utilities + the 4 unenrolled forced-colors carriers. ATOMIC born-GREEN
as each folds. **Acceptance:** the full 233-file sweep records ZERO false positives (the ai-variant amber is
token-re-pointed; the liquid-reveal `opacity-0`/`data-[state]:` forms are exclusion-spared; the contrived
`--my-text-red-300x` is boundary-spared); reds every residual.

### BG.W-DESHADCN-TOKEN-REPLACE — the replacement sweep + dead-token deletes + the focus-ring fix
pass-2 set PLUS the §N1 token re-points (ToastClose→destructive, ai-amber→`--accent-ai`, the 7 non-form opacity-NN
sites) PLUS the §N4 fold corrections (ToastAction destructive `cn()` tail, ScrubberTimeline 2-prop) PLUS the
F3-CALIBRATED `--focus-ring-color` (NOT a blind `--ring` rename). Clean break, no alias. The THREE atomic commit-units
(§0) are inseparable. **Acceptance:** the FULL affected-gate suite GREEN (NOT build-green); π#1 (toggle DARK oklab fill
+ glyph ≥4.5:1), π#3 (focus ring ≥3:1 over solid cream+L16 reads-as-warm-accent + ≥1 non-input ring + the
blast-radius capture over /dock + /display/buttons + the dark native checkbox/radio white glyph ≥4.5:1 BOTH engines
[REAL Safari binding] + the dark crown reads `--foreground`); each visual reskin re-earns `proof:ba-gestalt` on a
FRESH NON-AUTHORING capture, both modes + Chrome AND real Safari. The warm-hue flip ATOMIC with `proof:no-gray` or
BOOKED.

### BG.W-TAILWIND4-IDIOM — the idiom closure (SMALL, polish)
Mint `--text-control`/`--text-control-sm` `@theme` bridges + `@utility glass-blur-{wash,quiet,floating}`; the N1
`--text-accent-ai` + the opacity `@theme` rungs land idiomatically here (a `@theme` token auto-exposes the var AND the
utility — NO `theme()` function-syntax, NO `<util>-[var(--x)]` arbitrary wrap where a registered namespace resolves).
Extend `proof:tailwind-v4-idiom` clause-(d) completeness; keep GREEN. SANCTIONED-KEEP the comma-fallback +
custom-prop-write brackets. Low investment.

### BG.W-DESHADCN-MATERIAL — the grouped-inset Select elevation-INVERSION (the DEPTH, LOAD-BEARING) + Switch material
pass-2 §2.3 envelope + the **five R2 critique folds** (field-portal glow recede under `:has`, re-point-not-re-spell
via `--select-well-rung`/`--select-well-warm`, focus-ring inner inset, cartoon-stamp clearance, dark-0.94
transmissive). SelectLabel KEEPS `text-dropdown-secondary`. Switch material READS the `--switch-*`/`--control-*` quads.
All material in CSS. STATIC `color-mix(in oklab)`, NOT a 5th backdrop-filter. NO new gate. **Acceptance:** the binding
NON-AUTHORING capture confirms 3 SEPARATED correctly-elevated cards in BOTH modes — **the R2 judge is REAL SAFARI**
(chrome-devtools-mcp / real-device, §N2), WebKit-dark ΔL≥0.06 by getImageData on the FINAL design, rows contained,
gutter visible, UNGROUPED panels warm-transmissive; the committed `deshadcn-select-grouped.spec.ts` + the on-disk
uniform-slab-vs-3-cards pair; dev server UP; FULL affected-gate suite GREEN. **If real-Safari-dark STILL fails to
separate → escalate to the DEFERRED mono-caption header** (§7).

### BG.W-DESHADCN-GATE — the lock + paint + canon (the close)
Lock the extended `proof:no-shadcn-default` GREEN; confirm the WS4 `proof:de-shadcn` precondition GREEN; **wire the
`webkit-deshadcn` Playwright project AFTER all four specs exist + land the durability meta-assert (§N2)**; run the
FULL affected-gate suite (§6) via `node scripts/gates.mjs --run <tags>`; enroll the forms/controls gestalt roster +
run the four binding π (six-state matrix, both modes + Chrome AND real Safari + the forced-colors arm + the R2
real-Safari capture, the non-authoring judge, dev server UP); commit the on-disk born-RED→GREEN artifacts (the
native-accent falsified-bright-vs-fixed-deep pair + the Select uniform-slab-vs-3-cards pair); fold the CLAUDE.md
de-shadcn CANON (the deshadcn axiom + the coverage-arm extension + the deep-violet/inner-stop-SOLID rulings).

---

## 6. ACCEPTANCE / REAL-PAINT-π BAR (the FULL affected-gate suite, NOT vue-tsc+build)

The acceptance is the FULL affected-gate suite — `proof:no-shadcn-default` (extended, N1 arms), `proof:de-shadcn`
(WS4, HEAD mode), `proof:dropdown-type-scale` (STAYS GREEN), `proof:no-gray`, `proof:glass-cohesion`,
`proof:no-layout-animation`, `proof:menu-glass`, `proof:control-tokens`, `proof:squircle-language` (no-regression),
`proof:tailwind-v4-idiom`, `proof:webkit-backdrop`, `proof:nested-backdrop-budget`, `proof:safari-webgl` (S4 + the
durability clause), `proof:visual-runner`, `proof:gate-script-parity`, `proof:gate-manifest-sound` — run via
`node scripts/gates.mjs --run <tags>`, **NOT vue-tsc+build** (the cardinal lesson). `proof:webkit-backdrop` runs AFTER
`npm run build` (it reads SHIPPED dist; author UNPREFIXED `backdrop-filter` only). Rebuild dist before the
`dist/styles/index.css` gzip ≤140_000 budget check (current ~126.7k; at-HEAD is a stale ~6KB `@import` shell until
built). Run `verify-siblings-intact` before/after any close-battery.

**The four born-RED π — each by a NON-AUTHORING judge, BOTH modes, Chrome AND real Safari, dev server UP, getImageData:**

1. **Toggle selected (DARK, e2e-paint, media-rich backdrop):** `data-[state=on]` resolves a non-transparent oklab
   tinted fill (NOT the raw rung, NOT transparent) AND the glyph clears ≥4.5:1. (Playwright-webkit sufficient.)
2. **Grouped-inset Select (the LOAD-BEARING capture):** 3 SEPARATED correctly-elevated cards (card ΔL ≥ ~0.06 above
   the recessed panel-base, **WebKit-dark specifically, on REAL Safari via chrome-devtools-mcp / a real-device run**
   — Playwright-webkit is the CI proxy, NOT the binding judge), rows contained, gutter visible, ungrouped panels
   warm-transmissive. `proof:dropdown-type-scale` GREEN. Commit the uniform-slab-vs-3-cards pair on disk.
3. **Focus ring (folded, inner-stop-SOLID, F3-calibrated):** ≥3:1 WCAG 1.4.11 over SOLID cream + L16 dark (the
   control's OWN fill) AND reads as a warm luminous accent (NOT 15:1 body ink) + ≥1 NON-INPUT ring + the blast-radius
   capture (/dock + /display/buttons); the dark native checkbox/radio white glyph ≥4.5:1 over the deep violet (**REAL
   Safari binding** — Playwright-webkit paints no AppKit accent; BOTH engines, checkbox + radio-dot, `/forms/checks`);
   the dark configurator crown reads `--foreground`. Commit the falsified-bright-vs-fixed-deep pair on disk.
4. **Forced-colors:** `@media (forced-colors:active)` → non-`none` outline on `.input-bar:focus-within` + every
   box-shadow focus carrier (Chromium AND Firefox).

**PLUS the pass-3 born-RED census deltas (source gate):** the `ToastClose` red-palette reds the F1-CORRECTED
`raw-tw-palette` arm (GREEN after the destructive re-point); the 9 `opacity-NN` utilities red the `opacity-utility`
arm (GREEN after the token re-points); the ai-variant amber is NOT a hit (token-re-pointed).

**PLUS:** the close-hover well VISIBLE over the 0.68/0.76 dialog plate (§2.2); the forms/controls gestalt-roster row +
per-surface VERDICT; the demo launched + dist rebuilt; distinguish befitting-SKIP from PASS for the live-π gates.

---

## 7. FOLDED / DEFERRED (pass-2 §7 + the pass-3 delta)

pass-2 §7 stands. **AMENDED:**
- The two literal color/opacity-leak arms (raw-tw-palette + opacity-NN-utility) are UN-DEFERRED (§N1). What STAYS
  booked is only the full per-control STATE-COVERAGE archetype matrix for the NON-form components — a
  structural-completeness gate, not a leak the directive names verbatim.
- **The mono-caption picker section voice** — DEFERRED (the R2 escalation target; keeps `text-dropdown-secondary`).
- **`.glass-menu-group` extension to DropdownMenuGroup/ContextMenuGroup** — THIS-WAVE-or-BOOK (orchestrator call).
- **The dark `--focus-ring-color` warm-hue flip** — ATOMIC-with-`proof:no-gray` or BOOKED.
- **The forced-colors hand-list retirement** — DEFERRED (needs base outline on EVERY recipe + Chromium+Firefox
  capture; hand-list KEPT, additive outlines coexist).
- **The single-site opacity rungs (`--opacity-shortcut`, the ToastDescription 90% dim)** — PREFER an ink re-point over
  a 1-use token (DRY); mint only if a real ≥2-consumer register emerges.

---

## 8. OPEN RISKS (the falsifiers — what would break pass-3 execution)

- **R2 (HIGHEST residual, the unconverged frontier) — the grouped-Select inversion might still not separate on REAL
  Safari dark.** A Playwright-webkit PASS is necessary-not-sufficient (nested-backdrop compositing divergence). The
  binding judge is real Safari on the FINAL design. The field-portal glow recede (R2-fold 1) is the architectural fix
  to the weak-light-mode separation. If real-Safari-dark fails → the DEFERRED mono-caption header.
- **F1/census — the corrected palette arm must catch the variant-prefixed residual without false-RED.** Verified
  this session (catches both `group-[.destructive]:text-red-*`, spares `--my-text-red-300x`). The 233-file
  zero-false-positive fixture is the gate's own self-test. The ai-amber is token-re-pointed (zero false-positive by
  construction).
- **F3/focus-ring — the calibrated `--focus-ring-color` must clear ≥3:1 AND read as a warm accent (not 15:1 body
  ink).** The two-ended π#3 bar is the catch; the blast-radius capture over 10 consumers is the acceptance.
- **F2/native accent — the deep-violet floor must be defended by its TRUE rationale** (crossover-robustness + brand
  identity, NOT forced-white rescue). The real-Safari native-control capture is OWED (Playwright-webkit paints no
  AppKit accent). EDIT-1↔EDIT-3 atomicity is load-bearing. LIGHT mode captured empirically. The HUE-ONLY lockstep
  nuance recorded.
- **N2/harness — the durability meta-assert must be BUILT (not recommended).** Without it the silent-glob hole is the
  3×-shipped trap one layer up. The webkit-deshadcn project is `local`-tagged (CI proves WIRING, local proves PAINT);
  do NOT add it to `PI_PROJECTS`; sequence the config edit AFTER all four specs exist; do not commit a throwaway stub
  under a real spec name.
- **R4/forced-colors** — Chromium-confirmed; the Firefox/WHCM capture is OWED (non-blocking — hand-list KEPT).
- **R6 — sequencing.** WS4-W0 lands `proof:de-shadcn` born-GREEN HEAD-mode + the stepper teeth + the opacity-utility
  arm BEFORE WS10's ci arms; the N3 DRY extract is born-GREEN (byte-identical pre-N1-arms); C2 rebase onto WS3-M5.
- **R7 — the dropped-BE custom/ residuals.** MetricBadge.vue:108 HARD prerequisite (ATOMIC with `--color-ring`
  delete, commit-unit #2); ScrubberTimeline 2-prop fold (§N4.2). BE's HOLE-2 (`<style>`-body popover-slab scan) is
  NOT re-picked by any arm — RECORDED as a known gap (book the structural fix).

---

## CONVERGENCE STATE

**Every MECHANISM is locked (pass-2). Every pass-3 risk (N1–N4) + every critique mustFix is folded (this spec),
incl. the THREE spec-as-written defects CORRECTED (F1 the vacuous palette regex, F2 the falsified forced-white
premise, F3 the body-ink focus-ring) + F4 the durability meta-assert.** The UNCONVERGED FRONTIER is DEVELOPMENT
EXECUTION: the four born-RED π by a NON-AUTHORING judge over LIVE Chrome AND real Safari, both modes; the on-disk
born-RED→GREEN artifacts committed; the SFC/CSS edits landed (currently NOT on tree); the FULL affected-gate suite
GREEN. The single load-bearing residual is the **R2 grouped-Select WebKit-DARK separation on REAL Safari** — if it
fails, escalate to the DEFERRED mono-caption header.
