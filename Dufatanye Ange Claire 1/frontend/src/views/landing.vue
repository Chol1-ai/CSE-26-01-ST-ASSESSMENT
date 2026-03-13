<script setup>
import { useRouter } from 'vue-router'
import logo from '../assets/fca-logo.jpg'
import '../assets/pale_green.png'

const router = useRouter()

const goRegister = () => {
  router.push("/register")
}
</script>

<template>
  <div class="landing-container">
    <div class="overlay">
      <div class="content text-center">
        <!-- Use imported logo -->
        <img :src="logo" alt="FCA Logo" class="mb-4" style="width:150px; height:150px;" />

        <h1 class="title">Refugee Support Program</h1>

        <button class="btn btn-success btn-lg mt-4" @click="goRegister">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  height: 100vh;
  background-image: url("../assets/pale_green.png"); 
  background-size: cover;
  background-position: center;
}

.overlay {
  height: 100%;
  width: 100%;
  background: rgb(153, 204, 50);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: white;
  font-size: 48px;
  font-weight: bold;
}

.btn {
  padding: 12px 30px;
  font-size: 18px;
}
</style>