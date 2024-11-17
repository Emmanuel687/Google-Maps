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

          <span class="text-2xl font-bold">BNB</span>
        </NuxtLink>
      </div>
      <nav class="flex-1 px-2 py-4 space-y-2">
        <NuxtLink to="/"
          class="flex items-center space-x-2 px-4 py-3 rounded transition duration-200 hover:bg-gray-100 hover:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#4CAF50">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Maps</span>
        </NuxtLink>



      </nav>
      <div class="p-4">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded  transition duration-200 border-indigo-600 border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"></div>
  </div>
</template>