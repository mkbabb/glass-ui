#!/usr/bin/env node
// floor-v2/probes/tile-fact.mjs · the floor-v2 contract read in paint and computed style, in both engines.
// Floor v2 ships no tile: every option is a pill until a route sets `--selection-tile` (`flush` | `plated`)
// on the group. This probe sets it the way a route's one tile rule would, by an injected unlayered rule on the
// group (`.toggle-group { --selection-tile: <arm> }`), and reads what every floor reader derives from it:
//   pill law     the item's max-block-size clamp, the row lock, nowrap; a UA block inside the label laid inline
//   flush plate  no plate, no floor, no blur at rest (`flush`); the control plate kept (`plated`)
//   perimeter    the selected ::before opaque on a tile, transparent on a pill
//   contrast     under prefers-contrast: more, a selected pill keeps a 1 px border and paints its perimeter
//   T-3          measure.mjs selectedSeparation + judgeT3 on the H-3 state scenes, light / dark / PRT (Playwright
//                WebKit's PRT cell is the forced level-0 path), with the tile set to `flush` (FLOOR v1 §2.2's
//                switch-on read, under the v2 contract)
//   names        FV-7 / Q-5 (d): the development names on the build's flavour. A `<br>` added to a pill's label
//                1.1 s after ready (late content), and the `preset-input` scene's interactive descendant. Expected:
//                named on src-dev and dist-dev (a consumer's development build of the installed dist), silent on
//                src and dist (production). The cell passes when the build says what its flavour should
//   node tile-fact.mjs --build <out>/builds/<label> [--engines chromium,webkit] [--part mech|t3|names|all]
// Holds the harness lock. Prints the load at start and end.
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";
import { selectedSeparation, judgeT3 } from "../../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const part = String(args.part ?? "all");
const T3_SCENES = ["preset", "specimen", "preset-invalid", "preset-sibling", "preset-tone-translucent", "preset-tone-unresolvable", "preset-contents", "preset-verbatim", "single"];
const MECH_SCENES = ["single", "preset", "preset-contents", "specimen"];
const SETTLE = 1500; // ms: longer than the perimeter's release transition
const rule = (arm) => (arm ? `.toggle-group { --selection-tile: ${arm} }` : "");

const lock = await acquireLock("floor-v2-tile-fact");
const target = await openTarget(args);
console.log(`floor-v2 tile-fact probe · ${target.label} · load ${load()} at start`);
let pass = 0, n = 0;
const cell = (ok, line) => { n++; if (ok) pass++; console.log(`  ${ok ? "PASS" : "FAIL"} ${line}`); };

async function read(P) {
  return P.page.evaluate(() => {
    const items = [...document.querySelectorAll("[data-item]")];
    const on = items.find((e) => e.getAttribute("data-state") === "on") ?? items[0];
    const off = items.find((e) => e !== on);
    const label = off.querySelector("[data-line-slot]") ?? [...off.querySelectorAll("span")].find((e) => e.textContent.trim() && !e.children.length) ?? off;
    const probe = document.createElement("div"); probe.textContent = "x"; label.append(probe);
    const cs = getComputedStyle(off), con = getComputedStyle(on), before = getComputedStyle(on, "::before"), beforeOff = getComputedStyle(off, "::before");
    const r = {
      tile: cs.getPropertyValue("--selection-tile").trim(),
      maxB: cs.maxBlockSize, dir: cs.flexDirection, ws: cs.whiteSpace, overflow: cs.overflowY,
      blockInLabel: getComputedStyle(probe).display,
      plate: cs.getPropertyValue("--glass-defined-plate").trim(), floor: cs.getPropertyValue("--glass-floor-fill").trim(),
      blur: cs.backdropFilter || cs.webkitBackdropFilter || "",
      onBefore: before.opacity, offBefore: beforeOff.opacity, onBorder: con.borderTopWidth,
    };
    probe.remove();
    return r;
  });
}

for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  if (part === "all" || part === "mech") {
    for (const scene of MECH_SCENES) for (const arm of [null, "flush", "plated"]) {
      const P = await openPage(target, engine, scene, { mode: "light" });
      if (arm) await P.page.addStyleTag({ content: rule(arm) });
      await P.page.waitForTimeout(SETTLE); // the perimeter fades on its own transition
      const m = await read(P);
      const tag = `${engine} ${scene} tile=${arm ?? "unset"}`;
      const facts = `--selection-tile ${m.tile} · max-block-size ${m.maxB} · flex-direction ${m.dir} · white-space ${m.ws} · overflow ${m.overflow} · a div in the label ${m.blockInLabel} · plate ${m.plate.slice(0, 40)} · floor ${m.floor.slice(0, 30)} · blur ${m.blur.slice(0, 30)} · ::before on ${m.onBefore} off ${m.offBefore}`;
      if (!arm) cell(m.tile === "none" && m.maxB !== "none" && m.dir === "row" && m.ws === "nowrap" && m.blockInLabel === "inline" && m.onBefore === "0", `${tag} pill law, perimeter dormant · ${facts}`);
      else if (arm === "flush") cell(m.tile === "flush" && m.maxB === "none" && m.blockInLabel === "block" && /transparent|rgba\(0, 0, 0, 0\)/.test(m.plate) && /transparent|rgba\(0, 0, 0, 0\)/.test(m.floor) && (m.blur === "none" || m.blur === "") && m.onBefore === "1" && m.offBefore === "0", `${tag} pill law lifted, flush, perimeter on · ${facts}`);
      else cell(m.tile === "plated" && m.maxB === "none" && m.blockInLabel === "block" && !/^(transparent|rgba\(0, 0, 0, 0\))$/.test(m.plate) && m.onBefore === "1", `${tag} pill law lifted, plated, perimeter on · ${facts}`);
      await P.close();
    }
    // prefers-contrast: more on a pill: the a11y border does not widen the item; its own perimeter paints
    {
      const P = await openPage(target, engine, "single", { mode: "light" });
      let applied = false;
      try { await P.page.emulateMedia({ contrast: "more" }); applied = await P.page.evaluate(() => matchMedia("(prefers-contrast: more)").matches); } catch (e) { console.log(`  note: contrast emulation threw ${String(e.message).slice(0, 80)}`); }
      await P.page.waitForTimeout(SETTLE);
      const m = await read(P);
      if (applied) cell(m.onBorder === "1px" && m.onBefore === "1", `${engine} single prefers-contrast: more · selected border ${m.onBorder} (the a11y arm would write 2px) · ::before on ${m.onBefore}`);
      else console.log(`  UNMEASURED ${engine} single prefers-contrast: more · the engine did not apply the emulation`);
      await P.close();
    }
  }
  if (part === "all" || part === "names") {
    const dev = target.meta.flavor.endsWith("-dev");
    const errs = (P, from = 0) => P.logs.slice(from).filter((l) => l.type === "error" || l.type === "pageerror").map((l) => l.text);
    {
      const P = await openPage(target, engine, "single", { mode: "light" });
      await P.page.waitForTimeout(400);
      const before = P.logs.length;
      await P.page.evaluate(() => {
        const el = document.querySelector("[data-item]");
        const label = el.querySelector("[data-line-slot]") ?? [...el.querySelectorAll("span")].find((e) => e.textContent.trim() && !e.children.length) ?? el;
        label.append(document.createElement("br"), "1");
      });
      await P.page.waitForTimeout(600);
      const e = errs(P, before).filter((t) => t.includes("[ToggleGroupItem]"));
      cell(dev ? e.some((t) => t.includes("asks for a second row")) : e.length === 0, `${engine} names (${target.meta.flavor}) a <br> added to a pill's label after mount · ${e.length ? e[0].slice(0, 140) : "no [ToggleGroupItem] console error"}`);
      await P.close();
    }
    {
      const P = await openPage(target, engine, "preset-input", { mode: "light" });
      await P.page.waitForTimeout(400);
      const e = errs(P).filter((t) => t.includes("[ToggleGroupItem]"));
      cell(dev ? e.some((t) => t.includes("interactive descendant")) : e.length === 0, `${engine} names (${target.meta.flavor}) preset-input's <input> · ${e.length ? `${e.length} error(s): ${e[0].slice(0, 140)}` : "no [ToggleGroupItem] console error"}`);
      await P.close();
    }
  }
  if (part === "all" || part === "t3") {
    for (const scene of T3_SCENES) for (const mode of ["light", "dark", "prt"]) {
      const P = await openPage(target, engine, scene, { mode });
      await P.page.addStyleTag({ content: rule("flush") });
      const m = await selectedSeparation(P);
      const j = judgeT3(m);
      cell(P.modeOk && j.pass, `${engine} T-3 tile=flush ${scene} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · ${j.line}`);
      await P.close();
    }
  }
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers();
await target.close();
lock.release();
process.exit(0);
