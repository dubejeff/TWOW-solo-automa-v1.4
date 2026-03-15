<template>
  <div>
    <div class="phase-block">
      <div class="phase-action">
        {{ gameState.currentPlayer.name }} meditate for {{ gameState.currentPlayer.phase2.trophyType }}
      </div>
    </div>
    <hr class="hr-witcher" />
    <div class="m-1">
      <button class="btn btn-primary btn-sm" @click="nextPhase">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

import { useGameStore } from '@/stores/game';

const gameState = useGameStore();

const router = useRouter();
const route = useRoute();

function nextPhase() {
  gameState.validatePhase2()

  const routeName = gameState.gamePlay.endGame
    ? 'EndOfGame'
    : 'DrawGainCards'

  router.push({
    name: routeName,
    params: route.params
  })
}
</script>
