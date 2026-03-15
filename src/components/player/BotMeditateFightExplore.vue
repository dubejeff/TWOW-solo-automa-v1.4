<template>
  <div class="action-text">
    <component :is="currentPanel" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import BotFightResult from './BotFightResult.vue';
import BotExplore from './BotExplore.vue';
import BotMeditate from './BotMeditate.vue';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentPanel = computed(() => {
  if (currentPlayer.value.phase2.action === 'Meditate') return BotMeditate
  if (currentPlayer.value.phase2.action === 'Fight Monster') return BotFightResult
  return BotExplore
})
</script>
