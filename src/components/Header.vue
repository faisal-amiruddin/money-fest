<template>
  <header class="bg-[#1E1E1E] text-white mb-10 fixed w-full z-50">
    <nav class="max-w-7xl mx-auto flex items-center justify-between py-3">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <img src="/logo.png" alt="" class="h-15" />
        <h1 class="text-xl font-bold">Money Vest</h1>
      </router-link>

      <!-- Menu -->
      <ul class="flex items-center gap-1 relative">
        <li>
          <img
            id="notif"
            src="/notif.png"
            alt="Notifikasi"
            class="h-10 hover:cursor-pointer"
            @click="toggleNotifModal"
          />
          <!-- Modal Notifikasi -->
          <div
            v-if="showNotifModal"
            class="absolute right-0 top-12 mt-2 w-80 bg-[#1E1E1E] rounded-lg shadow-xl border border-gray-600 z-50"
          >
            <!-- Header Modal -->
            <div class="flex items-center justify-between p-4 border-b border-gray-600">
              <h3 class="text-lg font-semibold text-white">Notifikasi</h3>
              <button @click="closeNotifModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Daftar Notifikasi -->
            <div class="max-h-96 overflow-y-auto">
              <!-- Pesan Belum Dibaca -->
              <div
                class="p-4 border-b border-gray-600 bg-[#1a263d] hover:bg-[#2d3455] cursor-pointer transition-colors"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-white">Pengingat Investasi</p>
                    <p class="text-xs text-gray-500 mt-1">
                      Jangan lupa untuk berinvestasi hari ini. Konsistensi adalah kunci kesuksesan
                      finansial!
                    </p>
                    <p class="text-xs text-gray-400 mt-2">Baru saja</p>
                  </div>
                </div>
              </div>

              <!-- Contoh pesan lain (opsional) -->
              <div
                class="p-4 border-b border-gray-600 hover:bg-[#2d3455] cursor-pointer transition-colors"
              >
                <div class="flex items-start gap-3">
                  <div class="shrink-0">
                    <div class="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-white">Tips Investasi</p>
                    <p class="text-xs text-gray-500 mt-1">
                      Pelajari strategi investasi terbaru untuk meningkatkan portofolio Anda.
                    </p>
                    <p class="text-xs text-gray-400 mt-2">1 jam yang lalu</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Modal -->
            <div class="p-3 border-t border-gray-200 text-center">
              <button class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Lihat Semua Notifikasi
              </button>
            </div>
          </div>
        </li>
        <li>
          <img src="/profile.png" alt="Profile" class="h-10 hover:cursor-pointer" />
        </li>
      </ul>
    </nav>

    <!-- Overlay untuk menutup modal ketika klik di luar -->
    <div v-if="showNotifModal" class="fixed inset-0 z-40" @click="closeNotifModal"></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showNotifModal: false,
    }
  },
  methods: {
    toggleNotifModal() {
      this.showNotifModal = !this.showNotifModal
    },
    closeNotifModal() {
      this.showNotifModal = false
    },
  },
  mounted() {
    // Menutup modal ketika tekan ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showNotifModal) {
        this.closeNotifModal()
      }
    })
  },
}
</script>
