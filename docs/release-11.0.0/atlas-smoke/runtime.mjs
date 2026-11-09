import { registerHooks } from "node:module";
import { readFileSync } from "node:fs";
registerHooks({
    load(url, context, next) {
        if (url.endsWith(".css")) return { format: "module", source: "", shortCircuit: true };
        return next(url, context);
    },
});
const { values } = JSON.parse(readFileSync("./imports.json", "utf8"));
let bad = 0;
for (const [spec, names] of Object.entries(values)) {
    const mod = await import(spec);
    const missing = names.filter((n) => mod[n] === undefined);
    if (missing.length) { bad++; console.error(`MISSING ${spec}: ${missing.join(", ")}`); }
    else console.log(`ok ${spec}: ${names.length}`);
}
const dock = await import("@mkbabb/glass-ui/dock");
if ("DockTrigger" in dock) { bad++; console.error("DockTrigger still on ./dock"); }
const props = (c) => Object.keys(c.props ?? {});
const gd = props(dock.GlassDock);
for (const p of ["anchor", "expandOn", "collapsedLabel", "backdropMode"]) if (!gd.includes(p)) { bad++; console.error(`GlassDock lacks ${p}`); }
const card = props((await import("@mkbabb/glass-ui/card")).Card);
if (!card.includes("backdropMode")) { bad++; console.error("Card lacks backdropMode"); }
const { STILL_FIELD } = await import("@mkbabb/glass-ui/aurora");
console.log("STILL_FIELD", JSON.stringify(STILL_FIELD));
if (bad) process.exit(1);
console.log("RUNTIME GREEN");
