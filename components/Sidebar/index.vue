<script setup>
// Imports start
// Imports End

// Reactive Variables Start
const isOpen = ref(false);
// Reactive Variables End

// Variables Start

// Variables End

</script>


<template>
  <div>
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-0 left-0 m-4 z-20">
      <button @click="isOpen = !isOpen" class="text-white focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <div :class="[
      'bg-white text-black w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      'fixed lg:static z-10'
    ]">
      <div class="p-4">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="flex-shrink-0">
            <a href="/" class="flex items-center">
              <img alt="logo" src="/public/assets/svgs/Icons/2.png" class="w-[90px] h-auto" />
            </a>
          </div>

          <span class="text-2xl font-bold">User Panel</span>
        </NuxtLink>
      </div>
      <nav class="flex-1 px-2 py-4 space-y-2">

        <!-- Dashboard Icon -->
        <NuxtLink to="/"
          class="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#4CAF50">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM14 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          <span>Dashboard</span>
        </NuxtLink>

        <!-- Maps Icon -->
        <NuxtLink to="/map"
          class="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FF5733">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>Maps</span>
        </NuxtLink>





      </nav>

    </div>

    <!-- Overlay -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"></div>
  </div>
</template>