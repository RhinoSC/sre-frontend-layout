<template>
  <div class="w-full">
    <!-- Barra de búsqueda -->
    <div class="flex flex-row items-center mb-4 no-wrap">
      <input v-model="searchQuery" type="text" placeholder="Buscar run..."
        class="w-full p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-violet-500" />
      <MagnifyIcon class="absolute transform translate-x-[350px]"></MagnifyIcon>
    </div>
    <div class="w-full overflow-y-auto max-h-96" v-if="filteredRuns && filteredRuns.length">
      <ul class="space-y-2">
        <li v-for="run in filteredRuns" :key="run.id">
          <div
            class="flex items-center justify-between px-4 py-2 text-white bg-gray-800 shadow-md cursor-pointer rounded-t-md"
            @click="toggleAccordion(run.id)">
            <h3 class="text-lg font-bold">{{ run.name }}</h3>
            <ChevronDownIcon :class="isOpen(run.id) ? 'rotate-180' : 'rotate-0'" />
          </div>

          <div v-show="isOpen(run.id)" class="overflow-hidden transition-all duration-300">
            <div class="p-4 text-white bg-gray-700 shadow-md rounded-b-md">
              <p class="text-sm text-gray-300">Estimate: {{ msToTimeStr(run.estimate_mili) }}</p>
              <p class="text-sm text-gray-300">Category: {{ run.run_metadata.category }}</p>
              <p class="text-sm text-gray-300">Twitch Game: {{ run.run_metadata.twitch_game_name }}</p>
              <p class="text-sm text-gray-300">Players: {{ getRunnerString(run) }}</p>
              <button @click="switchToRun(run.id)"
                class="flex items-center px-2 py-1 mt-2 text-white bg-gray-900 rounded hover:bg-gray-800">
                <PlayIcon />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Mensaje si no hay resultados -->
    <div v-else class="text-gray-400">
      No se encontraron runs.
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

import { ref, computed } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { RunArray } from '@sre-frontend-layout/types/schemas';
import { msToTimeStr, getRunnerString } from '../helpers';

const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');

// Estado para rastrear el acordeón actualmente abierto
const openAccordionId = ref<string | null>(null);

// Estado para la barra de búsqueda
const searchQuery = ref<string>('');

// Función para alternar el acordeón
const toggleAccordion = (runId: string) => {
  openAccordionId.value = openAccordionId.value === runId ? null : runId;
};

// Función para verificar si un acordeón está abierto
const isOpen = (runId: string) => {
  return openAccordionId.value === runId;
};

// Función para cambiar a una run seleccionada
const switchToRun = (runId: string) => {
  nodecg.sendMessage('changeActiveRun', runId);
};

// Computed para filtrar las runs basado en la búsqueda
const filteredRuns = computed(() => {
  if (runArrayReplicant) {
    if (!runArrayReplicant.data) return [];
    return runArrayReplicant.data.filter(run =>
      run.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});
</script>

<style scoped></style>
