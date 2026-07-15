<template>
    <span class="tw-root">
        <span>{{ leadingText }}</span>
        <span v-if="tailChar !== null" class="tw-tail">
            {{ tailChar }}
            <span
                v-if="cursorVisible"
                class="tw-cursor"
                :class="{
                    'tw-cursor--blink': cursorBlink && !typewriter.isTyping.value,
                }"
            >
                {{ cursorChar }}
            </span>
        </span>
        <span
            v-else-if="cursorVisible"
            class="tw-cursor"
            :class="{
                'tw-cursor--blink': cursorBlink && !typewriter.isTyping.value,
            }"
        >
            {{ cursorChar }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, computed } from "vue";
import { useTypewriter } from "./composables/useTypewriter";
import type { TypewriterWord } from "./types";
import { splitGraphemes } from "./utils/graphemes";

interface Props {
    /** Single text to type. Use this OR `words`, not both. */
    text?: string;
    /** Array of words to cycle through in rotation mode. Use this OR `text`, not both. */
    words?: TypewriterWord[];
    ngramSize?: number | { min: number; max: number };
    baseSpeed?: number;
    variance?: number;
    errorRate?: number;
    firstAnimationSpeedFactor?: number;
    maxCharsBeforeNotice?: number;
    continueAfterTypoProbability?: number;
    sequentialTypoDecay?: number;
    correctionSpeedMultiplier?: number;
    cursorVisible?: boolean;
    cursorBlink?: boolean;
    cursorChar?: string;
    startDelay?: number;
    loop?: boolean;
    /** Pause after typing a word before deleting (ms). Word-rotation mode only. */
    pauseAfterType?: number;
    /** Pause after deleting a word before typing the next (ms). Word-rotation mode only. */
    pauseAfterDelete?: number;
    /** Backspace speed in word-rotation mode (ms per char). */
    deletingSpeed?: number;
    respectReducedMotion?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    text: undefined,
    words: undefined,
    ngramSize: () => ({ min: 1, max: 3 }),
    baseSpeed: 150,
    variance: 0.4,
    errorRate: 0.015,
    firstAnimationSpeedFactor: 0.6,
    maxCharsBeforeNotice: 4,
    continueAfterTypoProbability: 0.6,
    sequentialTypoDecay: 0.3,
    correctionSpeedMultiplier: 0.5,
    cursorVisible: true,
    cursorBlink: true,
    cursorChar: "|",
    startDelay: 0,
    loop: false,
    pauseAfterType: 3000,
    pauseAfterDelete: 800,
    deletingSpeed: 70,
    respectReducedMotion: true,
});

const emit = defineEmits<{
    complete: [];
    start: [];
    /** Emitted after each word finishes typing in word-rotation mode. */
    wordComplete: [index: number];
}>();

const typewriter = useTypewriter({
    text: props.text,
    words: props.words,
    ngramSize: props.ngramSize,
    baseSpeed: props.baseSpeed,
    variance: props.variance,
    errorRate: props.errorRate,
    firstAnimationSpeedFactor: props.firstAnimationSpeedFactor,
    maxCharsBeforeNotice: props.maxCharsBeforeNotice,
    continueAfterTypoProbability: props.continueAfterTypoProbability,
    sequentialTypoDecay: props.sequentialTypoDecay,
    correctionSpeedMultiplier: props.correctionSpeedMultiplier,
    cursorVisible: props.cursorVisible,
    cursorBlink: props.cursorBlink,
    cursorChar: props.cursorChar,
    loop: props.loop,
    pauseAfterType: props.pauseAfterType,
    pauseAfterDelete: props.pauseAfterDelete,
    deletingSpeed: props.deletingSpeed,
    respectReducedMotion: props.respectReducedMotion,
    onComplete: () => emit("complete"),
    onWordComplete: (index: number) => emit("wordComplete", index),
});

const { displayText, startTyping, stopTyping, reset } = typewriter;

const displayTextChars = computed(() => splitGraphemes(displayText.value));
const leadingText = computed(() => displayTextChars.value.slice(0, -1).join(""));
const tailChar = computed(() =>
    displayTextChars.value.length > 0
        ? displayTextChars.value[displayTextChars.value.length - 1]
        : null,
);

type TypewriterTimer = ReturnType<typeof setTimeout>;

const activeTimers = new Set<TypewriterTimer>();

function scheduleTimer(callback: () => void, delay: number) {
    const timer = setTimeout(() => {
        activeTimers.delete(timer);
        callback();
    }, delay);
    activeTimers.add(timer);
    return timer;
}

function clearTypewriterTimers() {
    activeTimers.forEach((timer) => clearTimeout(timer));
    activeTimers.clear();
}

function scheduleStart() {
    clearTypewriterTimers();
    scheduleTimer(() => {
        emit("start");
        void startTyping();
    }, props.startDelay);
}

// Watch for text changes in single-text mode
watch(
    () => props.text,
    (newText, oldText) => {
        if (newText !== oldText && newText) {
            stopTyping();
            typewriter.updateText(newText);
            scheduleStart();
        }
    },
);

onMounted(() => {
    const hasContent = props.text || (props.words && props.words.length > 0);
    if (hasContent) {
        scheduleStart();
    }
});

onUnmounted(() => {
    clearTypewriterTimers();
    stopTyping();
});

defineExpose({
    startTyping,
    stopTyping,
    reset,
    isTyping: typewriter.isTyping,
    isDeleting: typewriter.isDeleting,
    currentWord: typewriter.currentWord,
    currentWordIndex: typewriter.currentWordIndex,
    pause: typewriter.pause,
    resume: typewriter.resume,
    setCharPosition: typewriter.setCharPosition,
    forceWord: typewriter.forceWord,
});
</script>

<style scoped>
.tw-root {
    display: inline;
}

.tw-tail {
    white-space: nowrap;
}

.tw-cursor {
    display: inline-block;
    font-weight: 100;
}

/* Keyframe typewriter-blink lives in src/styles/animations.css */
.tw-cursor--blink {
    animation: typewriter-blink 1.06s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
    .tw-cursor--blink {
        animation: none;
    }
}
</style>
