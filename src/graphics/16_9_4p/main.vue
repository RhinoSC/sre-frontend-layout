<template>
  <div
    class="relative w-[1920px] h-[1004px] flex flex-col justify-center bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Background.png')] bg-cover bg-center">
    <!-- Pseudo-elemento before para la segunda imagen con el efecto -->
    <div
      class="w-[1920px] h-[1080px] absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_SoftLight_Raya_tele.png')] before:bg-cover before:bg-center before:opacity-20">
    </div>
    <div
      class="z-20 w-[1920px] h-[1004px] absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_Frame_16_9_4p_1.png')] after:bg-cover after:bg-center">
    </div>
    <!-- Aquí va tu contenido encima de los fondos -->
    <div class="relative z-10 w-[1920px] h-[1004px]">
      <!-- player-1 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[0px] w-[771px] h-[437px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_NormalBackground_16_9_4p_2.png')]">
        </div>
        <!-- div-coms -->
        <div v-if="activeRunReplicant && activeRunReplicant.data && timerReplicant?.data"
          class="absolute top-[430px] left-[0px] w-[388px] h-[103px] overflow-hidden">
          <!-- div-runner -->
          <div
            class="z-20 absolute top-[0px] left-[48px] w-[341px] h-[55px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_RunnerSUPERIO_16_9_4p_1.png')]">
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
          <!-- 1ro -->
          <div
            class="team team-1-1ro absolute -top-[84px] left-[100px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/1ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="first === activeRunReplicant.data.teams[0].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">1</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">
                    {{
                      msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].milliseconds)
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 2ro -->
          <div
            class="team team-1-2ro absolute -top-[84px] left-[100px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/2ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="second === activeRunReplicant.data.teams[0].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">2</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 3ro -->
          <div
            class="team team-1-3ro absolute -top-[84px] left-[100px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/3ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="third === activeRunReplicant.data.teams[0].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">3</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">
                    {{
                      msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].milliseconds)
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 4ro -->
          <div
            class="team team-1-4ro absolute -top-[84px] left-[100px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/4ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="fourth !== '' && fourth === activeRunReplicant.data.teams[0].id">
              <div class="flex flex-row items-center h-full gap-2 pt-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">4</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[0].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- player-2 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[0px] top-[550px] w-[771px] h-[437px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_NormalBackground_16_9_4p_2.png')]">
        </div>
        <!-- div-coms -->
        <div
          v-if="activeRunReplicant && activeRunReplicant.data && activeRunReplicant.data.teams.length >= 2 && timerReplicant?.data"
          class="absolute top-[450px] left-[390px] w-[388px] h-[103px] overflow-hidden">
          <!-- div-runner -->
          <div
            class="z-20 absolute top-[47px] left-[3px] w-[341px] h-[56px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_RunnerBAJO_16_9_4p_2.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="username absolute mt-2 text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{{
                activeRunReplicant.data.teams[1].players[0].username }}</p>
              <div class="absolute flex flex-row items-center justify-center w-full h-full mt-4 twitch flex-nowrap">
                <TwitchIcon fillColor="#FFFFFF"></TwitchIcon>
                <p class="text-2xl font-bold pb-2 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-nowrap">
                  {{ activeRunReplicant.data.teams[1].players[0].socials.twitch }}
                </p>
              </div>
            </div>
          </div>
          <!-- 1ro -->
          <div
            class="team team-2-1ro absolute top-[134px] left-[56px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/1ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="first !== '' && first === activeRunReplicant.data.teams[1].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">1</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[1].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 2ro -->
          <div
            class="team team-2-2ro absolute top-[134px] left-[56px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/2ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="second !== '' && second === activeRunReplicant.data.teams[1].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">2</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[1].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 3ro -->
          <div
            class="team team-2-3ro absolute top-[134px] left-[56px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/3ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="third !== '' && third === activeRunReplicant.data.teams[1].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">3</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[1].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 4ro -->
          <div
            class="team team-2-4ro absolute top-[134px] left-[56px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/4ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="fourth !== '' && fourth === activeRunReplicant.data.teams[1].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">4</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[1].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- general-info -->
      <div>
        <!-- div-info -->
        <div
          class="absolute top-[5px] left-[765px] w-[370px] h-[105px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_Game_16_9_4p_1.png')]">
          <!-- div-run -->
          <div class="absolute left-[10px] pt-[35px] w-[370px] h-[52px] flex flex-col items-center justify-center">
            <p class="px-[4px] pb-[0px] text-[1.3em] font-bold text-[#FFCA6A] [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center"
              v-if="activeRunReplicant && activeRunReplicant.data">{{
                activeRunReplicant.data.name }}</p>
          </div>
          <div
            class="absolute top-[78px] left-[30px] w-[100px] h-[24px] bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Icon_Platform_2.png')] bg-cover">
          </div>
          <div class="absolute top-[76px] left-[80px] w-[229px] h-[29px] flex flex-col items-center justify-center">
            <p class="mb-3 text-[1em] font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] uppercase text-center pt-2"
              v-if="activeRunReplicant && activeRunReplicant.data">{{ activeRunReplicant.data.run_metadata.platform }}
            </p>
          </div>
          <div
            class="absolute top-[78px] left-[255px] w-[100px] h-[24px] bg-[url('/src/graphics/_misc/assets/SRE-X_Layout_Icon_Platform_2.png')] bg-cover rotate-180">

          </div>
        </div>
        <!-- div-timer -->
        <div v-if="timerReplicant && timerReplicant.data" :class="[
          'absolute top-[130px] left-[770px] w-[365px] pt-[8px] h-[210px] bg-[url(/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_Timer_16_9_4p_1.png)]',
          timerReplicant.data.state === 'running' ? 'animate-flash' : '',
          timerReplicant.data.state === 'finished' ? 'flash-container' : ''
        ]">
          <!-- Flash div -->
          <div v-if="timerReplicant && timerReplicant.data.state === 'finished'"
            class="absolute top-0 left-0 w-[365px] h-[210px] flash-div"></div>

          <!-- div-time -->
          <div
            class="relative top-[10px] left-[0px] w-[365px] h-[47px] flex flex-col items-center justify-center text-white">
            <p class="mb-3 text-6xl font-bold [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
              :class="[
                timerReplicant.data.state === 'finished' ? 'animate-finished text-[#FFCA6A]' : 'animate-start',
                'transition-all duration-500 ease-in-out',
              ]">
              {{ timerReplicant.data.time }}
            </p>
          </div>
          <!-- div-run-info -->
          <div
            class="relative top-[30px] left-[0px] pt-[50px] w-[365px] h-[47px] flex flex-col items-center justify-center gap-2">
            <!-- div-estimate -->
            <div class="flex flex-row items-center justify-center w-full gap-2">
              <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Estimate.png" alt="" class="w-[26px] h-[31px]">
              <p class="mb-2 text-[1.1em] font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.estimate_string }}</p>
            </div>
            <!-- div-category -->
            <div class="flex flex-row items-center justify-center w-full h-[96px] gap-2">
              <img src="../_misc/assets/timer/SRE-X_Layout_Icon_Category.png" alt="" class="w-[26px] h-[31px]">
              <p class="mb-2 text-[1.4em] font-bold text-white [text-shadow:_0_5px_4px_rgb(0_0_0_/_50%)] uppercase text-center pt-2"
                v-if="activeRunReplicant && activeRunReplicant.data">{{
                  activeRunReplicant.data.run_metadata.category }}</p>
            </div>
          </div>
        </div>
        <!-- div-coms-gen -->
        <div
          class="absolute top-[355px] left-[770px] w-[370px] h-[196px] bg-[url(/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_NormalBackground_16_9_4p_4.png)]">
        </div>
        <!-- div-logos -->
        <div
          class="absolute top-[695px] left-[784px] w-[352px] h-[227px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_Logo_16_9_4p_1.png')]">
          <div class="w-[352px] h-[227px] flex flex-row items-center justify-center">
            <img src="../_misc/assets/SRE-X_color_1.png" alt="" class="absolute object-contain w-[90%] h-full sre-img">
            <img src="../_misc/assets/save-one-ong-color_1.png" alt=""
              class="absolute object-contain w-[60%] h-full one-img">
          </div>
        </div>
        <!-- div-host -->
        <div
          class="absolute top-[910px] left-[784px] w-[352px] h-[73px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_Host_16_9_4p_1.png')]">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <p class="text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] uppercase">{{
              hostReplicant?.data }}
            </p>
          </div>
        </div>
      </div>
      <!-- player-3 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[1150px] w-[771px] h-[437px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_NormalBackground_16_9_4p_2.png')]">
        </div>
        <!-- div-coms -->
        <div
          v-if="activeRunReplicant && activeRunReplicant.data && activeRunReplicant.data.teams.length >= 3 && timerReplicant?.data"
          class="absolute top-[430px] left-[1538px] w-[382px] h-[103px] overflow-hidden">
          <!-- div-runner -->
          <div
            class="z-20 absolute top-[0px] left-[0px] w-[338px] h-[55px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_RunnerSUPERIO_16_9_4p_1.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="username absolute text-2xl mb-3 font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{{
                activeRunReplicant.data.teams[2].players[0].username }}</p>
              <div class="absolute flex flex-row items-center justify-center w-full h-full mb-1 twitch flex-nowrap">
                <TwitchIcon fillColor="#FFFFFF"></TwitchIcon>
                <p class="text-2xl font-bold pb-2 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-nowrap">
                  {{ activeRunReplicant.data.teams[2].players[0].socials.twitch }}
                </p>
              </div>
            </div>
          </div>
          <!-- 1ro -->
          <div
            class="team team-3-1ro absolute -top-[84px] left-[52px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/1ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="first === activeRunReplicant.data.teams[2].id">
              <div class="flex flex-row items-center h-full gap-2 pt-0 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">1</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">
                    {{
                      msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[2].id].milliseconds)
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 2ro -->
          <div
            class="team team-3-2ro absolute -top-[84px] left-[52px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/2ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="second === activeRunReplicant.data.teams[2].id">
              <div class="flex flex-row items-center h-full gap-2 pt-0 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">2</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[2].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 3ro -->
          <div
            class="team team-3-3ro absolute -top-[84px] left-[52px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/3ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="third === activeRunReplicant.data.teams[2].id">
              <div class="flex flex-row items-center h-full gap-2 pt-0 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">3</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">
                    {{
                      msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[2].id].milliseconds)
                    }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 4ro -->
          <div
            class="team team-3-4ro absolute -top-[84px] left-[52px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/4ro_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="fourth !== '' && fourth === activeRunReplicant.data.teams[2].id">
              <div class="flex flex-row items-center h-full gap-2 pt-0 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">4</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[2].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- player-4 -->
      <div>
        <!-- div-game -->
        <div
          class="absolute left-[1150px] top-[550px] w-[771px] h-[437px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_3.Juego_NormalBackground_16_9_4p_2.png')]">
        </div>
        <!-- div-coms -->
        <div
          v-if="activeRunReplicant && activeRunReplicant.data && activeRunReplicant.data.teams.length >= 4 && timerReplicant?.data"
          class="absolute top-[450px] left-[1150px] w-[377px] h-[103px] overflow-hidden">
          <!-- div-runner -->
          <div
            class="z-20 absolute top-[47px] left-[36px] w-[341px] h-[56px] bg-[url('/src/graphics/16_9_4p/assets/SRE-X_Layout_4.Juego4_16-9_RunnerBAJO_16_9_4p_2.png')]">
            <div class="flex flex-col items-center justify-center w-full h-full">
              <p class="username absolute mt-2 text-2xl font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{{
                activeRunReplicant.data.teams[3].players[0].username }}</p>
              <div class="absolute flex flex-row items-center justify-center w-full h-full mt-4 twitch flex-nowrap">
                <TwitchIcon fillColor="#FFFFFF"></TwitchIcon>
                <p class="text-2xl font-bold pb-2 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-nowrap">
                  {{ activeRunReplicant.data.teams[3].players[0].socials.twitch }}
                </p>
              </div>
            </div>
          </div>
          <!-- 1ro -->
          <div
            class="team team-4-1ro absolute top-[134px] left-[88px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/1ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="first !== '' && first === activeRunReplicant.data.teams[3].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">1</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[3].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 2ro -->
          <div
            class="team team-4-2ro absolute top-[134px] left-[88px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/2ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="second !== '' && second === activeRunReplicant.data.teams[3].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">2</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[3].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 3ro -->
          <div
            class="team team-4-3ro absolute top-[134px] left-[88px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/3ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="third !== '' && third === activeRunReplicant.data.teams[3].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">3</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[3].id].milliseconds)
                  }}</h1>
                </div>
              </div>
            </div>
          </div>
          <!-- 4ro -->
          <div
            class="team team-4-4ro absolute top-[134px] left-[88px] w-[218px] h-[53px] bg-[url('/src/graphics/16_9_4p/assets/4ro_abajo_16_9_4p.png')] bg-contain">
            <div class="h-full" v-if="fourth !== '' && fourth === activeRunReplicant.data.teams[3].id">
              <div class="flex flex-row items-center h-full gap-2 text-white">
                <div class=" w-[120px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold ">4</h1>
                </div>
                <div class="w-[200px] h-full flex flex-row items-center justify-center">
                  <h1 class="text-2xl font-bold">{{
                    msToTimeStr(timerReplicant.data.teamFinishTimes[activeRunReplicant.data.teams[3].id].milliseconds)
                  }}</h1>
                </div>
              </div>
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
import { getRunnerString, msToTimeStr } from '@sre-frontend-layout/dashboard/_misc/helpers'
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
const third = ref("")
const fourth = ref("")

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
        begin: () => {
          console.log('Animación iniciada para:', teamString);
        },
        complete: () => {
          console.log('Animación completada para:', teamString);
        }
      });
    } else {
      anime({
        targets: `.${teamString}`,
        translateY: `130px`,
        duration: 2000,
        easing: 'easeOutElastic(1, 1)',
        begin: () => {
          console.log('Animación iniciada para:', teamString);
        },
        complete: () => {
          console.log('Animación completada para:', teamString);
        }
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
        begin: () => {
          console.log('Animación iniciada para:', teamString);
        },
        complete: () => {
          console.log('Animación completada para:', teamString);
        }
      });
    } else {
      anime({
        targets: `.${teamString}`,
        translateY: `-120px`,
        duration: 2000,
        easing: 'easeOutElastic(1, 1)',
        begin: () => {
          console.log('Animación iniciada para:', teamString);
        },
        complete: () => {
          console.log('Animación completada para:', teamString);
        }
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
          if (![first.value, second.value, third.value, fourth.value].includes(team1Id)) {

            if (first.value === '') {
              first.value = team1Id;
              animateFinish("1", "1");
            } else if (second.value === '') {
              second.value = team1Id;
              animateFinish("1", "2");
            } else if (third.value === '') {
              third.value = team1Id;
              animateFinish("1", "3");
            } else if (fourth.value === '') {
              fourth.value = team1Id;
              animateFinish("1", "4");
            }
          }
        }

        // Verificar si el equipo 2 terminó
        if (newValue.teamFinishTimes[team2Id]) {
          // Solo proceder si team2Id aún no está en `first`, `second`, `third`, o `fourth`
          if (![first.value, second.value, third.value, fourth.value].includes(team2Id)) {

            if (first.value === '') {
              first.value = team2Id;
              animateFinish("2", "1", true);
            } else if (second.value === '') {
              second.value = team2Id;
              animateFinish("2", "2", true);
            } else if (third.value === '') {
              third.value = team2Id;
              animateFinish("2", "3", true);
            } else if (fourth.value === '') {
              fourth.value = team2Id;
              animateFinish("2", "4", true);
            }
          }
        }

        // Verificar si el equipo 3 terminó
        if (newValue.teamFinishTimes[team3Id]) {
          // Solo proceder si team3Id aún no está en `first`, `second`, `third`, o `fourth`
          if (![first.value, second.value, third.value, fourth.value].includes(team3Id)) {

            if (first.value === '') {
              first.value = team3Id;
              animateFinish("3", "1");
            } else if (second.value === '') {
              second.value = team3Id;
              animateFinish("3", "2");
            } else if (third.value === '') {
              third.value = team3Id;
              animateFinish("3", "3");
            } else if (fourth.value === '') {
              fourth.value = team3Id;
              animateFinish("3", "4");
            }
          }
        }

        // Verificar si el equipo 4 terminó
        if (newValue.teamFinishTimes[team4Id]) {
          // Solo proceder si team4Id aún no está en `first`, `second`, `third`, o `fourth`
          if (![first.value, second.value, third.value, fourth.value].includes(team4Id)) {

            if (first.value === '') {
              first.value = team4Id;
              animateFinish("4", "1", true);
            } else if (second.value === '') {
              second.value = team4Id;
              animateFinish("4", "2", true);
            } else if (third.value === '') {
              third.value = team4Id;
              animateFinish("4", "3", true);
            } else if (fourth.value === '') {
              fourth.value = team4Id;
              animateFinish("4", "4", true);
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
    } else if (first.value === teams?.[2]?.id) {
      animateReset("3", "1");
    } else if (first.value === teams?.[3]?.id) {
      animateReset("4", "1", true);
    }
  }

  // Reiniciar el segundo lugar
  if (second.value !== "") {
    if (second.value === teams?.[0].id) {
      animateReset("1", "2");
    } else if (second.value === teams?.[1].id) {
      animateReset("2", "2", true);
    } else if (second.value === teams?.[2]?.id) {
      animateReset("3", "2");
    } else if (second.value === teams?.[3]?.id) {
      animateReset("4", "2", true);
    }
  }

  // Reiniciar el tercer lugar
  if (third.value !== "") {
    if (third.value === teams?.[0].id) {
      animateReset("1", "3");
    } else if (third.value === teams?.[1].id) {
      animateReset("2", "3", true);
    } else if (third.value === teams?.[2]?.id) {
      animateReset("3", "3");
    } else if (third.value === teams?.[3]?.id) {
      animateReset("4", "3", true);
    }
  }

  // Reiniciar el cuarto lugar
  if (fourth.value !== "") {
    if (fourth.value === teams?.[0].id) {
      animateReset("1", "4");
    } else if (fourth.value === teams?.[1].id) {
      animateReset("2", "4", true);
    } else if (fourth.value === teams?.[2]?.id) {
      animateReset("3", "4");
    } else if (fourth.value === teams?.[3]?.id) {
      animateReset("4", "4", true);
    }
  }

  // Limpiar los valores
  first.value = "";
  second.value = "";
  third.value = "";
  fourth.value = "";
});


nodecg.listenFor('timerUndo', (team_id: string) => {
  if (team_id === first.value) {
    if (first.value === activeRunReplicant1.value?.value?.teams[0].id) {
      console.log("aqui 1")
      animateReset("1", "1");
    } else if (first.value === activeRunReplicant1.value?.value?.teams[1].id) {
      console.log("aqui 2")
      animateReset("2", "1", true);
    } else if (first.value === activeRunReplicant1.value?.value?.teams[2].id) {
      console.log("aqui 3")
      animateReset("3", "1");
    } else {
      animateReset("4", "1", true);
    }
    first.value = "";
    return
  } else if (team_id === second.value) {
    if (second.value === activeRunReplicant1.value?.value?.teams[0].id) {
      animateReset("1", "2");
    } else if (second.value === activeRunReplicant1.value?.value?.teams[1].id) {
      animateReset("2", "2", true);
    } else if (second.value === activeRunReplicant1.value?.value?.teams[2].id) {
      animateReset("3", "2");
    } else {
      animateReset("4", "2", true);
    }
    second.value = "";
    return
  }
  else if (team_id === third.value) {
    if (third.value === activeRunReplicant1.value?.value?.teams[0].id) {
      animateReset("1", "3");
    } else if (third.value === activeRunReplicant1.value?.value?.teams[1].id) {
      animateReset("2", "3", true);
    } else if (third.value === activeRunReplicant1.value?.value?.teams[2].id) {
      animateReset("3", "3");
    } else {
      animateReset("4", "3", true);
    }
    third.value = "";
    return
  } else if (team_id === fourth.value) {
    if (fourth.value === activeRunReplicant1.value?.value?.teams[0].id) {
      animateReset("1", "4");
    } else if (fourth.value === activeRunReplicant1.value?.value?.teams[1].id) {
      animateReset("2", "4", true);
    } else if (fourth.value === activeRunReplicant1.value?.value?.teams[2].id) {
      animateReset("3", "4");
    } else {
      animateReset("4", "4", true);
    }
    fourth.value = "";
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