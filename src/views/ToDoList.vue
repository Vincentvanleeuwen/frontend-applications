<template>
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
        {
          id: 1,
          todo: 'Eat',
          completed: true,
          editMode: false,
        },
        {
          id: 2,
          todo: 'Sleep',
          completed: false,
          editMode: false,
        },
        {
          id: 3,
          todo: 'Drink',
          completed: false,
          editMode: false
        }
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
    addToDo() {
      // Create new todo
      console.log(this.toDoText)
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
     return [...array].reverse()
    },
    removeToDo(id) {
      this.items = this.items.filter((item)=> {
        return item.id !== id
      });
    },
    completeToDo(id) {
      const selected = selectToDo(id, this.items)
      selected.completed = !selected.completed
    },
    completeEdit(id, editVal) {
      const selected = selectToDo(id, this.items)
      selected.todo = editVal
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
</style>