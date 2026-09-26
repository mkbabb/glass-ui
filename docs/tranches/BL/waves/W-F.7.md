# W-F.7 · W-THEME-SWAP: every theme flip is atomic · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`), scratch worktree, demo built and served on :5961 |
| ships in | 11.0.0 |
| families | F-73 (member R2-02-08) |
| inbound | O-60 KFA-115 (keyframes.js: the theme flip animates chrome) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| member | what |
|---|---|
| R2-02-08 | the library's own `DarkModeToggle` defaults `disableTransitions` to `false` (`DarkModeToggle.vue:17-20`), and `useGlobalDark.toggleDark` adds `html.no-transition` only when the flag is set (`useGlobalDark.ts:92-111`). On a flip, colour, background, shadow and opacity transitions run on their own clocks while plates flip in one frame |
| (new at HEAD, this seat) | **the opt-in path is broken too.** With the flag set, `toggleDark` removes `no-transition` in the next `requestAnimationFrame` (`useGlobalDark.ts:107-110`). That callback runs before the frame's style recalc, so the recalc that sees the new scheme no longer sees `no-transition`, and every transition starts. The comment at `:95-102` assumes the class and the scheme land in the same recalc; the rAF removal undoes it |
| (new at HEAD, this seat) | **the flag is page-global but set per instance.** `DarkModeToggle.vue:35` runs `watchEffect(() => setDisableTransitions(props.disableTransitions))`, so two toggles on one page overwrite each other's setting on the shared singleton, and a flip through `isDark.value = …` or a system-preference change never goes through `toggleDark` at all |

## 2 · The defect at HEAD

`node f7.mjs` (appendix A), `/display/atoms`, the "Dark toggle" member, Chromium, re-run by this seat for this document:

| cell | HEAD reading |
|---|---|
| default toggle, light → dark | **50** transitions running at +16 ms, **38** outside `[data-allow-motion]`: `color` 27, `background-color` 5, `box-shadow` 4, `opacity` 2 |
| default toggle, dark → light | **50**, **38** (same split) |
| `CONTROL=1 node f7.mjs`: the story's "suppress transitions" knob on, its adjacent toggle | light → dark **38**, dark → light **38**: the knob does not help at HEAD |

R2-02 recorded 13 running transitions with the knob (all on the icon) on 7.0.0-era code; at this HEAD the knob path also leaves 38.

Mechanism check, `node f7-mech.mjs` (appendix B), not a gate: add `no-transition`, flip the class and `color-scheme`, remove the class after N animation frames.

| removal | outside `[data-allow-motion]` at +16 ms |
|---|---|
| after 1 rAF (HEAD's timing) | **38** (FAIL) |
| after 2 rAF | **0** (PASS) |

## 3 · The cure

1. **The flip is atomic by construction, for every writer.** `useGlobalDark` passes `onChanged` to vueuse `useDark`. Its handler adds `no-transition` to `<html>`, calls vueuse's default handler (which writes the class and `color-scheme`), then removes `no-transition` after two animation frames (the first frame's style recalc carries the flip under `transition: none`; the removal lands in the frame after). Every path that changes `isDark` (the toggle, `isDark.value = …`, `toggleDark`, `auto` following the system preference) goes through `onChanged`, so there is no flip that animates the chrome.
2. **The toggle icon keeps its motion** through the existing `data-allow-motion` exemption (`a11y-overrides.css:72-76`); nothing else is exempt.
3. **No switch.** `disableTransitions` (prop, ref) and `setDisableTransitions` are deleted, and the `disableTransition: false` passed to `useDark` (`useGlobalDark.ts:82`) stays false because the library's handler owns the suppression. The demo story's knob (`demo/stories/display/dark-mode-toggle.vue:18`, `:67-74`) is deleted.
4. **The settle hook is unchanged.** `onFlipSettled` still drains one frame after the flip; it now drains after the second frame, so a consumer's re-theme work starts with the class already removed.

A view-transition cross-fade (the registry's other shape) is not taken: it snapshots the page on every flip, costs a full-page raster on dense pages, and needs a reduced-motion branch; the class hold costs nothing and has no branch.

## 4 · Files it touches

`src/composables/dark/useGlobalDark.ts`, `src/components/dark-mode-toggle/DarkModeToggle.vue`, `src/styles/utilities/a11y-overrides.css` (the comment at `:57-60` restated for the two-frame hold), `demo/stories/display/dark-mode-toggle.vue`, the composable's unit test, `MIGRATION.md`. New: `tests-visual/wired/theme-swap.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | passes when | HEAD |
|---|---|---|
| F7-G1 | 16 ms after a click on the default `DarkModeToggle`, 0 running transitions outside `[data-allow-motion]`, both directions | **38, 38** |
| F7-G2 | 16 ms after `isDark.value = !isDark.value` from a script (no toggle), 0 running transitions outside `[data-allow-motion]` | 38 (by construction: this path never adds the class at HEAD) |
| F7-G3 (unit) | `useGlobalDark()` returns no `disableTransitions` / `setDisableTransitions`; `DarkModeToggle` declares no `disableTransitions` prop | both present |

The icon must still animate: F7-G1 also asserts ≥ 1 running transition inside `[data-allow-motion]` (12 at HEAD), which is the gate's positive leg. Planted bite: moving the removal back to one frame reddens G1 and G2 with 38 (the f7-mech reading).

## 6 · π and DELTA obligations

- `/display/atoms` "Dark toggle" and `/display/card`, 1440×900 and 390×844: frame captures at +16, +50 and +150 ms after a flip, light → dark and dark → light. HEAD: `audit/captures/R2-02/dark-swap-120/seek50ms-sidebar-default-vs-disable.png` (sidebar icons at `rgb(78,78,78)` over a dark plate at +50 ms). The wave shows the flipped colours at +16 ms and the icon mid-motion.
- Engines: Chromium measured. Playwright WebKit crashes on the demo routes (W-F.1 §2); record the cell as a crash or a reading. Real Safari UNMEASURED (OW-3); the two-frame hold is engine-neutral by design, and the Safari cell is owed at the close.
- KFA-115 is answered in keyframes.js's own docs by pointing at this release; no keyframes.js edit is made from here.

## 7 · MIGRATION rows

| removed | replacement |
|---|---|
| `DarkModeToggle` prop `disableTransitions` | none: every flip is atomic |
| `useGlobalDark().disableTransitions`, `.setDisableTransitions()` | none |
| a consumer relying on its own chrome transitions running during a flip | mark the element `data-allow-motion` |

No alias.

## 8 · Dependencies

W-A.3.

## 9 · Ledger rows it closes

F-73 (R2-02-08) and the two HEAD findings in §1; inbound O-60 KFA-115.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** the flip becomes a property of the dark-mode source, not of one component, so consumers that flip through `isDark` get it too.
- **Wave:** F7-G1..G3 green.
- **Feature:** a flip reads as one frame everywhere but the toggle's icon, captured at +16 ms.

## Appendix A · `f7.mjs` (lands as `tests-visual/wired/theme-swap.spec.ts`; `lib.mjs` is W-F.2 appendix D)

```js
// W-F.7 born-RED probe: the default theme flip is atomic. 16 ms after a click on the library's own
// DarkModeToggle (default props), no CSS transition runs outside [data-allow-motion] (the toggle icon).
// node f7.mjs [--eng webkit]
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('f7');
for (const start of ['light', 'dark']) {
  const { browser, page } = await open('/display/atoms', { theme: start });
  await page.locator('main [role=tab], main .segmented-tab', { hasText: 'Dark toggle' }).first().click();
  await sleep(1200);
  const r = await page.evaluate(async (ctrl) => {
    // CONTROL: tick the story's disableTransitions knob and flip with the toggle beside it (13 icon transitions at HEAD, R2-02-08)
    if (ctrl) { const lab = [...document.querySelectorAll('main label')].find((l) => /suppress transitions/.test(l.textContent)); const cb = lab.querySelector('input'); cb.click(); await new Promise((r) => setTimeout(r, 300)); }
    const btn = ctrl ? [...document.querySelectorAll('main label')].find((l) => /suppress transitions/.test(l.textContent)).parentElement.querySelector('.dark-mode-toggle-button') : [...document.querySelectorAll('main .dark-mode-toggle-button')].find((b) => b.getBoundingClientRect().width > 0);
    if (!btn) return { error: 'no toggle' };
    const wasDark = document.documentElement.classList.contains('dark');
    btn.click();
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 16)));
    const run = document.getAnimations().filter((a) => a.playState === 'running' && a.transitionProperty);
    const outside = run.filter((a) => { const t = a.effect?.target; return t && !(t.closest && t.closest('[data-allow-motion]')); });
    const props = {}; for (const a of outside) props[a.transitionProperty] = (props[a.transitionProperty] || 0) + 1;
    return { flipped: document.documentElement.classList.contains('dark') !== wasDark, running: run.length, outsideAllowMotion: outside.length, props };
  }, !!process.env.CONTROL);
  R.row(`F7-G1${process.env.CONTROL ? ' CONTROL (knob on)' : ''} ${start} -> ${start === 'light' ? 'dark' : 'light'}: 0 transitions outside [data-allow-motion] at +16 ms`, !r.error && r.flipped && r.outsideAllowMotion === 0, r);
  await browser.close();
}
R.done();
```

The CONTROL leg is HEAD-only (the knob is deleted by the wave). The landed spec adds the icon's positive leg (≥ 1 running inside `[data-allow-motion]`) and G2's script flip (`document.documentElement` flip through the exported `useGlobalDark().isDark`, exposed on the demo's `window.__glassDark` in the test build only).

## Appendix B · `f7-mech.mjs` (mechanism check, not a gate)

```js
// Mechanism check for W-F.7's cure (not a gate): hold html.no-transition across the flip frame's style
// recalc (removed after two frames) and count transitions outside [data-allow-motion] at +16 ms.
import { open, reporter } from './lib.mjs';
const R = reporter('f7-mech');
for (const [label, frames] of [['removed after 1 rAF (HEAD timing)', 1], ['removed after 2 rAF (the cure)', 2]]) {
  const { browser, page } = await open('/display/atoms');
  await page.locator('main [role=tab], main .segmented-tab', { hasText: 'Dark toggle' }).first().click(); await new Promise((r) => setTimeout(r, 1200));
  const r = await page.evaluate(async (frames) => {
    const html = document.documentElement; html.classList.add('no-transition'); html.classList.toggle('dark'); html.style.colorScheme = html.classList.contains('dark') ? 'dark' : 'light';
    const rm = (n) => requestAnimationFrame(() => (n > 1 ? rm(n - 1) : html.classList.remove('no-transition'))); rm(frames);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 16))));
    const run = document.getAnimations().filter((a) => a.playState === 'running' && a.transitionProperty);
    return { outsideAllowMotion: run.filter((a) => { const t = a.effect?.target; return t && !(t.closest && t.closest('[data-allow-motion]')); }).length };
  }, frames);
  R.row(`F7 mechanism: ${label}`, r.outsideAllowMotion === 0, r);
  await browser.close();
}
R.done();
```
