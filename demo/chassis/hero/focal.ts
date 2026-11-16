// Does this route's page run its own live canvas? Where it does, the shell keeps its
// static ground and starts no second live field. Keyed by `<category>/<story>`.
export const OWN_CANVAS_ROUTES: ReadonlySet<string> = new Set([
    "substrates/aurora",
    "substrates/blob",
    "substrates/constellation",
    "substrates/fourier-field",
    "foundations/paper-glass",
    "display/surface",
    "compositions/auth-shell",
]);

/** Every dock page's stage carries its own field, so the shell's stands down. */
export function ownsCanvas(routeId: string): boolean {
    return routeId.startsWith("dock/") || OWN_CANVAS_ROUTES.has(routeId);
}
