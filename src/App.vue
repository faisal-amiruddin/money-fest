<script setup>
import ChatAI from './components/ChatAI.vue';
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="w-7xl mx-auto">
    <router-view />
  </div>
  <ChatAI />
</template>
