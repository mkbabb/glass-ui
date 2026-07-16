import type { Ref } from "vue";
import { createOptionalContext } from "../../composables/context";

export interface DialogStageContext {
    wrapperEl: Ref<HTMLElement | null>;
    scrimEl: Ref<HTMLElement | null>;
}

const ctx = createOptionalContext<DialogStageContext>("DialogStage");

export function provideDialogStageContext(context: DialogStageContext): void {
    ctx.provide(context);
}

export const useOptionalDialogStageContext = ctx.use;
