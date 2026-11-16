<script setup lang="ts">
// The palette's rows, ranked by where the query lands in each label (at its start, at
// a word's start, inside a word) and with the matched run marked.
import { computed, type Component } from "vue";
import {
    FilePlus,
    FolderOpen,
    GitBranch,
    Moon,
    Search,
    Settings,
    Sun,
    User,
    X,
} from "@lucide/vue";
import { CommandEmpty, CommandItem, CommandShortcut } from "@glass/components/command";

const props = defineProps<{ query: string }>();
const emit = defineEmits<{ run: [id: string] }>();

interface Row {
    id: string;
    label: string;
    icon: Component;
    keys?: string;
}

const ROWS: Row[] = [
    { id: "new", label: "New file", icon: FilePlus, keys: "⌘N" },
    { id: "open", label: "Open folder", icon: FolderOpen, keys: "⌘O" },
    { id: "search", label: "Search everywhere", icon: Search, keys: "⌘K" },
    { id: "branch", label: "Switch branch", icon: GitBranch },
    { id: "light", label: "Light theme", icon: Sun },
    { id: "dark", label: "Dark theme", icon: Moon },
    { id: "account", label: "Account settings", icon: User, keys: "⌘," },
    { id: "general", label: "General settings", icon: Settings },
    { id: "close", label: "Close tab", icon: X, keys: "⌘W" },
];

function rank(label: string, q: string): { score: number; at: number } | null {
    const at = label.toLowerCase().indexOf(q);
    if (at < 0) return null;
    const score = at === 0 ? 3 : label[at - 1] === " " ? 2 : 1;
    return { score, at };
}

const shown = computed(() => {
    const q = props.query.trim().toLowerCase();
    if (!q) return ROWS.map((row) => ({ row, parts: [{ text: row.label, hit: false }] }));
    return ROWS.flatMap((row) => {
        const r = rank(row.label, q);
        if (!r) return [];
        const end = r.at + q.length;
        const parts = [
            { text: row.label.slice(0, r.at), hit: false },
            { text: row.label.slice(r.at, end), hit: true },
            { text: row.label.slice(end), hit: false },
        ].filter((p) => p.text);
        return [{ row, parts, score: r.score }];
    }).sort((a, b) => b.score - a.score || a.row.label.length - b.row.label.length);
});
</script>

<template>
    <CommandEmpty>No commands match.</CommandEmpty>
    <CommandItem
        v-for="{ row, parts } in shown"
        :key="row.id"
        :value="row.id"
        :text-value="row.label"
        @select="emit('run', row.id)"
    >
        <component :is="row.icon" class="command-row-icon" aria-hidden="true" />
        <span>
            <template v-for="(p, i) in parts" :key="i">
                <mark v-if="p.hit" class="command-row-hit">{{ p.text }}</mark>
                <template v-else>{{ p.text }}</template>
            </template>
        </span>
        <CommandShortcut v-if="row.keys">{{ row.keys }}</CommandShortcut>
    </CommandItem>
</template>

<style scoped>
.command-row-icon {
    inline-size: 1rem;
    block-size: 1rem;
    margin-inline-end: var(--sp-2);
}
.command-row-hit {
    color: inherit;
    background-color: color-mix(in srgb, var(--primary) 22%, transparent);
    border-radius: 0.2em;
}
</style>
