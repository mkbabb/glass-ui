// critic round 9 (10.1.5): the 2287 WebKit config with the critic-9 and critic-8 specs matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: ["release-10-1-5-critic-9.spec.ts", "release-10-1-5-critic-9b.spec.ts", "release-10-1-5-critic-9c.spec.ts", "release-10-1-5.spec.ts", "release-10-1-4.spec.ts", "release-10-1-3.spec.ts"] } : p,
    ),
};
