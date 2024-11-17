<script setup>

import { Loader } from '@googlemaps/js-api-loader'
import { useMapStore } from '@/stores/map'

// Get properties from the store
const mapStore = useMapStore()
const locations = mapStore.getProperties

// Reference for the map container
const mapDiv = ref(null)
const selectedLocation = ref(null)

// Your API key (or load from config)
const config = useRuntimeConfig()

// When the component is mounted, initialize the map and markers
onMounted(async () => {
  const loader = new Loader({
    apiKey: config.public.googleMapsApiKey,
    version: "weekly"
  })

  try {
    const google = await loader.load()

    // Create a map centered on a default location
    const map = new google.maps.Map(mapDiv.value, {
      center: { lat: 51.5074, lng: -0.1278 }, // Default center (London)
      zoom: 10
    })

    const houseIcon = {
      url: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="#2196F3" d="M12 2L3 9h2v11h14V9h2L12 2z"/>
      <path fill="#1976D2" d="M12 4L5 9.7V20h14V9.7L12 4z"/>
      <path fill="#BBDEFB" d="M9 13h6v7H9z"/>
      <path fill="#BBDEFB" d="M12 6l-5 5h10l-5-5z"/>
    </svg>
  `),
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 40)
    }
    const infoWindow = new google.maps.InfoWindow()

    // Loop through the locations array and create a marker for each
    locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: location.location,
        map: map,
        title: location.title,
        icon: houseIcon, // Custom SVG marker icon
        animation: google.maps.Animation.DROP // Marker animation when added
      })

      // Content for the InfoWindow
      const content = `
        <div class="p-4 max-w-sm">
          <h3 class="font-bold text-lg mb-2">${location.title}</h3>
          <p class="text-green-600 font-bold mb-2">£${location.price.toLocaleString()}</p>
          <p class="text-gray-600 mb-1">${location.bedrooms} beds • ${location.bathrooms} baths</p>
          <p class="text-gray-600 mb-1">${location.sqft} sq ft</p>
          <p class="text-gray-600">${location.address}</p>
        </div>
      `

      // Add an event listener to the marker to open the InfoWindow
      marker.addListener('click', () => {
        selectedLocation.value = location
      })
    })
  } catch (error) {
    console.error('Error loading Google Maps:', error)
  }
})
</script>

<template>
  <div class="relative w-full ">
    <!-- Map container Start -->
    <div ref="mapDiv" class="w-full h-[900px] rounded-lg shadow-lg"></div>
    <!-- Map container End -->


    <!--  Selected location Start -->
    <div v-if="selectedLocation" class="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
      <h3 class="font-bold text-lg mb-2">{{ selectedLocation.title }}</h3>
      <p class="text-green-600 font-bold mb-2">£{{ selectedLocation.price.toLocaleString() }}</p>
      <p class="text-gray-600 mb-1">
        {{ selectedLocation.bedrooms }} beds • {{ selectedLocation.bathrooms }} baths
      </p>
      <p class="text-gray-600 mb-1">{{ selectedLocation.sqft }} sq ft</p>
      <p class="text-gray-600">{{ selectedLocation.address }}</p>
    </div>
    <!--  Selected location End -->

  </div>
</template>
