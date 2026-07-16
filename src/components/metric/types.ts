import type { Component, FunctionalComponent, HTMLAttributes } from "vue";

export type MetricValue = string | number | null | undefined;
export type MetricSize = "sm" | "md" | "lg" | "xl";
export type MetricOrientation = "inline" | "stacked";
export type MetricDensity = "default" | "compact";

export interface MetricValueProps {
    value?: MetricValue;
    unit?: string;
    placeholder?: string;
    loading?: boolean;
}

interface MetricTextProps extends MetricValueProps {
    label?: string;
    context?: string;
    class?: HTMLAttributes["class"];
}

export interface MetricProps extends MetricTextProps {
    size?: MetricSize;
    orientation?: MetricOrientation;
}

export interface MetricCellProps extends MetricTextProps {
    icon?: Component | FunctionalComponent | object | null;
    iconSize?: number;
    iconStrokeWidth?: number;
}

export interface MetricRowProps extends MetricTextProps {}

export interface MetricStackProps {
    density?: MetricDensity;
    class?: HTMLAttributes["class"];
}
