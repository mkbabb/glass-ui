// Factor isolation: which colour shapes abort the WebKit page process when a
// rule applies them as background-color on hover. One browser per run, a new
// context per cell, all closed in finally.
import { webkit, chromium } from "playwright";
import { writeFileSync } from "node:fs";

const engine = process.argv[2] === "chromium" ? chromium : webkit;
const out = process.argv[3];

const INK = "oklch(0.28 0.035 70)";
const CARD = "hsl(30 85% 96%)";
const rel = (a) => `oklch(from ${INK} l c h / ${a})`;
const relVar = (a) => `oklch(from var(--ink) l c h / ${a})`;
const plate = (c, pct = "100%", card = CARD) => `color-mix(in srgb, ${c} ${pct}, ${card})`;

// Each cell: [name, --h value, extra css]
const T = (a) => `oklch(0.28 0.035 70 / ${a})`;
const CELLS = process.env.ROUND === "2" ? [
    ["both arms opaque literal mixes", "color-mix(in oklab, color-mix(in srgb, red, blue), color-mix(in srgb, green, white))"],
    ["both arms opaque mixes, 35% on second", "color-mix(in oklab, color-mix(in srgb, red, blue), color-mix(in srgb, green, white) 35%)"],
    ["both arms translucent literal mixes", `color-mix(in oklab, color-mix(in srgb, ${T(0.1)}, ${T(0.2)}), color-mix(in srgb, ${T(0.3)}, ${T(0.4)}))`],
    ["arm 1 translucent mix, arm 2 opaque mix", `color-mix(in oklab, color-mix(in srgb, ${T(0.1)}, ${CARD}), color-mix(in srgb, red, blue))`],
    ["arm 1 opaque mix, arm 2 translucent mix", `color-mix(in oklab, color-mix(in srgb, red, blue), color-mix(in srgb, ${T(0.1)}, ${CARD}))`],
    ["both arms translucent mixes with transparent", `color-mix(in oklab, color-mix(in srgb, ${T(1)} 10%, transparent), color-mix(in srgb, ${T(1)} 14%, transparent))`],
    ["both arms mixes, srgb outer", `color-mix(in srgb, ${plate(T(0.1))}, ${plate(T(0.14))} 35%)`],
    ["both arms mixes, oklch outer", `color-mix(in oklch, ${plate(T(0.1))}, ${plate(T(0.14))} 35%)`],
    ["both arms the same mix", `color-mix(in oklab, ${plate(T(0.1))}, ${plate(T(0.1))})`],
    ["both arms relative colours of mixes", `color-mix(in oklab, oklch(from ${plate(T(0.1))} l c h), oklch(from ${plate(T(0.14))} l c h) 35%)`],
    ["arm mix + arm relative colour", `color-mix(in oklab, ${plate(T(0.1))}, ${rel(0.14)} 35%)`],
    ["arm mix + arm light-dark()", `color-mix(in oklab, ${plate(T(0.1))}, light-dark(red, blue) 35%)`],
    ["both arms light-dark()", "color-mix(in oklab, light-dark(red, blue), light-dark(green, white) 35%)"],
    ["both arms currentcolor mixes", "color-mix(in oklab, color-mix(in srgb, currentcolor 10%, transparent), color-mix(in srgb, currentcolor 20%, transparent))"],
    ["arm mix + arm currentcolor mix", `color-mix(in oklab, ${plate(T(0.1))}, color-mix(in srgb, currentcolor 20%, transparent))`],
    ["arm mix + arm mix holding a mix", `color-mix(in oklab, ${plate(T(0.1))} 50%, color-mix(in srgb, ${plate(T(0.14))} 50%, transparent))`],
    ["mix of (mix, plain) inside a mix", `color-mix(in oklab, color-mix(in oklab, ${plate(T(0.1))}, ${CARD}) 50%, transparent)`],
] : [
    ["plain colour", "rgb(10 20 30 / 0.5)"],
    ["one level, relative arm", plate(rel(0.1))],
    ["relative colour alone", rel(0.1)],
    ["two levels, literal arms", `color-mix(in oklab, ${plate("oklch(0.28 0.035 70 / 0.1)")}, ${plate("oklch(0.28 0.035 70 / 0.14)")} 35%)`],
    ["two levels, relative in both inner mixes", `color-mix(in oklab, ${plate(rel(0.1))}, ${plate(rel(0.14))} 35%)`],
    ["two levels, relative in one inner mix, other plain", `color-mix(in oklab, ${plate(rel(0.1))}, ${CARD} 35%)`],
    ["two levels, relative in one inner mix, other transparent", `color-mix(in oklab, ${plate(rel(0.1))} 50%, transparent)`],
    ["two levels, relative at 100% calc", `color-mix(in oklab, ${plate(rel(0.1), "calc(1 * 100%)")}, ${plate(rel(0.14), "calc(1 * 100%)")} 35%)`],
    ["two levels, relative, inner at 50%", `color-mix(in oklab, ${plate(rel(0.1), "50%")}, ${plate(rel(0.14), "50%")} 35%)`],
    ["two levels, relative with var() origin", `color-mix(in oklab, ${plate(relVar(0.1))}, ${plate(relVar(0.14))} 35%)`],
    ["two levels, light-dark() card, no relative", `color-mix(in oklab, ${plate("oklch(0.28 0.035 70 / 0.1)", "50%", "light-dark(hsl(30 85% 96%), hsl(26 22% 17%))")} 50%, transparent)`],
    ["two levels, currentcolor, no relative", `color-mix(in oklab, ${plate("currentcolor", "50%")} 50%, transparent)`],
    ["outer mix holds relative arm and a plain inner mix", `color-mix(in oklab, ${rel(0.1)}, ${plate("oklch(0.28 0.035 70 / 0.14)")} 35%)`],
    ["relative colour of a mix, inside a mix", `color-mix(in oklab, oklch(from ${plate("oklch(0.28 0.035 70 / 0.14)")} l c h / 0.5) 50%, transparent)`],
    ["relative colour of a mix, alone", `oklch(from ${plate("oklch(0.28 0.035 70 / 0.14)")} l c h / 0.5)`],
    ["rgb() relative in two levels", `color-mix(in oklab, ${plate(`rgb(from ${INK} r g b / 0.1)`)} 50%, transparent)`],
    ["two levels, relative, opaque inner alpha", `color-mix(in oklab, ${plate(`oklch(from ${INK} l c h)`)} 50%, transparent)`],
    ["three levels, relative", `color-mix(in oklab, color-mix(in oklab, ${plate(rel(0.1))} 50%, transparent) 50%, transparent)`],
];

const PROPS = ["background-color"];
const M1 = "color-mix(in oklab, hsl(26 22% 17%), black 50%)";
const M2 = plate(T(0.1));
const BOTH = `color-mix(in oklab, ${M1}, ${M2} 35%)`;
const DEEP = `color-mix(in srgb, color-mix(in srgb, ${M1} 22%, ${M1}) 20%, transparent)`;
const ROUND3 = [
    ["color", `color: ${BOTH};`],
    ["border-top-color", `border-top: 2px solid ${BOTH};`],
    ["outline-color", `outline: 2px solid ${BOTH};`],
    ["box-shadow colour", `box-shadow: 0 2px 8px ${BOTH};`],
    ["text-shadow colour", `text-shadow: 0 1px 2px ${BOTH};`],
    ["filter drop-shadow colour", `filter: drop-shadow(0 4px 14px ${BOTH});`],
    ["linear-gradient stop", `background-image: linear-gradient(${BOTH}, red);`],
    ["background-color, both-arms mix one level deeper", `background-color: ${DEEP};`],
    ["filter drop-shadow, both-arms mix one level deeper (the blob shape)", `filter: drop-shadow(0 4px 14px ${DEEP}) drop-shadow(0 1px 3px ${DEEP});`],
    ["registered <color> arms holding mixes", `--ra: ${M1}; --rb: ${M2}; background-color: color-mix(in oklab, var(--ra), var(--rb) 35%);`],
    ["fill (svg)", `fill: ${BOTH};`],
];

// Round 4: controls for round 3, and which arm shapes count as "a mix" to WebKit.
const RELV = (a) => `oklch(from var(--ink) l c h / ${a})`;
const ROUND4 = [
    ["control: plain background", "background-color: rgb(1 2 3);"],
    ["control: one mix arm, other plain, on color", `color: color-mix(in oklab, ${M1}, red 35%);`],
    ["both arms relative, literal origin", `background-color: color-mix(in oklab, ${rel(0.1)}, ${rel(0.14)} 35%);`],
    ["both arms relative, var() origin", `background-color: color-mix(in oklab, ${RELV(0.1)}, ${RELV(0.14)} 35%);`],
    ["arm mix + arm relative colour of a mix", `background-color: color-mix(in oklab, ${M2}, oklch(from ${M1} l c h) 35%);`],
    ["arm relative of a mix + arm plain", `background-color: color-mix(in oklab, oklch(from ${M1} l c h), red 35%);`],
    ["both arms light-dark() holding mixes", `background-color: color-mix(in oklab, light-dark(${M1}, red), light-dark(${M2}, blue) 35%);`],
    ["registered <color> arms holding plain colours", "--ra: red; --rb: blue; background-color: color-mix(in oklab, var(--ra), var(--rb) 35%);"],
    ["registered <color> arm holding a mix, other plain", `--ra: ${M1}; background-color: color-mix(in oklab, var(--ra), red 35%);`],
    ["cured hover shape: one mix, relative var() ink, calc alpha and level", "--lvl: 1; --vq: 0.1; --vr: 0.14; background-color: color-mix(in srgb, oklch(from var(--ink) l c h / calc(0.65 * var(--vq) + 0.35 * var(--vr))) calc(var(--lvl) * 100%), hsl(30 85% 96%));"],
    ["cured blob shape: relative shadow colour, mix of it, drop-shadow", "--sc: oklab(from hsl(24 9% 4%) calc(l * 0.5) calc(a * 0.5) calc(b * 0.5)); --bsc: color-mix(in srgb, var(--sc) 22%, var(--sc)); filter: drop-shadow(0 4px 14px color-mix(in srgb, var(--bsc) 20%, transparent));"],
];

function html(value, prop, onHover) {
    const body = prop === "decl" ? value : `${prop}: var(--h);`;
    return `<!doctype html><html><head><style>
@property --ra { syntax: "<color>"; inherits: true; initial-value: transparent; }
@property --rb { syntax: "<color>"; inherits: true; initial-value: transparent; }
:root { --ink: ${INK}; color-scheme: light; }
button { width: 200px; height: 60px; }
#t { --h: ${prop === "decl" ? "red" : value}; }
#t${onHover ? ":hover" : ""} { ${body} }
</style></head><body><button id="t">target</button></body></html>`;
}

const rows = [];
const browser = await engine.launch({ headless: true });
try {
    const plan = process.env.ROUND === "3" ? [["decl", ROUND3]] : process.env.ROUND === "4" ? [["decl", ROUND4]] : PROPS.map((p) => [p, CELLS]);
    for (const [prop, cells] of plan) {
        for (const onHover of [true, false]) {
            for (const [name, value] of cells) {
                const context = await browser.newContext();
                let crashed = false;
                let resolved = null;
                let error = null;
                try {
                    const page = await context.newPage();
                    page.on("crash", () => { crashed = true; });
                    await page.setContent(html(value, prop, onHover));
                    if (onHover) await page.hover("#t", { timeout: 5000 });
                    await page.waitForTimeout(250);
                    resolved = await page.evaluate((p) => { const cs = getComputedStyle(document.getElementById("t")); return p === "decl" ? [cs.backgroundColor, cs.color, cs.filter, cs.boxShadow].join(" | ").slice(0, 200) : cs.getPropertyValue(p); }, prop);
                } catch (e) {
                    error = String(e.message || e).split("\n")[0];
                } finally {
                    await context.close().catch(() => {});
                }
                const row = { prop, trigger: onHover ? "hover" : "load", name, value, crashed, resolved, error };
                rows.push(row);
                console.log(`${crashed ? "CRASH" : "ok   "} ${row.trigger.padEnd(5)} ${name}${resolved ? "  -> " + resolved : ""}`);
            }
        }
    }
} finally {
    await browser.close();
}
if (out) writeFileSync(out, JSON.stringify({ engine: engine.name(), rows }, null, 1));
