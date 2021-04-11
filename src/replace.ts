import postcss from 'postcss';
import memoize from 'memoizerific';
import px2vw from 'postcss-px-to-viewport'; //TODO: upgrade to 8 version wait postcss-px-to-viewport support
import { IPx2VwOptions } from '../types/options';

import configuration from './configuration';

const FAKE_OPENING_WRAPPER = `styled-fake-wrapper/* start of styled-fake-wrapper */{
`;
const FAKE_CLOSING_WRAPPER = `
}/* end of styled-fake-wrapper */`;
const FAKE_RULE = '/* start of styled-fake-rule */padding:/* end of styled-fake-rule */';
const PAIR_REG = /[\s\w-]+:([\s\w.-])+/;
// const PAIR_REG = /[\s\w-]+:([\s-\d]+px)+/;
const PX_UNIT_REG = /([\s-\d]+px)+/;
const SPLIT_SEPARATORS = [';', '\n', '{', '}'];

const errorTokenMap = new Map(); // a map data prevent infinite loop
function process(css: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, ...others } = configuration.config;
  const options: IPx2VwOptions = {
    ...others,
  };
  return postcss([px2vw(options)]).process(css, {
    // syntax: scss,
  }).css;
}
function replaceWithRecord(cssText: string): string {
  const { unitToConvert } = configuration.config;
  try {
    if (PAIR_REG.test(cssText)) {
      const replaced = process(`${FAKE_OPENING_WRAPPER}${cssText}${FAKE_CLOSING_WRAPPER}`);
      return replaced.replace(FAKE_OPENING_WRAPPER, '').replace(FAKE_CLOSING_WRAPPER, '');
    } else if (PX_UNIT_REG.test(cssText)) {
      const replaced = process(`${FAKE_RULE}${cssText}`);
      return replaced.replace(FAKE_RULE, '');
    } else {
      return cssText;
    }
  } catch (ignored) {
    let tempResults: string[] = [];
    let cssStr = cssText;
    SPLIT_SEPARATORS.forEach((separator) => {
      const tokens = cssStr.split(separator);
      for (const token of tokens) {
        const tokenRemoveComments = token.replace(/\s*(?<!(\/\*.*|[:：]))\/\/.*$/gm, ''); // remove single-line comments
        // TODO:consider into propList option
        if (
          PAIR_REG.test(tokenRemoveComments) &&
          tokenRemoveComments.includes(unitToConvert) &&
          !errorTokenMap.get(token) &&
          !!token.trim()
        ) {
          errorTokenMap.set(token, true);
          tempResults.push(replace(tokenRemoveComments));
        } else {
          tempResults.push(token);
        }
      }
      cssStr = tempResults.join(separator);
      tempResults = [];
    });

    return cssStr;
  }
}
export const replace = memoize(10)(function (cssText: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return replaceWithRecord(cssText);
});
