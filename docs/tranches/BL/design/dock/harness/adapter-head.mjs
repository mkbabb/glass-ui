// adapter-head.mjs: the probe contract for GlassDock as it stands at HEAD
// (5dd68ca9; src/ byte-identical to v10.0.1).
//
// A family prototype that changes the dock's DOM copies this file, edits the
// reads, and passes it to every witness with --adapter <file>. The contract
// (window.__dockProbe) is the only thing the witnesses read:
//
//   root()            the dock root element
//   plate()           the one element that paints the glass plate (the silhouette carrier)
//   axis()            "x" | "y", the main axis
//   extent()          the plate's painted rect {l,t,r,b} in CSS px (clips and transforms applied)
//   seats({all})      seat elements; all=true includes inactive/inert faces
//   paintingSeats()   [{el, rect}] seats that currently paint (opacity > 0.05), rect clipped
//   morphing()        the morph window is open
//   rung()            {name, response, dampingFraction, settleBand, clockMs}: the spring
//                     the extent morph rides and its own clock
//   posture()         "collapsed" | "expanded" | "pinned" | "compact" | …
//   budget()          the main-axis extent the dock may reach, CSS px
//   rim()             the dock's own progress-rim elements, or null when the dock has none
//   compact()         true when the dock has the opt-in compact-on-scroll rung
//
// config.compactProps / config.rimProps are bound onto GlassDock by the compact
// and rim scenes (string "@window" becomes a getter to window). HEAD has neither.
export const config = { compactProps: null, rimProps: null };

/**
 * Playwright WebKit 26.5 (the build Playwright 1.61.1 ships, not Safari) kills the
 * page on any property whose value nests two translucent color-mix() arms, e.g.
 *   color-mix(in srgb, color-mix(in srgb, #1c1917 8%, transparent) 50%,
 *                      color-mix(in srgb, #1c1917 5%, transparent))
 * which is what the plate border (dock.css:130-135) resolves to once
 * --dock-expand-t is set, so every GlassDock mount crashes there. The shim pins
 * the border COLOUR to one arm; the 1.5px border width and every geometry and
 * motion input are untouched. Witnesses apply it on WebKit only, label those
 * cells "+shim", and --no-webkit-shim shows the crash.
 */
export const webkitShim = ".glass-dock .dock-plate { border-color: var(--dock-plate-expanded-border) !important; }";

/** The demo route and root that carry the real SidebarDock (vertical). */
export const sidebarRoute = "/dock/overview";
export const sidebarRootSel = "[data-testid=sidebar-dock-collapsible]";
export function rootSel(scene) {
    return scene === "sidebar" ? sidebarRootSel : "[data-testid=dock]";
}

export const source = `(() => {
  const hp = window.__hp;
  const SEAT = ".dock-icon-button, .dock-tab-button, .dock-trigger";
  const rootSel = window.__hpRootSel || "[data-testid=dock]";
  const P = {
    root: () => document.querySelector(rootSel),
    plate: () => P.root()?.querySelector(":scope > .dock-plate") ?? null,
    axis: () => (P.root().classList.contains("vertical") ? "y" : "x"),
    extent: () => hp.paintedRect(P.plate()),
    seats: (o = {}) => [...P.root().querySelectorAll(SEAT)].filter((s) => o.all || !s.closest("[inert]")),
    paintingSeats: () => P.seats({ all: true }).map((el) => ({ el, o: hp.visibleOpacity(el), rect: hp.paintedRect(el) }))
      .filter((s) => s.o > 0.05 && s.rect.r - s.rect.l > 0.5 && s.rect.b - s.rect.t > 0.5),
    morphing: () => P.root().hasAttribute("data-morphing"),
    rung: () => {
      const p = (window.__scene?.presets ?? []).find((x) => x.name === "dock") ?? null;
      return p ? { name: "dock", response: p.response, dampingFraction: p.dampingFraction, settleBand: p.settleBand, clockMs: hp.tokenMs(P.root(), "--spring-dock-duration") } : null;
    },
    posture: () => { const c = P.root().classList; return c.contains("pinned") ? "pinned" : c.contains("expanded") ? "expanded" : "collapsed"; },
    budget: () => {
      const root = P.root(), cs = getComputedStyle(root), par = root.parentElement, pcs = getComputedStyle(par);
      const x = P.axis() === "x";
      const cap = parseFloat(x ? cs.maxWidth : cs.maxHeight);
      const avail = x ? par.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight) : par.clientHeight - parseFloat(pcs.paddingTop) - parseFloat(pcs.paddingBottom);
      return Number.isFinite(cap) ? Math.min(cap, avail) : avail;
    },
    rim: () => null,
    compact: () => false,
    composedRim: () => document.querySelector("[data-testid=rim]"),
  };
  window.__dockProbe = P;
})();`;
