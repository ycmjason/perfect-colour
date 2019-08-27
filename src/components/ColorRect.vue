<template>
  <div :style="style" class="rect"></div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import { RequiredProp } from '../helpers/vue-types';

type ColorRectSize = 's' | 'l';
const SIZE_TO_REM = (size: ColorRectSize): string => {
  switch (size) {
    case 's':
      return '1rem';
    case 'l':
      return '5rem';
  }
};

export default createComponent<{
  color: string,
  size: ColorRectSize,
}>({
  // @ts-ignore
  props: {
    color: RequiredProp(String),
    size: RequiredProp<ColorRectSize>(String),
  },
  setup(props) {
    const style = computed(() => {
      const { size, color } = props;
      return {
        background: color,
        width: SIZE_TO_REM(size),
        height: SIZE_TO_REM(size),
      };
    });

    return { style };
  },
});
</script>

<style scoped>
.rect {
  display: inline-block;
  border-radius: 20%;
  border: 1px black solid;
}
</style>
