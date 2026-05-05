import { watch } from "vue";
import { useGlobalDark } from "../useGlobalDark";

/**
 * Minimal structural type for the Monaco runtime. We avoid a hard `monaco`
 * dependency — consumers pass the runtime instance they already imported.
 * Only the two methods we touch are typed.
 */
export interface MonacoLike {
    editor: {
        setTheme(name: string): void;
        defineTheme(name: string, theme: unknown): void;
    };
}

export interface UseMonacoThemeOptions {
    /** Theme name applied in light mode. Default `"vs"`. */
    light?: string;
    /** Theme name applied in dark mode. Default `"vs-dark"`. */
    dark?: string;
    /**
     * Optional pair of canon-tinted Monaco theme definitions. When supplied,
     * the composable calls `monaco.editor.defineTheme("glass-ui-light", ...)`
     * and `defineTheme("glass-ui-dark", ...)` and uses those names instead
     * of the `light`/`dark` fallbacks.
     *
     * Type is `unknown` to keep the composable free of a hard dep on
     * `monaco-editor`'s `IStandaloneThemeData`. Consumers cast at the call
     * site.
     */
    custom?: { light: unknown; dark: unknown };
}

const CUSTOM_LIGHT_NAME = "glass-ui-light";
const CUSTOM_DARK_NAME = "glass-ui-dark";

/**
 * `useMonacoTheme` — bind Monaco's active editor theme to glass-ui's
 * `useGlobalDark()`. Pass the runtime monaco instance plus optional theme
 * overrides. Watches `isDark` and calls `monaco.editor.setTheme()` with the
 * matching name. If `options.custom` is provided, defines the canon-tinted
 * pair on first run.
 */
export function useMonacoTheme(
    monaco: MonacoLike,
    options?: UseMonacoThemeOptions,
): void {
    const lightName = options?.custom ? CUSTOM_LIGHT_NAME : (options?.light ?? "vs");
    const darkName = options?.custom ? CUSTOM_DARK_NAME : (options?.dark ?? "vs-dark");

    if (options?.custom) {
        monaco.editor.defineTheme(CUSTOM_LIGHT_NAME, options.custom.light);
        monaco.editor.defineTheme(CUSTOM_DARK_NAME, options.custom.dark);
    }

    const { isDark } = useGlobalDark();
    watch(
        isDark,
        (dark) => {
            monaco.editor.setTheme(dark ? darkName : lightName);
        },
        { immediate: true },
    );
}
