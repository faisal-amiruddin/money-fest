<template>
  <div class="min-h-screen text-white p-6 py-35">
    <!-- Header -->
    <BackButton />

    <div class="flex justify-between items-center py-20">
      <!-- Title -->
      <h1 class="text-3xl font-bold">Rewards dan Voucher</h1>

      <!-- Coin Balance -->
      <div class="flex items-center space-x-2">
        <img class="w-8" src="/public/coin.png" alt="Coin Icon" />
        <span class="text-xl font-semibold">1.250</span>
      </div>
    </div>

    <!-- Voucher Section Title -->
    <h2 class="text-xl font-semibold mb-6">Voucher Diskon Tersedia</h2>

    <!-- Infinite Carousel -->
    <div class="relative w-full mb-9 overflow-visible ">
      <div
        ref="carousel"
        class="flex space-x-4 overflow-x-auto  no-scrollbar scroll-smooth snap-x snap-mandatory"
        @scroll="handleScroll"
      >
        <!-- Clone terakhir di awal -->
        <img
          :src="vouchers[vouchers.length - 1]"
          class="carousel-item snap-start flex-shrink-0 w-80 rounded-xl"
          alt=""
        />

        <!-- Gambar Asli -->
        <img
          v-for="(img, i) in vouchers"
          :key="i"
          :src="img"
          class="carousel-item snap-start flex-shrink-0 w-80 rounded-xl transition-transform duration-300 hover:scale-105 hover:z-10"
          alt="voucher image"
        />

        <!-- Clone pertama di akhir -->
        <img
          :src="vouchers[0]"
          class="carousel-item snap-start flex-shrink-0 w-80 rounded-xl"
          alt=""
        />
      </div>

      <!-- Indicators -->
      <div class="flex justify-center mt-6 space-x-2">
        <div
          v-for="(img, i) in vouchers.length"
          :key="i"
          :class="[
            'w-2.5 h-2.5 rounded-full transition-all duration-300',
            activeIndex === i ? 'bg-white scale-125' : 'bg-gray-500 scale-100',
          ]"
        ></div>
      </div>
    </div>

    <!-- Exchange Button -->
    <div class="mt-12 flex justify-center">
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-colors"
      >
        <span>Tukar Koin Sekarang</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";
import { ref, onMounted } from "vue";

const vouchers = [
  "/public/voucher1.png",
  "/public/voucher2.png",
  "/public/voucher3.png",
  "/public/voucher4.png",
];

const carousel = ref(null);
const activeIndex = ref(0);
let isAdjusting = false; // cegah bug geter saat scroll diubah manual

const handleScroll = () => {
  const container = carousel.value;
  const itemWidth = container.children[0].offsetWidth + 16; // lebar item + gap
  const scrollLeft = container.scrollLeft;
  const totalWidth = itemWidth * (vouchers.length + 2); // clone depan & belakang

  if (isAdjusting) return; // cegah looping geter
  isAdjusting = true;

  // Update indikator
  let index = Math.round(scrollLeft / itemWidth) - 1;
  if (index < 0) index = vouchers.length - 1;
  if (index >= vouchers.length) index = 0;
  activeIndex.value = index;

  // Looping tanpa "mental"
  if (scrollLeft <= 0) {
    container.scrollLeft = itemWidth * vouchers.length;
  } else if (scrollLeft >= totalWidth - itemWidth) {
    container.scrollLeft = itemWidth;
  }

  // Sedikit delay biar smooth
  setTimeout(() => {
    isAdjusting = false;
  }, 100);
};

onMounted(() => {
  // Mulai dari gambar pertama (bukan clone)
  const firstItem = carousel.value.children[0];
  carousel.value.scrollLeft = firstItem.offsetWidth + 16;
});
</script>

<style scoped>
/* Hilangkan scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Hover voucher biar gak kepotong */
.carousel-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-origin: center;
}
.carousel-item:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  z-index: 10;
}
</style>
