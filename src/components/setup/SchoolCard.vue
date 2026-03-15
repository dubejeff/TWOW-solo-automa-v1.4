<template>
  <div class="card  text-center" :class="{ disabled }" @click="!disabled && emit('select', school.id)" v-motion
    :initial="{ scale: 1 }" :animate="{ scale: disabled || selected ? 1 : 1 }"
    :hovered="{ scale: disabled || selected ? 1 : 1.06 }" :tapped="{ scale: disabled ? 1 : 0.95 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 20 }">
    <div class="card-body position-relative">
      <lucide-swords v-if="school.name == 'Ciri'" size="30" />
      <img v-else :src="imgUrl" class="school-icon" width="30px" />
      <h6 class="mt-2">{{ school.name }}</h6>

      <span v-if="selected" class="badge bg-success selected-badge">
        Selected
      </span>
    </div>
  </div>
</template>

<script setup>
import { LucideSwords } from 'lucide-vue-next'

const props = defineProps({
  school: Object,
  selected: Boolean,
  disabled: Boolean
})

const imgUrl = new URL(
  `/src/assets/Schools/${props.school.icon}`,
  import.meta.url
).href

const emit = defineEmits(['select'])
</script>

<style scoped>
.selected-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
