<script setup lang="ts">
// ExpandableContainer's stage: one panel of readings that sits in place or fills the
// screen. Its corner button and the page's switch drive the same open state.
import { ExpandableContainer } from "@glass/components/expandable-container";
import { Surface } from "@glass/components/surface";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@glass/components/table";

const open = defineModel<boolean>("open", { default: false });

const ROWS = [
    { station: "Asheville", temp: "14 °C", wind: "9 km/h" },
    { station: "Boone", temp: "11 °C", wind: "17 km/h" },
    { station: "Durham", temp: "19 °C", wind: "6 km/h" },
    { station: "Raleigh", temp: "20 °C", wind: "8 km/h" },
    { station: "Wilmington", temp: "22 °C", wind: "21 km/h" },
];
</script>

<template>
    <div class="expandable-stage">
        <ExpandableContainer v-model:open="open" class="expandable-stage-box">
            <Surface tier="floating" class="expandable-stage-panel">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Station</TableHead>
                            <TableHead>Temperature</TableHead>
                            <TableHead>Wind</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="row in ROWS" :key="row.station">
                            <TableCell>{{ row.station }}</TableCell>
                            <TableCell>{{ row.temp }}</TableCell>
                            <TableCell>{{ row.wind }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Surface>
        </ExpandableContainer>
    </div>
</template>

<style scoped>
.expandable-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-4);
}
.expandable-stage-box {
    inline-size: min(100%, 40rem);
}
.expandable-stage-panel {
    padding: var(--sp-4);
    padding-block-start: var(--sp-6);
}
</style>
