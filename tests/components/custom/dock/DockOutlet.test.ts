import { mount } from "@vue/test-utils";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import ControlsDock from "@glass/components/dock/ControlsDock.vue";
import DockOutlet from "@glass/components/dock/DockOutlet.vue";
import { useOptionalDockContext } from "@glass/components/dock/composables/dockContext";

/**
 * W-I.8 G-7 · the outlet (R-8). Content declared in a sibling tree renders into a named
 * dock's region as direct children, after the region's authored children and in mount
 * order; the outlet renders no element of its own; the context inside it is that dock's;
 * content mounts when its dock registers and leaves when it goes; and the registry is a
 * map, with no DOM lookup.
 */
const wrappers: Array<{ unmount: () => void }> = [];
afterEach(() => {
    for (const w of wrappers.splice(0)) w.unmount();
});

const Probe = defineComponent({
    props: { name: { type: String, required: true } },
    setup(p) {
        const ctx = useOptionalDockContext();
        return () => h("button", { "data-name": p.name, "data-ctx": ctx?.id ?? "none" }, p.name);
    },
});

function host(opts: { showDock?: boolean; region?: "run" | "persistent" | "persistent-end"; two?: boolean; controls?: boolean } = {}) {
    const showDock = ref(opts.showDock ?? true);
    const Host = defineComponent({
        setup() {
            return () =>
                h("div", [
                    showDock.value
                        ? h(opts.controls ? ControlsDock : GlassDock, { id: "d1", label: "Page controls", collapse: false, backdropMode: "static" }, {
                              default: () => [h("button", { "data-name": "authored" }, "authored")],
                          })
                        : null,
                    h("section", [
                        h(DockOutlet, { to: "d1", region: opts.region ?? "run" }, { default: () => [h(Probe, { name: "first" })] }),
                        opts.two ? h(DockOutlet, { to: "d1", region: opts.region ?? "run" }, { default: () => [h(Probe, { name: "second" })] }) : null,
                    ]),
                ]);
        },
    });
    // The suite's setup stubs Teleport; the outlet is a Teleport, so this file renders it.
    const w = mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } });
    wrappers.push(w);
    return { w, showDock };
}
const settle = async () => {
    await nextTick();
    await nextTick();
    await nextTick();
};

describe("W-I.8 G-7: DockOutlet", () => {
    it("renders as direct children of the run, after the authored seats, with that dock's context", async () => {
        const { w } = host({ two: true });
        await settle();
        const run = w.element.querySelector<HTMLElement>("#d1 .dock-run")!;
        const names = [...run.children].map((c) => c.getAttribute("data-name"));
        expect(names).toEqual(["authored", "first", "second"]);
        const ctxId = run.querySelector("[data-name=first]")!.getAttribute("data-ctx");
        expect(ctxId).toMatch(/^glass-dock-/);
        // The outlet renders no element of its own in the sibling tree.
        expect(w.element.querySelector("section")!.children.length).toBe(0);
    });

    it("mounts its content when the dock registers and removes it when the dock goes", async () => {
        const { w, showDock } = host({ showDock: false });
        await settle();
        expect(document.querySelector("[data-name=first]")).toBeNull();
        showDock.value = true;
        await settle();
        expect(w.element.querySelector("#d1 .dock-run [data-name=first]")).not.toBeNull();
        showDock.value = false;
        await settle();
        expect(document.querySelector("[data-name=first]")).toBeNull();
        showDock.value = true;
        await settle();
        expect(w.element.querySelector("#d1 .dock-run [data-name=first]")).not.toBeNull();
    });

    it("renders a persistent-end region the host did not author, and fills it", async () => {
        const { w } = host({ region: "persistent-end" });
        await settle();
        const end = w.element.querySelector("#d1 .dock-persistent-end");
        expect(end).not.toBeNull();
        expect(end!.querySelector("[data-name=first]")).not.toBeNull();
    });

    it("lands in a ControlsDock's run as it does in any dock", async () => {
        const { w } = host({ controls: true });
        await settle();
        expect(w.element.querySelector("#d1 .dock-run [data-name=first]")).not.toBeNull();
    });

    it("finds docks by a registry, never by a DOM lookup", () => {
        for (const f of ["src/components/dock/DockOutlet.vue", "src/components/dock/composables/dockRegistry.ts"]) {
            const src = readFileSync(f, "utf8");
            expect(src, f).not.toMatch(/querySelector|getElementById|closest\(/);
        }
    });
});
