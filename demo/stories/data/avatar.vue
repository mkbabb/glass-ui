<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@glass/components/avatar";
import { Card } from "@glass/components/card";
import { cn } from "@glass/components/_shared/class-names";

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

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
    <StoryPage>
        <StorySection heading="Sizes">
            <Card surface="veil" class="flex items-end gap-6 p-6">
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
            </Card>
        </StorySection>

        <StorySection heading="Shapes, fallbacks, tones">
            <Card surface="veil" class="flex flex-wrap items-center gap-4 p-6">
                <Avatar v-for="p in people" :key="p.id" size="md" shape="circle">
                    <!-- F2.R2 W-DARK-READABILITY-REPAIR (paint re-open): the initials sit
                         on the --section-color ramp whose DARK ARM LIGHTENS the fill (L≈0.72-0.81),
                         so a hardcoded white collapses to WCAG ~1.8-2.8 in dark. The native
                         contrast-color() picks the max-contrast ink per fill on the census
                         engines (Chrome 149 / Safari 26) — the SAME fix F2.R1 shipped for the
                         timeline step-numbers; text-white is the pre-modern base it overrides. -->
                    <AvatarFallback
                        :class="
                            cn(
                                'font-medium text-white',
                            )
                        "
                        :style="{
                            background: `var(--section-color-${p.tone})`,
                            color: `contrast-color(var(--section-color-${p.tone}))`,
                        }"
                    >
                        {{ p.initials }}
                    </AvatarFallback>
                </Avatar>
                <Avatar size="md" shape="square">
                    <AvatarFallback class="bg-muted fira-code text-foreground">
                        ℱ
                    </AvatarFallback>
                </Avatar>
            </Card>
        </StorySection>

        <StorySection
            heading="Contributor group"
            blurb="A compact, static roster preview with an explicit remainder count."
        >
            <Card surface="veil" class="flex items-center gap-6 p-6">
                <ul
                    class="isolate flex items-center"
                    aria-label="Project contributors"
                >
                    <li
                        v-for="(person, index) in people.slice(0, 4)"
                        :key="person.id"
                        :class="index > 0 ? '-ms-2' : ''"
                        :style="{ zIndex: 5 - index }"
                    >
                        <Avatar
                            size="sm"
                            class="h-10 w-10 border-2 border-background"
                        >
                            <!-- F2.R2 W-DARK-READABILITY-REPAIR — per-fill contrast-color() ink
                                 (the dark-arm-lightened --section-color fill washes text-white). -->
                            <AvatarFallback
                                class="text-xs font-medium text-white"
                                :style="{ background: `var(--section-color-${person.tone})`, color: `contrast-color(var(--section-color-${person.tone}))` }"
                            >
                                <span aria-hidden="true">{{ person.initials }}</span>
                                <span class="sr-only">{{ person.name }}</span>
                            </AvatarFallback>
                        </Avatar>
                    </li>
                    <li
                        v-if="people.length > 4"
                        class="relative -ms-1 flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-background bg-muted px-1.5 text-xs font-semibold text-muted-foreground shadow-cartoon-sm"
                    >
                        <span aria-hidden="true">+{{ people.length - 4 }}</span>
                        <span class="sr-only">{{ people.length - 4 }} more contributors</span>
                    </li>
                </ul>
                <div class="flex flex-col">
                    <span class="text-subheading">Project contributors</span>
                    <span class="text-mono-caption text-muted-foreground">
                        4 shown, {{ people.length - 4 }} more
                    </span>
                </div>
            </Card>
        </StorySection>

        <StorySection heading="Roster">
            <ul class="flex flex-col divide-y divide-border rounded-card border border-border bg-card shadow-cartoon">
                <li
                    v-for="p in people.slice(0, 5)"
                    :key="p.id"
                    class="interactive-item flex items-center gap-4 px-4 py-3"
                >
                    <Avatar size="sm">
                        <!-- F2.R2 W-DARK-READABILITY-REPAIR — per-fill contrast-color() ink
                             (the dark-arm-lightened --section-color fill washes text-white). -->
                        <AvatarFallback
                            class="text-xs font-medium text-white"
                            :style="{ background: `var(--section-color-${p.tone})`, color: `contrast-color(var(--section-color-${p.tone}))` }"
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
        </StorySection>
    </StoryPage>
</template>
