<template>
  <div class="relative">
    <button @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" :disabled="state === 'finished'"
      @click="handleButtonClick"
      class="flex items-center justify-center w-full p-2 text-white bg-gray-900 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
      <PauseIcon v-if="state === 'running'" class="w-6 h-6" />
      <PlayIcon v-else class="w-6 h-6" />
    </button>

    <div v-if="state !== 'finished'" :class="showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'"
      class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-lg shadow-sm -top-10 left-1/2 dark:bg-gray-700">
      <span v-if="state === 'running'">Pause</span>
      <span v-else-if="state === 'paused'">Resume</span>
      <span v-else>Play</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { Timer } from '@sre-frontend-layout/types/schemas';
import { onMounted, ref } from 'vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import PauseIcon from 'vue-material-design-icons/Pause.vue';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

// State to control tooltip visibility
const showTooltip = ref(false);

// Replicants
// const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()

// Computed: Estado del timer
const state = ref<Timer['state']>('stopped');

// Función para manejar el botón de play/pausa
const handleButtonClick = async () => {
  try {
    if (state.value === 'stopped' || state.value === 'paused') {
      await nodecg.sendMessage('timerStart');
    } else if (state.value === 'running') {
      await nodecg.sendMessage('timerPause');
    }
  } catch (err) {
    console.error('Error handling button click:', err);
  }
};

onMounted(() => {
  timerReplicant.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant.value).then(() => {
    timerReplicant.value?.on('change', (newValue, oldValue) => {
      state.value = newValue.state;
    });
  });
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
