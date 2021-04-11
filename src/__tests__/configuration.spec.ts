import { ConfigurationManager } from '../configuration';

describe('configuration', () => {
  let configuration: ConfigurationManager;
  beforeEach(() => {
    configuration = new ConfigurationManager();
  });
  it('should return default configuration', function () {
    expect(configuration.config).toEqual({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      transformRuntime: false,
      landscapeWidth: 568,
      tags: ['styled', 'css', 'createGlobalStyle', 'keyframes'],
    });
  });
  it('should return update configuration', function () {
    configuration.updateConfig();
    expect(configuration.config).toEqual({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
      transformRuntime: false,
      tags: ['styled', 'css', 'createGlobalStyle', 'keyframes'],
    });
    configuration.updateConfig({ viewportWidth: 750, transformRuntime: true, tags: ['sty', 'inject'] });

    expect(configuration.config).toEqual({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
      transformRuntime: true,
      tags: ['sty', 'inject'],
    });
  });
});
