<script setup lang="ts">
import { computed } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import {
    formatComboParts,
    useRegisteredShortcuts,
    type RegisteredShortcut,
} from "../../../composables/useKeyboardShortcuts";
import { cn } from "../../../utils/cn";

/**
 * <KeyboardShortcutsModal> — orchestrates the global shortcut registry
 * into a grouped table view inside the canonical `<Dialog>` shell.
 *
 * Consumers register shortcuts via `registerShortcut(combo, handler,
 * { label, group })` from `useKeyboardShortcuts.ts`; this modal reads
 * back every labeled shortcut, groups by `options.group`, and renders
 * each combo as a row of `.kbd` chips with the description.
 */
export interface KeyboardShortcutsModalProps {
    /** Open state (v-model). */
    open?: boolean;
    /** Modal title. */
    title?: string;
    /** Modal description shown beneath the title. */
    description?: string;
    /** Optional empty-state copy when no shortcuts are registered. */
    emptyText?: string;
    class?: string;
}

const props = withDefaults(defineProps<KeyboardShortcutsModalProps>(), {
    open: false,
    title: "Keyboard shortcuts",
    description: "Global shortcuts registered in this session.",
    emptyText: "No shortcuts registered.",
});

defineOptions({ name: "KeyboardShortcutsModal" });

const open = defineModel<boolean>("open", { default: false });

const shortcuts = useRegisteredShortcuts();

interface Group {
    name: string;
    items: RegisteredShortcut[];
}

const groups = computed<Group[]>(() => {
    const map = new Map<string, RegisteredShortcut[]>();
    for (const s of shortcuts.value) {
        const key = s.options.group ?? "General";
        const list = map.get(key) ?? [];
        list.push(s);
        map.set(key, list);
    }
    return [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, items]) => ({ name, items }));
});
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent :class="cn('max-w-lg', props.class)">
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription v-if="description">
                    {{ description }}
                </DialogDescription>
            </DialogHeader>

            <div v-if="groups.length === 0" class="text-sm text-muted-foreground">
                {{ emptyText }}
            </div>

            <div v-else class="grid gap-4 max-h-[60vh] overflow-y-auto">
                <section v-for="group in groups" :key="group.name" class="grid gap-2">
                    <h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {{ group.name }}
                    </h3>
                    <ul class="grid gap-1.5">
                        <li
                            v-for="(s, i) in group.items"
                            :key="`${group.name}-${i}-${s.raw}`"
                            class="flex items-center justify-between gap-4 text-sm"
                        >
                            <span class="text-foreground">
                                {{ s.options.label }}
                            </span>
                            <span class="flex items-center gap-1">
                                <kbd
                                    v-for="(part, pi) in formatComboParts(s.raw)"
                                    :key="pi"
                                    class="kbd"
                                >
                                    {{ part }}
                                </kbd>
                            </span>
                        </li>
                    </ul>
                </section>
            </div>
        </DialogContent>
    </Dialog>
</template>
