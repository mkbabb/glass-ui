import type { ComputedRef, InjectionKey } from "vue";

export interface TagsInputContext {
    invalid: ComputedRef<boolean>;
}

export const tagsInputContextKey: InjectionKey<TagsInputContext> =
    Symbol("glass-ui-tags-input");
