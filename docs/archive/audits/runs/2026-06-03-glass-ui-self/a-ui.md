# Style Audit — Slice A: `src/components/ui/` (41 shadcn-vue packages + `_shared`)

Run: 2026-06-03 · self-audit (bidirectional) · READ-ONLY

## Preamble

The slice is **strongly token-disciplined**. The scans that usually surface the
loudest drift came back clean: **zero** `:deep()` against reka internals, **zero**
`transition: all`, **zero** hand-rolled `cubic-bezier()` strings, **zero** raw
`#hex`/`rgba()` in templates, **zero** raw Tailwind palette colors in `.vue`
templates except one Toast site. Focus rings are near-uniformly the canonical
`focus-ring` class (12 files) with a single raw shadcn ring left (TagsInputItem).
Overlay primitives (Dialog/Popover/Dropdown/HoverCard/Tooltip) compose the canon
`glass-floating` tier + `z-{popover,hovercard,tooltip,modal}` +
`popover-animate slide-in-from-side` consistently. The `<style scoped>` blocks
that exist (Progress, Slider, Skeleton, CardHeader) are exemplary — every paint
is a `var(--token)` or a `color-mix(in srgb, var(--foreground|--shadow-color) N%,
transparent)`, and three of four carry a `prefers-reduced-motion` bracket.

Residual drift clusters in two spots: the **Toast/Notification surfaces** (raw
`text-red-*`, raw `hover:bg-white/10`, hand-rolled slide motion with no PRM
bracket) and the **`DialogScrollContent` tier-collapse** (it hand-rolls
`bg-background + [box-shadow:var(--glass-shadow-floating)]` where its sibling
`DialogContent` composes `glass-floating`). The headline structural finding is a
**GLASS-UI GAP**: four overlay close-buttons hand-roll four divergent variants of
the same `focus-ring absolute {corner} rounded-* transition-* hover:…` dismiss
affordance — no canonical primitive exists.

Note on `@lucide/vue`: 26 slice sites import `@lucide/vue`, which **matches
`package.json` peer deps** (`@lucide/vue ^1.16.0`, lines 605/622). CLAUDE.md still
names `lucide-vue-next` — that is **stale doc, not slice drift**; the code is
correct. Not counted as drift.

---

## Drift by axis

### Axis 1 — Token alignment

| # | Site(s) | Drift | Canonical (verified) |
|---|---------|-------|----------------------|
| 1.1 | `toast/ToastClose.vue:24` | Raw palette `group-[.destructive]:text-red-300` + `group-[.destructive]:hover:text-red-50` for the destructive-toast close glyph. Its **sibling** `toast/ToastAction.vue:23` uses `text-destructive-foreground` / `bg-destructive` correctly for the same destructive group — proving the token path. | `text-destructive-foreground` / `text-destructive-foreground/80` (tokens.css §6 `--destructive-foreground`) |
| 1.2 | `notification/Notification.vue:25` | `hover:bg-white/10` bakes a light-mode literal that does not unwind in dark mode (the surface is `glass-wash`, so the wash already carries the tier tint). | The house recipe `hover:bg-foreground/8` (cf. `buttonVariants.ghost`, button/index.ts:28) or `color-mix(in srgb, var(--foreground) …)` |
| 1.3 | `dialog/DialogScrollContent.vue:41` | `[box-shadow:var(--glass-shadow-floating)]` arbitrary-property injection instead of composing the `.glass-floating` tier class (which paints exactly that shadow — confirmed glass.css:56). Sibling `DialogContent.vue:78` composes `glass-floating`; the scroll variant re-wires the shadow by hand. | `glass-floating` (glass.css:56) — see also 4.1 |

`ai` button variant (`button/index.ts:33`, `bg-amber-500/15 … dark:text-amber-400`)
uses raw amber but ships a **complete light+dark pair** and is a deliberate brand
accent with no semantic token defined — flagged in GLASS-UI GAPS, not as drift.

### Axis 2 — Utility / `@apply` hygiene

| # | Site(s) | Drift | Canonical (verified) |
|---|---------|-------|----------------------|
| 2.1 | `notification/Notification.vue:23-28` | Bare `<button class="rounded-button p-1 transition-colors hover:bg-white/10">` reinvents the four-state interactive affordance ad hoc. | `.interactive-item` (utilities.css:156) or the close-button primitive proposed in GLASS-UI GAPS |

### Axis 3 — Interactive consistency

| # | Site(s) | Drift | Canonical (verified) |
|---|---------|-------|----------------------|
| 3.1 | `accordion/AccordionTrigger.vue:34`, `dialog/DialogScrollContent.vue:41`, `select/SelectTrigger.vue:42` | Hardcoded `duration-200` (3 sites) instead of the token form. `--duration-fast: 0.2s` (tokens.css:72) == 200ms exactly. The **correct pattern is proven in-slice**: `tabs/TabsTrigger.vue:22` + `tabs/TabsIndicator.vue:18` use `duration-[var(--duration-fast)]` / `duration-[var(--duration-normal)]`. | `duration-[var(--duration-fast)]` |
| 3.2 | `tags-input/TagsInputItem.vue` | Only raw shadcn `ring-2 / ring-ring / ring-offset` focus pattern left in the slice (all 167 other `.vue` use the `focus-ring` class). | `focus-ring` (utilities.css:140) |

### Axis 4 — Variant orthogonality + rooting

| # | Site(s) | Drift | Canonical (verified) |
|---|---------|-------|----------------------|
| 4.1 | `dialog/DialogScrollContent.vue:41` | **Tier collapse.** Composes `bg-background border border-border [box-shadow:var(--glass-shadow-floating)]` — a hand-assembled floating surface. Its sibling `DialogContent.vue:75-78` exposes a `variant: 'glass' | 'opaque'` axis (`glass-floating rounded-dialog` vs `bg-background border`). The scroll variant has **no such axis** and is frozen to a one-off glass-ish blend that matches neither branch. | Compose `glass-floating` (glass.css:56); ideally lift the `variant` axis from `DialogContent` so scroll + centered dialogs share the tier×shape matrix |

### Axis 5 — Overlay + motion vocab

| # | Site(s) | Drift | Canonical (verified) |
|---|---------|-------|----------------------|
| 5.1 | `notification/Notification.vue:73-92` | Hand-rolled `translateX(100%)` enter/leave/move transition block — **spatial motion with no `prefers-reduced-motion` bracket** (only such omission in the slice's style blocks). The audit canon prescribes Toast→`pop`; no canonical toast/notification slide transition exists in transitions.css (families: dialog-scale, dropdown, fade, fade-slide, metric-swap, pane-swap, pop, tab-fade). | `.pop` (transitions.css:62) for the toast register, OR a new `.slide-in-right` family — see GLASS-UI GAPS. Either way it MUST be PRM-bracketed |

`slider/Slider.vue:207` `transform: scale(var(--scale-press-btn))` is a **press
micro-interaction** (not spatial translate) and is exempted from the spatial-PRM
rule; it already reads the canon `--scale-press-btn` token. No action.

### Axis 6 — Typographic / structural

Clean. **Zero** ad-hoc `text-{xl..5xl}` heading sizes in the slice; headings flow
through reka slots + `data-slot` hooks. `card/CardHeader.vue:119-123` animates
`font-size` between `--type-heading` → `--type-prose` semantic ramp tokens — exemplary.

### Axis 7 — A11y resilience

Clean within scope. No glass surface is **re**implemented in the slice (the
`glass-*` tier classes are imported, not redefined), so the
`prefers-reduced-transparency` / `@supports not (backdrop-filter)` fallback
obligation sits on the canon glass.css, not here. No `color-mix` in the slice
bakes a light-mode fg into a dark-unwindable value **except** the `hover:bg-white/10`
already logged at 1.2.

---

## GLASS-UI GAPS (slice needs → propose to library)

| # | Gap | Sites (count) | Proposed placement |
|---|-----|---------------|--------------------|
| G1 | **Overlay close-button primitive.** 4 sites hand-roll the same dismiss affordance and **diverge in every detail**: `dialog/DialogContent.vue:127` (`rounded-sm`, `transition-opacity`, `data-[state=open]:bg-accent`), `sheet/SheetContent.vue:119` (`rounded-sm`, `transition-opacity`, `data-[state=open]:bg-secondary`), `dialog/DialogScrollContent.vue:57` (`rounded-pill`, `transition-colors`, `hover:bg-secondary`), `toast/ToastClose.vue:24` (`rounded-button`, `transition-opacity`, raw `text-red-*`). All share `focus-ring absolute {corner} + <X/> + sr-only`. (4) | A `_shared/OverlayCloseButton.vue` (joins `_shared/ModalOverlay.vue`, `_shared/menuItemVariants.ts`) OR a `.overlay-dismiss` utility in utilities.css. Locks one rounded value, one transition channel, one token-driven destructive treatment. |
| G2 | **Toast/notification slide transition.** `notification/Notification.vue:73` hand-rolls `translateX(100%)` enter/leave because no edge-slide family exists in transitions.css. | Add `.slide-in-right` (or `.toast-slide`) family to transitions.css alongside `pop`/`fade-slide`, PRM-bracketed; Notification + any future toast stack consume it. |
| G3 | **Amber/`ai` accent token.** `button/index.ts:33` hardcodes the amber AI-accent (`bg-amber-500/15 … dark:text-amber-400`) inline; no `--ai-*` / amber semantic token exists, so any other AI-affordance must re-hardcode the same scale. | If a 2nd AI-tinted surface ever lands, promote to `--ai-bg` / `--ai-foreground` token pair (tokens.css §6 colors). Currently 1 site — log only, do not extract yet (overfitting guard). |

## UNION CANDIDATES

| # | Pattern | Both forms | Proposed canonical |
|---|---------|-----------|--------------------|
| U1 | Floating dialog surface | `DialogContent` composes `glass-floating` with a `variant: glass\|opaque` axis (DialogContent.vue:75) · `DialogScrollContent` hand-rolls a frozen glass-ish blend (DialogScrollContent.vue:41) | Lift the `variant` axis up to a shared dialog-content base so centered + scroll dialogs draw from one tier×shape matrix. Resolves 1.3 + 4.1 + G1 together. |
| U2 | Token-form animation duration | `tabs/Tabs*` use `duration-[var(--duration-fast\|normal)]` · Accordion/Select/DialogScroll use bare `duration-200` | Canonicalize on the `duration-[var(--duration-*)]` token form everywhere; resolves 3.1. |

---

## Tally

**Drift: 8** (1.1, 1.2, 1.3, 2.1, 3.1[×3 sites→1 row], 3.2, 4.1, 5.1) · **GLASS-UI GAPS: 3** (G1 close-button primitive = top gap) · **UNION CANDIDATES: 2** · Slice verdict: strongly token-disciplined; drift concentrated in Toast/Notification + DialogScrollContent.
