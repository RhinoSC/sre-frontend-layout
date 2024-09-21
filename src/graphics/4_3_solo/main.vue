<template>
  <div
    class="relative w-[1920px] h-[1004px] flex flex-col justify-center bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Background.png')] bg-cover bg-center">
    <!-- Pseudo-elemento before para la segunda imagen con el efecto -->
    <div
      class="w-[1920px] h-[1004px] absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_SoftLight_Raya_tele.png')] before:bg-cover before:bg-center before:opacity-20">
    </div>
    <div
      class="z-20 w-[1920px] h-[1004px] absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_4-3-Frame.png')] after:bg-cover after:bg-center">
    </div>
    <!-- Aquí va tu contenido encima de los fondos -->
    <div class="relative z-10 w-[1920px] h-[1004px]">
      <!-- div-game -->
      <div
        class="absolute left-[586px] w-[1323px] h-[994px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_NormalBackground_1.png')]">
      </div>
      <!-- div-cam -->
      <div
        class="absolute top-[210px] left-[0px] w-[586px] h-[277px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_NormalBackground_4.png')]">

      </div>
      <!-- div-coms -->
      <div
        class="absolute top-[486px] left-[0px] w-[586px] h-[514px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_NormalBackground_3_4_3.png')]">
        <!-- div-runner -->
        <div
          class="absolute top-[4px] left-[20px] w-[570px] h-[64px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_4-3-Runner_1.png')]">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <div class="absolute flex flex-row items-center justify-center w-full h-full mb-1 flex-nowrap"
              v-if="activeRunReplicant && activeRunReplicant.data">
              <p class="username absolute pb-1 text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                {{ activeRunReplicant.data.teams[0].players[0].username }}</p>
              <div class="absolute flex flex-row items-center justify-center w-full h-full mt-0 twitch flex-nowrap">
                <TwitchIcon fillColor="#FFFFFF"></TwitchIcon>
                <p class="text-2xl font-bold pb-1 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-nowrap">
                  {{ activeRunReplicant.data.teams[0].players[0].socials.twitch }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Flash div -->
        <div v-if="timerReplicant && timerReplicant.data?.state === 'finished'"
          class="relative top-[59px] left-[20px] w-[570px] h-[73px] flash-div"
          style="clip-path: polygon(0% 11%, 0% 11%, 13.6% 12.33%, 15.5% -1.37%, 20.7% -1.33%, 20.79% 12.74%, 25.74% 12.33%, 27.73% 0%, 100% 0%, 100% 98.63%, 0.00% 98.63%)">
        </div>
        <!-- div-time -->
        <div v-if="timerReplicant && timerReplicant.data"
          class="relative top-[59px] left-[20px] w-[570px] h-[73px] flex flex-col items-center justify-center text-white bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_4-3-Timer_1.png')]"
          :class="[
            timerReplicant.data.state === 'running' ? 'animate-flash' : '',
            timerReplicant.data.state === 'finished' ? 'flash-container' : ''
          ]"
          style="clip-path: polygon(0% 11%, 0% 11%, 13.6% 12.33%, 15.5% -1.37%, 20.7% -1.33%, 20.79% 12.74%, 25.74% 12.33%, 27.73% 0%, 100% 0%, 100% 98.63%, 0.00% 98.63%)">
          <p class="mb-3 text-5xl font-bold [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
            :class="[
              timerReplicant?.data?.state === 'finished' ? 'animate-finished text-teal-400' : 'animate-start',
              'transition-all duration-500 ease-in-out',
            ]">
            {{ timerReplicant?.data?.time }}
          </p>
        </div>
        <!-- div-host -->
        <div
          class="absolute top-[226px] left-[20px]  w-[285px] h-[106px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_4-3-Host_1.png')]">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <p class="text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] uppercase pb-7">{{
              hostReplicant?.data }}
            </p>
          </div>
        </div>
        <!-- div-logos -->
        <div
          class="absolute top-[303px] left-[20px] w-[570px] h-[194px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_4-3-Logos_1.png')]">

        </div>
      </div>
      <!-- div-info -->
      <div
        class="absolute top-[15px] left-[10px] w-[586px] h-[108px] bg-[url('/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_Game_1_4_3.png')]">
        <!-- div-run -->
        <div class="absolute bottom-[10px] left-[0px] w-[586px] h-[108px] flex flex-col items-center justify-center">
          <p class="px-2 mb-3 text-[2em] font-bold text-[#FFCA6A] [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2 leading-8"
            v-if="activeRunReplicant && activeRunReplicant.data">{{
              activeRunReplicant.data.name }}</p>
        </div>
        <div
          class="absolute top-[76px] left-[35px] w-[155px] h-[20px] bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Icon_Platform_2.png')] bg-cover">
        </div>
        <div class="absolute top-[73px] left-[180px] w-[229px] h-[29px] flex flex-col items-center justify-center">
          <p class="mb-3 text-base font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] uppercase text-center pt-2"
            v-if="activeRunReplicant && activeRunReplicant.data">{{
              activeRunReplicant.data.run_metadata.platform }}</p>
        </div>
        <div
          class="absolute top-[76px] left-[390px] w-[155px] h-[20px] bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Icon_Platform_1.png')] bg-cover">

        </div>
      </div>
      <!-- div-timer -->
      <div v-if="timerReplicant && timerReplicant.data" :class="[
        'absolute top-[125px] left-[10px] w-[586px] h-[81px] bg-[url(/src/graphics/4_3_solo/assets/SRE-X_Layout_3.Juego_Timer_1_4_3.png)]',
      ]">
        <!-- div-run-info -->
        <div class="relative top-[0px] left-[0px] w-[586px] h-[81px] flex flex-row items-center justify-center">
          <!-- div-category -->
          <div class="flex flex-row items-center justify-start w-[550px] gap-2 pl-8">
            <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
            <p class="mb-2 text-xl font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
              v-if="activeRunReplicant && activeRunReplicant.data">{{
                activeRunReplicant.data.run_metadata.category }}</p>
          </div>
          <!-- div-estimate -->
          <div class="flex flex-row items-center justify-center w-1/2 gap-2">
            <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
            <p class="mb-2 text-xl font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
              v-if="activeRunReplicant && activeRunReplicant.data">{{
                activeRunReplicant.data.estimate_string }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- bot bar -->
  <BarComponent :wait="false"></BarComponent>
</template>

<script lang="ts" setup>
import TwitchIcon from 'vue-material-design-icons/Twitch.vue';
import BarComponent from '@sre-frontend-layout/graphics/bar/main.vue'
import { ActiveRun, Timer } from '@sre-frontend-layout/types/schemas';
import { useReplicant } from 'nodecg-vue-composable';
import { getRunnerString } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { nextTick, onMounted } from 'vue';
import { AnimeTimelineInstance } from 'animejs';
import anime from 'animejs';


const hostReplicant = useReplicant<string>('host', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

let namesTL = anime.timeline({
  loop: true,
  easing: 'linear',
});

function animateNames() {
  namesTL = anime.timeline({
    loop: true,
    easing: 'linear',
  });

  // Inicializar con opacidades diferentes
  anime.set('.username', { opacity: 1 });
  anime.set('.twitch', { opacity: 0 });

  const delay = 20000
  // Alternar las opacidades con más tiempo visible para cada logo
  namesTL
    .add({
      targets: '.username',
      opacity: 0,  // Desaparece
      duration: 1000,
      endDelay: delay  // Espera 2 segundos antes de desaparecer
    })
    .add({
      targets: '.twitch',
      opacity: 1,  // Aparece
      duration: 1000,
      // offset: '-=2000',  // Inicia al mismo tiempo que el desvanecimiento de .username
      endDelay: delay  // Se queda visible por 2 segundos
    }, `-=${delay} + 800`)
    .add({
      targets: '.twitch',
      opacity: 0,  // Desaparece
      duration: 1000,
      // offset: '-=2000',
      endDelay: delay  // Espera 2 segundos antes de desaparecer
    })
    .add({
      targets: '.username',
      opacity: 1,  // Vuelve a aparecer
      duration: 1000,
      // offset: '-=2000',
      endDelay: delay  // Se queda visible por 2 segundos
    }, `-=${delay} + 800`)
}


onMounted(() => {
  const activeRunReplicant1 = nodecg.Replicant<ActiveRun>('activeRun');
  NodeCG.waitForReplicants(activeRunReplicant1).then(() => {
    activeRunReplicant1.on('change', async (newValue, oldValue) => {
      namesTL.pause()
      namesTL = {} as AnimeTimelineInstance
      await nextTick();
      await nextTick();
      animateNames();
    })
  })
})
</script>

<style scoped>
/* Flash Sweep Keyframes */
@keyframes flashSweep {
  0% {
    left: -100%;
    opacity: 0;
  }

  50% {
    left: 50%;
    opacity: 1;
  }

  75% {
    left: 100%;
    opacity: 0.2;
  }

  100% {
    left: 200%;
    opacity: 0;
  }
}

/* Contenedor que envuelve al flash */
.flash-container {
  position: relative;
  overflow: hidden;
  /* Para que el flash se oculte cuando sale del div */
}

/* Div del flash */
.flash-div {
  position: absolute;
  opacity: 0.5;
  background: rgba(255, 255, 255, 0);
  animation: flash 1s ease-in-out forwards;
}

/* Animación de parpadeo en blanco */
@keyframes flash {
  0% {
    background-color: rgba(255, 255, 255, 0);
  }

  50% {
    background-color: rgba(255, 255, 255, 1);
  }

  100% {
    background-color: rgba(255, 255, 255, 0);
  }
}

.animate-flash {
  animation: flash 1.5s ease-in-out;
}

/* Animación de inicio (fade-in) */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-start {
  animation: fadeIn 1s ease-out;
}

/* Animación de finalización (pulse) */
@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.animate-finished {
  animation: pulse 3s infinite ease-in-out;
}
</style>