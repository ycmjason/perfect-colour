<template>
<div>
  <Heading :h="2">Results</Heading>
  <table v-if="results.length > 0">
    <tr>
      <th>&num;</th>
      <th>Difficulty</th>
      <th>Question</th>
      <th>Your Answer</th>
    </tr>
    <tr :class="{ correctBg: isRGBEqual(question, answer), wrongBg: !isRGBEqual(question, answer) }" v-for="({ difficulty, question, answer }, i) of results" :key="i">
      <td>{{ i + 1 }}</td>
      <td>{{ difficulty }}</td>
      <td>{{ question }}</td>
      <td>{{ answer }}</td>
    </tr>
  </table>
  <i v-else>Your result will be recorded here.</i>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent } from 'vue-function-api';
import { isRGBEqual } from '../helpers/color';
import { getResults } from '../store/results';
import Heading from './Heading';

export default createComponent({
  components: { Heading },
  setup() {
    const { results } = getResults();
    return { results, isRGBEqual };
  },
});
</script>

<style lang="stylus" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 0;
}

td, th {
  padding: 1rem;
}

.correctBg {
  background-color: #c6f3c6;
}

.wrongBg {
  background-color: #ffbbbb;
}
</style>
