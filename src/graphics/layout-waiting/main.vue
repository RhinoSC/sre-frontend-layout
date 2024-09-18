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
          <!-- bids title -->
          <div
            class="relative right-[10px] w-[866px] h-[75px] flex flex-row justify-center bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2_Espera_BidGoal_1.png')]">
          </div>
          <!-- bids -->
          <div class="w-[855px] h-[335px]">

          </div>
          <!-- prizes -->
          <div>
            <!-- deco 2 -->
            <div class=" w-[415px] h-[46px] flex flex-row justify-end">
              <img src="./assets/SRE-X_Layout_2._Espera_Price-Deco_1.png" alt="">
            </div>
            <!-- prize-info -->
            <div
              class="relative right-[10px] w-[402px] h-[188px] flex flex-col bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Price_1.png')]">

            </div>
          </div>
        </div>
        <!-- up next -->
        <div
          class="w-[937px] h-[886px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_3.Juego_Game_waiting_1.png')] ">
          <div class="next-run-container flex flex-col items-center w-[937px] h-[886px]">
            <!-- deco 3 -->
            <div class=" w-[813px] h-[46px] flex flex-row items-center justify-end mt-6">
              <p class="text-4xl ">Ahora</p><img src="./assets/SRE-X_Layout_2._Espera_Runs-Deco_2.png" alt="">
            </div>
            <!-- now -->
            <div v-if="activeRunReplicant && activeRunReplicant.data"
              class="w-[773px] h-[192px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Ahora_1.png')] flex flex-col items-center">
              <!-- runner -->
              <div class="flex flex-row items-center justify-start w-full px-6 pb-2 text-[1.8em] h-1/3">
                {{
                  getRunnerString(activeRunReplicant.data) }} <span>{{ }}</span></div>
              <div
                class="flex flex-row items-center justify-start w-full px-6 pb-2 text-[1.8em] h-1/3 [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)]">
                {{
                  activeRunReplicant.data.name }}</div>
              <!-- div-run-info -->
              <div class="flex flex-row items-center justify-center w-full px-6 text-[1.8em] h-1/3">
                <!-- div-category -->
                <div class="flex flex-row items-center justify-start w-3/4 gap-2 ">
                  <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
                  <p class="pt-2 mb-2 text-2xl font-bold text-center text-white"
                    v-if="activeRunReplicant && activeRunReplicant.data">{{
                      activeRunReplicant.data.run_metadata.category }}</p>
                </div>
                <!-- div-estimate -->
                <div class="flex flex-row items-center justify-end w-1/4 gap-2">
                  <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
                  <p class="pt-2 mb-2 text-xl font-bold text-center text-white"
                    v-if="activeRunReplicant && activeRunReplicant.data">{{
                      activeRunReplicant.data.estimate_string }}</p>
                </div>
              </div>
            </div>
            <!-- deco 4 -->
            <div class=" w-[813px] h-[46px] flex flex-row justify-end mt-4">
              <p class="text-3xl ">En cola</p><img src="./assets/SRE-X_Layout_2._Espera_Runs-Deco_2.png" alt="">
            </div>
            <!-- later -->
            <div class="flex flex-col gap-4">
              <div v-for="run in nextRunsArray" :key="run.id"
                class="w-[781px] h-[168px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Cola_1.png')] flex flex-col items-center">
                <!-- runner -->
                <div class="flex flex-row items-center justify-start w-[581px] px-6 pb-2 text-[1.6em] h-1/3">
                  {{
                    getRunnerString(run) }} <span>{{ }}</span></div>
                <div
                  class="flex flex-row items-center justify-start w-[581px] px-6 pb-1 text-[1.6em] h-1/3 [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)]">
                  {{ run.name }}</div>
                <!-- div-run-info -->
                <div class="flex flex-row items-center justify-end w-[781px] pl-[120px] pr-6 pt-1 text-[1.6em] h-1/3">
                  <!-- div-category -->
                  <div class="flex flex-row items-center justify-start w-3/4 gap-2 ">
                    <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
                    <p class="pt-2 mb-2 text-2xl font-bold text-center text-white">
                      {{ run.run_metadata.category }}</p>
                  </div>
                  <!-- div-estimate -->
                  <div class="flex flex-row items-center justify-end w-1/4 gap-2">
                    <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
                    <p class="pt-2 mb-2 text-xl font-bold text-center text-white">
                      {{ run.estimate_string }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- bot bar -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { currencyFormat, getRunnerString } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { ActiveRun, ActiveRunNextRuns, Run, RunArray } from '@sre-frontend-layout/types/schemas';
import anime, { AnimeTimelineInstance } from 'animejs';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import { useReplicant } from 'nodecg-vue-composable';
import { onMounted, ref } from 'vue';

const totalDonatedReplicant = useReplicant<number>('totalDonated', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
// const activeRunNextRunsReplicant = useReplicant<ActiveRunNextRuns>('activeRunNextRuns', 'sre-frontend-layout');
// const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');
const activeRunNextRunsReplicant = ref<ReplicantBrowser<ActiveRunNextRuns>>()
const runArrayReplicant = ref<ReplicantBrowser<RunArray>>()

const array = [1, 2, 3]
const nextRunsArray = ref<Run[]>([])

let animeTL: AnimeTimelineInstance = anime.timeline()

function createAnimation() {
  anime.set('.next-run-container', {
    opacity: 0,
    translateY: 150
  })

  animeTL.add({
    targets: '.next-run-container',
    duration: 4000,
    translateY: 0,
    easing: 'easeOutElastic(.5, .9)',
    delay: anime.stagger(400)
  })

  animeTL.add({
    targets: '.next-run-container',
    duration: 1500,
    opacity: 1,
    easing: 'linear',
  }, '0')
}

onMounted(() => {
  activeRunNextRunsReplicant.value = nodecg.Replicant<ActiveRunNextRuns>('activeRunNextRuns');
  runArrayReplicant.value = nodecg.Replicant<RunArray>('runArray');

  NodeCG.waitForReplicants(activeRunNextRunsReplicant.value, runArrayReplicant.value).then(() => {
    activeRunNextRunsReplicant.value?.on('change', (newValue, oldValue) => {
      anime.set('.next-run-container', {
        opacity: 0,
      })
      nextRunsArray.value = []
      for (let i = 0; i < newValue.length; i++) {
        const run = newValue[i]
        if (runArrayReplicant.value) {
          const runFinded: Run | undefined = runArrayReplicant.value.value?.find(rn => rn.id === run)
          if (runFinded && runFinded.id !== activeRunReplicant?.data?.id)
            nextRunsArray.value.push(runFinded)
        }
      }

      animeTL.restart()
    });

    createAnimation()
  });
})
</script>