import { IPx2VwOptions } from '../types/options';
// type TPx2Vw = typeof Px2VwPlugin;
// export type Px2VwPluginOptions = Parameters<TPx2Vw>;
export type IConfiguration = IPx2VwOptions & {
  tags: ReadonlyArray<string>;
};
class ConfigurationManager {
  private static readonly defaultConfiguration: IConfiguration = {
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
    tags: ['styled', 'css', 'createGlobalStyle', 'keyframes'],
  };
  private _config: IConfiguration = ConfigurationManager.defaultConfiguration;

  public get config(): IConfiguration {
    return this._config;
  }

  public updateConfig(config?: Partial<IConfiguration>): void {
    if (config) {
      this._config = Object.assign({}, ConfigurationManager.defaultConfiguration, config);
    }
  }
}

export default new ConfigurationManager();
