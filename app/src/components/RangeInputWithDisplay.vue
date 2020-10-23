<template>
  <div class="c-number-input">
    {{ value }}
    <input
      class="c-number-input__control"
      ref="rangeInputRef"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RequiredProp } from '../helpers/vue-types';

const isNumber = (n: any): n is number => {
  return typeof n === 'number';
};

export default defineComponent({
  props: {
    min: RequiredProp(Number),
    max: RequiredProp(Number),
    value: RequiredProp(Number),
    step: RequiredProp(Number),
  },
  emits: {
    'update:value': (value: number) => true,
  },
  setup(props, { emit }) {
    const rangeInputRef = ref<HTMLInputElement | null>(null);

    const onInput = () => {
      const rangeInputEl = rangeInputRef.value;
      if (!(rangeInputEl instanceof HTMLInputElement)) return;

      emit('update:value', Number(rangeInputEl.value));
    };

    return { onInput, rangeInputRef };
  },
});
</script>

<style lang="stylus" scoped>
@require '../styles/vars';

.c-number-input {
  display: flex;
  align-items: stretch;
  position: relative;
  border: 1px solid $border-color;
  border-radius: 1rem;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;

  &__control {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>
