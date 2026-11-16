// appgrep.mjs: MEASURE-7, step 2 (RULINGS-6, the final REMOVES list; ORCH-LINES-6 line 3). Every name the removals
// commit deletes, and the prototype's additions RU-63 asks the build seat to cite, grepped in the committed source and
// tests of the eleven apps (USAGE.md's trees, read-only: `git grep` at each named ref, no checkout; gregg has no commits
// and is read as a working tree) and in glass's own tree at HEAD. A component's props are read from its tags: every
// `<Name ...>` in a .vue file, across lines, and every `h(Name, {...})` render call.
import { execFileSync } from "node:child_process";
const P = "/Users/mkbabb/Programming";
const APPS = [
    ["value.js", "value.js", ["origin/master", "HEAD"]],
    ["keyframes.js", "keyframes.js", ["origin/master", "HEAD"]],
    ["fourier-analysis", "fourier-analysis", ["origin/master", "HEAD"]],
    ["daraksha", "daraksha", ["origin/master", "HEAD"]],
    ["atlas", ".u-build/atlas-rc", ["HEAD"]],
    ["atlas (lt-integ)", ".u-build/lt-integ-atlas", ["HEAD"]],
    ["sci-report", "sci-report", ["HEAD"]],
    ["gregg", "gregg", [null]],
    ["speedtest", "speedtest", ["HEAD", "origin/master"]],
    ["gaggle-site", "gaggle-site", ["HEAD", "origin/master"]],
    ["slides", "slides", ["HEAD"]],
    ["reddit", "reddit", ["HEAD"]],
    ["Home Assistant", "hassio-config-worktrees/apx-ui-r11", ["HEAD", "origin/master"]],
];
const SELF = ["glass-ui (this branch)", "glass-ui/.claude/worktrees/bl/dock/wi8", ["HEAD"]];
const git = (dir, args) => { try { return execFileSync("git", ["-C", `${P}/${dir}`, ...args], { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] }); } catch (e) { return e.stdout ?? ""; } };
const SPEC = ["*.vue", "*.ts", "*.tsx", "*.js", "*.mjs", "*.css", ":!**/node_modules/**", ":!**/dist/**", ":!**/*.min.js", ":!**/.u-build/**"];
const ANY = "DockBackgroundToggle|useDockSearch|dock-search-field|useDockCtaReceive|useDockContext|provideDockContext|DOCK_CONTEXT_KEY|DockSeparator|DockLayerGroup|DockControl|ControlsDock|GlassDock|graspHeld|data-dock-scope|data-dock-glyph|#search|v-slot:search|#rim";
function files(dir, ref) {
    const out = ref ? git(dir, ["grep", "-l", "-E", ANY, ref, "--", ...SPEC]) : git(dir, ["grep", "--untracked", "-l", "-E", ANY, "--", ...SPEC]);
    return out.split("\n").filter(Boolean).map((l) => (ref ? l.slice(ref.length + 1) : l));
}
const read = (dir, ref, f) => (ref ? git(dir, ["show", `${ref}:${f}`]) : git(dir, ["show", `:${f}`]) || (() => { try { return execFileSync("cat", [`${P}/${dir}/${f}`], { encoding: "utf8" }); } catch { return ""; } })());
function tags(src, name) {
    const out = [];
    const re = new RegExp(`<${name}(?=[\\s/>])`, "g");
    for (const m of src.matchAll(re)) {
        let i = m.index + m[0].length, q = null;
        for (; i < src.length; i++) { const c = src[i]; if (q) { if (c === q) q = null; } else if (c === '"' || c === "'") q = c; else if (c === ">") break; }
        out.push({ at: src.slice(0, m.index).split("\n").length, text: src.slice(m.index, i + 1) });
    }
    for (const m of src.matchAll(new RegExp(`\\bh\\(\\s*${name}\\s*,\\s*\\{`, "g"))) {
        let i = m.index + m[0].length, d = 1;
        for (; i < src.length && d > 0; i++) { if (src[i] === "{") d++; else if (src[i] === "}") d--; }
        out.push({ at: src.slice(0, m.index).split("\n").length, text: src.slice(m.index, i), render: true });
    }
    return out;
}
const attrRe = (names) => new RegExp(`(?:^|[\\s{,])(?:[:@]|v-bind:|v-on:|v-model:)?(?:${names.join("|")})(?=[\\s=>/:,}]|$)`);
const CHECKS = [
    ["DockBackgroundToggle", (s) => /\bDockBackgroundToggle\b/.test(s)],
    ["useDockSearch", (s) => /\buseDockSearch\b/.test(s)],
    ["#search slot on GlassDock", (s, f) => f.endsWith(".vue") && /(<template\s+(#search|v-slot:search)\b)/.test(s) && /GlassDock|ControlsDock/.test(s)],
    ["dock-search-field (search.css)", (s) => /dock-search-field/.test(s)],
    ["useDockCtaReceive", (s) => /\buseDockCtaReceive\b/.test(s)],
    ["useDockContext", (s) => /\buseDockContext\b/.test(s)],
    ["provideDockContext", (s) => /\bprovideDockContext\b/.test(s)],
    ["DOCK_CONTEXT_KEY", (s) => /\bDOCK_CONTEXT_KEY\b/.test(s)],
    ["DockSeparator anchor", (s) => tags(s, "DockSeparator").filter((t) => attrRe(["anchor"]).test(t.text.replace(/^<DockSeparator/, " ")))],
    ["DockLayerGroup orientation/switcherPosition/motion", (s) => tags(s, "DockLayerGroup").filter((t) => attrRe(["orientation", "switcher-position", "switcherPosition", "motion"]).test(t.text.replace(/^<DockLayerGroup/, " ")))],
    ["DockControl type/as/asChild", (s) => tags(s, "DockControl").filter((t) => attrRe(["type", "as", "as-child", "asChild"]).test(t.text.replace(/^<DockControl|^h\(\s*DockControl/, " ")))],
    ["ControlsDock collapse/pinned", (s) => tags(s, "ControlsDock").filter((t) => attrRe(["collapse", "pinned", "update:pinned"]).test(t.text.replace(/^<ControlsDock/, " ")))],
    ["graspHeld (kept, 12.0.0)", (s) => /\bgraspHeld\b/.test(s)],
    ["GlassDock pinned / update:pinned", (s) => tags(s, "GlassDock").filter((t) => attrRe(["pinned", "update:pinned"]).test(t.text.replace(/^<GlassDock/, " ")))],
    ["GlassDock run", (s) => tags(s, "GlassDock").filter((t) => attrRe(["run"]).test(t.text.replace(/^<GlassDock/, " ")))],
    ["#rim slot", (s, f) => f.endsWith(".vue") && /<template\s+(#rim|v-slot:rim)\b/.test(s)],
    ["data-dock-scope", (s) => /data-dock-scope/.test(s)],
    ["data-dock-glyph", (s) => /data-dock-glyph/.test(s)],
];
const hits = Object.fromEntries(CHECKS.map(([k]) => [k, []]));
const read1 = new Map();
for (const [app, dir, refs] of [...APPS, SELF]) {
    for (const ref of refs) {
        const fs = files(dir, ref);
        for (const f of fs) {
            const key = `${dir}:${f}`;
            const s = read(dir, ref, f);
            for (const [k, fn] of CHECKS) {
                const r = fn(s, f);
                const list = Array.isArray(r) ? r : r ? [{ at: (s.split("\n").findIndex((l) => fn(l, f) === true) + 1) || "?" }] : [];
                for (const t of list) {
                    const line = `${app} @ ${ref ?? "working tree"}: ${f}:${t.at}${t.text ? `  ${t.text.replace(/\s+/g, " ").slice(0, 140)}` : ""}`;
                    if (!hits[k].some((h) => h.endsWith(`${f}:${t.at}${t.text ? `  ${t.text.replace(/\s+/g, " ").slice(0, 140)}` : ""}`) && h.startsWith(app))) hits[k].push(line);
                }
            }
            read1.set(key, true);
        }
        console.error(`${app} @ ${ref ?? "working tree"}: ${fs.length} files with a dock name`);
    }
}
for (const [k] of CHECKS) {
    const apps = hits[k].filter((h) => !h.startsWith("glass-ui"));
    const self = hits[k].filter((h) => h.startsWith("glass-ui"));
    console.log(`\n## ${k}: ${apps.length} in the apps, ${self.length} in glass`);
    for (const h of apps) console.log(`  ${h}`);
    for (const h of self.slice(0, 40)) console.log(`  ${h}`);
    if (self.length > 40) console.log(`  ... ${self.length - 40} more in glass`);
}
