<template>
  <form @submit.prevent="onSubmit" v-if="answerRGB" class="c-answer-form">
    <p>Mix the RGB to match the color.</p>
    <div class="c-answer-form__input-group c-answer-form__input-rgb">
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
    <div class="c-answer-form__input-group c-answer-form__hint">
      <label class="c-answer-form__hint-label">
        <input type="checkbox" :value="showHint" @change="onToggleHint" class="c-answer-form__hint-checkbox" /> Show
        hints?
      </label>
      <ColorRect size="s" :color="answerCssColor" v-if="showHint"></ColorRect>
    </div>
    <input type="submit" class="c-answer-form__submit" />
  </form>
</template>

<script lang="ts">
import { ref, createComponent, computed } from '@vue/composition-api';
import RangeInputWithDisplay from './RangeInputWithDisplay.vue';
import ColorRect from './ColorRect.vue';
import { RGB, rgbToCssColor } from '../helpers/color';
import { roundToFixed } from '../helpers/number';
import { RequiredProp } from '../helpers/vue-types';

export default createComponent({
  components: { RangeInputWithDisplay, ColorRect },
  props: {
    difficulty: RequiredProp(Number),
    showHint: RequiredProp(Boolean),
  },
  setup(props, { emit }) {
    const answerRGB = ref<RGB>([0, 0, 0]);

    const onSubmit = () => {
      emit('submit', answerRGB.value);
      answerRGB.value = [0, 0, 0];
    };

    const answerCssColor = computed(() => {
      return rgbToCssColor(answerRGB.value);
    });

    const step = computed(() => {
      const { difficulty } = props;
      return roundToFixed(255 / difficulty, 2);
    });

    const onToggleHint = () => emit('toggleHint', !props.showHint);

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
