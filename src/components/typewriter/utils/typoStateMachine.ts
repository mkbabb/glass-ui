import type { TypoContext, TypoAction } from "../types";
import { pickTypoChar } from "./keyboard";
import { randomInRange } from "./timing";

export interface TypoConfig {
    maxCharsBeforeNotice: number;
    continueAfterTypoProbability: number;
    sequentialTypoDecay: number;
    noticePauseMin: number;
    noticePauseMax: number;
    resumePauseMin: number;
    resumePauseMax: number;
}

export const DEFAULT_TYPO_CONFIG: TypoConfig = {
    maxCharsBeforeNotice: 4,
    continueAfterTypoProbability: 0.6,
    sequentialTypoDecay: 0.3,
    noticePauseMin: 200,
    noticePauseMax: 500,
    resumePauseMin: 100,
    resumePauseMax: 300,
};

export function createTypoContext(): TypoContext {
    return {
        state: "normal",
        charsPastTypo: 0,
        charsToDelete: 0,
        sequentialTypoCount: 0,
    };
}

/**
 * Pure FSM transition.
 *
 * States: normal -> typo_injected -> typing_past -> noticed -> correcting -> resuming -> normal
 *
 * The caller provides the intended character(s) at the current position.
 * Returns the action to perform and the new context.
 */
export function nextTypoAction(
    ctx: TypoContext,
    intendedChar: string,
    config: TypoConfig,
    errorRate: number,
): { action: TypoAction; ctx: TypoContext } {
    switch (ctx.state) {
        case "normal":
            return handleNormal(ctx, intendedChar, errorRate);

        case "typo_injected":
            return handleTypoInjected(ctx, intendedChar, config);

        case "typing_past":
            return handleTypingPast(ctx, intendedChar, config);

        case "noticed":
            return handleNoticed(ctx, config);

        case "correcting":
            return handleCorrecting(ctx);

        case "resuming":
            return handleResuming(ctx, config);
    }
}

function handleNormal(
    ctx: TypoContext,
    intendedChar: string,
    errorRate: number,
): { action: TypoAction; ctx: TypoContext } {
    // Sequential typos decay: each consecutive typo is less likely
    const effectiveRate = errorRate * Math.pow(1 - 0.3, ctx.sequentialTypoCount);

    if (Math.random() < effectiveRate && /[a-zA-Z]/.test(intendedChar)) {
        const wrongChar = pickTypoChar(intendedChar);
        return {
            action: { type: "type_wrong", char: wrongChar, intended: intendedChar },
            ctx: {
                ...ctx,
                state: "typo_injected",
                charsPastTypo: 0,
                charsToDelete: 1, // the wrong char itself
                sequentialTypoCount: ctx.sequentialTypoCount + 1,
            },
        };
    }

    return {
        action: { type: "type_correct", char: intendedChar },
        ctx: { ...ctx, sequentialTypoCount: 0 },
    };
}

function handleTypoInjected(
    ctx: TypoContext,
    intendedChar: string,
    config: TypoConfig,
): { action: TypoAction; ctx: TypoContext } {
    // Decide: continue typing past, or notice immediately?
    if (Math.random() < config.continueAfterTypoProbability) {
        return {
            action: { type: "type_past_correct", char: intendedChar },
            ctx: {
                ...ctx,
                state: "typing_past",
                charsPastTypo: 1,
                charsToDelete: ctx.charsToDelete + 1,
            },
        };
    }

    // Notice immediately
    return {
        action: {
            type: "notice",
            pauseMs: randomInRange(config.noticePauseMin, config.noticePauseMax),
        },
        ctx: { ...ctx, state: "noticed" },
    };
}

function handleTypingPast(
    ctx: TypoContext,
    intendedChar: string,
    config: TypoConfig,
): { action: TypoAction; ctx: TypoContext } {
    // Hard cap
    if (ctx.charsPastTypo >= config.maxCharsBeforeNotice) {
        return {
            action: {
                type: "notice",
                pauseMs: randomInRange(config.noticePauseMin, config.noticePauseMax),
            },
            ctx: { ...ctx, state: "noticed" },
        };
    }

    // Roll to continue or notice
    if (Math.random() < config.continueAfterTypoProbability) {
        return {
            action: { type: "type_past_correct", char: intendedChar },
            ctx: {
                ...ctx,
                charsPastTypo: ctx.charsPastTypo + 1,
                charsToDelete: ctx.charsToDelete + 1,
            },
        };
    }

    return {
        action: {
            type: "notice",
            pauseMs: randomInRange(config.noticePauseMin, config.noticePauseMax),
        },
        ctx: { ...ctx, state: "noticed" },
    };
}

function handleNoticed(
    ctx: TypoContext,
    _config: TypoConfig,
): { action: TypoAction; ctx: TypoContext } {
    return {
        action: { type: "backspace", count: ctx.charsToDelete, frantic: true },
        ctx: { ...ctx, state: "correcting" },
    };
}

function handleCorrecting(ctx: TypoContext): { action: TypoAction; ctx: TypoContext } {
    // After backspace completes, transition to resuming
    return {
        action: { type: "resume", pauseMs: randomInRange(100, 300) },
        ctx: {
            ...ctx,
            state: "resuming",
        },
    };
}

function handleResuming(
    ctx: TypoContext,
    _config: TypoConfig,
): { action: TypoAction; ctx: TypoContext } {
    // Reset to normal
    return {
        action: { type: "type_correct", char: "" }, // caller will re-drive with actual char
        ctx: {
            ...ctx,
            state: "normal",
            charsPastTypo: 0,
            charsToDelete: 0,
        },
    };
}
