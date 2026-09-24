import { readFileSync } from "node:fs"; import { join, resolve } from "node:path"; import { pathToFileURL } from "node:url";
const root = resolve("."); const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const read = (p) => readFileSync(join(root, p), "utf8");
const base = seal(root); const bs = Object.fromEntries(Object.entries(base.V).map(([k, v]) => [k, new Set(v)]));
const run = (id, ov) => { const r = seal(root, { overlay: ov }); const g = Object.fromEntries(Object.entries(r.V).map(([k, v]) => [k, v.filter((x) => !bs[k].has(x))]).filter(([, v]) => v.length)); console.log(id, JSON.stringify(g).slice(0, 600)); };
run("I7 (end of ./styles aggregate)", { "src/styles/index.css": read("src/styles/index.css") + '@import "../components/dock/styles/core.css";\n' });
run("I7c (glass kernel door)", { "src/styles/glass/index.css": read("src/styles/glass/index.css") + '@import "../../components/dock/styles/core.css";\n' });
