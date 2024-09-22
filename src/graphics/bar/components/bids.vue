<template>
  <div
    class="bot-bids-container w-[1138px] h-[77px] font-bold text-4xl flex flex-row flex-nowrap items-center text-center overflow-hidden">
    <!-- <div class="bid-title">
          <h1>{{ selectedBid.name }} <br> <span>{{ selectedBid.game }}</span></h1>
      </div> -->
    <div class="charts-container w-full h-[77px]" v-if="ready">
      <Bidwar2Component v-if="showBidType === 0 && selectedBid" :bid="selectedBid" :animeTL="animeTL"
        @animationEnd="animationEnd($event)">
      </Bidwar2Component>
      <Bidwar4Component v-if="showBidType === 1 && selectedBid" :bid="selectedBid" :animeTL="animeTL"
        @animationEnd="animationEnd($event)">
      </Bidwar4Component>
      <GoalComponent v-if="showBidType === 2 && selectedBid" :bid="selectedBid" :animeTL="animeTL"
        @animationEnd="animationEnd($event)">
      </GoalComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bid } from '@sre-frontend-layout/types';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import Bidwar2Component from './bid_components/bidwar2.vue'
import Bidwar4Component from './bid_components/bidwar4.vue'
import GoalComponent from './bid_components/goal.vue'
import { ReplicantBrowser } from 'nodecg-types/types/browser';
import anime, { AnimeTimelineInstance } from 'animejs';

const bidsReplicant = ref<ReplicantBrowser<Bid[]>>()
const bidsArray = ref<Bid[]>([])

const ready = ref(false)
const showBidType = ref(-1)
const selectedBid = ref<Bid>()
const bidIndex = ref(0)

function changeBid() {
  if (!bidsReplicant) return
  if (!bidsReplicant.value?.value) return
  if (bidsArray.value.length === 0) return
  animeTL.value = {} as AnimeTimelineInstance
  animeTL.value = anime.timeline()

  if (bidIndex.value >= bidsArray.value.length) {
    bidIndex.value = 0
  }

  if (bidsArray.value[bidIndex.value]?.type === 'bidwar' && bidsArray.value[bidIndex.value].bid_options.length === 0) {
    bidIndex.value += 1
    changeBid()
  }
  // selectedBid.value = klona(bidsArray.value[bidIndex.value])
  selectedBid.value = bidsArray.value[bidIndex.value]

  // return selectedBid.value
  if (selectedBid.value?.type === 'bidwar' && selectedBid.value?.bid_options.length === 2) {
    showBidType.value = 0
  } else if (selectedBid.value?.type === 'bidwar' && selectedBid.value?.bid_options.length > 2) {
    showBidType.value = 1
  } else if (selectedBid.value?.type === 'goal' || selectedBid.value?.type === 'total') {
    showBidType.value = 2
  } else {
    bidIndex.value += 1
    changeBid()
  }
  // console.log(showBidType.value)

  bidIndex.value += 1
  return selectedBid.value
}

const emit = defineEmits(['animationEnded'])

const animeTL = ref(anime.timeline())

async function animationEnd($event: any) {
  if (!bidsReplicant) return
  if (!bidsReplicant.value?.value) return

  if (bidIndex.value >= bidsReplicant.value.value.length) {

    emit('animationEnded')
  } else {
    await nextTick()
    changeBid()
  }
}

onMounted(() => {
  bidsReplicant.value = nodecg.Replicant<Bid[]>('bids');

  NodeCG.waitForReplicants(bidsReplicant.value).then(() => {
    bidsReplicant.value?.on('change', async (newValue, oldValue) => {
      ready.value = false
      bidsArray.value = []
      bidsArray.value.splice(0, bidsArray.value.length, ...newValue)
      if (newValue.length > 0) {
        if (bidIndex.value > 0) {
          bidIndex.value -= 1

        } else {
          bidIndex.value = 0
        }

        // Espera a que termine la animación antes de cambiar el bid
        if (animeTL.value.completed) {
          selectedBid.value = undefined
          changeBid()  // Solo cambia el bid si la animación ha terminado
        } else {
          // Escucha cuando termine la animación y entonces haz el cambio
          animeTL.value.finished.then(() => {
            selectedBid.value = undefined
            changeBid()
          });
        }

        ready.value = true
      }
      await nextTick()
    });
  });
})
</script>