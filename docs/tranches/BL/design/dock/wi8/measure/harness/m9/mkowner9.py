# mkowner9.py: MEASURE-9 part H, item H14 (RU-107, RU-122). Writes m9/owner9m.mjs from part M's pm/ownerm.mjs by exact
# replacements (each must match once), so the shooter keeps part M's rules and changes only what the rulings name:
#   - q14 (RU-122): every row is shot on one ground, the build page's: --ground <css colour> sets the stage's and the
#     page's background before the first shot of every q14 cell, in both trees, and each frame records the ground's
#     computed colour at the shot; the in-flow row's frames are cropped to the dock's plate (RU-107), not the whole row;
#   - q19 (RU-107): the first frame is a crop around the dialog with its title (24 px round it), and the third is shot
#     after the fold lands (the `collapsed` class and no `data-morphing`), its label giving both times;
#   - question 5's strip (RU-102 as amended): q5, w-card and w-rounded folded and open at 1440, light, Chromium only.
# Writes <out>/<set>.<label>.<engine>.<k>.png and <out>/owner9m.<label>.<engine>.json.
import os
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(H, "pm/ownerm.mjs")).read()
def rep(old, new):
    global s
    assert s.count(old) == 1, (s.count(old), old[:90])
    s = s.replace(old, new)
rep("// ownerm.mjs <port> <out-dir>", "// owner9m.mjs (m9/mkowner9.py writes it from pm/ownerm.mjs; RU-107, RU-122: see that script) <port> <out-dir>")
rep('const LABEL = val("--label", "build");', 'const LABEL = val("--label", "build");\nconst GROUND = val("--ground", "");')
# q14: one ground, recorded; the in-flow row cropped to its dock
rep("""            await p.mouse.move(2, 880); await sleep(400);
            const r0 = await read();""", """            if (GROUND) await p.evaluate((g) => { document.documentElement.style.background = g; document.body.style.background = g; for (const s of document.querySelectorAll("[data-testid=wi8-stage], [data-story-stage]")) s.style.background = g; }, GROUND);
            const groundAt = () => p.evaluate(() => { const s = document.querySelector("[data-testid=wi8-stage]") ?? document.body; return getComputedStyle(s).backgroundColor; });
            await p.mouse.move(2, 880); await sleep(400);
            const r0 = await read();""")
rep("""const file = `${out}/q14.${LABEL}.${engine}.${k++}.png`; await crop(p, `[data-testid=${row}]`, file, 16); await push({ set: "q14", file,""",
    """const file = `${out}/q14.${LABEL}.${engine}.${k++}.png`; await crop(p, id === "w-inflow" ? `[data-testid=${id}] .dock-plate` : `[data-testid=${row}]`, file, 16); await push({ set: "q14", ground: await groundAt(), row: id, file,""")
# q19: the dialog's own crop first; the third frame after the fold lands
rep("""            let f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);
            await push({ set: "q19", file: f, dock: D, wanted: "open", label: `a dialog opened from a dock button; the page behind it is dimmed and the dock is open; ${scheme}` });""",
    """            let f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await crop(p, "[data-testid=w-g8-dialog-content]", f, 24, true);
            await push({ set: "q19", file: f, dock: D, wanted: "open", first: true, label: `a dialog opened from a dock button, its title legible; the page behind it is dimmed and the dock is open; ${scheme}` });""")
rep("""            const ms = await waitFold(p, D, 14000);
            f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);""",
    """            const ms = await waitFold(p, D, 14000);
            const landed = ms === null ? null : await (async () => { const t1 = Date.now(); while (Date.now() - t1 < 2000) { if (!(await p.evaluate((d) => document.querySelector(d)?.hasAttribute("data-morphing"), D))) return Date.now() - t0; await sleep(50); } return null; })();
            await sleep(120);
            f = `${out}/q19.${LABEL}.${engine}.${k++}.png`; await stageShot(p, f);""")
rep("""foldMs: ms === null ? null : Date.now() - t0, label: ms !== null ? `the dock folds by itself ${((Date.now() - t0) / 1000).toFixed(1)} s after that press, its usual pause; ${scheme}`""",
    """foldMs: ms === null ? null : Date.now() - t0, landedMs: landed, label: ms !== null ? `the dock has folded by itself and landed, ${((landed ?? Date.now() - t0) / 1000).toFixed(1)} s after that press (its usual pause, then the fold); ${scheme}`""")
# question 5: the folded card and rounded docks (Chromium only, RU-107)
rep("""    k = 0;
    if (want("q20") && LABEL === "build")""", """    k = 0;
    if (want("q5") && LABEL === "build" && engine === "chromium") for (const id of ["w-card", "w-rounded", "w-pill"]) {
        await cell({ w: 1440, scheme: "light", url: `?c=dock-wi8&cell=${id}` }, async (p) => {
            const D = `[data-testid=${id}]`;
            const corner = () => p.evaluate((d) => { const pl = document.querySelector(d)?.querySelector(".dock-plate"); if (!pl) return null; const r = pl.getBoundingClientRect(); const cs = getComputedStyle(pl); const rad = cs.borderTopLeftRadius.endsWith("%") ? (parseFloat(cs.borderTopLeftRadius) / 100) * Math.min(r.width, r.height) : parseFloat(cs.borderTopLeftRadius); return { w: Math.round(r.width), h: Math.round(r.height), corner: Math.round(Math.min(rad, r.width / 2, r.height / 2)) }; }, D);
            await p.mouse.move(2, 880); await sleep(500);
            let c = await corner(); let f = `${out}/q5.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 24);
            await push({ set: "q5", file: f, dock: D, wanted: "folded", label: `a ${id.slice(2)} dock folded: ${c.w} by ${c.h} px, its corner ${c.corner} px` });
            await openDock(p, D, false); await sleep(900);
            c = await corner(); f = `${out}/q5.${LABEL}.${engine}.${k++}.png`; await crop(p, D, f, 24);
            await push({ set: "q5", file: f, dock: D, wanted: "open", label: `the same dock open: ${c.w} by ${c.h} px, its corner ${c.corner} px` });
        });
    }
    k = 0;
    if (want("q20") && LABEL === "build")""")
rep("<out>/ownerm.<label>.<engine>.json", "<out>/owner9m.<label>.<engine>.json")
s = s.replace("`${out}/ownerm.${LABEL}.${engine}.json`", "`${out}/owner9m.${LABEL}.${engine}.json`")
assert "owner9m.${LABEL}" in s, "the meta file name was not replaced"
open(os.path.join(H, "m9/owner9m.mjs"), "w").write(s)
print("wrote m9/owner9m.mjs")
