<template>
  <div>
    <h1>Perfect Colour</h1>
    <p>Do you have perfect colour?</p>

    <p>Difficulty: {{ difficulty }}</p>

    <ColorRect :color="color"></ColorRect>
    <AnswerForm @submit="onSubmit" :difficulty="difficulty"></AnswerForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { value, createComponent, createElement as h, computed } from 'vue-function-api';
import ColorRect from './ColorRect.vue';
import { randomRGB, rgbToCssColor, RGB } from '../helpers/color';
import AnswerForm from './AnswerForm.vue';

const useRandomRGB = (initialDifficulty: number) => {
  const rgbRef = value(randomRGB(initialDifficulty));
  const nextRGB = (difficulty: number) => {
    rgbRef.value = randomRGB(difficulty);
  };

  return { rgbRef, nextRGB };
};

export default {
  components: { ColorRect, AnswerForm },
  ...createComponent({
    setup() {
      const difficultyRef = value(1);

      const { rgbRef, nextRGB } = useRandomRGB(1);

      const cssColorRef = computed(() => {
        const [r, g, b] = rgbRef.value;
        return rgbToCssColor(r, g, b);
      });

      const onSubmit = ([answerR, answerG, answerB]: RGB) => {
        const [r, g, b] = rgbRef.value;
        if (answerR === r && answerG === g && answerB === b) {
          nextRGB(++difficultyRef.value);
        }
      };

      return {
        difficulty: difficultyRef,
        color: cssColorRef,
        onSubmit,
      };
    },
  }),
};
</script>
