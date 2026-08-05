/** Public semantic override points, grouped by design responsibility. */
export const tokenDomains = [
    "color",
    "material",
    "type",
    "space",
    "radius",
    "shadow",
    "motion",
    "interaction",
] as const;

export type TokenDomain = (typeof tokenDomains)[number];

export const semanticTokens = {
    color: [
        "--background", "--foreground", "--primary", "--secondary",
        "--muted", "--accent", "--destructive", "--border",
    ],
    material: [
        "--glass-level", "--glass-depth", "--glass-accent", "--glass-accent-strength",
        "--glass-veil-ink", "--glass-veil-base", "--glass-veil-step",
        "--glass-saturate",
    ],
    type: [
        "--font-stack-text", "--font-stack-display", "--font-stack-mono",
        "--type-body", "--type-subheading", "--type-heading", "--type-title",
        "--type-display-1",
    ],
    space: [
        "--ui-scale", "--control-h-sm", "--control-h-md", "--control-h-lg",
        "--overlay-pad-inline", "--overlay-pad-block", "--card-pad-inline",
        "--card-pad-block",
    ],
    radius: [
        "--radius", "--radius-sm", "--radius-xl", "--radius-2xl",
        "--radius-pill", "--radius-card", "--radius-media", "--radius-button",
    ],
    shadow: [
        "--shadow-sm", "--shadow-md", "--shadow-lg", "--shadow-xl",
        "--shadow-card", "--shadow-dock", "--shadow-modal", "--focus-ring-shadow",
    ],
    motion: [
        "--duration-fast", "--duration-normal", "--duration-slow",
        "--spring-press", "--spring-present", "--spring-dock",
        "--spring-panel", "--spring-bloom", "--spring-world",
        "--ease-standard", "--ease-out",
    ],
    interaction: [
        "--touch-target", "--focus-ring-width", "--focus-ring-color",
        "--opacity-disabled", "--scale-hover", "--scale-press",
        "--glass-specular-intensity-rest", "--glass-specular-intensity-hover",
        "--glass-specular-intensity-active",
    ],
} as const satisfies Record<TokenDomain, readonly `--${string}`[]>;

export type SemanticToken = (typeof semanticTokens)[TokenDomain][number];
