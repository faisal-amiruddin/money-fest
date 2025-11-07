<template>
  <div class=" min-h-screen text-white p-6">
    <!-- Header -->
    <div class="flex items-center mb-8">
      <button @click="$router.back()" class="flex items-center text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Kembali
      </button>
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-bold mb-8">Rewards dan Voucher</h1>

    <!-- Coin Balance -->
    <div class="flex items-center justify-end mb-8">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-500">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12m-6-6h12" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span class="text-xl font-semibold">1.250</span>
      </div>
    </div>

    <!-- Voucher Section Title -->
    <h2 class="text-xl font-semibold mb-6">Voucher Diskon Tersedia</h2>

    <!-- Voucher Cards Carousel -->
    <div class="relative">
      <!-- Voucher Cards -->
      <div class="flex space-x-4 overflow-x-auto pb-6">
        <!-- Ultra Voucher -->
        <img src="/public/voucher1.png" alt="">

        <!-- MAP Gift Voucher -->
         <img src="/public/voucher2.png" alt=""></img>

        <!-- Bonus Voucher -->
         <img src="/public/voucher3.png" alt="">

        <!-- Promo Mudik Murah -->
         <img src="/public/voucher4.png" alt="">
      </div>

      <!-- Carousel Indicators -->
      <div class="flex justify-center mt-6 space-x-2">
        <div v-for="i in 6" :key="i" :class="['w-2 h-2 rounded-full', i === 2 ? 'bg-white' : 'bg-gray-400']"></div>
      </div>
    </div>

    <!-- Exchange Button -->
    <div class="mt-12 flex justify-center">
      <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-colors">
        <span>Tukar Koin Sekarang</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RewardsVoucher',
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