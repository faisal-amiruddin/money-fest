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
    <h1 class="text-5xl font-bold mb-10 animate-slide-left">Edukasi</h1>

    <!-- Learning Path Section -->
    <h2 class="text-xl font-semibold mb-4 animate-slide-left">Jalur Belajar</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <!-- Financial Fundamentals -->
      <router-link to="/edukasi/financial-fundamentals" class="block">
        <div class="bg-gradient-to-br from-red-400 to-orange-400 rounded-xl p-6 flex flex-col justify-between cursor-pointer hover:opacity-55 transition-opacity opacity-0 animate-slide-up"
          style="animation-delay: 0.1s">
          <div class="flex flex-col items-center py-3">
            <div class="w-38 h-38">
              <img src="/tabungan-icon.png" alt="">
            </div>
            <h3 class="text-black font-bold text-center text-4xl">Financial <br> Fundamentals</h3>
          </div>
          <div class="flex items-center justify-center p-4">
            <div class="bg-red-300 h-12 rounded-full px-15 py-3 flex items-center space-x-4">
              <div class="w-10 h-9 bg-white rounded-full relative right-10"></div>   
              <span class="text-white text-3xl font-bold">75%</span>
            </div>
          </div>
        </div>
      </router-link>

      <!-- Investasi & Kekayaan -->
      <router-link to="/edukasi/wealth-investment" class="block">
        <div class="bg-gradient-to-br from-green-400 to-teal-400 rounded-xl p-6 flex flex-col justify-between cursor-pointer hover:opacity-55 transition-opacity opacity-0 animate-slide-up"
          style="animation-delay: 0.3s">
          <div class="flex flex-col items-center py-1">
            <div class="w-50 h-50">
              <img src="/invest-icon.png" alt="">
            </div>
            <h3 class="text-black font-bold text-center text-4xl relative bottom-5">Investasi & <br> Kekayaan</h3>
          </div>
          <div class="bg-green-300 h-12 w-60 rounded-full px-15 py-3 flex items-center space-x-4 relative left-15">
            <div class="w-10 h-9 bg-white rounded-full relative right-10"></div>   
            <span class="text-white text-3xl font-bold">75%</span>
          </div>
        </div>
      </router-link>

      <!-- Akademi Financial -->
      <router-link to="/edukasi/financial-academy" class="block">
        <div class="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl p-6 flex flex-col justify-between cursor-pointer hover:opacity-55 transition-opacity opacity-0 animate-slide-up"
          style="animation-delay: 0.5s">
          <div class="flex flex-col items-center py-1">
            <div class="w-50 h-50 ">
              <img src="/akademi-icon.png" alt="">
            </div>
            <h3 class="text-black font-bold text-center text-4xl relative bottom-5">Akademi <br> Financial</h3>
          </div>
          <div class="bg-pink-300 h-12 w-60 rounded-full px-15 py-3 flex items-center space-x-4 relative left-15">
            <div class="w-10 h-9 bg-white rounded-full relative right-10"></div>   
            <span class="text-white text-3xl font-bold">75%</span>
          </div>
        </div>
      </router-link>
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
        <div class="w-full h-4 bg-gray-700 rounded-full">
          <div class="h-full bg-green-500 rounded-full" style="width: 40%"></div>
        </div>
        <div class="text-xs text-white-400 mt-1 relative bottom-5 left-95 w-50">4 kuis terjawab</div>
      </div>

      <button
        class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
        @click="startQuiz">
        Mulai Kuis
      </button>
    </div>

    <!-- POP-UP QUIZ -->
    <div v-if="showQuiz"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-all">
      <div class="bg-[#1E1E1E] w-96 p-6 rounded-xl relative">
        <h2 class="text-xl font-bold mb-4 text-center">Kuis Mingguan</h2>

        <div v-if="!showResult">
          <h3 class="font-semibold mb-4">Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}</h3>
          <p class="mb-4">{{ currentQuestion.question }}</p>

          <div class="space-y-2">
            <button v-for="(option, index) in currentQuestion.options" :key="index"
              @click="selectAnswer(index)"
              :class="[ 'w-full text-left px-4 py-2 rounded-lg border transition-all',
                selectedAnswer === index
                  ? 'bg-green-500 border-green-400'
                  : 'bg-[#2A2A2A] border-gray-700 hover:bg-gray-700'
              ]">
              {{ option }}
            </button>
          </div>

          <div class="flex justify-between mt-6">
            <button @click="prevQuestion" :disabled="currentQuestionIndex === 0"
              class="px-4 py-2 bg-gray-600 rounded-lg disabled:opacity-40">Sebelumnya</button>

            <button @click="nextQuestion"
              class="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">
              {{ currentQuestionIndex === questions.length - 1 ? 'Selesai' : 'Selanjutnya' }}
            </button>
          </div>
        </div>

        <div v-else class="text-center">
          <h3 class="text-2xl font-bold mb-4">Skor Kamu</h3>
          <p class="text-4xl text-green-400 font-bold">{{ score }}/{{ questions.length }}</p>
          <button @click="closeQuiz"
            class="mt-6 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 w-full">
            Tutup
          </button>
        </div>

        <button @click="closeQuiz" class="absolute top-3 right-3 text-gray-400 hover:text-white">✕</button>
      </div>
    </div>

    <!-- Kategori dan Materi -->
    <h2 class="text-xl font-semibold mb-4">Kategori Populer</h2>
    <div class="flex flex-wrap gap-3 mb-8">
      <button v-for="category in categories" :key="category" 
        class="px-4 py-2 bg-[#1E1E1E] hover:bg-gray-700 rounded-full text-sm transition-colors">
        {{ category }}
      </button>
    </div>

    <h2 class="text-xl font-semibold mb-6">Materi Terbaru</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <iframe class="w-full h-48" src="https://www.youtube.com/embed/SEjjo4FLvsM  " title="Akademi Certified Financial Planner" frameborder="0" allowfullscreen></iframe>
        <div class="p-4"><h3 class="font-semibold">Akademi Certified Financial Planner</h3></div>
      </div>

      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <iframe class="w-full h-48" src="https://www.youtube.com/embed/C_Khb0Q2gJs  " title="Kelas Anti Fomo dan Frugal Life" frameborder="0" allowfullscreen></iframe>
        <div class="p-4"><h3 class="font-semibold">Kelas Anti Fomo dan Frugal Life</h3></div>
      </div>

      <div class="rounded-xl overflow-hidden bg-[#1E1E1E] cursor-pointer hover:opacity-90 transition-opacity">
        <iframe class="w-full h-48" src="https://www.youtube.com/embed/7gm3f7FHI5c  " title="Invest For Gen Z" frameborder="0" allowfullscreen></iframe>
        <div class="p-4"><h3 class="font-semibold">Invest For Gen Z</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edukasi',
  data() {
    return {
      categories: ['Saham', 'Manajemen', 'Trading', 'Psikologi'],
      showQuiz: false,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 0,
      showResult: false,
      questions: [
        { question: "Apa kepanjangan dari 'ROI' dalam dunia investasi?", options: ["Return On Investment","Rate Of Interest","Ratio Of Income","Revenue On Investment"], correct: 0 },
        { question: "Instrumen berikut yang termasuk investasi jangka panjang adalah?", options: ["Deposito 1 Bulan","Reksa Dana Saham","Tabungan Harian","E-money"], correct: 1 },
        { question: "Apa tujuan utama dari diversifikasi investasi?", options: ["Memaksimalkan risiko","Menghindari pajak","Mengurangi risiko","Meningkatkan hutang"], correct: 2 },
        { question: "Dana darurat idealnya digunakan untuk?", options: ["Investasi saham","Keadaan darurat","Liburan tahunan","Bayar kartu kredit"], correct: 1 },
        { question: "Apa fungsi utama dari anggaran keuangan pribadi?", options: ["Menambah hutang","Mengatur pemasukan dan pengeluaran","Mencatat transaksi teman","Menentukan bunga tabungan"], correct: 1 }
      ]
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    // quiz logic
    startQuiz() { this.showQuiz = true; this.currentQuestionIndex = 0; this.score = 0; this.selectedAnswer = null; this.showResult = false; },
    closeQuiz() { this.showQuiz = false; },
    selectAnswer(index) { this.selectedAnswer = index; },
    nextQuestion() {
      if (this.selectedAnswer === this.currentQuestion.correct) this.score++;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++; this.selectedAnswer = null;
      } else this.showResult = true;
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--; this.selectedAnswer = null;
      }
    }
  }
};
</script>

<style scoped>
@keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.animate-slide-up { animation: slideUp 1s ease-out forwards; }
.animate-slide-left { animation: slideLeft 0.8s ease-out forwards; }
</style>