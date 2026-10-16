#!/usr/bin/env node
// floor-v3/probes/multi-role.mjs · FV3-2: a consumer role / tabindex / aria-checked / aria-pressed on every item of a
// `type="multiple"` group (`v2-migrated`) and of a `type="single"` group (`preset-migrated`), from `route-multi/`.
// Per scene: the AX role of the group and of every item (CDP in Chromium; Playwright's aria snapshot plus DOM states
// in Playwright WebKit), the DOM role / aria-* / tabindex of every item, the tab stops between the sentinels (a real
// key walk), whether the consumer's other attribute (`data-consumer`) landed, and the console errors (the development
// name, on a `-dev` flavour). PASS: single reads radiogroup / radio with one checked state; multiple reads a group of
// buttons with aria-pressed and no consumer role or aria-checked; one tab stop each; data-consumer on every item.
//   node multi-role.mjs --build <out>/builds/<label> --engine chromium|webkit
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
import { axRoles, tabStops, tagItems } from "../../../harness/measure.mjs";

const args = parseArgs();
const engine = args.engine === "webkit" ? "webkit" : "chromium";
const lock = await acquireLock("fv3-multi-role");
const target = await openTarget(args);
console.log(`FV3-2 multi-role probe · ${target.label} (flavor ${target.meta.flavor}) · ${await engineVersion(engine)} · load ${load()} at start`);
let pass = 0, n = 0;
for (const [scene, mode] of [["v2-migrated", "multiple"], ["preset-migrated", "single"]]) {
  const P = await openPage(target, engine, scene, { query: { sel: "1" } });
  await tagItems(P);
  const dom = await P.page.evaluate(() => [...document.querySelectorAll("[data-th-idx]")].map((e) => ({
    role: e.getAttribute("role"), checked: e.getAttribute("aria-checked"), pressed: e.getAttribute("aria-pressed"),
    tabindex: e.getAttribute("tabindex"), consumer: e.getAttribute("data-consumer") })));
  const ax = await axRoles(P);
  const stops = await tabStops(P);
  const errors = P.logs.filter((l) => l.type === "error").map((l) => l.text);
  await P.close();
  const roles = ax.items.map((i) => i.role);
  const ok = mode === "single"
    ? ax.group.role === "radiogroup" && roles.every((r) => r === "radio") && dom.filter((d) => d.checked === "true").length === 1 && dom.every((d) => d.pressed === null)
    : roles.every((r) => r === "button") && dom.every((d) => d.role === null && d.checked === null && (d.pressed === "true" || d.pressed === "false"));
  const one = stops.length === 1, landed = dom.every((d) => d.consumer === "yes");
  const cell = ok && one && landed;
  n++; if (cell) pass++;
  console.log(`  ${cell ? "PASS" : "FAIL"} ${engine} ${scene} (${mode}) · group ${ax.group.role} · item roles ${roles.join(",")} (${ax.via}) · DOM role ${dom.map((d) => d.role ?? "∅").join(",")} · aria-checked ${dom.map((d) => d.checked ?? "∅").join(",")} · aria-pressed ${dom.map((d) => d.pressed ?? "∅").join(",")} · tabindex ${dom.map((d) => d.tabindex).join(",")} · tab stops ${stops.length} (${stops.join(" ")}) · data-consumer landed ${dom.filter((d) => d.consumer === "yes").length}/${dom.length} · console errors ${errors.length}${errors.length ? ` «${errors[0].slice(0, 160)}»` : ""} · load ${load()}`);
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(pass === n ? 0 : 1);
