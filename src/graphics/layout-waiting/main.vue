<template>
  <div
    class="text-white capitalize relative w-[1920px] h-[1004px] flex flex-col justify-center bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Background.png')] bg-cover bg-center">
    <div
      class="w-[1920px] h-[100px] absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[url('/src/graphics/layout-waiting/assets/Barra_Superior.png')] after:bg-cover after:bg-center">
    </div>
    <!-- Pseudo-elemento before para la segunda imagen con el efecto -->
    <div
      class="w-[1920px] h-[1004px] absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_SoftLight_Raya_tele.png')] before:bg-cover before:bg-center before:opacity-20">
    </div>
    <div
      class="z-20 w-[1920px] h-[904px] top-[100px] absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2.Espera_Frame_1.png')] after:bg-cover after:bg-center">
    </div>
    <div class="relative z-10 w-[1920px] h-[1004px] flex flex-col">
      <!-- top bar -->
      <div class="relative w-full h-[100px] flex flex-row items-center justify-between px-8">
        <img src="./assets/SRE-X_color_1.png" alt="">
        <!-- <div></div> -->
        <div class="flex flex-row items-center justify-end gap-4"
          v-if="totalDonatedReplicant && totalDonatedReplicant.data">
          <h1 class=" text-7xl [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)]">{{ currencyFormat(totalDonatedReplicant?.data)
            }}</h1>
          <img src="./assets/save-one-ong-color_1.png" alt="">
        </div>
      </div>
      <!-- main -->
      <div class="pl-[10px] flex flex-row gap-[12px]">
        <!-- bids/prizes -->
        <div
          class="relative flex flex-col w-[937px] h-[886px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_3.Juego_NormalBackground_waiting_1.png')]">
          <!-- deco -->
          <div class=" w-full h-[46px] flex flex-row justify-center mt-12">
            <img src="./assets/Deco.png" alt="">
          </div>
          <!-- bids -->
          <div>
            <BidsComponent></BidsComponent>
          </div>
          <!-- prizes -->
          <div>
            <PrizesComponent></PrizesComponent>
          </div>
        </div>
        <!-- up next -->
        <div
          class="w-[937px] h-[886px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_3.Juego_Game_waiting_1.png')] ">
          <RunsComponent></RunsComponent>
        </div>
      </div>
      <!-- bot bar -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import PrizesComponent from './components/prizes.vue'
import RunsComponent from './components/runs.vue'
import BidsComponent from './components/bids.vue'
import { currencyFormat } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { useReplicant } from 'nodecg-vue-composable';
import { onMounted } from 'vue';

const totalDonatedReplicant = useReplicant<number>('totalDonated', 'sre-frontend-layout');


onMounted(() => {
  // activeRunNextRunsReplicant.value = nodecg.Replicant<ActiveRunNextRuns>('activeRunNextRuns');

  // NodeCG.waitForReplicants(activeRunNextRunsReplicant.value, runArrayReplicant.value).then(() => {
  //   activeRunNextRunsReplicant.value?.on('change', (newValue, oldValue) => {
  //   });
  // });
})
</script>