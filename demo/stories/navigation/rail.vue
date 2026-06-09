<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Compass,
    Shapes,
    Boxes,
    Database,
    Bell,
    Sparkles,
    LayoutDashboard,
    Navigation as NavigationIcon,
} from "@lucide/vue";
import { DockIconButton, GlassDock } from "../../../src/components/custom/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../src/components/ui/tooltip";
import { cn } from "../../../src/utils/cn";

interface Entry {
    id: string;
    label: string;
    icon: typeof Compass;
}

const entries: Entry[] = [
    { id: "foundations", label: "Foundations", icon: Compass },
    { id: "primitives", label: "Primitives", icon: Shapes },
    { id: "containers", label: "Containers", icon: Boxes },
    { id: "navigation", label: "Navigation", icon: NavigationIcon },
    { id: "data", label: "Data", icon: Database },
    { id: "feedback", label: "Feedback", icon: Bell },
    { id: "motion", label: "Motion", icon: Sparkles },
    { id: "compositions", label: "Compositions", icon: LayoutDashboard },
];

const active = ref<string>("primitives");
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Default pill</h2>
            <p class="text-small text-muted-foreground">
                Vertical <code class="rounded bg-muted px-1">GlassDock</code> rail variant hosts any children — icon
                buttons, separators, brand marks. It uses the dock surface tokens by default.
            </p>
            <div class="flex justify-start">
                <GlassDock variant="rail" aria-label="Example dock rail">
                    <Tooltip v-for="e in entries" :key="e.id">
                        <TooltipTrigger as-child>
                            <DockIconButton
                                type="button"
                                :aria-current="active === e.id ? 'page' : undefined"
                                :class="
                                    cn(
                                        'text-muted-foreground',
                                        active === e.id && 'bg-foreground/10 text-foreground',
                                    )
                                "
                                @click="active = e.id"
                            >
                                <component :is="e.icon" />
                                <span class="sr-only">{{ e.label }}</span>
                            </DockIconButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">{{ e.label }}</TooltipContent>
                    </Tooltip>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-subheading">Rounded shape</h2>
            <p class="text-small text-muted-foreground">
                Consumers can switch to rectangular corners via
                <code class="rounded bg-muted px-1">shape="rounded"</code> when the dock hosts a
                tool palette rather than a category nav.
            </p>
            <div class="flex justify-start">
                <GlassDock variant="rail" shape="rounded" aria-label="Rounded dock rail">
                    <DockIconButton
                        v-for="e in entries.slice(0, 4)"
                        :key="e.id"
                        type="button"
                        class="text-muted-foreground"
                        :aria-label="e.label"
                    >
                        <component :is="e.icon" />
                    </DockIconButton>
                </GlassDock>
            </div>
        </section>
    </StoryPage>
</template>
