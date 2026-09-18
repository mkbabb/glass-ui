// @mkbabb/glass-ui/composables/keyboard — vueuse-bearing keyboard registry
//
// `useKeyboardShortcuts` builds on `createGlobalState` + `useEventListener`
// from `@vueuse/core`. Subpath isolates the registry from the root barrel
// so consumers that don't reach for it don't drag vueuse into the entry
// chunk via the SCC trap.
//
// Implementation lives at `src/composables/keyboard/useKeyboardShortcuts.ts`;
// the sub-tree's `index.ts` re-exports it, and the flat
// `@mkbabb/glass-ui/keyboard` public entry resolves
// through that sub-tree index.
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

/**
 * A registration the help UI can render: the element type of
 * `useRegisteredShortcuts()`, which filters on the label the registrar supplied.
 * Type-only narrowing — `options.label` is the field the runtime guarantees, so
 * that is the field the type promises.
 */
export interface LabeledShortcut extends RegisteredShortcut {
    options: ShortcutOptions & { label: string };
}

/**
 * The dispatcher's own view of a registration. `seq` is monotonic across the
 * process and is what a suspension barrier compares against; it stays off the
 * public shape because no consumer can do anything with it.
 */
interface RegistryEntry extends RegisteredShortcut {
    seq: number;
}

/** One suspension. Identity is the resume token, so releases are order-free. */
interface Barrier {
    seq: number;
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

// The SPOKEN half of the glyph table above. A screen reader announcing "⌘⇧Z" reads
// punctuation, so an accessible name needs words — and the words have to name the
// same modifier the glyph does, which is why each row here is the glyph row's
// reading: ⌘ is Command, ⌃ is Control, ⌥ is Option, and `mod` resolves per platform
// exactly as `formatPart` resolves it.
const SPOKEN_MODIFIERS: Record<string, string> = {
    mod: isMac ? "Command" : "Control",
    ctrl: "Control",
    control: "Control",
    meta: "Command",
    cmd: "Command",
    command: "Command",
    shift: "Shift",
    alt: isMac ? "Option" : "Alt",
    option: isMac ? "Option" : "Alt",
};

// The arrows are the only keys whose glyph has no word in the key name itself.
const SPOKEN_KEYS: Record<string, string> = {
    arrowleft: "Left Arrow",
    arrowright: "Right Arrow",
    arrowup: "Up Arrow",
    arrowdown: "Down Arrow",
};

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function speakPart(part: string): string {
    const trimmed = part.trim();
    const lower = trimmed.toLowerCase();

    if (SPOKEN_MODIFIERS[lower]) return SPOKEN_MODIFIERS[lower];
    if (SPOKEN_KEYS[lower]) return SPOKEN_KEYS[lower];

    // READ THE MATCHER'S OWN ALIAS TABLE. A binding on `delete` also answers to
    // Backspace, and a label that says only "Delete" sends half the audience to a
    // key that does nothing. Canonical token first, then every alias that is a
    // different word — the startsWith guard drops the alias identical to the
    // canonical word, an abbreviation of it (esc/escape), and the whitespace
    // alias, which trims to the empty prefix every string starts with.
    const aliases = KEY_ALIASES[lower];
    if (aliases) {
        const spoken = aliases.filter((alias) => {
            const candidate = alias.trim().toLowerCase();
            return !lower.startsWith(candidate);
        });
        return [lower, ...spoken].map(capitalize).join(" or ");
    }

    return capitalize(trimmed);
}

/**
 * The spoken form of a combo, for an `aria-label` beside the `<kbd>` glyphs.
 * `"mod+shift+z"` → "Control Shift Z" (or "Command Shift Z" on a Mac);
 * `"delete"` → "Delete or Backspace".
 */
export function formatComboLabel(raw: string): string {
    return raw.split("+").map(speakPart).join(" ");
}

// The Escape "dismiss-topmost" test. Escape (and its
// `Esc` alias) resolves LIFO so the most-recently-registered OPEN overlay wins;
// every other key keeps the forward first-match dispatch (a multi-target
// accelerator is correct there — only Escape carries the stack semantic).
function isEscapeEvent(e: KeyboardEvent): boolean {
    const key = e.key.toLowerCase();
    return key === "escape" || key === "esc";
}

function dispatchShortcut(
    shortcuts: Set<RegistryEntry>,
    barriers: Barrier[],
    eventType: ShortcutEventType,
    e: KeyboardEvent,
): void {
    // Another layer already answered this keystroke. reka's DismissableLayer reads
    // `defaultPrevented` for exactly this reason; the registry owes it the same
    // courtesy rather than firing a second handler for one press. Escape is NOT
    // exempt here, unlike the barrier below: an Escape a layer consumed was that
    // layer's dismissal. In-house consumers that set the flag: dock search
    // (useFuzzySearch — arrows, Enter, Escape), tab roving focus and the
    // sortable-list keyboard drag.
    if (e.defaultPrevented) return;

    // The suspension barrier — the top one wins, and only for non-Escape keys.
    // Escape is the dismissal key: a modal that suspended the app's bindings still
    // has to let Escape find whatever is top-most on the LIFO stack, or a nested
    // overlay could never be dismissed from the layer below it.
    const topBarrier =
        !isEscapeEvent(e) && barriers.length > 0
            ? barriers[barriers.length - 1]!.seq
            : -1;

    // Resolve Escape LIFO (dismiss-topmost). Overlays register
    // their Escape handler ONLY WHILE OPEN (register-on-open / unregister-on-
    // close), and the registry Set preserves insertion order, so the reversed
    // walk lands on the top-most live overlay first: it consumes and returns, a
    // second Escape pops the next. A collapsed container holds no handler. This
    // makes the house `registerShortcut` path MATCH the reka DismissableLayer
    // stack (Dialog/Sheet/Popover) rather than shadow it. All other keys
    // keep the forward first-registered-wins order (unchanged).
    const order = isEscapeEvent(e)
        ? [...shortcuts].reverse()
        : shortcuts;

    for (const shortcut of order) {
        if (shortcut.seq <= topBarrier) continue;
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
    const shortcuts = new Set<RegistryEntry>();
    const barriers: Barrier[] = [];
    // Monotonic and never reset: a barrier only has to out-rank the registrations
    // that existed when it was raised, and a counter that never goes backwards is
    // the whole mechanism.
    const counter = { seq: 0 };
    const version = ref(0);

    useEventListener(window, "keydown", (e: KeyboardEvent) => {
        dispatchShortcut(shortcuts, barriers, "keydown", e);
    });

    useEventListener(window, "keyup", (e: KeyboardEvent) => {
        dispatchShortcut(shortcuts, barriers, "keyup", e);
    });

    const labeled = computed(() => {
        version.value;
        return [...shortcuts].filter(
            (shortcut): shortcut is RegistryEntry & LabeledShortcut =>
                Boolean(shortcut.options.label),
        );
    });

    return { shortcuts, barriers, counter, version, labeled };
});

export function registerShortcut(
    combo: string,
    handler: (e: KeyboardEvent) => void,
    options: ShortcutOptions = {},
): () => void {
    const { shortcuts, counter, version } = useShortcutRegistry();

    const entry: RegistryEntry = {
        combo: parseCombo(combo),
        raw: combo,
        handler,
        options,
        seq: ++counter.seq,
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

/**
 * Quiet every shortcut registered SO FAR for non-Escape keys, and return the
 * release. A modal owns the keyboard while it is open: the nineteen app-level
 * accelerators behind it must not fire, and nothing but the modal's own bindings
 * should answer a keystroke aimed at it.
 *
 * ORDERING — call this BEFORE the modal registers its own bindings. The barrier is
 * `seq > topBarrier`, so anything registered after the call is still live and
 * anything registered before is not; suspending afterwards would silence the modal
 * along with the app. The in-house overlays wire it in that order.
 *
 * Content that stays mounted across a close (`force-mount`, `unmount-on-hide="false"`,
 * a reopen inside the exit spring) keeps the registration seq it took at mount and
 * so falls BELOW the next barrier. Register on open and release on close, as the
 * in-house overlays do — ExpandableContainer registers its Escape inside its open
 * watch, not at mount.
 *
 * Escape is exempt by design and keeps its reversed LIFO walk, so the top-most
 * overlay is always dismissable. Within a layer the forward first-registered-wins
 * order is untouched, so a late registrant cannot shadow a destructive binding.
 *
 * `useRegisteredShortcuts()` is NOT barrier-filtered, deliberately: it is the
 * reference list of what the app answers to, not a live capability probe. A help
 * overlay is itself a modal, and filtering would hand it an empty list.
 *
 * The returned release is idempotent and order-free — it splices out its own
 * barrier by identity, so nested suspensions can resume in any order.
 */
export function suspendShortcuts(): () => void {
    const { barriers, counter } = useShortcutRegistry();

    const barrier: Barrier = { seq: counter.seq };
    barriers.push(barrier);

    return () => {
        const index = barriers.indexOf(barrier);
        if (index !== -1) barriers.splice(index, 1);
    };
}

export function useRegisteredShortcuts(): ComputedRef<LabeledShortcut[]> {
    const { labeled } = useShortcutRegistry();
    return labeled;
}
