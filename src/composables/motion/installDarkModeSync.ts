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
 * O.W4 Lane B — Fix 3 (Rγ L3): renamed from `useDarkModeSync` →
 * `installDarkModeSync`. The previous `use*` naming implied a controlled
 * facade (reactive return + cleanup token); the function is a one-shot
 * side-effect installer that returns `void`. The new name signals shape
 * accurately. SEMVER-VISIBLE rename per L invariant 4 (no backwards-compat
 * aliases); consumers update via one-line rename per call site (see
 * MIGRATION.md). Cross-repo audit at O.W4 Lane B identified speedtest as
 * the only external consumer.
 */
import { nextTick, watch } from "vue";
import { useGlobalDark } from "../dark";

export function installDarkModeSync(onSync: () => void): void {
    const { isDark } = useGlobalDark();
    watch(isDark, () => {
        nextTick(() => {
            requestAnimationFrame(onSync);
        });
    });
}
