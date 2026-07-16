<script setup lang="ts">
import { Button } from "@glass/components/button";
import { Toaster, useToast } from "@glass/components/toast";

const { toast } = useToast();

function showSavedToast() {
    toast({ title: "Saved", description: "Your changes are ready." });
}
</script>

<template>
    <div class="flex items-center gap-3">
        <Toaster />
        <Button @click="showSavedToast">Show saved toast</Button>
    </div>
</template>
