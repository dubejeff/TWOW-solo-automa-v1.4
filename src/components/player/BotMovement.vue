<template>
  <div class="mt-3">
    <div class="action-text">
      The <strong>{{ currentPlayer.name }}</strong> move from {{ fromLocation.name }} to <strong>{{
        nextLocation?.name }}.</strong>
    </div>
    <div class="action-text">
      <span class="witcher-badge">{{ fromLocation.id }}</span> ➜ <span class="witcher-badge">{{ nextLocation?.id
      }}</span>
    </div>
    <div class="mt-3">
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
  </div>

</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { locations } from '@/Enumerates/locations';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentCard = computed(() => {
  return currentPlayer.value.currentAction;
})

const fromLocation = computed(() => {
  return locations.find(l => l.id === currentPlayer.value.currentLocation)
})

const nextLocation = computed(() => {
  return locations.find(l => l.id === currentPlayer.value.nextLocation)
})
</script>

<style>
/* Badge circulaire */
.witcher-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 26px;
  font-family: "Cinzel", "Trajan Pro", serif;
  font-size: 20px;
  margin: 0 6px;

  border-radius: 50%;

  background: radial-gradient(circle at top,
      #3b3b3b,
      #0f0f0f);

  border: 2px solid #c9b26a;

  color: #f5e6b3;
  font-size: 14px;
  font-weight: bold;

  box-shadow:
    0 0 6px rgba(201, 178, 106, 0.4),
    inset 0 0 6px rgba(255, 215, 100, 0.2);

  text-shadow: 0 0 3px rgba(255, 215, 150, 0.6);
}
</style>
