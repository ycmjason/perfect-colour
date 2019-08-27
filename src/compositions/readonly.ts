import { Ref, computed } from '@vue/composition-api';

export const readonly = <T>(ref: Ref<T>) => computed(() => ref.value);
