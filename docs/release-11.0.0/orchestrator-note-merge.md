# Orchestrator note after the merge

MIGRATION.md is consumer-facing, just as the CHANGELOG is, so its 11.0.0 section follows the same prose rules. Every row that still names an internal branch, wave or row id has to be rewritten in plain sentences. A critic should report anything left over as a defect.

The `anchor` prop's auto-margin pin stays only if it is the one mechanism and atlas renders the same with it. That means atlas's PlateDock at the flex end, at rest, expanded and collapsed, in both engines. If the pin duplicates something the measured origin already does, remove it.

The Firefox projects are outside this release's gates, since release.yml doesn't run them.
