<template>
  <div>
    <div class="phase-subtitle">
      Select an action:
    </div>
    <div class="phase-option" @click="meditate">
      <span class="phase-icon icon-meditate icon-lg"></span>
      <div class="phase-content">
        <div class="phase-title"> Meditate</div>
        <ul class="phase-hint">
          <li>Requires highest position (5th) on an attribute track</li>
          <li>Matching Attribute Trophy must be available</li>
          <li>No identical Trophy already owned</li>
        </ul>
      </div>
    </div>
    <div v-if="!gameState.isCurrentPlayerInSchoolLocation">
      <div class="phase-option" @click="fightWitcher(witcher.id)"
        v-for="witcher in gameState.getWitcherAtSameLocationRewrite()" :key="witcher.id">
        <span class="phase-icon icon-witcher icon-lg"></span>
        <div class="phase-content">
          <div class="phase-title"> Fight {{ witcher.name }} Lv {{ witcher.level }}</div>
          <div class="small mt-3">
            <ul class="phase-hint">
              <li>Cannot fight a Witcher you played Dice Poker with this turn.</li>
              <li>Cannot fight a Witcher on School locations or Closed Tavern locations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="phase-option" @click="fightMonster" v-if="monsterId !== null">
      <span class="phase-icon icon-monster icon-lg"></span>
      <div class="phase-content">
        <div class="phase-title">Fight {{ monster.name }}</div>
      </div>
    </div>

    <div class="phase-option" @click="nextPhase">
      <span class="phase-icon icon-compass icon-lg"></span>
      <div class="phase-content">
        <div class="phase-title">Explore (table action)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { useGameStore } from '@/stores/game';
import { monstersById } from '@/Enumerates/Monsters';

const gameState = useGameStore();

const router = useRouter();
const route = useRoute();

const monsterId = computed(() => {
  const location = gameState.gamePlay.locations.find((l) => l.id === gameState.currentPlayer.nextLocation)
  const monsterId = location ? location.monster : null
  return monsterId
})

const monster = computed(() => {
  if (monsterId.value === null) return ''

  const monster = monstersById[monsterId.value]

  return monster
})

function meditate() {
  router.push({
    name: 'Meditate',
    params: route.params
  });
}

function fightWitcher(id) {
  gameState.startFight(false, id)
  router.push({
    name: 'FightWitcher',
    params: route.params
  });

}

function fightMonster() {
  gameState.startFight(true, monsterId.value)
  router.push({
    name: 'FightMonster',
    params: route.params
  });

}

function nextPhase() {
  router.push({
    name: 'DrawGainCards',
    params: route.params
  });
}
</script>
