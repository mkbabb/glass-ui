# BC.W-CODE-BLOCKS — component names + technical values → ONE Fira Code code-block register
- **Band:** 5 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** AFTER BC.W-PAGE-CHASSIS + BC.W-PAGE-HIERARCHY land the standardized chassis (the code-block register is a chrome refinement ON the standardized page — minting it before the chassis would re-thread sites the chassis is about to rewrite). BESIDE BC.W-PAGE-PRUNE (the prune kills copy; this re-styles the surviving technical copy). The two demo-chassis primitives this wave mints (`<Code>` / `<CodeBlock>`) are CONSUMED by BC.W-PADDING-CANON's witness pages + BC.W-SEPARATOR-FIX's rebuilt page.
- **Owns / closes:**
  - USER-DEFECTS §C: *"Component names + technical values must be proper CODE BLOCKS + Fira Code font."*
  - ORCHESTRATION §1 Band 5 box: `BC.W-CODE-BLOCKS — component names + technical values → proper code blocks + Fira Code`.
  - PROMPT-LEDGER O9: *"design hierarchy suffused; sections delimited; code-blocks+Fira; prune superfluity"* (the code-block half).
  - route-census §3: the 3-way `fira-code` (57 SFCs) / `font-mono` (24) / bare-`<code>` (70) code-style split, esp. `display/card.vue` (45 `font-mono`, 0 fira-code).

## Goal (the gestalt)
A developer scanning ANY demo page sees every component name (`<GlassDock>`), every token (`--glass-bg-floating`), every subpath (`@mkbabb/glass-ui/dock`), every px/numeric value (`13px`, `0.34s`, `ζ=0.65`) set in ONE consistent Fira Code treatment — a tinted inline `<code>` chip for the inline case, and a real multi-line block (a glass-quiet plate with a copy affordance) for the import-snippet case. There is no longer a page where the same kind of value reads in three different fonts; `display/card.vue` no longer shows 45 grey `font-mono text-xs` runs that read as muddy prose. The code is the calm, legible, craft-forward voice the math-paper page already has (Fira Code's ligatures live, `liga`/`calt` on) — it POPS as "this is a literal," not as decoration. When the user reads "proper code blocks + Fira Code," they see exactly that on every surface.

## Starting state (measured, file:line)
The canonical code style exists but is unenforced and three-way-forked (route-census §3):
- `@utility fira-code` is defined at `src/styles/typography/utilities.css:81-84` — `font-family: var(--font-mono); font-feature-settings: "liga","calt";`. The intended canonical class is `class="fira-code"`.
- **57 SFCs use `fira-code`**, **24 use `class="font-mono"` on `<code>`**, **70 use bare `<code>`** with no font class. Three dialects, no single register.
- **`display/card.vue` is the worst offender** (route-census §3, re-verified 2026-06-18): `grep -c "font-mono" demo/stories/display/card.vue` → **45**, `fira-code` → 0. Sample (`card.vue:104-176`): `<code class="font-mono text-xs">.glass-{tier}</code>`, `<code class="font-mono text-xs">tier</code>`, `<code class="font-mono text-xs">resting</code>` — every technical value re-spells `font-mono text-xs` inline.
- Other concentrations: `compositions/form-validation` (9 font-mono), `containers/popover`/`collapsible` (6 each), `feedback/progress` (6 font-mono), `data/search` (16 fira-code — already correct but inconsistent with siblings).
- **No multi-line CODE-BLOCK primitive exists.** Import snippets (`import { GlassDock } from "@mkbabb/glass-ui/dock"`) are rendered ad-hoc as prose or bare `<pre>`; there is no glass-plated, copy-able block rung. The route-census §0 BC gap names "the explicit import subpath (`@mkbabb/glass-ui/...`)" as a per-page requirement (BC.W-PAGE-CHASSIS) — that subpath needs a code-block home.
- Many technical values are inline PROSE, not code at all (`card.vue:101-108` mixes `<code>` with un-coded tier names; `compositions/settings.vue` has 0 code styling for its token names).

## Target spec (grounded)
ONE code register, TWO rungs, both demo-private chassis primitives (the demo-private precept — these never enter the library public surface; they are storybook chrome like `<StorySection>`/`<ShowcaseFrame>`):

1. **`<Code>` — the inline rung** (`demo/stories/Code.vue`). A thin `<code>` wrapper: `class="fira-code"` + a subtle tint chip so a literal pops out of prose. The chip is the SUFFUSE one-color-event idiom transposed to code — a `--surface-tint-8` (or `--glass-bg-quiet` at α) backplate + `--card-pad-title-gap`-derived inline padding + `rounded-sm`, the warm-ink `--foreground` text. NOT a second color: it reads as a calm tinted chip, the math-paper register. Default slot is the code text. A `tone?` prop (default unset) optionally tints the chip toward a `--section-color-N` for a token-family pop, but the DEFAULT is the neutral warm chip (proportion fence — one color event per surface stays binding; the chip is the existing event home, not a new one).
2. **`<CodeBlock>` — the multi-line rung** (`demo/stories/CodeBlock.vue`). A real fenced block for import snippets + multi-line examples: a `<pre class="fira-code">` on a `glass-quiet` plate (reading the rebuilt W55 tint seam, so it darkens-over-bright/lifts-over-dark in lockstep — NOT a flat grey slab), the golden padding ladder (`--card-pad-inline`/`--card-pad-block`, NOT a hand-rolled `p-4`), a `rounded-card` corner (the rounded-everywhere bar, BC.W-GHOST-DASHED's sibling concern), and a copy-to-clipboard affordance (a `<DockIconButton>`-style ghost copy button in the top-right that writes the slot text to the clipboard via the native `navigator.clipboard` — KISS, no library dep). Props: `code` (the literal string) XOR default slot; `lang?` (a label chip, decorative). PRM-safe by construction (no animation; the copy-feedback flash rides the §6 `--ease-standard` opacity, PRM-collapsed). Ligatures live (`fira-code` carries `liga`/`calt`).

The **import subpath every page declares** (BC.W-PAGE-CHASSIS) renders through `<CodeBlock>` — so the per-page `@mkbabb/glass-ui/<subpath>` line is a real, copy-able, Fira-Code code block in the hero/chrome, not prose. This is the load-bearing ≥2-consumer binding for `<CodeBlock>` (every chassis hero + every component-doc page).

Both primitives are TAILWIND-FIRST: the chip/plate compose existing `@utility`/tokens (`fira-code`, `--glass-bg-quiet`, `--surface-tint-*`, `--card-pad-*`, `rounded-card`/`rounded-sm`) — no new CSS token minted, no raw bracket utility (the BA.W-EMISSION structural-bracket lesson: a bare `[--x:…]` setter dies in a consumer scan, but these are demo-private SFCs Tailwind scans directly, so the existing `<Card>`-style bracket calc idiom is safe here).

## Mechanism / files
- **CREATE** `demo/stories/Code.vue` (the inline chip) + `demo/stories/CodeBlock.vue` (the multi-line plate + copy affordance). Demo-private chassis primitives (NOT exported from `src/`).
- **COLLAPSE the 3-way split** — sweep the demo route set:
  - Every `<code class="font-mono ...">` → `<Code>` (the 24 font-mono `<code>` sites + the 45 in `display/card.vue`).
  - Every bare `<code>` carrying a component name / token / px / subpath → `<Code>` (the 70 bare sites; a bare `<code>` that is genuinely NOT a technical literal — none found in the census — stays, but the gate's positive arm catches mis-classed prose).
  - Every multi-line import snippet / example → `<CodeBlock>`.
  - The 57 already-`fira-code` `<code>` sites fold onto `<Code>` too (ONE register — a raw `class="fira-code"` `<code>` is the third dialect, retired onto the primitive; the gate forbids a surviving raw `fira-code` `<code>` in the enrolled set).
- **`display/card.vue` is the headline re-author** — its 45 `font-mono text-xs` runs collapse onto `<Code>`; the un-coded tier-name prose (`card.vue:101-108`) becomes `<Code>resting</Code>` &c. (BC.W-PADDING-CANON co-owns `display/card.vue`'s padding; this wave owns its code voice — the two coordinate on the same file, code-style edits only here).
- **The `@utility fira-code` rule is byte-UNTOUCHED** (`utilities.css:81-84`) — it is the canonical source the primitives READ. This wave does not retune the font; it CONSOLIDATES the consumers.
- **NO library `src/` paint** — this is purely demo-private chassis + a sweep of `demo/stories/**`. (The user-facing "code block" is a demo concern; the library ships no `<Code>` component — a consumer styling its own code uses the documented `fira-code` utility.)

## Acceptance (gestalt + measured + gate)
1. **Captured-paint gestalt (dev-tools MCP, both modes):** a screenshot of `/display/card` shows every technical value as a consistent Fira-Code chip (no muddy grey `font-mono` prose runs); a screenshot of any chassis hero shows the import subpath as a real copy-able `<CodeBlock>` glass plate. A human reading the pair confirms "proper code blocks + Fira Code, one consistent voice." The `<CodeBlock>` plate paints translucent-warm (the W55 seam, α<0.7, oklab-L>0.85 on the calm backdrop — inheriting BC.W-GLASS-IDENTITY), NOT a flat grey slab.
2. **Machine gate `proof:code-blocks`** (device-free, born-RED on the pre-sweep tree → GREEN at close; the `proof:suffuse`/`proof:hierarchy` demo-census precedent):
   - C1 — `<Code>` + `<CodeBlock>` EXIST as demo-private SFCs; both compose `fira-code` (grep the SFC for the utility); `<CodeBlock>` carries the golden `--card-pad-*` (NOT a hand-rolled `p-N`) + a `rounded-card` corner + the copy affordance.
   - C2 — ZERO `<code class="font-mono ...">` survives in the enrolled `demo/stories/**` set (the font-mono `<code>` dialect retired; the bare grep `font-mono` on a `<code>` element REDs).
   - C3 — ZERO raw `<code class="fira-code">` survives (the third dialect folded onto `<Code>`).
   - C4 — `display/card.vue` carries 0 `font-mono` + 0 raw `fira-code` `<code>` (the headline offender clean); a `<Code>`/`<CodeBlock>` re-count ≥ the prior literal count (no value silently de-coded).
   - C5 — every per-page import subpath (BC.W-PAGE-CHASSIS's `@mkbabb/glass-ui/<sp>` line) renders through `<CodeBlock>` on the enrolled hero set (the ≥2-consumer bar for `<CodeBlock>`, met by construction — the census names every hero).
   - C6 — `@utility fira-code` is byte-untouched (a diff against HEAD on `utilities.css:81-84` is empty).
   - + a self-test bite: a synthetic re-added `<code class="font-mono">` in an enrolled SFC REDs C2; a synthetic raw `fira-code` `<code>` REDs C3.
3. **π readback `tests-visual/code-blocks.spec.ts`** (both modes, chromium): the inline `<Code>` chip resolves `font-family` to the Fira Code stack + a tinted backplate (computed `background` ≠ transparent) + the warm `--foreground` text; the `<CodeBlock>` plate resolves the `fira-code` font + a translucent glass background (α<0.92 over a busy backdrop — the toast-glass floor) + the golden padding (computed `padding-inline` == `--card-pad-inline`); the copy button is reachable + copies. Live-verify = a captured delta via the dev-tools MCP, never a commit claim.

## Fences / invariants (must NOT regress)
- **Clean break, NO alias** (MEMORY no-backwards-compat): the `font-mono`/raw-`fira-code` `<code>` dialects are RETIRED onto `<Code>`, not aliased; a site rewrites to the primitive.
- **`@utility fira-code` byte-untouched** — the font register is the existing source; this wave consolidates consumers, never retunes the typeface (the typography ladder is W-DISPLAY-TRACKING/W-HIERARCHY's, byte-fenced here).
- **Demo-private** — `<Code>`/`<CodeBlock>` are storybook chrome (the `<StorySection>`/`<ShowcaseFrame>` precedent); they NEVER enter `src/` or the public barrel. The library exposes the `fira-code` utility; the demo composes it.
- **ONE color event per surface** (proportion fence, `proof:suffuse` d1-d3 stay GREEN): the `<Code>` chip's `tone?` is opt-in; the DEFAULT chip is the neutral warm register, never a second competing color on a page that already has its color event.
- **Presets-in-consumers:** the `<CodeBlock>` plate reads the LIBRARY `--glass-bg-quiet` + W55 tint seam; no demo-local glass fork, no consumer hue baked into a library token.
- **The `<CodeBlock>` plate is GLASS** (the rebuilt W55 seam), not a flat grey slab — it inherits BC.W-GLASS-IDENTITY's material so the D1 grey-slab regression cannot re-enter through the code-block plate.

## Folds (deferrals discharged)
- route-census §3 (the 3-way code-style split) — **BUILT here:** the `fira-code`/`font-mono`/bare-`<code>` fork collapses onto the ONE `<Code>`/`<CodeBlock>` register. DECIDED.
- `ba.md` / `memory.md` carry NO dedicated code-block deferral (this is a fresh BC ask from the live walk); the closest is PROMPT-LEDGER O9's "code-blocks+Fira" recurring ask — DECIDED-built, no prior-tranche book to fold.
- The `display/card.vue` 45-font-mono concentration (route-census §3 named it the worst offender) — DECIDED-cleaned as the headline re-author; the file's padding half rides BC.W-PADDING-CANON (the two waves coordinate on the same file, disjoint concerns).
