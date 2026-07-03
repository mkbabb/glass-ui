import { type VariantProps, cva } from "class-variance-authority";

/**
 * `menuItemVariants` — canonical CVA shared by 9 menu-family + picker-family
 * primitives. Promotes the four-state contract (hover / focus / data-highlighted /
 * data-disabled) above reka-ui's base classes so consumer-side overrides win
 * via `cn()`'s tailwind-merge ordering.
 *
 * Substrate composition:
 * - `interactive-item` (utilities.css) provides `border-radius: var(--radius-lg)`,
 *   the active-scale (`:active { transform: scale(0.98); }`), the focus-visible
 *   box-shadow ring, and the `data-disabled` paint extension (V.W3 patch — the
 *   :disabled pseudo doesn't fire on reka-ui's `data-disabled="true"` attr,
 *   so utilities.css now paints both).
 *
 * Three input modes paint identical hover/focus accent:
 * - `:hover` — pointer hover.
 * - `:focus` — keyboard focus (also handled at the substrate via :focus-visible).
 * - `[data-highlighted]` — reka-ui's internal navigation highlight (Combobox /
 *   Command / Select families emit this attr instead of relying on browser focus).
 *
 * The CVA composes ABOVE reka-ui's base classes (R4 §4.2 pre-empt): consumer
 * SFCs call `menuItemVariants(...)` last in the `cn()` chain so any radius /
 * background / spacing the upstream library writes is overridden.
 *
 * Indicator slot variants reserve the gutter for radio-dot / check / chevron
 * indicator spans the consumer SFCs render absolutely-positioned.
 *
 * Surface axis (BA.W-MENU-GLASS) — the menu-row's MATERIAL register, an
 * EXPRESSION of the shared {glass·veil·opaque} surface-decoration axis
 * (`_shared/useSurfaceAxis.ts` / `glass/surface-axis.css`), NOT a second axis:
 * - `glass` (DEFAULT, glass-first canon AX.W54) — the `.glass-menu-row` recipe
 *   (`src/styles/menu.css`): the hover / focus / `data-highlighted` / open states
 *   paint the ELEMENT-LEVEL glass-quiet oklab tint (so the row darkens-over-light
 *   AND lifts-over-dark per W-DARK-MATERIAL's tint arm) + a PRM-gated `translateY`
 *   hover-lift, the 44px touch floor, the iOS-grade glassy hover-lift plate. The
 *   flat `bg-accent` utilities are DROPPED on this arm — the cascade-trap-safe
 *   shape: with no unlayered `hover:bg-accent` utility the ONLY background-painters
 *   are the `@layer components` `.interactive-item:hover` accent rule and the
 *   `.glass-menu-row` recipe (imported AFTER utilities.css so it source-order-wins
 *   at equal specificity+layer — the AZ dock-rail `@layer`-loses-to-utility trap
 *   pre-empted: never re-add an unlayered flat-accent utility here).
 * - `accent` — the EXPLICIT flat-accent escape (the prior default's look). A clean
 *   break, NOT a back-compat alias (BA inv-7): a consumer that wants the flat fill
 *   opts in via `surface="accent"`.
 */
export const menuItemVariants = cva(
    [
        "interactive-item",
        "relative flex w-full cursor-default select-none items-center",
        // AX.W50 D17 — the shared item base reads the family `--dropdown-text`
        // PRIMARY rung (via the `text-dropdown` @theme utility) instead of the raw
        // `text-sm` literal; all 13 item SFCs that compose this CVA inherit the
        // governed scale in ONE edit, and the family re-tints from one token.
        "text-dropdown outline-none",
        // Disabled — explicit data-[disabled]: selectors. The `.interactive-item`
        // utility paints these via its CSS rule; the explicit Tailwind selectors
        // here are belt-and-suspenders so the contract is visible at the call
        // site and survives any future substrate refactor.
        "data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
    ].join(" "),
    {
        variants: {
            // Material register (BA.W-MENU-GLASS) — the shared surface axis on the
            // menu band. `glass` is the DEFAULT (glass-first canon); `accent` is
            // the explicit flat-fill escape (clean break, no alias).
            surface: {
                // The `.glass-menu-row` recipe carries the hover/focus/highlight
                // glass-quiet tint + lift + the touch floor (src/styles/menu.css).
                // NO flat-accent utility here — the recipe is the sole hover paint.
                glass: "glass-menu-row",
                // The prior flat-accent triad, opt-in. Hover/focus/data-highlighted
                // paint the same surface across pointer, keyboard, and reka-ui's
                // internal highlight; the sub-trigger open state matches.
                accent: [
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                    "data-[state=open]:bg-accent",
                ].join(" "),
            },
            // Indicator-slot gutter. `none` is the default (no indicator);
            // `start` reserves 1.75rem (28px, pl-7); `start-wide` reserves
            // 2rem (32px, pl-8 for checkbox/radio-in-context-menu + inset
            // dropdown items).
            indicator: {
                none: "px-2",
                start: "pl-7 pr-2",
                "start-wide": "pl-8 pr-2",
            },
            // Vertical rhythm (BH.W-SIZE-UNIFY — the size axis, was `density`).
            // `md` is the default (py-1.5); `lg` matches the taller dock-tier rail
            // (py-2.5). A menu row is a control — the scale rung is `size`.
            size: {
                md: "py-1.5",
                lg: "py-2.5",
            },
        },
        defaultVariants: {
            surface: "glass",
            indicator: "none",
            size: "md",
        },
    },
);

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
