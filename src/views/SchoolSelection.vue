<template>
  <div>
    <div class="pb-3 text-center">
      <h2>School Selection</h2>
      <small>Select your school and automa's school</small>
    </div>
    <div class="flex-grow-1 container-fluid py-4">
      <div class="row h-100 align-items-center">

        <!-- LEFT: PLAYER / BOTS -->
        <aside class="col-md-3">
          <div class="list-group">
            <button v-for="player in gameState.players" :key="player.id" class="list-group-item list-group-item-action"
              :class="{ active: activePlayer === player.id }" @click="setPlayer(player.id)">
              <lucide-user v-if="player.type == 'Human'" class="me-2" />
              <lucide-bot v-else class="me-2" />
              {{ player.name }}
              <span class="float-end">
                {{ schoolName(player.school) || '—' }}
              </span>
            </button>
          </div>
        </aside>

        <!-- RIGHT: SCHOOL GRID -->
        <section class="col-md-9">
          <div class="row g-3">
            <SchoolGrid :schools="schools" :selected-ids="gameState.selectedIds" :is-disabled="isDisabled"
              @select="select" />
          </div>
        </section>
      </div>
    </div>
  </div>
  <div class="mt-3">
    <button class="btn btn-primary btn-sm" :disabled="!gameState.isSelectionComplete" @click="prepareMonsters">Continue
      <LucideMoveRight />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { LucideUser, LucideBot, LucideMoveRight } from 'lucide-vue-next'

import SchoolGrid from '@/components/setup/SchoolGrid.vue';

import { useGameStore } from '@/stores/game';
import { useRouter } from 'vue-router';

import { schools } from '@/Enumerates/schools';

const gameState = useGameStore();

const router = useRouter();

const activePlayer = ref(gameState.players[0].id);

const isDisabled = (schoolId) => {
  return gameState.players.some(
    p => p.school === schoolId && p.id !== activePlayer.value
  )
}

const schoolName = (id) =>
  schools.find(c => c.id === id)?.name;

function setPlayer(player) {
  activePlayer.value = player
}

function select(schoolId) {
  gameState.selectSchool(activePlayer.value, schoolId)
}


function prepareMonsters() {
  router.push({
    name: 'PrepareMonsters'
  });

}
</script>

<style>
.list-group-item {
  --bs-list-group-bg: #e8dcc2;
  --bs-list-group-color: #3b2f1e;
  --bs-list-group-border-color: #a9986d;

  font-family: 'IM Fell English SC', serif;
  border-width: 2px;
}

/* Hover */
.list-group-item-action.list-group-item-action:hover {
  --bs-list-group-bg: #d4c4a2;
  --bs-list-group-color: #2e2417;

  background-color: var(--bs-list-group-bg);
}

/* Active / selected */
.list-group-item-action.active {
  --bs-list-group-active-bg: #b58a2c;
  --bs-list-group-active-color: #2c1e00;
  --bs-list-group-active-border-color: #6f5416;

  background-color: var(--bs-list-group-active-bg);
  color: var(--bs-list-group-active-color);
  border-color: var(--bs-list-group-active-border-color);
}

/* Focus (keyboard navigation) */
.list-group-item-action:focus {
  box-shadow: none;
}
</style>
