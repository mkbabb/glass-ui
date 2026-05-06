# Playwright MCP + Chrome MCP Deep Audit

**Date**: 2026-05-05.
**Trigger**: user request — "deeply audit our storybook and various other items with playwright thereupon."
**Tooling**: Chrome MCP (claude-in-chrome browser extension; verified live via real Chrome on M5 Max GPU) + project-local Playwright (`npm run dev` + headless smoke walk).

## Plumbing fixed before audit

1. **Playwright MCP (`@playwright/mcp@latest`) was failing to start** — the npx-cached install at `~/.npm/_npx/9833c18b2d85bc59/` was corrupt (`playwright-core/lib/utilsBundle.js` missing). Cleared the cache, re-resolved cleanly to v0.0.73.
2. **Installed `@playwright/mcp` as project devDep** so the project carries the MCP server independently of the user-level plugin cache.
3. **Authored `.mcp.json`** at repo root naming the project-local Playwright MCP server (`PWMCP_HEADLESS=true`). Future sessions pick it up via `/reload-plugins` without depending on global state.
4. **Chrome MCP extension connection** — verified the Claude browser extension reports a live tab group; the previous session's "extension is not connected" error is resolved.

## Audit shape

Three parallel methods:

- **Direct Playwright headless smoke**: `node scripts/audit/playwright-deep-audit.mjs` walks all 99 storybook routes against `localhost:5173`, captures per-route console errors + screenshots + feature-exercise probes (slider-glass-track + dock keep-open + blob-stress).
- **Chrome MCP deep visual**: navigate live Chrome to key H-shipped routes; screenshot + DOM probe + console-error read. The chrome browser is the user's actual install (Apple M5 Max GPU per WEBGL_debug_renderer_info).
- **Cross-correlation**: any finding present in one method but missing in the other surfaces a real-vs-synthetic-environment delta.

## Smoke walk result (Playwright headless)

`docs/tranches/H/audit/playwright-deep-audit.md`: **99/99 routes PASS**, 0 console errors, elapsed 107.2s. Per-story screenshots under `docs/tranches/H/audit/screens/` (gitignored *.png).

## Deep visual audit (Chrome MCP)

| Route | Result | Note |
|---|---|---|
| `/foundations/intro` | PASS | dark-mode hero, Fraunces "Glass, paper, and the golden ratio." |
| `/foundations/cream` | PASS | "Warm cream" display-mega; cream identity rendered |
| `/foundations/typography` | PASS | "Fraunces, Aa." display-mega WONK/SOFT axes |
| `/foundations/flourishes` | PASS | rainbow tokens + 8 H.W6-restored utilities (shimmer-blue/-vivid/-pastel + bg-rainbow-pastel + text-rainbow-pastel + flourish-stripe-rainbow/-pastel/-gold) all render via `<style scoped>` block; "Aurum / Boreal / Carnival / Daydream" shimmer-text gradients work |
| `/foundations/icons` | PASS | "Big as type." + decorative icon-mega |
| `/primitives/cartoon-controls` | PASS | "Modern skeuo, no bevels." display-mega |
| `/primitives/color-pill` | PASS | "Two encodings, one body." display-mega; Badge variant=color (5 CVA-direct sites — confirmed alive at HEAD per H.W1.C scope-reveal absorb) |
| `/primitives/slider-glass-track` | PASS | hero "A quiet rail." + 3 shape variants (default 4px / accent-tinted section-5 fill / narrow 2px gold-range) + dock-keep-open round-trip composition with 3 DockLayer children + 3 sliders carrying `:keep-dock-open` |
| `/primitives/blob` | **FAIL → FIXED** | see "Critical finding" below |
| `/_internal/blob-stress` | PASS | 8 blob canvases render with chromatic-aberration glow; 0 lost contexts; threshold panel shows IDLE/0 frames pre-profile |
| `/motion/timeline` | PASS | ruler + diamond markers + circle markers + playhead; the W1 transport→glass refactor's button still renders correctly |
| `/containers/paper-card` | PASS | "Paper" display-blue; the H.W1.E paper-tier-token inlining (12 retired `--paper-bg/-shadow/-border-{1..4}` tokens with literal HSL values inlined into `.paper-N` rules) renders as expected |
| `/compositions/audacious-hero` | PASS | "Glass UI" mega + IconStamp + Fraunces prose — the bold-maximalist commitment per G.audit-δ criterion |

## Critical finding — Blob context-cap exhaustion (RESOLVED)

`/primitives/blob` mounts **34 `<Blob>` instances** (1 hero + 5 mood + 15 spectrum + 1 playground + 9 nine-blob + 3 a11y + 4 watercolor + small extras). Chrome enforces a per-page WebGL2 context cap of ~16 active contexts; older contexts are forced into "lost" state when the cap is exceeded.

**Pre-fix probe** (Apple M5 Max via `WEBGL_debug_renderer_info`):

```js
{ totalCanvases: 34, contextLostCount: 18 }
```

**Visual symptom**: the spectrum + nine-blob sections render as empty white squares with a broken-canvas placeholder. The headless Playwright smoke walk did NOT flag this because (a) `--use-gl=swiftshader` allows higher context limits and (b) the audit checks for console errors / mount existence, not visual fidelity per canvas.

### Fix — `<Blob>` lazy-mount

Added IntersectionObserver-based lazy mount to `src/components/custom/blob/Blob.vue`:

- New props:
  - `lazy?: boolean` (default `true`) — gate WebGL2 context acquisition until the host element enters the viewport
  - `lazyMargin?: string` (default `"200px"`) — IntersectionObserver `rootMargin` so blobs warm shortly before they enter the viewport, hiding any first-frame pop
- Implementation: the `<canvas>` element is wrapped in `v-if="isMounted"`; `isMounted` flips once when the host's IntersectionObserver fires. After the flip, the observer disconnects (one-shot mount).
- Consumers wanting hero specimens always pre-warmed pass `:lazy="false"`.

**Post-fix probe** (same browser, same page):

```js
// Initial state
{ totalBlobsInDom: 34, canvasMounted: 1,  canvasContextLost: 0 }
// After scrolling halfway
{ totalBlobsInDom: 34, canvasMounted: 11, canvasContextLost: 0 }
```

11 active WebGL2 contexts (under the 16-cap) — all lazily mounted as the user scrolls. Total contexts never exceed the cap; no context loss; all blobs render correctly.

The pre-existing rAF-subscription gating in `useBlob` (which paused rAF when off-screen) was insufficient on its own because it kept the WebGL2 context bound. The new mount-gating adds the outer layer: don't even acquire the context until needed.

## Process precept (for future tranches)

The headless smoke walk passed 99/99 but missed a real visual bug. Surface this finding in `docs/precepts/instructions/LESSONS-LEARNED.md` as a future entry candidate:

> Headless software-WebGL has higher context limits than real-browser hardware-WebGL. Audits that only check console errors miss canvas-rendering regressions that are gated by browser-cap enforcement. The audit pattern should always include a real-browser pass (Chrome MCP extension) when the surface ships WebGL primitives.

## Verification

- `npm run typecheck` green at HEAD post-fix.
- `<Blob>`'s 9 existing consumer call sites (Blob.vue, Swatch.vue, blob.vue story, blob-stress.vue story, swatch demo + composition stories) continue to typecheck without changes — `lazy` defaults to `true` but pre-existing visible-on-mount instances render the same way (the IntersectionObserver fires synchronously when the host is already intersecting at mount).
- The slider-glass-track + dock keep-open round-trip composition (W3, H) is end-to-end verified by Chrome MCP; the canon `dockKeepOpenSink` provide/inject + `:keep-dock-open` prop wire the pointer-event acquire/release lifecycle correctly.

## Side outputs

- `scripts/audit/playwright-deep-audit.mjs` — broad-coverage headless smoke walker (99 routes, screenshots, feature exercises)
- `scripts/audit/probe-features.mjs` — focused feature-section re-runner
- `scripts/audit/probe-slider.mjs` — minimal slider DOM probe
- `docs/tranches/H/audit/playwright-deep-audit.md` — headless smoke result (99/99 PASS, feature exercises 6/6 PASS)
- `.mcp.json` (repo root) — project-level Playwright MCP server config

## Worktree cleanup (separate but contemporaneous)

41 stale worktrees removed (24 sibling `glass-ui-wt-*` from prior tranches + 17 locked `.claude/worktrees/agent-*`); 32 orphan branches deleted (`codex/d-*` + `worktree-agent-*`). Only the main worktree remains.
