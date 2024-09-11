<template>
  <div class="relative">
    <button :disabled="isDisabled" @click="handleButtonClick"
      class="flex items-center justify-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
      <UndoIcon class="w-6 h-6" />
    </button>
    <div v-if="!isDisabled"
      class="absolute px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-black rounded opacity-75 -top-8 left-1/2">
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import type { Timer } from '@sre-frontend-layout/types/schemas';
import type { Team } from '@sre-frontend-layout/types';
import { useReplicant } from 'nodecg-vue-composable';

const props = defineProps<{
  info?: Team;
}>();

const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

const isDisabled = computed(() => {
  if (timerReplicant && timerReplicant.data) {
    return (
      // If no team information has been supplied.
      !props.info?.id && timerReplicant.data.state !== 'finished'
    ) || (
        // If team information is supplied, need to check if the team is finished.
        !!props.info?.id && (!timerReplicant.data.teamFinishTimes[props.info.id]
          || !['running', 'finished'].includes(timerReplicant.data.state))
      );
  }
});

const handleButtonClick = async () => {
  try {
    await nodecg.sendMessage('timerUndo', props.info?.id);
  } catch (err) {
    // Handle the error
    console.error('Error sending timerUndo message:', err);
  }
};
</script>