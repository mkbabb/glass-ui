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
 *
 * AP.W3 R0G-7 — relocated from `composables/motion/` to `composables/dark/`.
 * It is keyframes-free but VUEUSE-bearing (it reads `useGlobalDark`, which
 * imports `@vueuse/core`), so it cannot ride the keyframes-free + vueuse-free
 * `/motion-core` carve. It is topically a dark-mode-sync helper, so it homes on
 * `@mkbabb/glass-ui/dark` beside `useGlobalDark` (W1.2 §A.1 disposition).
 * SEMVER-VISIBLE relocation per inv 47 (no backwards-compat alias on `/motion`);
 * consumers update via one-line rename per call site (see MIGRATION.md).
 *
 * O.W4 Lane B — Fix 3 (Rγ L3): renamed from `useDarkModeSync` →
 * `installDarkModeSync`. The previous `use*` naming implied a controlled
 * facade (reactive return + cleanup token); the function is a one-shot
 * side-effect installer that returns `void`. The new name signals shape
 * accurately.
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
