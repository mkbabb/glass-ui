# BI.W-P115 — Table foundation

**Status:** DONE
**Disposition:** retained public semantic table anatomy

Table owns native caption, header, body, row, head, cell, and empty-state anatomy plus
one responsive overflow container. The container owns layout only. `Table.vue` disables
automatic attribute inheritance and deliberately forwards consumer class, style, native
attributes, and table semantics to the `<table>` element.

Base `TableRow` is visually neutral: it provides the structural row border without
implying hover, activation, or selection. Interactive data behavior remains outside the
foundation. `DataTable` explicitly opts selectable rows into cursor/focus, hover, and
`data-state="selected"` paint while leaving ordinary rows static.

Current product evidence:

- `src/components/table/Table.vue` routes fallthrough/native table state to `<table>`;
  the overflow wrapper carries only `data-slot="table-container"` and layout classes.
- `src/components/table/TableRow.vue` has no unconditional hover or selected styling.
- `src/components/data-table/DataTable.vue` owns its selectable-row interaction and
  paint opt-in without changing its public API.
- `tests/components/table.contract.test.ts` verifies native attribute routing and the
  neutral base-row contract.
- `tests/components/ui/data-table/DataTable.test.ts` preserves the existing sorting,
  selection, keyboard, responsive-card, stable-identity, and row-attribute regressions.

The public Table anatomy and exports are unchanged. BI.W-P116 remains the owner of
DataTable behavior; this wave adds no sorting, selection, pagination, or virtualization
to the Table foundation.
