/* D4-F pass-4 CRITIC unit cases (copied into the critic's worktree for the run, removed after; never in a patch).
 * The route's unit mounts each slot spelling once. These cases ask two things it does not:
 *  - a row follows its slot through Vue's reactivity after mount (the H-2 pair, R-2, in the DOM half), both ways;
 *  - a consumer's wrapper component that forwards `#meta` with `<slot name="meta" />` renders no row when its own
 *    caller supplies nothing (a fifth empty-anatomy spelling, E-3), and one when it does. */
import { describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

const rowsOf = (w: ReturnType<typeof mount>) =>
    [...w.get("button").element.children].map((c) => c.className).filter((c) => /toggle-group__(media|meta)/.test(c));

describe("D4-F critic — rows after mount and through a wrapper", () => {
    it("a #meta row leaves and returns with its v-if after mount", async () => {
        const hint = ref<string>("0.5 s");
        const w = mount(
            defineComponent({
                components: { ToggleGroup, ToggleGroupItem },
                setup: () => ({ hint }),
                template: `<ToggleGroup type="single" model-value="a"><ToggleGroupItem value="a">A<template #meta><span v-if="hint">{{ hint }}</span></template></ToggleGroupItem></ToggleGroup>`,
            }),
        );
        expect(rowsOf(w)).toEqual(["toggle-group__meta"]);
        hint.value = "";
        await nextTick();
        expect(rowsOf(w)).toEqual([]);
        hint.value = "0.7 s";
        await nextTick();
        expect(rowsOf(w)).toEqual(["toggle-group__meta"]);
        w.unmount();
    });

    it("a #media row arrives with a v-for that fills after mount", async () => {
        const marks = ref<string[]>([]);
        const w = mount(
            defineComponent({
                components: { ToggleGroup, ToggleGroupItem },
                setup: () => ({ marks }),
                template: `<ToggleGroup type="single" model-value="a"><ToggleGroupItem value="a"><template #media><i v-for="m in marks" :key="m">{{ m }}</i></template>A</ToggleGroupItem></ToggleGroup>`,
            }),
        );
        expect(rowsOf(w)).toEqual([]);
        marks.value = ["x"];
        await nextTick();
        expect(rowsOf(w)).toEqual(["toggle-group__media"]);
        w.unmount();
    });

    it("a wrapper that forwards #meta renders no row when its caller gives none", async () => {
        const Tile = defineComponent({
            components: { ToggleGroupItem },
            props: { value: { type: String, required: true } },
            template: `<ToggleGroupItem :value="value"><slot /><template #meta><slot name="meta" /></template></ToggleGroupItem>`,
        });
        const bare = mount(
            defineComponent({
                components: { ToggleGroup, Tile },
                template: `<ToggleGroup type="single" model-value="a"><Tile value="a">A</Tile></ToggleGroup>`,
            }),
        );
        expect(rowsOf(bare)).toEqual([]);
        bare.unmount();
        const filled = mount(
            defineComponent({
                components: { ToggleGroup, Tile },
                template: `<ToggleGroup type="single" model-value="a"><Tile value="a">A<template #meta>0.5 s</template></Tile></ToggleGroup>`,
            }),
        );
        expect(rowsOf(filled)).toEqual(["toggle-group__meta"]);
        filled.unmount();
    });
});
