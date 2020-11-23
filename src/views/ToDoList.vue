<template>
  <span v-if="items.length !== 0"
        class="counter">
     [ {{completed}} / {{items.length}} ] -  Completed To Do's
  </span>
  <form @submit.prevent="addToDo">
    <label for="new-todo">
      <input id="new-todo"
             type="text"
             placeholder="Add a todo!"
             v-model="toDoText">
    </label>
    <input type="submit" value="add">
  </form>

  <!--  Loop through todo's  -->

  <section id="todo-container" >
    <ToDo v-for="todo in reverse(items)"
          v-bind:key="todo.id"
          v-bind:todo="todo"
          v-on:remove-todo="removeToDo"
          v-on:complete-todo="completeToDo"
          v-on:complete-edit="completeEdit"/>
  </section>
</template>

<script>

import { reactive, toRefs } from 'vue'
import ToDo from '@/components/ToDo'
import { selectToDo } from "@/utils/selectToDo";

const useToDoStates = () => {
  // Create states
  let state = reactive({
    toDoText: null,
    completed: 0
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
      items: []
    }
  },
  setup() {
    let { toDoText, completed } = useToDoStates()
    return {
      toDoText,
      completed
    }
  },
  methods: {
    addToDo() {
      // Create new todo
      const newToDo = {
        id: this.items.length + 1,
        todo: this.toDoText,
        completed: false,
        editMode: false
      }
      // Empty input after creation
      this.toDoText = ''

      // Add new todo to array
      this.items = [...this.items, newToDo]
    },
    reverse(array) {
      // Reverse the array so items pop in from the top
      return [...array].reverse()
    },
    removeToDo(id) {
      // Filter the removed item out of the array
      this.items = this.items.filter((item)=> {
        return item.id !== id
      });
    },
    completeToDo(id) {
      // Select the right todo
      const selected = selectToDo(id, this.items)

      // Switch checkbox to on or off
      selected.completed = !selected.completed

      // Count completed todo's
      selected.completed ? this.completed++ : this.completed--
    },
    completeEdit(id, editVal) {
      // Select the right todo
      const selected = selectToDo(id, this.items)

      // Change todo value to edit value
      selected.todo = editVal

      // Change editmode to false
      selected.editMode = false
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
input[type="submit"] {
  margin-left: 1em;
  background-color: #e7afa2;
  color: white;
  font-weight: bold;
  border: none;
}
.counter {
  font-weight: bold;
  margin-bottom: 1em;

}
</style>