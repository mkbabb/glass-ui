import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  // Base: compose with btn-pill from glass.css.
  // Four-state contract enforced per variant below; shared base locks down
  // focus-visible ring, disabled geometry, and press scale via tokens.
  'btn-pill focus-ring whitespace-nowrap text-sm font-medium cursor-pointer active:scale-[var(--scale-press-btn)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 aria-pressed:bg-primary/85',
        'primary-audacious':
          'btn-audacious bg-primary text-primary-foreground hover:scale-[var(--scale-hover)] aria-pressed:scale-[var(--scale-press-btn)]',
        // AW.W13 — rest text is the warm-ink `--foreground`, NOT `text-white`:
        // the `btn-audacious-gold` REST substrate is an 8%-gold-tint over glass
        // (near-cream in light mode), so white-on-cream was sub-legible. Light
        // text is reserved for hover/active, where the gold sweep darkens the
        // backplate enough to clear contrast.
        'gold-audacious':
          'btn-audacious btn-audacious-gold text-foreground hover:text-white active:text-white aria-pressed:text-white hover:scale-[var(--scale-hover)] aria-pressed:scale-[var(--scale-press-btn)]',
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
        // glass / glass-wash opt into the AV.W15 moving specular — the
        // pointer-anchored catch-light (reduced-motion-static, var()-centred
        // fallback) rides the glass surface. The pointer write seam is the
        // consumer's (a pointermove handler writing --mouse-x/--mouse-y);
        // without it the var() fallback paints a centred catch-light.
        glass:
          'glass-wash glass-specular-track text-foreground hover:bg-[var(--glass-bg-resting)] hover:border-[var(--glass-border-resting)] active:bg-[var(--glass-bg-floating)] active:border-[var(--glass-border-floating)] aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]',
        'glass-wash':
          'glass-wash glass-specular-track text-foreground/70 hover:bg-foreground/[0.04] hover:border-[var(--surface-tint-22)] hover:text-foreground active:bg-foreground/[0.08] aria-pressed:bg-foreground/[0.1] aria-pressed:text-foreground',
        ai: 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 active:bg-amber-500/35 dark:text-amber-400 aria-pressed:bg-amber-500/30',
        link: 'text-primary underline-offset-4 hover:underline active:opacity-80 active:scale-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 rounded-pill px-2 text-xs',
        sm: 'h-9 rounded-pill px-3',
        lg: 'h-11 rounded-pill px-8',
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
