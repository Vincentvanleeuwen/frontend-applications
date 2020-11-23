<template>
  <div class="title">
    <h1>Hoe krap is het per stad in parkeergarages qua oplaadpunten voor elektrische auto's?</h1>
  </div>
  <div id="animation"></div>
  <div v-if="error">
    {{ error }}
    Cant fetch Data.
  </div>
  <div id="lolly-container" v-else>
    <Graph :cleanedData="dataState"/>
  </div>

  <p>
    Deze data komt voort van uit de Parkeergarage dataset van het RDW.
    Alle steden en dorpen in deze set zijn te zien in deze grafiek.
    Als uw dorp er niet bij staat, betekent dit dat het RDW hier geen data van heeft.
  </p>
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
import { onMounted } from "@vue/runtime-core";
// import { lottie } from 'lottie-web'

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
  name: 'GraphView',
  components: {
    Graph
  },
  setup() {
    let dataState = ref([])
    let error = ref(null)

    // lottie.loadAnimation({
    //   container: document.getElementById('animation'),
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   path: '../../public/media/data.json'
    // })
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

<style scoped>
#lolly-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 1em;
  width: 22em;
  color:white;
  font-weight: bold;
}
p {
  max-width: 50%;
}
.title {
  height: 50vh;
  border-radius: 0 0 50% 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #090606;
  width: 30em;
  padding-bottom: 5em;
  margin:-40vh 0 0 0;
}
</style>