<template>
  <div class="bg-black min-h-screen text-white">
 

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <!-- Welcome Message -->
      <h2 class="text-2xl font-bold mb-6">Welcome Back, Naval!</h2>
      
      <!-- XP & Level Progress -->
      <div class="bg-gray-900 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div>
            <p class="text-sm text-gray-400">XP: <span class="text-green-400 font-semibold">75%</span></p>
            <div class="w-160 h-3 bg-gray-700 rounded-full mt-2">
              <div class="h-full bg-green-500 rounded-full" style="width: 75%"></div>
            </div>
          </div>
          <div class="text-sm text-gray-400 relative bottom-2 right-40">Lv 5. Pejuang Finansial</div>
        </div>
        
        <div class="flex items-center space-x-2 relative right-20">
          <div class="w-px h-16 bg-gray-700 relative right-8"></div>
          <div class="flex items-center space-x-2">
            <img class="w-12" src="/public/coin.png" alt="">
            <div>
              <p class="text-xs text-gray-400">Koin</p>
              <p class="text-lg font-bold">1,250</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Planner Card -->
        <div class="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
          <div class="flex justify-between items-start mb-4">
            <img src="/public/planner-icon.png" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M7 17l5-5 5 5"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold">Planner</h3>
        </div>

        <!-- Edukasi Card -->
        <div class="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
          <div class="flex justify-between items-start mb-4">
            <img src="/public/Edukasi-icon.png" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M7 17l5-5 5 5"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold">Edukasi</h3>
        </div>

        <!-- Investasi Card -->
        <div class="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
          <div class="flex justify-between items-start mb-4">
            <img src="/public/investasi-icon.png" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M7 17l5-5 5 5"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold">Investasi</h3>
        </div>

        <!-- Rewards Card -->
        <div class="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer">
          <div class="flex justify-between items-start mb-4">
            <img src="/public/reward-icon.png" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
              <path d="M7 17l5-5 5 5"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold">Rewards</h3>
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
      // You can add any reactive data here if needed
    }
  },
  methods: {
    // Add methods here if needed
  }
}
</script>
