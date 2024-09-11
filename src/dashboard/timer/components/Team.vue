<template>
  <div class="flex items-center p-2">
    <stop-button :info="info" />
    <stop-button :info="info" forfeit />
    <undo-button :info="info" />
    <div class="flex flex-col ml-2">
      <!-- Mostrar nombre del equipo si existe -->
      <span v-if="info.name" class="text-lg font-semibold">{{ info.name }}</span>
      <!-- Mostrar nombre del jugador si solo hay 1 jugador en el equipo -->
      <span v-else-if="info.players.length === 1" class="text-lg">{{ info.players[0].name }}</span>
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
import { ref, computed } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { Timer, Team } from '@sre-frontend-layout/types/schemas';

// Props
const props = defineProps<{
  info: Team;
  index?: number;
}>();

// Replicants
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

// Estado del equipo en base al replicante 'timer'
const state = computed(() => {
  if (timerReplicant?.data?.teamFinishTimes?.[props.info.id]) {
    return timerReplicant.data.teamFinishTimes[props.info.id].state;
  }
  return undefined;
});

// Tiempo de finalización del equipo
const finishTime = computed(() => {
  if (timerReplicant?.data?.teamFinishTimes?.[props.info.id]) {
    return timerReplicant.data.teamFinishTimes[props.info.id].time;
  }
  return undefined;
});
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
