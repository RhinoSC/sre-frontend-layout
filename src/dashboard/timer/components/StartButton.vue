<template>
  <div class="relative">
    <button :disabled="state === 'finished'" @click="handleButtonClick"
      class="flex items-center justify-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
      <PlayIcon v-if="state !== 'paused'" class="w-6 h-6" />
      <PauseIcon v-else class="w-6 h-6" />
    </button>
    <div v-if="state !== 'finished'"
      class="absolute px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-black rounded opacity-75 -top-8 left-1/2">
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

// Replicants
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

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
  if (timerReplicant && timerReplicant.data) {
    state.value = timerReplicant.data.state;
  }
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
