<template>

  <div
    class="goal-bids-container w-[950px] h-[380px] text-[.5em] flex flex-col flex-nowrap items-start text-center overflow-hidden">
    <!-- bids-title -->
    <div
      class=" relative right-[50px] pl-[40px] w-[916px] h-[78px] flex flex-row bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2_Espera_BidGoal_1.png')] bg-cover">
      <div class="title w-full pl-[50px] flex flex-col justify-start font-bold py-2">
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
    <div class="relative flex flex-row pt-4 w-[950px] h-[300px] gap-2">
      <div id="option-div"
        class="flex flex-col w-[950px] h-[220px] pt-[12px] gap-2 bg-[#013938] border-[6px] border-[#4CA996]">
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
  animeTL: AnimeTimelineInstance;
}>();

const emit = defineEmits(['animationEnd'])

const options = ref<BidOption[]>([])

function createAnimation() {

  // props.animeTL = anime.timeline();
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

  props.animeTL.add({
    targets: '.goal-bids-container',
    duration: 1500, // Reducido para mayor dinamismo
    easing: 'easeOutElastic(1, 1.2)', // Ajuste de elasticidad para suavizar
    translateX: `-17px`
  });

  props.animeTL.add({
    targets: '.title',
    duration: 1200, // Disminuido para que aparezca más rápido y con fluidez
    easing: 'easeOutQuad', // Usamos easeOutQuad para una transición más suave
    opacity: `1`
  });

  props.animeTL.add({
    targets: '#option-div',
    duration: 1200, // Tiempo reducido para que aparezca de forma más rápida
    easing: 'easeOutElastic(1, 1)',
    delay: anime.stagger(300), // Stagger más ágil para mayor fluidez
    translateX: '15px'
  });

  props.animeTL.add({
    targets: '.first-bar-container',
    duration: 1500, // Duración coherente con los elementos anteriores
    easing: 'easeOutElastic(1, 1.1)', // Elasticidad más moderada
    delay: anime.stagger(300), // Sincronización más rápida
    translateX: '0px'
  }, '-=1000'); // Ajuste del solapamiento para más suavidad

  props.animeTL.add({
    targets: '.bar-container',
    duration: 1500, // Sincronizado con los demás contenedores
    easing: 'easeOutElastic(1, 1.3)', // Mantiene cierta elasticidad
    delay: anime.stagger(300),
    translateX: '0px',
    endDelay: 10000
  }, '-=1200'); // Ajustado para un flujo continuo

  props.animeTL.add({
    targets: '.title',
    duration: 1200, // Desvanecimiento más rápido para mayor dinamismo
    easing: 'easeInQuad', // Suaviza la salida con easeInQuad
    opacity: `0`
  });

  props.animeTL.add({
    targets: '#option-div',
    duration: 800, // Tiempo reducido para salida más rápida
    easing: 'linear',
    delay: 800, // Menos retraso para hacer la animación más ágil
    opacity: `0`
  }, '-=1000'); // Ajustado el solapamiento para evitar transiciones bruscas

  props.animeTL.add({
    targets: '.goal-bids-container',
    duration: 800, // Tiempo reducido para desaparecer rápidamente
    easing: 'linear',
    opacity: '0',
    delay: 300 // Menos retraso para hacer desaparecer todo de manera ordenada
  });


  props.animeTL.finished.then(() => {
    emit('animationEnd')
  })
}

// watch(() => props.bid, async (newVal) => {
//   props.animeTL.pause()
//   props.animeTL = {} as AnimeTimelineInstance
//   options.value = []
//   for (let i = 0; i < 2; i++) {
//     options.value.push(newVal.bid_options[i])
//   }
//   await nextTick()
//   createAnimation()
// });

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