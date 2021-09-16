const styledComponentsPx2Vw = require('../lib/index');
module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      styledComponentsPx2Vw,
      {
        propList: ['*', '!border-*'],
        // exclude: [/index\.js/],
        // tags: ['styled'],
        transformRuntime: true,
        viewportWidth: 750,
        unitPrecision: 5,
      },
    ],
  ],
  env: {
    bare: {
      presets: [],
    },
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
