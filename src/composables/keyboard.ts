// @mkbabb/glass-ui/composables/keyboard — vueuse-bearing keyboard registry
//
// `useKeyboardShortcuts` builds on `createGlobalState` + `useEventListener`
// from `@vueuse/core`. Subpath isolates the registry from the root barrel
// so consumers that don't reach for it don't drag vueuse into the entry
// chunk via the SCC trap (see `docs/tranches/K/waves/W-S.md`).
//
// L.W0 Lane III — implementation lifted INTO the subpath barrel to collapse
// the re-export indirection that confused `vite-plugin-dts` + `rollupTypes`
// nested-entry path resolution. With the implementation directly here,
// the rolled dts emission at `dist/composables/keyboard.d.ts` inlines the
// full declarations rather than falling back to a broken `'../src/...'`
// stub.
//
// Root-barrel re-export stays in place during Phase 1 (v0.9.3 additive).
import { createGlobalState, useEventListener } from "@vueuse/core";
import {
    computed,
    getCurrentScope,
    onScopeDispose,
    ref,
    type ComputedRef,
} from "vue";

export type ShortcutEventType = "keydown" | "keyup";

export interface ShortcutOptions {
    /** Fire even when focus is in input/textarea/contenteditable. Default: false */
    allowInInput?: boolean;
    /** Call preventDefault on the event. Default: false */
    preventDefault?: boolean;
    /** Human-readable label for the shortcuts modal */
    label?: string;
    /** Group name for display (e.g. "Playback", "Navigation") */
    group?: string;
    /** Keyboard event phase to match. Default: keydown */
    event?: ShortcutEventType;
}

export interface RegisteredShortcut {
    combo: ShortcutCombo;
    raw: string;
    handler: (e: KeyboardEvent) => void;
    options: ShortcutOptions;
}

export interface ShortcutCombo {
    key: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
    alt: boolean;
    mod: boolean;
}

export const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform);

const MODIFIER_KEYS: Record<string, string> = {
    alt: "Alt",
    option: "Alt",
    ctrl: "Control",
    control: "Control",
    meta: "Meta",
    cmd: "Meta",
    command: "Meta",
    shift: "Shift",
};

function parseCombo(combo: string): ShortcutCombo {
    const parts = combo.split("+").map((part) => part.trim());
    const parsed: ShortcutCombo = {
        key: "",
        ctrl: false,
        meta: false,
        shift: false,
        alt: false,
        mod: false,
    };

    for (const [index, part] of parts.entries()) {
        const lower = part.toLowerCase();
        const isOnlyPart = parts.length === 1 && index === 0;

        if (lower === "mod") {
            if (isOnlyPart) parsed.key = isMac ? "Meta" : "Control";
            else parsed.mod = true;
        } else if (lower === "ctrl" || lower === "control") {
            if (isOnlyPart) parsed.key = "Control";
            else parsed.ctrl = true;
        } else if (lower === "meta" || lower === "cmd" || lower === "command") {
            if (isOnlyPart) parsed.key = "Meta";
            else parsed.meta = true;
        } else if (lower === "shift") {
            if (isOnlyPart) parsed.key = "Shift";
            else parsed.shift = true;
        } else if (lower === "alt" || lower === "option") {
            if (isOnlyPart) parsed.key = "Alt";
            else parsed.alt = true;
        } else {
            parsed.key = part;
        }

        if (isOnlyPart && MODIFIER_KEYS[lower]) {
            parsed.key = MODIFIER_KEYS[lower];
        }
    }

    return parsed;
}

const KEY_ALIASES: Record<string, string[]> = {
    space: [" "],
    delete: ["backspace", "delete"],
    enter: ["enter", "return"],
    escape: ["escape", "esc"],
};

function isComboKey(combo: ShortcutCombo, key: string): boolean {
    return combo.key.toLowerCase() === key.toLowerCase();
}

function matchesCombo(e: KeyboardEvent, combo: ShortcutCombo): boolean {
    const wantCtrl = combo.ctrl || (combo.mod && !isMac);
    const wantMeta = combo.meta || (combo.mod && isMac);

    if (!isComboKey(combo, "Control") && e.ctrlKey !== wantCtrl) return false;
    if (!isComboKey(combo, "Meta") && e.metaKey !== wantMeta) return false;
    if (!isComboKey(combo, "Alt") && e.altKey !== combo.alt) return false;

    const isPrintableShifted = e.key.length === 1 && e.shiftKey && !combo.shift;
    if (
        !isComboKey(combo, "Shift") &&
        !isPrintableShifted &&
        e.shiftKey !== combo.shift
    ) {
        return false;
    }

    const comboKeyLower = combo.key.toLowerCase();
    const eventKeyLower = e.key.toLowerCase();

    if (eventKeyLower === comboKeyLower) return true;

    const aliases = KEY_ALIASES[comboKeyLower];
    if (aliases && aliases.some((alias) => alias.toLowerCase() === eventKeyLower)) {
        return true;
    }

    if (e.code.toLowerCase() === comboKeyLower) return true;

    return false;
}

function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    const tag = (target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if ((target as HTMLElement).isContentEditable) return true;
    if (target.closest(".monaco-editor")) return true;
    return false;
}

function formatPart(part: string): string {
    const lower = part.trim().toLowerCase();
    if (lower === "mod") return isMac ? "⌘" : "Ctrl";
    if (lower === "shift") return isMac ? "⇧" : "Shift";
    if (lower === "alt" || lower === "option") return isMac ? "⌥" : "Alt";
    if (lower === "ctrl" || lower === "control") return isMac ? "⌃" : "Ctrl";
    if (lower === "meta" || lower === "cmd" || lower === "command") return "⌘";
    if (lower === "space") return isMac ? "␣" : "Space";
    if (lower === "arrowleft") return "←";
    if (lower === "arrowright") return "→";
    if (lower === "arrowup") return "↑";
    if (lower === "arrowdown") return "↓";
    if (lower === "delete") return isMac ? "⌫" : "Del";
    if (lower === "escape") return "Esc";
    if (lower === "enter") return "↵";
    if (lower === "home") return "Home";
    if (lower === "end") return "End";
    return part.trim();
}

export function formatComboParts(raw: string): string[] {
    return raw.split("+").map(formatPart);
}

export function formatCombo(raw: string): string {
    return formatComboParts(raw).join(isMac ? "" : "+");
}

function dispatchShortcut(
    shortcuts: Set<RegisteredShortcut>,
    eventType: ShortcutEventType,
    e: KeyboardEvent,
): void {
    for (const shortcut of shortcuts) {
        if ((shortcut.options.event ?? "keydown") !== eventType) continue;
        if (!matchesCombo(e, shortcut.combo)) continue;

        if (
            !shortcut.options.allowInInput &&
            isEditableTarget(e.target)
        ) {
            continue;
        }

        if (shortcut.options.preventDefault) {
            e.preventDefault();
        }

        shortcut.handler(e);
        return;
    }
}

const useShortcutRegistry = createGlobalState(() => {
    const shortcuts = new Set<RegisteredShortcut>();
    const version = ref(0);

    useEventListener(window, "keydown", (e: KeyboardEvent) => {
        dispatchShortcut(shortcuts, "keydown", e);
    });

    useEventListener(window, "keyup", (e: KeyboardEvent) => {
        dispatchShortcut(shortcuts, "keyup", e);
    });

    const labeled = computed(() => {
        version.value;
        return [...shortcuts].filter((shortcut) => shortcut.options.label);
    });

    return { shortcuts, version, labeled };
});

export function registerShortcut(
    combo: string,
    handler: (e: KeyboardEvent) => void,
    options: ShortcutOptions = {},
): () => void {
    const { shortcuts, version } = useShortcutRegistry();

    const entry: RegisteredShortcut = {
        combo: parseCombo(combo),
        raw: combo,
        handler,
        options,
    };

    shortcuts.add(entry);
    version.value++;

    const cleanup = () => {
        if (shortcuts.delete(entry)) {
            version.value++;
        }
    };

    if (getCurrentScope()) {
        onScopeDispose(cleanup);
    }

    return cleanup;
}

export function useRegisteredShortcuts(): ComputedRef<RegisteredShortcut[]> {
    const { labeled } = useShortcutRegistry();
    return labeled;
}
