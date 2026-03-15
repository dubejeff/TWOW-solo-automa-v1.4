<template>
  <div>
    <div class="phase-block">
      <div class="phase-action">Confirm your destination</div>
      <div class="location-display m-1" @click="showSelector = true">

        <div class="location-icon-wrapper">
          <img :src="getLocationImage(selectedLocation.type)" class="location-icon" />

          <span class="location-id-overlay">
            {{ selectedLocation.id }}
          </span>
        </div>

        <div class="location-info">
          <div class="location-name">
            {{ selectedLocation.name }}
          </div>

          <div class="location-hint">
            Tap to select
          </div>
        </div>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-action">
        Movement actions
      </div>
      <div class="phase-buttons">
        <button class="btn btn-primary btn-sm mt-2 m-1" @click="showPoker = true">
          Poker
        </button>
        <button class="btn btn-primary btn-sm mt-2 m-1" @click="showTrail = true">
          Trail Token
        </button>
        <button v-if="gameState.modules.includeMonsterWeaknessTokens" class="btn btn-primary btn-sm mt-2 m-1">
          Weakness Token
        </button>
      </div>
      <div class="phase-hint">
        Available movement actions
      </div>
    </div>
  </div>

  <LocationSelectorModal v-if="showSelector" @select="selectLocation" @close="showSelector = false" />

  <PokerOverlay v-if="showPoker" @close="showPoker = false" />

  <TrailTokenOverlay v-if="showTrail" @close="showTrail = false" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { locations } from '@/Enumerates/locations';
import LocationSelectorModal from './LocationSelectorModal.vue';
import PokerOverlay from './PokerOverlay.vue';
import TrailTokenOverlay from './TrailTokenOverlay.vue';
import { getLocationImage } from '@/utils/assets';
import { useGameStore } from '@/stores/game';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const selectedLocation = ref(locations[currentPlayer.value.currentLocation]);

const showSelector = ref(false);

function selectLocation(location) {
  selectedLocation.value = location;
  currentPlayer.value.nextLocation = location.id;
  showSelector.value = false;
}

const showPoker = ref(false);

const showTrail = ref(false);

</script>

<style>
.location-display {
  display: flex;
  align-items: center;

  padding: 8px 10px;

  background:
    linear-gradient(145deg, #1a1a1a, #0b0b0b);

  border: 1px solid #2f2f2f;
  border-radius: 10px;

  cursor: pointer;

  transition: all 0.15s ease;
}

.location-display:hover {
  border-color: #c9b26a;
  box-shadow: 0 0 10px rgba(201, 178, 106, 0.25);
}

.location-icon-wrapper {
  position: relative;

  width: 52px;
  height: 52px;

  border-radius: 50%;

  background:
    radial-gradient(circle at 30% 30%, #3a3a3a, #111);

  flex-shrink: 0;

  box-shadow:
    inset 0 0 6px rgba(255, 255, 255, 0.05),
    inset 0 0 12px rgba(0, 0, 0, 0.9);
}

.location-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.9;
}

/* Numéro centré */
.location-id-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(1px);

  font-family: "Cinzel", serif;
  font-size: 25px;
  font-weight: 700;

  color: #f5e6b3;

  text-shadow:
    0 0 4px rgba(0, 0, 0, 0.9),
    0 0 6px rgba(201, 178, 106, 0.6);

  pointer-events: none;
}

/* Texte droite */
.location-info {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.location-name {
  font-family: "Cinzel", serif;
  font-size: 16px;
  color: #e6d9a2;

  letter-spacing: 0.6px;

  margin-bottom: 2px;
}


/* Tap to change subtil */
.location-hint {
  font-size: 10px;

  color: rgba(201, 178, 106, 0.28);

  letter-spacing: 0.8px;

  text-transform: uppercase;
}
</style>
