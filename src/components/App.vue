<template>
  <div class="container">
    <ForkMe></ForkMe>
    <Header></Header>

    <p>Difficulty: {{ difficulty }}</p>

    <div>
      <ColorRect size="l" :color="color"></ColorRect>
    </div>
    <AnswerForm
      class="answer-form"
      :difficulty="difficulty"
      @submit="onSubmit"
      @toggleHint="onToggleHint"
      :showHint="showHint"
    ></AnswerForm>

    <Results></Results>

    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ref, createComponent, computed, Ref } from 'vue-function-api';
import ColorRect from './ColorRect.vue';
import { randomRGB, rgbToCssColor, RGB, isRGBEqual } from '../helpers/color';
import AnswerForm from './AnswerForm.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { getResults } from '../store/results';
import Results from './Results.vue';
import ForkMe from './ForkMe.vue';

const useRandomRGB = (difficulty: Ref<number>) => {
  const rgbRef = ref(randomRGB(difficulty.value));
  const nextRGB = () => {
    rgbRef.value = randomRGB(difficulty.value);
  };

  return { rgbRef, nextRGB };
};

export default createComponent({
  components: { ColorRect, AnswerForm, Header, Results, Footer, ForkMe },
  setup() {
    const { addResult } = getResults();
    const difficulty = ref(1);
    const { rgbRef, nextRGB } = useRandomRGB(difficulty);

    const cssColorRef = computed(() => {
      const rgb = rgbRef.value;
      return rgbToCssColor(rgb);
    });

    const showHint = ref(false);
    const onToggleHint = (b: boolean) => (showHint.value = b);

    const onSubmit = (answerRGB: RGB) => {
      const questionRGB = rgbRef.value;
      const correct = isRGBEqual(questionRGB, answerRGB);

      if (correct) {
        difficulty.value = Math.min(255, difficulty.value + 1);
      } else {
        difficulty.value = Math.max(1, difficulty.value - 1);
      }

      addResult({
        difficulty: difficulty.value,
        question: questionRGB,
        answer: answerRGB,
        usedHint: showHint.value,
      });

      showHint.value = false;

      nextRGB();
    };

    return {
      difficulty,
      color: cssColorRef,
      onSubmit,
      showHint,
      onToggleHint,
    };
  },
});
</script>

<style lang="stylus">
@import 'normalize.css';
@require '../styles/vars';

html {
  font-family: 'Livvic', sans-serif;
  box-sizing: border-box;
}

*, *::before, *::after {
  font-family: inherit;
  font-size: inherit;
  box-sizing: inherit;
  color: inherit;
  text-align: inherit;
}

.container {
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  padding: 0 1rem;
}

input, button {
  padding: 1rem;
  border: 1px solid $border-color;
  background: white;
}

button, input[type=submit] {
  text-align: center;
  cursor: pointer;
}

input[type='range'] {
  padding: 0;
}

.space-1 {
  width: 1rem;
  flex-shrink: 0;
}
</style>

<style scoped>
.answer-form {
  margin: 1rem 0;
}
</style>
