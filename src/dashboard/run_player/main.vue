<template>
  <div class="p-6">
    <!-- Botones para avanzar y volver al inicio -->
    <div class="mb-4 flex space-x-2">
      <button @click="goToNextRun" class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M5 4.5a.5.5 0 00-.79-.41l-5 4a.5.5 0 000 .82l5 4a.5.5 0 00.79-.41V4.5zm9 0a.5.5 0 00-.79-.41l-5 4a.5.5 0 000 .82l5 4a.5.5 0 00.79-.41V4.5z" />
        </svg>
        Next Run
      </button>
      <button @click="reloadSchedule" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Reload Schedule
      </button>
      <button @click="goToStart" class="bg-gray-500 text-white px-4 py-2 rounded-md ml-2">
        Go to Start
      </button>
    </div>

    <!-- Nombre de la run actual -->
    <div class="bg-gray-800 text-white p-4 rounded-md mb-6">
      <h2 class="text-lg font-bold">Current Run: {{ activeRunReplicant.data?.name || 'N/A' }}</h2>
      <p>Category: {{ activeRunReplicant.data?.run_metadata.category || 'N/A' }}</p>
    </div>

    <!-- Lista de Runs -->
    <ul v-if="runArrayReplicant.data" class="space-y-4">
      <li v-for="run in runArrayReplicant.data" :key="run.id"
        class="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold">{{ run.name }}</h3>
          <p class="text-sm text-gray-500">Estimate: {{ run.estimate_string }}</p>
          <p class="text-sm text-gray-500">Category: {{ run.run_metadata.category }}</p>
        </div>
        <button @click="switchToRun(run.id)" class="bg-blue-500 text-white px-4 py-2 rounded-md">
          Switch
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { ActiveRun, ActiveRunSurroundingRuns, RunArray } from '@sre-frontend-layout/types/schemas';
import { useHead } from '@vueuse/head';

// Set the title of this page.
useHead({ title: 'run-player' });

// Replicants
const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const surroundingRunsReplicant = useReplicant<ActiveRunSurroundingRuns>('activeRunSurroundingRuns', 'sre-frontend-layout');

// Funciones
const reloadSchedule = () => {
  nodecg.sendMessage('importSchedule');
};

const switchToRun = (runId: string) => {
  nodecg.sendMessage('switchToRun', runId);
};

const goToNextRun = () => {
  if (surroundingRunsReplicant.data?.next) {
    switchToRun(surroundingRunsReplicant.data.next.id);
  }
};

const goToStart = () => {
  if (runArrayReplicant.data?.length) {
    switchToRun(runArrayReplicant.data[0].id);
  }
};
</script>

<style scoped>
/* Añade cualquier estilo adicional aquí si es necesario */
</style>
