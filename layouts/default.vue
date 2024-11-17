<script setup>
// Imports Start
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
// Imports End

</script>


<template>
  <section class="flex h-screen !w-full bg-gray-100">
    <!-- SideBar Section Start -->
    <Sidebar />
    <!-- SideBar Section End -->

    <section class="flex-grow flex flex-col">
      <!-- TopBar Section Start -->
      <Topbar />
      <!-- TopBar Section End -->
       
      <!-- Main Content Section Start -->
      <main class="flex-grow p-6 overflow-auto">
        <slot />
      </main>
      <!-- Main Content Section End -->

    </section>
  </section>
</template>