<template>
  <div
    class="relative w-full h-[77px] font-bold text-4xl flex flex-row flex-nowrap items-center text-center overflow-hidden">
    <div class="w-full welcome-container">
      <h1 class="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">Bienvenido a la <span
          class="text-[#D1559E] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">SRE X</span></h1>
    </div>
    <div class="relative flex flex-row items-center justify-center w-full h-full text-2xl donate-container">
      <div class="absolute text-donate">
        <h1 class="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">Recuerda apoyar en </h1>
        <p class="font-semibold text-[#CCECFA] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">speedrunespanol.com/donate</p>
      </div>
      <div class="absolute text-bids">
        <h1 class="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] ">Revisa los incentivos </h1>
        <p class="font-semibold text-[#CCECFA] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">speedrunespanol.com/bids</p>
      </div>
      <div class="absolute text-prizes">
        <h1 class="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">Revisa los premios </h1>
        <p class="font-semibold text-[#CCECFA] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">speedrunespanol.com/prizes</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import anime from 'animejs';

const emit = defineEmits(['animationEnded'])

function animationEnd() {
  emit('animationEnded')
}


function animateText() {

  anime.set('.welcome-container', {
    translateY: 0
  })

  let animeTextTL = ref(anime.timeline());

  animeTextTL.value.add({
    targets: '.start-bar',
    duration: 50,  // Parpadeo rápido
    easing: 'easeInOutSine',
    opacity: [1, 0],  // Primer parpadeo a 100% de opacidad
    filter: ['brightness(2)', 'brightness(0)'],  // Aumento de brillo más notorio,
    delay: 5000
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
    backgroundColor: '#D1559E',  // El color final cuando el "foco" está encendido
    opacity: 1,  // Asegura que esté completamente visible
    filter: 'brightness(1)',  // Brillo normalizado
  });

  animeTextTL.value
    // Animación de entrada del texto de bienvenida
    .add({
      targets: '.welcome-container',
      opacity: [0, 1], // Aparece
      translateX: [-300, 0], // Se desplaza desde la izquierda
      duration: 1500, // Aumentamos la duración para más suavidad
      easing: 'easeOutQuad', // Suavizamos el easing para hacerlo más natural
    })
    // Animación de entrada del texto de donación
    .add({
      targets: '.text-donate',
      opacity: [0, 1], // Aparece
      translateY: [300, 0], // Se desplaza desde abajo
      duration: 1500, // Suavizamos la duración
      easing: 'easeOutQuad', // Easing suave
      offset: '-=800', // Se superpone ligeramente con la animación anterior
    })
    // Desvanecimiento del texto de donación
    .add({
      targets: '.text-donate',
      translateY: [0, -300], // Se desplaza hacia arriba
      opacity: [1, 0], // Se desvanece
      duration: 1200,
      easing: 'easeInQuad', // Easing más brusco para el desvanecimiento
      delay: 4000, // Espera antes de desaparecer
    })
    // Animación de entrada del texto de bids
    .add({
      targets: '.text-bids',
      opacity: [0, 1], // Aparece
      translateY: [300, 0], // Se desplaza desde abajo
      duration: 1500,
      easing: 'easeOutQuad',
      offset: '-=800', // Se superpone ligeramente con la animación anterior
    })
    // Desvanecimiento del texto de bids
    .add({
      targets: '.text-bids',
      translateY: [0, -300], // Se desplaza hacia arriba
      opacity: [1, 0], // Se desvanece
      duration: 1200,
      easing: 'easeInQuad',
      delay: 4000,
    })
    // Animación de entrada del texto de premios
    .add({
      targets: '.text-prizes',
      opacity: [0, 1], // Aparece
      translateY: [300, 0], // Se desplaza desde abajo
      duration: 1500,
      easing: 'easeOutQuad',
      offset: '-=800', // Se superpone ligeramente con la animación anterior
    })
    // Desvanecimiento del texto de premios
    .add({
      targets: '.text-prizes',
      translateY: [0, -300], // Se desplaza hacia arriba
      opacity: [1, 0], // Se desvanece
      duration: 1200,
      easing: 'easeInQuad',
      delay: 4000,
    })
    // Desvanecimiento final del texto de bienvenida
    .add({
      targets: '.welcome-container',
      translateY: [0, 30], // Se desplaza ligeramente hacia abajo
      opacity: [1, 0], // Se desvanece
      duration: 1000,
      easing: 'easeInQuad',
      delay: 3000, // Se espera antes de desaparecer
    });


  animeTextTL.value.add({
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
    filter: 'brightness(1)',  // Brillo normalizado,
  });

  animeTextTL.value.finished.then(() => {
    animationEnd()
  })
}

onMounted(() => {
  animateText()
});
</script>

<style scoped>
/* .donate-container,
.welcome-container {
  position: absolute;
  left: 0;
} */
</style>