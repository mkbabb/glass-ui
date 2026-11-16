<script setup lang="ts">
// Atoms' stage: the four small parts together, one row each.
import { Avatar, AvatarFallback } from "@glass/components/avatar";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { Separator } from "@glass/components/separator";
import { StatusDot, type StatusDotState } from "@glass/components/status-dot";

const STATES: readonly StatusDotState[] = [
    "active",
    "idle",
    "online",
    "success",
    "warning",
    "error",
    "unknown",
];
const PEOPLE = [
    { name: "Ada Lovelace", initials: "AL", size: "sm" },
    { name: "Alan Turing", initials: "AT", size: "sm" },
    { name: "Grace Hopper", initials: "GH", size: "md" },
] as const;
</script>

<template>
    <div class="atoms-stage">
        <div class="atoms-row">
            <Avatar v-for="p in PEOPLE" :key="p.name" :label="p.name" :size="p.size">
                <AvatarFallback>{{ p.initials }}</AvatarFallback>
            </Avatar>
            <Avatar label="Claude Shannon" size="md">
                <AvatarFallback>CS</AvatarFallback>
                <template #status>
                    <StatusDot state="online" size="md" label="Online" />
                </template>
            </Avatar>
        </div>

        <div class="atoms-row">
            <StatusDot v-for="s in STATES" :key="s" :state="s" size="lg" :label="s" />
        </div>

        <Separator label="or" class="atoms-separator" />

        <div class="atoms-row">
            <DarkModeToggle size="sm" />
            <DarkModeToggle size="md" />
            <DarkModeToggle size="lg" />
        </div>
    </div>
</template>

<style scoped>
.atoms-stage {
    display: grid;
    justify-items: center;
    gap: var(--sp-5);
    inline-size: min(100cqi, 28rem);
}
.atoms-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--sp-4);
}
.atoms-separator {
    inline-size: 100%;
}
</style>
