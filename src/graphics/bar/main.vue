<template>
  <div v-if="props.wait">
    <div
      class="text-white w-[1920px] h-[77px] flex flex-row items-start justify-between bg-[url('/src/graphics/bar/assets/Barra_Inferior.png')]">
      <div class="ml-[120px] w-[430px] h-full flex flex-row items-center gap-2">
        <MicIcon :size="48"></MicIcon>
        <h1 class="text-3xl font-bold">
          {{ hostReplicant?.data }}
        </h1>
      </div>
      <div class="flex flex-row items-center gap-2 h-full w-[980px]">
        <MusicIcon :size="48" class="music-icon"></MusicIcon>
        <div class="overflow-hidden w-[940px]">
          <h1 ref="songText" class="text-3xl font-bold current-song whitespace-nowrap">
            {{ songReplicant?.data }}
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-[1920px] h-[77px] flex flex-row items-start bg-[url('/src/graphics/bar/bar_bg.png')]">
    <div class="w-[466px] h-[77px] flex">
      <div class="w-[360px] h-[77px]" style="clip-path: polygon(0 0, 87% 0, 100% 100%, 0% 100%);">
      </div>
      <div class="w-[106px] start-bar h-[77px] relative right-[15px]"
        style="clip-path: polygon(0 0, 57% 0, 100% 100%, 43% 100%);">
      </div>
    </div>
    <div class="relative -left-[112px] w-[1200px] h-[77px] flex items-end pl-[50px] text-white">
      <AnnounceComponent v-if="generalAnimNumber === 1" @animationEnded="animationEnd($event)" />
      <BidsComponent v-if="generalAnimNumber === 2" @animationEnded="animationEnd($event)"></BidsComponent>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import AnnounceComponent from './components/announces.vue'
import BidsComponent from './components/bids.vue'
import { useReplicant } from 'nodecg-vue-composable';
import MicIcon from 'vue-material-design-icons/Bullhorn.vue';
import MusicIcon from 'vue-material-design-icons/Music.vue';
import anime from 'animejs';
import { ReplicantBrowser } from 'nodecg-types/types/browser';

const hostReplicant = useReplicant<string>('host', 'sre-frontend-layout');
const songReplicant = useReplicant<string>('currentSong', 'sre-frontend-layout');

// Props
const props = defineProps<{
  wait?: boolean;
}>();

const bidAnimationEnded = ref(true)
const generalAnimNumber = ref(0)

function animationEnd($event: any) {
  bidAnimationEnded.value = true
  nextAnimation()
}

// Referencia al texto de la canción
const songText = ref<HTMLElement | null>(null);

function nextAnimation() {
  if (props.wait) {
    // setMusicAnimation()
    // setSocialAnimation()
  } else {
    if (bidAnimationEnded) {
      if (generalAnimNumber.value > 1) generalAnimNumber.value = 0

      if (generalAnimNumber.value === 1) {
        bidAnimationEnded.value = false
      }
      generalAnimNumber.value += 1
    }
  }
}

// Función para animar el texto
function scrollingText() {
  const textElement = songText.value;
  if (!textElement) return;

  // Obtener el ancho del contenedor y del texto
  const containerWidth = 940; // Ancho del contenedor
  const textWidth = textElement.scrollWidth;  // Ancho real del texto

  // Si el texto es más largo que el contenedor, animarlo
  if (textWidth > containerWidth) {
    anime.set('.current-song', {
      translateX: `${containerWidth}px`, // Iniciar fuera del contenedor
    });

    anime({
      targets: '.current-song',
      duration: (textWidth / containerWidth) * 20000, // Ajusta la duración según la longitud del texto
      translateX: `-${textWidth}px`,  // Moverlo hacia la izquierda hasta el final
      easing: 'linear',
      loop: true
    });
  } else {
    // Si el texto es más corto que el contenedor, no se necesita animación
    anime.set('.current-song', { translateX: '0px' });
  }
}

// Animación del icono de música
function setMusicAnimation() {
  anime.timeline({ loop: true })
    .add({
      targets: '.music-icon',
      duration: 1500,
      rotate: '0.05turn',
    })
    .add({
      targets: '.music-icon',
      duration: 1500,
      rotate: '-0.05turn',
    });

  scrollingText(); // Ejecutar la animación del texto
}


const hostReplicant1 = ref<ReplicantBrowser<string>>()
const songReplicant1 = ref<ReplicantBrowser<string>>()

onMounted(async () => {
  hostReplicant1.value = nodecg.Replicant<string>('host');
  songReplicant1.value = nodecg.Replicant<string>('currentSong');
  await nextTick();
  NodeCG.waitForReplicants(hostReplicant1.value, songReplicant1.value).then(() => {
    songReplicant1.value
    songReplicant1.value?.on('change', async (newValue, oldValue) => {
      await nextTick();
      scrollingText()
    });
    if (props.wait) {
      setMusicAnimation();
    } else {
      nextAnimation();
    }
  })
});
</script>
