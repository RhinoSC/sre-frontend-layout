<template>
  <div class="flex w-full h-full">
    <!-- Columna izquierda: Lista de Prizes -->
    <div class="w-1/2 p-4">
      <!-- Barra de búsqueda -->
      <h2 class="mb-4 text-xl font-bold text-white">Prizes</h2>
      <div class="flex flex-row items-center mb-4 no-wrap">
        <input v-model="searchQuery" type="text" placeholder="Buscar prize..."
          class="w-full p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-violet-500" />
        <MagnifyIcon class="absolute transform translate-x-[200px]"></MagnifyIcon>
      </div>
      <div class="overflow-y-auto max-h-96">
        <div v-for="prize in filteredPrizes" :key="prize.id" class="mb-2">
          <!-- Acordeón para cada prize -->
          <div class="p-4 bg-gray-800 rounded-md cursor-pointer" @click="toggleAccordion(prize.id)">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-white">{{ prize.name }}</h3>
              <ChevronDownIcon :class="isOpen(prize.id) ? 'rotate-180' : 'rotate-0'"
                class="w-6 h-6 text-white transition-transform" />
            </div>
          </div>
          <!-- Detalles del Prize -->
          <div v-show="isOpen(prize.id)" class="overflow-hidden transition-all duration-300 ease-in-out">
            <div class="p-4 bg-gray-700">
              <div class="space-y-2">
                <p class="text-sm text-white">Min: {{ currencyFormat(prize.min_amount) }}</p>
                <p class="text-sm text-white">Description: {{ prize.description }}</p>
                <button @click="togglePrize(prize)"
                  class="px-3 py-1 text-white bg-gray-900 rounded hover:bg-gray-800 focus:outline-none">
                  <span v-if="isPrizeActive(prize)">Hide</span>
                  <span v-else>Show</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Columna derecha: Prizes activos -->
    <div class="w-1/2 p-4">
      <h2 class="mb-4 text-xl font-bold text-white">Active Prizes</h2>
      <div v-if="activePrizes.length > 0" class="space-y-2 overflow-y-auto max-h-[435px]">
        <div v-for="prize in activePrizes" :key="prize.id"
          class="flex items-center justify-between p-4 bg-gray-800 rounded-md">
          <div class="text-white">
            <p class="text-lg font-semibold">{{ prize.name }}</p>
            <p class="text-sm">{{ currencyFormat(prize.min_amount) }}</p>
          </div>
          <button @click="removePrize(prize)"
            class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none">
            Remove
          </button>
        </div>
      </div>
      <div v-else class="text-gray-300">No prizes active on screen.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Prize } from '@sre-frontend-layout/types'
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import { useReplicant } from 'nodecg-vue-composable';
import { ref, computed, onMounted } from 'vue';
import { klona } from 'klona';
import { currencyFormat } from '@sre-frontend-layout/dashboard/_misc/helpers';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

// Replicants para prizes
const prizesReplicant = useReplicant<Prize[]>('prizes', 'sre-frontend-layout');
const activePrizesReplicant = ref<ReplicantBrowser<Prize[]>>()

// Estado para la barra de búsqueda
const searchQuery = ref<string>('');

// Computed para filtrar los prizes basado en la búsqueda
const filteredPrizes = computed(() => {
  if (prizesReplicant) {
    if (!prizesReplicant.data) return [];
    return prizesReplicant.data.filter(prize =>
      prize.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return [];
});

// Estado para manejar los premios activos
const activePrizes = ref<Prize[]>([]);

// Estado para manejar el acordeón abierto/cerrado
const openAccordionId = ref<string | null>(null);

// Función para alternar el estado del acordeón
const toggleAccordion = (prizeId: string) => {
  openAccordionId.value = openAccordionId.value === prizeId ? null : prizeId;
};

// Función para verificar si un acordeón está abierto
const isOpen = (prizeId: string) => {
  return openAccordionId.value === prizeId;
};

// Función para alternar la selección de un prize
const togglePrize = (prize: Prize) => {
  if (isPrizeActive(prize)) {
    removePrize(prize);
  } else {
    activePrizes.value.push(prize);
    if (activePrizesReplicant.value) {
      if (activePrizesReplicant.value.value) {
        activePrizesReplicant.value.value.push(prize)
      }
    }
  }
};

// Función para remover un prize de la lista de activos
const removePrize = (prize: Prize) => {
  if (activePrizesReplicant.value) {
    activePrizes.value = activePrizes.value.filter(activePrize => activePrize.id !== prize.id);
    activePrizesReplicant.value.value = activePrizes.value
  }
};

// Función para verificar si un prize está activo
const isPrizeActive = (prize: Prize) => {
  return activePrizes.value.some(activePrize => activePrize.id === prize.id);
};

// Montaje inicial
onMounted(() => {
  activePrizesReplicant.value = nodecg.Replicant<Prize[]>('activePrizes');
  NodeCG.waitForReplicants(activePrizesReplicant.value).then(() => {
    activePrizesReplicant.value?.on('change', (newValue, oldValue) => {
      console.log(newValue)
      if (newValue) {
        activePrizes.value = [];
        newValue.forEach(prize => {
          activePrizes.value.push(prize);
        });
      }
    });
  });
});
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
