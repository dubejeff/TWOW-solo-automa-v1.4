<template>
  <div class="battle-header mt-3">
    ⚔️ Combat Result
  </div>
  <div class="battle-result" v-if="combatResult === 'Lost'">
    {{ loser?.player.name }} lost to {{ winner?.player.name }}
  </div>
  <div class="battle-result" v-else-if="combatResult === 'Draw'">
    {{ loser?.player.name }} is driven away!
  </div>
  <div class="battle-result" v-else>
    {{ winner?.player.name }} defeated {{ loser?.player.name }}
  </div>
  <div class="battle-section rewards">
    <div class="section-title">Rewards</div>
    <ul>
      <li v-if="winner?.player.type === 'Human' && combatResult != 'Lost' && !isWitcherFight">Gain 2 Gold</li>
      <li v-if="winner?.player.type === 'Human' && isWitcherFight">Gain {{ goldWon }} gold. </li>
      <li v-if="combatResult == 'Lost' && winner?.player.type === 'Monster'">Take 1 Trail Token matching the Monster's
        terrain
      </li>
      <li v-if="loser?.player.type === 'Human' && combatResult != 'Win'">Add a 0-cost Action Card to your discard Pile
      </li>
      <li v-if="combatResult === 'Win'">+1 Trophy</li>
    </ul>
  </div>
  <div class="battle-section penalties" v-if="winner?.player.type === 'Human' && winnerIsCurrentPlayer">
    <div class="section-title">Consequences</div>
    <ul>
      <li>Fatigue</li>
    </ul>
  </div>
  <div class="battle-section cleanup" v-if="isVsMonster">
    <div class="section-title">Board Updates</div>
    <ul>
      <li v-if="combatResult === 'Win' && loser.player.type === 'Monster'">Discard <strong>{{
        nextLocation?.type }}
          Trail</strong></li>
      <li v-if="combatResult !== 'Lost'">Spawn {{ nextMonster?.name }} <span class="monster-level">Lv {{
        nextMonster.level
          }}</span> → <span class="witcher-badge">{{ nextLocation.id
          }}</span> {{
            nextLocation.name }}</li>
      <li v-if="combatResult === 'Draw'">Spawn Monster same level</li>
    </ul>
  </div>
</template>>

<script setup>
import { computed } from 'vue'
import { locationsById } from '@/Enumerates/locations';
import { monstersById } from '@/Enumerates/Monsters';
import { useGameStore } from '@/stores/game'

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const winner = computed(() => {
  return gameState.currentFight.result?.winner
})

const loser = computed(() => {
  return gameState.currentFight.result?.loser
})

const winnerIsCurrentPlayer = computed(() => {
  if (winner.value?.player.id === gameState.currentPlayer.id) return true

  return false;
})

const isWitcherFight = computed(() => {
  if (winner.value?.type === 'Monster' || loser.value?.type === 'Monster') return false

  return true
})

const goldWon = computed(() => {
  if (loser.value?.type === 'Monster') return 2

  return 4 - loser.value?.player.trophies.length
})
const isVsMonster = computed(() => {
  if (winner.value?.player.type === 'Monster' || loser.value?.player.type === 'Monster') return true

  return false
})
const combatResult = computed(() => {
  return winner.value?.player.id === currentPlayer.value.id ? 'Win' : 'Lost';
})

const nextLocation = computed(() => {
  const location = locationsById[gameState.currentFight.nextTrailLocation.id]
  return location
})

const nextMonster = computed(() => {
  const monster = monstersById[gameState.currentFight.nextMonster]
  return monster
})
</script>
