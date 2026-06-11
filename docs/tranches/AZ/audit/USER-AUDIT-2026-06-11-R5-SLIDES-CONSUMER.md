# USER-AUDIT 2026-06-11 — ROUND 5 (the SLIDES-CONSUMER root findings, BINDING)

Banked by the slides-M session (the til-briefing overnight ship). The user's standing directive
applies: **"all core changes should be made at the ROOT — and these should be glass-ui items.
NO quick solutions, NO workarounds: idiomatic, gestalt approaches."** The slides deck ships
2026-06-11 with ANNOTATED deck-side arms for each item below; every arm RETIRES on the bump to
the glass-ui release that lands the root fix (the no-backwards-compat clean break). Each entry
carries the consumer-verified diagnosis — implementation-ready.

## R5 defect ledger

| id | surface | diagnosis (consumer-verified on slides, glass-ui 3.9.0→3.11.2 probe) | the root fix |
|---|---|---|---|
| R5-1 | `--dock-mobile-scale` is DEAD (still in 3.11.2) | `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1))` is declared at `:root`, but the coarse arm (`overflow.css` `@media (pointer:coarse) .glass-dock[data-density]`) sets `--dock-local-scale` LOWER in the tree. Custom-property substitution resolved `--dock-scale` at `:root` with `--dock-local-scale`=1, so the documented consumer knob never reaches the geometry cascade — the AX.W55 substitution-vs-inheritance trap, again. | RE-DECLARE `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1))` INSIDE the coarse `.glass-dock[data-density]` block (beside the `--dock-local-scale` lift). Slides' interim arm: re-declares `--dock-scale` on `.deck-dock`. |
| R5-2 | the coarse dock default is too BIG | The user: "the dock is like 25-20% too big on mobile." The coarse `--ui-coarse-scale: 1.5` paints a 74px-tall collapsed pill on a phone. Slides ships `--dock-mobile-scale: 0.78` (works only with R5-1's re-declare) → collapsed 60×60.8px, touch floor held by the `max(…, --dock-control-floor)` clamp. | A tighter coarse-register default at the dock layer (NOT the global `--ui-scale`): `--dock-mobile-scale` defaulting ≈0.78–0.8, or an explicit compact coarse register. |
| R5-3 | the collapsed-tap pass-through + the hover-expand MORPH-RACE | Two manifestations, both reproduced with real input on the deck: (a) TOUCH — GlassDock's collapsed-tap "expand + pass the compat-click through" re-dispatches at COORDINATES; the layer swap puts a different control under the finger (the deck's Home link → navigate-away). (b) FINE POINTER — approach-then-click during the hover-expand FLIP lands the click on the EXPANDED layer's control at the old coordinates (the deck's gear click ADVANCED THE SLIDE; the gear's own popover never opened — the user read it as "Download PowerPoint is broken"). | Architectural: scope the pass-through to the TAPPED ELEMENT'S IDENTITY (the element at pointerdown), never post-swap coordinates; and give GlassDock an INTERNAL morph-settle window (clicks during the expand FLIP resolve against the pre-morph target or defer until settle). The consumer must never need a guard. Slides' interim arms: `@touchend.prevent` + an explicit `expand()`, plus a 320ms capture-phase click guard keyed off the exposed `expanded` ref — both annotated to retire. |
| R5-4 | popover/dropdown content padding | "At the glass-ui root, this needs more padding in the popover &c." The DropdownMenuContent/floating-panel default reads tight. Slides' interim arm: `.deck-settings { padding: 0.85rem 0.95rem; gap: 0.55rem }`. | Lift the panel padding rung at the root (the floating-panel/menu-content recipe), token-first. |
| R5-5 | the Vue scoped `:global()` DROP trap (recurred 3×) | `:global(.dark) .x` inside `<style scoped>` is DROPPED from the emitted CSS entirely (CSSOM-verified). It broke the slides dark homepage IN PRODUCTION (the dark arm never existed; light gradients painted over ink) and previously ate `body.export-mode` arms. The working idiom: the plain ancestor form (`.dark .x`), which compiles to `.dark .x[data-v-…]`. | Audit glass-ui demo + all consumers for `:global(` in scoped blocks; codify the plain-ancestor idiom in the precepts (this is a recurring footgun, not a one-off). |
| R5-6 | constellation generalization | Slides now consumes `@mkbabb/glass-ui/constellation` (seedField/readPalette/BASE_WIDTH byte-identical; warpTo/warpStep compose cleanly for click-to-pivot). Gaps kept deck-local: a PINNED node excluded from stepField drift; an accent anomaly-EDGE skin on drawEdges; edgeFloor + anomaly-alpha on ConstellationPalette; label text in the overlay seam; an autonomous slow drift distinct from click-warp; warp auto-release + an isSettled signal. | The six-item generalization list (full detail in the session memory note `glassui-dock-feedback-2026-06-10` §7). |

## Constraints

- The slides repo (main) annotates each interim arm with a retire-on-bump note; the bump +
  retirement is a slides follow-up the moment a release carries R5-1..R5-4.
- R5-3's verification recipe (real-input replay: approach-click during morph must not change
  the hash; the settled click must open the gear menu; the submenu must open beside its
  trigger) lives in the slides M tranche record, `docs/tranches/M/audit/visual/W-R10-DELTA.md`.
