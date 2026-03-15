<template>
  <div>
    <div>
      Choose your Target:
    </div>
    <div class="row">
      <div class="col" v-for="(target, index) in opponentList" :key="index">{{ target.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { monsters } from '@/Enumerates/Monsters';

const gameState = useGameStore();

const opponentList = computed(() => {
  let opponentList = [];
  for (let i = 1; i < gameState.players.length; i++) {
    opponentList.push(gameState.players[i]);
  }
  for (let i = 0; i < gameState.gamePlay.currentMonsters.length; i++) {
    opponentList.push(monsters.find(m => m.id === gameState.gamePlay.currentMonsters[i]))
  }
  return opponentList;
})

const emit = defineEmits(['change-panel']);
</script>
