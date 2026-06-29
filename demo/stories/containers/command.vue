<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import {
    FileText, Settings, User, Palette, Moon, Sun, Search, Plus,
    GitBranch, Package, Command as CommandIcon, TerminalSquare,
} from "@lucide/vue";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@glass/components/ui/command";
import { IconChip } from "@glass/components/custom/icon-chip";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const selected = ref<string | null>(null);
const query = ref("");

type CommandRow = { id: string; label: string; icon: any; shortcut?: string };

const files: CommandRow[] = [
    { id: "file:readme", label: "README.md", icon: FileText },
    { id: "file:design", label: "DESIGN.md", icon: FileText },
    { id: "file:tokens", label: "tokens.css", icon: FileText },
];

const commands: CommandRow[] = [
    { id: "cmd:new", label: "New file", icon: Plus, shortcut: "⌘N" },
    { id: "cmd:search", label: "Search everywhere", icon: Search, shortcut: "⌘K" },
    { id: "cmd:branch", label: "Switch branch", icon: GitBranch, shortcut: "⌘B" },
    { id: "cmd:pkg", label: "Install package", icon: Package },
];

const prefs: CommandRow[] = [
    { id: "pref:theme-light", label: "Light theme", icon: Sun },
    { id: "pref:theme-dark", label: "Dark theme", icon: Moon },
    { id: "pref:palette", label: "Customize palette", icon: Palette },
    { id: "pref:account", label: "Account settings", icon: User, shortcut: "⌘," },
    { id: "pref:general", label: "General settings", icon: Settings },
];

function pick(id: string) {
    selected.value = id;
}
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="TerminalSquare" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Command
                </span>
                <p class="text-small text-muted-foreground">
                    A command-palette picker — the container identity is the ONE
                    color event.
                </p>
            </div>
        </header>

        <StorySection heading="Inline palette" gap="md">
            <p class="text-sm text-muted-foreground">
                The Command element embeds inline here; in practice you'd wrap it in a
                <code class="rounded bg-muted px-1">CommandDialog</code> for a ⌘K overlay.
            </p>
            <div class="mx-auto w-full max-w-lg">
                <Command
                    v-model="selected"
                    class="rounded-[var(--radius-card)] border border-border/50 bg-card/70 shadow-lg backdrop-blur"
                >
                    <CommandInput v-model="query" placeholder="Type to search commands, files, settings…" />
                    <CommandList class="max-h-80">
                        <CommandEmpty>
                            <div class="flex flex-col items-center gap-2 py-4">
                                <CommandIcon class="h-6 w-6 opacity-40" />
                                <p>No matches for "{{ query }}"</p>
                                <p class="text-xs text-muted-foreground">try a file name, action, or setting</p>
                            </div>
                        </CommandEmpty>

                        <CommandGroup heading="Files">
                            <CommandItem
                                v-for="f in files"
                                :key="f.id"
                                :value="f.label"
                                @select="pick(f.id)"
                            >
                                <component :is="f.icon" class="mr-2 h-4 w-4 opacity-70" />
                                <span>{{ f.label }}</span>
                            </CommandItem>
                        </CommandGroup>

                        <CommandSeparator />

                        <CommandGroup heading="Commands">
                            <CommandItem
                                v-for="c in commands"
                                :key="c.id"
                                :value="c.label"
                                @select="pick(c.id)"
                            >
                                <component :is="c.icon" class="mr-2 h-4 w-4 opacity-70" />
                                <span>{{ c.label }}</span>
                                <CommandShortcut v-if="c.shortcut">{{ c.shortcut }}</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>

                        <CommandSeparator />

                        <CommandGroup heading="Preferences">
                            <CommandItem
                                v-for="p in prefs"
                                :key="p.id"
                                :value="p.label"
                                @select="pick(p.id)"
                            >
                                <component :is="p.icon" class="mr-2 h-4 w-4 opacity-70" />
                                <span>{{ p.label }}</span>
                                <CommandShortcut v-if="p.shortcut">{{ p.shortcut }}</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>

                <p class="mt-3 text-center text-xs text-muted-foreground">
                    Last picked:
                    <code class="rounded bg-muted px-1.5 py-0.5">{{ selected ?? "—" }}</code>
                </p>
            </div>
        </StorySection>

        <StorySection heading="Anatomy" gap="sm" class="text-sm text-muted-foreground">
            <ul class="list-disc pl-5 space-y-1">
                <li><code class="rounded bg-muted px-1">Command</code> — root, owns the query and selection.</li>
                <li><code class="rounded bg-muted px-1">CommandInput</code> — search box, auto-focuses.</li>
                <li><code class="rounded bg-muted px-1">CommandList</code> + <code class="rounded bg-muted px-1">CommandGroup</code> — virtualized rows with headings.</li>
                <li><code class="rounded bg-muted px-1">CommandEmpty</code> — renders when the filter returns zero.</li>
                <li><code class="rounded bg-muted px-1">CommandShortcut</code> — aligned key glyph at the row's tail.</li>
            </ul>
        </StorySection>
    </StoryPage>
</template>
