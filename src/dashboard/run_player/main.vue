<template>
  <div class="flex flex-col w-full gap-2">
    <!-- Botones para avanzar y volver al inicio -->
    <div class="flex flex-col gap-2 mb-4 font-bold">
      <div class="flex flex-row w-full gap-2">
        <button @click="reloadScheduleConfirm"
          class="flex flex-row items-center gap-2 px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-800">
          <ReloadIcon></ReloadIcon> Refresh Schedule
        </button>
        <button @click="returnToStartConfirm"
          class="flex flex-row items-center justify-center gap-2 px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-800 grow">
          <HomeIcon></HomeIcon>
          Go to Start
        </button>
      </div>
      <button @click="goToNextRun"
        class="flex items-center px-4 py-2 font-bold text-white bg-gray-900 rounded hover:bg-gray-800 grow">
        <PlayIcon class="mr-2"></PlayIcon>
        {{ nextRunStr() }}
      </button>
      <div v-if="disableChange" class="flex flex-row items-center justify-center h-5 pt-2">
        <p class="font-bold text-red-500">You cannot change run while timer is running.</p>
      </div>
    </div>

    <!-- Nombre de la run actual -->
    <div class="p-4 mb-6 text-white bg-gray-800 rounded-md" v-if="activeRunReplicant && activeRunReplicant.data">
      <h2 class="text-lg font-bold">Current Run: {{ activeRunReplicant.data.name || 'N/A' }}</h2>
      <p>Category: {{ activeRunReplicant.data.run_metadata.category || 'N/A' }}</p>
      <p class="text-sm text-gray-300">Estimate: {{ msToTimeStr(activeRunReplicant.data.estimate_mili) || 'N/A' }}</p>
      <p class="text-sm text-gray-300">Players: {{ getRunnerString(activeRunReplicant.data) || 'N/A' }}</p>
    </div>

    <!-- Lista de Runs -->
    <RunList></RunList>
  </div>
</template>

<script setup lang="ts">
import HomeIcon from 'vue-material-design-icons/Home.vue';
import ReloadIcon from 'vue-material-design-icons/Reload.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import { useReplicant } from 'nodecg-vue-composable';
import { ActiveRun, ActiveRunSurroundingRuns, RunArray } from '@sre-frontend-layout/types/schemas';
import { useHead } from '@vueuse/head';
import RunList from '../_misc/components/RunList.vue';
import { msToTimeStr, getRunnerString, checkDialog, getDialog } from '../_misc/helpers';
import { computed, onMounted, ref } from 'vue';
import { Alert, Timer } from '@sre-frontend-layout/types';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

// Set the title of this page.
useHead({ title: 'run-player' });

// Replicants
const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const surroundingRunsReplicant = useReplicant<ActiveRunSurroundingRuns>('activeRunSurroundingRuns', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()


const disableChange = ref<boolean>(false)
// Funciones

const reloadScheduleConfirm = () => {
  checkDialog('alert_dialog').then(() => {
    const dialog = getDialog('alert_dialog') as Alert.Dialog;
    if (dialog) {
      dialog.openDialog({
        name: 'RefreshScheduleConfirm',
        func: reloadSchedule,
      });
    }
  });
}
const reloadSchedule = (confirm: boolean) => {
  if (!confirm) return
  nodecg.sendMessage('importSchedule', (error, data: any) => {
    console.log(error)
  });
};

const nextRun = computed(() => {
  if (runArrayReplicant && runArrayReplicant.data) {
    if (surroundingRunsReplicant) {
      return runArrayReplicant.data.find((run) => run.id === surroundingRunsReplicant.data?.next);
    }
  }
})

function nextRunStr(): string {
  if (nextRun.value) {
    const arr = [
      nextRun.value.name || "?",
      nextRun.value.run_metadata.category
    ].filter(Boolean);
    return arr.join(" - ");
  }
  return "?";
}

const goToNextRun = async () => {
  if (surroundingRunsReplicant) {
    if (surroundingRunsReplicant.data?.next) {
      // switchToRun(surroundingRunsReplicant.data.next);
      await nodecg.sendMessage('changeToNextRun');
    }
  }
};

const returnToStartConfirm = () => {
  checkDialog('alert_dialog').then(() => {
    const dialog = getDialog('alert_dialog') as Alert.Dialog;
    if (dialog) {
      dialog.openDialog({
        name: 'ReturnToStartConfirm',
        func: goToStart,
      });
    }
  });
}

const goToStart = async (confirm: boolean) => {
  if (!confirm) return
  if (runArrayReplicant) {
    if (runArrayReplicant.data?.length) {
      await nodecg.sendMessage('returnToStart');
    }
  }
};

onMounted(() => {
  timerReplicant.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant.value).then(() => {
    timerReplicant.value?.on('change', (newValue, oldValue) => {
      disableChange.value = ['running', 'paused'].includes(newValue.state);
    });
  });
})
</script>

<style scoped>
/* Añade cualquier estilo adicional aquí si es necesario */
</style>
