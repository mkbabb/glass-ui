# s2edit.py <worktree>: S2's source edits (RU-109 as amended for R8-4; RU-98's cockpit line), applied once S1 is committed.
import sys
W = sys.argv[1]; D = W + "/src/components/dock/"
def edit(p, pairs):
    s = open(D + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:80]); s = s.replace(old, new)
    open(D + p, "w").write(s)
edit("composables/useDockState.ts", [
 ("""    /* Dwell: time the pointer or focus has spent inside since the dock opened. */
    let dwellMs = 0;
    let insideSince: number | null = null;
    let pointerInside = false;""", """    let pointerInside = false;"""),
 ("""    function enterInside(): void {
        insideSince ??= performance.now();
    }
    function leaveInside(): void {
        if (insideSince !== null) dwellMs += performance.now() - insideSince;
        insideSince = null;
    }
    function lingerMs(): number {
        const base = tokenMs("--dock-linger", collapseDelay);
        const max = Math.max(base, tokenMs("--dock-linger-max", base));
        return Math.min(max, base + dwellMs / 2);
    }
""", ""),
 ("""        }, lingerMs());""", """        }, tokenMs("--dock-linger", collapseDelay));"""),
 ("""            pointerInside = true;
            enterInside();
            state.value = "hover";""", """            pointerInside = true;
            state.value = "hover";"""),
 ("""        clearTimer();
        pointerInside = true;
        enterInside();
    }""", """        clearTimer();
        pointerInside = true;
    }"""),
 ("""                    state.value = "hover";
                    dwellMs = 0;
                    syncDerived();
                }
            }, tokenMs("--dock-intent", HOVER_INTENT_MS));""", """                    state.value = "hover";
                    syncDerived();
                }
            }, tokenMs("--dock-intent", HOVER_INTENT_MS));"""),
 ("""        dismissedUnderPointer = false;
        leaveInside();
""", """        dismissedUnderPointer = false;
"""),
 ("""        if (!quietReturn) clearTimer();
        enterInside();
""", """        if (!quietReturn) clearTimer();
"""),
 ("""        if (stays) return;
        if (!pointerInside) leaveInside();
        scheduleCollapse();""", """        if (stays) return;
        scheduleCollapse();"""),
 ("""            state.value = "hover";
            dwellMs = 0;
            syncDerived();
            scheduleCollapse();""", """            state.value = "hover";
            syncDerived();
            scheduleCollapse();"""),
])
edit("styles/shell.css", [("        --dock-linger: 6s;\n        --dock-linger-max: 12s;\n", "        --dock-linger: 6s;\n")])
edit("styles/density.css", [("        --dock-linger: 3s;\n        --dock-linger-max: 6s;\n", "        --dock-linger: 3s;\n"),
                            ("        --dock-tab-h: calc(32px * var(--dock-scale));\n", "")])
edit("composables/useDockBody.ts", [
 ("""/** The test-only pose (`__dockPose`): a build constant, so every branch that reads it is
 *  dropped from the published bundle, and G-12 scans the built script for the name. */
const POSE = import.meta.env.VITE_DOCK_HOLD === "1";""",
  """/** The hold build's trace marks (`dock:read`, `dock:reread`, `dock:write`), the frames G-11's trace
 *  reads (W-I.8 RU-103): a build constant, so every mark is dropped from the published bundle, and
 *  G-12 scans the built script for them. */
const MARKS = import.meta.env.VITE_DOCK_HOLD === "1";"""),
 ("""    /** Test-only, present only in a build with VITE_DOCK_HOLD=1: pose the open dock at a
     *  posture coordinate e (null releases). */
    __dockPose?: (e: number | null) => void;
""", ""),
 ("""    let closedFace: HTMLElement | null = null;
    let held: number | null = null;""", """    let closedFace: HTMLElement | null = null;"""),
 ("""        if (POSE) performance.mark("dock:read", { detail: { reason } });""", """        if (MARKS) performance.mark("dock:read", { detail: { reason } });"""),
 ("""            if (POSE) performance.mark("dock:flags");
""", ""),
 ("""            if (POSE && fitMoved) performance.mark("dock:reread",""", """            if (MARKS && fitMoved) performance.mark("dock:reread","""),
 ("""        // RU-53: the carrier's read of the root, named, so a fold frame's first forced layout is told from a flag's.
        if (POSE) performance.mark("dock:rect");
""", ""),
 ("""            if (POSE) performance.mark("dock:write");""", """            if (MARKS) performance.mark("dock:write");"""),
 ("""            start(reason === "ro");
            if (POSE) performance.mark("dock:end");""", """            start(reason === "ro");"""),
 ("""        if (postureTravel || (POSE && held !== null)) return restR[0]""", """        if (postureTravel) return restR[0]"""),
 ("""        e = clamp01((lastPosture ? 1 : 0) + eq.d);
        if (POSE && held !== null) e = held;
""", """        e = clamp01((lastPosture ? 1 : 0) + eq.d);
"""),
 ("""        const posing = postureTravel || (POSE && held !== null);
""", ""),
 ("""    function __dockPose(pose: number | null): void {
        held = pose;
        if (pose !== null) {
            root()?.setAttribute("data-morphing", "");
            write();
        } else {
            rest();
        }
    }

""", ""),
 ("""        if (synced && entries.every(heldSize)) return;
        // RU-53: the hold build names each entry that fails the guard in a frame already synced.
        if (POSE && synced) {
            const miss = entries.filter((en) => !heldSize(en)).map((en) => {
                const t = en.target as HTMLElement;
                const b = en.borderBoxSize?.[0];
                const held = heldOf(t);
                const who = t === root() ? "root" : [...regions.values()].find((r) => r.el === t)?.key ?? (seats.has(t) ? "seat" : t.className?.toString?.().slice(0, 40) || t.tagName);
                return { who, box: b ? [+b.inlineSize.toFixed(2), +b.blockSize.toFixed(2)] : null, held: held ? [+held.w.toFixed(2), +held.h.toFixed(2)] : null };
            });
            performance.mark("dock:ro-miss", { detail: { miss } });
        }
        sync("ro");""", """        if (synced && entries.every(heldSize)) return;
        sync("ro");"""),
 ("""    const body: DockBody = { postureFaces, exchange, sync, onSettle, moving: o.moving };
    if (POSE) body.__dockPose = __dockPose;
""", """    const body: DockBody = { postureFaces, exchange, sync, onSettle, moving: o.moving };
"""),
])
s = open(D + "composables/useDockBody.ts").read()
n = s.count("posing")
s = s.replace("&& posing", "&& postureTravel").replace("posing &&", "postureTravel &&").replace("(posing)", "(postureTravel)")
open(D + "composables/useDockBody.ts", "w").write(s)
print("posing uses replaced:", n, "left:", s.count("posing"))
edit("GlassDock.vue", [("""/* The loop's hold, test-only (W-I.8 Files): compiled in only when the build sets
   VITE_DOCK_HOLD=1, so the published bundle never carries `__dockHold` (G-12). */
if (import.meta.env.VITE_DOCK_HOLD === "1" && typeof window !== "undefined") {
    // Test-only hook: hold every travel of this dock at a given e.
    (window as unknown as { __dockHold?: Record<string, (f: number | null) => void> }).__dockHold ??= {};
    (window as unknown as { __dockHold: Record<string, (f: number | null) => void> }).__dockHold[dockId] = body.__dockPose!;
}

""", "")])
print("s2 edits applied")
