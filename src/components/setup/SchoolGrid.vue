<template>
  <div class="row g-3">
    <div v-for="school in schools" :key="school.id" class="col-6 col-md-4 col-lg-3">

      <SchoolCard :school="school" :selected="selectedIds.includes(school.id)" :disabled="isDisabled(school.id)"
        @select="onSelect" />
    </div>
  </div>
</template>

<script setup>
import SchoolCard from './SchoolCard.vue';

defineProps({
  schools: Array,
  selectedIds: Array,
  isDisabled: Function
})

const emit = defineEmits(['select'])
const onSelect = (id) => emit('select', id)
</script>
