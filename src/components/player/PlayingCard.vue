<template>
  <div class="dice-visual">
    <component :is="diceIcon" class="dice-icon" />
  </div>
</template>

<script setup>
import * as Icons from 'lucide-vue-next';
import { computed } from 'vue';


const props = defineProps({
  card: Object
})

const diceIcon = computed(() => {
  return Icons[`Dice${props.card.value}`] || Icons.Dice1;
});
</script>

<style>
.dice-visual {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #d6c48a;

  filter: drop-shadow(0 0 6px rgba(201, 178, 106, 0.6));

  opacity: 0.9;
  transform: scale(1.15);
}

.dice-icon {
  width: 24px;
  height: 24px;

  color: #d6c48a;

  filter: drop-shadow(0 0 4px rgba(201, 178, 106, 0.4));
}
</style>
