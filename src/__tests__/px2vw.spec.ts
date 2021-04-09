import templateBuild from '@babel/template';
import { identifier, numericLiteral } from '@babel/types';
import generate from '@babel/generator';
import { px2vw } from '../px2vw';

describe('px2vw()', () => {
  it('should work', function () {
    expect(
      generate(
        templateBuild.statement(px2vw)({
          input: identifier('input'),
          px2vw: '_px2vw',
          viewportWidth: numericLiteral(750),
          unitPrecision: numericLiteral(5),
          minPixelValue: numericLiteral(1),
        }),
      ).code,
    ).toBe(
      `function _px2vw(input) {
  if (typeof input === 'function') return _px2vw(input());
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;

  if (pixels < 1) {
    return \`\${pixels}px\`;
  }

  var mul = Math.pow(10, 5 + 1);
  return \`\${Math.round(Math.floor(pixels * 100 / 750 * mul) / 10) * 10 / mul}vw\`;
}`,
    );
  });
});
