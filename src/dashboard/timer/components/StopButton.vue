<template>
  <div>
    <div v-if="!isDisabled" class="relative">
      <button :disabled="isDisabled" @click="handleButtonClick"
        class="flex items-center justify-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <CloseIcon v-if="forfeit" class="w-6 h-6" />
        <CheckIcon v-else class="w-6 h-6" />
      </button>
      <div v-if="!isDisabled"
        class="absolute px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-black rounded opacity-75 -top-8 left-1/2">
        <span v-if="forfeit">Forfeit</span>
        <span v-else>Stop</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { Timer, Team } from '@sre-frontend-layout/types/schemas';
import { ref, computed } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import CheckIcon from 'vue-material-design-icons/Check.vue';

// Props
const props = defineProps<{
  info?: Team;
  forfeit?: boolean;
}>();

// Replicants
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

// Computed: Estado del timer
const state = ref<Timer['state']>('stopped');
const teamFinishTimes = ref<Record<string, any>>({});

if (timerReplicant && timerReplicant.data) {
  state.value = timerReplicant.data.state;
  teamFinishTimes.value = timerReplicant.data.teamFinishTimes;
}

// Computed: Habilitar/Deshabilitar botón
const isDisabled = computed(() => {
  return (
    !!props.info?.id &&
    !!teamFinishTimes.value[props.info.id] ||
    !['running', 'paused'].includes(state.value)
  );
});

// Función para manejar el botón de stop
const handleButtonClick = async () => {
  try {
    await nodecg.sendMessage('timerStop', {
      id: props.info?.id,
      forfeit: props.forfeit,
    });
  } catch (err) {
    console.error('Error stopping timer:', err);
  }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>