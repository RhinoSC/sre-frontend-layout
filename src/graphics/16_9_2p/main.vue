<template>
  <div
    class="relative w-[1920px] h-[1004px] flex flex-col justify-center bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Background.png')] bg-cover bg-center">
    <!-- Pseudo-elemento before para la segunda imagen con el efecto -->
    <div
      class="w-[1920px] h-[1004px] absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_SoftLight_Raya_tele.png')] before:bg-cover before:bg-center before:opacity-20">
    </div>
    <div
      class="z-20 w-[1920px] h-[1004px] absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_4.Juego2_16-9_Frame_1.png')] after:bg-cover after:bg-center">
    </div>
    <!-- Aquí va tu contenido encima de los fondos -->
    <div class="relative z-10 w-[1920px] h-[1004px]">
      <!-- player-1 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[0px] w-[1920px] h-[558px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_NormalBackground16_9_2p_2.png')]">
        </div>
        <!-- div-cam -->
        <div
          class="absolute left-[0px] top-[568px] w-[369px] h-[282px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_NormalBackground16_9_2p_4.png')]">

        </div>
        <!-- div-coms -->
        <div class="absolute top-[568px] left-[0px] w-[715px] h-[416px]">
          <!-- div-runner -->
          <div
            class="absolute top-[7px] left-[374px] w-[341px] h-[64px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_4.Juego2_16-9_Runner_16_2p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="mb-3 text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.teams[0].players[0].socials.twitch }}</p>
            </div>
          </div>
          <!-- div-logos -->
          <div
            class="absolute top-[277px] left-[19px] w-[334px] h-[139px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_4.Juego2_16-9_Logo_16_2p_1.png')]">
            <div class="w-[334px] h-[139px] flex flex-row items-center justify-center">
              <img src="../_misc/assets/SRE-X_color_1.png" alt="" class="absolute bg-cover sre-img">
              <!-- <img src="../_misc/assets/save-one-ong-color_1.png" alt="" class="absolute bg-cover one-img"> -->
            </div>
          </div>
        </div>
      </div>
      <!-- general-info -->
      <div>
        <!-- div-info -->
        <div
          class="absolute top-[575px] left-[728px] w-[466px] h-[82px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_Game_16_2p_1.png')]">
          <!-- div-run -->
          <div class="absolute left-[0px] w-[466px] h-[52px] flex flex-col items-center justify-center">
            <p class="px-[4px] pb-[0px] text-[1.2em] font-bold text-[#FFCA6A] [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center"
              v-if="activeRunReplicant && activeRunReplicant.data">{{
                activeRunReplicant.data.name }}</p>
          </div>
          <div
            class="absolute top-[48px] left-[10px] w-[155px] h-[20px] bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Icon_Platform_2.png')] bg-cover">
          </div>
          <div class="absolute top-[42px] left-[120px] w-[229px] h-[29px] flex flex-col items-center justify-center">
            <p class="mb-3 text-[0.9em] font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] uppercase text-center pt-2"
              v-if="activeRunReplicant && activeRunReplicant.data">{{ activeRunReplicant.data.run_metadata.platform }}
            </p>
          </div>
          <div
            class="absolute top-[48px] left-[295px] w-[155px] h-[20px] bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Icon_Platform_1.png')] bg-cover">

          </div>
        </div>
        <!-- div-timer -->
        <div v-if="timerReplicant && timerReplicant.data" :class="[
          'absolute top-[657px] left-[728px] w-[466px] pt-[8px] h-[143px] bg-[url(/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_Timer_16_2p_1.png)]',
          timerReplicant.data.state === 'running' ? 'animate-flash' : '',
          timerReplicant.data.state === 'finished' ? 'flash-container' : ''
        ]">
          <!-- Flash div -->
          <div v-if="timerReplicant && timerReplicant.data.state === 'finished'"
            class="relative top-0 left-0 w-[466px] h-[143px] flash-div"></div>

          <!-- div-time -->
          <div
            class="relative top-[10px] left-[0px] w-[466px] h-[47px] flex flex-col items-center justify-center text-white">
            <p class="mb-3 text-5xl font-bold [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
              :class="[
                timerReplicant.data.state === 'finished' ? 'animate-finished text-teal-600' : 'animate-start',
                'transition-all duration-500 ease-in-out',
              ]">
              {{ timerReplicant.data.time }}
            </p>
          </div>
          <!-- div-run-info -->
          <div class="relative top-[30px] left-[0px] w-[466px] h-[47px] flex flex-row items-center justify-center">
            <!-- div-category -->
            <div class="flex flex-row items-center justify-start w-2/3 h-[96px] pl-[10px] gap-2">
              <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
              <p class="mb-2 text-[1em] font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.run_metadata.category }}</p>
            </div>
            <!-- div-estimate -->
            <div class="flex flex-row items-center justify-center w-1/3 gap-2">
              <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
              <p class="mb-2 text-[1em] font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.estimate_string }}</p>
            </div>
          </div>
        </div>
        <!-- div-coms-gen -->
        <div
          class="absolute top-[815px] left-[728px] w-[466px] h-[165px] bg-[url(/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_Timer_16_2p_1.png)]">

        </div>
      </div>
      <!-- player-2 -->
      <div>
        <!-- div-game -->
        <!-- <div
          class="absolute left-[959px] w-[959px] h-[558px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_NormalBackground16_9_2p_2.png')]">
        </div> -->
        <!-- div-cam -->
        <div
          class="absolute left-[1545px] top-[568px] w-[369px] h-[282px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_3.Juego_NormalBackground16_9_2p_4.png')]">

        </div>
        <!-- div-coms -->
        <div class="absolute top-[568px] left-[1195px] w-[715px] h-[416px]">
          <!-- div-runner -->
          <div
            class="absolute top-[7px] left-[11px] w-[341px] h-[64px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_4.Juego2_16-9_Runner_16_2p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="mb-3 text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.teams[1] ? activeRunReplicant.data.teams[1].players[0].socials.twitch : "" }}
              </p>
            </div>
          </div>
          <!-- div-host -->
          <div
            class="absolute top-[344px] left-[366px] w-[341px] h-[73px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_4.Juego2_16-9_Host_16_2p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] uppercase">{{
                hostReplicant?.data }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- bot bar -->
  <BarComponent :wait="false"></BarComponent>
</template>

<script lang="ts" setup>
import BarComponent from '@sre-frontend-layout/graphics/bar/main.vue'
import { ActiveRun, Timer } from '@sre-frontend-layout/types/schemas';
import { useReplicant } from 'nodecg-vue-composable';
import { getRunnerString } from '@sre-frontend-layout/dashboard/_misc/helpers'


const hostReplicant = useReplicant<string>('host', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');



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