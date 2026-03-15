<template>
  <div class="poker-overlay-backdrop" @click.self="close">

    <div class="poker-overlay">

      <div class="poker-title">Trail Token</div>

      <div class="poker-hint">
        Tap each Trail token you collected
        <div class="phase-buttons">
          <button class="m-1 trail-btn" :disabled="hasType('forest')" @click="drawToken('forest')">
            <div class="trail-wrapper">
              <img :src="getLocationImage('forest')" alt="Trail" class="trail-icon" />
              <span v-if="forestToken || previewToken.forest" class="trail-id">
                {{ forestToken?.id || previewToken.forest.id }}
              </span>
            </div>
          </button>
          <button class="m-1 trail-btn" :disabled="hasType('mountain')" @click="drawToken('mountain')">
            <div class="trail-wrapper">
              <img :src="getLocationImage('mountain')" alt="Trail" class="trail-icon" />
              <span v-if="mountainToken || previewToken.mountain" class="trail-id">
                {{ mountainToken?.id || previewToken.mountain.id }}
              </span>
            </div>
          </button>
          <button class="m-1 trail-btn" :disabled="hasType('water')" @click="drawToken('water')">
            <div class="trail-wrapper">
              <img :src="getLocationImage('water')" alt="Trail" class="trail-icon" />
              <span v-if="waterToken || previewToken.water" class="trail-id">
                {{ waterToken?.id || previewToken.water.id }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <div class="poker-actions">
        <button class="btn btn-primary m-1" @click="confirm">
          Confirm
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>

import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { getLocationImage } from '@/utils/assets'

const gameState = useGameStore()


const previewToken = ref({
  forest: null,
  mountain: null,
  water: null
})

function hasType(type) {
  return gameState.currentPlayer.trailTokens
    .some(t => t.type === type)
}

function getPlayerToken(type) {
  return gameState.currentPlayer.trailTokens
    .find(t => t.type === type) || null
}

const forestToken = computed(() => {
  return getPlayerToken('forest')
})

const mountainToken = computed(() => {
  return getPlayerToken('mountain')
})

const waterToken = computed(() => {
  return getPlayerToken('water')
})

function drawToken(type) {
  // Sécurité
  if (hasType(type)) return

  const pool = gameState.currentPlayerDrawTrailToken();

  if (!pool.length) return

  previewToken.value[type] = pool[0]
}

function confirm() {
  if (previewToken.value.forest !== null) gameState.drawToken('forest')
  if (previewToken.value.mountain !== null) gameState.drawToken('mountain')
  if (previewToken.value.water !== null) gameState.drawToken('water')

  emit('close');
}

const emit = defineEmits(['close']);
</script>

<style>
.trail-btn {
  padding: 6px;
  background: none;
  border: none;
  padding: 0;
}

.trail-wrapper {
  position: relative;
  width: 90px;
  display: inline-block;
  width: clamp(50px, 8vw, 90px);
  transition: transform 0.2s ease, filter 0.2s ease;
}

.trail-wrapper:hover {
  transform: translateY(-4px) scale(1.05);
  filter: drop-shadow(0 0 12px rgba(201, 178, 106, 0.6));
}

.trail-wrapper::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(201, 178, 106, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.trail-wrapper:hover::after {
  opacity: 1;
}

.trail-icon {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.trail-id {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: 'Cinzel', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #f5e6b8;

  text-shadow:
    0 1px 0 #000,
    0 0 6px rgba(0, 0, 0, 0.9),
    0 0 12px rgba(0, 0, 0, 0.7);

  pointer-events: none;
}
</style>
