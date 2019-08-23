<template>
<div>
  <Heading :h="2">Results</Heading>
  <table v-if="rows.length > 0">
    <tr>
      <th>&num;</th>
      <th>Difficulty</th>
      <th>Question</th>
      <th>Your Answer</th>
    </tr>
    <tr v-for="({ index, difficulty, question, answer, isCorrect }) of rows" :key="index" :class="isCorrect? 'correctBg': 'wrongBg'">
      <td>{{ index }}</td>
      <td>{{ difficulty }}</td>
      <td><ColorRect :color="question" size="s" class="colorRect"></ColorRect>{{ question }}</td>
      <td><ColorRect :color="answer" size="s" class="colorRect"></ColorRect>{{ answer }}</td>
    </tr>
  </table>
  <i v-else>Your result will be recorded here.</i>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, computed } from 'vue-function-api';
import { isRGBEqual } from '../helpers/color';
import { getResults } from '../store/results';
import Heading from './Heading';
import ColorRect from './ColorRect.vue';

export default createComponent({
  components: { Heading, ColorRect },
  setup() {
    const { results } = getResults();
    const rows = computed(() => {
      return results.value.map(({ difficulty, question, answer }, index) => {
        return {
          index,
          difficulty,
          question: `rgb(${question.join(',')})`,
          answer: `rgb(${answer.join(',')})`,
          isCorrect: isRGBEqual(question, answer),
        };
      });
    });
    return { rows, isRGBEqual };
  },
});
</script>

<style lang="stylus" scoped>
@require '../styles/vars';

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid $border-color;
  text-align: left;
}

td, th {
  padding: 0.5rem;
}

.correctBg {
  background-color: #c6f3c6;
}

.wrongBg {
  background-color: #ffbbbb;
}

.colorRect {
  margin-right: 1rem;
}
</style>
