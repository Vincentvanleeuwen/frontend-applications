<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Calculator</router-link> |-->
<!--    <router-link to="/fetch">Fetch & Error Handeling</router-link> |-->
<!--    <router-link to="/todolist">To Do List</router-link>-->
<!--  </div>-->
  <h1 v-if="error"> {{error}}</h1>
  <Suspense v-else>
    <template #default>
      <router-view/>
    </template>
    <template #fallback>
      <p> Loading...</p>
    </template>
  </Suspense>
</template>

<script>

  import { ref, onErrorCaptured } from 'vue'
  export default {
    name: 'App',
    setup() {
      const error = ref(null);

      onErrorCaptured((e) => {
        error.value = e

        return true;
      });

      return { error };
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  flex-direction: column;
}
body {
  margin: 0;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.tooltip {
  position: absolute;
  text-align: center;
  width: 10em;
  height: 1.5em;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0;
  border-radius: 2px;
  color:white;
  font-weight: bold;
  padding-top:.5em;
  pointer-events: none;
}
</style>