// A navigation run's active mark. A run whose destination carries `aria-current` paints
// ONE selected plate (the run's `::before`) and moves it between seats on the dock spring;
// the marked seat stops painting its own selected fill. A seat inside its own scroller is
// not on the run's coordinates and keeps its own plate. The glide itself (intermediate
// positions, reduced motion cutting it) is measured in the engines, not here.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";

const RUN_CSS = readFileSync(resolve(process.cwd(), "src/components/dock/styles/run.css"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "");

async function settle(): Promise<void> {
    await nextTick();
    await nextTick();
}

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
        expect(run.hasAttribute("data-run-mark")).toBe(true);
        for (const prop of ["x", "y", "w", "h", "r"])
            expect(run.style.getPropertyValue(`--dock-run-mark-${prop}`)).toMatch(/px$/);

        current.value = null;
        await settle();
        await new Promise((r) => setTimeout(r, 0));
        expect(run.hasAttribute("data-run-mark")).toBe(false);
        wrapper.unmount();
    });

    it("leaves a destination inside its own scroller to paint itself", async () => {
        const current = ref<number | null>(0);
        const wrapper = navDock(current, "scroller");
        await settle();
        expect(wrapper.find(".dock-run").element.hasAttribute("data-run-mark")).toBe(false);
        wrapper.unmount();
    });

    it("is one plate on the run, under the seats, and the marked seat paints no fill of its own", () => {
        const mark = RUN_CSS.match(/\.glass-dock \.dock-run\[data-run-mark\]::before\s*\{([^}]*)\}/)?.[1] ?? "";
        expect(mark).toMatch(/position:\s*absolute/);
        expect(mark).toMatch(/z-index:\s*-1/);
        expect(mark).toMatch(/translate:\s*var\(--dock-run-mark-x\) var\(--dock-run-mark-y\)/);
        expect(mark).toMatch(/background:\s*var\(--dock-control-active-bg\)/);
        expect(RUN_CSS).toMatch(
            /\.glass-dock \.dock-run\[data-run-mark\] \[aria-current\]:not\(\[aria-current="false"\]\)\s*\{\s*background-color:\s*transparent;/,
        );
    });

    it("writes five non-inheriting lengths that only the plate takes up", () => {
        const mark = RUN_CSS.match(/\.glass-dock \.dock-run\[data-run-mark\]::before\s*\{([^}]*)\}/)?.[1] ?? "";
        for (const prop of ["x", "y", "w", "h", "r"]) {
            expect(RUN_CSS).toMatch(
                new RegExp(`@property --dock-run-mark-${prop} \\{ syntax: "<length>"; inherits: false;`),
            );
            expect(mark).toMatch(new RegExp(`--dock-run-mark-${prop}:\\s*inherit;`));
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
