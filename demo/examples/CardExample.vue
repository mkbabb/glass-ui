<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@glass/components/card";
import { Button } from "@glass/components/button";
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Quarterly review</CardTitle>
            <CardDescription
                >One semantic content group with an explicit action.</CardDescription
            >
        </CardHeader>
        <CardContent>Revenue is tracking seven percent above plan.</CardContent>
        <CardFooter><Button size="sm">Open report</Button></CardFooter>
    </Card>
</template>
