// W-AUR-VANGOGH-REBUILD — standalone harness: mounts the REAL aurora runtime with the
// VANGOGH (or any preset via ?preset=) config on a bare canvas, bypassing the demo
// studio chrome (which a sibling lane is mid-rebuild on). The Vite demo dev server
// bundles this; the capture script navigates here. ?medium= forces a medium override.

import { createAurora } from "../src/components/aurora/composables/runtime";
import { PRESETS } from "../demo/stories/substrates/aurora/presets";
import type { AuroraConfig, AuroraMedium } from "../src/components/aurora/constants/presets";

const params = new URLSearchParams(location.search);
const presetKey = (params.get("preset") ?? "VANGOGH").toUpperCase();
const mediumOverride = params.get("medium") as AuroraMedium | null;

const presetMap = PRESETS as Record<string, AuroraConfig>;
const base = presetMap[presetKey] ?? presetMap.VANGOGH;
const config: AuroraConfig = mediumOverride
    ? { ...base, medium: mediumOverride }
    : { ...base };

const stage = document.getElementById("stage")!;
const canvas = document.createElement("canvas");
canvas.className = "aurora-canvas";
stage.appendChild(canvas);

const rt = createAurora(canvas, config, { mode: "capture", initStrategy: "eager" });
rt.arm();

// expose for the capture script to drive deterministic frames + swap medium
(window as unknown as { __aur: unknown }).__aur = {
    renderAt: (t: number) => rt.renderAt(t),
    setMedium: (m: AuroraMedium) => rt.update({ ...config, medium: m }),
    update: (c: Partial<AuroraConfig>) => rt.update({ ...config, ...c }),
};
(window as unknown as { __aurReady: boolean }).__aurReady = true;
