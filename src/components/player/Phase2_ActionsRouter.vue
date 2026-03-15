<template>
  <component :is="panel" />
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

import BotMeditateFightExplore from './BotMeditateFightExplore.vue'
import HumanFightMeditateExplore from './HumanChoice.vue'

const gameState = useGameStore()

const panel = computed(() => {
  return gameState.currentPlayer.type === 'Human'
    ? HumanFightMeditateExplore
    : BotMeditateFightExplore
})
</script>
