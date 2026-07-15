<script setup lang="ts">
// TokenLadder — three-cell grid (sample · token · resolved-value) over a
// utility ladder. Adopted across 4 foundation pages: typography, radii,
// shadows, motion. Each row is `{cls, label, hint}`; the SFC renders the
// three cells in either stacked (grid-cols-[auto_1fr_auto]) or inline
// (flex-wrap) layout.
import { type HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";

export interface TokenLadderRow {
    /** Utility class to demonstrate (e.g., "text-display-1", "rounded-md"). */
    cls: string;
    /** Token name (e.g., "--type-display-1", "--radius-md"). */
    label: string;
    /** Optional hint/resolved-value caption. */
    hint?: string;
}

interface TokenLadderProps {
    rows: TokenLadderRow[];
    /** stacked (default): aligned grid; inline: flex-wrap chips. */
    layout?: "stacked" | "inline";
    /** Class applied to each sample cell (e.g., "p-6", "size-12"). */
    sampleClass?: string;
    /** Sample slot text — defaults to "Aa" for typography, "" for layout-only ladders. */
    sampleText?: string;
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

withDefaults(defineProps<TokenLadderProps>(), {
    layout: "stacked",
    sampleClass: "",
    sampleText: "Aa",
});
</script>

<template>
    <div
        :class="
            cn(
                layout === 'stacked'
                    ? 'grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-6 gap-y-3'
                    : 'flex flex-wrap items-center gap-3',
                $props.class,
            )
        "
    >
        <template v-for="row in rows" :key="row.label">
            <div :class="cn('min-w-0', row.cls, sampleClass)">
                <slot name="sample" :row="row">{{ sampleText }}</slot>
            </div>
            <code class="fira-code text-mono-caption text-foreground min-w-0 break-all">
                {{ row.label }}
            </code>
            <span class="text-mono-caption text-muted-foreground min-w-0 break-words">
                {{ row.hint ?? "" }}
            </span>
        </template>
    </div>
</template>
