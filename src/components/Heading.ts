import { createElement as h } from '@vue/composition-api';
import { randomRGB, rgbToCssColor } from '../helpers/color';
import Vue, { VNode } from 'vue';

const EMPTY_V_NODE = (null as any) as VNode;

export default Vue.extend({
  functional: true,
  props: {
    h: Number,
  },
  render(_, { props, children, data }) {
    const { h: size } = props;
    const title = children.map(c => c.text || '').join(' ');
    if (typeof size !== 'number') return EMPTY_V_NODE;

    const randomColor = () => rgbToCssColor(randomRGB(255));

    const createRandomColorSpan = (c: string) => {
      const style = { color: randomColor() };
      return h('span', { style }, [c]);
    };

    return h(`h${size}`, data, title.split('').map(createRandomColorSpan));
  },
});
