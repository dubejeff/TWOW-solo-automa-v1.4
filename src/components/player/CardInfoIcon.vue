<template>
  <span class="card-info-icon" @click="open">
    <i class="bi bi-info-circle-fill"></i>
  </span>
  <CardPreviewModal v-if="show" @close="show = false" />
</template>
<script setup>
import { ref } from "vue";
import CardPreviewModal from "./CardPreviewModal.vue";

const show = ref(false);

function open() {
  show.value = true;
}
</script>

<style scoped>
.card-info-icon {
  cursor: pointer;
  margin-left: 8px;
  font-size: 18px;

  color: #c9b26a;

  text-shadow: 0 0 6px rgba(201, 178, 106, 0.6);

  transition: transform 0.2s ease, color 0.2s ease;
}

.card-info-icon:hover {
  transform: scale(1.2);
  color: #f5e6b3;
}
</style>
