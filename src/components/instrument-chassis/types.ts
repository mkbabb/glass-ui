import type { HTMLAttributes } from "vue";

export type InstrumentChassisState = "ready" | "active" | "complete" | "loading";
export type InstrumentChassisProportion = "golden" | "preview-dominant";
export type InstrumentChassisBoundary = "stage-inspector" | "inspector-action";
export type InstrumentChassisReserve = "none" | "stage" | "inspector" | "both";

export interface InstrumentChassisProps {
    state?: InstrumentChassisState;
    tone?: string;
    proportion?: InstrumentChassisProportion;
    boundaries?: readonly InstrumentChassisBoundary[];
    reserve?: InstrumentChassisReserve;
    class?: HTMLAttributes["class"];
}
