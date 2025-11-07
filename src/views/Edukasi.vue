<template>
  <div class=" min-h-screen text-white p-6 py-33">
    <!-- Header -->
    <div class="flex items-center justify-between mb-10 animate-slide-left">
      <button @click="$router.back()" class="flex items-center text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Kembali
      </button>
      
      <div class="bg-[#1E1E1E] bg-opacity-30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
        Lv. 5 Pejuang Finansial
      </div>
    </div>

    <!-- Main Title -->
    <h1 class="text-5xl font-bold mb-10 animate-slide-left">Edukasi</h1>

    <!-- Learning Path Section -->
    <h2 class="text-xl font-semibold mb-4 animate-slide-left">Jalur Belajar</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <!-- Financial Fundamentals Card -->
      <div class="bg-gradient-to-br from-red-400 to-orange-400 rounded-xl p-6 flex flex-col justify-between h-100 cursor-pointer hover:opacity-55 transition-opacity opacity-0 animate-slide-up"
       style="animation-delay: 0.1s">
        <div class="flex flex-col items-center py-3">
          <div class="w-45 h-45">
            <img src="/public/tabungan-icon.png" alt="">
          </div>
          <h3 class="text-black font-bold text-center text-4xl">Financial <br> Fundamentals</h3>
        </div>
        <div class="flex items-center justify-center p-4">
    <!-- Progress Indicator -->
    <div class="bg-red-300 h-12 rounded-full px-15 py-3 flex items-center space-x-4">
      <!-- White Circle -->
      <div class="w-10 h-9 bg-white rounded-full relative right-10"></div>   
      <!-- Percentage Text -->
      <span class="text-white text-3xl font-bold">75%</span>
    </div>
  </div>
      </div>

      <!-- Investasi & Kekayaan Card -->
      <div class="bg-gradient-to-br from-green-400 to-teal-400 rounded-xl p-6 flex flex-col justify-between h-100 cursor-pointer hover:opacity-55 transition-opacity opacity-0 animate-slide-up"
       style="animation-delay: 0.3s">
        <div class="flex flex-col items-center py-1">
          <div class="w-50 h-50">
            <img src="/public/invest-icon.png" alt="">
          </div>
          <h3 class="text-black font-bold text-center text-4xl relative bottom-5">Investasi & <br> Kekayaan</h3>
        </div>
        <div class="bg-green-300 h-12 w-60 rounded-full px-15 py-3 flex items-center space-x-4 relative left-15">
      <!-- White Circle -->
      <div class="w-10 h-9 bg-white rounded-full relative right-10"></div>   
      <!-- Percentage Text -->
      <span class="text-white text-3xl font-bold">75%</span>
        </div>
      </div>

      <!-- Akademi Financial Card -->
      <div class="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl p-6 flex flex-col justify-between h-100 cursor-pointer hover:opacity-55 transition-opacity opacity-0 animate-slide-up"
       style="animation-delay: 0.5s">
        <div class="flex flex-col items-center py-1">
          <div class="w-50 h-50 ">
            <img src="/public/akademi-icon.png" alt="">
          </div>
          <h3 class="text-black font-bold text-center text-4xl relative bottom-5">Akademi <br> Financial</h3>
        </div>
        <div class="bg-pink-300 h-12 w-60 rounded-full px-15 py-3 flex items-center space-x-4 relative left-15">
      <!-- White Circle -->
      <div class="w-10 h-9 bg-white rounded-full relative right-10"></div>   
      <!-- Percentage Text -->
      <span class="text-white text-3xl font-bold">75%</span>
    </div>
      </div>
    </div>

    <!-- Challenge Section -->
    <h2 class="text-xl font-semibold mb-6">Challenge</h2>
    
    <div class="bg-gray-900 rounded-xl p-6 mb-12">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold">Kuis Mingguan</h3>
          <p class="text-gray-400 mt-1">Uji pengetahuan Anda minggu ini.</p>
        </div>
        <img class="w-10 h-10" src="/public/trophy.png" alt="">
      </div>
      
      <div class="mb-4">
        <div class="w-full h-4 bg-gray-700 rounded-full">
          <div class="h-full bg-green-500 rounded-full" style="width: 40%"></div>
        </div>
        <div class="text-xs text-white-400 mt-1 relative bottom-5 left-95">4 kuis terjawab</div>
      </div>
      
      <button class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors">
        Mulai Kuis
      </button>
    </div>

    <!-- Popular Categories Section -->
    <h2 class="text-xl font-semibold mb-4">Kategori Populer</h2>
    
    <div class="flex flex-wrap gap-3 mb-8">
      <button v-for="category in categories" :key="category" 
        class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors">
        {{ category }}
      </button>
    </div>

    <!-- Latest Materials Section -->
    <h2 class="text-xl font-semibold mb-6">Materi Terbaru</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Material 1 -->
      <div class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
        <img src="/public/akademi-certified.png" alt="Akademi Certified Financial Planner" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-semibold">Akademi Certified Financial Planner</h3>
        </div>
      </div>

      <!-- Material 2 -->
      <div class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
        <img src="/public/anti-fomo.png.png" alt="Kelas Anti Fomo dan Frugal Life" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-semibold">Kelas Anti Fomo dan Frugal Life</h3>
        </div>
      </div>

      <!-- Material 3 -->
      <div class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
        <img src="/public/invest.png" alt="Invest For Gen Z" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="font-semibold">Invest For Gen Z</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edukasi',
  data() {
    return {
      categories: ['Saham', 'Manajemen', 'Trading', 'Psikologi']
    }
  },
  methods: {
    // Add methods here if needed
  }
}
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(-40px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 1.0s ease-out forwards;
}

.animate-slide-left {
  animation: slideLeft 0.8s ease-out forwards;
}
</style>