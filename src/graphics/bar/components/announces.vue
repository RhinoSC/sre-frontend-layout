<template>
  <div
    class="w-[1135px] h-[77px] font-bold text-4xl flex flex-row flex-nowrap items-center text-center overflow-hidden">
    <div class="w-full opacity-0 welcome-container">
      <h1>Bienvenido a la SRE X</h1>
    </div>
    <div class="w-full opacity-0 donate-container">
      <h1>Recuerda apoyar en <span>speedrunespanol.com/donate</span></h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import anime from 'animejs';

onMounted(() => {
  // Primera animación para el donate-container
  anime({
    targets: '.welcome-container',
    opacity: [0, 1], // Aparece
    translateX: [-300, 0], // Desde la izquierda
    duration: 1000, // Duración de la animación
    easing: 'easeOutQuad',
    complete: () => {
      // Después de que la primera animación termine, iniciar la segunda
      anime({
        targets: '.welcome-container',
        translateY: [0, 50], // Se desplaza hacia abajo
        opacity: [1, 0], // Se desvanece
        duration: 1000,
        easing: 'easeInQuad',
        delay: 5000, // Espera 1 segundo antes de la transición
        complete: () => {
          // Segunda animación para el welcome-container
          anime({
            targets: '.donate-container',
            opacity: [0, 1], // Aparece
            translateX: [-200, 0], // Desde la izquierda
            duration: 1000, // Duración de la animación
            easing: 'easeOutQuad',
            complete: () => {
              anime({
                targets: '.donate-container',
                translateY: [0, 50], // Se desplaza hacia abajo
                opacity: [1, 0], // Se desvanece
                duration: 1000,
                easing: 'easeInQuad',
                delay: 5000, // Espera 1 segundo antes de la transición
              })
            }
          });
        },
      });
    },
  });
});
</script>

<style scoped>
.donate-container,
.welcome-container {
  position: absolute;
  left: 0;
}
</style>