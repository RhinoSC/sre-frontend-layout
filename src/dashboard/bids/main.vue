<template>
  <div class="flex w-full h-full">
    <!-- Columna izquierda: Runs y Bids -->
    <div class="w-1/2 p-4">
      <!-- Barra de búsqueda -->
      <h2 class="mb-4 text-xl font-bold text-white">Runs</h2>
      <div class="flex flex-row items-center mb-4 no-wrap">
        <input v-model="searchQuery" type="text" placeholder="Buscar run..."
          class="w-full p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-violet-500" />
        <MagnifyIcon class="absolute transform translate-x-[350px]"></MagnifyIcon>
      </div>
      <div class="overflow-y-auto max-h-96">
        <div v-for="run in filteredRuns" :key="run.id" class="mb-2">
          <!-- Acordeón para cada run -->
          <div class="p-4 bg-gray-800 rounded-md cursor-pointer" @click="toggleAccordion(run.id)">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-white">{{ run.name }}</h3>
              <ChevronDownIcon :class="isOpen(run.id) ? 'rotate-180' : 'rotate-0'"
                class="w-6 h-6 text-white transition-transform" />
            </div>
          </div>
          <!-- Lista de Bids dentro de la run -->
          <div v-show="isOpen(run.id)" class="overflow-hidden transition-all duration-300 ease-in-out">
            <div v-if="run.bids && run.bids.length > 0" class="p-4 bg-gray-700">
              <ul class="space-y-2">
                <li v-for="bid in run.bids" :key="bid.id" class="flex items-center justify-between">
                  <div class="text-sm text-white">{{ bid.bidname }}</div>
                  <button @click="toggleBid(bid)"
                    class="px-3 py-1 text-white bg-gray-900 rounded hover:bg-gray-800 focus:outline-none">
                    <span v-if="isBidActive(bid)">Hide</span>
                    <span v-else>Show</span>
                  </button>
                </li>
              </ul>
            </div>
            <div v-else class="p-4 text-gray-300 bg-gray-700">No bids available for this run.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Columna derecha: Bids activos -->
    <div class="w-1/2 p-4">
      <h2 class="mb-4 text-xl font-bold text-white">Active Bids</h2>
      <div v-if="activeBids.length > 0" class="space-y-2">
        <div v-for="bid in activeBids" :key="bid.id"
          class="flex items-center justify-between p-4 bg-gray-800 rounded-md">
          <div class="text-white">{{ bid.bidname }}</div>
          <button @click="removeBid(bid)"
            class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none">
            Remove
          </button>
        </div>
      </div>
      <div v-else class="text-gray-300">No bids active on screen.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bid, RunArray } from '@sre-frontend-layout/types/schemas';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import { useReplicant } from 'nodecg-vue-composable';
import { ref, computed, onMounted } from 'vue';
import { klona } from 'klona';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';

const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');
const bidsReplicant = ref<ReplicantBrowser<Bid[]>>()

// Estado para la barra de búsqueda
const searchQuery = ref<string>('');

// Computed para filtrar las runs basado en la búsqueda
const filteredRuns = computed(() => {
  if (runArrayReplicant) {
    if (!runArrayReplicant.data) return [];
    return runArrayReplicant.data.filter(run =>
      run.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});

// Mock data for runs and bids
const runs = ref([
  {
    id: '1',
    name: 'Run 1',
    bids: [
      { id: 'bid1', name: 'Bid 1' },
      { id: 'bid2', name: 'Bid 2' }
    ]
  },
  {
    id: '2',
    name: 'Run 2',
    bids: []
  },
  {
    id: '3',
    name: 'Run 3',
    bids: [
      { id: 'bid3', name: 'Bid 3' },
      { id: 'bid4', name: 'Bid 4' }
    ]
  }
]);

// State to handle accordion open/close
const openAccordionId = ref<string | null>(null);

// State for active bids to be shown on screen
const activeBids = ref<Bid[]>([]);

// Function to toggle accordion state
const toggleAccordion = (runId: string) => {
  openAccordionId.value = openAccordionId.value === runId ? null : runId;
};

// Function to check if a run accordion is open
const isOpen = (runId: string) => {
  return openAccordionId.value === runId;
};

// Function to toggle bid selection
const toggleBid = (bid: Bid) => {
  if (isBidActive(bid)) {
    removeBid(bid);
  } else {
    activeBids.value.push(bid);
    console.log("hola")
    // bidsReplicant.value?.value?.push({ bidname: "gola" } as Bid)
  }
};

// Function to remove bid from active list
const removeBid = (bid: Bid) => {
  if (bidsReplicant.value) {
    activeBids.value = activeBids.value.filter(activeBid => activeBid.id !== bid.id);
    bidsReplicant.value.value = activeBids.value
  }
  // if (bidsReplicant.value) {
  //   bidsReplicant.value.value = bidsReplicant.value.value?.filter(activeBid => activeBid.id !== bid.id);
  // }
};

// Function to check if a bid is active
const isBidActive = (bid: Bid) => {
  console.log(activeBids.value.some(activeBid => activeBid.id === bid.id))
  return activeBids.value.some(activeBid => activeBid.id === bid.id);
};

onMounted(() => {
  bidsReplicant.value = nodecg.Replicant<Bid[]>('bids');

  NodeCG.waitForReplicants(bidsReplicant.value).then(() => {
    bidsReplicant.value?.on('change', (newValue, oldValue) => {
      console.log("cambie")
      if (newValue) {
        activeBids.value = []
        newValue.forEach(bid => {
          activeBids.value.push(bid)
        })
      }
    });
  });
})

</script>

<style scoped>
/* Add transition for accordion opening */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
