# AX.W49 — math-paper composes latex-paper: real KaTeX over the hand-rolled glyph salad

**Band** F · DEMO-REAUTHOR · **Severity** major · **dependsOn** AX.W00 (the π visual-runtime lane
this wave's live arm closes on) · SEQUENCE-AFTER AX.W18 (the storybook IA reinvention — W18 FRAMES the
`compositions/math-paper` category row, may not RELOCATE it; W18 touches the manifest TREE only, this
wave rewrites the story BODY; they must not race the same file — see Disjointness) · **Charter** the
convergence ledger row W49 (`docs/tranches/AX/audit/convergence/CONVERGENCE-PLAN.md:27`) + §"Demo
reauthor" cohort (`:62` — W48/W49/W50) · **Audit**
`docs/tranches/AX/audit/convergence/D16.md` (D16 USER-DEFECTS-2026-06-08 — `/compositions/math-paper`
should leverage the sibling `../latex-paper` lib, not a hand-rolled Unicode/`<sub>`/`<sup>` math salad).

> Glosses (first-use, per precepts README §Core-Rules / glossary/meta-terms.md):
> *latex-paper* = the sibling `@mkbabb/latex-paper@0.2.1` lib at `../latex-paper` — a Vue KaTeX
> paper-rendering surface (`MathBlock`/`MathInline`/`Theorem` + the context-free `useKatex()` seam).
> *KaTeX* = the LaTeX-string → DOM math typesetter latex-paper composes (an optional peer).
> *contract-v2* = the cross-repo dev-resolution precept (`docs/precepts/cross-repo-dev-resolution.md`,
> invariant 30) — a `@mkbabb/*` specifier resolves through the sibling's `exports` map to its built
> `dist/`, dev + prod alike, the same way `@mkbabb/keyframes.js`/`value.js` already resolve.
> *salad* = the hand-rolled math: Unicode glyphs (`∑`/`∫`/`Sₙ`) + bare `<sub>`/`<sup>` strung on the
> text baseline, not laid out by a math renderer.
> *born-RED* = the gate must FAIL at HEAD before the wave, proving the defect is real, then go GREEN.
> *π lane* = the AX.W00 fail-CLOSED visual-runtime workspace (live Playwright + frontend-design audit).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on three falsifiable witnesses against HEAD, each a source-true line probe the new
gate inverts (re-prove live per the W00 ritual — do NOT proceed on the audit's word):

- **RED witness 1 (the headline — the math is a hand-rolled Unicode/`<sub>`/`<sup>` salad; deletion-
  falsifiable).** `demo/stories/compositions/math-paper.vue` (109 lines) renders ZERO LaTeX and composes
  NO math renderer. The display equation is faked: `Sₙ(x) = a₀ + <span>∑</span> <sub>k=1</sub><sup>n</sup>
  (aₖ cos kx + bₖ sin kx)` (`:76-89`), `lim<sub>n→∞</sub>` (`:87`), `∫ <sub>−π</sub><sup>π</sup>`
  (`:102-103`) — the summation `∑`, integral `∫`, partial-sum `Sₙ` are LITERAL Unicode characters in a
  `.fira-code text-[1.15rem] leading-loose tabular-nums` div (`:73-74`); the sub/superscripts sit on the
  text baseline (no nesting, no cramped style, no over/under for the sum limits). The equation block is a
  one-off `border-l-[3px] bg-muted/30 px-6 py-6` div (`:69-95`), not a `MathBlock` primitive.
  **Falsifiable RED:** *grep `math-paper.vue` for `<sub`/`<sup` and the literal `∑`/`∫` glyphs → at HEAD
  it returns ≥3 `<sub>`/`<sup>` math pairs + the literal `∑`/`∫` (RED — hand-rolled). After the wave: 0
  `<sub>`/`<sup>` math, 0 literal-Unicode-operator math; the equations are LaTeX strings rendered via
  latex-paper (GREEN).*

- **RED witness 2 (latex-paper is not a dep, not imported — substrate-without-consumer inverted).** The
  sibling lib that does EXACTLY this ships, unused. `grep latex-paper|katex` over `package.json` → 0 hits
  (the two registered `@mkbabb/*` siblings are `keyframes.js` + `value.js` only, `:728-729`); `node_modules/@mkbabb/`
  carries `keyframes.js`/`value.js`/`parse-that` but NO `latex-paper`; `node_modules/katex` is absent.
  `grep -rn "latex-paper\|useKatex\|MathBlock\|MathInline" demo/` → 0 hits. **Falsifiable RED:** *the
  composition mocks a math paper while `@mkbabb/latex-paper`'s `useKatex`/`MathBlock`/`MathInline` go
  uncomposed — the canonical "hand-rolled where a primitive exists" anti-pattern (CLAUDE.md
  component-over-class + the overfitting bar). After the wave `@mkbabb/latex-paper` + `katex` are demo
  devDeps and `math-paper.vue` imports + composes the render seam (GREEN).*

- **RED witness 3 (no theorem/equation-number environments — the things a real paper lib provides).** The
  du Bois-Reymond statement is a hand-built `<blockquote>` (`:46-61`); the Dirichlet–Jordan criterion is
  prose + the faked equation div (`:63-95`). There are NO theorem/proof environments, NO equation
  numbering, NO cross-references — exactly the first-class environments latex-paper's `Theorem`/`MathBlock`
  ship (`Theorem.vue` carries `theorem|definition|lemma|proposition|corollary|aside|example`; `MathBlock.vue`
  carries `numbered`+`number`). **Falsifiable RED:** *the composition reads as a MOCK-UP of a math paper,
  not a math paper — no `<Theorem>`, no numbered `<MathBlock>`. After the wave the du Bois-Reymond
  statement is a real `<Theorem>` and the Dirichlet–Jordan criterion is a numbered `<MathBlock>` (GREEN).*

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

---

## Goal

The `/compositions/math-paper` story renders REAL typeset mathematics — LaTeX strings laid out by KaTeX
through the sibling `@mkbabb/latex-paper` lib, with the du Bois-Reymond statement a first-class `<Theorem>`
and the Dirichlet–Jordan criterion a numbered `<MathBlock>` — composing the lib that exists rather than
hand-faking it, on the existing glass-ui `paper-grain-overlay` substrate, with the math/theorem chrome
re-expressed in glass-ui's token idiom (never latex-paper's legacy `hsl(var(--token))` theme.css).

---

## Scope (the gestalt fix — a transposition onto the sibling lib, NOT glyph-shuffling)

The fix is an **architectural transposition**: stop hand-faking math and compose latex-paper's render
seam. ONE cohesive demo reauthor. (D16 §3 is the source.)

1. **Add `@mkbabb/latex-paper` (+ `katex`) as glass-ui DEV/demo deps via the contract-v2 sibling path.**
   This is a DEMO composition — the lib goes in glass-ui's `devDependencies`, NOT a runtime/peer dep of
   the published library (math typesetting is not a glass-ui library concern; the substrate-with-consumer
   bar is met by the single demo consumer at the correct altitude, like `useStoryDemo`). `@mkbabb/latex-paper`
   resolves through its `exports` map (`./vue` → `dist/vue.js`) to its built `dist/` exactly the way
   `@mkbabb/keyframes.js`/`value.js` already resolve under contract-v2 (`vite.config.ts:24-37`). `katex` is
   latex-paper's optional peer (`peerDependenciesMeta.katex.optional`) and must be installed alongside —
   glass-ui adds BOTH to `devDependencies`. KaTeX's own stylesheet (`katex/dist/katex.min.css`) is imported
   into the SFC as-is (it is self-contained font-metric CSS — not token-bearing, nothing to re-express).

2. **Rewrite `math-paper.vue` to author the equations as LaTeX and render via latex-paper (the RECOMMENDED
   fuller shape — a real `<Theorem>` + numbered `<MathBlock>`).** The `MathBlock`/`MathInline`/`Theorem`
   SFCs `inject(PAPER_CONTEXT)` (each requires a provided `PaperContext` — `{sections, labelMap,
   renderInline, renderDisplay, renderTitle, assetBase, scrollToId}`); `useKatex()` is the context-FREE
   render seam (`renderInline`/`renderDisplay`/`renderTitle`, KaTeX with a module-level cache, NO inject).
   So `provide(PAPER_CONTEXT, ctx)` at the composition root with `ctx` built from `useKatex()` (the `sections`/
   `labelMap` are `[]`/`{}` for a self-contained snippet; `scrollToId` a no-op; `assetBase` `""`) — a
   one-`provide` cost — then compose the real primitives:
   - **`<MathInline tex="f"/>`**, `<MathInline tex="[-\\pi,\\pi]"/>`, `<MathInline tex="S_n"/>` for the
     inline math (drop the `.fira-code` Unicode spans + the hand-tinted `S`ₙ `<span>`).
   - The Dirichlet–Jordan criterion → a **numbered `<MathBlock numbered number="1" tex="…"/>`** authoring
     the partial-sum + the boundary-average limit as real LaTeX
     (`S_n(x) = a_0 + \\sum_{k=1}^{n}\\bigl(a_k\\cos kx + b_k\\sin kx\\bigr)`,
     `\\lim_{n\\to\\infty} S_n(x) = \\tfrac12\\bigl[f(x^+)+f(x^-)\\bigr]`) — deleting the hand-built
     `border-l-[3px] bg-muted/30 px-6 py-6` equation div (`:69-95`) entirely; `MathBlock` already owns the
     equation-rail + number recipe.
   - The du Bois-Reymond statement → a **`<Theorem type="theorem" name="du Bois-Reymond, 1873">`** (or a
     `<Theorem type="aside">` for the editorial quote) — deleting the hand-built `<blockquote>` (`:46-61`).
   The `S`ₙ/`∑`/`∫`/`<sub>`/`<sup>` salad is DELETED, not shimmed.

3. **Token-bridge the math/theorem rules into glass-ui's idiom — do NOT import latex-paper's `theme.css`
   raw.** latex-paper's `src/vue/theme.css` (15 KB) is authored against the **legacy `hsl(var(--token))`
   pattern** — `.paper-ref { color: hsl(var(--primary)) }` (`:14`), `border-bottom: 1px dashed hsl(var(--primary)
   / 0.4)` (`:17`), `.math-block` / `.theorem-block` rules at `hsl(var(--border))` / `hsl(var(--card) / 0.6)`
   (`:55,210`), 30+ such double-wraps. glass-ui's tokens are COMPLETE `hsl()` colors (`--primary: hsl(24 10%
   10%)`), so `hsl(hsl(24 10% 10%))` is invalid and **NEVER paints** — the EXACT double-wrap CLAUDE.md forbids.
   Importing latex-paper's theme.css verbatim would render the math/theorem chrome colorless. The wave instead
   re-expresses the FEW math/theorem rules the snippet needs in glass-ui's idiom — `color: var(--primary)`,
   `color-mix(in srgb, var(--border) 40%, transparent)`, the existing `--section-color-*`/`--viz-fourier`
   accents the story already reads (`:5-6`) — as a small `<style scoped>` (or a demo-private CSS surface)
   keyed off the `.math-block`/`.theorem-block`/`.math-inline` class names latex-paper's components emit.
   This is the **Tailwind-first / token-first re-expression** that governs any imported standalone CSS
   (MEMORY feedback_tailwind_first — design references from standalone CSS must be re-expressed via the house
   token grammar, never pasted raw). KaTeX's `katex.min.css` stays as-is (font-metric, not token-bearing).

4. **KEEP the glass-ui paper substrate (already aligned).** The story wraps the article in
   `paper-grain-overlay` (`:16`) + `rounded-[var(--radius-card)] border border-border/40 bg-card/60
   backdrop-blur-sm` (`:13-14`) — the correct glass-ui paper chrome. The fix KEEPS it and swaps only the MATH
   BODY from hand-rolled glyphs to latex-paper-rendered KaTeX. NO change to `PaperBackdrop.vue`, `paper.css`,
   `cards.css` — the math layer composes ON the existing paper substrate.

### Upstream note (do NOT absorb into this wave)

latex-paper's `theme.css` shipping the `hsl(var(--token))` legacy double-wrap is an **UPSTREAM
`../latex-paper` defect** — file it to the latex-paper repo (it is the same never-paint class the W34
ledger flags in consumers). This wave does NOT edit latex-paper source; it routes around the broken theme
by re-expressing the rules demo-side. If latex-paper later token-modernizes its theme and emits a glass-ui-
compatible skin, the demo can import `@mkbabb/latex-paper/theme` directly. Record this as a {receiver:
latex-paper upstream} note in the audit json — NOT a glass-ui edit, NOT a W34 leg (W34 audits CONSUMERS of
glass-ui; latex-paper does NOT depend on glass-ui — it is the reverse edge, a sibling the DEMO consumes).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `demo/stories/compositions/math-paper.vue` | **Reauthor** — `provide(PAPER_CONTEXT, useKatex()-built ctx)` at the script root; replace the inline `.fira-code` Unicode/`<span>S</span>ₙ` spans with `<MathInline tex="…"/>`; replace the hand-built equation div (`:69-95`) with a numbered `<MathBlock numbered number="1" tex="…"/>`; replace the hand-built `<blockquote>` (`:46-61`) with a `<Theorem>`; DELETE every `<sub>`/`<sup>` math pair + the literal `∑`/`∫`/`Sₙ` glyphs; import `katex/dist/katex.min.css`; add the demo-private token-bridged `<style scoped>` for the `.math-block`/`.theorem-block`/`.math-inline` chrome (glass-ui `var(--token)`/`color-mix`, NOT latex-paper's `hsl(var(--token))` theme.css). KEEP the `paper-grain-overlay` article frame + the `StoryPage` wrap. |
| `package.json` | Add `@mkbabb/latex-paper` + `katex` to `devDependencies` (the contract-v2 sibling path — `@mkbabb/latex-paper` resolves to `../latex-paper`'s built `dist/` like keyframes.js/value.js; `katex` is latex-paper's optional peer, installed alongside). Register `proof:math-paper-latex` (the new `proof:*` entry + the W00 meta-gate / `gates.mjs` parity match — `proof:gate-script-parity` bijection). |
| `scripts/proof-math-paper-latex.mjs` | **NEW** — the device-free demo-route source-structure gate (the four assertions in HardGate below). Born-RED at HEAD (the SFC imports no latex-paper, carries the `<sub>`/`<sup>`/Unicode salad, composes no `<Theorem>`/`<MathBlock>`). |
| `tests-visual/math-paper-latex.spec.ts` | **NEW** — the fail-CLOSED π live arm (drive `/compositions/math-paper`; assert KaTeX rendered `.katex` nodes are present + the salad `<sub>`/`<sup>` math is gone). |
| `docs/tranches/AX/audit/W49-math-paper-latex.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference + the latex-paper upstream `hsl(var(--token))` theme note. |

**OUT of bounds:** `demo/stories/manifest.ts` (the `compositions/math-paper` ROW + the category TREE — **W18 owns** the IA tree; W18 FRAMES the math-paper row, does NOT relocate it; this wave edits the story BODY only, never the manifest); `../latex-paper` source (the upstream `hsl(var(--token))` theme.css defect is FILED, not fixed here — this wave writes NO sibling source); `src/components/custom/paper-backdrop/PaperBackdrop.vue` + `src/styles/paper.css` + `src/styles/cards.css` (the paper substrate is KEPT, not touched — the math layer composes ON it); `src/components/custom/fourier-field/` + `demo/stories/substrates/fourier-field.vue` (the GRAPHICS primitive — **W43 owns** it; the fourier NAME overlap is topical only, see Dedup); the library public surface / `src/index.ts` / subpaths (latex-paper is a DEMO devDep, NOT a published glass-ui export).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W18 (storybook IA reinvention) — SEQUENCE-AFTER, file-coordinated on the manifest only.** W18 authors
  the manifest CATEGORY TREE and FRAMES `compositions/math-paper` as a Compositions row (`manifest.ts:232`);
  it does NOT touch composition CONTENT (it explicitly leaves `instrument-chassis`/`instrument-rail` etc. in
  Compositions untouched). W18 may RELOCATE the math-paper SFC's category, never rewrite its body. W49 edits
  ONLY the story BODY (`math-paper.vue`), never `manifest.ts`. **No shared file** — three-way-merge-safe.
  SEQUENCE-AFTER W18 so the IA settles the row before this wave's body rewrite (if W18 renamed the SFC path,
  this wave rewrites the SFC at its settled path). W18 frames; W49 fixes the content.
- **vs W43 (fourier-field first-class) — SHARES THE WORD "fourier" BY COINCIDENCE ONLY.** W43 is the GRAPHICS
  primitive `FourierField.vue` — an animated epicycle/DFT comet trace on the Canvas2D substrate + a GooBlob
  color seam (the brand mark). It is architecturally DISJOINT from math-PAPER (KaTeX prose+equation
  typesetting). The math-paper demo's CONTENT happens to be about Fourier *series convergence* (du
  Bois-Reymond, Dirichlet–Jordan) — a TOPICAL overlap, not an implementation overlap. W43's FileBounds touch
  `FourierField.vue`/its README/api-seat/`demo/stories/substrates/fourier-field.vue` — NEVER
  `demo/stories/compositions/math-paper.vue`. **NOT a cover.** (Cross-linked here so a future reader does not
  fold W49 into W43.)
- **vs W48 / W50 (the Demo-reauthor cohort) — sibling band, file-disjoint.** W48 reauthors
  `demo/stories/substrates/glass-material.vue` + its gate/spec; W50 reauthors its own D17 story. W49 touches
  only `compositions/math-paper.vue` + its own gate/spec/audit + `package.json` (the devDep adds). The three
  share `package.json` (each registers its own `proof:*` + the W48/W49 devDep adds) — coordinate the
  `package.json` hunks (disjoint blocks: W48's `proof:glass-material-demo` entry, W49's devDeps + `proof:math-paper-latex`
  entry). No SFC overlap.
- **vs W34 (cross-constellation idiom + consumer-adoption ledger).** W34 ledgers the 10 `@mkbabb/*` repos
  that CONSUME glass-ui for idiom drift. `latex-paper` is NOT in its 10-repo set, and `latex-paper` does NOT
  depend on glass-ui — it is the REVERSE edge (a sibling the DEMO consumes). The latex-paper `hsl(var(--token))`
  theme defect is filed UPSTREAM to latex-paper, NOT routed to W34. **Not in scope for W34.**

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive demo reauthor + devDep add).** Adds `@mkbabb/latex-paper` + `katex`
  to `devDependencies` (contract-v2 sibling resolution); reauthors `math-paper.vue` — `provide(PAPER_CONTEXT,
  useKatex()-ctx)`, the `<MathInline>`/`<MathBlock numbered>`/`<Theorem>` composition, the LaTeX strings, the
  `katex.min.css` import, the token-bridged `<style scoped>`; DELETES the Unicode/`<sub>`/`<sup>` salad +
  the hand-built equation div + blockquote. KEEPS the `paper-grain-overlay` article frame. Lint + typecheck
  at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the three RED witnesses against the patched tree:
  greps the SFC for surviving `<sub>`/`<sup>` math + literal `∑`/`∫`/`Sₙ` (asserts ZERO); confirms the SFC
  imports `@mkbabb/latex-paper` + composes `<Theorem>` + a numbered `<MathBlock>`; confirms `@mkbabb/latex-paper`
  + `katex` resolve at dev (the contract-v2 sibling path actually loads — not a broken specifier). ADVERSARIAL
  twist: confirms the demo-private `<style>` uses `var(--token)`/`color-mix` and carries NO `hsl(var(--token))`
  double-wrap (the never-paint trap); confirms latex-paper's `theme.css` is NOT imported anywhere. Drives the
  VISUAL-TRUTH live π audit (the binding close — see HardGate): asserts real `.katex` DOM nodes render and the
  math/theorem chrome PAINTS (not colorless).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `scripts/proof-math-paper-latex.mjs` (the four
  source-structure assertions) + `tests-visual/math-paper-latex.spec.ts` (the live KaTeX-rendered π arm);
  registers `proof:math-paper-latex` in `package.json` + `gates.mjs`; confirms BOTH FAIL at HEAD (the SFC has
  the salad + no latex-paper import; the route renders no `.katex` node).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b —
mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic
gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not
restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch research→plan-augment→redress,
never stall): (a) any need to touch `manifest.ts` / the IA tree (W18), `../latex-paper` source (upstream —
file, do not fix), or the `src/` paper substrate (KEPT, not edited) — a scope-reveal → triumvirate, never
absorbed in-line; (b) **the contract-v2 sibling resolution not loading** — if `@mkbabb/latex-paper`/`katex`
do not resolve at dev through the sibling `dist/` (a `../latex-paper` not built, or katex not installed),
this is a Class-2 environment roadblock: BUILD the sibling (`npm run build` in `../latex-paper`) / install
katex, do NOT vendor latex-paper source or re-hand-roll the math (re-hand-rolling is the defect this wave
deletes); (c) the demo-private token-bridge NOT painting (a residual `hsl(var(--token))` double-wrap leaking
in from a copied theme rule) → fix the re-expression, never import `theme.css` raw; (d) the 3rd diagnostic-
loop iteration where the math/theorem chrome does not read RIGHT on the glass-ui paper substrate → dispatch
research→plan→redress rather than re-tuning CSS ad hoc (the register may need a different glass-ui token).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gate — born-RED→GREEN.**

- **`proof:math-paper-latex` (NEW, born-RED — the demo-route SOURCE-STRUCTURE falsifier).** A source-parse
  of `demo/stories/compositions/math-paper.vue` asserting the four transpositions are actually present:
  **(a)** the SFC imports from `@mkbabb/latex-paper/vue` AND composes `useKatex()` + `provide(PAPER_CONTEXT,
  …)` (the seam is composed, not narrated); **(b)** the SFC mounts ≥1 `<MathInline>`, a numbered
  `<MathBlock>` (the Dirichlet–Jordan criterion), and a `<Theorem>` (the du Bois-Reymond statement) — the
  first-class environments; **(c)** ZERO `<sub>`/`<sup>` math pairs AND ZERO literal `∑`/`∫`/`Sₙ` math glyphs
  in the template (a DELETION-PROOF — the salad is gone); **(d)** the demo-private `<style>` uses
  `var(--token)`/`color-mix(in srgb, …)` and carries NO `hsl(var(--…))` double-wrap, and latex-paper's
  `theme.css` is NOT imported (the never-paint trap is avoided). **Born-RED at HEAD** (the SFC imports no
  latex-paper, carries the `<sub>`/`<sup>`/`∑`/`∫` salad, composes no `<Theorem>`/`<MathBlock>`). This is a
  **source-structure** gate (the SFC text is the artefact — a Vue SFC import/binding is a source-structure
  assertion, the precept-valid form per SPEC.md §Hard Gates; the RUNTIME paint is proven by the π arm below,
  NOT this text gate). **bite-check:** re-introduce one `<sub>` math pair → RED; strip the `useKatex`/import →
  RED; paste a `hsl(var(--primary))` rule into the `<style>` → RED.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson made
machinery — a green source gate over an unrendered/colorless KaTeX surface is the exact AW failure class).**
A live Playwright + frontend-design pass in the W00 `tests-visual/` π workspace, driving the real demo route
`/compositions/math-paper`:

- **`tests-visual/math-paper-latex.spec.ts` (NEW, fail-CLOSED).** Drive the route; assert KaTeX actually
  rendered — `page.locator(".katex").count()` ≥ the authored equation count (the `.katex` wrapper KaTeX
  emits is present, i.e. the LaTeX laid out, not a raw string); assert ZERO `<sub>`/`<sup>` math survives in
  the article body; read back the computed `color` of a `.theorem-label`/`.math-block__number` and assert it
  is a NON-transparent painted color (the token-bridge bites — the legacy `hsl(var(--token))` failure would
  read transparent/inherited). **Born-RED at HEAD** (no `.katex` node ever appears; the salad `<sub>`/`<sup>`
  are present). Exit non-zero — never SKIP-with-EXIT=0 — when the harness is present (the W00 fail-CLOSED
  contract).

- **The frontend-design judgement (the human ENRICHMENT side):** the composition reads as a REAL math paper
  — the summation `∑` is a properly laid-out big operator with stacked `k=1`/`n` limits (not baseline
  `<sub>`/`<sup>`), the `\tfrac12` is a real fraction, the `f(x^+)` superscripts are cramped-style; the
  du Bois-Reymond statement reads as a labelled `<Theorem>` and the Dirichlet–Jordan criterion as a numbered
  display equation; the math/theorem chrome PAINTS on the glass-ui token palette over the
  `paper-grain-overlay` substrate (not colorless). Affordance / hierarchy / NO visual occlusion / no
  regression on the surrounding paper frame per the AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the executed live π audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the binding close
criterion. The BEFORE capture pins the HEAD hand-rolled render (baseline `<sub>`/`<sup>`, literal `∑`/`∫`,
the mock-up read) the reauthored story must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD on the live
   demo route `/compositions/math-paper`: the `<sub>`/`<sup>`/`∑`/`∫`/`Sₙ` salad, the absent latex-paper
   import/dep, the hand-built blockquote + equation div (no `<Theorem>`/`<MathBlock>`). Confirm `../latex-paper`
   exists + is built (`dist/vue.js` present) — this wave's contract-v2 resolution BLOCKS on it; build it if
   stale. Capture the BEFORE π render (the mock-up math) as the born-RED baseline in
   `audit/W49-math-paper-latex.json`. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gates.** Author `scripts/proof-math-paper-latex.mjs` (the four source-structure
   assertions) + `tests-visual/math-paper-latex.spec.ts` (the live `.katex`-rendered + salad-absent + chrome-
   paints π arm); register `proof:math-paper-latex` in `package.json` + `gates.mjs`; confirm BOTH FAIL at HEAD.
3. **Add the demo devDeps (contract-v2).** Add `@mkbabb/latex-paper` + `katex` to `devDependencies`; verify
   `@mkbabb/latex-paper/vue` + `katex` resolve at dev through the sibling `dist/` (the keyframes.js/value.js
   resolution path); if `../latex-paper` is not built or katex not installed, build/install (the §3a Class-2
   environment trigger — never vendor or re-hand-roll).
4. **Reauthor the SFC body.** `provide(PAPER_CONTEXT, useKatex()-ctx)` at the script root; author the LaTeX
   strings; compose `<MathInline>`/`<MathBlock numbered number="1">`/`<Theorem>`; import `katex.min.css`; add
   the token-bridged `<style scoped>` (glass-ui `var(--token)`/`color-mix`, NO `hsl(var(--token))`, NO raw
   `theme.css` import); DELETE the Unicode/`<sub>`/`<sup>` salad + the hand-built equation div + blockquote;
   KEEP the `paper-grain-overlay` article frame. Lint + typecheck.
5. **Gates GREEN + VISUAL-TRUTH.** Confirm `proof:math-paper-latex` passes; run the fail-CLOSED π live audit
   (real `.katex` nodes render, big-operator limits stacked, the chrome paints, the `<Theorem>`/numbered
   `<MathBlock>` read as first-class) + the frontend-design judgement; capture the paired-π BEFORE/AFTER +
   DELTA; record the latex-paper upstream `hsl(var(--token))` theme note as {receiver: latex-paper upstream};
   write `audit/W49-math-paper-latex.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W49-math-paper-latex.json` — the born-RED→GREEN ledger: the three RED witnesses
  (the salad, the absent dep/import, the absent theorem/number environments), the contract-v2 sibling-
  resolution confirmation, the W18-sequence + W43-not-a-cover notes, the latex-paper upstream
  `hsl(var(--token))` theme {receiver: latex-paper upstream} note, and the post-wave GREEN structure + π-
  readback measurements.
- `scripts/proof-math-paper-latex.mjs` — the NEW demo-route source-structure gate (import + composition +
  salad-deletion-proof + no-`hsl(var(--token))`-trap).
- `tests-visual/math-paper-latex.spec.ts` — the NEW fail-CLOSED π live arm (rendered `.katex` + salad absent
  + chrome paints).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the `/compositions/math-paper` route
  BEFORE (baseline `<sub>`/`<sup>`, literal `∑`/`∫`, mock-up read) vs AFTER (real KaTeX big-operators with
  stacked limits, `\tfrac` fractions, labelled `<Theorem>` + numbered `<MathBlock>`, token-painted chrome).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(demo): proof:math-paper-latex born-RED + math-paper π spec — assert the story composes latex-paper, no hand-rolled math salad (AX.W49 D16)`
2. `chore(deps): add @mkbabb/latex-paper + katex as demo devDeps — contract-v2 sibling resolution (AX.W49 D16)`
3. `fix(demo): reauthor math-paper onto latex-paper — useKatex/MathBlock/MathInline + a du Bois-Reymond Theorem, token-bridged chrome, salad deleted (AX.W49 D16)`
4. `chore(AX.W49): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + latex-paper upstream hsl(var()) theme note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The live rendered-KaTeX + chrome-paints VISUAL-
  TRUTH audit rides the W00 fail-CLOSED lane, and the audit is the binding close criterion. W49 cannot close
  on the headless source gate alone (a green parse over an unrendered/colorless KaTeX surface is the exact AW
  failure class W00 was built to close). W00 stands up the lane it closes on. W00 is COMPLETE.
- **AX.W18 (storybook IA reinvention) — SEQUENCE-AFTER (not a hard data dep).** W18 FRAMES the
  `compositions/math-paper` row in the manifest tree and may RELOCATE the SFC. W49 rewrites the SFC BODY only,
  never the manifest. SEQUENCE-AFTER W18 so the row/path settle before the body rewrite (avoid racing the
  same SFC if W18 renames its path). File-disjoint on `manifest.ts`; coordinated by sequence.
- **The `../latex-paper` sibling — the contract-v2 resolution target.** `@mkbabb/latex-paper@0.2.1` exists,
  built (`dist/` present), and ships the `MathBlock`/`MathInline`/`Theorem` + `useKatex()` surface this wave
  composes. The wave BLOCKS on the sibling being built (contract-v2 resolves through its `exports` to `dist/`);
  if `../latex-paper` is stale, build it (the §3a Class-2 environment trigger). This is a build-time
  resolution dependency, not an AX-wave dependsOn.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

- **component-over-class / no-hand-roll-where-a-primitive-exists (CLAUDE.md).** Hand-faking math with
  Unicode + `<sub>`/`<sup>` while the sibling `@mkbabb/latex-paper` ships `MathBlock`/`MathInline`/`Theorem`
  is the canonical "hand-rolled where a primitive exists" anti-pattern. The wave composes the primitive.
- **gestalt over patches (MEMORY feedback_architectural_approach).** The fix is an architectural
  transposition onto the sibling lib, not glyph-shuffling the salad. The salad is DELETED, not refined.
- **token-first / no `hsl(var(--token))` double-wrap (CLAUDE.md).** glass-ui's tokens are complete `hsl()`
  colors; `hsl(hsl(…))` is invalid and never paints. The wave re-expresses the math/theorem chrome in
  `var(--token)`/`color-mix(in srgb, …)` and NEVER imports latex-paper's legacy `theme.css` raw.
- **Tailwind-first / re-express imported standalone CSS (MEMORY feedback_tailwind_first).** latex-paper's
  theme.css is a standalone reference; the few rules the snippet needs are re-expressed via the house token
  grammar, never pasted raw.
- **no-overfitting (substrate-with-consumer; the overfitting-audit MEMORY).** latex-paper is added at the
  correct altitude — a DEMO devDep with a single demo consumer (the math-paper story), like `useStoryDemo`.
  It is NOT promoted to a published glass-ui runtime/peer dep (math typesetting is not a glass-ui concern).
- **no-silent-deferrals.** The latex-paper upstream `hsl(var(--token))` theme defect is NOT silently dropped
  — it is recorded as a {receiver: latex-paper upstream} note in the audit json (NOT a glass-ui edit, NOT a
  W34 leg). The reverse-edge (sibling consumed by demo) is named explicitly.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates).** The salad-deletion-proof +
  the import/composition assertions are SOURCE-STRUCTURE proofs (a valid artefact form); the RENDERED `.katex`
  + the painted-chrome readback is the RUNTIME observation, NOT "grep found a source string for runtime
  behaviour." The wave's close is the executed VISUAL-TRUTH π audit, never a headless proof alone — the
  cardinal AX precept.
