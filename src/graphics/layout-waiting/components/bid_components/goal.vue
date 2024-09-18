<template>

  <div
    class="goal-bids-container pl-[40px] w-full h-[380px] text-[.5em] flex flex-col flex-nowrap items-start text-center overflow-hidden">
    <!-- bids-title -->
    <div
      class=" relative right-[50px] w-[866px] h-[75px] flex flex-row bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2_Espera_BidGoal_1.png')]">
      <div class="title w-full pl-[40px] flex flex-col justify-start font-bold py-2">
        <div class="flex flex-row items-center justify-between pr-7 h-1/2">
          <p class="text-2xl">{{ getRunBidName(props.bid) }}</p>
          <div class="text-4xl italic font-thin goal">
            <span class="relative top-[12px]">meta: {{ currencyFormat(props.bid.goal) }}</span>
          </div>
        </div>
        <div class="flex flex-row justify-start italic font-thin h-1/2">
          <p>{{ props.bid.bidname }}</p>
        </div>
      </div>
    </div>
    <!-- bids-info -->
    <div class="relative right-[40px] flex flex-row items-center w-full h-[280px] gap-2 mt-[10px]">
      <div id="bar-bg" class="bar-over-bg w-[856px] h-[220px] bg-[#F0B140]">
        <div class="w-[856px] h-[220px] bg-transparent text-start relative">
          <div id="bg-bar" class="absolute w-[848px] bg-[#967742] h-[205px] mt-[8px]">
          </div>
          <div id="bg-end-bar"
            class="absolute w-[100px] left-[100px] h-[205px] bg-[#6B707B] mt-[8px] border-l-[6px] border-[#F0B140]">
            <div class="relative flex flex-col justify-between h-full px-2 py-4 percentage">
              <div>
                <!-- <span class="text-2xl font-thin">{{ currencyFormat(props.bid.current_amount) }}</span> -->
                <span class="text-xl font-thin">100,00$</span>
              </div>
              <div>
              </div>
              <div class="w-full text-end">
                <!-- <span class="text-4xl"> {{ barPercentage }}% </span> -->
                <span class="text-4xl"> 100% </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { currencyFormat, getRunBidName } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { Bid } from '@sre-frontend-layout/types';
import anime, { AnimeTimelineInstance } from 'animejs';
import { computed, onMounted, ref, watch } from 'vue';


const barPercentage = computed(() => {
  // console.log(props.bid.current_amount, props.bid.goal)
  if (props.bid.goal === 0) return 0
  return ((props.bid.current_amount / props.bid.goal) * 100).toFixed(0)
})

// Props
const props = defineProps<{
  bid: Bid;
}>();

const emit = defineEmits(['animationEnd'])

const barWidth = 848;

let animeTL = ref(anime.timeline());

function createAnimation() {

  animeTL.value = anime.timeline();
  // Calcular el porcentaje para animar
  // const percentage = props.bid.current_amount / props.bid.goal;
  const percentage = 1;
  const endWidth = barWidth * percentage;
  const bgWidth = barWidth * percentage - 85; // Restar la anchura de #bg-end-bar

  anime.set('.goal-bids-container', {
    opacity: '1',
  })

  anime.set('.title', {
    opacity: '0',
  })

  anime.set('.goal-bids-container', {
    translateX: `-848px`
  })

  anime.set('#bar-bg', {
    translateX: `-858px`
  })

  anime.set('#bg-bar', {
    translateX: `-858px`
  })

  anime.set('#bg-end-bar', {
    translateX: `-90px`
  })

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1.5)',
    translateX: `0px`
  })

  animeTL.value.add({
    targets: '.title',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    opacity: `1`
  })

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 2000,
    easing: 'easeOutElastic(1, 1.5)',
    translateX: '0px',
  })

  animeTL.value.add({
    targets: '#bg-bar',
    duration: 2000,
    easing: 'easeOutElastic(1, 2)',
    translateX: `-${barWidth - bgWidth - 30}px`
  }, '-=2000')

  animeTL.value.add({
    targets: '#bg-end-bar',
    duration: 2000,
    easing: 'easeOutElastic(1, 2)',
    translateX: `${endWidth - 205}px`
  }, '-=2000')

  animeTL.value.add({
    targets: '.title',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    delay: 10000,
    opacity: `0`
  })

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 1000,
    easing: 'linear',
    opacity: `0`,
  }, '-=2000')

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 1000,
    easing: 'easeOutElastic(1, 1)',
    opacity: '0',
    delay: 500
    // delay: 10000
  })

  animeTL.value.finished.then(() => {
    emit('animationEnd')
  })
}

watch(() => props.bid, (newVal) => {
  animeTL.value.pause()
  animeTL.value = {} as AnimeTimelineInstance
  createAnimation()
});

onMounted(() => {
  createAnimation()
})
</script>