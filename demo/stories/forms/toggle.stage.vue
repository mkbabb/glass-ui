<script setup lang="ts">
// Toggle Group's stage: one group where a single option stays pressed.
import { ref } from "vue";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

const view = ref("week");
const VIEWS = ["Day", "Week", "Month", "Year"];
</script>

<template>
    <ToggleGroup v-model="view" type="single" size="lg" aria-label="Calendar view">
        <ToggleGroupItem v-for="v in VIEWS" :key="v" :value="v.toLowerCase()">
            {{ v }}
        </ToggleGroupItem>
    </ToggleGroup>
</template>
