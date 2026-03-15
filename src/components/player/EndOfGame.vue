<template>
  <div>
    <div class="end-screen">

      <div class="victory-card">

        <div class="victory-icon">🏆</div>

        <h1 class="victory-title">
          {{ gameState.currentPlayer?.name }} won the Game!
        </h1>

        <p class="victory-subtitle">
          A new legend of the {{ schoolName }} school.
        </p>
        <div class="m-1">
          <button class="btn btn-primary btn-sm" @click="resetGame">End Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/game';
import { schoolsById } from '@/Enumerates/schools';

const gameState = useGameStore();

const router = useRouter();

const schoolName = computed(() => {
  if (!gameState.currentPlayer) return ''
  const school = schoolsById[gameState.currentPlayer.school]
  return school.name
})
function resetGame() {
  router.push({ name: 'AppHome' })
  gameState.resetGame();
}
</script>

<style>
.end-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.victory-card {
  text-align: center;
  padding: 40px;
  border: 1px solid #8b6b2c;
  border-radius: 10px;
  background: #0c0c0c;
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.3);
}

.victory-icon {
  font-size: 50px;
  margin-bottom: 10px;
}

.victory-title {
  color: #d4af37;
  font-size: 28px;
  letter-spacing: 1px;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #d4af37;
  }

  to {
    text-shadow: 0 0 20px #d4af37;
  }
}

.victory-subtitle {
  color: #bbb;
  margin-bottom: 25px;
}
</style>
