<template>
  <div class="p-6 mx-auto">
    <div class="text-lg font-semibold text-white-smoke">
      Are you sure you want to return to the start?
    </div>

    <div class="flex justify-end mt-6 space-x-4">
      <button @click="$emit('dismiss')"
        class="px-4 py-2 text-gray-800 transition-colors duration-200 bg-gray-200 rounded-md hover:bg-gray-300">
        Cancel
      </button>
      <button @click="$emit('confirm')"
        class="px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-md hover:bg-blue-600">
        OK
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>