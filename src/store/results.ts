import { ref } from 'vue-function-api';
import { readonly } from '../compositions/readonly';
import { RGB } from '../helpers/color';

type Result = {
  difficulty: number;
  question: RGB;
  answer: RGB;
};

const useNewResults = () => {
  const results = ref<Result[]>([]);
  const addResult = (difficulty: number, question: RGB, answer: RGB) => {
    results.value.push({ difficulty, question, answer });
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
