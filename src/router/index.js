import Home from '@/views/Home.vue'
import Investasi from '@/views/Investasi.vue'
import Planner from '@/views/Planner.vue'
import Rewards from '@/views/Rewards.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/planner', component: Planner },
    { path: '/investasi', component: Investasi },
    { path: '/rewards', component: Rewards },
  ],
})

export default router
