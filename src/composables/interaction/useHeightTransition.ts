const DEFAULT_EXPAND_DURATION = 300;
const DEFAULT_COLLAPSE_DURATION = 200;
const EXPAND_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const COLLAPSE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

export function useHeightTransition(options?: {
    expandDuration?: number;
    collapseDuration?: number;
    onBeforeCollapse?: () => void;
    onAfterExpand?: () => void;
}) {
    const expandDuration = options?.expandDuration ?? DEFAULT_EXPAND_DURATION;
    const collapseDuration = options?.collapseDuration ?? DEFAULT_COLLAPSE_DURATION;

    function onBeforeEnter(el: Element) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = "0";
        htmlEl.style.opacity = "0";
    }

    function onEnter(el: Element, done: () => void) {
        const htmlEl = el as HTMLElement;
        const targetHeight = htmlEl.scrollHeight;
        htmlEl.style.transition = `height ${expandDuration}ms ${EXPAND_EASING}, opacity ${expandDuration}ms ease`;
        // Force reflow
        void htmlEl.offsetHeight;
        htmlEl.style.height = `${targetHeight}px`;
        htmlEl.style.opacity = "1";
        htmlEl.addEventListener("transitionend", function handler(e) {
            if (e.propertyName !== "height") return;
            htmlEl.removeEventListener("transitionend", handler);
            done();
        });
    }

    function onAfterEnter(el: Element) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = "";
        htmlEl.style.transition = "";
        htmlEl.style.opacity = "";
        options?.onAfterExpand?.();
        htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function onBeforeLeave(el: Element) {
        const htmlEl = el as HTMLElement;
        options?.onBeforeCollapse?.();
        htmlEl.style.height = `${htmlEl.scrollHeight}px`;
        // Force reflow
        void htmlEl.offsetHeight;
    }

    function onLeave(el: Element, done: () => void) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transition = `height ${collapseDuration}ms ${COLLAPSE_EASING}, opacity ${collapseDuration}ms ease`;
        // Force reflow
        void htmlEl.offsetHeight;
        htmlEl.style.height = "0";
        htmlEl.style.opacity = "0";
        htmlEl.addEventListener("transitionend", function handler(e) {
            if (e.propertyName !== "height") return;
            htmlEl.removeEventListener("transitionend", handler);
            done();
        });
    }

    function onAfterLeave(el: Element) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = "";
        htmlEl.style.transition = "";
        htmlEl.style.opacity = "";
    }

    return {
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onBeforeLeave,
        onLeave,
        onAfterLeave,
    };
}
