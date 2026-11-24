<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@glass/components/select";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@glass/components/accordion";
import { Checkbox } from "@glass/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { Switch } from "@glass/components/switch";
import { Button } from "@glass/components/button";
import { Input } from "@glass/components/input";
import { Blob, BLOB_CONFIG_DEFAULTS } from "@glass/components/blob";

// ?only=<cell> renders one cell, so a page process that aborts names its cell.
const only = new URLSearchParams(location.search).get("only");
const show = (id: string) => !only || only === id;

const sel = ref("b");
const view = ref("week");
const radio = ref("a");
</script>

<template>
    <main>
        <section v-if="show('select-trigger')" class="cell">
            <Select v-model="sel">
                <SelectTrigger data-target="select-trigger"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="a">Alpha</SelectItem>
                    <SelectItem value="b">Beta</SelectItem>
                </SelectContent>
            </Select>
        </section>

        <section v-if="show('toggle-item')" class="cell">
            <ToggleGroup v-model="view" type="single" aria-label="View">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month" data-target="toggle-item">Month</ToggleGroupItem>
            </ToggleGroup>
        </section>

        <section v-if="show('accordion-trigger')" class="cell">
            <Accordion type="single" collapsible>
                <AccordionItem value="one">
                    <AccordionTrigger data-target="accordion-trigger">A question</AccordionTrigger>
                    <AccordionContent>An answer.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        <section v-if="show('checkbox-checked')" class="cell">
            <Checkbox :model-value="true" data-target="checkbox-checked" aria-label="checked" />
        </section>
        <section v-if="show('checkbox-unchecked')" class="cell">
            <Checkbox :model-value="false" data-target="checkbox-unchecked" aria-label="unchecked" />
        </section>
        <section v-if="show('checkbox-disabled-checked')" class="cell">
            <Checkbox :model-value="true" disabled data-target="checkbox-disabled-checked" aria-label="disabled" />
        </section>

        <section v-if="show('radio-checked')" class="cell">
            <RadioGroup v-model="radio" aria-label="radio">
                <RadioGroupItem value="a" data-target="radio-checked" aria-label="a" />
                <RadioGroupItem value="b" aria-label="b" />
            </RadioGroup>
        </section>

        <section v-if="show('switch-checked')" class="cell">
            <Switch :model-value="true" data-target="switch-checked" aria-label="switch" />
        </section>

        <section v-if="show('button-destructive')" class="cell">
            <Button tone="destructive" data-target="button-destructive">Delete</Button>
        </section>

        <section v-if="show('input-invalid')" class="cell">
            <Input aria-invalid="true" model-value="bad" data-target="input-invalid" aria-label="invalid" />
        </section>

        <section v-if="show('blob')" class="cell" style="width: 220px; height: 220px">
            <Blob color="var(--primary)" :config="BLOB_CONFIG_DEFAULTS" data-target="blob" />
        </section>

        <!-- Bare elements for the global rules the sweep named. -->
        <section v-if="show('bare-control-surface')" class="cell">
            <button class="control-surface bare" data-target="bare-control-surface">surface</button>
        </section>
        <section v-if="show('bare-feedback-tone')" class="cell">
            <div class="glass-quiet feedback-tone feedback-tone-destructive bare" data-target="bare-feedback-tone">tone</div>
        </section>
        <section v-if="show('bare-dock-icon-button')" class="cell">
            <button class="dock-icon-button glass-capsule bare" data-target="bare-dock-icon-button">icon</button>
        </section>
        <section v-if="show('bare-dock-icon-button-active')" class="cell">
            <button class="dock-icon-button glass-capsule bare" data-active data-target="bare-dock-icon-button-active">icon</button>
        </section>
        <section v-if="show('bare-dock-tab-button')" class="cell">
            <button class="dock-tab-button bare" data-target="bare-dock-tab-button">tab</button>
        </section>
        <section v-if="show('bare-dock-trigger')" class="cell">
            <button class="dock-trigger bare" data-target="bare-dock-trigger">trigger</button>
        </section>
        <section v-if="show('bare-sheet-halo')" class="cell">
            <div data-slot="glass-graded-halo" class="bare" data-target="bare-sheet-halo"></div>
        </section>
        <section v-if="show('bare-focus-veil')" class="cell">
            <div class="glass-focus-veil" data-target="bare-focus-veil"></div>
        </section>
        <section v-if="show('bare-glass-capsule')" class="cell">
            <div class="glass-capsule glass-capsule-hover bare" data-target="bare-glass-capsule">capsule</div>
        </section>
        <section v-if="show('bare-ghost-slot')" class="cell">
            <div class="ghost-slot bare" data-target="bare-ghost-slot">slot</div>
        </section>
    </main>
</template>
