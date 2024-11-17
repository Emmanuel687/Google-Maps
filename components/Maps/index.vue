<script setup>
// Imports Start
import { useMapStore } from "~/stores/map"
// Imports End

// Store Start
const appStore = useMapStore()
// Store End
</script>

<template>
  {{ appStore.properties }}
</template>