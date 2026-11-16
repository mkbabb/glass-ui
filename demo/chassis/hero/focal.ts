// Does this route's page run its own live canvas? Where it does, the shell keeps its
// static ground and starts no second live field. Keyed by `<category>/<story>`.
export const OWN_CANVAS_ROUTES: ReadonlySet<string> = new Set([
    "substrates/aurora",
    "substrates/blob",
    "substrates/constellation",
    "substrates/fourier-field",
    "substrates/glass-panel",
    "dock/overview",
    "dock/layers",
    "dock/sections",
    "dock/dock-search",
    "dock/cta-receive",
    "dock/controls",
    "dock/overflow",
    "dock/vertical",
    "compositions/auth-shell",
]);

export function ownsCanvas(routeId: string): boolean {
    return OWN_CANVAS_ROUTES.has(routeId);
}
