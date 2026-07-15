import type { KeyPosition } from "./utils/keyboard";

export type { KeyPosition };

// --- Word rotation types (from bbnf-lang pattern) ---

/** A single word entry for word-rotation mode. */
export interface TypewriterWord {
    /** The text to type. */
    text: string;
    /** Optional CSS class applied to the word span. */
    className?: string;
    /** Whether to render with a monospace/code style. */
    isCode?: boolean;
}

// --- Typo FSM types ---

export type TypoState =
    | "normal"
    | "typo_injected"
    | "typing_past"
    | "noticed"
    | "correcting"
    | "resuming";

export interface TypoContext {
    state: TypoState;
    /** Number of chars typed past the typo position */
    charsPastTypo: number;
    /** Total chars to delete when correcting (typo char + chars past) */
    charsToDelete: number;
    /** Number of sequential typos in this burst */
    sequentialTypoCount: number;
}

export type TypoAction =
    | { type: "type_correct"; char: string }
    | { type: "type_wrong"; char: string; intended: string }
    | { type: "type_past_correct"; char: string }
    | { type: "notice"; pauseMs: number }
    | { type: "backspace"; count: number; frantic: boolean }
    | { type: "resume"; pauseMs: number };

// --- Cancellation ---

export interface CancellationToken {
    readonly cancelled: boolean;
    cancel(): void;
    onCancel(fn: () => void): void;
    offCancel(fn: () => void): void;
}

// --- Options ---

export interface TypewriterOptions {
    /** Single text to type. Mutually exclusive with `words`. */
    text?: string;

    /**
     * Array of words to cycle through (word-rotation mode).
     * When provided, the typewriter types each word, pauses, backspaces,
     * then types the next word in a loop.
     * Mutually exclusive with `text`.
     */
    words?: TypewriterWord[];

    /** N-gram chunk size for typing. Fixed number or {min, max} range. */
    ngramSize?: number | { min: number; max: number };
    /** Base typing speed in ms per keystroke. */
    baseSpeed?: number;
    /** Speed variance factor (0-1). */
    variance?: number;
    /** Probability of introducing a typo per character (0-1). */
    errorRate?: number;
    /** Speed multiplier for the first animation pass (lower = faster). */
    firstAnimationSpeedFactor?: number;

    // Typo behavior
    /** Maximum chars typed past a typo before noticing. */
    maxCharsBeforeNotice?: number;
    /** Probability of continuing to type after a typo (0-1). */
    continueAfterTypoProbability?: number;
    /** Decay factor for sequential typo probability (0-1). */
    sequentialTypoDecay?: number;
    /** Speed multiplier for correction typing (lower = faster). */
    correctionSpeedMultiplier?: number;
    /** Base delay for correction backspace in ms. */
    correctionBaseDelay?: number;

    // Backspace
    /** Base delay for normal backspace in ms. */
    backspaceBaseDelay?: number;
    /** Acceleration factor for consecutive backspaces. */
    backspaceAcceleration?: number;
    /** Pause before starting backspace animation in ms. */
    preBackspacePause?: number;
    /** Pause after backspace animation before retyping in ms. */
    postBackspacePause?: number;

    // Cursor
    /** Whether to show the cursor. */
    cursorVisible?: boolean;
    /** Whether the cursor blinks when idle. */
    cursorBlink?: boolean;
    /** Cursor character. */
    cursorChar?: string;

    // Word-rotation mode options
    /** Pause after fully typing a word before deleting (ms). Only for word-rotation mode. */
    pauseAfterType?: number;
    /** Pause after deleting a word before typing the next (ms). Only for word-rotation mode. */
    pauseAfterDelete?: number;
    /** Typing speed for deletion in word-rotation mode (ms). Falls back to backspaceBaseDelay. */
    deletingSpeed?: number;

    // Misc
    /** Respect prefers-reduced-motion media query. */
    respectReducedMotion?: boolean;
    /** Loop the single-text typing animation. */
    loop?: boolean;
    /** Callback when typing completes. */
    onComplete?: () => void;
    /** Callback when a word rotation completes (word-rotation mode). Receives the word index. */
    onWordComplete?: (index: number) => void;
}

export const DEFAULTS = {
    ngramSize: { min: 1, max: 3 } as { min: number; max: number },
    baseSpeed: 150,
    variance: 0.4,
    errorRate: 0.015,
    firstAnimationSpeedFactor: 0.6,

    maxCharsBeforeNotice: 4,
    continueAfterTypoProbability: 0.6,
    sequentialTypoDecay: 0.3,
    correctionSpeedMultiplier: 0.5,
    correctionBaseDelay: 40,

    backspaceBaseDelay: 30,
    backspaceAcceleration: 0.08,
    preBackspacePause: 200,
    postBackspacePause: 150,

    cursorVisible: true,
    cursorBlink: true,
    cursorChar: "|",

    pauseAfterType: 3000,
    pauseAfterDelete: 800,
    deletingSpeed: 70,

    respectReducedMotion: true,
    loop: false,
} as const satisfies Omit<
    Required<TypewriterOptions>,
    "text" | "words" | "onComplete" | "onWordComplete"
>;
