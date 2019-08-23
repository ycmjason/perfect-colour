<template>
  <footer>Made with <span class="heart">&hearts;</span> by Jason Yu</footer>
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api';
import Heading from './Heading';

export default createComponent({
  components: { Heading },
  setup() {
    const title = 'Perfect Colour';
  },
});
</script>

<style lang="stylus" scoped>
footer {
  margin-top: 3rem;
  background: linear-gradient(141deg, #68cca0 0%, #d6eff1 51%, #2cb5e8 100%);
  padding: 2rem 1rem 3rem;
}

.heart {
  color: red;
}
</style>
