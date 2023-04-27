<script setup>
import { ref, computed, onMounted } from 'vue'
//Composables
import useBuildDate from '../../composables/useBuildDate'

//Components
import LineChart from './LineChart.vue'
import BaseButton from '../UI/BaseButton.vue'
import BaseIcon from '../IconVue/BaseIcon.vue'
import BaseModal from '../Modals/BaseModal.vue'

const props = defineProps(['weather', 'multiple'])
const emit = defineEmits(['deleteCard'])

const getCitiesStorage = ref([])
const showInfoModal = ref(false)
const showConfirmModal = ref(false)

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

  getCitiesStorage.value.push(props.weather)
  localStorage.setItem('favorites', JSON.stringify(getCitiesStorage.value))
}

const deleteWeatrherCard = () => {
  emit('deleteCard', props.weather.id)
}
</script>

<template>
  <div v-if="weather" class="weather-wrap" v-bind="$attrs">
    <div class="action-box">
      <div class="actions">
        <BaseButton v-if="multiple" @click="showConfirmModal = true">Delete</BaseButton>
        <BaseButton @click="toggleFavorites">
          <BaseIcon class="icon" icon="start" :class="{ active: isFavorite }" />
        </BaseButton>
      </div>
    </div>
    <div class="location-box">
      <div class="location">{{ weather?.name }}, {{ weather?.sys?.country }}</div>
      <div class="date">{{ useBuildDate() }}</div>
    </div>
    <div class="weather-box">
      <div class="temp">{{ Math.round(weather?.main?.temp) }}°C</div>
      <div class="weather">{{ weather?.weather[0]?.main }}</div>
    </div>
    <LineChart
      v-if="weather?.list"
      :tempPoints="weather?.list"
      :id="multiple ? weather?.id : 'canvas'"
    />
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
  .location-box {
    text-align: center;
    .location {
      color: #000;
      font-size: 32px;
      font-weight: 500;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .date {
      color: #000;
      font-size: 20px;
      font-weight: 300;
      font-style: italic;
      text-align: center;
    }
  }

  .weather-box {
    text-align: center;
    .temp {
      display: inline-block;
      padding: 10px 25px;
      color: #000;
      font-size: 102px;
      font-weight: 900;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      margin: 30px 0px;
      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }

    .weather {
      color: #000;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
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
