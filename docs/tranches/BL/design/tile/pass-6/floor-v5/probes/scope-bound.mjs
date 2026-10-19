#!/usr/bin/env node
// FV5-2 · scope-bound, floor v5's copy of pass 5's FV4-1 probe (`../../../pass-5/floor-v4/probes/scope-bound.mjs`, kept
// there unedited as pass 5's record). It keeps pass 5's 17 cells and every pass-5 form byte for byte, and adds:
//   --form scope5     floor v5: the strip reset `.segmented-tabs { --selection-tile: none }` (layer components, as the
//                     group's) and the pin `@scope (.toggle-group__item) to (.toggle-group, .segmented-tabs)`   (clean)
//   STRIP cells       a SegmentedTabs strip (`.segmented-tabs`, its tab `.segmented-tab`) at the places FV5-2 names:
//                     inside a tile option, inside a pill option, under a non-group ancestor that writes `flush`. Floor
//                     v4's `scope` form is the plant for them: no strip reset, the pin's limit the group only
//   INFO cells        printed, never judged: a consumer rule writing `flush` ON a strip (the strip as a tile holder, the
//                     case FV5-2 says to report, not work around) and under a tile option.
// The 17 cells read every form as pass 5 did (scope5 must read 17/17, as `scope`). The strip cells are judged on
// scope5 (must pass) and on scope (must fail); the other forms print them as info. Exit 0 when every judged tally reads
// its expectation, 1 otherwise. One browser per run, a fresh context per form, all closed in finally.
//   node scope-bound.mjs --engine chromium|webkit [--form scope5|scope|unbounded|option|crit|none|all]
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import os from "node:os";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const engine = arg("--engine", "chromium");
const which = arg("--form", "all");

const FORMS = {
  scope5: `.segmented-tabs { --selection-tile: none; }
  @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) { :scope, :scope * { --selection-tile: inherit !important; } }`,
  scope: `@scope (.toggle-group__item) to (.toggle-group) { :scope, :scope * { --selection-tile: inherit !important; } }`,
  unbounded: `:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important; }`,
  option: `.toggle-group__item { --selection-tile: inherit !important; }`,
  crit: `:where(.toggle-group__item, .toggle-group__item *):not(.toggle-group__item .toggle-group, .toggle-group__item .toggle-group *) { --selection-tile: inherit !important; }
  :where(.toggle-group__item .toggle-group .toggle-group__item, .toggle-group__item .toggle-group .toggle-group__item *) { --selection-tile: inherit !important; }`,
  none: ``,
};
// [the 17 cells, the strip cells]; null = printed as info
const EXPECT = { scope5: ["pass", "pass"], scope: ["pass", "fail"], unbounded: ["fail", null], option: ["fail", null], crit: ["pass", null], none: ["fail", null] };

const page = (pin) => `<!doctype html><meta charset=utf-8><style>
@property --selection-tile { syntax: "none | flush | plated"; inherits: true; initial-value: none; }
@layer components {
  .toggle-group { --selection-tile: none; }
  .toggle-group[data-tile] { --selection-tile: flush; }
  ${pin}
}
/* consumer writes, unlayered (above every layer for a normal declaration) */
.w-none { --selection-tile: none; }
.w-flush { --selection-tile: flush; }
.c-none { --selection-tile: none; }
</style>
<div id=n1 class=toggle-group data-tile><div id=n1o class=toggle-group__item>
  <div id=n1g class=toggle-group><div id=n1go class=toggle-group__item><span id=n1gs>x</span></div></div></div></div>
<div id=n2 class=toggle-group><div id=n2o class=toggle-group__item>
  <div id=n2g class=toggle-group data-tile><div id=n2go class=toggle-group__item><span id=n2gs>x</span></div></div></div></div>
<div id=wr class=toggle-group data-tile><div id=wrw class=w-none><div id=wro class=toggle-group__item><span id=wrs>x</span></div></div></div>
<div id=op class=toggle-group data-tile><div id=opo class="toggle-group__item w-none"><span id=ops>x</span></div></div>
<div id=ct class=toggle-group data-tile><div id=cto class=toggle-group__item><span id=cts class=c-none><b id=ctb>x</b></span></div></div>
<div id=il class=toggle-group data-tile><div id=ilo class=toggle-group__item style="--selection-tile: none"><span id=ils>x</span></div></div>
<div id=im class=toggle-group data-tile><div id=imo class=toggle-group__item style="--selection-tile: none !important"><span id=ims>x</span></div></div>
<div id=pl class=toggle-group><div id=plo class="toggle-group__item w-flush"><span id=pls>x</span></div></div>
<div id=s1 class=toggle-group data-tile><div id=s1o class=toggle-group__item><span id=s1m>meta</span>
  <div id=s1s class=segmented-tabs><button id=s1t class=segmented-tab><span id=s1r>row</span></button></div></div></div>
<div id=s2 class=toggle-group><div id=s2o class=toggle-group__item>
  <div id=s2s class=segmented-tabs><button id=s2t class=segmented-tab><span id=s2r>row</span></button></div></div></div>
<div id=s3 class=w-flush><div id=s3s class=segmented-tabs><button id=s3t class=segmented-tab><span id=s3r>row</span></button></div></div>
<div id=s4 class=segmented-tabs><button id=s4t class=segmented-tab><span id=s4r>row</span></button></div>
<div id=i1 class="segmented-tabs w-flush"><button id=i1t class=segmented-tab><span id=i1r>row</span></button></div>
<div id=i2 class=toggle-group data-tile><div id=i2o class=toggle-group__item>
  <div id=i2s class="segmented-tabs w-flush"><button id=i2t class=segmented-tab><span id=i2r>row</span></button></div></div></div>`;

// cell: [label, id, want]
const CELLS = [
  ["tile group's option", "n1o", "flush"],
  ["pill group nested in a tile option: the group", "n1g", "none"],
  ["pill group nested in a tile option: its option", "n1go", "none"],
  ["pill group nested in a tile option: its content", "n1gs", "none"],
  ["pill group's option", "n2o", "none"],
  ["tile group nested in a pill option: its option", "n2go", "flush"],
  ["tile group nested in a pill option: its content", "n2gs", "flush"],
  ["wrapper writes none in a tile group: the option follows it", "wro", "none"],
  ["wrapper writes none in a tile group: the content agrees", "wrs", "none"],
  ["a rule on the option writes none in a tile group: refused", "opo", "flush"],
  ["  its content", "ops", "flush"],
  ["a rule on the option's content writes none: refused", "cts", "flush"],
  ["  inside that content", "ctb", "flush"],
  ["an inline style on the option writes none: refused", "ilo", "flush"],
  ["an inline !important on the option: the one write above the pin", "imo", "none"],
  ["  its content follows it", "ims", "none"],
  ["a rule on a pill option writes flush: refused", "plo", "none"],
];
const STRIP = [
  ["strip in a tile option: the option's own content stays pinned", "s1m", "flush"],
  ["strip in a tile option: the strip", "s1s", "none"],
  ["strip in a tile option: its tab", "s1t", "none"],
  ["strip in a tile option: the tab's content", "s1r", "none"],
  ["strip in a pill option: its tab", "s2t", "none"],
  ["strip in a pill option: the tab's content", "s2r", "none"],
  ["strip under a non-group ancestor writing flush: the strip", "s3s", "none"],
  ["strip under a non-group ancestor writing flush: its tab", "s3t", "none"],
  ["strip alone: its tab", "s4t", "none"],
];
const INFO = [
  ["a consumer rule writes flush ON a strip: the strip", "i1", null],
  ["  its tab", "i1t", null],
  ["  the tab's content", "i1r", null],
  ["a consumer rule writes flush ON a strip in a tile option: the strip", "i2s", null],
  ["  its tab", "i2t", null],
];

const load = () => os.loadavg().map((x) => x.toFixed(2)).join(" ");
console.log(`scope-bound (floor v5) · ${engine} · load ${load()} · ${new Date().toISOString()}`);
const launcher = engine === "webkit" ? webkit : chromium;
let browser, bad = 0;
try {
  browser = await launcher.launch({ headless: true });
  console.log(`engine ${engine === "webkit" ? "Playwright WebKit" : "Chromium"} ${browser.version()}`);
  for (const form of which === "all" ? Object.keys(FORMS) : [which]) {
    const ctx = await browser.newContext();
    try {
      const p = await ctx.newPage();
      await p.setContent(page(FORMS[form]));
      const ids = [...CELLS, ...STRIP, ...INFO].map((c) => c[1]);
      const got = await p.evaluate((ids) => Object.fromEntries(ids.map((id) => [id, getComputedStyle(document.getElementById(id)).getPropertyValue("--selection-tile").trim()])), ids);
      const tally = (set) => set.filter(([, id, want]) => got[id] === want).length;
      const [e17, eS] = EXPECT[form];
      const v17 = tally(CELLS) === CELLS.length ? "pass" : "fail";
      const vS = tally(STRIP) === STRIP.length ? "pass" : "fail";
      const ok17 = v17 === e17, okS = eS === null || vS === eS;
      if (!ok17 || !okS) bad++;
      console.log(`\n## form ${form}: 17 cells ${tally(CELLS)}/${CELLS.length} · ${v17.toUpperCase()} · expected ${e17.toUpperCase()} → ${ok17 ? "OK" : "WRONG"}`
        + ` | strip cells ${tally(STRIP)}/${STRIP.length} · ${vS.toUpperCase()} · ${eS === null ? "info" : `expected ${eS.toUpperCase()} → ${okS ? "OK" : "WRONG"}`}`);
      for (const [label, id, want] of CELLS) console.log(`  ${got[id] === want ? "PASS" : "FAIL"}  ${label} (#${id}): ${got[id] || "(empty)"}, want ${want}`);
      for (const [label, id, want] of STRIP) console.log(`  ${eS === null ? "info" : got[id] === want ? "PASS" : "FAIL"}  [strip] ${label} (#${id}): ${got[id] || "(empty)"}, want ${want}`);
      for (const [label, id] of INFO) console.log(`  info  [strip] ${label} (#${id}): ${got[id] || "(empty)"}`);
    } finally { await ctx.close(); }
  }
} finally { if (browser) await browser.close(); }
console.log(`\nload ${load()} · ${bad ? `${bad} form(s) read against expectation` : "every form read as expected"}`);
process.exit(bad ? 1 : 0);
