<template>
  <div>
    <h6 class="fw-bold"><i class="bi bi-1-circle-fill"></i> Movement & Actions</h6>
    <component :is="currentPanel" />
    <hr class="hr-witcher" />
    <div class="m-1">
      <button class="btn btn-primary btn-sm" @click="nextPhase">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGameStore } from '@/stores/game';

/* VUE */
import BotMovement from './BotMovement.vue';
import HumanMovement from './HumanMovement.vue';


const gameState = useGameStore();

const router = useRouter();
const route = useRoute();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentPanel = computed(() => {
  return currentPlayer.value.type === 'Human' ? HumanMovement : BotMovement;
})

function getNextRoute() {
  if (currentPlayer.value.type === 'Human') {
    return 'Choice'
  }

  const actionRoutes = {
    Meditate: 'Meditate',
    'Fight Monster': 'FightResult',
    Explore: 'Explore'
  }

  const action = currentPlayer.value.phase2.action

  if (action === 'Fight Witcher') {
    const player = gameState.players.find(
      p => p.id === currentPlayer.value.phase2.witcherId
    )

    return player.type === 'Human'
      ? 'FightWitcher'
      : 'FightResult'
  }

  return actionRoutes[action]
}

function nextPhase() {
  gameState.preparePhase2()

  router.push({
    name: getNextRoute(),
    params: route.params
  })
}
</script>
