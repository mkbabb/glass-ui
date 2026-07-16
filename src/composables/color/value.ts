import {
    oklch,
    type Alpha,
    type Color,
    type ColorIssue,
    type Result,
} from "@mkbabb/value.js/color";
import {
    parseCssColor,
    type CssColor,
    type ParseIssue,
} from "@mkbabb/value.js/css";

type LocalColorIssue = Readonly<{
    code: "color_non_opaque";
    alpha: Alpha;
}>;

/** The single Glass-domain failure for its Value color boundary. */
export class GlassColorError extends Error {
    constructor(
        readonly operation: string,
        readonly details: ColorIssue | LocalColorIssue | readonly ParseIssue[],
    ) {
        const code = "code" in details
            ? details.code
            : details.map((issue) => issue.code).join(", ");
        super(`${operation}: ${code}`);
        this.name = "GlassColorError";
    }
}

export function colorValue<T>(
    operation: string,
    result: Result<T, ColorIssue>,
): T {
    if (!result.ok) throw new GlassColorError(operation, result.error);
    return result.value;
}

export function opaqueCssColor(source: string, operation: string): CssColor {
    const parsed = parseCssColor(source);
    if (!parsed.ok) throw new GlassColorError(operation, parsed.diagnostics);
    if (parsed.value.alpha !== 1) {
        throw new GlassColorError(operation, {
            code: "color_non_opaque",
            alpha: parsed.value.alpha,
        });
    }
    return parsed.value;
}

export function oklchColor(stop: {
    L: number;
    C: number;
    h: number;
}): Color<"oklch"> {
    return colorValue("oklch", oklch(stop.L, stop.C, stop.h));
}

export function numericChannel(value: number | "none", operation: string): number {
    if (typeof value !== "number") {
        throw new GlassColorError(operation, { code: "color_missing_channel" });
    }
    return value;
}
