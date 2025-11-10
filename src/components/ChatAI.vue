<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const isOpen = ref(false)
const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const chatContainer = ref(null)
const isTyping = ref(false)

// Ambil API key dari environment
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY'
const SYSTEM_PROMPT = `Anda adalah asisten edukasi investasi profesional yang berfokus pada topik:
- Reksa Dana
- ETF (Exchange Traded Fund)
- Saham
- Dasar-dasar investasi untuk pemula

Aturan:
1. Selalu gunakan bahasa Indonesia yang santai namun informatif
2. Jelaskan konsep dengan analogi sederhana
3. Berikan contoh konkret ketika memungkinkan
4. Untuk pertanyaan di luar topik investasi, arahkan kembali ke topik edukasi investasi
5. Jangan pernah memberikan saran investasi spesifik atau rekomendasi saham
6. Selalu tekankan pentingnya konsultasi dengan ahli keuangan profesional
7. Respon harus singkat, jelas, dan mudah dipahami pemula
8. Anda dilarang keras menggunakan output bold seperi ** atau *, jadi jangan gunakan simbol * sama sekali.`

// Perbaikan: Gunakan model yang benar dan endpoint yang valid
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userMessage = userInput.value.trim()
  messages.value.push({ role: 'user', content: userMessage })
  userInput.value = ''
  isLoading.value = true
  isTyping.value = true

  try {
    // Gunakan endpoint dan model yang benar
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: messages.value.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          })),
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Terjadi kesalahan pada server')
    }

    const data = await response.json()
    const aiResponse = data.candidates[0].content.parts[0].text

    // Simulasi typing effect
    setTimeout(
      () => {
        messages.value.push({ role: 'model', content: aiResponse })
        isTyping.value = false
      },
      1000 + Math.random() * 1000,
    ) // Random delay untuk efek natural
  } catch (error) {
    console.error('AI Error:', error)
    messages.value.push({
      role: 'model',
      content: `Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti. Error: ${error.message}`,
    })
    isTyping.value = false
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    setTimeout(scrollToBottom, 100)
  }
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// Auto-scroll saat pesan berubah
watch(messages, async () => {
  await nextTick()
  scrollToBottom()
})

onMounted(() => {
  // Tampilkan chat secara default untuk debugging
  isOpen.value = false

  // Tambahkan pesan sambutan
  if (messages.value.length === 0) {
    messages.value.push({
      role: 'model',
      content: 'Halo! Saya asisten edukasi investasi. Ada yang bisa saya bantu?',
    })
  }

  // Auto-scroll setelah komponen dimount
  setTimeout(scrollToBottom, 300)
})
</script>

<template>
  <!-- Chat Button (selalu muncul) -->
  <div class="fixed bottom-6 right-6 z-50 cursor-pointer animate-fade-in" @click="toggleChat">
    <div class="relative">
      <div
        class="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg border-2 border-[#1E1E1E] transition-transform hover:scale-110"
      >
        <i class="fas fa-robot text-white text-2xl"></i>
      </div>

      <!-- Notification dot -->
      <div
        v-if="!isOpen && messages.length > 0"
        class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#1E1E1E] animate-pulse"
      ></div>

      <!-- Tooltip -->
      <div
        class="absolute -top-8 right-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      >
        Edukasi Investasi
      </div>
    </div>
  </div>

  <!-- Chat Window -->
  <div
    v-if="isOpen"
    class="fixed bottom-24 right-6 w-80 rounded-xl shadow-2xl z-50 overflow-hidden border border-emerald-500/30 bg-[#1E1E1E] animate-slide-up"
  >
    <!-- Header -->
    <div class="bg-emerald-600 text-white p-3 flex justify-between items-center">
      <h3 class="font-bold flex items-center">
        <i class="fas fa-chart-line mr-2"></i>
        <span class="hidden sm:inline">AI Chat</span>
        <span class="sm:hidden">Investasi</span>
      </h3>
      <button @click="toggleChat" class="hover:text-emerald-200 transition">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Messages Container -->
    <div ref="chatContainer" class="h-96 overflow-y-auto p-4 space-y-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{
          'flex justify-end': message.role === 'user',
          'flex justify-start': message.role === 'model',
        }"
      >
        <div
          :class="[
            'max-w-[85%] rounded-lg px-4 py-3 shadow',
            message.role === 'user'
              ? 'bg-emerald-600 text-white rounded-br-none'
              : 'bg-[#2D2D2D] text-gray-200 border border-emerald-900/30 rounded-bl-none',
          ]"
        >
          <p class="whitespace-pre-wrap">{{ message.content }}</p>
        </div>
      </div>

      <!-- Typing Animation -->
      <div v-if="isTyping" class="flex justify-start animate-fade-in">
        <div
          class="bg-[#2D2D2D] rounded-lg px-4 py-3 rounded-bl-none max-w-[85%] border border-emerald-900/30"
        >
          <div class="flex space-x-1">
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
              style="animation-delay: 0ms"
            ></div>
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
              style="animation-delay: 150ms"
            ></div>
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
              style="animation-delay: 300ms"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-emerald-500/20 p-3 bg-[#1E1E1E]">
      <div class="flex items-center">
        <textarea
          v-model="userInput"
          @keydown="handleKeyPress"
          placeholder="Tanyakan tentang investasi..."
          class="flex-1 bg-[#2D2D2D] border border-emerald-500/30 text-white rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none placeholder:text-gray-400 min-h-[40px] max-h-[120px]"
          :disabled="isLoading"
        ></textarea>
        <button
          @click="sendMessage"
          :disabled="isLoading || !userInput.trim()"
          class="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed h-10"
          :class="isLoading ? 'animate-pulse' : ''"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
}

/* Bounce animation */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
  display: inline-block;
}

/* Auto-resize textarea */
textarea {
  overflow-y: auto;
  transition: all 0.2s ease;
}
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}
</style>
