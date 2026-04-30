import { createGlobalState, useEventListener } from "@vueuse/core";
import { onScopeDispose } from "vue";

interface ShortcutRegistrationOptions {
    /** Fire even when focus is in input/textarea/contenteditable. Default: false */
    allowInInput?: boolean;
    /** Call preventDefault on the event. Default: false */
    preventDefault?: boolean;
    /** Human-readable label for the shortcuts modal */
    label?: string;
    /** Group name for display (e.g. "Playback", "Navigation") */
    group?: string;
}

interface ShortcutEntry {
    combo: ParsedCombo;
    raw: string;
    handler: (e: KeyboardEvent) => void;
    options: ShortcutRegistrationOptions;
}

interface ParsedCombo {
    key: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
    alt: boolean;
    mod: boolean; // Mod = Meta on mac, Ctrl elsewhere
}

export const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform);

function parseCombo(combo: string): ParsedCombo {
    const parts = combo.split("+").map((p) => p.trim());
    const parsed: ParsedCombo = {
        key: "",
        ctrl: false,
        meta: false,
        shift: false,
        alt: false,
        mod: false,
    };

    for (const part of parts) {
        const lower = part.toLowerCase();
        if (lower === "mod") parsed.mod = true;
        else if (lower === "ctrl" || lower === "control") parsed.ctrl = true;
        else if (lower === "meta" || lower === "cmd" || lower === "command")
            parsed.meta = true;
        else if (lower === "shift") parsed.shift = true;
        else if (lower === "alt" || lower === "option") parsed.alt = true;
        else parsed.key = part; // Preserve original case for e.key matching
    }

    return parsed;
}

/** Normalize key aliases so registrations like "Space" or "Delete" work cross-platform. */
const KEY_ALIASES: Record<string, string[]> = {
    space: [" "],
    delete: ["backspace", "delete"],
    enter: ["enter", "return"],
    escape: ["escape", "esc"],
};

function matchesCombo(e: KeyboardEvent, combo: ParsedCombo): boolean {
    // Check modifiers
    const wantCtrl = combo.ctrl || (combo.mod && !isMac);
    const wantMeta = combo.meta || (combo.mod && isMac);

    if (e.ctrlKey !== wantCtrl) return false;
    if (e.metaKey !== wantMeta) return false;
    if (e.altKey !== combo.alt) return false;

    // For printable chars that inherently require shift (e.g. "?", "!", "+"),
    // don't enforce shift match unless shift was explicitly in the combo.
    const isPrintableShifted = e.key.length === 1 && e.shiftKey && !combo.shift;
    if (!isPrintableShifted && e.shiftKey !== combo.shift) return false;

    const comboKeyLower = combo.key.toLowerCase();
    const eventKeyLower = e.key.toLowerCase();

    // Direct match
    if (eventKeyLower === comboKeyLower) return true;

    // Alias match (e.g. combo "Space" matches e.key " ")
    const aliases = KEY_ALIASES[comboKeyLower];
    if (aliases && aliases.some((a) => a.toLowerCase() === eventKeyLower)) return true;

    // Also match against e.code (e.g. "Space", "Delete", "Backspace")
    if (e.code.toLowerCase() === comboKeyLower) return true;

    return false;
}

function isEditableTarget(el: Element | null): boolean {
    if (!el) return false;
    const tag = (el as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if ((el as HTMLElement).isContentEditable) return true;
    if (el.closest(".monaco-editor")) return true;
    return false;
}

const useShortcutRegistry = createGlobalState(() => {
    const shortcuts = new Set<ShortcutEntry>();

    useEventListener(window, "keydown", (e: KeyboardEvent) => {
        for (const shortcut of shortcuts) {
            if (!matchesCombo(e, shortcut.combo)) continue;

            if (
                !shortcut.options.allowInInput &&
                isEditableTarget(e.target as Element)
            ) {
                continue;
            }

            if (shortcut.options.preventDefault) {
                e.preventDefault();
            }

            shortcut.handler(e);
            return; // First match wins
        }
    });

    return { shortcuts };
});

/**
 * Register a keyboard shortcut. Returns cleanup function.
 * Auto-disposed when the current effect scope is disposed.
 */
export function registerShortcut(
    combo: string,
    handler: (e: KeyboardEvent) => void,
    options: ShortcutRegistrationOptions = {},
): () => void {
    const { shortcuts } = useShortcutRegistry();

    const entry: ShortcutEntry = {
        combo: parseCombo(combo),
        raw: combo,
        handler,
        options,
    };

    shortcuts.add(entry);

    const cleanup = () => {
        shortcuts.delete(entry);
    };

    onScopeDispose(cleanup);

    return cleanup;
}
