<script setup>
// Imports Start
import { ref, onMounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useMapStore } from '@/stores/map'
// Imports End

// Reactive Variables Start
const mapDiv = ref(null);
const selectedLocation = ref(null);
const loading = ref(false);
const mapInstance = ref(null);
// Reactive Variables End

// Variables Start
const config = useRuntimeConfig()
// Variables End

// Store Start
const mapStore = useMapStore()
// Store End

// Locations Start
const locations = mapStore.getProperties
// Locations End


// Mount Start
onMounted(async () => {
  try {
    // Ensure mapDiv is available
    if (mapDiv.value) {
      const { map, google } = await initializeMap()
      mapInstance.value = map
    } else {
      console.error("Map container is not ready!")
    }
  } catch (error) {
    console.error('Error loading Google maps:', error)
  }
})
// Mount End

// Initialize Start
const initializeMap = async () => {
  const loader = new Loader({
    apiKey: config.public.googleMapsApiKey,
    version: "weekly"
  })

  try {
    loading.value = true
    const google = await loader.load()

    // Check if mapDiv is still available
    if (!mapDiv.value) {
      console.error('Map div is not available!')
      return
    }

    const map = new google.maps.Map(mapDiv.value, {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 10
    })

    // Marker icon for the house
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

    // Add markers for each location
    locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: location.location,
        map: map,
        title: location.title,
        icon: houseIcon,
        animation: google.maps.Animation.DROP
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

      // Add listener to show InfoWindow on click
      marker.addListener('click', () => {
        selectedLocation.value = location
        infoWindow.setContent(content)
        infoWindow.open(map, marker)
      })
    })

    return { map, google }
  } catch (error) {
    console.error('Error initializing Google Maps:', error)
    throw error
  } finally {
    loading.value = false
  }
}
// Initialize End
</script>

<template>
  <div class="relative w-full">

    <!-- Map container Start -->
    <section >
      <div ref="mapDiv" class="w-full h-[900px] rounded-lg shadow-lg"></div>
    </section>
    <!-- Map container End -->

    <!--  Selected location Start -->
    <section v-if="selectedLocation" class="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
      <h3 class="font-bold text-lg mb-2">{{ selectedLocation.title }}</h3>
      <p class="text-green-600 font-bold mb-2">£{{ selectedLocation.price.toLocaleString() }}</p>
      <p class="text-gray-600 mb-1">
        {{ selectedLocation.bedrooms }} beds • {{ selectedLocation.bathrooms }} baths
      </p>
      <p class="text-gray-600 mb-1">{{ selectedLocation.sqft }} sq ft</p>
      <p class="text-gray-600">{{ selectedLocation.address }}</p>
    </section>
    <!--  Selected location End -->
  </div>
</template>
