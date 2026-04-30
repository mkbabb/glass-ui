# D.W0.C - UI facade list

## Scope and commands

Scanned `src/components/ui/` for single-root Vue wrappers whose template only forwards props and/or applies static `cn(...)` classes around a slot. Excluded wrappers with local interaction, model plumbing, injected context, default icon behavior, or multi-element composition.

Evidence commands:

```sh
rg -n 'v-bind="props"|v-bind="forwarded"|v-bind="delegatedProps"|v-bind="forwardedProps"|:class="cn\(' src/components/ui -g '*.vue'
rg -n '\b<Candidate>\b' ../fourier-analysis/web/src
rg -n '\b<Candidate>\b' ../words/frontend/src
rg -n '\b<Candidate>\b' ../bbnf-lang/playground/src
```

Consumer roots verified present:

```text
../fourier-analysis/web/src
../words/frontend/src
../bbnf-lang/playground/src
```

Verdict rule: any candidate with at least one hit in the three consumer trees is `keep-as-wired-facade`; candidates with zero hits across all three are `delete` for D.W2.B, subject to the required pre-delete re-grep.

## Verdict distribution

| Verdict | Count |
|---|---:|
| keep-as-wired-facade | 29 |
| delete | 39 |
| total candidates | 68 |

## Candidate table

| Candidate | Definition site | Consumer hits | Verdict | Evidence |
|---|---|---:|---|---|
| Accordion | `src/components/ui/accordion/Accordion.vue` | fourier=0 / words=4 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/sidebar/SidebarLookupView.vue:3` |
| AccordionItem | `src/components/ui/accordion/AccordionItem.vue` | fourier=0 / words=6 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/sidebar/GoldenSidebarSection.vue:2` |
| AvatarFallback | `src/components/ui/avatar/AvatarFallback.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| AvatarImage | `src/components/ui/avatar/AvatarImage.vue` | fourier=0 / words=2 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/sidebar/SidebarHeader.vue:22` |
| CardContent | `src/components/ui/card/CardContent.vue` | fourier=0 / words=27 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/definition/components/PhrasesSection.vue:2` |
| CardDescription | `src/components/ui/card/CardDescription.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| CardFooter | `src/components/ui/card/CardFooter.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| CardHeader | `src/components/ui/card/CardHeader.vue` | fourier=0 / words=10 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/definition/components/WordHeader.vue:2` |
| CardTitle | `src/components/ui/card/CardTitle.vue` | fourier=0 / words=3 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/definition/components/WordHeader.vue:4` |
| CollapsibleContent | `src/components/ui/collapsible/CollapsibleContent.vue` | fourier=6 / words=0 / bbnf=0 | keep-as-wired-facade | `../fourier-analysis/web/src/components/ui/CollapsibleSection.vue:2` |
| CollapsibleTrigger | `src/components/ui/collapsible/CollapsibleTrigger.vue` | fourier=6 / words=0 / bbnf=0 | keep-as-wired-facade | `../fourier-analysis/web/src/components/ui/CollapsibleSection.vue:2` |
| CommandShortcut | `src/components/ui/command/CommandShortcut.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenu | `src/components/ui/context-menu/ContextMenu.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenuGroup | `src/components/ui/context-menu/ContextMenuGroup.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenuPortal | `src/components/ui/context-menu/ContextMenuPortal.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenuRadioGroup | `src/components/ui/context-menu/ContextMenuRadioGroup.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenuShortcut | `src/components/ui/context-menu/ContextMenuShortcut.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenuSub | `src/components/ui/context-menu/ContextMenuSub.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| ContextMenuTrigger | `src/components/ui/context-menu/ContextMenuTrigger.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| Dialog | `src/components/ui/dialog/Dialog.vue` | fourier=0 / words=14 / bbnf=6 | keep-as-wired-facade | `../words/frontend/src/components/custom/Modal.vue:2`; `../bbnf-lang/playground/src/components/layout/FormatterSettings.vue:3` |
| DialogClose | `src/components/ui/dialog/DialogClose.vue` | fourier=0 / words=3 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/modals/WordDetailModal.vue:15` |
| DialogDescription | `src/components/ui/dialog/DialogDescription.vue` | fourier=0 / words=3 / bbnf=4 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue:9`; `../bbnf-lang/playground/src/components/layout/FormatterSettings.vue:3` |
| DialogFooter | `src/components/ui/dialog/DialogFooter.vue` | fourier=0 / words=3 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue:31` |
| DialogHeader | `src/components/ui/dialog/DialogHeader.vue` | fourier=0 / words=3 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue:7` |
| DialogTitle | `src/components/ui/dialog/DialogTitle.vue` | fourier=0 / words=4 / bbnf=4 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue:8`; `../bbnf-lang/playground/src/components/layout/FormatterSettings.vue:3` |
| DialogTrigger | `src/components/ui/dialog/DialogTrigger.vue` | fourier=0 / words=0 / bbnf=6 | keep-as-wired-facade | `../bbnf-lang/playground/src/components/layout/FormatterSettings.vue:3` |
| Drawer | `src/components/ui/drawer/Drawer.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DrawerDescription | `src/components/ui/drawer/DrawerDescription.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DrawerFooter | `src/components/ui/drawer/DrawerFooter.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DrawerHeader | `src/components/ui/drawer/DrawerHeader.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DrawerTitle | `src/components/ui/drawer/DrawerTitle.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DropdownMenu | `src/components/ui/dropdown-menu/DropdownMenu.vue` | fourier=3 / words=12 / bbnf=0 | keep-as-wired-facade | `../fourier-analysis/web/src/components/layout/AppHeader.vue:10`; `../words/frontend/src/components/custom/auth/UserMenu.vue:20` |
| DropdownMenuGroup | `src/components/ui/dropdown-menu/DropdownMenuGroup.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DropdownMenuRadioGroup | `src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DropdownMenuShortcut | `src/components/ui/dropdown-menu/DropdownMenuShortcut.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DropdownMenuSub | `src/components/ui/dropdown-menu/DropdownMenuSub.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| DropdownMenuTrigger | `src/components/ui/dropdown-menu/DropdownMenuTrigger.vue` | fourier=3 / words=12 / bbnf=0 | keep-as-wired-facade | `../fourier-analysis/web/src/components/layout/AppHeader.vue:11`; `../words/frontend/src/components/custom/wordlist/WordlistGrid.vue:20` |
| HoverCard | `src/components/ui/hover-card/HoverCard.vue` | fourier=4 / words=50 / bbnf=0 | keep-as-wired-facade | `../fourier-analysis/web/src/components/layout/AppHeader.vue:14`; `../words/frontend/src/components/custom/definition/components/ThesaurusView.vue:54` |
| HoverCardTrigger | `src/components/ui/hover-card/HoverCardTrigger.vue` | fourier=6 / words=50 / bbnf=3 | keep-as-wired-facade | `../fourier-analysis/web/src/components/layout/AppHeader.vue:15`; `../words/frontend/src/components/custom/definition/components/WordHeader.vue:21` |
| NumberFieldContent | `src/components/ui/number-field/NumberFieldContent.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| Popover | `src/components/ui/popover/Popover.vue` | fourier=0 / words=22 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/sidebar/SidebarHeader.vue:15` |
| PopoverTrigger | `src/components/ui/popover/PopoverTrigger.vue` | fourier=0 / words=21 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/search/components/results/SearchResultItem.vue:80` |
| Select | `src/components/ui/select/Select.vue` | fourier=14 / words=17 / bbnf=10 | keep-as-wired-facade | `../fourier-analysis/web/src/components/morph/MorphPhaseConfig.vue:36`; `../bbnf-lang/playground/src/components/layout/FormatterSettings.vue:3` |
| SelectGroup | `src/components/ui/select/SelectGroup.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SelectItemText | `src/components/ui/select/SelectItemText.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SelectLabel | `src/components/ui/select/SelectLabel.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SelectSeparator | `src/components/ui/select/SelectSeparator.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SelectValue | `src/components/ui/select/SelectValue.vue` | fourier=7 / words=2 / bbnf=4 | keep-as-wired-facade | `../fourier-analysis/web/src/components/morph/MorphPhaseConfig.vue:38`; `../words/frontend/src/components/custom/definition/components/metadata/ProviderVersionSelector.vue:71` |
| Sheet | `src/components/ui/sheet/Sheet.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SheetClose | `src/components/ui/sheet/SheetClose.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SheetDescription | `src/components/ui/sheet/SheetDescription.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SheetFooter | `src/components/ui/sheet/SheetFooter.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SheetHeader | `src/components/ui/sheet/SheetHeader.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SheetTitle | `src/components/ui/sheet/SheetTitle.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| SheetTrigger | `src/components/ui/sheet/SheetTrigger.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableBody | `src/components/ui/table/TableBody.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableCaption | `src/components/ui/table/TableCaption.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableCell | `src/components/ui/table/TableCell.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableFooter | `src/components/ui/table/TableFooter.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableHead | `src/components/ui/table/TableHead.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableHeader | `src/components/ui/table/TableHeader.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| TableRow | `src/components/ui/table/TableRow.vue` | fourier=0 / words=0 / bbnf=0 | delete | no consumer hits |
| Tabs | `src/components/ui/tabs/Tabs.vue` | fourier=0 / words=8 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/definition/components/ProviderViewTabs.vue:2` |
| TabsContent | `src/components/ui/tabs/TabsContent.vue` | fourier=0 / words=6 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/definition/components/ProviderViewTabs.vue:10` |
| TabsList | `src/components/ui/tabs/TabsList.vue` | fourier=0 / words=4 / bbnf=0 | keep-as-wired-facade | `../words/frontend/src/components/custom/search/components/controls/SearchControls.vue:29` |
| Tooltip | `src/components/ui/tooltip/Tooltip.vue` | fourier=86 / words=46 / bbnf=39 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/views/WordListView.vue:25`; `../fourier-analysis/web/src/App.vue:4` |
| TooltipProvider | `src/components/ui/tooltip/TooltipProvider.vue` | fourier=3 / words=14 / bbnf=3 | keep-as-wired-facade | `../fourier-analysis/web/src/App.vue:4`; `../words/frontend/src/components/custom/wordlist/views/WordListView.vue:23` |
| TooltipTrigger | `src/components/ui/tooltip/TooltipTrigger.vue` | fourier=4 / words=46 / bbnf=37 | keep-as-wired-facade | `../words/frontend/src/components/custom/wordlist/LeechPanel.vue:6`; `../bbnf-lang/playground/src/components/layout/FormatterSettings.vue:3` |

## D.W2 handoff

D.W2.B may delete the 39 `delete` rows after re-running the same consumer greps immediately before source edits. The 29 `keep-as-wired-facade` rows remain in D and are natural E candidates for consumer migration or subpath/core redesign.
