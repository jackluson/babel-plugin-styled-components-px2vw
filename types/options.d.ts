export interface IPx2VwOptions {
  readonly unitToConvert: string;
  readonly viewportWidth: number;
  readonly unitPrecision: number;
  readonly viewportUnit: string;
  readonly fontViewportUnit: string;
  readonly selectorBlackList: ReadonlyArray<string>;
  readonly propList: ReadonlyArray<string>;
  readonly minPixelValue: number;
  readonly mediaQuery: boolean;
  readonly exclude?: RegExp | ReadonlyArray<RegExp>;
  readonly include?: RegExp | ReadonlyArray<RegExp>;
  readonly replace: boolean;
  readonly landscape: boolean;
  readonly landscapeUnit: string;
  readonly landscapeWidth: number;
}
