<template>
  <div>
    <div class="phase-block">
      <div class="phase-action">Select an available trophy</div>
      <div class="phase-buttons">
        <button class="btn btn-primary btn-sm mt-2 m-1" v-for="(trophy, index) in availableTrophies" :key="index"
          @click="selectTrophy(trophy)">
          <span class="game-icon icon-md" :class="getTrophyIcon(trophy)"></span>
        </button>
      </div>
    </div>
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

const gameState = useGameStore();

const router = useRouter();
const route = useRoute();

const availableTrophies = computed(() => {
  return gameState.getAvailableTrophies();
})

function getTrophyIcon(trophy) {
  const type = typeof trophy === 'string' ? trophy : trophy.type;

  return {
    combat: 'icon-combat',
    defense: 'icon-defense',
    alchemy: 'icon-alchemy',
    specialty: 'icon-specialty'
  }[type] ?? 'icon-default';
}

function selectTrophy(trophy) {
  gameState.setTrophy(trophy)
  router.push({
    name: 'DrawGainCards',
    params: route.params
  });
}
</script>
