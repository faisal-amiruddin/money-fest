import Edukasi from '@/views/Edukasi.vue'
import FinancialAcademy from '@/views/FinancialAcademy.vue'
import FinancialFundamentals from '@/views/FinancialFundamentals.vue'
import Home from '@/views/Home.vue'
import Investasi from '@/views/Investasi.vue'
import Planner from '@/views/Planner.vue'
import Rewards from '@/views/Rewards.vue'
import WealthInvestment from '@/views/WealthInvestment.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/planner', component: Planner },
    { path: '/investasi', component: Investasi },
    { path: '/rewards', component: Rewards },
    { path: '/edukasi', component: Edukasi },
    { path: '/edukasi/financial-fundamentals', component: FinancialFundamentals },
    { path: '/edukasi/wealth-investment', component: WealthInvestment},
    { path: '/edukasi/financial-academy', component: FinancialAcademy }
  ],
})

export default router
