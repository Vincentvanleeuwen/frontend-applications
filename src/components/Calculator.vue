<template>
  <div id="calculator">
    <form>
      <label for="num1">
        <input type="text" v-model="numberOne" id="num1" maxlength="2"/>
      </label>
      <label for="operator">
        <select name="operator" id="operator" v-model="operator">
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="/">/</option>
          <option value="*">*</option>
        </select>
      </label>
      <label for="num2">
        <input type="text" v-model="numberTwo" id="num2" maxlength="2"/>
      </label>

      <span> = {{ result }} </span>
    </form>
  </div>

</template>

<script>
import { reactive, computed, toRefs } from 'vue'
const useCalculator = () => {
  // Create states
  let state = reactive({
    numberOne: 0,
    numberTwo: 0,
    operator: '+',
    result: computed(() => {
      switch(state.operator) {
        case '+':
          return parseInt(state.numberOne) + parseInt(state.numberTwo)
        case '-':
          return parseInt(state.numberOne) - parseInt(state.numberTwo)
        case '/':
          return parseInt(state.numberOne) / parseInt(state.numberTwo)
        case '*':
          return parseInt(state.numberOne) * parseInt(state.numberTwo)
      }
    })
  })
  // make the states reactive
  return toRefs(state)
}
export default {
  name: 'Calculator',
  // Import states into view
  setup() {
    let { numberOne, numberTwo, operator, result } = useCalculator()
    return {
      numberOne,
      numberTwo,
      operator,
      result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 2em;
  height: 2em;
  border: solid grey 1px;
  margin: 1em;
  text-align: center;
}
</style>