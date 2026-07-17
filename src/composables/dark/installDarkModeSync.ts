/**
 * Encapsulate the two-step timing required for code that reads computed CSS
 * variables after a dark-mode toggle.
 *
 * The contract:
 * 1. nextTick() waits for Vue to apply or remove the `.dark` class.
 * 2. requestAnimationFrame() waits for the browser to repaint with updated
 *    computed CSS variable values.
 *
 * Then the consumer callback can safely re-read theme tokens. A consumer uses
 * this for canvas meter renderer reinitialization.
 *
 * It is keyframes-free but VUEUSE-bearing (it reads `useGlobalDark`, which
 * imports `@vueuse/core`), so it cannot ride the keyframes-free + vueuse-free
 * `/motion-core` carve. It is topically a dark-mode-sync helper, so it homes on
 * `@mkbabb/glass-ui/dark` beside `useGlobalDark`.
 *
 * The `install*` name signals shape: a one-shot side-effect installer that
 * returns `void`, NOT a `use*` controlled facade (reactive return + cleanup
 * token).
 */
import { nextTick, watch } from "vue";
import { useGlobalDark } from "./useGlobalDark";

export function installDarkModeSync(onSync: () => void): void {
    const { isDark } = useGlobalDark();
    watch(isDark, () => {
        nextTick(() => {
            requestAnimationFrame(onSync);
        });
    });
}
