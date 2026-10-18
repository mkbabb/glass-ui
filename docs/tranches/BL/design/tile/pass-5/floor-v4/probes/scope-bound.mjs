#!/usr/bin/env node
// FV4-1 · does `@scope (A) to (B)` bound a custom-property SUBJECT? (REGISTRY §P4-4 M-13: `Fs` §1.2 measured that
// @scope does not bound a `:has()` argument; here the pin is a subject, which is unmeasured.) An engine-only probe on a
// hand-made page with floor v4's registration and its pin, in the pin's own layer, read by computed value
// (getComputedStyle on the registered property) at every element of three nesting shapes:
//   tile ⊃ option ⊃ pill group ⊃ option ⊃ span     the nested pill group's options must read `none`
//   pill ⊃ option ⊃ tile group ⊃ option ⊃ span     the nested tile group's options must read `flush`
//   tile ⊃ wrapper(writes none) ⊃ option ⊃ span    the option follows the wrapper (agreement, the value above the option)
// and three writes the pin must refuse: a rule on the option, a rule on the option's content, an inline (non-!important)
// style on the option; and the one write above it: an inline `!important` on the option.
//   --form scope      floor v4's `@scope (.toggle-group__item) to (.toggle-group) { :scope, :scope * { … } }`  (clean)
//   --form unbounded  F's pass-4 pin `:where(.toggle-group__item, .toggle-group__item *)`              (plant: must FAIL)
//   --form option     `D′c` §4's option-only pin `.toggle-group__item`                                  (plant: must FAIL)
//   --form crit       `Fc` §4's selector form (the fallback FV4-1 names): the option and its content outside a nested group,
//                     plus a second rule for a nested group's options and their content (one level, as `Fc` §4 states)
//   --form none       no pin                                                                          (plant: must FAIL)
// Exit 0 when every cell reads its want, 1 otherwise. One browser per run, a fresh context per form, all closed in finally.
//   node scope-bound.mjs --engine chromium|webkit [--form scope|unbounded|option|crit|none|all]
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import os from "node:os";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const engine = arg("--engine", "chromium");
const which = arg("--form", "all");

const FORMS = {
  scope: `@scope (.toggle-group__item) to (.toggle-group) { :scope, :scope * { --selection-tile: inherit !important; } }`,
  unbounded: `:where(.toggle-group__item, .toggle-group__item *) { --selection-tile: inherit !important; }`,
  option: `.toggle-group__item { --selection-tile: inherit !important; }`,
  // the selector form REGISTRY §P4-6.2 FV4-1 names as the fallback (`Fc` §4): the option, and everything inside it that
  // is not inside a nested group, by plain selectors
  crit: `:where(.toggle-group__item, .toggle-group__item *):not(.toggle-group__item .toggle-group, .toggle-group__item .toggle-group *) { --selection-tile: inherit !important; }
  :where(.toggle-group__item .toggle-group .toggle-group__item, .toggle-group__item .toggle-group .toggle-group__item *) { --selection-tile: inherit !important; }`,
  none: ``,
};
const EXPECT = { scope: "pass", unbounded: "fail", option: "fail", crit: "pass", none: "fail" };

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
<div id=pl class=toggle-group><div id=plo class="toggle-group__item w-flush"><span id=pls>x</span></div></div>`;

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

const load = () => os.loadavg().map((x) => x.toFixed(2)).join(" ");
console.log(`scope-bound · ${engine} · load ${load()} · ${new Date().toISOString()}`);
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
      const got = await p.evaluate((ids) => Object.fromEntries(ids.map((id) => [id, getComputedStyle(document.getElementById(id)).getPropertyValue("--selection-tile").trim()])), CELLS.map((c) => c[1]));
      const fails = CELLS.filter(([, id, want]) => got[id] !== want);
      const verdict = fails.length ? "fail" : "pass";
      const ok = verdict === EXPECT[form];
      if (!ok) bad++;
      console.log(`\n## form ${form} (${EXPECT[form] === "pass" ? "clean" : "plant"}): ${CELLS.length - fails.length}/${CELLS.length} cells · ${verdict.toUpperCase()} · expected ${EXPECT[form].toUpperCase()} → ${ok ? "OK" : "WRONG"}`);
      for (const [label, id, want] of CELLS) console.log(`  ${got[id] === want ? "PASS" : "FAIL"}  ${label} (#${id}): ${got[id] || "(empty)"}, want ${want}`);
    } finally { await ctx.close(); }
  }
} finally { if (browser) await browser.close(); }
console.log(`\nload ${load()} · ${bad ? `${bad} form(s) read against expectation` : "every form read as expected"}`);
process.exit(bad ? 1 : 0);
