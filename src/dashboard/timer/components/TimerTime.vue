<template>
  <div class="relative w-full group">
    <!-- Tooltip activator -->
    <input v-model="time" type="text"
      class="w-full p-2 text-xl text-center bg-gray-800 border border-gray-300 rounded-md shadow-sm text-white-smoke focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      :class="bgColour" :readonly="disableEditing" @blur="abandonEdit" @keyup.enter="finishEdit" />
    <!-- Tooltip -->
    <div
      class="absolute p-2 mb-2 text-xs text-white transition-opacity transform -translate-x-1/2 bg-gray-700 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100"
      v-if="!disableEditing">
      Click to edit, Enter to save
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { Timer } from '@sre-frontend-layout/types/schemas';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

// Replicants
// const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()

// Data
const time = ref('00:00:00');

// Computed properties
const serverTime = ref<string>("")
if (timerReplicant && timerReplicant.value) {
  timerReplicant.value.time || '00:00:00'
}

const bgColour = computed(() => {
  if (timerReplicant && timerReplicant.value)
    switch (timerReplicant.value.state) {
      case 'running':
        return '';
      case 'finished':
        return '#388E3C';
      case 'stopped':
      case 'paused':
      default:
        return '#455A64';
    }
});

const disableEditing = computed(() => {
  if (timerReplicant && timerReplicant.value)
    return ['running', 'finished'].includes(timerReplicant.value.state || '');
});

// Watchers
watch(serverTime, (newVal) => {
  time.value = newVal;
}, { immediate: true });

// Methods
const finishEdit = async (event: Event) => {
  if (time.value.match(/^(\d+:)?(?:\d{1}|\d{2}):\d{2}$/)) {
    try {
      await nodecg.sendMessage('timerEdit', time.value);
    } catch (err) {
      // catch error
    }
    (event.target as HTMLTextAreaElement).blur();
  }
};

const abandonEdit = () => {
  time.value = serverTime.value as any;
};

onMounted(() => {
  timerReplicant.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant.value).then(() => {
    timerReplicant.value?.on('change', (newValue, oldValue) => {
      serverTime.value = newValue.time
    });
  });
})
</script>

<style scoped>
.TimerInput>>>input {
  text-align: center;
  font-size: 25px;
}
</style>
