<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { useAxios } from './api/useAxios'
import { useLoaderStore } from '@/stores/loader'

//Components
import NavBar from './components/NavBar.vue'
import GlobalLoader from './components/Loaders/GlobalLoader.vue'

onMounted(() => {
  useAxios(axios)
})

const store = useLoaderStore()
</script>

<template>
  <GlobalLoader v-if="store.$state.loading" />
  <NavBar />
  <main class="container">
    <RouterView />
  </main>
  <notifications position="bottom left" />
</template>

<style scoped></style>
