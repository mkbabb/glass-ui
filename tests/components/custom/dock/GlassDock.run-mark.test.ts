// A navigation run's active mark. A run whose destination carries `aria-current` paints
// ONE selected plate (an inert `.dock-run-mark` element the run renders while marked) and
// moves it between seats on the dock spring; the marked seat stops painting its own
// selected fill. The mark is no seat: the horizontal run's `::before` and `::after` stay
// its reserve boxes, and no seat enumeration counts it. A seat inside its own scroller is
// not on the run's coordinates and keeps its own plate. The glide itself (intermediate
// positions, reduced motion cutting it) is measured in the engines, not here.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";
import { isRunSeat } from "@glass/components/dock/composables/useDockRunMark";

const RUN_CSS = readFileSync(resolve(process.cwd(), "src/components/dock/styles/run.css"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "");

const frame = (): Promise<void> => new Promise((r) => requestAnimationFrame(() => r()));

async function settle(): Promise<void> {
    await nextTick();
    await nextTick();
    await frame();
}

const markOf = (run: Element): Element | null => run.querySelector(":scope > .dock-run-mark");

function navDock(current: { value: number | null }, wrap?: "scroller") {
    const tabs = () =>
        ["A", "B", "C"].map((label, i) =>
            h(
                DockControl,
                { shape: "tab", "aria-current": current.value === i ? "page" : undefined },
                () => label,
            ),
        );
    return mount(GlassDock, {
        props: { collapse: "open" as const },
        slots: {
            default: () => (wrap ? h("div", { style: "overflow-x: auto" }, tabs()) : tabs()),
        },
        attachTo: document.body,
    });
}

describe("the run's active mark", () => {
    it("is drawn while a seat is the run's destination, and only then", async () => {
        const current = ref<number | null>(1);
        const wrapper = navDock(current);
        await settle();
        const run = wrapper.find(".dock-run").element as HTMLElement;
        const mark = markOf(run);
        expect(mark).not.toBeNull();
        expect(mark?.getAttribute("aria-hidden")).toBe("true");
        expect(mark?.hasAttribute("tabindex")).toBe(false);
        for (const prop of ["x", "y", "w", "h", "r"])
            expect(run.style.getPropertyValue(`--dock-run-mark-${prop}`)).toMatch(/px$/);

        current.value = null;
        await settle();
        await new Promise((r) => setTimeout(r, 0));
        await nextTick();
        expect(markOf(run)).toBeNull();
        wrapper.unmount();
    });

    it("takes its first measure in the next frame, not in the mount task", async () => {
        const current = ref<number | null>(1);
        const wrapper = navDock(current);
        await nextTick();
        const run = wrapper.find(".dock-run").element as HTMLElement;
        expect(markOf(run)).toBeNull();
        await frame();
        await nextTick();
        expect(markOf(run)).not.toBeNull();
        wrapper.unmount();
    });

    it("leaves a destination inside its own scroller to paint itself", async () => {
        const current = ref<number | null>(0);
        const wrapper = navDock(current, "scroller");
        await settle();
        expect(markOf(wrapper.find(".dock-run").element)).toBeNull();
        wrapper.unmount();
    });

    it("is one plate on the run, under the seats, and the marked seat paints no plate of its own", () => {
        const mark =
            RUN_CSS.match(/\.glass-dock :where\(\.dock-layers\) > \.dock-run > \.dock-run-mark\s*\{([^}]*)\}/)?.[1] ?? "";
        expect(mark).toMatch(/position:\s*absolute/);
        expect(mark).toMatch(/z-index:\s*-1/);
        expect(mark).toMatch(/pointer-events:\s*none/);
        // Logical offsets: a live change of direction mirrors the mark with the seats.
        expect(mark).toMatch(/inset-inline-start:\s*var\(--dock-run-mark-x\)/);
        expect(mark).toMatch(/inset-block-start:\s*var\(--dock-run-mark-y\)/);
        expect(mark).not.toMatch(/translate:|\bleft:/);
        expect(mark).toMatch(/background:\s*var\(--dock-control-active-bg\)/);
        expect(RUN_CSS).toMatch(
            /\.dock-run:has\(> \.dock-run-mark\) \[aria-current\]:not\(\[aria-current="false"\]\)\s*\{\s*background-color:\s*transparent;\s*box-shadow:\s*none;\s*backdrop-filter:\s*none;/,
        );
        // No pseudo-element of the run is the mark: `::before` and `::after` are the
        // horizontal run's reserve boxes, gated on a seat, never on the mark.
        expect(RUN_CSS).not.toMatch(/data-run-mark/);
        expect(RUN_CSS).toMatch(/\.dock-run:has\(> :not\(\.dock-run-mark\)\)::before/);
        expect(RUN_CSS).not.toMatch(/\.dock-run:has\(> \*\)/);
    });

    it("is no seat: not a roving stop, and the run stays a toolbar of its seats", async () => {
        const current = ref<number | null>(1);
        const wrapper = mount(GlassDock, {
            props: { collapse: "open" as const },
            slots: {
                default: () =>
                    ["A", "B", "C"].map((label, i) =>
                        h(
                            DockControl,
                            { label, "aria-current": current.value === i ? "page" : undefined },
                            () => label,
                        ),
                    ),
            },
            attachTo: document.body,
        });
        await settle();
        await nextTick();
        const run = wrapper.find(".dock-run").element as HTMLElement;
        const mark = markOf(run);
        expect(mark).not.toBeNull();
        expect(isRunSeat(mark as Element)).toBe(false);
        expect([...run.children].filter(isRunSeat)).toHaveLength(3);
        expect(run.getAttribute("role")).toBe("toolbar");
        expect(mark?.hasAttribute("tabindex")).toBe(false);
        wrapper.unmount();
    });

    it("mounts and marks without a ResizeObserver", async () => {
        const saved = globalThis.ResizeObserver;
        // @ts-expect-error: a host with no ResizeObserver
        delete globalThis.ResizeObserver;
        try {
            const current = ref<number | null>(1);
            const wrapper = navDock(current);
            await settle();
            await nextTick();
            expect(markOf(wrapper.find(".dock-run").element)).not.toBeNull();
            wrapper.unmount();
        } finally {
            globalThis.ResizeObserver = saved;
        }
    });

    it("re-measures when any seat resizes, not only the run and the destination", async () => {
        // A seat BEFORE the destination that widens shifts the destination along a run
        // whose own size holds (a phone-width or fixed-width dock): its resize must reach
        // the mark. The stub records what the mark's own observer watches (other dock
        // composables observe seats for their own reasons).
        const saved = globalThis.ResizeObserver;
        let observed = new Set<Element>();
        globalThis.ResizeObserver = class {
            own = new Set<Element>();
            observe(el: Element) {
                this.own.add(el);
                if (new Error().stack?.includes("useDockRunMark")) observed = this.own;
            }
            unobserve(el: Element) {
                this.own.delete(el);
            }
            disconnect() {
                this.own.clear();
            }
        } as unknown as typeof ResizeObserver;
        try {
            const current = ref<number | null>(2);
            const wrapper = navDock(current);
            await settle();
            await nextTick();
            const run = wrapper.find(".dock-run").element as HTMLElement;
            const seats = [...run.children].filter(isRunSeat);
            expect(seats.length).toBe(3);
            for (const seat of seats) expect(observed.has(seat)).toBe(true);
            expect(observed.has(run)).toBe(true);
            expect(observed.has(markOf(run) as Element)).toBe(false);
            wrapper.unmount();
        } finally {
            globalThis.ResizeObserver = saved;
        }
    });

    it("glides on the dock spring preset, never a literal", () => {
        const src = readFileSync(
            resolve(process.cwd(), "src/components/dock/composables/useDockRunMark.ts"),
            "utf8",
        );
        expect(src).toMatch(/useDockSpring\(DOCK_SPRING\)/);
        const constants = readFileSync(resolve(process.cwd(), "src/components/dock/constants.ts"), "utf8");
        expect(constants).toMatch(/springPreset\("dock"\)\.response/);
    });
});
