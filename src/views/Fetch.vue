<template>
  <div class="fetch">
    <h1>Kun je je elektrische auto kwijt in jouw stad?</h1>
  </div>
  <div v-if="error">
    {{ error }}
    Cant fetch Data.
  </div>

  <Graph :cleanedData="data"/>

</template>
<script>
// @ is an alias to /src
import Graph from '@/components/Graph.vue'
import { ref } from 'vue'
import { fetchData } from '@/helpers/fetchData';
import { convertToJSON } from '@/utils/convertToJSON';
import { filterDataSets } from '@/helpers/filterData'
import { mergeDataSets } from '@/helpers/mergeData'
import { correctPlaceNames } from '@/helpers/correctPlaceNames'
import { restructureDataSets } from '@/helpers/restructureData'

const endPoints = [
  'https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
  'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=5000'
]

// const useDataStates = () => {
//   // Create states
//
//   // make the states reactive
//   return toRefs(state)
// }
export default {
  name: 'Fetch',
  components: {
    Graph
  },
  async data() {
    return {
      data: await fetchData(endPoints)
                    .then(convertToJSON)
                    .then(filterDataSets)
                    .then(mergeDataSets)
                    .then(correctPlaceNames)
                    .then(restructureDataSets)
    }
  },
  mounted() {
    console.log('hi')
  },
  async setup() {
    let dataState = ref(null)
    let error = ref(null)

    try {
      dataState.value = await fetchData(endPoints)
                          .then(convertToJSON)
                          .then(filterDataSets)
                          .then(mergeDataSets)
                          .then(correctPlaceNames)
                          .then(restructureDataSets)
      console.log(dataState.value)
    } catch(e) {
      error.value = e

    }
    return {
      dataState,
      error
    }

  }

}
</script>