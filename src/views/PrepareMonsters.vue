<template>
  <div>
    <div class="pb-3 text-center">
      <h2>Monsters Preparation</h2>
      <small>Prepare the following Monsters and assign their corresponding Location tokens.</small>
    </div>
    <div class="row">
      <div v-for="monster in locationWithMonster" :key="monster.locationId" class="col-lg-4 col-sm-12">
        <div class="card p-2 h-100">
          <div class="card-body">
            <div class="row">
              <div class="col-8">
                <div class="monster-title">
                  {{ monster.monsterName }}
                </div>
                <div class="monster-title">
                  in
                  {{ monster.locationName }}
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="location-icon-wrapper">
                  <img :src="getLocationImage(monster.locationType)" alt="Location" class="location-icon" />

                  <span class="location-id-overlay">
                    {{ monster.locationId }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            Level {{ monster.monsterLevel }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <button class="btn btn-primary btn-sm" @click="startGame">Start Game</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { useRouter } from 'vue-router';

import { monsters } from '@/Enumerates/Monsters';
import { locations } from '@/Enumerates/locations';

const gameState = useGameStore();
const router = useRouter();

const locationWithMonster = computed(() => {
  const monstersArray = [];
  for (let i = 0; i < gameState.gamePlay.locations.length; i++) {
    if (gameState.gamePlay.locations[i].monster != undefined) {
      let monster = monsters.find(m => m.id === gameState.gamePlay.locations[i].monster);
      let location = locations.find(l => l.id === gameState.gamePlay.locations[i].id);
      monstersArray.push(
        {
          locationId: location.id,
          locationType: location.type,
          locationName: location.name,
          monsterId: monster.id,
          monsterName: monster.name,
          monsterLevel: monster.level
        }
      )
    }
  }
  return monstersArray;
})

const locationImages = {
  forest: new URL("../assets/monsters/forest.png", import.meta.url).href,
  mountain: new URL("../assets/monsters/mountain.png", import.meta.url).href,
  water: new URL("../assets/monsters/water.png", import.meta.url).href,
};

function getLocationImage(type) {
  return locationImages[type] ?? locationImages.forest;
}

function startGame() {
  gameState.startGame();
  const id = gameState.gamePlay.turnOrder[gameState.gamePlay.currentPlayer];

  router.push({
    name: 'MovementActions',
    params: { roundId: gameState.gamePlay.currentRound, playerId: id }
  });
}
</script>
<style>
.monster-card {
  background: #f3ecd8;
  color: #3b2f1e;
  border: 2px solid #3d3347;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  /* subtle depth */
  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.25);

  /* paper grain illusion */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.15));
}

.monster-title {
  color: #e6d9a2;
  letter-spacing: 1px;
}

.location-icon-wrapper {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
  min-width: 52px;
}

.location-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;

  filter: drop-shadow(0 0 6px rgba(201, 178, 106, 0.5));
}

/* Numéro par-dessus */
.location-id-overlay {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  font-family: "Cinzel", serif;

  font-size: 25px;
  /* Plus grand */
  font-weight: 700;

  color: #cfcfcf;

  text-shadow:
    1px 1px 2px black,
    0 0 6px rgba(150, 150, 150, 0.4);

  pointer-events: none;

  user-select: none;
  letter-spacing: -1px;
}
</style>
