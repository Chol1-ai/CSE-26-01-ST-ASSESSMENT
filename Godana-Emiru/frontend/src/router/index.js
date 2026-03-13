import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'landing',
    component: LandingPage 
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationForm
  }
  ],
  
})

export default router
