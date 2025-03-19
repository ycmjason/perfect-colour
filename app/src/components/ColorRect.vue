<template>
  <div :style="style" class="rect"></div>
</template>

<script lang="ts">
import { type PropType, computed, defineComponent } from "vue";

type ColorRectSize = "s" | "l";
const SIZE_TO_REM = (size: ColorRectSize): string => {
	switch (size) {
		case "s":
			return "1rem";
		case "l":
			return "5rem";
	}
};

export default defineComponent({
	props: {
		color: { type: String, required: true },
		size: {
			type: String as PropType<ColorRectSize>,
			required: true,
		},
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
