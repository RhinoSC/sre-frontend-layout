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
    <div class="relative flex flex-row pt-4 w-[950px] h-[320px] gap-2">
      <div id="option-div"
        class="flex flex-col w-[950px] h-[285px] pt-[12px] gap-2 bg-[#013938] border-[6px] border-[#4CA996]">
        <template v-for="(option, index) in options" :key="index">
          <template v-if="index === 0">
            <div class="first-bar-container">
              <div class="bar-over-bg w-[745px] h-[86px] bg-[#FEF5D0]">
                <div
                  class="first-bg-bar-color w-[735px] h-[75px] bg-[#967742] text-start relative top-[6px] left-[5px]">
                  <div
                    class="first-bg-bar absolute w-[355px] text-lg h-[72px] transition-all flex items-start justify-start">
                    <p class="bg-[#013938] border-r-[5px] border-b-[5px] border-[#FEF5D0] px-4 py-2">{{ option.name }}
                    </p>
                  </div>
                  <div
                    class="ml-8 first-bg-end-bar relative w-[100px] left-[603px] bg-[#013938] transition-all flex flex-row justify-center items-center border-b-[5px] border-l-[5px] border-[#FEF5D0]">
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
              <div class="bar-over-bg w-[445px] h-[74px] bg-[#d3d3d3]">
                <div class="bg-bar-color w-[435px] h-[62px] bg-[#6B707B] text-start relative top-[6px] left-[5px]">
                  <div
                    class="bg-bar absolute w-[255px] text-lg left-[0px] h-[60px] transition-all flex items-start justify-start">
                    <p class="bg-[#013938] border-r-[5px] border-b-[5px] border-[#d3d3d3] px-4 py-2">{{ option.name }}
                    </p>
                  </div>
                  <div
                    class="ml-8 bg-end-bar relative w-[100px] left-[303px] bg-[#013938] transition-all flex flex-row justify-center items-center border-b-[5px] border-l-[5px] border-[#d3d3d3]">
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
    duration: 1200, // Reducido para hacerla más rápida y fluida
    easing: 'easeOutElastic(1, 1.2)', // Menos elástica para evitar saltos fuertes
    translateX: `-17px`
  });

  animeTL.value.add({
    targets: '.title',
    duration: 1500, // Duración ajustada para coincidir mejor con la animación del contenedor
    easing: 'easeOutQuad', // Cambio a 'easeOutQuad' para una entrada más fluida
    opacity: `1`
  });

  animeTL.value.add({
    targets: '#option-div',
    duration: 1200, // Tiempo más rápido para darle dinamismo
    easing: 'easeOutElastic(1, 1)',
    delay: anime.stagger(300), // Reducido para hacer el "stagger" más dinámico
    translateX: '15px'
  });

  animeTL.value.add({
    targets: '.first-bar-container',
    duration: 1500, // Sincronizado con la entrada del div de opciones
    easing: 'easeOutElastic(1, 1.1)', // Ligeramente menos elástico para suavizar
    delay: anime.stagger(400), // Reducido para más fluidez
    translateX: '0px'
  }, '-=1000'); // Reducimos el solapamiento para suavizar la transición

  animeTL.value.add({
    targets: '.bar-container',
    duration: 1500,
    easing: 'easeOutElastic(1, 1.3)', // Mantiene cierta elasticidad pero más moderada
    delay: anime.stagger(400), // Ajuste para consistencia con las demás animaciones
    translateX: '0px',
    endDelay: 10000
  }, '-=1200'); // Sincronización ajustada para mejor fluidez

  // Ocultar título de manera más fluida
  animeTL.value.add({
    targets: '.title',
    duration: 1000, // Disminuido para que desaparezca más rápido
    easing: 'easeInQuad', // Suaviza la salida
    opacity: `0`
  });

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 800, // Reducido para una salida más rápida
    easing: 'linear',
    opacity: `0`
  }, '-=1500'); // Reducido el solapamiento para suavizar la transición

  animeTL.value.add({
    targets: '#option-div',
    duration: 800, // Sincronizado con el background
    easing: 'linear',
    delay: 800, // Ajuste para reducir tiempos de espera
    opacity: `0`
  }, '-=1200'); // Menos superposición para fluidez

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 800, // Reducido para mayor agilidad
    easing: 'linear',
    opacity: '0',
    delay: 300, // Tiempo ajustado para hacer desaparecer todo de forma ordenada
  });

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
  for (let i = 0; i < 3; i++) {
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