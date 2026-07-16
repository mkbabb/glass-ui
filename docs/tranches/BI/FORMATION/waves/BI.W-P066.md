# BI.W-P066 — Label apotheosis

Status: **done**.

`Label` is one Reka-backed native label with typed `requirement="required|optional"` and
`disabled` paint states. Association remains native through `for` or nesting. Requirement
annotations are decorative because the associated control owns `required` semantics.
The component has colocated CSS and exports no CVA or appearance recipe.

Owner coverage: `tests/components/label.contract.test.ts`.
