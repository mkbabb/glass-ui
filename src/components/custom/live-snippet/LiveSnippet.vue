<script setup lang="ts">
import { ref, computed } from "vue";
import { cn } from "@/utils/cn";

export interface LiveSnippetProps {
    onRun?: () => Promise<{ result?: unknown; error?: Error }>;
    autoRun?: boolean;
    runLabel?: string;
}

const props = withDefaults(defineProps<LiveSnippetProps>(), {
    autoRun: false,
    runLabel: "Run",
});

type State = "idle" | "pending" | "success" | "error";

const state = ref<State>("idle");
const result = ref<unknown>(null);
const error = ref<Error | null>(null);
const collapsed = ref(false);

async function run() {
    if (!props.onRun) return;
    state.value = "pending";
    error.value = null;
    try {
        const res = await props.onRun();
        if (res.error) {
            state.value = "error";
            error.value = res.error;
        } else {
            state.value = "success";
            result.value = res.result;
        }
    } catch (e) {
        state.value = "error";
        error.value = e instanceof Error ? e : new Error(String(e));
    }
}

if (props.autoRun) run();

const stateClass = computed(() => `live-snippet--${state.value}`);
</script>

<template>
    <div :class="cn('live-snippet', stateClass)">
        <div class="live-snippet__input">
            <slot name="input" />
        </div>

        <div class="live-snippet__controls">
            <slot name="run" :run="run" :state="state">
                <button
                    type="button"
                    class="live-snippet__run-btn"
                    :disabled="state === 'pending'"
                    @click="run"
                >
                    <span v-if="state === 'pending'">Running…</span>
                    <span v-else>{{ runLabel }}</span>
                </button>
            </slot>
            <button
                type="button"
                class="live-snippet__collapse-btn"
                @click="collapsed = !collapsed"
            >
                {{ collapsed ? "Show" : "Hide" }} output
            </button>
        </div>

        <div v-if="!collapsed" class="live-snippet__output">
            <div v-if="state === 'idle'" class="live-snippet__placeholder">
                Press {{ runLabel }} to execute.
            </div>
            <div v-else-if="state === 'pending'" class="live-snippet__pending">
                <span class="live-snippet__pulse">●</span> Running…
            </div>
            <div v-else-if="state === 'error'" class="live-snippet__error">
                {{ error?.message ?? "Unknown error" }}
            </div>
            <div v-else class="live-snippet__success">
                <slot name="output" :result="result">
                    <pre>{{ result }}</pre>
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.live-snippet {
    display: flex;
    flex-direction: column;
    gap: var(--space-phi-2);
    padding: var(--space-phi-3);
    background: color-mix(in srgb, var(--cream-warm) 60%, transparent);
    border: 1px solid var(--cream-edge);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-cartoon-sm);
}

.live-snippet__input {
    font-family: var(--font-mono);
    font-size: var(--type-small);
    line-height: var(--leading-small);
}

.live-snippet__controls {
    display: flex;
    gap: var(--space-phi-2);
    align-items: center;
}

.live-snippet__run-btn {
    padding: 0.5rem 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--cream);
    box-shadow: var(--shadow-cartoon-sm);
    font-family: var(--font-display);
    font-size: var(--type-body);
    cursor: pointer;
    transition: transform var(--duration-fast) var(--ease-apple-spring);
}

.live-snippet__run-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-cartoon-md);
}

.live-snippet__run-btn:active:not(:disabled) {
    transform: scale(0.97);
}

.live-snippet__run-btn:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
}

.live-snippet__collapse-btn {
    padding: 0.25rem 0.5rem;
    border: none;
    background: none;
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    cursor: pointer;
}

.live-snippet__collapse-btn:hover {
    color: var(--foreground);
}

.live-snippet__output {
    padding: var(--space-phi-2);
    background: var(--cream);
    border-radius: var(--radius-md);
    min-height: 3rem;
}

.live-snippet__placeholder,
.live-snippet__pending {
    color: var(--muted-foreground);
    font-style: italic;
}

.live-snippet__error {
    color: var(--accent-red);
    font-family: var(--font-mono);
    font-size: var(--type-small);
}

.live-snippet__success pre {
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--type-small);
    line-height: var(--leading-small);
    overflow-x: auto;
    color: var(--foreground);
}

.live-snippet__pulse {
    animation: shimmer var(--duration-shimmer-fast) ease-in-out infinite;
}
</style>
