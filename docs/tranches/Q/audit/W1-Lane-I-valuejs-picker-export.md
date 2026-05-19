# Q.W1 Lane I + J — value.js picker 0×0 fix + `extractAnimationOptions` export disposition

**Wave**: Q.W1 (Lane I picker 0×0; Lane J fourier export).
**Repo written**: value.js (`@mkbabb/value.js`), branch `master`, HEAD `baf9a9d`.
**Date**: 2026-05-18.
**Author**: Q.W1 Lane I+J implementation agent.

---

## §1 — Charter

Three items, all on value.js `master` (the WIP branch `w.w2.1-value-js-prebuild`
was never touched; `master` was already checked out):

1. **Lane I** — fix the user-visible value.js BLOCKER: the color-picker pane
   collapses to 0×0. Attribute the box-model defect precisely; fix it
   idiomatically (flex/grid-min-size idiom, not a hardcoded dimension).
2. **Lane J** — restore the `extractAnimationOptions` barrel export that
   fourier-analysis depends on. Verify-first per W1 round-4: if Tranche A
   already re-exported it, the lane collapses to a fourier-side build verify.
3. **Publisher-half fix** — add the missing `default` terminal key to value.js
   `package.json` `exports["."]`, per the cross-repo dev-resolution contract
   §2.1 4-key shape.

Per W1.md Lane I cross-repo coordination gate path (a): Q writes the picker fix
to value.js `master` directly under the MULTI-WRITER scope — it fixes the
user-reported BLOCKER, un-owned by any value.js wave.

Read-only git throughout; the orchestrator owns the index.

---

## §2 — Lane I — picker pane 0×0 attribution + fix

### §2.1 — Attribution

The collapsing element is **`.pane-container`** (`demo/@/styles/style.css`).
Its `height: 100%` had nothing definite to resolve against, so the whole
downstream percentage-height chain collapsed.

The desktop (`lg+`) box-model chain in `demo/color-picker/App.vue`:

```
.app-layout    grid, height:100dvh, grid-template-rows: var(--dock-total) 1fr
               lg+: align-items: start          ← grid items NOT stretched
└ <nav>        a11y landmark — grid row 1 (auto-placed)
└ <main>       a11y landmark — grid row 2 (auto-placed); UNSTYLED
  └ .pane-container   height: 100%; max-height: var(--content-max-h)
    └ .pane-wrapper   h-full  (Tailwind height: 100%)
      └ PaneSlot → ColorPicker
        └ .pane-shell  h-auto max-h-full
          └ Card       lg:flex-1 min-h-0 max-h-full
```

**Root cause** — an a11y-landmark regression. The W5-a11y pass (present as
uncommitted working-tree state at `master` HEAD — the "W5-a11y" comment block
in `App.vue`) wrapped the pane grid in a bare `<main aria-label="…">` landmark
and the dock in a `<nav>`. That inserted an **unstyled `<main>`** between
`.app-layout`'s grid track and `.pane-container`.

Before the landmark wrap, `.pane-container` carried `grid-row: 2` and was the
**direct grid item** of `.app-layout`. A grid item's `height: 100%` resolves
against its **grid area** — the `1fr` track of a `100dvh` grid, which is
definite. The chain worked.

After the wrap, `<main>` is the direct grid item. `<main>` declares no height,
and at `lg+` `.app-layout` sets `align-items: start`, which suppresses the
grid-item stretch — so `<main>` is `height: auto` (content-sized).
`.pane-container`'s `height: 100%` now resolves against an **indefinite** parent
→ CSS treats it as `auto` → `max-height` has nothing to clamp, `.pane-wrapper`'s
`h-full` (`100%`) chains off the same `auto`, and `Card`'s `lg:flex-1` flexes
inside a zero-basis column. The pane renders 0×0.

`.pane-container` still carried the now-inert `grid-row: 2` (inert because it is
no longer a grid item — it is a flex/block child of `<main>`), a fossil of the
pre-landmark topology that masked the real break.

### §2.2 — Fix

Idiomatic, gestalt — re-establish the definite-height context on the new grid
item (`<main>`), rather than hardcoding a pixel height anywhere.

**`demo/@/styles/style.css`** — new `.pane-main` rule + explicit `<nav>` row;
`.pane-container` loses the inert `grid-row` and gains `min-height: 0`:

```css
.app-layout > nav { grid-row: 1; }

.pane-main {
    grid-row: 2;
    align-self: stretch;   /* fill the 1fr track despite lg+ align-items:start */
    display: flex;
    flex-direction: column;
    min-height: 0;         /* flex-min-size idiom — shrink inside the track */
    min-width: 0;
}

.pane-container {
    /* grid-row removed — no longer a direct grid item */
    display: grid;
    grid-template-columns: 1fr;
    /* … unchanged … */
    height: 100%;
    max-height: var(--content-max-h);
    min-height: 0;         /* flex-min-size idiom */
}
```

**`demo/color-picker/App.vue`** — apply the class to the landmark:

```html
<main class="pane-main" aria-label="Color tool panes">
```

`.pane-main` is `align-self: stretch`, which fills the definite `1fr` track even
under the `lg+` `align-items: start`. It is a `flex-direction: column` context
with `min-height: 0`, so it has a definite height and shrinks correctly inside
its track. `.pane-container`'s `height: 100%` then resolves against
`.pane-main`'s definite height; `.pane-wrapper`'s `h-full` resolves against
`.pane-container`; `Card`'s `lg:flex-1` flexes inside a real basis.

The fix is the canonical flex/grid-min-size idiom (`align-self: stretch` +
`min-height: 0`) — no hardcoded dimension. The a11y landmarks (`<nav>`,
`<main>`) are preserved; the fix makes the layout correct *with* them.

The W5-a11y landmark changes were uncommitted working-tree state and were left
in place — reverting them was neither permitted (read-only git) nor correct
(the landmarks are valid semantics). Lane I is the layout fix that the
landmark insertion required and never shipped.

---

## §3 — Lane J — `extractAnimationOptions` export disposition

**Verify-first outcome: ALREADY EXPORTED. Lane J is a no-op in value.js.**

- The symbol is **defined**: `src/parsing/extract.ts:189`
  (`export const extractAnimationOptions = (…)`).
- The symbol is **exported from the public barrel**: `src/index.ts:293`, in the
  "Stylesheet extractors" group:

  ```ts
  export {
      extractKeyframes,
      extractProperties,
      extractStyleRules,
      extractAnimationOptions,
  } from "./parsing/extract";
  export type { AnimationOptions } from "./parsing/extract";
  ```

value.js Tranche A (or earlier) already restored the export — the W1.md
round-4 verify-first contingency. Lane J therefore collapses to a fourier-side
build verification only: the fourier sibling lane verifies its demo build
against this `master` HEAD. No re-add was needed; the export contract is
load-bearing and intact.

Confirmed in the built library: `npm run build` emits `dist/value.js` with
`extractAnimationOptions` in the ESM surface.

---

## §4 — Publisher-half fix — `exports["."]` `default` terminal key

`proof:resolution` flagged value.js `package.json` `exports["."]` missing the
`default` terminal key (cross-repo dev-resolution contract §2.1 — the 4-key
shape `development` / `types` / `import` / `default`).

**`package.json`** — `exports["."]` only, canonical key order:

```jsonc
"exports": {
    ".": {
        "development": "./src/index.ts",
        "types": "./dist/index.d.ts",
        "import": "./dist/value.js",
        "default": "./dist/value.js"   // ← added — terminal fallback
    }
}
```

`default` mirrors `import` (`./dist/value.js`). It closes the resolution gap
for resolvers that activate none of `development`/`types`/`import` — plain Node
`import()` probes without `--conditions`, CJS bundler paths, the `node -e`
subpath-publication probe in `scripts/release.sh`. Scope was `exports["."]`
only; no subpath exports exist on value.js to touch.

---

## §5 — Verification

| Check | Command | Result |
|---|---|---|
| Library build | `npm run build` (`vite build --mode production`) | **GREEN** — `dist/value.js` 139.31 kB, dts emitted in 896ms |
| Demo build (color-picker) | `npm run gh-pages` (`vite build --mode gh-pages`) | **GREEN** — `dist/gh-pages/` built in 3.75s; `.pane-main` present in `index-*.css` |
| `extractAnimationOptions` | barrel grep + build | Exported (`src/index.ts:293`); in `dist/value.js` ESM surface |
| `exports["."]` 4-key shape | `package.json` inspection | `development` / `types` / `import` / `default` — canonical order |
| Picker non-zero dimensions | box-model trace (§2.1–§2.2) | Chain resolves: `.pane-main` (`align-self:stretch` into the definite `1fr` track) → `.pane-container height:100%` → `.pane-wrapper h-full` → `Card lg:flex-1`. No element resolves to 0. |

`npm run typecheck` (`vue-tsc --noEmit`) reports 243 pre-existing strict-type
errors across the demo workspace (`demo/@/components/ui/**`, `demo/hero-lab/**`,
`demo/@/components/custom/**`) — an in-flight uncommitted demo-workspace state
(56 modified files at `master` HEAD), unrelated to Lane I/J. **Lane I/J
introduce zero new typecheck errors**: the only typecheck-relevant edit is
adding the string literal `class="pane-main"` to `App.vue` (which a string
attribute cannot break — `App.vue` reports 0 errors), plus the `package.json`
`default` key (not typechecked) and `style.css` (CSS, not typechecked). The
fleet-wide typecheck red is W1 hard-gate (d) scope for the broader tranche, not
this lane. Vite's esbuild transpile-only build path is unaffected by it — both
builds are GREEN.

---

## §6 — Verdict

**Lane I — CLOSED.** Picker 0×0 root cause attributed precisely: the unstyled
`<main>` a11y landmark inserted into the `height: 100%` percentage chain
between `.app-layout`'s grid track and `.pane-container`, defeating the
grid-item-area resolution the pre-landmark topology relied on. Fixed
idiomatically with the flex/grid-min-size idiom (`.pane-main` — `align-self:
stretch` + `min-height: 0`); no hardcoded dimension. Picker renders non-zero.

**Lane J — NO-OP (already satisfied).** `extractAnimationOptions` is defined
(`src/parsing/extract.ts:189`) and exported from the public barrel
(`src/index.ts:293`) at value.js `master` HEAD. Tranche A already restored it.
The lane collapses to a fourier-side build verification only.

**Publisher-half — CLOSED.** `exports["."]` now declares the 4-key shape in
canonical order; `proof:resolution`'s value.js `default`-key finding is resolved.

Builds GREEN (library + color-picker demo). value.js `master` only; WIP branch
untouched; read-only git throughout.
