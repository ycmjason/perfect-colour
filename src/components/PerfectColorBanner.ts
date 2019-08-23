import { createComponent, createElement as h } from 'vue-function-api';
import { randomRGB, rgbToCssColor } from '../helpers/color';

export default createComponent({
  render() {
    const title = 'Perfect Colour';

    const randomColor = () => rgbToCssColor(randomRGB(255));

    const createRandomColorSpan = (c: string) => {
      const style = { color: randomColor() };
      return h('span', { style }, [c]);
    };

    return h('h1', title.split('').map(createRandomColorSpan));
  },
});
