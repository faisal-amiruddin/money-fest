<template>
  <div class="min-h-screen text-white p-6 py-35">
    <!-- Header -->
    <BackButton />

    <div class="flex justify-between items-center py-20">
      <h1 class="text-3xl font-bold">Rewards dan Voucher</h1>
      <div class="flex items-center space-x-2">
        <img class="w-8" src="/coin.png" alt="Coin Icon" />
        <span class="text-xl font-semibold">1.250</span>
      </div>
    </div>

    <h2 class="text-xl font-semibold mb-6">Voucher Diskon Tersedia</h2>

    <!-- Carousel -->
    <div class="relative w-full mb-9 overflow-visible">
      <!-- Tombol kiri -->
      <button
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Isi Carousel -->
      <div ref="carousel" class="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth">
        <div
          v-for="(img, i) in vouchers"
          :key="i"
          class="carousel-item flex-shrink-0 w-80 flex justify-center"
        >
          <img
            :src="img"
            alt="voucher"
            class="w-80 rounded-xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <!-- Tombol kanan -->
      <button
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Indikator (5 titik dinamis) -->
    <div class="flex justify-center mt-6 space-x-2">
      <div
        v-for="i in 5"
        :key="i"
        :class="[
          'w-2.5 h-2.5 rounded-full transition-all duration-300',
          getIndicatorClass(i - 1)
        ]"
      ></div>
    </div>

    <!-- Tombol Tukar -->
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
  "/voucher1.png",
  "/voucher2.png",
  "/voucher3.png",
  "/voucher4.png",
  "/voucher5.jpg",
  "/voucher6.jpg",
  "/voucher7.jpg"
];

const carousel = ref(null);
const activeIndex = ref(0);

// Geser kanan
const scrollRight = () => {
  const container = carousel.value;
  const itemWidth = container.children[0].offsetWidth + 16;
  container.scrollBy({ left: itemWidth, behavior: "smooth" });
  activeIndex.value = Math.min(activeIndex.value + 1, vouchers.length - 1);
};

// Geser kiri
const scrollLeft = () => {
  const container = carousel.value;
  const itemWidth = container.children[0].offsetWidth + 16;
  container.scrollBy({ left: -itemWidth, behavior: "smooth" });
  activeIndex.value = Math.max(activeIndex.value - 1, 0);
};

// Indikator tetap 5, tapi aktifnya dinamis
const getIndicatorClass = (i) => {
  const visibleDots = 5;
  const start = Math.floor(activeIndex.value / visibleDots) * visibleDots;
  const end = start + visibleDots;

  const relativeIndex = activeIndex.value - start;
  return relativeIndex === i
    ? "bg-white scale-125"
    : "bg-gray-500 scale-100";
};

onMounted(() => {
  carousel.value.scrollLeft = 0;
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
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
