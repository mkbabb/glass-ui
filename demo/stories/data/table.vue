<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TableStage from "./table.stage.vue";

const snippet = `<Table>
    <TableCaption>Recent invoices</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead class="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell>Ada Lovelace</TableCell>
            <TableCell class="text-right">$248.00</TableCell>
        </TableRow>
    </TableBody>
</Table>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <TableStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
