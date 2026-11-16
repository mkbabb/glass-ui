// The press floor (W-B.17 R-11): the one writer of `data-press` on a `.plate`.
//
// `:active` lasts exactly as long as the button is down, so a trackpad tap shows no
// press, and WebKit applies `:active` to a touch only where a touch listener exists.
// One passive listener on the document stamps `data-press` on the innermost `.plate`
// under the pointer and holds it until the later of the release and the press clock.
// No listener per control, nothing at rest but the one handler.
let installed = false;

/** Install once per document. Safe to call again. */
export function installPress(doc: Document = document): void {
    if (installed) return;
    installed = true;
    doc.addEventListener(
        "pointerdown",
        (e) => {
            const el = (e.target as Element | null)?.closest?.(".plate");
            if (!el || el.matches(':disabled, [aria-disabled="true"]')) return;
            const cs = getComputedStyle(doc.documentElement);
            const settle = Number.parseFloat(cs.getPropertyValue("--spring-press-settle"));
            const tempo = Number.parseFloat(cs.getPropertyValue("--motion-tempo"));
            let up = false;
            let floored = false;
            const end = new AbortController();
            const done = (): void => {
                if (!up || !floored) return;
                el.removeAttribute("data-press");
                end.abort();
            };
            const release = (): void => {
                up = true;
                done();
            };
            el.setAttribute("data-press", "");
            doc.addEventListener("pointerup", release, { capture: true, signal: end.signal });
            doc.addEventListener("pointercancel", release, { capture: true, signal: end.signal });
            setTimeout(() => {
                floored = true;
                done();
            }, settle * tempo * 1000);
        },
        { capture: true, passive: true },
    );
}
