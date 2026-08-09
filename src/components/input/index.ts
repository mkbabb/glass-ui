export { default as Input } from "./Input.vue";
export type { InputNativeAttrs, InputProps } from "./types";
// [2026-08-09 · BK #66 CLOSE · RT-65-C(iii)] `ControlSize` re-homes HERE from the
// retired `./forms` barrel. It is the shared `sm | md | lg` union the control
// register threads as `size?` (Input · Textarea · NumberFieldInput · SearchBar);
// Input is the canonical member, so `./input` is the one published door. The
// definition stays where it always was — `_shared/control.ts` — this is the export,
// not a second declaration.
export type { ControlSize } from "../_shared/control";
