export type ControlSize = "sm" | "md" | "lg";

const controlSizeClasses: Record<ControlSize, string> = {
    sm: "[--control-pill-h:var(--control-h-sm)] [--control-pill-text:var(--control-text-sm)]",
    md: "",
    lg: "[--control-pill-h:var(--control-h-lg)]",
};

export const controlSizeClass = (size: ControlSize = "md") =>
    controlSizeClasses[size];
