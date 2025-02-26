<template>
  <div
    class="flex flex-col justify-center items-center p-12 bg-white rounded-lg shadow-lg"
    role="status"
    aria-live="polite"
  >
    <div class="relative">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"
      ></div>
    </div>
    <p class="mt-4 text-gray-600 font-medium">Loading data...</p>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed
</script>
