<template>
  <div>
    <button class="log-btn" @click="showCombatLog = true" title="View Battle Log">
      📜
    </button>
    <FightResult />
  </div>

  <Teleport to="body">
    <div v-if="showCombatLog" class="log-overlay" @click.self="showCombatLog = false">
      <div class="log-modal">
        <div class="log-header">
          Battle Log
          <button class="log-close-btn" @click="showCombatLog = false">✖</button>
        </div>

        <BattleLog />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import BattleLog from './BattleLog.vue';
import FightResult from './FightResult.vue';


const showCombatLog = ref(false)

</script>

<style>
/* Bouton flottant */
.log-btn {
  position: absolute;

  top: 40px;
  right: 10px;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  background: #222;
  color: #fff;

  border: 1px solid #555;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;
}

.log-btn:hover {
  background: #444;
  transform: scale(1.1);
}
</style>
