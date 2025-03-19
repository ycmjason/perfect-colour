import { type FunctionalComponent, h } from "vue";
import { randomRGB, rgbToCssColor } from "../helpers/color";

const FunctionalHeading: FunctionalComponent<{ h: number }> = (
	props,
	{ slots, ...data },
) => {
	const { h: size } = props;
	if (typeof size !== "number") return null;

	const randomColor = () => rgbToCssColor(randomRGB(255));

	const createRandomColorSpan = (c: Parameters<typeof h>[2]) => {
		const style = { color: randomColor() };
		return h("span", { style }, c);
	};

	return h(`h${size}`, data.attrs, createRandomColorSpan(slots.default?.()));
};

FunctionalHeading.props = { h: Number };

export default FunctionalHeading;
