export interface IPx2VwOptions {
  unitToConvert: string;
  viewportWidth: number;
  unitPrecision: number;
  viewportUnit: string;
  fontViewportUnit: string;
  selectorBlackList: ReadonlyArray<string>;
  propList: ReadonlyArray<string>;
  minPixelValue: number;
  mediaQuery: boolean;
  exclude?: RegExp | ReadonlyArray<RegExp>;
  include?: RegExp | ReadonlyArray<RegExp>;
  replace: boolean;
  landscape: boolean;
  landscapeUnit: string;
  landscapeWidth: number;
}
