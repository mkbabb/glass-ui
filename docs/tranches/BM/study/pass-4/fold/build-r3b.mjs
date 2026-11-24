// BM pass 4, fold of pass 3 (A1, A2, A3, A4, B3-1, B3-3, B3-4, B3-5, B3-6, B3-7, B3-10): rebuilds pages/R3b.html.
// It keeps the two inlined grounds (the owner's photograph and the aurora field) from the pass-3 page and rewrites
// everything else. The alphas are pass-4/fold/material-fold.json's `bounds`.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-4/fold/build-r3b.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGE = path.resolve(HERE, "../../pages/R3b.html");
const old = readFileSync(PAGE, "utf8");
const uris = [...old.matchAll(/url\("(data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+)"\)/g)].map((m) => m[1]);
if (uris.length < 2) throw new Error("expected the photograph and the aurora data URIs in R3b.html");
const [PHOTO, AURORA] = uris;
const b = JSON.parse(readFileSync(path.join(HERE, "material-fold.json"), "utf8")).bounds;
const pct = (a) => (a * 100).toFixed(1) + "%";
const page = `<title>Glass Word Legibility</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* BM pass 4's rebuild of R3b (the fold of pass 3's critiques). Three chrome panels A, B, C over six grounds, each a
   dock pill (a selected seat and a word) above a two-row menu (one highlighted row). No panel blurs: the floating
   and overlay rungs, which carry the dock, menus, sheets and dialogs, sample no backdrop from 12.0.0 (O-260). Each
   panel is glass-ui's own card colour at one alpha over whatever is behind it (BL D3's material law); they differ
   in the ink the alpha is solved for (pass-4/fold/material-fold.json): A the muted ink at 4.8:1, B the foreground
   at 4.8:1, C the foreground at 3.3:1. A keeps a grey second line; B and C use one ink. */
:root {
  --bg: hsl(40 30% 98%);
  --fg: hsl(24 10% 10%);
  --muted: hsl(24 6% 36%);
  --line: hsl(30 14% 84%);
  --ask-bg: hsl(36 88% 90%);
  --on-glass: hsl(24 10% 10%);
  --on-glass-muted: hsl(30 26% 35%);
  --card: hsl(30 85% 96%);
  --plate-a: color-mix(in srgb, var(--card) ${pct(b.light.A)}, transparent);
  --plate-b: color-mix(in srgb, var(--card) ${pct(b.light.B)}, transparent);
  --plate-c: color-mix(in srgb, var(--card) ${pct(b.light.C)}, transparent);
  /* today's highlighted-row and current-seat fill: the quiet rung's warm ink (menu.css:10, tokens/glass.css) */
  --state-fill: oklch(0.28 0.035 70 / 0.10);
  --edge: hsl(24 10% 10% / 0.08);
  --ground-white: #fff;
  --ground-black: #000;
  --ground-grey: #808080;
  --label: #fff;
  --font: -apple-system, system-ui, "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, "SF Mono", Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: hsl(24 9% 4%); --fg: hsl(30 14% 90%); --muted: hsl(30 8% 64%); --line: hsl(26 12% 22%);
    --ask-bg: hsl(30 40% 15%); --on-glass: hsl(30 14% 90%); --on-glass-muted: hsl(34 16% 72%);
    --card: hsl(26 22% 17%);
    --plate-a: color-mix(in srgb, var(--card) ${pct(b.dark.A)}, transparent);
    --plate-b: color-mix(in srgb, var(--card) ${pct(b.dark.B)}, transparent);
    --plate-c: color-mix(in srgb, var(--card) ${pct(b.dark.C)}, transparent);
    --state-fill: oklch(0.17 0.03 70 / 0.14);
    --edge: hsl(30 14% 90% / 0.08);
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: hsl(24 9% 4%); --fg: hsl(30 14% 90%); --muted: hsl(30 8% 64%); --line: hsl(26 12% 22%);
  --ask-bg: hsl(30 40% 15%); --on-glass: hsl(30 14% 90%); --on-glass-muted: hsl(34 16% 72%);
  --card: hsl(26 22% 17%);
  --plate-a: color-mix(in srgb, var(--card) ${pct(b.dark.A)}, transparent);
  --plate-b: color-mix(in srgb, var(--card) ${pct(b.dark.B)}, transparent);
  --plate-c: color-mix(in srgb, var(--card) ${pct(b.dark.C)}, transparent);
  --state-fill: oklch(0.17 0.03 70 / 0.14);
  --edge: hsl(30 14% 90% / 0.08);
  color-scheme: dark;
}
body {
  background: var(--bg); color: var(--fg); font: 16px/1.45 var(--font);
  padding-block: 16px 64px;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
}
main { max-width: 760px; margin-inline: auto; display: grid; gap: 14px; }
.ask { background: var(--ask-bg); border-radius: 14px; padding: 14px 16px; font-size: 17px; margin: 0; }
.env { font: 13px/1.4 var(--mono); color: var(--muted); margin: 0; }
.legend { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; font-size: 15px; color: var(--muted); }
.legend span { color: var(--fg); }
.cols, .row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.cols { padding-inline: 10px; text-align: center; position: sticky; top: env(safe-area-inset-top, 0px); background: var(--bg); padding-block: 6px; z-index: 3; }
.band { border-radius: 10px; padding: 30px 10px 16px; display: grid; gap: 8px; }
.band .name { font: 14px/1 var(--font); color: var(--label); mix-blend-mode: difference; margin: 0; }
.white { background: var(--ground-white); }
.black { background: var(--ground-black); }
.grey { background: var(--ground-grey); }
.photo { background: url("${PHOTO}") center / cover; }
.photo.second { background-position: 30% 75%; }
.aurora { background: url("${AURORA}") center / cover; }
.page-ground { background: var(--bg); box-shadow: inset 0 0 0 1px var(--line); }
#bands, #edges { display: grid; gap: 10px; }
.spec { display: grid; gap: 8px; min-width: 0; }
.pill, .menu { box-sizing: border-box; border: 1px solid transparent; color: var(--on-glass); }
.pill { height: 48px; border-radius: 24px; display: flex; align-items: center; gap: 4px; padding-inline: 4px 10px; font: 400 15px/1 var(--font); overflow: hidden; }
.seat { flex: none; width: 38px; height: 38px; border-radius: 19px; display: grid; place-items: center; background: var(--state-fill); }
.seat svg { width: 20px; height: 20px; fill: currentColor; }
.menu { border-radius: 16px; padding: 5px; display: grid; gap: 2px; font: 400 15px/1.2 var(--font); }
.menu .r { border-radius: 11px; padding: 8px 8px; min-width: 0; }
.menu .r.hl { background: var(--state-fill); }
.menu small { display: block; font-size: 14px; margin-top: 2px; }
.A .menu small { color: var(--on-glass-muted); }
.A > * { background: var(--plate-a); }
.B > * { background: var(--plate-b); }
.C > * { background: var(--plate-c); }
.edged > * { border-color: var(--edge); }
.pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.pair-head { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; text-align: center; font-size: 15px; color: var(--muted); padding-inline: 10px; }
.note { color: var(--muted); font-size: 15px; margin: 0; }
h2 { font: 400 17px/1.3 var(--font); margin: 10px 0 0; }
</style>

<main>
  <p class="ask"><strong>For each background, send any letter whose small words you can’t read, once in Light and once with your iPhone in Dark; then the letter you would ship for each mode.</strong> At the foot, send “with edge” or “without” for each mode.</p>
  <p class="env" id="env">Reading your Safari version…</p>
  <ul class="legend">
    <li><span>A</span> · the firmest panel: the grey second line stays readable over anything, and the least of the page shows through.</li>
    <li><span>B</span> · lighter, with one text colour: every word stays readable over anything, and more of the page shows through. In Light it is about half cream.</li>
    <li><span>C</span> · the lightest: icons and large words read over anything; small words may not over the brightest or darkest backgrounds.</li>
  </ul>
  <p class="note">None of the three blurs what is behind it, as you set for menus, sheets, dialogs and the dock on 11 November. Each is a fixed panel, so each replaces the dock’s darkening that follows the page under it. In Dark, A and B are firmer than the dark dock you turned down as near-solid in November, and C is a little lighter than it.</p>
  <div class="cols" aria-hidden="true"><span>A</span><span>B</span><span>C</span></div>
  <div id="bands"></div>

  <h2>The edge</h2>
  <p class="note">Panel B with a hairline round it and without. Send “with edge” or “without”, once in Light and once in Dark.</p>
  <div class="pair-head" aria-hidden="true"><span>With edge</span><span>Without</span></div>
  <div id="edges"></div>
</main>

<script>
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\\/([\\d.]+)/) || [])[1];
  // Safari 26 and later freeze the OS token in the user agent, so the iOS version is not printed.
  const dark = () => matchMedia("(prefers-color-scheme: dark)").matches;
  const env = document.getElementById("env");
  const write = () => {
    env.textContent = (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\\/[\\d.]+/) || ["unknown"])[0]) +
      " · phone appearance: " + (dark() ? "Dark" : "Light");
  };
  write();
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", write);

  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H4zm16 0h-6a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h7z"/></svg>';
  const spec = (cls) => '<div class="spec ' + cls + '">' +
    '<div class="pill"><span class="seat">' + icon + '</span>Library</div>' +
    '<div class="menu"><div class="r hl">Open<small>2 min ago</small></div><div class="r">Share<small>3 people</small></div></div></div>';
  const grounds = [["white", "White"], ["black", "Black"], ["grey", "Grey"], ["photo", "Photograph"], ["photo second", "Photograph, darker part"], ["aurora", "Aurora"]];
  document.getElementById("bands").innerHTML = grounds.map(([cls, name]) =>
    '<div class="band ' + cls + '"><p class="name">' + name + '</p><div class="row">' + spec("A") + spec("B") + spec("C") + '</div></div>').join("");
  const edgeGrounds = [["page-ground", "Page"], ["white", "White"], ["photo", "Photograph"], ["aurora", "Aurora"]];
  document.getElementById("edges").innerHTML = edgeGrounds.map(([cls, name]) =>
    '<div class="band ' + cls + '"><p class="name">' + name + '</p><div class="pair">' + spec("B edged") + spec("B") + '</div></div>').join("");
})();
</script>
`;
writeFileSync(PAGE, page);
console.log("R3b rebuilt", page.length, "bytes; alphas", JSON.stringify(b));
