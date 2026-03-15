<template>
  <div>
    <div class="text-center">
      <h2>What is your name?</h2>
      <input class="form-control" type="text" placeholder="Your Name" aria-label="default input example"
        v-model="humanPlayerName">
    </div>
    <hr class="hr-witcher" />
  </div>
  <div class="mt-3">
    <div class="text-center">
      <h2>Module and Expansion Selection</h2>
      <small>Select the modules or expansions you want to include</small>
    </div>
    <div>
      <div class="form-check form-switch switch-success">
        <input class="form-check-input" type="checkbox" role="switch" id="includeMutagensModule"
          v-model="mutagensModule">
        <label class="form-check-label" for="includeMutagensModule">Include Mutagens Module</label>
      </div>
      <div>
        <div class="form-check form-switch switch-success">
          <input class="form-check-input" type="checkbox" role="switch" id="includeBombsModule" v-model="bombsModule">
          <label class="form-check-label" for="includeBombsModule">Include Bombs Module</label>
        </div>
      </div>
      <div>
        <div class="form-check form-switch switch-success">
          <input class="form-check-input" type="checkbox" role="switch" id="includeMonsterWeaknessTokens"
            v-model="monsterWeaknessTokens">
          <label class="form-check-label" for="includeMonsterWeaknessTokens">Include Monster Weakness Tokens</label>
        </div>
      </div>
      <div>
        <div class="form-check form-switch switch-success">
          <input class="form-check-input" type="checkbox" role="switch" id="includeLostMount" v-model="lostMount">
          <label class="form-check-label" for="includeLostMount">Include Lost Mount</label>
        </div>
      </div>
      <div>
        <div class="form-check form-switch switch-success">
          <input class="form-check-input" type="checkbox" role="switch" id="includeSkelligeExpansion"
            v-model="skelligeExpansion">
          <label class="form-check-label" for="includeSkelligeExpansion">Include Skellige Expansion</label>
        </div>
      </div>
      <div>
        <div class="form-check form-switch switch-success">
          <input class="form-check-input" type="checkbox" role="switch" id="includeLegendaryHuntExpansion"
            v-model="legendaryHuntExpansion">
          <label class="form-check-label" for="includeLegendaryHuntExpansion">Include Legendary Hunt Expansion</label>
        </div>
      </div>
    </div>
    <hr class="hr-witcher" />
  </div>
  <div class="mt-3">
    <div class="text-center">
      <h2>Number of Players</h2>
      <small>Select the number of players for the game</small>
    </div>
    <div>
      <div class="row">
        <div class="col-4">
          <input type="radio" class="btn-check" name="options" id="2players" autocomplete="off" :value="2"
            v-model.number="playerCount">
          <label class="btn btn-gold m-1 w-100" for="2players">2 Players</label>
        </div>
        <div class="col-4">
          <input type="radio" class="btn-check" name="options" id="3players" autocomplete="off" :value="3"
            v-model.number="playerCount">
          <label class="btn btn-gold m-1 w-100" for="3players">3 Players</label>
        </div>
        <div class="col-4">
          <input type="radio" class="btn-check" name="options" id="4players" autocomplete="off" :value="4"
            v-model.number="playerCount">
          <label class="btn btn-gold m-1 w-100" for="4players">4 Players</label>
        </div>
      </div>
    </div>
    <hr class="hr-witcher" />
  </div>
  <button class="btn btn-primary btn-sm mt-3" :disabled="playerCount === 0" @click="goToSchoolSelection">
    School Selection >
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useGameStore } from '@/stores/game';

const router = useRouter();

const gameState = useGameStore();

const humanPlayerName = ref('');
const mutagensModule = ref(false);
const bombsModule = ref(false);
const monsterWeaknessTokens = ref(false);
const lostMount = ref(false);
const skelligeExpansion = ref(false);
const legendaryHuntExpansion = ref(false);

const playerCount = ref(0);

function goToSchoolSelection() {
  if (playerCount.value == 0) return

  /** Init Possible Modules in your game */
  gameState.modules.includeMutagens = mutagensModule.value;
  gameState.modules.includeBombs = bombsModule.value;
  gameState.modules.includeMonsterWeaknessTokens = monsterWeaknessTokens.value;
  gameState.modules.includeLostMount = lostMount.value;
  gameState.expansions.includeSkellige = skelligeExpansion.value;
  gameState.expansions.includeLegendaryHunt = legendaryHuntExpansion.value;
  gameState.setup.playerCount = playerCount.value;

  gameState.initGame(humanPlayerName.value);

  router.push('/SchoolSelection');
}
</script>

<style>
.switch-success .form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}

.switch-success .form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.switch-success .form-check-input:disabled:checked {
  background-color: #a3cfbb;
  border-color: #a3cfbb;
}
</style>
