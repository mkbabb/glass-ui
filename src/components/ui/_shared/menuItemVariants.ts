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
 */
export const menuItemVariants = cva(
    [
        "interactive-item",
        "relative flex w-full cursor-default select-none items-center",
        "text-sm outline-none",
        // Hover/focus/data-highlighted accent triad — paints the same surface
        // across pointer, keyboard, and reka-ui's internal highlight.
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        // Sub-trigger open state (DropdownMenuSubTrigger consumer).
        "data-[state=open]:bg-accent",
        // Disabled — explicit data-[disabled]: selectors. The `.interactive-item`
        // utility paints these via its CSS rule; the explicit Tailwind selectors
        // here are belt-and-suspenders so the contract is visible at the call
        // site and survives any future substrate refactor.
        "data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
    ].join(" "),
    {
        variants: {
            // Indicator-slot gutter. `none` is the default (no indicator);
            // `start` reserves 1.75rem (28px, pl-7); `start-wide` reserves
            // 2rem (32px, pl-8 for checkbox/radio-in-context-menu + inset
            // dropdown items).
            indicator: {
                none: "px-2",
                start: "pl-7 pr-2",
                "start-wide": "pl-8 pr-2",
            },
            // Vertical rhythm. `comfortable` is the default (py-1.5).
            // `audacious` matches the dock-tier audacious density rail (py-2.5).
            density: {
                comfortable: "py-1.5",
                audacious: "py-2.5",
            },
        },
        defaultVariants: {
            indicator: "none",
            density: "comfortable",
        },
    },
);

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
