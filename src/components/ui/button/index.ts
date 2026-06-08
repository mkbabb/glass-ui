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
  // its own slightly-softer `active:scale-[var(--scale-press-btn)]` (0.97) — the
  // utility-layer scale value wins over `.tap-squish`'s default `--scale-press`
  // (0.96); only the spring TRANSITION channel is shared. ONE press source.
  //
  // AW.W26 — the modern shadcn-2025 icon-sizing idiom: an un-sized child `<svg>`
  // resolves `size-4`, every `<svg>` is non-shrinking + pointer-transparent. The
  // `:not([class*='size-'])` guard means a host-sized icon (`size-9`/`size-10`)
  // keeps its own size — `cn()`'s `/^size-/` deduplicator never collides them.
  // The `gap` already rides `.btn-pill` (0.375rem).
  'btn-pill tap-squish focus-ring whitespace-nowrap text-sm font-medium cursor-pointer active:scale-[var(--scale-press-btn)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 aria-pressed:bg-primary/85',
        // AX.W52 — the hover lift is the restrained `--scale-hover-btn` (1.035),
        // not the emphatic `--scale-hover` (1.08); routed through `--spring-smooth`
        // via the `.btn-pill` base scale transition, the lift reads as ONE coherent
        // glide with the surface cross-fade rather than a mechanical pop.
        'primary-audacious':
          'btn-audacious bg-primary text-primary-foreground hover:scale-[var(--scale-hover-btn)] aria-pressed:scale-[var(--scale-press-btn)]',
        // AW.W13 — rest text is the warm-ink `--foreground`, NOT `text-white`:
        // the `btn-audacious-gold` REST substrate is an 8%-gold-tint over glass
        // (near-cream in light mode), so white-on-cream was sub-legible. Light
        // text is reserved for hover/active, where the gold sweep darkens the
        // backplate enough to clear contrast.
        'gold-audacious':
          'btn-audacious btn-audacious-gold text-foreground hover:text-white active:text-white aria-pressed:text-white hover:scale-[var(--scale-hover-btn)] aria-pressed:scale-[var(--scale-press-btn)]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 aria-pressed:bg-destructive/85',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80 aria-pressed:bg-accent aria-pressed:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 aria-pressed:bg-secondary/60',
        accent:
          'bg-accent text-accent-foreground border border-border/40 hover:bg-accent/80 active:bg-accent/70 aria-pressed:bg-accent/60',
        ghost:
          'bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground',
        // AW.W22 — glass / glass-wash inherit the moving specular + edge rim
        // from the unified `.glass-material` mixin via the `glass-wash` ladder
        // rung they already compose (the per-component `glass-specular-track`
        // opt-in is retired onto the ladder). The pointer write seam is still
        // the consumer's (a pointermove handler writing --mouse-x/--mouse-y);
        // without it the var() fallback paints a centred catch-light.
        // AX.W52 — `.btn-glass` re-points the backdrop off the wash-tile 1px blur
        // onto `--glass-blur-btn` (the real 10px quiet-tier glass blur), so the
        // glass button variants actually READ as liquid glass (live readback found
        // them at a negligible blur(1px)). The wash TILE tier keeps its 1px.
        glass:
          'glass-wash btn-glass text-foreground hover:bg-[var(--glass-bg-resting)] hover:border-[var(--glass-border-resting)] active:bg-[var(--glass-bg-floating)] active:border-[var(--glass-border-floating)] aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]',
        'glass-wash':
          'glass-wash btn-glass text-foreground/70 hover:bg-foreground/[0.04] hover:border-[var(--surface-tint-22)] hover:text-foreground active:bg-foreground/[0.08] aria-pressed:bg-foreground/[0.1] aria-pressed:text-foreground',
        ai: 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 active:bg-amber-500/35 dark:text-amber-400 aria-pressed:bg-amber-500/30',
        link: 'text-primary underline-offset-4 hover:underline active:opacity-80 active:scale-100',
      },
      size: {
        // AW.W26 — `has-[>svg]:px-3` tightens the horizontal padding when the
        // button hosts an icon (icon+label), matching the shadcn-2025 size
        // idiom; the icon-only sizes stay `p-0`.
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        xs: 'h-7 rounded-pill px-2 text-xs',
        sm: 'h-9 rounded-pill px-3',
        lg: 'h-11 rounded-pill px-8 has-[>svg]:px-5',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-7 w-7 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
