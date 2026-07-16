# BI.W-P096 — Combobox

**Status:** DONE
**Disposition:** retained public editable listbox with bounded list ownership

Combobox retains its Reka-backed editable selection, filtering, active-descendant and
keyboard behavior, controlled value policy, named grouping, empty state, portal
positioning, and existing public compound parts.

The product contract is now exact:

- `ComboboxList` is the popup and large-result vertical scroll owner. Its height is
  bounded by the smaller of 24rem and Reka's measured available content height.
- `ComboboxGroup.heading` is Glass-owned label sugar. It renders through
  `ComboboxLabel` and is omitted from the props forwarded to Reka `ComboboxGroup`.
- No speculative viewport or secondary scroll owner is introduced.

Evidence:

- `src/components/combobox/ComboboxList.vue` carries the collision-aware maximum height
  and `overflow-y-auto` contract.
- `src/components/combobox/ComboboxGroup.vue` omits both `class` and `heading` before
  forwarding Reka group props.
- `tests/components/combobox.contract.test.ts` verifies the bound/scroll classes and that
  `heading` renders locally without reaching the Reka group node.

Existing public anatomy, Reka semantics, and material styling remain unchanged.
