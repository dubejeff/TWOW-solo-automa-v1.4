<template>
  <div class="poker-overlay-backdrop" @click.self="close">

    <div class="poker-overlay">

      <div class="poker-title">Poker</div>

      <!-- BEFORE REVEAL -->
      <template v-if="!revealed">

        <div class="poker-hint">
          Ready to reveal the hand to beat?
        </div>

        <button class="witcher-btn" @click="revealHand">
          Reveal Hand
        </button>

      </template>

      <!-- AFTER REVEAL -->
      <template v-else>

        <div class="poker-subtitle">Hand to Beat</div>

        <div class="poker-hand">
          <PlayingCard v-for="card in pokerHand" :key="card.id" :card="card" />
        </div>

        <div class="poker-actions">
          <button class="witcher-btn-secondary" :disabled="redrawUsed" @click="newHand">
            New Hand
          </button>

          <button class="witcher-btn" @click="close">
            Continue
          </button>
        </div>

      </template>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { rollD6, redrawDice } from '@/utils/PokerGame';
import PlayingCard from './PlayingCard.vue';

const revealed = ref(false);
const redrawUsed = ref(false);
const pokerHand = ref(generateHand());

function revealHand() {
  revealed.value = true;
}

function newHand() {
  pokerHand.value = redrawDice(pokerHand.value);
  redrawUsed.value = true;
}

function close() {
  revealed.value = false;
  redrawUsed.value = false;

  pokerHand.value = generateHand();

  emit('close');
}

const emit = defineEmits(['close']);

/* Mock */
function generateHand() {
  return [
    { id: 0, value: rollD6() },
    { id: 1, value: rollD6() },
    { id: 2, value: rollD6() },
    { id: 3, value: rollD6() },
    { id: 4, value: rollD6() },
  ];
}


</script>

<style>
.poker-overlay-backdrop {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;

  animation: fadeIn 0.15s ease-out;
}

.poker-overlay {
  width: 92%;
  max-width: 420px;

  background:
    linear-gradient(145deg, #1a1a1a, #0b0b0b);

  border: 1px solid #3a3a3a;
  border-radius: 10px;

  padding: 18px;

  text-align: center;

  box-shadow:
    0 0 25px rgba(0, 0, 0, 0.9),
    0 0 10px rgba(201, 178, 106, 0.25);

  animation: modalAppear 0.15s ease-out;
}

.poker-title {
  font-family: "Cinzel", serif;
  font-size: 20px;
  color: #c9b26a;
}

.poker-subtitle {
  font-size: 12px;
  opacity: 0.5;
  margin-bottom: 10px;
}

.poker-hand {
  display: flex;
  justify-content: center;
  gap: 6px;

  animation: handReveal 0.25s ease-out;
}

@keyframes handReveal {
  from {
    transform: translateY(6px) scale(0.95);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.poker-actions {
  margin-top: 10px;

  display: flex;
  justify-content: center;
  gap: 10px;
}

.witcher-btn {
  background:
    linear-gradient(145deg, #3a3a3a, #1a1a1a);

  border: 1px solid #c9b26a;
  border-radius: 6px;

  padding: 8px 18px;

  font-family: "Cinzel", serif;
  font-size: 14px;
  letter-spacing: 0.6px;

  color: #f5e6b3;

  box-shadow:
    inset 0 0 6px rgba(255, 255, 255, 0.1),
    0 0 10px rgba(201, 178, 106, 0.35);

  transition: all 0.12s ease;
}

.witcher-btn:hover {
  box-shadow:
    inset 0 0 8px rgba(255, 215, 120, 0.25),
    0 0 14px rgba(201, 178, 106, 0.6);
}

.witcher-btn:active {
  transform: scale(0.96);
}

.witcher-btn-secondary {
  background: none;

  border: 1px solid #3a3a3a;
  border-radius: 6px;

  padding: 8px 18px;

  font-family: "Cinzel", serif;
  font-size: 14px;

  color: rgba(230, 217, 162, 0.65);

  transition: all 0.12s ease;
}

.witcher-btn-secondary:hover {
  border-color: #c9b26a;
  color: #c9b26a;
}

.witcher-btn-secondary:disabled {
  opacity: 0.35;
  cursor: default;
  filter: grayscale(0.4);
  box-shadow: none;
  color: rgba(230, 217, 162, 0.35);
}

.witcher-btn-secondary:disabled:hover {
  border-color: #3a3a3a;
  color: rgba(230, 217, 162, 0.35);
  box-shadow: none;
  transform: none;
}
</style>
