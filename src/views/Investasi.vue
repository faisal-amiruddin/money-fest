<template>
  <div class="px-6 py-6 space-y-6 pt-35 pb-24">
    <!-- Back + Title -->
    <BackButton />
    <h1 class="font-[Secular_One] text-4xl font-semibold mt-15">Investasi</h1>

    <div class="flex gap-6">
      <!-- Left Column -->
      <div class="flex-1 space-y-6 min-w-0">
        <!-- Progress & Diversification -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-[#1E1E1E] rounded-2xl p-6">
            <h2 class="text-lg mb-2">Target Investasi</h2>
            <div class="flex justify-between items-end mb-2">
              <div class="text-2xl font-bold">Rp {{ formatAmount(savings.current) }}</div>
              <span class="text-gray-400 text-lg">/ Rp {{ formatAmount(savings.target) }}</span>
            </div>
            <div class="w-full bg-gray-700 h-3 rounded-full mb-2">
              <div
                class="bg-green-500 h-3 rounded-full"
                :style="{ width: savingsPercentage + '%' }"
              ></div>
            </div>
            <p class="text-gray-400 text-sm">{{ savingsPercentage }}% tercapai</p>
          </div>

          <div class="bg-[#1E1E1E] rounded-2xl p-6">
            <h2 class="text-lg mb-2">Diversifikasi Portofolio</h2>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-4xl font-bold mb-2">{{ diversificationScore }}/100</div>
                <div class="flex mb-3">
                  <i v-for="i in 5" :key="i" class="text-yellow-500 mr-1">
                    <i
                      v-if="i <= Math.floor(diversificationScore / 20)"
                      class="fa-solid fa-star"
                    ></i>
                    <i v-else class="fa-regular fa-star"></i>
                  </i>
                </div>
              </div>
              <div>
                <span
                  class="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-lg"
                >
                  {{ diversificationStatus }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Challenge & Achievement - MODIFIED SECTION -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-[#1E1E1E] rounded-2xl p-6 self-center">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg mb-2">Challenge</h2>
                <p class="text-gray-400 mb-3">{{ currentChallenge }}</p>
              </div>
              <div>
                <button
                  class="text-white flex items-center bg-[#383838] p-2 rounded-full px-4 text-xs"
                >
                  Lihat Detail
                  <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-[#1E1E1E] rounded-2xl p-6 self-center">
            <div class="flex justify-between">
              <div>
                <h2 class="text-lg mb-2">Achievement</h2>
                <p class="text-yellow-500 mb-3">{{ currentAchievement }}</p>
              </div>
              <div class="w-12">
                <img :src="achievementBadge" alt="Badge ETF" class="w-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- ETF Performance Graph -->
        <div class="bg-[#1E1E1E] rounded-2xl p-6 pb-20">
          <div class="flex justify-between items-center">
            <h2 class="text-xl p-3">Grafik Reksa Dana</h2>
            <div class="text-sm bg-[#2C2C2C] px-3 py-1 rounded-full">
              {{ currentSymbolName }}
            </div>
          </div>
          <div
            id="tv_chart"
            class="w-full h-[400px] rounded-xl overflow-hidden border border-gray-700 bg-[#1A1A1A]"
          ></div>
        </div>

        <!-- Popular ETFs -->
        <div class="bg-[#1E1E1E] rounded-2xl p-4">
          <h2 class="text-xl mb-2">ETF Populer di BEI</h2>
          <div class="space-y-3">
            <div
              v-for="(etf, index) in popularEtfs"
              :key="index"
              class="flex justify-between items-center p-3 rounded-xl bg-[#2C2C2C] hover:bg-[#333] transition-colors cursor-pointer"
              @click="changeChartSymbol(etf)"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3"
                >
                  <span class="font-bold text-white text-sm">{{ etf.code }}</span>
                </div>
                <div>
                  <p class="font-medium">{{ etf.name }}</p>
                  <p class="text-xs text-gray-400">{{ etf.category }} • {{ etf.manager }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium">Rp {{ formatAmount(etf.price) }}</p>
                <p
                  :class="etf.change >= 0 ? 'text-green-400' : 'text-red-400'"
                  class="text-sm font-semibold"
                >
                  {{ etf.change >= 0 ? '+' : '' }}{{ etf.change.toFixed(2) }}%
                </p>
              </div>
            </div>
          </div>
          <div class="mt-4 text-center text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
            <i class="fa-solid fa-table mr-1"></i>
            Lihat Daftar Lengkap
          </div>
        </div>

        <!-- Portfolio -->
        <div class="bg-[#1E1E1E] rounded-2xl p-6">
          <h2 class="text-xl mb-4">Portofolio Saya</h2>
          <div class="space-y-3">
            <div
              v-for="item in portfolio"
              :key="item.id"
              class="flex justify-between items-center p-3 rounded-xl bg-[#2C2C2C]"
            >
              <div class="flex items-center">
                <div
                  :class="`w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3 ${item.color}`"
                >
                  <i class="fa-solid fa-chart-line text-lg"></i>
                </div>
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-gray-400">
                    Nilai: Rp {{ formatAmount(item.value) }} | {{ item.shares }} Lembar
                  </p>
                </div>
              </div>
              <div :class="item.change >= 0 ? 'text-green-400' : 'text-red-400'">
                {{ item.change >= 0 ? '+' : '' }}{{ item.change.toFixed(2) }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (Sticky) - FIXED -->
      <div class="hidden md:block sticky-sidebar-container">
        <!-- Buy / Sell -->
        <div class="bg-[#1E1E1E] rounded-2xl p-6">
          <div class="grid grid-cols-2 mb-4 text-center">
            <button
              @click="activeTab = 'beli'"
              :class="
                activeTab === 'beli'
                  ? 'text-green-400 border-b-2 border-green-400 py-2'
                  : 'text-gray-400 py-2'
              "
            >
              Beli
            </button>
            <button
              @click="activeTab = 'jual'"
              :class="
                activeTab === 'jual'
                  ? 'text-red-400 border-b-2 border-red-400 py-2'
                  : 'text-gray-400 py-2'
              "
            >
              Jual
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-400 mb-1">ETF</label>
              <select
                v-model="selectedEtf"
                class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2 appearance-none"
              >
                <option value="" disabled selected hidden>Pilih ETF...</option>
                <option v-for="etf in etfs" :key="etf.symbol" :value="etf.symbol">
                  {{ etf.name }} ({{ etf.code }})
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-1">Jumlah (Lembar)</label>
              <input
                type="number"
                v-model="investmentAmount"
                min="1"
                class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2"
                placeholder="Contoh: 100"
              />
            </div>

            <div class="text-sm text-gray-400 bg-[#2C2C2C] p-3 rounded-lg">
              <p class="flex justify-between">
                <span>Harga/Lembar:</span>
                <span>Rp {{ selectedEtf ? formatAmount(getEtfPrice(selectedEtf)) : '0' }}</span>
              </p>
              <p class="flex justify-between mt-1 font-bold">
                <span>Total:</span>
                <span class="text-green-400">Rp {{ formatAmount(calculateTotal()) }}</span>
              </p>
            </div>

            <button
              :disabled="!selectedEtf || !investmentAmount || investmentAmount <= 0"
              :class="[
                activeTab === 'beli'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700',
                !selectedEtf || !investmentAmount || investmentAmount <= 0
                  ? 'opacity-50 cursor-not-allowed'
                  : '',
              ]"
              class="w-full text-white py-2 rounded-lg transition-colors font-medium"
              @click="executeTransaction"
            >
              {{ activeTab === 'beli' ? 'Beli Sekarang' : 'Jual Sekarang' }}
            </button>
          </div>
        </div>

        <!-- Market Status -->
        <div class="bg-[#1E1E1E] rounded-2xl p-4 border border-green-500/30">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span class="font-medium text-green-400">Pasar Buka</span>
          </div>
          <p class="text-sm text-gray-400 mt-1">Jam Perdagangan: 09:00 - 15:50 WIB</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <div class="text-center p-2 bg-[#2C2C2C] rounded-lg">
              <p class="text-xs text-gray-400">IHSG</p>
              <p class="font-bold text-green-400">7,250.45</p>
              <p class="text-xs text-green-500">+0.75%</p>
            </div>
            <div class="text-center p-2 bg-[#2C2C2C] rounded-lg">
              <p class="text-xs text-gray-400">Nilai Tukar</p>
              <p class="font-bold">15,850</p>
              <p class="text-xs text-red-500">-0.15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Bar -->
    <div
      class="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-gray-800 p-4 z-50"
    >
      <div class="flex justify-between items-center max-w-4xl mx-auto">
        <div class="flex-1 mr-2">
          <select
            v-model="selectedEtf"
            class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-3 py-2 text-sm"
          >
            <option v-for="etf in etfs" :key="etf.symbol" :value="etf.symbol">
              {{ etf.name }} ({{ etf.code }})
            </option>
          </select>
        </div>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
          @click="toggleMobileTransaction"
        >
          Transaksi
        </button>
      </div>
    </div>

    <!-- Mobile Transaction Modal -->
    <div
      v-if="showMobileModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:hidden"
    >
      <div class="bg-[#1E1E1E] w-full rounded-t-2xl p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Transaksi ETF</h3>
          <button @click="showMobileModal = false" class="text-gray-400 hover:text-white">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div class="grid grid-cols-2 mb-4">
          <button
            @click="activeTab = 'beli'"
            :class="
              activeTab === 'beli'
                ? 'text-green-400 border-b-2 border-green-400 py-2'
                : 'text-gray-400 py-2'
            "
          >
            Beli
          </button>
          <button
            @click="activeTab = 'jual'"
            :class="
              activeTab === 'jual'
                ? 'text-red-400 border-b-2 border-red-400 py-2'
                : 'text-gray-400 py-2'
            "
          >
            Jual
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Jumlah (Lembar)</label>
            <input
              type="number"
              v-model="investmentAmount"
              min="1"
              class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2"
              placeholder="Contoh: 100"
            />
          </div>

          <div class="text-sm text-gray-400 bg-[#2C2C2C] p-3 rounded-lg">
            <p class="flex justify-between">
              <span>Harga/Lembar:</span>
              <span>Rp {{ selectedEtf ? formatAmount(getEtfPrice(selectedEtf)) : '0' }}</span>
            </p>
            <p class="flex justify-between mt-1 font-bold">
              <span>Total:</span>
              <span class="text-green-400">Rp {{ formatAmount(calculateTotal()) }}</span>
            </p>
          </div>

          <button
            :disabled="!selectedEtf || !investmentAmount || investmentAmount <= 0"
            :class="[
              activeTab === 'beli'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700',
              !selectedEtf || !investmentAmount || investmentAmount <= 0
                ? 'opacity-50 cursor-not-allowed'
                : '',
            ]"
            class="w-full text-white py-3 rounded-lg transition-colors font-medium text-lg"
            @click="executeTransaction"
          >
            <i v-if="activeTab === 'beli'" class="fa-solid fa-cart-plus mr-2"></i>
            <i v-else class="fa-solid fa-cart-arrow-down mr-2"></i>
            {{ activeTab === 'beli' ? 'Beli Sekarang' : 'Jual Sekarang' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import { nextTick } from 'vue'

export default {
  name: 'EtfTracker',
  components: { BackButton },
  data() {
    return {
      activeTab: 'beli',
      selectedEtf: 'IDX:XMLF',
      investmentAmount: null,
      savings: { current: 275000000, target: 500000000 },
      diversificationScore: 85,
      chartWidget: null,
      showMobileModal: false,

      // Data untuk random challenge & achievement
      challenges: [
        'Ga beli kopi tapi investasi',
        'Ga hiling tapi investasi',
        'Duit nganggur tapi kita investasikan',
        'No alkohol no dugem, yes for investasi',
      ],
      achievements: [
        { name: 'Silver', badge: '/archive-x.png' },
        { name: 'Gold', badge: '/archive-x.png' },
        { name: 'Platinum', badge: '/archive-x.png' },
      ],
      currentChallenge: '',
      currentAchievement: '',
      achievementBadge: '/archive-x.png',

      // Data ETF Indonesia resmi yang valid di TradingView
      etfs: [
        {
          symbol: 'IDX:XMLF',
          code: 'XMLF',
          name: 'Mandiri ETF LQ45',
          category: 'Index',
          manager: 'PT Mandiri Manajemen Investasi',
          price: 937,
          change: 0.85,
        },
        {
          symbol: 'IDX:XPIN',
          code: 'XPIN',
          name: 'Bahana ETF Pefindo I-Grade',
          category: 'Index',
          manager: 'PT Bahana TCW Investment Management',
          price: 679,
          change: 1.25,
        },
        {
          symbol: 'IDX:SPIS',
          code: 'SPIS',
          name: 'S&P/IFCI Sharia ETF',
          category: 'Sharia',
          manager: 'PT Panin Asset Management',
          price: 113,
          change: -0.35,
        },
        {
          symbol: 'IDX:RTECH',
          code: 'RTECH',
          name: 'Ritech Technology ETF',
          category: 'Sectoral',
          manager: 'PT Ritekindo Asset Management',
          price: 600,
          change: 2.1,
        },
        {
          symbol: 'IDX:XIPB',
          code: 'XIPB',
          name: 'Premier ETF IDX-Pefindo Primebank',
          category: 'Index',
          manager: 'PT Indo Premier Investment Management',
          price: 212,
          change: 0.95,
        },
        {
          symbol: 'IDX:XCEG',
          code: 'XCEG',
          name: 'Capital ETF IDX ESG Leaders',
          category: 'ESG',
          manager: 'PT Capital Asset Management',
          price: 112,
          change: 0.45,
        },
      ],

      // ETF Populer dengan data valid
      popularEtfs: [
        {
          symbol: 'IDX:XMLF',
          code: 'XMLF',
          name: 'Mandiri ETF LQ45',
          category: 'Index LQ45',
          manager: 'Mandiri MI',
          price: 937,
          change: 0.85,
        },
        {
          symbol: 'IDX:XPIN',
          code: 'XPIN',
          name: 'Bahana ETF Pefindo I-Grade',
          category: 'Obligasi Korporasi',
          manager: 'Bahana TCW',
          price: 679,
          change: 1.25,
        },
        {
          symbol: 'IDX:SPIS',
          code: 'SPIS',
          name: 'S&P/IFCI Sharia ETF',
          category: 'Saham Syariah',
          manager: 'Panin AM',
          price: 113,
          change: -0.35,
        },
        {
          symbol: 'IDX:RTECH',
          code: 'RTECH',
          name: 'Ritech Technology ETF',
          category: 'Teknologi',
          manager: 'Ritekindo AM',
          price: 600,
          change: 2.1,
        },
      ],

      // Portofolio ETF
      portfolio: [
        {
          id: 1,
          symbol: 'IDX:XMLF',
          name: 'Mandiri ETF LQ45',
          value: 35000000,
          shares: 37353,
          change: 0.85,
          color: 'bg-blue-600',
        },
        {
          id: 2,
          symbol: 'IDX:XPIN',
          name: 'Bahana ETF Pefindo I-Grade',
          value: 12000000,
          shares: 17673,
          change: 1.25,
          color: 'bg-purple-600',
        },
        {
          id: 3,
          symbol: 'IDX:SPIS',
          name: 'S&P/IFCI Sharia ETF',
          value: 5000000,
          shares: 44248,
          change: -0.35,
          color: 'bg-green-600',
        },
      ],
    }
  },
  computed: {
    savingsPercentage() {
      return Math.min(Math.round((this.savings.current / this.savings.target) * 100), 100)
    },
    diversificationStatus() {
      if (this.diversificationScore >= 90) return 'Sangat Baik'
      if (this.diversificationScore >= 75) return 'Baik'
      if (this.diversificationScore >= 60) return 'Cukup'
      return 'Perlu Ditingkatkan'
    },
    currentSymbolName() {
      const etf = this.etfs.find((e) => e.symbol === this.selectedEtf)
      return etf ? `${etf.code} - ${etf.name}` : 'Pilih ETF'
    },
  },
  mounted() {
    // Set random challenge dan achievement saat halaman dimuat
    this.setRandomChallengeAndAchievement()

    this.$nextTick(() => {
      this.initChart()
    })

    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.destroyChart()
  },
  methods: {
    // Method baru untuk set random challenge dan achievement
    setRandomChallengeAndAchievement() {
      // Pilih random challenge
      const randomChallengeIndex = Math.floor(Math.random() * this.challenges.length)
      this.currentChallenge = this.challenges[randomChallengeIndex]

      // Pilih random achievement
      const randomAchievementIndex = Math.floor(Math.random() * this.achievements.length)
      this.currentAchievement = this.achievements[randomAchievementIndex].name
      this.achievementBadge = this.achievements[randomAchievementIndex].badge
    },

    async initChart() {
      // Pastikan TradingView script sudah di-load
      if (typeof TradingView === 'undefined') {
        await this.loadTradingViewScript()
      }

      // Tunggu DOM benar-benar siap
      await nextTick()

      const container = document.getElementById('tv_chart')
      if (!container) return

      // Kosongkan container sebelumnya
      container.innerHTML = ''

      try {
        this.chartWidget = new TradingView.widget({
          container_id: 'tv_chart',
          width: '100%',
          height: '50%',
          symbol: this.selectedEtf,
          interval: 'D',
          timezone: 'Asia/Jakarta',
          theme: 'dark',
          style: '1',
          locale: 'id',
          toolbar_bg: '#1E1E1E',
          enable_publishing: false,
          allow_symbol_change: true,
          save_image: false,
          library_path: 'https://s3.tradingview.com/tv.js  ',
          autosize: true,
          overrides: {
            'paneProperties.background': '#1A1A1A',
            'paneProperties.vertGridProperties.color': '#2C2C2C',
            'paneProperties.horzGridProperties.color': '#2C2C2C',
            'symbolWatermarkProperties.color': '#3C3C3C',
            'scalesProperties.textColor': '#AAA',
            'mainSeriesProperties.candleStyle.wickUpColor': '#26a69a',
            'mainSeriesProperties.candleStyle.wickDownColor': '#ef5350',
            'mainSeriesProperties.candleStyle.upColor': '#26a69a',
            'mainSeriesProperties.candleStyle.downColor': '#ef5350',
            'mainSeriesProperties.candleStyle.drawWick': true,
            'mainSeriesProperties.candleStyle.drawBorder': true,
            'mainSeriesProperties.candleStyle.borderColor': '#378658',
            'mainSeriesProperties.candleStyle.borderUpColor': '#26a69a',
            'mainSeriesProperties.candleStyle.borderDownColor': '#ef5350',
            volumePaneSize: 'medium',
            'volume.color.0': '#26a69a',
            'volume.color.1': '#ef5350',
          },
          studies_overrides: {
            'volume.volume.color.0': '#26a69a',
            'volume.volume.color.1': '#ef5350',
            'volume.volume.transparency': 70,
          },
        })
      } catch (error) {
        console.error('Error initializing TradingView chart:', error)
        this.showErrorPlaceholder()
      }
    },
    async loadTradingViewScript() {
      return new Promise((resolve) => {
        if (document.getElementById('tradingview-script')) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.id = 'tradingview-script'
        script.src = 'https://s3.tradingview.com/tv.js  '
        script.async = true
        script.onload = resolve
        script.onerror = () => {
          console.error('Failed to load TradingView script')
          this.showErrorPlaceholder()
        }
        document.head.appendChild(script)
      })
    },
    showErrorPlaceholder() {
      const container = document.getElementById('tv_chart')
      if (container) {
        container.innerHTML = `
          <div class="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] text-gray-400 border border-gray-700 rounded-xl p-4">
            <i class="fa-solid fa-triangle-exclamation text-3xl text-yellow-500 mb-3"></i>
            <h3 class="text-lg font-bold mb-1 text-white">Grafik Tidak Tersedia</h3>
            <p class="text-center mb-3">Tidak dapat memuat data pasar untuk ETF yang dipilih</p>
            <p class="text-xs mb-4">Simbol valid untuk ETF Indonesia:
              <span class="font-mono bg-gray-800 px-2 py-1 rounded">IDX:XMLF</span>,
              <span class="font-mono bg-gray-800 px-2 py-1 rounded">IDX:XPIN</span>,
              <span class="font-mono bg-gray-800 px-2 py-1 rounded">IDX:SPIS</span>
            </p>
            <div class="flex space-x-2">
              <button onclick="location.reload()" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                <i class="fa-solid fa-rotate mr-1"></i> Muat Ulang
              </button>
            </div>
          </div>
        `
      }
    },
    changeChartSymbol(etf) {
      this.selectedEtf = etf.symbol

      if (this.chartWidget) {
        this.chartWidget.setSymbol(etf.symbol, () => {
          console.log(`Chart updated to ${etf.symbol}`)
        })
      } else {
        this.destroyChart()
        this.initChart()
      }
    },
    destroyChart() {
      if (this.chartWidget) {
        try {
          this.chartWidget.remove()
        } catch (e) {
          console.warn('Error destroying chart:', e)
        }
        this.chartWidget = null
      }

      const container = document.getElementById('tv_chart')
      if (container) {
        container.innerHTML = '<div class="w-full h-full bg-[#1A1A1A] rounded-xl"></div>'
      }
    },
    handleResize() {
      if (this.chartWidget) {
        this.chartWidget.resize()
      }
    },
    formatAmount(amount) {
      if (!amount || isNaN(amount)) return '0'
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getEtfPrice(symbol) {
      const etf = this.etfs.find((e) => e.symbol === symbol)
      return etf ? etf.price : 0
    },
    calculateTotal() {
      if (!this.selectedEtf || !this.investmentAmount || this.investmentAmount <= 0) return 0
      return this.getEtfPrice(this.selectedEtf) * this.investmentAmount
    },
    executeTransaction() {
      if (!this.selectedEtf || !this.investmentAmount || this.investmentAmount <= 0) return

      const action = this.activeTab === 'beli' ? 'dibeli' : 'dijual'
      const etf = this.etfs.find((e) => e.symbol === this.selectedEtf)

      this.$toast.success(`Berhasil ${action} ${this.investmentAmount} lembar ${etf.name}!`, {
        icon: 'success',
        position: 'top-right',
      })

      // Reset form
      this.investmentAmount = null

      // Close mobile modal
      this.showMobileModal = false
    },
    toggleMobileTransaction() {
      this.showMobileModal = true
    },
  },
}
</script>

<style scoped>
h1,
h2,
h3,
p,
td,
th,
label {
  font-family: 'Secular One', sans-serif;
}

/* PERBAIKAN STICKY SIDEBAR - TANPA SCROLLBAR DAN TIDAK TERPOTONG */
@media (min-width: 768px) {
  /* Tambahkan padding bottom pada container utama */
  .px-6.py-6 {
    padding-bottom: 4rem;
  }

  /* Styling sidebar yang diperbaiki */
  .sticky-sidebar-container {
    position: -webkit-sticky;
    position: sticky;
    top: 6rem; /* Sesuaikan dengan tinggi header Anda */
    align-self: flex-start;
    width: 20rem; /* 320px = w-80 */
    flex-shrink: 0;
    z-index: 10;
    overflow: visible !important;
  }

  /* Space antar elemen di sidebar */
  .sticky-sidebar-container > * {
    margin-bottom: 1.5rem;
  }

  /* Extra space untuk elemen terakhir */
  .sticky-sidebar-container > *:last-child {
    margin-bottom: 3rem;
  }
}

/* Hide scrollbar for TradingView */
#tv_chart::-webkit-scrollbar {
  display: none;
}

#tv_chart {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom select styling */
select {
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 2rem;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%236b7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
}

/* Toast styling */
:deep(.toast-container) {
  z-index: 1000;
}
</style>
