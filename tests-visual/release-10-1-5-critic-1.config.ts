// critic round 1 (10.1.5): the 2287 WebKit config with the critic spec matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: ["release-10-1-5-critic-1.spec.ts", "release-10-1-5-critic-1b.spec.ts", "release-10-1-5-critic-1c.spec.ts", "release-10-1-5.spec.ts"] } : p,
    ),
};
