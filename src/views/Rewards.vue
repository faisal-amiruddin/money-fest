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
          v-for="(voucher, i) in vouchers"
          :key="i"
          class="carousel-item flex-shrink-0 w-80 flex justify-center cursor-pointer"
          @click="openModal(voucher)"
        >
          <img
            :src="voucher.image"
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

    <!-- MODAL DETAIL VOUCHER -->
    <Transition name="fade-zoom"> 
    <div
          v-if="selectedVoucher"
          class="fixed inset-0 bg-[#3b3b3b8e] flex items-center justify-center z-50"
          @click.self="closeModal"
        >
      <div class="bg-[#1E1E1E] text-white p-6 rounded-2xl w-96 shadow-lg">
        <h2 class="text-2xl font-bold mb-3 text-center">{{ selectedVoucher.title }}</h2>
        <img
          :src="selectedVoucher.image"
          alt="voucher"
          class="rounded-lg mb-4 w-full h-full object-cover"
        />
        <p class="text-white-600 mb-4 text-center">{{ selectedVoucher.desc }}</p>

        <div class="flex justify-center">
          <button
            @click="closeModal"
            class="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
    </Transition>  
  </div>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";
import { ref, onMounted } from "vue";

const vouchers = [
  {
    image: "/voucher1.png",
    title: "Kuota Voucher",
    desc: "Nikmati diskon 30% untuk pembelian paket data, SMS, dan telepon semua operator. Berlaku untuk semua provider utama seperti Telkomsel, Indosat, XL, dan Tri. Penukaran voucher dapat dilakukan langsung di aplikasi mitra telekomunikasi pilihanmu.",
  },
  {
    image: "/voucher2.png",
    title: "Ultra Voucher",
    desc: "Dapatkan potongan 10% untuk berbelanja di lebih dari 500 merchant favorit, mulai dari restoran, fashion, hingga hiburan. Voucher ini bisa digunakan langsung melalui aplikasi Ultra Voucher tanpa minimal pembelian.",
  },
  {
    image: "/voucher3.png",
    title: "MAP Gift Voucher",
    desc: "Hemat hingga 15% saat berbelanja di jaringan ritel MAP seperti Zara, Starbucks, Sephora, dan lainnya. Voucher berlaku nasional dan dapat digunakan untuk berbagai kategori produk, dari fashion hingga lifestyle premium.",
  },
  {
    image: "/voucher4.png",
    title: "Voucher Optik 40%",
    desc: "Dapatkan bonus hingga 40% untuk setiap pembelian lensa, cek kesehatan mataa, dan pembelian lensa dengan kartu kredit tertentu.",
  },
  {
    image: "/voucher5.jpg",
    title: "Voucher Ultimate Travel",
    desc: "Nikmati diskon eksklusif 50% untuk berwisata ke destinasi di seluruh Indonesia. Berlaku untuk semua jenis umur, baik anak kecil maupun dewasa, dengan menukarkan qr code voucher di loket masuk destinasi wisata pilihanmu.",
  },
  {
    image: "/voucher6.jpg",
    title: "Voucher Service Oktober",
    desc: "Dapatkan diskon 50% untuk layanan servis kendaraan di bengkel resmi selama bulan Oktober. Voucher ini mencakup berbagai jenis kendaraan, mulai dari mobil hingga motor, dan dapat digunakan untuk perawatan rutin maupun perbaikan.",
  },
  {
    image: "/voucher7.jpg",
    title: "Voucher Cleaning Service",
    desc: "Dapatkan potongan harga 30% untuk layanan cleaning service rumah atau kantor. Voucher ini berlaku untuk semua paket layanan, termasuk pembersihan rutin, deep cleaning, dan layanan khusus lainnya.",
  },
];


const carousel = ref(null);
const activeIndex = ref(0);
const selectedVoucher = ref(null);

// Modal
const openModal = (voucher) => {
  selectedVoucher.value = voucher;
};
const closeModal = () => {
  selectedVoucher.value = null;
};

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
  const relativeIndex = activeIndex.value - start;
  return relativeIndex === i ? "bg-white scale-125" : "bg-gray-500 scale-100";
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
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

</style>
