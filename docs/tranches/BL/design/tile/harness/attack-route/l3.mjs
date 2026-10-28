// attack-route/l3.mjs · H9 · L-3's compositions, folded into FACT (REGISTRY §P9-4, §P9-6: the `l3-bare` fold). Moved here
// unchanged from the pass-8 BUILD seat's `../../pass-8/routes/L3/compose.mjs`, so the paint witness of
// `--selection-paint` is a hashed FACT cell read on every attack build instead of a pass probe. Two non-site keys, each
// rendered by build.mjs as `<key>-migrated` as written (no host, no twin):
//   l3        six groups of three options (`a`, `b`, `c`), all on the scene's one model, so one write selects `b` in each:
//               ref-pill   a pill group, nothing written: the library's tint and stadium (the reference)
//               bare-pill  a pill group whose group element is written `--selection-paint: bare`
//               ref-tile   a `shape="cell"` group, nothing written
//               bare-tile  a `shape="cell"` group written `bare` on the group
//               item-write a pill group whose OPTIONS are each written `bare` (inline, as a consumer would): refused by
//                          the pin
//               ancestor   a pill group inside a `div` written `bare`: no effect, the group resets the fact
//   l3onitem  the planted composition (pass 8's `L3-plant-on-item`): bare-pill's and bare-tile's write moves from the
//             group to each option, so the opt-out never lands; FACT reads it with `--l3 on-item`, and its bare cells FAIL
const BARE = 'style="--selection-paint: bare"';
const opts = (tile, itemAttr = "") => ["a", "b", "c"].map((v, k) => {
  const name = ["Alpha", "Beta", "Gamma"][k];
  const inner = tile ? `<span>${name}</span><span class="text-micro">${k + 1} s</span>` : `<span>${name}</span>`;
  return `<ToggleGroupItem value="${v}" data-item${itemAttr ? ` ${itemAttr}` : ""}>${inner}</ToggleGroupItem>`;
}).join("");
const group = (kase, { tile = false, onGroup = false, onItem = false } = {}) =>
  `<ToggleGroup type="single" v-model="model"${tile ? ' shape="cell"' : ""} aria-label="L-3 ${kase}" data-l3-group${onGroup ? ` ${BARE}` : ""}${tile ? ' class="grid grid-cols-3"' : ""}>${opts(tile, onItem ? BARE : "")}</ToggleGroup>`;
export function compose({ plantOnItem = false } = {}) {
  const w = (tile) => (plantOnItem ? { tile, onItem: true } : { tile, onGroup: true });
  return {
    group: `<div class="flex flex-col gap-6 p-4" data-l3>
        <div data-l3-case="ref-pill">${group("ref-pill")}</div>
        <div data-l3-case="bare-pill">${group("bare-pill", w(false))}</div>
        <div data-l3-case="ref-tile">${group("ref-tile", { tile: true })}</div>
        <div data-l3-case="bare-tile">${group("bare-tile", w(true))}</div>
        <div data-l3-case="item-write">${group("item-write", { onItem: true })}</div>
        <div data-l3-case="ancestor" ${BARE}>${group("ancestor")}</div>
      </div>`,
  };
}
