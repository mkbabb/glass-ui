<script setup lang="ts">
// The witness page: one mode per load. ?am=<mode>&w=<host width>&h=<host height>.
//   sticky  a 2,897 px DataTable (20 columns, 120 rows) in a host region with its own
//           scroller, as atlas's data view holds it (w=1202 at 1440, w=344 at 390)
//   fit     the same table with `fit`: the folded keys land on window.__amFold
//   cards   a responsive DataTable in a 344 px host: the card projection, with a caption
//           and a row-header column; role=grid gives it a roving row
//   vcards  300 rows of 20 columns as cards in a 344 x 600 host, virtualized with atlas's
//           own useVirtualWindow (atlas/, copied) through `viewportRef` and `rowRef`, with
//           atlas's row attrs and the note's two rules, and an 8 px gap in the virtualizer
//   dialog  a button (ox, oy) that opens a Dialog grown from it. heavy=1 gives the plate
//           atlas's size and a body that mounts 100 ms after the open with a 90 ms task,
//           and adds a 120 ms task 250 ms into the open and 40 ms into the close.
//           deep=1 opens it from window.__amOpenDeep() with no origin, as a deep link does.
// window.__amBound holds the largest step one 60 Hz frame can make on each clock the
// Dialog rides, computed from glass's own rows. Columns are sized by class as well as by
// `width`, so 11.1.1, which has no `width`, lays out the same 2,897 px table. Copied into
// <tree>/demo/__am/ by build-tree.sh.
import { computed, defineAsyncComponent, defineComponent, h, shallowRef, ref, watch } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { DataTable, type DataTableColumn } from "@glass/components/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@glass/components/dialog";
import { springPreset } from "@glass/composables/motion/spring/springPresets";
import { readExitClock } from "@glass/composables/motion/spring/exitClock";
import { motionTempo } from "@glass/composables/motion/core/motionTempo";
import { FRAME_MS } from "@glass/composables/motion/core/constants";
import { useVirtualWindow, type VirtualItem } from "./atlas/useVirtualWindow";

declare global {
    interface Window {
        __amFold?: string[];
        __amViewport?: HTMLElement | null;
        __amViewportCalls?: (string | null)[];
        __amBound?: Record<string, number | null>;
        __amOpenDeep?: () => void;
        __amLongTasks?: { at: number; ms: number }[];
    }
}

const params = new URLSearchParams(window.location.search);
const mode = params.get("am") ?? "sticky";
const hostW = Number(params.get("w") ?? "1202");
const hostH = Number(params.get("h") ?? "480");
const grid = params.get("role") === "grid";
const ox = Number(params.get("ox") ?? "40");
const oy = Number(params.get("oy") ?? "60");
const heavy = params.get("heavy") === "1";

const wide = mode === "sticky" || mode === "fit" || mode === "vcards";
const keys = wide
    ? ["name", ...Array.from({ length: 19 }, (_, i) => `m${i + 1}`)]
    : ["name", "region", "students", "funded", "share"];
const labels: Record<string, string> = {
    name: "District",
    region: "Region",
    students: "Students",
    funded: "Funded",
    share: "Share",
};
const sized = mode === "sticky" || mode === "fit";
const columns: DataTableColumn[] = keys.map((key, i) => ({
    key,
    label: labels[key] ?? `Measure ${i}`,
    class: sized ? (i === 0 ? "am-lead" : "am-col") : undefined,
    headerClass: sized ? (i === 0 ? "am-lead" : "am-col") : undefined,
    width: sized ? (i === 0 ? "16rem" : "139px") : undefined,
    rowHeader: i === 0,
    align: i === 0 || key === "region" ? "left" : "right",
}));
const rowCount = mode === "vcards" ? 300 : wide ? 120 : 6;
const rows = Array.from({ length: rowCount }, (_, r) => {
    const row: Record<string, unknown> = { _id: `r${r}`, name: `District ${r + 1}` };
    for (let i = 1; i < keys.length; i++) {
        row[keys[i]] = keys[i] === "region" ? ["East", "West", "North"][r % 3] : ((r + 1) * 37 * i) % 10007;
    }
    return row;
});

function onFold(folded: DataTableColumn[]): void {
    window.__amFold = folded.map((col) => col.key);
}
window.__amViewportCalls = [];
function onViewport(el: HTMLElement | null): void {
    window.__amViewport = el;
    window.__amViewportCalls!.push(el ? el.className : null);
}

// ── vcards: atlas's virtualizer over the cards ───────────────────────────────────────
type Row = (typeof rows)[number];
const vViewport = shallowRef<HTMLElement | null>(null);
const virtual = useVirtualWindow<Row, string>({
    items: mode === "vcards" ? rows : [],
    viewport: vViewport,
    key: (row) => row._id as string,
    estimateSize: 42,
    gap: 8,
});
const vRows = computed<VirtualItem<Row, string>[]>(() => [...virtual.items.value]);
const vColumns: DataTableColumn[] = columns.map((col) => ({ ...col, key: `item.${col.key}` }));
const vAttrs = (row: VirtualItem<Row, string>) => ({
    class: "am-vrow",
    "aria-rowindex": row.index + 2,
    style: { transform: `translateY(${row.top}px)` },
});
const vObservers = new Map<string, () => void>();
function vRowRef(element: HTMLElement | null, row: VirtualItem<Row, string>): void {
    vObservers.get(row.key)?.();
    vObservers.delete(row.key);
    if (element) vObservers.set(row.key, virtual.observe(row.key, element));
}
function onVViewport(el: HTMLElement | null): void {
    vViewport.value = el;
    onViewport(el);
}

// ── dialog ───────────────────────────────────────────────────────────────────────────
const open = ref(false);
const opener = shallowRef<HTMLElement | null>(null);
window.__amLongTasks = [];
function busy(ms: number): void {
    const start = performance.now();
    while (performance.now() - start < ms) {
        /* a long task */
    }
    window.__amLongTasks!.push({ at: start, ms: performance.now() - start });
}
function openFrom(event: MouseEvent): void {
    opener.value = event.currentTarget as HTMLElement;
    open.value = true;
}
window.__amOpenDeep = () => {
    opener.value = null;
    open.value = true;
};
watch(open, (now) => {
    if (!heavy) return;
    setTimeout(() => busy(120), now ? 250 : 40);
});
// atlas's async body: it arrives 100 ms after the open and its setup runs a 90 ms task.
const HeavyBody = defineAsyncComponent(
    () =>
        new Promise<ReturnType<typeof defineComponent>>((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        defineComponent({
                            setup() {
                                busy(90);
                                return () => h("p", { class: "am-body" }, "Every district, every year, every measure.");
                            },
                        }),
                    ),
                100,
            ),
        ),
);

// The largest step one 60 Hz frame can make on each clock, as a fraction of the travel:
// the spring a row's entrance rides, stepped from 1 to 0, and the exit clock (and its
// reduced-motion hold) over its eased progress.
function springStep(row: "panel" | "present"): number {
    const { response, dampingFraction } = springPreset(row);
    const spring = new SpringProgress({
        response: response * motionTempo(),
        dampingFraction,
        initial: 1,
        settleThreshold: 1e-3,
        velocitySettleThreshold: 1e-3,
        respectReducedMotion: false,
    });
    spring.target = 0;
    let previous = 1;
    let max = 0;
    for (let i = 0; i < 1200 && !spring.settled; i++) {
        const next = spring.tickDt(FRAME_MS);
        max = Math.max(max, Math.abs(next - previous));
        previous = next;
    }
    return max;
}
function exitStep(row: "panel" | "present", reduced: boolean, stretch = 1): number | null {
    const clock = readExitClock(row, reduced, stretch);
    if (!clock) return null;
    const dk = FRAME_MS / clock.ms;
    let max = 0;
    for (let k = 0; k < 1; k += 0.0005) max = Math.max(max, clock.ease(Math.min(1, k + dk)) - clock.ease(k));
    return max;
}
if (mode === "dialog") {
    // `present` leaves on 1.5 times its exit clock (useSpringMount's MOUNT_EXIT_STRETCH).
    window.__amBound = {
        panel: springStep("panel"),
        present: springStep("present"),
        panelExit: exitStep("panel", false),
        presentExit: exitStep("present", false, 1.5),
        panelReduced: exitStep("panel", true),
        presentReduced: exitStep("present", true, 1.5),
    };
}
</script>

<template>
    <main class="am-page">
        <div
            v-if="mode === 'sticky' || mode === 'fit' || mode === 'cards'"
            id="host"
            :style="{ inlineSize: `${hostW}px`, blockSize: `${hostH}px` }"
        >
            <DataTable
                :columns="columns"
                :rows="rows"
                :fit="mode === 'fit'"
                :responsive="mode === 'cards'"
                :tabbable-row-id="grid ? 'r0' : undefined"
                :viewport-ref="onViewport"
                @fold="onFold"
            >
                <template v-if="mode === 'cards'" #caption>Schools by district</template>
            </DataTable>
        </div>

        <div
            v-if="mode === 'vcards'"
            id="host"
            class="am-v"
            :style="{ inlineSize: `${hostW}px`, blockSize: `${hostH}px` }"
        >
            <DataTable
                :style="{ '--source-total-size': `${virtual.totalSize.value}px` }"
                :columns="vColumns"
                :rows="vRows"
                role="grid"
                aria-label="Every district"
                :aria-row-count="virtual.ariaRowCount.value + 1"
                :get-row-id="(row: VirtualItem<Row, string>) => row.key"
                :get-row-attrs="vAttrs"
                :row-ref="vRowRef"
                :viewport-ref="onVViewport"
                responsive
            />
        </div>

        <template v-if="mode === 'dialog'">
            <button
                id="opener"
                type="button"
                class="am-opener"
                :style="{ left: `${ox}px`, top: `${oy}px` }"
                @click="openFrom"
            >
                Open the data
            </button>
            <Dialog :open="open" :origin="opener" @update:open="(v: boolean) => (open = v)">
                <DialogContent :class="heavy ? 'am-dialog am-room' : 'am-dialog'">
                    <DialogHeader>
                        <DialogTitle>The rows behind the figure</DialogTitle>
                        <DialogDescription>Every district, every year.</DialogDescription>
                    </DialogHeader>
                    <HeavyBody v-if="heavy" />
                    <p v-else>
                        A plate tall enough to read as a room: it grows from the button that
                        opened it and returns there when it closes.
                    </p>
                </DialogContent>
            </Dialog>
        </template>
    </main>
</template>

<style>
.am-page {
    padding: 16px;
}
#host {
    overflow: auto;
}
.am-lead {
    inline-size: 16rem;
    min-inline-size: 16rem;
    white-space: nowrap;
}
.am-col {
    inline-size: 139px;
    min-inline-size: 139px;
    white-space: nowrap;
}
.am-opener {
    position: fixed;
    inline-size: 160px;
    block-size: 40px;
    border: 1px solid currentColor;
    border-radius: 8px;
    background: transparent;
}
.am-dialog p {
    margin: 0;
}
/* atlas's data view plate (DataDialog.vue, .data-dialog--dialog) */
.am-room {
    inline-size: min(1248px, 100vw - 96px);
    block-size: min(828px, 100dvh - 72px);
    max-inline-size: none;
}
/* The note's two rules for virtualized cards (step 5), atlas's row rule on the cards. */
.am-v .data-table-card-list {
    position: relative;
    block-size: var(--source-total-size);
}
.am-v .am-vrow {
    position: absolute;
    inset-block-start: 0;
    inline-size: 100%;
}
</style>
