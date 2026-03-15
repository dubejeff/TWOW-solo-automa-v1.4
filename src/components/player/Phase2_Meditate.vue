<template>
  <div>
    <h6 class="fw-bold"><i class="bi bi-2-circle-fill"></i> Meditate</h6>
    <component :is="currentPanel" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

import BotMeditate from './BotMeditate.vue';
import HumanMeditate from './HumanMeditate.vue';

import { useGameStore } from '@/stores/game';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentPanel = computed(() => {
  return currentPlayer.value.type === 'Human' ? HumanMeditate : BotMeditate;
})
</script>
