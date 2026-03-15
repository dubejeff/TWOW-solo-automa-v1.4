<template>
  <div class="phase-block mt-3">
    <div class="phase-action">
      Trash Market Card(s)
    </div>
    <span class="m-1" v-for="(trashedCard, index) in currentCard.trashedCards" :key="index">
      <span class="game-icon icon-xl" :class="getTrashIconClass(trashedCard)"></span>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentCard = computed(() => {
  return currentPlayer.value.currentAction;
})

function getTrashIconClass(cardId) {
  return `icon-trashcard${cardId}`;
}
</script>
