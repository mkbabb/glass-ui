<template>
    <span class="tw-root">
        <!-- Assistive technology gets one complete phrase, never partial glyph frames. -->
        <span class="sr-only tw-accessible">{{ accessibleText }}</span>

        <!-- These hidden settled candidates alone size the inline grid. Word rotation
             therefore reserves the largest settled phrase before any typing begins. -->
        <span
            v-for="(reservedText, index) in reservedTexts"
            :key="`${index}:${reservedText}`"
            class="tw-reserve"
            aria-hidden="true"
        >
            {{ reservedText }}
        </span>

        <span class="tw-visual" aria-hidden="true">
            <span>{{ leadingText }}</span>
            <span v-if="tailChar !== null" class="tw-tail">
                {{ tailChar }}
                <span
                    v-if="cursorVisible"
                    class="tw-cursor"
                    :class="{
                        'tw-cursor--blink':
                            cursorBlink && !typewriter.isTyping.value,
                    }"
                >
                    |
                </span>
            </span>
            <span
                v-else-if="cursorVisible"
                class="tw-cursor"
                :class="{
                    'tw-cursor--blink': cursorBlink && !typewriter.isTyping.value,
                }"
            >
                |
            </span>
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
    /** Base typing speed in ms per keystroke. */
    baseSpeed?: number;
    cursorVisible?: boolean;
    cursorBlink?: boolean;
    loop?: boolean;
    /** Pause after typing a word before deleting (ms). Word-rotation mode only. */
    pauseAfterType?: number;
    /** Pause after deleting a word before typing the next (ms). Word-rotation mode only. */
    pauseAfterDelete?: number;
    /**
     * Typing character. `true` (default) types like a person — variable cadence,
     * n-gram bursts, and the occasional self-corrected typo (the humanized default
     * the engine ships). `false` types mechanically at a steady `baseSpeed` with no
     * variance and no typos. The one intent-level knob that replaces the retired
     * per-parameter simulation surface (variance/errorRate/ngramSize/typo-FSM &c.);
     * reduced-motion respect is always-on (it settles to the final phrase in one paint).
     */
    humanize?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    text: undefined,
    words: undefined,
    baseSpeed: 150,
    cursorVisible: true,
    cursorBlink: true,
    loop: false,
    pauseAfterType: 3000,
    pauseAfterDelete: 800,
    humanize: true,
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
    baseSpeed: props.baseSpeed,
    loop: props.loop,
    pauseAfterType: props.pauseAfterType,
    pauseAfterDelete: props.pauseAfterDelete,
    // The opinionated humanize axis: the default rides the engine's shipped
    // human-cadence DEFAULTS (variance/errorRate/ngram bursts/typo-FSM); the
    // mechanical mode flattens variance + typos to a steady per-key cadence.
    ...(props.humanize ? {} : { variance: 0, errorRate: 0, ngramSize: 1 }),
    onComplete: () => emit("complete"),
    onWordComplete: (index: number) => emit("wordComplete", index),
});

const { displayText, startTyping, stopTyping, reset } = typewriter;

const accessibleText = computed(() =>
    props.words && props.words.length > 0
        ? typewriter.currentWord.value.text
        : (props.text ?? ""),
);

const reservedTexts = computed(() =>
    props.words && props.words.length > 0
        ? props.words.map((word) => word.text)
        : [props.text ?? ""],
);

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
    if (typewriter.reducedMotion.value) {
        emit("start");
        void startTyping();
        return;
    }
    scheduleTimer(() => {
        emit("start");
        void startTyping();
    }, 0);
}

watch(
    typewriter.reducedMotion,
    (reduced) => {
        if (reduced && activeTimers.size > 0) scheduleStart();
    },
    { flush: "sync" },
);

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
    position: relative;
    display: inline-grid;
    max-width: 100%;
    vertical-align: baseline;
}

.tw-reserve {
    grid-area: 1 / 1;
    min-width: 0;
    visibility: hidden;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    pointer-events: none;
}

.tw-visual {
    position: absolute;
    inset: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
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
