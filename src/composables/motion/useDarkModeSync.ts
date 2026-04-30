/**
 * Encapsulate the two-step timing required for code that reads computed CSS
 * variables after a dark-mode toggle.
 *
 * The contract:
 * 1. nextTick() waits for Vue to apply or remove the `.dark` class.
 * 2. requestAnimationFrame() waits for the browser to repaint with updated
 *    computed CSS variable values.
 *
 * Then the consumer callback can safely re-read theme tokens. Speedtest uses
 * this for canvas meter renderer reinitialization.
 */
import { nextTick, watch } from "vue";
import { useGlobalDark } from "../useGlobalDark";

export function useDarkModeSync(onSync: () => void): void {
    const { isDark } = useGlobalDark();
    watch(isDark, () => {
        nextTick(() => {
            requestAnimationFrame(onSync);
        });
    });
}
