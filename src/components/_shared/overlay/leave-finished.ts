import { onBeforeUnmount, onMounted, useId, watch } from "vue";

/** The surfaces that announce the end of their leave, as `detail.kind` names them. */
export type LeaveKind =
    | "dialog"
    | "sheet"
    | "popover"
    | "menu"
    | "select"
    | "tooltip"
    | "toast"
    | "hover-card";

/** The name of the event, the same on every surface: the Vue emit and the DOM event. */
const LEAVE_FINISHED = "leave-finished";

export type LeaveFinishedDetail = { kind: LeaveKind };

/** reka-ui's `Presence` dispatches this, without bubbling, on the node it is about to
 *  unmount once its exit has ended (and on an unmount with no exit). */
const PRESENCE_AFTER_LEAVE = "after-leave";

/**
 * Announces that a surface's leave has finished: once per close, after the exit's last
 * frame, as a Vue emit (`leave-finished`) and as a DOM `CustomEvent` of the same name
 * from the content element, bubbling and composed (so a listener on a shadow host
 * hears it), with the surface's kind in `detail`. A close reversed by a reopen
 * announces nothing; an exit cut short by an unmount announces at the unmount.
 *
 * The content element carries `attrs` (a key this reads it back by). The end of the
 * leave is the moment reka's `Presence` lets the content go, which every surface here
 * mounts through: its exit animation (or the hold that keeps it through its exit
 * transitions, or the spring's mount hold) has ended, and the node is still in the
 * document, so the event bubbles to the page.
 */
export function useLeaveFinished(o: {
    kind: LeaveKind | (() => LeaveKind);
    open: () => boolean;
    emit: () => void;
}): { attrs: { "data-leave-key": string } } {
    const key = useId();
    const element = () =>
        typeof document === "undefined"
            ? null
            : document.querySelector(`[data-leave-key="${key}"]`);
    let leaving: Element | null = null;

    const finish = () => {
        const el = leaving;
        if (!el) return;
        leaving = null;
        o.emit();
        el.dispatchEvent(
            new CustomEvent<LeaveFinishedDetail>(LEAVE_FINISHED, {
                bubbles: true,
                composed: true,
                detail: { kind: typeof o.kind === "function" ? o.kind() : o.kind },
            }),
        );
    };

    watch(
        o.open,
        (open, was) => {
            if (open) leaving = null;
            else if (was) leaving = element();
        },
        { flush: "sync" },
    );

    const onPresenceLeft = (event: Event) => {
        const target = event.target;
        if (!leaving || !(target instanceof Node)) return;
        // The Presence node is the content element itself, or the popper wrapper round it.
        if (target === leaving || target.contains(leaving)) finish();
    };
    onMounted(() =>
        document.addEventListener(PRESENCE_AFTER_LEAVE, onPresenceLeft, true),
    );
    onBeforeUnmount(() => {
        document.removeEventListener(PRESENCE_AFTER_LEAVE, onPresenceLeft, true);
        finish();
    });

    return { attrs: { "data-leave-key": key } };
}
