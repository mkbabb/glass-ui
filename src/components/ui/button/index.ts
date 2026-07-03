import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  // Base: compose with btn-pill from glass.css.
  // Four-state contract enforced per variant below; shared base locks down
  // focus-visible ring, disabled geometry, and press scale via tokens.
  //
  // AW.W25 — `.tap-squish` carries the press scale onto the canonical spring
  // channel (`transition: scale … var(--spring-snappy)`), so the button springs
  // like the slider rather than snapping on `--ease-standard`. The button keeps
  // its own slightly-softer `active:scale-(--scale-press-btn)` (0.97) — the
  // utility-layer scale value wins over `.tap-squish`'s default `--scale-press`
  // (0.96); only the spring TRANSITION channel is shared. ONE press source.
  //
  // AW.W26 — the modern shadcn-2025 icon-sizing idiom: an un-sized child `<svg>`
  // resolves the glyph register, every `<svg>` is non-shrinking + pointer-transparent.
  // The `:not([class*='size-'])` guard means a host-sized icon (`size-9`/`size-10`)
  // keeps its own size — `cn()`'s `/^size-/` deduplicator never collides them.
  // The `gap` already rides `.btn-pill` (scaled).
  //
  // AX.W51 D18 — the control FONT + GLYPH ride the ONE `--ui-scale` comfort axis:
  // the base font reads `--control-text` (the scaled `text-sm` register — RED 3,
  // "font too small"), the un-sized glyph reads `--ui-glyph` (the scaled `size-4`
  // register — RED 4, glyph grows WITH the box), keeping the host-sized-icon escape.
  'btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] font-medium cursor-pointer active:scale-(--scale-press-btn) disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled [&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        // AX.W54 — GLASS is the DEFAULT surface register: a bare <Button> paints
        // liquid glass (resolves the same recipe as the `glass` variant below).
        // The opaque primary-fill is no longer the default — reach for `solid`.
        // BB.W-BUTTON-GLASS (a) — the hover/active fills re-point off the RAW
        // `--glass-bg-resting`/`--glass-bg-floating` rung tokens onto the ELEMENT-LEVEL
        // oklab-TINTED pair (`--glass-bg-*-tinted`, surfaces.css), which wraps each rung
        // in the SAME `color-mix(in oklab, …, --glass-tint-source --glass-tint-strength)`
        // seam the REST bg `.glass-wash` composes. So the W55 adaptive darken + the
        // `contrast-color()` flip + the content-tier floor reach the LIT surface too —
        // the lit button stays AA over a bright backdrop (the substitution-vs-inheritance
        // trap closed on the button register). The `aria-pressed` toggle fill re-points
        // onto the tinted base too (the pressed register stays legible over bright).
        // BC.W-BUTTON-GLASS-IOS (move 2 / BG-IOS-2) — the hero CTA reaches DEEP
        // glass (the maximal iOS register, the apple.com-nav-grade material over
        // craft). `.glass-deep` is the ONE consolidated depth axis (BC.W-GLASS-PRUNE);
        // the button COMPOSES it (the `.btn-glass.glass-deep` arm in surfaces.css re-
        // points `--glass-blur-btn` onto `--glass-blur-deep`, the SAME token-substitution
        // model `.glass-deep` uses for `--glass-blur-floating` — no new compositing
        // axis, no button-local lens). The deep BLUR is budget-FREE (the W-LENSING
        // one-deep-REFRACTIVE-register-per-route budget binds the `:liquid` SVG lens,
        // NOT the deep-blur tier — several deep-glass CTAs are fine, only one `:liquid`
        // lens per route).
        // BD.W-BUTTON-GLASS-CONSUME — the gray dies at the SOURCE. The inline
        // near-gray `hover:bg-*`/`active:bg-*`/`aria-pressed:bg-*` fill chains +
        // the per-variant `hover:scale-*` are DELETED (clean break, no alias) and
        // the variant COMPOSES the ONE shared `.glass-capsule` (the warm-floor lit
        // lozenge fill + rim + lift, glass/glass-capsule.css) + `.glass-capsule-hover`
        // (the specular catch-light bloom + 1.5% scale lift + press-snap). `.glass-wash`
        // STAYS — it is the moving-specular `::before` gleam carrier the `v-specular`
        // directive writes to (material.css `.glass-wash::before`) + the
        // `--glass-specular-intensity-hover` bump; the capsule owns no `::before`.
        // `.btn-glass` STAYS — it is the single backdrop owner (`--glass-blur-btn`,
        // the A7 double-backdrop resolve) + the depth rim/under-shadow; `.glass-deep`
        // re-points it to `--glass-blur-deep` (the apple.com-nav-grade hero blur). The
        // capsule's warm fill wins over `.glass-wash`'s background by source order
        // (glass-capsule.css @import-s after material.css). The variant KEY is a public
        // contract — kept; only the class strings collapse. Buttons own NO material.
        // BG.W-GLASS-BLUR-PEER — the bare `default` button is DEMOTED off `glass-deep`
        // onto the ONE unified 8px material (dock·button·default-Card·menu-row resolve the
        // SAME `blur(8px)` resting peer — `.btn-glass` reads `--glass-blur-btn`, now an
        // alias of `--glass-blur-resting`/8px). The maximal apple.com-nav-grade DEEP
        // refraction is the HERO register only — `primary-audacious` (and any explicit
        // `<Button :liquid>`/`glass-deep` opt-in) KEEPS `glass-deep`; the calm default is
        // ONE glass with the dock + the content card, never a per-button deeper-than-the-
        // panel slab. The `.btn-glass.glass-deep` arm (surfaces.css) still re-points
        // `--glass-blur-btn` → `--glass-blur-deep` for the hero (no recipe change).
        default:
          'glass-wash btn-glass glass-capsule glass-capsule-hover text-foreground',
        // BA.W-GLASS-CAL (H2a) — the disco RETIRED. `primary-audacious` collapses
        // onto the calm glass-first register: the `glass-wash btn-glass` surface (the
        // real 10px glass blur + the `--glass-specular` edge catch-light gleam from
        // the glass-material mixin the `glass-wash` rung composes), hover/press on the
        // §6 doctrine (surface→`--ease-standard`, scale→`--spring-smooth` via the
        // `.btn-pill` base). No sparkle, no disco-grain, no ripple. The variant KEY is
        // kept + re-pointed so every `variant="primary-audacious"` call site inherits
        // the calm register with no rename. Distinguished from bare `default`/`glass`
        // by the `--scale-hover-btn` lift (it reads as a deliberate primary CTA).
        // BB.W-BUTTON-GLASS (a) — same oklab-tinted hover/active re-point as `default`.
        // BC.W-BUTTON-GLASS-IOS (BG-IOS-2) — the hero CTA on the deep-glass register
        // (see `default` above); the `--scale-hover-btn` lift still distinguishes it as
        // the deliberate primary CTA.
        // BD.W-BUTTON-GLASS-CONSUME — the hero CTA on the SHARED capsule + the
        // opt-in `.btn-punch` cartoon tier (default-on, §4b). The special 1.05
        // `--scale-hover-btn` is DROPPED — `primary-audacious` reads as the hero via
        // the deep blur (`glass-deep`) + the PUNCH (anticipation + over-inflation +
        // moving inked cast), not a one-off hover scale; the universal
        // `.glass-capsule-hover` lift applies. `.btn-punch` (btn.css) re-targets the
        // press at the louder fenced amplitude + composes the BD.W-CARTOON-CASTER
        // inert cast (emitted by Button.vue).
        'primary-audacious':
          'glass-wash btn-glass glass-deep glass-capsule glass-capsule-hover btn-punch text-foreground',
        // BD.W-BUTTON-GLASS-CONSUME — the static `background-image` gold PLATE is
        // DELETED (clean break, no alias). The gold now reads in the GLEAM, not a flat
        // gradient slab: `--glass-accent: var(--color-gold)` drives the catch-light core
        // (material.css `--glass-specular-core` OKLab-mixes toward `--glass-accent` at
        // `--glass-accent-strength`), so the warm-gold reads in the specular core + the
        // rim glint where the pointer grazes — a gold lit lozenge, not a plate. The
        // shared warm-floor capsule is the base; `.btn-punch` (default-on) gives the
        // hero CTA its cartoon weight. `--glass-accent-strength` lifts the accent off
        // the dormant default so the gold actually reads.
        'gold-audacious':
          'glass-wash btn-glass glass-capsule glass-capsule-hover btn-punch text-foreground [--glass-accent:var(--color-gold)] [--glass-accent-strength:32%]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 aria-pressed:bg-destructive/85',
        // BC.W-BUTTON-GLASS-IOS (move 7 / BG-IOS-6 — the de-shadcn A6 reskin). The
        // `outline`/`secondary`/`accent` triplet was the un-reskinned shadcn-neutral
        // tail (`border-input bg-background`/`bg-secondary`/`bg-accent`). They re-point
        // onto the GLASS register — the EXISTING house material vocabulary (the
        // `glass-wash btn-glass` glass well + the warm `--glass-border-*` rim + the
        // `.focus-ring` warm halo the base already carries), NO new register (KISS /
        // BC.W-DESHADCN §"no new register"). Prominence-by-TINT not by slab: these read
        // a QUIETER glass than the `default`/`primary-audacious` hero CTAs (which carry
        // `glass-deep`), so the hierarchy holds (the apple.com/Apple-OS "prominence =
        // tint, not size" rule, research/apple-glass.md §3.3). Clean break — the shadcn-
        // neutral classes DELETED, no alias; the variant KEYS stay (a visual upgrade, no
        // public-prop break). reka behavior is INVIOLATE (only the class strings reskin).
        // `outline` is the glass-WELL: the quiet glass tier + the warm rim, the lit-
        // control hover deepening toward the resting rung.
        // BD.W-BUTTON-GLASS-CONSUME — the de-shadcn quiet triplet composes the SHARED
        // capsule (the gray inline `hover:bg-*`/`active:bg-*` chains DELETED). Prominence
        // by TINT not slab: NO `glass-deep` (they stay at `--glass-blur-btn`, quieter
        // than the hero's `--glass-blur-deep`), and `--glass-capsule-fill` is set to the
        // QUIET tinted rung — the forward-compat selected/fill knob the AUGMENT-1 A6
        // capsule token-expose consumes (a clean no-op until the capsule reads it; the
        // ONE source, no fork). The warm rim/border stays via `--glass-border-*`.
        outline:
          'glass-wash btn-glass glass-capsule glass-capsule-hover text-foreground border-(--glass-border-floating) [--glass-capsule-fill:var(--glass-bg-quiet-tinted)]',
        // `secondary` — a quiet glass tier (the subordinate glass register).
        secondary:
          'glass-wash btn-glass glass-capsule glass-capsule-hover text-foreground [--glass-capsule-fill:var(--glass-bg-quiet-tinted)]',
        // `accent` — the glass tier with a faint warm rim (a notch warmer than secondary).
        accent:
          'glass-wash btn-glass glass-capsule glass-capsule-hover text-foreground border-(--glass-border-resting) [--glass-capsule-fill:var(--glass-bg-quiet-tinted)]',
        // BD.W-BUTTON-GLASS-CONSUME — `ghost` stays INK-first at rest (transparent,
        // no glass plate — the quietest tier) but composes `.glass-capsule-hover` so
        // even the quietest button answers the "better hover" ask with the universal
        // scale lift (the specular bloom is inert without a glass `::before`, by design;
        // the ink-bg hover carries the affordance). KEEP the four-state ink chain.
        ghost:
          'glass-capsule-hover bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground',
        // AW.W22 — glass / glass-wash inherit the moving specular + edge rim
        // from the unified `.glass-material` mixin via the `glass-wash` ladder
        // rung they already compose (the per-component `glass-specular-track`
        // opt-in is retired onto the ladder).
        // BB.W-LIQUIDHOVER — the pointer write AUTO-ARMS at the tier root: Button.vue
        // applies the `v-specular` directive on the glass-register variants, so a bare
        // `<Button variant="glass">` gleams pointer-following with ZERO consumer wiring
        // (the dead-centre 50% static fallback fixed — no more "the position is the
        // consumer's"). The directive wraps the ONE position-write core; no per-call-
        // site `@pointermove`/`useSpecularTracking` triplet survives.
        // AX.W52 — `.btn-glass` re-points the backdrop off the wash-tile 1px blur
        // onto `--glass-blur-btn` (the real 10px quiet-tier glass blur), so the
        // glass button variants actually READ as liquid glass (live readback found
        // them at a negligible blur(1px)). The wash TILE tier keeps its 1px.
        // BB.W-BUTTON-GLASS (a) — same oklab-tinted hover/active re-point as `default`.
        // BD.W-BUTTON-GLASS-CONSUME — `glass` is the mid-prominence glass register
        // (the `default` recipe minus `glass-deep` — calmer blur). Composes the SHARED
        // capsule; the inline gray fill chains DELETED.
        glass:
          'glass-wash btn-glass glass-capsule glass-capsule-hover text-foreground',
        'glass-wash':
          'glass-wash btn-glass text-foreground/70 hover:bg-foreground/[0.04] hover:border-(--surface-tint-22) hover:text-foreground active:bg-foreground/[0.08] aria-pressed:bg-foreground/[0.1] aria-pressed:text-foreground',
        // BD.W-BUTTON-GLASS-CONSUME — `ai` joins the SHARED glass register with an
        // AMBER accent in the gleam (the prior opaque `bg-amber-500` palette fills
        // DELETED). The amber reads in the catch-light core + rim glint (the same
        // accent axis `gold-audacious` uses), not a flat amber slab. The accent is a
        // warm oklch (build-trap-(d) safe — a warm color, never bare `transparent`).
        // BG.W-DESHADCN — the label ink de-shadcns off the raw-tailwind
        // `text-amber-700 dark:text-amber-400` palette onto the token-first
        // per-mode `--accent-ai-ink` register (tokens/glass.css light /
        // dark-arm.css dark) — one identity token, mode-adaptive by the cascade,
        // no raw-palette utility. The glass warmth carries the surface.
        ai: 'glass-wash btn-glass glass-capsule glass-capsule-hover text-(--accent-ai-ink) [--glass-accent:oklch(0.78_0.14_75)] [--glass-accent-strength:34%]',
        link: 'text-primary underline-offset-4 hover:underline active:opacity-80 active:scale-100',
      },
      size: {
        // AW.W26 — `has-[>svg]:px-3` tightens the horizontal padding when the
        // button hosts an icon (icon+label), matching the shadcn-2025 size
        // idiom; the icon-only sizes stay `p-0`.
        // AX.W51 D18 — the control HEIGHT rungs read the `--control-h-*` cohort
        // (the scaled h-7/h-9/h-10/h-11 register, each `max(scaled, --control-floor)`
        // with the WCAG-44px coarse clamp) instead of the raw `h-N` literal, so the
        // height grows on the ONE comfort axis. The `xs` rung's quieter font reads
        // `--control-text-sm` (the scaled `text-xs` register).
        default: 'h-(--control-h-md) px-4 py-2 has-[>svg]:px-3',
        xs: 'h-(--control-h-xs) rounded-pill px-2 text-[length:var(--control-text-sm)]',
        sm: 'h-(--control-h-sm) rounded-pill px-3',
        lg: 'h-(--control-h-lg) rounded-pill px-8 has-[>svg]:px-5',
        icon: 'h-(--control-h-md) w-(--control-h-md) p-0',
        'icon-sm': 'h-(--control-h-xs) w-(--control-h-xs) p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
