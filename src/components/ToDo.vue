<template>

  <div class="todo" v-bind:class="{'is-complete': todo.completed, 'is-edit': todo.editMode}" >

    <label class="complete-todo">
      <input type="checkbox"
             v-on:change="$emit('complete-todo', todo.id)"
             v-bind:checked="todo.completed">
    </label>
    <div v-if="todo.editMode === false">
      {{ todo.todo }}
    </div>

    <form v-on:submit.prevent="$emit('complete-edit', todo.id, toDoEdit)">
      <label>
        <input class="edit-todo"
               type="text"
               v-model="toDoEdit"
               v-bind:class="{'is-editing': todo.editMode}">
      </label>
    </form>

    <section class="option-container">
      <font-awesome-icon :icon="editIcon"
                         :style="{ zIndex: 10 }"
                         @click="enableEditMode"/>
      <font-awesome-icon :icon="deleteIcon"
                         :style="{ zIndex: 10 }"
                         @click="$emit('remove-todo', todo.id)"/>
    </section>


  </div>

</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { reactive, toRefs } from 'vue'
const useToDoStates = () => {
  // Create states
  let state = reactive({
    toDoEdit: null
  })
  // make the states reactive
  return toRefs(state)
}
export default {
  name: "ToDo",
  props: ['todo'],
  setup() {
    let { toDoEdit } = useToDoStates()
    return {
      toDoEdit
    }
  },
  data () {
    return {
      deleteIcon: faTrash,
      editIcon: faEdit,
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    enableEditMode() {

      const selected = this.todo
      selected.editMode = !selected.editMode
      this.toDoEdit = this.todo.todo

    },
    sendEdit() {
      console.log('hello')
    }
  }
}
</script>

<style scoped>
.todo {
  text-decoration: none;
  background: lightcoral;
  border: lightcoral solid 2px;
  border-radius: .5em;
  height: 2em;
  width: 15em;
  line-height: 2em;
  margin: .5em 0;
  padding: 0 1em;
  position: relative;
  color: white;
  cursor: pointer;
  max-width: 15em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-weight:bold;
}
.is-complete {
  border: #c5deaa solid 2px;
  color: white;
  background: #c5deaa
}
/* Hide checkbox */
label input[type='checkbox'] {
  visibility: hidden;
}
.complete-todo {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  padding:0;
}
button {
  position: absolute;
  right:1em;
  color: darkred;
  padding: 0 .2em;
}

.option-container {

  width: 20%;
  display: flex;
  justify-content: space-between;
}
.edit-todo {
  display: none;
  border: none;
  position: absolute;
  left: .9em;
  color:white;
  height: 2em;
  top: 0;
  font-weight: bold;
  font-size:1em;
  background-color: inherit;
}
.edit-todo:focus {
  outline: none;
}
.is-editing {
  display: block;
}
.is-edit {
  background-color: orange;
  border: orange solid 2px;
}
</style>