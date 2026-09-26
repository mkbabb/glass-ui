# W-K.8 · W-FORM-PARTICIPATION: one participation seam per control · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B, scene `s=form`), consumer app on reka 2.10.5; the checkout's own `node_modules` holds reka 2.10.1 |
| ships in | 11.0.0 |
| families | F-82 (all members) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what | row in §3 |
|---|---|---|
| R6-02-01 (HIGH) | `form.reset()` is not read back: model, view and FormData disagree | 1 |
| R6-02-02 (HIGH) | a blocked submit paints nothing on Checkbox, Switch, RadioGroup and Select; focus lands on a hidden proxy | 2 |
| R6-02-03 (MED) | `<fieldset disabled>` leaves the Slider and RadioGroup operable and the fields in resting paint | 3 |
| R6-02-04 (MED) | Enter in a NumberField submits the previous value (Firefox); an autofilled proxy does not move the model | 4, 5 |
| R6-02-05 (MED) | the NumberField's formatted write sits outside the undo stack; a composed commit clears the model | 6 |
| KF-145's formatter half | routed to W-K.6 row 4 | — |

## 2 · The defect at HEAD

Sources: `src/components/_shared/control.ts:45-48` (`controlStateAttrs` reads only the `invalid` prop); `_shared/field/control.css:236` (the invalid rim matches `:user-invalid` only on `.field-control`, the native fields); `src` holds 0 form `reset` listeners (the three `"reset"` strings are Configurator's and the dock CTA's own events) and 0 `isComposing` reads. reka 2.10.1 (the checkout's copy): `VisuallyHidden/VisuallyHiddenInputBubble.js:41` (`watch(valueState)` patches the proxy one way), `Select/BubbleSelect.js:55` (the one proxy `change` read back), `NumberField/NumberFieldRoot.js:163-164` (`setInputValue` writes `inputEl.value` directly, outside the editor), `:175` (an unparseable commit sets the model to `undefined`).

Measured with appendix A (`k8.mjs`) in three engines:

| gate | Chromium | Playwright WebKit | Playwright Firefox |
|---|---|---|---|
| K8-G1 after Reset, FormData = model = paint = default | **FAIL** 15 disagreements: every model value keeps its fill (`fruit "plum"`, `agree true`, `on true`, `plan "team"`, `vol 42`, `qty 9`, `name "hello"`, `note "note"`); FormData `plan=team`, `qty=9`, `agree=yes`, `on=on`; the trigger paints Plum and both switches paint checked, while FormData says `fruit=apple` | not measured: the Select trigger click times out in Playwright WebKit (recorded) | **FAIL** the same 15 |
| K8-G2 blocked submit: 3 of 3 required controls `aria-invalid`, focus on a visible control | **FAIL** 0 of 3; focus on `INPUT[type=checkbox]` inside `aria-hidden` | **FAIL** same | **FAIL** same |
| K8-G3 inside `<fieldset disabled>`: 0 focusable descendants, Slider fixed, disabled paint | **FAIL** Tab stops on the RadioGroup and the Slider; `vol` 40 → 41; Input and NumberField `data-state="default"` | **FAIL** same | **FAIL** same |
| K8-G4 Enter in a NumberField submits `qty=7` | PASS | PASS | **FAIL** submits `qty=3` |
| K8-G5 commit 7, undo, redo never reads `777` | PASS (`7`, `7`) | PASS | PASS |
| K8-G6 an autofill-shaped proxy write moves model and face | **FAIL** model false, face unchecked, FormData `agree=yes` | **FAIL** same | **FAIL** same |
| K8-G7 `5` then a composed `日本`, blur keeps 5 | **FAIL** during `5日本`, after `""`, model `undefined` (CDP `Input.imeSetComposition`) | — (no IME driver) | — |
| K8-S static (below) | exit 1 | | |

**Not reproduced at HEAD:** K8-G5 passes in all three engines (the `777` redo of R6-02-05 needs the commit-then-refocus order the seat drove; this probe's order reads `7`). It stays as a hold line, and row 6's cure applies on the mechanism (`NumberFieldRoot.js:163-164` is a direct `value` write). K8-G4 is RED in Firefox only, as the registry states.

## 3 · The cure

One module, `src/components/_shared/field/participation.ts`, exporting `useFormParticipation({ proxy, model, defaultValue, invalid, disabled })`. Every form control (Input, Textarea, NumberField, Checkbox, Switch, RadioGroup, Slider, Select, Command's form mode) calls it once. It reads the platform state back:

1. **Reset.** It listens for `reset` on the proxy's `form` owner and writes `defaultValue` (the value at mount, or the `defaultValue` prop) through the model on the next task. The model then repaints the view and rewrites the proxy. BubbleSelect's dropped empty option is not relied on: the proxy is rewritten from the model after reset.
2. **Validity.** It listens for `invalid` on the proxy (and reads `proxy.validity.valid` on submit). A failed constraint sets the control's invalid state, and `controlStateAttrs` reads that state as well as the prop. So the visible control paints the rim and carries `aria-invalid="true"` with its own name. The first `invalid` event of a submit calls `preventDefault()` on the proxy's bubble and focuses the visible control.
3. **Disabledness.** It reads `proxy.matches(':disabled')` on mount and on a `MutationObserver` over the ancestor fieldsets' `disabled`. The effective disabled state (prop OR fieldset) drives reka's `disabled` prop, the `data-state="disabled"` rung and `tabindex`.
4. **Implicit submission.** The proxy is written synchronously in the model setter (a `flush: "sync"` watch in place of reka's default), so Enter validates and submits the value on screen.
5. **Platform writes.** A proxy `input` or `change` event not fired by the seam itself (autofill, extensions) writes the proxy's value into the model, as Select's `change` already does.
6. **The NumberField commit rides the editor.** The formatted write is `execCommand("insertText")` over a selected range (so undo and redo see it), and a commit that does not parse reverts to the last committed value instead of `undefined`. A commit waits for `compositionend`. Reported upstream to reka; the wrapper in glass's NumberField carries the cure until it lands, then goes.

## 4 · Files it touches

`src/components/_shared/field/participation.ts` (new), `src/components/_shared/control.ts`, `src/components/_shared/field/control.css` (the rim matches `[data-state="invalid"]` on every control, not only `.field-control`), `src/components/{input/Input.vue,textarea/Textarea.vue,number-field/*,checkbox/Checkbox.vue,switch/Switch.vue,radio-group/RadioGroup.vue,slider/Slider.vue,select/Select.vue,command/Command.vue}`, `src/components/input/types.ts:46-47` (the comment then holds for every control). New `tests-visual/wired/form-participation.spec.ts` (appendix A), in Chromium and Firefox per W-A.3's D-4 (WebKit where its Select click works).

## 5 · Acceptance gates

Each row is a gate on appendix A's cell of the same id. HEAD readings are §2's (Chromium, Playwright WebKit, Playwright Firefox).

| id | passes when | HEAD |
|---|---|---|
| K8-G1 | after Reset: 0 disagreements between FormData, the model and the paint, each equal to the control's default (every control in the fixture) | **FAIL** 15 disagreements, all three engines |
| K8-G2 | a blocked submit: 3 of 3 required controls `aria-invalid="true"`, and focus on a visible control with an accessible name | **FAIL** 0 of 3; focus inside `aria-hidden`, all three engines |
| K8-G3 | inside `<fieldset disabled>`: 0 Tab stops among its descendants, `vol` stays 40 after ArrowRight, and Input and NumberField read `data-state="disabled"` | **FAIL** all three engines |
| K8-G4 | Enter in a NumberField holding 7 submits `qty=7` | **FAIL** in Playwright Firefox (`qty=3`); PASS in Chromium and Playwright WebKit |
| K8-G5, hold line | commit 7, undo, redo: the field never reads `777` | PASS in all three. Bite: a direct `input.value = formatted` write in the wrapper with the commit-then-refocus order; the wave adds that order to the cell |
| K8-G6 | an autofill-shaped write to the proxy input sets the model `true`, paints the face checked, and FormData `agree=yes` | **FAIL** model false, face unchecked, all three engines |
| K8-G7 | type `5`, compose `日本`, blur: the model is `5` | **FAIL** Chromium (`""`, model `undefined`); not driven in the other two (no IME driver) |
| K8-S (static) | `rg -q '"reset"' src/components/_shared` | **exit 1** (0 reset listeners) |

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=form` after fill, after Reset and after a blocked submit; `k.html?s=form&fs=1` (fieldset disabled); demo `/forms/checks` and `/forms/inputs` after a blocked submit, at 1440×900 and 390×844.
- **Themes:** light and dark.
- **Engines:** Chromium, Playwright Firefox, Playwright WebKit; real Safari UNMEASURED (OW-3).
- **Paired capture:** each surface at HEAD and at the wave. The π reading is the disagreement list (G1), the painted rim per control (G2: the rim is the destructive token on each of the three), and the disabled ink ratio (G3: 45% ink, as the `disabled` prop paints).

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `form.reset()` leaves glass controls' models unchanged | reset writes each control's `defaultValue` through its model | a consumer that re-seeded after reset by hand deletes that code |
| constraint failure paints only Input and Textarea | every control paints and announces it | |
| `<fieldset disabled>` leaves glass controls operable | they are disabled | |
| a proxy written by the platform is overwritten by the model | it moves the model | |
| an unparseable NumberField commit sets the model to `undefined` | it reverts to the last committed value | a consumer that read `undefined` as "cleared" reads an empty field as the clear path (the input's empty commit still sets `undefined`) |

## 8 · Ledger rows

Closes F-82 (R6-02-01 to R6-02-05; R6-02-05's undo leg a hold line at HEAD).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the platform's form state and the model are one value, read in both directions.
- **Wave:** §2's FAIL cells and K8-S green in one run, three engines.
- **Feature:** fill the fixture form, press Reset, submit empty, wrap it in a disabled fieldset: FormData, the model and the paint agree at every step. One capture per step.

## Appendix A · `k8.mjs` (lands as `tests-visual/wired/form-participation.spec.ts`)

Run against the W-K.1 appendix B harness (scene `s=form` exposes `window.__model`, `window.__formData` and `window.__submits`).

```js
// W-K.8 born-RED probe: one form participation seam per control (F-82). node k8.mjs [--eng webkit|firefox]
import { open, sleep, rectOf, runner, argEng } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k8');
const DEF = { fruit: 'apple', agree: false, on: false, plan: 'solo', vol: 40, qty: 3, name: '', note: '' };
// G1 · Reset: FormData = model = paint = default for every control
await safe('K8-G1 reset', async () => {
  const { browser, page } = await open({ eng, qs: 's=form', settle: 600 });
  await page.click('[data-probe=strig]'); await sleep(500); const o = await rectOf(page, '[data-probe=so-plum]'); await page.mouse.click(o.x, o.y); await sleep(400);
  await page.click('[data-probe=cb]'); await page.click('[data-probe=sw]'); await page.click('[data-probe=rg] [role=radio]:nth-of-type(2)').catch(() => {});
  await page.fill('[data-probe=in]', 'hello'); await page.fill('[data-probe=ta]', 'note'); await page.focus('[data-probe=sl] [role=slider]'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight');
  await page.fill('[data-probe=nfin]', '9'); await page.keyboard.press('Tab'); await sleep(300);
  const filled = await page.evaluate(() => ({ model: window.__model(), fd: window.__formData() }));
  await page.click('[data-probe=reset]'); await sleep(500);
  const st = await page.evaluate(() => ({ model: window.__model(), fd: window.__formData(), paint: { fruit: document.querySelector('[data-probe=strig]').textContent.trim(), name: document.querySelector('[data-probe=in]').value, note: document.querySelector('[data-probe=ta]').value, agree: document.querySelector('[data-probe=cb]').getAttribute('data-state'), on: document.querySelector('[data-probe=sw]').getAttribute('data-state'), vol: document.querySelector('[data-probe=sl] [role=slider]').getAttribute('aria-valuenow'), qty: document.querySelector('[data-probe=nfin]').value } }));
  const bad = [];
  for (const k of Object.keys(DEF)) { const m = st.model[k]; if (JSON.stringify(m) !== JSON.stringify(DEF[k])) bad.push(`model.${k}=${JSON.stringify(m)}`); }
  const fdWant = { fruit: 'apple', plan: 'solo', vol: '40', qty: '3', name: '', note: '' };
  for (const [k, v] of Object.entries(fdWant)) if (st.fd[k] !== undefined && st.fd[k] !== v) bad.push(`fd.${k}=${st.fd[k]}`);
  if (st.fd.agree) bad.push(`fd.agree=${st.fd.agree}`); if (st.fd.on) bad.push(`fd.on=${st.fd.on}`);
  if (st.paint.fruit.toLowerCase() !== 'apple') bad.push(`paint.fruit=${st.paint.fruit}`); if (st.paint.name !== '') bad.push(`paint.name=${st.paint.name}`); if (st.paint.agree === 'checked') bad.push('paint.agree=checked'); if (st.paint.on === 'checked') bad.push('paint.on=checked');
  row('K8-G1 after Reset FormData = model = paint = default', bad.length === 0, { disagreements: bad, filledModel: filled.model });
  await browser.close();
});
// G2 · a blocked submit: each empty required control reads invalid in ARIA on its visible element, and focus lands on a visible, named control
await safe('K8-G2 blocked submit', async () => {
  const { browser, page } = await open({ eng, qs: 's=form', settle: 600 });
  await page.click('[data-probe=submit]'); await sleep(500);
  const st = await page.evaluate(() => { const vis = { cb: '[data-probe=cb]', sw: '[data-probe=sw]', in: '[data-probe=in]' }; const out = {}; for (const [k, s] of Object.entries(vis)) { const e = document.querySelector(s); out[k] = e.getAttribute('aria-invalid'); } const a = document.activeElement; out.active = { tag: a.tagName, type: a.type || null, hidden: !!a.closest('[aria-hidden="true"]'), probe: a.dataset?.probe || null }; out.submits = window.__submits.length; return out; });
  const invalidCount = ['cb', 'sw', 'in'].filter((k) => st[k] === 'true').length;
  row('K8-G2 blocked submit: 3 of 3 required controls aria-invalid, focus on a visible control', st.submits === 0 && invalidCount === 3 && !st.active.hidden && st.active.probe, { ...st, invalidCount });
  await browser.close();
});
// G3 · inside <fieldset disabled> no descendant is focusable and the Slider does not move
await safe('K8-G3 fieldset disabled', async () => {
  const { browser, page } = await open({ eng, qs: 's=form&fs=1', settle: 600 });
  const stops = []; await page.evaluate(() => document.body.focus());
  for (let i = 0; i < 14; i++) { await page.keyboard.press('Tab'); const a = await page.evaluate(() => { const a = document.activeElement; return { inFs: !!document.querySelector('[data-probe=fs]').contains(a), id: a.dataset?.probe || a.getAttribute('role') || a.tagName }; }); if (a.inFs) stops.push(a.id); }
  await page.evaluate(() => document.querySelector('[data-probe=sl] [role=slider]').focus()); await page.keyboard.press('ArrowRight'); await sleep(150);
  const vol = await page.evaluate(() => window.__model().vol);
  const paint = await page.evaluate(() => ({ in: document.querySelector('[data-probe=in]').getAttribute('data-state'), nf: document.querySelector('[data-probe=nfin]').getAttribute('data-state') }));
  row('K8-G3 fieldset disabled: 0 focusable descendants, Slider fixed, disabled paint', stops.length === 0 && vol === 40 && paint.in === 'disabled', { stops: [...new Set(stops)], vol, paint });
  await browser.close();
});
// G4 · Enter in a NumberField submits the value on screen
await safe('K8-G4 numberfield enter', async () => {
  const { browser, page } = await open({ eng, qs: 's=form', settle: 600 });
  await page.fill('[data-probe=in]', 'x'); await page.click('[data-probe=cb]'); await page.click('[data-probe=sw]');
  await page.click('[data-probe=nfin]'); await page.keyboard.press(process.platform === 'darwin' ? 'Meta+a' : 'Control+a'); await page.keyboard.type('7'); await page.keyboard.press('Enter'); await sleep(500);
  const s = await page.evaluate(() => window.__submits);
  row('K8-G4 Enter in NumberField submits qty=7', s.length === 1 && s[0].qty === '7', { submits: s });
  await browser.close();
});
// G5 · NumberField commit rides the editor: commit 7, undo, redo never reads 777
await safe('K8-G5 numberfield undo', async () => {
  const { browser, page } = await open({ eng, qs: 's=form', settle: 600 });
  const mod = process.platform === 'darwin' ? 'Meta' : 'Control';
  await page.click('[data-probe=nfin]'); await page.keyboard.press(`${mod}+a`); await page.keyboard.type('7'); await page.keyboard.press('Tab'); await sleep(200);
  await page.click('[data-probe=nfin]'); await page.keyboard.press(`${mod}+z`); await sleep(100); const u = await page.inputValue('[data-probe=nfin]'); await page.keyboard.press(`${mod}+Shift+z`); await sleep(100);
  const v = await page.inputValue('[data-probe=nfin]'); await page.keyboard.press('Tab'); await sleep(200);
  const m = await page.evaluate(() => window.__model().qty);
  row('K8-G5 commit 7, undo, redo reads 7 or empty, never 777', v === '7' || v === '', { afterUndo: u, afterRedo: v, modelAfterBlur: m });
  await browser.close();
});
// G6 · a proxy change written by the platform (autofill shape) moves the model: Checkbox proxy set checked + input + change
await safe('K8-G6 autofill proxy', async () => {
  const { browser, page } = await open({ eng, qs: 's=form', settle: 600 });
  const st = await page.evaluate(async () => { const p = document.querySelector('[data-probe=form] input[type=checkbox][name=agree]'); if (!p) return { proxy: false }; p.checked = true; p.dispatchEvent(new Event('input', { bubbles: true })); p.dispatchEvent(new Event('change', { bubbles: true })); await new Promise((r) => setTimeout(r, 200)); return { proxy: true, model: window.__model().agree, face: document.querySelector('[data-probe=cb]').getAttribute('data-state'), fd: window.__formData().agree ?? null }; });
  row('K8-G6 autofilled Checkbox proxy moves model and face', st.model === true && st.face === 'checked', st);
  await browser.close();
});
// G7 · an input-method commit in a NumberField: "5" then a composed "日本", blur keeps 5 (Chromium, CDP IME)
if (eng === 'chromium') await safe('K8-G7 numberfield compose', async () => {
  const { browser, page, cdp } = await open({ eng, qs: 's=form', settle: 600 });
  await page.click('[data-probe=nfin]'); await page.keyboard.press(process.platform === 'darwin' ? 'Meta+a' : 'Control+a'); await page.keyboard.type('5');
  await cdp.send('Input.imeSetComposition', { text: 'にほ', selectionStart: 2, selectionEnd: 2 }); await sleep(100);
  await cdp.send('Input.insertText', { text: '日本' }); await sleep(100);
  const during = await page.inputValue('[data-probe=nfin]');
  await page.keyboard.press('Tab'); await sleep(300);
  const st = { during, after: await page.inputValue('[data-probe=nfin]'), model: await page.evaluate(() => String(window.__model().qty)) };
  row('K8-G7 composed letters after 5: blur keeps 5 in view and model', st.after === '5' && st.model === '5', st);
  await browser.close();
});
done(eng);
```
