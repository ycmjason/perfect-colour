<template>
  <form @submit.prevent="onSubmit" v-if="answerRGB" class="c-answer-form">
    <p>Mix the RGB to match the color.</p>
    <div class="c-answer-form__input-group">
      <RangeInputWithDisplay
        class="c-answer-form__input c-answer-form__input-r"
        v-model="answerRGB[0]"
        :min="0"
        :max="255"
        :step="step"
      ></RangeInputWithDisplay>
      <RangeInputWithDisplay
        class="c-answer-form__input c-answer-form__input-g"
        v-model="answerRGB[1]"
        :min="0"
        :max="255"
        :step="step"
      ></RangeInputWithDisplay>
      <RangeInputWithDisplay
        class="c-answer-form__input c-answer-form__input-b"
        v-model="answerRGB[2]"
        :min="0"
        :max="255"
        :step="step"
      ></RangeInputWithDisplay>
    </div>
    <div class="c-answer-form__input-group">
      <label class="c-answer-form__hint-label">
        <input type="checkbox" v-model="showHint" class="c-answer-form__hint-checkbox" /> Show hints?
      </label>
      <ColorRect size="s" :color="answerCssColor" v-if="showHint"></ColorRect>
    </div>
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import { ref, createComponent, computed, watch } from 'vue-function-api';
import { RequiredProp } from '../helpers/vue-types';
import RangeInputWithDisplay from './RangeInputWithDisplay.vue';
import ColorRect from './ColorRect.vue';
import { normaliseRGB, RGB, rgbToCssColor } from '../helpers/color';
import { roundToFixed } from '../helpers/number';

export default createComponent({
  components: { RangeInputWithDisplay, ColorRect },
  props: {
    difficulty: Number,
  },
  setup(props, { emit }) {
    const answerRGB = ref<RGB>([0, 0, 0]);

    const onSubmit = () => {
      emit('submit', answerRGB.value);
      answerRGB.value = [0, 0, 0];
    };

    const showHint = ref(false);
    const answerCssColor = computed(() => {
      if (!props.difficulty) return;
      return rgbToCssColor(answerRGB.value);
    });

    const step = computed(() => {
      const { difficulty = 1 } = props;
      return roundToFixed(255 / difficulty, 2);
    });

    return { answerRGB, onSubmit, answerCssColor, showHint, step };
  },
});
</script>

<style lang="stylus" scoped>
.c-answer-form {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__input-group {
    display: flex;
    margin-bottom: 1rem;
  }

  >>> &__input {
    flex-grow: 1;
    text-align: center;

    &-r {
      color: red;
    }

    &-g {
      color: green;
    }

    &-b {
      color: blue;
    }
  }

  &__hint-label {
    margin-right: 1rem;
  }

  &__hint-checkbox {
    margin-right: 1rem;
  }
}
</style>
