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
    <div class="relative right-[40px] flex flex-row items-center w-[940px] h-[240px] gap-2 mt-[10px]">
      <div id="bar-bg" class="bar-over-bg w-[940px] h-[220px] bg-[#013938] border-[6px] border-[#4CA996]">
        <div class="w-[856px] h-[220px] bg-transparent text-start relative">
          <div id="bg-bar"
            class="absolute w-[848px] h-[189px] mt-[10px] border-t-[6px] border-b-[6px] border-[#FEF5D0] ">
          </div>
          <div id="bg-end-bar"
            class="absolute w-[106px] left-[100px] h-[189px] bg-[#F0B140] mt-[10px] border-[6px] border-[#FEF5D0]">
            <div class="relative flex flex-col justify-between h-full px-2 py-4 percentage">
              <div>
                <span class="text-2xl font-thin [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)]">{{
                  currencyFormat(props.bid.current_amount) }}</span>
                <!-- <span class="text-xl font-thin">100,00$</span> -->
              </div>
              <div>
              </div>
              <div class="w-full text-end">
                <span class="text-4xl [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)]"> {{ barPercentage }}% </span>
                <!-- <span class="text-4xl"> 100% </span> -->
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
  let percentage = props.bid.current_amount / props.bid.goal;
  console.log(percentage)

  if (percentage <= 0.1) {
    percentage = 0.2; // Un valor mínimo razonable para que siempre se vea la animación
  } else if (percentage >= 1) {
    percentage = 1; // Limitar el porcentaje máximo a 100%
  }
  // const percentage = 1;
  const endWidth = barWidth * percentage;
  const bgWidth = barWidth * percentage - 85; // Restar la anchura de #bg-end-bar

  anime.set('.goal-bids-container', {
    opacity: '1',
  })

  anime.set('.title', {
    opacity: '0',
  })

  anime.set('.goal-bids-container', {
    translateX: `-848px`,
  })

  anime.set('#bar-bg', {
    translateX: `-858px`,
    opacity: '1'
  })

  anime.set('#bg-bar', {
    translateX: `-858px`,
    opacity: '1'
  })

  anime.set('#bg-end-bar', {
    translateX: `-90px`,
    opacity: '1'
  })

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 1500,  // Reducido para que no sea tan largo
    easing: 'easeOutElastic(1, 1.2)',  // Más suave
    translateX: `-3px`
  });

  animeTL.value.add({
    targets: '.title',
    duration: 1500,  // Más corto para que se integre mejor
    easing: 'easeOutElastic(1, 1)',  // Sin cambio aquí
    opacity: `1`
  });

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 1200,  // Reducido para hacerlo más ágil
    easing: 'easeOutElastic(1, 1.5)',
    translateX: '0px',
  });

  animeTL.value.add({
    targets: '#bg-bar',
    duration: 1800,  // Reducido un poco para sincronizar mejor
    easing: 'easeOutElastic(1, 1.8)',  // Ajuste para suavidad
    translateX: `-${barWidth - bgWidth - 36}px`
  }, '-=1000');  // Solapado más corto para mayor fluidez

  animeTL.value.add({
    targets: '#bg-end-bar',
    duration: 1800,  // Sincronizado con el anterior
    easing: 'easeOutElastic(1, 1.8)',  // Ajustado para consistencia
    translateX: `${endWidth - 211}px`
  }, '-=1800');  // Solapado ajustado para alinearse con el anterior

  animeTL.value.add({
    targets: '.title',
    duration: 1500,  // Un poco más corto para evitar que se sienta lento
    easing: 'easeOutElastic(1, 1)',
    delay: 8000,  // Reducción del retraso para que no dure tanto en pantalla
    opacity: `0`
  });

  animeTL.value.add({
    targets: '#bar-bg',
    duration: 800,  // Más rápido para finalizar la animación
    easing: 'linear',
    opacity: `0`,
  }, '-=1500');  // Solapado ajustado

  animeTL.value.add({
    targets: '.goal-bids-container',
    duration: 800,  // Similar al anterior para coherencia
    easing: 'easeOutElastic(1, 1)',
    opacity: '0',
    delay: 300  // Un retraso breve para que la transición final sea natural
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

onMounted(() => {
  createAnimation()
})
</script>

<style scoped>
#bg-bar {
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

#bg-end-bar {
  /* box-shadow: inset 0 0 2px #000000; */
}
</style>