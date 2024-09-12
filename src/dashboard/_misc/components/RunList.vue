<template>
  <div class="w-full">
    <!-- Barra de búsqueda -->
    <div class="flex flex-row items-center mb-4 no-wrap">
      <input v-model="searchQuery" type="text" placeholder="Buscar run..."
        class="w-full p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-violet-500" />
      <MagnifyIcon class="absolute transform translate-x-[350px]"></MagnifyIcon>
    </div>

    <!-- Lista de runs -->
    <div class="w-full overflow-y-auto max-h-96" v-if="filteredRuns && filteredRuns.length" ref="runsContainer">
      <ul class="space-y-2 shadow-lg">
        <li v-for="run in filteredRuns" :key="run.id" :ref="el => runRefs[run.id] = el as HTMLElement">
          <div
            class="flex items-center justify-between px-4 py-2 text-white bg-gray-800 shadow-lg cursor-pointer rounded-t-md"
            :class="{ 'bg-teal-600': run.id === activeRunReplicant?.data?.id }" @click="toggleAccordion(run.id)">
            <h3 class="text-lg font-bold">{{ run.name }}</h3>
            <ChevronDownIcon :class="isOpen(run.id) ? 'rotate-180' : 'rotate-0'" class="transition-transform" />
          </div>

          <div v-show="isOpen(run.id)" class="overflow-hidden transition-all duration-300">
            <div class="p-4 text-white bg-gray-700 shadow-xl rounded-b-md">
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

import { ref, computed, onMounted } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { ActiveRun, RunArray } from '@sre-frontend-layout/types/schemas';
import { msToTimeStr, getRunnerString } from '../helpers';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

// Refs para almacenar las referencias de los elementos DOM de cada run
const runRefs = ref<Record<string, HTMLElement | null>>({});
const runsContainer = ref<HTMLElement | null>(null);

// const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const runArrayReplicant = ref<ReplicantBrowser<RunArray>>()
const activeRunRep1 = ref<ReplicantBrowser<ActiveRun>>()

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
const runsServer = ref<RunArray>()

const filteredRuns = computed(() => {

  if (runsServer.value) {
    if (!runsServer.value) return [];
    return runsServer.value.filter(run =>
      run.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});

onMounted(() => {
  activeRunRep1.value = nodecg.Replicant<ActiveRun>('activeRun');
  runArrayReplicant.value = nodecg.Replicant<RunArray>('runArray');

  // const list = document.getElementById("list")
  NodeCG.waitForReplicants(activeRunRep1.value,).then(() => {
    activeRunRep1.value?.on('change', (newValue, oldValue) => {
      if (newValue) {
        if (newValue.id && runRefs.value[newValue.id]) {
          const runElement = runRefs.value[newValue.id];
          runElement?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }
      }
    });

    runArrayReplicant.value?.on('change', (newValue, oldValue) => {
      if (!newValue) return [];
      runsServer.value = newValue.filter(run =>
        run.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  });
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
