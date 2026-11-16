<script setup lang="ts">
// Command's stage: one palette, inline with a query already typed, or opened in a
// dialog from a button.
import { ref } from "vue";
import { Search } from "@lucide/vue";
import { Command, CommandDialog, CommandInput, CommandList } from "@glass/components/command";
import { DialogDescription, DialogTitle } from "@glass/components/dialog";
import { Button } from "@glass/components/button";
import StageSwap from "../../chassis/variants/StageSwap.vue";
import CommandRows from "./_parts/CommandRows.vue";

withDefaults(defineProps<{ mode?: "inline" | "dialog" }>(), { mode: "inline" });

const inlineQuery = ref("se");
const dialogQuery = ref("");
const dialogOpen = ref(false);
</script>

<template>
    <div class="command-stage">
        <StageSwap :swap-key="mode" class="command-stage-swap">
            <Command v-if="mode === 'inline'" class="glass-floating">
                <CommandInput
                    v-model="inlineQuery"
                    placeholder="Type a command"
                    aria-label="Search commands"
                />
                <CommandList class="command-stage-list">
                    <CommandRows :query="inlineQuery" />
                </CommandList>
            </Command>

            <div v-else class="command-stage-trigger">
                <Button emphasis="primary" @click="dialogOpen = true">
                    <Search aria-hidden="true" />
                    Search commands
                </Button>
                <CommandDialog v-model:open="dialogOpen">
                    <DialogTitle class="sr-only">Commands</DialogTitle>
                    <DialogDescription class="sr-only">Search and run a command.</DialogDescription>
                    <CommandInput
                        v-model="dialogQuery"
                        placeholder="Type a command"
                        aria-label="Search commands"
                    />
                    <CommandList>
                        <CommandRows :query="dialogQuery" @run="dialogOpen = false" />
                    </CommandList>
                </CommandDialog>
            </div>
        </StageSwap>
    </div>
</template>

<style scoped>
.command-stage {
    display: flex;
    justify-content: center;
    block-size: 100%;
    padding: var(--sp-6) var(--sp-4);
}
.command-stage-swap {
    inline-size: min(100%, 32rem);
    align-self: flex-start;
}
.command-stage-list {
    max-block-size: 20rem;
}
.command-stage-trigger {
    display: grid;
    place-items: center;
    min-block-size: 20rem;
}
</style>
