<template>
  <main class="landing">
    <section class="card">
      <img class="logo" aria-hidden="true" src="../assets/image/logo & colors/fca-logo.jpg" alt="FCA Logo">
      </img>
      <h1 class="title">Refugee Support Program</h1>
      <button class="cta" type="button" @click="emit('register')">Register</button>
    </section>
  </main>
</template>

<script setup>
const emit = defineEmits(["register"]);
</script>

<style scoped>
:global(body) {
  margin: 0;
}

.landing {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #93c83f;
  font-family: "Trebuchet MS", "Segoe UI", Tahoma, sans-serif;
}

.card {
  text-align: center;
  color: #ffffff;
  display: grid;
  gap: 22px;
  align-items: center;
  justify-items: center;
  padding: 12px 24px 28px;
}

.logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #ffffff;
  display: grid;
  place-items: center;
  position: relative;
}

.logo-text {
  display: inline-block;
  padding: 12px 22px;
  background: #93c83f;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 34px;
  border-radius: 6px 18px 6px 18px;
  transform: rotate(-3deg);
}

.title {
  margin: 0;
  font-size: 20px;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.cta {
  background: #ffffff;
  color: #6fb432;
  border: none;
  padding: 12px 70px;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.cta:active {
  transform: translateY(1px);
}

@media (max-width: 520px) {
  .logo {
    width: 120px;
    height: 120px;
  }

  .logo-text {
    font-size: 26px;
    padding: 10px 18px;
  }

  .cta {
    padding: 12px 56px;
  }
}
</style>
