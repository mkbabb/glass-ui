# AN.W1 — `/styles` completeness (probe + before/after)

Closes F.W10 §Scope item 1a, AN §6 gap 1. The single `@import "@mkbabb/glass-ui/styles"`
now carries the COMPLETE stylesheet: the token cascade PLUS the compiled SFC `<style scoped>`
component CSS. The second `@import "@mkbabb/glass-ui/styles.css"` bridge retires from the
consumer head.

## Root cause (HEAD state)

The library shipped CSS at two distinct exports — a consumer needed both:

| Export | dist target | Carries |
|---|---|---|
| `./styles` | `dist/styles/index.css` | token cascade only (the `@import` chain of `src/styles/*.css`) |
| `./styles.css` | `dist/glass-ui.css` | SFC `<style scoped>` payload only (`.aurora-root` grid layering, Progress/Slider/Notification/… scoped rules) |

The SFC scoped CSS is Vite's component-CSS extraction (the `data-v-*`-attributed rules). It already
existed in the dist; it just sat behind a separate export. A consumer mounting only `./styles` got the
tokens but NOT the component scoped rules — Aurora's `.aurora-root { display: grid }` + `grid-area: 1/1`
layering (the load-bearing case the muster F redesign surfaced) was absent.

### BEFORE probe

```
$ grep -rl "aurora-root" dist/styles/    →  NONE   (SFC scoped CSS absent from /styles)
$ grep -c "aurora-root" dist/glass-ui.css →  1      (lives only behind /styles.css)
$ grep -c "\-\-primary:" dist/glass-ui.css → 0      (token cascade absent from /styles.css)
$ grep -c "glass-resting" dist/glass-ui.css → 0
```

The two artefacts are disjoint — neither export is complete on its own.

## Mechanism (Shape A — fold the SFC bundle into `/styles`)

`vite.config.ts` `publishStyleAssets` (closeBundle) already `cpSync`'s `src/styles/` → `dist/styles/`.
AN.W1 appends one line to the DIST copy of `index.css`:

```css
@import "../glass-ui.css";
```

inserted immediately before the trailing `@source "../components"` at-rule (CSS forbids `@import`
after a non-import statement, so it sits inside the file's leading `@import` block). The SFC bundle
lives one dir up from `dist/styles/`, hence `../glass-ui.css`.

Shape A rationale (vs B re-point / C invert): least-invasive — the cascade authoring (`src/styles/index.css`)
is untouched, `proof:theme`'s source-read of `src/styles/index.css` stays valid (the `@import` is injected
into the DIST copy only, not source), and `./styles.css` stays reachable as a transparent SFC-only export
(NOT a back-compat alias) for a cascade-free consumer.

Diff — `vite.config.ts` `publishStyleAssets`, after the `cpSync` calls:

```ts
const distIndex = resolve(distStyles, "index.css");
const sfcBundle = resolve(root, "dist/glass-ui.css");
if (existsSync(distIndex) && existsSync(sfcBundle)) {
    const indexSrc = readFileSync(distIndex, "utf-8");
    const sfcImport = '@import "../glass-ui.css";';
    if (!indexSrc.includes(sfcImport)) {
        const sourceAt = indexSrc.indexOf("@source");
        const folded = sourceAt === -1
            ? `${indexSrc}\n${sfcImport}\n`
            : `${indexSrc.slice(0, sourceAt)}/* AN.W1 — SFC scoped … */\n${sfcImport}\n\n${indexSrc.slice(sourceAt)}`;
        writeFileSync(distIndex, folded, "utf-8");
    }
}
```

`src/styles/index.css` header comment updated to document the single-import resolution shape.

### AFTER probe

Resolved the dist `/styles` bundle through a Tailwind v4 compile (`@import "tailwindcss" source(none)` +
`tw-animate-css` + dark variant + `@import dist/styles/index.css`):

```
resolved /styles bytes  188534
  aurora-root (grid layer)   PRESENT   ← SFC scoped CSS now in /styles
  aurora grid-area 1 / 1     PRESENT
  SFC shimmer rule           PRESENT
  token cascade --primary    PRESENT   ← cascade still present
  glass tier .glass-resting  PRESENT
```

The single `/styles` import now carries the token cascade AND the SFC scoped component CSS. The second
`@import "@mkbabb/glass-ui/styles.css"` line retires.

## Consumer head — before / after

```css
/* BEFORE — two imports needed */
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";       /* token cascade */
@import "@mkbabb/glass-ui/styles.css";   /* SFC scoped CSS — the bridge */
@import "@mkbabb/glass-ui/styles/fonts";

/* AFTER — one import carries cascade + SFC scoped CSS */
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";       /* cascade + SFC scoped CSS */
@import "@mkbabb/glass-ui/styles/fonts";
```

## Gates

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0 (8 GB NODE_OPTIONS baseline; `dist/styles/index.css` carries the `@import "../glass-ui.css"` fold) |
| `npm run proof:theme` | exit 0 — every cascade rung present; static brittleness checks clean |
| `npm run profile:budget` | exit 0 — `dist/glass-ui.css` unchanged at 43_090 raw / 7_818 gzip (the fold lands in `dist/styles/index.css`, NOT `glass-ui.css`, so the enforced budget is untouched) |

## Build-ordering note (orchestrator)

`profile:budget` runs `iter-build` (`vite.iter.config.ts`), which does NOT run `publishStyleAssets`
and wipes `dist/styles/`. The canonical `npm run build` must be the LAST build before any `/styles`
probe or publish — it is the only build that emits `dist/styles/` with the fold. The W7 dist-rebuild
must therefore end on `npm run build`, not `iter-build`/`profile:budget`.

## Files

- `vite.config.ts` — `publishStyleAssets` fold step (modify).
- `src/styles/index.css` — header comment updated for the single-import shape (modify).
