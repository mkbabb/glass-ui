import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const ROOT = process.argv[2];
const C = join(ROOT, "src", "components");
const dirs = readdirSync(C).filter(e => e !== "_shared").filter(e => statSync(join(C,e)).isDirectory());
function texts(d, out=[]) { for (const e of readdirSync(d)) { const p = join(d,e); if (statSync(p).isDirectory()) texts(p,out); else if (/\.(css|vue|ts)$/.test(e)) out.push(readFileSync(p,"utf8")); } return out; }
// `:active` in CSS PSEUDO-CLASS CONTEXT ONLY — the lookahead requires a selector-
// continuation character. A bare /:active/ scores `:active="isActive(…)"` (a Vue prop
// binding) and `v-model:active` (prose) as press rungs and INFLATES adoption.
const RE =
    /:active(?=[\s,){:.#[>+~])|\[data-held\]|data-engaged|tap-squish|interactive-item|--engage-/;
const withRung = dirs.filter(n => texts(join(C,n)).some(t => RE.test(t)));
const reg = readFileSync(join(ROOT,"src/styles/tokens/motion-registers.css"),"utf8");
const base = readFileSync(join(ROOT,"src/styles/utilities/base.css"),"utf8");
function walk(d, out=[]) { for (const e of readdirSync(d)) { const p=join(d,e); if (statSync(p).isDirectory()) walk(p,out); else if (/\.(css|vue|ts)$/.test(e)) out.push(p); } return out; }
// The guard census walks ALL of src/ (not src/styles alone): the menu-row rung that
// actually paints on the six shipped consumers lives in src/components/_shared/menu/.
const cssFiles = walk(join(ROOT,"src")).filter(p => p.endsWith(".css"));
const hoverGuards = cssFiles.filter(p => readFileSync(p,"utf8").includes("hover: hover")).length;
const srcFiles = walk(join(ROOT,"src"));
const envConsumers = srcFiles.filter(p => /engageEnvelope|ENGAGE_ENVELOPES|ACKNOWLEDGE_WINDOW_MS/.test(readFileSync(p,"utf8")));
console.log("component dirs (denominator):", dirs.length);
console.log("with rung beyond hover:", withRung.length);
console.log("WITHOUT rung:", dirs.length - withRung.length);
console.log("--engage-* tokens in motion-registers.css:", (reg.match(/--engage-[a-z-]+:/g)||[]).length);
console.log("ladder register exists:", existsSync(join(ROOT,"src/composables/motion/engage/engageLadder.ts")));
console.log("shared light legs on --duration-fast:", (base.match(/(background-color|border-color|box-shadow|color|opacity) var\(--duration-fast\)/g)||[]).length);
console.log("@media (hover: hover) CSS files in src/:", hoverGuards);
console.log("engageEnvelopes MENTIONS in src/ (raw-text detector — comments + type-only imports INCLUDED):", envConsumers.map(p=>p.slice(ROOT.length+1)));
