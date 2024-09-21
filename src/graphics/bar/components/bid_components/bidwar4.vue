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
          <div class="bar-over-bg w-[345px] h-[38px] bg-[#00FFFF]"
            style="clip-path: polygon(0px 0px, 93.85% 0px, 100% 95%, 5.66% 95%);">
            <div class="w-[335px] h-[34px] bg-[#0E8D9B] text-start pl-8 relative top-[2px] left-[4px]"
              style="clip-path: polygon(2px 1px, 94.9% 1px, 99.96% 92.38%, 5.2% 92.38%);">
              <div class="bg-bar absolute w-[255px] text-lg left-[0px]  h-[38px] transition-all pl-4 flex items-center">
                {{ option.name }}
              </div>
              <div class="bg-end-bar relative w-[130px] left-[181px] bg-[#D1559E] transition-all"
                style="clip-path: polygon(22px 0px, 81.47% 0px, 94.27% 80%, 28.2% 80%);">
                <h3 class="pl-[48px] percentage relative bottom-[4px]">{{
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
  animeTL: AnimeTimelineInstance;
}>();

const emit = defineEmits(['animationEnd'])

const barWidth = 856;

// let animeTL = ref(anime.timeline());

const options = ref<BidOption[]>([])

function createAnimation() {

  // props.animeTL = anime.timeline();
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

  props.animeTL.add({
    targets: '.goal-bids-container',
    duration: 4000,
    easing: 'easeOutElastic(1, 1)',
    translateX: '0px'
  })

  props.animeTL.add({
    targets: '.bar-container',
    duration: 2000,
    easing: 'easeOutElastic(1, 1.5)',
    delay: anime.stagger(500),
    translateY: ['40px', '0px']
  });

  props.animeTL.add({
    targets: '.goal-bids-container',
    duration: 1000,
    easing: 'easeOutElastic(1, 1)',
    opacity: '0',
    delay: 5000
  })

  props.animeTL.add({
    targets: '.start-bar',
    duration: 50,  // Parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [1, 0],  // Primer parpadeo a 100% de opacidad
    filter: ['brightness(2)', 'brightness(0)'],  // Aumento de brillo más notorio
  }).add({
    targets: '.start-bar',
    duration: 100,  // Duración corta para el siguiente parpadeo
    easing: 'easeInOutSine',
    opacity: [0, 1],  // Vuelve a apagarse rápidamente
    filter: ['brightness(0.5)', 'brightness(2)'],  // Baja el brillo bruscamente
  }).add({
    targets: '.start-bar',
    duration: 100,  // Otro parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [1, 0],  // Parpadeo nuevamente a encendido
    filter: ['brightness(2.5)', 'brightness(0.5)'],  // Aumento más extremo en el brillo
  }).add({
    targets: '.start-bar',
    duration: 50,  // Último parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [0.5, 1],  // Reducción leve de opacidad
    filter: ['brightness(1)', 'brightness(2.5)'],  // Ajuste a brillo normal
  }).add({
    targets: '.start-bar',
    duration: 2000,  // Cambio más suave al estado final
    easing: 'easeOutElastic(1, 0.5)',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',  // El color final cuando el "foco" está encendido
    opacity: 1,  // Asegura que esté completamente visible
    filter: 'brightness(1)',  // Brillo normalizado
  });

  props.animeTL.finished.then(() => {
    emit('animationEnd')
  })
}

// watch(() => props.bid, (newVal) => {
//   props.animeTL.pause()
//   props.animeTL = {} as AnimeTimelineInstance
//   createAnimation()
// });

onMounted(async () => {
  // console.log(props.bid)
  for (let i = 0; i < 3; i++) {
    options.value.push(props.bid.bid_options[i])
  }
  await nextTick()
  createAnimation()
})
</script>