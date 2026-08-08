/* W-TOGGLE-ROW (#84) — the toggle-group lane's own battery.
 *
 * Three checks, one per lane gate: G-TOGGLE-ROLE · G-TOGGLE-REGISTER ·
 * G-TOGGLE-WRAP. Each is the node-readable HALF of its gate. G-TOGGLE-WRAP's other
 * half is a measurement — `scrollWidth == clientWidth` at 1440 and 402, every item
 * rect inside the group box, the item corner spelled `9999px` on both engines — and
 * that half is a browser-seat probe owed to the π row (P1/P2). It is deliberately
 * NOT faked here: jsdom returns the unresolved `var()` text for every one of those
 * properties, so a jsdom "measurement" of them convicts nothing.
 *
 * SEATS +0. Nothing here claims a §B.5 seat name. Per-lane born-RED gates are
 * component close-battery rows, not standing roster gates (CWT-3 §5 + `:1871`;
 * TERMINAL-ROSTER E-7 extended to tier-3) — the same acceptance class the card
 * (#79), button (#80), picker (#81) and binary-triad (#83) batteries ride.
 *
 * THE LANE IS STATED ONCE and every check is scoped to it. A lane gate that ranges
 * over the library convicts other rows' files and can only be greened by editing
 * them.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { describe, expect, it } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

const ROOT = process.cwd();
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

const LANE_SHEET = "src/components/toggle-group/styles.css";
const LANE_SFCS = [
    "src/components/toggle-group/ToggleGroup.vue",
    "src/components/toggle-group/ToggleGroupItem.vue",
];
const LANE_TS = [
    "src/components/toggle-group/context.ts",
    "src/components/toggle-group/index.ts",
];

/* Strip comments so a defect NAMED in prose is never counted as a defect SHIPPED.
 * This lane's sheet carries the derivation of every deletion in it — including the
 * literal spellings of the tokens that were struck — so a gate reading raw text
 * would convict the record of the cure. */
const code = (p: string) => read(p).replace(/\/\*[\s\S]*?\*\//g, "");
const markup = (p: string) =>
    read(p)
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");
/* The forced-colors arm legitimately restates material: the system palette replaces
 * every colour, so it is the one place a law is written twice on purpose. */
const withoutForcedColors = (css: string) =>
    css.replace(/@media \(forced-colors: active\)\s*\{[\s\S]*?\n {4}\}/g, "");

function mountGroup(type: "single" | "multiple", modelValue: string | string[]) {
    return mount(ToggleGroup, {
        props: { type, modelValue },
        slots: {
            default: `
                <ToggleGroupItem value="one">One</ToggleGroupItem>
                <ToggleGroupItem value="two">Two</ToggleGroupItem>
                <ToggleGroupItem value="three">Three</ToggleGroupItem>
            `,
        },
        global: { components: { ToggleGroupItem } },
        attachTo: document.body,
    });
}

describe("W-TOGGLE-ROW — the selection row", () => {
    /* G-TOGGLE-ROLE — a one-of-N chooser announces as one, and the activation law
     * that makes the keyboard match the announcement.
     *
     * BORN-RED AT HEAD, measured by the predecessor of this very file (which asserted
     * the defect as the contract): `role="group"` on the host in BOTH cardinalities ·
     * `aria-pressed` on every item in BOTH cardinalities · `radiogroup` count 0 ·
     * `role="radio"` count 0 · `aria-checked` count 0. Twenty of the twenty-one live
     * external mounts are single-select choosers, so the library announced twenty
     * one-of-N questions as N independent yes/no buttons.
     *
     * MUTATION BITES: restore reka's `ToggleGroupRoot` → RED (it writes `role="group"`
     * unconditionally and `aria-pressed` from `Toggle.js`) · hard-code `radiogroup` in
     * both modes → RED on the multiple arm · flatten `activation` to `"automatic"` →
     * RED on the multiple-arrow assertion, because the engine's `select()` TOGGLES
     * membership in multiple mode, so arrows would flip every item they crossed. */
    it("G-TOGGLE-ROLE · single announces as a radiogroup, multiple as toggles", () => {
        const single = mountGroup("single", "one");
        const host = single.get('[data-slot="toggle-group"]');
        expect(host.attributes("role")).toBe("radiogroup");
        expect(single.findAll('[role="radio"]')).toHaveLength(3);
        expect(
            single.findAll("button").map((b) => b.attributes("aria-checked")),
        ).toEqual(["true", "false", "false"]);
        expect(single.find("[aria-pressed]").exists()).toBe(false);
        single.unmount();

        const multiple = mountGroup("multiple", ["one", "three"]);
        expect(multiple.get('[data-slot="toggle-group"]').attributes("role")).toBe(
            "group",
        );
        expect(multiple.find('[role="radio"]').exists()).toBe(false);
        expect(multiple.find("[aria-checked]").exists()).toBe(false);
        expect(
            multiple.findAll("button").map((b) => b.attributes("aria-pressed")),
        ).toEqual(["true", "false", "true"]);
        multiple.unmount();
    });

    it("G-TOGGLE-ROLE · the activation arm — arrows select in single, only move in multiple", async () => {
        const single = mountGroup("single", "one");
        await nextTick();
        const singleItems = single.findAll("button");
        singleItems[0]!.element.focus();
        await singleItems[0]!.trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement).toBe(singleItems[1]!.element);
        expect(single.emitted("update:modelValue")?.at(-1)).toEqual(["two"]);
        single.unmount();

        const multiple = mountGroup("multiple", ["one"]);
        await nextTick();
        const multiItems = multiple.findAll("button");
        multiItems[0]!.element.focus();
        await multiItems[0]!.trigger("keydown", { key: "ArrowRight" });
        await nextTick();
        expect(document.activeElement).toBe(multiItems[1]!.element);
        // The model is UNTOUCHED: manual activation in multiple mode.
        expect(multiple.emitted("update:modelValue")).toBeUndefined();
        multiple.unmount();
    });

    it("G-TOGGLE-ROLE · the group stamps its own orientation and one invalid grammar", () => {
        const wrapper = mount(ToggleGroup, {
            props: { type: "single", orientation: "vertical", invalid: true },
            slots: { default: '<ToggleGroupItem value="a">A</ToggleGroupItem>' },
            global: { components: { ToggleGroupItem } },
        });
        const host = wrapper.get('[data-slot="toggle-group"]');
        // D-13 by construction: reka wrote `data-orientation` only from
        // `RovingFocusGroup`, so `rovingFocus: false` silently dropped it and a
        // vertical group laid out horizontally. This component stamps its own prop.
        expect(host.attributes("data-orientation")).toBe("vertical");
        expect(host.attributes("data-invalid")).toBe("true");
        expect(host.attributes("aria-invalid")).toBe("true");
        wrapper.unmount();
    });

    /* The disabled axis, both seats. Born-RED at the CURE, not at HEAD: the first cut
     * of this row wrote `props.disabled ?? group.disabled.value`, and Vue casts an
     * absent Boolean prop to `false` rather than `undefined`, so the nullish chain
     * short-circuited and a disabled GROUP left every item live. Caught on live paint
     * (`button.disabled === false`, opacity 1, `pointer-events: auto` on the demo's
     * disabled group), never by a type. */
    it("either seat disables — a disabled group reaches every item", () => {
        const wrapper = mount(ToggleGroup, {
            props: { type: "single", disabled: true },
            slots: {
                default:
                    '<ToggleGroupItem value="a">A</ToggleGroupItem><ToggleGroupItem value="b">B</ToggleGroupItem>',
            },
            global: { components: { ToggleGroupItem } },
        });
        expect(
            wrapper
                .findAll("button")
                .map((b) => b.attributes("disabled") !== undefined),
        ).toEqual([true, true]);
        wrapper.unmount();

        const perItem = mount(ToggleGroup, {
            props: { type: "single" },
            slots: {
                default:
                    '<ToggleGroupItem value="a">A</ToggleGroupItem><ToggleGroupItem value="b" disabled>B</ToggleGroupItem>',
            },
            global: { components: { ToggleGroupItem } },
        });
        expect(
            perItem
                .findAll("button")
                .map((b) => b.attributes("disabled") !== undefined),
        ).toEqual([false, true]);
        perItem.unmount();
    });

    /* THE ITEM'S IDENTITY IS LIVE, NOT FROZEN. Born-RED at the CURE, like the
     * disabled case above: the first cut wrote `value: props.value` into the registry
     * entry, capturing the scalar at setup while the template kept painting
     * `props.value`. An item whose value changes after mount therefore PAINTED the new
     * identity and COMMITTED the old one — `select(entry.value)` is the write path, and
     * it read the captured copy. Measured RED against those bytes before the cure: the
     * model landed `"a"` where the item had said `"b"` since the tick after mount.
     *
     * The cure is a getter, which is the same shape the `disabled` line beside it
     * already had, and it also restores reactivity to the derived `options` array (a
     * computed reading `entry.value` now tracks the prop). */
    it("the item's value is LIVE — a post-mount value change commits the new value", async () => {
        const itemValue = ref("a");
        const model = ref<string | string[] | undefined>(undefined);
        const wrapper = mount(
            defineComponent({
                components: { ToggleGroup, ToggleGroupItem },
                setup: () => ({ itemValue, model }),
                template: `
                    <ToggleGroup type="single" v-model="model">
                        <ToggleGroupItem :value="itemValue">A</ToggleGroupItem>
                        <ToggleGroupItem value="z">Z</ToggleGroupItem>
                    </ToggleGroup>`,
            }),
            { attachTo: document.body },
        );
        await nextTick();

        itemValue.value = "b";
        await nextTick();

        const first = wrapper.findAll("button")[0]!;
        // The paint already says `b` — `aria-checked` is keyed off the live prop.
        expect(first.attributes("aria-checked")).toBe("false");
        await first.trigger("click");
        await nextTick();
        expect(model.value).toBe("b");
        expect(first.attributes("aria-checked")).toBe("true");
        wrapper.unmount();
    });

    /* G-TOGGLE-REGISTER — zero register-owned declarations in the lane; the chassis
     * is COMPOSED by class name, never copied by value; reka is gone.
     *
     * BORN-RED AT HEAD (measured off `git show HEAD:` bytes, not read off the spec):
     * SIX copied declarations — `backdrop-filter` ×2 (`:33`, `:86`), the 3-leg
     * `box-shadow` (`:34-37`), `border-color`/`background` from the
     * `--control-surface-*` cohort (`:84`, `:85`), the hover `background` (`:90`) —
     * PLUS ONE cross-namespace token, `--tab-track-recess-ink` at `:37`, which was the
     * library's only reach from one component's namespace into another's. Neither
     * `.control-surface` nor `.glass-control-edge` was composed; both SFCs imported
     * `reka-ui`.
     *
     * MUTATION BITES: paste any leg back → RED · drop any of the three composed class
     * names from the item → RED · re-import reka in either SFC → RED. */
    it("G-TOGGLE-REGISTER · the lane declares no register-owned material", () => {
        const css = withoutForcedColors(code(LANE_SHEET));
        for (const owned of [
            "backdrop-filter",
            "--glass-rim-",
            "--glass-bg-",
            "--control-surface-",
            "--tab-",
        ]) {
            expect(
                css,
                `${owned} is the register's to declare, not this lane's`,
            ).not.toContain(owned);
        }
        // This lane authors ZERO border values (both foremen, ratified): the item's
        // perimeter is `.control-surface`'s. The forced-colors arm and the invalid
        // arm write `border-color` against the system/destructive palette, which is
        // a STATE recolour of a border the register owns, never a border of its own.
        expect(css).not.toMatch(/^\s*border:/m);
    });

    it("G-TOGGLE-REGISTER · the item composes the chassis and reka is gone", () => {
        const item = markup("src/components/toggle-group/ToggleGroupItem.vue");
        for (const composed of [
            "control-surface",
            "glass-control-edge",
            "glass-capsule-hover",
            "tap-squish",
            "focus-ring",
        ]) {
            expect(item, `the item must compose .${composed}`).toContain(composed);
        }
        for (const file of [...LANE_SFCS, ...LANE_TS]) {
            expect(code(file), `${file} still reaches for reka`).not.toContain(
                "reka-ui",
            );
        }
    });

    /* G-TOGGLE-WRAP (node half) — the row wraps and the group has no silhouette.
     *
     * BORN-RED AT HEAD: `display: inline-flex` with no `flex-wrap` and
     * `white-space: nowrap` on the item, inside a demo `overflow-x: auto` parent —
     * 224px of a 552px strip shown, 59% hidden, three of five options invisible,
     * `mask-image: none`. The group also painted a corner:
     * `border-radius: var(--radius-ctx)` over `--radius-ctx: calc(var(--radius-pill) +
     * var(--radius-inset))`, which computes to the `10003px` sentinel in Chromium and
     * `3.4e38px` in Safari.
     *
     * SPEC FIGURE CORRECTED, and it matters for the mutation bite: CWT-3 D-5 records
     * `calc(var(--radius-pill) + 0.25rem)` ×2 LIVE. Measured at HEAD it is ZERO
     * literal sites and ONE relay-spelled site — BK #23 W-RADIUS-ROLE re-expressed the
     * pad on `--radius-inset`/`--radius-ctx` on 2026-08-05, after CWT-3 was written.
     * The computed value was unchanged by that cure (the sentinel still resolved), so
     * the defect D-5 names was live at HEAD; only its spelling had moved. This cut
     * retires it by deleting the surface, which is also how the ⊕⁷ atlas A-6
     * concentric identity discharges: with no track there is no concentric pair, and
     * no `--radius-concentric` token was ever minted to retire.
     *
     * MUTATION BITES: restore `nowrap` or drop `flex-wrap` → RED · re-add any
     * `+ 0.25rem` / `+ var(--radius-inset)` corner → RED · give the group back a
     * `background`/`border-radius` → RED. */
    it("G-TOGGLE-WRAP · the row wraps and the group paints no silhouette", () => {
        const css = withoutForcedColors(code(LANE_SHEET));
        expect(css).toContain("flex-wrap: wrap");
        expect(css).not.toContain("nowrap");
        expect(css).not.toContain("inline-flex;\n        inline-size");
        // No corner, no plate, no scroller — all three died with the track.
        expect(css).not.toContain("--radius-ctx");
        expect(css).not.toContain("--radius-inset");
        expect(css).not.toMatch(/var\(--radius-pill\)\s*\+/);
        expect(css).not.toContain("scroll-padding-inline");
        expect(css).not.toContain("overscroll-behavior-inline");
        expect(css).not.toContain("safe center");
        // The ONE spelling of the stadium that survives is the item's role rung.
        expect(css).toContain("border-radius: var(--radius-pill)");
        // Rules whose selector ENDS at the group host — a descendant rule
        // (`.toggle-group[data-size="sm"] .toggle-group__item`) paints the item and
        // is not the group's silhouette.
        const groupRules =
            css.match(/\.toggle-group(?:\[[^\]]*\])*\s*\{[^}]*\}/g) ?? [];
        expect(groupRules.length).toBeGreaterThan(0);
        for (const rule of groupRules) {
            expect(rule, `the group may not paint: ${rule}`).not.toMatch(
                /background|border-radius|box-shadow|backdrop-filter|padding/,
            );
        }
    });

    it("G-TOGGLE-WRAP · the deleted surface is gone from the public type too", () => {
        const barrel = code("src/components/toggle-group/index.ts");
        for (const dead of [
            "ToggleGroupVariant",
            "ToggleGroupSize",
            "ToggleGroupValue",
            "ToggleGroupEmits",
            "ToggleGroupSlotProps",
            "TOGGLE_GROUP_KEY",
        ]) {
            expect(barrel, `${dead} was deleted, not aliased`).not.toContain(dead);
        }
        // Four exports, clean break, no shim. Read off the `export` clauses so the
        // `from "./ToggleGroup.vue"` specifiers are not counted as surface.
        const exported = new Set(
            [...barrel.matchAll(/(?:default as|type)\s+(ToggleGroup\w*)/g)].map(
                (m) => m[1],
            ),
        );
        expect([...exported].sort()).toEqual([
            "ToggleGroup",
            "ToggleGroupItem",
            "ToggleGroupItemProps",
            "ToggleGroupProps",
        ]);
    });

    /* The ⊕⁷ o19 A-18 salvage: the indicator SEAT is the library's, the PAINT is the
     * consumer's. The slot renders inside the pill, so whatever the consumer puts in
     * it inherits the hover lift and press squish and no motion authority leaves the
     * library. Both orientations, because it is a child of the item and the item does
     * not know which axis its group is on. */
    it("the item exposes a consumer-painted indicator slot carrying its selected state", () => {
        const wrapper = mount(ToggleGroup, {
            props: { type: "single", modelValue: "b" },
            slots: {
                default: `
                    <ToggleGroupItem value="a">
                        <template #indicator="{ selected }"><i data-mark="a">{{ selected }}</i></template>
                        A
                    </ToggleGroupItem>
                    <ToggleGroupItem value="b">
                        <template #indicator="{ selected }"><i data-mark="b">{{ selected }}</i></template>
                        B
                    </ToggleGroupItem>`,
            },
            global: { components: { ToggleGroupItem } },
        });
        expect(wrapper.get("[data-mark='a']").text()).toBe("false");
        expect(wrapper.get("[data-mark='b']").text()).toBe("true");
        wrapper.unmount();
    });
});
