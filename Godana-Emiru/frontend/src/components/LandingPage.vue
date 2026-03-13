<script setup>
// This section must exist, even if it's empty!
defineEmits(['start-registration'])
</script>

<template>
  <div class="landing-container">
    <div class="content-box">
      <div class="logo-circle">
        <img src="../assets/fca-logo.jpg" alt="FCA Logo" class="fca-logo" />
      </div>
      <h1 class="program-name">Refugee Support Program</h1>
      <button @click="$emit('start-registration')" class="landing-register-btn">
        Register
      </button>
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  height: 100vh;
  width: 100vw;
  background-color: #99CC32;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0;
}

.logo-circle {
  background: white;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.fca-logo {
  width: 70%;
  height: auto;
}

.program-name {
  color: white;
  font-family: 'Arial Narrow', 'Agency FB';
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.landing-register-btn {
  background-color: white;
  color: #97C73A;
  border: none;
  padding: 12px 80px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>