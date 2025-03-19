export const randomNumber = (min: number, max: number): number => {
	if (min > max) throw Error("wtf min > max");

	const d = max - min;
	return min + Math.round(Math.random() * d);
};

export const roundToFixed = (n: number, fixed: number) =>
	Number(n.toFixed(fixed));
