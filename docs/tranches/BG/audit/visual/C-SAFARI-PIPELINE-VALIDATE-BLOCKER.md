# C-SAFARI capture-pipeline validation — BLOCKED at demo build (record, not fix)

**Validator:** CAPTURE-PIPELINE VALIDATOR (C-SAFARI keystone). **Date:** 2026-07-02. **Branch:** tranche/BG @ cc80418a.
**Verdict:** the dual-engine capture pipeline CANNOT be proven end-to-end yet — the canonical `:5200` built-bytes
path fails to build. Both engines (Chrome CDP + off-screen WKWebView) are blocked by the SAME root cause.

## The blocker (the EXACT failure)

`npm run demo:dist:build` fails deterministically:

```
[plugin @tailwindcss/vite:generate:build] demo/layout/AppShell.vue?vue&type=style&index=0&scoped=d7c4a2b9&lang.css
CssSyntaxError: Missing closing } at
  .demo-sidebar-rail[data-shell-dock-orientation="horizontal"] :deep(.demo-sidebar-dock)
✗ Build failed in ~0.8s
```

**Location:** `demo/layout/AppShell.vue`, the scoped `<style>` block, rule opened at **line 482**:

```css
482  .demo-sidebar-rail[data-shell-dock-orientation="horizontal"] :deep(.demo-sidebar-dock) {
483      flex-direction: row;
484      align-items: center;
485  /* <main> reserves a top gutter ... */        ← rule NEVER closed; comment + next rule begin here
488  .demo-main-scroller[data-shell-dock-orientation="horizontal"] {
```

The rule opened at 482 is **missing its closing `}`** after `align-items: center;` (line 484). The `:deep(...)`
selector body runs straight into the next comment + rule, so the whole `<style>` block is malformed and the
production CSS parse aborts. (Dev tolerance is irrelevant — the canonical protocol path is `:5200` BUILT bytes;
`:5199` dev bare-shells WebKit by design.)

**Committed, not local.** `git status` clean on this file; `git blame` line 482/485 → commit **`3fefe43c`**
(`BG WS2 · BG.W-DOCK-INPLACE-MORPH`) — the very wave whose route this validator was asked to capture. The wave
landed device-free-GREEN (`proof:dock-morph-insitu` M1–M5) but its `AppShell.vue` scoped-CSS edit broke the demo
build. This is the C-SAFARI keystone catching a paint-blocking regression BEFORE any capture fan-out — the
intended function of the pre-fan-out validation.

**Fix (for the build-fix-agent — NOT this validator's job, per the record-don't-fix fence):** insert the missing
`}` after `align-items: center;` (line 484) to close the `:deep(.demo-sidebar-dock)` rule before line 485's comment.
One character. Then re-run `npm run demo:dist:build` and re-dispatch this pipeline validation.

## What IS proven (the harness mechanism is sound; only the build blocks)

- **WKWebView harness compiles clean.** `clang -framework Cocoa -framework WebKit -fobjc-arc
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live` → exit 0, 57 KB binary. Polls
  `document.documentElement[data-capture-ready]` before `takeSnapshotWithConfiguration` (1440-wide, retina 2×).
- **Engine badge module sound.** `demo/capture/engine-badge.ts` paints an in-pixel provenance panel (ENGINE /
  GPU `GL_RENDERER` / VIEW `W×H@dpr` / MODE) with a magenta `#ff00ff` 2px locator border — the SOLE provenance
  channel, decoded from pixels. `detectEngine` discriminates CHROME (before Safari) · SAFARI (has `Version/`) ·
  WEBKIT (bare WKWebView, no `Version/`).
- **`?capture=` boot wired.** `demo/main.ts` sets `data-capture` + color scheme BEFORE mount, loads
  `capture/capture.css`, navigates the route, warms GL, paints the badge, then flips `data-capture-ready`.
- **Harness commit `d4ae4577` present** (ancestor of HEAD) — the C18 instrument is on disk; the ONLY gap is the
  demo build.

## The working method (exact commands — to run AFTER the AppShell `}` fix)

```bash
# 1 · build + serve the BUILT bytes on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build && npm run demo:dist:serve   # vite preview --port 5200

# 2 · Safari / WebKit leg (system WebKit.framework/Metal, off-screen, NO Screen-Recording TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=light" \
  docs/tranches/BG/audit/reflect/dock-inplace-morph-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/dock/overview&mode=dark" \
  docs/tranches/BG/audit/reflect/dock-inplace-morph-safari-dark-desktop-full.png  dark  15000

# 3 · Chrome leg — real Chrome.app + CDP (real Metal GPU), per mode:
#     launch Chrome.app --remote-debugging-port, connectOverCDP,
#     navigate http://localhost:5200/?capture=/dock/overview&mode=<m>,
#     poll document.documentElement.hasAttribute('data-capture-ready'), page.screenshot
#     → badge reads ENGINE CHROME / GPU ANGLE Metal Apple M5 Max (proves real GPU, not SwiftShader).
```

Route note: `BG.W-DOCK-INPLACE-MORPH` is the IN-SITU shell dock morph (the real `<aside>` nav dock flipped
V↔H in place) — visible on any route inside the demo shell; `/dock/overview` is the canonical capture route.
