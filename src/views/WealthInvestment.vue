<template>
  <div class="min-h-screen text-white p-6 py-33">
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
    <h1 class="text-5xl font-bold mb-10 animate-slide-left">Investasi & Kekayaan</h1>
    
    <!-- Materi Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card 1 -->
      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <div class="aspect-video">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/uGzToPCX8nU" title="Apa itu saham" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg">Apa itu saham</h3>
          <p class="text-gray-400 text-sm mt-1">Pengenalan dasar tentang saham dan cara kerjanya di pasar modal</p>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <div class="aspect-video">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/NyeApg42a3A" title="Cara membangun portofolio yang aman" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg">Cara membangun portofolio yang aman</h3>
          <p class="text-gray-400 text-sm mt-1">Strategi diversifikasi untuk meminimalkan risiko investasi</p>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <div class="aspect-video">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/N4L2e7vr6OM" title="Fundamental Analisis" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg">Fundamental Analisis</h3>
          <p class="text-gray-400 text-sm mt-1">Mempelajari kondisi fundamental perusahaan sebelum berinvestasi</p>
        </div>
      </div>
      
      <!-- Card 4 -->
      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <div class="aspect-video">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/0N_iqF770Xc" title="Teknikal Analisis" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg">Teknikal Analisis</h3>
          <p class="text-gray-400 text-sm mt-1">Membaca grafik dan pola pergerakan harga untuk prediksi pasar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WealthInvestment'
};
</script>

<style scoped>
@keyframes slideLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.animate-slide-left { animation: slideLeft 0.8s ease-out forwards; }
</style>