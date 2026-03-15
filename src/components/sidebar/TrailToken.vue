<template>
  <img :src="getLocationImage(trailType)" alt="Trail" class="trail-icon-2" />
</template>

<script setup>
import { computed } from 'vue';
import { getLocationImage } from '@/utils/assets';

const props = defineProps({
  trailLocation: Object
})

const trailType = computed(() => {
  return props.trailLocation.type;
})
</script>

<style>
.trail-icon-2 {
  display: inline-block;
  vertical-align: middle;

  width: 30px;
  height: auto;
  object-fit: contain;

  padding-left: 8px;
  filter: drop-shadow(0 0 6px rgba(201, 178, 106, 0.5));
}
</style>
