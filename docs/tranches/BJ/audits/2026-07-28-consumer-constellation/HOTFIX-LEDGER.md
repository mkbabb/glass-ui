# Audit hotfix ledger

**Observed:** 2026-07-28  
**Rule:** unblock observation at the narrowest truthful owner; never convert a
temporary audit boundary into a compatibility fallback.

| Target | Blocker | Hotfix used or required | Persistence | Audit state |
| --- | --- | --- | --- | --- |
| Keyframes working mirror | All seven routes blanked because Tooltip had no application-root provider | The active value audit wrapped `demo/app/App.vue` in Glass `TooltipProvider` | Landed by its owner as `8281638c`; no Glass source edit | Visual audit unblocked |
| Keyframes canonical `keyframes-v-exec` | Declared Glass 7 dependency absent from install | `npm install --ignore-scripts --no-audit --no-fund` | Install-only; no tracked change | Seven routes clean at both viewports |
| Slides K | `node_modules` absent; Vite could not start | `npm install --ignore-scripts --no-audit --no-fund` | Install-only; no tracked change | Thirteen pages clean at both viewports |
| SCI | Stale dev process served broken `useAtlasSite`/Pinia state | Start a fresh SCI dev server | Process-only; no source patch | Thirteen routes restored |
| value.js | Web-only process lacks working palette API | Owner runs repository `npm run dev` full orchestration | Required before functional sign-off; do not edit value.js from Glass | Visual only |
| Fourier | Web process receives API 502 on workspace/gallery | Start the repository-documented complete API + web stack | Required before functional sign-off | Visual only |
| Muster | `/api/sessions` returns 502 | Use root full dev orchestration | Required before session-flow sign-off | Visual only |
| Words | Backend requests return 502 | Use root full-stack dev command | Required before CRUD sign-off | Visual only |

## Not hotfixed

- Keyframes working mirror still throws `AnimationOptionError` from the custom
  timing-function `serializeEasing` path. Repair the timing contract at its
  producer, then add a route-level execution proof; do not catch-and-default.
- Both Keyframes lines need DialogContent Description/`aria-describedby`
  closure; the canonical Vite relay repeated that accessibility warning.
- BBNF's eight mobile overflow routes require source corrections. The leaked
  tranche route must be deleted from the product route registry, not hidden.
- Active SCI `/bead` needs a visible title owner. Active `/sci` renders a zero
  summary and a failed figure, so it needs data/registry/render proof before
  its local mobile occupancy re-proof.
- Pinned legacy `/sci` contains three failed figure slots on desktop and four
  on mobile; the 404 also lacks an H1. Repair the data/registry owner and
  semantic headings, not the failure presentation.
- SCI must stop JavaScript-importing card JSON from `public/`; either consume
  it by public URL or move real module data under `src/`.
- Atlas's universal reduced-motion transition clamp must be removed through
  `W-MOTION-CORE`/`W-REPROOF`; a second clamp is forbidden.
- value Admin's forced `My Palettes` pane and local shadcn forwarders require
  the value megatranche owner, not a Glass-side workaround.
- Muster must attach `data-test` to a concrete Dialog element instead of
  forwarding it through a Teleport fragment; Speedtest must isolate its
  undelivered ResizeObserver loop.

## Resume law

A hotfix may restore a missing provider, install declared dependencies, or
restart a stale process. It may not introduce an alias, shim, dual path,
mock-data fallback, swallowed error, or silent downgrade. Every still-open
functional boundary remains red until the complete owning stack is exercised.
