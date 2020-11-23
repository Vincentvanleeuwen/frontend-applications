<template>
  <div class="fetch">
    <h1>Kun je je elektrische auto kwijt in jouw stad?</h1>
  </div>
  <div v-if="error">
    {{ error }}
    Cant fetch Data.
  </div>
  <div id="lolly-container" v-else>
    <Graph :cleanedData="dataState"/>
  </div>
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
import {onMounted} from "@vue/runtime-core";

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
  setup() {
    let dataState = ref([])
    let error = ref(null)

    onMounted(() => {
      fetchData(endPoints)
        .then(convertToJSON)
        .then(filterDataSets)
        .then(mergeDataSets)
        .then(correctPlaceNames)
        .then(restructureDataSets)
        .then(data => {
          dataState.value = data
        })
       .catch(err => {
          error.value = err
        })
    })

    return {
      dataState,
      error
    }

  }

}
</script>

<style>
#lolly-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>