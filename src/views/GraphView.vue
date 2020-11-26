<template>
    <div class="title"
         data-aos="zoom-out-down">
      <h1>Kun je je elektrische auto gemakkelijk opladen in parkeergarages in Nederland?</h1>
    </div>

  <section class="story-container">
    <p data-aos="fade-right"
       data-aos-delay="500">
      Amsterdam heeft als doel om in 2030 een elektrische stad te zijn. Dit houdt in dat er dus ook geen benzine
      voertuigen mogen rijden. Wat ik mij afvraag, kunnen de parkeergarages genoeg oplaadpunten aanbieden als er alleen
      maar elektrische voertuigen mogen rijden in de stad, en hoe gaan de omliggende dorpen en steden daarmee om?
    </p>
    <p data-aos="fade-left"
       data-aos-offset="500">
      In de onderstaande grafiek heb ik aan de hand van RDW data onderzocht hoeveel laadpunten en parkeerplaatsen er zijn per
      stad of dorp in parkeergarages.
    </p>
  </section>


  <div id="animation"></div>
  <div v-if="error">
    {{ error }}
    Cant fetch Data.
  </div>
  <div id="lolly-container"
       v-else-if="dataState.length"
       data-aos="fade-up"
       data-aos-offset="500">
    <Graph :cleanedData="dataState" />
  </div>
  <section class="story-container">
    <p>Wat opvalt is dat Amsterdam op beide vlakken (parkeerplaatsen en oplaadpunten) aan de kop ligt. Omdat zij als
    stad ook hebben aangegeven een volledig elektrische stad te willen worden is het logisch dat zij ook de meeste
      laadpunten aanbieden. Zodra je naar andere dorpen en steden kijkt, kun je zien dat het erg schaars kan zijn
      qua elektrische laadpunten.</p>
  </section>
  <p class="disclaimer">
    Deze data komt voort van uit de Parkeergarage dataset van het RDW.
    Alle steden en dorpen in deze set zijn te zien in deze grafiek.
    Als uw stad of dorp er niet bij staat, betekent dit dat het RDW hier geen data van heeft.
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
import AOS from 'aos'
import 'aos/dist/aos.css'


const endPoints = [
  'https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000',
  'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=5000'
]

export default {
  name: 'GraphView',
  components: {
    Graph
  },
  setup() {
    AOS.init()
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

<style scoped>
#lolly-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-size: 1.5em;
  line-height: 2em;
  width: 22em;
  color:white;
  font-weight: bold;
}
.story-container {
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.story-container:first-of-type p:first-of-type:not(.disclaimer)  {
  font-weight: 700;
}
.story-container:last-of-type {
  justify-content: center;
  align-items: center;
}
p {
  max-width: 30%;
  margin: 2em 4em;
}
.title {
  height: 60vh;
  text-align: center;
  border-radius: 0 0 50% 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #222020;
  width: 40em;
  padding-bottom: 4em;
  margin: -40vh 0 0 0;
}

.slide-in-enter-from {
  margin: -500px;
  transition: all .5s ease;
}
.slide-in-enter-to {
  margin: 0;
  transition: all .5s ease;
}
.disclaimer {
  max-width: 100%;
  margin: 2em 0 0 0;
  background-color: #222222;
  color: #fcfcfc;
  padding: 2em 10em;
}
</style>