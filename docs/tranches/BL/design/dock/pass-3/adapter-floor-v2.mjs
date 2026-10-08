// adapter-floor-v2.mjs: the probe contract for GlassDock at HEAD + the D2 pass-3 floor v2
// patch (pass-3/floor-v2.patch). It is pass-2/adapter-floor.mjs with two DOM reads changed
// for floor v2: badge() returns the seat's reserved `.dock-seat-badge` (N-4, DockControl's
// `#badge` slot), and budget() subtracts the dock's own main-axis margins (the N-4 gutter:
// the margin box is what must fit). Diffed against ../harness/adapter-head.mjs (H-6). The
// other changed reads, all DOM: posture() reads the `compact` class; rim() returns the
// plate's own `.dock-rim` child; compact() is true (the rung exists and is opt-in
// through `scroll.compact`). config binds the one grouped `scroll` prop (Q-3(b)); the
// compact scene binds the rim too, so W5's h·compact cell reads the rim on the compact rung.
// No webkitShim: floor row 6 removed the nested translucent color-mix() that crashed
// Playwright WebKit, so every WebKit cell here is unshimmed by construction.
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
//   badge()           the dock's reserved badge seat element (O-67), or null when it has none
//
// config.compactProps / config.rimProps are bound onto GlassDock by the compact
// and rim scenes (the string "@source" becomes a getter of the scene's scroll source:
// the window, an element, or an element that mounts late; scenes.mjs resolves it at
// any depth, so it binds inside the grouped `scroll` prop).
//
// THE ADAPTER LAW (H-6). An adapter reads DOM and pixels. It never derives a reading
// from the family's own inputs (a token, a spring value, a custom property), never
// pre-clips (paintingSeats never intersects seats with extent()), and changes nothing
// in the page. A route's adapter is diffed against this file and linted by
// adapter-law.mjs before any run; the critic reviews the diff.
export const config = {
    compactProps: { scroll: { source: "@source", compact: true, rim: true } },
    rimProps: { scroll: { source: "@source", rim: true } },
};

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
    posture: () => { const c = P.root().classList; return c.contains("compact") ? "compact" : c.contains("pinned") ? "pinned" : c.contains("expanded") ? "expanded" : "collapsed"; },
    budget: () => {
      const root = P.root(), cs = getComputedStyle(root), par = root.parentElement, pcs = getComputedStyle(par);
      const x = P.axis() === "x";
      const cap = parseFloat(x ? cs.maxWidth : cs.maxHeight);
      const avail = x ? par.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight) : par.clientHeight - parseFloat(pcs.paddingTop) - parseFloat(pcs.paddingBottom);
      const gutter = x ? parseFloat(cs.marginLeft) + parseFloat(cs.marginRight) : parseFloat(cs.marginTop) + parseFloat(cs.marginBottom);
      return Number.isFinite(cap) ? Math.min(cap, avail - gutter) : avail - gutter;
    },
    rim: () => { const r = [...P.root().querySelectorAll(":scope > .dock-plate > .dock-rim")]; return r.length ? r : null; },
    compact: () => true,
    badge: () => P.root().querySelector(".dock-seat-badge"),
    composedRim: () => document.querySelector("[data-testid=rim]"),
  };
  window.__dockProbe = P;
})();`;
