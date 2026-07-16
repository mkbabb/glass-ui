// Route-focal resolver for the one-GL-per-route law.
//
// A route is FOCAL when it owns its OWN route-dominant GL field — and on a focal
// route the shell `<Aurora>` (AppShell.vue) is SUPPRESSED, so exactly ONE GL
// context is mounted per route (the never-2-contexts law on Safari's per-window
// GL budget). The signal is derived from TWO declarative sources, UNIFIED behind
// ONE resolver — NOT an AST/import-graph walk (which conflates a CONTAINED
// specimen aurora inside a card with a page-DOMINANT field), NOT a hand-list:
//
//   1. the route's resolved `background.kind` ∈ GL_BG_KINDS — the page's
//      full-bleed field IS a live GL substrate (glass-material, constellation, …).
//      `StoryHero.vue` mounts that field; the shell stands down.
//   2. the route ∈ SELF_STAGES_GL — it mounts its route-dominant canvas OUTSIDE
//      the background channel (the sole Aurora studio, DockStage stories, or auth).
//
// Contained specimens (buttons.vue, card.vue mount an aurora INSIDE a rounded
// card) carry a NON-GL `background.kind` and are NOT in SELF_STAGES_GL → NOT focal
// → the shell field correctly stays behind their card.

import type { StoryBackground } from "./aurora-hero";

/** The full-bleed page-field kinds that ARE a live GL substrate. A route whose
 *  resolved `background.kind` is one of these owns its own GL field.
 *
 * Fourier remains a contained teaching substrate, not a page-background kind. */
export const GL_BG_KINDS: ReadonlySet<string> = new Set([
    "aurora",
    "constellation",
    "liquid-grid",
]);

/** The GL field kinds that carry the WARM-CREAM identity themselves — a CHROMATIC
 *  full-bleed field that REPLACES the shell warm aurora (nothing warm needs to sit
 *  behind it). The achromatic line-art overlay (`constellation`) is DELIBERATELY
 *  EXCLUDED: it is grey line-art with no warm identity, so the shell warm field must
 *  stay behind it as an UNDERPAINT (warm cream in light, luminous warm dark in dark).
 *  This is distinct
 *  from `GL_BG_KINDS` (the one-GL owns-a-field enumeration): a constellation hero is
 *  FOCAL (owns a GL field) yet does NOT suppress the shell (keeps the warm
 *  underpaint). */
export const CHROMATIC_FIELD_KINDS: ReadonlySet<string> = new Set([
    "aurora",
    "liquid-grid",
]);

/** Routes that mount a route-DOMINANT GL canvas OUTSIDE the `background` channel,
 *  including the sole Aurora studio and dock-over-live-field stories. Keyed by
 *  the route id (`<category>/<story>`). Every route-dominant canvas belongs here,
 *  including self-staged Aurora and dock stories. */
export const SELF_STAGES_GL: ReadonlySet<string> = new Set([
    // The Aurora studio is itself the route-dominant field. Its hero is a quiet
    // paper wash so the interactive stage remains the route's sole GPU owner.
    "substrates/aurora",
    "dock/overview",
    "dock/layers",
    "dock/sections",
    "dock/dock-search",
    "dock/cta-receive",
    // Controls and overflow wrap DockStage to demonstrate a dock over a live field.
    "dock/controls",
    "dock/overflow",
    "dock/rail",
    // The auth-shell composition mounts its own
    // route-representative GL field (the purple→tomato brand-panel <Aurora>) OUTSIDE the
    // `background` channel, so the recessive shell aurora stands down: the brand aurora is
    // the route's ONE GL context (the page declares a zero-GL `grid` wash). This is the
    // composition analogue of a DockStage route — a self-staging GL page that is NOT a
    // `<DockStage>` route.
    "compositions/auth-shell",
]);

/** Resolve a `StoryBackground` (string shorthand or `{kind}` object) to its kind. */
export function backgroundKind(bg: StoryBackground | undefined): string | undefined {
    if (bg === undefined) return undefined;
    return typeof bg === "string" ? bg : bg.kind;
}

/**
 * Is this route FOCAL (owns its own route-dominant GL → the shell aurora stands
 * down)? `routeId` is `<category>/<story>` (or `<category>` for a section landing);
 * `bg` is the route's resolved background descriptor.
 */
export function isFocalRoute(
    routeId: string,
    bg: StoryBackground | undefined,
): boolean {
    const kind = backgroundKind(bg);
    return (kind !== undefined && GL_BG_KINDS.has(kind)) || SELF_STAGES_GL.has(routeId);
}

/**
 * Does this route SUPPRESS the shell `<Aurora>` warm field? DISTINCT from
 * `isFocalRoute` (owns-a-GL-field, one-GL enumeration): the shell stands down IFF
 * the mounted field ITSELF carries the warm-cream identity and so REPLACES it —
 * i.e. a CHROMATIC field (aurora, liquid-grid) on a page that actually MOUNTS it,
 * OR a self-staging route. Two gates on the GL-background arm:
 *
 * the suppression is of the LIVE field ONLY, never of the
 * palette-derived GROUND. The shell stands down only where the route MOUNTS its OWN
 * chromatic field (the `isHeroPage` + `CHROMATIC_FIELD_KINDS` gate), and that field's
 * `<Aurora>` paints its `auroraFallbackGround` palette ground from frame 0 (before the
 * WebGL canvas arms). So SOME palette-derived ground is ALWAYS present at frame 0 — the
 * shell field on a non-suppressing route, the route's own field on a suppressing one —
 * and the entrance colors from frame 0 (no bare-page-bg, repulsive-gray first paint).
 * The suppression closes the one-GL budget; it never blanks the frame-0 color.
 *
 *   1. `isHeroPage` — `StoryPage.vue` mounts `StoryHero` only for a true hero
 *      story. A GL-background content page therefore mounts no field and keeps the
 *      warm shell field. Section landings are hero routes, so they pass `true`.
 *   2. `CHROMATIC_FIELD_KINDS` — `constellation`/`fourier` are achromatic line-art
 *      overlays with no warm identity → they KEEP the shell warm field as underpaint,
 *      never suppress it.
 *
 * `SELF_STAGES_GL` stays unconditional (those routes mount a route-dominant GL field
 * outside the `background` channel; they replace the shell by construction).
 */
export function suppressesShellField(
    routeId: string,
    bg: StoryBackground | undefined,
    isHeroPage: boolean,
): boolean {
    const kind = backgroundKind(bg);
    return (
        (isHeroPage && kind !== undefined && CHROMATIC_FIELD_KINDS.has(kind)) ||
        SELF_STAGES_GL.has(routeId)
    );
}
