#!/bin/bash
# writes the S-14 plant module into each zone of wt, plus B15 / B6 / B2 plants; prints the planted paths
W=$1
body() { cat <<'T'
import { existsSync, readFileSync } from "node:fs";
export function ternLit() { return existsSync("package.json") ? readFileSync("package.json", "utf8") : ""; }
export function ternParam(p: string) { return existsSync(p) ? readFileSync(p, "utf8") : ""; }
export function posLit() { if (existsSync("package.json")) return readFileSync("package.json", "utf8"); return null; }
export function posParam(p: string, acc: string) { if (existsSync(p)) { return readFileSync(p, "utf8"); } return acc; }
export function catchRetLit() { try { return readFileSync("package.json", "utf8"); } catch { return ""; } }
export function catchRetParam(p: string) { try { return readFileSync(p, "utf8"); } catch { return null; } }
export function catchEmptyParam(p: string) { let t = "x"; try { t = readFileSync(p, "utf8"); } catch {} return t; }
export function thenLit() { return import("node:path").then((m) => m, () => null); }
export function loaderBound() { const load = () => import("node:path"); return load().catch(() => null); }
export function loaderParam(comps: Array<() => Promise<unknown>>) { return comps.map((c) => c().catch(() => undefined)); }
T
}
for z in src/utils demo/composables tests/harness tests-visual/lib scripts/lib; do mkdir -p $W/$z; body > $W/$z/s14plant.ts; echo "$z/s14plant.ts"; done
# B15: placeholder stem with a digit suffix
mkdir -p $W/src/utils; echo 'export const z = 1;' > $W/src/utils/helpers2.ts; echo src/utils/helpers2.ts
# B6: a directory over 12 files after the splits
mkdir -p $W/src/utils/overfull; for i in a b c d e f g h i j k l m; do echo "export const v = 1;" > $W/src/utils/overfull/part$i.ts; done; echo src/utils/overfull
# B2: a demo reach re-pointed onto a private module
echo 'import { useDockState } from "../../src/components/dock/composables/useDockState"; export const k = useDockState;' > $W/demo/composables/b2plant.ts; echo demo/composables/b2plant.ts
