import Edukasi from '@/views/Edukasi.vue'
import Home from '@/views/Home.vue'
import Planner from '@/views/Planner.vue'
import Rewards from '@/views/Rewards.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/planner', component: Planner },
    { path: '/rewards', component: Rewards },
    { path: '/edukasi', component: Edukasi },
  ],
})

export default router
