// focal.ts — BG.W-FIELD-AURORA (M2): the route-FOCAL resolver (the one-GL law).
//
// A route is FOCAL when it owns its OWN route-dominant GL field — and on a focal
// route the shell `<Aurora>` (AppShell.vue) is SUPPRESSED, so exactly ONE GL
// context is mounted per route (the never-2-contexts law on Safari's per-window
// GL budget). The signal is derived from TWO declarative sources, UNIFIED behind
// ONE resolver — NOT an AST/import-graph walk (which conflates a CONTAINED
// specimen aurora inside a card with a page-DOMINANT field), NOT a hand-list:
//
//   1. the route's resolved `background.kind` ∈ GL_BG_KINDS — the page's
//      full-bleed field IS a live GL substrate (substrates/aurora, motion/
//      constellation, …). `StoryHero.vue` mounts that field; the shell stands down.
//   2. the route ∈ SELF_STAGES_GL — a dock route that mounts a route-dominant GL
//      canvas OUTSIDE the `background` channel (the DockStage-hoisted shared aurora
//      + the morph-showcase functional aurora + the self-staging rail/playground).
//
// Contained specimens (buttons.vue / card.vue mount an aurora INSIDE a rounded
// card) carry a NON-GL `background.kind` and are NOT in SELF_STAGES_GL → NOT focal
// → the shell field correctly stays behind their card.

import type { StoryBackground } from "./aurora-hero";

/** The full-bleed page-field kinds that ARE a live GL substrate. A route whose
 *  resolved `background.kind` is one of these owns its own GL field. */
export const GL_BG_KINDS: ReadonlySet<string> = new Set([
    "aurora",
    "constellation",
    "fourier",
    "liquid-grid",
]);

/** The GL field kinds that carry the WARM-CREAM identity themselves — a CHROMATIC
 *  full-bleed field that REPLACES the shell warm aurora (nothing warm needs to sit
 *  behind it). The achromatic line-art overlays (`constellation`, `fourier`) are
 *  DELIBERATELY EXCLUDED: they are grey line-art with no warm identity, so the shell
 *  warm field must stay behind them as an UNDERPAINT (warm-cream in light, luminous-
 *  warm-dark in dark — never the "charcoal slab on a dead void" W-DARK-MATERIAL
 *  forbids). This is DISTINCT from `GL_BG_KINDS` (the one-GL owns-a-field
 *  enumeration): a constellation hero is FOCAL (owns a GL field) yet does NOT
 *  suppress the shell (keeps the warm underpaint). */
export const CHROMATIC_FIELD_KINDS: ReadonlySet<string> = new Set([
    "aurora",
    "liquid-grid",
]);

/** Routes that mount a route-DOMINANT GL canvas OUTSIDE the `background` channel —
 *  the dock stories whose page IS the dock-over-a-live-field demonstration. Keyed
 *  by the route id (`<category>/<story>`). `proof:focal-complete` C2 asserts this
 *  set ⊇ the committed grep of `<DockStage` over the routed SFCs (so adding a new
 *  DockStage route without enrolling it here REDs the gate — never a silent 2-GL
 *  drift). The rail + liquid-playground self-stage their OWN `<Aurora>` (not via
 *  DockStage) and are enrolled here directly. */
export const SELF_STAGES_GL: ReadonlySet<string> = new Set([
    "dock/overview",
    "dock/layers",
    "dock/sections",
    "dock/dock-gallery",
    "dock/dock-search",
    "dock/cta-receive",
    "dock/morph-showcase",
    "dock/siri-island",
    "dock/rail",
    "dock/liquid-playground",
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
 * `isFocalRoute` (owns-a-GL-field / one-GL enumeration): the shell stands down IFF
 * the mounted field ITSELF carries the warm-cream identity and so REPLACES it —
 * i.e. a CHROMATIC field (aurora / liquid-grid) on a page that actually MOUNTS it,
 * OR a self-staging dock route. Two gates on the GL-background arm:
 *
 *   1. `isHeroPage` — a `background.kind` GL field is rendered by `StoryHero`, which
 *      `StoryPage.vue` mounts ONLY on `variant === "hero"` (a page-variant content
 *      story mounts NO field). A GL-background CONTENT page therefore mounts nothing
 *      to replace the shell → it must KEEP the warm shell field. (Section landings
 *      always mount `StoryHero variant="hero"`, so they pass `isHeroPage: true`.)
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
