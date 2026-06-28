# Reusable cleanup prompts

Three reusable agent-dispatch prompts, each a drop-in *Scope + Non-negotiables* payload for `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`. They compose with the template and the binding edicts — they do not replace them.

| Prompt | For |
|---|---|
| **[LEGACY-EXCISION](./LEGACY-EXCISION.md)** | find + excise legacy/deprecated/workaround/fallback paths; collapse dual-paths; convert silent degradation in library-owned logic to explicit failure; the befitting-vs-illegitimate fallback test |
| **[RESTRUCTURE-BACKEND](./RESTRUCTURE-BACKEND.md)** | logical grouping + colocation for non-component code; god-module carves; service/DI boundaries; pipeline orchestration; generated-not-hand-maintained registries; export-surface reshape |
| **[RESTRUCTURE-FRONTEND](./RESTRUCTURE-FRONTEND.md)** | feature-dir colocation; `useX` state encapsulation; the 4 CSS focus areas (non-idiomatic tailwind / monolithic-global / deprecated CSS / fragile rules); brittle-selector + reactivity audit; isomorphic style changes; design cohesion |

They cite the live anti-pattern catalog by name (god-modules, `:deep()`→`:slotted`, the `:global(.dark)` scoped-CSS drop, fail-explicit-vs-befitting, version straddles, nested imports, monolithic global stylesheets) using this repo as the example-source — the named examples teach the smell; a sibling repo reads them as the shape to recognize.

## Promotion path

These are **staged repo-local** here. Per the BH framing decision (repo-local draft + cross-repo ask), BH band **B6** issues a by-name ask to `mkbabb/precepts` to promote them into `docs/precepts/instructions/prompts/` (the shared reusable-prompt home, beside `audits/overfitting-audit.md` and `tranche/AGENT_DISPATCH_TEMPLATE.md`), with a one-line pointer added from the precepts `instructions/README.md`. The foreign-tree fence is literal — BH does not mutate the submodule in place. Once promoted, every constellation repo (slides / speedtest / keyframes) inherits them as shared cleanup tooling.
