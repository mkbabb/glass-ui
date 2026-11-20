// codelines.mjs <ref|WORKTREE> [...]: the eighth pass's dock line count by ORCH-LINES-7 line 2, read from a git ref (git show,
// no checkout) or, with WORKTREE, from the files on disk. Every .ts, .vue and .css under src/components/dock, tests aside
// (the file set of RULINGS-7's budget). A line is code unless it is blank or its first non-blank characters open or
// continue a comment (/* */, //, <!-- -->); a trailing comment counts as code. Prints wc -l, code, comment and blank per
// ref, and per file with --files.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
const W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8";
const D = "src/components/dock";
const args = process.argv.slice(2);
const perFile = args.includes("--files");
const refs = args.filter((a) => !a.startsWith("--"));
const git = (...a) => execFileSync("git", ["-C", W, ...a], { encoding: "utf8", maxBuffer: 1 << 28 });
function files(ref) {
    const list = ref === "WORKTREE" ? git("ls-files", "--", D) : git("ls-tree", "-r", "--name-only", ref, "--", D);
    return list.split("\n").filter((f) => /\.(ts|vue|css)$/.test(f) && !/\.test\.ts$|\/__tests__\//.test(f));
}
const read = (ref, f) => (ref === "WORKTREE" ? readFileSync(`${W}/${f}`, "utf8") : git("show", `${ref}:${f}`));
function classify(src) {
    const lines = src.split("\n");
    if (lines.length && lines[lines.length - 1] === "") lines.pop(); // wc -l counts newlines
    let inBlock = false, inHtml = false;
    const n = { total: lines.length, code: 0, comment: 0, blank: 0 };
    for (const line of lines) {
        const t = line.trim();
        let kind;
        if (inBlock || inHtml) kind = "comment";
        else if (t === "") kind = "blank";
        else if (t.startsWith("//") || t.startsWith("/*") || t.startsWith("<!--")) kind = "comment";
        else kind = "code";
        // advance the block-comment state across the line
        let i = 0;
        while (i < line.length) {
            if (inBlock) { const j = line.indexOf("*/", i); if (j < 0) break; inBlock = false; i = j + 2; continue; }
            if (inHtml) { const j = line.indexOf("-->", i); if (j < 0) break; inHtml = false; i = j + 3; continue; }
            const a = line.indexOf("/*", i), h = line.indexOf("<!--", i), s = line.indexOf("//", i);
            const cands = [[a, "a"], [h, "h"], [s, "s"]].filter(([k]) => k >= 0).sort((x, y) => x[0] - y[0]);
            if (!cands.length) break;
            const [k, w] = cands[0];
            if (w === "s") { if (k > 0 && line[k - 1] === ":") { i = k + 2; continue; } break; } // a line comment ends the line (a URL's :// does not)
            if (w === "a") { inBlock = true; i = k + 2; } else { inHtml = true; i = k + 4; }
        }
        n[kind]++;
    }
    return n;
}
for (const ref of refs) {
    const tot = { total: 0, code: 0, comment: 0, blank: 0 };
    const rows = [];
    for (const f of files(ref)) {
        const n = classify(read(ref, f));
        for (const k in tot) tot[k] += n[k];
        rows.push([f.slice(D.length + 1), n]);
    }
    console.log(`${ref}: wc -l ${tot.total}, code ${tot.code}, comment ${tot.comment}, blank ${tot.blank} (${rows.length} files)`);
    if (perFile) for (const [f, n] of rows.sort((x, y) => y[1].code - x[1].code)) console.log(`  ${String(n.code).padStart(5)} code  ${String(n.total).padStart(5)} wc  ${f}`);
}
