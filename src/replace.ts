import postcss from 'postcss'; //TODO: upgrade to 8 version wait postcss-px-to-viewport support
import memoize from 'memoizerific';
import px2vw from 'postcss-px-to-viewport';
import { IPx2VwOptions } from '../types/options';

import configuration from './configuration';

const FAKE_OPENING_WRAPPER = 'styled-fake-wrapper/* start of styled-fake-wrapper */{';
const FAKE_CLOSING_WRAPPER = '}/* end of styled-fake-wrapper */';
const PAIR_REG = /[\s\w-]+:[\s\w-]+/;

const errorTokenMap = new Map(); // a map data prevent infinite loop
export const replace = memoize(10)(function (cssText: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, ...others } = configuration.config;
  const options: IPx2VwOptions = {
    ...others,
  };
  try {
    const joinCssText = `${FAKE_OPENING_WRAPPER}${cssText}${FAKE_CLOSING_WRAPPER}`;
    const cssRemoveComments = joinCssText.replace(/\s*(?<!(\/\*.*|[:：]))\/\/.*$/gm, ''); // remove single-line comments

    const css = postcss([px2vw(options)]).process(cssRemoveComments, {
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
      const tokenRemoveComments = token.replace(/\s*(?<!(\/\*.*|[:：]))\/\/.*$/gm, ''); // remove single-line comments
      if (
        PAIR_REG.test(tokenRemoveComments) &&
        tokenRemoveComments.includes(others.unitToConvert) &&
        !errorTokenMap.get(tokenRemoveComments)
      ) {
        errorTokenMap.set(tokenRemoveComments, true);
        results.push(replace(tokenRemoveComments));
      } else {
        results.push(tokenRemoveComments);
      }
    }
    return results.join(';');
  }
});
