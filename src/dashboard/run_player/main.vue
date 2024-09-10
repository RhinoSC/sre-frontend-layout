<template>
  <div class="flex flex-col w-full gap-2">
    <!-- Botones para avanzar y volver al inicio -->
    <div class="flex flex-col gap-2 mb-4">
      <div class="flex flex-row w-full gap-2">
        <button @click="reloadSchedule" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 shrink-0">
          <ReloadIcon></ReloadIcon>
        </button>
        <button @click="goToStart" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 grow">
          Go to Start
        </button>
      </div>
      <button @click="goToNextRun"
        class="flex items-center px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 grow">
        <PlayIcon class="mr-2"></PlayIcon>
        {{ nextRunStr() }}
      </button>
    </div>

    <!-- Nombre de la run actual -->
    <div class="p-4 mb-6 text-white bg-gray-800 rounded-md" v-if="activeRunReplicant && activeRunReplicant.data">
      <h2 class="text-lg font-bold">Current Run: {{ activeRunReplicant.data.name || 'N/A' }}</h2>
      <p>Category: {{ activeRunReplicant.data.run_metadata.category || 'N/A' }}</p>
      <p class="text-sm text-gray-300">Estimate: {{ msToTimeStr(activeRunReplicant.data.estimate_mili) || 'N/A' }}</p>
      <p class="text-sm text-gray-300">Players: {{ getRunnerString(activeRunReplicant.data) || 'N/A' }}</p>
    </div>

    <!-- Lista de Runs -->
    <RunList></RunList>
  </div>
</template>

<script setup lang="ts">
import ReloadIcon from 'vue-material-design-icons/Reload.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import { useReplicant } from 'nodecg-vue-composable';
import { ActiveRun, ActiveRunSurroundingRuns, RunArray } from '@sre-frontend-layout/types/schemas';
import { useHead } from '@vueuse/head';
import RunList from '../_misc/components/RunList.vue';
import { msToTimeStr, getRunnerString } from '../_misc/helpers';
import { computed } from 'vue';

// Set the title of this page.
useHead({ title: 'run-player' });

// Replicants
const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const surroundingRunsReplicant = useReplicant<ActiveRunSurroundingRuns>('activeRunSurroundingRuns', 'sre-frontend-layout');

// Funciones
const reloadSchedule = () => {
  nodecg.sendMessage('importSchedule', (error, data: any) => {
    console.log(data)
  });
};

const nextRun = computed(() => {
  if (runArrayReplicant && runArrayReplicant.data) {
    if (surroundingRunsReplicant) {
      return runArrayReplicant.data.find((run) => run.id === surroundingRunsReplicant.data?.next);
    }
  }
})

function nextRunStr(): string {
  if (nextRun.value) {
    const arr = [
      nextRun.value.name || "?",
      nextRun.value.run_metadata.category
    ].filter(Boolean);
    return arr.join(" - ");
  }
  return "?";
}

const switchToRun = (runId: string) => {
  nodecg.sendMessage('switchToRun', runId);
};


const goToNextRun = async () => {
  if (surroundingRunsReplicant) {
    if (surroundingRunsReplicant.data?.next) {
      // switchToRun(surroundingRunsReplicant.data.next);
      await nodecg.sendMessage('changeToNextRun');
    }
  }
};

const goToStart = async () => {
  if (runArrayReplicant) {
    if (runArrayReplicant.data?.length) {
      // switchToRun(runArrayReplicant.data[0].id);
      await nodecg.sendMessage('returnToStart');
    }
  }
};
</script>

<style scoped>
/* Añade cualquier estilo adicional aquí si es necesario */
</style>
