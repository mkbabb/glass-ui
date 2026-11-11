import { inject, provide, ref, type InjectionKey, type Ref } from "vue";

/* How the listbox was opened: by a pointer or from the keyboard.
 *
 * reka focuses the checked row on every open, by script. A pointer open prevents the
 * trigger's own mouse focus, so the engines have no pointer focus to go by and treat
 * that scripted focus as keyboard focus: the row matched `:focus-visible` and drew the
 * keyboard ring beside its highlight. The trigger records the input that opened the
 * list, and the content stamps it, so a pointer-opened list shows the highlight alone
 * and the ring returns with the first key pressed inside it. */
export type SelectOpenInput = "pointer" | "keyboard";

export interface SelectOpenInputContext {
    readonly input: Readonly<Ref<SelectOpenInput>>;
    mark: (input: SelectOpenInput) => void;
}

const KEY: InjectionKey<SelectOpenInputContext> = Symbol("select-open-input");

export function provideSelectOpenInput(): SelectOpenInputContext {
    const input = ref<SelectOpenInput>("keyboard");
    const context: SelectOpenInputContext = {
        input,
        mark: (next) => {
            input.value = next;
        },
    };
    provide(KEY, context);
    return context;
}

export function injectSelectOpenInput(): SelectOpenInputContext | null {
    return inject(KEY, null);
}
