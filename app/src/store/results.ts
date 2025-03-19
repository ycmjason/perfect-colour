import { readonly, ref } from "vue";
import type { RGB } from "../helpers/color";

type Result = {
	difficulty: number;
	question: RGB;
	answer: RGB;
	usedHint: boolean;
};

const useNewResults = () => {
	const results = ref<Result[]>([]);
	const addResult = ({ difficulty, question, answer, usedHint }: Result) => {
		results.value.push({ difficulty, question, answer, usedHint });
	};

	return { results: readonly(results), addResult };
};

let results: ReturnType<typeof useNewResults>;

export const getResults = () => {
	if (!results) {
		results = useNewResults();
	}
	return results;
};
