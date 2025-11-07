<template>
  <div class="px-6 py-6 space-y-6 pt-30">
    <!-- Back + Title -->
    <BackButton />
    <div class="flex justify-between items-center mt-20">
      <!-- Title -->
      <h1 class="font-[Secular_One] text-4xl font-semibold">Planner</h1>
      <i class="fa-solid fa-gear text-2xl hover:cursor-pointer"></i>
    </div>

    <!-- Container -->
    <div class="flex justify-between gap-6">
      <!-- Misi -->
      <div class="flex-1 bg-[#1E1E1E] rounded-2xl p-10 mb-15 flex flex-col gap-6">
        <div>
          <h2 class="text-lg mb-2">Misi Tabungan Bulan Ini</h2>
          <div class="flex justify-between">
            <div class="text-2xl font-bold">
              Rp {{ formatAmount(savings.current) }}
            </div>
            <span class="text-gray-400 text-lg">/ Rp {{ formatAmount(savings.target) }}</span>
          </div>
          <div class="w-full bg-gray-700 h-3 rounded-full mt-3">
            <div 
              class="bg-green-500 h-3 rounded-full animate-[progressGrow_1s_ease-out_forwards]"
              :style="{ width: savingsPercentage + '%' }"
            ></div>
          </div>
          <p class="text-gray-400 text-sm mt-1">{{ savingsPercentage }}% tercapai</p>
        </div>
      </div>

      <!-- Streak + Challenge -->
      <div class="flex flex-col gap-3 w-50">
        <div class="flex items-center bg-[#1E1E1E] rounded-xl p-4">
          <i class="fa-solid fa-fire text-orange-500 text-3xl mr-3"></i>
          <div>
            <p class="text-gray-400 text-sm">Streak</p>
            <p class="text-lg">7 Hari</p>
            <p class="text-sm text-gray-400">Pilar Frugal Harian</p>
          </div>
        </div>

        <div class="flex items-center bg-[#1E1E1E] rounded-xl p-4">
          <i class="fa-solid fa-trophy text-yellow-500 text-3xl mr-3"></i>
          <div>
            <p class="text-gray-400 text-sm">Challenge Aktif</p>
            <p class="text-lg">Hemat Kopi</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Anggaran Bulan Ini -->
    <div class="mb-15">
      <h2 class="text-xl mb-4">Anggaran Bulan Ini</h2>
      <div class="grid md:grid-cols-3 gap-5">
        <!-- Transportasi -->
        <div class="bg-[#1E1E1E] p-5 rounded-2xl">
          <div class="flex justify-between items-center">
            <p class="text-lg">Transportasi</p>
            <img :src="getBudgetIcon('Transportasi')" alt="" width="30">
          </div>
          <p class="text-2xl font-bold mt-2">Rp {{ formatAmount(budgets.Transportasi.spent) }}</p>
          <p class="text-gray-400 text-sm">/ Rp {{ formatAmount(budgets.Transportasi.limit) }}</p>
          <div class="w-full bg-gray-700 h-3 rounded-full mt-3">
            <div 
              class="h-3 rounded-full transition-all duration-500 ease-out"
              :class="getBudgetColor('Transportasi')"
              :style="{ width: Math.min(getBudgetPercentage('Transportasi'), 100) + '%' }"
            ></div>
          </div>
          <p v-if="budgets.Transportasi.spent > budgets.Transportasi.limit" class="text-red-500 text-sm mt-2">* Melebihi batas anggaran</p>
        </div>

        <!-- Makanan & Minuman -->
        <div class="bg-[#1E1E1E] p-5 rounded-2xl">
          <div class="flex justify-between items-center">
            <p class="text-lg">Makanan & Minuman</p>
            <img :src="getBudgetIcon('Makan & Minum')" alt="" width="30">
          </div>
          <p class="text-2xl font-bold mt-2">Rp {{ formatAmount(budgets['Makan & Minum'].spent) }}</p>
          <p class="text-gray-400 text-sm">/ Rp {{ formatAmount(budgets['Makan & Minum'].limit) }}</p>
          <div class="w-full bg-gray-700 h-3 rounded-full mt-3">
            <div 
              class="h-3 rounded-full transition-all duration-500 ease-out"
              :class="getBudgetColor('Makan & Minum')"
              :style="{ width: Math.min(getBudgetPercentage('Makan & Minum'), 100) + '%' }"
            ></div>
          </div>
          <p v-if="budgets['Makan & Minum'].spent > budgets['Makan & Minum'].limit" class="text-red-500 text-sm mt-2">* Melebihi batas anggaran</p>
        </div>

        <!-- Hiburan -->
        <div class="bg-[#1E1E1E] p-5 rounded-2xl">
          <div class="flex justify-between items-center">
            <p class="text-lg">Hiburan</p>
            <img :src="getBudgetIcon('Hiburan')" alt="" width="30">
          </div>
          <p class="text-2xl font-bold mt-2">Rp {{ formatAmount(budgets.Hiburan.spent) }}</p>
          <p class="text-gray-400 text-sm">/ Rp {{ formatAmount(budgets.Hiburan.limit) }}</p>
          <div class="w-full bg-gray-700 h-3 rounded-full mt-3">
            <div 
              class="h-3 rounded-full transition-all duration-500 ease-out"
              :class="getBudgetColor('Hiburan')"
              :style="{ width: Math.min(getBudgetPercentage('Hiburan'), 100) + '%' }"
            ></div>
          </div>
          <p v-if="budgets.Hiburan.spent > budgets.Hiburan.limit" class="text-red-500 text-sm mt-2">* Melebihi batas anggaran</p>
        </div>
      </div>
    </div>

    <!-- Transaksi Terakhir -->
    <div>
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-xl">Transaksi Terakhir</h2>
        <button 
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          @click="openModal"
        >
          <i class="fa-solid fa-plus mr-2"></i>Tambah Transaksi
        </button>
      </div>
      <div class="bg-[#1E1E1E] rounded-md overflow-hidden">
        <table class="w-full text-center">
          <thead class="bg-[#3C3C3C]">
            <tr>
              <th class="p-3">Deskripsi</th>
              <th class="p-3">Kategori</th>
              <th class="p-3">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <!-- Transaksi 1 -->
            <tr>
              <td class="p-3">
                <p>Makan Siang</p>
                <p class="text-sm text-gray-400">27 Oktober 2025</p>
              </td>
              <td class="p-3">Makan & Minum</td>
              <td class="p-3 text-red-500">- Rp 20.000</td>
            </tr>
            
            <!-- Transaksi 2 -->
            <tr class="border-t border-[#2f2f2f]">
              <td class="p-3">
                <p>Bensin Motor</p>
                <p class="text-sm text-gray-400">27 Oktober 2025</p>
              </td>
              <td class="p-3">Transportasi</td>
              <td class="p-3 text-red-500">- Rp 35.000</td>
            </tr>
            
            <!-- Transaksi Baru -->
            <tr 
              v-for="(transaction, index) in transactions" 
              :key="index"
              class="border-t border-[#2f2f2f]"
            >
              <td class="p-3">
                <p>{{ transaction.description }}</p>
                <p class="text-sm text-gray-400">{{ transaction.date }}</p>
              </td>
              <td class="p-3">{{ transaction.category }}</td>
              <td class="p-3 text-red-500">- Rp {{ formatAmount(transaction.amount) }}</td>
            </tr>
            
            <!-- Lihat Semua Transaksi -->
            <tr class="border-t border-[#2f2f2f]">
              <td></td>
              <td class="p-3 pt-7">
                <a href="#" class="text-green-400">Lihat Semua Transaksi</a>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between items-center mt-4">
      </div>
    </div>
    
    <!-- Modal Tambah Transaksi -->
    <transition name="modal">
      <div 
        v-if="showModal" 
        class="fixed inset-0 bg-[#3b3b3b8e] flex items-center justify-center z-50"
        @click="closeModal"
      >
        <div 
          class="bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-md mx-4 modal-content"
          @click.stop
        >
          <h3 class="text-xl font-semibold mb-4">Tambah Transaksi</h3>
          
          <!-- Deskripsi -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Deskripsi</label>
            <input 
              type="text" 
              v-model="newTransaction.description"
              placeholder="Masukkan deskripsi ....."
              class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
          </div>
          
          <!-- Kategori -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Kategori</label>
            <select 
              v-model="newTransaction.category"
              class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled selected>Pilih kategori</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Makan & Minum">Makan & Minum</option>
              <option value="Hiburan">Hiburan</option>
            </select>
          </div>
          
          <!-- Jumlah -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Jumlah</label>
            <input 
              type="number" 
              v-model="newTransaction.amount"
              placeholder="Masukkan nominal ....."
              class="w-full bg-[#2C2C2C] border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
          </div>
          
          <!-- Garis Pemisah -->
          <div class="border-t border-gray-600 my-4"></div>
          
          <!-- Tombol Aksi -->
          <div class="flex justify-between">
            <button 
              class="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              @click="cancelTransaction"
            >
              Cancel
            </button>
            <button 
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              @click="addTransaction"
            >
              <i class="fa-solid fa-plus mr-2"></i>Tambah Transaksi
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast Notifikasi -->
    <transition name="toast">
      <div 
        v-if="showToast" 
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
      >
        <i class="fa-solid fa-check-circle mr-2"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'

export default {
  name: 'Planner',
  components: { BackButton },
  data() {
    return {
      showModal: false,
      showToast: false,
      toastMessage: '',
      newTransaction: {
        description: '',
        category: '',
        amount: 0
      },
      transactions: [],
      savings: {
        current: 3500000,
        target: 5000000
      },
      budgets: {
        'Transportasi': {
          spent: 150000,
          limit: 500000
        },
        'Makan & Minum': {
          spent: 800000,
          limit: 1500000
        },
        'Hiburan': {
          spent: 550000,
          limit: 500000
        }
      }
    }
  },
  computed: {
    savingsPercentage() {
      return Math.min(Math.round((this.savings.current / this.savings.target) * 100), 100);
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addTransaction() {
      // Validasi form
      if (!this.newTransaction.description || !this.newTransaction.category || !this.newTransaction.amount) {
        alert('Harap isi semua field!');
        return;
      }
      
      // Tambahkan tanggal saat ini
      const today = new Date();
      const formattedDate = today.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Tambahkan transaksi baru
      this.transactions.push({
        ...this.newTransaction,
        date: formattedDate
      });
      
      // Update anggaran sesuai kategori
      if (this.budgets[this.newTransaction.category]) {
        this.budgets[this.newTransaction.category].spent += parseInt(this.newTransaction.amount);
      }
      
      // Tampilkan toast
      this.showToastMessage('Transaksi berhasil ditambahkan!');
      
      // Reset form dan tutup modal
      this.resetForm();
      this.closeModal();
    },
    cancelTransaction() {
      this.resetForm();
      this.closeModal();
    },
    resetForm() {
      this.newTransaction = {
        description: '',
        category: '',
        amount: 0
      };
    },
    formatAmount(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    getBudgetPercentage(category) {
      const budget = this.budgets[category];
      if (!budget) return 0;
      return Math.round((budget.spent / budget.limit) * 100);
    },
    getBudgetColor(category) {
      const percentage = this.getBudgetPercentage(category);
      if (percentage <= 33) return 'bg-green-500';
      if (percentage <= 67) return 'bg-yellow-400';
      return 'bg-red-500';
    },
    getBudgetIcon(category) {
      const percentage = this.getBudgetPercentage(category);
      if (percentage <= 33) return '/aman.png';
      if (percentage <= 67) return '/danger-icon.png';
      return '/warning-icon.png';
    }
  }
}
</script>

<style scoped>
h1, h2, h3, p, td, th, label {
  font-family: 'Secular One', sans-serif;
}

/* Animasi Modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-content {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.modal-leave-to .modal-content {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Animasi Toast */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>