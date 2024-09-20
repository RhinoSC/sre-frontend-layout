<template>

  <div
    class="goal-bids-container w-[940px] h-[380px] text-[.5em] flex flex-col flex-nowrap items-start text-center overflow-hidden">
    <!-- bids-title -->
    <div
      class=" relative right-[50px] pl-[40px] w-[866px] h-[75px] flex flex-row bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2_Espera_BidGoal_1.png')]">
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
    <div class="relative flex flex-row pt-4 w-[940px] h-[300px] gap-2">
      <div id="option-div"
        class="flex flex-col w-[940px] h-[220px] pt-[12px] gap-2 bg-[#013938] border-[6px] border-[#4CA996]">
        <template v-for="(option, index) in options" :key="index">
          <template v-if="index === 0">
            <div class="first-bar-container">
              <div class="bar-over-bg w-[745px] bg-[#FEF5D0] h-[86px]">
                <div
                  class="first-bg-bar-color w-[735px] h-[75px] bg-[#967742] text-start pl-8 relative top-[6px] left-[5px]">
                  <div
                    class="first-bg-bar absolute w-[320px] text-lg left-[0px] h-[72px] transition-all flex items-start justify-start">
                    <p class="bg-[#013938] border-r-[5px] border-b-[5px] border-[#FEF5D0] px-4 py-2">{{ option.name }}
                    </p>
                  </div>
                  <div
                    class="first-bg-end-bar relative w-[100px] left-[603px] bg-[#013938] transition-all flex flex-row justify-center items-center border-b-[5px] border-l-[5px] border-[#FEF5D0]">
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
              <div class="bar-over-bg w-[445px] h-[86px] bg-[#d3d3d3]">
                <div class="w-[435px] h-[75px] bg-bar-color text-start pl-8 relative top-[6px] left-[5px]">
                  <div
                    class="bg-bar absolute w-[320px] text-lg left-[0px] h-[72px] transition-all flex items-start justify-start">
                    <p class="bg-[#013938] border-r-[5px] border-b-[5px] border-[#d3d3d3] px-4 py-2">{{ option.name }}
                    </p>
                  </div>
                  <div
                    class="bg-end-bar relative w-[100px] left-[303px] bg-[#013938] transition-all flex flex-row justify-center items-center border-b-[5px] border-l-[5px] border-[#d3d3d3]">
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

  anime.set('#option-div', {
    opacity: '1',
    translateX: `-848px`
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

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1.5)',
    translateX: `-3px`
  })

  animeTL.value.add({
    targets: '.title',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    opacity: `1`
  })

  animeTL.value.add({
    targets: '#option-div',
    duration: 1500,
    easing: 'easeOutElastic(1, 1)',
    delay: anime.stagger(500),
    translateX: '0px'
  });

  animeTL.value.add({
    targets: '.first-bar-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1)',
    delay: anime.stagger(500),
    translateX: '0px'
  }, '-=1400');

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
    targets: '#option-div',
    duration: 1000,
    easing: 'linear',
    delay: 1000,
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

watch(() => props.bid, async (newVal) => {
  animeTL.value.pause()
  animeTL.value = {} as AnimeTimelineInstance
  options.value = []
  for (let i = 0; i < 2; i++) {
    options.value.push(newVal.bid_options[i])
  }
  await nextTick()
  createAnimation()
});

onMounted(async () => {
  for (let i = 0; i < 2; i++) {
    options.value.push(props.bid.bid_options[i])
  }
  await nextTick()
  createAnimation()
})
</script>

<style scoped>
.first-bg-bar-color {
  background: linear-gradient(to right, #967742, #967742), repeating-linear-gradient(90deg,
      /* Ángulo de las líneas diagonales */
      #F0B140,
      /* Color de la primera línea */
      #F0B140 50px,
      /* Ancho de la primera línea */
      #F0D080 50px,
      /* Color del espacio entre las líneas */
      #F0D080 100px
      /* Ancho total del patrón */
    );
  background-blend-mode: hue;
  box-shadow: inset 0 0 10px #000000;
}

.bg-bar-color {
  background: linear-gradient(to right, #6B707B, #6B707B), repeating-linear-gradient(90deg,
      /* Ángulo de las líneas diagonales */
      #B0B0B0,
      /* Color de la primera línea */
      #B0B0B0 50px,
      /* Ancho de la primera línea */
      #6B707B 50px,
      /* Color del espacio entre las líneas */
      #6B707B 100px
      /* Ancho total del patrón */
    );
  background-blend-mode: hue;
  box-shadow: inset 0 0 10px #000000;
}
</style>