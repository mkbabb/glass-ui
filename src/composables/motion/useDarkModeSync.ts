/**
 * useDarkModeSync — encapsulate the two-step dance required to react to
 * dark-mode toggles in code that reads computed CSS variables (canvas
 * renderers, dynamic theme reads, etc.).
 *
 * The contract:
 *   1. nextTick() — wait for Vue to apply / remove the `.dark` class.
 *   2. requestAnimationFrame() — wait for the browser to repaint with
 *      the new computed CSS variable values.
 *
 * Then invoke the consumer's callback. Used by speedtest's SpeedtestMeter
 * to dispose+initialize the canvas renderer when the meter color tokens
 * change. Generic enough to apply to any consumer that derives its state
 * from CSS variables.
 */

import { watch, nextTick } from "vue";
import { useGlobalDark } from "../useGlobalDark";

export function useDarkModeSync(onSync: () => void): void {
    const { isDark } = useGlobalDark();
    watch(isDark, () => {
        nextTick(() => {
            requestAnimationFrame(onSync);
        });
    });
}
