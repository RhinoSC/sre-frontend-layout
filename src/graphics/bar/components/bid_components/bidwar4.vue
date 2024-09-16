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
    <div id="option-div" class="flex flex-row items-center w-full h-[38px] gap-2 pl-3">
      <template v-for="(option, index) in options" :key="index">
        <div class="bar-container">
          <div class="bar-over-bg w-[265px] h-[38px] bg-[#00FFFF]"
            style="clip-path: polygon(0px 0px, 97.38% 1px, 100% 95%, 1.86% 95.00%);">
            <div class="w-[255px] h-[34px] bg-[#0E8D9B] text-start pl-8 relative top-[2px] left-[4px]"
              style="clip-path: polygon(1px 1px, 97.54% 2px, 99.58% 89.12%, 2.10% 89.12%);">
              <div class="bg-bar absolute w-[255px] bg-[#49226B] h-[38px] transition-all">
              </div>
              <div class="bg-end-bar relative w-[110px] left-[120px] bg-[#D1559E] transition-all"
                style="clip-path: polygon(24px 0px, 87.62% 1px, 92.73% 82.5%, 26.66% 82.5%);">
                <h3 class="pl-[38px] percentage relative bottom-[4px]">{{ currencyFormat(option.current_amount) }}</h3>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { currencyFormat, getRunBidName } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { Bid, BidOption } from '@sre-frontend-layout/types';
import anime, { AnimeTimelineInstance } from 'animejs';
import { onMounted, ref, watch } from 'vue';

// Props
const props = defineProps<{
  bid: Bid;
}>();

const emit = defineEmits(['animationEnd'])

const barWidth = 856;

let animeTL = ref(anime.timeline());

const options = ref<BidOption[]>([])

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

  anime.set('.bar-over-bg', {
    opacity: `0`
  })

  anime.set('#bg-bar', {
    translateX: `-${barWidth - bgWidth}px`
  })

  anime.set('#bg-end-bar', {
    translateX: `${endWidth - 118}px`
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

  // animeTL.value.add({
  //   targets: '#option-div',
  //   duration: 2000,
  //   easing: 'easeOutElastic(1, 1)',
  //   // delay: anime.stagger(500),
  //   translateY: ['60px', '0px']
  // })

  animeTL.value.add({
    targets: '.bar-container .bar-over-bg',
    duration: 1000,
    easing: 'easeOutElastic(1, 1)',
    opacity: '0',
    // delay: 1000 
    delay: 100000
  })

  // animeTL.value.finished.then(() => {
  //   emit('animationEnd')
  // })
}

watch(() => props.bid, (newVal) => {
  animeTL.value.pause()
  animeTL.value = {} as AnimeTimelineInstance
  createAnimation()
});

onMounted(() => {
  // console.log(props.bid)
  for (let i = 0; i < 4; i++) {
    options.value.push(props.bid.bid_options[i])
  }
  createAnimation()
})
</script>