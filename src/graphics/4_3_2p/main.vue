<template>
  <div
    class="relative w-[1920px] h-[1004px] flex flex-col justify-center bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Background.png')] bg-cover bg-center">
    <!-- Pseudo-elemento before para la segunda imagen con el efecto -->
    <div
      class="w-[1920px] h-[1080px] absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_SoftLight_Raya_tele.png')] before:bg-cover before:bg-center before:opacity-20">
    </div>
    <div
      class="z-20 w-[1920px] h-[1004px] absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_4.Juego2_4-9_Frame_4_3_2p_1.png')] after:bg-cover after:bg-center">
    </div>
    <!-- Aquí va tu contenido encima de los fondos -->
    <div class="relative z-10 w-[1920px] h-[1004px]">
      <!-- player-1 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[0px] w-[960px] h-[716px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_NormalBackground_4_3_p2_2.png')]">
        </div>
        <!-- div-cam -->
        <div
          class="absolute left-[0px] top-[720px] w-[362px] h-[266px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_NormalBackground_4_3_2p_3.png')]">

        </div>
        <!-- div-coms -->
        <div v-if="activeRunReplicant && activeRunReplicant.data && timerReplicant?.data"
          class="absolute top-[720px] left-[0px] w-[715px] h-[280px] overflow-hidden">
          <!-- div-runner -->
          <div
            class="z-20 absolute top-[13px] left-[374px] w-[341px] h-[64px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_4.Juego2_16-9_Runner_4_3_2p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="username absolute text-2xl mb-3 font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{{
                activeRunReplicant.data.teams[0].players[0].username }}</p>
              <div class="absolute flex flex-row items-center justify-center w-full h-full mb-1 twitch flex-nowrap">
                <TwitchIcon fillColor="#FFFFFF"></TwitchIcon>
                <p class="text-2xl font-bold pb-2 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-nowrap">
                  {{ activeRunReplicant.data.teams[0].players[0].socials.twitch }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="team team-1-1ro absolute -top-[64px] left-[374px] w-[341px] h-[73px] bg-[url('/src/graphics/_misc/assets/timer/1ro.png')]">
            <div class="h-full" v-if="first !== '' && first === activeRunReplicant.data.teams[0].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold ">1</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            class="team team-1-2ro absolute -top-[64px] left-[374px] w-[341px] h-[73px] bg-[url('/src/graphics/_misc/assets/timer/2ro.png')]">
            <div class="h-full" v-if="second !== '' && second === activeRunReplicant.data.teams[0].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold ">2</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- div-logos -->
          <div
            class="z-20 absolute top-[139px] left-[374px] w-[340px] h-[125px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_4.Juego2_4-3_Logo_4_3_2p_1.png')]">
            <div class="w-[340px] h-[125px] flex flex-row items-center justify-center">
              <img src="../_misc/assets/SRE-X_color_1.png" alt="" class="absolute bg-cover sre-img">
              <img src="../_misc/assets/save-one-ong-color_1.png" alt="" class="absolute bg-cover one-img">
            </div>
          </div>
        </div>
      </div>
      <!-- general-info -->
      <div>
        <!-- div-info -->
        <div
          class="absolute top-[725px] left-[728px] w-[465px] h-[87px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_Game_4_3_2p_1.png')]">
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
          'absolute top-[810px] left-[728px] w-[233px] pt-[8px] h-[179px] bg-[url(/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_Timer_4_3_2p_1.png)]',
          timerReplicant.data.state === 'running' ? 'animate-flash' : '',
          timerReplicant.data.state === 'finished' ? 'flash-container' : ''
        ]">
          <!-- Flash div -->
          <div v-if="timerReplicant && timerReplicant.data.state === 'finished'"
            class="absolute top-0 left-0 w-[233px] h-[179px] flash-div"></div>

          <!-- div-time -->
          <div
            class="relative top-[10px] left-[0px] w-[233px] h-[47px] flex flex-col items-center justify-center text-white">
            <p class="mb-3 text-[40px] font-bold [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
              :class="[
                timerReplicant.data.state === 'finished' ? 'animate-finished text-[#FFCA6A]' : 'animate-start',
                'transition-all duration-500 ease-in-out',
              ]">
              {{ timerReplicant.data.time }}
            </p>
          </div>
          <!-- div-run-info -->
          <div class="relative top-[35px] left-[0px] w-[233px] h-[47px] flex flex-col items-start justify-center gap-2">
            <!-- div-category -->
            <div class="flex flex-row items-center justify-start w-full h-[96px] pl-[10px] gap-2">
              <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
              <p class="mb-2 pr-[20px] text-[1em] font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.run_metadata.category }}</p>
            </div>
            <!-- div-estimate -->
            <div class="flex flex-row items-center justify-start w-full gap-2 pl-[10px]">
              <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
              <p class="mb-2 text-[1.1em] font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.estimate_string }}</p>
            </div>
          </div>
        </div>
        <!-- div-coms-gen -->
        <div
          class="absolute top-[810px] left-[970px] w-[232px] h-[179px] bg-[url(/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_NormalBackground_4_3_2p_5.png)]">
        </div>
      </div>
      <!-- player-2 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[959px] w-[960px] h-[716px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_NormalBackground_4_3_p2_2.png')]">
        </div>
        <!-- div-cam -->
        <div
          class="absolute left-[1545px] top-[720px] w-[362px] h-[266px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_3.Juego_NormalBackground_4_3_2p_3.png')]">
        </div>
        <!-- div-coms -->
        <div class="absolute top-[720px] left-[1195px] w-[715px] h-[280px] overflow-hidden"
          v-if="activeRunReplicant && activeRunReplicant.data && activeRunReplicant.data.teams.length >= 2 && timerReplicant?.data">
          <!-- div-runner -->
          <div
            class="z-20 absolute top-[13px] left-[11px] w-[341px] h-[64px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_4.Juego2_16-9_Runner_4_3_2p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <div class="flex flex-col items-center justify-center w-full h-full">
                <p class="username absolute text-2xl mb-3 font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                  {{
                    activeRunReplicant.data.teams[1].players[0].username }}</p>
                <div class="absolute flex flex-row items-center justify-center w-full h-full mb-1 twitch flex-nowrap">
                  <TwitchIcon fillColor="#FFFFFF"></TwitchIcon>
                  <p class="text-2xl font-bold pb-2 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-nowrap">
                    {{ activeRunReplicant.data.teams[1].players[0].socials.twitch }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="team team-2-1ro absolute -top-[64px] left-[11px] w-[341px] h-[73px] bg-[url('/src/graphics/_misc/assets/timer/1ro.png')]">
            <div class="h-full" v-if="first !== '' && first === activeRunReplicant.data.teams[1].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold ">1</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[1].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            class="team team-2-2ro absolute -top-[64px] left-[11px] w-[341px] h-[73px] bg-[url('/src/graphics/_misc/assets/timer/2ro.png')]">
            <div class="h-full" v-if="second !== '' && second === activeRunReplicant.data.teams[1].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold ">2</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-4xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[1].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- div-host -->
          <div
            class="absolute top-[191px] left-[11px] w-[341px] h-[73px] bg-[url('/src/graphics/4_3_2p/assets/SRE-X_Layout_4.Juego2_16-9_Host_4_3_2p_1.png')]">
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
import { msToTimeStr } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { nextTick, onMounted, ref } from 'vue';
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import anime, { AnimeTimelineInstance } from 'animejs';
import TwitchIcon from 'vue-material-design-icons/Twitch.vue';


const hostReplicant = useReplicant<string>('host', 'sre-frontend-layout');
const activeRunReplicant = useReplicant<ActiveRun>('activeRun', 'sre-frontend-layout');
const timerReplicant = useReplicant<Timer>('timer', 'sre-frontend-layout');

const activeRunReplicant1 = ref<ReplicantBrowser<ActiveRun>>()
const timerReplicant1 = ref<ReplicantBrowser<Timer>>()


const first = ref("")
const second = ref("")

function animateLogos() {
  let logosTL = anime.timeline({
    loop: true,
    easing: 'linear',
  });

  // Inicializar con opacidades diferentes
  anime.set('.sre-img', { opacity: 1 });
  anime.set('.one-img', { opacity: 0 });

  // Alternar las opacidades con más tiempo visible para cada logo
  logosTL
    .add({
      targets: '.sre-img',
      opacity: 0,  // Desaparece
      duration: 2000,
      delay: 2000  // Espera 2 segundos antes de desaparecer
    })
    .add({
      targets: '.one-img',
      opacity: 1,  // Aparece
      duration: 2000,
      // offset: '-=2000',  // Inicia al mismo tiempo que el desvanecimiento de .sre-img
      delay: 2000  // Se queda visible por 2 segundos
    }, '-=3000')
    .add({
      targets: '.one-img',
      opacity: 0,  // Desaparece
      duration: 2000,
      // offset: '-=2000',
      delay: 2000  // Espera 2 segundos antes de desaparecer
    })
    .add({
      targets: '.sre-img',
      opacity: 1,  // Vuelve a aparecer
      duration: 2000,
      // offset: '-=2000',
      delay: 2000  // Se queda visible por 2 segundos
    }, '-=3000')
}

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



function animateFinish(team: string, pos: string, fromBottom: boolean = false) {
  // Generar el selector de la clase
  const teamString = `team-${team}-${pos}ro`;
  console.log(`Animando: .${teamString}`);

  // Asegúrate de que el elemento existe
  const element = document.querySelector(`.${teamString}`);
  if (element) {
    // Aplicar la animación
    if (fromBottom) {
      anime({
        targets: `.${teamString}`,
        translateY: `-130px`,
        duration: 2000,
        easing: 'easeOutElastic(1, 1)',
      });
    } else {
      anime({
        targets: `.${teamString}`,
        translateY: `130px`,
        duration: 2000,
        easing: 'easeOutElastic(1, 1)',
      });
    }
  } else {
    console.error(`Elemento con clase .${teamString} no encontrado`);
  }
}

function animateReset(team: string, pos: string, fromBottom: boolean = false) {
  // Generar el selector de la clase
  const teamString = `team-${team}-${pos}ro`;
  console.log(`Animando: .${teamString}`);

  // Asegúrate de que el elemento existe
  const element = document.querySelector(`.${teamString}`);
  if (element) {
    // Aplicar la animación
    if (fromBottom) {
      anime({
        targets: `.${teamString}`,
        translateY: `120px`,
        duration: 2000,
        easing: 'easeOutElastic(1, 1)',
      });
    } else {
      anime({
        targets: `.${teamString}`,
        translateY: `-120px`,
        duration: 2000,
        easing: 'easeOutElastic(1, 1)',
      });
    }
  } else {
    console.error(`Elemento con clase .${teamString} no encontrado`);
  }
}

onMounted(() => {

  activeRunReplicant1.value = nodecg.Replicant<ActiveRun>('activeRun');
  timerReplicant1.value = nodecg.Replicant<Timer>('timer');

  NodeCG.waitForReplicants(timerReplicant1.value, activeRunReplicant1.value).then(() => {
    activeRunReplicant1.value?.on('change', async (newValue, oldValue) => {
      namesTL.pause()
      namesTL = {} as AnimeTimelineInstance
      await nextTick();
      await nextTick();
      animateNames();
    })
    timerReplicant1.value?.on('change', async (newValue, oldValue) => {
      if (newValue && newValue.teamFinishTimes && activeRunReplicant1.value && activeRunReplicant1.value.value) {
        const team1Id = activeRunReplicant1.value?.value.teams[0].id;
        const team2Id = activeRunReplicant1.value?.value.teams[1].id;
        const team3Id = activeRunReplicant1.value?.value.teams[2]?.id;
        const team4Id = activeRunReplicant1.value?.value.teams[3]?.id;

        await nextTick();
        // Verificar si el equipo 1 terminó
        if (newValue.teamFinishTimes[team1Id]) {
          // Solo proceder si team1Id aún no está en `first`, `second`, `third`, o `fourth`
          if (![first.value, second.value].includes(team1Id)) {

            if (first.value === '') {
              first.value = team1Id;
              animateFinish("1", "1");
            } else if (second.value === '') {
              second.value = team1Id;
              animateFinish("1", "2");
            }
          }
        }

        // Verificar si el equipo 2 terminó
        if (newValue.teamFinishTimes[team2Id]) {
          // Solo proceder si team2Id aún no está en `first`, `second`, `third`, o `fourth`
          if (![first.value, second.value].includes(team2Id)) {

            if (first.value === '') {
              first.value = team2Id;
              animateFinish("2", "1");
            } else if (second.value === '') {
              second.value = team2Id;
              animateFinish("2", "2");
            }
          }
        }
      }
    });

    animateLogos();
  });
})

nodecg.listenFor('timerReset', async () => {
  console.log("reinicie");
  await nextTick();

  const teams = activeRunReplicant1.value?.value?.teams;

  // Reiniciar el primer lugar
  if (first.value !== "") {
    if (first.value === teams?.[0].id) {
      animateReset("1", "1");
    } else if (first.value === teams?.[1].id) {
      animateReset("2", "1", true);
    }
  }

  // Reiniciar el segundo lugar
  if (second.value !== "") {
    if (second.value === teams?.[0].id) {
      animateReset("1", "2");
    } else if (second.value === teams?.[1].id) {
      animateReset("2", "2");
    }
  }

  // Limpiar los valores
  first.value = "";
  second.value = "";
});


nodecg.listenFor('timerUndo', (team_id: string) => {
  if (team_id === first.value) {
    if (first.value === activeRunReplicant1.value?.value?.teams[0].id) {
      animateReset("1", "1");
    } else if (first.value === activeRunReplicant1.value?.value?.teams[1].id) {
      animateReset("2", "1");
    }
    first.value = "";
    return
  } else if (team_id === second.value) {
    if (second.value === activeRunReplicant1.value?.value?.teams[0].id) {
      animateReset("1", "2");
    } else if (second.value === activeRunReplicant1.value?.value?.teams[1].id) {
      animateReset("2", "2");
    }
    second.value = "";
    return
  }
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
  position: absolute;
  overflow: hidden;
  /* Para que el flash se oculte cuando sale del div */
}

/* Div del flash */
.flash-div {
  /* position: absolute; */
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