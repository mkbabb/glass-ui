import type { SelectionValue } from "./selection";

/** Pointer interaction dispatched outside dismissable floating content. */
export type PointerDownOutsideEvent = CustomEvent<{
    originalEvent: PointerEvent;
}>;

/** Focus interaction dispatched outside dismissable floating content. */
export type FocusOutsideEvent = CustomEvent<{
    originalEvent: FocusEvent;
}>;

/** Preventable lifecycle events shared by modal content surfaces. */
export interface DismissableContentEmits {
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
    focusOutside: [event: FocusOutsideEvent];
    interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent];
    openAutoFocus: [event: Event];
    closeAutoFocus: [event: Event];
}

/** Preventable selection event dispatched by a Glass listbox item. */
export type ListboxItemSelectEvent<T = SelectionValue> = CustomEvent<{
    originalEvent: PointerEvent;
    value?: T;
}>;
