<script setup lang="ts">
import { toRef } from "vue";
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { SortableList, SortableItem } from "@/components/custom/sortable-list";
import type { AuroraConfig } from "@/components/custom/aurora";
import { MAX_STOPS } from "@/components/custom/aurora";
import OklchStopRow from "../OklchStopRow.vue";
import { usePaletteStops } from "./usePaletteStops";

const props = defineProps<{
    config: AuroraConfig;
}>();

const {
    canAddStop,
    stopsWithIds,
    stopRefId,
    updateStop,
    removeStop,
    addStop,
    onPaletteReorder,
} = usePaletteStops(toRef(props, "config"));
</script>

<template>
    <div class="flex min-w-[320px] flex-col gap-2 p-3">
        <div class="flex items-center justify-between">
            <p class="text-admin-label text-muted-foreground">
                Stops ({{ config.palette.length }}/{{ MAX_STOPS }})
            </p>
            <Button
                variant="glass"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                :disabled="!canAddStop"
                @click="addStop"
            >
                <Plus :size="12" />
                Stop
            </Button>
        </div>
        <SortableList
            :items="stopsWithIds"
            :get-id="stopRefId"
            class="flex flex-col gap-2"
            @reorder="onPaletteReorder"
        >
            <SortableItem
                v-for="(item, i) in stopsWithIds"
                :key="item.sid"
                :id="item.sid"
                as="div"
            >
                <OklchStopRow
                    :stop="item.stop"
                    :index="i"
                    :removable="config.palette.length > 2"
                    @update="(next) => updateStop(i, next)"
                    @remove="removeStop(i)"
                />
            </SortableItem>
        </SortableList>
    </div>
</template>
