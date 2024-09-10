<template>
  <div class="flex flex-col gap-2 w-full">
    <!-- Botones para avanzar y volver al inicio -->
    <div class="mb-4 flex flex-col gap-2">
      <div class="flex flex-row gap-2">
        <button @click="reloadSchedule" class="bg-blue-500 text-white px-4 py-2 rounded-md shrink-0">
          Reload Schedule
        </button>
        <button @click="goToNextRun" class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center grow">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M5 4.5a.5.5 0 00-.79-.41l-5 4a.5.5 0 000 .82l5 4a.5.5 0 00.79-.41V4.5zm9 0a.5.5 0 00-.79-.41l-5 4a.5.5 0 000 .82l5 4a.5.5 0 00.79-.41V4.5z" />
          </svg>
          Next Run
        </button>
      </div>
      <button @click="goToStart" class="bg-gray-500 text-white px-4 py-2 rounded-md">
        Go to Start
      </button>
    </div>

    <!-- Nombre de la run actual -->
    <div class="bg-gray-800 text-white p-4 rounded-md mb-6" v-if="activeRunReplicant">
      <h2 class="text-lg font-bold">Current Run: {{ activeRunReplicant.data?.name || 'N/A' }}</h2>
      <p>Category: {{ activeRunReplicant.data?.run_metadata.category || 'N/A' }}</p>
    </div>

    <!-- Lista de Runs -->
    <RunList></RunList>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { ActiveRun, ActiveRunSurroundingRuns, RunArray } from '@sre-frontend-layout/types/schemas';
import { useHead } from '@vueuse/head';
import RunList from '../_misc/components/RunList.vue';

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



const goToNextRun = () => {
  if (surroundingRunsReplicant) {
    if (surroundingRunsReplicant.data?.next) {
      // switchToRun(surroundingRunsReplicant.data.next);
    }
  }
};

const goToStart = () => {
  if (runArrayReplicant) {
    if (runArrayReplicant.data?.length) {
      // switchToRun(runArrayReplicant.data[0].id);
    }
  }
};
</script>

<style scoped>
/* Añade cualquier estilo adicional aquí si es necesario */
</style>
