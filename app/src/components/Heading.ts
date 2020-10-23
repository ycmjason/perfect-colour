import { randomRGB, rgbToCssColor } from '../helpers/color';
import { VNode, h, defineComponent, FunctionalComponent } from 'vue';

const EMPTY_V_NODE = (null as any) as VNode;

const FunctionalHeading: FunctionalComponent<{ h: number }> = (props, { slots, ...data }) => {
  const { h: size } = props;
  if (typeof size !== 'number') return EMPTY_V_NODE;

  const randomColor = () => rgbToCssColor(randomRGB(255));

  const createRandomColorSpan = (c: Parameters<typeof h>[2]) => {
    const style = { color: randomColor() };
    return h('span', { style }, c);
  };

  return h(`h${size}`, data, createRandomColorSpan(slots.default?.()));
};

FunctionalHeading.props = { h: Number };

export default FunctionalHeading;
