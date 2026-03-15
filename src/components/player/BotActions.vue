<template>

  <div>
    <div class="game-action-box">
      <div class="info-corner">
        <CardInfoIcon />
      </div>
      <div class="action-label">
        Actions
      </div>
      <div class="action-text">
        <ul>
          <li v-for="(action, index) in currentCard.actions" :key="index">
            <template v-if="action == 'Combat'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-combat icon-md"></span>
            </template>
            <template v-else-if="action == 'Defense'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-defense icon-md"></span>
              and
              <span class="action-value">+1</span>
              <span class="game-icon icon-shield icon-md"></span>
            </template>
            <template v-else-if="action == 'Alchemy'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-alchemy icon-md"></span>
            </template>
            <template v-else-if="action == 'Specialty'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-specialty icon-md"></span>
            </template>
            <template v-else-if="action == 'Potion'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-potion icon-md"></span>
              (limit of 4)
            </template>
            <template v-else-if="action == 'Bomb'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-bomb icon-md"></span>
              (limit of 4)
            </template>
            <template v-else-if="action == 'Trail'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-trail icon-md"></span>
            </template>
            <template v-else-if="action == 'Lowest'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-lowest icon-md"></span>
              <span class="small">In case of ties, select from the left to right.</span>
            </template>
            <template v-else-if="action == 'Highest'">
              <span class="action-value">+1</span>
              <span class="game-icon icon-highest icon-md"></span>
              <span class="small">In case of ties, select from the left to right.</span>
            </template>
            <template v-else>
              <span class="action-value">+1</span>
              <span class="game-icon icon-dagon icon-md"></span>
              If Dagon is visible already,
              ignore this effect.
            </template>
          </li>
        </ul>
      </div>
    </div>

    <button class="btn btn-primary" @click="emit('change-panel', 'botMeditateFightExplore')">Continue</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import CardInfoIcon from './CardInfoIcon.vue';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentCard = computed(() => {
  return currentPlayer.value.currentAction;
})

const emit = defineEmits(['change-panel']);
</script>
