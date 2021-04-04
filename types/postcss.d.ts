declare module 'postcss-px-to-viewport' {
  import { Plugin } from 'postcss';
  import { IPx2VwOptions } from 'types/options';
  // import { PluginCreator } from 'postcss'; # postcss v8

  const px2vw: Plugin<IPx2VwOptions>;

  export = px2vw;
}
