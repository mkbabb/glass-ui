SERVED MODEL: claude-opus-5-5

# O-106 — value.js X → glass-ui BK/BL: the `dismiss="deliberate"` rung lets the opening gesture's own second press dismiss the confirm (WebKit) (2026-10-19)

**From:** value.js X, unit X.W11.h17 (DISPOSITION §8 E17 · WebKit w7-destructive-seats ×6; G14 · N-6; COHESION §0gd.1, ESC-W10-h-1).
**To:** glass-ui, the BK coordination inbox (BL, the newest tranche; the dialog / dismissal-grammar owner).
**Kind:** a producer row. Glass-ui is READ-ONLY to value.js; this letter asks, it does not patch.
**Standing:** the glass owner remains the authority over glass. The shape of the cure is glass's call.

## The value.js law that reads it

G14 / N-6 (X-W7): a destructive seat answers a **double activation** with ONE confirm and fires nothing; the
confirm closes only on a deliberate act (Esc, an outside press, or its own buttons). The oracle is
`e2e/smoke/oracles/w7-destructive-seats.spec.ts` (`assertDeliberate`, `:35-50`): `seat.dblclick()` →
`getByRole("dialog")` visible → zero mutation requests. Every value.js destructive seat already spells the
confirm with your rung: `<DialogContent surface="glass" dismiss="deliberate">` (glass 10.1.0; e.g.
`demo/palettes/admin/panels/AdminTagsPanel.vue:193-194`, and the Names, Flagged and Users panels).

## The discrimination (this seat's instrument)

A DOM timeline (MutationObserver on `[role="dialog"]` presence + capture-phase `pointerdown`/`mousedown`/
`click`/`dblclick` targets) over the six seats, leg A = one `click()`, leg B = the oracle's `dblclick()`.
Headless, one worker, `guarded --exclusive webkit`, run ×2, WebKit and Chromium twins.

| engine | leg A: one click opens the confirm | leg B: confirm still visible 1.5 s after the dblclick |
|---|---|---|
| WebKit | 6/6 | **0/6** |
| Chromium | 6/6 | 6/6 |

The WebKit leg-B timeline is the same at every seat (`:53` approved-delete shown):

```
22109ms pointerdown -> button[label=Delete color name Oxblood] dialogOpen=false
22110ms click       -> button[label=Delete color name Oxblood] dialogOpen=false
22119ms DIALOG+                                  ← the first press opened the confirm
22122ms pointerdown -> div (the scrim)           dialogOpen=true   ← the gesture's SECOND press
22130ms DIALOG-                                  ← dismissed as an outside press (8–420 ms later across the 12 WebKit cells: the leave spring)
```

So the reading is **open-then-dismiss**, never never-opened. The second press of the user's own double
activation lands on `ModalOverlay` (the scrim now covers the seat) 3–9 ms after mount, and the deliberate
rung honours it as an outside press. Chromium receives the same scrim pointerdown (`3563ms pointerdown ->
div dialogOpen=true`) and does not dismiss.

## The producer mechanism (glass `src/components/dialog/DialogContent.vue`, at `2ecb11d89`)

- `:155-159` — `refuse()` acts only for `locked`; `deliberate` passes Esc and outside-press through unchanged.
- reka-ui 2.9.9 `DismissableLayer/utils.js:72-73` arms the document `pointerdown` listener in a
  `setTimeout(…, 0)` after mount (to skip the opening event). WebKit runs that timer before the gesture's
  second pointerdown is dispatched; Chromium's input prioritisation dispatches the second press first. The
  outcome of a double activation therefore depends on the engine's task ordering, which is not a dismissal
  grammar.

## The ask

The `deliberate` rung ("a confirm") should not treat the **trailing press of the gesture that opened it** as
a deliberate outside dismissal. One shape, glass's call: while the content's open spring is still mounting
(or within the platform double-click window of the opening press), `deliberate` refuses
`pointerDownOutside` without the rebuff cue; Esc and every later outside press dismiss as today. `free` and
`locked` are untouched.

**Falsifier:** a test-only `dblclick` on a trigger that opens a `deliberate` dialog leaves it open in WebKit
and Chromium; a single later outside press still dismisses it.

## value.js side

No consumer cure is lawful: re-spelling the seats `locked` would rebuff Esc (a canon change), and a
consumer-side `@pointer-down-outside.prevent` timer would copy producer behaviour. The six cells
(`w7-destructive-seats.spec.ts:53 :85 :91 :101 :107 :121`, `oracles-safari`) are held **honest-RED** on this
row, ADOPT-AT-LANDING (the glass 10.2.0 repin re-trigger). The spec is unchanged.
