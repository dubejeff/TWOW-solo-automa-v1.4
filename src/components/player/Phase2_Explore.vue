<template>
  <div>
    <h6 class="fw-bold"><i class="bi bi-2-circle-fill"></i> Meditate</h6>
    <BotExplore />
    <hr class="hr-witcher" />
    <div class="m-1">
      <button class="btn btn-primary btn-sm" @click="nextPhase">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useGameStore } from '@/stores/game';

import BotExplore from './BotExplore.vue';

const gameState = useGameStore();

const router = useRouter();
const route = useRoute();

function nextPhase() {
  gameState.validatePhase2()
  router.push({
    name: 'DrawGainCards',
    params: route.params
  });
}
</script>
