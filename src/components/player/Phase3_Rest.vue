<template>
  <div>
    <h6 class="fw-bold"><i class="bi bi-3-circle-fill"></i> Draw and Gain Cards</h6>
    <component :is="currentPanel" />
    <hr class="hr-witcher" />
    <div class="m-1">
      <button class="btn btn-primary btn-sm" @click="nextPlayer">Next Player</button>
    </div>
  </div>
</template>>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/game';
import BotTrashMarketCard from './BotTrashMarketCard.vue';
import HumanDrawGainCards from './HumanDrawGainCards.vue';

const router = useRouter();

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentPanel = computed(() => {
  return currentPlayer.value.type === 'Human' ? HumanDrawGainCards : BotTrashMarketCard;
})

function nextPlayer() {
  gameState.nextTurn();
  const id = gameState.gamePlay.turnOrder[gameState.gamePlay.currentPlayer];
  router.push({
    name: 'MovementActions',
    params: { roundId: gameState.gamePlay.currentRound, playerId: id }
  });
}
</script>
