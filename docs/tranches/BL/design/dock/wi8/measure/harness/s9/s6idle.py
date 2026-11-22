# s6idle.py <worktree>: S6's cure of the writer H9 named (RU-90, O-268), on s9/idle9.mjs's reading of the tip: the carrier
# reads its boxes in the page's coordinates (the viewport's plus the page's scroll), so a dock in a fixed layer (its root
# or an ancestor `position: fixed`) reads as moved by however far the page scrolled since its last read, and each read
# starts a travel back; while the page scrolls the travels chain through the observer (each travel shows the hidden face,
# which resizes it). A dock in a fixed layer reads its boxes in the viewport's coordinates, the frame it is laid out in.
# Also: the spec's coarse leg skips with H9's reason (the dock has no #collapsed and no persistent seat, so under no
# hover it rests open, RU-43: nothing folds).
import sys
W = sys.argv[1]
def edit(p, pairs):
    s = open(W + "/" + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:100]); s = s.replace(old, new)
    open(W + "/" + p, "w").write(s)
B = "src/components/dock/composables/useDockBody.ts"
edit(B, [
 ("""let Z = 1;
function bcr(""", """let Z = 1;
/** O-268 (RU-90): the page's scroll, which a dock in a fixed layer does not move with: its boxes are read in the
 *  viewport's coordinates, so a page scrolling under it is no change of its place. Set with Z at each sync. */
let FIXED = false;
const pageX = () => (FIXED ? 0 : scrollX / Z);
const pageY = () => (FIXED ? 0 : scrollY / Z);
function bcr("""),
 ("""    const r = bcr(el);
    const sx = scrollX / Z;
    const sy = scrollY / Z;
    return { l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy };""",
  """    const r = bcr(el);
    const sx = pageX();
    const sy = pageY();
    return { l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy };"""),
 ("""        const ox = rr.left + scrollX / Z - (lane ? lane.tx : 0);
        const oy = rr.top + scrollY / Z - (lane ? lane.ty : 0);""", """        const ox = rr.left + pageX() - (lane ? lane.tx : 0);
        const oy = rr.top + pageY() - (lane ? lane.ty : 0);"""),
 ("""        Z = (el as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;
""", """        Z = (el as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;
        readLayer(el, reason === "resize");
"""),
 ("""    let closedFace: HTMLElement | null = null;
""", """    let closedFace: HTMLElement | null = null;
    // O-268: whether the root or an ancestor is `position: fixed`, read once and again on a resize.
    let fixedLayer: boolean | null = null;
    function readLayer(el: HTMLElement, again: boolean): void {
        if (fixedLayer === null || again) {
            fixedLayer = false;
            for (let a: Element | null = el; a && !fixedLayer; a = a.parentElement) fixedLayer = getComputedStyle(a).position === "fixed";
        }
        FIXED = fixedLayer;
    }
"""),
 ("""        const g = regions.get(region);
        if (leave && place) {
            const r = rectOf(leave);""", """        const g = regions.get(region);
        const host = root();
        if (host) readLayer(host, false);
        if (leave && place) {
            const r = rectOf(leave);"""),
])
edit("tests-visual/release-11-0-2.spec.ts", [
 ("""test("fold · an idle fold lays out once per morph frame on a scrolling page", async ({ page }, info) => {
    test.skip(info.project.name.startsWith("webkit"), "layouts are counted over CDP");""",
  """test("fold · an idle fold lays out once per morph frame on a scrolling page", async ({ page }, info) => {
    test.skip(info.project.name.startsWith("webkit"), "layouts are counted over CDP");
    // W-I.8 RU-90 (MEASURE-9 H9): the page's dock has no #collapsed and no persistent seat, so under a pointer that
    // cannot hover it rests open (R-2, RU-43) and no idle fold exists to count.
    test.skip(COARSE.has(info.project.name), "a coarse pointer's dock with nothing to tap rests open");"""),
])
print("s6 idle cure applied")
