<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Avatar, AvatarFallback, AvatarImage } from "../../../src/components/ui/avatar";
import { StackedIconGroup } from "../../../src/components/custom/stacked-icons";
import { cn } from "../../../src/utils/cn";

interface Member {
    id: string;
    name: string;
    initials: string;
    avatar?: string;
    tone: string; // section-N
}

const people: Member[] = [
    { id: "a", name: "Ada Lovelace",   initials: "AL", tone: "0" },
    { id: "b", name: "Alan Turing",    initials: "AT", tone: "2" },
    { id: "c", name: "Grace Hopper",   initials: "GH", tone: "4" },
    { id: "d", name: "Edsger Dijkstra",initials: "ED", tone: "5" },
    { id: "e", name: "Claude Shannon", initials: "CS", tone: "7" },
    { id: "f", name: "Barbara Liskov", initials: "BL", tone: "8" },
    { id: "g", name: "Donald Knuth",   initials: "DK", tone: "11" },
];

const sizes = ["sm", "base", "lg"] as const;
</script>

<template>
    <StoryPage>
        <!-- SIZES -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Sizes</p>
            <div class="flex items-end gap-6">
                <div v-for="s in sizes" :key="s" class="flex flex-col items-center gap-2">
                    <Avatar :size="s">
                        <AvatarImage
                            src="https://i.pravatar.cc/200?img=32"
                            alt="Sample avatar"
                        />
                        <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <span class="text-mono-caption text-muted-foreground">{{ s }}</span>
                </div>
            </div>
        </div>

        <!-- SHAPES + FALLBACKS -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Shapes · fallbacks · tones</p>
            <div class="flex flex-wrap items-center gap-4">
                <Avatar v-for="p in people" :key="p.id" size="base" shape="circle">
                    <AvatarFallback
                        :class="
                            cn(
                                'font-medium text-white',
                            )
                        "
                        :style="{
                            background: `var(--section-color-${p.tone})`,
                        }"
                    >
                        {{ p.initials }}
                    </AvatarFallback>
                </Avatar>
                <Avatar size="base" shape="square">
                    <AvatarFallback class="bg-muted fira-code text-foreground">
                        ℱ
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>

        <!-- GROUPED OVERLAP via StackedIconGroup -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Grouped · StackedIconGroup with +N overflow
            </p>
            <div
                :class="
                    cn(
                        'flex items-center gap-6 rounded-card border border-border bg-card p-6 shadow-cartoon',
                    )
                "
            >
                <StackedIconGroup
                    :items="people"
                    :max-visible="4"
                    size="lg"
                    :key-fn="(p: Member) => p.id"
                >
                    <template #icon="{ item }">
                        <Avatar
                            size="sm"
                            class="h-10 w-10 border-2 border-background"
                        >
                            <AvatarFallback
                                class="text-xs font-medium text-white"
                                :style="{ background: `var(--section-color-${(item as Member).tone})` }"
                            >
                                {{ (item as Member).initials }}
                            </AvatarFallback>
                        </Avatar>
                    </template>
                </StackedIconGroup>
                <div class="flex flex-col">
                    <span class="text-subheading">Project contributors</span>
                    <span class="text-mono-caption text-muted-foreground">
                        hover to fan out
                    </span>
                </div>
            </div>
        </div>

        <!-- ROSTER -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Roster</p>
            <ul class="flex flex-col divide-y divide-border rounded-card border border-border bg-card shadow-cartoon">
                <li
                    v-for="p in people.slice(0, 5)"
                    :key="p.id"
                    class="interactive-item flex items-center gap-4 px-4 py-3"
                >
                    <Avatar size="sm">
                        <AvatarFallback
                            class="text-xs font-medium text-white"
                            :style="{ background: `var(--section-color-${p.tone})` }"
                        >
                            {{ p.initials }}
                        </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col">
                        <span class="text-small font-medium">{{ p.name }}</span>
                        <span class="text-mono-caption text-muted-foreground">
                            section-{{ p.tone }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </StoryPage>
</template>
