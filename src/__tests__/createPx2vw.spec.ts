import { identifier } from '@babel/types';
import generate from '@babel/generator';
import { runInNewContext } from 'vm';
import createPx2vw from '../createPx2vw';
import configuration, { IConfiguration } from '../configuration';

function px2vw(
  value: string,
  {
    viewportWidth = configuration.config.viewportWidth,
    unitPrecision = configuration.config.unitPrecision,
    minPixelValue = configuration.config.minPixelValue,
  }: Partial<IConfiguration> = configuration.config,
): string {
  const sandbox = { result: '' };
  const ast = createPx2vw(identifier('px2vw'), { viewportWidth, unitPrecision, minPixelValue });
  const code = generate(ast).code;
  runInNewContext(`${code} result = px2vw(${value});`, sandbox);
  return sandbox.result;
}

it('should match snapshot', function () {
  const ast = createPx2vw(identifier('px2vw'), configuration.config);
  expect(generate(ast).code).toMatchSnapshot();
});

it('should transform String', function () {
  expect(px2vw("'-100px'")).toBe('-13.33333vw');
  expect(px2vw("'32px'")).toBe('4.26667vw');
  expect(px2vw("'11.3333333px'")).toBe('1.51111vw');
  expect(px2vw("'-11.3333333px'")).toBe('-1.51111vw');
});

it('should transform Number', function () {
  expect(px2vw('16')).toBe('2.13333vw');
  expect(px2vw('16.3333333')).toBe('2.17778vw');
  expect(px2vw('-16')).toBe('-2.13333vw');
  expect(px2vw('-16.3333333')).toBe('-2.17778vw');
});

it('should transform Function', function () {
  expect(px2vw('function() {return 20;}')).toBe('2.66667vw');
  expect(px2vw('function(props) { return props.width / 2; }, { width: 100 }')).toBe('6.66667vw');
});

// it('should ignore value less than "minPixelValue" option', function () {
//   const options = { minPixelValue: 2 };
//   expect(px2vw("'1px'", options)).toBe('1px');
//   expect(px2vw('1', options)).toBe('1px');
//   expect(px2vw("'1.3333333px'", options)).toBe('1.3333333px');
//   expect(px2vw('1.3333333', options)).toBe('1.3333333px');
//   expect(px2vw("'-1px'", options)).toBe('-1px');
//   expect(px2vw('-1', options)).toBe('-1px');
//   expect(px2vw("'-1.3333333px'", options)).toBe('-1.3333333px');
//   expect(px2vw('-1.3333333', options)).toBe('-1.3333333px');
//   expect(px2vw('function() {return 1;}', options)).toBe('1px');
//   expect(px2vw('function() {return "1px";}', options)).toBe('1px');
//   expect(px2vw('function(props) { return props.width / 2; }, { width: 2 }', options)).toBe('1px');
//   expect(px2vw('function(props) { return props.width / 2 + "px"; }, { width: 2 }', options)).toBe('1px');
// });

// it('should multiply "multiplier" option', function () {
//   const options = { minPixelValue: 2, multiplier: 2 };
//   expect(px2vw("'1px'", options)).toBe('1px');
//   expect(px2vw('1', options)).toBe('1px');
//   expect(px2vw("'1.3333333px'", options)).toBe('1.3333333px');
//   expect(px2vw('1.3333333', options)).toBe('1.3333333px');
//   expect(px2vw("'-1px'", options)).toBe('-1px');
//   expect(px2vw('-1', options)).toBe('-1px');
//   expect(px2vw("'-1.3333333px'", options)).toBe('-1.3333333px');
//   expect(px2vw('-1.3333333', options)).toBe('-1.3333333px');
//   expect(px2vw('function() {return 1;}', options)).toBe('1px');
//   expect(px2vw('function() {return "1px";}', options)).toBe('1px');
//   expect(px2vw('function(props) { return props.width / 2; }, { width: 2 }', options)).toBe('1px');
//   expect(px2vw('function(props) { return props.width / 2 + "px"; }, { width: 2 }', options)).toBe('1px');
//   expect(px2vw("'2px'", options)).toBe('0.04rem');
//   expect(px2vw('2', options)).toBe('0.04rem');
//   expect(px2vw("'2.3333333px'", options)).toBe('0.04667rem');
//   expect(px2vw("'-2.3333333px'", options)).toBe('-0.04667rem');
//   expect(px2vw('2.3333333', options)).toBe('0.04667rem');
//   expect(px2vw('-2.3333333', options)).toBe('-0.04667rem');
//   expect(px2vw("'-2px'", options)).toBe('-0.04rem');
//   expect(px2vw('-2', options)).toBe('-0.04rem');
//   expect(px2vw('function() {return 2;}', options)).toBe('0.04rem');
//   expect(px2vw('function() {return "2px";}', options)).toBe('0.04rem');
//   expect(px2vw('function(props) { return props.width / 2; }, { width: 4 }', options)).toBe('0.04rem');
//   expect(px2vw('function(props) { return props.width / 2 + "px"; }, { width: 4 }', options)).toBe('0.04rem');
// });
