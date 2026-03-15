<template>
  <div v-if="!fight">
    <div class="row mt-1">
      <div class="col">
        <Transition name="slide-fade" mode="out-in">
          <component :is="panels[activePanel]" @change-panel="setActivePanel" @explore="emit('next-player')"
            @fight="setFight" />
        </Transition>
      </div>
    </div>
    <div v-if="activePanel == 'botTrashMarketCard'" class="mt-3">
      <button class="btn btn-primary btn-sm" @click="emit('next-player')">Next Player</button>
    </div>
  </div>
  <BotFightSection :who="fightingWho" v-else />
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '@/stores/game';

import BotMovement from './BotMovement.vue';
import BotActions from './BotActions.vue';
import BotMeditateFightExplore from './BotMeditateFightExplore.vue';
import BotTrashMarketCard from './BotTrashMarketCard.vue';
import BotFightSection from './BotFightSection.vue';

const activePanel = ref('botMovement');
const fight = ref(false);
const fightingWho = ref('');

const gameState = useGameStore();

const panels = {
  botMovement: BotMovement,
  botActions: BotActions,
  botMeditateFightExplore: BotMeditateFightExplore,
  botFight: BotFightSection,
  botTrashMarketCard: BotTrashMarketCard
}

const emit = defineEmits(['change-panel', 'next-player']);

function setActivePanel(panel) {
  if (panel == 'botActions') {
    gameState.applyCurrentPlayerActions();
  }

  activePanel.value = panel;
}

function setFight(who) {
  fight.value = true;
  fightingWho.value = who;
}
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
