<template>
  <div class="w-full overflow-y-auto max-h-96" v-if="runArrayReplicant">
    <ul class="space-y-2">
      <li v-for="run in runArrayReplicant.data" :key="run.id">
        <div class="flex items-center justify-between p-4 text-white bg-gray-800 rounded-md shadow-md cursor-pointer"
          @click="toggleAccordion(run.id)">
          <h3 class="text-lg font-bold">{{ run.name }}</h3>
          <ChevronDownIcon :class="isOpen(run.id) ? 'rotate-180' : 'rotate-0'" />
        </div>

        <div v-show="isOpen(run.id)" class="overflow-hidden transition-all duration-300">
          <div class="p-4 text-white bg-gray-700 rounded-md shadow-md">
            <p class="text-sm text-gray-300">Estimate: {{ msToTimeStr(run.estimate_mili) }}</p>
            <p class="text-sm text-gray-300">Category: {{ run.run_metadata.category }}</p>
            <p class="text-sm text-gray-300">Twitch Game: {{ run.run_metadata.twitch_game_name }}</p>
            <p class="text-sm text-gray-300">Players: {{ getRunnerString(run) }}</p>
            <button @click="switchToRun(run.id)"
              class="flex items-center px-2 py-1 mt-2 text-white bg-gray-800 rounded-md hover:bg-gray-600">
              <PlayIcon class="" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';

import { ref } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { RunArray } from '@sre-frontend-layout/types/schemas';
import { msToTimeStr, getRunnerString } from '../helpers';

const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');

// Estado para rastrear el acordeón actualmente abierto
const openAccordionId = ref<string | null>(null);

const toggleAccordion = (runId: string) => {
  openAccordionId.value = openAccordionId.value === runId ? null : runId;
};

const isOpen = (runId: string) => {
  return openAccordionId.value === runId;
};

const switchToRun = (runId: string) => {
  nodecg.sendMessage('switchToRun', runId);
};
</script>

<style scoped></style>
