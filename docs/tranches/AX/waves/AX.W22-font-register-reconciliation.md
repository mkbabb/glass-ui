# AX.W22 — Font register reconciliation: one brand register, default == rendered

**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00 · **Charter** AX.md §3 (the
`### AX.W22` block, lines 1167-1214) + the §1 summary row (line 130) + the §2 band-G membership (line 183)
+ the §2b band-G precept row (line 219) + §4 note 12 (the published-vs-HEAD currency gap, lines ~26-28)
+ §4 note 17 (the Fraunces cross-constellation contradiction — the HARD PRECONDITION, lines 2120-2131) ·
**Audit** `deep-audit-corpus.json` slice `fonts` (index 20; F0=three-incompatible-intents /
F1=Fraunces-substrate-without-consumer / F2=both-static-gates-blind / F3=triple-indirection-preset-undoes-the-default,
+ the slice notes RECOMMENDED-DECISION + the two proposed waves W-FONT-1/W-FONT-2) +
`constellation-analysis-corpus.json` `result[5].findings[0]` (the muster+words AS-P5 contradiction, severity
major) + `result[6].findings[0]` (the words A.W5 ASK-1 Fraunces dependency, severity **blocker**) +
`result[10].findings[7]` (value.js self-supplies Fraunces — corroborating the excise, severity info) +
`result[16].findings[1]` (words institutionalizes the body-defaults-to-display-serif anti-pattern, severity
major) + `result[30].findings[7]` (the π-lane must carry a DOM-cascade readback capability, not GPU-only,
severity minor).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD on three falsifiable witnesses that do NOT hold today. The charter's audit
baseline is `eaba94f`; the working tree is `6e3ad10` on `at-dock-convergence` — the font surface is byte-stable
across the two (re-verified live, per the §0 cardinal "re-verify before acting"; both static gates run PASS
at HEAD).

- **RED witness 1 (the library DEFAULT body register is a face NO live surface renders).** `tokens.css:43-44`
  set `--font-stack-display: "Fraunces", Georgia, serif` and `--font-stack-serif: "Fraunces", Georgia, "Times
  New Roman", serif`; `theme.css:107-108` bridge them to `--font-display`/`--font-serif`; `typography.css:143`
  sets `body { font-family: var(--font-serif) }`. So by library default ALL body + heading + prose + display
  text resolves to Fraunces — a serif. BUT the demo (the dogfood) forces Plus Jakarta onto serif+display via
  `index.html:9 data-typography-preset="brand-uniform-sans"` + `demo.css:98-102 --font-brand-sans` so the live
  demo renders a geometric SANS everywhere and **Fraunces never paints in the demo** (`grep -c 'font-family:
  "Fraunces"' demo/demo.css = 0). And speedtest forbids it (`MapSkeleton.vue:26` "never Fraunces"; its register
  is "Plus Jakarta Sans"). The falsifiable RED: *a live `getComputedStyle(document.body).fontFamily` on the
  demo with the preset attribute REMOVED resolves to `Fraunces`→Georgia (the system serif), NOT the register
  the demo/consumers paint (RED — default ≠ rendered). After the wave: the library default body/display family
  IS the rendered register (Plus Jakarta Sans + its calibrated Fallback) with NO preset opt-out (GREEN).*

- **RED witness 2 (Fraunces is substrate-without-consumer institutionalized by a green static gate —
  ~40KB critical payload for ZERO live renderers).** `src/fonts/fraunces/fraunces-latin.woff2` is 67388 bytes
  (contrast: Plus Jakarta latin 27348); `fonts.css:158-168` declares its `@font-face`; `typography.css:98-99`
  drives the `--font-display-variation-settings: "WONK" 1, "SOFT" 0` + `--font-display-weight` machinery the
  shipped face carries; `proof:font-axes` (`gates.mjs:186`) institutionalizes it by asserting the woff2 `fvar`
  carries WONK/SOFT — a gate that PASSES while the axes are silently inert (no live surface drives them). The
  falsifiable RED: *`test -f src/fonts/fraunces/fraunces-latin.woff2` → EXISTS; `proof:font-axes` → PASS over a
  face that NO live surface renders (RED — a green gate over dead substrate). After: under path (a) the dir +
  `@font-face` + WONK/SOFT machinery + `proof:font-axes` are GONE and `proof:font-axes` no longer registers in
  `gates.mjs`; under path (b) the face is wired into a live display surface so the axes stop being inert
  (GREEN under whichever path RATIFY chose).*

- **RED witness 3 (both static font gates are structurally blind to the live cascade — the textbook AW
  headless-green/visually-broken gap).** `proof:font-canon` (`gates.mjs:372`) checks only name-legality —
  Georgia is in its `SYSTEM_NAMED` allowlist (`scripts/proof-font-canon.mjs:53-65`) so the `"Fraunces",
  Georgia` fallthrough is gate-invisible; `proof:font-axes` checks only the woff2 `fvar`. NEITHER opens a
  browser; neither asserts which face actually PAINTS. The configurator `Fraunces` option
  (`demo/configurator/preset-editor/defaults.ts:24-25,47-49`) falls through to Georgia in the demo (no demo.css
  `@font-face`), and BOTH gates stay green. The falsifiable RED: *there is NO gate at HEAD that loads the live
  demo, awaits `document.fonts.ready`, and asserts the resolved first-loaded face on `body` / `.text-display-*`
  / `.fira-code` matches the intended register (RED — no live-cascade font gate exists). After: a π-lane
  `proof:font-cascade-live` fails RED on a deliberately-broken register and GREEN on the reconciled default
  (GREEN).*

The HardGate drives each witness to GREEN. Witness 2's disposition is gated by the RATIFY-BEFORE-IMPL
adjudication below (path (a) excise vs path (b) wire-the-face) — the wave does NOT proceed past Cadence step 1
until the adjudication is recorded.

---

## Goal

The glass-ui library DEFAULT font register equals the register the demo and the canonical consumers actually
paint — Plus Jakarta Sans (text/display) + Fira Code (mono), with NO preset opt-out, NO inert face, and NO
body-defaults-to-a-display-serif — proven by a π-lane live-cascade font gate that fails RED on exactly the
class HEAD ships green-but-broken.

---

## Scope (the gestalt fix — no workaround, no legacy alias, no rehome)

The root cause is ONE class: **three incompatible design intents stacked over the AC→AU arc and never
reconciled** (slice 20 F0). (1) `f6e68ff` decoupled `--font-sans` from `--font-serif`. (2) AC.W6b (`2474440`)
self-hosted Plus Jakarta Sans + Fira Code as the BRAND register — and Plus Jakarta carries a Capsize-calibrated
`"Plus Jakarta Sans Fallback"` face (`typography.css:34-63`), the proof it was meant to be the default, and it
IS what speedtest+demo render. (3) AU.W4 (`048ea88`, subject literally tagged `[slipped]`) shipped Fraunces
purely to make a self-imposed dangling display token non-inert — repointing `--font-stack-serif`/`--font-stack-display`
at it WITHOUT wiring it into the consumer register, WITHOUT a calibrated fallback, WITHOUT declaring it in
demo.css. The net is a library identity (Fraunces serif body) nobody renders, bolted-over by a triple-indirection
opt-out preset (`data-typography-preset` → `--font-brand-sans` → `--font-serif`) that exists ONLY to undo the
wrong default (slice 20 F3).

The gestalt fix is **pick ONE coherent register model and make the library DEFAULT be the register the
consumers render — no preset opt-out, no inert face, consolidate font tokens to ONE source.** The visual root
of "fonts — none are correct" is body defaulting to a display serif; that fix holds under EITHER adjudication
path. Five ORDERED folds (the adjudication is fold 0, a HARD precondition):

**(0) RATIFY the Fraunces cross-constellation contradiction FIRST — the HARD precondition (§4 note 17;
constellation `result[5]`/`result[6]`).** Charter scope says EXCISE Fraunces entirely; but the glass-ui AS
deferred ledger carries P5 "self-hosted full-axes Fraunces @font-face" as a FOLD with ≥2 named consumers
(value.js + words + slides clear the ≥2-consumer overfitting bar), and muster K + words A.W5 design slices
both WANT the WONK/SOFT axes (words A.W5-P1c/P1d DEPEND on glass-ui shipping a full-axes face — constellation
`result[6]` rates this a **blocker**). AS-P5 (ship) and W22 (excise) CANNOT both be true. Adjudicate in
§Archaeology with the value.js+words+muster+slides roster as evidence, ONE of two paths:
**(a) EXCISE** — the brand register is Plus-Jakarta+Fira and Fraunces is genuinely dead → KILL AS-P5 (do NOT
ship), re-ground words A.W5 + value.js + slides onto Plus Jakarta (document each repoint per the clean-break +
presets-in-consumers precepts; the adoption legs route to W34). **(b) WIRE** — Fraunces is the intended display
face → W22's excision premise is WRONG; SHIP the full-axes self-hosted `@font-face` with a calibrated fallback
+ a live display surface + a demo.css `@font-face` (making the inert WONK/SOFT axes load-bearing), keep
display=Fraunces / body=sans, and re-scope W22 to "fix the wrong BODY default, NOT excise the face."
**RECOMMENDED PATH: (a) EXCISE.** The audit RECOMMENDED-DECISION, value.js self-supplying Fraunces from its own
`@theme`+Google-Fonts link (`result[10]` — proving the library need not ship it, per presets-in-consumers), the
~40KB dead critical payload, and the §0 "excise or fail explicitly" + the ≥2-consumer overfitting rule (no LIVE
glass-ui renderer paints it) all point to excise. The remaining folds (1)-(4) are written for path (a); path
(b)'s deltas are noted inline and in §Open questions. **This wave does NOT touch any source until fold 0 is
recorded in the audit json.**

**(1) Repoint the library tokens so the DEFAULT body/display family IS the brand register (F0).** In
`tokens.css`, repoint `--font-stack-display` and the body register to `"Plus Jakarta Sans", "Plus Jakarta Sans
Fallback", system-ui, sans-serif` (the calibrated chain), and rename the now-misnamed `--font-stack-serif`
semantic — fold the serif/display register onto the brand text register. In `typography.css`, fix `body { }`
(`:143`) to read the canonical text register directly (not a `--font-serif` that pointed at Fraunces), and
re-ground the `--font-serif`-consuming utilities (`:271`/`:280`/`:288`/… the prose/heading ladder) onto the
text register. A display serif is wrong for body copy — that repoint is the visual root fix.

**(2) EXCISE Fraunces entirely (F1) — under path (a).** Delete `src/fonts/fraunces/` (the dir + woff2); delete
the `fonts.css:146-168` Fraunces `@font-face` block + its header comment; delete the WONK/SOFT machinery from
`typography.css` — the `--font-display-variation-settings: "WONK" 1, "SOFT" 0` + `--font-display-weight: 400`
declarations (`:98-99`), the `normal`/`600` re-declaration in the dropped preset block (`:135-136`), and EVERY
`font-variation-settings: var(--font-display-variation-settings)` + `font-weight: var(--font-display-weight)`
line across the display-utility ladder (`:158-159`/`:180`/`:196-197`/`:207-208`/`:218-219`/`:229-230`/`:240-241`/
`:251-252`/`:262-263`/`:429`/`:442-444`). DELETE `proof:font-axes` (`scripts/proof-font-axes.mjs` + the
`package.json:581` script + the `gates.mjs:186-189` registration). Re-ground the demo `.fourier-f` utility
(`typography.css:421`, the "viz-fourier red" italic display ℱ — its demo label already reads "Plus Jakarta Sans
display italic" at `typography.vue:54`) onto the Plus Jakarta display register; KEEP `.cm-serif`
(`typography.css:409`, the Computer-Modern math/serif utility — a DISTINCT face, not Fraunces) but verify it
still resolves through `proof:font-canon` (it names a non-shipped face that the canon gate already tolerates as
a consumer-supplied math voice; record the verification). Remove the `Fraunces` option from the demo
configurator (`defaults.ts:24-25,47-49`) so no UI offers a face that falls to Georgia.

**(3) Collapse the brand-uniform-sans escape-hatch preset + its sub-overrides (F3).** Delete the
`:root[data-typography-preset="brand-uniform-sans"]` block (`typography.css:132-137`) + the `--font-brand-sans`
indirection (`:96-97`) — when the default IS the brand register, the preset has nothing to undo. The demo then
needs NO `--font-brand-sans` override and NO preset attr: delete `index.html:9`'s `data-typography-preset`
attribute (+ its `:3-7` comment) and `demo.css:91-102`'s `--font-brand-sans` block — the demo renders the real
default with zero override.

**(4) Consolidate to ONE font-token source + rewrite the docs (F0/F2).** Consolidate the `--font-stack-*` /
`--font-*` tokens so there is ONE authoritative declaration site (the three-file scatter `tokens.css` +
`theme.css` + `typography.css` is the F2/27-F6 root). Rewrite the `typography.css` header (`:1-20`, the stale
"Fraunces serif/display" framing that contradicts the demo) and `src/fonts/README.md` (`:24-44`, the
Fraunces-as-design section) to state the ACTUAL register: Plus Jakarta Sans text/display + Fira Code mono.
**Harden `proof:font-canon`** to NECESSARY-only static pre-check (keep it — it is AV.W10, it stays valid: every
NAMED family resolves to a shipped face or a system keyword) and add the standing π-lane live-cascade gate
(HardGate).

No legacy alias, no `--font-serif`→`--font-text` back-compat shim, no rehome of Fraunces to an opt-in token
under path (a) (an opt-in editorial-serif token with no glass-ui consumer would re-mint the
substrate-without-consumer defect this wave excises — the consumers that want Fraunces self-supply it per
presets-in-consumers).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | Repoint `--font-stack-display`/`--font-stack-serif` (`:43-44`) onto the Plus Jakarta calibrated chain; fold/rename the serif register onto the text register. **Font-token block ONLY** — the §-seam carve that splits this file into partials is **W25b's** (see Disjointness). |
| `src/styles/typography.css` | Fix `body{}` (`:143`); re-ground the `--font-serif`-consuming utilities onto the text register; (path a) DELETE the WONK/SOFT machinery (`:98-99`,`:135-136`, the `font-variation-settings`/`font-weight` lines across the display ladder), re-ground `.fourier-f` (`:421-444`), KEEP+verify `.cm-serif` (`:409`); DELETE the `brand-uniform-sans` block (`:132-137`) + `--font-brand-sans` (`:96-97`); rewrite the header (`:1-20`). |
| `src/styles/theme.css` | Reconcile the `@theme` font bridges (`:107-110`) to the consolidated single-source register (rename the serif bridge if the serif token is folded). |
| `src/styles/fonts.css` | (path a) DELETE the Fraunces `@font-face` block + header (`:146-168`). |
| `src/fonts/fraunces/` (whole dir) | (path a) **DELETE** (the 67KB woff2 + dir). |
| `src/fonts/README.md` | Rewrite the register section (`:24-44`) to the actual register; (path a) delete the "Fraunces (display, AU.W4)" section. |
| `package.json` | (path a) DELETE the `proof:font-axes` script (`:581`). The `./fonts/*` glob export (`:247`) auto-drops the absent face — NO manual export edit. |
| `scripts/proof-font-axes.mjs` | (path a) **DELETE** (the gate retires with the face). |
| `scripts/gates.mjs` | (path a) DELETE the `proof:font-axes` registration (`:186-189`); update the `proof:font-canon` note (`:375`) if the canon-gate scope shifts. |
| `scripts/proof-font-cascade-live.mjs` | **NEW** — the π-lane live-cascade font gate (or its home in the W00 π workspace — coordinate with W00; see Disjointness). |
| `demo/index.html` | DELETE the `data-typography-preset="brand-uniform-sans"` attr (`:9`) + the `:3-7` preset comment. |
| `demo/demo.css` | DELETE the `--font-brand-sans` override block (`:91-102`). |
| `demo/configurator/preset-editor/defaults.ts` | Remove the `Fraunces` font option (`:24-25`) + the preset serif/display Fraunces stacks (`:47-49`) + the `:13` comment ref. |
| `docs/tranches/AX/audit/W22-font-register-reconciliation.json` | **NEW** — the born-RED→GREEN audit artefact + the fold-0 adjudication record. |

**OUT of bounds:** the `tokens.css` §-seam PARTIAL CARVE (**W25b** splits `tokens.css` into `src/styles/tokens/`
partials — W22 only EDITS the font-token block in place; W25b dependsOn W22 so the carve follows the edit); the
`utilities.css` / `glass.css` / `dock.css` carves (**W25a/W25b/W06**); the `--ease-apple-spring` token + its
consumers (**W05** — a disjoint token namespace); the speedtest/words/value.js sibling source (**W34** receives
the adoption legs — W22 writes NO sibling source, it routes the repoint NOTES); the demo manifest typography
ROW + IA tree (**W18** dependsOn W22 and owns the IA re-baseline over the reconciled register — W22 does NOT
re-author the typography story's IA placement); the README live-currency capture (**W33** dependsOn W22); the
W00 π-workspace SCAFFOLD (W00 owns the lane; W22 authors the font-cascade ASSERTION that runs IN it).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W00 (the π visual-runtime lane).** W22's live-cascade font gate RUNS IN W00's π workspace. Per
  constellation `result[30].findings[7]` the π lane must carry a **DOM-cascade readback capability**
  (`document.fonts` API + `getComputedStyle` + a canvas glyph-width fingerprint), NOT GPU `readPixels` only —
  W00 is named as the home, and the font gate, the W23 dot-contrast gate, the W20 card-toggle gate, and the W24
  deck-progress gate are the four π-lane consumers that need computed-style/screenshot readback. **Disjoint by
  ownership:** W00 builds the lane + the DOM-readback capability; W22 authors `proof:font-cascade-live` (the
  font ASSERTION) that the lane hosts. If W00 scopes the lane WebGL-only, W22's gate has no home — this is the
  RATIFY-BEFORE-IMPL coordination item (Open question 3). W22 dependsOn W00.

- **vs W25a/W25b (CSS god-module gate-extension + carves).** W25b dependsOn W22 (charter line 1321) and CARVES
  `tokens.css` into §-seam partials + RELOCATES `utilities.css` component recipes. **The shared file is
  `tokens.css`** — W22 EDITS the font-token block (`:43-44`) IN PLACE; W25b SPLITS the whole file into
  `src/styles/tokens/` partials AFTER W22's edit lands (the dependsOn ordering guarantees no three-way merge:
  W22's font edit settles first, then W25b carves the settled file). **Disjoint by sequence + concern:** W22
  owns the font-token VALUES + the WONK/SOFT-machinery deletion in `typography.css`; W25b owns the FILE
  STRUCTURE split. The `--font-serif` body-override note in §4 (W25b's speedtest ledger, line 1655) explicitly
  attributes the speedtest font-preset removal to **W22** — confirming the font-register edits are W22's, the
  carve is W25b's.

- **vs W05 (one iOS-spring vocabulary — the speedtest external-consumer sweep).** Both W22 and W05 carry a
  speedtest external-consumer repoint that routes to W34 (W22: the `data-typography-preset` + `@theme` re-alias
  + `--font-serif` body override removal; W05: the 4 `--ease-apple-spring` sites onto `--spring-*`). **Disjoint
  by token namespace** — W22 touches `--font-*`; W05 touches `--ease-apple-spring`/`--spring-*`. They share the
  speedtest repo as an adoption TARGET (both route to W34) but NO shared glass-ui file. Coordinate the W34
  speedtest annex so the two repoints land in one speedtest PR, not two churns.

- **vs W18 (storybook IA ground-up reinvention).** W18 dependsOn W22 (charter line 1004) and re-baselines the
  IA fixtures + the typography story's IA placement over the reconciled register. **Disjoint by ownership:**
  W22 owns the font-register VALUES + the demo `index.html`/`demo.css` preset removal + the `typography.css`
  header; W18 owns the CATEGORY-TREE authorship + the `EXPECTED_TREE` re-baseline + the typography-story IA
  slug. W22 does NOT re-author the IA; W18 does NOT re-introduce the dropped preset.

- **vs W33 (AX close — README live-currency).** W33 dependsOn W22 (charter line 1831) and captures the π-lane
  font-cascade screenshot into the README live-currency set. **Disjoint:** W22 ships the gate + the rewritten
  `typography.css`/`fonts/README.md`; W33 cross-walks the inheritance ledger + captures the final π evidence.
  W22 writes its OWN doc rewrites; W33 does NOT re-edit them.

- **vs W34 (cross-constellation idiom + consumer-adoption receiver).** W34 receives the speedtest + words +
  value.js + slides Fraunces/register repoint NOTES (the adoption legs). **W22 is the in-repo register
  reconciliation; W34 is the consumer migration.** W22 writes NO sibling source — it routes each repoint as a
  named annex with the value.js/words/muster/slides roster. value.js is UNAFFECTED by the excise (it self-loads
  Fraunces — `result[10]`); words + speedtest MUST repoint (they institutionalize the wrong register —
  `result[16]` / `result[6]`). Disjoint by repo.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms that parallelize after fold 0).** Arm A (the library register —
  `src/styles/*` + `src/fonts/` + `package.json`/`scripts` Fraunces retirement): repoint `tokens.css`
  font-block + `theme.css` bridges; fix `typography.css` `body{}` + re-ground the `--font-serif` ladder; (path
  a) delete the Fraunces dir + `fonts.css` block + the WONK/SOFT machinery + `proof:font-axes` (script +
  package.json + gates.mjs); re-ground `.fourier-f`, verify `.cm-serif`; consolidate to one token source;
  rewrite the `typography.css` header + `fonts/README.md`. Arm B (the demo de-indirection —
  `demo/index.html`/`demo.css`/`defaults.ts`): delete the `data-typography-preset` attr + `--font-brand-sans`
  override + the configurator Fraunces option, so the demo renders the real default with zero override.
  `npm run build` + `vue-tsc --noEmit` + BOTH static font gates at every interval (the build is the
  dropped-`@font-face`/dangling-`@import` canary). Arms A and B both touch the live cascade — Arm A lands first
  (the default must be correct BEFORE the demo override is removed, else the demo flashes the wrong default).

- **Adversarially-verify (≤1 read-only lane).** Re-runs the three RED witnesses against the patched tree:
  asserts a live `getComputedStyle(body).fontFamily` resolves to the Plus Jakarta register (NOT Fraunces/Georgia)
  WITH the preset attribute removed; asserts (path a) `src/fonts/fraunces/` is GONE, `proof:font-axes` no longer
  registers in `gates.mjs`, and ZERO `Fraunces`/`WONK`/`SOFT`/`font-brand-sans`/`data-typography-preset` refs
  survive across `src/styles/`+`demo/`+`package.json`+`scripts/`; asserts `proof:font-cascade-live` FAILS RED on
  a deliberately-repointed-to-Georgia register and GREEN on the reconciled default. ADVERSARIAL twists: (a)
  tries to make the wave "pass" by removing the demo preset WITHOUT fixing the library default (confirms the
  demo then flashes Fraunces/Georgia — proving the default repoint, not the preset removal, is the real fix);
  (b) confirms `.cm-serif` (the math/serif utility) still resolves through `proof:font-canon` and was NOT
  collateral-deleted with the Fraunces excise (the do-not-touch guardrail — `.cm-serif` is a DISTINCT face);
  (c) confirms the canvas glyph-width fingerprint distinguishes the REAL Plus Jakarta face from a metric-matched
  fallback (a `document.fonts.check` true over a non-loaded face is the silent-pass trap); (d) confirms value.js
  still renders Fraunces from its own `@theme`+Google-Fonts after the glass-ui excise (`result[10]` — zero
  consumer breakage).

- **Gate-author (≤1 agent — the live-cascade gate + the static-gate reconcile).** Authors
  `proof:font-cascade-live` (the π-lane DOM-readback assertion: load the demo, `await document.fonts.ready`,
  `getComputedStyle` on `body` + each `.text-display-*` + `.fira-code` + `.text-admin-label`, assert the
  resolved first-loaded face matches the intended register via `document.fonts.check` + a canvas width
  fingerprint, fail RED if body renders Georgia/system-serif). Demotes `proof:font-canon` to necessary-only
  static pre-check; (path a) retires `proof:font-axes` from the gate set + the CI/release registration.
  Confirms the live gate FAILS at the pre-wave default (Fraunces serif body) and PASSES on the reconciled
  register.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 verify + 1 gate.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**

The wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — devise an in-FileBounds gestalt fix; spawn a tangent triumvirate to work AROUND an error; escalate ONLY when genuinely user-gated) + §6.2 (the 4-class halt-vs-work-around decision tree). It governs here by reference; the orchestrator may not redispatch the failing unit alone. The wave-specific §3a triggers (authored from this wave's FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2).** If the Fraunces excise requires the W25b `tokens.css` §-seam PARTIAL CARVE (W22 edits the font-token block IN PLACE only), if `.cm-serif` re-grounding pulls in a `--ease-apple-spring` namespace edit W05 owns, if the speedtest/words/value.js repoint reaches into sibling source W34 receives, or if the typography-story IA placement needs re-authoring W18 owns → HALT, dispatch the triumvirate. A sibling-owned surface is NEVER edited in-line.
- **Non-local gate failure → triumvirate (Class 2).** If `proof:font-cascade-live` has no home because W00 scoped the π lane WebGL-`readPixels`-only (the DOM-cascade readback capability is missing — Open Question 3), or `vue-tsc`/`npm run build` reds on a dangling `@import`/dropped `@font-face` that resolves to a non-W22 surface → triumvirate.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If `proof:font-cascade-live` fails to distinguish the real Plus Jakarta face from a metric-matched fallback (the `document.fonts.check` silent-pass trap) for a third canvas-fingerprint re-tune, or the body-default repoint live audit fails to settle for a third pass → HALT the failing unit + triumvirate.
- **§5.3 ratify reached un-ratified → halt-and-ratify (Class 3).** If fold-0 (the Fraunces path-a-EXCISE vs path-b-keep adjudication) reaches impl un-ratified, or the W00↔W22 π-lane DOM-readback coordination (Open Question 3) is un-settled → stop, surface to the orchestrator, never self-ratify. (The cross-consumer Fraunces reconcile is USER-ADJUDICATED per §6.1(iii) — escalate, do not self-decide.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`npm run build` GREEN + (path a) the `dist/fonts/fraunces/` face NO LONGER EMITS.** The `./fonts/*` glob
   export auto-drops the absent face; the `@font-face` `src: url("@mkbabb/glass-ui/fonts/fraunces/…")` is gone
   so no dangling font URL ships. **Born-RED** if a `@font-face` still references the deleted woff2; GREEN after.
   A build/deletion artefact.
2. **`vue-tsc --noEmit` GREEN** — no font-token type or `api/index.ts` reference dangles (the font tokens are
   CSS-only; no public type changes — this is the build-cleanliness canary).
3. **`proof:font-canon` GREEN (demoted to necessary-only static pre-check)** — every NAMED family in the demo
   tables + presets + the library `--font-stack-*` resolves to a shipped `@font-face` OR a generic/system
   keyword. **Born-RED** if a token still points at a now-deleted face (the Fraunces stack); GREEN after the
   repoint. (The bite is still live: re-add a non-shipped face → RED.)
4. **(path a) `proof:font-axes` RETIRED — a deletion-PROOF.** The gate (script + `package.json:581` + the
   `gates.mjs:186-189` registration) is GONE because the face it guards is excised. **Born-RED** as a
   substrate-without-consumer gate over a dead face; GREEN-by-removal (the precept-valid deletion form — a gate
   that institutionalized dead substrate is itself retired). Under path (b) this gate STAYS and goes GREEN over
   a now-live face.
5. **`proof:font-cascade-live` (NEW π-lane gate) — the binding live-cascade assertion.** Loads the demo, awaits
   `document.fonts.ready`, asserts `getComputedStyle` on `body`/`.text-display-*`/`.fira-code`/`.text-admin-label`
   resolves the INTENDED shipped face (canvas width-fingerprint to distinguish the real face from a
   metric-matched fallback), fails RED if body renders Georgia/system-serif. **Born-RED** at HEAD (no such gate
   exists; the live demo's default-with-preset-removed renders Georgia); GREEN after the default repoint. A
   runtime-observation artefact (the precept-valid form — NOT a grep-for-source-string).
6. A **deletion-PROOF** (valid artefact form): (path a) `test -d src/fonts/fraunces` → absent;
   `grep -rc "Fraunces\|WONK\|SOFT\|font-brand-sans\|data-typography-preset\|font-display-variation-settings"
   src/styles/ demo/index.html demo/demo.css demo/configurator/preset-editor/defaults.ts package.json
   scripts/proof-font-axes.mjs scripts/gates.mjs` → 0 across the surface (the `.cm-serif` math utility is the
   ONE allowed serif survivor — verify it is NOT Fraunces).

These are build / structural / runtime-observation / deletion artefacts (the precept-valid forms per SPEC.md
§Hard Gates lines 94-104) — NOT grep-for-source-string-as-runtime-behaviour gates.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass over the demo AND (the CONVERGE fold) the speedtest + words LIVE surfaces, in **light AND
dark** at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900):
- **Default == rendered, on the demo:** with the `data-typography-preset` attribute REMOVED, the live demo body
  + headings + display + `.text-admin-label` render Plus Jakarta Sans (the intended register), the mono
  surfaces render Fira Code — NO Georgia/system-serif fallthrough, NO FOUT-to-serif flash, NO CLS spike on load
  (the calibrated fallback holds the metrics). The `.text-display-*` ladder + `.fourier-f` ℱ read as Plus
  Jakarta display italic; `.cm-serif` (the math voice) renders unchanged.
- **The configurator font picker is honest:** every font option the configurator offers resolves to a face that
  actually paints — NO option falls through to Georgia (the Fraunces-option trap is gone under path a).
- **The consumer surfaces survive the register change (CONVERGE fold; routes to W34):** the speedtest + words
  live surfaces, with their preset/serif-override repointed, render the reconciled Plus Jakarta register with NO
  broken cascade — the π-lane font gate runs against the consumer LIVE surfaces, not just the demo.

**The wave does NOT close on the headless gates alone** — the executed live cascade-paint audit (captured as a
paired-π BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, the W00 protocol) is the binding close
criterion. This replaces the static-only font gates that shipped green over a Fraunces default no live surface
paints — the textbook AW headless-green/visually-broken gap this wave closes.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + RATIFY fold 0.** Re-confirm the three RED witnesses against
   HEAD live: the demo default (preset removed) renders Fraunces→Georgia; both static gates run PASS over the
   dead face; the configurator Fraunces option falls to Georgia. **Record the fold-0 adjudication** (path a
   EXCISE recommended) in `audit/W22-…json` with the value.js+words+muster+slides roster — do NOT proceed past
   this step until the path is ratified. Do NOT trust the audit's word — re-prove.
2. **Repoint the library DEFAULT register (F0) — Arm A first.** `tokens.css` font-block onto the Plus Jakarta
   calibrated chain; `theme.css` bridges; `typography.css` `body{}` + the `--font-serif` ladder re-ground.
   `npm run build` + `vue-tsc` + `proof:font-canon`. (At this point the demo default is correct even with the
   preset still present.)
3. **(path a) EXCISE Fraunces (F1).** Delete the dir + `fonts.css` block + the WONK/SOFT machinery across
   `typography.css` + `proof:font-axes` (script + package.json + gates.mjs); re-ground `.fourier-f`; verify
   `.cm-serif`; remove the configurator Fraunces option. `npm run build` (the dangling-`@font-face` canary) +
   `vue-tsc`.
4. **Collapse the escape-hatch preset + the demo de-indirection (F3) — Arm B.** Delete the
   `brand-uniform-sans` block + `--font-brand-sans`; delete `index.html`'s preset attr + `demo.css`'s override.
   The demo now renders the real default with zero override. `npm run build` + a live spot-check.
5. **Consolidate to ONE token source + rewrite the docs (F0/F2).** One authoritative `--font-stack-*`/`--font-*`
   site; rewrite the `typography.css` header + `fonts/README.md` to the actual register.
6. **Author `proof:font-cascade-live` + reconcile the static gates.** Author the π-lane live-cascade gate
   (in the W00 workspace); demote `proof:font-canon`; (path a) confirm `proof:font-axes` retired. Confirm the
   live gate FAILS at the pre-wave default and PASSES on the reconciled register.
7. **Gates GREEN + VISUAL-TRUTH.** Run the full font gate set; run the VISUAL-TRUTH live demo + speedtest +
   words audit; capture the paired-π BEFORE/AFTER + DELTA; route the speedtest/words/value.js/slides repoint
   NOTES to W34; write `audit/W22-…json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W22-font-register-reconciliation.json` — the born-RED→GREEN ledger: the three RED
  witnesses (default ≠ rendered; Fraunces substrate-without-consumer + green-gate-over-dead-face; both static
  gates blind to the live cascade), the **fold-0 adjudication record** (path a EXCISE, with the
  value.js+words+muster+slides roster as the evidence basis + the AS-P5 KILL decision), the per-finding (F0-F3)
  disposition, and the post-wave GREEN measurements (the live `getComputedStyle` register, the Fraunces dir/gate
  removal, the ~40KB critical-payload reduction, the one-source token consolidation).
- The post-build `dist/` proof: (path a) `dist/fonts/fraunces/` is NO LONGER EMITTED + no `@font-face`
  references the deleted woff2 (the excise evidence + the ~40KB payload delta).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the demo body/headings/display register
  before (Fraunces/Georgia with preset removed) → after (Plus Jakarta), at ≥3 viewports × light/dark, plus the
  canvas width-fingerprint trace proving the real face loaded; the speedtest + words live-surface
  before/after with the repointed register.
- A consumer-adoption NOTE annex (routed to W34, NOT executed here): speedtest (`data-typography-preset` + the
  `@theme` re-alias + the `--font-serif` body override removal), words (body/sans/display off Fraunces onto Plus
  Jakarta; stop defaulting body copy to a display serif), value.js (verify-only — self-supplies Fraunces, zero
  breakage), slides (re-ground per the path-a clean break) — each with the per-consumer evidence line.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(fonts): W22 born-RED baseline — default Fraunces serif body ≠ rendered Plus Jakarta; both static gates blind; fold-0 EXCISE adjudication recorded (AX.W22)`
2. `refactor(styles): repoint the library default font register onto Plus Jakarta Sans — tokens + theme bridges + body{} + the serif ladder re-ground (AX.W22 F0)`
3. `refactor(fonts): excise Fraunces — dir + @font-face + WONK/SOFT machinery + proof:font-axes; re-ground .fourier-f, keep .cm-serif (AX.W22 F1)`
4. `refactor(demo): collapse the brand-uniform-sans escape-hatch preset + the demo --font-brand-sans/data-typography-preset indirection — render the real default (AX.W22 F3)`
5. `docs(fonts): consolidate font tokens to one source + rewrite the typography.css header + fonts README to the actual register (AX.W22 F0/F2)`
6. `test(fonts): proof:font-cascade-live π-lane gate — live getComputedStyle + canvas width-fingerprint; demote font-canon, retire font-axes (AX.W22 F2)`
7. `chore(AX.W22): audit ledger GREEN + paired-π default-==-rendered capture + W34 consumer-repoint annex`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery + the gate home.** The fail-CLOSED π workspace is the
  home of `proof:font-cascade-live` (the live `getComputedStyle` + `document.fonts.ready` + canvas
  width-fingerprint readback) — the binding close criterion. W22 cannot close on the static gates alone (a green
  `proof:font-canon`/`proof:font-axes` over a Fraunces default no live surface paints is exactly the AW cardinal
  failure). Per constellation `result[30].findings[7]`, W00's π lane MUST carry a DOM-cascade readback
  capability (not GPU `readPixels` only); W22 is one of the four named π-lane consumers. (Charter `### AX.W22`
  dependsOn AX.W00, line 1168.)
- **HARD PRECONDITION — the Fraunces cross-constellation adjudication (§4 note 17).** Not a wave-dependsOn but a
  fold-0 RATIFY gate: AS-P5 (ship the full-axes face) and W22 (excise it) cannot both be true; the wave does NOT
  touch source until the adjudication is recorded. The value.js+words+muster+slides consumer roster is the
  evidence basis (constellation `result[5]`/`result[6]`/`result[10]`/`result[16]`).
- **Downstream:** **AX.W25b** dependsOn W22 (charter line 1321) — the `tokens.css` §-seam carve follows the W22
  font-token edit so the partial-split carves the settled file. **AX.W18** dependsOn W22 (line 1004) — the IA
  ground-up reinvention re-baselines the typography story over the reconciled register. **AX.W33** dependsOn
  W22 (line 1831) — the README live-currency capture includes the π-lane font-cascade evidence. **AX.W34**
  receives the speedtest/words/value.js/slides repoint annex (the §16 receiver). **AX.W05** shares the speedtest
  adoption target (disjoint token namespace — coordinate the W34 speedtest PR).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`f6e68ff`** — the `--font-sans`/`--font-serif` DECOUPLE: the first of the three incompatible intents (a
  consumer could brand the serif voice independently). The decoupling is what later let AU.W4 repoint serif at
  Fraunces without touching sans.
- **`2474440`** (AC.W6b, v1.5.0) — the Plus Jakarta Sans + Fira Code SELF-HOST as the BRAND register. Plus
  Jakarta carries a Capsize-calibrated `"Plus Jakarta Sans Fallback"` face (`typography.css:34-63`) — the
  positive proof it was meant to be the DEFAULT, and it IS what speedtest + demo render. This commit is the
  evidence basis for path (a): the brand register predates Fraunces by an entire arc.
- **`048ea88`** (AU.W4, subject literally tagged **`[slipped]`**) — the Fraunces SHIP: it repointed
  `--font-stack-serif`/`--font-stack-display` at Fraunces purely to make a self-imposed dangling display token
  non-inert (the WONK/SOFT axes), WITHOUT wiring it into the consumer register, WITHOUT a calibrated fallback,
  WITHOUT declaring it in demo.css. The `[slipped]` tag is the audit's own evidence that the ship was a
  mechanical token-fix, not a design decision. `proof:font-axes` (`gates.mjs:186`, AU.W4) institutionalized the
  dead face.
- **AV.W10** (`proof:font-canon`, `gates.mjs:372`) — the canon gate that STAYS (re-scoped to necessary-only):
  its `SYSTEM_NAMED` allowlist (`proof-font-canon.mjs:53-65`) includes Georgia, which is exactly WHY the
  `"Fraunces", Georgia` fallthrough is gate-invisible — the structural blindness W22's live gate corrects.
- **The AS-P5 deferred-ledger item** (`docs/tranches/AS/audit/W0b-L4-deferred.md:50,123` — "the one W5-SHIP that
  did not land", "lowest-risk highest-impact WC lever; do NOT let it slip a tranche", ≥2 named consumers) — the
  cross-tranche contradiction. W22 fold-0 KILLS this under path (a) (Fraunces is genuinely dead; the consumers
  self-supply or repoint to Plus Jakarta).
- **The cross-constellation Fraunces demand (the adjudication evidence basis):** words
  `docs/tranches/A/GRAND-AUDIT-FOLD.md:131` (ASK-1, ">=2 real consumers: value.js + words + slides") +
  `:59` (A.W5-P1c) — the words A.W5 typo work DEPENDS on a full-axes glass-ui Fraunces (constellation
  `result[6]`, **blocker**); muster `docs/tranches/K/design/WC-design-typo-color.md:13,37-41` (muster wants
  Fraunces' WONK/SOFT re-engaged, calling General-Sans-for-display "the slop"); words `theme.css:5-8` +
  `index.css:129` (institutionalizes the body-defaults-to-Fraunces-serif anti-pattern — `result[16]`); value.js
  `demo/@/styles/style.css:28-29` + `demo/color-picker/index.html:14,17` (self-supplies Fraunces from its own
  `@theme`+Google-Fonts — `result[10]`, proving the library need not ship it). Under path (a) words + speedtest
  repoint; value.js is unaffected; slides re-grounds — all routed to W34 per the clean-break precept.
- **HEAD `eaba94f`** (charter audit baseline; working tree `6e3ad10` on `at-dock-convergence`) — both static
  gates ship GREEN over the Fraunces default; the demo forces Plus Jakarta via the triple-indirection preset;
  Fraunces never paints in the demo (`grep -c 'font-family: "Fraunces"' demo/demo.css = 0`).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-G binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code (no backwards-compat memory; SPEC.md §"no shadow APIs or temporary compatibility
  layers"; the Fraunces adjudication is the §2b band-G clause).** The reconciliation is ONE register model with
  ONE token source — no `--font-serif`→`--font-text` back-compat alias, no Fraunces rehome to a dead opt-in
  token (which would re-mint the substrate-without-consumer defect). The triple-indirection escape-hatch preset
  (`data-typography-preset` → `--font-brand-sans` → `--font-serif`) is COLLAPSED, not bridged. MUST NOT ship a
  legacy `brand-uniform-sans` shim once the default IS the brand register.
- **no-overfitting / wire-before-retire (precepts/README.md "No overfitting … needs a current consumer and
  evidence. Otherwise delete it."; precepts/audits/overfitting-audit.md the ≥2-consumer rule).** Fraunces is the
  overfit substrate — a self-hosted 67KB face institutionalized by `proof:font-axes` with ZERO live glass-ui
  renderers (the demo forbids it via the preset; speedtest forbids it explicitly). Under path (a) the wave
  DELETES the unconsumed face + its guarding gate (the precept-valid disposition). The ≥2-consumer SIGNAL
  (value.js+words+slides) is adjudicated in fold-0 to be CONSUMER-PRESET territory (value.js self-supplies —
  `result[10]`), NOT library identity — the presets-in-consumers precept. MUST NOT keep a demoted-but-surviving
  Fraunces token (a demote is not a delete).
- **presets-in-consumers (the user-memory precept; constellation `result[10]` cites it).** Named themed faces
  (Fraunces' WONK/SOFT editorial voice) live in the CONSUMERS that want them (value.js already does); the
  library's OWN default tokens evolve in `src/styles/` as the library identity changes — Plus Jakarta IS the
  glass-ui identity (the AC.W6b brand register). MUST NOT treat a consumer-specific display voice as library
  default.
- **substrate-with-consumer (precepts/README.md "Substrate and consumer land together"; SPEC.md line 86) — the
  NEW gate IS its own consumer.** `proof:font-cascade-live` is net-new substrate, but its consumer is the wave's
  OWN close criterion + the four named π-lane consumers (W22/W20/W23/W24, `result[30]`) — it is consumed the
  moment it lands. The π-lane DOM-readback capability (W00) is the substrate it composes. MUST NOT author a
  font gate with no live surface to assert against (it asserts the demo + the speedtest/words live surfaces).
- **no-silent-deferrals (SPEC.md §"consumer will be wired later" is NOT a valid gate, line 109; the §16.4
  zero-loss; the Fraunces cross-consumer reconcile per §2b).** The speedtest + words + value.js + slides
  register repoints are NOT silently dropped — each is ROUTED to W34 with a named per-consumer annex (path-a
  clean-break repoint or verify-only). The AS-P5 contradiction is ADJUDICATED in fold-0 (KILL P5, document the
  re-ground), not deferred. MUST NOT close W22 with an un-adjudicated AS-P5 or an unrouted consumer.
- **Gates close on evidence (precepts/README.md line 13; SPEC.md §Hard Gates lines 94-104 — build/test/runtime/
  diff/deletion, NOT "grep found a source string for runtime behaviour" line 108) + the π visual-runtime lane
  (SPEC.md §π, lines 216-251).** The gates are build (`npm run build`/`vue-tsc` as the dropped-`@font-face`
  canary), runtime-observation (`proof:font-cascade-live` — a live browser cascade readback, the precept-valid
  runtime form), and deletion (the Fraunces dir/gate removal, the no-Fraunces-survivor proof). The binding close
  is the executed live cascade-paint audit, never a static-only proof — the cardinal AX precept ("Runtime Truth
  Beats Source Claims"; the slice's own close criterion: a live-cascade getComputedStyle assertion that catches
  "a shipped face the live cascade overrides away").
- **documentation-is-part-of-the-change (precepts/README.md line 16; SPEC.md line 158).** The stale
  `typography.css` header ("Fraunces serif/display") + the `fonts/README.md` "Fraunces (display, AU.W4)" section
  are REWRITTEN to the actual register as part of the wave (the doc-truth the reconciliation mutates) — not
  deferred to W33. W33 captures the live-currency README evidence; W22 rewrites the font docs themselves.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **Fraunces fold-0: EXCISE (path a) vs WIRE-THE-FACE (path b) — the HARD precondition.** §4 note 17 +
   constellation `result[5]`/`result[6]` make this a blocker-severity adjudication the wave cannot proceed past.
   **RECOMMENDED: path (a) EXCISE** — the AC.W6b brand register predates Fraunces; the `[slipped]`-tagged AU.W4
   ship was a mechanical token-fix; value.js self-supplies Fraunces (`result[10]`, proving the library need not
   ship it); the ~40KB dead critical payload + the §0 excise-or-fail + the ≥2-consumer overfitting rule (no LIVE
   glass-ui renderer) all point to excise; the consumers that want the WONK/SOFT voice carry it as a
   consumer-preset. RATIFY path (a), KILL AS-P5, and route the words A.W5 + value.js + slides re-ground to W34.
   (If RATIFY chooses (b), folds 1-4 re-scope to "fix the wrong BODY default, keep display=Fraunces" and ship
   the full-axes self-hosted face + calibrated fallback + a live display surface — and AS-P5 ships instead of
   dies. The body-defaults-to-display-serif fix holds under EITHER path.)

2. **The `--font-serif` → text-register semantic rename + the one-source consolidation shape.** Fold 1 re-grounds
   the `--font-serif`-consuming utilities onto the text register; fold 4 consolidates the three-file token
   scatter to ONE source. **RECOMMENDED:** rename `--font-stack-serif`/`--font-serif` to a `--font-stack-text`/
   `--font-text` semantic (the serif voice is gone under path a) and consolidate the authoritative `--font-stack-*`
   declarations into `tokens.css` (with `theme.css` keeping ONLY the `@theme` bridge, `typography.css` keeping
   ONLY the runtime `--font-*`/`--leading-*`/`--tracking-*` + the utility ladder). RATIFY the rename + the
   single-source home so W25b's `tokens.css` carve (its dependsOn) splits the SETTLED file, and so external
   consumers repointing through W34 target the FINAL token names (not a name that W25b later moves).

3. **The `proof:font-cascade-live` home — W00 π-workspace vs in-repo `scripts/`.** Per constellation
   `result[30].findings[7]`, W00's π lane must carry the DOM-cascade readback capability (`document.fonts` +
   `getComputedStyle` + canvas fingerprint), but the charter's W00 framing is WebGL-pixel-readback-centric — if
   W00 scopes the lane GPU-only, the font gate has no home. **RECOMMENDED:** W22 coordinates with W00 to name the
   font gate (+ the W20 card-toggle / W23 dot-contrast / W24 deck-progress gates) as the four DOM-readback π-lane
   consumers, and authors `proof:font-cascade-live` IN the W00 workspace (not a standalone in-repo script that
   would re-derive the headless-Playwright scaffold). RATIFY that W00's π lane carries DOM-cascade readback
   BEFORE W22 authors the gate, so the font gate is built on the lane, not beside it.

4. **`.cm-serif` survival vs collateral-deletion under the Fraunces excise.** `.cm-serif`
   (`typography.css:409`, the Computer-Modern math/serif utility consumed by `demo/stories/foundations/intro.vue:38`)
   is a DISTINCT face from Fraunces — it must survive the excise. **RECOMMENDED:** keep `.cm-serif` and verify it
   still resolves through `proof:font-canon` (it names a non-shipped math face the canon gate tolerates as a
   consumer-supplied voice); the verify lane's twist (b) guards against a collateral delete that shares the
   "serif" substring. RATIFY that `.cm-serif` is OUT of the Fraunces excise scope so a substring-match sweep does
   not strand the math voice. (`.fourier-f` IS re-grounded onto the Plus Jakarta display register — its demo
   label already names Plus Jakarta, so this is a no-op rename of intent, not a deletion.)
