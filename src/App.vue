<script setup></script>

<template>
  <div class="container-fluid mt-2 mb-2 app-wrapper">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style scoped>
.app-wrapper {
  margin: 0 auto;
  padding: 1 rem;
}

@media (min-width: 1200px) {
  .app-wrapper {
    max-width: 1400px;
  }
}
</style>
