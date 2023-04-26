<script setup>
import { computed } from 'vue'

//Icons
import LogoIcon from './Icons/LogoIcon.vue'
import BurgerIcon from './Icons/BurgerIcon.vue'

const props = defineProps({
  icon: String
})

const icons = {
  logo: LogoIcon,
  burger: BurgerIcon
}

const iconComponent = computed(() => icons[props.icon])
</script>

<template>
  <component :is="iconComponent" role="img" class="base" />
</template>

<style scoped>
.base {
  width: 2rem;
  height: 2rem;
}
</style>
