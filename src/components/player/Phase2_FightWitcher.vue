<template>
  <div>
    <div>
      <button class="log-btn" @click="showCombatLog = true" title="View Battle Log">
        📜
      </button>
      <div v-if="engine?.state === 'WAIT_HUMAN_ATTACK'">
        <div>You attack</div>
        <DamageSelector v-model="damageToApply" label="Confirm the damage done" :max="20" @confirm="onConfirmDamage" />
      </div>
      <div v-else>
        <div>You defend</div>
        <div class="combat-preview">
          <div v-for="(log, index) in lastOpponentLog" :key="index" class="combat-line" :class="log.type">
            <span class="icon">{{ log.icon }}</span>
            {{ log.text }}
          </div>
        </div>
        <DamageSelector v-model="damageToApply" label="Confirm your counter" :showKnockedOutButton="true" :max="20"
          @confirm="onConfirmDamage" @knockedOut="onKnockedOut" />
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
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGameStore } from '@/stores/game';
import DamageSelector from './DamageSelector.vue';
import BattleLog from './BattleLog.vue';

const gameState = useGameStore();
const router = useRouter();
const route = useRoute();

const showCombatLog = ref(false)
const damageToApply = ref(0)

const engine = computed(() => {
  return gameState.currentFight.engine
})

const lastOpponentLog = computed(() => {
  if (!engine.value) return []

  const logs = engine.value.combatLog
  if (logs.length === 0) return []

  const result = []

  for (let i = logs.length - 1; i >= 0; i--) {
    const log = logs[i]

    if (log.type === 'attack' && i < logs.length - 1) break

    result.unshift(log)
  }

  return result
})

function onConfirmDamage() {
  if (engine.value.state === 'WAIT_HUMAN_ATTACK') {
    gameState.humanNextStrike(damageToApply.value)
  } else if (engine.value.state === 'WAIT_HUMAN_DEFENSE') {
    gameState.humanDefense(damageToApply.value)
  }

  damageToApply.value = 0
  goToResult()
}

function goToResult() {
  const engine = gameState.currentFight.engine
  if (engine === null) return false

  if (engine.isFinished()) {
    router.push({
      name: 'FightResult',
      params: route.params
    });
  }
}

function onKnockedOut() {
  gameState.humanKnockedOut()
  goToResult()
}
</script>

<style>
input[type=range] {
  width: 100%;
  accent-color: #D4A847;
}

.combat-preview {
  margin-top: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #d4a84f;
  border-radius: 6px;
}

.icon {
  margin-right: 6px;
  opacity: 0.8;
}

.combat-line {
  font-size: 16px;
  opacity: 0.9;
  margin: 2px 0;
}

.combat-line.attack {
  margin: 10px 0 6px;
  color: #ffb4b4;
  font-weight: bold;
}

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
