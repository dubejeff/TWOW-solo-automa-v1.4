<template>
  <div class="witcher-modal-backdrop" @click.self="$emit('close')">
    <div class="witcher-modal">

      <div class="witcher-modal-title">
        Choose Location
      </div>

      <div class="witcher-location-grid">
        <button v-for="location in locations" :key="location.id" class="witcher-location-btn"
          @click="$emit('select', location)">
          {{ location.id }}
        </button>
      </div>

      <div class="witcher-modal-footer">
        <button class="witcher-cancel-btn" @click="$emit('close')">
          Cancel
        </button>
      </div>

    </div>
  </div>
</template>


<script setup>
import { locations } from '@/Enumerates/locations';
</script>

<style>
.witcher-modal-backdrop {
  position: fixed;
  inset: 0;

  background:
    radial-gradient(circle at center,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.92));

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;

  animation: fadeIn 0.18s ease-out;
}

.witcher-modal {
  width: 90%;
  max-width: 320px;

  background:
    linear-gradient(145deg, #1a1a1a, #0b0b0b);

  border: 1px solid #3a3a3a;
  border-radius: 10px;

  padding: 14px;

  box-shadow:
    0 0 30px rgba(0, 0, 0, 0.9),
    0 0 12px rgba(201, 178, 106, 0.25);

  animation: modalAppear 0.18s ease-out;
}

.witcher-modal-title {
  text-align: center;

  font-family: "Cinzel", serif;
  font-size: 18px;
  letter-spacing: 1px;

  color: #d6c48a;

  margin-bottom: 10px;

  text-shadow: 0 0 6px rgba(201, 178, 106, 0.4);
}

.witcher-location-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  margin: 10px 0;
}

.witcher-location-btn {
  aspect-ratio: 1 / 1;

  border-radius: 50%;
  border: 1px solid #2f2f2f;

  background:
    radial-gradient(circle at 30% 30%, #3a3a3a, #111);

  color: #d6c48a;

  font-family: "Cinzel", serif;
  font-size: 14px;

  box-shadow:
    inset 0 0 6px rgba(255, 255, 255, 0.05),
    inset 0 0 10px rgba(0, 0, 0, 0.9),
    0 2px 5px rgba(0, 0, 0, 0.8);

  transition: all 0.12s ease;
}

.witcher-location-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    inset 0 0 10px rgba(201, 178, 106, 0.25),
    0 4px 10px rgba(0, 0, 0, 0.9);
}

.witcher-location-btn:active {
  transform: scale(0.92);
}

.witcher-cancel-btn {
  width: 100%;

  background: none;
  border: 1px solid #2f2f2f;
  border-radius: 6px;

  padding: 6px;

  color: #888;

  font-family: "Cinzel", serif;
}

@keyframes modalAppear {
  from {
    transform: scale(0.96);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
