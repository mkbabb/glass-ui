// Every glass surface that opens: its page, its surface selector, how it opens, and each
// dismissal route that applies. Actions are interpreted by exits.mjs:
//   {tap: sel} {tapNth: [sel, n]} {key: "Escape"} {outside: true} {hover: sel} {leave: true}
//   {swipe: "toEdge"|"down"|"right"|"left"|"up"} {focusOut: true} {longPress: sel}
//   {rclick: sel} {wait: ms} {eval: js}   and arrays of these, run in order.
// `forms`: which forms apply ("phone", "desktop"). `fine`: a route that needs a mouse.
const OPT = (surf, n = 1) => ({ tapNth: [`${surf} [role=option]`, n] });
const MENU = "[data-reveal=menu][role=menu]";
const MI = `${MENU} [role=menuitem]:not([aria-haspopup])`;
const TOAST_CLOSE = { eval: `(() => { const l=[...document.querySelectorAll('li[data-slot=toast]')]; const t=l[l.length-1]; const b=t && (t.querySelector('[data-slot=toast-close]') || t.querySelector('button[aria-label]')); if (b) b.click(); return !!b; })()` };

export const SPECS = [
    // ── the owner's case: a Select seated in a GlassDock, open driven by v-model:open ──
    {
        id: "dock-select", page: "exits-dock", surf: "[data-slot=select-content]",
        open: { tap: "[data-testid=xd-select]" },
        routes: { pick: OPT("[data-slot=select-content]", 2), outside: { outside: true }, escape: { key: "Escape" }, trigger: { tap: "[data-testid=xd-select]" } },
        reverse: { tap: "[data-testid=xd-select]" },
    },
    {
        id: "dock-select-collapsible", page: "exits-dock", surf: "[data-slot=select-content]",
        open: { tap: "[data-testid=xd-select2]" },
        routes: { pick: OPT("[data-slot=select-content]", 2), outside: { outside: true }, escape: { key: "Escape" } },
    },
    {
        id: "dock-dropdown", page: "exits-dock", surf: MENU,
        open: { tap: "[data-testid=xd-dropdown]" },
        routes: { pick: { tap: MI }, outside: { outside: true }, escape: { key: "Escape" }, trigger: { tap: "[data-testid=xd-dropdown]" } },
    },
    {
        id: "dock-popover", page: "exits-dock", surf: "[data-slot=popover-content]",
        open: { tap: "[data-testid=xd-popover]" },
        routes: { outside: { outside: true }, escape: { key: "Escape" }, trigger: { tap: "[data-testid=xd-popover]" } },
    },
    // ── Select, plain trigger ──
    {
        id: "select", page: "select", surf: "[data-slot=select-content]",
        open: { tap: "[data-testid=select-0]" },
        routes: { pick: OPT("[data-slot=select-content]", 2), outside: { outside: true }, escape: { key: "Escape" }, trigger: { tap: "[data-testid=select-0]" } },
        reverse: { tap: "[data-testid=select-0]" },
    },
    // ── menus ──
    {
        id: "dropdown-menu", page: "menu", surf: MENU,
        open: { tap: "[data-testid=menu-0]" },
        routes: { pick: { tap: MI }, outside: { outside: true }, escape: { key: "Escape" }, trigger: { tap: "[data-testid=menu-0]" }, focusOut: { key: "Tab" } },
    },
    {
        id: "dropdown-submenu", page: "menu", surf: "[data-slot=menu-sub-content]",
        subOf: "[data-reka-menu-sub-trigger], [data-slot=menu-sub-trigger]",
        open: [{ tap: "[data-testid=menu-0]" }, { wait: 450 }, { subOpen: true }],
        routes: { pick: { subPick: true }, parentItem: { subAway: true }, escape: { key: "Escape" }, outside: { outside: true } },
    },
    {
        id: "context-menu", page: "context-menu", surf: MENU,
        open: { ctx: "[data-testid=context-menu-0]" },
        routes: { pick: { tap: MI }, outside: { outside: true }, escape: { key: "Escape" } },
    },
    // ── popovers ──
    {
        id: "popover", page: "popover", surf: "[data-slot=popover-content]",
        open: { tap: "[data-testid=popover-0]" },
        routes: { outside: { outside: true }, escape: { key: "Escape" }, trigger: { tap: "[data-testid=popover-0]" }, focusOut: { focusOut: true } },
    },
    {
        id: "hover-popover", page: "hover-popover", surf: "[data-slot=popover-content]",
        open: { hoverOrTap: "[data-testid=hover-popover-0]" },
        routes: { leave: { leave: true }, outside: { outside: true }, escape: { key: "Escape" } },
    },
    {
        id: "tooltip", page: "tooltip", surf: "[data-slot=tooltip-content]",
        open: { hoverOrTap: "[data-testid=tooltip-0]" },
        routes: { leave: { leave: true }, escape: { key: "Escape" }, press: { tap: "[data-testid=tooltip-0]" } },
    },
    // ── modals ──
    {
        id: "dialog", page: "dialog", surf: "[data-slot=dialog-content]",
        open: { tap: "[data-testid=dialog-0]" },
        routes: { close: { tap: "[data-slot=dialog-content] [data-slot=dialog-close], [data-slot=dialog-content] button[aria-label=Close]" }, outside: { outside: true }, escape: { key: "Escape" } },
        reverse: { tap: "[data-testid=dialog-0]" },
    },
    {
        id: "dialog-opaque", page: "dialog", surf: "[data-slot=dialog-content]",
        open: { tap: "[data-testid=dialog-3]" },
        routes: { escape: { key: "Escape" } },
    },
    {
        id: "alert-dialog", page: "dialog", surf: "[data-slot=dialog-content]",
        open: { tap: "[data-testid=dialog-1]" },
        routes: { close: { tap: "[data-slot=dialog-content] [data-slot=dialog-footer] button" }, escape: { key: "Escape" }, outside: { outside: true } },
    },
    ...["top", "right", "bottom", "left"].map((side, i) => ({
        id: `sheet-${side}`, page: "sheet", surf: "[data-slot=sheet-content]",
        open: { tap: `[data-testid=sheet-${i}]` },
        routes: { close: { tap: "[data-slot=sheet-content] [data-slot=dialog-close], [data-slot=sheet-content] button[aria-label=Close]" }, outside: { outside: true }, escape: { key: "Escape" }, swipe: { swipe: side } },
    })),
    {
        id: "sheet-detented", page: "sheet", surf: "[data-slot=sheet-content][data-detents], [data-slot=sheet-content]",
        open: { tap: "[data-testid=sheet-4]" },
        routes: { close: { tap: "[data-slot=sheet-content] [data-slot=dialog-close], [data-slot=sheet-content] button[aria-label=Close]" }, outside: { outside: true }, escape: { key: "Escape" }, swipe: { swipe: "bottom" } },
    },
    // ── transients ──
    {
        id: "toast", page: "toast", surf: "li[data-slot=toast]",
        open: { tap: "[data-testid=toast-0]" },
        routes: { close: TOAST_CLOSE, swipe: { swipe: "right" }, timeout: { wait: 0, timeout: true } },
    },
    // ── command palette ──
    {
        id: "command-dialog", page: "command", surf: ".command-dialog__content",
        open: { tapText: "Open palette" },
        routes: { pick: { tap: ".command-dialog__content [data-slot=command-item]" }, outside: { outside: true }, escape: { key: "Escape" } },
    },
    // ── in place ──
    {
        id: "expandable-container", page: "expandable-container", surf: "[data-testid=expandable-container-0] [data-part=panel]",
        open: { tap: "[data-testid=expandable-container-0] [aria-label=Fullscreen], [data-testid=expandable-container-0] button" },
        routes: { exit: { tapVisible: "[aria-label='Exit fullscreen']" }, escape: { key: "Escape" } },
        inPlace: true,
    },
    {
        id: "accordion", page: "accordion", surf: "[data-testid=accordion-0] [data-slot=accordion-content], [data-testid=accordion-0] .disclosure-content",
        open: { tap: "[data-testid=accordion-0] [data-slot=accordion-trigger]" },
        routes: { trigger: { tap: "[data-testid=accordion-0] [data-slot=accordion-trigger]" } },
        inPlace: true,
    },
    {
        id: "collapsible", page: "collapsible", surf: "[data-testid=collapsible-0] [data-slot=collapsible-content], [data-testid=collapsible-0] .disclosure-content",
        open: { tap: "[data-testid=collapsible-0] [data-slot=collapsible-trigger]" },
        routes: { trigger: { tap: "[data-testid=collapsible-0] [data-slot=collapsible-trigger]" } },
        inPlace: true,
    },
    // ── dock ──
    {
        id: "dock-collapse", page: "exits-dock", surf: "[data-testid=xd-coll] .dock-plate",
        before: { tap: "[data-testid=xd-coll]" },
        open: { tapExpand: "[data-testid=xd-coll]" },
        routes: { outside: { outside: true }, leave: { leave: true } },
        inPlace: true,
    },
    {
        id: "dock-layer", page: "dock-full", surf: "[data-testid=df-layers] .dock-layer-tab-indicator",
        before: [{ tap: "[data-testid=df-layers]" }, { wait: 700 }],
        open: { tap: "[data-testid=df-layers] .dock-layer-tab:nth-of-type(3)" },
        routes: { back: { tap: "[data-testid=df-layers] .dock-layer-tab:nth-of-type(1)" } },
        inPlace: true,
    },
    // ── theme ──
    {
        id: "theme-toggle", page: "dark-mode-toggle", surf: "[data-testid=dark-mode-toggle-0] .toggle-sun",
        open: { tap: "[data-testid=dark-mode-toggle-0]" },
        routes: { back: { tap: "[data-testid=dark-mode-toggle-0]" } },
        inPlace: true,
    },
];
