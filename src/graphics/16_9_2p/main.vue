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
        <div v-if="activeRunReplicant && activeRunReplicant.data && timerReplicant?.data"
          class="absolute top-[568px] left-[0px] w-[715px] h-[416px] overflow-hidden">
          <!-- div-runner -->
          <div
            class="absolute top-[7px] left-[374px] w-[341px] h-[64px] bg-[url('/src/graphics/16_9_2p/assets/SRE-X_Layout_4.Juego2_16-9_Runner_16_2p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="mb-3 text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{{
                activeRunReplicant.data.teams[0].players[0].socials.twitch }}</p>
            </div>
          </div>
          <div
            class="team team-1-1ro absolute -top-[70px] left-[374px] w-[341px] h-[73px] bg-[url('/src/graphics/_misc/assets/timer/1ro.png')]">
            <div v-if="first !== '' && first === activeRunReplicant.data.teams[0].id">
              <h1>{{ timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].time }}</h1>
            </div>
          </div>
          <div
            class="team team-1-2ro absolute -top-[70px] left-[374px] w-[341px] h-[73px] bg-[url('/src/graphics/_misc/assets/timer/2ro.png')]">
            <div v-if="second !== '' && second === activeRunReplicant.data.teams[0].id">
              <h1>{{ timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].time }}</h1>
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
import { ActiveRun, RunFinishTimes, Timer } from '@sre-frontend-layout/types/schemas';
import { useReplicant } from 'nodecg-vue-composable';
import { getRunnerString } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { nextTick, onMounted, ref } from 'vue';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import anime from 'animejs';


const hostReplicant = useReplicant<string>('host', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

const activeRunReplicant1 = ref<ReplicantBrowser<ActiveRun>>()
const timerReplicant1 = ref<ReplicantBrowser<Timer>>()


const first = ref("")
const second = ref("")

function animateFinish(team: string, pos: string) {
  // Generar el selector de la clase
  const teamString = `team-${team}-${pos}ro`;
  console.log(`Animando: .${teamString}`);

  // Asegúrate de que el elemento existe
  const element = document.querySelector(`.${teamString}`);
  if (element) {
    // Aplicar la animación
    anime({
      targets: `.${teamString}`,
      translateY: `120px`,
      duration: 2000,
      easing: 'easeOutElastic(1, 1)',
      begin: () => {
        console.log('Animación iniciada para:', teamString);
      },
      complete: () => {
        console.log('Animación completada para:', teamString);
      }
    });
  } else {
    console.error(`Elemento con clase .${teamString} no encontrado`);
  }
}

onMounted(() => {
  activeRunReplicant1.value = nodecg.Replicant<ActiveRun>('activeRun');
  timerReplicant1.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant1.value, activeRunReplicant1.value).then(() => {
    timerReplicant1.value?.on('change', async (newValue, oldValue) => {
      if (newValue && newValue && newValue.teamFinishTimes && activeRunReplicant1.value && activeRunReplicant1.value.value) {
        const team1Id = activeRunReplicant1.value?.value.teams[0].id;
        const team2Id = activeRunReplicant1.value?.value.teams[1].id;

        // Verificar si el equipo 1 terminó
        if (newValue.teamFinishTimes[team1Id]) {
          if (first.value === '') {
            // Si no hay ganador aún, el equipo 1 es el primero
            first.value = team1Id;
            await nextTick()
            animateFinish("1", "1")
          } else if (first.value !== team1Id && second.value === '') {
            // Si ya hay un ganador y no hay segundo, el equipo 1 es el segundo
            second.value = team1Id;
            await nextTick()
            animateFinish("1", "2")
          }
        }

        // Verificar si el equipo 2 terminó
        if (newValue.teamFinishTimes[team2Id]) {
          if (first.value === '') {
            // Si no hay ganador aún, el equipo 2 es el primero
            first.value = team2Id;
            await nextTick()
            animateFinish("2", "1")
          } else if (first.value !== team2Id && second.value === '') {
            // Si ya hay un ganador y no hay segundo, el equipo 2 es el segundo
            second.value = team2Id;
            await nextTick()
            animateFinish("2", "2")
          }
        }
      }
    });
  })

  nodecg.listenFor('timerReset', () => {
    console.log("reinicie")

    first.value = ""
    second.value = ""
    anime({
      targets: `.team`,
      translateY: `-60px`
    })
  })

  nodecg.listenFor('timerUndo', (team_id: string) => {
    if (team_id === activeRunReplicant1.value?.value?.teams[0].id) {
      if (team_id === first.value) {

        first.value = ""
      } else {
        second.value = ""
      }
    } else {
      if (team_id === first.value) {

        first.value = ""
      } else {
        second.value = ""
      }
    }
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