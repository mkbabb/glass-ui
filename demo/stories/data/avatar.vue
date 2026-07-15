<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@glass/components/ui/avatar";
import { Card } from "@glass/components/ui/card";
import { StackedIconGroup } from "@glass/components/custom/stacked-icons";
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
            heading="Grouped overlap"
            blurb="StackedIconGroup fans the roster with a +N overflow — hover to spread."
        >
            <Card surface="veil" class="flex items-center gap-6 p-6">
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
                            <!-- F2.R2 W-DARK-READABILITY-REPAIR — per-fill contrast-color() ink
                                 (the dark-arm-lightened --section-color fill washes text-white). -->
                            <AvatarFallback
                                class="text-xs font-medium text-white"
                                :style="{ background: `var(--section-color-${(item as Member).tone})`, color: `contrast-color(var(--section-color-${(item as Member).tone}))` }"
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
