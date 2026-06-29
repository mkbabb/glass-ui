import type {
    AuroraMedium,
    FlowPattern,
    StrokeMode,
    WarpMode,
} from "@glass/components/custom/aurora";

type TabOption<T extends string> = {
    label: string;
    value: T;
};

export const mediumOptions = [
    { label: "Smooth", value: "smooth" },
    { label: "Watercolor", value: "watercolor" },
    { label: "Pastel", value: "pastel" },
    { label: "Oil", value: "oil" },
    // AX.W13 — crayon (DRY tooth-multiply), van-Gogh (atomic comma dabs), and
    // oil-pastel (stroke deposition) are first-class mediums, each its own body.
    { label: "Crayon", value: "crayon" },
    { label: "Van Gogh", value: "vangogh" },
    { label: "Oil Pastel", value: "oil-pastel" },
    // BB.W-AUR-KUWAHARA — the anisotropic-Kuwahara edge-preserving painterly finish
    // (uMedium==7), an OPT-IN medium reached only by this explicit selection.
    { label: "Kuwahara", value: "kuwahara" },
] as const satisfies readonly TabOption<AuroraMedium>[];

// AX.W13 — the strokeMode tab is oil sub-modes ONLY; the legacy "Crayon" entry is
// gone (crayon is a first-class medium now, not a stroke mode).
export const strokeModeOptions = [
    { label: "Oil", value: "oil" },
    { label: "Knife", value: "knife" },
    { label: "Chunky", value: "chunky" },
] as const satisfies readonly TabOption<StrokeMode>[];

export const flowPatternOptions = [
    { label: "None", value: "none" },
    { label: "Radial", value: "radial" },
    { label: "Swirl", value: "swirl" },
    { label: "Diagonal", value: "diagonal" },
    { label: "Multi", value: "multi" },
] as const satisfies readonly TabOption<FlowPattern>[];

export const warpModeOptions = [
    { label: "fBm", value: "fbm" },
    { label: "Cellular", value: "cellular" },
    { label: "Hybrid", value: "hybrid" },
] as const satisfies readonly TabOption<WarpMode>[];

export const strokeLayersOptions = [
    { label: "Single", value: "1" },
    { label: "Crosshatch", value: "2" },
] as const satisfies readonly TabOption<"1" | "2">[];

export const noiseOctavesOptions = [
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
] as const satisfies readonly TabOption<"3" | "4" | "5">[];

export const layerOptions = [
    { label: "Medium", value: "medium" },
    { label: "Palette", value: "palette" },
    { label: "Flow", value: "flow" },
    { label: "Texture", value: "texture" },
    { label: "Comp", value: "composition" },
    { label: "Nuclei", value: "nuclei" },
] as const satisfies readonly TabOption<
    "medium" | "palette" | "flow" | "texture" | "composition" | "nuclei"
>[];
