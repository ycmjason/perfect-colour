<template>
  <header>
    <PerfectColorBanner></PerfectColorBanner>
    <p>How good is your eye?</p>
  </header>
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api';
import PerfectColorBanner from './PerfectColorBanner';

export default createComponent({
  components: { PerfectColorBanner },
  setup() {
    const title = 'Perfect Colour';
  },
});
</script>

<style lang="stylus" scoped>
h1 {
  margin-bottom: 0;
}

p {
  margin-top: 0.5rem;
}
</style>
