<template>
  <div class="flex flex-col items-center justify-center gap-2 text-white">
    <div class="flex flex-col items-center justify-center gap-2 py-2 text-white bg-gray-800 rounded-md w-96">
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-lg font-bold">🎶Now playing:🎶</h1>
        <h2 class="text-sm font-bold">{{ songReplicant?.data }}</h2>
      </div>
      <div class="flex flex-row items-center justify-between gap-2">
        <button @click="play" class="px-2 py-1 bg-gray-900 rounded hover:bg-gray-800">
          <PlayIcon></PlayIcon>
        </button>
        <button @click="pause" class="px-2 py-1 bg-gray-900 rounded hover:bg-gray-800">
          <PauseIcon></PauseIcon>
        </button>
        <button @click="next" class="px-2 py-1 bg-gray-900 rounded hover:bg-gray-800">
          <ForwardIcon></ForwardIcon>
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-2 py-2 text-white bg-gray-800 rounded-md w-96">
      <div class="flex flex-row items-center gap-2 mb-4">
        <h1 class="text-lg font-bold">Host: </h1>
        <input v-model="host" type="text" placeholder="Host name"
          class="w-full p-2 text-white bg-gray-900 rounded-md focus:outline-none focus:ring focus:ring-violet-500" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlayIcon from 'vue-material-design-icons/Play.vue';
import PauseIcon from 'vue-material-design-icons/Pause.vue';
import ForwardIcon from 'vue-material-design-icons/Forward.vue';
import { useReplicant } from 'nodecg-vue-composable';
import { onMounted, ref } from 'vue';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import { watch } from 'vue';

const songReplicant = useReplicant<string>('currentSong', 'sre-frontend-layout');
const hostReplicant = ref<ReplicantBrowser<string>>()

const host = ref("")

function play() {
  nodecg.sendMessage('playVideo');
}

function pause() {
  nodecg.sendMessage('pauseVideo');
}

function next() {
  nodecg.sendMessage('nextVideo');
}

watch(host, (newVal) => {
  if (hostReplicant.value) {
    hostReplicant.value.value = newVal
  }
})

onMounted(() => {
  hostReplicant.value = nodecg.Replicant<string>('host');

  NodeCG.waitForReplicants(hostReplicant.value,).then(() => {
    hostReplicant.value?.on('change', (newValue, oldValue) => {
      if (!newValue) {
        host.value = ""
      }

      host.value = newValue
    });
  })
})
</script>