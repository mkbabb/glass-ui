# duplication-candidates — ranked pairs (INFER's primary input)

Component↔component pairs with composite `S = 0.30·api + 0.30·dom + 0.15·style + 0.10·anim + 0.15·role_syn` ≥ 0.15, sorted descending. `suggested-finding` is a MECHANICAL clone-type hint from the sub-scores — NOT a verdict; INFER adjudicates. `current_disposition` reflects a terminal ruling where one exists (the standing-ruling fence). Commit `c12beecb50d491c77e77cd8db393bdeb001ee2cb`.

| pair | api | dom | style | anim | role | composite | superset | iso | disposition | suggested-finding |
|---|---|---|---|---|---|---|---|---|---|---|
| pulse ↔ status-dot | 0.68 | 1.00 | 0.75 |  | 1.00 | **0.77** | b⊇a | ✓ | none | Type-3 wrapper/superset |
| dialog ↔ drawer | 0.36 | 1.00 | 1.00 |  | 0.50 | **0.63** |  | ✓ | none | Type-4 role-synonym (needs judge) |
| metric-cell ↔ metric-row | 0.73 | 0.64 | 0.62 |  |  | **0.51** | a⊇b |  | none | Type-3 wrapper/superset |
| metric ↔ metric-row | 0.85 | 0.50 | 0.62 |  |  | **0.50** | a⊇b |  | none | weak — likely coincidental |
| metric ↔ metric-cell | 0.65 | 0.71 | 0.57 |  |  | **0.49** |  |  | none | weak — likely coincidental |
| fourier-field ↔ liquid-grid | 0.07 | 1.00 |  |  | 1.00 | **0.47** |  | ✓ | DELETE | Type-2 isomorph, different skin |
| combobox ↔ command | 0.32 | 0.67 | 0.07 |  | 1.00 | **0.46** |  |  | none | Type-4 role-synonym (needs judge) |
| constellation ↔ fourier-field | 0.07 | 1.00 |  | 0.50 | 0.50 | **0.45** |  | ✓ | none | Type-2 isomorph, different skin |
| input ↔ textarea | 0.54 |  | 0.90 |  | 1.00 | **0.45** |  |  | none | Type-4 role-synonym (needs judge) |
| alert ↔ badge | 0.27 | 1.00 | 0.40 |  |  | **0.44** |  | ✓ | none | Type-2 isomorph, different skin |
| paper-backdrop ↔ skeleton | 0.33 | 1.00 | 0.17 |  |  | **0.42** |  | ✓ | none | Type-2 isomorph, different skin |
| alert ↔ metric-stack | 0.33 | 1.00 |  |  |  | **0.40** |  | ✓ | none | Type-2 isomorph, different skin |
| combobox ↔ select | 0.49 | 0.33 | 0.50 |  | 0.50 | **0.40** |  |  | none | Type-4 role-synonym (needs judge) |
| select ↔ tooltip | 0.31 | 0.50 | 1.00 |  |  | **0.39** |  |  | none | weak — likely coincidental |
| accordion ↔ collapsible | 0.29 | 0.50 | 1.00 |  |  | **0.39** |  |  | none | weak — likely coincidental |
| alert ↔ carousel | 0.10 | 1.00 | 0.33 |  |  | **0.38** |  | ✓ | KEEP | Type-2 isomorph, different skin |
| constellation ↔ liquid-grid |  | 1.00 |  |  | 0.50 | **0.38** |  | ✓ | DELETE | Type-2 isomorph, different skin |
| dialog ↔ tooltip | 0.40 | 0.33 | 1.00 |  |  | **0.37** |  |  | none | weak — likely coincidental |
| badge ↔ metric-stack | 0.21 | 1.00 |  |  |  | **0.36** |  | ✓ | none | Type-2 isomorph, different skin |
| carousel ↔ fading-scroll | 0.20 | 1.00 |  |  |  | **0.36** |  | ✓ | KEEP | Type-2 isomorph, different skin |
| badge ↔ carousel | 0.08 | 1.00 | 0.17 |  |  | **0.35** |  | ✓ | KEEP | Type-2 isomorph, different skin |
| button ↔ surface | 0.11 | 1.00 | 0.11 |  |  | **0.35** |  | ✓ | none | Type-2 isomorph, different skin |
| dropdown-menu ↔ popover | 0.39 | 0.50 | 0.50 |  |  | **0.34** |  |  | none | weak — likely coincidental |
| carousel ↔ metric-stack | 0.13 | 1.00 |  |  |  | **0.34** |  | ✓ | KEEP | Type-2 isomorph, different skin |
| fading-scroll ↔ metric-stack | 0.13 | 1.00 |  |  |  | **0.34** |  | ✓ | none | Type-2 isomorph, different skin |
| command ↔ select | 0.34 | 0.50 | 0.07 |  | 0.50 | **0.34** |  |  | none | Type-4 role-synonym (needs judge) |
| alert ↔ fading-scroll | 0.10 | 1.00 |  |  |  | **0.33** |  | ✓ | none | Type-2 isomorph, different skin |
| aurora ↔ liquid-grid | 0.10 | 0.50 |  |  | 1.00 | **0.33** |  |  | DELETE | Type-4 role-synonym (needs judge) |
| drawer ↔ tooltip | 0.27 | 0.33 | 1.00 |  |  | **0.33** |  |  | none | weak — likely coincidental |
| blob ↔ liquid-grid | 0.39 | 0.67 | 0.06 |  |  | **0.33** | a⊇b |  | DELETE | Type-3 wrapper/superset |
| badge ↔ fading-scroll | 0.08 | 1.00 |  |  |  | **0.33** |  | ✓ | none | Type-2 isomorph, different skin |
| collapsible ↔ tooltip | 0.45 | 0.50 | 0.25 |  |  | **0.32** |  |  | none | weak — likely coincidental |
| dialog ↔ select | 0.24 | 0.33 | 1.00 |  |  | **0.32** |  |  | none | weak — likely coincidental |
| blob ↔ constellation | 0.03 | 0.67 | 0.06 |  | 0.67 | **0.32** |  |  | none | Type-4 role-synonym (needs judge) |
| aurora ↔ fourier-field | 0.06 | 0.50 |  |  | 1.00 | **0.32** |  |  | none | Type-4 role-synonym (needs judge) |
| number-field ↔ radio-group | 0.45 | 0.50 | 0.17 |  |  | **0.31** |  |  | none | weak — likely coincidental |
| card ↔ surface | 0.50 | 0.50 | 0.04 |  |  | **0.31** | a⊇b |  | none | weak — likely coincidental |
| badge ↔ toggle-group | 0.16 | 0.67 | 0.38 |  |  | **0.31** |  |  | none | weak — likely coincidental |
| drawer ↔ select | 0.18 | 0.33 | 1.00 |  |  | **0.30** |  |  | none | weak — likely coincidental |
| radio-group ↔ select | 0.38 | 0.50 | 0.25 |  |  | **0.30** |  |  | none | weak — likely coincidental |
| carousel ↔ table | 0.17 | 0.67 | 0.33 |  |  | **0.30** |  |  | KEEP | weak — likely coincidental |
| fourier-field ↔ paper-backdrop |  | 0.50 |  |  | 1.00 | **0.30** |  |  | none | Type-4 role-synonym (needs judge) |
| liquid-grid ↔ paper-backdrop |  | 0.50 |  |  | 1.00 | **0.30** |  |  | DELETE | Type-4 role-synonym (needs judge) |
| radio-group ↔ tags-input | 0.41 | 0.50 | 0.08 |  |  | **0.28** |  |  | none | weak — likely coincidental |
| number-field ↔ tags-input | 0.40 | 0.50 | 0.08 |  |  | **0.28** |  |  | none | weak — likely coincidental |
| blob ↔ fourier-field | 0.23 | 0.67 | 0.06 |  |  | **0.28** |  |  | none | weak — likely coincidental |
| alert ↔ table | 0.18 | 0.67 | 0.14 |  |  | **0.28** |  |  | none | weak — likely coincidental |
| alert ↔ paper-backdrop | 0.17 | 0.50 | 0.50 |  |  | **0.28** | a⊇b |  | none | weak — likely coincidental |
| collapsible ↔ command | 0.38 | 0.50 | 0.06 |  |  | **0.27** |  |  | none | weak — likely coincidental |
| number-field ↔ select | 0.25 | 0.50 | 0.33 |  |  | **0.27** |  |  | none | weak — likely coincidental |
| collapsible ↔ select | 0.28 | 0.50 | 0.25 |  |  | **0.27** |  |  | none | weak — likely coincidental |
| metric-stack ↔ table | 0.22 | 0.67 |  |  |  | **0.27** |  |  | none | weak — likely coincidental |
| instrument-chassis ↔ metric-row | 0.05 | 0.33 |  |  | 1.00 | **0.27** |  |  | none | Type-4 role-synonym (needs judge) |
| combobox ↔ tooltip | 0.29 | 0.33 | 0.50 |  |  | **0.26** |  |  | none | weak — likely coincidental |
| command ↔ tooltip | 0.33 | 0.50 | 0.07 |  |  | **0.26** |  |  | none | weak — likely coincidental |
| input ↔ tags-input | 0.25 |  | 0.73 |  | 0.50 | **0.26** |  |  | none | Type-4 role-synonym (needs judge) |
| select ↔ tags-input | 0.31 | 0.50 | 0.10 |  |  | **0.26** |  |  | none | weak — likely coincidental |
| badge ↔ table | 0.13 | 0.67 | 0.10 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| collapsible ↔ combobox | 0.41 | 0.33 | 0.20 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| alert ↔ toggle-group | 0.11 | 0.67 | 0.14 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| alert ↔ tooltip | 0.09 | 0.50 | 0.50 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| tags-input ↔ textarea | 0.26 |  | 0.67 |  | 0.50 | **0.25** |  |  | none | Type-4 role-synonym (needs judge) |
| radio-group ↔ toggle-group | 0.45 | 0.33 | 0.11 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| carousel ↔ tooltip | 0.08 | 0.50 | 0.50 |  |  | **0.25** |  |  | KEEP | weak — likely coincidental |
| dialog ↔ popover | 0.33 |  | 1.00 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ table | 0.17 | 0.67 |  |  |  | **0.25** |  |  | none | weak — likely coincidental |
| popover ↔ tooltip | 0.33 |  | 1.00 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| carousel ↔ toggle-group | 0.09 | 0.67 | 0.14 |  |  | **0.25** |  |  | KEEP | weak — likely coincidental |
| instrument-chassis ↔ metric | 0.05 | 0.27 |  |  | 1.00 | **0.25** |  |  | none | Type-4 role-synonym (needs judge) |
| command ↔ toast | 0.23 | 0.50 | 0.18 |  |  | **0.25** |  |  | none | weak — likely coincidental |
| alert ↔ select | 0.06 | 0.50 | 0.50 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| accordion ↔ select | 0.18 | 0.50 | 0.25 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| accordion ↔ radio-group | 0.23 | 0.50 | 0.14 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| carousel ↔ select | 0.05 | 0.50 | 0.50 |  |  | **0.24** |  |  | KEEP | weak — likely coincidental |
| command ↔ surface | 0.18 | 0.50 | 0.24 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| aurora ↔ constellation | 0.05 | 0.50 |  |  | 0.50 | **0.24** |  |  | none | Type-4 role-synonym (needs judge) |
| accordion ↔ command | 0.26 | 0.50 | 0.06 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| collapsible ↔ dialog | 0.33 | 0.33 | 0.25 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| constellation ↔ paper-backdrop | 0.04 | 0.50 |  |  | 0.50 | **0.24** | a⊇b |  | none | Type-4 role-synonym (needs judge) |
| metric-stack ↔ toggle-group | 0.12 | 0.67 |  |  |  | **0.24** |  |  | none | weak — likely coincidental |
| badge ↔ card | 0.19 | 0.50 | 0.19 |  |  | **0.24** |  |  | none | weak — likely coincidental |
| command ↔ radio-group | 0.25 | 0.50 | 0.06 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| accordion ↔ number-field | 0.19 | 0.50 | 0.17 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| accordion ↔ tooltip | 0.14 | 0.50 | 0.25 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| button ↔ command | 0.15 | 0.50 | 0.24 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| accordion ↔ alert | 0.17 | 0.50 | 0.20 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| alert ↔ collapsible | 0.17 | 0.50 | 0.20 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| badge ↔ button | 0.21 | 0.50 | 0.10 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| badge ↔ surface | 0.18 | 0.50 | 0.13 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| carousel ↔ paper-backdrop |  | 0.50 | 0.50 |  |  | **0.23** |  |  | KEEP | weak — likely coincidental |
| dialog ↔ dropdown-menu | 0.50 |  | 0.50 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| metric-stack ↔ paper-backdrop | 0.25 | 0.50 |  |  |  | **0.23** | a⊇b |  | none | weak — likely coincidental |
| metric-stack ↔ skeleton | 0.25 | 0.50 |  |  |  | **0.23** | a⊇b |  | none | weak — likely coincidental |
| number-field ↔ tooltip | 0.08 | 0.50 | 0.33 |  |  | **0.23** |  |  | none | weak — likely coincidental |
| accordion ↔ toggle-group | 0.36 | 0.33 | 0.11 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| badge ↔ command | 0.18 | 0.50 | 0.12 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| accordion ↔ tags-input | 0.20 | 0.50 | 0.08 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| alert ↔ skeleton | 0.17 | 0.50 | 0.14 |  |  | **0.22** | a⊇b |  | none | weak — likely coincidental |
| command ↔ number-field | 0.20 | 0.50 | 0.06 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| command ↔ tags-input | 0.21 | 0.50 | 0.04 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| drawer ↔ popover | 0.24 |  | 1.00 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| collapsible ↔ toast | 0.23 | 0.50 | 0.01 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| button ↔ radio-group | 0.21 | 0.50 | 0.03 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| alert ↔ button | 0.19 | 0.50 | 0.07 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| radio-group ↔ tooltip | 0.10 | 0.50 | 0.25 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| checkbox ↔ radio-group | 0.52 | 0.17 | 0.06 |  |  | **0.22** |  |  | none | weak — likely coincidental |
| accordion ↔ button | 0.20 | 0.50 | 0.03 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| alert ↔ number-field | 0.09 | 0.50 | 0.25 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| collapsible ↔ radio-group | 0.14 | 0.50 | 0.14 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ toggle-group | 0.05 | 0.67 |  |  |  | **0.21** |  |  | none | weak — likely coincidental |
| header-ribbon ↔ table | 0.17 | 0.50 | 0.09 |  |  | **0.21** |  |  | KEEP | weak — likely coincidental |
| combobox ↔ radio-group | 0.28 | 0.33 | 0.20 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| alert ↔ radio-group | 0.11 | 0.50 | 0.20 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| popover ↔ select | 0.21 |  | 1.00 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| alert ↔ surface | 0.17 | 0.50 | 0.08 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| collapsible ↔ number-field | 0.12 | 0.50 | 0.17 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| accordion ↔ metric-stack | 0.20 | 0.50 |  |  |  | **0.21** |  |  | none | weak — likely coincidental |
| alert ↔ command | 0.17 | 0.50 | 0.07 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| collapsible ↔ metric-stack | 0.20 | 0.50 |  |  |  | **0.21** |  |  | none | weak — likely coincidental |
| command ↔ metric-stack | 0.20 | 0.50 |  |  |  | **0.21** |  |  | none | weak — likely coincidental |
| metric-stack ↔ surface | 0.20 | 0.50 |  |  |  | **0.21** |  |  | none | weak — likely coincidental |
| toast ↔ tooltip | 0.19 | 0.50 | 0.02 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| button ↔ number-field | 0.18 | 0.50 | 0.03 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| button ↔ toast | 0.14 | 0.50 | 0.11 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| combobox ↔ number-field | 0.24 | 0.33 | 0.25 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| select ↔ toggle-group | 0.28 | 0.33 | 0.17 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| collapsible ↔ drawer | 0.24 | 0.33 | 0.25 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| checkbox ↔ number-field | 0.50 | 0.17 | 0.06 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| carousel ↔ radio-group | 0.09 | 0.50 | 0.20 |  |  | **0.21** |  |  | KEEP | weak — likely coincidental |
| badge ↔ paper-backdrop | 0.09 | 0.50 | 0.20 |  |  | **0.21** | a⊇b |  | none | weak — likely coincidental |
| accordion ↔ badge | 0.12 | 0.50 | 0.13 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| badge ↔ collapsible | 0.12 | 0.50 | 0.13 |  |  | **0.21** |  |  | none | weak — likely coincidental |
| badge ↔ tooltip | 0.08 | 0.50 | 0.20 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| alert ↔ dialog | 0.09 | 0.33 | 0.50 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| accordion ↔ carousel | 0.07 | 0.50 | 0.20 |  |  | **0.20** |  |  | KEEP | weak — likely coincidental |
| alert ↔ header-ribbon | 0.10 | 0.50 | 0.14 |  |  | **0.20** |  |  | KEEP | weak — likely coincidental |
| carousel ↔ collapsible | 0.07 | 0.50 | 0.20 |  |  | **0.20** |  |  | KEEP | weak — likely coincidental |
| combobox ↔ toggle-group | 0.27 | 0.33 | 0.14 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| badge ↔ toast | 0.15 | 0.50 | 0.05 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| carousel ↔ dialog | 0.08 | 0.33 | 0.50 |  |  | **0.20** |  |  | KEEP | weak — likely coincidental |
| carousel ↔ number-field | 0.04 | 0.50 | 0.25 |  |  | **0.20** |  |  | KEEP | weak — likely coincidental |
| fourier-field ↔ watercolor-dot | 0.17 |  |  |  | 1.00 | **0.20** |  |  | none | Type-4 role-synonym (needs judge) |
| button ↔ collapsible | 0.15 | 0.50 | 0.03 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| accordion ↔ combobox | 0.23 | 0.33 | 0.20 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| collapsible ↔ tags-input | 0.13 | 0.50 | 0.08 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| carousel ↔ header-ribbon | 0.09 | 0.50 | 0.14 |  |  | **0.20** |  |  | KEEP | weak — likely coincidental |
| accordion ↔ surface | 0.13 | 0.50 | 0.07 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| collapsible ↔ surface | 0.13 | 0.50 | 0.07 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| button ↔ metric-stack | 0.15 | 0.50 |  |  |  | **0.20** |  |  | none | weak — likely coincidental |
| tags-input ↔ toggle-group | 0.28 | 0.33 | 0.07 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| alert ↔ toast | 0.14 | 0.50 | 0.03 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| select ↔ toast | 0.14 | 0.50 | 0.02 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| badge ↔ select | 0.05 | 0.50 | 0.20 |  |  | **0.20** |  |  | none | weak — likely coincidental |
| surface ↔ toast | 0.11 | 0.50 | 0.07 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| badge ↔ radio-group | 0.09 | 0.50 | 0.13 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| alert ↔ drawer | 0.06 | 0.33 | 0.50 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| badge ↔ number-field | 0.07 | 0.50 | 0.14 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| carousel ↔ drawer | 0.06 | 0.33 | 0.50 |  |  | **0.19** |  |  | KEEP | weak — likely coincidental |
| alert ↔ tags-input | 0.10 | 0.50 | 0.09 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| button ↔ card | 0.10 | 0.50 | 0.08 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| badge ↔ skeleton | 0.09 | 0.50 | 0.10 |  |  | **0.19** | a⊇b |  | none | weak — likely coincidental |
| tags-input ↔ tooltip | 0.09 | 0.50 | 0.10 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| card ↔ command | 0.11 | 0.50 | 0.04 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| alert ↔ card | 0.10 | 0.50 | 0.07 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| button ↔ tags-input | 0.10 | 0.50 | 0.06 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| combobox ↔ tags-input | 0.25 | 0.33 | 0.09 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| header-ribbon ↔ metric-stack | 0.13 | 0.50 |  |  |  | **0.19** |  |  | KEEP | weak — likely coincidental |
| metric-stack ↔ radio-group | 0.13 | 0.50 |  |  |  | **0.19** |  |  | none | weak — likely coincidental |
| number-field ↔ toggle-group | 0.23 | 0.33 | 0.13 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| radio-group ↔ surface | 0.09 | 0.50 | 0.07 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| accordion ↔ toast | 0.11 | 0.50 | 0.01 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| checkbox ↔ tags-input | 0.38 | 0.17 | 0.14 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| label ↔ metric-stack | 0.29 | 0.33 |  |  |  | **0.19** |  |  | none | weak — likely coincidental |
| button ↔ tooltip | 0.10 | 0.50 | 0.04 |  |  | **0.19** |  |  | none | weak — likely coincidental |
| accordion ↔ label | 0.25 | 0.33 | 0.06 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| collapsible ↔ label | 0.25 | 0.33 | 0.06 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| dropdown-menu ↔ tooltip | 0.36 |  | 0.50 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| number-field ↔ surface | 0.08 | 0.50 | 0.07 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| progress ↔ slider | 0.18 | 0.33 | 0.13 | 0.10 |  | **0.18** |  |  | none | weak — likely coincidental |
| animated-digit ↔ pulse | 0.11 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| metric-stack ↔ tooltip | 0.11 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| carousel ↔ surface | 0.07 | 0.50 | 0.08 |  |  | **0.18** |  |  | KEEP | weak — likely coincidental |
| badge ↔ tags-input | 0.07 | 0.50 | 0.07 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| accordion ↔ card | 0.08 | 0.50 | 0.06 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| card ↔ collapsible | 0.08 | 0.50 | 0.06 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| badge ↔ header-ribbon | 0.06 | 0.50 | 0.10 |  |  | **0.18** |  |  | KEEP | weak — likely coincidental |
| surface ↔ tooltip | 0.07 | 0.50 | 0.08 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| card ↔ metric-stack | 0.11 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| metric-stack ↔ tags-input | 0.11 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| metric-stack ↔ toast | 0.11 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| carousel ↔ command | 0.07 | 0.50 | 0.07 |  |  | **0.18** |  |  | KEEP | weak — likely coincidental |
| surface ↔ tags-input | 0.08 | 0.50 | 0.05 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| command ↔ label | 0.25 | 0.33 | 0.04 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| animated-digit ↔ status-dot | 0.10 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| metric-stack ↔ number-field | 0.10 | 0.50 |  |  |  | **0.18** |  |  | none | weak — likely coincidental |
| command ↔ dialog | 0.23 | 0.33 | 0.07 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| card ↔ radio-group | 0.06 | 0.50 | 0.06 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| header-ribbon ↔ toggle-group | 0.05 | 0.50 | 0.09 |  |  | **0.18** |  |  | KEEP | weak — likely coincidental |
| alert ↔ label | 0.22 | 0.33 | 0.07 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ header-ribbon | 0.09 | 0.50 |  |  |  | **0.18** |  |  | KEEP | weak — likely coincidental |
| carousel ↔ tags-input | 0.04 | 0.50 | 0.09 |  |  | **0.18** |  |  | KEEP | weak — likely coincidental |
| button ↔ select | 0.07 | 0.50 | 0.04 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| card ↔ number-field | 0.06 | 0.50 | 0.06 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| card ↔ toast | 0.08 | 0.50 | 0.01 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| select ↔ surface | 0.05 | 0.50 | 0.08 |  |  | **0.18** |  |  | none | weak — likely coincidental |
| drawer ↔ dropdown-menu | 0.33 |  | 0.50 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ tooltip | 0.08 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| card ↔ tags-input | 0.06 | 0.50 | 0.04 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| collapsible ↔ toggle-group | 0.19 | 0.33 | 0.11 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| instrument-chassis ↔ metric-cell | 0.04 | 0.29 |  |  | 0.50 | **0.17** |  |  | none | Type-4 role-synonym (needs judge) |
| card ↔ tooltip | 0.04 | 0.50 | 0.07 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| card ↔ carousel | 0.04 | 0.50 | 0.07 |  |  | **0.17** |  |  | KEEP | weak — likely coincidental |
| button ↔ carousel | 0.06 | 0.50 | 0.03 |  |  | **0.17** |  |  | KEEP | weak — likely coincidental |
| checkbox ↔ switch | 0.51 |  | 0.14 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| avatar ↔ dialog | 0.11 | 0.40 | 0.13 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| radio-group ↔ toast | 0.06 | 0.50 | 0.01 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| accordion ↔ fading-scroll | 0.07 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| carousel ↔ skeleton |  | 0.50 | 0.14 |  |  | **0.17** |  |  | KEEP | weak — likely coincidental |
| collapsible ↔ fading-scroll | 0.07 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| command ↔ fading-scroll | 0.07 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| dock ↔ instrument-chassis |  | 0.57 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ surface | 0.07 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| card ↔ header-ribbon | 0.04 | 0.50 | 0.05 |  |  | **0.17** |  |  | KEEP | weak — likely coincidental |
| card ↔ select | 0.03 | 0.50 | 0.07 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| tags-input ↔ toast | 0.06 | 0.50 | 0.01 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| number-field ↔ toast | 0.06 | 0.50 | 0.02 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| animated-digit ↔ scroll-progress-rim | 0.06 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| metric-stack ↔ select | 0.06 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| carousel ↔ toast | 0.04 | 0.50 | 0.03 |  |  | **0.17** |  |  | KEEP | weak — likely coincidental |
| button ↔ fading-scroll | 0.06 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| avatar ↔ dropdown-menu | 0.10 | 0.40 | 0.11 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| easing-picker ↔ easing-configurator | 0.56 |  |  |  |  | **0.17** |  |  | ASK | weak — likely coincidental |
| label ↔ tooltip | 0.18 | 0.33 | 0.08 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| avatar ↔ popover | 0.09 | 0.40 | 0.13 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| alert ↔ combobox | 0.05 | 0.33 | 0.33 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ select | 0.05 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| avatar ↔ label | 0.13 | 0.40 | 0.05 |  |  | **0.17** |  |  | none | weak — likely coincidental |
| carousel ↔ combobox | 0.05 | 0.33 | 0.33 |  |  | **0.17** |  |  | KEEP | weak — likely coincidental |
| fading-scroll ↔ radio-group | 0.05 | 0.50 |  |  |  | **0.17** |  |  | none | weak — likely coincidental |
| avatar ↔ chip | 0.25 | 0.27 | 0.05 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| dropdown-menu ↔ select | 0.29 |  | 0.50 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| card ↔ fading-scroll | 0.04 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ tags-input | 0.04 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ toast | 0.04 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| button ↔ toggle-group | 0.18 | 0.33 | 0.06 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ number-field | 0.04 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| slider ↔ switch | 0.34 | 0.17 | 0.07 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| dialog ↔ number-field | 0.04 | 0.33 | 0.33 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| constellation ↔ skeleton | 0.04 | 0.50 |  |  |  | **0.16** | a⊇b |  | none | weak — likely coincidental |
| command ↔ drawer | 0.17 | 0.33 | 0.07 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| command ↔ toggle-group | 0.18 | 0.33 | 0.05 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| card ↔ toggle-group | 0.11 | 0.33 | 0.18 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| constellation ↔ metric-stack | 0.04 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| avatar ↔ drawer | 0.07 | 0.40 | 0.13 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| drawer ↔ number-field | 0.03 | 0.33 | 0.33 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| alert ↔ constellation | 0.03 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| dialog ↔ toast | 0.19 | 0.33 | 0.02 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| label ↔ radio-group | 0.17 | 0.33 | 0.06 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| liquid-grid ↔ watercolor-dot |  |  | 0.06 |  | 1.00 | **0.16** |  |  | DELETE | Type-4 role-synonym (needs judge) |
| badge ↔ constellation | 0.03 | 0.50 |  |  |  | **0.16** |  |  | none | weak — likely coincidental |
| paper-backdrop ↔ table | 0.11 | 0.33 | 0.17 |  |  | **0.16** | b⊇a |  | none | weak — likely coincidental |
| button ↔ label | 0.18 | 0.33 | 0.03 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| accordion ↔ dialog | 0.07 | 0.33 | 0.25 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| checkbox ↔ select | 0.32 | 0.17 | 0.07 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| accordion ↔ table | 0.13 | 0.33 | 0.11 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| collapsible ↔ table | 0.13 | 0.33 | 0.11 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| badge ↔ label | 0.15 | 0.33 | 0.06 |  |  | **0.16** |  |  | none | weak — likely coincidental |
| toggle-group ↔ tooltip | 0.10 | 0.33 | 0.17 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| badge ↔ dialog | 0.08 | 0.33 | 0.20 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| accordion ↔ drawer | 0.05 | 0.33 | 0.25 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| label ↔ surface | 0.15 | 0.33 | 0.04 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| dialog ↔ radio-group | 0.05 | 0.33 | 0.25 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| checkbox ↔ combobox | 0.30 | 0.17 | 0.07 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| label ↔ number-field | 0.14 | 0.33 | 0.07 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| alert ↔ fourier-field |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| alert ↔ liquid-grid |  | 0.50 |  |  |  | **0.15** |  |  | DELETE | weak — likely coincidental |
| alert ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| aurora ↔ paper-backdrop |  |  |  |  | 1.00 | **0.15** |  |  | none | Type-4 role-synonym (needs judge) |
| avatar ↔ sortable-list | 0.10 | 0.40 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| badge ↔ fourier-field |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| badge ↔ liquid-grid |  | 0.50 |  |  |  | **0.15** |  |  | DELETE | weak — likely coincidental |
| badge ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| carousel ↔ constellation |  | 0.50 |  |  |  | **0.15** |  |  | KEEP | weak — likely coincidental |
| carousel ↔ fourier-field |  | 0.50 |  |  |  | **0.15** |  |  | KEEP | weak — likely coincidental |
| carousel ↔ liquid-grid |  | 0.50 |  |  |  | **0.15** |  |  | KEEP | weak — likely coincidental |
| carousel ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | KEEP | weak — likely coincidental |
| constellation ↔ fading-scroll |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| constellation ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| dialog ↔ paper-backdrop |  |  | 1.00 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| drawer ↔ paper-backdrop |  |  | 1.00 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ fourier-field |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ liquid-grid |  | 0.50 |  |  |  | **0.15** |  |  | DELETE | weak — likely coincidental |
| fading-scroll ↔ paper-backdrop |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fading-scroll ↔ skeleton |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fourier-field ↔ metric-stack |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fourier-field ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| fourier-field ↔ skeleton |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| infinite-scroll ↔ instrument-chassis |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| liquid-grid ↔ metric-stack |  | 0.50 |  |  |  | **0.15** |  |  | DELETE | weak — likely coincidental |
| liquid-grid ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | DELETE | weak — likely coincidental |
| liquid-grid ↔ skeleton |  | 0.50 |  |  |  | **0.15** |  |  | DELETE | weak — likely coincidental |
| metric-stack ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| paper-backdrop ↔ popover |  |  | 1.00 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| paper-backdrop ↔ scroll-progress-rim |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |
| paper-backdrop ↔ select |  |  | 1.00 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| paper-backdrop ↔ tooltip |  |  | 1.00 |  |  | **0.15** |  |  | none | weak — likely coincidental |
| paper-backdrop ↔ watercolor-dot |  |  |  |  | 1.00 | **0.15** |  |  | none | Type-4 role-synonym (needs judge) |
| pulse ↔ skeleton | 0.25 |  |  |  | 0.50 | **0.15** | a⊇b |  | none | Type-4 role-synonym (needs judge) |
| scroll-progress-rim ↔ skeleton |  | 0.50 |  |  |  | **0.15** |  |  | none | weak — likely coincidental |

_Total candidates: 310._
