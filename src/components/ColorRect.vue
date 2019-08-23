<template>
  <div :style="style"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { value, createComponent, createElement as h, computed } from 'vue-function-api';

export default createComponent({
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return { style: computed(() => ({ background: props.color })) };
  },
});
</script>

<style scoped>
div {
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 1px black solid;
}
</style>
