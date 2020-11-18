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
    // Reversed so they pop in from the top instead of from the bottom.
    removeToDo(index) {
      let newItems = this.items
      newItems.reverse().splice(index, 1)
      return newItems
    },
    reverse(array) {
      console.log(array);
      return array.slice().reverse()
    }
  }
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