// D5 r0 census (E-1): the engage-ladder.test.ts:123-128 detector run raw and with comments stripped, plus a denominator read.
// node census.mjs <worktree>   (reads files only)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = process.argv[2]; const C = join(root, "src", "components");
const DIRS = readdirSync(C).filter((e) => e !== "_shared").filter((e) => statSync(join(C, e)).isDirectory());
const texts = (d, o = []) => { for (const e of readdirSync(d)) { const p = join(d, e); if (statSync(p).isDirectory()) texts(p, o); else if (/\.(css|vue|ts)$/.test(e)) o.push({ p, t: readFileSync(p, "utf8") }); } return o; };
// the shipped detector, verbatim (engage-ladder.test.ts:123-124)
const RUNG = /:active(?=[\s,){:.#[>+~])|\[data-held\]|data-engaged|tap-squish|interactive-item|--engage-/;
const decomment = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
// interactivity signals: a crude denominator read, not a verdict
const INTER = /@click|@pointerdown|@keydown|v-model|role="(button|slider|switch|checkbox|radio|tab|option|menuitem|combobox|textbox|spinbutton)"|tabindex|<button|<input|<textarea|Trigger\b|reka-ui/;
const HOVER = /:hover(?=[\s,){:.#[>+~])/;
const SCRIPT_PRESS = /useLiquidPress|useSpringPress|data-press-armed/;
const rows = DIRS.map((d) => { const T = texts(join(C, d)); const raw = T.some((x) => RUNG.test(x.t)); const dc = T.some((x) => RUNG.test(decomment(x.t)));
  return { d, raw, dc, inter: T.some((x) => INTER.test(x.t)), hover: T.some((x) => HOVER.test(decomment(x.t))), sp: T.some((x) => SCRIPT_PRESS.test(decomment(x.t))) }; });
const n = (f) => rows.filter(f).length;
console.log(`DIRS ${DIRS.length} · raw detector WITH-RUNG ${n((r) => r.raw)} RUNGLESS ${n((r) => !r.raw)} · decommented WITH-RUNG ${n((r) => r.dc)} RUNGLESS ${n((r) => !r.dc)}`);
console.log(`RUNGLESS(raw): ${rows.filter((r) => !r.raw).map((r) => r.d).join(" ")}`);
console.log(`comment-only rung (raw yes, decommented no): ${rows.filter((r) => r.raw && !r.dc).map((r) => r.d).join(" ") || "none"}`);
console.log(`rungless(raw) with an interactivity signal: ${rows.filter((r) => !r.raw && r.inter).map((r) => r.d).join(" ")} (${n((r) => !r.raw && r.inter)})`);
console.log(`rungless(raw) with NO interactivity signal: ${rows.filter((r) => !r.raw && !r.inter).map((r) => r.d).join(" ")} (${n((r) => !r.raw && !r.inter)})`);
console.log(`rungless(raw) that paint :hover: ${rows.filter((r) => !r.raw && r.hover).map((r) => r.d).join(" ")} (${n((r) => !r.raw && r.hover)})`);
console.log(`rungless(raw) with a SCRIPT press (useLiquidPress/useSpringPress/data-press-armed) the detector cannot see: ${rows.filter((r) => !r.raw && r.sp).map((r) => r.d).join(" ") || "none"}`);
console.log(`with-rung(raw) and no interactivity signal: ${rows.filter((r) => r.raw && !r.inter).map((r) => r.d).join(" ") || "none"}`);
