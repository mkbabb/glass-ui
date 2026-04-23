<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

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
    <section class="flex flex-col gap-12">
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
                        Recent invoices · hover a row for the interactive-item treatment.
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
                        <TableRow
                            v-for="row in rows"
                            :key="row.id"
                            class="interactive-item cursor-pointer"
                        >
                            <TableCell class="font-mono-code text-mono-code">{{ row.id }}</TableCell>
                            <TableCell class="font-medium">{{ row.customer }}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    :class="cn('capitalize', statusTone(row.status))"
                                >
                                    {{ row.status }}
                                </Badge>
                            </TableCell>
                            <TableCell class="text-muted-foreground">{{ row.method }}</TableCell>
                            <TableCell class="text-right font-mono-code">{{ fmt(row.amount) }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div
                    class="flex items-center justify-between border-t border-border px-4 py-3 text-small"
                >
                    <span class="text-muted-foreground">{{ rows.length }} invoices</span>
                    <span class="font-mono-code">Total · {{ fmt(total) }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
