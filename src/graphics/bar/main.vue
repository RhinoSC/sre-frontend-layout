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
      <AnnounceComponent v-if="generalAnimNumber === 1" @animationEnded="animationEnd($event)" />
      <BidsComponent v-if="generalAnimNumber === 2" @animationEnded="animationEnd($event)"></BidsComponent>
    </div>
    <div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import AnnounceComponent from './components/announces.vue'
import BidsComponent from './components/bids.vue'

// Props
const props = defineProps<{
  wait?: boolean;
}>();

const bidAnimationEnded = ref(true)
const generalAnimNumber = ref(0)


function animationEnd($event: any) {
  bidAnimationEnded.value = true
  nextAnimation()
}

function nextAnimation() {
  if (props.wait) {
    // setMusicAnimation()
    // setSocialAnimation()
  } else {
    // console.log("next animation", generalAnimNumber.value, bidAnimationEnded.value)
    if (bidAnimationEnded) {
      if (generalAnimNumber.value > 1) generalAnimNumber.value = 0

      if (generalAnimNumber.value === 1) {
        bidAnimationEnded.value = false
      }
      generalAnimNumber.value += 1
    }
  }
}

onMounted(() => {
  if (props.wait) {
    // setMusicAnimation()
    // setSocialAnimation()
  } else {
    nextAnimation()
    // setAnnouceAnimation()
  }
})

function mounted() {
  throw new Error('Function not implemented.')
}
</script>