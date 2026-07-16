import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { ComputedRef, Ref } from "vue";
import type {
    SegmentedTabOption,
    SegmentedTabsResponsive,
} from "../SegmentedTabs.vue";

/**
 * Package-private composable for `SegmentedTabs.vue` —  (the
 * roving-focus/responsive carve; ratchet-drain #13). The responsive-collapse concern
 * (the `<Select>`-below-the-breakpoint fold) lives here, carved out of the SFC to hold
 * the no-god-module bound — the `useTabIndicator`/`useTabDragMorph` colocation-sibling
 * pattern. The SFC IMPORTS it and binds `stripValue`/`stripOptions`/`showMobileSelect`
 * in its template + feeds `stripValue`/`stripOptions` to the indicator/roving concerns.
 *
 * Owns the `matchMedia((min-width: <breakpoint>))` lifecycle END-TO-END (the
 * `onMounted`/`onBeforeUnmount` wiring lives HERE — a composable is a legitimate
 * lifecycle-hook owner), so the SFC never re-declares the `mql` listener. Byte-behaviour
 * identical to the prior inline block (the SSR/desktop-first default, the mobile-only
 * model fall-back, the accessible name resolution).
 */
export interface UseTabResponsiveParams {
    /** The `:responsive` prop — `false` | `true` | a tuning object. */
    responsive: () => boolean | SegmentedTabsResponsive;
    /** The full option list (the mobile `<Select>` keeps ALL options). */
    options: ComputedRef<SegmentedTabOption[]>;
    /** The single-select model (the strip value the collapse falls back off). */
    model: Ref<string | undefined>;
}

export interface UseTabResponsiveReturn {
    /** The resolved responsive config, or `null` when `:responsive` is off. */
    responsiveCfg: ComputedRef<SegmentedTabsResponsive | null>;
    /** The collapse breakpoint CSS length (default `"640px"`). */
    breakpoint: ComputedRef<string>;
    /** The desktop-strip option subset (falls back to the full list). */
    desktopOptions: ComputedRef<SegmentedTabOption[]>;
    /** `true` at/above the breakpoint (the matchMedia state; SSR-default `true`). */
    isDesktop: Ref<boolean>;
    /** The value the STRIP renders (falls back off a mobile-only model). */
    stripValue: ComputedRef<string | undefined>;
    /** The options the STRIP renders (desktop subset when responsive, else full). */
    stripOptions: ComputedRef<SegmentedTabOption[]>;
    /** The accessible name for the mobile `<SelectTrigger>`. */
    mobileAriaLabel: ComputedRef<string>;
    /** `true` when the mobile `<Select>` should render (responsive + below breakpoint). */
    showMobileSelect: ComputedRef<boolean>;
}

export function useTabResponsive(
    params: UseTabResponsiveParams,
): UseTabResponsiveReturn {
    const { responsive, options, model } = params;

    const responsiveCfg = computed<SegmentedTabsResponsive | null>(() => {
        const r = responsive();
        if (r === false) return null;
        if (r === true) return {};
        return r;
    });
    const breakpoint = computed(() => responsiveCfg.value?.breakpoint ?? "640px");
    const desktopOptions = computed(
        () => responsiveCfg.value?.desktopOptions ?? options.value,
    );

    // SSR/desktop-first default; the matchMedia listener corrects on mount.
    const isDesktop = ref(true);
    let mql: MediaQueryList | null = null;
    function onMql(e: MediaQueryListEvent | MediaQueryList) {
        if ("currentTarget" in e && e.currentTarget && e.currentTarget !== mql) return;
        isDesktop.value = e.matches;
    }

    // The active value the strip renders — when the model points at a mobile-only
    // option (absent from `desktopOptions`), fall back to the first enabled desktop
    // option. A fully-disabled subset has no fabricated selection.
    const stripValue = computed(() => {
        if (!responsiveCfg.value) return model.value;
        const opts = desktopOptions.value;
        if (opts.some((o) => o.value === model.value)) return model.value;
        return opts.find((option) => !option.disabled)?.value;
    });
    const stripOptions = computed(() =>
        responsiveCfg.value ? desktopOptions.value : options.value,
    );
    const mobileAriaLabel = computed(
        () =>
            responsiveCfg.value?.ariaLabel ??
            options.value.find((o) => o.value === model.value)?.label ??
            "Select",
    );
    const showMobileSelect = computed(
        () => !!responsiveCfg.value && !isDesktop.value,
    );

    let mounted = false;
    function bindMediaQuery() {
        mql?.removeEventListener("change", onMql);
        mql = null;
        if (
            !mounted ||
            !responsiveCfg.value ||
            typeof window === "undefined" ||
            !window.matchMedia
        ) {
            isDesktop.value = true;
            return;
        }
        mql = window.matchMedia(`(min-width: ${breakpoint.value})`);
        isDesktop.value = mql.matches;
        mql.addEventListener("change", onMql);
    }

    watch([responsiveCfg, breakpoint], bindMediaQuery);
    onMounted(() => {
        mounted = true;
        bindMediaQuery();
    });

    onBeforeUnmount(() => {
        mounted = false;
        mql?.removeEventListener("change", onMql);
        mql = null;
    });

    return {
        responsiveCfg,
        breakpoint,
        desktopOptions,
        isDesktop,
        stripValue,
        stripOptions,
        mobileAriaLabel,
        showMobileSelect,
    };
}
