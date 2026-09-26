# W-I.3 · W-HOVER-GUARD: no hover paint from an input that has no hover · 11.0.0

| field | value |
|---|---|
| seat | band-I wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8536f2cc` in a scratch worktree (the task named `f3ad78d0`; every commit since is under `docs/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing, so every reading below measures the published 10.1.0 bytes |
| kind | a BUILD wave. Not a loop wave: the dock's share of the guard is D2's floor row 3 and lands in W-I.1; this wave takes the rest of the library and the invariant |
| ships in | 11.0.0 |
| families | F-77 (whole: R3-02-01, R4-01-15), `audit/REGISTRY.md:747-757` |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| instruments | `hover-census.mjs` (appendix A) and the band-I paint probe (`W-I.1.md` appendix A, rows `I3/*`). Both land under `scripts/probes/band-I/` with `npm run probe:band-I`; the census also lands as the vitest invariant `tests/styles/hover-guard.test.ts` |
| engines | Chromium 149 headless, mobile emulation (`hasTouch`, `isMobile`: `(hover: hover)` false, `(pointer: coarse)` true, read in-page). Playwright WebKit 26.5 headless with `hasTouch` (the same two media reads). Real Safari and iOS Safari: UNMEASURED (owner's safaridriver checkbox, OW-3; WebDriver has no touch, `HARNESS.md` §7) |

## 1 · What it closes

| id | what | source |
|---|---|---|
| R3-02-01 | 26 of the 42 `:hover` rules in `src` sit outside `@media (hover: hover)`, 22 of them paint-bearing at `95068476`; the G7 test reads the ENGAGE_LADDER table, never a selector | `audit/REGISTRY.md:749-750`, `:754` |
| R4-01-15 | the dock's posture handlers are modality-blind (a tap enters hover through `mouseenter` and `focusin`) | `REGISTRY.md:752-753`. **Closed by W-I.1** (D2 floor row 3, harness W4 `coarse·tap-pins`, `coarse·no-hover-latch`); this wave holds those cells as hold lines |
| UIA-F-80 | a coarse expand tap misroutes to the persistent control | `audit/INBOUND-MAP.md:160`; closed with R4-01-15 in W-I.1 |
| UIA-V-229 | hover cards open after a click, through the focus a press leaves | `INBOUND-MAP.md:260`. NOT REPRODUCED at HEAD on the library's only hover-opened surface, Tooltip (§2); a hold line here |
| UIA-F-220 | a tooltip opens on touch | `INBOUND-MAP.md:272`. NOT REPRODUCED at HEAD (§2); a hold line here. Its two-at-once half is W-E.4's provider leg |
| G7 detector half | `tests/styles/engage-ladder.test.ts:249-253` asserts a table row, not a selector (F-02's class) | replaced by the invariant G1 |

## 2 · The defect at HEAD

The library states the guard as its own law (`src/styles/utilities/base.css:216-229`, G7) and keeps it on menu rows, Button's quiet arm and `.interactive-item`. Everywhere else a `:hover` rung applies on a coarse pointer, where a tap latches `:hover` until something else is tapped.

**The census** (appendix A, run here over every `.css` file and every `<style>` block in `src`): `HOVER-CENSUS rules=42 unguarded=26 unguarded-paint=24`, exit 1. The detector counts a rule as paint-bearing when it sets any property other than `cursor`, `transition*`, `pointer-events`, `will-change`, `user-select` or `touch-action`; custom properties count, because they drive paint (`--liquid-fill-strength`, `--specular-intensity`). That is why it reads 24 against the registry's 22. The 24:

| register | file:line (selector) | paints |
|---|---|---|
| dock (W-I.1's) | `dock/styles/controls/icon-button.css:112`, `controls/tab-button.css:69`, `:144`, `controls/triggers.css:78`, `layer-group.css:275`, `morph.css:288` | background, color, scale, box-shadow |
| shared glass | `styles/glass/glass-capsule.css:122` (W-I.1's: D2 floor row 3 guards it), `:134` (hover shared with `:active`; this wave's), `styles/glass/material.css:323` (the plates' `:hover::before` specular; this wave's) | scale, specular |
| shared registers (this wave) | `styles/glass/control-surfaces.css:83` (`.control-surface`), `_shared/disclosure/disclosure.css:75`, `styles/utilities/components.css:83`, `:87`, `:91` (`hover-lift*`), `styles/utilities/btn.css:24` | background, translate, box-shadow, scale |
| components (this wave) | `blob/Blob.vue:359`, `dark-mode-toggle/dark-mode-toggle.css:24`, `data-table/styles.css:108`, `expandable-container/styles.css:85`, `slider/styles.css:170`, `:281`, `tabs/styles/segmented.css:407`, `timeline/Timeline.vue:718`, `toggle-group/styles.css:122` | background, filter, opacity, color, box-shadow, scale |

**In paint** (band-I probe, rows `I3/COARSE-LATCH`: tap the control, blur it, capture; tap a blank area, blur, capture again; count pixels in the control's box that differ by ΔE_OK > 0.02). Chromium mobile emulation at 900×900, DPR 1, reduced motion:

| control | Chromium | Playwright WebKit |
|---|---|---|
| Button `emphasis="secondary"` | **135 px** (0.84 %) | **137 px** (0.86 %) |
| ToggleGroup item (on) | **729 px** (3.48 %) | **1,199 px** (5.72 %) |
| Accordion trigger | **15,379 px** (79.7 %: a grey pill stays latched on the trigger, `out/bi-head/shots/hover-chromium-h-accordion-latched.png`) | the page crashed on the tap (recorded, not attributed; §8) |
| SelectTrigger (`.control-surface`) | **1,227 px** (7.91 %) | 0 px |
| SegmentedTabs underline tab | **451 px** (3.01 %) | **446 px** (2.98 %) |
| DarkModeToggle | **1,044 px** (7.53 %) | **1,044 px** (7.53 %) |
| probe fixture, rule inside `@media (hover: hover)` | 0 px (PASS) | 0 px (PASS) |
| probe plant, the same rule unguarded | **4,642 px** (31.4 %) | **4,636 px** (31.36 %) |

The fixture and the plant show the row can pass and can fail on the same page in both engines.

**The script half outside the dock does not reproduce.** Tooltip is the library's only surface opened by hover. At the coarse cell a tap on its trigger shows no tooltip after 900 ms (`I3/TOOLTIP-TAP` 0, both engines). On a fine pointer (`probes/tt-fine.mjs`, run here) hover opens it, a click closes it, and the focus the click leaves does not reopen it after the pointer leaves (Chromium and Playwright WebKit: `onHover 2, afterClick 0, afterLeave 0`, the 2 being the `role="tooltip"` node and its `data-slot` twin). So UIA-V-229 and UIA-F-220 are NOT REPRODUCED at HEAD, and this wave holds them as hold lines rather than claiming a cure.

## 3 · The cure

1. **Every paint-bearing `:hover` rung sits inside `@media (hover: hover)` at the register that declares it.** The shared registers first (`.control-surface`, `.disclosure-group-trigger`, `hover-lift*`, the `btn` utility), then the component rules in the table above. One edit per rule, no second guard helper: the media query is the guard, as `base.css:216-229` already writes it.
2. **A rung shared with a press state is split.** `glass-capsule.css:134` pairs `:hover` with `:not([data-press-armed]):active`; the press half stays outside the guard, the hover half moves in. D2's floor patch guards `glass-capsule.css:122` and `material.css:334` but leaves `:134` and `material.css:323` unguarded: on HEAD + `design/dock/pass-2/floor.patch` the census reads `unguarded-paint=17`, 0 of them under `src/components/dock/`, and these two among the 17 (run here). They are this wave's.
3. **The touch answer is the press rung, never a hover rung.** A control that needs feedback on touch composes the press register (`.tap-squish` or the component's own `:active` rung), as the G7 docblock prescribes (`base.css:220-226`). This wave adds no new touch styling; a control that loses its only feedback on touch is recorded for W-J.2's engagement register, which owns every rung beyond hover.
4. **The invariant replaces the G7 row.** `tests/styles/hover-guard.test.ts` runs the census over `src` (every `.css` file and every `<style>` block, parsed with postcss, native nesting resolved) and asserts 0 unguarded paint-bearing `:hover` rules. The G7 table assertion at `engage-ladder.test.ts:249-253` is deleted with its `pointerFine` column, and W-A.2's roster swaps the row.
5. **The script half.** On the dock it is W-I.1's (floor row 3: a touch or pen press on a folded dock pins it and swallows its click; a pointer's focus is not engagement). Outside the dock no surface enters a hover-only state from focus today (§2); the invariant for any future surface is the hold line G5.

## 4 · Files it touches

- `src/styles/glass/glass-capsule.css:134`, `src/styles/glass/material.css:323`, `src/styles/glass/control-surfaces.css:83`, `src/components/_shared/disclosure/disclosure.css:75`, `src/styles/utilities/components.css:83-93`, `src/styles/utilities/btn.css:24`.
- `src/components/blob/Blob.vue:359`, `dark-mode-toggle/dark-mode-toggle.css:24`, `data-table/styles.css:108`, `expandable-container/styles.css:85`, `slider/styles.css:170,281`, `tabs/styles/segmented.css:407`, `timeline/Timeline.vue:718`, `toggle-group/styles.css:122`.
- New `tests/styles/hover-guard.test.ts`; `tests/styles/engage-ladder.test.ts:249-253` (the G7 row deleted) and the `pointerFine` field of `ENGAGE_LADDER` if nothing else reads it.
- `scripts/probes/band-I/hover-census.mjs` (appendix A) is already in the tree: W-I.1 lands it for its G17 (`W-I.1.md` §4). This wave binds it as `tests/styles/hover-guard.test.ts` over all of `src`.
- The line numbers move when W-D.1 colocates styles; the census reads the tree, not a path list.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · the census | `node scripts/probes/band-I/hover-census.mjs .` (after landing: `npx vitest run tests/styles/hover-guard.test.ts`) | exit 0: `unguarded-paint=0` | **exit 1**: `HOVER-CENSUS rules=42 unguarded=26 unguarded-paint=24` |
| G1b · the census can fail | the census on a fixture tree: a guarded rule and a `cursor`-only rule read 0; add `.c:hover { background: red }` and it reads 1; a `.vue` `<style>` block with `.d { &:hover { scale: 1.1 } }` reads 1 (native nesting) | fixture exit 0, both plants exit 1 | fixture **exit 0**, plant **exit 1**, nested plant **exit 1** (run here) |
| G2 · paint at the coarse cell | `ENGINES=chromium,webkit node scripts/probes/band-I/measure.mjs <label> --rows I3`, rows `I3/COARSE-LATCH` for the six library controls | each ≤ 0.5 % of its box changed between latched and released | **FAIL 6 of 6** Chromium (135, 729, 15,379, 1,227, 451, 1,044 px); Playwright WebKit **FAIL 4 of 5 measured** plus the Accordion crash (137, 1,199, 446, 1,044 px; Select 0) |
| G3 · the probe can pass and fail | rows `I3/COARSE-LATCH` `h-fx-guarded` and `h-fx-unguarded` in the same run | guarded PASS, unguarded FAIL | guarded **0 px**, unguarded **4,642 / 4,636 px**, both engines |
| G4 · the G7 table row is gone (static) | `! git grep -n 'G7 HOVER GUARD' -- tests/styles/engage-ladder.test.ts` | exit 0 | **exit 1**: `engage-ladder.test.ts:249` |
| G5 · hold line: no hover-only surface opens from a press | rows `I3/TOOLTIP-TAP` and `tt-fine.mjs` | tooltip count 0 after a tap (coarse) and after a click then leave (fine) | PASS at HEAD in both engines (§2). Not born RED: UIA-V-229 and UIA-F-220 do not reproduce |
| G6 · hold line: the dock's cells | harness W4 `coarse·no-hover-latch`, `coarse·tap-pins` (`design/dock/harness/w4-state.mjs`) | PASS in both engines | RED at HEAD, cured by W-I.1 (§1); this wave keeps them green |

## 6 · π and DELTA obligations

Before = the band-I probe build of `8536f2cc` (`out/bi-head/shots/hover-*-latched.png` and `*-released.png` per control and engine); after = the same rows on the candidate. Captures under `.cache/evidence/W-I.3/` (the one scratch root, W-C.1); the wave record inlines each PNG's path, sha256, command and the paired `I3/COARSE-LATCH` row.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| Button, ToggleGroup, Accordion, SelectTrigger, SegmentedTabs underline, DarkModeToggle at the coarse cell | light (the probe's default) and dark (`?theme=dark`) | Chromium mobile emulation; Playwright WebKit `hasTouch`, labelled | latched vs released, before and after | G2 rows (latched px per control) |
| the same controls on a fine pointer, hovered | light, dark | Chromium, Playwright WebKit | hover vs rest | a no-regression read: the hover rung still paints on `(hover: hover)` (changed px > 0 on each control) |
| iOS Safari, real Safari | both | — | UNMEASURED (OW-3; WebDriver has no touch) | — |

## 7 · MIGRATION rows

None. No public name is removed or renamed. The utilities `hover-lift`, `hover-lift-md`, `hover-lift-lg`, `.control-surface` and the component recipes keep their names; on a pointer without hover they stop painting a hover rung. That is a behaviour change recorded as one CHANGELOG line for 11.0.0, not a MIGRATION row.

## 8 · Dependencies and ledger rows

Edges: PLAN §5. Closes F-77 (R3-02-01; R4-01-15 through W-I.1), the G7 detector half, UIA-F-80 (through W-I.1), and UIA-V-229 and UIA-F-220 as NOT REPRODUCED at HEAD with G5 as their hold line (the LEDGER seat records each with this wave's reading).

**Recorded, not gated here.** Playwright WebKit crashed (`page.waitForTimeout: Page crashed`) when a tap opened the Accordion on the probe page; the same page mounts and the other controls measure. It is not attributed. It is not a Safari reading, and it is not this wave's mechanism; the LEDGER seat routes it to W-A.1 (the harness) for a minimal reproduction. Until then the Accordion's WebKit cell of G2 is UNMEASURED.

## Appendix A · `hover-census.mjs`

Scratch source, reproduced so a seat can replay it after a scratch wipe. When it lands under `scripts/probes/band-I/`, the root defaults to the repository root.

```js
// W-I.3 G1: every paint-bearing :hover rule in src sits under @media (hover: hover).
// usage: node hover-census.mjs <repo-root> [--list]   exits 1 when any unguarded paint-bearing rule exists
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const root = path.resolve(process.argv[2] ?? "."); const req = createRequire(path.join(root, "package.json"));
const postcss = req("postcss"); const { parse: sfc } = req("@vue/compiler-sfc");
const NONPAINT = /^(cursor|transition(-.*)?|pointer-events|will-change|user-select|touch-action)$/;
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const guarded = (node) => { for (let p = node.parent; p; p = p.parent) if (p.type === "atrule" && p.name === "media" && /\((any-)?hover:\s*hover\)/.test(p.params)) return true; return false; };
const selOf = (node) => { const s = []; for (let p = node; p; p = p.parent) if (p.type === "rule") s.push(p.selector); return s.reverse().join(" » "); };
const rows = [];
for (const f of walk(path.join(root, "src"))) {
  let sheets = [];
  if (f.endsWith(".css")) sheets = [{ css: fs.readFileSync(f, "utf8"), off: 0 }];
  else if (f.endsWith(".vue")) { const { descriptor } = sfc(fs.readFileSync(f, "utf8"), { filename: f }); sheets = descriptor.styles.filter((s) => !s.lang || s.lang === "css").map((s) => ({ css: s.content, off: s.loc.start.line - 1 })); }
  for (const { css, off } of sheets) {
    let ast; try { ast = postcss.parse(css); } catch (e) { rows.push({ file: path.relative(root, f), line: 0, err: String(e) }); continue; }
    ast.walkRules((r) => {
      if (!/:hover\b/.test(r.selector)) return;
      const decls = (r.nodes ?? []).filter((n) => n.type === "decl"); const paint = decls.filter((d) => !NONPAINT.test(d.prop));
      rows.push({ file: path.relative(root, f), line: r.source.start.line + off, guarded: guarded(r), paint: paint.length > 0, props: paint.map((d) => d.prop).join(","), sel: selOf(r).replace(/\s+/g, " ").slice(0, 110) });
    });
  }
}
const all = rows.filter((r) => !r.err), ung = all.filter((r) => !r.guarded), ungPaint = ung.filter((r) => r.paint);
if (process.argv.includes("--list")) for (const r of ungPaint) console.log(`${r.file}:${r.line}  ${r.sel}  {${r.props}}`);
for (const r of rows.filter((r) => r.err)) console.log("PARSE-ERR", r.file, r.err.slice(0, 120));
console.log(`HOVER-CENSUS rules=${all.length} unguarded=${ung.length} unguarded-paint=${ungPaint.length}`);
process.exit(ungPaint.length ? 1 : 0);
```

`tt-fine.mjs` (the fine-pointer tooltip read behind G5) opens the band-I probe's `hover` scene, hovers the tooltip trigger for 600 ms, clicks it, moves the pointer to (800, 850), waits 900 ms, and counts visible `[role="tooltip"], [data-slot="tooltip-content"]` nodes at each step.
