<template>
  <div class="text-white pt-35">
    <!-- Main Content -->
    <main class="container mx-auto px-8 py-8">
      <!-- Welcome Message -->
      <h2 class="text-2xl font-bold mb-6">Welcome Back, Naval!</h2>

      <!-- XP & Level Progress -->
      <div class="bg-[#1E1E1E] rounded-xl p-6 mb-8 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="relative left-4">
            <p class="text-sm text-gray-400">
              XP:
              <span class="text-green-400 font-semibold">{{ progress }}%</span>
            </p>

            <!-- Progress bar -->
            <div class="w-220 h-4 bg-gray-700 rounded-full mt-2 relative overflow-hidden">
              <div
                class="h-full bg-green-500 rounded-full transition-all duration-[1500ms] ease-out"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="text-sm text-gray-400 relative bottom-2 right-36">
            Lv 5. Pejuang Finansial
          </div>
        </div>

        <div class="flex items-center space-x-2 relative right-20">
          <div class="w-px h-16 bg-gray-700 relative right-8"></div>
          <div class="flex items-center space-x-2">
            <img class="w-12" src="/coin.png" alt="" />
            <div>
              <p class="text-xs text-gray-400">Koin</p>
              <p class="text-lg font-bold">1,250</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(card, index) in cards"
          :key="card.title"
          :style="{ transitionDelay: index * 120 + 'ms', animationDelay: index * 120 + 'ms' }"
          class="bg-[#1E1E1E] rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-500 ease-out opacity-0 translate-y-6 hover:scale-[1.03]"
          :class="[showCards ? 'opacity-100 translate-y-0 animate-bounceIn' : '', card.glow]"
        >
          <router-link :to="card.link" class="block relative text-center">
            <i class="fa-solid fa-arrow-up-right-from-square text-xl absolute top-0 right-0"></i>
            <i :class="card.icon" class="text-8xl mb-4 text-[#22C55E]"></i>
            <h3 class="text-lg font-semibold mt-2">{{ card.title }}</h3>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MoneyVestDashboard',
  data() {
    return {
      progress: 0,
      showCards: false,
      cards: [
        {
          title: 'Planner',
          link: '/planner',
          icon: 'fa-solid fa-calendar-check',
          glow: 'hover:shadow-pink-500/40',
        },
        {
          title: 'Edukasi',
          link: '/edukasi',
          icon: 'fa-solid fa-graduation-cap',
          glow: 'hover:shadow-blue-500/40',
        },
        {
          title: 'Investasi',
          link: '/investasi',
          icon: 'fa-solid fa-chart-line',
          glow: 'hover:shadow-green-500/40',
        },
        {
          title: 'Rewards',
          link: '/rewards',
          icon: 'fa-solid fa-gift',
          glow: 'hover:shadow-yellow-500/40',
        },
      ],
    }
  },
  mounted() {
    // Animasi progress bar
    setTimeout(() => {
      this.progress = 75
    }, 300)

    // Animasi muncul per card
    setTimeout(() => {
      this.showCards = true
    }, 500)
  },
}
</script>

<style>
@keyframes bounceIn {
  0% {
    transform: translateY(12px);
    opacity: 0;
  }
  60% {
    transform: translateY(-4px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}

.animate-bounceIn {
  animation: bounceIn 0.6s ease-out;
}
</style>
