# Orchestrator note, round 4

I accept fix 4 as measured for its scope. Its one unrun WebKit cell was `tests-visual/shell-identity.spec.ts`, where the round changed only a code comment. That spec is dead: it looks for `a[aria-label="glass-ui home"]`, which was removed from the demo in 8bf41d0bc. It fails 3 of 3 in Chromium at v10.1.4, at master and on the U line, and no release spec set includes it.

Ruling: delete `tests-visual/shell-identity.spec.ts`. A gate that cannot pass measures nothing (the gates-abrogation mandate). If it holds a claim that is still true, re-home that claim into a live spec in the same commit; otherwise drop it.

Critic 4 confirms the deletion, and confirms that nothing else references the file.
