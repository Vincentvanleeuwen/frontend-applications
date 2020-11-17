<template>
  <li v-for="(toDo, index) in reverse(items)" :key="index" @click="removeToDo(index)">
    {{ toDo.todo }} <span>x</span>
  </li>
</template>

<script>
export default {
  name: "ToDo",
  props: ['items'],
  methods: {
    removeToDo(index) {
      let newItems = this.items
      newItems.splice(index, 1)
      return newItems
    },
    reverse(array) {
      console.log(array);
      return array.slice().reverse()
    }
  },
  // filters: {
  //
  // }
  // Source
  //https://stackoverflow.com/questions/41215867/why-is-vue-js-chrome-devtools-not-detecting-vue-js
}
</script>

<style scoped>
li {
  text-decoration: none;
  list-style-type: none;
  background-color: lightcoral;
  border-radius: 2em;
  height: 2em;
  width: 10em;
  line-height: 2em;
  margin: .5em 0;
  position: relative;
  color: white;
  cursor: pointer;
}
li span {
  position: absolute;
  right:1em;
  color: darkred;
}
</style>