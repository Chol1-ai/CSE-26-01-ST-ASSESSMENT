<script setup>
import { ref } from "vue";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";

const view = ref("home");
</script>

<template>
  <Home v-if="view === 'home'" @register="view = 'register'" />
  <Register v-else @back="view = 'home'" />
</template>

<style scoped></style>

<!-- <script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template> -->
