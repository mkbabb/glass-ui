<script lang="ts">
// StoryBodyRenderer — expands a pure-data `StoryBody` into the ONE specimen kit.
//
// The render side of the pages-as-data schema (story-body.ts). Given a `StoryBody`,
// it dispatches each section into the kit primitives — and ONLY the kit primitives
// (StorySection / ShowcaseFrame). It mints ZERO new
// visual primitive: a data page reads exactly like a hand-authored one because it
// renders the SAME components. A net-new styled wrapper here would defeat the whole
// renderer stays limited to the existing kit and Vue utilities.
//
// A render function (not a template) because the dispatch is DATA-shaped: a dynamic
// set of v-model bindings per specimen (`v-model:[prop]` across the `models` map),
// a recursive slot tree, and a cartesian `permute` expansion are what `h()` is for.
// The reactive StoryScope harness lives HERE (the schema stays pure data); each
// permute cell gets its OWN isolated scope so a grid never shares one control's
// state across cells.
//
// A flat specimen list renders BARE in a wrap-row under the section (byte-identical
// to the hand-authored originals — a row of Badges, an Alert, an Input in its
// measure), never a redundant glass-on-glass frame. A cartesian `permute` is the
// sole framed case: an ordinary responsive grid of
// ShowcaseFrame cells gives every variant a caption and isolated model state.
//
// A demo-private chassis primitive — NOT a library export.
import { defineComponent, h, reactive, type PropType, type VNode } from "vue";
import StorySection from "../section/StorySection.vue";
import ShowcaseFrame from "../showcase/ShowcaseFrame.vue";
import type {
    SectionSpec,
    SlotContent,
    SpecimenSpec,
    StoryBody,
    StoryScope,
} from "./story-body";

// Bind a specimen node against a reactive scope, expanding the explicit `models`
// map into two-way pairs (the anti-no-op form — a bare `modelValue` prop would be
// static). Static props pass through untouched.
//
// A LIBRARY component's `v-model` is `[prop] + onUpdate:[prop]`. A NATIVE element
// (a `component` string) has no `modelValue` prop — its template `v-model`
// DESUGARS to `value` + an input listener, and a manual `h()` render never gets
// that desugar for free, so a native `modelValue` model is expanded by hand into
// the `value` + `onInput` pair (the `.input-pill` bare input reads `value`, not
// `modelValue` — the parity floor for the migrated forms/inputs page).
function bindProps(node: SpecimenSpec, scope: StoryScope): Record<string, unknown> {
    const bound: Record<string, unknown> = { ...(node.props ?? {}) };
    const isNative = typeof node.component === "string";
    for (const [prop, key] of Object.entries(node.models ?? {})) {
        if (isNative && prop === "modelValue") {
            bound.value = scope[key];
            bound.onInput = (event: Event): void => {
                scope[key] = (event.target as HTMLInputElement).value;
            };
            continue;
        }
        bound[prop] = scope[key];
        bound[`onUpdate:${prop}`] = (value: unknown): void => {
            scope[key] = value;
        };
    }
    if (node.ariaLabel) bound["aria-label"] = node.ariaLabel;
    return bound;
}

type SlotChild = VNode | string;

function renderSlotContent(
    content: SlotContent,
    scope: StoryScope,
): SlotChild | SlotChild[] {
    if (typeof content === "string") return content;
    if (Array.isArray(content))
        return content.map((n) => (typeof n === "string" ? n : renderNode(n, scope)));
    // `Array.isArray` does not narrow a ReadonlyArray union member, so the leaf
    // node case is asserted (it is neither string nor array here).
    return renderNode(content as SpecimenSpec, scope);
}

function buildSlots(
    node: SpecimenSpec,
    scope: StoryScope,
): Record<string, () => SlotChild | SlotChild[]> | undefined {
    if (!node.slots) return undefined;
    const slots: Record<string, () => SlotChild | SlotChild[]> = {};
    for (const [name, content] of Object.entries(node.slots)) {
        slots[name] = () => renderSlotContent(content, scope);
    }
    return slots;
}

// Render ONE specimen node: a composed `stack` (a field — children in a column) or
// a leaf `<component :is>` (a real library component OR a native tag string).
function renderNode(node: SpecimenSpec, scope: StoryScope): VNode {
    if (node.stack) {
        return h(
            "div",
            { class: "flex flex-col gap-2 w-full" },
            node.stack.map((child) => renderNode(child, scope)),
        );
    }
    return h(node.component ?? "div", bindProps(node, scope), buildSlots(node, scope));
}

// The reading-measure cap the specimen wrap-row reads off the section `size` — a
// bare row never balloons past its declared measure (an Input row stays `sm`, a
// Badge row wraps free). `fluid`/unset is uncapped (the section owns the width).
const SIZE_MAX_W: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    prose: "max-w-prose",
};

export default defineComponent({
    name: "StoryBodyRenderer",
    props: {
        body: { type: Object as PropType<StoryBody>, required: true },
    },
    setup(props) {
        // The page-level controlled-state harness (the specimens' shared bag).
        const scope = reactive<StoryScope>({ ...(props.body.scope ?? {}) });

        // A cartesian sweep of the permute axes → one combo per grid cell, each
        // carrying its resolved props + a human label for the caption + aria-name.
        function cartesian(section: NonNullable<SectionSpec["permute"]>): Array<{
            props: Record<string, unknown>;
            label: string;
            aria: string;
        }> {
            let combos: Array<{
                props: Record<string, unknown>;
                labels: string[];
                aria: string[];
            }> = [{ props: {}, labels: [], aria: [] }];
            for (const axis of section.axes) {
                const next: typeof combos = [];
                for (const combo of combos) {
                    axis.values.forEach((value, i) => {
                        const label = axis.labels?.[i] ?? String(value);
                        next.push({
                            props: { ...combo.props, [axis.prop]: value },
                            labels: [...combo.labels, label],
                            aria: [...combo.aria, `${axis.prop}: ${label}`],
                        });
                    });
                }
                combos = next;
            }
            return combos.map((c) => ({
                props: c.props,
                label: c.labels.join(" · "),
                aria: c.aria.join(", "),
            }));
        }

        function renderSection(section: SectionSpec, index: number): VNode {
            // The bespoke escape — a node renders VERBATIM under a canonical
            // section, with NO ShowcaseFrame (prose with an inline specimen, a
            // `data-*`-hooked container). The bound the as-data ratio measures against.
            if (section.bespoke) {
                return h(
                    StorySection,
                    {
                        heading: section.heading,
                        label: section.label,
                        blurb: section.blurb,
                    },
                    () => renderNode(section.bespoke!, scope),
                );
            }

            // The cartesian variant grid — a bounded labeled matrix of REAL
            // instances, each cell its own isolated scope + auto aria-label.
            if (section.permute) {
                const permute = section.permute;
                const combos = cartesian(permute);
                const cellScopes = combos.map(() =>
                    reactive<StoryScope>({ ...(props.body.scope ?? {}) }),
                );
                return h(
                    StorySection,
                    {
                        heading: section.heading,
                        label: section.label,
                        blurb: section.blurb,
                        key: index,
                    },
                    () =>
                        h(
                            "div",
                            {
                                class: "grid gap-4",
                                style: {
                                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${permute.minCell ?? "16rem"}, 100%), 1fr))`,
                                },
                            },
                            combos.map((combo, cellIndex) => {
                                const node: SpecimenSpec = {
                                    ...permute.base,
                                    props: { ...permute.base.props, ...combo.props },
                                    ariaLabel: permute.base.ariaLabel ?? combo.aria,
                                    // The default slot defaults to the combo label so a
                                    // one-axis `<Badge variant>label</Badge>` grid is terse.
                                    slots: permute.base.slots ?? {
                                        default: combo.label,
                                    },
                                };
                                return h(
                                    ShowcaseFrame,
                                    {
                                        key: cellIndex,
                                        tier: "quiet",
                                        pad: "sm",
                                        caption: combo.label,
                                    },
                                    () => renderNode(node, cellScopes[cellIndex]!),
                                );
                            }),
                        ),
                );
            }

            // The flat specimen list — a BARE wrap-row of REAL instances under the
            // section (byte-identical to the hand-authored original: a row of
            // badges, an alert, an input in its measure). The section `size` caps
            // the reading measure so a lone Input never balloons to the article.
            const specimens = section.specimens ?? [];
            const rowClass = [
                "flex flex-wrap items-start gap-3",
                section.size ? (SIZE_MAX_W[section.size] ?? "") : "",
            ]
                .filter(Boolean)
                .join(" ");
            return h(
                StorySection,
                {
                    heading: section.heading,
                    label: section.label,
                    blurb: section.blurb,
                    key: index,
                },
                () =>
                    h(
                        "div",
                        { class: rowClass },
                        specimens.map((s) => renderNode(s, scope)),
                    ),
            );
        }

        // `display: contents` so the sections become effective children of the
        // StoryPage `.story-cels` flex — they inherit the ONE tokenized section-gap
        // rhythm, never a second nested gap. The `data-story-body` marker survives
        // for the gate + the visual spec without adding a layout box.
        return (): VNode =>
            h(
                "div",
                {
                    "data-story-body": "",
                    style: { display: "contents" },
                },
                props.body.sections.map((section, i) => renderSection(section, i)),
            );
    },
});
</script>
