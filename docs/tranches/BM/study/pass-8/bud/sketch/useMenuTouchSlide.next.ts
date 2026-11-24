// BM pass 8 (UNION D2's slide across an open short menu, Q4, Q11; DESIGN §10.4): a design sketch, not library source.
// atlas's phone section menu and Home Assistant's floor menu asked to slide across an open menu's rows and lift on one
// ([IN atlas 1; HA 1]). reka 2.10.1 highlights a row on `pointermove` only for a mouse (MenuItemImpl.js:38-39,
// `isMouseEvent`), and a touch is captured by the row it pressed, so a finger that slides selects nothing today. reka
// already commits the row a press did not start on: its `pointerup` calls `click()` when the press began elsewhere
// (MenuItem.js:57-60). So glass-ui adds two listeners on the menu's content, and nothing on the rows:
//   1. a touch `pointerdown` on a row releases the row's implicit capture, so the moves and the lift reach the row under
//      the finger;
//   2. a touch `pointermove` focuses the row under the finger; reka highlights the focused row (`data-highlighted`), and
//      the two rows trade their fill in place (D3, P0a rule 4).
// The commit is law 3's: the row under the lift, once; a row passed is only highlighted. reka's `pointerup` clicks a row
// the press did not start on (its `isPointerDownRef` is false there, MenuItem.js:57-61). The row the press started on is
// chosen, as today, only by the browser's own click, which Safari sends for a tap; whether it sends one after a slide
// away and back is P8-present's second try, and a third listener is added only if it does not.
// A list that fits takes `touch-action: none` (`data-fits`, read once per open from the list's box, as the dock run's
// `[data-run-fits]`); a list that scrolls keeps `pan-y`, scrolls, and takes no slide (§8.1's rule for a run).
// Two listeners per menu, against the ceiling's 0 listeners per control: the owner's, for two sites' ask.
export function useMenuTouchSlide(content: HTMLElement) {
    const row = (x: number, y: number) =>
        document.elementFromPoint(x, y)?.closest<HTMLElement>('[role^="menuitem"]:not([data-disabled])') ?? null;
    content.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "touch") return;
        const t = e.target as Element;
        if (t.hasPointerCapture?.(e.pointerId)) t.releasePointerCapture(e.pointerId);
    });
    content.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "touch" || content.dataset.fits === undefined) return;
        const r = row(e.clientX, e.clientY);
        if (r && r !== document.activeElement) r.focus({ preventScroll: true });
    });
    const list = content.querySelector<HTMLElement>("[data-menu-list]") ?? content;
    content.toggleAttribute("data-fits", list.scrollHeight <= list.clientHeight);
}
