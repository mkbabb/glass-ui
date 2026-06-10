// A minimal long-press gesture (E1 wordmark redraw + E5 dark-toggle eclipse).
// Fires `onLongPress` after the pointer is held past `delay` ms without leaving
// or releasing; a normal short tap falls through to the element's own @click.
import { onBeforeUnmount } from "vue";

export interface LongPressHandlers {
    onpointerdown: (e: PointerEvent) => void;
    onpointerup: () => void;
    onpointerleave: () => void;
    onpointercancel: () => void;
}

export function useLongPress(
    onLongPress: () => void,
    delay = 480,
): { handlers: LongPressHandlers; fired: () => boolean } {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let didFire = false;

    function clear() {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function onpointerdown() {
        didFire = false;
        clear();
        timer = setTimeout(() => {
            didFire = true;
            timer = null;
            onLongPress();
        }, delay);
    }

    function end() {
        clear();
    }

    onBeforeUnmount(clear);

    return {
        handlers: {
            onpointerdown,
            onpointerup: end,
            onpointerleave: end,
            onpointercancel: end,
        },
        fired: () => didFire,
    };
}
