# mkcost9.py: writes s9/cost9.mjs from m8/cost8.mjs for S7 (RU-103 as amended for C8-M9): G-11 also reads the landing
# frame and the two frames after it. The init script stamps `dock:land` (console.timeStamp) when a dock's
# `data-morphing` goes; each landing's frame (BeginFrame to BeginFrame) and the two after it list their Layout events
# under a script stack (forced) beside their own. The log is logs/m8-cost-<tag>.json as before, each cell gaining
# `landings`. Nothing else changes.
import os
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(H, "m8", "cost8.mjs")).read()
s = "// cost9.mjs: s9/mkcost9.py's copy of m8/cost8.mjs with the landing frames (RU-103 as amended for C8-M9).\n" + s
old = """addEventListener('DOMContentLoaded', () => {
  new MutationObserver((ms) => { for (const m of ms) { const k = m.target; window.__styleMut.set(k, (window.__styleMut.get(k) || 0) + 1); } })
    .observe(document.body, { attributes: true, attributeFilter: ['style'], subtree: true });
});`;"""
new = """addEventListener('DOMContentLoaded', () => {
  new MutationObserver((ms) => { for (const m of ms) { const k = m.target; window.__styleMut.set(k, (window.__styleMut.get(k) || 0) + 1); } })
    .observe(document.body, { attributes: true, attributeFilter: ['style'], subtree: true });
  new MutationObserver((ms) => { for (const m of ms) if (m.target.classList?.contains('glass-dock') && m.oldValue !== null && !m.target.hasAttribute('data-morphing')) console.timeStamp('dock:land'); })
    .observe(document.body, { attributes: true, attributeFilter: ['data-morphing'], attributeOldValue: true, subtree: true });
});`;"""
assert s.count(old) == 1; s = s.replace(old, new)
old2 = """                const longest = +Math.max(0, ...lay.map((e) => (e.dur || 0) / 1000)).toFixed(3);"""
new2 = """                // C8-M9: each landing (a dock's data-morphing removed), its frame and the two after it
                const lands = events.filter((e) => e.name === "TimeStamp" && e.args?.data?.message === "dock:land").map((e) => e.ts).sort((p, q) => p - q);
                const landings = lands.map((ts) => {
                    let b0 = [...begins].reverse().find((b) => b <= ts) ?? ts - 16000;
                    const fr = [];
                    for (let k = 0; k < 3; k++) {
                        const b1 = begins.find((b) => b > b0) ?? b0 + 16700;
                        const LL = lay.filter((e) => e.ts >= b0 && e.ts < b1);
                        const forcedL = LL.filter((e) => stackOf(e).length);
                        fr.push({ layouts: LL.length, forced: forcedL.length, forcedStacks: forcedL.map((e) => stackOf(e).join(" < ")) });
                        b0 = b1;
                    }
                    return { frames: fr, forced: fr.reduce((s2, f) => s2 + f.forced, 0) };
                });
                const longest = +Math.max(0, ...lay.map((e) => (e.dur || 0) / 1000)).toFixed(3);"""
assert s.count(old2) == 1; s = s.replace(old2, new2)
old3 = """                    longestLayoutMs: longest,"""
new3 = """                    landings,
                    landingForced: landings.reduce((s2, l) => s2 + l.forced, 0),
                    longestLayoutMs: longest,"""
assert s.count(old3) == 1; s = s.replace(old3, new3)
open(os.path.join(H, "s9", "cost9.mjs"), "w").write(s)
print("s9/cost9.mjs written")
