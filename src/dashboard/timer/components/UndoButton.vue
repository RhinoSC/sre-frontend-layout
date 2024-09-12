<template>
  <div class="relative w-full">
    <button :disabled="isDisabled" @click="handleButtonClick" @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      class="flex items-center justify-center w-full p-2 text-white bg-gray-900 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
      <UndoIcon class="w-6 h-6" />
    </button>
    <div v-if="!isDisabled" :class="showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'"
      class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-900 rounded-lg shadow-sm -top-10 left-1/2 dark:bg-gray-700">
      Undo
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import type { Timer } from '@sre-frontend-layout/types/schemas';
import type { Team } from '@sre-frontend-layout/types';
import { useReplicant } from 'nodecg-vue-composable';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

const props = defineProps<{
  info?: Team;
}>();

// State to control tooltip visibility
const showTooltip = ref(false);

// const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()

const isDisabled = ref<boolean>(false)

const calculateIsDisable = (newVal: Timer): boolean => {
  return (
    // If no team information has been supplied.
    !props.info?.id && newVal.state !== 'finished'
  ) || (
      // If team information is supplied, need to check if the team is finished.
      !!props.info?.id && (!newVal.teamFinishTimes[props.info.id]
        || !['running', 'finished'].includes(newVal.state))
    );
}

const handleButtonClick = async () => {
  try {
    await nodecg.sendMessage('timerUndo', props.info?.id);
  } catch (err) {
    // Handle the error
    console.error('Error sending timerUndo message:', err);
  }
};

onMounted(() => {
  timerReplicant.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant.value).then(() => {
    timerReplicant.value?.on('change', (newValue, oldValue) => {
      isDisabled.value = calculateIsDisable(newValue)

    });
  });
})
</script>