<template>
  <header>
    <Heading :h="1">{{ title }}</Heading>
    <p>How good are your eyes?</p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Heading from "./Heading";

export default defineComponent({
	components: { Heading },
	setup() {
		const title = "Perfect Colour";

		return { title };
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
