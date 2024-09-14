<template>
  <div class="flex flex-col items-center justify-center gap-2 text-white">
    <div class="flex flex-col items-center justify-center gap-2">
      <h1 class="text-lg font-bold">🎶Now playing:🎶</h1>
      <h2 class="font-bold text-md">{{ songReplicant?.data }}</h2>
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
</template>

<script lang="ts" setup>
import PlayIcon from 'vue-material-design-icons/Play.vue';
import PauseIcon from 'vue-material-design-icons/Pause.vue';
import ForwardIcon from 'vue-material-design-icons/Forward.vue';
import { useReplicant } from 'nodecg-vue-composable';
import { onMounted } from 'vue';

const songReplicant = useReplicant<string>('currentSong', 'sre-frontend-layout');

function play() {
  nodecg.sendMessage('playVideo');
}

function pause() {
  nodecg.sendMessage('pauseVideo');
}

function next() {
  nodecg.sendMessage('nextVideo');
}

onMounted(() => {

})
</script>