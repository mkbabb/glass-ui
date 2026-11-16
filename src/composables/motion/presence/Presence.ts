// <Presence> (W-B.17 R-7): Vue's <Transition> under one of two names. It renders no
// element and stamps nothing on its child. One boolean prop and no other.
import { Transition, h, type FunctionalComponent } from "vue";
import { readReducedMotion } from "../core/useReducedMotion";
import { swapHooks } from "./follow";

export interface PresenceProps {
    /** The node is replaced in its seat: out, then in. */
    swap?: boolean;
}

export const Presence: FunctionalComponent<PresenceProps> = (props, { slots }) =>
    h(
        Transition,
        {
            name: props.swap ? "presence-swap" : "presence",
            mode: props.swap ? "out-in" : undefined,
            ...(props.swap && !readReducedMotion() ? { onBeforeLeave: swapHooks.onBeforeLeave, onEnter: swapHooks.onEnter } : {}),
        },
        slots,
    );

Presence.props = { swap: Boolean };
Presence.displayName = "Presence";
