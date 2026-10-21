// D4 pass 8 · L-3 (O-94/O-94a R-2, placed in D4 by O-103, confirmed by O-103c): the compositions the `l3-bare` probe reads.
// Not a migration: one non-site key, `l3`, which build.mjs renders as `l3-migrated` as written (no host, no twin). Six
// groups of three options (`a`, `b`, `c`), all on the scene's one model, so one write selects `b` in every group:
//   ref-pill   a pill group, nothing written: the library's tint and stadium (the reference)
//   bare-pill  a pill group whose group element is written `--selection-paint: bare`
//   ref-tile   a `shape="cell"` group, nothing written
//   bare-tile  a `shape="cell"` group written `bare` on the group
//   item-write a pill group whose OPTIONS are each written `bare` (inline, as a consumer would): refused by the pin
//   ancestor   a pill group inside a `div` written `bare`: no effect, the group resets the fact
// `onItem` (the planted composition, routes/L3-plant-on-item): bare-pill's and bare-tile's write moves from the group
// to each option, so the opt-out never lands and the probe's bare cells FAIL.
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
    l3: {
      group: `<div class="flex flex-col gap-6 p-4" data-l3>
        <div data-l3-case="ref-pill">${group("ref-pill")}</div>
        <div data-l3-case="bare-pill">${group("bare-pill", w(false))}</div>
        <div data-l3-case="ref-tile">${group("ref-tile", { tile: true })}</div>
        <div data-l3-case="bare-tile">${group("bare-tile", w(true))}</div>
        <div data-l3-case="item-write">${group("item-write", { onItem: true })}</div>
        <div data-l3-case="ancestor" ${BARE}>${group("ancestor")}</div>
      </div>`,
    },
  };
}
