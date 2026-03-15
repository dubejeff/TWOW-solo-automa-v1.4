<template>
  <div>
    <div>
      Select the fight outcome
    </div>
    <div class="d-flex gap-2 mt-2">
      <button class="btn btn-primary btn-sm" @click="win">Player Defeats the Monster</button>
      <button class="btn btn-primary btn-sm" @click="draw">Player Drives the Monster Away</button>
      <button class="btn btn-primary btn-sm" @click="loss">Player is Defeated</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useGameStore } from '@/stores/game';

const gameState = useGameStore();

const router = useRouter();
const route = useRoute();

function win() {
  gameState.humanDefeatTheMonster()
  router.push({
    name: 'FightResult',
    params: route.params
  });
}

function draw() {
  gameState.humanDrivesTheMonsterAway()
  router.push({
    name: 'FightResult',
    params: route.params
  });
}

function loss() {
  gameState.humanKnockedOut()
  router.push({
    name: 'FightResult',
    params: route.params
  });
}
</script>
