import { Ref, computed } from 'vue-function-api';

export const readonly = <T>(ref: Ref<T>) => computed(() => ref.value);
