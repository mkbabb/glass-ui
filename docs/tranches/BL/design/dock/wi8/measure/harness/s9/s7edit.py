# s7edit.py <worktree>: S7's source edits (RU-103 as amended for C8-M9, C8-M13, C8-16). The sampler takes no sample while
# its surface carries `data-morphing` and owes one, which the dock's landing asks for on the next frame's batch; the
# mount's read moves into a frame registered in onMounted, ahead of the `shown` frame (ORCH line 5). DockLayer's read is
# not touched: H9 found no layout under it (MEASURE-9 H9), and no batch across docks is built: H9 read one forced layout
# in the first frame of 18 and of 10 docks.
import sys
W = sys.argv[1]
def edit(p, pairs):
    s = open(W + "/" + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:100]); s = s.replace(old, new)
    open(W + "/" + p, "w").write(s)
G = "src/composables/glass/useGlassBackdropLuminance.ts"
edit(G, [
 ("""    sampleNow: () => void;
    /** Cancel a pending sample + detach every observer/listener. */""", """    sampleNow: () => void;
    /** The surface landed: take the sample its travel owed, if any, on the next frame's batch. */
    landed: () => void;
    /** Cancel a pending sample + detach every observer/listener. */"""),
 ("""            sampleNow: () => {},
            dispose: () => {},""", """            sampleNow: () => {},
            landed: () => {},
            dispose: () => {},"""),
 ("""    let lastSampleAt = 0;
""", """    let lastSampleAt = 0;
    // RU-103: a sample asked for while the surface travels (a dock's `data-morphing`) is owed to its landing.
    let owed = false;
"""),
 ("""        if (coveredByShared(el)) return null;
        // Live intent""", """        if (coveredByShared(el)) return null;
        if (el.hasAttribute("data-morphing")) {
            owed = true;
            return null;
        }
        // Live intent"""),
 ("""    /** One sample now, read and written in this task (an explicit caller's request). */""",
  """    /** The surface landed: the sample its travel owed, on the next frame's batch. */
    function landed(): void {
        if (!owed) return;
        owed = false;
        requestBatchSample();
    }

    /** One sample now, read and written in this task (an explicit caller's request). */"""),
 ("""        sampleNow,
        dispose,
    };""", """        sampleNow,
        landed,
        dispose,
    };"""),
])
edit("src/components/dock/GlassDock.vue", [
 ("""if (props.backdropMode === "live") {
    // Hand the field canvas""", """const backdrop = props.backdropMode !== "live" ? null : (() => {
    // Hand the field canvas"""),
 ("""    useGlassBackdropLuminance(dockEl, {
        backgroundCanvas: (): HTMLCanvasElement | null => {
            const bc = props.backgroundCanvas;
            return typeof bc === "function"
                ? bc()
                : bc instanceof HTMLCanvasElement
                  ? bc
                  : null;
        },
    });
}

const isTransitioning = ref(false);""", """    return useGlassBackdropLuminance(dockEl, {
        backgroundCanvas: (): HTMLCanvasElement | null => {
            const bc = props.backgroundCanvas;
            return typeof bc === "function"
                ? bc()
                : bc instanceof HTMLCanvasElement
                  ? bc
                  : null;
        },
    });
})();

const isTransitioning = ref(false);
// RU-103: the plate's ink is sampled where the dock lands, not at each frame of its travel.
watch(isTransitioning, (moving) => {
    if (!moving) backdrop?.landed();
});"""),
])
edit("src/components/dock/composables/useDockBody.ts", [
 ("""        window.addEventListener("resize", onWindowResize);
        sync("mount");
        requestAnimationFrame(() => {""", """        window.addEventListener("resize", onWindowResize);
        // ORCH line 5 (RU-103): the mount's read is the first frame's, ahead of the `shown` frame.
        requestAnimationFrame(() => sync("mount"));
        requestAnimationFrame(() => {"""),
])
print("s7 edits applied")
