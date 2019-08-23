<template>
  <div class="container">
    <Header></Header>

    <p>Difficulty: {{ difficulty }}</p>

    <ColorRect size="l" :color="color"></ColorRect>
    <AnswerForm class="answer-form" @submit="onSubmit" :difficulty="difficulty"></AnswerForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ref, createComponent, computed, Ref } from 'vue-function-api';
import ColorRect from './ColorRect.vue';
import { randomRGB, rgbToCssColor, RGB } from '../helpers/color';
import AnswerForm from './AnswerForm.vue';
import Header from './Header.vue';

const useRandomRGB = (difficulty: Ref<number>) => {
  const rgbRef = ref(randomRGB(difficulty.value));
  const nextRGB = () => {
    rgbRef.value = randomRGB(difficulty.value);
  };

  return { rgbRef, nextRGB };
};

export default createComponent({
  components: { ColorRect, AnswerForm, Header },
  setup() {
    const difficulty = ref(1);
    const { rgbRef, nextRGB } = useRandomRGB(difficulty);

    const cssColorRef = computed(() => {
      const rgb = rgbRef.value;
      return rgbToCssColor(rgb);
    });

    const onSubmit = ([answerR, answerG, answerB]: RGB) => {
      const [r, g, b] = rgbRef.value;
      const correct = answerR === r && answerG === g && answerB === b;

      if (correct) {
        difficulty.value = Math.min(255, difficulty.value + 1);
      } else {
        difficulty.value = Math.max(1, difficulty.value - 1);
      }

      nextRGB();
    };

    return {
      difficulty,
      color: cssColorRef,
      onSubmit,
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
  max-width: 30rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}

input, button {
  padding: 1rem;
  border: 1px solid $border-color;
  background: white;
}

button, input[type=submit] {
  text-align: center;
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
