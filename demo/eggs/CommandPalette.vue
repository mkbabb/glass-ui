<script setup lang="ts">
// The ⌘K command palette (E3 — first-class, half affordance / half delight).
// Dogfoods the shipped CommandDialog to fuzzy-navigate every manifest route.
// The shell registers ⌘K/Ctrl+K → toggles `open`; selecting a row router.pushes.
//
// Navigation MUST work under prefers-reduced-motion (only the dialog open/close
// animation is motion-gated, via the shipped dialog grammar) — the palette is an
// affordance, not a gag.
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../src/components/ui/command";
import { CATEGORIES } from "../stories/manifest";

const open = defineModel<boolean>("open", { default: false });

const router = useRouter();
const query = ref("");

// Reset the query each time the palette opens — a fresh search.
watch(open, (v) => {
    if (v) query.value = "";
});

function go(path: string) {
    open.value = false;
    void router.push(path);
}
</script>

<template>
    <CommandDialog v-model:open="open">
        <CommandInput
            v-model="query"
            placeholder="Jump to a story — type a name…"
        />
        <CommandList class="max-h-[60vh]">
            <CommandEmpty>
                <div class="flex flex-col items-center gap-1 py-6 text-sm">
                    <p>No story matches “{{ query }}”.</p>
                    <p class="text-xs text-muted-foreground">
                        Try a component or category name.
                    </p>
                </div>
            </CommandEmpty>

            <CommandGroup
                v-for="category in CATEGORIES"
                :key="category.id"
                :heading="category.title"
            >
                <CommandItem
                    v-for="story in category.stories"
                    :key="`${category.id}/${story.id}`"
                    :value="`${category.title} ${story.title}`"
                    @select="go(`/${category.id}/${story.id}`)"
                >
                    <component
                        :is="category.icon"
                        class="mr-2 h-4 w-4 opacity-60"
                        aria-hidden="true"
                    />
                    <span>{{ story.title }}</span>
                    <span class="ml-auto text-xs text-muted-foreground">
                        {{ category.title }}
                    </span>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </CommandDialog>
</template>
