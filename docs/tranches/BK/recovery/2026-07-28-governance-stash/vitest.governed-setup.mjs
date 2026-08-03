import { verifyGovernedRoster } from "./scripts/verify-governed-invariants.mjs";

export default function governedSemanticSetup(project) {
    verifyGovernedRoster({ root: process.cwd() });
    project.onTestsRerun(() => {
        verifyGovernedRoster({ root: process.cwd() });
    });
}
