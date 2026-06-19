# W-DESHADCN census — the per-component reska-skin / glass-material reskin verdict

> **BC.W-DESHADCN** · the de-shadcn STYLING-DNA invariant. The principle (DESHADCN-BRAINSTORM §0):
> **reka = BEHAVIOR, glass-ui = 100% of the MATERIAL.** No shadcn-neutral token survives in the
> visual layer. This census is the **anti-gameability floor**: every `src/components/ui/` component
> appears on **EXACTLY ONE** list below — `reskin-target` | `already-glass` | `allowlist-survivor` —
> so a future agent cannot smuggle a new un-reskinned shadcn surface into the surface unaudited
> (the `proof:dock-normalize` W5-closure precedent transposed onto the de-shadcn axis).
>
> The binding bar is the machine gate `proof:no-shadcn-default` (`scripts/proof-no-shadcn-default.mjs`,
> `["local","ci"]`): no `ui/` component off the allowlist carries `bg-background` / `border-input` /
> `ring-ring` / `ring-2` / `ring-offset-*` / a bare `rounded-md` default / a bare `shadow-sm` utility /
> a leading `bg-<neutral>` surface-fill slab in a live class string. Its **D4 closure arm** asserts every
> `ui/` dir below appears on exactly one list. **This wave authors the bar + the gate + this census —
> ZERO per-component paint;** the per-component re-points land in the OWNING band waves, each of which
> consumes its census verdict + re-earns its own `proof:ba-gestalt` band verdict.

## The isomorphism flag (CLEANUP-PLAN discipline)

Each `reskin-target` row carries an **isomorphic flag**:

- **ISO** — a pure class-rename, byte-identical resolved paint (e.g. `rounded-md`→`rounded-button` where
  the resolved radius matches). Byte-verified in the owning wave.
- **NON-ISO** — a deliberate paint change toward the house identity (e.g. `bg-background`→`--glass-bg-resting`,
  the correct clean break). Gets the per-precept isomorphism check + the gestalt-gate paint sign-off in the
  owning band wave. **All four HEAD residuals are NON-ISO** (a shadcn-neutral slab → a translucent glass
  material is a real paint change, never a byte-identical rename).

## The legibility allowlist (the ONLY sanctioned survivor — AX.W54 / `proof:glass-cohesion`)

`avatar` · `label` · `separator` · `skeleton` · `table` · `data-table` (the opaque legibility set) + `badge`'s
loud-saturated-pill register + `checkbox` / `radio-group`'s STATE-maximal-contrast register (the 16px selection
atoms — glass reads sub-perceptual at that scale; the same legibility argument the allowlist makes for badge's
loud pill). This wave does **NOT widen** the allowlist; it **ratifies** it as the de-shadcn survivor set. A
planted shadcn-neutral token on an allowlist surface stays GREEN; on a non-allowlist surface it reds.

---

## List 1 — reskin-target (carries a residual shadcn-neutral token at HEAD; the gate is born-RED here)

| Component (`ui/` dir) | shadcn-neutral residual @ HEAD | first-principles reskin verdict (the house register) | owning band wave | flag |
|---|---|---|---|---|
| `button` | `outline`: `border border-input bg-background hover:bg-accent …` · `secondary`: leading `bg-secondary` slab · `accent`: leading `bg-accent` + `border-border/40` | the glass register — the `--glass-bg-*` tier + the warm rim (the `default`/`glass` variants are the model; the `outline`/`secondary`/`accent` triplet is the un-reskinned tail) | `BC.W-BUTTON-GLASS-IOS` | NON-ISO |
| `toggle` | `outline`: `border border-input bg-transparent hover:bg-accent …` | the glass-well register — `.control-surface` / the `--glass-bg-quiet` tier + the warm rim (the menu-row/control-tier precedent) | `BC.W-CONTROL-SMOOTH` | NON-ISO |
| `tags-input` | `TagsInputItem.vue`: `data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background` (the ONLY live cold shadcn focus halo in `ui/`) + the item `bg-secondary` chip | the warm `.focus-ring` (`--focus-ring-shadow`, AW.W26) + the `--invalid-ring` destructive twin (BB.W-INVALID-RING) where invalid; the chip → the glass-well register | `BC.W-CONTROL-SMOOTH` | NON-ISO |
| `switch` | `Switch.vue`: the thumb is `bg-background ring-0` (a neutral-slab thumb — a control affordance, not a legibility surface) | the glass/paper thumb register — `--card` warm-cream or a `--control-surface-*` rung (a thumb reads the material, not the page token) | `BC.W-CONTROL-SMOOTH` | NON-ISO |
| `select` | `SelectSeparator.vue`: `h-px bg-muted` divider hairline (a neutral-slab tint on a non-`separator/` surface — the divider register, not the page-token slab, but still off the warm-hairline identity) | the warm hairline — `--control-surface-border` / a `color-mix(in srgb, var(--foreground) N%, transparent)` divider tint (the divider reads the warm ink, not `bg-muted`) | `BC.W-DROPDOWN-FIX` (the select/dropdown band) | NON-ISO |

**Born-RED state (PARTIAL-until-owners-land — CORRECT, not a failure):** at HEAD `proof:no-shadcn-default` D1
reds on these five files. It goes GREEN incrementally as each owning band wave lands its reskin. This wave does
**not** edit any of them — it records the verdict + erects the gate.

---

## List 2 — already-glass (composes a `--glass-*` tier / glass register from birth or a prior wave; clean)

These carry **NO** residual shadcn-neutral token in their visual layer — they route their surface through the
house glass register (`--glass-bg-*`, `.glass-floating`/`.glass-quiet`/`.glass-wash`, `.input-pill`,
`.control-surface`) and read warm-cream glass / glass-well from first principles.

| Component (`ui/` dir) | register | note |
|---|---|---|
| `accordion` | structural (`border-b` hairline + collapse animation) | no surface slab; the item is a hairline-divided list, no shadcn-neutral token |
| `alert` | the `.feedback-tone` tinted-glass register (BA.W-FEEDBACK-TONE) | tones route the shared `color-mix(in oklab, <rung>, var(--tone))` seam, NOT a `bg-<tone>` slab |
| `card` | `glass-card` / the `--glass-bg-card` tier (AX.W54) | the model glass plate |
| `carousel` | composes the glass register on its viewport/controls | controls ride the glass-button register |
| `collapsible` | behavior + content (no surface slab) | reka collapse wiring; content paints nothing neutral |
| `combobox` | the `.input-pill` glass well + the `glass-floating` popover | the input + the listbox are glass |
| `command` | the `glass-floating` palette + glass rows | the command palette is a floating glass plate |
| `context-menu` | the `glass-floating` menu + the menu-row register | menu rows ride the `proof:menu-tokens` STATE register (`hover:bg-accent` is the menu-row STATE, not a surface fill — `proof:glass-cohesion` authoritative) |
| `dialog` | `glass-floating` (DialogContent/DialogScrollContent — the scroll dialog `bg-background`→`glass-floating` clean-break already landed) | the close-button `data-[state=open]:bg-accent` is a STATE arm (glass-cohesion territory), not a surface fill |
| `drawer` | the `.glass-drawer` overlay tier (AY.W-GLASS) | the panel rides `--glass-bg-overlay` + `--glass-blur-overlay` |
| `dropdown-menu` | the `glass-floating` menu + the menu-row register | same STATE-arm note as context-menu |
| `hover-card` | the `glass-floating` floating tier | the hover plate is glass |
| `input` | the `.input-pill` glass well | the canonical glass input well |
| `multi-select` | composes the combobox/select glass register | the chips ride the glass-well; `bg-destructive` is a tone-state, not a surface slab |
| `notification` | `glass-floating` + the `.feedback-tone` register (AY.W-GLASS / BA.W-FEEDBACK-TONE) | the type map routes tinted-glass, not a `bg-<tone>/90` slab |
| `number-field` | the `.input-pill` glass well (`bg-background`/`border-input`→`.input-pill` clean-break already landed) | the increment/decrement ride the glass-button register |
| `popover` | the `glass-floating` floating tier | the popover plate is glass |
| `progress` | the glass track + the warm-fill bar | the track reads the glass-quiet register, not `bg-secondary` |
| `section` | the glass section surface | composes the glass register for the section plate |
| `sheet` | `glass-floating` (SheetContent) | the close-button `data-[state=open]:bg-secondary` is a STATE arm (glass-cohesion), not a surface fill |
| `slider` | the glass track/range + the glass-specular thumb; the lifts ride `var(--shadow-sm)` (the **on-the-line KEEP** — the house warm-ink TOKEN, NOT the bare `shadow-sm` utility; `proof:glass-cohesion` polices the track opacity) | **the `var(--shadow-sm)` house token is KEPT** — see the D2 token-vs-utility note below |
| `tabs` | the glass-capsule track + the `glass-floating` active plate (BC.W-TABS-IOS) | the iOS-27 capsule/plate register, never the squared shadcn tab |
| `textarea` | the `.input-pill` glass well | the multi-line glass well |
| `toast` | `glass-floating` + the `.feedback-tone` register (`bg-background`→register clean-break already landed; `ToastAction` `hover:bg-secondary` is a STATE arm, not a surface fill) | the variant map routes tinted-glass, not a slab |
| `toggle-group` | composes the toggle glass-well register | the group rides the per-toggle register (the `toggle` `outline` reskin propagates here) |
| `tooltip` | the `glass-floating` tooltip tier | the tooltip plate is glass |
| `metric-pill` | the glass metric-pill register | a glass-pill chip, composed from the glass register |

---

## List 3 — allowlist-survivor (the sanctioned legibility opaque/neutral register — NOT a reskin target)

| Component (`ui/` dir) | why it survives |
|---|---|
| `avatar` | the legibility allowlist (AX.W54) — an avatar fallback reads an opaque fill for the initials' contrast |
| `label` | the legibility allowlist — a form label is text on the page, no glass plate |
| `separator` | the legibility allowlist — a hairline + the centered label chip (`text-muted-foreground bg-background`) is legitimately opaque (the SANCTIONED survivor — recorded as the allowlist case, NOT a reskin target) |
| `skeleton` | the legibility allowlist — a loading shimmer is an opaque placeholder by design |
| `table` | the legibility allowlist — a data table reads an opaque substrate for row legibility |
| `data-table` | the legibility allowlist — the table-over-data legibility register |
| `badge` | the loud-saturated-pill register (the allowlist's loud-pill case — a badge's tone wants MAXIMAL contrast) |
| `checkbox` | the STATE-maximal-contrast register — a 16px selection atom (glass reads sub-perceptual at that scale; the checked/unchecked state wants maximal contrast — `proof:glass-cohesion` ratifies its opacity) |
| `radio-group` | the STATE-maximal-contrast register — the same 16px-selection-atom argument |
| `focus-scope` | **behavior-only** — `FocusScope.vue` is a thin wrapper over reka's `FocusScope` focus-management primitive; it paints **ZERO** surface (the purest expression of reka=behavior / glass-ui=material — there is no material to reskin). Listed here as the behavior-only survivor so the closure stays complete. |

---

## The D2 token-vs-utility distinguishing case (`slider`)

`slider/Slider.vue` carries `var(--shadow-sm)` four times (the thumb/track lifts). **This is KEPT.** `--shadow-sm`
is the HOUSE warm-ink shadow TOKEN — it composes `color-mix(in srgb, var(--shadow-color) N%, transparent)` over
`--shadow-color: var(--foreground)` (Conventions §shadows) — **NOT** the shadcn `shadow-sm` Tailwind UTILITY. The
gate's D2 arm flags the bare `shadow-sm` utility form and **NEVER** the `var(--shadow-sm)` token form (a synthetic
fixture with each proves the distinguishing bite every run). The slider lifts are the on-the-line **KEEP**, recorded
here as the TOKEN case, not a reskin target — `slider` is on List 2 (already-glass).

---

## Merged CLEANUP-PLAN A6 / A7 findings (DESHADCN-BRAINSTORM §1-E — ONE reskin plan, no duplicate effort)

These ride their owning band wave's paint sign-off. **None is a `proof:no-shadcn-default` target** — the gate scope
is `ui/` (a shadcn-vue wrapper skin); `custom/` is glass-ui-authored from birth (no shadcn skin to abrogate), and
the `!important`/`vh` smells are not shadcn-neutral tokens.

| Finding | surface | verdict | owning wave | flag |
|---|---|---|---|---|
| **A7 STYLE-FIX** — `TypewriterText.vue:238` `background-color: rgba(128, 128, 128, 0.15)` (a literal mid-NEUTRAL gray on a PUBLISHED `custom/` surface, off the warm-cream/no-gray identity — the cohesion twin of the de-shadcn bar; a neutral-gray literal is the SAME disease as a `bg-muted` slab) | `custom/` (NOT `ui/`) | re-point onto `color-mix(in srgb, var(--foreground) 8%, transparent)` (the warm hover-bg rung) | **`BC.W-VISUAL-RECONCILE`** (marks-band, unit 6 — the `custom/` marks re-walk; TypewriterText is the HandMark/marks-family sibling). Owns the gray→warm re-point + the NON-ISO paint sign-off (re-earns its `proof:ba-gestalt` verdict on the re-walked surface). **NOT a `proof:no-shadcn-default` target** (gate scope is `ui/`). | NON-ISO |
| **A2 HOLD** — `confirm-dialog/ConfirmDialog.vue:8-12` hand-rolls an OPAQUE `bg-card text-card-foreground border` modal scaffold instead of composing `<Dialog surface="glass">` (off the AX.W54 glass-first canon + the BA.W-SURFACE-AXIS grammar) | `custom/confirm-dialog/` | re-base onto `<Dialog surface="glass">` (the CLEANUP-PLAN's own routing — "the glass band evaluate") | **`BC.W-DIALOG-GLASS`** owns the re-base + the NON-ISO (opaque→glass) paint sign-off. | NON-ISO |
| **A6 HOLD** — `search/FuzzySearch.vue` `!important`-fighting-the-CVA cluster | `custom/search/` | the `!important` smell is a CVA-geometry escape (give Button an `iconSize`/dimension prop, or accept the localized escape) — **not** a shadcn-neutral token | rides its owning band wave's paint sign-off. **NOT a `proof:no-shadcn-default` target.** | — |
| **A6 HOLD** — `drawer.css:58` `vh`→`dvh` | `src/styles/drawer.css` | a mobile-viewport decision (`vh` trap) — **not** a shadcn-neutral token | rides its owning band wave's paint sign-off. **NOT a `proof:no-shadcn-default` target.** | — |

---

## Fences (the gate scope + the overlap-defer)

- **The gate scope is `ui/` ONLY.** The de-shadcn principle is about the shadcn-vue wrapper skin; `custom/`
  components are glass-ui-authored from birth, not shadcn ports. The merged A7 `TypewriterText.vue` neutral-gray
  finding is RECORDED above but is NOT a `proof:no-shadcn-default` target (its execution home is the named
  `BC.W-VISUAL-RECONCILE` marks-band, unit 6). Widening the gate to `custom/` is out of scope.
- **`proof:glass-cohesion` is authoritative on the bg-opacity axis.** `proof:no-shadcn-default` is the
  residual-shadcn-VOCABULARY axis (border/ring/radius/shadow tokens + the LEADING neutral-slab-as-fill vocabulary).
  Where the two would double-cover the bg-opacity case (e.g. a STATE arm `hover:bg-accent` on a menu row), this
  gate DEFERS — its `bg-<neutral>-slab` rule matches only the LEADING (variant-prefix-free) surface fill, never a
  `hover:`/`focus:`/`data-[…]:` state arm. The two are disjoint-by-clause; there is no contradicting double-red.
- **Clean break, no alias** (MEMORY): the shadcn-neutral classes are DELETED, not aliased — no `bg-background-legacy`,
  no `outline-shadcn` variant kept for compat. The reskin is a visual upgrade with no public-prop break (the variant
  KEYS stay; only the paint changes).
- **No new register, no new token** (KISS): this wave RETIRES the shadcn vocabulary onto the EXISTING house
  registers (`--glass-*`, `.input-pill`, `.control-surface`, `.focus-ring`, the geometry-radius + warm-ink-shadow
  tokens). A reskin that mints a parallel glass recipe instead of composing the existing one is the anti-pattern.
- **reka behavior is INVIOLATE** — this wave (and every owning band-wave reskin) touches ONLY the paint layer. The
  focus management, ARIA, state machines, portal, roving-tabindex, collision logic reka provides are UNTOUCHED.

## Closure (the EXACTLY-ONE-LIST anti-smuggle floor)

Every `src/components/ui/` component dir appears on **EXACTLY ONE** of List 1 / List 2 / List 3 above. The gate's
D4 arm asserts this machine-checkably: a new un-listed `ui/` dir bearing a shadcn-neutral token reds (the smuggle
attempt is caught). `_shared` (shared CVA internals, not a component surface) is the only non-listed entry, by the
same reasoning `proof:glass-cohesion` exempts `_shared`.
