<template>
  <div
    class="goal-bids-container pl-[40px] w-full h-[77px] text-[.5em] flex flex-col flex-nowrap items-start text-center overflow-hidden">
    <div class="flex flex-row justify-start h-[40px] gap-2 goal-title-container">
      <div class="font-bold title">
        <!-- <h1>Hollow Knight</h1> -->
        <!-- <h1>Combomizer SMZ3 (Super Metroid y Zelda A link to the Past)</h1> -->
        <h1>{{ getRunBidName(props.bid) }}</h1>
      </div>
      <span> - </span>
      <div class="italic font-thin goal">
        <h1>{{ props.bid.bidname }}</h1>
        <!-- <h1>Con misiles vs Sin misiles - Derrotar a Raven Beak</h1> -->
        <!-- <h1>Filename</h1> -->
      </div>
    </div>
    <div class="flex flex-row items-center w-full h-[38px] gap-2">
      <h2 class="current-amounts w-[200px]"><span class="font-thin">{{ currencyFormat(props.bid.current_amount)
          }}</span> / {{
            currencyFormat(props.bid.goal)
          }}</h2>
      <div id="bar-bg" class="bar-over-bg w-[860px] h-[38px] bg-[#00FFFF]"
        style="clip-path: polygon(7px 0px, 97.70% 0px, 100% 95%, 3% 95%);">
        <div class="w-[856px] h-[34px] bg-transparent text-start pl-8 relative top-[2px] left-[4px]"
          style="clip-path: polygon(9px 1px, 97.46% 1px, 99.31% 92.06%, 2.88% 92.06%);">
          <div id="bg-bar" class="absolute w-[856px] bg-[#0E8D9B] h-[38px]">
          </div>
          <div id="bg-end-bar" class="relative w-[85px] bg-[#D1559E]"
            style="clip-path: polygon(8px 0px, 76.77% 0px, 100% 95%, 30.3% 95%);">
            <h3 class="pl-[22px] percentage relative bottom-[2px]">{{ barPercentage }}%</h3>
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
  return ((props.bid.current_amount / props.bid.goal) * 100).toFixed(0)
})

// Props
const props = defineProps<{
  bid: Bid;
}>();

const emit = defineEmits(['animationEnd'])

const barWidth = 856;

let animeTL = ref(anime.timeline());

function createAnimation() {

  animeTL.value = anime.timeline();
  // Calcular el porcentaje para animar
  // const percentage = props.bid.current_amount / props.bid.goal;
  const percentage = 0.5;
  const endWidth = barWidth * percentage;
  const bgWidth = barWidth * percentage - 85; // Restar la anchura de #bg-end-bar

  anime.set('.goal-bids-container', {
    opacity: '1',
  })

  anime.set('#bar-bg', {
    translateY: `40px`
  })

  anime.set('#bg-bar', {
    translateX: `-856px`
  })

  anime.set('#bg-bar', {
    translateX: `-856px`
  })

  // anime.set('#bg-bar', {
  //   translateX: `-${barWidth - bgWidth}px`
  // })

  // anime.set('#bg-end-bar', {
  //   translateX: `${endWidth - 85}px`
  // })

  anime.set('#bg-end-bar', {
    translateX: `-90px`
  })

  anime.set('.current-amounts', {
    translateX: '-220px'
  })

  anime.set('.goal-bids-container', {
    translateX: '-1138px'
  })

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 4000,
    easing: 'easeOutElastic(1, 1)',
    translateX: '0px'
  })

  animeTL.value.add({
    targets: '.current-amounts',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    translateX: '0px'
  })

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    translateY: '0px',
  }, '-=2000')

  animeTL.value.add({
    targets: '#bg-bar',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    translateX: `-${barWidth - bgWidth - 30}px`
  }, '-=2000')

  animeTL.value.add({
    targets: '#bg-end-bar',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    translateX: `${endWidth - 85}px`
  }, '-=2000')

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 1000,
    easing: 'easeOutElastic(1, 1)',
    opacity: '0',
    // delay: 1000 
    delay: 100000000000
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