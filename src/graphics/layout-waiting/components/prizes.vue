<template>
  <div class="w-full h-[400px] mt-[20px] flex flex-row">
    <div class="w-[425px] h-[400px]">
      <!-- deco 2 -->
      <div class="w-[415px] h-[46px] flex flex-row justify-end">
        <img src="../assets/SRE-X_Layout_2._Espera_Price-Deco_1.png" alt="">
      </div>
      <template v-if="prizesArray.length === 1">
        <!-- prize-info -->
        <div
          class="relative right-[10px] w-[402px] h-[188px] flex flex-col bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Price_1.png')]">
          <div class="">
            <div v-if="ready && selectedPrize"
              class="flex flex-col pl-[40px] w-[402px] h-[188px] justify-center pr-[20px]">
              <h1 class="text-3xl">{{ selectedPrize?.name }}</h1>
              <p class="text-xl text-[#FAE386]"><span>Donacion mínima:</span> {{
                currencyFormat(selectedPrize.min_amount)
              }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- prize-info -->
        <div
          class="relative right-[10px] w-[402px] h-[188px] flex flex-col bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Price_1.png')]">
          <div class="prize">
            <div v-if="ready && selectedPrize"
              class="flex flex-col pl-[40px] w-[402px] h-[188px] justify-center pr-[20px]">
              <h1 class="text-3xl">{{ selectedPrize?.name }}</h1>
              <p class="text-xl text-[#FAE386]"><span>Donacion mínima:</span> {{
                currencyFormat(selectedPrize.min_amount)
              }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <template v-if="prizesArray.length === 1">
      <div>
        <div v-if="ready && selectedPrize"
          class="relative w-[512px] h-[380px] mt-[10px] flex flex-row items-center justify-center">
          <img :src="selectedPrize.url" alt="" class="w-[512px] h-[380px] object-contain">
        </div>
      </div>
    </template>
    <template v-else>
      <div class="prize">
        <div v-if="ready && selectedPrize"
          class="relative w-[512px] h-[380px] mt-[10px] flex flex-row items-center justify-center">
          <img :src="selectedPrize.url" alt="" class="w-[512px] h-[380px] object-contain">
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { currencyFormat } from '@sre-frontend-layout/dashboard/_misc/helpers';
import { Prize } from '@sre-frontend-layout/types';
import anime, { AnimeTimelineInstance } from 'animejs';
import { ref, nextTick, onMounted } from 'vue';
import { klona } from 'klona';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

const ready = ref(false);
const prizesReplicant = ref<ReplicantBrowser<Prize[]>>();
const prizesArray = ref<Prize[]>([]);
const selectedPrize = ref<Prize>();
const prizeIndex = ref(0);

function changePrize() {
  if (!prizesArray.value.length) return;

  // Si hay solo un premio, no cambiará
  if (prizesArray.value.length === 1) {
    selectedPrize.value = klona(prizesArray.value[0]);
  } else {
    // Cambia de premio normalmente si hay más de uno
    if (prizeIndex.value >= prizesArray.value.length) prizeIndex.value = 0;
    selectedPrize.value = klona(prizesArray.value[prizeIndex.value]);
    prizeIndex.value += 1;
  }
}

let animeTL = ref<AnimeTimelineInstance | null>(null);

async function createAnimation() {
  await nextTick();

  // Si hay solo un item, no ejecutar la animación
  if (prizesArray.value.length === 1) return;

  animeTL.value = anime.timeline({
    loop: false, // Sin bucle en la animación individual, lo haremos manualmente
    complete: () => {
      changePrize();
      if (prizesArray.value.length > 1) {
        animeTL.value?.restart(); // Reinicia la animación después de cambiar el premio
      }
    }
  });

  animeTL.value
    .add({
      targets: '.prize',
      opacity: [0, 1],
      easing: 'easeOutElastic(1, 1)',
      duration: 2000,
      delay: 500,
    })
    .add({
      targets: '.prize',
      opacity: [1, 0],
      easing: 'easeInElastic(1, 1)',
      duration: 2000,
      delay: 1000,
    });
}

onMounted(async () => {
  prizesReplicant.value = nodecg.Replicant<Prize[]>('activePrizes');

  NodeCG.waitForReplicants(prizesReplicant.value).then(async () => {
    prizesReplicant.value?.on('change', (newValue, oldValue) => {
      prizesArray.value = [...newValue];
      if (oldValue && oldValue.length > 1 && newValue.length === 1) {
        animeTL.value?.pause();
        animeTL.value = null;
      }

      // Si no hay premios, salir
      if (newValue.length === 0) return;

      prizeIndex.value = 0;
      ready.value = true;
      changePrize();

      // Pausar y eliminar la animación actual si existe
      if (animeTL.value) {
        animeTL.value.pause();
        animeTL.value = null;
      }

      // Solo crear la animación si hay más de un premio
      if (newValue.length > 1) {
        createAnimation();
      }
    });
  });
});
</script>
