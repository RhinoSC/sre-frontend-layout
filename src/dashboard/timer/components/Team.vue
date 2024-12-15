<template>
  <div class="flex flex-row items-center px-2 py-1">
    <div class="flex flex-row gap-2">
      <StopButton class="w-1/6 grow" :info="info" />
      <StopButton class="w-1/6 grow" :info="info" forfeit />
      <UndoButton class="w-1/6 grow" :info="info" />
    </div>
    <div class="flex flex-col ml-2">
      <!-- Mostrar nombre del equipo si existe -->
      <span v-if="info.players.length === 1" class="text-lg">{{ info.players[0].name }}</span>
      <!-- Mostrar nombre del jugador si solo hay 1 jugador en el equipo -->
      <span v-else-if="info.name" class="text-lg font-semibold">{{ info.name }}</span>
      <!-- Mostrar todos los nombres de los jugadores si no hay nombre de equipo -->
      <span v-else>
        <span v-for="(player, i) in info.players" :key="player.id">
          {{ player.name }}<span v-if="i + 1 < info.players.length">, </span>
        </span>
      </span>
      <!-- Mostrar el tiempo de finalización o 'forfeit' si está completo -->
      <span v-if="finishTime && state === 'completed'" class="text-green-600">[{{ finishTime }}]</span>
      <span v-else-if="finishTime && state === 'forfeit'" class="text-red-600">[Forfeit]</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { Timer, Team } from '@sre-frontend-layout/types/schemas';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import StopButton from './StopButton.vue';
import UndoButton from './UndoButton.vue';

// Props
const props = defineProps<{
  info: Team;
  index?: number;
}>();

// Replicants
// const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');
const timerReplicant = ref<ReplicantBrowser<Timer>>()

// Estado del equipo en base al replicante 'timer'
const state = ref<"forfeit" | "completed">();

const finishTime = ref<string>()

onMounted(() => {
  timerReplicant.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant.value).then(() => {
    timerReplicant.value?.on('change', (newValue, oldValue) => {
      if (newValue.teamFinishTimes[props.info.id]) {
        state.value = newValue.teamFinishTimes[props.info.id].state;
        finishTime.value = newValue.teamFinishTimes[props.info.id].time
      }
    });
  });
})
</script>

<style scoped>
.Team>*:not(:last-child) {
  margin-right: 4px;
}

.Team>>>.v-btn {
  padding: 0 5px;
  min-width: 0;
}
</style>
