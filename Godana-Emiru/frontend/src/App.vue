<script setup>
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import RegistrationForm from './components/RegistrationForm.vue'

// default route state: true means Landing Page shows first
const isLandingVisible = ref(true)

const showForm = () => {
  isLandingVisible.value = false
}
</script>

<template>
  <main>
    <Transition name="fade" mode="out-in">
      <LandingPage 
        v-if="isLandingVisible" 
        @start-registration="showForm" 
      />
      
      <RegistrationForm v-else />
    </Transition>
  </main>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* Smooth transition between landing and form */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>