<template>
  <div class="phase-block">
    <div class="phase-action">
      {{ currentPlayer.name }} explore
    </div>
    <div class="phase-hint"><span class="small">(nothing happen!)</span></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer;
})
</script>
