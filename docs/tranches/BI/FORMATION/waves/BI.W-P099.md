# BI.W-P099 — Search

**Status:** DONE

## Product truth

Search retains two related public surfaces: SearchBar is a native query field with
shared field chrome, while FuzzySearch renders ranked results with listbox
navigation, escaped match highlighting, active-descendant linkage, and optional
Dialog expansion over the caller-supplied `FuzzySearchState`.

FuzzySearch has one visually hidden `role="status"` result announcement. It is
polite and atomic, publishes the current result count with its query, and changes
only when the query or result set changes. Moving the active option does not
rewrite or repeat the announcement.

## Ownership boundary

- Glass owns field/result semantics, active-option navigation, escaped match
  paint, inline/expanded presentation, and the result-count status.
- The existing matcher/composable owns query debounce, ranking, selection, and
  open/expanded state.
- The caller owns the searchable data and selection outcome. Loading, fetching,
  errors, retry policy, and application routing are not Search APIs.
- Search is not Combobox: it finds and invokes results rather than owning a form
  selection value.

## Verification

Focused contracts preserve plain-text highlighting, UTF-16 match offsets,
listbox/active-descendant linkage, polite atomic count updates, and silence during
Arrow-key navigation. No proof scripts or per-wave browser gates are retained.
