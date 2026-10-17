# r8-variant.py (D2-G pass 4, obligation N1/R8): write one measurement variant of the aperture into the
# seat worktree's useDockAperture.ts (the shipped file is saved beside it first and restored by `restore`).
#   python3 r8-variant.py <worktree> main|watch|hold|restore
# Variants (none ships; each is built as label r8-<v> and read by ST stall·nb·* and W3 neighbour·*):
#   main   the glass on the flow's clock: every dock animation carries an unregistered custom property,
#          which no engine composites, so the lanes run on the main thread with the flow.
#   watch  main + a stall watchdog: a rAF reader that, after a frame gap above 3 grid steps, shifts every
#          episode animation's startTime by the gap less one step (and re-arms the landing), so glass and
#          flow resume together from where they froze.
#   hold   the flow holds the layout length at the union through the episode: an expand hands the length
#          over at the flip, a collapse at the landing (the neighbour steps once).
import sys, shutil, os
wt, v = sys.argv[1], sys.argv[2]
p = os.path.join(wt, "src/components/dock/composables/useDockAperture.ts")
keep = p + ".shipped"
if v == "restore":
    shutil.copyfile(keep, p); os.remove(keep); print("restored"); sys.exit(0)
if os.path.exists(keep): shutil.copyfile(keep, p)
else: shutil.copyfile(p, keep)
s = open(p).read()
def rep(old, new):
    global s
    assert s.count(old) == 1, (s.count(old), old[:80]); s = s.replace(old, new)
MAIN = '''
// [r8 variant: main] the dock's animations on the main thread (an uncomposited property in every keyframe)
if (typeof Element !== "undefined" && !(Element.prototype as any).__dockMainClock) {
    const a0 = Element.prototype.animate;
    (Element.prototype as any).__dockMainClock = true;
    Element.prototype.animate = function (this: Element, k: any, o?: any) {
        if (Array.isArray(k) && this.closest?.(".glass-dock"))
            k = k.map((f: any, i: number) => ({ ...f, "--dock-clock": String(f.offset ?? i) }));
        return a0.call(this, k, o);
    } as any;
}
'''
if v in ("main", "watch"):
    rep('const LAND_STEPS = 2;', 'const LAND_STEPS = 2;' + MAIN)
if v == "watch":
    rep('''        ep.timers.push(window.setTimeout(() => land(ep), wait(ep.endMs)));''', '''        ep.timers.push(window.setTimeout(() => land(ep), wait(ep.endMs)));
        // [r8 variant: watch] a frame gap above 3 grid steps shifts the episode by the gap less a step
        let last = -1;
        const tick = (now: number) => {
            if (episode !== ep) return;
            if (last >= 0 && now - last > 3 * STEP_MS) {
                const shift = now - last - STEP_MS;
                for (const an of ep.anims) if (an.startTime != null) an.startTime = (an.startTime as number) + shift;
                for (const id of ep.timers) clearTimeout(id);
                const st = ep.anims.find((an) => an.startTime != null)?.startTime as number | undefined;
                const left = st == null ? ep.endMs : Math.max(0, ep.endMs - (now - st));
                ep.timers = [window.setTimeout(() => land(ep), left + STEP_MS)];
            }
            last = now;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);''')
if v == "hold":
    rep('''            const m = grid.map((_, i) => Bg[i] - Ag[i]);''', '''            // [r8 variant: hold] the layout length held at the union: a collapse keeps its old
            // length to the landing, an expand takes its new one at the flip
            const held = Math.max(0, Bg[0] - Ag[0]);
            const m = grid.map((_, i) => (i === grid.length - 1 ? 0 : held));''')
open(p, "w").write(s); print("variant", v)
