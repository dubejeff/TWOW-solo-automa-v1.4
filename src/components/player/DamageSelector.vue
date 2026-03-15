<template>
  <div class="phase-block">
    <div class="damage-label">{{ label }}: <button class="damage-btn" @click="decrease">−</button> <span
        class="damage-value">{{ value }}</span><button class="damage-btn" @click="increase">+</button> <button
        class="confirm-btn" @click="confirm">✔ Confirm</button> <button v-if="showKnockedOutButton" class="confirm-btn"
        @click="knockedOut">💀
        Knocked Out</button></div>
    <div class="damage-controls">



    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  label: { type: String, defaul: 'You forgot the label' },
  showKnockedOutButton: { type: Boolean, default: false },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 99 },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'knockedOut'])

const value = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  value.value = val
})

function increase() {
  if (value.value < props.max) {
    value.value++
    emit('update:modelValue', value.value)
  }
}

function decrease() {
  if (value.value > props.min) {
    value.value--
    emit('update:modelValue', value.value)
  }
}

function confirm() {
  emit('confirm', value.value)
}

function knockedOut() {
  emit('knockedOut')
}
</script>

<style scoped>
.damage-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #111;
  border: 1px solid #D4A847;
  padding: 8px;
  border-radius: 6px;
  width: fit-content;
  font-family: 'IM Fell English SC', serif;
  color: #f0e6d2;
}

.damage-label {
  font-size: 1rem;
  font-weight: 500;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 12px;
}

.damage-value {
  display: inline-block;
  font-weight: 600;
  font-size: 1rem;
  color: #D4A847;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 2px 6px;
  min-width: 36px;
  text-align: center;
}

.damage-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.damage-btn {
  width: 32px;
  min-width: 28px;
  height: 32px;
  font-size: 0.95rem;
  padding: 2px 8px;
  background: #222;
  color: #ccc;
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.damage-btn:hover {
  background: #333;
  border-color: #aaa;
  transform: scale(1.1);
}

.confirm-btn {
  background: transparent;
  border: 1px solid #D4A847;
  color: #D4A847;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.confirm-btn:hover {
  background: #e6c75f;
}
</style>
