<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../../utils";

export interface PipelineNode {
    label: string;
    detail?: string;
    color?: string;
    href?: string;
}

export interface PipelineFlowProps {
    nodes: Array<PipelineNode>;
    /** Layout axis. Default `"vertical"`. */
    orientation?: "vertical" | "horizontal";
    /** Connector style between nodes. Default `"arrow"`. */
    connector?: "arrow" | "line" | "none";
    /** Additional class merged via `cn()`. */
    class?: string;
}

/**
 * <PipelineFlow> — a chain of glass-pill nodes joined by arrow / line / none
 * connectors. Each node is a labeled pill with optional detail copy and
 * click-through (`href` renders `<a>`, otherwise `<div>`). Hover lifts via
 * `--shadow-cartoon-md` on the rendered pill.
 *
 * The component does not own dataset shape — consumers pass `nodes` as a
 * plain array; `color` is wired through `--pipeline-node-accent` so styling
 * can pick it up via canon utilities.
 */
const props = withDefaults(defineProps<PipelineFlowProps>(), {
    orientation: "vertical",
    connector: "arrow",
});

const rootClass = computed(() =>
    cn(
        "pipeline-flow",
        `pipeline-flow--${props.orientation}`,
        `pipeline-flow--connector-${props.connector}`,
        props.class,
    ),
);

const connectorChar = computed(() => {
    if (props.connector === "none") return "";
    if (props.connector === "line") return props.orientation === "vertical" ? "│" : "─";
    return props.orientation === "vertical" ? "↓" : "→";
});
</script>

<template>
    <ol :class="rootClass">
        <template v-for="(node, idx) in nodes" :key="idx">
            <li class="pipeline-flow__item">
                <component
                    :is="node.href ? 'a' : 'div'"
                    :href="node.href"
                    class="pipeline-flow__node glass-default"
                    :style="node.color ? { '--pipeline-node-accent': node.color } : undefined"
                >
                    <span class="pipeline-flow__label">{{ node.label }}</span>
                    <span v-if="node.detail" class="pipeline-flow__detail">
                        {{ node.detail }}
                    </span>
                </component>
            </li>
            <li
                v-if="connector !== 'none' && idx < nodes.length - 1"
                class="pipeline-flow__connector"
                aria-hidden="true"
            >
                {{ connectorChar }}
            </li>
        </template>
    </ol>
</template>

<style scoped>
.pipeline-flow {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: var(--space-phi-1);
}

.pipeline-flow--vertical {
    flex-direction: column;
}

.pipeline-flow--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
}

.pipeline-flow__item {
    display: contents;
}

.pipeline-flow__node {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.125rem;
    padding: var(--space-phi-1) var(--space-phi-2);
    border-radius: var(--radius-xl);
    color: inherit;
    text-decoration: none;
    border-inline-start: 3px solid var(--pipeline-node-accent, var(--accent-color));
    transition:
        box-shadow var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-apple-spring);
}

.pipeline-flow__node:hover {
    box-shadow: var(--shadow-cartoon-md);
    transform: translateY(-1px);
}

a.pipeline-flow__node:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

.pipeline-flow__label {
    font-family: var(--font-display);
    font-size: var(--type-subheading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-snug);
    font-variation-settings: var(--font-display-2-variation-settings);
}

.pipeline-flow__detail {
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    color: var(--muted-foreground);
    line-height: var(--leading-caption);
}

.pipeline-flow__connector {
    color: color-mix(in srgb, var(--foreground) 35%, transparent);
    font-family: var(--font-mono);
    font-size: var(--type-prose);
    line-height: 1;
    user-select: none;
}

.pipeline-flow--connector-line .pipeline-flow__connector {
    color: var(--border);
}

.pipeline-flow--horizontal .pipeline-flow__node {
    border-inline-start: none;
    border-block-end: 3px solid var(--pipeline-node-accent, var(--accent-color));
}
</style>
