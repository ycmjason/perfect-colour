<template>
  <form @submit.prevent="onSubmit" v-if="answerRGB">
    <NumberInput v-model="answerRGB[0]" :min="0" :max="difficulty"></NumberInput>
    <NumberInput v-model="answerRGB[1]" :min="0" :max="difficulty"></NumberInput>
    <NumberInput v-model="answerRGB[2]" :min="0" :max="difficulty"></NumberInput>
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import { value, createComponent, createElement as h, computed, watch } from 'vue-function-api';
import { RequiredProp } from '../helpers/vue-types';
import NumberInput from './NumberInput.vue';
import { normaliseRGB, RGB } from '../helpers/color';

export default {
  components: { NumberInput },
  ...createComponent({
    props: {
      difficulty: Number,
    },
    setup(props, { emit }) {
      const answerRGBRef = value<RGB>([0, 0, 0]);

      const onSubmit = () => {
        if (!props.difficulty) return;
        emit('submit', normaliseRGB(answerRGBRef.value, props.difficulty));
        answerRGBRef.value = [0, 0, 0];
      };

      return { answerRGB: answerRGBRef, onSubmit };
    },
  }),
};
</script>
