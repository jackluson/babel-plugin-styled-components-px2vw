import postcss from 'postcss'; //TODO: upgrade
import memoize from 'memoizerific';
import px2vw from 'postcss-px-to-viewport';
// import scss from 'postcss-scss';
import { IPx2VwOptions } from '../types/options';

import configuration from './configuration';

const FAKE_OPENING_WRAPPER = 'styled-fake-wrapper/* start of styled-fake-wrapper */{';
const FAKE_CLOSING_WRAPPER = '}/* end of styled-fake-wrapper */';
const PAIR_REG = /[\s\w-]+:[\s\w-]+/;

export const replace = memoize(10)(function (cssText: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, ...others } = configuration.config;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const options: IPx2VwOptions = {
    ...others,
  };
  try {
    const joinCssText = `${FAKE_OPENING_WRAPPER}${cssText}${FAKE_CLOSING_WRAPPER}`;
    // console.log('🚀 ~ file: replace.ts ~ line 44 ~ replace ~ options', options);
    const css = postcss([px2vw(options)]).process(joinCssText, {
      // syntax: scss,
    }).css;
    return css.replace(FAKE_OPENING_WRAPPER, '').replace(FAKE_CLOSING_WRAPPER, '');
  } catch (ignored) {
    const results: string[] = [];
    const tokens = cssText.split(';');
    for (const token of tokens) {
      if (PAIR_REG.test(token)) {
        results.push(replace(token));
      } else {
        results.push(token);
      }
    }
    return results.join(';');
  }
});
