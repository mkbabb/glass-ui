<script setup lang="ts">
// Table's stage: six invoices with a status badge each, a caption and a total row.
// The invoice and method columns drop out where the stage is narrow.
import { Badge } from "@glass/components/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@glass/components/table";

type Status = "paid" | "pending" | "overdue";

const ROWS: readonly { id: string; customer: string; status: Status; method: string; amount: number }[] = [
    { id: "1001", customer: "Ada Lovelace", status: "paid", method: "Card", amount: 248 },
    { id: "1002", customer: "Alan Turing", status: "pending", method: "Wire", amount: 1420.5 },
    { id: "1003", customer: "Grace Hopper", status: "paid", method: "Card", amount: 72 },
    { id: "1004", customer: "Edsger Dijkstra", status: "overdue", method: "Transfer", amount: 512.25 },
    { id: "1005", customer: "Claude Shannon", status: "paid", method: "Card", amount: 310 },
    { id: "1006", customer: "Barbara Liskov", status: "pending", method: "Wire", amount: 884 },
];

const TONE = { paid: "success", pending: "warning", overdue: "destructive" } as const;
const LABEL = { paid: "Paid", pending: "Pending", overdue: "Overdue" } as const;

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const total = ROWS.reduce((sum, r) => sum + r.amount, 0);
</script>

<template>
    <div class="table-stage">
        <Table>
            <TableCaption>Recent invoices</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="table-stage-wide">Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead class="table-stage-wide">Method</TableHead>
                    <TableHead class="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row in ROWS" :key="row.id">
                    <TableCell class="table-stage-wide fira-code">{{ row.id }}</TableCell>
                    <TableCell>{{ row.customer }}</TableCell>
                    <TableCell>
                        <Badge :tone="TONE[row.status]">{{ LABEL[row.status] }}</Badge>
                    </TableCell>
                    <TableCell class="table-stage-wide">{{ row.method }}</TableCell>
                    <TableCell class="text-right fira-code">{{ money.format(row.amount) }}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="table-stage-wide" />
                    <TableCell>Total</TableCell>
                    <TableCell />
                    <TableCell class="table-stage-wide" />
                    <TableCell class="text-right fira-code">{{ money.format(total) }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<style scoped>
.table-stage {
    display: grid;
    align-content: center;
    block-size: 100%;
    padding: var(--sp-5);
}

@container (inline-size < 36rem) {
    .table-stage {
        padding: var(--sp-3);
    }
    .table-stage :deep(.table-stage-wide) {
        display: none;
    }
}
</style>
