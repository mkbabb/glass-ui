# BI.W-CODEBLOCK — hljs highlighting + the warm-crayon theme + the sizing model + tree-standardized

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F3** "If we're to have these code sections, they should be properly sized (horizontally and vertically), syntax highlighted with highlight.js and a theme (look to keyframes.js for how we do this, or value.js OUR library) and fully standardized to be in every page." (ss-10 — unhighlighted mono, full-width, cramped).
- **FAM-8** (`AUDIT-REGISTRY`): CodeBlock primitive exists; adopted on 1/150 pages; ZERO highlighting; 2 pages hand-roll `<pre>`; both siblings use highlight.js ^11.11.1 + a house `.hljs` theme.
- **G2** (`story/PASS-1.md` §6): the hljs delivery mechanism — lazy-runtime (raw-text-first) vs build-time; the CLS-0 sizing reconcile.
- **G3**: crayon contrast on translucent glass — every `.hljs-*` crayon clears AA ≥4.5:1 / APCA ≥60 over the composited `.glass-quiet` plate in BOTH modes.
- **G4 Arm A**: the fira-code code-vs-content classifier census (pass-4: 58 files reference fira-code, **2 raw-code offenders** — `compositions/configurator.vue:318`, `feedback/toaster.vue:53` — 56 legit mono content).

## Design

Runtime-lazy hljs is the RULED delivery (`PASS-4B-AGGLOMERATION` ruling-adjacent: G2 adopts `story/PASS-1.md` §4.2): glass-ui snippets are authored inline literals, not `?source` file imports, so the value.js build-time file plugin does not apply. The model: raw fira-code `<pre>` paints from frame 0 (real selectable text, copied text === source), the lazy `import("highlight.js/lib/core")` swaps highlighted innerHTML when the chunk resolves — **highlighting is deferred COLOR, never deferred content** (no-masking-fallback: a dead hljs chunk leaves legible mono, never blank). Box identical pre/post swap (CLS 0).

The theme is a STATIC cascade-driven warm-crayon (`hljs-house-theme.css`): `--code-{keyword,entity,string,number,comment}` reading `--section-color-*`/`--viz-*`/`--foreground`/`--on-glass-muted-strong`, `.hljs-*` → `var(--code-*)`, a PLAIN `.dark` arm (the `light-dark()` inset-shadow trap avoided — MEMORY). NEVER GitHub colors, NEVER a head-`<style>` swap (the value.js post-mortem: zero wrong-theme first paint). Pass-3 recomputed all 5 crayon fixes clearing WCAG≥4.5 AND APCA≥60 exactly (2 light-mode crayons just-clear 4.5 — land with a small extra margin).

The sizing model (G2, pass-4 MEASURED): `white-space: pre` (NOT pre-wrap — a wrapped long identifier is worse than a scroll), `overflow-x: auto` + FadingScroll edge cue, `max-inline-size: 42rem` (prose measure), `--type-small` box, the copy affordance kept.

## Work

- NEW `demo/chassis/code/useCodeHighlight.ts` — lazy `import("highlight.js/lib/core")` + 3-4 grammars (ts/css/bash/xml-vue), scoped to the component's own `<pre>`, idempotent marker attr (the value.js runtime shape minus the theme swap).
- NEW `demo/chassis/code/hljs-house-theme.css` — the static token-derived warm-crayon theme + the plain `.dark` arm; the G3 contrast fixes landed (the 2 just-clear light-mode crayons get margin).
- `demo/chassis/code/CodeBlock.vue` — the `<pre class="story-code-block-pre fira-code">` (currently line 92-94) gains `white-space:pre; overflow-x:auto; max-inline-size:42rem` + FadingScroll; paints raw from frame 0, swaps highlighted innerHTML on the lazy resolve.
- Fold the 2 raw offenders onto CodeBlock: `demo/stories/compositions/configurator.vue:318`, `demo/stories/feedback/toaster.vue:53` (the `<pre v-pre class="fira-code …">` raw blocks) → `<CodeBlock>`.
- Standardize CodeBlock across the tree (the FAM-8 1/150 → tree-global adoption behind the code-vs-content classifier).

## Acceptance

Gate: **`proof:story-code-register`** (the pass-4 `scripts/proof-story-code-register.mjs`, born-RED) + `proof:code-blocks` EXTENDED tree-global — GREEN at close (BORN-RED at HEAD: 2 raw offenders, zero highlighting, 1/150 adoption; exit 1).

Clauses:
- C1 CodeBlock is the ONLY code register — no raw `<pre class="fira-code"><code>` in stories, off the classifier's legit mono-content set (font specimens / terminal output / ascii — 56 legit).
- C2 the 2 raw offenders (configurator.vue:318, toaster.vue:53) fold onto CodeBlock (exit-1 born-RED → GREEN).
- C3 highlight-present: the rendered CodeBlock carries `.hljs-*` spans (the lazy chunk resolves) AND the raw text is present from frame 0 (CLS 0 across the swap).
- C4 the crayons read warm tokens (`--code-*` → `--section-color-*`/`--viz-*`/`--foreground`), never GitHub literals; G3 every crayon clears AA≥4.5 / APCA≥60 over `.glass-quiet`, both modes (paint-arm OKLab readback).
- C5 the sizing model: `white-space:pre`, `overflow-x:auto`, `max-inline-size:42rem`, FadingScroll.
- Self-test bites (7/7, pass-4 shown): a planted raw `<pre class="fira-code"><code>` offender reds C1/C2; a planted GitHub-color crayon reds C4; a planted `white-space:pre-wrap` reds C5; a legit mono-content file (terminal output) greens.

## π/DELTA

- **The highlighted code block** — a real TS import snippet renders with the warm-crayon theme (keyword/entity/string/comment distinct), sized (pre + 42rem + h-scroll cue), CLS 0 across the raw→highlighted swap, Chrome + real-Safari, both modes (`tests-visual/code-blocks.spec.ts`).
- **Crayon contrast** — the comment crayon (worst case) clears AA≥4.5 / APCA≥60 over the composited `.glass-quiet` plate, both modes (paint-arm readback, not source inspection — G3).

## Obligations

- **DEP**: `highlight.js@^11.11.1` in **devDependencies only** (demo builds via `demo/vite.demo-dist.config.ts`; NEVER enters `dist/glass-ui.js`; both siblings pin it — house-blessed). `proof:lighthouse` floor unchanged; the root barrel critical-path weight stays 0.
- **STABLE-Safari** (SAF-1): the crayon paint + the FadingScroll edge cue on real Safari.app.

## Dispositions

- Terminalizes **WS4-15** (Fira code blocks — re-open the highlight arm, now LANDED). **FAM-8** / **UF-F3** discharged.

- AUTHOR the gate-script clauses this spec's §Acceptance names (the R15 courtesy fix: §Work must carry the authoring item for every clause §Acceptance specs — the gate must be buildable from this spec alone).
