<template>
  <div class="next-run-container flex flex-col items-center w-[937px] h-[886px]">
    <!-- deco 3 -->
    <div class=" w-[813px] h-[46px] flex flex-row items-center justify-end mt-6">
      <p class="text-4xl ">Ahora</p><img src="../assets/SRE-X_Layout_2._Espera_Runs-Deco_2.png" alt="">
    </div>
    <!-- now -->
    <div v-if="activeRunReplicant && activeRunReplicant.data"
      class="w-[773px] h-[192px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Ahora_1.png')] flex flex-col items-center">
      <!-- runner -->
      <div
        class="flex flex-row items-center justify-start w-full px-6 pb-2 text-[1.6em] h-1/3 text-nowrap overflow-hidden">
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
          <img src="../../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
          <p class="pt-2 mb-2 text-2xl font-bold text-center text-white"
            v-if="activeRunReplicant && activeRunReplicant.data">{{
              activeRunReplicant.data.run_metadata.category }}</p>
        </div>
        <!-- div-estimate -->
        <div class="flex flex-row items-center justify-end w-1/4 gap-2">
          <img src="../../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
          <p class="pt-2 mb-2 text-xl font-bold text-center text-white"
            v-if="activeRunReplicant && activeRunReplicant.data">{{
              activeRunReplicant.data.estimate_string }}</p>
        </div>
      </div>
    </div>
    <!-- deco 4 -->
    <div class=" w-[813px] h-[46px] flex flex-row justify-end mt-4">
      <p class="text-3xl ">En cola</p><img src="../assets/SRE-X_Layout_2._Espera_Runs-Deco_2.png" alt="">
    </div>
    <!-- later -->
    <div class="flex flex-col gap-4">
      <div v-for="run in nextRunsArray" :key="run.id"
        class="w-[781px] h-[168px] bg-[url('/src/graphics/layout-waiting/assets/SRE-X_Layout_2._Espera_Cola_1.png')] flex flex-row">
        <!-- time -->
        <div class="w-[100px] h-2/3 flex flex-col items-center justify-center px-4">
          <span class="normal-case text-1xl">en</span>
          <h1 class="text-3xl text-center">{{ getTimeDifferenceString(run.start_time_mili) }}</h1>
        </div>
        <div class="w-[681px] flex flex-col items-start h-full">
          <!-- runner -->
          <div
            class="flex flex-row items-center justify-start w-[681px] px-6 pb-2 text-[1.4em] h-1/3 text-nowrap overflow-hidden">
            {{
              getRunnerString(run) }} <span>{{ }}</span></div>
          <div
            class="flex flex-row items-center justify-start w-[681px] px-6 pb-1 text-[1.6em] h-1/3 [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)]">
            {{ run.name }}</div>
          <!-- div-run-info -->
          <div class="flex flex-row items-center justify-end w-[681px] pl-[20px] pr-6 pt-1 text-[1.6em] h-1/3">
            <!-- div-category -->
            <div class="flex flex-row items-center justify-start w-3/4 gap-2 ">
              <img src="../../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
              <p class="pt-2 mb-2 text-2xl font-bold text-center text-white">
                {{ run.run_metadata.category }}</p>
            </div>
            <!-- div-estimate -->
            <div class="flex flex-row items-center justify-end w-1/4 gap-2">
              <img src="../../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
              <p class="pt-2 mb-2 text-xl font-bold text-center text-white">
                {{ run.estimate_string }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getRunnerString, getTimeDifferenceString } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { ActiveRun, ActiveRunNextRuns, Run, RunArray } from '@sre-frontend-layout/types/schemas';
import anime, { AnimeTimelineInstance } from 'animejs';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import { useReplicant } from 'nodecg-vue-composable';
import { onMounted, ref } from 'vue';

const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const activeRunNextRunsReplicant = ref<ReplicantBrowser<ActiveRunNextRuns>>()
const runArrayReplicant = ref<ReplicantBrowser<RunArray>>()

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
      console.log(nextRunsArray.value)
    });

    createAnimation()
  });
})
</script>