// Critic 4: every transition or animation declaration in a tree's source that sits in no
// cascade layer and is not `!important`, with whether a reduced-motion media query encloses
// it. Under 11.1.1 the reduced-motion fallback is a normal declaration in a last layer, so
// such a rule is no longer stilled by it.   node unlayered.mjs <tree root> <postcss dir>
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createRequire } from "node:module";

const [root, pcDir] = process.argv.slice(2);
const require = createRequire(join(pcDir, "package.json"));
const postcss = require("postcss");

function* files(dir) {
    for (const n of readdirSync(dir)) {
        const p = join(dir, n);
        const s = statSync(p);
        if (s.isDirectory()) yield* files(p);
        else if (/\.(css|vue)$/.test(n)) yield p;
    }
}

const MOTION = /^(transition|transition-duration|transition-property|animation|animation-name|animation-duration)$/;
for (const f of files(join(root, "src"))) {
    let text = readFileSync(f, "utf8");
    const blocks = [];
    if (f.endsWith(".vue")) {
        for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) blocks.push(m[1]);
    } else blocks.push(text);
    for (const css of blocks) {
        let tree;
        try { tree = postcss.parse(css); } catch { console.log("PARSE-FAIL", relative(root, f)); continue; }
        tree.walkDecls(MOTION, (d) => {
            if (d.important) return;
            let p = d.parent, layered = false, prm = "";
            while (p) {
                if (p.type === "atrule" && p.name === "layer") layered = true;
                if (p.type === "atrule" && p.name === "media" && /prefers-reduced-motion/.test(p.params)) prm = p.params;
                p = p.parent;
            }
            if (layered) return;
            const v = d.value.replace(/\s+/g, " ");
            const still = /^(none|0s|0ms)$/.test(v.trim());
            console.log(`${relative(root, f)}\t${d.parent.selector ?? d.parent.name}\t${d.prop}: ${v.slice(0, 80)}\t${prm || "-"}\t${still ? "still" : ""}`);
        });
    }
}
