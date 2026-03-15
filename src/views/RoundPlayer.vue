<template>
  <div class="game-layout">
    <!-- Left Panel -->
    <aside class="player-panel d-none d-lg-block">
      <div v-for="(player, index) in gameState.players.slice(1)" :key="index"
        :class="['automa-card', `automa-${index + 1}`, 'm-1']">
        <div class="player-header">
          {{ player.name }}
          <span class="player-location">
            <MapPin :size="16" class="bar-icon" /> {{ player.currentLocation }}
          </span>
          <span class="player-location">
            <Layers :size="16" class="bar-icon" /> {{ player.actionDeck.length }}
          </span>
          <span class="player-level">Lv {{ player.level }}</span>
          <span class="player-tropht"><lucide-trophy size="15" />{{ 3 - (player?.trophies?.length ?? 0) }}</span>
        </div>
        <div class="attr-row">
          <span><span class="game-icon icon-shield icon-md"></span> {{ player.shield }}</span>
          <span><span class="game-icon icon-combat icon-md"></span> {{ player.combat }}</span>
          <span><span class="game-icon icon-defense icon-md"></span> {{ player.defense }}</span>
          <span><span class="game-icon icon-alchemy icon-md"></span> {{ player.alchemy }}</span>
          <span><span class="game-icon icon-specialty icon-md"></span> {{ player.specialty }}</span>
          <span><span class="game-icon icon-potion icon-md"></span> {{ player.potions }}</span>
          <span><span class="game-icon icon-bomb icon-md"></span> {{ player.bombs }}</span>
        </div>
        <div class="trail-title mt-2">
          <span>Trail tokens</span>
          <TrailToken class="me-1" v-for="trailToken in player.trailTokens" :key="trailToken"
            :trailLocation="trailToken" />
        </div>
      </div>

      <div>
        MONSTERS
        <div class="monster-row" v-for="monster in locationWithMonster" :key="monster.locationId">

          <div class="monster-location">
            <img :src="getLocationImage(monster.locationType)" class="monster-icon" />
            <span class="monster-id">{{ monster.locationId }}</span>
          </div>

          <div class="monster-info">
            <div class="monster-name">{{ monster.monsterName }}</div>
            <div class="monster-location-name">{{ monster.locationName }}</div>
          </div>

          <div class="monster-level">
            Lv {{ monster.monsterLevel }}
          </div>

        </div>
      </div>
    </aside>

    <!-- Mobile Offcanvas -->
    <div class="offcanvas offcanvas-start d-lg-none" tabindex="-1" id="playerPanelMobile">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Player</h5>
        <button class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        Player Panel
      </div>
    </div>

    <!-- Mobile toggle button -->
    <button class="player-bar d-lg-none" :class="{ 'bar-hidden': isPlayerOpen }" data-bs-toggle="offcanvas"
      data-bs-target="#playerPanelMobile">
      <Play :size="16" class="bar-icon" />
      <!-- Rotated text only -->
      <span class="bar-text">PLAYER</span>
    </button>

    <!-- Main Content -->
    <main class="game-content">
      <div>
        <h6 class="fw-bold">
          Round {{ gameState.gamePlay.currentRound }} - {{
            currentPlayer.name }}
          <MapPin :size="16" class="bar-icon" /> {{ currentPlayer.nextLocation }}
        </h6>
        <hr class="hr-witcher" />
      </div>
      <div>
        <div class="game-action-box">
          <div class="info-corner" v-if="currentPlayer.type === 'Automa'">
            <CardInfoIcon />
          </div>
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useGameStore } from '@/stores/game';
import { LucideTrophy } from 'lucide-vue-next'
import { locations } from '@/Enumerates/locations';
import { monsters } from '@/Enumerates/Monsters';
import { getLocationImage } from '@/utils/assets';

/** Lucide Icon */
import { Play, MapPin, Layers } from 'lucide-vue-next'


/** Vue */
import CardInfoIcon from '@/components/player/CardInfoIcon.vue';
import TrailToken from '@/components/sidebar/TrailToken.vue';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const isPlayerOpen = ref(false);
let offcanvasEl = null;

function onShow() {
  isPlayerOpen.value = true
}

function onHidden() {
  isPlayerOpen.value = false
}

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

onMounted(() => {
  offcanvasEl = document.getElementById('playerPanelMobile')
  if (!offcanvasEl) return

  offcanvasEl.addEventListener('show.bs.offcanvas', onShow)
  offcanvasEl.addEventListener('hidden.bs.offcanvas', onHidden)
})

onBeforeUnmount(() => {
  if (!offcanvasEl) return
  offcanvasEl.removeEventListener('show.bs.offcanvas', onShow)
  offcanvasEl.removeEventListener('hidden.bs.offcanvas', onHidden)
})
</script>

<style>
.game-layout {
  display: flex;
  min-height: 100dvh;
  align-items: stretch;
}

.automa-card {
  border-left: 3px solid #a9986d;
  padding: 8px;
  border-bottom: 1px solid rgba(200, 180, 120, 0.2);
}

.automa-1 {
  border-left-color: #c9a54b;
}

.automa-2 {
  border-left-color: #6aa3d9;
}

.automa-3 {
  border-left-color: #c96a6a;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
}

.attr-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 6px;
}

.attr-row span {
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 1.6rem;
  font-weight: 600;

  color: #D4A847;
}

.attr-row .game-icon {
  opacity: 0.85;
}

.trail-title {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a9986d;
  opacity: 0.7;
}

/* Desktop panel: make it smaller */
.player-panel {
  width: 400px;
  min-width: 400px;
  background: #0e0d0d;
  border-right: 3px solid #a9986d;
  box-shadow: inset -10px 0 25px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-bar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100dvh;
  width: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 8px;
  background: #a9986d;

  border: 2px solid #a9986d;
  border-left: none;
  border-radius: 0 8px 8px 0;

  cursor: pointer;
  z-index: 1050;

  transition: transform 0.25s cubic-bezier(.2, .9, .2, 1.2), opacity 0.25s ease;
  transform: translateX(0);
  opacity: 1;
}

.player-bar.bar-hidden {
  transform: translateX(-110%);
  /* part à gauche hors écran */
  opacity: 0;
  pointer-events: none;
}

/* Triangle stays normal */
.bar-icon {
  flex: 0 0 auto;
}

/* ONLY text is rotated */
.bar-text {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: rotate(-90deg);
  transform-origin: center;

  font-family: 'IM Fell English SC', serif;
  letter-spacing: 0.18em;
  font-size: 0.65rem;
  white-space: nowrap;
  pointer-events: none;
}

/* On desktop, no mobile bar -> remove margin */
@media (min-width: 992px) {
  .game-content {
    margin-left: 0;
  }
}


.fame {
  color: #D4A847;
  font-size: 1.8rem;
  font-weight: 600;
}

.game-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding: 12px;
  margin-left: 20px;
  min-width: 0;
}

.game-content>div {
  flex-shrink: 0;
}

.game-action-box {
  flex: 1;
  overflow: auto;
}

.monster-row {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 6px 6px;

  border-bottom: 1px solid rgba(200, 180, 120, 0.15);
}

.monster-info {
  flex: 1;
}

.monster-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  opacity: 0.9;
}

.monster-id {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.2rem;
  font-weight: 700;

  color: #f5e6b3;

  text-shadow: 0 0 4px black;
}

.monster-name {
  font-size: 1.1rem;
}

.monster-location {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.monster-location-name {
  font-size: 0.9rem;
  opacity: 0.6;
}

.monster-level {
  font-size: 0.85rem;
  color: #D4A847;
  white-space: nowrap;
}
</style>
