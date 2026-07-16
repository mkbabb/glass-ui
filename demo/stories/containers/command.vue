<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref, type Component } from "vue";
import {
    FileText,
    Settings,
    User,
    Palette,
    Moon,
    Sun,
    Search,
    Plus,
    GitBranch,
    Package,
    Command as CommandIcon,
} from "@lucide/vue";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@glass/components/command";
import { Button } from "@glass/components/button";
import { DialogDescription, DialogTitle } from "@glass/components/dialog";


const selected = ref<string | null>(null);
const query = ref("");
const dialogQuery = ref("");
const dialogOpen = ref(false);

type CommandRow = {
    id: string;
    label: string;
    icon: Component;
    shortcut?: string;
    disabled?: boolean;
};
type CommandGroupRows = { heading: string; rows: CommandRow[] };

const commandGroups: CommandGroupRows[] = [
    {
        heading: "Files",
        rows: [
            { id: "file:readme", label: "README.md", icon: FileText },
            { id: "file:design", label: "DESIGN.md", icon: FileText },
            { id: "file:tokens", label: "tokens.css", icon: FileText },
        ],
    },
    {
        heading: "Commands",
        rows: [
            { id: "cmd:new", label: "New file", icon: Plus, shortcut: "⌘N" },
            {
                id: "cmd:search",
                label: "Search everywhere",
                icon: Search,
                shortcut: "⌘K",
            },
            {
                id: "cmd:branch",
                label: "Switch branch",
                icon: GitBranch,
                shortcut: "⌘B",
            },
            { id: "cmd:pkg", label: "Install package", icon: Package },
            {
                id: "cmd:publish",
                label: "Publish release (unavailable)",
                icon: Package,
                disabled: true,
            },
        ],
    },
    {
        heading: "Preferences",
        rows: [
            { id: "pref:theme-light", label: "Light theme", icon: Sun },
            { id: "pref:theme-dark", label: "Dark theme", icon: Moon },
            { id: "pref:palette", label: "Customize palette", icon: Palette },
            {
                id: "pref:account",
                label: "Account settings",
                icon: User,
                shortcut: "⌘,",
            },
            { id: "pref:general", label: "General settings", icon: Settings },
        ],
    },
];

function execute(id: string, closeDialog = false) {
    selected.value = id;
    if (closeDialog) dialogOpen.value = false;
}
</script>

<template>
    <StoryPage>

        <StorySection heading="Inline palette" gap="md">
            <p class="text-sm text-muted-foreground">
                Search the collection in place; selection is shared with the focused
                dialog below.
            </p>
            <div class="mx-auto w-full max-w-lg">
                <Command
                    v-model="selected"
                    :open="!dialogOpen"
                    class="rounded-[var(--radius-card)] border border-border/50 bg-card/70 shadow-lg backdrop-blur"
                >
                    <CommandInput
                        v-model="query"
                        placeholder="Type to search commands, files, settings…"
                        aria-label="Search inline commands"
                    />
                    <CommandList class="max-h-80">
                        <CommandEmpty>
                            <div class="flex flex-col items-center gap-2 py-4">
                                <CommandIcon class="h-6 w-6 opacity-40" />
                                <p>No matches for "{{ query }}"</p>
                                <p class="text-xs text-muted-foreground">
                                    try a file name, action, or setting
                                </p>
                            </div>
                        </CommandEmpty>

                        <template
                            v-for="(group, index) in commandGroups"
                            :key="group.heading"
                        >
                            <CommandSeparator v-if="index" />
                            <CommandGroup :heading="group.heading">
                                <CommandItem
                                    v-for="row in group.rows"
                                    :key="row.id"
                                    :value="row.id"
                                    :text-value="row.label"
                                    :disabled="row.disabled"
                                    @select="execute(row.id)"
                                >
                                    <component
                                        :is="row.icon"
                                        class="mr-2 h-4 w-4 opacity-70"
                                    />
                                    <span>{{ row.label }}</span>
                                    <CommandShortcut v-if="row.shortcut">{{
                                        row.shortcut
                                    }}</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </template>
                    </CommandList>
                </Command>

                <p class="mt-3 text-center text-xs text-muted-foreground">
                    Last picked:
                    <code class="rounded bg-muted px-1.5 py-0.5">{{
                        selected ?? "—"
                    }}</code>
                </p>
            </div>
        </StorySection>

        <StorySection heading="Dialog palette" gap="md">
            <div
                class="mx-auto flex w-full max-w-lg items-center justify-between gap-4"
            >
                <p class="max-w-sm text-sm text-muted-foreground">
                    Open the same commands in a modal search surface. Escape dismisses
                    it and returns focus here.
                </p>
                <Button class="shrink-0" @click="dialogOpen = true">
                    <Search />
                    Open palette
                </Button>
            </div>

            <CommandDialog v-model="selected" v-model:open="dialogOpen">
                <DialogTitle class="sr-only">Command palette</DialogTitle>
                <DialogDescription class="sr-only"
                    >Search and run a command.</DialogDescription
                >
                <CommandInput
                    v-model="dialogQuery"
                    placeholder="Search commands, files, settings…"
                    aria-label="Search dialog commands"
                />
                <CommandList>
                    <CommandEmpty>
                        <div class="flex flex-col items-center gap-2 py-4">
                            <CommandIcon class="h-6 w-6 opacity-40" />
                            <p>No matches for "{{ dialogQuery }}"</p>
                        </div>
                    </CommandEmpty>

                    <template
                        v-for="(group, index) in commandGroups"
                        :key="group.heading"
                    >
                        <CommandSeparator v-if="index" />
                        <CommandGroup :heading="group.heading">
                            <CommandItem
                                v-for="row in group.rows"
                                :key="row.id"
                                :value="row.id"
                                :text-value="row.label"
                                :disabled="row.disabled"
                                @select="execute(row.id, true)"
                            >
                                <component
                                    :is="row.icon"
                                    class="mr-2 h-4 w-4 opacity-70"
                                />
                                <span>{{ row.label }}</span>
                                <CommandShortcut v-if="row.shortcut">{{
                                    row.shortcut
                                }}</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </template>
                </CommandList>
            </CommandDialog>
        </StorySection>

        <StorySection heading="Anatomy" gap="sm" class="text-sm text-muted-foreground">
            <ul class="list-disc pl-5 space-y-1">
                <li>
                    <code class="rounded bg-muted px-1">Command</code> — root, owns the
                    query and selection.
                </li>
                <li>
                    <code class="rounded bg-muted px-1">CommandInput</code> — search
                    box; Dialog owns its modal focus.
                </li>
                <li>
                    <code class="rounded bg-muted px-1">CommandList</code> +
                    <code class="rounded bg-muted px-1">CommandGroup</code> —
                    filtered rows with headings.
                </li>
                <li>
                    <code class="rounded bg-muted px-1">CommandEmpty</code> — renders
                    when the filter returns zero.
                </li>
                <li>
                    <code class="rounded bg-muted px-1">CommandShortcut</code> — aligned
                    key glyph at the row's tail.
                </li>
                <li>
                    <code class="rounded bg-muted px-1">CommandDialog</code> — the same
                    command model inside Dialog's modal and focus lifecycle.
                </li>
            </ul>
        </StorySection>
    </StoryPage>
</template>
