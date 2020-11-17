<template>
  <div class="fetch">
    <h1>This is an about page</h1>
  </div>
  <div v-if="error"> {{ error }}</div>
  <Suspense>
    <template #default>
      <FetchExample/>
    </template>
    <template #fallback>
      <div>Loading cities...</div>
    </template>
  </Suspense>

</template>
<script>
// @ is an alias to /src
import FetchExample from '@/components/FetchExample.vue'
import { ref, onErrorCaptured } from 'vue'

export default {
  name: 'fetch',

  setup() {
    const error = ref(null)

    onErrorCaptured(e => error.value = e)

    return { error }
  },
  components: {
    FetchExample
  }
}
</script>