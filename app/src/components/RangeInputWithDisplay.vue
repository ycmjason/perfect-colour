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
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: {
		min: {
			type: Number,
			required: true,
		},
		max: {
			type: Number,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
		step: {
			type: Number,
			required: true,
		},
	},
	emits: {
		"update:value": (_value: number) => true,
	},
	setup(_props, { emit }) {
		const rangeInputRef = ref<HTMLInputElement | null>(null);

		const onInput = () => {
			const rangeInputEl = rangeInputRef.value;
			if (!(rangeInputEl instanceof HTMLInputElement)) return;

			emit("update:value", Number(rangeInputEl.value));
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
