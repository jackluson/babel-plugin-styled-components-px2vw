declare module 'postcss-px-to-viewport' {
  import { PluginCreator } from 'postcss';
  import { IPx2VwOptions } from 'types/options';

  const px2vw: PluginCreator<IPx2VwOptions>;

  export = px2vw;
}
