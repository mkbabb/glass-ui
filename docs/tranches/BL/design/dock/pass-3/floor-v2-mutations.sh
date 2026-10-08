#!/bin/bash
# floor-v2-mutations.sh: each floor v2 gate and unit test must FAIL on a planted mutation (D2 pass 3,
# FLOOR-V2.md §3). Plants one mutation at a time into a worktree carrying floor-v2.patch, runs the dock
# unit suites, prints the tests that failed, and restores the file.
#   bash floor-v2-mutations.sh <worktree>
set -u
W=$1; cd "$W" || exit 2
mut() { local name=$1 file=$2 py=$3; cp "$file" "$file.mutbak"; python3 -c "$py" "$file"
  local r; r=$(npx vitest run --no-cache tests/components/custom/dock 2>&1 | grep -E "^\s+×" | sed 's/^\s*//' | tr '\n' '|')
  mv "$file.mutbak" "$file"; echo "$name => ${r:-NO FAILURE}"; }
R='import sys;p=sys.argv[1];s=open(p).read();'
W_='open(p,"w").write(s)'
mut margin-auto src/components/dock/styles/shell.css "$R"'s=s.replace("margin: var(--dock-gutter);","margin: var(--dock-gutter) auto;");'"$W_"
mut fixed-centre src/components/dock/styles/dock.css "$R"'s=s.replace("    [data-reserve] {","    .glass-dock.fixed { margin-inline: auto; }\n    [data-reserve] {");'"$W_"
mut centre-origin src/components/dock/styles/layers.css "$R"'s=s.replace("transform-origin: calc(var(--dock-anchor) * 100%) 50%;","transform-origin: center center;");'"$W_"
mut no-anchor-read src/components/dock/composables/useDockMorph.ts "$R"'s=s.replace("return Math.min(1, Math.max(0, (small.start - large.start) / grown));","return 0.5;");'"$W_"
mut second-MO src/components/dock/composables/useDockRun.ts "$R"'s=s.replace("let unsubscribe: (() => void) | null = null;","let unsubscribe: (() => void) | null = null;\n    const extra = typeof MutationObserver === \"undefined\" ? null : new MutationObserver(() => syncRoving());");'"$W_"
mut no-subscriber src/components/dock/composables/useDockContent.ts "$R"'s=s.replace("for (const fn of subscribers) fn();","");'"$W_"
mut unread-publish src/components/dock/composables/dockMorphMeasure.ts "$R"'s=s.replace("root.style.setProperty(\"--dock-expanded-px\", `${expanded}px`);","root.style.setProperty(\"--dock-expanded-px\", `${expanded}px`);\n        root.style.setProperty(\"--dock-chrome-px\", `${chrome}px`);");'"$W_"
mut unscoped-finish src/components/dock/composables/useDockRun.ts "$R"'s=s.replace("function judgeOverflow(): void {","function judgeOverflow(): void {\n        for (const a of runEl.value?.getAnimations({ subtree: true }) ?? []) a.finish();");'"$W_"
mut infinite-taken src/components/dock/composables/dockSizeHandoff.ts "$R"'s=s.replace("=== Number.POSITIVE_INFINITY) return \"follow\";","=== Number.POSITIVE_INFINITY) continue;");'"$W_"
mut exchange-taken src/components/dock/composables/dockSizeHandoff.ts "$R"'s=s.replace("if (Math.abs(delta) <= HANDOFF_HOLD_PX) return \"hold\";","");'"$W_"
mut no-gutter src/components/dock/styles/shell.css "$R"'s=s.replace("        margin: var(--dock-gutter);\n","");'"$W_"
mut badge-unclamped src/components/dock/styles/controls/seat-badge.css "$R"'s=s.replace("max-inline-size: 100%;","");'"$W_"
mut roving-stays src/components/dock/composables/useDockRun.ts "$R"'s=s.replace("        run.addEventListener(\"focusout\", onLeave);\n","");'"$W_"
mut badge-dropped src/components/dock/DockControl.vue "$R"'s=s.replace("<span v-if=\"slots.badge\" class=\"dock-seat-badge\"><slot name=\"badge\" /></span>","");'"$W_"
echo "status after the plants (must list no source file):"; git -C "$W" status --porcelain --untracked-files=no | grep -v "^ M" || true
