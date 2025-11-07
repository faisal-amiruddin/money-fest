<template>
  <header class="bg-[#1E1E1E] text-white mb-10 fixed w-full">
    <nav class="max-w-7xl mx-auto flex items-center justify-between py-3">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <img src="/logo.png" alt="" class="h-15">
        <h1 class="text-xl font-bold">Money Vest</h1>
      </router-link>

      <!-- Menu -->
      <ul class="flex items-center gap-1">
        <li>
          <img src="/notif.png" alt="" class="h-10 hover:cursor-pointer">
        </li>
        <li>
          <img src="/profile.png" alt="" class="h-10 hover:cursor-pointer">
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>
