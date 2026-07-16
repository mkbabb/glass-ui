<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableEmpty,
} from "@glass/components/table";
import { Badge } from "@glass/components/badge";
import { cn } from "@glass/components/_shared/class-names";

// reconcile — the data band's ONE coherent --section-color-9
// double-header shape).

interface Invoice {
    id: string;
    customer: string;
    status: "paid" | "pending" | "overdue";
    method: string;
    amount: number;
}

const rows: Invoice[] = [
    { id: "INV-001", customer: "Ada Lovelace", status: "paid", method: "Card", amount: 248.0 },
    { id: "INV-002", customer: "Alan Turing", status: "pending", method: "Wire", amount: 1420.5 },
    { id: "INV-003", customer: "Grace Hopper", status: "paid", method: "Card", amount: 72.0 },
    { id: "INV-004", customer: "Edsger Dijkstra", status: "overdue", method: "ACH", amount: 512.25 },
    { id: "INV-005", customer: "Claude Shannon", status: "paid", method: "Card", amount: 310.0 },
    { id: "INV-006", customer: "Barbara Liskov", status: "pending", method: "Wire", amount: 884.0 },
];

function statusTone(s: Invoice["status"]): string {
    if (s === "paid") return "bg-section-4/15 text-section-4 border-section-4/30";
    if (s === "pending") return "bg-section-5/15 text-section-5 border-section-5/30";
    return "bg-section-6/15 text-section-6 border-section-6/30";
}

const total = rows.reduce((a, r) => a + r.amount, 0);
const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
</script>

<template>
    <StoryPage>

        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Basic table</p>
            <div
                :class="
                    cn(
                        'overflow-hidden rounded-card border border-border bg-card shadow-cartoon',
                    )
                "
            >
                <Table>
                    <TableCaption class="pb-4 text-mono-caption">
                        Recent invoices with status, payment method, and total.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[120px]">Invoice</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead class="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="row in rows" :key="row.id">
                            <TableCell class="fira-code text-mono-code">{{ row.id }}</TableCell>
                            <TableCell class="font-medium">{{ row.customer }}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    size="md"
                                    :class="cn('capitalize', statusTone(row.status))"
                                >
                                    {{ row.status }}
                                </Badge>
                            </TableCell>
                            <TableCell class="text-muted-foreground">{{ row.method }}</TableCell>
                            <TableCell class="text-right fira-code">{{ fmt(row.amount) }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div
                    class="flex items-center justify-between border-t border-border px-4 py-3 text-small"
                >
                    <span class="text-muted-foreground">{{ rows.length }} invoices</span>
                    <span class="fira-code">Total · {{ fmt(total) }}</span>
                </div>
            </div>
        </div>

        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Empty state — &lt;TableEmpty&gt;
            </p>
            <div class="overflow-hidden rounded-card border border-border bg-card shadow-cartoon">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[120px]">Invoice</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead class="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableEmpty :colspan="4">
                            <span class="text-muted-foreground">
                                No invoices match the current filter.
                            </span>
                        </TableEmpty>
                    </TableBody>
                </Table>
            </div>
        </div>
    </StoryPage>
</template>
