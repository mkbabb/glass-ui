# BI.W-MULTISELECT-FOLD — MultiSelect folds onto Combobox[multiple]

## Mandate
D-FACTOR census (design/factor/PASS-1.md §B): MultiSelect is a Popover+Command composition over the
same Combobox-family mechanism → `Combobox multiple`. The orphan pickup from the formation drafting
(B2+B8 report). The mechanism-distinctness law: no distinct mechanism, fold-with-migration.

## Design
`<Combobox multiple>` absorbs the multi-select behavior (chips-in-trigger rendering via the existing
TagsInput chip register; selection model = array v-model). `multi-select/` deletes (component + subpath
+ story fold into the combobox story's multiple section). Consumers: demo-only at HEAD (verify with
the registry probe at execution; any sibling consumer found → an ask row).

Band: B8 (factor folds).

## Work
Delete `src/components/custom/multi-select/` (component + barrel) · drop the `./multi-select` subpath from package.json exports + src/subpaths/ + typesVersions · api surface diff row · wire `multiple` on Combobox (array v-model + chips-in-trigger via the TagsInput chip register) · fold the story into the combobox story's multiple section · MIGRATION row.

## Acceptance — `proof:fold-delete`, MultiSelect clause (authored by BI.W-AXES-GATES; born-RED)
Definition-absent for MultiSelect + the `multiple` axis proven on Combobox (a11y: axe on the multiple
arm — selected-option announcements) + the story-fold. Born-RED (MultiSelect exists at HEAD).

## π/DELTA
The combobox story's multiple section captured both modes (the chips-in-trigger read).
