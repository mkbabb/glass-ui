// authored/b9-homes.mjs — AUTHORED input to derive/edits.mjs (step S17, LAW §5 B9 and §2).
//
// B9: a door re-exports only its module's subtree. Two published names still came from the
// kernel after S8: `./command` re-exported nine Combobox* types from
// `_shared/selection.ts`, and `./input` re-exported `ControlSize` from `_shared/control.ts`.
// Each has one lawful fixed point that keeps the surface whole.
//   - Combobox*: only `command/` reads them (the nine names' readers are all under
//     `src/components/command/`). F-7 missed it because `selection.ts` is one file with
//     several concerns; split by concern, the Combobox block's home is command. It moves
//     to `command/types.ts` beside the command props that already use ComboboxValue (a
//     new file would put command over R-5's 12), which the ./command entry publishes
//     from inside its own dir (P3-R1(a): anchored). `SelectionValue`, `CheckedState`, `SelectionMode` and
//     `isSelectionValue` stay in `_shared/selection.ts` (8 units read them).
//   - ControlSize: four units read it (input, number-field, textarea, toggle-group), and
//     `./input` is its one published door (MIGRATION.md 8.0.0 row: "Input is the canonical
//     member"). The declaration moves into `input/types.ts`, which the entry publishes from
//     inside its dir (anchored), and the other three read it through input's door (B1).
//     `ControlProps` and `controlStateAttrs` stay in `_shared/control.ts`.
// The `_shared/index.ts` container door carried only `ControlSize` for one demo story; it
// leaves with its `record.doors` line (a container has no door, LAW §1), and the story reads
// the name from the ./input entry (R-10). No published name changes entry, so no MIGRATION row.

export const why = "B9: the Combobox types move to command and ControlSize to input, the entries that publish them; no door re-exports outside its module";

const COMBOBOX_BLOCK = `/** Stable scalar selection, with \`null\` representing no single selection. */
export type ComboboxValue = SelectionValue | null;

export interface ComboboxInputProps {
    modelValue?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    placeholder?: InputHTMLAttributes["placeholder"];
    class?: HTMLAttributes["class"];
}

export interface ComboboxInputEmits {
    "update:modelValue": [value: string];
}

export interface ComboboxItemProps {
    value: SelectionValue;
    disabled?: boolean;
    textValue?: string;
    class?: HTMLAttributes["class"];
}

export interface ComboboxItemEmits {
    select: [event: ListboxItemSelectEvent<SelectionValue>];
}

export interface ComboboxGroupProps {
    heading?: string;
    class?: HTMLAttributes["class"];
}

export interface ComboboxEmptyProps {
    class?: HTMLAttributes["class"];
}

export interface ComboboxListEmits {
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
    focusOutside: [event: FocusOutsideEvent];
    interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent];
}

export interface ComboboxSeparatorProps {
    class?: HTMLAttributes["class"];
}
`;

const SELECTION_HEAD = `import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type {
    FocusOutsideEvent,
    ListboxItemSelectEvent,
    PointerDownOutsideEvent,
} from "./interaction";

`;

const SELECTION_SPLIT = `
// ---------------------------------------------------------------------------
// The shared selection-list contract (V9 factoring). The reka Combobox substrate
// is the one collection-backed selection-list primitive; the \`Command\` family
// wraps it (CommandInput → RekaComboboxInput, CommandItem → RekaComboboxItem).
// These part contracts are the shared vocabulary that wrapper owns; they live
// here in \`_shared\` (not pasted into \`command/\`) so the fold is a factoring.
// ---------------------------------------------------------------------------

${COMBOBOX_BLOCK}`;

const cmd = (f, names) => ({
    file: `src/components/command/${f}`,
    why: "B9: the Combobox types are command's own",
    from: `import type {\n${names.map((n) => `    ${n},\n`).join("")}} from "../_shared/selection";`,
    to: `import type {\n${names.map((n) => `    ${n},\n`).join("")}} from "./types";`,
});

export const edits = [
    { file: "src/components/_shared/selection.ts", why: "B9: the Combobox block leaves the kernel", from: SELECTION_HEAD, to: "" },
    { file: "src/components/_shared/selection.ts", why: "B9: the Combobox block leaves the kernel", from: SELECTION_SPLIT, to: "" },
    {
        file: "src/components/command/types.ts",
        why: "B9: the Combobox block's home is command, the one unit that reads it",
        from: `import type { HTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type { DialogProps } from "../dialog";
import type { ComboboxValue } from "../_shared/selection";
`,
        to: `import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type {
    FocusOutsideEvent,
    ListboxItemSelectEvent,
    PointerDownOutsideEvent,
} from "../_shared/interaction";
import type { SelectionValue } from "../_shared/selection";
import type { DialogProps } from "../dialog";

// The Combobox part contracts. The reka Combobox substrate is the one collection-backed
// selection-list primitive, and the \`Command\` family is its only wrapper here
// (CommandInput → RekaComboboxInput, CommandItem → RekaComboboxItem), so they live with
// it. The scalar vocabulary they build on (\`SelectionValue\`) is shared by every
// selection control and stays in \`_shared/selection\`.

${COMBOBOX_BLOCK}`,
    },
    cmd("CommandItem.vue", ["ComboboxItemEmits", "ComboboxItemProps"]),
    cmd("CommandInput.vue", ["ComboboxInputEmits", "ComboboxInputProps"]),
    { file: "src/components/command/CommandEmpty.vue", why: "B9", from: `import type { ComboboxEmptyProps } from "../_shared/selection";`, to: `import type { ComboboxEmptyProps } from "./types";` },
    { file: "src/components/command/CommandGroup.vue", why: "B9", from: `import type { ComboboxGroupProps } from "../_shared/selection";`, to: `import type { ComboboxGroupProps } from "./types";` },
    { file: "src/components/command/CommandList.vue", why: "B9", from: `import type { ComboboxListEmits } from "../_shared/selection";`, to: `import type { ComboboxListEmits } from "./types";` },
    { file: "src/components/command/CommandSeparator.vue", why: "B9", from: `import type { ComboboxSeparatorProps } from "../_shared/selection";`, to: `import type { ComboboxSeparatorProps } from "./types";` },
    { file: "src/components/command/Command.vue", why: "B9", from: `import type { ComboboxValue } from "../_shared/selection";`, to: `import type { ComboboxValue } from "./types";` },
    {
        file: "src/components/command/index.ts",
        why: "B9: the door publishes the Combobox types from inside its module",
        from: `/* The Combobox-family prop/emit types this subpath's own components DECLARE. They
   lived in \`_shared/\`, unreachable from any published entry, so five of the nine
   members had a public component and a private prop type — a consumer could mount
   \`<CommandItem>\` and not name what it takes. */`,
        to: `/* The Combobox-family prop/emit types this subpath's own components declare, published
   so a consumer who mounts \`<CommandItem>\` can name what it takes. */`,
    },
    { file: "src/components/command/index.ts", why: "B9", from: `    ComboboxValue,\n} from "../_shared/selection";`, to: `    ComboboxValue,\n} from "./types";` },
    {
        file: "src/components/_shared/control.ts",
        why: "B9: ControlSize leaves for the entry that publishes it",
        from: `/* The shared CONTROL contract — the size axis the pills ride and the state axis the
 * binary triad rides.`,
        to: `/* The shared CONTROL contract — the state axis the binary triad rides. The size axis
 * (\`ControlSize\`) lives in \`input/\`, whose entry publishes it.`,
    },
    { file: "src/components/_shared/control.ts", why: "B9", from: `export type ControlSize = "sm" | "md" | "lg";\n\n`, to: "" },
    {
        file: "src/components/input/types.ts",
        why: "B9: the size union's home is the entry that publishes it",
        from: `import type { ControlSize } from "../_shared/control";\n`,
        to: `\n/** The \`sm | md | lg\` union the control register threads as \`size?\` (Input, Textarea,
 *  NumberField, ToggleGroup). Input is the canonical member and \`./input\` its one door. */
export type ControlSize = "sm" | "md" | "lg";\n`,
    },
    {
        file: "src/components/input/index.ts",
        why: "B9: the door re-exports ControlSize from inside its module",
        from: `// [2026-08-09 · BK #66 CLOSE · RT-65-C(iii)] \`ControlSize\` re-homes HERE from the
// retired \`./forms\` barrel. It is the shared \`sm | md | lg\` union the control
// register threads as \`size?\` (Input · Textarea · NumberFieldInput ·
// [2026-08-25 · BK #42] ~~SearchBar~~, deleted with its \`./search\` subpath);
// Input is the canonical member, so \`./input\` is the one published door. The
// definition stays where it always was — \`_shared/control.ts\` — this is the export,
// not a second declaration.
export type { ControlSize } from "../_shared/control";`,
        to: `// \`ControlSize\`, the \`sm | md | lg\` union the control register threads as \`size?\`, is
// declared in \`./types\`: Input is the canonical member, so \`./input\` is its one door.
export type { ControlSize } from "./types";`,
    },
    { file: "src/components/number-field/context.ts", why: "B9: read through input's door", from: `import type { ControlSize } from "../_shared/control";`, to: `import type { ControlSize } from "../input";` },
    { file: "src/components/number-field/NumberField.vue", why: "B9: read through input's door", from: `import type { ControlSize } from "../_shared/control";`, to: `import type { ControlSize } from "../input";` },
    { file: "src/components/textarea/types.ts", why: "B9: read through input's door", from: `import type { ControlSize } from "../_shared/control";`, to: `import type { ControlSize } from "../input";` },
    {
        file: "src/components/toggle-group/ToggleGroup.vue",
        why: "B9: read through input's door",
        from: `import {
    type ControlProps,
    type ControlSize,
    controlStateAttrs,
} from "../_shared/control";`,
        to: `import { type ControlProps, controlStateAttrs } from "../_shared/control";
import type { ControlSize } from "../input";`,
    },
    { file: "src/components/_shared/index.ts", why: "LAW §1: a container has no door; its one name is on ./input", remove: true },
    { file: "scripts/structure/records/entry-record.json", why: "the removed container door leaves record.doors", from: `        "src/components/_shared/index.ts",\n`, to: "" },
    { file: "demo/stories/forms/number-field.vue", why: "R-10: the story reads ControlSize from its entry", from: `import type { ControlSize } from "@glass/components/_shared";`, to: `import type { ControlSize } from "@glass/components/input";` },
    { file: "tests/components/command.public-contracts.test-d.ts", why: "the contract reads ComboboxValue from its entry", from: `import type { ComboboxValue } from "@glass/components/_shared/selection";`, to: `import type { ComboboxValue } from "@glass/components/command";` },
];
