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
        default:
          'glass-wash btn-glass glass-deep text-foreground hover:bg-(--glass-bg-resting-tinted) hover:border-(--glass-border-resting) active:bg-(--glass-bg-floating-tinted) active:border-(--glass-border-floating) aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting-tinted))]',
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
        'primary-audacious':
          'glass-wash btn-glass glass-deep text-foreground hover:bg-(--glass-bg-resting-tinted) hover:border-(--glass-border-resting) active:bg-(--glass-bg-floating-tinted) active:border-(--glass-border-floating) aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting-tinted))] hover:scale-(--scale-hover-btn) aria-pressed:scale-(--scale-press-btn)',
        // BA.W-GLASS-CAL (H2a) — `gold-audacious` keeps the STATIC warm-gold tint (the
        // at-rest 8%-gold linear-gradient wash over the glass surface, the AW.W13
        // rest-text contract: rest text is the warm-ink `--foreground`) + the
        // `--glass-specular` edge catch-light, MINUS the animated gold sweep + sparkle.
        // The static wash + edge catch-light is hinge H2 arm (a): gold survives CALM.
        // The gold tint rides a `background-image` over the `btn-glass` backdrop.
        'gold-audacious':
          'glass-wash btn-glass text-foreground bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-gold)_10%,transparent),color-mix(in_srgb,var(--color-gold-light)_6%,transparent)_50%,color-mix(in_srgb,var(--color-gold)_10%,transparent))] hover:bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-gold)_16%,transparent),color-mix(in_srgb,var(--color-gold-light)_10%,transparent)_50%,color-mix(in_srgb,var(--color-gold)_16%,transparent))] hover:scale-(--scale-hover-btn) aria-pressed:scale-(--scale-press-btn)',
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
        outline:
          'glass-wash btn-glass text-foreground border-(--glass-border-floating) hover:bg-(--glass-bg-quiet-tinted) hover:border-(--glass-border-resting) active:bg-(--glass-bg-resting-tinted) active:border-(--glass-border-floating) aria-pressed:bg-(--glass-bg-resting-tinted)',
        // `secondary` — a quiet glass tier (the subordinate glass register).
        secondary:
          'glass-wash btn-glass text-foreground hover:bg-(--glass-bg-quiet-tinted) hover:border-(--glass-border-resting) active:bg-(--glass-bg-resting-tinted) aria-pressed:bg-(--glass-bg-resting-tinted)',
        // `accent` — the glass tier with a faint warm rim (a notch warmer than secondary).
        accent:
          'glass-wash btn-glass text-foreground border-(--glass-border-resting) hover:bg-(--glass-bg-resting-tinted) hover:border-(--glass-border-floating) active:bg-(--glass-bg-floating-tinted) aria-pressed:bg-(--glass-bg-resting-tinted)',
        ghost:
          'bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground',
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
        glass:
          'glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting-tinted) hover:border-(--glass-border-resting) active:bg-(--glass-bg-floating-tinted) active:border-(--glass-border-floating) aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting-tinted))]',
        'glass-wash':
          'glass-wash btn-glass text-foreground/70 hover:bg-foreground/[0.04] hover:border-(--surface-tint-22) hover:text-foreground active:bg-foreground/[0.08] aria-pressed:bg-foreground/[0.1] aria-pressed:text-foreground',
        ai: 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 active:bg-amber-500/35 dark:text-amber-400 aria-pressed:bg-amber-500/30',
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
