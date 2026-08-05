import { computed, type ComputedRef, type Ref } from "vue";
import {
    useSelectionIndicator,
    type SelectionOption,
} from "./useSelectionIndicator";
// The roving machine is composed directly (the dock is SegmentedTabs wearing
// different chrome; ONE roving machine, never re-forked).
// `useTabRovingFocus` imports `vue` only (engine-FREE + vueuse-FREE), so pulling it
// into the `/motion-core`-eligible engine keeps the keyframes/vueuse fence.
import {
    useTabRovingFocus,
    type TabActivation,
} from "../../../components/tabs/composables/useTabRovingFocus";

/**
 * useSelectionGroup is the library's single headless selection engine. The dock
 * control run and `<SegmentedTabs>` are the SAME thing — a roving-focus selection
 * strip with a traveling indicator — and both compose it (BK #19 W-SELECTION-ONE
 * made SegmentedTabs the second; the arm at `tests/gates/overfit-structure.test.ts`
 * forbids a third assembly). `<ToggleGroup type="single">` is the same strip BY
 * SHAPE but not yet by composition: it delegates roving to reka's `ToggleGroupRoot`
 * and composes neither house part. Adopting it needs the C-1
 * `SelectionOption["value"]` widening (`useSelectionIndicator.ts:35` — `string` vs
 * `SelectionValue`) and is **BK #84's**; until it lands, the engine's consumer set
 * is TWO, and this doc says two. The assembly, reka-free and engine-free so it
 * ships on `/motion-core`:
 *
 *   • the SELECTION MODEL — `single` (a `string`) | `multiple` (a `string[]`),
 *     driven off a caller-owned `model` ref (no shadow registry — the ONE
 *     registry discipline);
 *   • the ROVING MACHINE — `useTabRovingFocus` composed VERBATIM (exactly-one-
 *     tabstop, axis-derived arrows, Home/End, wrap, disabled-skip);
 *   • the ONE TRAVELING-INDICATOR WRITER — `useSelectionIndicator` (the
 *     center-anchored ResizeObserver measure + the `--stretch` squish), so the
 *     dock and tabs indicator is Safari-identical by construction;
 *   • the RECENTER CALL — `el.scrollIntoView({inline:'nearest', block:'nearest'})`
 *     on every select, so a selection past the fold pulls itself into view.
 *
 * ROLE-PER-MODE rides the engine (the WAI-ARIA contract):
 *   • `radiogroup` — a single-select CHOOSER: `role="radio"` + `aria-checked`;
 *   • `tablist` — panel navigation: `role="tab"` + `aria-selected`;
 *   • `group` — N independent toggles: `aria-pressed` (no item `role`).
 */

export type SelectionMode = "single" | "multiple";
export type SelectionRole = "radiogroup" | "tablist" | "group";

export interface UseSelectionGroupParams<O extends SelectionOption> {
    /** The selectable options (index-aligned to `buttonRefs`). */
    options: ComputedRef<O[]>;
    /**
     * The caller-owned selection model — the ONE registry (no shadow state). A
     * `single`-mode group reads/writes a `string`; a `multiple`-mode group a
     * `string[]`.
     */
    model: Ref<string | string[] | undefined>;
    /** `single` (default) | `multiple`. */
    mode?: ComputedRef<SelectionMode> | SelectionMode;
    /**
     * The ARIA role register — `radiogroup` (single chooser), `tablist` (panel
     * navigation), or `group` (N toggles). Defaults to `radiogroup` for `single`
     * and `group` for `multiple`.
     */
    role?: ComputedRef<SelectionRole> | SelectionRole;
    /** True for the vertical (block-axis) orientation. */
    vertical?: ComputedRef<boolean>;
    /** Whether roving focus selects immediately. Defaults to automatic. */
    activation?: ComputedRef<TabActivation> | TabActivation;
    /** The container scroller root (observed by the indicator's ResizeObserver). */
    containerRef: Ref<HTMLElement | null>;
    /**
     * The traveling-indicator element (the `--stretch` squish target). Omit (or
     * leave null) for a group with no glide indicator (e.g. a paper-hairline
     * strip or a plain toggle row) — the squish/measure then no-ops.
     */
    indicatorRef?: Ref<HTMLElement | null>;
    /** Per-option item refs, index-aligned to `options`. */
    buttonRefs: Ref<HTMLElement[]>;
    /**
     * A per-commit side effect the CALLER owns, fired on every committed selection
     * (pointer AND keyboard) before the model write — e.g. SegmentedTabs' press
     * squish on the pressed button. The engine stays the one selection path; a
     * caller that needs a local flourish hangs it here rather than forking `select`.
     */
    onSelect?: (value: string, idx: number) => void;
}

export interface UseSelectionGroupReturn {
    /** The active option values (one for `single`, N for `multiple`). */
    activeValues: ComputedRef<string[]>;
    /** True when `value` is currently selected. */
    isSelected: (value: string) => boolean;
    /**
     * Commit a selection at `idx` — writes the model (toggle in `multiple`),
     * fires the travel-squish, and recenters the item via `scrollIntoView`.
     */
    select: (value: string, idx: number) => void;
    /** The roving tabindex for option `idx` (`0` for the tabstop, `-1` else). */
    rovingTabindex: (idx: number) => number;
    /** The strip-root keydown handler (axis-derived arrows + Home/End). */
    onKeydown: (e: KeyboardEvent) => void;
    /** Inline style for the single-select traveling indicator (the ONE writer). */
    singleSliderStyle: Ref<Record<string, string>>;
    /** Imperatively kick the travel-squish on a selection at `idx`. */
    squishOnTravel: (toIdx: number) => void;
    /** The resolved group `role` (`radiogroup` | `tablist` | `group`). */
    groupRole: ComputedRef<SelectionRole>;
    /** The per-item ARIA attributes for `value`, role-per-mode. */
    itemAttrs: (value: string) => Record<string, string>;
}

function unwrap<T>(v: ComputedRef<T> | T | undefined, fallback: T): T {
    if (v == null) return fallback;
    return typeof v === "object" && "value" in (v as object)
        ? (v as ComputedRef<T>).value
        : (v as T);
}

export function useSelectionGroup<O extends SelectionOption>(
    params: UseSelectionGroupParams<O>,
): UseSelectionGroupReturn {
    const {
        options,
        model,
        containerRef,
        buttonRefs,
        indicatorRef,
        vertical,
    } = params;

    const modeRef = computed<SelectionMode>(() =>
        unwrap(params.mode, "single"),
    );
    const groupRole = computed<SelectionRole>(() =>
        unwrap(
            params.role,
            modeRef.value === "multiple" ? "group" : "radiogroup",
        ),
    );
    const isVertical = computed<boolean>(() => vertical?.value ?? false);
    const activation = computed<TabActivation>(() =>
        unwrap(params.activation, "automatic"),
    );

    // ── The selection model (single string | multiple string[]) ──

    const activeValues = computed<string[]>(() => {
        const m = model.value;
        if (m == null) return [];
        return Array.isArray(m) ? m : [m];
    });

    function isSelected(value: string): boolean {
        return activeValues.value.includes(value);
    }

    // ── The ONE traveling-indicator writer ──
    // The indicator tracks the (single) active value; a `multiple` group passes
    // its first-selected as the glide anchor (a multi-toggle carries no single
    // slider — the caller omits `indicatorRef` for it).
    const indicatorModel = computed<string | undefined>(
        () => activeValues.value[0],
    );

    const { singleSliderStyle, squishOnTravel } = useSelectionIndicator<O>({
        containerRef,
        indicatorRef: indicatorRef ?? { value: null } as Ref<HTMLElement | null>,
        buttonRefs,
        options,
        model: indicatorModel,
        activeValues,
        vertical: isVertical,
    });

    // ── The selection commit (the ONE registry write + recenter + squish) ──

    function select(value: string, idx: number) {
        const option = options.value[idx];
        if (option?.disabled) return;

        params.onSelect?.(value, idx);

        if (modeRef.value === "multiple") {
            const cur = Array.isArray(model.value) ? [...model.value] : [];
            const at = cur.indexOf(value);
            if (at >= 0) cur.splice(at, 1);
            else cur.push(value);
            model.value = cur;
        } else {
            model.value = value;
        }

        // The elastic travel-squish (no-op when there is no indicator element).
        squishOnTravel(idx);
        // 's recenter FACILITY, fired here in the engine: a select
        // past the fold pulls itself into view (native scroll, no measure loop).
        buttonRefs.value[idx]?.scrollIntoView({
            inline: "nearest",
            block: "nearest",
        });
    }

    // ── The roving machine (composed VERBATIM) ──

    const { rovingTabindex, onStripKeydown } = useTabRovingFocus({
        stripOptions: options,
        stripValue: indicatorModel,
        isVertical,
        activation,
        buttonRefs,
        select,
    });

    // ── Role-per-mode item attributes (the WAI-ARIA contract) ──

    function itemAttrs(value: string): Record<string, string> {
        const selected = isSelected(value);
        const role = groupRole.value;
        if (role === "radiogroup") {
            return { role: "radio", "aria-checked": selected ? "true" : "false" };
        }
        if (role === "tablist") {
            return { role: "tab", "aria-selected": selected ? "true" : "false" };
        }
        // `group` — N independent toggles.
        return { "aria-pressed": selected ? "true" : "false" };
    }

    return {
        activeValues,
        isSelected,
        select,
        rovingTabindex,
        onKeydown: onStripKeydown,
        singleSliderStyle,
        squishOnTravel,
        groupRole,
        itemAttrs,
    };
}
