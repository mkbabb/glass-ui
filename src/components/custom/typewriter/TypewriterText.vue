<template>
    <span class="tw-root">
        <span
            v-for="(char, index) in leadingChars"
            :key="index"
            :class="charClass"
            @click="handleCharClick(index)"
        >
            {{ char }}
        </span>
        <span v-if="tailChar !== null" class="tw-tail">
            <span :class="charClass" @click="handleCharClick(displayTextChars.length - 1)">
                {{ tailChar }}
            </span>
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
    /** Whether clicking characters triggers interactive backspace. */
    interactive?: boolean;
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
    interactive: true,
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

const { displayText, startTyping, stopTyping, reset, backspaceToPosition } = typewriter;

const displayTextChars = computed(() => displayText.value.split(""));
const leadingChars = computed(() => displayTextChars.value.slice(0, -1));
const tailChar = computed(() =>
    displayTextChars.value.length > 0
        ? displayTextChars.value[displayTextChars.value.length - 1]
        : null,
);

const charClass = computed(() => (props.interactive ? "tw-char tw-char--interactive" : "tw-char"));

function handleCharClick(clickedIndex: number) {
    if (!props.interactive) return;
    if (clickedIndex >= displayText.value.length) return;

    if (typewriter.isTyping.value) {
        stopTyping();
        setTimeout(() => backspaceToPosition(clickedIndex + 1), 50);
    } else {
        backspaceToPosition(clickedIndex + 1);
    }
}

// Watch for text changes in single-text mode
watch(
    () => props.text,
    (newText, oldText) => {
        if (newText !== oldText && newText) {
            stopTyping();
            typewriter.updateText(newText);
            setTimeout(() => {
                emit("start");
                startTyping();
            }, props.startDelay);
        }
    },
);

onMounted(() => {
    const hasContent = props.text || (props.words && props.words.length > 0);
    if (hasContent) {
        setTimeout(() => {
            emit("start");
            startTyping();
        }, props.startDelay);
    }
});

onUnmounted(() => {
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

.tw-char {
    display: inline;
}

.tw-char--interactive {
    cursor: pointer;
    border-radius: var(--radius-sm);
    padding: 0 1px;
    margin: 0 -1px;
    transition: background-color var(--duration-fast) var(--ease-standard);
}

.tw-char--interactive:hover {
    background-color: rgba(128, 128, 128, 0.15);
}

.tw-cursor {
    display: inline-block;
    font-weight: 100;
}

.tw-cursor--blink {
    animation: tw-cursor-blink 1.06s step-end infinite;
}

@keyframes tw-cursor-blink {
    0%,
    50% {
        opacity: 1;
    }
    51%,
    100% {
        opacity: 0;
    }
}
</style>
