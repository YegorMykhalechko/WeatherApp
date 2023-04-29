<script setup>
import { ref, computed, onMounted } from 'vue'
//Composables
import useBuildDate from '../../composables/useBuildDate'

//Components
import LineChart from './LineChart.vue'
import BaseButton from '../UI/BaseButton.vue'
import BaseIcon from '../IconVue/BaseIcon.vue'
import BaseModal from '../Modals/BaseModal.vue'
import SingleCard from './SingleCard.vue'
import MultipleCard from './MultipleCard.vue'

const props = defineProps(['weather', 'multiple', 'classic', 'step'])
const emit = defineEmits(['deleteCard'])

const getCitiesStorage = ref([])
const showInfoModal = ref(false)
const showConfirmModal = ref(false)
const location = ref(null)

onMounted(() => {
  getCitiesStorage.value = JSON.parse(localStorage.getItem('favorites')) || []
})

const isFavorite = computed(() => {
  return getCitiesStorage.value.some((el) => {
    return el.id === props.weather.id
  })
})

const toggleFavorites = () => {
  if (isFavorite.value) {
    getCitiesStorage.value = getCitiesStorage.value.filter((el) => {
      return el.id !== props.weather.id
    })
    localStorage.setItem('favorites', JSON.stringify(getCitiesStorage.value))
    return
  }

  if (getCitiesStorage.value.length >= 5) {
    showInfoModal.value = true
    return
  }

  const dataWeathers = {
    id: props.weather.id,
    city: props.weather.name + ',' + props.weather.sys.country,
    lat: props.weather.coord.lat,
    lon: props.weather.coord.lon
  }

  getCitiesStorage.value.push(dataWeathers)
  localStorage.setItem('favorites', JSON.stringify(getCitiesStorage.value))
}

const deleteWeatrherCard = () => {
  emit('deleteCard', props.weather.id)
}

const points = () => {
  let dayPoints = []
  if (props.step) {
    dayPoints = props.weather.hourly.filter((el) => {
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      const firstMomentTomorrow = tomorrow.setHours(0, 0, 0, 0)
      return new Date(el.dt * 1000) <= new Date(firstMomentTomorrow)
    })
  } else {
    dayPoints = props.weather.daily.slice(0, 5)
  }

  return dayPoints
}

const dailyWeathers = () => {
  location.value = props.weather.name + ',' + props.weather.sys.country
  return props.weather.daily.slice(0, 5)
}
</script>

<template>
  <div v-if="weather" class="weather-wrap" v-bind="$attrs">
    <div class="action-box" v-if="classic">
      <div class="actions">
        <BaseButton v-if="multiple" @click="showConfirmModal = true">Delete</BaseButton>
        <BaseButton @click="toggleFavorites">
          <BaseIcon class="icon" icon="start" :class="{ active: isFavorite }" />
        </BaseButton>
      </div>
    </div>

    <SingleCard v-if="weather && step" :weather="weather" />

    <div v-if="dailyWeathers() && !step" class="multiple-wrap">
      <template v-for="weather in dailyWeathers()">
        <MultipleCard :weather="weather" :city="location" />
      </template>
    </div>

    <LineChart :tempPoints="points()" :id="multiple ? weather?.id : 'canvas'" :step="step" />
  </div>

  <Transition name="modal">
    <BaseModal v-if="showInfoModal" @close="showInfoModal = false">
      <template v-slot:header>
        <h3>Delete city from favorite (Max 5 city)</h3>
      </template>
      <template v-slot:body>
        <BaseButton @click="showInfoModal = false">Ok</BaseButton>
      </template>
    </BaseModal>
  </Transition>

  <Transition name="modal">
    <BaseModal v-if="showConfirmModal" @close="showConfirmModal = false">
      <template v-slot:header>
        <h3>Are you sure?</h3>
      </template>
      <template v-slot:body>
        <div class="confirm-box">
          <BaseButton @click="showConfirmModal = false">Cancel</BaseButton>
          <BaseButton @click="deleteWeatrherCard">Ok</BaseButton>
        </div>
      </template>
    </BaseModal>
  </Transition>
</template>

<style lang="scss">
.weather-wrap {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 24px 12px;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.25);
  .action-box {
    display: flex;
    justify-content: end;
    .actions {
      display: flex;
      button {
        margin: 0 8px;
        .icon {
          fill: grey;
        }
        .active {
          fill: gold;
        }
      }
    }
  }

  .multiple-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media only screen and (min-width: 1024px) {
      flex-direction: row;
    }
  }
}

.confirm-box {
  display: flex;
  button {
    margin: 0 8px;
  }
}
</style>
