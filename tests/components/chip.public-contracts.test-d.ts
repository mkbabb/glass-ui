import type { ChipProps } from "@glass/components/chip";

const staticChip = {} satisfies ChipProps;
const selectableChip = {
    mode: "selectable",
    defaultValue: true,
    disabled: true,
} satisfies ChipProps;
const actionChip = { mode: "action", disabled: true } satisfies ChipProps;
const removableChip = {
    mode: "removable",
    disabled: true,
    removeLabel: "Remove filter",
} satisfies ChipProps;

// @ts-expect-error static chips do not own selection state
const statefulStaticChip = { modelValue: true } satisfies ChipProps;
// @ts-expect-error action chips are not form selection controls
const namedActionChip = { mode: "action", name: "action" } satisfies ChipProps;
// @ts-expect-error selectable chips own boolean selection, not form submission
const namedSelectableChip = { mode: "selectable", name: "filter" } satisfies ChipProps;
// @ts-expect-error removable chips require a named remove action
const unnamedRemovableChip = { mode: "removable" } satisfies ChipProps;
// @ts-expect-error selection chips do not expose the remove-action contract
const removableSelectionChip = { mode: "selectable", removeLabel: "Remove filter" } satisfies ChipProps;

export type ChipContractFixtures = [
    typeof staticChip,
    typeof selectableChip,
    typeof actionChip,
    typeof removableChip,
    typeof statefulStaticChip,
    typeof namedActionChip,
    typeof namedSelectableChip,
    typeof unnamedRemovableChip,
    typeof removableSelectionChip,
];
