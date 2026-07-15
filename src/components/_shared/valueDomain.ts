export interface ResolvedValueMark {
    value: number;
    position: number;
}

const validDomain = (min: number, max: number) =>
    Number.isFinite(min) && Number.isFinite(max) && max > min;

export function resolveValueFraction(
    value: number | null | undefined,
    min: number,
    max: number,
): number {
    if (!validDomain(min, max)) return 0;
    const finiteValue = typeof value === "number" && Number.isFinite(value) ? value : min;
    return (Math.min(max, Math.max(min, finiteValue)) - min) / (max - min);
}

export function resolveValueMarks(
    marks: readonly number[] | undefined,
    min: number,
    max: number,
): ResolvedValueMark[] {
    if (!marks?.length || !validDomain(min, max)) return [];

    return [...new Set(marks.filter((mark) => Number.isFinite(mark) && mark > min && mark < max))]
        .sort((a, b) => a - b)
        .map((value) => ({ value, position: (value - min) / (max - min) }));
}
