#!/usr/bin/env node
// D3-Cpp-plants.mjs · D3 pass 3, C″ prototype: the mechanism-removal plants (REGISTRY P2-6.3 row 19). Each plant removes
// one piece of the C″ mechanism and is captured only on the cells its green lives on; the witness that read that green
// must turn RED. Source of record for the readings: D3-Cpp-proto.md §5.
//   node D3-Cpp-plants.mjs build <worktree>            the source-variant builds (no browser): $D3_OUT/builds/pl-<id>/dist
//   node D3-Cpp-plants.mjs capture <route dist> [--only id,id]   every plant's capture into $D3_OUT/caps/pl-<id>
// CSS plants inject over the route build. SOURCE plants copy the worktree's src, apply one asserted replacement, and
// build their own specimen dist (a CSS injection cannot remove a resolver step).
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { OUT, cli, list } from "../harness/lib.mjs";
import { capture } from "../harness/capture.mjs";
import { buildSpecimens } from "../harness/build.mjs";

// FL-5's need at another ink, written into the claim only (light): the licence solved at that ink.
const needAt = (l) => `html:not(.dark) [data-glass-ground] { --glass-need-e: calc(1.055 * pow(calc(var(--glass-ink-target) * (pow(${l}, 3) + 0.05) - 0.05), 0.416667) - 0.055); }`;
const LADDER_LIGHT = { themes: "light", scenes: "ladder", grounds: "aurora,black,white" };

export const CSS_PLANTS = {
  // C-1, C-5: the licence solved at C′'s reach ink (L 0.3061) → the -strong run (M-2) and the wells' perimeter (M-3).
  reach: { ...LADDER_LIGHT, css: needAt(0.3061) },
  // C-1, C-2: the licence solved at the -strong ink (L 0.4096) → the static muted run (M-2); the any-input claim ≠ the bound.
  strong: { ...LADDER_LIGHT, css: needAt(0.4096) },
  // Q-8 (c): the solve reads the lag twins only, so a worsening ground arrives on the spring → M-2m on the 0.5 → 1 step.
  lagonly: { scenes: "ladder", grounds: "aurora,aurora50", motion: true, css: `:root, .dark, [data-glass-ground] { --glass-ground-e: calc((1 - var(--glass-bound-ground)) * min(var(--glass-ground-lo-lag), var(--glass-pole-e)) + var(--glass-bound-ground) * max(var(--glass-ground-hi-lag), var(--glass-pole-e))); }` },
  // The dark lift's gap removed → M-6's signed leg on the claimed dark page.
  nolift: { themes: "dark", scenes: "ladder,dialog", grounds: "paper", css: ":root { --glass-lift-gap: 0; }" },
  // FL-7 under a claim: the held floor removed → M-2 on the held cells.
  heldfloor: { scenes: "held", grounds: "black,white,aurora", css: ".glass-wash, .glass-floating, .dock-plate { --glass-veil-floor: 0 !important; }" },
  // FL-5: the content bound at the root forced thin → M-2 on chrome and every unclaimed plate.
  bound: { scenes: "ladder,dialog", grounds: "black,white,aurora", css: ":root, .dark { --glass-content-bound: 0.25; }" },
  // FL-4: the page tones' registered initials moved off the any-input poles, under a hand-written <html> claim
  // (?claim=root-page, no resolver) → the bound itself thins → M-2. Without the plant the hand-written claim is inert.
  rootinit: { scenes: "ladder", grounds: "black,white,aurora", query: "claim=root-page", css: '@property --glass-page-lo { syntax: "<number>"; inherits: false; initial-value: 0.98; }\n@property --glass-page-hi { syntax: "<number>"; inherits: false; initial-value: 0.04; }' },
  rootpage: { scenes: "ladder", grounds: "black,white,aurora", query: "claim=root-page", css: "" },
  // The contract's limit, not a plant of the mechanism: a false field claim (the hostile band hidden) → M-2.
  fieldfalse: { scenes: "hostile", grounds: "aurora,aurora50", query: "claim=field-false", css: "" },
};

// One asserted replacement per source plant, in the route's own files.
export const SOURCE_PLANTS = {
  // C-3: the resolver stamps nothing and warns nothing (the silent dead arm).
  nostamp: { file: "src/composables/glass/groundClaim.ts", from: "function stamp(el: HTMLElement, claim: Claim, state: GlassGroundState, why?: string): void {", to: "function stamp(el: HTMLElement, claim: Claim, state: GlassGroundState, why?: string): void {\n    return;", cap: { scenes: "fieldout,fieldtwo,fieldgone", grounds: "aurora" } },
  // C-3: the stamp lies: a field claim reads `published` whatever is in scope.
  liestamp: { file: "src/composables/glass/groundClaim.ts", from: 'const live = num(getComputedStyle(el), "--glass-field-live") === 1;', to: "const live = true;", cap: { scenes: "fieldout,fieldtwo,fieldgone", grounds: "aurora" } },
  // C-6: the host keeps the LAST substrate's publication, not the worst of them.
  lastwriter: { file: "src/composables/glass/groundTone.ts", from: "const known = all as GlassFieldPublication[];", to: "const known = [all[all.length - 1]] as GlassFieldPublication[];", cap: { scenes: "fieldtwo", grounds: "aurora" } },
  // C-4: the coherence check removed → a --foreground colour retune compresses the hierarchy in silence (W-C leg 2).
  nocheck: { file: "src/composables/glass/groundClaim.ts", from: "function incoherence(el: HTMLElement, cs: CSSStyleDeclaration): string | null {", to: "function incoherence(el: HTMLElement, cs: CSSStyleDeclaration): string | null {\n    if (el) return null;", cap: { scenes: "ladder,dialog", grounds: "paper", retune: true } },
  // C-4: the page tone held as a number (paper's) instead of read from the colour → a --background retune desyncs the dark lift (M-6).
  stalepage: { file: "src/composables/glass/groundClaim.ts", from: 'const page = glassGroundTone(resolveTokenColor("var(--background)", el), { saturate });', to: 'const page = num(cs, "--glass-bound-ground") === 1 ? { lo: 0.0398, hi: 0.0398 } : { lo: 0.9807, hi: 0.9807 };', cap: { scenes: "ladder,dialog", grounds: "paper", retune: true } },
};

const load = () => os.loadavg().map((x) => x.toFixed(1)).join(" ");

const a = cli({ only: { type: "string" } });
const [cmd, target] = a._;
if (cmd === "build") {
  for (const id of list(a.only, Object.keys(SOURCE_PLANTS))) {
    const p = SOURCE_PLANTS[id], wt = path.resolve(target), copy = path.join(OUT, "plantsrc", id);
    fs.rmSync(copy, { recursive: true, force: true }); fs.mkdirSync(copy, { recursive: true });
    fs.cpSync(path.join(wt, "src"), path.join(copy, "src"), { recursive: true });
    for (const f of ["vite.targets.ts", "package.json", "tsconfig.json"]) if (fs.existsSync(path.join(wt, f))) fs.copyFileSync(path.join(wt, f), path.join(copy, f));
    fs.symlinkSync(fs.realpathSync(path.join(wt, "node_modules")), path.join(copy, "node_modules"));
    const f = path.join(copy, p.file), s = fs.readFileSync(f, "utf8");
    if (s.split(p.from).length !== 2) throw new Error(`${id}: the replacement does not match exactly once in ${p.file}`);
    fs.writeFileSync(f, s.replace(p.from, p.to));
    const { dist } = await buildSpecimens(copy, `pl-${id}`);
    console.log(`built pl-${id} → ${dist} · load ${load()}`);
  }
} else if (cmd === "capture") {
  const { RETUNES } = await import("../harness/lib.mjs");
  for (const id of list(a.only, [...Object.keys(CSS_PLANTS), ...Object.keys(SOURCE_PLANTS)])) {
    const capdir = path.join(OUT, "caps", `pl-${id}`);
    fs.rmSync(capdir, { recursive: true, force: true });
    console.log(`== ${id} · ${new Date().toTimeString().slice(0, 8)} · load ${load()}`);
    if (CSS_PLANTS[id]) {
      const v = CSS_PLANTS[id], css = path.join(OUT, `pl-${id}.css`);
      fs.writeFileSync(css, v.css + "\n");
      await capture(path.resolve(target), { out: capdir, engines: "chromium", themes: v.themes, scenes: v.scenes, grounds: v.grounds, motion: v.motion, inject: v.css ? css : undefined, query: v.query || "claim=honest", quiet: true });
    } else {
      const v = SOURCE_PLANTS[id].cap, dist = path.join(OUT, "builds", `pl-${id}`, "dist");
      await capture(dist, { out: capdir, engines: "chromium", scenes: v.scenes, grounds: v.grounds, query: "claim=honest", quiet: true });
      if (v.retune) for (const [variant, css] of Object.entries(RETUNES)) {
        const f = path.join(OUT, `${variant}.css`); fs.writeFileSync(f, css);
        await capture(dist, { out: capdir, engines: "chromium", grounds: "paper", scenes: "ladder,dialog", variant, inject: f, query: "claim=honest", quiet: true });
      }
      if (v.scenes.includes("field")) await capture(dist, { out: capdir, engines: "chromium", grounds: "aurora", scenes: v.scenes, variant: "noclaim", query: "claim=none", quiet: true });
    }
    console.log(`   done · ${new Date().toTimeString().slice(0, 8)} · load ${load()}`);
  }
} else {
  console.error("usage: node D3-Cpp-plants.mjs build <worktree> | capture <route dist> [--only ids]"); process.exit(2);
}
