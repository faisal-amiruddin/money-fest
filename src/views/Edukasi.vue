<template>
  <div class="text-white py-35">

    <!-- Header -->
    <div class="flex items-center justify-between mb-10 animate-slide-left">
      <BackButton />

      <div class="bg-[#1E1E1E] bg-opacity-30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
        Lv. 5 Pejuang Finansial
      </div>
    </div>

    <!-- Main Title -->
    <h1 class="text-5xl font-bold mb-10 animate-slide-left">Edukasi</h1>

    <!-- Learning Path Section -->
    <h2 class="text-xl font-semibold mb-4 animate-slide-left">Jalur Belajar</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <!-- CARD TEMPLATE (Reused 3x) -->
      <div
        class="bg-gradient-to-br from-red-400 to-orange-400 rounded-xl p-6 flex flex-col items-center justify-between cursor-pointer hover:opacity-70 transition-opacity opacity-0 animate-slide-up"
        style="animation-delay: 0.1s">
        <img src="/tabungan-icon.png" class="w-24 h-24 mb-4" alt="">
        <h3 class="text-black font-bold text-center text-3xl leading-tight">Financial<br>Fundamentals</h3>

        <div class="mt-6 flex justify-center w-full">
          <div class="bg-red-300 rounded-full flex items-center gap-3 px-6 py-2">
            <div class="w-6 h-6 bg-white rounded-full"></div>
            <span class="text-white text-xl font-bold">75%</span>
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-green-400 to-teal-400 rounded-xl p-6 flex flex-col items-center justify-between cursor-pointer hover:opacity-70 transition-opacity opacity-0 animate-slide-up"
        style="animation-delay: 0.3s">
        <img src="/invest-icon.png" class="w-24 h-24 mb-4" alt="">
        <h3 class="text-black font-bold text-center text-3xl leading-tight">Investasi &<br>Kekayaan</h3>

        <div class="mt-6 flex justify-center w-full">
          <div class="bg-green-300 rounded-full flex items-center gap-3 px-6 py-2">
            <div class="w-6 h-6 bg-white rounded-full"></div>
            <span class="text-white text-xl font-bold">75%</span>
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl p-6 flex flex-col items-center justify-between cursor-pointer hover:opacity-70 transition-opacity opacity-0 animate-slide-up"
        style="animation-delay: 0.5s">
        <img src="/akademi-icon.png" class="w-24 h-24 mb-4" alt="">
        <h3 class="text-black font-bold text-center text-3xl leading-tight">Akademi<br>Financial</h3>

        <div class="mt-6 flex justify-center w-full">
          <div class="bg-pink-300 rounded-full flex items-center gap-3 px-6 py-2">
            <div class="w-6 h-6 bg-white rounded-full"></div>
            <span class="text-white text-xl font-bold">75%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Challenge Section -->
    <h2 class="text-xl font-semibold mb-6">Challenge</h2>

    <div class="bg-[#1E1E1E] rounded-xl p-6 mb-12">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold">Kuis Mingguan</h3>
          <p class="text-gray-400 mt-1">Uji pengetahuan Anda minggu ini.</p>
        </div>
        <img class="w-10 h-10" src="/trophy.png" alt="">
      </div>

      <div class="mb-4">
        <div class="w-full h-5 bg-gray-700 rounded-full">
          <div class="h-full bg-green-500 rounded-full" style="width: 40%">
            <div class="text-xs text-white mt-1 text-right px-2 pt-1">4 kuis terjawab</div>
          </div>
        </div>
      </div>

      <button class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors">
        Mulai Kuis
      </button>
    </div>

    <!-- Popular Categories -->
    <h2 class="text-xl font-semibold mb-4">Kategori Populer</h2>
    <div class="flex flex-wrap gap-3 mb-8">
      <button v-for="category in categories" :key="category"
        class="px-4 py-2 bg-[#1E1E1E] hover:bg-gray-700 rounded-full text-sm transition-colors">
        {{ category }}
      </button>
    </div>

    <!-- Latest Materials -->
    <h2 class="text-xl font-semibold mb-6">Materi Terbaru</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
        <img src="/akademi-certified.png" class="w-full h-48 object-cover" />
        <div class="p-4 font-semibold">Akademi Certified Financial Planner</div>
      </div>

      <div class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
        <img src="/anti-fomo.png" class="w-full h-48 object-cover" />
        <div class="p-4 font-semibold">Kelas Anti Fomo dan Frugal Life</div>
      </div>

      <div class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
        <img src="/invest.png" class="w-full h-48 object-cover" />
        <div class="p-4 font-semibold">Invest For Gen Z</div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';

export default {
  name: "Edukasi",
  components: { BackButton },
  data() {
    return {
      categories: ["Saham", "Manajemen", "Trading", "Psikologi"]
    };
  }
};
</script>

<style scoped>
html, body {
  overflow-x: hidden;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideLeft {
  from { transform: translateX(-40px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-slide-up { animation: slideUp 1s ease-out forwards; }
.animate-slide-left { animation: slideLeft 0.8s ease-out forwards; }
</style>
