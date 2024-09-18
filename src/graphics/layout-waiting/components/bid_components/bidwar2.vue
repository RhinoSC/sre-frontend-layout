<template>

  <div
    class="goal-bids-container pl-[40px] w-full h-[380px] text-[.5em] flex flex-col flex-nowrap items-start text-center overflow-hidden">
    <!-- bids-title -->
    <div
      class=" relative right-[50px] w-[866px] h-[75px] flex flex-row bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2_Espera_BidGoal_1.png')]">
      <div class="title w-full pl-[40px] flex flex-col justify-start font-bold py-2">
        <div class="flex flex-row items-center justify-between pr-7 h-1/2">
          <p class="text-2xl">{{ getRunBidName(props.bid) }}</p>
          <!-- <div class="text-4xl italic font-thin goal">
            <span class="relative top-[12px]">meta: {{ currencyFormat(props.bid.goal) }}</span>
          </div> -->
        </div>
        <div class="flex flex-row justify-start italic font-thin h-1/2">
          <p>{{ props.bid.bidname }}</p>
        </div>
      </div>
    </div>
    <!-- bids-info -->
    <div class="relative flex flex-row pt-4 w-full h-[300px] gap-2">
      <div id="option-div" class="flex flex-col w-full h-[38px] gap-2">
        <template v-for="(option, index) in options" :key="index">
          <template v-if="index === 0">
            <div class="first-bar-container">
              <div class="bar-over-bg w-[745px] h-[86px] bg-[#F0B140]">
                <div class="w-[735px] h-[75px] bg-[#967742] text-start pl-8 relative top-[6px] left-[5px]">
                  <div
                    class="first-bg-bar absolute w-[255px] text-lg left-[0px]  h-[72px] transition-all pl-4 flex items-center">
                    {{ option.name }}
                  </div>
                  <div
                    class="first-bg-end-bar relative w-[100px] left-[603px] bg-[#38063A] transition-all flex flex-row justify-center items-center border-b-[5px] border-l-[5px] border-[#F0B140]">
                    <h3 class="relative percentage">{{
                      currencyFormat(option.current_amount) }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="bar-container">
              <div class="bar-over-bg w-[445px] h-[86px] bg-[#B0B0B0]">
                <div class="w-[435px] h-[75px] bg-[#6B707B] text-start pl-8 relative top-[6px] left-[5px]">
                  <div
                    class="bg-bar absolute w-[255px] text-lg left-[0px]  h-[72px] transition-all pl-4 flex items-center">
                    {{ option.name }}
                  </div>
                  <div
                    class="bg-end-bar relative w-[100px] left-[303px] bg-[#38063A] transition-all flex flex-row justify-center items-center border-b-[5px] border-l-[5px] border-[#B0B0B0]">
                    <h3 class="relative percentage">{{
                      currencyFormat(option.current_amount) }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { currencyFormat, getRunBidName } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { Bid, BidOption } from '@sre-frontend-layout/types';
import anime, { AnimeTimelineInstance } from 'animejs';
import { nextTick, onMounted, ref, watch } from 'vue';

// Props
const props = defineProps<{
  bid: Bid;
}>();

const emit = defineEmits(['animationEnd'])

let animeTL = ref(anime.timeline());

const options = ref<BidOption[]>([])

function createAnimation() {

  animeTL.value = anime.timeline();
  // Calcular el porcentaje para animar
  // const percentage = props.bid.current_amount / props.bid.goal;

  anime.set('.goal-bids-container', {
    opacity: '1',
  })

  anime.set('.title', {
    opacity: '0',
  })

  anime.set('.goal-bids-container', {
    translateX: `-848px`
  })


  anime.set('.first-bar-container', {
    translateX: `-785px`
  })
  anime.set('.bar-container', {
    translateX: `-485px`
  })

  // anime.set('.first-bg-bar', {
  //   translateX: `-${barWidth - bgWidth}px`
  // })

  // anime.set('.bg-bar', {
  //   translateX: `-${barWidth - bgWidth}px`
  // })

  // anime.set('.first-bg-end-bar', {
  //   translateX: `${endWidth - 118}px`
  // })

  // anime.set('.bg-end-bar', {
  //   translateX: `${endWidth - 118}px`
  // })


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
    targets: '.first-bar-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    delay: anime.stagger(500),
    translateX: '0px'
  });

  animeTL.value.add({
    targets: '.bar-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1.3)',
    delay: anime.stagger(500),
    translateX: '0px'
  }, '-=1500');

  animeTL.value.add({
    targets: '.title',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    opacity: `0`
  })

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 1000,
    easing: 'linear',
    opacity: `0`
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

onMounted(async () => {
  // console.log(props.bid)
  for (let i = 0; i < 2; i++) {
    options.value.push(props.bid.bid_options[i])
  }
  await nextTick()
  createAnimation()
})
</script>