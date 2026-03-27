export interface PausePatterns {
    sentenceEnd: { min: number; max: number };
    commaBreak: { min: number; max: number };
    wordBoundary: { min: number; max: number };
    thinkingPause: { min: number; max: number };
    colonPause: { min: number; max: number };
    dashPause: { min: number; max: number };
}

export const PAUSE_PATTERNS: PausePatterns = {
    sentenceEnd: { min: 400, max: 800 },
    commaBreak: { min: 200, max: 400 },
    wordBoundary: { min: 50, max: 150 },
    thinkingPause: { min: 800, max: 2000 },
    colonPause: { min: 300, max: 500 },
    dashPause: { min: 250, max: 450 },
};

const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPauseDelay = (char: string, nextChar: string, patterns: PausePatterns): number => {
    // Sentence endings
    if ([".", "!", "?"].includes(char) && nextChar === " ") {
        return random(patterns.sentenceEnd.min, patterns.sentenceEnd.max);
    }

    // Comma breaks
    if (char === "," && nextChar === " ") {
        return random(patterns.commaBreak.min, patterns.commaBreak.max);
    }

    // Colon or semicolon pause
    if ([":", ";"].includes(char) && nextChar === " ") {
        return random(patterns.colonPause.min, patterns.colonPause.max);
    }

    // Dash pause
    if (char === "-" && nextChar === " ") {
        return random(patterns.dashPause.min, patterns.dashPause.max);
    }

    // Word boundaries (occasional micro-pauses)
    if (char === " " && Math.random() < 0.3) {
        return random(patterns.wordBoundary.min, patterns.wordBoundary.max);
    }

    // Occasional thinking pauses (5% chance)
    if (Math.random() < 0.05) {
        return random(patterns.thinkingPause.min, patterns.thinkingPause.max);
    }

    return 0;
};
