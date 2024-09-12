<template>
  <div class="w-full">
    <div @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" class="relative">
      <button :disabled="isDisabled" @click="handleButtonClick"
        class="flex items-center justify-center w-full p-2 text-white bg-gray-900 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <CloseIcon v-if="forfeit" class="w-6 h-6" />
        <CheckIcon v-else class="w-6 h-6" />
      </button>
      <div v-if="!isDisabled" :class="showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'"
        class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-lg shadow-sm -top-10 left-1/2 dark:bg-gray-700">
        <span v-if="forfeit">Forfeit</span>
        <span v-else>Stop</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable';
import { Timer, Team } from '@sre-frontend-layout/types/schemas';
import { ref, computed, onMounted } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import CheckIcon from 'vue-material-design-icons/Check.vue';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

// Props
const props = defineProps<{
  info?: Team;
  forfeit?: boolean;
}>();

// State to control tooltip visibility
const showTooltip = ref(false);

// Replicants
// const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()

// Computed: Estado del timer
const state = ref<Timer['state']>('stopped');
const teamFinishTimes = ref<Record<string, any>>({});

// Computed: Habilitar/Deshabilitar botón
const isDisabled = ref<boolean>(false)

const calculateIsDisable = (newVal: Timer): boolean => {
  return (
    !!props.info?.id &&
    !!teamFinishTimes.value[props.info.id] ||
    !['running', 'paused'].includes(newVal.state)
  );
}

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

onMounted(() => {
  timerReplicant.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant.value).then(() => {
    timerReplicant.value?.on('change', (newValue, oldValue) => {
      state.value = newValue.state;
      teamFinishTimes.value = newValue.teamFinishTimes;
      isDisabled.value = calculateIsDisable(newValue)
    });
  });
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>