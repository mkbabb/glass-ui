<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableEmpty,
} from "@glass/components/ui/table";
import { Badge } from "@glass/components/ui/badge";
import { IconChip } from "@glass/components/custom/icon-chip";
import { cn } from "@glass/utils/cn";
import { Table as TableIcon, Table2 } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the data band's ONE coherent --section-color-9
// identity. PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip>
// double-header shape).
const DATA_STOP = 9;

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
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${DATA_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Table2" :section="DATA_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Data · Table
                </span>
                <p class="text-small text-muted-foreground">
                    Sortable, filterable data tables — the section identity is
                    the ONE color event; the cells stay ink.
                </p>
            </div>
        </header>

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
