import { h } from "vue";
import {
    ToastAction,
    toast,
    useToast,
    type ToastHandle,
    type ToastOptions,
} from "@glass/components/toast";

type Assert<Condition extends true> = Condition;
type Equal<Left, Right> =
    (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right
        ? 1
        : 2
        ? true
        : false;
type Has<Key extends PropertyKey, Shape> = Key extends keyof Shape ? true : false;
type Lacks<Key extends PropertyKey, Shape> =
    Has<Key, Shape> extends false ? true : false;

const handle = toast({
    title: "Message archived",
    action: h(ToastAction, { altText: "Undo archive" }, () => "Undo"),
});

handle.update({ title: "Message archived successfully" });
handle.update({ action: undefined });

// @ts-expect-error the handle owns and preserves its generated id
handle.update({ id: "replacement" });
// @ts-expect-error controlled root state is internal to the imperative renderer
toast({ open: true });
// @ts-expect-error the reka close-listener key is not an imperative option
toast({ "onUpdate:open": () => undefined });

type ToastContracts = [
    Assert<Equal<typeof handle, ToastHandle>>,
    Assert<Equal<Parameters<ToastHandle["update"]>[0], ToastOptions>>,
    Assert<Lacks<"id", ToastOptions>>,
    Assert<Lacks<"open", ToastOptions>>,
    Assert<Lacks<"onUpdate:open", ToastOptions>>,
    Assert<Has<"action", ToastOptions>>,
    Assert<Has<"duration", ToastOptions>>,
    Assert<Lacks<"toasts", ReturnType<typeof useToast>>>,
];

export type ToastPublicContracts = ToastContracts;
