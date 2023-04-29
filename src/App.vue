<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAxios } from './api/useAxios'
import { useLoaderStore } from '@/stores/loader'
import { useWeatherBlocksStore } from './stores/weatherBlocks'

//Components
import NavBar from './components/NavBar.vue'
import GlobalLoader from './components/Loaders/GlobalLoader.vue'
import StepsBar from './components/StepsBar.vue'

onMounted(() => {
  useAxios(axios)
})

const store = useLoaderStore()
const weatherStore = useWeatherBlocksStore()
const componentKey = ref(1)

const changeStep = (step) => {
  weatherStore.step = step
  forceRerender()
}

const forceRerender = () => {
  componentKey.value += 1
}
</script>

<template>
  <GlobalLoader v-if="store.$state.loading" />
  <NavBar />
  <StepsBar @changeStep="changeStep" :step="weatherStore.step" />
  <main class="container" :key="componentKey">
    <RouterView />
  </main>
  <notifications position="bottom left" />
</template>

<style scoped></style>
