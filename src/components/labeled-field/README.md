# LabeledField

`@mkbabb/glass-ui/labeled-field` owns one accessible field composition: a real Label, optional
visible description, slotted control, and invalid error. Stable slot IDs connect those regions
without styling the control.

```vue
<LabeledField
    label="Email"
    description="Used for release notices."
    requirement="required"
    invalid
>
    <template #default="{ controlId, describedBy, errorId, invalid, required }">
        <Input
            :id="controlId"
            :aria-describedby="describedBy"
            :aria-errormessage="errorId"
            :invalid="invalid"
            :required="required"
        />
    </template>
    <template #error>Enter a valid email address.</template>
</LabeledField>
```

`layout="horizontal"` places label copy beside the control and returns to document-order stacking
on narrow viewports. The default layout is stacked. No mode adds a divider, control paint, hidden
label, tooltip trigger, or trailing action.

`LabeledInput`, `LabeledSelect`, `LabeledSlider`, and `LabeledSwitch` are thin typed adapters for
their respective controls. They share the same `label`, `description`, `requirement`, state, layout,
and error contract and add no visual taxonomy of their own.
