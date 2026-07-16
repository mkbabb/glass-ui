import { computed, type AriaAttributes } from "vue";

export type FieldControlState = "default" | "invalid" | "readonly" | "disabled";

export function isAriaInvalid(value: unknown): boolean {
    return (
        value === true ||
        value === "true" ||
        value === "grammar" ||
        value === "spelling"
    );
}

function resolveFieldControlState(
    disabled: boolean,
    readonly: boolean,
    invalid: boolean,
): FieldControlState {
    if (disabled) return "disabled";
    if (readonly) return "readonly";
    if (invalid) return "invalid";
    return "default";
}

export function useFieldControlState(
    props: { disabled?: boolean; invalid?: boolean; readonly?: boolean },
    attrs: Record<string, unknown>,
) {
    const ariaInvalid = computed<AriaAttributes["aria-invalid"]>(() =>
        props.invalid
            ? "true"
            : (attrs["aria-invalid"] as AriaAttributes["aria-invalid"]),
    );
    const state = computed(() =>
        resolveFieldControlState(
            Boolean(props.disabled),
            Boolean(props.readonly),
            isAriaInvalid(ariaInvalid.value),
        ),
    );
    const forwardedAttrs = computed(() => {
        const { "aria-invalid": _ariaInvalid, ...forwarded } = attrs;
        return forwarded;
    });

    return { ariaInvalid, forwardedAttrs, state };
}
