<template>
  <div class="combat-log">
    <div class="log-content">
      <div v-for="(log, index) in gameState.currentFight.combatLog" :key="index" class="log-entry"
        :class="[log.align === 0 ? 'left' : 'right', log.type]">
        <div class="log-bubble">
          <span>{{ log.icon }}</span>
          {{ log.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game';

const gameState = useGameStore();
</script>

<style></style>
