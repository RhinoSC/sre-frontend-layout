<template>
  <div class="relative">
    <button @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" :disabled="state === 'stopped'"
      @click="resetTimer"
      class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
      <ReloadIcon class="w-6 h-6" />
    </button>
    <div v-if="state !== 'stopped'" :class="showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'"
      class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-lg shadow-sm -top-10 left-1/2 dark:bg-gray-700">
      Reset
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { Timer } from '@sre-frontend-layout/types/schemas';
import ReloadIcon from 'vue-material-design-icons/Reload.vue';
import { onMounted, ref } from 'vue';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

// State to control tooltip visibility
const showTooltip = ref(false);

// Replicants
// const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()

// Computed: Estado del timer
const state = ref<Timer['state']>('stopped');

// Función para resetear el timer
const resetTimer = async () => {
  if (state.value !== 'stopped') {
    try {
      await nodecg.sendMessage('timerReset');
    } catch (err) {
      console.error('Error resetting timer:', err);
    }
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