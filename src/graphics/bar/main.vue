<template>
  <div class="w-[1920px] h-[77px] flex flex-row items-start bg-[url('/src/graphics/bar/bar_bg.png')]">
  <!-- <div class="w-[1920px] h-[77px] flex flex-row items-start bg-black"> -->
    <div class="w-[466px] h-[77px] flex">
      <div class="w-[360px] bg-lime-600 h-[77px]" style="clip-path: polygon(0 0, 87% 0, 100% 100%, 0% 100%);">
      </div>
      <div class="w-[106px] bg-blue-400 h-[77px] relative right-[15px]"
        style="clip-path: polygon(0 0, 57% 0, 100% 100%, 43% 100%);">
      </div>
    </div>
    <div class="relative -left-[112px] w-[1200px] h-[77px] flex items-end pl-[50px] text-white">
      <!-- <AnnounceComponent /> -->
      <BidsComponent></BidsComponent>
    </div>
    <div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import AnnounceComponent from './components/announces.vue'
import BidsComponent from './components/bids.vue'
</script>