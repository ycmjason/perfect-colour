<template>
  <input type="number" @input.prevent="onInput" :value="value" :min="min" :max="max" />
</template>

<script lang="ts">
import { value as ref, createComponent, createElement as h, computed } from 'vue-function-api';
import { RequiredProp } from '../helpers/vue-types';

export default createComponent({
  props: {
    min: RequiredProp<number>(Number),
    max: RequiredProp<number>(Number),
    value: RequiredProp<number>(Number),
  },
  setup({ value }, { emit }) {
    const onInput = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        emit('input', Number(e.target.value));
      }
    };
    return { onInput };
  },
});
</script>
