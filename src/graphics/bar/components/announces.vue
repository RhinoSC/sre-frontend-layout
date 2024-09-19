<template>
  <div
    class="w-[535px] h-[77px] font-bold text-4xl flex flex-row flex-nowrap items-center text-center overflow-hidden text-nowrap">
    <div class="w-full opacity-0 welcome-container">
      <h1>Bienvenido a la SRE X</h1>
    </div>
    <div class="pl-[300px] w-full opacity-0 donate-container">
      <h1>Recuerda apoyar en <span>speedrunespanol.com/donate</span></h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import anime from 'animejs';

const emit = defineEmits(['animationEnded'])

function animationEnd() {
  emit('animationEnded')
}

let animeTL = ref(anime.timeline());

onMounted(() => {

  animeTL.value.add({
    targets: '.start-bar',
    duration: 50,  // Parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [0, 1],  // Primer parpadeo a 100% de opacidad
    filter: ['brightness(0)', 'brightness(1)'],  // Aumento de brillo más notorio
  }).add({
    targets: '.start-bar',
    duration: 100,  // Duración corta para el siguiente parpadeo
    easing: 'easeInOutSine',
    opacity: [1, 0],  // Vuelve a apagarse rápidamente
    filter: ['brightness(2)', 'brightness(0.5)'],  // Baja el brillo bruscamente
  }).add({
    targets: '.start-bar',
    duration: 100,  // Otro parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [0, 1],  // Parpadeo nuevamente a encendido
    filter: ['brightness(0.5)', 'brightness(2.5)'],  // Aumento más extremo en el brillo
  }).add({
    targets: '.start-bar',
    duration: 50,  // Último parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [1, 0.5],  // Reducción leve de opacidad
    filter: ['brightness(2.5)', 'brightness(1)'],  // Ajuste a brillo normal
  }).add({
    targets: '.start-bar',
    duration: 2000,  // Cambio más suave al estado final
    easing: 'easeOutElastic(1, 0.5)',
    backgroundColor: '#D1559E',  // El color final cuando el "foco" está encendido
    opacity: 1,  // Asegura que esté completamente visible
    filter: 'brightness(1)',  // Brillo normalizado
  });

  animeTL.value.add({
    targets: '.welcome-container',
    opacity: [0, 1], // Aparece
    translateX: [-290, 0], // Desde la izquierda
    duration: 1000, // Duración de la animación
    easing: 'easeOutQuad',
  })

  animeTL.value.add({
    targets: '.welcome-container',
    translateY: [0, 50], // Se desplaza hacia abajo
    opacity: [1, 0], // Se desvanece
    duration: 1000,
    easing: 'easeInQuad',
    delay: 5000, // Espera 1 segundo antes de la transición
  })

  animeTL.value.add({
    targets: '.donate-container',
    opacity: [0, 1], // Aparece
    translateX: [-300, -100], // Desde la izquierda
    duration: 1000, // Duración de la animación
    easing: 'easeOutQuad',
  })


  animeTL.value.add({
    targets: '.donate-container',
    translateY: [0, 50], // Se desplaza hacia abajo
    opacity: [1, 0], // Se desvanece
    duration: 1000,
    easing: 'easeInQuad',
    delay: 1000, // Espera 1 segundo antes de la transición
  })

  animeTL.value.add({
    targets: '.start-bar',
    duration: 50,  // Parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [1, 0],  // Primer parpadeo a 100% de opacidad
    filter: ['brightness(2)', 'brightness(0)'],  // Aumento de brillo más notorio
  }).add({
    targets: '.start-bar',
    duration: 100,  // Duración corta para el siguiente parpadeo
    easing: 'easeInOutSine',
    opacity: [0, 1],  // Vuelve a apagarse rápidamente
    filter: ['brightness(0.5)', 'brightness(2)'],  // Baja el brillo bruscamente
  }).add({
    targets: '.start-bar',
    duration: 100,  // Otro parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [1, 0],  // Parpadeo nuevamente a encendido
    filter: ['brightness(2.5)', 'brightness(0.5)'],  // Aumento más extremo en el brillo
  }).add({
    targets: '.start-bar',
    duration: 50,  // Último parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [0.5, 1],  // Reducción leve de opacidad
    filter: ['brightness(1)', 'brightness(2.5)'],  // Ajuste a brillo normal
  }).add({
    targets: '.start-bar',
    duration: 2000,  // Cambio más suave al estado final
    easing: 'easeOutElastic(1, 0.5)',
    backgroundColor: 'rgba(255, 0, 0, 0.0)',  // El color final cuando el "foco" está encendido
    opacity: 1,  // Asegura que esté completamente visible
    filter: 'brightness(1)',  // Brillo normalizado
  });

  animeTL.value.finished.then(() => {
    animationEnd()
  })

});
</script>

<style scoped>
.donate-container,
.welcome-container {
  position: absolute;
  left: 0;
}
</style>