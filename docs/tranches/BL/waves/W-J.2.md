# W-J.2 · the engagement register, component-wide (loop D5, to open) · 11.0.0

| field | value |
|---|---|
| seat | band-J wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7f92584c` in a scratch worktree (the task named `f3ad78d0`; every commit since is under `docs/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing: the published 10.1.0 bytes |
| kind | LOOP WAVE, owned by design loop D5, which does not exist yet. `ls docs/tranches/BL/design/` lists `dock`, `material`, `structure`, `tile`: D5 has no portfolio and no REGISTRY (PLAN §6, `PLAN.md:336`). The wave lands only from D5's converged specification (§3.1). This spec fixes the scope, the born-RED gates and the inputs D5's round 0 must carry; it designs no rung |
| ships in | 11.0.0 |
| families | F-54 (remainder: the engaged rung and hallmark 6; the dock hallmarks 1, 2 and 5 are W-I.1's, `W-I.1.md` §1) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| instruments | `tests/styles/engage-ladder.test.ts` (its census detector, `:108-128`); the band-J probe's `slider.mjs` (appendix A); D4's harness T-6 (`design/tile/harness/t6-engagement.mjs`) as the commit-bar model the register's battery generalizes |
| engines | Chromium 149 headless and **Playwright WebKit** 26.5 headless. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | shared; load averages about 40 during the runs (18:35-18:45 local) |

## 1 · What it closes

| id | what | source |
|---|---|---|
| F-54 remainder | the round-6 widening: "the engagement register never built: the iOS-27 hallmarks and the engaged rung beyond hover (D-2)"; hallmark 6 (momentum for all components) from L05b-14 and R2-04-17 | `audit/REGISTRY.md:1264-1274`; `audit/round-1/L05b.md:31`; `audit/round-2/R2-04.md:39` |
| ledger | #27 W-ENGAGE-LADDER+AFFORD (its remainder: T1 GROW and the slider exemplar, and the rungless component set); #77 W-MOMENTUM-CENSUS (the census arm); D-2 (its enforcement: the census row reads "no enforcement", `ledger/CENSUS.md:181`); GAP-2 / GAP-B1 | `ledger/census-register-a.md:39`; `census-register-b.md:63`; `census-carries-recap.md:65`; `ledger/CENSUS.md:151,246-249` |
| latch subject | `engage-ladder.test.ts:134` (`it.fails` "every component directory carries a rung beyond hover"); W-A.2 turns it into an owed entry and names this wave its owner | `W-A.2.md:78` |
| rows routed here by sibling waves | L01a-35 (T1 GROW and the slider exemplar routed from #27 to #35, sealed without them), `W-B.1.md:20`; L05a-16 (the mobile modal expansion for the slider), `W-B.4.md:23`; UIA-F-84 (the slider loupe), `W-B.2.md:64`; S6's breathing preset (the glass track), `W-H.3.md:46`; the controls whose only feedback is hover, recorded by W-I.3 on `(hover: none)`, `W-I.3.md:61`; hallmark 6, `W-I.1.md` §1 | as cited |

**Not closed here.** The dock hallmarks (squish, overpull, stagger) and OWED-3 are W-I.1's. The hover guard is W-I.3's. The tile's own commit is W-J.1's (this wave composes it). Spring physics and presets are W-F.1's; the engage envelope table's physics stays gated by `springTokenMirror` and `spring-authority` (`engage-ladder.test.ts:10-17`).

## 2 · The defect at HEAD

### 2.1 · The mechanisms (read in the worktree)

- **The vocabulary exists; the components did not adopt it.** `src/composables/motion/engage/` holds `engageLadder.ts` and `engageEnvelopes.ts`, and `src/styles/tokens/motion-registers.css` emits the `--engage-*` clocks (the mirror arm of `engage-ladder.test.ts:170-200` passes). The census detector (`:123-124`) counts a directory as on the rung when its own bytes carry `:active` in selector context, `[data-held]`, `data-engaged`, `tap-squish`, `interactive-item` or an `--engage-*` read. 38 of 55 component directories carry none (§2.2).
- **`data-engaged` has two writers with two meanings.** `src/components/slider/Slider.vue:289,307` write `:data-engaged="isHeld || undefined"` on the teleported focus veil and loupe (a held state). `src/components/dialog/ModalOverlay.vue:74` writes a bare `data-engaged` on the same `.glass-focus-veil` class (presence: always engaged while rendered). The readers `src/styles/glass/focus-veil.css:153,160` and `src/components/slider/styles.css:433,440` cannot tell a held slider from an open modal.
- **T1 GROW was specified and never built.** BI's `W-ENGAGE-AFFORD` specifies `.engage-grow` (`--scale-engage` 1.06, sustained while engaged, with a pointer arm `:active` and two keyboard arms `:focus-visible` and `:has(:focus-visible)`, the slider as the exemplar, `docs/tranches/BI/waves/BI.W-ENGAGE-AFFORD.md:115-130`). `git grep -n engage-grow -- src` → 0 lines; `useEngageModal` and `data-engage-modal` → 0.
- **Hallmark 6, momentum for all components, has no artefact.** `git grep -n -- '--impulse' src` → 0, `useLiquidSpine` → 0, `--overpull` → 0 (R2-04-17 read the same in `dist` and `dist-demo`).
- **The census denominator is every directory.** The detector reads every directory except `_shared` (`:94-97`), so `separator`, `skeleton`, `label` and `aurora` count as rungless beside `accordion` and `popover`. The test's `describe` says "every interactive component" (`:130`) and its assertion says every directory (`:134-135`). D-2's text is "every component always displays engagement" (`audit/PROMPT-RECAP-SEED.md:27`). The register has to say what engagement is for a component nobody presses; the census cannot, and neither can this spec.

### 2.2 · Readings (run here)

| read | command | HEAD |
|---|---|---|
| the census as a plain `it` | a scratch copy of the detector at `tests/styles/zz-bandj-engage-census.test.ts` in the worktree (appendix A), `npx vitest run tests/styles/zz-bandj-engage-census.test.ts tests/styles/engage-ladder.test.ts` | **FAIL**: `DIRS 55 WITH-RUNG 17 RUNGLESS 38: accordion alert aurora avatar badge blob chip collapsible command constellation dark-mode-toggle data-table deck expandable-container fading-scroll fourier-field handmark infinite-scroll input label labeled-field metric music-staff number-field popover progress scroll-progress-rim separator sheet skeleton status-dot surface table textarea timeline toast tooltip typewriter`. The shipped file: 25 passed, 1 expected fail (the `:134` latch) |
| `data-engaged` writers | `git grep -l 'data-engaged' -- 'src/**/*.vue' \| wc -l` | **2** (`dialog/ModalOverlay.vue`, `slider/Slider.vue`) |
| the slider sustains engagement (T1 GROW, the exemplar) | `node scripts/probes/band-J/slider.mjs <dist> <wt>` (appendix A): the `.glass-slider` root's box while a pointer holds the thumb for 450 ms, and while the thumb has keyboard focus, against rest; bound ×1.03 | **FAIL 4/4**: Chromium and Playwright WebKit, light and dark: rest 360×20, pointer-held 360 (×1.000, two `[data-engaged]` nodes present), keyboard-focused 360 (×1.000). With a planted `.glass-slider:where(:active, :has(:focus-visible)) { scale: 1.06 }`: **PASS 4/4** (381.6, ×1.060) |
| hallmark 6 | `git grep -nE -- '--impulse\|useLiquidSpine' src \| wc -l` | 0 |
| D4's T-6 (the tile's engagement, the battery's model) | `node $H/run.mjs --build <out>/builds/head --only T-6` (W-J.1 §2.2) | **17/24** Chromium; Playwright WebKit hangs on ToggleGroupItem hover (PF-1) |

## 3 · The cure

### 3.1 · The entry gate

1. **D5 opens.** Formation (or the owner's ruling that folds the rung into D4's or D2's scope, `PLAN.md:336`) writes `design/engagement/PORTFOLIO.md`, a round-0 portfolio with at least three approach families, and a battery whose every witness is RED at HEAD with a planted-defect self-test in both engines (the D3 and D4 harness pattern). The battery starts from:
   - the census, with its denominator re-stated by the loop (§3.2 item 1);
   - D4's T-6 commit bar (H-4: a pop that peaks and bounces, or a body that travels; keyboard, pointer and programmatic commits; no pop on Tab entry), generalized from the tile to every interactive component;
   - the slider probe (§2.2) and L05a-16's mobile modal expansion;
   - hallmark 6 (momentum: a released drag or fling carries its velocity into the settle);
   - the touch rows W-I.3 records (a control whose only feedback was hover has a press rung on `(hover: none)`);
   - S6's breathing preset under W-F.6's compositor-only bound.
2. **D5 converges** under the charter's gate (`CHARTER.md:82,86`): at least three full passes, zero enumerated open gaps against a checklist fixed at the pass-1 agglomeration, a fresh adversarial audit by seats that did not author the winning spec, and two consecutive clean passes. Owner rulings the loop asks for enter as they arrive; the loop builds on its stated defaults until then.

**Not met at this seat.** D5 has no folder. With the 5-6 seat ceiling taken by D1-D4 and formation (`FORMATION-PROGRESS.md` outage log, 2026-09-25), D5's round 0 opens on the first seat D4 or D2 frees.

### 3.2 · What the wave lands, whatever D5 converges on

These rows are fixed by the family's mechanism and the plan's scope (`PLAN.md:196`), not by the loop's design. D5 decides what each rung looks and moves like; these decide that there is one of each and that it is measured.

1. **One census, bound, over a stated denominator.** The owed entry W-A.2 creates (`tests/owed/engage-ladder-census.test.ts`, the `:134` assertion as a plain `it`) moves to `tests/styles/engage-ladder.test.ts`, its `vitest.config.ts` exclusion and W-A.2's fence are removed, and it passes. The denominator is the loop's classification of every component directory into the register's classes (for example: pressed controls, held controls, overlays, ambient surfaces, static atoms), declared once in the register's source of record and read by the census; a directory with no class fails the census, and a class with no rung fails it too. Comment lines never count (W-A.2 §3 item 7, L02 M15b2).
2. **One writer per engagement attribute.** `data-engaged` means one thing and has one owner (the register's composable). The focus veil's two meanings split: a modal's veil keys on the overlay's open state through its own attribute or class, and `data-engaged` on the veil and the loupe means held. Every reader reads the owner's attribute.
3. **T1 GROW and the slider exemplar**: BUILT per D5's spec with the slider probe green, or RETIRED by D5 with the owner's words quoted in the #27 row. Either way L01a-35 and L05a-16 close here, not re-booked.
4. **Hallmark 6**: BUILT with a D5 battery witness (the released velocity carried into the settle, read per frame), or RETIRED with the owner's words quoted in the F-54 row.
5. **The breathing preset (S6)**: BUILT as an idle rung that passes W-F.6's compositor-only bound, or RETIRED with the owner's words.
6. **Every rung rides the one spring authority** (W-F.1) and the engage envelope table; no component spells a duration or a scale literal for a rung (the mirror arm stays green).

### 3.3 · What D5 decides

The rung per class, its look and motion (grow, squish, lift, flood, travel), its PRM arm, the ambient components' engagement, the modality split (pointer, touch, keyboard, programmatic), and the owner questions it raises. This spec pre-empts none of it; the landing is D5's converged patch with no second recipe.

## 4 · Files it touches

- `src/composables/motion/engage/` (the register's owner of `data-engaged` and the class declaration), `src/styles/tokens/motion-registers.css`, `src/styles/utilities/base.css` (the shared rung recipes).
- `src/components/slider/{Slider.vue,styles.css}`, `src/components/dialog/ModalOverlay.vue`, `src/styles/glass/focus-veil.css`.
- Every component directory the census names rungless (38 at HEAD, §2.2), to the extent D5's classes give each a rung.
- `tests/styles/engage-ladder.test.ts` (the census bound), `tests/owed/engage-ladder-census.test.ts` (moved out), `vitest.config.ts` (the exclusion removed); D5's battery under `scripts/loops/engagement/` (W-C.1's placement).
- `scripts/probes/band-J/slider.mjs` (appendix A).
- `MIGRATION.md` (§7).

## 5 · Acceptance gates

In the table cells below, `\|` is the Markdown escape for `|`: the command itself uses a bare `|`.

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · the census, bound | `npx vitest run tests/styles/engage-ladder.test.ts` with the census as a plain `it` over the declared denominator | passes; `! grep -n 'it\.fails(' tests/styles/engage-ladder.test.ts` exits 0 | **FAIL**: 38 of 55 directories rungless (the plain-`it` copy, §2.2); the shipped file carries the `:134` latch |
| G2 · one writer | `test $(git grep -l 'data-engaged' -- 'src/**/*.vue' \| wc -l) -le 1` | exit 0, and the one file is the register's owner | **exit 1**: 2 writers |
| G3 · the slider exemplar (if BUILT) | `node scripts/probes/band-J/slider.mjs <dist> <wt>` | exit 0, 4/4 cells | **exit 1**: 4/4 FAIL at ×1.000; the planted grow reads 4/4 PASS, so the gate can pass. If D5 RETIREs T1 GROW, the probe is deleted with the owner's quote in the #27 row and G3 is recorded "retired", not green |
| G6 · one clock authority | `npx vitest run tests/styles/engage-ladder.test.ts -t "mirror"` plus W-F.1's spring-authority suite | passes with every new rung reading the envelope tokens | passes at HEAD for the existing tokens (a hold line; its own drift test at `:190-200` shows it can fail) |

D5's battery and its self-test are D5's convergence gate (PLAN §4), which is this wave's entry condition, not its gates: they have no executable at HEAD, so they cannot be born RED (fix-2 struck G4 and G5, FA-02). A D5 round 0 that cannot make its battery RED at HEAD has not opened. Opening D5 is a formation act owed before this wave's turn (PLAN §6; LEDGER `PLAN-§6-D5`).

## 6 · π and DELTA obligations

Before = the probe's `bj-head` build and the census run above; after = the same on the candidate, plus D5's battery captures. Captures under `.cache/evidence/W-J.2/`, each PNG with its path, sha256, command and paired row.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the slider held by pointer and focused by keyboard (scrubber and spectrum) | light, dark | Chromium, Playwright WebKit | per-frame strips, rest to engaged to release | `slider.mjs` box ratio per frame; the loupe and veil presence |
| one component per D5 class at rest, pressed, held, engaged and released | light, dark; fine and coarse | Chromium, Playwright WebKit | filmstrips per class | D5's battery rows per frame |
| a modal's focus veil and a held slider's veil side by side | light, dark | Chromium | paired shots | G2's attribute owner; the veil's paint per state |
| the momentum hallmark on a released drag (if BUILT) | light, dark | Chromium, Playwright WebKit | screencast | the velocity carried into the settle, per frame |
| the same on a real GPU at 60 fps | light, dark | Chromium with `--use-angle=metal` (W-A.4's GPU leg) | screencast | frame pacing |
| real Safari | both | — | UNMEASURED (owner's safaridriver checkbox, OW-3) | — |

## 7 · MIGRATION rows (clean break, no alias)

| removed or changed | successor | wave |
|---|---|---|
| `data-engaged` on a modal's `.glass-focus-veil` as a presence marker | the overlay's open state on its own attribute; `data-engaged` means held, written by one owner | this |
| consumer CSS that reads `.glass-focus-veil[data-engaged]` to style an open modal | re-point to the overlay's open-state attribute; named in W-L.7's packets | this |
| any rung class or token D5 renames or retires (for example `.tap-squish`, `interactive-item`) | D5's register class, one per rung; no alias | this, per the converged spec |
| `tests/owed/engage-ladder-census.test.ts` and its fence | the bound census in `tests/styles/engage-ladder.test.ts` | this |

## 8 · Dependencies and ledger rows

Its edges are PLAN §5's (the D5 gate and D5's opening among them). Closes F-54's remainder; #27 and #77 (their remainders); D-2's enforcement; GAP-2 / GAP-B1; L01a-35; L05a-16; UIA-F-84; W-H.3's S6 breathing preset; W-I.3's touch rows; hallmark 6. The three gestalt passes (P-1) are recorded in the wave record before it closes.

## Appendix A · the band-J probe's slider row and the census copy

The probe's `build.mjs` and `app/App.vue` are in `W-J.1.md` appendix A (the default scene is the slider). `slider.mjs <dist> <worktree>`, exits 1 on any FAIL cell (the `PLANT` branch is the self-test):

```js
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const [,, dist, wt] = process.argv; const require = createRequire(path.join(wt, "package.json")); const pw = require("playwright");
const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html" };
const srv = http.createServer((q, r) => { let p = path.join(dist, decodeURIComponent(q.url.split("?")[0])); if (p.endsWith("/")) p += "index.html"; if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(r); });
await new Promise((ok) => srv.listen(0, ok)); const url = `http://127.0.0.1:${srv.address().port}/`;
let bad = 0;
for (const engine of ["chromium", "webkit"]) for (const theme of ["light", "dark"]) {
  const b = await pw[engine].launch(); const pg = await b.newPage({ viewport: { width: 600, height: 400 } });
  try {
    await pg.goto(url + "?theme=" + theme); await pg.waitForFunction(() => window.__ready);
    if (process.env.PLANT) await pg.addStyleTag({ content: ".glass-slider:where(:active,:has(:focus-visible)){scale:1.06}" }); await pg.waitForTimeout(300);
    const read = () => pg.evaluate(() => { const el = document.querySelector(".glass-slider"); const r = el.getBoundingClientRect(); return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), scale: getComputedStyle(el).scale, engagedNodes: document.querySelectorAll("[data-engaged]").length }; });
    const rest = await read();
    const tb = await pg.locator('[role="slider"]').first().boundingBox();
    await pg.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await pg.mouse.down(); await pg.waitForTimeout(450);
    const held = await read(); await pg.mouse.up(); await pg.mouse.move(5, 5); await pg.waitForTimeout(600);
    await pg.locator('[data-t="before"]').focus(); await pg.keyboard.press("Tab"); await pg.waitForTimeout(450);
    const kbd = await read(); const gH = held.w / rest.w, gK = kbd.w / rest.w; const pass = gH >= 1.03 && gK >= 1.03; if (!pass) bad++;
    console.log(`${pass ? "PASS" : "FAIL"} ${engine} ${theme} · rest ${rest.w}×${rest.h} · pointer-held ${held.w} (×${gH.toFixed(3)}, [data-engaged] nodes ${held.engagedNodes}) · keyboard-focused ${kbd.w} (×${gK.toFixed(3)}) · bound ×1.03 sustained`);
  } catch (e) { bad++; console.log(`FAIL ${engine} ${theme} · ${String(e.message).split("\n")[0]}`); }
  await b.close();
}
srv.close(); console.log(`VERDICT slider-grow: ${bad ? "FAIL" : "PASS"} (${bad} failing cells)`); process.exit(bad ? 1 : 0);
```

The census copy (the `:123-135` detector as a plain `it`; scratch only, it lands as W-A.2's owed entry):

```ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const COMPONENTS = join(process.cwd(), "src", "components");
const DIRS = readdirSync(COMPONENTS).filter((e) => e !== "_shared").filter((e) => statSync(join(COMPONENTS, e)).isDirectory());
function texts(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) { const p = join(dir, e); if (statSync(p).isDirectory()) texts(p, out); else if (/\.(css|vue|ts)$/.test(e)) out.push(readFileSync(p, "utf8")); }
  return out;
}
const RUNG = /:active(?=[\s,){:.#[>+~])|\[data-held\]|data-engaged|tap-squish|interactive-item|--engage-/;
const withRung = DIRS.filter((d) => texts(join(COMPONENTS, d)).some((t) => RUNG.test(t)));
describe("band-J born-RED (plain it)", () => {
  it("every component directory carries a rung beyond hover", () => {
    console.log(`DIRS ${DIRS.length} WITH-RUNG ${withRung.length} RUNGLESS ${DIRS.length - withRung.length}: ${DIRS.filter((d) => !withRung.includes(d)).join(" ")}`);
    expect(DIRS.filter((d) => !withRung.includes(d))).toEqual([]);
  });
});
```
