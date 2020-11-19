<template>
  <div v-if="error"> {{ error }}</div>
  <div v-for="city in combinedSet" :key="city">
    {{ city }}
  </div>
</template>

<script>

import { ref } from 'vue'
import { fetchData } from "@/helpers/fetchData";
import { convertToJSON } from "@/utils/convertToJSON";
import { filterDataSets } from '@/helpers/filterData'
import { mergeDataSets } from '@/helpers/mergeData'
import { correctPlaceNames } from '@/helpers/correctPlaceNames'
import { restructureDataSets } from '@/helpers/restructureData'


const endPoints = [
  'https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
  'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=5000'
]

export default {
  name: "FetchExample",

  async setup() {

    const combinedSet = ref(null)
    const error = ref(null)

    try {
      combinedSet.value = await fetchData(endPoints)
                                  .then(convertToJSON)
                                  .then(filterDataSets)
                                  .then(mergeDataSets)
                                  .then(correctPlaceNames)
                                  .then(restructureDataSets)
    } catch (e) {
      error.value = e
    }

    return { combinedSet, error }
  }
}
</script>

<style scoped>

</style>