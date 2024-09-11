<template>
  <div :class="{ 'pointer-events-none opacity-50': disableChanges }">
    <TimerTime class="mt-10"/>
    <div id="Controls" class="flex justify-center pt-2">
      <StartButton />
      <ResetButton />
      <!-- Will not show if more than 1 team -->
      <!-- <template v-if="teams.length <= 1">
        <StopButton :info="teams[0]" />
        <StopButton :info="teams[0]" forfeit />
        <UndoButton :info="teams[0]" />
      </template> -->
    </div>
    <!-- Will only show if more than 1 team -->
    <!-- <div v-if="teams.length > 1" class="pt-2">
      <TeamComponent v-for="(team, index) in teams" :key="team.id" :info="team" :index="index" />
    </div> -->
    <!-- <div v-if="disableChanges || tempEnable" class="pt-2">
      <button v-if="disableChanges" @click="enableChanges"
        class="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Enable Changes
      </button>
      <button v-if="tempEnable" @click="disableChanges = true"
        class="block w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
        Disable Changes
      </button>
      <div class="mt-1">
        <em>Only use this button if needed.</em>
      </div>
    </div> -->
    <!-- Hidden toggle for testing -->
    <!--
    <input
      type="checkbox"
      v-model="disableChanges"
      class="form-checkbox"
    />
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import TimerTime from './components/TimerTime.vue';
import StartButton from './components/StartButton.vue';
import ResetButton from './components/ResetButton.vue';
import StopButton from './components/StopButton.vue';
import UndoButton from './components/UndoButton.vue';
import TeamComponent from './components/Team.vue';
import { useReplicant } from 'nodecg-vue-composable';
import type { TimerChangesDisabled, ActiveRun } from '@sre-frontend-layout/types/schemas';
import type { Team } from '@sre-frontend-layout/types';

// Replicants
const activeRunReplicant = useReplicant<ActiveRun>('runDataActiveRun', 'sre-frontend-layout');
const timerChangesDisabledReplicant = useReplicant<TimerChangesDisabled>('timerChangesDisabled', 'sre-frontend-layout');

// State
const tempEnable = ref(false);
const disableChanges = computed({
  get: () => { return timerChangesDisabledReplicant?.data || false },
  set: (val: boolean) => {
    // Assuming `storeModule.updateDisabledToggle` is available in your setup
    if (timerChangesDisabledReplicant && timerChangesDisabledReplicant.data) {
      timerChangesDisabledReplicant.data = val
      timerChangesDisabledReplicant.save()
    }
  },
});

// Computed
const teams = computed(() => activeRunReplicant?.data?.teams || []);

// Watchers
watch(disableChanges, (val) => {
  if (val) {
    tempEnable.value = false;
  }
});

if (activeRunReplicant) {
  watch(activeRunReplicant, () => {
    tempEnable.value = false;
  });
}

// Methods
const enableChanges = () => {
  disableChanges.value = false;
  tempEnable.value = true;
};
</script>

<style scoped>
/* The scoped styles have been replaced by Tailwind CSS classes */
</style>
