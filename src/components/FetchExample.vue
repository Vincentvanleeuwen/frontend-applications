<template>
  <div v-if="error"> {{ error }}</div>
  <div v-for="city in cities.data" :key="city.id">
    {{ city.location }} {{ city.capacity }}
  </div>
</template>

<script>

import { ref } from 'vue'
export default {
  name: "FetchExample",

  async setup() {
    const cities = ref(null)
    const error = ref(null)

    try {
      const cityResponse = await fetch('')
      cities.value = await cityResponse.json()
    } catch (e) {
      error.value = e
    }


    return { cities, error }
  }
}
</script>

<style scoped>

</style>