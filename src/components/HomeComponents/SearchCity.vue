<script setup>
import { ref } from 'vue'
import { getCities } from '../../api/getCities'
import _ from 'lodash'

const options = ref([])
const search = _.debounce(async (searchValue, loading) => {
  // const res = await getCities(searchValue)
  // options.value = res.data.data.map((city) => {
  //   return {
  //     value: `${city.latitude} ${city.longitude}`,
  //     name: `${city.name}, ${city.countryCode}`
  //   }
  // })
  loading(false)
}, 600)

const onSearch = (searchValue, loading) => {
  if (searchValue.length) {
    loading(true)
    search(searchValue, loading)
  }
}
</script>

<template>
  <v-select
    class="search-bar"
    label="name"
    placeholder="Search you city"
    :filterable="false"
    :options="options"
    @search="onSearch"
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
