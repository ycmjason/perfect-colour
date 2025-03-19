<template>
  <form @submit.prevent="onSubmit" v-if="answerRGB" class="c-answer-form">
    <p>Mix the RGB to match the color.</p>
    <div class="c-answer-form__input-group c-answer-form__input-rgb">
      <RangeInputWithDisplay
        class="c-answer-form__input c-answer-form__input-r"
        v-model:value="answerRGB[0]"
        :min="0"
        :max="255"
        :step="step"
      ></RangeInputWithDisplay>
      <RangeInputWithDisplay
        class="c-answer-form__input c-answer-form__input-g"
        v-model:value="answerRGB[1]"
        :min="0"
        :max="255"
        :step="step"
      ></RangeInputWithDisplay>
      <RangeInputWithDisplay
        class="c-answer-form__input c-answer-form__input-b"
        v-model:value="answerRGB[2]"
        :min="0"
        :max="255"
        :step="step"
      ></RangeInputWithDisplay>
    </div>
    <div class="c-answer-form__input-group c-answer-form__hint">
      <label class="c-answer-form__hint-label">
        <input
          type="checkbox"
          :checked="showHint"
          @change="onToggleHint"
          class="c-answer-form__hint-checkbox"
          :disabled="showHint"
        />
        Show hints?
      </label>
      <ColorRect size="s" :color="answerCssColor" v-if="showHint"></ColorRect>
    </div>
    <input type="submit" class="c-answer-form__submit" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { type RGB, rgbToCssColor } from "../helpers/color";
import { roundToFixed } from "../helpers/number";
import ColorRect from "./ColorRect.vue";
import RangeInputWithDisplay from "./RangeInputWithDisplay.vue";

export default defineComponent({
	components: { RangeInputWithDisplay, ColorRect },
	props: {
		difficulty: {
			type: Number,
			required: true,
		},
		showHint: {
			type: Boolean,
			required: true,
		},
	},
	emits: {
		submit: (_rgb: RGB) => true,
		toggleHint: (_isShowHint: boolean) => true,
	},
	setup(props, { emit }) {
		const answerRGB = ref<RGB>([0, 0, 0]);

		const onSubmit = () => {
			emit("submit", answerRGB.value);
			answerRGB.value = [0, 0, 0];
		};

		const answerCssColor = computed(() => rgbToCssColor(answerRGB.value));

		const step = computed(() => {
			const { difficulty } = props;
			return roundToFixed(255 / difficulty, 2);
		});

		const onToggleHint = () => emit("toggleHint", !props.showHint);

		return { answerRGB, onSubmit, answerCssColor, step, onToggleHint };
	},
});
</script>

<style lang="stylus" scoped>
.c-answer-form {
  display: flex;
  flex-direction: column;

  &__input-group {
    margin-bottom: 1rem;
  }

  &__input-rgb {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
  }

  &__input-r {
    color: red;
  }

  &__input-g {
    color: green;
  }

  &__input-b {
    color: blue;
  }

  &__hint {
    display: flex;

    &-label {
      margin-right: 1rem;
    }

    &-checkbox {
      margin-right: 1rem;
    }
  }

  &__submit {
    border-radius: 1rem;
  }
}
</style>
