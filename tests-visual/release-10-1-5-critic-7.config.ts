// critic round 7 (10.1.5): the 2287 WebKit config with the critic-7 specs matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: ["release-10-1-5-critic-7.spec.ts", "release-10-1-5-critic-7b.spec.ts", "release-10-1-5.spec.ts", "release-10-1-4.spec.ts", "release-10-1-3.spec.ts"] } : p,
    ),
};
