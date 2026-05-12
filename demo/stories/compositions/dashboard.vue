<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ArrowDownRight, ArrowUpRight, Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-vue-next";
import { Badge } from "../../../src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../src/components/ui/table";
import { DockGroup } from "../../../src/components/custom/dock-group";
import { MetricBadge } from "../../../src/components/custom/metric-badge";
import { cn } from "../../../src/utils/cn";

type Trend = "up" | "down" | "flat";

interface Metric {
    label: string;
    value: string;
    delta: string;
    trend: Trend;
    section: number;
}

const metrics: Metric[] = [
    { label: "Active", value: "42", delta: "+6 wk", trend: "up", section: 0 },
    { label: "Reqs/min", value: "1.2k", delta: "+18%", trend: "up", section: 3 },
    { label: "p95", value: "128ms", delta: "−12ms", trend: "down", section: 5 },
    { label: "Error rate", value: "0.04%", delta: "flat", trend: "flat", section: 8 },
];

const sidebarStatus = [
    { label: "Production", state: "Healthy", section: 4, icon: CheckCircle2 },
    { label: "Staging", state: "Degraded", section: 1, icon: AlertTriangle },
    { label: "Edge", state: "Healthy", section: 6, icon: CheckCircle2 },
    { label: "Workers", state: "Idle", section: 9, icon: Clock },
];

const rows = [
    { id: "PRJ-1042", name: "Chebyshev viewer", owner: "m. babb", status: "Active", section: 5 },
    { id: "PRJ-1037", name: "BBNF playground", owner: "s. chen", status: "Paused", section: 1 },
    { id: "PRJ-1028", name: "Fourier sandbox", owner: "a. okoye", status: "Active", section: 3 },
    { id: "PRJ-1019", name: "Words frontend", owner: "m. babb", status: "Active", section: 7 },
    { id: "PRJ-1007", name: "Glass-UI demo", owner: "m. babb", status: "Review", section: 9 },
];

const timeline = [
    { time: "09:42", text: "Deploy of fourier-sandbox@1.4.2 succeeded", section: 3 },
    { time: "09:18", text: "Alert: p95 latency spiked to 240ms for 2 minutes", section: 1 },
    { time: "08:55", text: "m. babb merged #482 — tokens: warm cream", section: 5 },
    { time: "08:12", text: "Nightly build passed all 1,248 tests", section: 7 },
    { time: "07:30", text: "Edge worker rotation completed", section: 9 },
];

const statusTone: Record<string, string> = {
    Active: "default",
    Paused: "secondary",
    Review: "outline",
};

const trendClasses: Record<Trend, string> = {
    up: "text-emerald-600",
    down: "text-sky-600",
    flat: "text-muted-foreground",
};
</script>

<template>
    <StoryPage>
        <div class="grid gap-[calc(1.5rem_+_var(--density-gap,0rem))] lg:grid-cols-[16rem_1fr_18rem]">
            <aside class="flex flex-col gap-[calc(0.75rem_+_var(--density-gap,0rem))]">
                <span class="text-admin-label section-label">System</span>
                <Card class="border-2 border-foreground/10">
                    <CardContent class="flex flex-col divide-y divide-border/50 p-0">
                        <div
                            v-for="item in sidebarStatus"
                            :key="item.label"
                            class="flex items-center gap-3 px-4 py-3"
                        >
                            <span
                                class="inline-block size-2 rounded-full"
                                :style="{
                                    backgroundColor: `var(--section-color-${item.section}, currentColor)`,
                                }"
                                aria-hidden="true"
                            />
                            <span class="text-small flex-1">{{ item.label }}</span>
                            <span class="text-mono-caption">{{ item.state }}</span>
                        </div>
                    </CardContent>
                </Card>
            </aside>

            <main class="flex flex-col gap-[calc(1.5rem_+_var(--density-gap,0rem))]">
                <!-- KPI strip — DockGroup pill-row shelf for compact metric clusters. -->
                <DockGroup density="comfortable" class="self-start">
                    <MetricBadge :amount="42" unit="active" size="md" />
                    <MetricBadge :amount="1.2" unit="k r/min" size="md" />
                    <MetricBadge :amount="128" unit="ms p95" size="md" />
                    <MetricBadge :amount="0.04" unit="% err" size="md" />
                </DockGroup>

                <div class="grid grid-cols-2 gap-[calc(1rem_+_var(--density-gap,0rem))] 2xl:grid-cols-4">
                    <Card
                        v-for="metric in metrics"
                        :key="metric.label"
                        class="min-w-0 border-2 border-foreground/10 transition-transform hover:-translate-x-px hover:-translate-y-px"
                    >
                        <CardHeader class="pb-2">
                            <CardTitle
                                class="text-admin-label section-label"
                                :style="{
                                    color: `var(--section-color-${metric.section}, var(--muted-foreground))`,
                                }"
                            >
                                {{ metric.label }}
                            </CardTitle>
                        </CardHeader>
                        <CardContent class="flex items-end justify-between pt-0">
                            <span class="text-display font-display tabular-nums">
                                {{ metric.value }}
                            </span>
                            <Badge
                                variant="secondary"
                                :class="cn('gap-1 fira-code', trendClasses[metric.trend])"
                            >
                                <ArrowUpRight
                                    v-if="metric.trend === 'up'"
                                    class="size-3"
                                    aria-hidden="true"
                                />
                                <ArrowDownRight
                                    v-else-if="metric.trend === 'down'"
                                    class="size-3"
                                    aria-hidden="true"
                                />
                                <span>{{ metric.delta }}</span>
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                <Card class="border-2 border-foreground/10">
                    <CardHeader>
                        <CardTitle class="text-heading">Recent projects</CardTitle>
                    </CardHeader>
                    <CardContent class="pt-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead class="w-28">ID</TableHead>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead class="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="row in rows" :key="row.id">
                                    <TableCell class="fira-code text-small">
                                        {{ row.id }}
                                    </TableCell>
                                    <TableCell class="flex items-center gap-2">
                                        <span
                                            class="inline-block size-2 rounded-full"
                                            :style="{
                                                backgroundColor: `var(--section-color-${row.section}, currentColor)`,
                                            }"
                                            aria-hidden="true"
                                        />
                                        <span>{{ row.name }}</span>
                                    </TableCell>
                                    <TableCell class="text-muted-foreground">
                                        {{ row.owner }}
                                    </TableCell>
                                    <TableCell class="text-right">
                                        <Badge
                                            :variant="(statusTone[row.status] as 'default' | 'secondary' | 'outline') ?? 'secondary'"
                                        >
                                            {{ row.status }}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>

            <aside class="flex flex-col gap-[calc(0.75rem_+_var(--density-gap,0rem))]">
                <span class="text-admin-label section-label flex items-center gap-2">
                    <Activity class="size-3" aria-hidden="true" /> Activity
                </span>
                <Card class="border-2 border-foreground/10">
                    <CardContent class="p-[calc(1.25rem_+_var(--density-pad,0rem))]">
                        <ol class="flex flex-col gap-[calc(1rem_+_var(--density-gap,0rem))]">
                            <li
                                v-for="event in timeline"
                                :key="event.time"
                                class="flex gap-3"
                            >
                                <span
                                    class="mt-1.5 inline-block size-1.5 shrink-0 rounded-full"
                                    :style="{
                                        backgroundColor: `var(--section-color-${event.section}, currentColor)`,
                                    }"
                                    aria-hidden="true"
                                />
                                <div class="flex flex-col gap-1">
                                    <span class="fira-code text-xs text-muted-foreground">
                                        {{ event.time }}
                                    </span>
                                    <span class="text-small leading-snug">{{ event.text }}</span>
                                </div>
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            </aside>
        </div>
    </StoryPage>
</template>
