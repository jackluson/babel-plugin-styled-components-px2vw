import postcss from 'postcss';
import memoize from 'memoizerific';
import px2vw from 'postcss-px-to-viewport'; //TODO: upgrade to 8 version wait postcss-px-to-viewport support
import { IPx2VwOptions } from '../types/options';

import configuration from './configuration';

const FAKE_OPENING_WRAPPER = `styled-fake-wrapper/* start of styled-fake-wrapper */{
`;
const FAKE_CLOSING_WRAPPER = `
}/* end of styled-fake-wrapper */`;
// const PAIR_REG = /[\s\w-]+:[\s\w-]+/;
const PAIR_REG = /[\s\w-]+:([\s-\d]+px)+/;

const errorTokenMap = new Map(); // a map data prevent infinite loop
export const replace = memoize(10)(function (cssText: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, ...others } = configuration.config;
  const options: IPx2VwOptions = {
    ...others,
  };
  try {
    const joinCssText = `${FAKE_OPENING_WRAPPER}${cssText}${FAKE_CLOSING_WRAPPER}`;

    const css = postcss([px2vw(options)]).process(joinCssText, {
      // syntax: scss,
    }).css;

    if (errorTokenMap.has(cssText)) {
      errorTokenMap.delete(cssText);
    }

    return css.replace(FAKE_OPENING_WRAPPER, '').replace(FAKE_CLOSING_WRAPPER, '');
  } catch (ignored) {
    const results: string[] = [];
    const tokens = cssText.split(';');
    for (const token of tokens) {
      if (PAIR_REG.test(token) && token.includes(others.unitToConvert) && !errorTokenMap.get(token)) {
        errorTokenMap.set(token, true);
        results.push(replace(token));
      } else {
        results.push(token);
      }
    }
    return results.join(';');
  }
});
