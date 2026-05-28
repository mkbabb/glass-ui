# AN.W2 — Tailwind template-utility emission (decision: OPTION B)

Closes F.W10 §Scope item 1b, AN §6 gap 2. glass-ui's component templates emit utility classes
(`h-full`, `w-full`, `shrink-0`, CVA variant classes like `text-destructive-foreground`, …) that a
consumer's Tailwind v4 build does NOT generate unless its content-scan reaches glass-ui's compiled
output.

## Decision

**OPTION B — document the `@source` requirement as a binding contract in CLAUDE.md §Consumer wiring,
with the same authority as `tw-animate-css`.**

Option A (ship the utilities pre-generated in the dist so the consumer needs no `@source` glob) was
investigated and rejected on payload + pipeline-fragility grounds; rationale below.

## Why the gap exists

The library's component class strings (`h-full`, `w-full`, …) live in the compiled `dist/*.js` chunks —
Vue render functions embed template classes as JS string literals:

```
dist/Progress-*.js : "h-full w-full flex-1 rounded-pill bg-primary transition-transform"
dist/DataTable-*.js: "flex h-full w-full flex-col overflow-hidden rounded-panel bg-popover …"
```

The dist ships NO `.vue` templates and NO `dist/components/` dir — so the `@source "../components"`
directive baked into the dist `/styles` bundle resolves to nothing in a published artefact. The class
strings are reachable ONLY by globbing the `dist/*.js` chunks. A consumer's Tailwind, scanning only its
OWN `src/`, never sees them — the utilities silently render absent.

## Before / after probe

A consumer-shaped Tailwind v4 compile with `@import "tailwindcss" source(none)` (auto source-detection
OFF, so ONLY explicit `@source` directives count) + `tw-animate-css` + dark variant + the dist `/styles`
bundle. The consumer scans its own `src/` (one `App.vue` using `text-blue-500 p-8`); the AFTER run adds
`@source "<dist>"`.

```
BEFORE — @source = consumer src only:
  total CSS bytes 188641
  h-full                       MISSING   ← template utility, not in consumer's scan
  w-full                       MISSING
  shrink-0                     MISSING
  text-destructive-foreground  MISSING   ← CVA variant class
  text-blue-500                PRESENT   (consumer's own class)
  p-8                          PRESENT

AFTER — @source += "<glass-ui>/dist":
  total CSS bytes 267599
  h-full                       PRESENT   ← @source dist glob over dist/*.js generates it
  w-full                       PRESENT
  shrink-0                     PRESENT
  text-destructive-foreground  PRESENT
  text-blue-500                PRESENT
  p-8                          PRESENT
```

(`flex-col` / `rounded-pill` / `text-muted-foreground` register PRESENT in BOTH runs — those literal
class tokens appear inside the folded SFC `glass-ui.css` text itself, so Tailwind's scan of the
`@import`ed stylesheet content picks them up regardless. The decisive deltas are the pure layout/CVA
utilities — `h-full`, `w-full`, `shrink-0`, `text-destructive-foreground` — that exist ONLY in the
compiled JS render functions.)

The `@source` glob closes the gap. The delta is ~79 KB raw, generated in the CONSUMER's own pipeline
(deduped against the consumer's own usage).

## Why Option A was rejected

Option A would have glass-ui pre-generate those utilities and ship them inside the `/styles` bundle.
Two disqualifying findings:

1. **Payload.** Extracting just the `@layer utilities` from a full consumer-shaped compile (the only way
   to resolve the custom-theme utilities — `rounded-pill`, `text-muted-foreground`, `bg-popover`, the CVA
   variant classes — which require glass-ui's `@theme`) yields **184_249 raw / 22_333 gzip**. That is
   ~2.9× the entire enforced `dist/glass-ui.css` budget (8_650 gzip) shipped into every consumer's
   critical first-paint CSS, the bulk of it DUPLICATED against utilities the consumer's own Tailwind scan
   already emits (`flex`, `text-sm`, `items-center` are not glass-ui-exclusive).

2. **Pipeline fragility.** Resolving the custom-theme utilities standalone requires replicating the
   consumer's full Tailwind theme context. A `theme(reference)` import of `src/styles/theme.css` throws
   `Cannot use @variant with unknown variant: dark` — the library's `@variant dark` declaration only
   resolves inside the consumer's complete setup. The workable path (full `@import "tailwindcss"` compile
   + post-hoc `@layer utilities` extraction) is a brittle build-time Tailwind-pipeline step that
   re-derives the consumer's environment and breaks across Tailwind minor versions. This is exactly the
   "deep Tailwind-pipeline change → flip to Option B" trigger the W2 spec names (§Triumvirate dispatch
   conditions, scope-reveal).

Option B is the idiomatic Tailwind v4 pattern for a component library distributing compiled templates:
the `@source` directive is purpose-built for "scan this dependency's output for class names." Zero
payload, deduped in the consumer's pipeline, with a direct precedent peer — `tw-animate-css` — already
in CLAUDE.md §Consumer wiring.

## The binding contract (proposed CLAUDE.md §Consumer wiring paragraph)

To be applied by the orchestrator (3 AN agents run concurrently; CLAUDE.md edits serialise). Mirrors the
`tw-animate-css` paragraph shape (WHAT / WHY / HOW):

> **glass-ui's component templates emit Tailwind utility classes that the consumer's content-scan must
> reach.** The library's compiled templates (`dist/*.js` render functions) reference layout utilities
> (`h-full`, `w-full`, `shrink-0`, `flex-col`, …) and CVA variant classes (`text-destructive-foreground`,
> `rounded-pill`, …) as plain class strings. Tailwind v4 only generates a utility it FINDS during content
> scanning, and a consumer scanning only its own `src/` never sees glass-ui's. Add an `@source` directive
> pointing at the installed dist so Tailwind's scanner reaches the compiled templates:
>
> ```css
> @import "tailwindcss";
> @import "tw-animate-css";
> @import "@mkbabb/glass-ui/styles";
> @source "../node_modules/@mkbabb/glass-ui/dist";   /* template-utility content-scan */
> ```
>
> The path is relative to the CSS file the directive sits in (adjust the `../` depth to your project
> layout). Without it, glass-ui's components render with their layout/variant utilities silently absent —
> the same failure class as a missing `tw-animate-css`. This is a binding requirement for any consumer
> mounting glass-ui components (not just the `/styles` cascade); it composes with — does not replace — the
> `tw-animate-css` import.

## Gates

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0 |
| `npm run profile:budget` | exit 0 — Option B ships ZERO new payload; `dist/glass-ui.css` unchanged at 43_090 raw / 7_818 gzip (within 48_000 / 8_650 budget) |

## Files

- No source/build change (Option B is documentation). The CLAUDE.md §Consumer wiring paragraph above is
  handed to the orchestrator for serial application.
