<script setup>
import { ref } from 'vue'
import _ from 'lodash'

//API
import { getCities } from '../../api/getCities'

const emit = defineEmits(['getCity'])

const options = ref([])
const selectedCity = ref(null)

const parseSearch = (cities) => {
  return cities.map((city) => {
    return {
      value: `${city.lat} ${city.lon}`,
      name: `${city.name}, ${city.country}, ${city.state}`
    }
  })
}

const search = _.debounce(async (searchValue, loading) => {
  try {
    const res = await getCities(searchValue)
    options.value = parseSearch(res.data)
  } catch (err) {
    console.log(err)
  } finally {
    loading(false)
  }
}, 600)

const onSearch = (searchValue, loading) => {
  if (searchValue.length) {
    loading(true)
    search(searchValue, loading)
  }
}

const selectCity = () => {
  emit('getCity', selectedCity.value)
//   emit('getCity', { name: 'Opole, Pl', value: '50.672222222 17.925277777' })
}
</script>

<template>
  <v-select
    v-model="selectedCity"
    @search="onSearch"
    @change="selectCity"
    :options="options"
    :filterable="false"
    class="search-bar"
    label="name"
    placeholder="Search you city"
  >
    <template slot="no-options"> type to search GitHub repositories.. </template>
    <template slot="option" slot-scope="option">
      <div class="d-center">
        {{ option }}
      </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div class="selected d-center">
        {{ option }}
      </div>
    </template>
  </v-select>
</template>

<style lang="scss">
.search-bar {
  .vs__selected-options {
    padding: 16px 12px;
  }

  .vs__actions {
    padding: 16px 12px;
  }

  .vs__search,
  .vs__search::placeholder,
  .vs__search:focus,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    font-size: 24px;
  }

  .vs__search::placeholder {
    opacity: 0.6;
  }
}
</style>
