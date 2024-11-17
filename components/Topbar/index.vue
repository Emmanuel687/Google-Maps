<script setup>

// Reactive Variables Start
const lat = ref(null)
const lng = ref(null)
const errorMessage = ref('')
const currentTime = ref('')
// Reactive Variables End


// Get Location Start
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat.value = position.coords.latitude
        lng.value = position.coords.longitude
      },
      (error) => {
        errorMessage.value = 'Unable to retrieve your location.'
        console.error(error)
      }
    )
  } else {
    errorMessage.value = 'Geolocation is not supported by your browser.'
  }
}
// Get Location End

// Format Time Start
const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
// Format Time End


// Start Clock Start
const startClock = () => {
  setInterval(() => {
    currentTime.value = formatTime(new Date())
  }, 1000)
  currentTime.value = formatTime(new Date())
}
// Start Clock End


// Mounted Hook Start
onMounted(() => {
  getLocation()
  startClock()
})
// Mounted Hook End

</script>

<template>
  <header class="bg-white shadow-sm flex items-center justify-between px-4 h-[55px]">
    <!-- Current Location Start -->
    <div class="text-sm text-gray-600">
      <p v-if="lat && lng">
        Your current location is:
        <strong>Latitude: {{ lat.toFixed(4) }}, Longitude: {{ lng.toFixed(4) }}</strong>
      </p>
      <p v-else-if="errorMessage">{{ errorMessage }}</p>
      <p v-else>Loading your location...</p>
    </div>
    <!-- Current Location End -->


    <!-- Current Time Start -->
    <div class="text-sm text-gray-600">
      <p>Current time: <strong>{{ currentTime }}</strong></p>
    </div>
    <!-- Current Time End -->

  </header>
</template>

<style scoped>
</style>
