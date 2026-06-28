# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass1-CONVERGED

> COMPLETELY abrogate default shadcn + tailwind paint while KEEPING the reka/shadcn
> behaviour substrate. The DEEP, dedicated form of WS4's de-shadcn-sweep — DEPTH (richer
> iOS-27 control material) **and** BREADTH (close the residual census the existing gates
> structurally miss). reka = BEHAVIOUR / glass-ui = 100% of MATERIAL.

Verified against `tranche/BG` HEAD (4.2.0 family) this session — every residual, token, read-count,
and gate-assertion below was re-read on disk during the converge. This is the CONVERGED revision:
each prototype critique's MUSTFIX is folded; each validated prototype mechanism is adopted; the
contradictions are ruled.

---

## 0. THE RECONCILIATION (read first — the whole-tranche tension this spec resolves)

De-shadcn is ~5 tranches deep and the SOURCE-VOCABULARY axis is already settled. The danger is
**re-litigation / double-build**, not greenfield. WS10 is BOTH the NARROW (deep material rebuild
within the WS4 predicate) and the BROAD (census EVERY default still leaking), honoured by
**EXTENSION, never re-author** (the `proof:no-gray` NO-new-KEY precedent, `proof:webgl-substrate-single`
extend-in-place precedent):

| Axis | Owner | Mechanism |
|---|---|---|
| `proof:de-shadcn` register + the 9 FORM-control clears + stepper teeth + `--opacity-disabled-strong`/`--icon-decoration-opacity` mints + forced-colors clear | **WS4** (precondition W0) | atomic register+clear, born-GREEN |
| The deep-residual VOCABULARY + STATE-ARM census (the BREADTH) | **WS10** | EXTEND the already-GREEN `proof:no-shadcn-default` 233-file walker — **no new gate id** |
| The deep iOS-27 MATERIAL (grouped-inset Select; deepen Switch/controlSize) | **WS10** | build RICHER controls WITHIN the WS4 predicate; reads existing tokens |
| Dead-token DELETES + cross-component FOLDS + the focus-ring unify | **WS10** | clean break, no alias |

**Three hard fences this spec must not trip:**

1. **No 4th `proof:de-shadcn` design.** Three incompatible designs already churned. WS10 mints
   **ZERO new gate id** — every tooth EXTENDS `proof:no-shadcn-default` (registered `gates.mjs:1587`,
   `["local","ci"]`, GREEN) in place.
2. **WS10 never re-clears the 9 FORM violations.** Those are WS4's atomic clear. WS10 sequences
   strictly AFTER W0 and builds on the cleared predicate.
3. **The `:`-variant lookbehind is the liquid-reveal fence** — `data-[state=…]:`/`animate-*`/`slide-*`/
   `zoom-*`/`fade-*` is glass-ui-INTENTIONAL. WS10's state-arm arm CLASSIFIES the fill token
   (neutral vs identity); it NEVER pre-strips the grammar.

**The verified handoff fact (folds the gate-wiring design-proof).** `proof:de-shadcn.mjs` is ABSENT
from `tranche/BG` HEAD (`git cat-file -e HEAD:scripts/proof-de-shadcn.mjs` → fatal). There is **no
pre-existing COMMITTED CI break** — `gate-script-parity` REDs in the dev worktree only because the
WS4 dev artifact is uncommitted. The load-bearing consequence: **WS4's W0 lands `proof:de-shadcn`
atomic born-GREEN BEFORE WS10's `ci`-tagged census-extend arms commit.** WS10's census-extend + the
token-replace clears land **ATOMIC born-GREEN, AFTER W0** — a born-RED `ci` arm committed ahead of
its clear is the self-inflicted CI break, FORBIDDEN (R1).

---

## 1. GESTALT GOAL

Every glass-ui control is 100% glass-ui identity material — warm, weighty, liquid, iOS-27 — with
ZERO default shadcn/tailwind paint surviving on ANY component, while the reka/shadcn behaviour + a11y
(focus-mgmt, ARIA, state-machines, portal, roving-tabindex, collision) stay byte-untouched. The
material is token-first idiomatic Tailwind v4 (`@theme`/`@utility`/`@variant`, the token cascade, no
raw arbitrary defaults). A gate-asserted census proves no default ring/shadow/radius/color/variant/
timing/opacity leak on the full 233-file ui/ tree, locked born-RED→GREEN, **real-paint-verified by a
non-authoring judge in BOTH modes AND Chrome AND Safari** (headless-green is NOT acceptance — the
visually-broken trap shipped 3×).

---

## 2. MECHANISM (concrete, idiomatic)

### 2.1 The census EXTENSION (BREADTH — the gate that closes the blind spots)

The existing `proof:no-shadcn-default` (404 lines, registered `gates.mjs:1587`) is a hand-curated
FORBIDDEN-vocabulary census catching only BC-band reskinned tokens. Two structural blind spots, both
live at HEAD:

- **RC-1 — the FORBIDDEN list is incomplete-by-construction** (`rounded-md` but not `rounded-sm`/`-lg`;
  `#hex` but not `hsl()`/`oklch()`/`rgb()`; nothing for bare `text-sm`/`text-xs`, `transition-colors`,
  `duration-200/300`, `disabled:opacity-N`, raw `bg-white`).
- **RC-4 — the `:`-lookbehind defers EVERY state arm to glass-cohesion, which is bg-OPACITY-only.** A
  cold-neutral `hover:bg-muted` / `data-[state=on]:bg-accent` / `hover:bg-white/10` sails through BOTH
  gates. The seam between them is unguarded.

WS10 EXTENDS the SAME gate (DRY — reuse the 233-file walker, no fork, no new id):

**(a) Deep-VOCABULARY denylist arms** — each forbidden token carries its replacement target + a
self-test bite:

| forbidden | live HEAD sites | → replacement |
|---|---|---|
| `rounded-sm` / `rounded-lg` / `rounded-xl` (off the radius-alias allowlist) | alert, dialog, sheet, data-table ×3 | `rounded-{card,control,dialog,input,pill}` semantic alias |
| bare `text-sm` / `text-xs` (fixed-px tailwind default, ≠ the `text-small` ladder bridge) | ~21 .vue + CVA bases | `text-small` (ladder) or `text-control`/`-sm` per surface role |
| `transition-colors` / `duration-200` / `-300` / `ease-in-out` (raw timing) | ~15 sites | `transition-control` / `--ease-standard` / `--duration-*` / a spring (liquid-weight law) |
| `disabled:opacity-N` / `peer-disabled:opacity-N` literal | stepper ×2, Label, icon `opacity-50` ×3 | `--opacity-disabled` / `--opacity-disabled-strong` / `--icon-decoration-opacity` |
| raw color-fn in arbitrary bracket: `[hsl(…)]` / `[oklch(…)]` / `[rgb(…)]` | badge `dark:bg-[hsl(0_70%_45%)]` | a `--destructive`-derived dark token |
| raw `bg-white` / `bg-black` (not even a token) | notification `hover:bg-white/10` | `bg-foreground/N` / a glass register |

**(b) The STATE-ARM-NEUTRAL classifier** (closes RC-4 — the headline new tooth; **prototype-VALIDATED,
74% refine**). Scan `hover:`/`focus:`/`active:`/`data-[state=…]:`/`dark:`-prefixed `bg-`/`text-` fills,
classify the FILL TOKEN after the last `:`, RED a NEUTRAL state fill, SPARE the identity/tone arm:

- **NEUTRAL → RED:** `{muted, secondary, white, black}` and `accent` (cold shadcn neutrals).
- **IDENTITY/TONE → SPARE:** `{primary, destructive, success, warning, info, foreground, the glass-* tiers,
  any `bg-(--glass-*)` arbitrary-var}` — the Switch `data-[state=checked]:bg-primary` warm-violet
  signature, the Switch `data-[state=unchecked]:bg-(--glass-bg-wash)` arbitrary-var, the badge
  `bg-destructive`, the feedback tones. iOS-27 law: **tint is SEMANTIC, applied to the CTA/active
  register only**; a neutral state fill is decoration masquerading as a control.
- **EXACTLY-ONE allowlist:** `_shared/menuItemVariants.ts`'s `accent` variant arm
  (`hover/focus/data-[state=open]:bg-accent`) is the SANCTIONED flat-accent ESCAPE beside the `glass`
  default. The ONLY sanctioned `accent` state-arm site — a one-file allowlist; a NEW `bg-accent` state
  arm anywhere else REDS.

The classifier's regex is the validated prototype form — the `(?<=[\w\]])` lookbehind discriminates
state-arm from leading fill; `(?:\/\d+)?(?![\w/-])` catches `hover:bg-muted/50` + `hover:bg-white/10`
while sparing the `-foreground` companions. It NEVER pre-strips the `:` grammar.

**VALIDATED-AND-FOLDED (critique R2 mustFix — the breadth bet de-risk).** The prototype ran the
classifier over the **full 233-file ui/ tree → ZERO false positives**; it born-REDs on exactly the **9
genuine residual files / 10 token-rows** (toggle carries muted+accent = 2 rows). The acceptance bar
RECORDS this sweep as a committed self-test fixture: the classifier greens against the real identity
arms (`data-[state=checked]:bg-primary`, `data-[state=unchecked]:bg-(--glass-bg-wash)` arbitrary-var,
`bg-destructive`, the four feedback tones) AND the liquid-reveal `:`-grammar (`animate-in fade-in`,
`slide-in-from-*`, `zoom-*` clean), and reds the 8 planted state-arm bites + the deep-vocab bites.

**(c) The EXACTLY-ONE-LIST closure widen** (BC `W-DESHADCN-census.md` precedent) — every ui/ dir is on
exactly one of {deep-residual-target | already-glass | allowlist-survivor}; the anti-smuggle arm reds a
new off-list neutral.

Born-RED on the ~20+ confirmed HEAD sites; GREEN at the WS10 close.

### 2.2 The TOKEN-REPLACE sweep (clears the census born-RED — token-first, clean break)

Reskin every residual onto an EXISTING house register (no new mechanism, no alias). The two reskins the
prototypes contested are RULED below.

- **Toggle state-arm neutrals → ADAPTIVE glass registers (critique mustFix #2 — FOLDED).** The toggle
  base (`hover:bg-muted hover:text-muted-foreground` + `data-[state=on]:bg-accent
  data-[state=on]:text-accent-foreground`, `index.ts`) is the genuine residual. Re-point:
  - **hover → the glass-quiet WELL** (the `--control-surface-bg-hover` / `--glass-bg-quiet` register the
    menu-row + `.control-surface` use), NOT raw `bg-muted`.
  - **selected (`data-[state=on]`) → `--glass-bg-floating-tinted`** (CONFIRMED at
    `glass/surfaces.css:283`), the **element-level adaptive register** — NOT the raw pre-substituted
    `bg-glass-floating` rung. This is the SegmentedTabs-pill / W-BUTTON-GLASS precedent: a borderless
    inline control floats over varied backdrops, so the W55 bright-bucket darken + the `contrast-color()`
    flip MUST reach the selected fill. Using the raw rung reproduces the substitution-vs-inheritance trap
    (won't adapt over bright/busy backdrops). **REQUIRED:** the selected glyph stays legible (the
    `contrast-color()` foreground lift reaches it) in DARK mode over the floating-0.80 fill — proven by
    the binding π, not assumed.
- **Close-button 3-way fork FOLD → compose `buttonVariants` (critique mustFix #3 — FOLDED; DROP the
  minted utility).** DialogContent (`rounded-sm opacity-70 data-[state=open]:bg-accent`), SheetContent
  (`rounded-sm … data-[state=open]:bg-secondary`), DialogScrollContent (`rounded-pill
  hover:bg-secondary`) are three recipes for ONE control. The §2 sketch's net-new `.glass-overlay-close`
  utility is **RETIRED before it is minted** — it is less-DRY, less-liquid (flat color transition, no
  scale/press spring), and forks a third hover idiom. Instead **compose
  `buttonVariants({ variant: 'ghost', size: 'icon-sm' })`** (CONFIRMED: `ghost` at `button/index.ts:140`,
  `icon-sm` = `h-(--control-h-xs) w-(--control-h-xs) p-0` at :187) + the absolute positioning at the
  wrapper (`cn(buttonVariants({variant:'ghost',size:'icon-sm'}), 'absolute right-4 top-4')`). The
  positioning is a wrapper concern, not a recipe concern — there is no geometry conflict that forces a
  new recipe. This reuses the de-shadcn'd button's concentric radius + glass-capsule-hover scale/press
  lift + four-state contract + `.focus-ring`, and kills `rounded-sm`/`opacity-70`/`bg-accent`/
  `bg-secondary` in one move.
- **ToastAction re-roll FOLD.** ToastAction re-rolls a full shadcn outline button
  (`border bg-transparent hover:bg-secondary h-[calc…] text-sm transition-colors`) → compose
  `buttonVariants({ variant: 'outline'|'secondary', size: 'sm' })` (the `.glass-capsule` register).
- **table/data-table rows → `.glass-menu-row` / `--glass-bg-quiet` hover-lift.** notification
  `hover:bg-white/10` → `hover:bg-foreground/N` / a glass register.
- **Bare radius → semantic alias.** alert `rounded-lg` → `rounded-card`/`rounded-panel`; data-table
  `rounded-lg` → `rounded-card`. (Close-buttons' `rounded-sm` dies in the button-fold above.)
- **Bare text → ladder.** CardDescription/AlertDescription/DrawerDescription/notification/accordion/
  tabs-trigger/table-empty bare `text-sm`/`text-xs` → `text-small` or `text-control`/`-sm` by surface role.
- **Raw timing → §6 register.** `transition-colors` → `transition-control`; AccordionTrigger chevron
  `transition-transform duration-200` → a spring/`transition-control` (the liquid-weight UNIVERSAL LAW —
  chevrons must spring, not linear-ease).
- **`disabled:opacity-N` → token.** stepper `opacity-20` → `--opacity-disabled-strong` (WS4-minted);
  Label `peer-disabled:opacity-70` + the 3 decorative-icon `opacity-50` → `--icon-decoration-opacity`
  (WS4 mints it for ComboboxInput; WS10 extends the read to all 3 icon sites — 3→1 token).
- **badge dark hsl-literal → `--destructive`-derived token;** badge `secondary` slab → a warm tone/glass
  register.

### 2.3 The dead-token DELETES + the focus-ring UNIFY (no-legacy clean break)

- **DELETE** `--input: var(--neutral-4)` (color-radius.css) + `--color-input` bridge (bridges.css:82) —
  generate forbidden `border-input`/`bg-input`, ABSENT from the tree (prose refs only). Pure dead weight.
- **DELETE** the `--color-ring` bridge (bridges.css:83) — generates forbidden `ring-ring`/`outline-ring`.
  **(folded read-count fix below — this is the bridge, not the source token.)**
- **DELETE** the phantom `var(--color-accent-opaque, …)` first-arg (control-surfaces.css:96) —
  `--color-accent-opaque` is undefined everywhere → the border ALWAYS resolves the fallback (misleading
  dead fallback).
- **DELETE** `--corner-k-soft:1.7` / `--corner-k-sharp:2.4` (radius.css) — ZERO `var()` consumers; re-anchor
  `proof:squircle-language`'s token-axis clause to the live `--corner-k-squircle:2`.

**The focus-ring FOLD + `--ring` rename — RULED (critique 62% refine, all 8 mustFix FOLDED).**

The bespoke `.input-pill:focus-visible` recipe (control-surfaces.css:96-97 — `border-color: var(--ring)`
+ `box-shadow: … var(--ring) 30%`) diverges from the house `--focus-ring-shadow` register. The FOLD
(`box-shadow: var(--focus-ring-shadow)`, border-color dropped) is the highest-leverage DRY win and
harmonises with the SAME register WS4's Combobox/TagsInput focus-within clears read.

1. **The read-count is 7, not 4 (enumerated, re-verified on disk).** EVERY `var(--ring)` read, re-pointed
   explicitly:
   | # | site | role |
   |---|---|---|
   | 1 | `glass/control-surfaces.css:96` | `.input-pill` focus border-color (DROPPED by the fold) |
   | 2 | `glass/control-surfaces.css:97` | `.input-pill` focus box-shadow (FOLDED → `--focus-ring-shadow`) |
   | 3 | `tokens/scale-paper.css:83` | `--focus-ring-shadow` 30% ring |
   | 4 | `tokens/scale-paper.css:84` | `--focus-ring-shadow` 15% glow |
   | 5 | `theme/bridges.css:83` | `--color-ring` bridge (DELETED) |
   | 6 | `tokens/light-dark.css:125` | `--accent-color: light-dark(var(--primary), var(--ring))` — drives NATIVE `accent-color` on checkbox/radio (via dark-arm.css:25 + scheme-motion.css:30) |
   | 7 | `configurator.css:251` | active-tile CROWN (`inset 0 0 0 2px var(--ring)`) |
   Plus the 3 DEFINITION sites (`color-radius.css:102` light, `dark-arm.css:100` dark, `light-dark.css:118`
   light-dark arm). A missed rename at #6/#7 breaks dark native-control accent / the preset-tile crown.

2. **DECOUPLE — the rename target is honest (mustFix #2).** `--focus-ring-color` would misname a token
   that also drives native `accent-color` + the configurator crown. So the rename is a 3-surface decouple,
   not a sed:
   - the FOCUS register (reads 1-4) → `--ring` renamed to **`--focus-ring-color`** (slots beside the
     existing `--focus-ring-{width,shadow}` — the coherent register family; the last shadcn-NAMED token in
     the cascade retired, clean break, no alias);
   - the configurator crown (#7) → reads **`--foreground`** (its stated design intent — the active-tile
     crown is foreground ink, not a focus ring);
   - native `accent-color` (#6) → its own explicit per-mode token (e.g. `--accent-color-native`, light
     `--primary` / dark a warm mid-tone) so the native checkbox/radio glyph keeps its own contrast budget.
   - the `--color-ring` bridge (#5) is DELETED outright.

3. **Treat the warm-flip as a 3-surface COUPLED change (mustFix #3).** The dark `--ring` is
   `hsl(48 10% 70%)` = OKLab H~95° yellow-green — the hue W-NO-GRAY/W-DARK-INK-WARM condemned. Warming it
   (toward hsl-30) cascades through focus ring + dark native `accent-color` (verify the checkmark/radio
   glyph still clears its contrast headroom) + the dark configurator crown (now decoupled to `--foreground`,
   so the crown is OFF this flip — a free simplification). The `proof:ba-gestalt` verdict MUST cover native
   checkbox/radio AND the dark preset gallery AND the input focus ring, not just the input ring.

4. **ATOMIC with the no-gray witness (mustFix #5).** The warm-flip and the `warm-hue-dark-focus-ring`
   `proof:no-gray` witness land together or neither — a born-RED witness without the flip is a red CI. The
   witness is GATED to the flip. If `proof:no-gray` reds, the warm flip is **BOOKED** (the rename + fold +
   decouple + deletes land regardless — they are hue-neutral).

5. **Quantify the FOLD delta, don't assume "reads better" (mustFix #4 + #6 framing).** The honest WHY:
   `--neutral-3` is WARM (H73.0°, C0.0247), not gray; today's `.input-pill` focus is a serviceable strong
   `1.5px` solid border + warm halo; the fold is a HARMONISATION with a real WEAKENING delta (solid border
   → 30%-opacity ring + glow, border-color dropped). It is NOT a "live gray bug fix" — do not oversell.
   The binding π non-text-contrast-verifies the focused ring against WCAG 1.4.11 (3:1) over the cream field
   AND the L16 dark plate, BOTH modes + Chrome AND Safari.

6. **Enroll ALL box-shadow focus-within carriers in the forced-colors Highlight set (mustFix #7 —
   confirmed gap).** The a11y-overrides forced-colors block (`a11y-overrides.css:78-91`) carries
   `.input-pill:focus`/`:focus-visible` but NOT `.input-bar:focus-within` (CONFIRMED carrier at
   `components.css:241`, pre-existing gap — ships keyboard-INVISIBLE in WHC). ADD `.input-bar:focus-within`;
   verify the WS4 `[data-slot=tags-input]:focus-within` + the combobox-input data-slot/focus-within
   carriers actually exist and are enrolled. Any NEW focus-within wrapper this wave touches MUST join the
   Highlight set.

### 2.4 The idiomatic-v4 closure (the "no raw arbitrary defaults" half — SMALL, targeted)

HEAD is already idiomatic (98 `-(--token)` utilities, full `@theme`/`@variant`/`@utility`; the idiom
gates are GREEN). The genuine residual is TWO arbitrary-wrap classes with no first-class utility form:

- **Mint `--text-control` / `--text-control-sm` `@theme` bridges** (theme/bridges.css) → `text-control` /
  `text-control-sm` utilities → retire `text-[length:var(--control-text)]` (alert/toggle/button/badge
  bases). Extend `proof:tailwind-v4-idiom` clause-(d) completeness to bridge the `--control-text` family;
  keep GREEN.
- **Mint `@utility glass-blur-{wash,quiet,floating}`** → retire `[backdrop-filter:var(--glass-blur-*)]`
  (tabs/drawer/alert/ModalOverlay) — OR compose `.control-surface`/`.glass-wash` where a full glass tier
  already carries the blur (the BE.W-GLASS-CONTROL precedent).

**SANCTIONED-KEEP (do NOT "fix"):** the 5 `[var(--x,fallback)]` comma-fallback brackets (the `(--x)`
shorthand cannot carry a fallback) and the `[--token:value]` inline custom-prop writes (controlSizeClass)
— both ARE idiomatic v4. POLISH, not a structural bar — cap the investment here.

### 2.5 The deep iOS-27 MATERIAL (DEPTH — RICHER controls within the predicate)

- **Grouped-inset Select (the ONE genuinely-unbuilt target — RULED, critique 54% refine, all 7 mustFix
  FOLDED).** SelectGroup is bare `p-1 w-full`, SelectLabel bare `py-1.5 pl-8 pr-2` — no iOS inset-grouped
  section backplate. The architectural DEPTH shape is RIGHT (prototype-confirmed Safari-safe — `menu.css`
  carries `.glass-menu-group`, dist builds, real-paint read iOS-grade in Chromium + WebKit). The
  contested edges are ruled:

  1. **STRUCTURAL ENVELOPE ONLY — do NOT change the label's type register (mustFix #1 + #2 + #5).** The
     prototype shipped a CI-breaking `proof:dropdown-type-scale` RED by re-registering SelectLabel off
     `text-dropdown-secondary`. `proof:dropdown-type-scale` (CONFIRMED `:142`) REQUIRES
     `select/SelectLabel.vue` to read `text-dropdown-secondary` — the D17 family-parity governed rung
     across all four family labels. **RULING:** the `.glass-menu-group` envelope is a structural BACKPLATE
     + radius/inset only; **SelectLabel KEEPS `text-dropdown-secondary`** (gate stays GREEN, family parity
     intact). The iOS inset-grouped LOOK comes from the backplate + concentric radius + inset margins,
     NOT a caption-register swap. **Do NOT compose `.glass-menu-section` onto the family label** (it would
     red `proof:dropdown-type-scale` and break D17). The §2.5-pass1 "section caption composing
     `.glass-menu-section`" line is RETRACTED. If the iOS mono-caption section voice is later wanted, it is
     a register change across ALL four family labels IN LOCKSTEP + a sized/commented re-point of
     `proof:dropdown-type-scale` — that is the DEFERRED option (§6), not this wave.

  2. **The envelope:** an outer panel at `--radius-panel` (~32-40px), nested row-groups at
     `--radius-control` (~20px) with inset margins — the iOS inset-grouped table style
     (`S-siri-frames §respond f010-f012`). Reads the existing `--glass-bg-*`/`--radius-*` tokens — NO new
     mechanism, NO fork.

  3. **Per-mode ELEVATION-CORRECT fill — dark must LIFT, not darken (mustFix #3 + #4).** The prototype's
     `--menu-group-fill` was a 0.22-alpha near-black over the floating plate — darkens the WRONG way in
     dark mode (a nested card must read as MORE-elevated, i.e. LIGHTER over the dark plate, the
     W-DARK-MATERIAL elevation-ladder discipline + `proof:card-tier-alpha`). **RULING:** the group fill is
     a per-mode pair (light: darken toward ink a touch; dark: LIFT toward the warm-ink, the nested-card
     elevation step), in `oklab`, so the card reads as a DISTINCT, correctly-elevated section in BOTH
     modes. The strength is TUNED until 3 separated grouped cards read against the surrounding
     `glass-floating` panel — confirmed by a non-authoring judge over a real capture, both modes, Chrome
     AND Safari (not the author's light-only computed witness).

  4. **Label inset alignment (mustFix #5).** Align the section-label inset with the row text edge (the
     dot-gutter `pl-7` ≈28px lane the rows reserve), OR record the 12px inset as a deliberate iOS
     section-header indent. The label's WEIGHT stays governed by `text-dropdown-secondary` (do NOT re-add a
     `font-semibold` that fights the register — the governed rung owns the weight).

  5. **Scope decision (mustFix #6) — the LABEL is the discriminant.** `.glass-menu-group` is a SHARED
     `menu.css` recipe. The decidable rule: a menu group that carries a section LABEL semantically IS an
     inset section → it composes the envelope (Select first; DropdownMenuGroup/ContextMenuGroup with a
     label may compose it for consistency); a flat LABEL-LESS group stays flat. This is recorded so "a
     Select group is a card, a DropdownMenu group is flat" is a PRINCIPLED rule (label-bearing ⇒ inset),
     not an accidental inconsistency. Whether the other label-bearing families adopt the envelope THIS
     wave or BOOK it is the orchestrator's call — either way the rule is recorded.

- **Deepen Switch capsule + controlSize (NEVER re-mint).** Switch.vue already composes
  `glass-wash glass-specular-track rounded-pill` + the `--switch-*` geometry quad +
  `data-[state=checked]:bg-primary` (the SPARED warm-violet identity arm, classifier-clean) + a
  `--spring-snappy` thumb-throw; `_shared/useControlSize.ts` already ships the `sm|default|lg` axis. WS10
  DEEPENS the liquid-glass material/motion (press = scale + bounce on the `--spring-*` per-clock register;
  the touch-point illumination read) + extends controlSize rung consistency. It READS the `--switch-*`/
  `--control-*` quads, never forks a parallel recipe.
- **iOS-27 fidelity facts (the gate's structural assertions):** concentric radius (capsule = half-height
  stadium, `--radius-pill` clamp; no bare `rounded-md`); capsule-default control shape; controlSize tiers
  token-driven; semantic-tint-ONLY on active arms; the REGULAR adaptive-legibility variant
  (W55 + W-DARK-MATERIAL) is the default for text-bearing controls, CLEAR only over media-rich backdrops;
  4.5:1 floor + vibrant-text-on-glass.

### 2.6 The lock + paint bar (the close)

- The extended `proof:no-shadcn-default` (all WS10 arms) is GREEN.
- The WS4 `proof:de-shadcn` FORM gate is GREEN (precondition; WS10 builds on it).
- **The FULL gate suite is run before any convergence claim** (cardinal lesson, mustFix). The
  build-green/gate-red gap shipped: `vue-tsc --noEmit` + `npm run build` GREEN is NOT acceptance. The
  affected gates run green AT THE CLOSE: `proof:no-shadcn-default` (extended), `proof:de-shadcn` (WS4),
  `proof:dropdown-type-scale`, `proof:no-gray`, `proof:glass-cohesion`, `proof:no-layout-animation`,
  `proof:menu-glass`, `proof:control-tokens`, `proof:squircle-language` (re-anchored),
  `proof:tailwind-v4-idiom` (with the new bridge family).
- **The binding π — real paint, the headless-green/visually-broken defence (shipped 3×).** Enroll the
  forms/controls surface on a BG gestalt roster with a recorded per-surface VERDICT. A FRESH per-surface
  capture by a NON-AUTHORING judge over each reskinned control's six-state matrix (rest/hover/focus/
  active/selected/disabled), in **BOTH modes AND Chrome AND Safari**, asserting the glass/paper material
  resolves (getComputedStyle oklab paint-arm) — NOT a shadcn-neutral token. Specifically proven:
  - the floating-tinted SELECTED toggle reads distinctly-selected with a LEGIBLE glyph in DARK mode;
  - the close-hover well is visible over the 0.68 `--glass-bg-dialog` plate;
  - the grouped-inset Select reads as 3 SEPARATED, correctly-elevated cards (the iOS reference), both modes;
  - the folded focus ring clears WCAG 1.4.11 (3:1) over cream + L16 dark plate.
  A `@media (forced-colors:active)` arm asserts a non-`none` focus outline (every box-shadow focus-within
  carrier in the Highlight set or it ships keyboard-INVISIBLE in WHC).
- **reka inviolate (e2e-paint, the silent-no-op trap):** TagsInputRoot emits `data-disabled`, ToggleGroup
  emits `aria-checked`/`data-state`, the toggle `data-[state=on]` actually PAINTS the new selected register
  at runtime — proven by live capture, not a class string (vue-tsc + units MISS the stale-binding no-op).
- **Fold the CLAUDE.md de-shadcn CANON** (absent at HEAD): the `reka = BEHAVIOUR / glass-ui = 100% MATERIAL`
  clause + the machine-lock pointer to `proof:no-shadcn-default` + the settled fences (legibility allowlist;
  `:`-lookbehind liquid-reveal fence; in-srgb surface-tint; `var(--shadow-sm)` token KEPT). Doc-only coda.

---

## 3. FILES TOUCHED

**Gate / scripts**
- `scripts/proof-no-shadcn-default.mjs` — EXTEND: deep-vocab denylist arms + the state-arm-neutral
  classifier (the validated regex) + the menuItemVariants accent allowlist + self-test bites (8 state-arm
  + the deep-vocab + the 233-file zero-false-positive fixture) + EXACTLY-ONE-LIST widen.
- `scripts/proof-tailwind-v4-idiom.mjs` — EXTEND clause-(d) for the new `--control-text` bridge family.
- (NO new gate id. NO touch to `scripts/proof-de-shadcn.mjs` — WS4's.)
- `tests-visual/de-shadcn.spec.ts` (WS4-authored) — WS10 adds the non-form reskin + grouped-inset π arms +
  the forced-colors outline arm.

**Token cascade**
- `src/styles/tokens/color-radius.css` — DELETE `--input`; rename `--ring`→`--focus-ring-color` (focus-only).
- `src/styles/theme/bridges.css` — DELETE `--color-input`, `--color-ring`; MINT `--text-control`/`-sm`.
- `src/styles/theme/radius.css` — DELETE `--corner-k-soft`/`-sharp`; re-anchor squircle vocab.
- `src/styles/tokens/dark-arm.css`, `light-dark.css` — `--ring` rename lockstep (+ the GATED warm-hue flip);
  DECOUPLE `--accent-color` native source onto its own per-mode token.
- `src/styles/configurator.css:251` — crown reads `--foreground` (decoupled off `--ring`).

**Recipe CSS**
- `src/styles/glass/control-surfaces.css` — DELETE phantom `--color-accent-opaque`; FOLD `:focus-visible`
  onto `var(--focus-ring-shadow)`.
- `src/styles/menu.css` — ADD `.glass-menu-group` inset-grouped envelope (structural backplate + radius/
  inset; per-mode elevation-correct fill).
- `src/styles/utilities/*.css` — MINT `@utility glass-blur-*`. **(NO `.glass-overlay-close` — folded onto
  `buttonVariants`.)**
- `src/styles/utilities/a11y-overrides.css` — ADD `.input-bar:focus-within` (+ any new wrapper) to the
  forced-colors Highlight set.

**ui/ SFC + CVA (paint-layer only — reka behaviour byte-untouched)**
- `toggle/index.ts` (hover→glass-quiet well, selected→`--glass-bg-floating-tinted`),
  `table/TableRow.vue`, `data-table/DataTable.vue`, `toast/ToastAction.vue`,
  `notification/Notification.vue`,
  `dialog/DialogContent.vue` / `dialog/DialogScrollContent.vue` / `sheet/SheetContent.vue` (close-button →
  `buttonVariants({variant:'ghost',size:'icon-sm'})` + absolute positioning),
  `alert/index.ts`, `badge/index.ts`, `card/CardDescription`, `drawer/DrawerDescription`,
  `accordion/AccordionTrigger.vue`, `tabs/TabsTrigger`, `table/TableEmpty`,
  `number-field/NumberFieldIncrement.vue`/`Decrement.vue`, `label/Label.vue`,
  `multi-select/MultiSelect.vue`, `command/CommandInput.vue`,
  `select/SelectGroup.vue` (compose `.glass-menu-group`) / `select/SelectLabel.vue` (KEEPS
  `text-dropdown-secondary`; inset alignment only), `switch/Switch.vue`,
  `alert`/`toggle`/`button`/`badge` CVA `text-control` bridge re-point.

**Docs**
- `CLAUDE.md` — fold the de-shadcn CANON clause.
- `docs/tranches/BG/audit/reflect/*` — the forms/controls gestalt roster row + the DELTA capture.

---

## 4. WAVE BREAKDOWN (BG.W-*)

> **Precondition W0 (WS4, not WS10):** `BG.W-DESHADCN-SWEEP` lands `proof:de-shadcn` REGISTER
> (gates.mjs + package.json + ci, atomic born-GREEN) + the 9 FORM clears + the stepper denylist teeth +
> the `--opacity-disabled-strong` / `--icon-decoration-opacity` mints + the forced-colors clear.
> **WS10 sequences strictly AFTER W0** (the verified handoff fact §0). The orchestrator resolves WS4's
> open `--opacity-disabled-strong: 0.2` two-rung ruling at W0.

### BG.W-DESHADCN-CENSUS — the complete census (EXTEND, never re-author)
EXTEND `proof:no-shadcn-default` with the deep-VOCABULARY arms (§2.1a) + the VALIDATED STATE-ARM-NEUTRAL
classifier (§2.1b, the prototype regex, 233-file zero-false-positive fixture committed) + the
menuItemVariants accent allowlist + the EXACTLY-ONE-LIST closure widen. Each forbidden token carries a
replacement target + a self-test bite; the liquid-reveal `:`-fence is preserved (classify, never
pre-strip). **Born-RED** on the ~20+ HEAD residuals. **NO new gate id. Lands ATOMIC born-GREEN AFTER W0
(R1).**
**Mechanism:** validated (74% refine). **Acceptance:** the full 233-file sweep records ZERO false
positives against the real identity arms + the liquid-reveal grammar; reds the 9 residual files / 10
token-rows + the 8 planted state-arm bites.

### BG.W-DESHADCN-TOKEN-REPLACE — the replacement sweep (clears the census)
The §2.2 reskin + the §2.3 dead-token DELETES + the focus-ring FOLD/decouple/rename + the
close-button/ToastAction `buttonVariants` folds. Toggle hover→glass-quiet well, selected→
`--glass-bg-floating-tinted` (adaptive register); close buttons → `buttonVariants({ghost,icon-sm})`;
bare radius/text/timing/opacity → tokens; dead tokens deleted; `--ring`→`--focus-ring-color` (the
3-surface decouple + the warm-hue flip ATOMIC-with-`proof:no-gray`); `.input-bar:focus-within` enrolled in
the Highlight set. Clean break, no alias. **Acceptance:** the FULL affected-gate suite green (not
build-green); each visual reskin re-earns `proof:ba-gestalt` on a FRESH non-authoring capture, BOTH modes
+ Chrome AND Safari (toggle selected legible in dark; close-hover well visible; focus ring ≥3:1).

### BG.W-TAILWIND4-IDIOM — the idiom closure (SMALL, polish)
Mint `--text-control`/`--text-control-sm` bridges + `@utility glass-blur-*`; retire the 2 arbitrary-wrap
classes; extend `proof:tailwind-v4-idiom` completeness; keep GREEN. SANCTIONED-KEEP the comma-fallback +
custom-prop-write brackets. Low investment — the idiom axis is already GREEN.

### BG.W-DESHADCN-MATERIAL — the deep iOS-27 material (the DEPTH; RICHER within the predicate)
The grouped-inset Select envelope (`.glass-menu-group` in menu.css; SelectGroup composes it; SelectLabel
KEEPS `text-dropdown-secondary` — structural envelope only, `proof:dropdown-type-scale` STAYS GREEN;
per-mode elevation-correct fill; label-bearing-group scope rule recorded) + deepen Switch capsule
material/motion + controlSize rung consistency (READ existing tokens, never re-mint) + the iOS-27 fidelity
facts (§2.5). **Acceptance:** a non-authoring judge confirms 3 separated grouped cards (the iOS reference)
in BOTH modes AND Chrome AND Safari; the full gate suite green. Carve discipline: all material lands in
CSS (menu.css) — no SFC grows past 500L. NO new gate.

### BG.W-DESHADCN-GATE — the lock + paint + canon (the close)
Lock the extended `proof:no-shadcn-default` GREEN; confirm the WS4 `proof:de-shadcn` GREEN precondition;
run the FULL affected-gate suite; enroll the forms/controls gestalt roster + run the binding π (six-state
matrix, both modes + Chrome AND Safari + the forced-colors outline arm, non-authoring judge); fold the
CLAUDE.md de-shadcn CANON. The "gate locks it born-RED→GREEN" + real-paint half of the convergence bar.

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

1. **Source-gate GREEN:** the extended `proof:no-shadcn-default` (deep vocab + state-arm) GREEN over all
   233 ui/ files; its self-test reds each planted residual (8 state-arm + the deep-vocab bites) AND the
   committed 233-file zero-false-positive fixture passes; the EXACTLY-ONE-LIST closure passes.
   `proof:de-shadcn` (WS4) GREEN. `proof:tailwind-v4-idiom` GREEN with the new bridge family.
2. **No regression — the FULL affected-gate suite, not build-green (cardinal lesson):**
   `proof:dropdown-type-scale`, `proof:glass-cohesion`, `proof:no-layout-animation`, `proof:no-gray`,
   `proof:menu-glass`, `proof:control-tokens`, `proof:squircle-language` (re-anchored) stay GREEN.
3. **The binding paint (the bar — headless-green is NOT acceptance):** a FRESH per-surface capture by a
   NON-AUTHORING judge over each reskinned control's six-state matrix, in **BOTH modes AND Chrome AND
   Safari**, asserting the glass/paper material resolves (getComputedStyle oklab paint-arm) — NOT a
   shadcn-neutral token. Specifically: the floating-tinted selected toggle reads distinctly-selected with a
   legible glyph in DARK; the close-hover well is visible over the 0.68 `--glass-bg-dialog` plate; the
   grouped-inset Select reads as 3 SEPARATED correctly-elevated cards (iOS reference); the folded focus ring
   clears WCAG 1.4.11 (3:1) over cream + L16 dark. A `@media (forced-colors:active)` arm asserts non-`none`
   focus outline (`.input-bar:focus-within` + every carrier in the Highlight set). `proof:ba-gestalt` per-band
   VERDICT (forms + feedback + containers + navigation) PASS on the fresh capture.
4. **reka inviolate (e2e-paint, the silent-no-op trap):** the toggle `data-[state=on]` actually PAINTS the
   new selected register at runtime; TagsInputRoot `data-disabled` + ToggleGroup `aria-checked`/`data-state`
   verified by live capture, not a class string.
5. **Budget:** `dist/styles/index.css` stays under gzip 140_000 (DRIFT_CEIL 0.10); any conscious rebase is
   sized + commented (the 9-prior-lift discipline). The root barrel critical-path-walk stays clean.

---

## 6. FOLDED / DEFERRED ITEMS

- **The 4 candidate-wave names RE-SCOPED + a 5th added:** `BG.W-DESHADCN-CENSUS` → EXTEND-in-place;
  `BG.W-DESHADCN-TOKEN-REPLACE` → the non-form residual sweep + dead-token deletes + the focus-ring
  decouple + the `buttonVariants` folds; `BG.W-TAILWIND4-IDIOM` → SHRUNK to the 2 genuine bridge mints;
  `BG.W-DESHADCN-GATE` → the lock/paint/canon close (NOT a new gate — the no-4th-design trap); **+
  `BG.W-DESHADCN-MATERIAL`** added for the grouped-inset Select DEPTH.
- **The mono-caption section voice for the picker family** (composing `.glass-menu-section` onto the four
  family labels) is DEFERRED — it is a register change across SelectLabel/DropdownMenuLabel/ComboboxGroup/
  CommandGroup IN LOCKSTEP + a sized/commented re-point of `proof:dropdown-type-scale`. This wave keeps the
  governed `text-dropdown-secondary` rung; the grouped-inset LOOK is the structural envelope only.
- **`.glass-menu-group` extension to the other label-bearing families** (DropdownMenuGroup/ContextMenuGroup)
  is the orchestrator's THIS-WAVE-or-BOOK call; the label-bearing-group ⇒ inset rule is RECORDED either way.
- **The 9 FORM-control clears + the gate register stay WS4** (the no-double-build fence). WS10 CONSUMES them
  as the W0 precondition.
- **The non-form per-control STATE-COVERAGE archetype matrix** (overlay/feedback/disclosure/tabular rows) is
  BOOKED, not built: the §2.1 vocabulary + state-arm census already satisfies "no default leak on ANY
  component," and minting decidable state matrices for the 32 non-form families risks contrivance. A future
  wave adds the archetype rows IFF a real coverage gap is found.
- **The dark `--ring` warm-hue flip** is GATED + ATOMIC with `proof:no-gray`; if it reds, the warm flip is
  BOOKED (the rename + fold + decouple + deletes land regardless).
- **`--opacity-disabled` declared twice** (literals.css:61 + scale-paper.css:79) is the documented v4
  "@theme can't self-reference a tokens.css twin" pattern — KEEP, lockstep, not a bug.

---

## 7. OPEN RISKS

- **R1 — WS4 must land W0 first (verified, not assumed).** `proof:de-shadcn` is ABSENT from HEAD — there is
  no committed CI break, but committing WS10's `ci`-tagged census-extend arms born-RED ahead of WS4's clear
  IS a self-inflicted break. The census-extend arms + the token-replace clears land ATOMIC born-GREEN, AFTER
  W0. The orchestrator resolves the `--opacity-disabled-strong` ruling at W0.
- **R2 — the state-arm classifier (DE-RISKED by the prototype).** The neutral-vs-identity split + the
  one-file accent allowlist ran the full 233-file tree → ZERO false positives, born-RED on exactly the 9
  residuals. The committed fixture locks it; the `:`-fence stays intact (classify, never pre-strip).
- **R3 — the headless-green/visually-broken trap (shipped 3×).** The grouped-inset Select + the
  toggle/close reskins + the focus-ring fold MUST fresh-capture-verify by a NON-AUTHORING judge in Chrome
  AND Safari, both modes. The build-green/gate-red gap is closed by running the FULL affected-gate suite at
  the close, not vue-tsc+build alone. **This is the principal unconverged frontier — the rulings are on
  paper, the paint is owed at development.**
- **R4 — the focus-ring FOLD cascades library-wide** through `--focus-ring-shadow` + the 7-read rename +
  the 3-surface decouple + the dark warm-hue + the forced-colors Highlight set. A miss ships
  keyboard-focus-invisible in WHC, reds `proof:no-gray`, or breaks dark native-control accent / the preset
  crown. The decouple + the ATOMIC-with-no-gray gating + the full Highlight-set enrollment + the
  3-surface ba-gestalt mitigate it.
- **R5 — Safari floor.** If the deep material reaches for `.glass-lens`/`backdrop-filter:url()` it hits
  WebKit bug 245510 — it must stay `@supports`-gated with the un-gated blur+tint as the Safari legibility
  floor; never load-bearing for legibility. The grouped-inset prototype confirmed Safari-safe DEPTH (no
  `backdrop-filter:url()`). The "both modes" bar is light/dark — Safari capture is an EXPLICIT spec fence.
- **R6 — carve ratchet (RATCHET_BASELINES==∅).** The deep material lands CSS-side (menu.css); any SFC
  approaching 500L carves into a colocated sub-dir as it grows.
