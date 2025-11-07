<template>
  <div class="bg-black min-h-screen text-white w-screen relative right-20">
    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
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
            <div
              class="w-220 h-4 bg-gray-700 rounded-full mt-2 relative overflow-hidden"
            >
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
            <img class="w-12" src="/public/coin.png" alt="" />
            <div>
              <p class="text-xs text-gray-400">Koin</p>
              <p class="text-lg font-bold">1,250</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="(card, index) in cards"
          :key="card.title"
          class="bg-[#1E1E1E] rounded-xl p-6 shadow-lg transition-all duration-500 ease-out cursor-pointer"
          :class="[card.hover, showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          :style="{ transitionDelay: (index * 150) + 'ms' }"
        >
          <a :href="card.link">
            <div class="flex justify-between items-start mb-5">
              <img
                :src="card.icon"
                :class="card.imgClass"
                alt=""
              />
              <img class="w-9 relative right-2 bottom-" src="/public/arrow-icon.png" alt="" />
            </div>
            <h3 :class="card.textClass" class="text-xl font-semibold text-white relative top-">
              {{ card.title }}
            </h3>
          </a>
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
          icon: '/public/planner-icon.png',
          link: '/planner',
          hover: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:scale-[1.02]',
          imgClass: 'px-16 py-4 w-194 relative top-',
          textClass: 'px-18 relative bottom-12 ',
        },
        {
          title: 'Edukasi',
          icon: '/public/Edukasi-icon.png',
          link: '/edukasi',
          hover: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:scale-[1.02]',
          imgClass: 'w-200 py-4',
          textClass: 'relative bottom-13 left-23',
        },
        {
          title: 'Investasi',
          icon: '/public/investasi-icon.png',
          link: '/investasi',
          hover: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02]',
          imgClass: 'relative left-15',
          textClass: 'relative bottom-8 left-21',
        },
        {
          title: 'Rewards',
          icon: '/public/reward-icon.png',
          link: '/rewards',
          hover: 'hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] hover:scale-[1.02]',
          imgClass: 'relative top-7 left-6',
          textClass: 'relative left-22',
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
<<<<<<< Updated upstream
=======

<style scoped>
/* Animasi bounce lembut saat card muncul */
div[class*="translate-y-0"] {
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% {
    transform: translateY(10px);
    opacity: 0.6;
  }
  60% {
    transform: translateY(-5px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}
</style>
>>>>>>> Stashed changes
