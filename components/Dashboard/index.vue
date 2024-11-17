<script setup>
// Imports Start
import { useMapStore } from '@/stores/map'
// Imports End

// Stores Start
const mapStore = useMapStore()
// Stores End

// Get Stores Start
const locations = mapStore.getProperties
// Get Stores End

</script>

<template>
  <!-- AirBNB Number Start -->
  <section class="flex items-center justify-end py-4 px-6 bg-white shadow-sm rounded-lg">
    <h2 class="flex items-center text-2xl font-bold text-gray-800">
      <span class="text-gray-700 mr-2">{{ locations.length }}</span>
      <span class="text-gray-700">AirBnBs Found</span>
    </h2>
  </section>
  <!-- AirBNB Number End -->

  <!-- AirBNB DataTable Start -->
  <section class="mt-5">
    <DataTable :value="locations" paginator :rows="13" :rowsPerPageOptions="[5, 10, 20, 50]" scrollable
      scrollHeight="900px" tableStyle="min-width: 50rem min-height: 200rem">
      <Column field="address" header="Address"></Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          £ {{ slotProps.data.price }}
        </template>
      </Column>
      <Column field="type" header="Type"></Column>
      <Column field="bedrooms" header="Bedrooms"></Column>
      <Column field="bathrooms" header="Bathrooms"></Column>

    </DataTable>
  </section>
  <!-- AirBNB DataTable End -->

</template>