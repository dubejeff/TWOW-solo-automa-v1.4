<template>
  <div>
    <div>
      <h6 class="fw-bold"><i class="bi bi-2-circle-fill"></i> Fight</h6>
      <button class="log-btn" @click="showCombatLog = true" title="View Battle Log">
        📜
      </button>
      <FightResult />
      <hr class="hr-witcher" />
      <div class="m-1">
        <button class="btn btn-primary btn-sm" @click="nextPhase">Continue</button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showCombatLog" class="log-overlay" @click.self="showCombatLog = false">
        <div class="log-modal">
          <div class="log-header">
            Battle Log
            <button class="log-close-btn" @click="showCombatLog = false">✖</button>
          </div>

          <BattleLog />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useGameStore } from '@/stores/game';

import FightResult from './FightResult.vue';
import BattleLog from './BattleLog.vue';

const gameState = useGameStore();

const showCombatLog = ref(false)

const router = useRouter();
const route = useRoute();

function nextPhase() {
  gameState.validatePhase2()

  if (gameState.gamePlay.endGame) {
    router.push({ name: 'EndOfGame' })
    return
  }

  router.push({
    name: 'DrawGainCards',
    params: route.params
  })
}
</script>

<style>
/* Bouton flottant */
.log-btn {
  position: absolute;

  top: 40px;
  right: 10px;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  background: #222;
  color: #fff;

  border: 1px solid #555;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;
}

.log-btn:hover {
  background: #444;
  transform: scale(1.1);
}
</style>
