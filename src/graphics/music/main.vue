<template>
  <div>
    <!-- <iframe id="player1" width="560" height="315"
      src="https://www.youtube.com/embed/-5rAjOjTGtc?controls=1&autoplay=1&enablejsapi=1&loop=1&origin=http://speedrunespanol.com"
      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; encrypted-media;"></iframe> -->
    <div id="player1"></div>
    <div class="flex flex-row gap-2 text-white">
      <button @click="playVideo()" class="px-2 py-1 bg-gray-900 rounded hover:bg-gray-800">Play</button>
      <button @click="pauseVideo()" class="px-2 py-1 bg-gray-900 rounded hover:bg-gray-800">Pause</button>
      <button @click="nextVideo()" class="px-2 py-1 bg-gray-900 rounded hover:bg-gray-800">Next</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ReplicantBrowser } from "nodecg-types/types/browser";
import { onMounted, ref } from "vue";
import { loadScript } from "vue-plugin-load-script";

const currentSongReplicant = ref<ReplicantBrowser<string>>()

const player = ref()

function playVideo() {
  player.value.playVideo();
}

function pauseVideo() {
  player.value.pauseVideo();
}

function nextVideo() {
  player.value.nextVideo();
}

function onPlayerReady(event: any) {

  setTimeout(() => {
    player.value.setLoop(true)
    player.value.setShuffle(true);
    player.value.nextVideo();
  }, 1000);
}

function onPlayerStateChange(event: { data: number; }) {
  if (event.data == (window as Window as Youtube).YT.PlayerState.PLAYING) {
    if (currentSongReplicant.value) {
      currentSongReplicant.value.value = player.value.getVideoData().title
      console.log(player.value.getVideoData().title);
    }
  }

  if (event.data == (window as Window as Youtube).YT.PlayerState.ENDED) {
  }
}

onMounted(() => {
  const element = document.querySelector('#player1')
  loadScript("https://youtube.com/iframe_api")
    .then(() => {
      (window as Window as Youtube).onYouTubeIframeAPIReady = () => {
        player.value = new (window as Window as Youtube).YT.Player(element, {
          height: '390',
          width: '640',
          playerVars: {
            'playsinline': 1,
            'autoplay': 1,
            'loop': 1,
            'controls': 1,
            'listType': 'playlist',
            'list': 'PLUyl25MblkN7qNHs-Ef1vH_QaPNrFvzUR',
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    })
    .catch(() => {
      // Failed to fetch script
    });


  currentSongReplicant.value = nodecg.Replicant<string>('currentSong');

  NodeCG.waitForReplicants(currentSongReplicant.value).then(() => {

    nodecg.listenFor('playVideo', () => {
      playVideo();
    })

    nodecg.listenFor('pauseVideo', () => {
      pauseVideo();
    })

    nodecg.listenFor('nextVideo', () => {
      nextVideo();
    })
  });

})
</script>