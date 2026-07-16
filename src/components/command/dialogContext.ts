import { inject, provide, type InjectionKey } from "vue";

type CommandDialogContext = {
    dismiss: () => void;
};

const COMMAND_DIALOG_CONTEXT: InjectionKey<CommandDialogContext> = Symbol(
    "glass-command-dialog",
);

export function provideCommandDialogContext(dismiss: () => void): void {
    provide(COMMAND_DIALOG_CONTEXT, { dismiss });
}

export function useOptionalCommandDialogContext(): CommandDialogContext | null {
    return inject(COMMAND_DIALOG_CONTEXT, null);
}
