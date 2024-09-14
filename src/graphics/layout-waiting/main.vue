<template>
  <div>
    <div class="main-container">
      <div class="logo-total-container">
        <div class="logo-container">
          <div id="logo-sre-agra-container">
            <img id="sre" src="./sre.png" alt="" />
            <!-- <img id="agrafem" src="../_misc/images/agrafem_borde.png" alt="" /> -->
          </div>
        </div>
        <div class="total-container" v-if="totalDonatedReplicant">
          <h1 class="total-amount">{{ totalDonatedReplicant.data ? currencyFormat(totalDonatedReplicant.data) : '$0' }}
          </h1>
        </div>
      </div>
      <div class="submain-container">
        <div class="chart-container">
          <Charts></Charts>
        </div>
        <div class="prizes-container">
          <Prizes></Prizes>
        </div>
        <div class="runs-container">
          <NextRuns></NextRuns>
        </div>
      </div>
    </div>
    <div class="div-line"></div>
    <!-- <BotBar :wait="true"></BotBar> -->
  </div>
</template>

<script lang="ts" setup>
import { currencyFormat } from '@sre-frontend-layout/dashboard/_misc/helpers'
import { useReplicant } from 'nodecg-vue-composable';

const totalDonatedReplicant = useReplicant<number>('totalDonated', 'sre-frontend-layout');
</script>