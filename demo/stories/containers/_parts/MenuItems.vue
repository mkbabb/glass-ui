<script setup lang="ts">
// The one menu both ways of opening share: actions, a submenu, a choice, a toggle and
// a destructive action.
import { ref } from "vue";
import {
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@glass/components/menu";

const layout = ref<"grid" | "list">("grid");
const rulers = ref(true);
</script>

<template>
    <DropdownMenuContent class="w-60">
        <DropdownMenuItem>
            New file
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>Open recent</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <DropdownMenuItem>atlas.ts</DropdownMenuItem>
                <DropdownMenuItem>colors.css</DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Layout</DropdownMenuLabel>
        <DropdownMenuRadioGroup v-model="layout">
            <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem v-model="rulers">Rulers</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-destructive">
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
    </DropdownMenuContent>
</template>
