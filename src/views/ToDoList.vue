<template>
  <label for="new-todo">
    <input id="new-todo" type="text" placeholder="Add a todo!" v-model="toDoText" @keyup.enter="addToDo(toDoText)">
  </label>

  <ul id="todo-container">

    <ToDo :items="items"/>
  </ul>
</template>

<script>
import { reactive, toRefs } from 'vue'
import ToDo from "@/components/ToDo"
const useToDoStates = () => {
  // Create states
  let state = reactive({
    toDoText: null
  })
  // make the states reactive
  return toRefs(state)
}
export default {
  name: "ToDoList",
  components: {
    ToDo
  },
  data: () => {
    return {
      items: [
        { todo: 'Eat' },
        { todo: 'Sleep' },
        { todo: 'Drink' }
      ]
    }
  },
  setup() {
    let { toDoText } = useToDoStates()
    return {
      toDoText
    }
  },
  methods: {
    addToDo(toDoText) {
      return this.items.push({todo: toDoText})
    }
  }
}
</script>

<style scoped>
ul {
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
input {
  border-radius: 1em;
  padding: .5em 1em;
  border: solid 1px grey;
}
input:focus {
  outline: none;
  border: solid 1px darkorange;
  transition: 1s;
}
</style>