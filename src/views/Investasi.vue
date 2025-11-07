<template>
  <div class="px-6 py-6 space-y-6 pt-30">
    <!-- Back + Title -->
    <BackButton />
    <h1 class="font-[Secular_One] text-4xl font-semibold">Investasi</h1>

    <div class="flex gap-6">
      <!-- Left Column -->
      <div class="flex-1 space-y-6">

        <!-- Progress & Diversification -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-[#1E1E1E] rounded-2xl p-6">
            <h2 class="text-lg mb-2">Misi Investasi Jangka Panjang</h2>
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
            <h2 class="text-lg mb-2">Diversifikasi Score</h2>
            <div class="text-4xl font-bold mb-2">{{ diversificationScore }}/100</div>
            
            <div class="flex mb-3">
              <i v-for="i in 5" :key="i" class="text-yellow-500 mr-1">
                <i v-if="i <= Math.floor(diversificationScore / 20)" class="fa-solid fa-star"></i>
                <i v-else class="fa-regular fa-star"></i>
              </i>
            </div>
            
            <span class="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
              Baik
            </span>
          </div>
        </div>

        <!-- Challenge & Achievement -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-[#1E1E1E] rounded-2xl p-6 self-center">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-lg mb-2">Challenge</h2>
                    <p class="text-gray-400 mb-3">Konsisten Investasi</p>
                </div>
                <div>
                    <button class="text-white flex items-center bg-[#383838] p-2 rounded-full px-4 text-xs">
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
                    <p class="text-yellow-500 mb-3">Earned Plonir Reksadana</p>
                </div>
                <div class="w-12">
                    <img src="/archive-x.png" alt="">
                </div>
            </div>
          </div>
        </div>

        <!-- Market Graph -->
        <div class="bg-[#1E1E1E] rounded-2xl p-6">
          <h2 class="text-xl mb-4">Grafik Pasar (IHSG)</h2>
          <div id="tv_chart" style="height:400px;"></div>
        </div>

        <!-- Daftar Pasar  -->
        <div class="bg-[#1E1E1E] rounded-2xl p-4">
          <h2 class="text-xl mb-2">Daftar Pasar</h2>
          <div id="tv_market_widget" class="rounded-xl overflow-hidden"></div>
        </div>

        <!-- Portfolio -->
        <div class="bg-[#1E1E1E] rounded-2xl p-6">
          <h2 class="text-xl mb-4">Portofolio Saya</h2>
          <div class="space-y-3">
            <div v-for="item in portfolio" :key="item.id" class="flex justify-between items-center p-3 rounded-xl bg-[#2C2C2C]">
              <div class="flex items-center">
                <div :class="`w-6 h-6 rounded-full flex items-center justify-center text-white mr-3 ${item.color}`">
                  {{ item.symbol.charAt(0) }}
                </div>
                <div>
                  <p class="font-medium">{{ item.name }} ({{ item.symbol }})</p>
                  <p class="text-sm text-gray-400">Nilai: Rp {{ formatAmount(item.value) }}</p>
                </div>
              </div>
              <div :class="item.change >= 0 ? 'text-green-400' : 'text-red-400'">
                {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="w-80 space-y-6">

        <!-- Buy / Sell -->
        <div class="bg-[#1E1E1E] rounded-2xl p-6">
          <div class="grid grid-cols-2 mb-4 text-center">
            <button 
              @click="activeTab = 'beli'"
              :class="activeTab === 'beli' ? 'text-green-400 border-b-2 border-green-400 py-2' : 'text-gray-400 py-2'"
            >
              Beli
            </button>
            <button 
              @click="activeTab = 'jual'"
              :class="activeTab === 'jual' ? 'text-red-400 border-b-2 border-red-400 py-2' : 'text-gray-400 py-2'"
            >
              Jual
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Aset</label>
              <select v-model="selectedAsset" class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2 appearance-none">
                <option value="" disabled selected hidden>Pilih Aset...</option>
                <option v-for="stock in stocks" :key="stock.symbol" :value="stock.symbol">{{ stock.name }} ({{ stock.symbol }})</option>
              </select>
              <div class="absolute right-4 top-10 pointer-events-none">
                <i class="fa-solid fa-chevron-down text-gray-500"></i>
              </div>
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-1">Jumlah (Lembar)</label>
              <input type="number" v-model="investmentAmount" min="1" class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2">
            </div>

            <button 
              :disabled="!selectedAsset || !investmentAmount"
              :class="[
                activeTab === 'beli' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600',
                (!selectedAsset || !investmentAmount) ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              class="w-full text-white py-2 rounded-lg transition-colors"
            >
              {{ activeTab === 'beli' ? 'Beli Sekarang' : 'Jual Sekarang' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'

export default {
  name: 'Investasi',
  components: { BackButton },
  data() {
    return {
      activeTab: 'beli',
      selectedAsset: '',
      investmentAmount: null,
      savings: { current: 275000000, target: 500000000 },
      diversificationScore: 85,

      // Real Indonesian stock data
      stocks: [
        { symbol: 'BBCA', name: 'Bank Central Asia Tbk' },
        { symbol: 'BBRI', name: 'Bank Rakyat Indonesia Tbk' },
        { symbol: 'BMRI', name: 'Bank Mandiri Tbk' },
        { symbol: 'TLKM', name: 'Telekomunikasi Indonesia Tbk' },
        { symbol: 'ASII', name: 'Astra International Tbk' },
        { symbol: 'UNVR', name: 'Unilever Indonesia Tbk' },
        { symbol: 'PGAS', name: 'Perusahaan Gas Negara Tbk' },
        { symbol: 'ANTM', name: 'Aneka Tambang Tbk' },
        { symbol: 'PTBA', name: 'Bukit Asam Tbk' },
        { symbol: 'INDF', name: 'Indofood Sukses Makmur Tbk' }
      ],
      
      // Portfolio with real stock data
      portfolio: [
        { 
          id: 1, 
          symbol: 'BBCA', 
          name: 'Bank Central Asia Tbk', 
          value: 35000000, 
          change: 2.40, 
          color: 'bg-blue-500' 
        },
        { 
          id: 2, 
          symbol: 'BBRI', 
          name: 'Bank Rakyat Indonesia Tbk', 
          value: 12000000, 
          change: 1.15, 
          color: 'bg-red-500' 
        },
        { 
          id: 3, 
          symbol: 'BMRI', 
          name: 'Bank Mandiri Tbk', 
          value: 5000000, 
          change: -0.85, 
          color: 'bg-green-500' 
        }
      ]
    }
  },
  computed: {
    savingsPercentage() {
      return Math.min(Math.round((this.savings.current / this.savings.target) * 100), 100)
    }
  },
  mounted() {
    // Chart IHSG
    new TradingView.widget({
      container_id: "tv_chart",
      width: "100%",
      height: 400,
      symbol: "IDX:COMPOSITE", // IHSG index
      interval: "D",
      timezone: "Asia/Jakarta",
      theme: "dark",
      style: "1",
      locale: "id"
    });

    // Market Quotes Widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.async = true;
    script.innerHTML = `
    {
      "colorTheme": "dark",
      "locale": "id",
      "isTransparent": false,
      "showSymbolLogo": true,
      "backgroundColor": "#2C2C2C",
      "width": "100%",
      "height": 350,
      "symbolsGroups": [
        {
          "name": "Saham Indonesia",
          "originalName": "Indonesia Stocks",
          "symbols": [
            { "name": "IDX:BBCA" },
            { "name": "IDX:BBRI" },
            { "name": "IDX:BMRI" },
            { "name": "IDX:TLKM" },
            { "name": "IDX:ASII" },
            { "name": "IDX:UNVR" },
            { "name": "IDX:ANTM" },
            { "name": "IDX:PGAS" }
          ]
        }
      ],
      "market": "indonesia"
    }`;
    document.getElementById("tv_market_widget").appendChild(script);
  },

  methods: {
    formatAmount(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
}
</script>

<style scoped>
h1, h2, h3, p, td, th, label {
  font-family: 'Secular One', sans-serif;
}
@media (max-width: 768px) {
  .flex { flex-direction: column; }
  .w-80 { width: 100%; }
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
</style>