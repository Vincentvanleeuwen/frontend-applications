<template>

  <div class="todo" v-bind:class="{'is-complete': todo.completed}">

    <label>
      <input type="checkbox" v-on:change="$emit('complete-todo', todo.id)" v-bind:checked="todo.completed">
    </label>

    {{ todo.todo }}


    <button @click="$emit('remove-todo', todo.id)">x</button>

  </div>

</template>

<script>

export default {
  name: "ToDo",
  props: ['todo'],

}
</script>

<style scoped>
.todo {
  text-decoration: none;
  border: lightcoral solid 2px;
  border-radius: .5em;
  height: auto;
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

label input[type='checkbox'] {
  visibility: hidden;
}
label  {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  padding:0;
}
button {
  position: absolute;
  right:1em;
  color: darkred;
  padding: 0 .2em;
}
/*button:last-child {*/
/*  position: absolute;*/
/*  right:3em;*/
/*  color: darkred;*/
/*  padding: 0 .2em;*/
/*}*/
</style>