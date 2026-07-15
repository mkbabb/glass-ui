import { ref, computed } from "vue";
import type { TypewriterOptions, TypewriterWord, CancellationToken } from "../types";
import { DEFAULTS } from "../types";
import { calculateKeyDelay } from "../utils/keyboard";
import { splitGraphemes } from "../utils/graphemes";
import { getPauseDelay, PAUSE_PATTERNS } from "../utils/pausePatterns";
import {
    createCancellationToken,
    sleep,
    stochasticDelay,
    backspaceDelay as calcBackspaceDelay,
    pickNgramSize,
    prefersReducedMotion,
} from "../utils/timing";
import {
    nextTypoAction,
    createTypoContext,
    DEFAULT_TYPO_CONFIG,
    type TypoConfig,
} from "../utils/typoStateMachine";

export function useTypewriter(options: TypewriterOptions) {
    // Merge options with defaults
    const opts = { ...DEFAULTS, ...options };

    // Determine mode
    const isWordRotation = opts.words != null && opts.words.length > 0;

    // --- Reactive state ---
    const displayText = ref("");
    const isTyping = ref(false);
    const isFirstAnimation = ref(true);
    const isDeleting = ref(false);

    // Word-rotation state
    const currentWordIndex = ref(0);
    const currentWord = ref<TypewriterWord>(
        isWordRotation ? opts.words![0] : { text: opts.text ?? "" },
    );

    // --- Internal state (non-reactive) ---
    let targetText = isWordRotation ? opts.words![0].text : (opts.text ?? "");
    let targetChars = splitGraphemes(targetText);
    let currentToken: CancellationToken | null = null;

    // --- Derived typo config ---
    function getTypoConfig(): TypoConfig {
        return {
            ...DEFAULT_TYPO_CONFIG,
            maxCharsBeforeNotice: opts.maxCharsBeforeNotice,
            continueAfterTypoProbability: opts.continueAfterTypoProbability,
            sequentialTypoDecay: opts.sequentialTypoDecay,
        };
    }

    // --- Core typing loop ---

    async function typeTextWithNgrams(token: CancellationToken): Promise<void> {
        const chars = targetChars;
        let typoCtx = createTypoContext();
        const typoConfig = getTypoConfig();
        const speedFactor = isFirstAnimation.value ? opts.firstAnimationSpeedFactor : 1;
        const skipTypos = isFirstAnimation.value;

        while (splitGraphemes(displayText.value).length < chars.length) {
            if (token.cancelled) return;

            const pos = splitGraphemes(displayText.value).length;
            const currentChar = chars[pos];
            const prevChar = pos > 0 ? chars[pos - 1] : "";

            // If FSM is in a non-normal state, drive it single-char
            if (typoCtx.state !== "normal") {
                const result = nextTypoAction(typoCtx, currentChar, typoConfig, opts.errorRate);
                typoCtx = result.ctx;

                const ok = await executeAction(result.action, token, prevChar, speedFactor);
                if (!ok) return;
                continue;
            }

            // Normal state: decide typo or n-gram
            if (!skipTypos && pos > 3 && pos < chars.length - 3) {
                const result = nextTypoAction(typoCtx, currentChar, typoConfig, opts.errorRate);
                typoCtx = result.ctx;

                if (result.action.type === "type_wrong") {
                    const ok = await executeAction(result.action, token, prevChar, speedFactor);
                    if (!ok) return;
                    continue;
                }

                // FSM said type_correct -- fall through to n-gram path
            }

            // N-gram typing
            const ngramSize = Math.min(pickNgramSize(opts.ngramSize), chars.length - pos);

            for (let i = 0; i < ngramSize; i++) {
                if (token.cancelled) return;
                const charPos = pos + i;
                const ch = chars[charPos];
                const prev = charPos > 0 ? chars[charPos - 1] : "";

                displayText.value += ch;

                // Only delay after the last char of the n-gram
                if (i === ngramSize - 1) {
                    const nextCh = chars[charPos + 1] ?? "";
                    const keyDelay = calculateKeyDelay(prev, ch) * speedFactor;
                    const typingDelay = stochasticDelay(keyDelay, opts.variance);

                    // Punctuation pauses (skip on first animation)
                    let pauseDelay = 0;
                    if (!isFirstAnimation.value) {
                        pauseDelay = getPauseDelay(ch, nextCh, PAUSE_PATTERNS);
                    }

                    const ok = await sleep(typingDelay + pauseDelay, token);
                    if (!ok) return;
                }
            }
        }
    }

    async function executeAction(
        action: ReturnType<typeof nextTypoAction>["action"],
        token: CancellationToken,
        prevChar: string,
        speedFactor: number,
    ): Promise<boolean> {
        switch (action.type) {
            case "type_correct": {
                if (action.char === "") return true; // resume placeholder
                displayText.value += action.char;
                const delay = calculateKeyDelay(prevChar, action.char) * speedFactor;
                return sleep(stochasticDelay(delay, opts.variance), token);
            }

            case "type_wrong": {
                displayText.value += action.char;
                const delay = calculateKeyDelay(prevChar, action.char) * speedFactor;
                return sleep(stochasticDelay(delay, opts.variance), token);
            }

            case "type_past_correct": {
                displayText.value += action.char;
                const delay = calculateKeyDelay(prevChar, action.char) * speedFactor;
                return sleep(
                    stochasticDelay(delay * opts.correctionSpeedMultiplier, opts.variance),
                    token,
                );
            }

            case "notice": {
                return sleep(action.pauseMs, token);
            }

            case "backspace": {
                return animateBackspaceSequence(action.count, token, action.frantic);
            }

            case "resume": {
                return sleep(action.pauseMs, token);
            }
        }
    }

    // --- Backspace animation ---

    async function animateBackspaceSequence(
        count: number,
        token: CancellationToken,
        frantic: boolean,
    ): Promise<boolean> {
        const base = frantic ? opts.correctionBaseDelay : opts.backspaceBaseDelay;
        const accel = frantic ? opts.backspaceAcceleration * 2 : opts.backspaceAcceleration;

        for (let i = 0; i < count; i++) {
            if (token.cancelled) return false;
            displayText.value = splitGraphemes(displayText.value).slice(0, -1).join("");
            const delay = calcBackspaceDelay(base, opts.variance * 0.5, i, accel);
            const ok = await sleep(delay, token);
            if (!ok) return false;
        }
        return true;
    }

    // --- Simple character-by-character delete (word-rotation style) ---

    async function simpleDeleteSequence(token: CancellationToken): Promise<boolean> {
        isDeleting.value = true;
        const speed = opts.deletingSpeed;

        while (displayText.value.length > 0) {
            if (token.cancelled) {
                isDeleting.value = false;
                return false;
            }
            displayText.value = splitGraphemes(displayText.value).slice(0, -1).join("");
            const jitter = Math.random() * 20;
            const ok = await sleep(speed + jitter, token);
            if (!ok) {
                isDeleting.value = false;
                return false;
            }
        }
        isDeleting.value = false;
        return true;
    }

    // --- Word rotation loop ---

    async function wordRotationLoop(token: CancellationToken): Promise<void> {
        const words = opts.words!;
        let wordIdx = currentWordIndex.value;

        while (!token.cancelled) {
            // Set current word
            currentWord.value = words[wordIdx];
            currentWordIndex.value = wordIdx;
            targetText = words[wordIdx].text;
            targetChars = splitGraphemes(targetText);

            // Type the word
            await typeTextWithNgrams(token);
            if (token.cancelled) return;

            isFirstAnimation.value = false;
            opts.onWordComplete?.(wordIdx);

            // Pause after typing
            const ok1 = await sleep(opts.pauseAfterType, token);
            if (!ok1) return;

            // Delete the word
            const ok2 = await simpleDeleteSequence(token);
            if (!ok2) return;

            // Pause after deleting
            const ok3 = await sleep(opts.pauseAfterDelete, token);
            if (!ok3) return;

            // Advance to next word
            wordIdx = (wordIdx + 1) % words.length;
        }
    }

    // --- Public API ---

    async function startTyping(): Promise<void> {
        // Cancel any in-flight animation
        currentToken?.cancel();
        const token = createCancellationToken();
        currentToken = token;
        isTyping.value = true;

        // Reduced motion: show final text immediately
        if (opts.respectReducedMotion && prefersReducedMotion()) {
            if (isWordRotation) {
                displayText.value = opts.words![0].text;
                currentWord.value = opts.words![0];
            } else {
                displayText.value = targetText;
            }
            isTyping.value = false;
            isFirstAnimation.value = false;
            opts.onComplete?.();
            return;
        }

        if (isWordRotation) {
            // Word-rotation mode: type/delete/cycle indefinitely
            await wordRotationLoop(token);

            if (!token.cancelled) {
                isTyping.value = false;
            }
        } else {
            // Single-text mode: backspace existing text if not first animation, then type
            if (!isFirstAnimation.value && displayText.value.length > 0) {
                const ok = await sleep(opts.preBackspacePause, token);
                if (!ok) return;

                const ok2 = await animateBackspaceSequence(
                    splitGraphemes(displayText.value).length,
                    token,
                    false,
                );
                if (!ok2) return;

                const ok3 = await sleep(opts.postBackspacePause, token);
                if (!ok3) return;
            }

            // Type the text
            await typeTextWithNgrams(token);

            // Complete (only if we were not cancelled)
            if (!token.cancelled) {
                isFirstAnimation.value = false;
                isTyping.value = false;
                opts.onComplete?.();

                if (opts.loop) {
                    await sleep(2000, token);
                    if (!token.cancelled) {
                        startTyping();
                    }
                }
            }
        }
    }

    function stopTyping(): void {
        currentToken?.cancel();
        currentToken = null;
        isTyping.value = false;
        isDeleting.value = false;
    }

    function reset(): void {
        stopTyping();
        displayText.value = "";
        isFirstAnimation.value = true;
        if (isWordRotation) {
            currentWordIndex.value = 0;
            currentWord.value = opts.words![0];
            targetText = opts.words![0].text;
            targetChars = splitGraphemes(targetText);
        }
    }

    function updateText(newText: string): void {
        targetText = newText;
        targetChars = splitGraphemes(newText);
        if (!isWordRotation) {
            opts.text = newText;
        }
        if (displayText.value.length > 0) {
            isFirstAnimation.value = false;
        }
    }

    // --- Word-rotation convenience methods ---

    function pause(): void {
        stopTyping();
    }

    function resume(): void {
        if (!isTyping.value) {
            startTyping();
        }
    }

    function setCharPosition(n: number): void {
        const maxLen = targetChars.length;
        const clamped = Math.max(0, Math.min(n, maxLen));
        displayText.value = targetChars.slice(0, clamped).join("");
    }

    function forceWord(idx: number, charPos: number): void {
        if (!isWordRotation) return;
        stopTyping();
        const words = opts.words!;
        const safeIdx = idx % words.length;
        currentWordIndex.value = safeIdx;
        currentWord.value = words[safeIdx];
        targetText = words[safeIdx].text;
        targetChars = splitGraphemes(targetText);
        setCharPosition(charPos);
    }

    return {
        // State
        displayText,
        isTyping,
        isFirstAnimation,
        isDeleting,
        currentWordIndex: computed(() => currentWordIndex.value),
        currentWord: computed(() => currentWord.value),

        // Single-text API
        startTyping,
        stopTyping,
        reset,
        updateText,

        // Word-rotation API
        pause,
        resume,
        setCharPosition,
        forceWord,
    };
}
