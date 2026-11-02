// critique-1 probe config: the repo's webkit-2287 config with this directory as testDir.
import base from "../../../tests-visual/webkit-2287.config";
export default {
    ...base,
    testDir: ".",
    testMatch: "critique.spec.ts",
    projects: base.projects!.map((p) => ({ ...p, testMatch: "critique.spec.ts" })),
    reporter: [["list"], ["json", { outputFile: process.env.PI_REPORT ?? "critique.json" }]],
};
