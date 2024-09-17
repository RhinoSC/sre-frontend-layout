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
    <div id="option-div" class="flex flex-row items-center w-full h-[38px] gap-2 pl-[14px]">
      <template v-for="(option, index) in options" :key="index">
        <div class="bar-container">
          <div class="bar-over-bg w-[535px] h-[38px] bg-[#00FFFF]"
            style="clip-path: polygon(0px 0px, 95.88% 0px, 100% 95%, 3.92% 95%);">
            <div class="w-[533px] h-[36px] bg-[#0E8D9B] text-start pl-8 relative top-[1px] left-[1px]"
              style="clip-path: polygon(5px 2px, 95.50% 2px, 99.06% 89.44%, 4.3% 89.44%);">
              <div class="bg-bar absolute w-[255px] text-lg left-[0px]  h-[38px] transition-all pl-6 flex items-center">
                {{ option.name }}
              </div>
              <div class="bg-end-bar relative w-[140px] left-[361px] bg-[#D1559E] transition-all"
                style="clip-path: polygon(25px 1px, 83.33% 1px, 97.73% 82.5%, 30.95% 82.50%);">
                <h3 class="pl-[53px] percentage relative bottom-[2px]">{{
                  currencyFormat(option.current_amount) }}
                </h3>
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
import { nextTick, onMounted, ref, watch } from 'vue';

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


  anime.set('.bar-container', {
    translateY: `40px`
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

  animeTL.value.add({
    targets: '.bar-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1.5)',
    delay: anime.stagger(500),
    translateY: ['40px', '0px']
  });

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 1000,
    easing: 'easeOutElastic(1, 1)',
    opacity: '0',
    delay: 10000000
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