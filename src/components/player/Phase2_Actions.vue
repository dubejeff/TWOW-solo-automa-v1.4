<template>
  <div>
    <h6 class="fw-bold"><i class="bi bi-2-circle-fill"></i> Fight, Meditate or Explore</h6>
    <!--<component :is="currentPanel" />-->

    <router-view />

    <div v-if="currentPlayer.type !== 'Human'">
      <hr class="hr-witcher" />
      <div class="m-1">
        <button class="btn btn-primary btn-sm" @click="nextPhase">Continue</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGameStore } from '@/stores/game';

const router = useRouter();
const route = useRoute();

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

function nextPhase() {
  router.push({
    name: 'DrawGainCards',
    params: route.params
  });
  gameState.validatePhase2()
}
</script>
