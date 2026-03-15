<template>
  <div v-if="initFight">
    <div class="game-action-box">
      <div class="action-label">
        Fight {{ who }}
      </div>
      <div class="action-text">
        <h6>Confirm Target</h6>
        <div v-if="who == 'Monster'">
          <div class="row">
            <div class="col">
              <button class="btn btn-primary btn-sm w-100" @click="target = forestMonster">{{ forestMonster.name
                }} - Lvl {{ forestMonster.level }}</button>
            </div>
            <div class="col">
              <button class="btn btn-primary btn-sm w-100" @click="target = waterMonster">{{ waterMonster.name
                }} - Lvl {{ waterMonster.level }}</button>
            </div>
            <div class="col">
              <button class="btn btn-primary btn-sm w-100" @click="target = mountainMonster">{{
                mountainMonster.name
                }} - Lvl {{ mountainMonster.level }}</button>
            </div>
            <div class="mt-3">
              <p>Prepare the Monster Life Pool. <span v-if="gameState.modules.includeMonsterWeaknessTokens">The Monster
                  loses
                  ONE card from its Life Pool for each Weakness Token matching the terrain of the Monster.</span></p>
              <div class="form-check form-switch mt-1">
                <input class="form-check-input" type="checkbox" role="switch" id="strikeFirstSwitch"
                  v-model="strikeFirst">
                <label class="form-check-label" for="strikeFirstSwitch">Strike First <span v-if="who == 'Monster'">-
                    Matching Location Trail Token</span></label>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          Fighting Witcher
        </div>
      </div>
    </div>
    <div class="mt-3">
      <button class="btn btn-primary" :disabled="target === null" @click="startFight">Start Fight</button>
    </div>
  </div>
  <div v-else>
    <div class="combat-result-wrapper">
      <bot-fight-result v-if="combatResult" :winner="combatResult.winner" :loser="combatResult.loser"
        :combatResult="combatResult.result" />

      <button class="log-btn" @click="showCombatLog = true" title="View Battle Log">
        📜
      </button>
    </div>

    <button class="btn btn-primary mt-3" @click="emit('change-panel', 'botTrashMarketCard')">Continue</button>
  </div>

  <Teleport to="body">
    <div v-if="showCombatLog" class="log-overlay" @click.self="showCombatLog = false">
      <div class="combat-modal">
        <div class="log-header">
          Battle Log
          <button @click="showCombatLog = false">✖</button>
        </div>
        <div class="log-content">
          <div v-for="(log, index) in gameState.currentFight.combatLog" :key="index" class="log-entry"
            :class="[log.align, log.type]">
            <div class="log-bubble">
              <span>{{ log.icon }}</span>
              {{ log.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';

import BotFightResult from './BotFightResult.vue';

import { useGameStore } from '@/stores/game';
import { shuffle } from '@/utils/array';
import { monsters } from '@/Enumerates/Monsters';
import { MonsterFights } from '@/Enumerates/MonsterFight';
import { attackingOrder, setCombatVariables, autoCombat, resolveAutomaAttack, combatLog } from '@/Domain/combat';

defineProps({
  who: String
})

const gameState = useGameStore();

const initFight = ref(true);
const strikeFirst = ref(false);
const showCombatLog = ref(false)

const attacker = computed(() => {
  return attackingOrder[0];
})

const defender = computed(() => {
  return attackingOrder[1];
})

const combatResult = computed(() => {
  if (!attacker.value?.challengeDeck) return null

  const result = attacker.value.challengeDeck.length === 0 && defender.value.challengeDeck.length === 1 ? 'Draw' : defender.value.challengeDeck.length === 0 ? 'Win' : 'Lost';

  console.log(result)
  return {
    winner: result === 'Lost' ? defender.value : attacker.value,
    loser: result === 'Lost' ? attacker.value : defender.value,
    result: result
  }
})
const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const forestMonster = computed(() => {
  return monsters.find(m => m.id === gameState.gamePlay.currentMonsters[0])
})
const waterMonster = computed(() => {
  return monsters.find(m => m.id === gameState.gamePlay.currentMonsters[1])
})
const mountainMonster = computed(() => {
  return monsters.find(m => m.id === gameState.gamePlay.currentMonsters[2])
})

const target = ref(null);

function startFight() {
  // Init current player ChallengeDeck
  currentPlayer.value.challengeDeck.push(...currentPlayer.value.challengeDiscard);
  currentPlayer.value.challengeDeck = shuffle(currentPlayer.value.challengeDeck);
  currentPlayer.value.challengeDiscard = [];

  // init useMonsterSpecialAttack from store, if the automa Strike First, the attacker, the defender
  setCombatVariables(gameState.modules.includeMonsterWeaknessTokens, currentPlayer.value, target.value);

  // Change initFight to show CombatLog
  initFight.value = false;

  // 1. If the defender is a player, the Automa Attack.
  // 2. If the Attacker is
  if (attackingOrder[1].type == 'Human') {
    resolveAutomaAttack(0);
  } else if (attackingOrder[0].type == 'Human') {
    // Wait for Player Attack input
  } else {
    autoCombat(strikeFirst.value);
  }
}

function playerAttack(indx, damage) {
}

function playerDefend() {
}

const emit = defineEmits(['change-panel']);
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.combat-result-wrapper {
  position: relative;
  /* IMPORTANT */
}
</style>
