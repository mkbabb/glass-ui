# D.W0.A.1 Hardened Overfitting Audit: `src/components/ui/`

Scope: `src/components/ui/`. Usage was counted across `src/`, `demo/`, `../fourier-analysis/web/src/`, `../words/frontend/src/`, and `../bbnf-lang/playground/src/`. Source counts exclude the artefact definition file and public barrel files so `src/index.ts` re-export chains cannot auto-keep an unused symbol. Component commands use the W0 tag-form refinement, `<ComponentName\b`, plus symbol-form grep. Public surface was checked through `src/index.ts` -> `src/components/index.ts` -> `src/components/ui/index.ts` -> each component package barrel.

Consumer dirs missing: none.

## Verdict Distribution

| verdict | count |
|---|---:|
| keep | 117 |
| keep-current | 73 |
| library-orphan | 9 |
| delete-unused | 0 |
| inline-and-remove | 0 |
| generalize | 0 |
| demo-only-private | 0 |
| **total** | **199** |

Actionable counts are split explicitly: `library-orphan` = public surface with zero current sites; `delete-unused` = non-public zero-site dead code; `keep-current` = public surface with exactly one current site; `keep` = two or more current sites.

## Public Surface Barrel Checks

These commands prove the export chain for each UI package through the root public surface. Row-level `in-public-surface` uses the matching package command below plus the package-local exported symbol.

- accordion: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./accordion"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/accordion/index.ts
```

- alert: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./alert"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/alert/index.ts
```

- avatar: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./avatar"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/avatar/index.ts
```

- badge: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./badge"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/badge/index.ts
```

- button: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./button"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/button/index.ts
```

- card: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./card"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/card/index.ts
```

- carousel: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./carousel"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/carousel/index.ts
```

- checkbox: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./checkbox"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/checkbox/index.ts
```

- collapsible: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./collapsible"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/collapsible/index.ts
```

- combobox: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./combobox"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/combobox/index.ts
```

- command: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./command"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/command/index.ts
```

- context-menu: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./context-menu"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/context-menu/index.ts
```

- data-table: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./data-table"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/data-table/index.ts
```

- dialog: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./dialog"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/dialog/index.ts
```

- drawer: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./drawer"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/drawer/index.ts
```

- dropdown-menu: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./dropdown-menu"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/dropdown-menu/index.ts
```

- hover-card: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./hover-card"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/hover-card/index.ts
```

- input: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./input"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/input/index.ts
```

- label: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./label"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/label/index.ts
```

- multi-select: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./multi-select"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/multi-select/index.ts
```

- notification: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./notification"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/notification/index.ts
```

- number-field: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./number-field"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/number-field/index.ts
```

- popover: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./popover"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/popover/index.ts
```

- progress: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./progress"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/progress/index.ts
```

- radio-group: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./radio-group"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/radio-group/index.ts
```

- select: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./select"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/select/index.ts
```

- separator: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./separator"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/separator/index.ts
```

- sheet: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./sheet"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/sheet/index.ts
```

- skeleton: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./skeleton"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/skeleton/index.ts
```

- slider: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./slider"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/slider/index.ts
```

- switch: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./switch"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/switch/index.ts
```

- table: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./table"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/table/index.ts
```

- tabs: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./tabs"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/tabs/index.ts
```

- tags-input: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./tags-input"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/tags-input/index.ts
```

- textarea: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./textarea"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/textarea/index.ts
```

- toast: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./toast"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/toast/index.ts
```

- toggle: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./toggle"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/toggle/index.ts
```

- toggle-group: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./toggle-group"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/toggle-group/index.ts
```

- tooltip: public chain yes

```sh
rg -n '(export \* from "\./components"|export \* from "\./ui"|export \* from "\./tooltip"|^[[:space:]]*export .*\b)' src/index.ts src/components/index.ts src/components/ui/index.ts src/components/ui/tooltip/index.ts
```

## Artefact Rows

| evidence | artefact | kind | def-site | in-public-surface | sites-in-src | sites-in-demo | sites-in-consumers | total-sites | verdict |
|---|---|---|---|---|---:|---:|---:|---:|---|
| E001 | `Accordion` | component | `src/components/ui/accordion/Accordion.vue` | yes | 0 | 2 | 1 | 3 | keep |
| E002 | `AccordionContent` | component | `src/components/ui/accordion/AccordionContent.vue` | yes | 0 | 1 | 2 | 3 | keep |
| E003 | `AccordionItem` | component | `src/components/ui/accordion/AccordionItem.vue` | yes | 0 | 1 | 2 | 3 | keep |
| E004 | `AccordionTrigger` | component | `src/components/ui/accordion/AccordionTrigger.vue` | yes | 0 | 1 | 2 | 3 | keep |
| E005 | `Alert` | component | `src/components/ui/alert/Alert.vue` | yes | 0 | 3 | 0 | 3 | keep |
| E006 | `AlertDescription` | component | `src/components/ui/alert/AlertDescription.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E007 | `AlertTitle` | component | `src/components/ui/alert/AlertTitle.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E008 | `Avatar` | component | `src/components/ui/avatar/Avatar.vue` | yes | 0 | 4 | 2 | 6 | keep |
| E009 | `AvatarFallback` | component | `src/components/ui/avatar/AvatarFallback.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E010 | `AvatarImage` | component | `src/components/ui/avatar/AvatarImage.vue` | yes | 0 | 2 | 1 | 3 | keep |
| E011 | `Badge` | component | `src/components/ui/badge/Badge.vue` | yes | 2 | 5 | 7 | 14 | keep |
| E012 | `Button` | component | `src/components/ui/button/Button.vue` | yes | 9 | 24 | 33 | 66 | keep |
| E013 | `Card` | component | `src/components/ui/card/Card.vue` | yes | 5 | 10 | 20 | 35 | keep |
| E014 | `CardContent` | component | `src/components/ui/card/CardContent.vue` | yes | 0 | 5 | 7 | 12 | keep |
| E015 | `CardDescription` | component | `src/components/ui/card/CardDescription.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E016 | `CardFooter` | component | `src/components/ui/card/CardFooter.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E017 | `CardHeader` | component | `src/components/ui/card/CardHeader.vue` | yes | 0 | 2 | 2 | 4 | keep |
| E018 | `CardTitle` | component | `src/components/ui/card/CardTitle.vue` | yes | 0 | 2 | 1 | 3 | keep |
| E019 | `Carousel` | component | `src/components/ui/carousel/Carousel.vue` | yes | 1 | 2 | 2 | 5 | keep |
| E020 | `CarouselContent` | component | `src/components/ui/carousel/CarouselContent.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E021 | `CarouselItem` | component | `src/components/ui/carousel/CarouselItem.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E022 | `CarouselNext` | component | `src/components/ui/carousel/CarouselNext.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E023 | `CarouselPrevious` | component | `src/components/ui/carousel/CarouselPrevious.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E024 | `Checkbox` | component | `src/components/ui/checkbox/Checkbox.vue` | yes | 0 | 4 | 0 | 4 | keep |
| E025 | `Collapsible` | component | `src/components/ui/collapsible/Collapsible.vue` | yes | 1 | 3 | 2 | 6 | keep |
| E026 | `CollapsibleContent` | component | `src/components/ui/collapsible/CollapsibleContent.vue` | yes | 0 | 1 | 2 | 3 | keep |
| E027 | `CollapsibleTrigger` | component | `src/components/ui/collapsible/CollapsibleTrigger.vue` | yes | 0 | 1 | 2 | 3 | keep |
| E028 | `Combobox` | component | `src/components/ui/combobox/Combobox.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E029 | `ComboboxAnchor` | component | `src/components/ui/combobox/ComboboxAnchor.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E030 | `ComboboxEmpty` | component | `src/components/ui/combobox/ComboboxEmpty.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E031 | `ComboboxGroup` | component | `src/components/ui/combobox/ComboboxGroup.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E032 | `ComboboxInput` | component | `src/components/ui/combobox/ComboboxInput.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E033 | `ComboboxItem` | component | `src/components/ui/combobox/ComboboxItem.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E034 | `ComboboxItemIndicator` | component | `src/components/ui/combobox/ComboboxItemIndicator.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E035 | `ComboboxList` | component | `src/components/ui/combobox/ComboboxList.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E036 | `ComboboxSeparator` | component | `src/components/ui/combobox/ComboboxSeparator.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E037 | `ComboboxViewport` | component | `src/components/ui/combobox/ComboboxViewport.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E038 | `Command` | component | `src/components/ui/command/Command.vue` | yes | 2 | 3 | 0 | 5 | keep |
| E039 | `CommandDialog` | component | `src/components/ui/command/CommandDialog.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E040 | `CommandEmpty` | component | `src/components/ui/command/CommandEmpty.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E041 | `CommandGroup` | component | `src/components/ui/command/CommandGroup.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E042 | `CommandInput` | component | `src/components/ui/command/CommandInput.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E043 | `CommandItem` | component | `src/components/ui/command/CommandItem.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E044 | `CommandList` | component | `src/components/ui/command/CommandList.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E045 | `CommandSeparator` | component | `src/components/ui/command/CommandSeparator.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E046 | `CommandShortcut` | component | `src/components/ui/command/CommandShortcut.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E047 | `ContextMenu` | component | `src/components/ui/context-menu/ContextMenu.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E048 | `ContextMenuCheckboxItem` | component | `src/components/ui/context-menu/ContextMenuCheckboxItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E049 | `ContextMenuContent` | component | `src/components/ui/context-menu/ContextMenuContent.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E050 | `ContextMenuGroup` | component | `src/components/ui/context-menu/ContextMenuGroup.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E051 | `ContextMenuItem` | component | `src/components/ui/context-menu/ContextMenuItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E052 | `ContextMenuLabel` | component | `src/components/ui/context-menu/ContextMenuLabel.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E053 | `ContextMenuPortal` | component | `src/components/ui/context-menu/ContextMenuPortal.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E054 | `ContextMenuRadioGroup` | component | `src/components/ui/context-menu/ContextMenuRadioGroup.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E055 | `ContextMenuRadioItem` | component | `src/components/ui/context-menu/ContextMenuRadioItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E056 | `ContextMenuSeparator` | component | `src/components/ui/context-menu/ContextMenuSeparator.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E057 | `ContextMenuShortcut` | component | `src/components/ui/context-menu/ContextMenuShortcut.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E058 | `ContextMenuSub` | component | `src/components/ui/context-menu/ContextMenuSub.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E059 | `ContextMenuSubContent` | component | `src/components/ui/context-menu/ContextMenuSubContent.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E060 | `ContextMenuSubTrigger` | component | `src/components/ui/context-menu/ContextMenuSubTrigger.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E061 | `ContextMenuTrigger` | component | `src/components/ui/context-menu/ContextMenuTrigger.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E062 | `DataTable` | component | `src/components/ui/data-table/DataTable.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E063 | `DataTablePagination` | component | `src/components/ui/data-table/DataTablePagination.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E064 | `Dialog` | component | `src/components/ui/dialog/Dialog.vue` | yes | 3 | 6 | 8 | 17 | keep |
| E065 | `DialogClose` | component | `src/components/ui/dialog/DialogClose.vue` | yes | 4 | 1 | 1 | 6 | keep |
| E066 | `DialogContent` | component | `src/components/ui/dialog/DialogContent.vue` | yes | 3 | 2 | 6 | 11 | keep |
| E067 | `DialogDescription` | component | `src/components/ui/dialog/DialogDescription.vue` | yes | 1 | 2 | 3 | 6 | keep |
| E068 | `DialogFooter` | component | `src/components/ui/dialog/DialogFooter.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E069 | `DialogHeader` | component | `src/components/ui/dialog/DialogHeader.vue` | yes | 0 | 2 | 1 | 3 | keep |
| E070 | `DialogScrollContent` | component | `src/components/ui/dialog/DialogScrollContent.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E071 | `DialogTitle` | component | `src/components/ui/dialog/DialogTitle.vue` | yes | 1 | 2 | 4 | 7 | keep |
| E072 | `DialogTrigger` | component | `src/components/ui/dialog/DialogTrigger.vue` | yes | 1 | 1 | 2 | 4 | keep |
| E073 | `Drawer` | component | `src/components/ui/drawer/Drawer.vue` | yes | 1 | 2 | 0 | 3 | keep |
| E074 | `DrawerContent` | component | `src/components/ui/drawer/DrawerContent.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E075 | `DrawerDescription` | component | `src/components/ui/drawer/DrawerDescription.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E076 | `DrawerFooter` | component | `src/components/ui/drawer/DrawerFooter.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E077 | `DrawerHeader` | component | `src/components/ui/drawer/DrawerHeader.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E078 | `DrawerOverlay` | component | `src/components/ui/drawer/DrawerOverlay.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E079 | `DrawerTitle` | component | `src/components/ui/drawer/DrawerTitle.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E080 | `DropdownMenu` | component | `src/components/ui/dropdown-menu/DropdownMenu.vue` | yes | 1 | 1 | 5 | 7 | keep |
| E081 | `DropdownMenuCheckboxItem` | component | `src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E082 | `DropdownMenuContent` | component | `src/components/ui/dropdown-menu/DropdownMenuContent.vue` | yes | 0 | 1 | 5 | 6 | keep |
| E083 | `DropdownMenuGroup` | component | `src/components/ui/dropdown-menu/DropdownMenuGroup.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E084 | `DropdownMenuItem` | component | `src/components/ui/dropdown-menu/DropdownMenuItem.vue` | yes | 0 | 1 | 5 | 6 | keep |
| E085 | `DropdownMenuLabel` | component | `src/components/ui/dropdown-menu/DropdownMenuLabel.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E086 | `DropdownMenuRadioGroup` | component | `src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E087 | `DropdownMenuRadioItem` | component | `src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E088 | `DropdownMenuSeparator` | component | `src/components/ui/dropdown-menu/DropdownMenuSeparator.vue` | yes | 0 | 1 | 3 | 4 | keep |
| E089 | `DropdownMenuShortcut` | component | `src/components/ui/dropdown-menu/DropdownMenuShortcut.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E090 | `DropdownMenuSub` | component | `src/components/ui/dropdown-menu/DropdownMenuSub.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E091 | `DropdownMenuSubContent` | component | `src/components/ui/dropdown-menu/DropdownMenuSubContent.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E092 | `DropdownMenuSubTrigger` | component | `src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E093 | `DropdownMenuTrigger` | component | `src/components/ui/dropdown-menu/DropdownMenuTrigger.vue` | yes | 1 | 1 | 5 | 7 | keep |
| E094 | `HoverCard` | component | `src/components/ui/hover-card/HoverCard.vue` | yes | 0 | 1 | 14 | 15 | keep |
| E095 | `HoverCardContent` | component | `src/components/ui/hover-card/HoverCardContent.vue` | yes | 0 | 1 | 16 | 17 | keep |
| E096 | `HoverCardTrigger` | component | `src/components/ui/hover-card/HoverCardTrigger.vue` | yes | 0 | 1 | 15 | 16 | keep |
| E097 | `Input` | component | `src/components/ui/input/Input.vue` | yes | 2 | 8 | 17 | 27 | keep |
| E098 | `Label` | component | `src/components/ui/label/Label.vue` | yes | 1 | 18 | 5 | 24 | keep |
| E099 | `MultiSelect` | component | `src/components/ui/multi-select/MultiSelect.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E100 | `Notification` | component | `src/components/ui/notification/Notification.vue` | yes | 0 | 2 | 8 | 10 | keep |
| E101 | `NumberField` | component | `src/components/ui/number-field/NumberField.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E102 | `NumberFieldContent` | component | `src/components/ui/number-field/NumberFieldContent.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E103 | `NumberFieldDecrement` | component | `src/components/ui/number-field/NumberFieldDecrement.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E104 | `NumberFieldIncrement` | component | `src/components/ui/number-field/NumberFieldIncrement.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E105 | `NumberFieldInput` | component | `src/components/ui/number-field/NumberFieldInput.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E106 | `Popover` | component | `src/components/ui/popover/Popover.vue` | yes | 2 | 3 | 6 | 11 | keep |
| E107 | `PopoverContent` | component | `src/components/ui/popover/PopoverContent.vue` | yes | 1 | 1 | 5 | 7 | keep |
| E108 | `PopoverTrigger` | component | `src/components/ui/popover/PopoverTrigger.vue` | yes | 1 | 1 | 5 | 7 | keep |
| E109 | `Progress` | component | `src/components/ui/progress/Progress.vue` | yes | 2 | 2 | 12 | 16 | keep |
| E110 | `RadioGroup` | component | `src/components/ui/radio-group/RadioGroup.vue` | yes | 0 | 3 | 0 | 3 | keep |
| E111 | `RadioGroupItem` | component | `src/components/ui/radio-group/RadioGroupItem.vue` | yes | 0 | 3 | 0 | 3 | keep |
| E112 | `Select` | component | `src/components/ui/select/Select.vue` | yes | 3 | 5 | 18 | 26 | keep |
| E113 | `SelectContent` | component | `src/components/ui/select/SelectContent.vue` | yes | 1 | 3 | 8 | 12 | keep |
| E114 | `SelectGroup` | component | `src/components/ui/select/SelectGroup.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E115 | `SelectItem` | component | `src/components/ui/select/SelectItem.vue` | yes | 1 | 3 | 8 | 12 | keep |
| E116 | `SelectItemText` | component | `src/components/ui/select/SelectItemText.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E117 | `SelectLabel` | component | `src/components/ui/select/SelectLabel.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E118 | `SelectScrollDownButton` | component | `src/components/ui/select/SelectScrollDownButton.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E119 | `SelectScrollUpButton` | component | `src/components/ui/select/SelectScrollUpButton.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E120 | `SelectSeparator` | component | `src/components/ui/select/SelectSeparator.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E121 | `SelectTrigger` | component | `src/components/ui/select/SelectTrigger.vue` | yes | 2 | 3 | 8 | 13 | keep |
| E122 | `SelectValue` | component | `src/components/ui/select/SelectValue.vue` | yes | 1 | 3 | 6 | 10 | keep |
| E123 | `Separator` | component | `src/components/ui/separator/Separator.vue` | yes | 0 | 4 | 6 | 10 | keep |
| E124 | `Sheet` | component | `src/components/ui/sheet/Sheet.vue` | yes | 0 | 4 | 0 | 4 | keep |
| E125 | `SheetClose` | component | `src/components/ui/sheet/SheetClose.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E126 | `SheetContent` | component | `src/components/ui/sheet/SheetContent.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E127 | `SheetDescription` | component | `src/components/ui/sheet/SheetDescription.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E128 | `SheetFooter` | component | `src/components/ui/sheet/SheetFooter.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E129 | `SheetHeader` | component | `src/components/ui/sheet/SheetHeader.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E130 | `SheetTitle` | component | `src/components/ui/sheet/SheetTitle.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E131 | `SheetTrigger` | component | `src/components/ui/sheet/SheetTrigger.vue` | yes | 0 | 2 | 0 | 2 | keep |
| E132 | `Skeleton` | component | `src/components/ui/skeleton/Skeleton.vue` | yes | 1 | 2 | 5 | 8 | keep |
| E133 | `Slider` | component | `src/components/ui/slider/Slider.vue` | yes | 1 | 7 | 1 | 9 | keep |
| E134 | `Switch` | component | `src/components/ui/switch/Switch.vue` | yes | 1 | 6 | 7 | 14 | keep |
| E135 | `Table` | component | `src/components/ui/table/Table.vue` | yes | 1 | 4 | 0 | 5 | keep |
| E136 | `TableBody` | component | `src/components/ui/table/TableBody.vue` | yes | 1 | 2 | 0 | 3 | keep |
| E137 | `TableCaption` | component | `src/components/ui/table/TableCaption.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E138 | `TableCell` | component | `src/components/ui/table/TableCell.vue` | yes | 2 | 2 | 0 | 4 | keep |
| E139 | `TableEmpty` | component | `src/components/ui/table/TableEmpty.vue` | yes | 1 | 0 | 0 | 1 | keep-current |
| E140 | `TableFooter` | component | `src/components/ui/table/TableFooter.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E141 | `TableHead` | component | `src/components/ui/table/TableHead.vue` | yes | 1 | 2 | 0 | 3 | keep |
| E142 | `TableHeader` | component | `src/components/ui/table/TableHeader.vue` | yes | 1 | 2 | 0 | 3 | keep |
| E143 | `TableRow` | component | `src/components/ui/table/TableRow.vue` | yes | 2 | 2 | 0 | 4 | keep |
| E144 | `Tabs` | component | `src/components/ui/tabs/Tabs.vue` | yes | 0 | 4 | 2 | 6 | keep |
| E145 | `TabsContent` | component | `src/components/ui/tabs/TabsContent.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E146 | `TabsIndicator` | component | `src/components/ui/tabs/TabsIndicator.vue` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E147 | `TabsList` | component | `src/components/ui/tabs/TabsList.vue` | yes | 0 | 1 | 2 | 3 | keep |
| E148 | `TabsTrigger` | component | `src/components/ui/tabs/TabsTrigger.vue` | yes | 0 | 1 | 1 | 2 | keep |
| E149 | `TagsInput` | component | `src/components/ui/tags-input/TagsInput.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E150 | `TagsInputInput` | component | `src/components/ui/tags-input/TagsInputInput.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E151 | `TagsInputItem` | component | `src/components/ui/tags-input/TagsInputItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E152 | `TagsInputItemDelete` | component | `src/components/ui/tags-input/TagsInputItemDelete.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E153 | `TagsInputItemText` | component | `src/components/ui/tags-input/TagsInputItemText.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E154 | `Textarea` | component | `src/components/ui/textarea/Textarea.vue` | yes | 0 | 3 | 3 | 6 | keep |
| E155 | `Toast` | component | `src/components/ui/toast/Toast.vue` | yes | 2 | 2 | 0 | 4 | keep |
| E156 | `ToastAction` | component | `src/components/ui/toast/ToastAction.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E157 | `ToastClose` | component | `src/components/ui/toast/ToastClose.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E158 | `ToastDescription` | component | `src/components/ui/toast/ToastDescription.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E159 | `ToastTitle` | component | `src/components/ui/toast/ToastTitle.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E160 | `Toaster` | component | `src/components/ui/toast/Toaster.vue` | yes | 0 | 0 | 3 | 3 | keep |
| E161 | `ToggleGroup` | component | `src/components/ui/toggle-group/ToggleGroup.vue` | yes | 1 | 1 | 0 | 2 | keep |
| E162 | `ToggleGroupItem` | component | `src/components/ui/toggle-group/ToggleGroupItem.vue` | yes | 0 | 1 | 0 | 1 | keep-current |
| E163 | `Toggle` | component | `src/components/ui/toggle/Toggle.vue` | yes | 3 | 7 | 9 | 19 | keep |
| E164 | `Tooltip` | component | `src/components/ui/tooltip/Tooltip.vue` | yes | 3 | 4 | 33 | 40 | keep |
| E165 | `TooltipContent` | component | `src/components/ui/tooltip/TooltipContent.vue` | yes | 2 | 3 | 18 | 23 | keep |
| E166 | `TooltipProvider` | component | `src/components/ui/tooltip/TooltipProvider.vue` | yes | 2 | 4 | 6 | 12 | keep |
| E167 | `TooltipTrigger` | component | `src/components/ui/tooltip/TooltipTrigger.vue` | yes | 2 | 3 | 18 | 23 | keep |
| E168 | `alertVariants` | ts-export | `src/components/ui/alert/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E169 | `AlertVariants` | type | `src/components/ui/alert/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E170 | `avatarVariant` | ts-export | `src/components/ui/avatar/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E171 | `AvatarVariants` | type | `src/components/ui/avatar/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E172 | `badgeVariants` | ts-export | `src/components/ui/badge/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E173 | `BadgeVariants` | type | `src/components/ui/badge/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E174 | `buttonVariants` | ts-export | `src/components/ui/button/index.ts` | yes | 1 | 1 | 0 | 2 | keep |
| E175 | `ButtonVariants` | type | `src/components/ui/button/index.ts` | yes | 3 | 0 | 1 | 4 | keep |
| E176 | `useCarousel` | re-export | `src/components/ui/carousel/index.ts` | yes | 6 | 0 | 0 | 6 | keep |
| E177 | `CarouselApi` | type-reexport | `src/components/ui/carousel/index.ts` | yes | 2 | 1 | 1 | 4 | keep |
| E178 | `UnwrapRefCarouselApi` | type | `src/components/ui/carousel/interface.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E179 | `CarouselProps` | type | `src/components/ui/carousel/interface.ts` | yes | 2 | 0 | 0 | 2 | keep |
| E180 | `CarouselEmits` | type | `src/components/ui/carousel/interface.ts` | yes | 2 | 0 | 0 | 2 | keep |
| E181 | `WithClassAsProps` | type | `src/components/ui/carousel/interface.ts` | yes | 5 | 0 | 0 | 5 | keep |
| E182 | `ComboboxCancel` | third-party-reexport | `src/components/ui/combobox/index.ts` | yes | 0 | 0 | 0 | 0 | library-orphan |
| E183 | `ComboboxTrigger` | third-party-reexport | `src/components/ui/combobox/index.ts` | yes | 0 | 1 | 0 | 1 | keep-current |
| E184 | `DataTableColumn` | type-reexport | `src/components/ui/data-table/index.ts` | yes | 2 | 1 | 0 | 3 | keep |
| E185 | `DataTableSort` | type-reexport | `src/components/ui/data-table/index.ts` | yes | 2 | 1 | 0 | 3 | keep |
| E186 | `DataTableProps` | type-reexport | `src/components/ui/data-table/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E187 | `DrawerPortal` | third-party-reexport | `src/components/ui/drawer/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E188 | `DrawerTrigger` | third-party-reexport | `src/components/ui/drawer/index.ts` | yes | 0 | 1 | 0 | 1 | keep-current |
| E189 | `DrawerClose` | third-party-reexport | `src/components/ui/drawer/index.ts` | yes | 0 | 1 | 0 | 1 | keep-current |
| E190 | `DropdownMenuPortal` | third-party-reexport | `src/components/ui/dropdown-menu/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E191 | `MultiSelectOption` | type | `src/components/ui/multi-select/index.ts` | yes | 1 | 1 | 0 | 2 | keep |
| E192 | `sheetVariants` | ts-export | `src/components/ui/sheet/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E193 | `SheetVariants` | type | `src/components/ui/sheet/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |
| E194 | `toast` | re-export | `src/components/ui/toast/index.ts` | yes | 5 | 2 | 25 | 32 | keep |
| E195 | `useToast` | re-export | `src/components/ui/toast/index.ts` | yes | 2 | 1 | 17 | 20 | keep |
| E196 | `ToastType` | type-reexport | `src/components/ui/toast/index.ts` | yes | 0 | 0 | 1 | 1 | keep-current |
| E197 | `ToastVariant` | type-reexport | `src/components/ui/toast/index.ts` | yes | 1 | 0 | 1 | 2 | keep |
| E198 | `toggleVariants` | ts-export | `src/components/ui/toggle/index.ts` | yes | 3 | 0 | 0 | 3 | keep |
| E199 | `ToggleVariants` | type | `src/components/ui/toggle/index.ts` | yes | 1 | 0 | 0 | 1 | keep-current |

## Exact Usage Commands

Each command emits the distinct matching files for the corresponding artefact row. The count columns above are derived by path prefix from the emitted file list. Commands labeled `no-match` emitted no files.

### E001 Accordion

Usage command:

```sh
rg -l '(<Accordion\b|\bAccordion\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/accordion/Accordion.vue'
```

### E002 AccordionContent

Usage command:

```sh
rg -l '(<AccordionContent\b|\bAccordionContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/accordion/AccordionContent.vue'
```

### E003 AccordionItem

Usage command:

```sh
rg -l '(<AccordionItem\b|\bAccordionItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/accordion/AccordionItem.vue'
```

### E004 AccordionTrigger

Usage command:

```sh
rg -l '(<AccordionTrigger\b|\bAccordionTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/accordion/AccordionTrigger.vue'
```

### E005 Alert

Usage command:

```sh
rg -l '(<Alert\b|\bAlert\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/alert/Alert.vue'
```

### E006 AlertDescription

Usage command:

```sh
rg -l '(<AlertDescription\b|\bAlertDescription\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/alert/AlertDescription.vue'
```

### E007 AlertTitle

Usage command:

```sh
rg -l '(<AlertTitle\b|\bAlertTitle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/alert/AlertTitle.vue'
```

### E008 Avatar

Usage command:

```sh
rg -l '(<Avatar\b|\bAvatar\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/avatar/Avatar.vue'
```

### E009 AvatarFallback

Usage command:

```sh
rg -l '(<AvatarFallback\b|\bAvatarFallback\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/avatar/AvatarFallback.vue'
```

### E010 AvatarImage

Usage command:

```sh
rg -l '(<AvatarImage\b|\bAvatarImage\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/avatar/AvatarImage.vue'
```

### E011 Badge

Usage command:

```sh
rg -l '(<Badge\b|\bBadge\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/badge/Badge.vue'
```

### E012 Button

Usage command:

```sh
rg -l '(<Button\b|\bButton\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/button/Button.vue'
```

### E013 Card

Usage command:

```sh
rg -l '(<Card\b|\bCard\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/card/Card.vue'
```

### E014 CardContent

Usage command:

```sh
rg -l '(<CardContent\b|\bCardContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/card/CardContent.vue'
```

### E015 CardDescription

Usage command:

```sh
rg -l '(<CardDescription\b|\bCardDescription\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/card/CardDescription.vue'
```

### E016 CardFooter

Usage command:

```sh
rg -l '(<CardFooter\b|\bCardFooter\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/card/CardFooter.vue'
```

### E017 CardHeader

Usage command:

```sh
rg -l '(<CardHeader\b|\bCardHeader\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/card/CardHeader.vue'
```

### E018 CardTitle

Usage command:

```sh
rg -l '(<CardTitle\b|\bCardTitle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/card/CardTitle.vue'
```

### E019 Carousel

Usage command:

```sh
rg -l '(<Carousel\b|\bCarousel\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/Carousel.vue'
```

### E020 CarouselContent

Usage command:

```sh
rg -l '(<CarouselContent\b|\bCarouselContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/CarouselContent.vue'
```

### E021 CarouselItem

Usage command:

```sh
rg -l '(<CarouselItem\b|\bCarouselItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/CarouselItem.vue'
```

### E022 CarouselNext

Usage command:

```sh
rg -l '(<CarouselNext\b|\bCarouselNext\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/CarouselNext.vue'
```

### E023 CarouselPrevious

Usage command:

```sh
rg -l '(<CarouselPrevious\b|\bCarouselPrevious\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/CarouselPrevious.vue'
```

### E024 Checkbox

Usage command:

```sh
rg -l '(<Checkbox\b|\bCheckbox\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/checkbox/Checkbox.vue'
```

### E025 Collapsible

Usage command:

```sh
rg -l '(<Collapsible\b|\bCollapsible\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/collapsible/Collapsible.vue'
```

### E026 CollapsibleContent

Usage command:

```sh
rg -l '(<CollapsibleContent\b|\bCollapsibleContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/collapsible/CollapsibleContent.vue'
```

### E027 CollapsibleTrigger

Usage command:

```sh
rg -l '(<CollapsibleTrigger\b|\bCollapsibleTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/collapsible/CollapsibleTrigger.vue'
```

### E028 Combobox

Usage command:

```sh
rg -l '(<Combobox\b|\bCombobox\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/Combobox.vue'
```

### E029 ComboboxAnchor

Usage command:

```sh
rg -l '(<ComboboxAnchor\b|\bComboboxAnchor\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxAnchor.vue'
```

### E030 ComboboxEmpty

Usage command:

```sh
rg -l '(<ComboboxEmpty\b|\bComboboxEmpty\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxEmpty.vue'
```

### E031 ComboboxGroup

Usage command:

```sh
rg -l '(<ComboboxGroup\b|\bComboboxGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxGroup.vue'
```

### E032 ComboboxInput

Usage command:

```sh
rg -l '(<ComboboxInput\b|\bComboboxInput\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxInput.vue'
```

### E033 ComboboxItem

Usage command:

```sh
rg -l '(<ComboboxItem\b|\bComboboxItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxItem.vue'
```

### E034 ComboboxItemIndicator

Usage command:

```sh
rg -l '(<ComboboxItemIndicator\b|\bComboboxItemIndicator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxItemIndicator.vue'
```

### E035 ComboboxList

Usage command:

```sh
rg -l '(<ComboboxList\b|\bComboboxList\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxList.vue'
```

### E036 ComboboxSeparator

Usage command:

```sh
rg -l '(<ComboboxSeparator\b|\bComboboxSeparator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxSeparator.vue'
```

### E037 ComboboxViewport

No-match command:

```sh
rg -l '(<ComboboxViewport\b|\bComboboxViewport\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/ComboboxViewport.vue'
```

### E038 Command

Usage command:

```sh
rg -l '(<Command\b|\bCommand\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/Command.vue'
```

### E039 CommandDialog

Usage command:

```sh
rg -l '(<CommandDialog\b|\bCommandDialog\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandDialog.vue'
```

### E040 CommandEmpty

Usage command:

```sh
rg -l '(<CommandEmpty\b|\bCommandEmpty\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandEmpty.vue'
```

### E041 CommandGroup

Usage command:

```sh
rg -l '(<CommandGroup\b|\bCommandGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandGroup.vue'
```

### E042 CommandInput

Usage command:

```sh
rg -l '(<CommandInput\b|\bCommandInput\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandInput.vue'
```

### E043 CommandItem

Usage command:

```sh
rg -l '(<CommandItem\b|\bCommandItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandItem.vue'
```

### E044 CommandList

Usage command:

```sh
rg -l '(<CommandList\b|\bCommandList\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandList.vue'
```

### E045 CommandSeparator

Usage command:

```sh
rg -l '(<CommandSeparator\b|\bCommandSeparator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandSeparator.vue'
```

### E046 CommandShortcut

Usage command:

```sh
rg -l '(<CommandShortcut\b|\bCommandShortcut\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/command/CommandShortcut.vue'
```

### E047 ContextMenu

Usage command:

```sh
rg -l '(<ContextMenu\b|\bContextMenu\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenu.vue'
```

### E048 ContextMenuCheckboxItem

Usage command:

```sh
rg -l '(<ContextMenuCheckboxItem\b|\bContextMenuCheckboxItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuCheckboxItem.vue'
```

### E049 ContextMenuContent

Usage command:

```sh
rg -l '(<ContextMenuContent\b|\bContextMenuContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuContent.vue'
```

### E050 ContextMenuGroup

No-match command:

```sh
rg -l '(<ContextMenuGroup\b|\bContextMenuGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuGroup.vue'
```

### E051 ContextMenuItem

Usage command:

```sh
rg -l '(<ContextMenuItem\b|\bContextMenuItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuItem.vue'
```

### E052 ContextMenuLabel

Usage command:

```sh
rg -l '(<ContextMenuLabel\b|\bContextMenuLabel\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuLabel.vue'
```

### E053 ContextMenuPortal

Usage command:

```sh
rg -l '(<ContextMenuPortal\b|\bContextMenuPortal\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuPortal.vue'
```

### E054 ContextMenuRadioGroup

Usage command:

```sh
rg -l '(<ContextMenuRadioGroup\b|\bContextMenuRadioGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuRadioGroup.vue'
```

### E055 ContextMenuRadioItem

Usage command:

```sh
rg -l '(<ContextMenuRadioItem\b|\bContextMenuRadioItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuRadioItem.vue'
```

### E056 ContextMenuSeparator

Usage command:

```sh
rg -l '(<ContextMenuSeparator\b|\bContextMenuSeparator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuSeparator.vue'
```

### E057 ContextMenuShortcut

Usage command:

```sh
rg -l '(<ContextMenuShortcut\b|\bContextMenuShortcut\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuShortcut.vue'
```

### E058 ContextMenuSub

No-match command:

```sh
rg -l '(<ContextMenuSub\b|\bContextMenuSub\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuSub.vue'
```

### E059 ContextMenuSubContent

No-match command:

```sh
rg -l '(<ContextMenuSubContent\b|\bContextMenuSubContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuSubContent.vue'
```

### E060 ContextMenuSubTrigger

No-match command:

```sh
rg -l '(<ContextMenuSubTrigger\b|\bContextMenuSubTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuSubTrigger.vue'
```

### E061 ContextMenuTrigger

Usage command:

```sh
rg -l '(<ContextMenuTrigger\b|\bContextMenuTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/context-menu/ContextMenuTrigger.vue'
```

### E062 DataTable

Usage command:

```sh
rg -l '(<DataTable\b|\bDataTable\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/data-table/DataTable.vue'
```

### E063 DataTablePagination

Usage command:

```sh
rg -l '(<DataTablePagination\b|\bDataTablePagination\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/data-table/DataTablePagination.vue'
```

### E064 Dialog

Usage command:

```sh
rg -l '(<Dialog\b|\bDialog\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/Dialog.vue'
```

### E065 DialogClose

Usage command:

```sh
rg -l '(<DialogClose\b|\bDialogClose\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogClose.vue'
```

### E066 DialogContent

Usage command:

```sh
rg -l '(<DialogContent\b|\bDialogContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogContent.vue'
```

### E067 DialogDescription

Usage command:

```sh
rg -l '(<DialogDescription\b|\bDialogDescription\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogDescription.vue'
```

### E068 DialogFooter

Usage command:

```sh
rg -l '(<DialogFooter\b|\bDialogFooter\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogFooter.vue'
```

### E069 DialogHeader

Usage command:

```sh
rg -l '(<DialogHeader\b|\bDialogHeader\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogHeader.vue'
```

### E070 DialogScrollContent

No-match command:

```sh
rg -l '(<DialogScrollContent\b|\bDialogScrollContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogScrollContent.vue'
```

### E071 DialogTitle

Usage command:

```sh
rg -l '(<DialogTitle\b|\bDialogTitle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogTitle.vue'
```

### E072 DialogTrigger

Usage command:

```sh
rg -l '(<DialogTrigger\b|\bDialogTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dialog/DialogTrigger.vue'
```

### E073 Drawer

Usage command:

```sh
rg -l '(<Drawer\b|\bDrawer\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/Drawer.vue'
```

### E074 DrawerContent

Usage command:

```sh
rg -l '(<DrawerContent\b|\bDrawerContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/DrawerContent.vue'
```

### E075 DrawerDescription

Usage command:

```sh
rg -l '(<DrawerDescription\b|\bDrawerDescription\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/DrawerDescription.vue'
```

### E076 DrawerFooter

Usage command:

```sh
rg -l '(<DrawerFooter\b|\bDrawerFooter\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/DrawerFooter.vue'
```

### E077 DrawerHeader

Usage command:

```sh
rg -l '(<DrawerHeader\b|\bDrawerHeader\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/DrawerHeader.vue'
```

### E078 DrawerOverlay

Usage command:

```sh
rg -l '(<DrawerOverlay\b|\bDrawerOverlay\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/DrawerOverlay.vue'
```

### E079 DrawerTitle

Usage command:

```sh
rg -l '(<DrawerTitle\b|\bDrawerTitle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/DrawerTitle.vue'
```

### E080 DropdownMenu

Usage command:

```sh
rg -l '(<DropdownMenu\b|\bDropdownMenu\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenu.vue'
```

### E081 DropdownMenuCheckboxItem

Usage command:

```sh
rg -l '(<DropdownMenuCheckboxItem\b|\bDropdownMenuCheckboxItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue'
```

### E082 DropdownMenuContent

Usage command:

```sh
rg -l '(<DropdownMenuContent\b|\bDropdownMenuContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuContent.vue'
```

### E083 DropdownMenuGroup

Usage command:

```sh
rg -l '(<DropdownMenuGroup\b|\bDropdownMenuGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuGroup.vue'
```

### E084 DropdownMenuItem

Usage command:

```sh
rg -l '(<DropdownMenuItem\b|\bDropdownMenuItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuItem.vue'
```

### E085 DropdownMenuLabel

Usage command:

```sh
rg -l '(<DropdownMenuLabel\b|\bDropdownMenuLabel\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuLabel.vue'
```

### E086 DropdownMenuRadioGroup

Usage command:

```sh
rg -l '(<DropdownMenuRadioGroup\b|\bDropdownMenuRadioGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue'
```

### E087 DropdownMenuRadioItem

Usage command:

```sh
rg -l '(<DropdownMenuRadioItem\b|\bDropdownMenuRadioItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue'
```

### E088 DropdownMenuSeparator

Usage command:

```sh
rg -l '(<DropdownMenuSeparator\b|\bDropdownMenuSeparator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
```

### E089 DropdownMenuShortcut

Usage command:

```sh
rg -l '(<DropdownMenuShortcut\b|\bDropdownMenuShortcut\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuShortcut.vue'
```

### E090 DropdownMenuSub

Usage command:

```sh
rg -l '(<DropdownMenuSub\b|\bDropdownMenuSub\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuSub.vue'
```

### E091 DropdownMenuSubContent

Usage command:

```sh
rg -l '(<DropdownMenuSubContent\b|\bDropdownMenuSubContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuSubContent.vue'
```

### E092 DropdownMenuSubTrigger

Usage command:

```sh
rg -l '(<DropdownMenuSubTrigger\b|\bDropdownMenuSubTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue'
```

### E093 DropdownMenuTrigger

Usage command:

```sh
rg -l '(<DropdownMenuTrigger\b|\bDropdownMenuTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
```

### E094 HoverCard

Usage command:

```sh
rg -l '(<HoverCard\b|\bHoverCard\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/hover-card/HoverCard.vue'
```

### E095 HoverCardContent

Usage command:

```sh
rg -l '(<HoverCardContent\b|\bHoverCardContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/hover-card/HoverCardContent.vue'
```

### E096 HoverCardTrigger

Usage command:

```sh
rg -l '(<HoverCardTrigger\b|\bHoverCardTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/hover-card/HoverCardTrigger.vue'
```

### E097 Input

Usage command:

```sh
rg -l '(<Input\b|\bInput\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/input/Input.vue'
```

### E098 Label

Usage command:

```sh
rg -l '(<Label\b|\bLabel\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/label/Label.vue'
```

### E099 MultiSelect

Usage command:

```sh
rg -l '(<MultiSelect\b|\bMultiSelect\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/multi-select/MultiSelect.vue'
```

### E100 Notification

Usage command:

```sh
rg -l '(<Notification\b|\bNotification\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/notification/Notification.vue'
```

### E101 NumberField

Usage command:

```sh
rg -l '(<NumberField\b|\bNumberField\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/number-field/NumberField.vue'
```

### E102 NumberFieldContent

Usage command:

```sh
rg -l '(<NumberFieldContent\b|\bNumberFieldContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/number-field/NumberFieldContent.vue'
```

### E103 NumberFieldDecrement

Usage command:

```sh
rg -l '(<NumberFieldDecrement\b|\bNumberFieldDecrement\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/number-field/NumberFieldDecrement.vue'
```

### E104 NumberFieldIncrement

Usage command:

```sh
rg -l '(<NumberFieldIncrement\b|\bNumberFieldIncrement\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/number-field/NumberFieldIncrement.vue'
```

### E105 NumberFieldInput

Usage command:

```sh
rg -l '(<NumberFieldInput\b|\bNumberFieldInput\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/number-field/NumberFieldInput.vue'
```

### E106 Popover

Usage command:

```sh
rg -l '(<Popover\b|\bPopover\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/popover/Popover.vue'
```

### E107 PopoverContent

Usage command:

```sh
rg -l '(<PopoverContent\b|\bPopoverContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/popover/PopoverContent.vue'
```

### E108 PopoverTrigger

Usage command:

```sh
rg -l '(<PopoverTrigger\b|\bPopoverTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/popover/PopoverTrigger.vue'
```

### E109 Progress

Usage command:

```sh
rg -l '(<Progress\b|\bProgress\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/progress/Progress.vue'
```

### E110 RadioGroup

Usage command:

```sh
rg -l '(<RadioGroup\b|\bRadioGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/radio-group/RadioGroup.vue'
```

### E111 RadioGroupItem

Usage command:

```sh
rg -l '(<RadioGroupItem\b|\bRadioGroupItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/radio-group/RadioGroupItem.vue'
```

### E112 Select

Usage command:

```sh
rg -l '(<Select\b|\bSelect\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/Select.vue'
```

### E113 SelectContent

Usage command:

```sh
rg -l '(<SelectContent\b|\bSelectContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectContent.vue'
```

### E114 SelectGroup

Usage command:

```sh
rg -l '(<SelectGroup\b|\bSelectGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectGroup.vue'
```

### E115 SelectItem

Usage command:

```sh
rg -l '(<SelectItem\b|\bSelectItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectItem.vue'
```

### E116 SelectItemText

Usage command:

```sh
rg -l '(<SelectItemText\b|\bSelectItemText\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectItemText.vue'
```

### E117 SelectLabel

Usage command:

```sh
rg -l '(<SelectLabel\b|\bSelectLabel\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectLabel.vue'
```

### E118 SelectScrollDownButton

Usage command:

```sh
rg -l '(<SelectScrollDownButton\b|\bSelectScrollDownButton\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectScrollDownButton.vue'
```

### E119 SelectScrollUpButton

Usage command:

```sh
rg -l '(<SelectScrollUpButton\b|\bSelectScrollUpButton\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectScrollUpButton.vue'
```

### E120 SelectSeparator

Usage command:

```sh
rg -l '(<SelectSeparator\b|\bSelectSeparator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectSeparator.vue'
```

### E121 SelectTrigger

Usage command:

```sh
rg -l '(<SelectTrigger\b|\bSelectTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectTrigger.vue'
```

### E122 SelectValue

Usage command:

```sh
rg -l '(<SelectValue\b|\bSelectValue\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/select/SelectValue.vue'
```

### E123 Separator

Usage command:

```sh
rg -l '(<Separator\b|\bSeparator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/separator/Separator.vue'
```

### E124 Sheet

Usage command:

```sh
rg -l '(<Sheet\b|\bSheet\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/Sheet.vue'
```

### E125 SheetClose

Usage command:

```sh
rg -l '(<SheetClose\b|\bSheetClose\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetClose.vue'
```

### E126 SheetContent

Usage command:

```sh
rg -l '(<SheetContent\b|\bSheetContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetContent.vue'
```

### E127 SheetDescription

Usage command:

```sh
rg -l '(<SheetDescription\b|\bSheetDescription\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetDescription.vue'
```

### E128 SheetFooter

Usage command:

```sh
rg -l '(<SheetFooter\b|\bSheetFooter\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetFooter.vue'
```

### E129 SheetHeader

Usage command:

```sh
rg -l '(<SheetHeader\b|\bSheetHeader\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetHeader.vue'
```

### E130 SheetTitle

Usage command:

```sh
rg -l '(<SheetTitle\b|\bSheetTitle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetTitle.vue'
```

### E131 SheetTrigger

Usage command:

```sh
rg -l '(<SheetTrigger\b|\bSheetTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/SheetTrigger.vue'
```

### E132 Skeleton

Usage command:

```sh
rg -l '(<Skeleton\b|\bSkeleton\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/skeleton/Skeleton.vue'
```

### E133 Slider

Usage command:

```sh
rg -l '(<Slider\b|\bSlider\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/slider/Slider.vue'
```

### E134 Switch

Usage command:

```sh
rg -l '(<Switch\b|\bSwitch\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/switch/Switch.vue'
```

### E135 Table

Usage command:

```sh
rg -l '(<Table\b|\bTable\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/Table.vue'
```

### E136 TableBody

Usage command:

```sh
rg -l '(<TableBody\b|\bTableBody\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableBody.vue'
```

### E137 TableCaption

Usage command:

```sh
rg -l '(<TableCaption\b|\bTableCaption\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableCaption.vue'
```

### E138 TableCell

Usage command:

```sh
rg -l '(<TableCell\b|\bTableCell\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableCell.vue'
```

### E139 TableEmpty

Usage command:

```sh
rg -l '(<TableEmpty\b|\bTableEmpty\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableEmpty.vue'
```

### E140 TableFooter

No-match command:

```sh
rg -l '(<TableFooter\b|\bTableFooter\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableFooter.vue'
```

### E141 TableHead

Usage command:

```sh
rg -l '(<TableHead\b|\bTableHead\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableHead.vue'
```

### E142 TableHeader

Usage command:

```sh
rg -l '(<TableHeader\b|\bTableHeader\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableHeader.vue'
```

### E143 TableRow

Usage command:

```sh
rg -l '(<TableRow\b|\bTableRow\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/table/TableRow.vue'
```

### E144 Tabs

Usage command:

```sh
rg -l '(<Tabs\b|\bTabs\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tabs/Tabs.vue'
```

### E145 TabsContent

Usage command:

```sh
rg -l '(<TabsContent\b|\bTabsContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tabs/TabsContent.vue'
```

### E146 TabsIndicator

No-match command:

```sh
rg -l '(<TabsIndicator\b|\bTabsIndicator\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tabs/TabsIndicator.vue'
```

### E147 TabsList

Usage command:

```sh
rg -l '(<TabsList\b|\bTabsList\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tabs/TabsList.vue'
```

### E148 TabsTrigger

Usage command:

```sh
rg -l '(<TabsTrigger\b|\bTabsTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tabs/TabsTrigger.vue'
```

### E149 TagsInput

Usage command:

```sh
rg -l '(<TagsInput\b|\bTagsInput\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tags-input/TagsInput.vue'
```

### E150 TagsInputInput

Usage command:

```sh
rg -l '(<TagsInputInput\b|\bTagsInputInput\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tags-input/TagsInputInput.vue'
```

### E151 TagsInputItem

Usage command:

```sh
rg -l '(<TagsInputItem\b|\bTagsInputItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tags-input/TagsInputItem.vue'
```

### E152 TagsInputItemDelete

Usage command:

```sh
rg -l '(<TagsInputItemDelete\b|\bTagsInputItemDelete\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tags-input/TagsInputItemDelete.vue'
```

### E153 TagsInputItemText

Usage command:

```sh
rg -l '(<TagsInputItemText\b|\bTagsInputItemText\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tags-input/TagsInputItemText.vue'
```

### E154 Textarea

Usage command:

```sh
rg -l '(<Textarea\b|\bTextarea\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/textarea/Textarea.vue'
```

### E155 Toast

Usage command:

```sh
rg -l '(<Toast\b|\bToast\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/Toast.vue'
```

### E156 ToastAction

Usage command:

```sh
rg -l '(<ToastAction\b|\bToastAction\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/ToastAction.vue'
```

### E157 ToastClose

Usage command:

```sh
rg -l '(<ToastClose\b|\bToastClose\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/ToastClose.vue'
```

### E158 ToastDescription

Usage command:

```sh
rg -l '(<ToastDescription\b|\bToastDescription\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/ToastDescription.vue'
```

### E159 ToastTitle

Usage command:

```sh
rg -l '(<ToastTitle\b|\bToastTitle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/ToastTitle.vue'
```

### E160 Toaster

Usage command:

```sh
rg -l '(<Toaster\b|\bToaster\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/Toaster.vue'
```

### E161 ToggleGroup

Usage command:

```sh
rg -l '(<ToggleGroup\b|\bToggleGroup\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toggle-group/ToggleGroup.vue'
```

### E162 ToggleGroupItem

Usage command:

```sh
rg -l '(<ToggleGroupItem\b|\bToggleGroupItem\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toggle-group/ToggleGroupItem.vue'
```

### E163 Toggle

Usage command:

```sh
rg -l '(<Toggle\b|\bToggle\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toggle/Toggle.vue'
```

### E164 Tooltip

Usage command:

```sh
rg -l '(<Tooltip\b|\bTooltip\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tooltip/Tooltip.vue'
```

### E165 TooltipContent

Usage command:

```sh
rg -l '(<TooltipContent\b|\bTooltipContent\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tooltip/TooltipContent.vue'
```

### E166 TooltipProvider

Usage command:

```sh
rg -l '(<TooltipProvider\b|\bTooltipProvider\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tooltip/TooltipProvider.vue'
```

### E167 TooltipTrigger

Usage command:

```sh
rg -l '(<TooltipTrigger\b|\bTooltipTrigger\b)' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/tooltip/TooltipTrigger.vue'
```

### E168 alertVariants

Usage command:

```sh
rg -l '\balertVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/alert/index.ts'
```

### E169 AlertVariants

Usage command:

```sh
rg -l '\bAlertVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/alert/index.ts'
```

### E170 avatarVariant

Usage command:

```sh
rg -l '\bavatarVariant\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/avatar/index.ts'
```

### E171 AvatarVariants

Usage command:

```sh
rg -l '\bAvatarVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/avatar/index.ts'
```

### E172 badgeVariants

Usage command:

```sh
rg -l '\bbadgeVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/badge/index.ts'
```

### E173 BadgeVariants

Usage command:

```sh
rg -l '\bBadgeVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/badge/index.ts'
```

### E174 buttonVariants

Usage command:

```sh
rg -l '\bbuttonVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/button/index.ts'
```

### E175 ButtonVariants

Usage command:

```sh
rg -l '\bButtonVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/button/index.ts'
```

### E176 useCarousel

Usage command:

```sh
rg -l '\buseCarousel\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/index.ts'
```

### E177 CarouselApi

Usage command:

```sh
rg -l '\bCarouselApi\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/index.ts'
```

### E178 UnwrapRefCarouselApi

Usage command:

```sh
rg -l '\bUnwrapRefCarouselApi\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/interface.ts'
```

### E179 CarouselProps

Usage command:

```sh
rg -l '\bCarouselProps\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/interface.ts'
```

### E180 CarouselEmits

Usage command:

```sh
rg -l '\bCarouselEmits\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/interface.ts'
```

### E181 WithClassAsProps

Usage command:

```sh
rg -l '\bWithClassAsProps\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/carousel/interface.ts'
```

### E182 ComboboxCancel

No-match command:

```sh
rg -l '\bComboboxCancel\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/index.ts'
```

### E183 ComboboxTrigger

Usage command:

```sh
rg -l '\bComboboxTrigger\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/combobox/index.ts'
```

### E184 DataTableColumn

Usage command:

```sh
rg -l '\bDataTableColumn\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/data-table/index.ts'
```

### E185 DataTableSort

Usage command:

```sh
rg -l '\bDataTableSort\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/data-table/index.ts'
```

### E186 DataTableProps

Usage command:

```sh
rg -l '\bDataTableProps\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/data-table/index.ts'
```

### E187 DrawerPortal

Usage command:

```sh
rg -l '\bDrawerPortal\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/index.ts'
```

### E188 DrawerTrigger

Usage command:

```sh
rg -l '\bDrawerTrigger\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/index.ts'
```

### E189 DrawerClose

Usage command:

```sh
rg -l '\bDrawerClose\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/drawer/index.ts'
```

### E190 DropdownMenuPortal

Usage command:

```sh
rg -l '\bDropdownMenuPortal\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/dropdown-menu/index.ts'
```

### E191 MultiSelectOption

Usage command:

```sh
rg -l '\bMultiSelectOption\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/multi-select/index.ts'
```

### E192 sheetVariants

Usage command:

```sh
rg -l '\bsheetVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/index.ts'
```

### E193 SheetVariants

Usage command:

```sh
rg -l '\bSheetVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/sheet/index.ts'
```

### E194 toast

Usage command:

```sh
rg -l '\btoast\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/index.ts'
```

### E195 useToast

Usage command:

```sh
rg -l '\buseToast\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/index.ts'
```

### E196 ToastType

Usage command:

```sh
rg -l '\bToastType\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/index.ts'
```

### E197 ToastVariant

Usage command:

```sh
rg -l '\bToastVariant\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toast/index.ts'
```

### E198 toggleVariants

Usage command:

```sh
rg -l '\btoggleVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toggle/index.ts'
```

### E199 ToggleVariants

Usage command:

```sh
rg -l '\bToggleVariants\b' src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ --glob '!src/components/ui/**/index.ts' --glob '!src/components/ui/index.ts' --glob '!src/components/index.ts' --glob '!src/index.ts' --glob '!src/components/ui/toggle/index.ts'
```
