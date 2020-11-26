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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  display: flex;
  align-items: center;
  flex-direction: column;
}
body {
  margin: 0;
  font-family: Roboto, sans-serif;
  font-weight: 300;
}
h1 {
  font-family: Roboto, sans-serif;
  font-weight: 700;
}
p {
  font-family: Roboto, sans-serif;
  font-weight: 300;
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
  width: max-content;
  height: 1.5em;
  padding: 0 1em;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0;
  border-radius: 2px;
  color:white;
  font-weight: bold;
  padding-top:.5em;
  pointer-events: none;
}
.label-text {
  font-style: italic;
  /*font-weight: bold;*/
  font-size: .8em;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  fill: rgba(0, 0, 0, 0.8);
}
.title-text {
  font-weight: bold;
  font-size: .5em;
  fill: rgba(0, 0, 0, 1);
}
#y-axis {
  font-family: Roboto, sans-serif;
  font-weight: 300;
}
</style>