<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <img :src="actionImage(currentCard.image)" alt="Card preview" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { actionImage } from '@/utils/assets';

const gameState = useGameStore();

const currentPlayer = computed(() => {
  return gameState.currentPlayer
})

const currentCard = computed(() => {
  return currentPlayer.value.currentAction;
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  border: 2px solid #c9b26a;
  box-shadow: 0 0 30px rgba(201, 178, 106, 0.6);
  padding: 6px;
  background: #0f0f0f;

  /* Taille max de la carte */
  max-width: 260px;
  border-image: linear-gradient(45deg,
      #c9b26a,
      #8a6f2b) 1;
}

.modal-content img {
  width: 100%;
  height: auto;
  /* 👈 garde le ratio */
  display: block;
}
</style>
