<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  meta: [
    { property: 'og:title', content: 'Harry Tran 998' },
    { property: 'og:image', content: 'https://harrytran998.me/avatar.png' },
    { name: 'description', content: `Harry Tran's blog` },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@harrytran998' },
  ],
})

</script>
